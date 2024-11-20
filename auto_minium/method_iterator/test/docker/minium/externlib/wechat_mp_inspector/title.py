'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-07-03 14:14:00
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-07-05 10:35:17
FilePath: /wechat-mp-inspector/wechat_mp_inspector/title.py
Description: 根据tab的title判断链接实例
'''
import re

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

class TitleInfo(object):
    """小程序tab标题"""

    def __new__(cls, title: str, *args):
        if isinstance(title, TitleInfo):
            return title
        ts = title.split(":")
        inst = None
        if len(ts) == 3:
            if re.match(f"wx[a-z0-9]+", ts[0]) and state_match(WebViewTitle.STATE, ts[2]):
                inst = object.__new__(WebViewTitle)
            elif reg_match(AppServiceTitle.REG_LIST, title):
                inst = object.__new__(AppServiceTitle)
                if title.startswith("wx"):
                    inst.appid = ts[0]
            elif reg_match(IgnoreTitle.REG_LIST, title):
                return None  # 直接不创建实例
        if not inst:
            inst = object.__new__(TitleInfo)
        return inst

    def __init__(self, title: str, *args) -> None:
        if isinstance(title, TitleInfo):
            return
        self._title = title  # 原始title

    def __str__(self) -> str:
        return self._title


class WebViewTitle(TitleInfo):
    STATE = ("INITIAL", "VISIBLE", "INVISIBLE")
    def __init__(self, title: str) -> None:
        if isinstance(title, TitleInfo):
            return title
        self._title = title  # 原始title
        ts = title.split(":")
        self.appid = ts[0]
        self.path = ts[1]
        vsb = ts[2].upper()
        state = state_match(WebViewTitle.STATE, vsb)
        self.visible = (
            True
            if state == "VISIBLE"
            else (False if state == "INVISIBLE" else None)
        )
        self.initial = True if state == "INITIAL" else False


class AppServiceTitle(TitleInfo):
    REG_LIST = [r"\d+:\d+:WxaService", r"wx[a-z0-9]+:\d+:service"]
    appid = None
    def __init__(self, title: str) -> None:
        super().__init__(title)

# 需要忽略的title, 减少不必要的检查
class IgnoreTitle(TitleInfo):
    REG_LIST = [r"^Magic.*"]
