'''
Author: yopofeng
Date: 2023-09-27 23:41:11
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-29 11:05:40
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/pages.py
Description: 定义各种page实例

Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
'''

from dataclasses import dataclass, asdict
import re
from typing import Union, List, Mapping
from ..utils import Object
from json import JSONEncoder

@dataclass  
class BasePage:
    title: str = ''
    url: str = ''

class NormalPage(BasePage):
    unique_id = None
    empty = False

    def __init__(self, title='', url='', **kwargs):
        super().__init__(title, url)
        self.ext_info = Object()
        self.update_ext_info(kwargs)

    def __eq__(self, __value: object) -> bool:
        if not isinstance(__value, NormalPage):
            return False
        return self.unique_id == __value.unique_id
    
    def __str__(self) -> str:
        return f"id: {self.unique_id}, type: {self.__class__.__name__}, url: {self.url}, title: {self.title}"

    def update_ext_info(self, info: dict):
        for k, v in info.items():
            if v is not None:
                self.ext_info[k] = v

class WebViewPage(NormalPage):
    appid: str = ''
    path: str = ''
    # visible: bool = None
    # initial: bool = False

class AppServicePage(NormalPage):
    appid = ''

class DataClassJSONEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, BasePage):
            return asdict(o)
        # Let the base class default method raise the TypeError
        return JSONEncoder.default(self, o)

