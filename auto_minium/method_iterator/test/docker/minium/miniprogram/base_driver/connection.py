#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       connection_new.py
Create time:    2019/6/14 16:29
Description:

"""
import types
from typing import *
from typing_extensions import *
import time
import websocket
from websocket import WebSocketConnectionClosedException
import json
from .minium_log import MonitorMetaClass
from ...framework.exception import *
from uuid import uuid4
import threading
import logging
from asyncio.coroutines import iscoroutine
from ...utils.utils import ProcessSafeEventLoop, WaitThread, cost_debug
from ...utils.emitter import ee
from ...utils.meta import PropertyMeta
from .callback import Callback

CLOSE_TIMEOUT = 5
MAX_WAIT_TIMEOUT = 30
MAX_RETRY = 3
g_thread = None
logger = logging.getLogger("minium")


class DevToolMessage(dict):
    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise MiniNotAttributeError(name)

class BaseCommand(object, metaclass=PropertyMeta):
    _id = None
    """
    通信命令
    :method: 命令方法
    :params: 命令参数
    :desc: 命令超时时提醒信息
    """

    def __init__(
        self,
        method: str,
        params: dict = None,
        desc: str = None,
    ) -> None:
        self._id = None
        self.method = method
        self.params = params or {}
        self.desc = desc or f"call {method}"
        self._cancel = False

    """
    with BaseCommand(method, params) as cmd:
        cmd.id = "xxx"
        send(cmd)
    """
    def __enter__(self):
        return self
    
    def __exit__(self, ext_type, ext_value, ext_tb):
        self._cleanup(ext_type, ext_value, ext_tb)

    def __del__(self):
        self._cleanup()

    def _cleanup(self, *args):
        pass

    def dumps(self):
        return json.dumps(
            {"id": self.id, "method": self.method, "params": self.params},
            separators=(",", ":"),
        )
    
    @property
    def is_cancel(self):
        return self._cancel

    def cancel(self):
        self._cancel = True


class Command(BaseCommand):
    max_timeout = MAX_WAIT_TIMEOUT
    _id = None
    _has_response = False
    """
    通信命令
    :method: 命令方法
    :params: 命令参数
    :timeout: 命令返回时间，仅对同步指令有效
    :desc: 命令超时时提醒信息
    """

    def __init__(
        self,
        method: str,
        params: dict = None,
        max_timeout: int = None,
        desc: str = None,
    ) -> None:
        super().__init__(method, params, desc)
        self.max_timeout = max_timeout or Command.max_timeout
        self._has_response = False
        self.reason: Exception = None

    def on_connect_state_change(self, v, reason=MiniConnectionClosedError("connection break")):
        if not v:  # 下线
            self.reason = reason

    def on_id_change(self, value):
        """有设置id的情况, 代表指令是有"回复"的

        :param string v: id
        """
        self.has_response = True

    def on_has_response_change(self, value):
        if value:
            ee.on("connect_state_change", self.on_connect_state_change)
        else:
            ee.remove_listener("connect_state_change", self.on_connect_state_change)

    def _cleanup(self, *args):
        if self.has_response:
            self.has_response = False

    @classmethod
    def set_timeout(cls, timeout):
        cls.max_timeout = timeout


class AsyncCommand(BaseCommand):
    """异步命令"""
    def __init__(self, method: str, params: dict = None, desc: str = None) -> None:
        super().__init__(method, params, desc)
        self.result: Union[DevToolMessage, Exception] = None  # 命令返回结果

C = TypeVar('C', Command, AsyncCommand)

def json2obj(data):
    try:
        return json.loads(data, object_hook=DevToolMessage)
    except (TypeError, json.JSONDecodeError):
        return None


class Connection(object, metaclass=MonitorMetaClass):
    INSTANCES: Dict[str, Self] = {}
    @classmethod
    def create(cls, uri, *args, **kwargs):
        """根据instance.id控制生成单例

        :param str uri: uri
        :return Connection: 实例
        """
        instance = cls(uri, *args, **kwargs)
        instance_id = instance.id
        if instance_id in cls.INSTANCES:
            old_instance = cls.INSTANCES.pop(instance_id)
            old_instance.destroy()
            old_instance = None
        cls.INSTANCES[instance_id] = instance
        return instance

    @classmethod
    def delete(cls, instance_id: str):
        if instance_id in cls.INSTANCES:
            del cls.INSTANCES[instance_id]

    def __init__(self, uri, timeout=MAX_WAIT_TIMEOUT):
        super().__init__()
        self._id = str(id(self))
        self.logger = logger.getChild(f"Conn{self._id[-4:]}")
        self.observers = {}
        self.uri = uri
        self.timeout = timeout
        Command.set_timeout(self.timeout)
        self.__is_connected = False
        self.__close_reason: Exception = None  # None for connecting
        self._connect_time = time.time()
        self._last_reconnect_fail_time = time.time() - MAX_WAIT_TIMEOUT  # 最后一次重试失败时间. 用于快速返回失败结果
        self._last_reconnect_fail_reason = None
        self._is_close_on_my_own = False  # 链接是自己主动断开的, 主要标记是否进行链接重连
        self._is_close_by_cmd = False  # 通过命令关闭的, 标记是否进行链接重连 和 小程序重新拉起
        self._is_close_app_by_cmd = False  # 通过app.exit命令关闭小程序，标记是否进行小程序重新拉起
        self._is_reconnecting = threading.RLock()
        self._msg_lock = threading.Condition()
        self._ws_event_queue = dict()
        self._req_id_counter = int(time.time() * 1000) % 10000000000
        self._sync_wait_map = {}
        self._async_msg_map: dict[str, AsyncCommand] = {}
        self._method_wait_map = {}
        self._thread = None
        # event loop 用来处理on message回调中的异步函数
        self._event_loop = ProcessSafeEventLoop()
        try:
            self._connect()
        except MiniTimeoutError:
            if self._thread and self._thread.is_alive():  # 还在 run forever, 需要断开
                self.destroy()
            raise
        
    @property
    def id(self):
        """一个链接的唯一标识

        :return str: unique id
        """
        return self.uri

    @property
    def _is_connected(self):
        return self.__is_connected

    @_is_connected.setter
    def _is_connected(self, value):
        last_value = self.__is_connected
        self.__is_connected = value
        if last_value != value:
            ee.emit("connect_state_change", value, self.__close_reason)
            self.connect_state_change(value)
            if not value:  # 断连
                self._set_all_async_command_fail(self.__close_reason)

    @property
    def is_close_by_myself(self):
        """
        是不是自己关闭的连接，如果是，不需要进行自动重连处理
        """
        if (
            self._is_close_app_by_cmd
            or self._is_close_by_cmd
            or self._is_close_on_my_own
        ):
            return True
        return False
    
    @property
    def is_close_conn_by_myself(self):
        return self._is_close_by_cmd or self._is_close_on_my_own
    
    @property
    def is_close_app_by_myself(self):
        return self._is_close_app_by_cmd or self._is_close_by_cmd
    
    @property
    def is_reconnecting(self):
        if self.is_close_by_myself:
            return False
        if self._is_reconnecting.acquire(False):
            self._is_reconnecting.release()
            return False
        return True

    def __del__(self):
        # 清理异步命令存储
        for k in list(self._async_msg_map.keys()):
            self._async_msg_map.pop(k)
        self._is_close_on_my_own = True
        self._is_close_by_cmd = True
        self._is_close_app_by_cmd = True

    def register(self, method: str, callback: Union[Callable, Callback]):
        if method not in self.observers:
            self.observers[method] = []
        self.observers[method].append(callback)

    def remove(self, method: str, callback=None):
        if method in self.observers.keys():
            if callback is None:  # remove all callback
                del self.observers[method]
            elif callback in self.observers[method]:
                self.observers[method].remove(callback)
        else:
            self.logger.debug("remove key which is not in observers")

    def remove_all_observers(self):
        try:
            obs_list = [x for x in self.observers.keys()]
            for obs in obs_list:
                del self.observers[obs]
        except Exception as e:
            raise KeyError(e)

    def create_async_callback_task(self, callback: types.FunctionType, *args):
        # self.logger.warn("create_async_callback_task: %s" % callback.__name__)
        async def _callback(*_args):
            # self.logger.warn("@async call %s" % callback.__name__)
            try:
                ret = callback(*_args)
                if iscoroutine(ret):
                    return await ret
                return ret
            except Exception as e:
                self.logger.exception(f"call async function {callback.__name__} error, {_args}")
                raise
        self._event_loop.run_coroutine(_callback(*args))

    def notify(self, method: str, message):
        if method == "App.bindingCalled" and message["name"] in self.observers:
            for callback in self.observers[message["name"]]:
                if isinstance(callback, Callback):
                    self.create_async_callback_task(callback.callback, message['args'])
                elif callable(callback):
                    # callback(message)
                    self.create_async_callback_task(callback, message)
                else:
                    raise MiniNoncallableError(f"{str(callback)}(message={message})")
            return
        elif method in self.observers:
            for callback in self.observers[method]:
                if callable(callback):
                    # callback(message)
                    self.create_async_callback_task(callback, message)
                else:
                    raise MiniNoncallableError(f"{str(callback)}(message={message})")
        else:
            self.logger.warning(f'no observer listening event {message["name"] if method == "App.bindingCalled" else method}')
            return

    def _connect(self, timeout=MAX_WAIT_TIMEOUT):
        error_callback = Callback()
        close_callback = Callback()
        ee.once("ws_close", close_callback.callback)
        ee.once("ws_error", error_callback.callback)
        self._client = websocket.WebSocketApp(
            self.uri,
            on_open=self._on_open,
            on_message=self._on_message,
            on_error=self._on_error,
            on_close=self._on_close,
        )
        self._thread = WaitThread(target=self._ws_run_forever, args=())
        self._thread.daemon = True
        self._thread.start()

        s = time.time()
        while (time.time() - s < timeout) and self._thread.is_alive():
            if self._is_connected:
                self.logger.info("connect to WebChatTools successfully")
                self._connect_time = time.time()
                break
        else:
            if (
                not self._thread.is_alive()
                and self._thread.get_result(block=False) is True
            ):
                if error_callback.wait_called(0):  # on_error早于run_forever结束
                    raise error_callback.result
                raise MiniConnectSvrError("connect websocket server exception")
            raise MiniTimeoutError(
                "connect to server timeout: %s, thread:%s"
                % (self.uri, self._thread.is_alive())
            )

    def _ws_run_forever(self):
        try:
            return self._client.run_forever()
        except Exception as e:
            self.logger.exception(e)
            self.__close_reason = MiniConnectionClosedError(str(e))
            self._is_connected = False
            return True
        finally:
            self.logger.info("websocket run forever shutdown")

    def _send(self, message):
        """发送消息

        :param str message: 消息
        :return bool: true 发送成功, false 发送失败
        """
        if self._client and self._client.sock:
            try:
                self._client.send(message)
                return True
            except WebSocketConnectionClosedException as e:
                if self.reconnect(time.time()):
                    self.logger.debug("RESEND > %s" % message)
                    self._client.send(message)
                    return True
                return False
        elif self._client and not self._client.sock:  # 断连了
            if self.reconnect(time.time()):
                self.logger.debug("RESEND > %s" % message)
                self._client.send(message)
                return True
            return False
        return False

    def _wait(self, cmd: Command):
        stime = time.time()
        self._msg_lock.acquire()
        self._msg_lock.wait(cmd.max_timeout)  # 如果是因为其他命令的返回触发了notify，需要重新等待
        self._msg_lock.release()
        etime = time.time()
        if etime - stime >= cmd.max_timeout:
            cmd.max_timeout = 0
        else:
            cmd.max_timeout = cmd.max_timeout - (etime - stime)  # 剩余要等待的时间

    def _notify(self):
        self._msg_lock.acquire()
        self._msg_lock.notify_all()  # 全部唤醒，让其自己决定是否需要重新wait
        self._msg_lock.release()

    def _safely_send(self, cmd: Command, sync=True):
        """发送前检查链接状态

        :param Command message: 命令
        :return None:
        :raise MiniConnectionClosedError:
        """
        message = cmd.dumps()
        self.logger.debug(f'{"SEND" if sync else "ASYNC_SEND"} > [{self._id}]{message}')
        if not self._send(message) and not self._is_connected:
            raise MiniConnectionClosedError("send message[%s] fail because connection is not established" % cmd.id)

    def _gen_command(self, method: Union[str, C], params=None, max_timeout=None, sync=True) -> C:
        if sync:
            if isinstance(method, Command):
                cmd = method
            elif isinstance(method, AsyncCommand):
                cmd = Command(method.method, method.params, desc=method.desc)
            else:
                cmd = Command(method, params, max_timeout)
        else:
            if isinstance(method, AsyncCommand):
                cmd = method
            elif isinstance(method, Command):
                cmd = AsyncCommand(method.method, method.params, desc=method.desc)
                del method  # 删除监听函数
            else:
                cmd = AsyncCommand(method, params)
        if not cmd.id:
            cmd.id = str(uuid4())
        return cmd

    def send(self, method: Union[str, Command], params=None, max_timeout=None):
        # 同步发送消息，函数会阻塞
        cmd: Command = self._gen_command(method, params, max_timeout)
        with cmd:
            self._sync_wait_map[cmd.id] = None  # 该ID未有返回message
            self._safely_send(cmd)
            return self._receive_response(cmd)

    def send_async(self, method: Union[str, AsyncCommand], params=None, ignore_response=False) -> str:
        cmd: AsyncCommand = self._gen_command(method, params, sync=False)
        if not ignore_response:
            self._async_msg_map[cmd.id] = cmd
        try:
            self._safely_send(cmd, sync=False)
        except MiniConnectError:
            if not ignore_response:
                self._async_msg_map.pop(cmd.id)
            del cmd
            raise
        return cmd.id

    def _receive_response(self, cmd: Command):
        # 等待接收到message的通知
        while cmd.max_timeout > 0:
            self._wait(cmd)

            if (
                cmd.id in self._sync_wait_map
                and self._sync_wait_map[cmd.id] is not None
            ):  # 获取到了数据
                response = self._sync_wait_map.pop(cmd.id)
                if isinstance(response, MiniAppError):
                    raise response
                return response
            elif cmd.method.startswith("Tool.") and self.is_close_conn_by_myself:
                if cmd.reason:
                    raise MiniConnectionClosedError("close by myself") from cmd.reason
                raise MiniConnectionClosedError("close by myself")
            elif self.is_close_app_by_myself:
                raise MiniClientOfflineError("client close by myself")
            elif cmd.max_timeout > 0:  # 线程是被其他消息唤醒，重新等待
                self.logger.debug("rewait for %s" % cmd.id)
                continue
            else:
                if cmd.id in self._sync_wait_map:
                    del self._sync_wait_map[cmd.id]
                if cmd.reason and isinstance(cmd.reason, MiniConnectionClosedError):
                    raise MiniTimeoutCauseByConnectionBreakError(
                        f"[{cmd.id}][{cmd.desc}] command timeout cause by {cmd.reason}"
                    )
                raise MiniTimeoutError(
                    f"[{cmd.id}][{cmd.desc}] receive from remote timeout"
                )

    def before_reconnect(self):
        time.sleep(0.1)

    def after_reconnect(self):
        pass

    def connect_state_change(self, value):
        if value is False and not self.is_close_by_myself:  # 原本已经链接上了, 并且不是自己关闭的链接
            threading.Thread(
                target=self.reconnect,
                args=(time.time(),),
                daemon=True,
                name="reconnect cause close",
            ).start()

    def _handle_connection_refused(self, retry):
        """connection refused对于不同环境需要有不同处理

        :param int retry: 当前重试次数
        """
        if retry >= MAX_RETRY:
            ee.emit("ide_closed", time.time())  # 多次refused, 并出现在reconnect中, 很可能是ide被close了
            raise MiniConnectSvrError("ConnectionRefused")
        time.sleep(5)

    def reconnect(self, optime=None, *args):
        RETRY_TIME = MAX_RETRY * MAX_WAIT_TIMEOUT + time.time()  # 最大重连尝试时间
        if self._is_close_on_my_own or self._is_close_by_cmd:
            return False
        if optime and optime < self._connect_time:
            return True
        if optime and optime < (self._last_reconnect_fail_time + MAX_WAIT_TIMEOUT):
            self.logger.warning("reconnect fast return False")
            # 加一个重连的冷却时间
            return False      
        # 等待其他线程重连
        if not self._is_reconnecting.acquire(False):
            t = threading.currentThread()
            self.logger.warning(
                "thread[%s:%s] reconnecting, wait for reconnection"
                % (t.getName(), t.ident)
            )
            if not self._is_reconnecting.acquire(
                timeout=MAX_RETRY * MAX_WAIT_TIMEOUT + 10
            ):  # 理论上应该能获取到锁的
                return False
            self.logger.warning(
                "another thread reconnect finish connected: " + str(self._is_connected)
            )
            self._is_reconnecting.release()
            if not self._is_connected:
                raise MiniReConnectSvrError("reconnect fail")
            return True
        if self._client:
            self._client.close()  # 先close一下
        retry = 0
        try:
            self.logger.warning("connection reconnect")
            self._last_reconnect_fail_reason = None
            self.before_reconnect()
            while time.time() < RETRY_TIME and not self.is_close_by_myself:
                try:
                    self._is_connected = False
                    self._connect(MAX_WAIT_TIMEOUT)
                    if self._is_connected:
                        return True
                    self.logger.warning("connection reconnect fail")
                    self._last_reconnect_fail_time = time.time()
                    self._last_reconnect_fail_reason = MiniTimeoutError("connect timeout")
                    return False
                except ConnectionRefusedError as cre:
                    self._last_reconnect_fail_reason = cre
                    retry += 1
                    self.logger.warning("connect refused, please check svr")
                    if time.time() < RETRY_TIME:
                        self._handle_connection_refused(retry)
                    continue
                except MiniTimeoutError as te:
                    self._last_reconnect_fail_reason = te
                    retry += 1
                    if retry >= MAX_RETRY:
                        break
                    self.logger.error("wait onopen timeout")
                    continue
                except MiniConnectSvrError as mcse:
                    self._last_reconnect_fail_reason = mcse
                    retry += 1
                    self.logger.error(mcse)
                    if retry >= MAX_RETRY:
                        break
                    if time.time() < RETRY_TIME:
                        time.sleep(2)
                    continue
                except Exception as e:
                    self._last_reconnect_fail_reason = e
                    retry += 1
                    self.logger.exception("reconnect error: %s", str(e))
                    time.sleep(10)
                    continue
        except Exception:
            self.logger.warning("connection reconnect fail")
            self._last_reconnect_fail_time = time.time()
            return False
        finally:
            self._is_reconnecting.release()
            self.after_reconnect()
        self.logger.warning("connection reconnect fail")
        self._last_reconnect_fail_time = time.time()
        return False

    def wait_reconnect(self, timeout=None) -> Optional[Exception]:
        wait_time = MAX_RETRY * MAX_WAIT_TIMEOUT + 10 if timeout is None else timeout
        if not self._is_reconnecting.acquire(timeout=wait_time):
            return TimeoutError(f"connection did not reconnect within {wait_time} seconds")
        self._is_reconnecting.release()
        if not self._is_connected:
            return self._last_reconnect_fail_reason or MiniReConnectSvrError("reconnect fail")

    def _on_close(self, *args):
        if args and isinstance(args[0], websocket.WebSocketApp):
            args = args[1:]
        ee.emit("ws_close", args)
        self.__close_reason = MiniConnectionClosedError(
            "connection close: code[%s] reason[%s]" % args
            if len(args) == 2
            else "connection close"
        )
        self._is_connected = False

    def _on_error(self, error, *args):
        if args:
            # 会传 ws 实例的情况
            error = args[0]
        ee.emit("ws_error", error)
        if "Connection is already closed" in str(error):
            self.logger.warning(error)
            return
        self.logger.error(error)
        self.__close_reason = MiniConnectionClosedError("connection error: " + str(error))
        self._is_connected = False

    def _on_open(self, *args):
        self.__close_reason = None
        self._is_connected = True

    @cost_debug(1)
    def __on_message(self, message, *args):
        """
        1. _on_message 调用都会在同一个线程
        2. 线程的阻塞不会导致接收消息失败, 但会影响处理消息速度(即消息不会丢, 但会慢)
        3. 有些ws的库会传ws实例！至今不懂为什么有些会有些不会，先兼容一下
        """
        if args:
            # 会传 ws 实例的情况
            message = args[0]
        self.logger.debug("RECV < [%s]%.512s" % (self._id, message))  # max len 512
        ret_json = json2obj(message)
        if isinstance(ret_json, dict):
            if "id" in ret_json:  # response
                req_id = ret_json["id"]
                if "error" in ret_json and "message" in ret_json["error"]:
                    err_msg = ret_json["error"]["message"]
                    if err_msg:  # 生成错误实例
                        self.logger.error(f"[{req_id}]: {err_msg}")
                        if err_msg.find("unimplemented") > 0:
                            self.logger.warn(
                                f"{err_msg}, It may be caused by the low sdk version"
                            )
                            ret_json = MiniLowVersionSdkError(err_msg, msg_id=req_id)
                        elif err_msg == "Remote debug connection lost":
                            if self._is_close_app_by_cmd:
                                # 主动关闭小程序可能会导致丢失链接
                                ret_json = json2obj('{"id":"%s","result":{}}' % req_id)
                            else:
                                ret_json =  RemoteDebugConnectionLost(err_msg, msg_id=req_id)
                        elif err_msg == "page destroyed":
                            ret_json = PageDestroyed(err_msg, msg_id=req_id)
                        else:
                            ret_json = MiniCommandError(err_msg, msg_id=req_id)
                    else:
                        ret_json = MiniCommandError(err_msg, msg_id=req_id)
                if req_id in self._sync_wait_map:
                    self._sync_wait_map[req_id] = ret_json
                    self._notify()
                else:
                    self._handle_async_msg(req_id, ret_json)
            else:
                if "method" in ret_json and ret_json["method"] in self._method_wait_map:
                    self._method_wait_map[ret_json["method"]] = ret_json
                    self._notify()

                if "method" in ret_json and "params" in ret_json:
                    # self._push_event(ret_json["method"], ret_json["params"])
                    self.notify(ret_json["method"], ret_json["params"])

    def _on_message(self, message, *args):
        return self.__on_message(message, *args)

    def _handle_async_msg(self, req_id, ret_json):
        self.logger.info("received async msg: %s%s", req_id, "" if req_id in self._async_msg_map else ", maybe command ignore response")
        if ret_json is None:
            self.logger.warning("async msg[%s] response is None" % req_id)
        if ee.emit(req_id, ret_json):  # 有监听回调
            if req_id in self._async_msg_map:
                self._async_msg_map.pop(req_id)
        elif req_id in self._async_msg_map:  # 是这个实例发出的指令
            self._async_msg_map[req_id].result = ret_json

    def _set_all_async_command_fail(self, error: Exception):
        for cid in list(self._async_msg_map.keys()):
            self._handle_async_msg(cid, error)

    def _set_command_fail(self, cmd_id: str, error: MiniAppError):
        """如果指令未有返回, 设置成 error """
        if cmd_id in self._sync_wait_map:
            if self._sync_wait_map[cmd_id] is not None:
                return
            self._sync_wait_map[cmd_id] = error
            self._notify()
        elif cmd_id in self._async_msg_map:
            if self._async_msg_map[cmd_id].result is not None:
                return
            self._handle_async_msg(cmd_id, error)

    def _push_event(self, method, params):
        if method in self._ws_event_queue:
            self._ws_event_queue[method].append(params)
        else:
            self._ws_event_queue[method] = [params]

    def destroy(self):
        if self._is_close_on_my_own:
            self.logger.debug("already destroy")
            return
        self.logger.error("断开连接")
        self._is_close_on_my_own = True
        self._client.close()
        self._notify()
        self._set_all_async_command_fail(MiniConnectionClosedError("connection destroy"))
        if self._thread:
            self._thread.join(CLOSE_TIMEOUT)
        if self._event_loop.is_running():
            self._event_loop.stop_loop()
        self.__class__.delete(self.id)

    def wait_for(self, method: Union[str, Command], max_timeout=None):
        if isinstance(method, Command):
            cmd = method
        else:
            cmd = Command(method, max_timeout=max_timeout)
        if cmd.method in self._method_wait_map and self._method_wait_map.get(
            cmd.method, None
        ):  # 已经有监听到并没被删除（一般只有别的线程同样在等这个方法，但又还没响应才会命中，兜底逻辑）
            return True
        self._method_wait_map[cmd.method] = None
        while cmd.max_timeout > 0:
            self._wait(cmd)
            if cmd.method in self._method_wait_map and self._method_wait_map.get(
                cmd.method, None
            ):
                del self._method_wait_map[cmd.method]
                return True
            if cmd.is_cancel:
                return False
            if cmd.method.startswith("Tool.") and not self.is_close_conn_by_myself:
                continue
            if self.is_close_by_myself:
                return False
        self.logger.error("Can't wait until %s" % cmd.method)
        return False

    def get_aysnc_msg_return(self, msg_id=None):
        if not msg_id:
            self.logger.warning(
                "Can't get msg without msg_id, you can get msg_id when calling send_async()"
            )
            return None
        if msg_id in self._async_msg_map and isinstance(self._async_msg_map[msg_id], AsyncCommand):
            response = self._async_msg_map[msg_id].result
            if response is not None:
                self._async_msg_map.pop(msg_id)
            if isinstance(response, (MiniAppError, MiniConnectError)):
                raise response
            return response
        return None
