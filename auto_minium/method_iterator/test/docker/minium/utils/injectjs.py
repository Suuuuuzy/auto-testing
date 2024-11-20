#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         yopofeng
Filename:       injectjs.py
Create time:    2021/9/24 21:21
Description:    获取注入的js文件

"""
import os
import re
from enum import Enum
import copy


JS_PATH = os.path.join(os.path.dirname(__file__), "js")
MIN_JS_PATH = os.path.join(JS_PATH, "min")
ES5_JS_PATH = os.path.join(JS_PATH, "es5")  # 只是es5语法的


# 真机调试2.0只支持es5, 所有evaluate的内容都需要先经过转码
class JsMode(Enum):
    ALL = 0
    JUST_ES5 = 1


JS_MODE = JsMode.JUST_ES5


# 注入js代码的cache, 无需重复读文件
class JsCache(dict):
    # 部分简单的代码直接定义
    common_code = {
        "clearMockAuth": "function() {global.__minium__.auth_setting = {}}",  # 清除mock的auth信息
        "getAllPagesPath": "function(){return __wxConfig.pages}",  # 获取小程序所有页面路径
    }

    def __init__(self, *args, **kwargs):
        super(JsCache, self).__init__(*args, **kwargs)
        for mode in JsMode:
            self[mode] = copy.deepcopy(JsCache.common_code or {})

    def getJsCode(self, filename, mode: JsMode = None) -> str:
        if mode is None:
            mode = JS_MODE
        return self[mode][filename]

    def setJsCode(self, filename, content: str, mode: JsMode = None):
        if mode is None:
            mode = JS_MODE
        self[mode][filename] = content

    def has(self, filename, mode: JsMode = None):
        if mode is None:
            mode = JS_MODE
        return filename in self[mode]


JS_CACHE = JsCache()


def setInjectJsMode(mode: JsMode):
    global JS_MODE
    JS_MODE = mode


def getInjectJsCode(filename: str, format_info=None, mode: JsMode = None) -> str:
    """
    :param filename: {JS_PATH} 中 JS 文件名字（不需要后缀）
    :param format_info: JS 内容中需要进行格式化的信息, 如内容中包含 `%s` `%(arg)s` 等的可格式化信息

    部分注入的js需要动态格式化且%(\w+)s这类的语法会导致无法压缩, 使用 `r"$_\w+_$"` 替换JS中的 `%(\w+)s`, 在读取后替换回可格式化格式
    exp: %(origin)s 在js代码中使用 $_origin_$ 代替
    """
    if mode is None:
        mode = JS_MODE
    if JS_CACHE.has(filename, mode):
        if format_info:
            return JS_CACHE.getJsCode(filename, mode) % format_info
        return JS_CACHE.getJsCode(filename, mode)
    if mode is JsMode.JUST_ES5:
        min_js_file_path = os.path.join(ES5_JS_PATH, "%s.js" % filename)
    else:
        min_js_file_path = os.path.join(MIN_JS_PATH, "%s.js" % filename)
    is_min_file = False
    if os.path.isfile(min_js_file_path):
        js_file_path = min_js_file_path
        is_min_file = True
    else:
        if mode is JsMode.JUST_ES5:
            raise TypeError(f"can't find {filename}.js in just es5 mode")
        js_file_path = os.path.join(JS_PATH, "%s.js" % filename)  # source
    if os.path.isfile(js_file_path):
        with open(js_file_path, "r", encoding="utf8") as fd:
            content = fd.read()
            if not is_min_file:  # 没有压缩过的文件需要过滤一下注释
                content = re.sub(
                    r"^\s*//[^\n]*\s+", "", content, flags=re.M
                )  # 过滤文件头的注释
                content = re.sub(
                    r"^\s*/\*.*?\*/\s*", "", content, flags=re.S
                )  # 过滤文件头的注释
            content = re.sub(r"\$_(\w+)_\$", "%(\g<1>)s", content)  # 替换可格式化变量
            JS_CACHE.setJsCode(filename, content.strip(), mode)
            if format_info:
                return JS_CACHE.getJsCode(filename, mode) % format_info
            return JS_CACHE.getJsCode(filename, mode)
    raise RuntimeError("can't find {filename}.js, please check")


if __name__ == "__main__":
    print(getInjectJsCode("requestStack"))
