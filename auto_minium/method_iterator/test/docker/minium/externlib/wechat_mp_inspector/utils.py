import json
import re
import time
import traceback
import logging
import threading
import os
import sys
import asyncio
import socket
import typing
from typing import Any, Union
from functools import wraps
import functools
import concurrent.futures
from enum import Enum
try:
    import urllib
    urlparse = urllib.urlparse
except AttributeError:
    from urllib.parse import urlparse
except ImportError:
    urlparse = None

logger = logging.getLogger("WMI")


class WaitThread(threading.Thread):
    def __init__(
        self,
        group=None,
        target=None,
        name=None,
        args=(),
        kwargs=None,
        daemon=None,
        semaphore=None,
    ):
        super().__init__(group, target, name, args, kwargs, daemon=daemon)
        self._result = None
        self._exception = None
        self._semaphore: threading.Semaphore = semaphore

    def run(self):
        try:
            if self._target:
                self._result = self._target(*self._args, **self._kwargs)
        except:
            self._exception = sys.exc_info()[1]
        finally:
            # Avoid a refcycle if the thread is running a function with
            # an argument that has a member that points to the thread.
            del self._target, self._args, self._kwargs
            if self._semaphore:
                self._semaphore.release()

    def get_result(self, timeout=None, block=True):
        if block:
            self.join(timeout=timeout)
        if self._exception:
            raise self._exception
        if block and self.is_alive():
            raise TimeoutError("wait [%s] seconds timeout" % timeout)
        return self._result


def thread_all(ts: typing.List[WaitThread]):
    """并行执行多个线程, 返回所有的结果

    :param typing.List[WaitThread] ts: 线程组
    """
    for t in ts:
        t.start()
    for t in ts:
        t.join()
    return [t._exception or t._result  for t in ts]

def thread_race(ts: typing.List[WaitThread], timeout: int=None) -> typing.Any:
    """并行执行多个线程, 返回最快的一个结果

    :param typing.List[WaitThread] ts: 线程组
    :param int timeout: 等待超时时间, None == 一直等
    :raises TimeoutError: 等待结果超时
    :return typing.Any: 结果
    """
    semaphore = threading.Semaphore(0)
    for t in ts:
        t._semaphore = semaphore
        t.start()
    if not semaphore.acquire(timeout=timeout):
        raise TimeoutError(f"{len(ts)} threads race timeout")
    for t in ts:
        if not t.is_alive():
            return t.get_result()

def thread_wait(ts: typing.List[WaitThread], expected: typing.Any, timeout: int=None):
    """并行执行多个线程, 等待预期结果

    :param typing.List[WaitThread] ts: 线程组
    :param typing.Any expected: 期待值, not None
    :param int timeout: 等待超时时间, None == 一直等
    :raises ValueError: 等不到结果
    """
    semaphore = threading.Semaphore(0)
    for t in ts:
        t._semaphore = semaphore
        t.start()
    cnt = len(ts)
    exp = None
    while cnt and semaphore.acquire(timeout=timeout):
        cnt -= 1
        for t in ts:
            if not t.is_alive() and t._result == expected:
                return t.get_result()
            elif not t.is_alive() and t._exception:
                exp = t._exception
    raise ValueError("wait expected value error") from exp

class Callback(object):
    def __init__(self, callback=None) -> None:
        self.__callback = callback
        self.__called = threading.Semaphore(0)
        self.__is_called = False
        self.__callback_result = None
        self.__callback_results = []  # 累积的结果

    def callback(self, params):
        self.__is_called = True
        self.__callback_result = params
        self.__callback_results.append(self.__callback_result)
        self.__called.release()
        if self.__callback:
            self.__callback(params)

    @property
    def is_called(self):
        """callback曾被调用过

        :return bool: True: called, False: never called
        """
        return self.__is_called

    @property
    def result(self):
        """最后一个结果

        :return any: 回调结果
        """
        return self.__callback_result

    @property
    def results(self):
        """返回所有结果

        :return list[any]: 所有回调结果
        """
        return list(self.__callback_results)

    def acquire(self, timeout=10):
        """acquire next callback

        :param int timeout: wait seconds, defaults to 10
        """
        return self.__called.acquire(timeout=timeout)

    def wait_called(self, timeout=10) -> bool:
        """
        等待回调调用, 默认等待最多10s
        """
        if self.__is_called:
            return True
        return self.acquire(timeout=timeout)

    def get_callback_result(self, timeout=0) -> any:
        """
        获取回调结果, 超时未获取到结果报AssertionError
        1. 回调参数只有一个的情况会解构
        2. 回调参数中有多个的情况会直接返回参数list
        """
        if self.wait_called(timeout):
            return self.__callback_result
        assert self.__is_called, f"No callback received within {timeout} seconds"

    def get_all_result(self):
        """获取所有结果, 并清空回调状态

        :return list[any]: 所有结果
        """
        results = self.__callback_results
        self.__callback_results = []
        self.__is_called = False
        while self.__called.acquire(False):
            pass
        return results

