'''
Author: yopofeng
Date: 2023-09-27 23:41:11
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:44:54
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/pages.py
Description: 定义各种page实例

Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
'''

from dataclasses import dataclass
from .basepage import BasePage, NormalPage, WebViewPage, AppServicePage
import re
from typing import Union, List, Mapping, TYPE_CHECKING
from ..utils import Object, reg_search
from pymobiledevice3.services.webinspector import Page as _Page, WirTypes
import json
from ..logger import logger

def state_match(states, string: str) -> str:
    for state in states:
        if string.startswith(state):
            return state
    return None

# 重构一下page实例
@dataclass
class Page(BasePage, _Page):
    connection_id_: str = ""
    appid_ = None
    @classmethod
    def from_page_dictionary(cls, page_dict: Mapping) -> 'Page':
        p: Page = super(Page, cls).from_page_dictionary(page_dict)
        if p.type_ == WirTypes.JAVASCRIPT:
            p.web_title = page_dict['WIRTitleKey']
            if "WIRConnectionIdentifierKey" in page_dict:
                p.connection_id_ = page_dict["WIRConnectionIdentifierKey"]
        if 'WIRTitleKey' in page_dict:
            p.title = page_dict['WIRTitleKey']
        if 'WIRURLKey' in page_dict:
            p.url = page_dict['WIRURLKey']
        # for test
        # if "WIRConnectionIdentifierKey" in page_dict:
        #     logger.info(json.dumps(page_dict, indent=2))
        return p

    def __str__(self):
        return f'id: {self.id_}[{self.type_}], title: {self.title}, url: {self.url}'


class SafariNormalPage(NormalPage):
    page: Page
    def __new__(cls, page: Union[Page, BasePage], *args, **kwargs):
        if not isinstance(page, Page):
            return page
        
        inst = None
        if page.type_ == WirTypes.JAVASCRIPT:
            m = reg_search(SafariAppServicePage.REG_LIST, page.title)
            if m:
                inst = object.__new__(SafariAppServicePage)
                inst.appid = m.group("appid")
            elif reg_search(IgnorePage.REG_LIST, page.title):
                return None
        elif page.type_ == WirTypes.WEB_PAGE:
            m = reg_search(SafariWebViewPage.REG_LIST, page.url)
            if m:
                inst = object.__new__(SafariWebViewPage)
                inst.appid = m.group("appid")
            elif reg_search(IgnorePage.REG_LIST, page.url):
                return None
        if inst is None:
            inst = object.__new__(SafariNormalPage)
        inst.page = page
        return inst

    def __init__(self, page: Page, *args, **kwargs):
        super().__init__(page.title, page.url)
        self.appid_ = page.appid_
        self.id_ = page.id_
        self.unique_id = page.id_
        self.ext_info = Object()
        self.update_ext_info(kwargs)

    def __eq__(self, __value: object) -> bool:
        if not isinstance(__value, SafariNormalPage):
            return False
        return self.unique_id == __value.unique_id



class SafariWebViewPage(SafariNormalPage, WebViewPage):
    REG_LIST = [ re.compile(r"^https://servicewechat\.com/(?P<appid>wx[a-z0-9]+)"), re.compile(r"^https://servicewechat\.com/(?P<appid>preload)/page-frame.html")]
    appid = None

class SafariAppServicePage(SafariNormalPage):
    REG_LIST = [ re.compile(r"Appid\[(?P<appid>wx[a-z0-9]+)\]"), ]
    appid = None
    type_ = None  # wechat_mp_inspector.inspector.ioswxainspector.INSPECTORS

class IgnorePage(SafariNormalPage):
    REG_LIST = [re.compile(r"Appid\[Preload\]"), re.compile(r"https://servicewechat\.com/preload"), re.compile(f"^file:///")]


if __name__ == "__main__":
    pass
