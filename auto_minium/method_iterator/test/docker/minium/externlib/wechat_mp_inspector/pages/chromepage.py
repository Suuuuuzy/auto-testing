'''
Author: yopofeng
Date: 2023-09-27 23:41:11
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:09:05
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/pages.py
Description: 定义各种page实例

Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
'''

from dataclasses import dataclass
import json
import re
from .basepage import BasePage, NormalPage, WebViewPage, AppServicePage
from typing import Union, List, Mapping
from ..utils import Object

def reg_match(reg_list, string):
    for reg in reg_list:
        if re.match(reg, string):
            return True
    return False

def state_match(states, string: str) -> str:
    for state in states:
        if string.startswith(state):
            return state
    return None

@dataclass
class ChromeTab(BasePage):
    webSocketDebuggerUrl: str = ''
    description: Object = None

    @property
    def description(self) -> Object:
        return self._description

    @description.setter
    def description(self, v):
        if isinstance(v, Object):
            self._description = v
        elif isinstance(v, str):
            try:
                self._description = json.loads(v, object_hook=Object)
            except ValueError:
                self._description = v
        elif isinstance(v, dict):
            self._description = Object(v)
        else:
            self._description = v


class ChromeNormalPage(ChromeTab, NormalPage):
    def __new__(cls, title, url='', *args, **kwargs):
        if isinstance(title, BasePage):
            return title
        
        ts = title.split(":")
        inst = None
        if len(ts) == 3:
            if re.match(f"wx[a-z0-9]+", ts[0]) and state_match(ChromeWebViewPage.STATE, ts[2]):
                inst = object.__new__(ChromeWebViewPage)
            elif reg_match(ChromeAppServicePage.REG_LIST, title):
                inst = object.__new__(ChromeAppServicePage)
                if title.startswith("wx"):
                    inst.appid = ts[0]
            elif reg_match(IgnorePage.REG_LIST, title):
                return None  # 直接不创建实例
        if not inst:
            inst = object.__new__(ChromeNormalPage)
        return inst

    def __init__(self, title: str, url='', webSocketDebuggerUrl='', description=None, *args, unique_id=None, **kwargs) -> None:
        if isinstance(title, ChromeNormalPage):
            return
        super(ChromeNormalPage, self).__init__(title, url, webSocketDebuggerUrl, description)
        self.unique_id = unique_id 
        self.empty = (title == "about:blank" or url == "about:blank")
        self.ext_info = Object(kwargs)

    def __eq__(self, __value: object) -> bool:
        if not isinstance(__value, ChromeNormalPage):
            return False
        if self.unique_id is None or __value.unique_id is None:
            return self.webSocketDebuggerUrl == __value.webSocketDebuggerUrl
        return self.unique_id == __value.unique_id


class ChromeWebViewPage(ChromeNormalPage, WebViewPage):
    STATE = ("INITIAL", "VISIBLE", "INVISIBLE")
    def __init__(self, title: str, *args, **kwargs) -> None:
        if isinstance(title, ChromeNormalPage):
            return title
        super().__init__(title, *args, **kwargs)
        ts = title.split(":")
        self.appid = ts[0]
        self.path = ts[1]
        vsb = ts[2].upper()
        state = state_match(ChromeWebViewPage.STATE, vsb)
        self.visible = (
            True
            if state == "VISIBLE"
            else (False if state == "INVISIBLE" else None)
        )
        self.initial = True if state == "INITIAL" else False


class ChromeAppServicePage(ChromeNormalPage):
    REG_LIST  = [r"\d+:\d+:WxaService", r"wx[a-z0-9]+:\d+:service"]
    appid = None
    tcp_port = ''
    def __init__(self, title: str, url='', webSocketDebuggerUrl='', *args, unique_id=None, tcp_port='', **kwargs) -> None:
        super().__init__(title, url, webSocketDebuggerUrl, *args, unique_id=unique_id, **kwargs)
        self.tcp_port = tcp_port
        self.webSocketDebuggerUrl = "ws://127.0.0.1:%s/page/%s" % (tcp_port, title)

    @property
    def unique_id(self):
        return f"{self.ext_info.sock_name}:{self.title}"
    
    @unique_id.setter
    def unique_id(self, v): ...

# 需要忽略的title, 减少不必要的检查
class IgnorePage(ChromeNormalPage):
    REG_LIST = [r"^Magic.*"]

if __name__ == "__main__":
    a = ChromeNormalPage("wx3eb9cfc5787d5458:1:service", webSocketDebuggerUrl="ws://123", tcp_port="13", sock_name="2323")
    print(isinstance(a, ChromeAppServicePage))
    print(a)
    a = ChromeNormalPage("wx3eb9cfc5787d5458:pages/webview/webview.html:VISIBLE(PAUSED)", webSocketDebuggerUrl="ws://123", tcp_port="13")
    print(isinstance(a, ChromeWebViewPage))
    a = ChromeNormalPage("wx3eb9cfc5787d5458:pages/index/index.html:INVISIBLE", webSocketDebuggerUrl="ws://123")
    print(isinstance(a, ChromeWebViewPage))
    a = ChromeNormalPage("123", "https://h5.baike.qq.com/mobile/home.html?adtag=yd.test&login_type=wx&code=051B5PFa1JBy6G0U2zIa1cSRkX…", webSocketDebuggerUrl="ws://123")
    print(isinstance(a, ChromeNormalPage))
    a = ChromeNormalPage("Magic123:123:2", "https://h5.baike.qq.com/mobile/home.html?adtag=yd.test&login_type=wx&code=051B5PFa1JBy6G0U2zIa1cSRkX…", webSocketDebuggerUrl="ws://123")
    print(a is None)
