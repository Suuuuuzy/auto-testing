'''
Author: yopofeng yopofeng@tencent.com
Date: 2024-02-28 19:42:09
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 20:00:17
FilePath: /wechat-mp-inspector/wechat_mp_inspector/pages/mppage.py
Description: 定义小程序页面实例
'''
from typing import Dict, Union, TYPE_CHECKING, TypedDict, Literal
from ..logger import logger
if TYPE_CHECKING:
    from ..inspector.wxainspector import WebviewInspector, H5Inspector, WxaInspector

class PageInfo(TypedDict, total=False):
    route: str
    webviewId: str
    renderer: Literal["webview", "skyline"]
    exparserNodeId: str


class WebviewPage(object):
    """小程序普通页面实例"""

    PAGE_INFO_MAP: Dict[str, dict] = {}  # webviewId -> page_info
    inspector: 'WebviewInspector'
    page_info: PageInfo

    def __new__(cls, inspector: 'WebviewInspector', **page_info: PageInfo):
        if "webviewId" in page_info:
            webview_id = page_info["webviewId"]
        else:
            webview_id = None
        inst = object.__new__(cls)
        if webview_id in cls.PAGE_INFO_MAP:
            for k, v in page_info.items():
                if v is None:
                    continue
                cls.PAGE_INFO_MAP[webview_id][k] = v
            page_info = cls.PAGE_INFO_MAP[webview_id]
        elif webview_id:
            cls.PAGE_INFO_MAP[webview_id] = page_info
        inst.inspector = inspector
        inst.page_info = page_info
        return inst

    def __init__(self, inspector: 'WebviewInspector', **page_info: PageInfo) -> None:
        page_str = str(self)
        inspector.page.update_ext_info(page_info)

        def on_ws_state_change(value):
            if not value:
                logger.info("%s link destory" % page_str)

        self.on_ws_state_change = on_ws_state_change
        self.inspector.on("ConnectionStateChange", self.on_ws_state_change)

    def __del__(self):
        logger and logger.debug("%s del" % str(self))
        self.inspector.remove_listener("ConnectionStateChange", self.on_ws_state_change)

    def __str__(self) -> str:
        info = ""
        if self.inspector.page.title and hasattr(self.inspector.page, "visible"):
            info += f" {self.inspector.page.path}[{'visible' if self.inspector.page.visible else 'invisible'}]"
        elif self.page_info.get("route"):
            info += f" {self.page_info.get('route')}"
        elif self.inspector.page.title:
            info += f" {self.inspector.page.title}"
        elif self.inspector.page.url:
            info += f" {self.inspector.page.url}"
        else:
            info += "unknow"
        return "[%s]%s" % (self.page_info.get("webviewId"), info)

    def update_page_info(self, info: dict):
        for k, v in info.items():
            if v is not None:
                self.page_info[k] = v

    def evaluate(self, expression, **kwargs):
        return self.inspector.runtime.evaluate(expression, **kwargs)


class H5Page(WebviewPage):
    PAGE_INFO_MAP = {}  # webviewId -> page_info
    inspector: 'H5Inspector'

    def __str__(self) -> str:
        return "[%s]%s[%s]" % (
            self.page_info.get("webviewId"),
            self.inspector.page.title,
            self.inspector.page.url,
        )


# TODO: IOS需要重新定义
class SkylinePage(object):
    def __init__(self, inspector: 'WxaInspector', **page_info) -> None:
        self.inspector = inspector
        self.page_info = page_info

    def __str__(self) -> str:
        return "[%s]%s[skyline]" % (
            self.page_info.get("webviewId"),
            f"{self.page_info['route']}",
        )

    def evaluate(self, expression, **kwargs):
        return self.inspector.evaluate(expression, **kwargs)
