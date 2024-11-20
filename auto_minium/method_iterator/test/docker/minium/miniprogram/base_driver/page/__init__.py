'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-06-13 20:11:47
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-03-08 16:53:03
FilePath: /py-minium/minium/miniprogram/base_driver/page/__init__.py
Description: 页面实例
'''
from __future__ import annotations
import typing
if typing.TYPE_CHECKING:
    from ..app import App
from ..minium_log import report_exception, report_usage, ExceptionData
from ..callback import Callback
from ....utils.platforms import *
from ....utils.utils import ProcessSafeEventLoop, AsyncCondition, get_result, catch, WaitTimeoutError
from ....utils import lazy_import
from ....framework.exception import *
from .page import Page
from .skylinepage import SkylinePage
# 插件模块使用懒加载
if typing.TYPE_CHECKING:
    from . import h5page
else:
    h5page = lazy_import(".h5page", __package__)


def _get_h5_config(page: Page):
    return h5page.H5Config(
        platform=page.app.platform,
        appid=page.app.app_id,
        device={
            "uiautomator_version": page.app.native.uiautomator_version,
            "serial": page.app.native.serial
        } if page.app.platform in (OS_ANDROID,) else {}
    )

@report_exception
def _check_webview(page: Page):
    if page.is_webview:  # 当前页面是h5页面
        page.logger.debug(f"loading h5 page {page.path}")
        report_usage("H5")
        config = _get_h5_config(page)
        try:
            debugger_url = h5page.H5Page.get_websocket_debugger_url(config)
        except (NotImplementedError, ValueError):
            debugger_url = page.app.native.get_websocket_debugger_url()
        if debugger_url:
            page.logger.info(f"get page[{page.page_id}:{page.path}] websocket debugger url succ: {debugger_url}")
            return h5page.H5Page(
                page.page_id,
                page.path,
                page.query,
                page.renderer,
                debugger_url,
                config,
                app=page.app
            )
        else:
            page.logger.warning(f"get page[{page.page_id}:{page.path}] websocket debugger url fail")
    return page

def load_page(page: Page):
    """加载真实的page实例"""
    if page.renderer == "skyline":
        page.logger.debug(f"loading skyline page {page.path}")
        return SkylinePage(page.page_id, page.path, page.query, page.renderer, app=page.app)
    if not page.app.enable_h5:
        return page
    if page.app.platform not in (OS_ANDROID,):  # 目前只有android支持
        return page
    try:
        return _check_webview(page)
    except PageDestroyed:  # 退化成普通webview
        page.logger.error(f"page {page} check webview fail, if it's a h5 page, maybe instance H5Page fail")
        return page

event_loop = ProcessSafeEventLoop()
class AsyncPage(object):
    def __init__(self, page: Page) -> None:
        self.logger = page.logger
        self._page = page  # 记录一下基础页面
        self.page = None
        self._async_msg_lock: AsyncCondition = AsyncCondition()
        self._page_done = event_loop.run_coroutine(
            self.load_page(page)
        )
        self._callback = None
        
    async def load_page(self, page: Page):
        self.page = load_page(page)
        if self._callback:
            self._callback(self.page)
        return self.page

    def wait_page_done(self, timeout=None) -> PageType:
        if self.page:
            return self.page
        try:
            if get_result(self._page_done, timeout or 30):  # 最大30, 理论上不应该需要这么大. 指令超时除外
                return self.page
        except WaitTimeoutError as wte:
            self.logger.warning(wte)
            if timeout is not None:
                raise
            return get_result(self._page_done)  # 一定会执行完的
        self.logger.warning("等待页面实例化超时")
        return False

def create_base_page(page_id, path, query, renderer="webview", *args, app: App = None):
    """创建一个基本的页面实例

    :param str page_id: page_id
    :param str path: path
    :param dict query: query
    :param str renderer: renderer, defaults to "webview"
    :param App app: app, defaults to None
    :return Page: 页面实例
    """
    page = Page(page_id, path, query, renderer, app=app)
    if page.path in Page.NAVIGATION_STYLE_MAP:
        page._navigation_style = Page.NAVIGATION_STYLE_MAP[page.path]
    return page

def create_async(page_id, path, query, renderer="webview", *args, app: App = None) -> AsyncPage:
    """创建一个基本的页面实例, 真正的实例化操作需要wait_page_done, 主要针对h5/skyline页面

    :param str page_id: page_id
    :param str path: path
    :param dict query: query
    :param str renderer: renderer, defaults to "webview"
    :param App app: app, defaults to None
    :return Page: 页面实例
    """
    page = create_base_page(page_id, path, query, renderer, *args, app=app)
    return AsyncPage(page)

def create(page_id, path, query, renderer="webview", *args, app: App = None):
    page = create_base_page(page_id, path, query, renderer, *args, app=app)
    return load_page(page)

PageType = typing.Union[Page, 'h5page.H5Page', SkylinePage]