class ProcessSafeEventLoop(object):
    def __init__(self, loop: asyncio.AbstractEventLoop=None) -> None:
        self.pid = os.getpid()
        if loop is not None:
            self.loop = loop
            asyncio.set_event_loop(self.loop)
            if not self.loop.is_running():
                self.run_loop()
                return
        try:
            self.loop = asyncio.get_running_loop()
            logger.warning("use current loop")
        except RuntimeError:
            self.loop = asyncio.new_event_loop()
            asyncio.set_event_loop(self.loop)
            self.run_loop()

    def run_loop(self):
        threading.Thread(target=self.loop.run_forever, daemon=True).start()

    def stop_loop(self):
        self.loop.stop()

    def run_coroutine(self, coro):
        """Submit a coroutine object to a given event loop.

        Return a concurrent.futures.Future to access the result.
        """
        if os.getpid() != self.pid:
            self.pid = os.getpid()
            self.loop = asyncio.new_event_loop()
            self.run_loop()
        return asyncio.run_coroutine_threadsafe(coro, loop=self.loop)

    def is_running(self):
        return self.loop.is_running()

    def __getattr__(self, name):
        return getattr(self.loop, name)

from asyncio.selector_events import BaseSelectorEventLoop
class ThreadSafeEventLoop(BaseSelectorEventLoop):
    def __new__(cls, loop: asyncio.AbstractEventLoop=None):
        if loop is not None:  # 直接复用 loop 
            return loop
        return object.__new__(cls)
    
    def __init__(self, loop: asyncio.AbstractEventLoop=None) -> None:
        if loop is None:
            super().__init__()
        self.pid = os.getpid()
        if loop is not None:
            asyncio.set_event_loop(self)
        if not self.is_running():
            self.run_loop()

    def run_forever(self) -> None:
        try:
            logger.debug(f"{id(self)} run_forever")
            return super().run_forever()
        except:
            logger.exception(f"{id(self)} run exception")
            raise
        finally:
            logger.debug(f"{id(self)} run_forever end")

    def run_loop(self):
        threading.Thread(target=self.run_forever, daemon=True).start()

    def stop_loop(self):
        self.stop()

    def run_coroutine(self, coro):
        """Submit a coroutine object to a given event loop.

        Return a concurrent.futures.Future to access the result.
        """
        return asyncio.run_coroutine_threadsafe(coro, loop=self)


Future = typing.Union[asyncio.futures.Future, concurrent.futures.Future]
EventLoop = typing.Union[ProcessSafeEventLoop, asyncio.BaseEventLoop]
class WaitTimeoutError(TimeoutError):
    pass


async def _cancel_and_wait(fut, loop):
    """Cancel the *fut* future or task and wait until it completes."""

    waiter = loop.create_future()
    cb = functools.partial(_release_waiter, waiter)
    fut.add_done_callback(cb)

    try:
        fut.cancel()
        # We cannot wait on *fut* directly to make
        # sure _cancel_and_wait itself is reliably cancellable.
        await waiter
    finally:
        fut.remove_done_callback(cb)


def _release_waiter(waiter, *args):
    if not waiter.done():
        waiter.set_result(None)


