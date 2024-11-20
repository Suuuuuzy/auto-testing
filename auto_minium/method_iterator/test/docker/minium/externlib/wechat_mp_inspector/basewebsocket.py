import websocket
from websocket import WebSocketBadStatusException
from .utils import *
from .emitter import ee
from asyncio.coroutines import iscoroutine
from enum import Enum

logger = logging.getLogger("WMI")

MAX_WAIT_TIMEOUT = 30  # 指令默认等待回复时间
MAX_RETRY = 2  #  重连的情况, 最大重试的次数
OPEN_TIMEOUT = 10  # 等待ws on_open
CLOSE_TIMEOUT = 5  # 等待ws on_close


class STATE(Enum):
    CLOSE = 1  # 链接关闭
    OPEN = 2  # 链接连通
    PEDING = 3  # 链接连接中
    RECONNECTING = 4  # 重新链接中
    INIT = 5


class BaseEvent(object):
    """
    server端返回的通知事件
    """

    def __init__(self, event_name, params={}) -> None:
        self.event_name = event_name
        self.params = params

class StateChangeEvent(BaseEvent):
    def __init__(self, value: bool) -> None:
        super().__init__("ConnectionStateChange", value)


class BaseCommand(object):
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

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, v):
        _id = self._id
        self._id = v
        if v != _id:
            self.on_id_change(v)

    def on_id_change(self, v):
        pass


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
        *,
        conn_id: str = ""
    ) -> None:
        super().__init__(method, params, desc)
        self.max_timeout = max_timeout or Command.max_timeout
        self._has_response = False
        self.reason: Exception = None
        self.conn_id = conn_id

    def on_connect_state_change(
        self, v, reason=ConnectionAbortedError("connection break")
    ):
        if not v:  # 下线
            self.reason = reason

    @property
    def has_response(self):
        return self._has_response

    @has_response.setter
    def has_response(self, v):
        _has_response = self._has_response
        self._has_response = v
        if v != _has_response:
            self.on_has_response_change(v)

    def on_id_change(self, value):
        """有设置id的情况, 代表指令是有"回复"的

        :param string v: id
        """
        self.has_response = True

    def on_has_response_change(self, value):
        if value:
            ee.on("connect_state_change" + self.conn_id, self.on_connect_state_change)
        else:
            ee.remove_listener("connect_state_change" + self.conn_id, self.on_connect_state_change)

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
        self.result = None  # 命令返回结果

class TestLink(object):
    """当出现时间超长的请求时, 试试重新建立链接, 以证明是不是inspector卡住了"""
    def __init__(self, url) -> None:
        self._url = url
        self._id = str(id(self))[-4:]
        self.is_connected = False
        self.logger = logger.getChild("TestLink")
        self.client = websocket.WebSocketApp(
            url,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close,
        )
        self.test_response = None
        self.run_forever()
        t = threading.Timer(5, self.check)
        t.setDaemon(True)
        t.start()

    def check(self):
        self.logger.info("🚀🚀🚀check result🚀🚀🚀")
        if self.is_connected is False:
            self.logger.info(f"connect {self._url} fail")
            return
        self.logger.info("connect success")
        if self.test_response is None:
            self.logger.info(f"receive response fail: {self._id}")
            return
        self.logger.info("receive response success")
        self.client.close()

    def run_forever(self):
        threading.Thread(target=self.client.run_forever, daemon=True).start()

    def on_open(self, *args):
        self.logger.info("connection opened")
        self.is_connected = True
        message = '{"id":%s,"method":"Runtime.evaluate","params":{"expression":"new Promise(rs=>setTimeout(()=>rs(1000), 1000))","includeCommandLineAPI":true,"returnByValue":true,"awaitPromise":true}}' % self._id
        self.logger.info(f"SEND > {message}")
        self.client.send(message)

    def on_error(self, ws, error, *args):
        self.logger.error("error: %s" % str(error))

    def on_message(self, ws, message):
        self.logger.info("RECV < %s" % message)
        message = json.loads(message)
        if message.get("id") == self._id:
            self.test_response = message

    def on_close(self, ws, *args):
        self.logger.info(f"closed: {args}")
        self.is_connected = False


