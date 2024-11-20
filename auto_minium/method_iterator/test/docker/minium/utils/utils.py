#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         yopofeng
Filename:       utils.py
Create time:    2021/9/24 21:21
Description:

"""
import time
import typing
from typing import *
import types
import platform
import re
import sys
import inspect
import threading
import logging
import os
import asyncio
import functools
import concurrent.futures
import json
import socket
import subprocess
from .lazyloader import lazy_import
def unquote(string):
    return string.replace('+', ' ').replace("%2F", "/").replace("%7E", "~")

urlparse = None
try:
    import urllib
    urlencode = urllib.urlencode
    unquote = urllib.unquote
except AttributeError:
    from urllib.parse import urlencode
    from urllib.parse import unquote
    from urllib.parse import urlparse
except ImportError:
    try:
        from urllib3.request import urlencode
    except ModuleNotFoundError:  # 2.0.2 后改了
        raise RuntimeError("maybe you should install urllib3<2.0")

logger = logging.getLogger("minium")


def timeout(duration, interval=1):
    """
    重试超时装饰器,在超时之前会每隔{interval}秒重试一次
    注意：被修饰的函数必须要有非空返回,这是重试终止的条件！！！
    :param duration: seconds
    :return:
    """

    def spin_until_true(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            timeout = time.time() + duration
            execed = False
            r = None
            while not (r or timeout < time.time() and execed):
                r = func(*args, **kwargs)
                execed = True
                if r or timeout < (time.time() + interval):  # +interval可以不需要浪费时间 sleep, 下一次循环肯定会跳出
                    return r
                time.sleep(interval)
            return r

        return wrapper

    return spin_until_true


def retry(cnt, expected_exception=None, report: types.FunctionType=None):
    """
    重试固定次数装饰器, 被修饰函数没有raise error则直接返回, 有则最多执行${cnt}次
    :cnt: 重试次数，函数最多被执行 ${cnt} 次
    :expected_exception: 命中预期的错误(isinstance(e, expected_exception))才重试, None为所有错误
    :report: 重试成功后上报
    """
    def try_until_no_error(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            _cnt = 0
            while _cnt < cnt:
                try:
                    _cnt += 1
                    ret = func(*args, **kwargs)
                except:
                    if _cnt >= cnt:
                        raise
                    e = sys.exc_info()[1]
                    if expected_exception is None or isinstance(e, expected_exception):
                        logger.warning(
                            f'{f"第 {_cnt} 次" if _cnt < cnt else "最后一次"}重新运行{func.__name__}'
                        )
                        logger.info(f'原因: {e.__class__.__name__}{str(e.args)}')
                        continue
                    raise
                else:
                    if report and _cnt > 1:
                        report(_cnt, func.__name__)
                    return ret
        return wrapper
    return try_until_no_error


CatchableType = typing.Union[types.FunctionType, types.MethodType]


@overload
def catch(wrapped: CatchableType, *args: typing.Tuple[Exception, ...]) -> CatchableType:
    ...


@overload
def catch(*args: typing.Tuple[Exception, ...]) -> CatchableType:
    ...


def catch(*args):
    """
    抓获指定/所有exception
    :wrapped: 被修饰的函数, 如果为空则作为修饰器使用
    :expected_exception: 指定/所有exception
    :return: Exception/None

    etc.
    @catch
    def catchAllException():
        raise Exception("test")

    @catch(ValueError, RuntimeError)
    def catchValueAndRuntimeError():
        raise ValueError("test")

    def raiseValueError():
        raise ValueError("test")
    catch(raiseValueError)() -> ValueError("test")
    catch(raiseValueError, ValueError)() -> ValueError("test")
    catch(raiseValueError, ValueError, RuntimeError)() -> ValueError("test")
    catch(ValueError, RuntimeError)(raiseValueError)() -> ValueError("test")
    catch(raiseValueError, RuntimeError)() -> raise ValueError("test")
    """
    wrapped = None
    expected_exception = None
    if len(args) == 0:
        expected_exception = None
    elif len(args) >= 1:
        if inspect.isfunction(args[0]) or inspect.ismethod(args[0]):
            wrapped = args[0]
            expected_exception = args[1:] or None
        else:
            expected_exception = args

    def try_catch(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                func(*args, **kwargs)
            except:
                e = sys.exc_info()[1]
                if expected_exception is None or isinstance(e, expected_exception):
                    logger.error("catch error: %s", e)
                    return e
                raise

        return wrapper

    if wrapped:
        return try_catch(wrapped)
    # 修饰器用法
    return try_catch


class WaitTimeoutError(TimeoutError):
    pass


TimeoutErrors = (TimeoutError, WaitTimeoutError, asyncio.exceptions.TimeoutError)


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
        self._exception: BaseException = None
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
            raise WaitTimeoutError("wait [%s] seconds timeout" % timeout)
        return self._result


def wait(timeout, default=None):
    """
    等待修饰器
    等待timeout时间, 如果函数没有返回则返回default
    """

    def spin_until_true(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            t = WaitThread(target=func, args=args, kwargs=kwargs)
            t.setDaemon(True)
            t.start()
            try:
                return t.get_result(timeout)
            except WaitTimeoutError:
                logger.error("wait %s %ss timeout" % (func.__name__, timeout))
                return default

        return wrapper

    return spin_until_true


_platform = platform.platform()
isWindows = "Windows" in _platform
isMacOS = "Darwin" in _platform or "macOS" in _platform


class Version(object):
    def __init__(self, version: str) -> None:
        m = re.match(r"^([0-9\.]+|latest|dev|trial)", version or "")
        if not m:
            raise ValueError(f"{version} format not collect")
        self.version = "latest" if m.group(1) in ("latest", "dev", "trial") else m.group(1)

    def __str__(self) -> str:
        return self.version

    def __comp_version(self, a: str, b: str) -> int:
        """
        description: 对比基础库版本
        param {*} self
        param {str} a
        param {str} b
        return {int} 1 if a > b, 0 if a == b ,-1 if a < b
        """
        latest = ("latest", "dev")  # latest, dev版本看作是最大的版本号
        if a in latest:
            return 0 if b in latest else 1
        if b in latest:
            return 0 if a in latest else 1
        i = 0
        a = a.split(".")
        b = b.split(".")
        while i < len(a) and i < len(b):
            if int(a[i]) > int(b[i]):
                return 1
            elif int(a[i]) < int(b[i]):
                return -1
            i += 1
        return 0

    def __lt__(self, version):
        if isinstance(version, str):
            version = Version(version)
        if self.__comp_version(self.version, version.version) == -1:
            return True
        return False

    def __gt__(self, version):
        if isinstance(version, str):
            version = Version(version)
        if self.__comp_version(self.version, version.version) == -1:
            return False
        return True

    def __le__(self, version):
        if isinstance(version, str):
            version = Version(version)
        if self.__comp_version(self.version, version.version) != 1:
            return True
        return False

    def __ge__(self, version):
        if isinstance(version, str):
            version = Version(version)
        if self.__comp_version(self.version, version.version) != -1:
            return True
        return False

    def __eq__(self, version):
        if isinstance(version, str):
            version = Version(version)
        return self.version == version.version


def add_path_to_env(path: str):
    """
    把路径添加到PATH环境变量中
    """
    SPLIT = ":" if isMacOS else ";"
    _path = path if os.path.isdir(path) else os.path.dirname(path)
    env_paths = (os.environ["PATH"] or "").split(SPLIT)
    if _path not in env_paths:
        env_paths.append(_path)
    os.environ["PATH"] = SPLIT.join(env_paths)


class ProcessSafeEventLoop(object):
    def __init__(self) -> None:
        self.pid = os.getpid()
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


Future = typing.Union[asyncio.futures.Future, concurrent.futures.Future]
EventLoop = typing.Union[ProcessSafeEventLoop, asyncio.BaseEventLoop]


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
            __v = self.__class__(__v)
        if isinstance(__v, list):
            for index, v in enumerate(__v):
                if isinstance(v, dict):
                    __v[index] = self.__class__(v)
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
        @functools.wraps(func)
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

if typing.TYPE_CHECKING:
    import cv2
else:
    cv2 = lazy_import("cv2")


def mark_tap_point(img_path: str, point: typing.Tuple, offset_y=0):
    if not cv2:
        return False
    # print("@mark_tap_point paint %d, %d, %d" % (int(point[0]), int(point[1]), offset_y))
    img = cv2.imread(img_path)
    cv2.circle(img, (int(point[0]), int(point[1] + offset_y)), 20, (255, 0, 0), -1)
    cv2.imwrite(img_path, img)
    return True

# 根据给定矩形信息裁剪图片
def crop_img(img_path: str, rect: typing.Tuple):
    """根据给定矩形信息裁剪图片

    :param str img_path: 图片路径
    :param typing.Tuple rect: x,y,w,h. w 默认img.shape[1] - x, h 默认img.shape[0] - y
    :return _type_: _description_
    """
    if not cv2:
        return False
    img = cv2.imread(img_path)
    x, y, w, h = rect
    if w is None:
        w = img.shape[1] - x
    if h is None:
        h = img.shape[0] - y
    img = img[y:y + h, x:x + w]
    cv2.imwrite(img_path, img)
    # cv2.imwrite(os.path.join(os.path.dirname(img_path), "tmp.png"), img)
    return True


def do_shell(cmd):
    process = subprocess.Popen(
        cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True,
    )
    output = process.communicate()[0].strip()
    if isinstance(output, bytes):
        return str(output, encoding="utf-8")
    else:
        return str(output)
    
def is_url(string):
    if urlparse:
        try:
            result = urlparse(string)
            if not result.scheme or not result.netloc:
                raise ValueError("invalid url")
            return (f"{result.scheme}://{result.netloc}{result.path}", result.query)
        except ValueError:
            return None
    regex = re.compile(
        r'(^(?:http|ftp)s?://'  # http:// 或 https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # 域名
        r'localhost|'  # 或者是localhost
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # 或者是IPv4地址
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # 或者是IPv6地址
        r'(?::\d+)?'  # 可选的端口号
        r'(?:/?|[/?])[^?#]+)'  # path
        r'(\?[^#]*)?'  # query
        r'(#\S*)?$', re.IGNORECASE)
    m = regex.match(string)
    return m and (m.group(1), m.group(2)[1:] if m.group(2) else '')

def parse_query(query_str: str) -> dict:
    """解析query字符串, 需要解析urlencoded格式"""
    ret = {}
    for item in query_str.split("&"):
        if not item:
            continue
        k, v = item.split("=")
        ret[k] = unquote(v)
    return ret

def split_url(url: str) -> Tuple[str, dict]:
    """拆分 url, 返回 (path, query)"""
    _is_url = is_url(url)
    if not _is_url:
        return url, {}
    return _is_url[0], parse_query(_is_url[1])


if __name__ == "__main__":
    offset = 298
    crop_img("/Users/yopofeng/workspace/minium/minitest-demo/testcase/outputs/20231218174636/test_allow_get_location/20231218174935948727/images/1702892976.png", [0, 154, None, None])
    crop_img("/Users/yopofeng/workspace/minium/minitest-demo/testcase/outputs/20231218174636/test_allow_get_user_info/20231218174944858842/images/1702892985.png", [0, 0, None, 154])
