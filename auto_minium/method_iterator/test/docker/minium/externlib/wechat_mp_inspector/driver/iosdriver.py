'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-21 14:12:23
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-03-01 20:32:30
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/iosdriver.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
import time
import uuid
import asyncio
from typing import List, Mapping
from dataclasses import fields
from pymobiledevice3.lockdown import create_using_usbmux
from .config import IOSConfig
from ..utils import get_result
from .basedriver import BaseDriver, BaseConfig
from ..inspector.iosinspector import IOSInspectorSession
from ..protocol.wip import WIPSession, WIPConnection
from ..pages.safaripage import Page, WirTypes


class IOSDriver(BaseDriver[IOSInspectorSession]):
    EXTEND_BUNDLE = ['process-com.apple.WebKit.WebContent', ]

    def __init__(self, config: IOSConfig) -> None:
        self.config = config
        # Connecting via usbmuxd
        lockdown = create_using_usbmux(serial=self.config.udid)
        connection = WIPConnection(lockdown, timeout=self.config.connect_timeout)
        connection.logger.setLevel(config.logger_level)
        self.connection = connection
        # 初始化一下目前的页面
        connection.get_open_pages()
        self.app = None
        self.loop = connection.loop
        if config.bundle is None:  # 没有目标app
            return
        # init app
        if not self.init_app():  # 需要轮询, 异步执行
            self._app_connected = self.async_(
                self._wait_for_app(self.config.wait_for_app_timeout)
            )

    def init_app(self):
        for app_id, app_ in self.connection.connected_application.items():
            # filter bundle
            if app_.bundle == self.config.bundle:
                self.app = app_
        if not self.app:
            return None
        self.app = [self.app,]
        for app_id, app_ in self.connection.connected_application.items():
            # filter bundle
            if app_.bundle == self.config.bundle:
                continue
            elif app_.bundle in IOSDriver.EXTEND_BUNDLE and app_.proxy and app_.host == self.app[0].id_:
                self.app.append(app_)
            else:
                continue
        if self.app:
            self.connection.get_open_pages()  # 刷一下页面列表
        return self.app
    
    def async_(self, coro):
        """运行异步函数"""
        return asyncio.run_coroutine_threadsafe(coro, loop=self.loop)

    def ensure_future(self, coro):
        return asyncio.ensure_future(coro, loop=self.loop)

    def await_(self, awaitable, loop=None):
        """运行并等待异步函数"""
        loop = loop or self.loop
        return loop.run_until_complete(asyncio.ensure_future(awaitable, loop=loop))

    def setup_inspector_socket(self, session_id, app_id, page_id):
        """注册一个页面的inspector会话"""
        return self.connection.setup_inspector_socket(session_id, app_id, page_id)

    def wait_for_app(self, timeout):
        return self.connection.await_(self._wait_for_app(timeout))
        
    async def _wait_for_app(self, timeout):
        etime = time.time() + timeout
        while time.time() < etime:
            await self.connection._send_message('_rpc_getConnectedApplications:')
            await asyncio.sleep(2)
            if self.init_app():
                return self.app
        else:
            raise TimeoutError(f"{self.config.bundle} doesn't connect to webinspectord in {timeout} seconds")

    def get_pages(self) -> List[Page]:  # 获取当前app的页面
        if not self.app:
            return []
        self.connection.get_open_pages()
        pages = []
        for app in self.app:
            if app.id_ in self.connection.application_pages:
                for page in self.connection.application_pages[app.id_].values():
                    setattr(page, "appid_", app.id_)
                    pages.append(page)
        return pages
    
    def inspector_session(self, page: Page) -> IOSInspectorSession:
        return self.await_(self._inspector_session(page))
    
    async def _inspector_session(self, page: Page) -> IOSInspectorSession:
        session_id = str(uuid.uuid4()).upper()
        return await IOSInspectorSession.create(WIPSession(self.connection, session_id, page))

    def sleep(self, seconds):
        self.await_(asyncio.sleep(seconds))


if __name__ == "__main__":
    import re
    import requests
    import logging
    import threading
    from ..protocol.protocoltypes import *
    from ..utils import ProcessSafeEventLoop
    logging.basicConfig(level=logging.DEBUG)
    
    config = IOSConfig({
        "bundle": 'com.tencent.qy.xin',
        "connect_timeout": 5,
        "logger_level": logging.DEBUG
    })
    driver = IOSDriver(config)
    requests.get("http://mmtest.oa.com/weappopentest/launchtest/SendMsgTools?user_name=yopotest1-3&app_id=wx3eb9cfc5787d5458&app_type=0")
    if not driver.wait_for_app(20):
        raise RuntimeError("没加载好")
    print(driver.app)
    pages = driver.get_pages()
    # 选择一个页面
    target_page = None
    for page in pages:
        # if (page.web_title or "").find("wx3eb9cfc5787d5458") > 0 and re.search(r"ContextId\[0\]", (page.web_title or "")):
        #     target_page = page
        #     break
        if (page.web_title or "").find("wx3eb9cfc5787d5458") > 0 and (page.web_title or "").find("ContextId[1]") > 0 or (page.web_url or "").find("wx3eb9cfc5787d5458") > 0:
            if target_page is None:
                target_page = page
            elif target_page.id_ < page.id_:
                target_page = page
    if target_page is None:
        raise RuntimeError("没有符合条件的页面")
    print(f"inspect {target_page}, thread id: {threading.get_ident()}")
    inspector = driver.inspector_session(target_page)
    driver.sleep(2)
    try:
        print("cmd.id: %s" % inspector.send_command(Runtime.enable(), sync=False))
        print("cmd.id: %s, aync" % inspector.await_(inspector._send_command(Runtime.enable(), sync=True)) )
        driver.await_(asyncio.sleep(2))
    except TimeoutError:
        driver.await_(asyncio.sleep(0))
    # threading.Thread(target=inspector.send_command, args=(Runtime.evaluate(expression="""__wxConfig""", returnByValue=True),)).start()
    # driver.await_(asyncio.sleep(10))
    print(inspector.send_command(Runtime.evaluate(expression="""__wxConfig""", returnByValue=True)))
    
    inspector.close()

