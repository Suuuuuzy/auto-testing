"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-10-11 11:52:33
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-12-11 15:49:33
FilePath: /wechat-mp-inspector/wechat_mp_inspector/inspector/wxainspector.py
Description: 安卓小程序wxa service线程inspector和各种页面类型的inspector
"""
import time
import typing
from typing import Union
from dataclasses import dataclass

from wechat_mp_inspector.pages.chromepage import ChromeNormalPage
from ..protocol.cdp import CDPSession, ChromeInspectorProtocol
from .baseinspector import BaseInspector
from .androidinspector import AndroidInspector
from ..connection.baseconn import BaseConnection
from ..logger import logger
from ..utils import Callback, Object
from ..exception import *
from ..pages.basepage import *
from .wxainspector import (
    PageInspector as BasePageInspector,
    WebviewInspector as BaseWebviewInspector,
    H5Inspector as BaseH5Inspector,
    WxaInspector as BaseWxaInspector,
    AppserviceInspector as BaseAppserviceInspector,
    CurrentPage,
)
from ..pages.chromepage import *

__all__ = [
    "WxaInspector",
    "MainServiceInspector",
    "AppserviceInspector",
    "SkylineInspector",
    "WebviewInspector",
    "H5Inspector",
    "CurrentPage",
]

class PageInspector(AndroidInspector, BasePageInspector):
    _page: ChromeNormalPage = None

    def __init__(self, session: CDPSession, page: ChromeNormalPage, **kwargs) -> None:
        super().__init__(
            session=session, page=page, protocol=ChromeInspectorProtocol, **kwargs
        )

    @property
    def visible(self):
        visible = getattr(self._page, "visible", None)
        if visible is None:
            return not self.hidden


class WxaInspector(PageInspector, BaseWxaInspector):
    CONTEXT = (
        {}
    )  # WxaInspector.id -> context_map[name -> (context_id, context_unique_id)]
    CONTEXT_NAME = ()
    context_created_callback = None
    logger = logger.getChild("WxaService")

    @classmethod
    def listenContextCreated(cls, inspector: "WxaInspector"):
        cls.logger.info("start listen context created")

        def executionContextCreated(
            context_info: ChromeInspectorProtocol.protocol.Runtime.executionContextCreated,
        ):
            cls.logger.info(f"context info: {context_info}")
            cls.CONTEXT[inspector.id][context_info.context.name] = (
                context_info.context.id,
                context_info.context.uniqueId,
            )

        inspector.runtime.discard_console()
        # enable只有第一次执行会回调现有的context内容, 先disable
        inspector.runtime.disable()
        cls.CONTEXT[inspector.id] = {}
        cls.context_created_callback = inspector.runtime.on(
            "executionContextCreated", executionContextCreated
        )
        inspector.runtime.enable()

    def __init__(self, session: CDPSession, page: ChromeNormalPage, **kwargs) -> None:
        super().__init__(session=session, page=page, **kwargs)
        self.context_id = None
        self.context_unique_id = None
        if self.id in WxaInspector.CONTEXT:  # 已经建立了监听等操作
            context_map = WxaInspector.CONTEXT[self.id]
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
            WxaInspector.listenContextCreated(self)

    @property
    def inited(self):
        return bool(self.context_id or self.context_unique_id)

    def ensure_init(self):
        if not self.inited:
            self.logger.warning(
                "%s context not init" % (" or ".join(self.__class__.CONTEXT_NAME))
            )
            return False
        return True

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
        return False

    @property
    def is_connecting(self):
        try:
            return self.evaluate(
                "typeof __wxConfig__ !== 'undefined' ? true: false", timeout=5
            )
        except TimeoutError:
            self.logger.warning(
                f"WxaServiceDriver thread maybe disconnected: [{self._session.connection._url}]"
            )
            return False

    def onContextCreated(
        self,
        context_info: ChromeInspectorProtocol.protocol.Runtime.executionContextCreated,
    ):
        if context_info.context.name in self.__class__.CONTEXT_NAME:
            self.context_id = context_info.context.id
            self.context_unique_id = context_info.context.uniqueId

    def evaluate(self, expression: str, timeout=None, returnByValue=True, **kwargs):
        if not self.ensure_init():
            return
        return self.runtime.evaluate(
            expression, self.context_id, self.context_unique_id, timeout=timeout, returnByValue=returnByValue, **kwargs
        )


class MainServiceInspector(WxaInspector):
    CONTEXT_NAME = ("MainContext",)

    def __init__(
        self,
        session: Union[CDPSession, WxaInspector],
        page: ChromeNormalPage = None,
        **kwargs,
    ) -> None:
        if isinstance(session, WxaInspector):
            if page is None:
                page = session.page
            super().__init__(session=session._session, page=page, **kwargs)
        else:
            super().__init__(session=session, page=page, **kwargs)
        if not self.context_id:
            self.context_id = 1  # 主context默认id == 1


class AppserviceInspector(WxaInspector, BaseAppserviceInspector):
    CONTEXT_NAME = ("SubContext-2",)

    def __init__(
        self,
        session: Union[CDPSession, WxaInspector],
        page: ChromeNormalPage = None,
        **kwargs,
    ) -> None:
        if isinstance(session, WxaInspector):
            if page is None:
                page = session.page
            super().__init__(session=session._session, page=page, **kwargs)
        else:
            super().__init__(session=session, page=page, **kwargs)


class SkylineInspector(WxaInspector):
    CONTEXT_NAME = ("SubContext-3", "app_sub_render")

    def __init__(
        self,
        session: Union[CDPSession, WxaInspector],
        page: ChromeNormalPage = None,
        **kwargs,
    ) -> None:
        if isinstance(session, WxaInspector):
            if page is None:
                page = session.page
            super().__init__(session=session._session, page=page, **kwargs)
        else:
            super().__init__(session=session, page=page, **kwargs)


class WebviewInspector(PageInspector):
    """小程序的webview页面"""

    def __init__(self, session: CDPSession, page: ChromeNormalPage, **kwargs) -> None:
        super().__init__(session=session, page=page, **kwargs)
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
    pass
