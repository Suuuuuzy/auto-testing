"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-06-06 17:11:49
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-09 17:23:59
FilePath: /at/at/webdriver/weapp/skylinedriver.py
Description: 封装mp的驱动
"""
import time
import logging

from .utils import Callback
from .cdpdriver import CDPWebSocket, Runtime
from .exception import *

logger = logging.getLogger("WMI")


class AppserviceWebSocket(CDPWebSocket):
    def __new__(
        cls,
        debugger_url,
        sock_name,
        title,
        tcp_port=None,
        *args,
        auto_reconnect=False,
        **kwargs,
    ):
        if not debugger_url and not tcp_port:
            raise Runtime("miss debugger_url or tcp_port")
        return super().__new__(
            cls,
            debugger_url,
            sock_name,
            title,
            tcp_port,
            *args,
            unique_id=AppserviceWebSocket.get_unique_id(sock_name, title),
            auto_reconnect=auto_reconnect,
            **kwargs,
        )

    @classmethod
    def get_unique_id(cls, sock_name, title):
        """生成唯一id"""
        return f"{sock_name}:{title}"

    @classmethod
    def get_debugger_url(cls, sock_name, title, tcp_port, *args, **kwargs):
        return "ws://127.0.0.1:%s/page/%s" % (tcp_port, title)


class WxaServiceDriver(object):
    CONTEXT = {}  # ws.id -> context_map[name -> (context_id, context_unique_id)]
    CONTEXT_NAME = ()
    context_created_callback = None
    logger = logger.getChild("WxaService")

    @classmethod
    def listenContextCreated(cls, ws: CDPWebSocket):
        cls.logger.info("start listen context created")
        runtime = Runtime(ws)

        def executionContextCreated(context_info):
            cls.logger.info(f"context info: {context_info}")
            cls.CONTEXT[ws.id][context_info.context.name] = (
                context_info.context.id,
                context_info.context.uniqueId,
            )

        runtime.discard_console()
        # enable只有第一次执行会回调现有的context内容, 先disable
        runtime.disable()
        cls.CONTEXT[ws.id] = {}
        cls.context_created_callback = runtime.on(
            "executionContextCreated", executionContextCreated
        )
        runtime.enable()

    def __init__(self, ws: AppserviceWebSocket) -> None:
        self.ws = ws
        self.runtime = Runtime(ws)
        self.context_id = None
        self.context_unique_id = None
        if ws.id in WxaServiceDriver.CONTEXT:  # 已经建立了监听等操作
            context_map = WxaServiceDriver.CONTEXT[ws.id]
            for context_name in self.__class__.CONTEXT_NAME:
                if context_name in context_map:
                    self.context_id, self.context_unique_id = context_map[context_name]
            if not self.inited:  # context还没有创建, 注册监听
                self.logger.warning(
                    "%s context not init, listen them"
                    % (" or ".join(self.__class__.CONTEXT_NAME))
                )
                self.context_created_callback = self.runtime.on(
                    "executionContextCreated", self.onContextCreated
                )
        else:
            self.context_created_callback = self.runtime.on(
                "executionContextCreated", self.onContextCreated
            )
            WxaServiceDriver.listenContextCreated(ws)

    @property
    def inited(self):
        return bool(self.context_id or self.context_unique_id)

    def onContextCreated(self, context_info):
        if context_info.context.name in self.__class__.CONTEXT_NAME:
            self.context_id = context_info.context.id
            self.context_unique_id = context_info.context.uniqueId

    def ensure_init(self):
        if not self.inited:
            self.logger.warning(
                "%s context not init" % (" or ".join(self.__class__.CONTEXT_NAME))
            )
            return False
        return True

    def evaluate(self, expression: str, timeout=None, **kwargs):
        if not self.ensure_init():
            return
        return self.runtime.evaluate(
            expression, self.context_id, self.context_unique_id, timeout, **kwargs
        )

    def wait_init(self, timeout=0):
        if self.inited:
            return True
        if not self.context_created_callback:
            self.logger.warning("not listened")
            return False
        stime = time.time()
        while self.context_created_callback.acquire(
            max(timeout - (time.time() - stime), 0)
        ):
            if self.inited:
                return True

    @property
    def is_connecting(self):
        try:
            return self.evaluate(
                "typeof __wxConfig__ !== 'undefined' ? true: false", timeout=5
            )
        except TimeoutError:
            self.logger.warning(f"WxaServiceDriver thread maybe disconnected: [{self.ws._url}]")
            return False
        
    def close(self):
        pass


class MainServiceDriver(WxaServiceDriver):
    CONTEXT_NAME = ("MainContext",)

    def __init__(self, ws: AppserviceWebSocket) -> None:
        super().__init__(ws)
        if not self.context_id:
            self.context_id = 1  # 主context默认id == 1


class AppserviceDriver(WxaServiceDriver):
    CONTEXT_NAME = ("SubContext-2",)

    def _get_current_page(self):
        js = """(function(){
        var i = getCurrentPages().pop()
        return {
            "route": i.route,
            "webviewId": i.__wxWebviewId__,
            "renderer": i.renderer,
            "exparserNodeId": i.__wxExparserNodeId__
        }})()"""
        try:
            return self.evaluate(js)
        except Exception as e:
            if str(e) == "uniqueContextId not found":
                raise UniqueContextIdNotFound(str(e))
            raise

    @property
    def current_page(self):
        return self._get_current_page()


class SkylineDriver(WxaServiceDriver):
    CONTEXT_NAME = ("SubContext-3", "app_sub_render")


class WebviewDriver(object):
    """小程序的webview页面"""

    def __init__(self, ws: CDPWebSocket, title=None) -> None:
        self.ws = ws
        self.title = title
        self.runtime = Runtime(ws)
        self._is_webview = None

    @property
    def is_webview(self):
        """是否是web-view页面"""
        if self._is_webview is None:
            self._is_webview = self.runtime.evaluate(
                """document.querySelector("wx-web-view") ? true : false"""
            )
        return self._is_webview
    
    def evaluate(self, expression, **kwargs):
        return self.runtime.evaluate(expression, **kwargs)
    
    def close(self):
        self.ws.close()


class H5Driver(object):
    """普通h5"""

    def __init__(self, ws: CDPWebSocket, title=None, url=None) -> None:
        self.ws = ws
        self.title = title
        self.url = url
        self.runtime = Runtime(ws)

    @property
    def hidden(self):
        return self.runtime.evaluate("document.hidden")

    def evaluate(self, expression, **kwargs):
        return self.runtime.evaluate(expression, **kwargs)
    
    def close(self):
        self.ws.close()


class WebviewPage(object):
    PAGE_INFO_MAP = {}  # webviewId -> page_info
    driver: WebviewDriver
    page_info: dict
    def __new__(cls, driver: WebviewDriver, **page_info):
        if "webviewId" in page_info:
            webview_id = page_info["webviewId"]
        else:
            webview_id = None
        inst = object.__new__(cls)
        if webview_id in cls.PAGE_INFO_MAP:
            page_info.update(cls.PAGE_INFO_MAP[webview_id])
        elif webview_id:
            cls.PAGE_INFO_MAP[webview_id] = page_info
        inst.driver = driver
        inst.page_info = page_info
        return inst
    
    def __init__(self, driver: WebviewDriver, **page_info) -> None:
        page_str = str(self)
        def on_ws_state_change(value):
            if not value:
                logger.info("%s link destory" % page_str)
        self.on_ws_state_change = on_ws_state_change
        self.driver.ws.on("ConnectionStateChange", self.on_ws_state_change)

    def __del__(self):
        logger.debug("%s del" % str(self))
        self.driver.ws.remove_listener("ConnectionStateChange", self.on_ws_state_change)

    def __str__(self) -> str:
        return "[%s]%s" % (
                    self.page_info.get("webviewId"),
                    f"{self.driver.title.path}[{'visible' if self.driver.title.visible else 'invisible'}]"
                    if self.driver.title
                    else "unknow",
                )
    
    def evaluate(self, expression, **kwargs):
        return self.driver.evaluate(expression, **kwargs)
    
class H5Page(WebviewPage):
    PAGE_INFO_MAP = {}  # webviewId -> page_info
    driver: H5Driver

    def __str__(self) -> str:
        return "[%s]%s[%s]" % (
                    self.page_info.get("webviewId"),
                    self.driver.title,
                    self.driver.url
                )

class SkylinePage(object):
    def __init__(self, driver: SkylineDriver, **page_info) -> None:
        self.driver = driver
        self.page_info = page_info
    
    def __str__(self) -> str:
        return "[%s]%s[skyline]" % (
                    self.page_info.get("webviewId"),
                    f"{self.page_info['route']}"
                )

    def evaluate(self, expression, **kwargs):
        return self.driver.evaluate(expression, **kwargs)
