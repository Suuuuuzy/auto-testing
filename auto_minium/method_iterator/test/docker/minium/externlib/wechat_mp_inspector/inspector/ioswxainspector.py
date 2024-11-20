"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-10-31 20:52:17
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-12-07 19:49:51
FilePath: /wechat-mp-inspector/wechat_mp_inspector/inspector/ioswxainspector.py
Description: ios小程序wxa service线程inspector和各种页面类型的inspector
"""
from typing import Union, List, Dict
import re
from wechat_mp_inspector.pages.basepage import WebViewPage
from wechat_mp_inspector.pages.safaripage import SafariNormalPage
from wechat_mp_inspector.protocol.basesession import BaseWebkitSession
from wechat_mp_inspector.protocol.wip import WIPSession
from .iosinspector import IOSTargetInspectorSession, IOSInspectorSession
from ..protocol.wip import WebkitInspectorProtocol
from ..pages.safaripage import *
from ..logger import logger
from ..utils import reg_search
from .wxainspector import (
    PageInspector as BasePageInspector,
    WebviewInspector as BaseWebviewInspector,
    H5Inspector as BaseH5Inspector,
    WxaInspector as BaseWxaInspector,
    AppserviceInspector as BaseAppserviceInspector,
    CurrentPage,
)

__all__ = [
    "WxaInspector",
    "MainServiceInspector",
    "AppserviceInspector",
    "SkylineInspector",
    "WebviewInspector",
    "H5Inspector",
    "CurrentPage",
]

RunTimeDomain = WebkitInspectorProtocol.protocol.Runtime
INSPECTORS = Union["MainServiceInspector", "AppserviceInspector", "SkylineInspector"]


class PageInspector(IOSTargetInspectorSession, BasePageInspector):
    _page: SafariNormalPage = None

    # page: SafariNormalPage
    def __init__(self, session: WIPSession, page: SafariNormalPage, **kwargs) -> None:
        super().__init__(
            session=session, page=page, protocol=WebkitInspectorProtocol, **kwargs
        )
        # IOSTargetInspectorSession.__init__(self, session, target_id)
        # BasePageInspector.__init__(self, session, page, protocol=WebkitInspectorProtocol)

    @classmethod
    async def create(cls, session: WIPSession, page: SafariNormalPage, **kwargs):
        return await super(PageInspector, cls).create(session, page, **kwargs)

    @property
    def visible(self):
        return not self.hidden


class WxaInspector(IOSInspectorSession, BaseWxaInspector):
    CONTEXT_NAME = ()
    APPID_REG = r"Appid\[(\w+)\]"

    @classmethod
    def check_type(cls, title: str) -> INSPECTORS:
        """根据title判断类型

        :param str title: page.title
        """
        # title like:
        # MiniProgram[WeApp]_VMType[MainVM]_VMId[0]_ContextType[MainContext]_ContextId[0]_Appid[wx3eb9cfc5787d5458]_NickName[MiniTest云测试平台]_AppVersion[Debug]_PubVersion[3.2.0]
        for type_ in (MainServiceInspector, AppserviceInspector, SkylineInspector):
            if reg_search(type_.CONTEXT_NAME, title):
                return type_

    @classmethod
    def check_service_page(
        cls, pages: List[SafariAppServicePage], appid: str = None
    ) -> List[INSPECTORS]:
        """检查wxaservice页面的类型

        :param List[SafariAppServicePage] pages: 页面列表
        :param str appid: 小程序appid, defaults to None
        :return List[INSPECTORS]: inspector类
        """
        types = {}
        for page in pages:
            # 需要有appid
            m = re.search(WxaInspector.APPID_REG, page.title)
            if not m:
                continue
            appid_ = m.group(1)
            if appid is not None and appid != appid_:  # 过滤appid
                continue
            if appid_ not in types:
                types[appid_] = {"main": None, "sub": []}
            if reg_search(MainServiceInspector.CONTEXT_NAME, page.title):
                types[appid_]["main"] = page
            else:
                m = reg_search(SubContextInspector.CONTEXT_NAME, page.title)
                if not m:
                    continue
                types[appid_]["sub"].append((page, m.group("contextId")))
        for appid_, item in types.items():
            if item["main"] is None:
                logger.warning(f"{appid_} main context is empty, sub contexts:")
                logger.warning("\n".join([str(s[0]) for s in item["sub"]]))
                continue
            sub = item["sub"]
            if not sub:
                logger.warning(f"{appid_} subcontext is empty, main context:")
                logger.warning(str(item["main"]))
            # 检测子域
            contexts: Dict[str, SafariAppServicePage] = {s[1]: s[0] for s in sub}
            if "2" in contexts and "3" in contexts:  # 正常情况
                item["appservice"] = contexts["2"]
                item["appservice"].type_ = AppserviceInspector
                item["skyline"] = contexts["3"]
                item["skyline"].type_ = SkylineInspector
            elif "2" in contexts:  # 看看有没有skyline context
                logger.warning(f"{appid_} context异常, 没有context-3:")
                logger.warning("\n".join([str(s[0]) for s in item["sub"]]))
                if reg_search(SkylineInspector.CONTEXT_NAME, contexts["2"].title):
                    # subcontext-2是skyline渲染线程
                    item["skyline"] = contexts["2"]
                    item["skyline"].type_ = SkylineInspector
                    item["appservice"] = contexts["1"]
                    item["appservice"].type_ = AppserviceInspector
                else:  # 没有skyline context
                    item["appservice"] = contexts["2"]
                    item["appservice"].type_ = AppserviceInspector
            elif "1" in contexts:  # 只有一个subcontext
                logger.warning(f"{appid_} context异常, 只有context-1:")
                logger.warning("\n".join([str(s[0]) for s in item["sub"]]))
                # 可能错的, 但是只有一个只能默认是appservice
                item["appservice"] = contexts["1"]
                item["appservice"].type_ = AppserviceInspector
        if appid:
            return types.get(appid)
        return types

    @classmethod
    async def create(cls, session: WIPSession, page: SafariAppServicePage, **kwargs):
        type_ = page.type_ or cls.check_type(page.title)
        if type_ is None:
            return None
        inst: WxaInspector = await super(WxaInspector, type_).create(session, **kwargs)
        if inst is None:
            return inst
        inst.appid = re.search(WxaInspector.APPID_REG, page.title)
        if inst.appid:
            inst.appid = inst.appid.group(1)
        return inst

    def __init__(self, session: WIPSession) -> None:
        super().__init__(session)
        self.appid = None

    def evaluate(self, expression: str, timeout=None, returnByValue=True, **kwargs):
        cmd = RunTimeDomain.evaluate(
            expression=expression,
            includeCommandLineAPI=True,
            returnByValue=returnByValue,
            **kwargs,
        )

        return self.send_command(cmd, max_timeout=timeout).result.result.value


# context-0: 主域
# context-1: 插件
# context-2: appservice
# context-3: skyline渲染
# TODO
# ios上, 有时appservice注入到了context-1中, 不能解析


class MainServiceInspector(WxaInspector):
    CONTEXT_NAME = (re.compile(r"VMType\[MainVM\]\S+ContextId\[0\]"),)


class SubContextInspector(WxaInspector):
    """子域

    正常情况:
    context-1: 插件
    context-2: appservice
    context-3: skyline渲染

    异常情况
    ios上, 有时appservice注入到了context-1中, 不能解析
    小程序打开后`appservice`域一定会存在, 可以通过`getApp`方法检测
    """

    CONTEXT_NAME = (re.compile(r"VMType\[MainVM\]\S+ContextId\[(?P<contextId>\d+)\]"),)


class AppserviceInspector(WxaInspector, BaseAppserviceInspector):
    CONTEXT_NAME = ("ContextId[2]",)


class SkylineInspector(WxaInspector):
    CONTEXT_NAME = ("ContextId[3]", re.compile(r"renderContext$"))


class WebviewInspector(PageInspector, BaseWebviewInspector):
    page: SafariWebViewPage

    def __init__(self, session: WIPSession, page: SafariWebViewPage, **kwargs) -> None:
        super().__init__(session=session, page=page, **kwargs)


class H5Inspector(PageInspector, BaseH5Inspector):
    """普通h5"""

    def __init__(self, session: WIPSession, page: SafariNormalPage, **kwargs) -> None:
        super().__init__(session=session, page=page, **kwargs)