async def async_wait(
    fut, timeout, loop: Union[ProcessSafeEventLoop, asyncio.AbstractEventLoop] = None
):
    """
    reference asyncio.wait_for
    wait fut done, when timeout, raise
    """
    if loop is None:
        loop = asyncio.get_running_loop()
    elif isinstance(loop, ProcessSafeEventLoop):
        loop = loop.loop
    logger.debug(f"@async_wait loop: {id(loop)}")
    waiter = loop.create_future()
    cb = functools.partial(_release_waiter, waiter)
    fut = asyncio.ensure_future(fut, loop=loop)
    fut.add_done_callback(cb)
    timeout_handle = loop.call_later(timeout, _release_waiter, waiter)

    try:
        # wait until the future completes or the timeout WaitTimeoutError
        try:
            await waiter
        except asyncio.exceptions.CancelledError:
            if fut.done():
                return fut.result()
            else:
                fut.remove_done_callback(cb)
                # We must ensure that the task is not running
                # after wait_for() returns.
                # See https://bugs.python.org/issue32751
                await _cancel_and_wait(fut, loop=loop)
                raise

        if fut.done():
            return fut.result()
        else:
            fut.remove_done_callback(cb)
            # We must ensure that the task is not running
            # after wait_for() returns.
            # See https://bugs.python.org/issue32751
            await _cancel_and_wait(fut, loop=loop)
            # In case task cancellation failed with some
            # exception, we should re-raise it
            # See https://bugs.python.org/issue40607
            try:
                fut.result()
            except asyncio.exceptions.CancelledError as exc:
                raise WaitTimeoutError() from exc
            else:
                raise WaitTimeoutError()
    finally:
        timeout_handle.cancel()


def get_result(
    fut: Future,
    timeout=None,
    default=None,
):
    # asyncio.futures.Future.result 去掉了timeout参数
    if isinstance(fut, concurrent.futures.Future):
        try:
            return fut.result(timeout)
        except concurrent.futures.TimeoutError as ext:
            if default is not None:
                return default
            raise WaitTimeoutError() from ext
    loop = fut.get_loop()
    try:
        return asyncio.run_coroutine_threadsafe(
            async_wait(fut, timeout=timeout, loop=loop), loop=loop
        ).result()
    except WaitTimeoutError as ext:
        if default is not None:
            return default
        raise WaitTimeoutError() from ext

class AsyncCondition(asyncio.Condition):
    def __init__(
        self,
        lock: asyncio.Lock = None,
        *,
        loop: Union[asyncio.AbstractEventLoop, ProcessSafeEventLoop] = None,
    ) -> None:
        if isinstance(loop, ProcessSafeEventLoop):
            loop = loop.loop
        if sys.version_info < (3, 10):
            super().__init__(lock, loop=loop)
        else:  # loop参数将在3.10废除
            if loop:
                asyncio.set_event_loop(loop)
            super().__init__(lock)

    async def wait(self, timeout=None):
        loop = self._loop
        coro = super().wait()
        if timeout is None:
            return await coro
        try:
            return await async_wait(coro, timeout=timeout, loop=loop)
        except WaitTimeoutError:
            return False

class AsyncCallback(object):
    def __init__(self, loop: EventLoop = None) -> None:
        if loop is None:
            self._loop = asyncio.get_running_loop()
        else:
            self._loop = loop
        self._is_called = False
        self._waiter: Future = self._loop.create_future()

    async def set_result(self, args):
        if not self._waiter.done():
            self._is_called = True
            result = args[0] if args and len(args) == 1 else args
            if isinstance(result, BaseException):
                self._waiter.set_exception(result)
            else:
                self._waiter.set_result(result)

    def cancel(self):
        self._waiter.cancel()

    def callback(self, *args):
        if not self._waiter.done():
            self._loop.run_coroutine(self.set_result(args))

    @property
    def is_called(self):
        return self._waiter.done()

    def wait_called(self, timeout=10) -> bool:
        """
        等待回调调用, 默认等待最多10s
        """
        if timeout == 0:
            return self._waiter.done()
        if self._waiter.done():
            return True
        try:
            return self._loop.run_coroutine(
                async_wait(self._waiter, timeout, self._loop)
            ).result()
        except WaitTimeoutError:
            return False
        except Exception:
            return self._waiter.done()

    def get_callback_result(self, timeout=0) -> any:
        if self.wait_called(timeout):
            try:
                return self._waiter.result()
            except Exception:
                return sys.exc_info()[1]
        assert self._is_called, f"No callback received within {timeout} seconds"

    def get_result(self, timeout=0):
        """
        获取回调结果, 结果如果为exception直接抛出, 超时未获取到则抛MiniTimeoutError
        """
        if self.wait_called(timeout):
            return self._waiter.result()
        raise WaitTimeoutError(f"No callback received within {timeout} seconds")