from websockets.sync.client import connect
_id = 0
def test_link(url):
    global _id
    _id += 1
    with connect(url, logger=logger) as ws:
        logger.info(f"connect opened")
        message = '{"id":%s,"method":"Runtime.evaluate","params":{"expression":"new Promise(rs=>setTimeout(()=>rs(1000), 1000))","awaitPromise":true}}' % _id
        logger.info(f"SEND > {message}")
        ws.send(message)
        rec_message = ws.recv(timeout=5)
        logger.info(f"RECV < {rec_message}")

class BaseWebSocket(object):
    """
    重新封装一下cdp的websocket driver
    """

    INSTANCES = {}  # 控制生成单实例
    _state = STATE.CLOSE  # 默认链接状态close
    _url = None  # debugger_url可能再new中生成了
    _unique_id = None
    _is_connected = False  # 默认链接状态false
    _auto_reconnect = True

    def __new__(
        cls, debugger_url, *args, unique_id=None, auto_reconnect=True, msg_max_wait_time=Command.max_timeout, **kwargs
    ):
        if not debugger_url:
            debugger_url = cls.get_debugger_url(*args, **kwargs)
        if unique_id is None:  # 没有自定义的unique socket id
            unique_id = debugger_url
        INSTANCES = cls.INSTANCES
        if unique_id in INSTANCES:
            inst = INSTANCES[unique_id]
            if inst._state != STATE.CLOSE:
                return inst  # 使用旧的实例
            # 缓存的实例没有链接
            inst.destroy()
            INSTANCES[unique_id] = inst  # 不改变实例, 直接重新init
            return inst
            if unique_id in INSTANCES:
                INSTANCES.pop(unique_id)
        inst = object.__new__(cls)
        inst._url = debugger_url
        inst._unique_id = unique_id
        inst._auto_reconnect = auto_reconnect
        INSTANCES[unique_id] = inst
        return inst

    @classmethod
    def get_debugger_url(cls, *args, **kwargs):
        """获取debugger url的方法, 子类需要分别实现

        :raises NotImplementedError: 默认未实现
        """
        raise NotImplementedError(
            "%s 未实现`get_debugger_url`方法, 不支持自动获取debugger url" % cls.__name__
        )

    def __init__(
        self, debugger_url, *args, unique_id=None, auto_reconnect=True, msg_max_wait_time=Command.max_timeout, **kwargs
    ) -> None:
        if self._state != STATE.CLOSE:  # 有已经链接的实例
            return
        self._id = str(id(self))
        self.logger = logger.getChild(f"Conn{self._id[-4:]}")
        self._state = STATE.CLOSE
        self._url = debugger_url or self._url
        self.logger.info(f"{self._unique_id}: {self._url}")
        self._msg_id = int(self._id[-4:])
        self._msg_id_lock = threading.Lock()
        self._msg_max_wait_time = msg_max_wait_time
        self._is_connected = False  # ws链接状态
        # self._auto_reconnect = auto_reconnect  # 自动重连
        self._close_reason = None  # ws链接关闭原因, None for connecting
        self._connect_time = time.time()  # 上一次链接上的时间, 默认当前
        self._is_close_on_my_own = False  # 链接是自己主动断开的, 主要标记是否进行链接重连
        self._is_reconnecting = threading.RLock()  # 正在重连锁
        self._msg_lock = threading.Condition()  # 信息锁
        self._sync_wait_map = {}  # 同步消息kv表, id -> result
        self._async_msg_map = {}  # 异步命令kv表, id -> AsyncCommand
        self._method_wait_map = {}  # 等待命令kv表, method -> result
        self._observers = {}  # 监听表, method -> handler(callback function)
        self._thread = None
        # event loop 用来处理on message回调中的异步函数
        self._event_loop = ProcessSafeEventLoop()

        self._last_reconnect_fail_time = (
            time.time() - OPEN_TIMEOUT
        )  # 最后一次重试失败时间. 用于快速返回失败结果
        self._last_reconnect_fail_reason = None

        self._connect()

    def __del__(self):
        self.destroy()

    @property
    def id(self):
        """一个链接的唯一标识

        :return str: unique id
        """
        return self._unique_id

    @property
    def is_connected(self):
        return self._is_connected

    @is_connected.setter
    def is_connected(self, value):
        last_value = self._is_connected
        self._is_connected = value
        self._state = STATE.OPEN if value else STATE.CLOSE
        if last_value != value:
            ee.emit("connect_state_change"+self._id, value, self._close_reason)
            self.connect_state_change(value)
            if not value:  # 断连
                self._set_all_async_command_fail(self._close_reason)

    def get_command_id(self):
        """生成命令id

        :return int: 唯一的命令id
        """
        with self._msg_id_lock:
            self._msg_id += 1
            return self._msg_id

    def connect_state_change(self, value):
        if (
            value is False and not self.is_close_by_myself and self._auto_reconnect
        ):  # 原本已经链接上了, 并且不是自己关闭的链接
            self._state = STATE.RECONNECTING

            def _reconnect(optime):
                if not self._reconnect(optime):
                    self._state = STATE.CLOSE
                self._state = STATE.OPEN if self._is_connected else STATE.CLOSE

            threading.Thread(
                target=_reconnect,
                args=(time.time(),),
                daemon=True,
                name="reconnect cause close",
            ).start()
        elif value is False:
            self._notify()
        self.notify(StateChangeEvent(value))

    @property
    def is_close_by_myself(self):
        """
        是不是自己关闭的连接，如果是，不需要进行自动重连处理
        """
        if self._is_close_on_my_own:
            return True
        return False

    def close(self):
        """关闭链接, 下次可以直接重连使用"""
        self.logger.info("断开连接")
        self._state = STATE.CLOSE
        if self._client:
            self._client.close()
        self._notify()
        self._set_all_async_command_fail(ConnectionAbortedError("connection destroy"))

    def destroy(self):
        """销毁链接"""
        self._state = STATE.CLOSE
        if self._unique_id in self.__class__.INSTANCES:
            self.__class__.INSTANCES.pop(self._unique_id)
        if self._is_close_on_my_own:
            self.logger.debug("already destroy")
            return
        self._is_close_on_my_own = True
        self.close()
        if self._thread:
            self._thread.join(CLOSE_TIMEOUT)
        if self._event_loop and self._event_loop.is_running():
            self._event_loop.stop_loop()

    @cost_debug(5)
    def handle_message(self, ret_json):
        req_id, result = self._handle_response(ret_json)
        if not req_id:
            result = self._handle_event(ret_json)
        return req_id, result

    @cost_debug(1)
    def __on_message(self, message):
        ret_json = json2obj(message)
        if not ret_json:
            return
        req_id, result = self.handle_message(ret_json)
        if result:
            self.logger.debug("RECV < %.510s" % message[:509])
        if req_id:
            if req_id in self._sync_wait_map:
                self._sync_wait_map[req_id] = result
                self._notify()
            else:
                self._handle_async_msg(req_id, result)
        elif isinstance(result, BaseEvent):
            if result.event_name in self._method_wait_map:
                self._method_wait_map[result.event_name] = result
                self._notify()
            else:
                self.notify(result)

    def _on_message(self, message, *args):
        """
        1. _on_message 调用都会在同一个线程
        2. 线程的阻塞不会导致接收消息失败, 但会影响处理消息速度(即消息不会丢, 但会慢)
        3. 有些ws的库会传ws实例!至今不懂为什么有些会有些不会,先兼容一下
        """
        if args:
            # 会传 ws 实例的情况
            message = args[0]

        # threading.Thread(target=self.__on_message, args=(message,), daemon=True).start()
        return self.__on_message(message)

    def _on_error(self, error, *args):
        if args:
            # 会传 ws 实例的情况
            error = args[0]
        ee.emit("ws_error", error)
        if "Connection is already closed" in str(error):
            self.logger.warning(error)
            return
        self.logger.error(error)
        if isinstance(error, ConnectionError):
            self._close_reason = error
        else:
            self._close_reason = ConnectionError("connection error: " + str(error))
        self.is_connected = False

    def _on_open(self, *args):
        self._close_reason = None
        self.is_connected = True
        self._state = STATE.OPEN

    def _on_close(self, *args):
        if args and isinstance(args[0], websocket.WebSocketApp):
            args = args[1:]
        ee.emit("ws_close", args)
        self._close_reason = ConnectionAbortedError(
            ("connection close: code[%s] reason[%s]" % args)
            if len(args) == 2
            else "connection close"
        )
        self.is_connected = False

    def create_async_callback_task(self, callback, *args):
        # self.logger.warn("create_async_callback_task: %s" % callback.__name__)
        async def _callback(*_args):
            # self.logger.warn("@async call %s" % callback.__name__)
            ret = callback(*_args)
            if iscoroutine(ret):
                return await ret
            return ret

        self._event_loop.run_coroutine(_callback(*args))

    @cost_debug(5)
    def notify(self, event: BaseEvent):
        """通知事件

        :param BaseEvent event: 事件
        """
        if event.event_name in self._observers:
            for callback in self._observers[event.event_name]:
                self.create_async_callback_task(callback, event.params)
        else:
            return

    def on(self, event, callback):
        """监听事件

        :param str event: 事件名
        :param function callback: 回调函数
        """
        if not callable(callback):
            raise TypeError(
                "callback[type %s] is not a callable object" % type(callback)
            )
        if event not in self._observers:
            self._observers[event] = []
        if callback not in self._observers[event]:
            self._observers[event].append(callback)

    def remove_listener(self, event, callback):
        """移除监听事件

        :param str event: 事件名
        :param function callback: 回调函数
        """
        if event in self._observers.keys():
            if callback is None:  # remove all callback
                del self._observers[event]
            elif callback in self._observers[event]:
                self._observers[event].remove(callback)
        else:
            self.logger.debug("remove key which is not in observers")

    def remove_all_listeners(self, event):
        try:
            obs_list = [x for x in self._observers.keys()]
            for obs in obs_list:
                del self._observers[obs]
        except Exception as e:
            raise KeyError(e)

    def _connect(self, timeout=OPEN_TIMEOUT):
        error_callback = Callback()
        close_callback = Callback()
        ee.once("ws_close", close_callback.callback)
        ee.once("ws_error", error_callback.callback)
        self._client = None
        self._client = websocket.WebSocketApp(
            self._url,
            on_open=self._on_open,
            on_message=self._on_message,
            on_error=self._on_error,
            on_close=self._on_close,
        )
        _thread = WaitThread(target=self._ws_run_forever, args=(), daemon=True)
        self._state = STATE.PEDING
        _thread.start()
        self._thread = _thread

        s = time.time()
        while (time.time() - s < timeout) and self._thread.is_alive():
            if self._is_connected:
                self.logger.info(f"connect to {self._url} successfully[{self._id}]")
                self._connect_time = time.time()
                break
        else:
            if (
                not self._thread.is_alive()
                and self._thread.get_result(block=False) is True
            ):
                if error_callback.wait_called(0):  # on_error早于run_forever结束
                    raise error_callback.result
                raise ConnectionError("connect websocket server exception")
            raise TimeoutError(
                "connect to server timeout: %s, thread:%s"
                % (self._url, self._thread.is_alive())
            )

    def before_reconnect(self):
        time.sleep(0.1)
        self._state = STATE.RECONNECTING

    def after_reconnect(self):
        if self._is_connected:
            self._state = STATE.OPEN
        else:
            self._state = STATE.CLOSE

    def _handle_connection_refused(self, retry):
        """connection refused对于不同环境需要有不同处理

        :param int retry: 当前重试次数
        """
        if retry >= MAX_RETRY:
            ee.emit(
                "connection_refused"+self._id, time.time()
            )  # 多次refused, 并出现在reconnect中, 很可能是ide被close了
            raise ConnectionRefusedError("ConnectionRefused")
        time.sleep(5)

    def _handle_bad_status(self, e: WebSocketBadStatusException, retry):
        """处理`WebSocketBadStatusException`

        :param int retry: 当前重试次数
        """
        if e.status_code == 500:  # 500 Internal Server Error, 一般已经close了, 不需要继续了
            raise e
        if retry > 1 and e.status_code == 403:  # 鉴权问题, 重试一次之后就不管了
            raise e

    def _reconnect(self, optime=None, *args):
        RETRY_TIME = MAX_RETRY * OPEN_TIMEOUT + time.time()  # 最大重连尝试时间
        if self._is_close_on_my_own:
            return False
        if optime and optime < self._connect_time:
            return True
        if optime and optime < (self._last_reconnect_fail_time + OPEN_TIMEOUT):
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
                timeout=MAX_RETRY * OPEN_TIMEOUT + 10
            ):  # 理论上应该能获取到锁的
                return False
            self.logger.warning(
                "another thread reconnect finish connected: " + str(self.is_connected)
            )
            self._is_reconnecting.release()
            if not self.is_connected:
                if self._last_reconnect_fail_reason:
                    raise self._last_reconnect_fail_reason
                raise ConnectionError("reconnect fail")
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
                    self.is_connected = False
                    self._connect(OPEN_TIMEOUT)
                    if self.is_connected:
                        return True
                    self.logger.warning("connection reconnect fail")
                    self._last_reconnect_fail_time = time.time()
                    self._last_reconnect_fail_reason = TimeoutError("connect timeout")
                    return False
                except ConnectionRefusedError as cre:
                    self._last_reconnect_fail_reason = cre
                    retry += 1
                    self.logger.warning("connect refused, please check svr")
                    if time.time() < RETRY_TIME:
                        self._handle_connection_refused(retry)
                    continue
                except WebSocketBadStatusException as bse:
                    self._last_reconnect_fail_reason = bse
                    retry += 1
                    self.logger.warning("connect bad status")
                    self._handle_bad_status(bse, retry)
                    continue
                except TimeoutError as te:
                    self._last_reconnect_fail_reason = te
                    retry += 1
                    if retry >= MAX_RETRY:
                        break
                    self.logger.error("wait onopen timeout")
                    continue
                except ConnectionError as mcse:
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

    def _ws_run_forever(self):
        try:
            # return self._client.run_forever(ping_interval=max(self._msg_max_wait_time + 5, 10), ping_timeout=self._msg_max_wait_time)
            # suppress_origin = True: 解决握手的时候返回的403问题
            # ping_timeout(10)设置后很容易出现超时自动关闭connection的情况, 不建议设置
            return self._client.run_forever(suppress_origin=True)
        except Exception as e:
            self.logger.exception(e)
            self._close_reason = (
                e if isinstance(e, ConnectionError) else ConnectionAbortedError(str(e))
            )
            self.is_connected = False
            return True
        finally:
            self.logger.info(f"websocket run forever shutdown[{self._id}]")

    def _set_all_async_command_fail(self, error: Exception):
        for cid in list(self._async_msg_map.keys()):
            if self._async_msg_map[cid] is not None:
                continue
            self._handle_async_msg(cid, error)

    @cost_debug(5)
    def _handle_async_msg(self, req_id, ret_json):
        self.logger.info(
            "received async msg: %s%s",
            req_id,
            "" if req_id in self._async_msg_map else ", maybe command ignore response",
        )
        if ret_json is None:
            self.logger.warning("async msg[%s] response is None" % req_id)
        if ee.emit(req_id, ret_json):  # 有监听回调
            if req_id in self._async_msg_map:
                self._async_msg_map.pop(req_id)
        elif req_id in self._async_msg_map:  # 是这个实例发出的指令
            self._async_msg_map[req_id].result = ret_json

    @cost_debug(5)
    def _notify(self):
        self._msg_lock.acquire()
        self._msg_lock.notify_all()  # 全部唤醒，让其自己决定是否需要重新wait
        self._msg_lock.release()

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

    def wait_reconnect(self, timeout=None) -> None or Exception:
        wait_time = MAX_RETRY * OPEN_TIMEOUT + 10 if timeout is None else timeout
        if not self._is_reconnecting.acquire(timeout=wait_time):
            raise TimeoutError(
                f"connection did not reconnect within {wait_time} seconds"
            )
        self._is_reconnecting.release()
        if not self.is_connected:
            raise self._last_reconnect_fail_reason or ConnectionError("reconnect fail")

    def _gen_command(self, method, params=None, max_timeout=None, sync=True):
        if sync:
            if isinstance(method, Command):
                cmd = method
            elif isinstance(method, AsyncCommand):
                cmd = Command(method.method, method.params, desc=method.desc)
            else:
                cmd = Command(method, params, max_timeout or self._msg_max_wait_time)
        else:
            if isinstance(method, AsyncCommand):
                cmd = method
            elif isinstance(method, Command):
                cmd = AsyncCommand(method.method, method.params, desc=method.desc)
                del method  # 删除监听函数
            else:
                cmd = AsyncCommand(method, params)
        if not cmd.id:
            cmd.id = self.get_command_id()
        cmd.conn_id = self._id
        return cmd

    def _send(self, message):
        """发送消息

        :param str message: 消息
        :return bool: true 发送成功, false 发送失败
        """
        if self._client and self._client.sock:
            try:
                self._client.send(message)
                return True
            except websocket.WebSocketConnectionClosedException as e:
                if self.is_close_by_myself:
                    self.logger.warning("close by your self, can't send again")
                    return
                if self._reconnect(time.time()):
                    self.logger.debug("RESEND > %s" % message)
                    self._client.send(message)
                    return True
                return False
        elif (
            self._client and not self._client.sock and not self.is_close_by_myself
        ):  # 断连了
            if self._reconnect(time.time()):
                self.logger.debug("RESEND > %s" % message)
                self._client.send(message)
                return True
            return False
        return False

    def _safely_send(self, cmd: Command):
        """发送前检查链接状态

        :param Command message: 命令
        :return None:
        :raise ConnectionAbortedError:
        """
        message = cmd.dumps()
        self.logger.debug(f"SEND > {message}")
        if (
            not self._send(message)
            and not self.is_connected
            and not self.is_close_by_myself
        ):
            raise ConnectionAbortedError(
                "send message[%s] fail because connection is not established" % cmd.id
            )

    def send(self, method: str or Command, params=None, max_timeout=None):
        # 同步发送消息，函数会阻塞
        cmd: Command = self._gen_command(method, params, max_timeout)
        with cmd:
            self._sync_wait_map[cmd.id] = None  # 该ID未有返回message
            self._safely_send(cmd)
            return self._receive_response(cmd)

    def send_async(
        self, method: str or AsyncCommand, params=None, ignore_response=False
    ) -> str:
        cmd: AsyncCommand = self._gen_command(method, params, sync=False)
        if not ignore_response:
            self._async_msg_map[cmd.id] = cmd
        try:
            self._safely_send(cmd)
        except ConnectionAbortedError:
            if not ignore_response:
                self._async_msg_map.pop(cmd.id)
            del cmd
            raise
        return cmd.id

    def _receive_response(self, cmd: Command):
        # 等待接收到message的通知
        while cmd.max_timeout > 0:
            if (
                cmd.id in self._sync_wait_map
                and self._sync_wait_map[cmd.id] is not None
            ):  # 不等待就获取到数据了, 这个recv太快了吧
                self.logger.info("🚀🚀🚀🚀🚀🚀🚀火速获取到返回导致处理不过来🚀🚀🚀🚀🚀🚀🚀")
                response = self._sync_wait_map.pop(cmd.id)
                if isinstance(response, Exception):
                    raise response
                return response
            self._wait(cmd)

            if (
                cmd.id in self._sync_wait_map
                and self._sync_wait_map[cmd.id] is not None
            ):  # 获取到了数据
                response = self._sync_wait_map.pop(cmd.id)
                if isinstance(response, Exception):
                    raise response
                return response
            elif self.is_close_by_myself:
                raise ConnectionAbortedError("close by myself")
            elif self._state == STATE.CLOSE and not self._auto_reconnect:
                if cmd.id in self._sync_wait_map:
                    del self._sync_wait_map[cmd.id]
                if cmd.reason:
                    raise cmd.reason
                raise ConnectionAbortedError("connection closed")
            elif cmd.max_timeout > 0:  # 线程是被其他消息唤醒，重新等待
                self.logger.debug("rewait for %s" % cmd.id)
                continue
            else:
                if cmd.id in self._sync_wait_map:
                    del self._sync_wait_map[cmd.id]
                # test_link(self._url)  # 出现超时的情况, 尝试另外建立链接看看是不是inspector问题
                if cmd.reason and isinstance(cmd.reason, ConnectionAbortedError):
                    raise TimeoutError(
                        f"[{cmd.id}][{cmd.desc}] command timeout cause by {cmd.reason}"
                    )
                raise TimeoutError(
                    f"[{cmd.id}][{cmd.desc}] receive from remote timeout"
                )

    """
    根据协议需要重构的方法
    """

    def _handle_response(self, ret_json):
        raise NotImplementedError()

    def _handle_event(self, ret_json):
        raise NotImplementedError()
