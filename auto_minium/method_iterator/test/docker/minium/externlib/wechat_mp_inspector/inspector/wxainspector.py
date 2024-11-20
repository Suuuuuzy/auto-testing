'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-10-11 11:52:33
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-03-01 16:08:13
FilePath: /wechat-mp-inspector/wechat_mp_inspector/inspector/wxainspector.py
Description: webkit base的inspector以及基于此基础上定义的各种页面类型的inspector
'''
import abc
from ..protocol.basesession import BaseWebkitSession
from ..protocol.basewebkit import BaseWebkitProtocol

from .baseinspector import BaseInspector
from ..logger import logger
from ..utils import Callback
from ..exception import *
from ..pages.basepage import *

__all__ = [
    'PageInspector',
    'WebviewInspector',
    'H5Inspector',
    'CurrentPage',
    'WxaInspector',
    'AppserviceInspector',
]

class CurrentPage(Object):
    route: str = ''
    webviewId: str = ''
    renderer: str = ''
    exparserNodeId: str = ''
    url: str = ''

class WebkitInspector(BaseInspector):
    _session: BaseWebkitSession

class Runtime(object):
    inspector: WebkitInspector
    domain: BaseWebkitProtocol.protocol.Runtime
    TMP = set()
    def __init__(self, inspector: WebkitInspector, domain: BaseWebkitProtocol.protocol.Runtime=BaseWebkitProtocol.protocol.Runtime) -> None:
        self.inspector = inspector
        self.domain = domain
        if inspector.id not in Runtime.TMP:
            # self._test_pong()
            Runtime.TMP.add(inspector.id)
            
    def _test_pong(self):
        """5s一次来自inpector的pong信息"""
        try:
            self.inspector.send_command(
                self.domain.addBinding(name="test_pong")
            )
        except NotImplementedError:
            return 
        self.inspector.send_command(self.domain.evaluate(expression="""setInterval(function(){typeof test_pong !== "undefined" && test_pong(new Date().toString().slice(0, 24))}, 5000)"""), sync=False)

    def _parse_value(self, result):
        if "type" in result and "value" in result:
            return result["value"]
        return result
 
    def add_binding(self, name):
        return self.inspector.send_command(
            self.domain.addBinding(name=name)
        )

    def discard_console(self):
        """
        Runtime.discardConsoleEntries
        异步即可
        """
        # self.inspector._session.connection.ignore_method.add("Runtime.consoleAPICalled")
        return self.inspector.send_command(
            self.domain.discardConsoleEntries(),
            sync=False,
            ignore_response=True
        )

    def disable(self):
        """Runtime.disable"""
        return self.inspector.send_command(self.domain.disable())

    def enable(self):
        """Runtime.enable"""
        return self.inspector.send_command(self.domain.enable())
    
    def evaluate(
        self,
        expression: str,
        contextId=None,
        uniqueContextId=None,
        timeout=None,
        returnByValue=True,
        **kwargs
    ):
        cmd = self.domain.evaluate(expression=expression, includeCommandLineAPI=True, returnByValue=returnByValue, **kwargs)
        if uniqueContextId:
            cmd.uniqueContextId = uniqueContextId
        elif contextId:
            cmd.contextId = contextId
        return self.inspector.send_command(cmd, max_timeout=timeout).result.result.value
    
    async def _evaluate(
        self,
        expression: str,
        contextId=None,
        uniqueContextId=None,
        timeout=None,
        returnByValue=True,
        **kwargs
    ):
        cmd = self.domain.evaluate(expression=expression, includeCommandLineAPI=True, returnByValue=returnByValue, **kwargs)
        if uniqueContextId:
            cmd.uniqueContextId = uniqueContextId
        elif contextId:
            cmd.contextId = contextId
        result: BaseWebkitProtocol.protocol.Runtime.RemoteObject = (await self.inspector._send_command(cmd, max_timeout=timeout)).result.result
        if result.subtype == "error":
            raise Exception(result.description)
        return result.value

    
    def on(self, event, callback: Callback = None) -> Callback:
        if callback is None:
            _callback = Callback()
        elif isinstance(callback, Callback):
            _callback = callback
        else:
            _callback = Callback(callback)
        self.inspector.on("Runtime." + event, _callback.callback)
        return _callback


class PageInspector(WebkitInspector):
    _page: NormalPage
    def __init__(self, session: BaseWebkitSession, page: NormalPage=None, protocol: BaseWebkitProtocol=BaseWebkitProtocol, **kwargs) -> None:
        super().__init__(session=session, page=page, protocol=protocol, **kwargs)
        self._page = page
        self.runtime = Runtime(self, protocol.protocol.Runtime)

    @property
    def page(self) -> NormalPage:
        return self._page

    @page.setter
    def page(self, value: NormalPage):
        if self._page is None:
            self._page = value
            return
        # 更新ext_info
        self._page.update_ext_info(value.ext_info)
        value.update_ext_info(self._page.ext_info)
        self._page = value

    def evaluate(self, expression, **kwargs):
        return self.runtime.evaluate(expression, **kwargs)
    
    async def _evaluate(self, expression, **kwargs):
        return await self.runtime._evaluate(expression, **kwargs)

    @property
    def hidden(self):
        return self.runtime.evaluate("document.hidden")
    
    async def _hidden(self):
        return await self.runtime._evaluate("document.hidden")

class WxaInspector(WebkitInspector):
    @abc.abstractmethod
    def evaluate(self, expression: str, timeout=None, returnByValue=True, **kwargs): ...

class AppserviceInspector(WxaInspector):
    def _get_current_page(self) -> CurrentPage:
        js = """(function(){
        var i = getCurrentPages().pop()
        return {
            "route": i.route,
            "webviewId": i.__wxWebviewId__,
            "renderer": i.renderer,
            "exparserNodeId": i.__wxExparserNodeId__
        }})()"""
        try:
            return CurrentPage(**self.evaluate(js))
        except Exception as e:
            if str(e) == "uniqueContextId not found":
                raise UniqueContextIdNotFound(str(e))
            raise

    @property
    def current_page(self):
        return self._get_current_page()

class WebviewInspector(PageInspector):
    """小程序的webview页面"""
    page: WebViewPage
    def __init__(self, session: BaseWebkitSession, page: WebViewPage=None, **kwargs) -> None:
        super().__init__(session=session, page=page)
        self._is_webview = None

    @property
    def is_webview(self):
        """是否是web-view页面"""
        if self._is_webview is None:
            self._is_webview = self.runtime.evaluate(
                """document.querySelector("wx-web-view") ? true : false"""
            )
        return self._is_webview
    
class H5Inspector(PageInspector):
    """普通h5"""
    page: NormalPage
    def __init__(self, session: BaseWebkitSession, page: NormalPage=None, **kwargs) -> None:
        super().__init__(session=session, page=page, **kwargs)