class _RacingFuture(asyncio.futures.Future):
    """Helper for gather().

    This overrides cancel() to cancel all the children and act more
    like Task.cancel(), which doesn't immediately mark itself as
    cancelled.
    """

    def __init__(self, children: typing.List, *, loop, with_index=True):
        assert loop is not None
        super().__init__(loop=loop)
        self._children = children
        self._cancel_requested = False
        self._index = None
        self._with_index = with_index

    def cancel(self, msg=None):
        if self.done():
            return False
        ret = False
        for child in self._children:
            if child.cancel(msg=msg):
                ret = True
        if ret:
            # If any child tasks were actually cancelled, we should
            # propagate the cancellation request regardless of
            # *return_exceptions* argument.  See issue 32684.
            self._cancel_requested = True
        return ret
    
    def set_result(self, __result: Any, fut: Future) -> None:
        self._index = self._children.index(fut) if fut in self._children else None
        return super().set_result(__result)
    
    def result(self) -> Any:
        if self._with_index:
            return super().result(), self._index
        return super().result()

class ExpectedResult(Enum):
    NOT_EMPTY = 0
    NOT_NONE = 1


def async_race(*coros: typing.List, expected_result: Union[ExpectedResult, typing.Any], loop, with_index=True):
    """并行运行异步函数, 直到有`expected_result`内容返回

    :param ExpectedResultortyping.Any expected_result: 预期结果
    :param eventloop loop: loop
    :param bool with_index: 返回带上符合结果的coro的index, defaults to True
    :return any/[any, int]: result / [result, index] / None: 没有`expected_result`的结果
    """
    outer: Future = None
    nfinished = 0
    nfuts = 0
    children: typing.List[Future] = []
    def _done_callback(fut: Future):
        nonlocal nfinished
        nfinished += 1
        if outer is None or outer.done():
            if not fut.cancelled():
                # Mark exception retrieved.
                fut.exception()
            return
        res = fut.exception()
        if res is None:
            res = fut.result()
            if isinstance(expected_result, ExpectedResult):
                if expected_result is ExpectedResult.NOT_EMPTY:
                    if res:
                        outer.set_result(res, fut)
                        return
                elif expected_result is ExpectedResult.NOT_NONE:
                    if res is not None:
                        outer.set_result(res, fut)
                        return
            elif res is expected_result:
                outer.set_result(res, fut)
                return
        if nfinished == nfuts:
            if outer._cancel_requested:
                exc = fut._make_cancelled_error()
                outer.set_exception(exc)
                return
            for fut in children:
                if not fut.cancelled():
                    exc = fut.exception()
                    if exc is not None:
                        outer.set_exception(exc)
                        return
            outer.set_result(None, None)
            
    def _cancel_children(outer):
        for fut in children:
            if not fut.done():
                print("cancel")
                fut.cancel("race done")

    for coro in coros:
        fut: Future = asyncio.ensure_future(coro, loop=loop)
        if loop is None:
            loop = asyncio.futures._get_loop(fut)
        if fut is not coro:
            # 'arg' was not a Future, therefore, 'fut' is a new
            # Future created specifically for 'arg'.  Since the caller
            # can't control it, disable the "destroy pending task"
            # warning.
            fut._log_destroy_pending = False

        nfuts += 1
        fut.add_done_callback(_done_callback)
        children.append(fut)
    print("nfuts", nfuts)
    
    outer = _RacingFuture(children, loop=loop, with_index=with_index)
    outer.add_done_callback(_cancel_children)
    return outer

class Object(dict):
    def __init__(self, __map=None, **kwargs):
        if __map:
            kwargs.update(__map)
        extend = {}
        for k, v in kwargs.items():
            if hasattr(dict, k):  # dict本来的属性不可覆盖
                extend[k] = v
                continue
            setattr(self, k, v)
        super(Object, self).__init__(self.__dict__, **extend)

    def __getattr__(self, __k):
        try:
            return self[__k]
        except KeyError:
            return None

    def __setattr__(self, __k, __v):
        if isinstance(__v, dict):
            __v = Object(__v)
        if isinstance(__v, list):
            for index, v in enumerate(__v):
                if isinstance(v, dict):
                    __v[index] = Object(v)
        if hasattr(self.__class__, __k):
            super(Object, self).__setattr__(__k, __v)
        else:
            self[__k] = __v

    @classmethod
    def parse_from_file(cls, file_path):
        if not os.path.isfile(file_path):
            raise RuntimeError(f"{file_path} not exists")
        with open(file_path, "r", encoding="utf8") as fp:
            return cls(json.load(fp))


def json2obj(data):
    try:
        return json.loads(data, object_hook=Object)
    except (TypeError, json.JSONDecodeError):
        return None


