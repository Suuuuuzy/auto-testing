#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-06-14 11:36:19
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-14 14:29:38
FilePath: /py-minium/minium/miniprogram/base_driver/page/skylinepage.py
Description: skyline 的 page实例
'''
import types
import typing
from functools import wraps
from .page import Page, RetryableApi

def not_imp_wrapper(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        raise NotImplementedError(f"skyline页面暂不支持{func.__name__}方法")
    return wrapper

def not_imp_get_set(name):
    def f(*args):
        raise (f"skyline页面暂不支持{name}属性")
    return f

class NotImp(RetryableApi):
    """继承自父类的方法都设置为`NotImplemented`"""
    def __new__(mcs, cls_name, bases, attr_dict):
        for base in bases:
            for name, prop in base.__dict__.items():
                if name in attr_dict:
                    continue
                if name.startswith("__"):
                    continue
                if isinstance(prop, property):
                    attr_dict[name] = property(
                        not_imp_get_set(name),
                        not_imp_get_set(name)
                    )
                elif isinstance(prop, types.FunctionType):
                    attr_dict[name] = not_imp_wrapper(prop)
        return super().__new__(mcs, cls_name, bases, attr_dict)


class SkylinePage(Page, metaclass=NotImp):
    """skyline 的 page实例"""
    def __init__(self, page_id, path, query, renderer="skyline", *args, app = None):
        super().__init__(page_id, path, query, renderer, *args, app=app)
        self._is_webview = False

    @property
    def is_webview(self):
        return self._is_webview