def pick_unuse_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("localhost", 0))
    addr, port = s.getsockname()
    s.close()
    return port

def cost_debug(target: int=5):
    """耗时监测修饰器, 需要调用self.logger打印提示信息

    :param int target: 检测耗时目标时间, defaults to 5
    """
    def _cost_debug(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            st = time.time()
            try:
                return func(self, *args, **kwargs)
            finally:
                cost = time.time() - st
                if cost > target:
                    getattr(self, "logger", logger).debug("call %s cost %.3fs" % (func.__name__, cost))
        return wrapper
    return _cost_debug

def catch(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            return e
    return wrapper

def get_url_path(url):
    if not url:
        return ""
    if urlparse:
        path = urlparse(url).path
    else:
        path = "/".join(url.split("/")[3:])
    if not path:  #没有path, 直接返回原url
        return url
    return path

def reg_search(reg_list, string):
    m = None
    for reg in reg_list:
        if isinstance(reg, re.Pattern):
            m: 're.Match' = re.search(reg, string)
        else:
            for _reg in (re.escape(reg), reg):
                m: 're.Match' = re.search(_reg, string)
                if m:
                    break
        if m:
            return m
    return m

def super_class(cls: type, self: object):
    """返回cls对应的super对象, 调用`super_class(cls, self).xxx()` 相当于调用 `cls.xxx(self)`
    - 适用于没有相同基类的多继承
    - 适用于在__init__中使用

    :param type cls: 父类
    :param object self: 实例
    :return super: super object
    """
    mro = self.__class__.mro()
    index = mro.index(cls)
    return super(mro[index-1], self)


class JsonLikeData(object):
    type = ""
    data = None
    def __init__(self, data) -> None:
        if isinstance(data, JsonLikeData):
            self.copy(data)
        elif isinstance(data, str):
            try:
                _data = json.loads(data)
                self.type = "json_str"
                self.data = JsonLikeData(_data)
            except:
                self.type = ""
                self.data = data
        elif isinstance(data, list):
            for i in range(len(data)):
                data[i] = JsonLikeData(data[i])
            self.type = "array"
            self.data = data
        elif isinstance(data, dict):
            for key in data:
                data[key] = JsonLikeData(data[key])
            self.type = "object"
            self.data = data
        else:
            self.data = data

    def copy(self, data: 'JsonLikeData'):
        self.type = data.type
        self.data = data.data
    
    @classmethod
    def extendJson(cls, data):
        # 把整个 JsonLikeData 展开成 json dict
        if isinstance(data, JsonLikeData):
            return JsonLikeData.extendJson(data.data)
        elif isinstance(data, list):
            data_array = []
            for i in range(len(data)):
                data_array.append(JsonLikeData.extendJson(data[i]))
            return data_array
        elif isinstance(data, dict):
            data_dict = {}
            for key in data:
                data_dict[key] = JsonLikeData.extendJson(data[key])
            return data_dict
        return data
    
    @classmethod
    def dumpsJson(cls, data):
        # 把整个 JsonLikeData 序列化成 json str
        if isinstance(data, JsonLikeData):
            if data.type == "json_str":
                _data = JsonLikeData.dumpsJson(data.data)
                return json.dumps(_data)
            return JsonLikeData.dumpsJson(data.data)
        elif isinstance (data, list):
            data_array = []
            for i in range(len(data)):
                data_array.append(JsonLikeData.dumpsJson(data[i]))
            return data_array
        elif isinstance(data, dict):
            data_dict = {}
            for key in data:
                data_dict[key] = JsonLikeData.dumpsJson(data[key])
            return data_dict
        return data
    
    def toValue(self):
        return JsonLikeData.dumpsJson(self)
    
    def __getattr__(self, __name: str):
        return self.data[__name]

    def __getitem__(self, __name: str):
        if __name.find(".") > 0:
            keys = __name.split(".")
            real_value = self.data
            for key in keys:
                real_value = real_value[key]
            return real_value
        else:
            return self.data[__name]

    def __setitem__(self, __name: str, __value) -> None:
        real_value = self[__name]
        real_value.copy(JsonLikeData(__value))
        

if __name__ == "__main__":
    import random
    loop=asyncio.new_event_loop()
    async def test1(i):
        ret = bool(i % 2)
        await asyncio.sleep(random.random())
        return False
    c = [test1(i) for i in range(10)]
    fut = async_race(*c, expected_result=True, loop=loop)
    print(loop.run_until_complete(fut))
    print(c)