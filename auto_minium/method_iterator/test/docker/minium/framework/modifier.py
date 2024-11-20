'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-08-15 11:02:28
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-08-28 13:43:22
FilePath: /py-minium/minium/framework/modifier.py
Description: 定义一些用例修饰器
'''
from .libs.unittest.case import skipIf

__all__ = [
    "skipAtPlatform",
    "skipAtCloud",
    "justAtPlatform",
    "justAtCloud",
]

def wrapOnce(wrapper, func):
    if hasattr(func, "__wrapped_once__"):  # 已经修饰过
        func = func.__wrapped_once__  # 拿到最原始的一个
    _wrapper = wrapper(func)
    _wrapper.__wrapped_once__ = func
    return _wrapper

def wrapClass(cls, wrapper):
    for name, func in list(cls.__dict__.items()):
        if name.startswith("test") and callable(func):
            setattr(cls, name, wrapOnce(wrapper, func))
    return cls

def wrapAll(wrapper):
    def _wrapper(wrapped):
        if isinstance(wrapped, type):  # is a class
            return wrapClass(wrapped, wrapper)
        else:
            return wrapOnce(wrapper, wrapped)
    return _wrapper


def skipAtPlatform(platform):
    """当前用例运行环境platform == {platform}时, 跳过用例. 仅支持修饰继承MiniTest的方法"""
    return wrapAll(skipIf(lambda self: self.test_config.platform == platform, f"不支持{platform}上运行"))

"""当前用例运行环境为云测时, 跳过用例. 仅支持修饰继承MiniTest的方法"""
skipAtCloud = wrapAll(skipIf(lambda self: self.test_config.platform.endswith("cloud"), "不支持云真机上运行"))

def justAtPlatform(platform):
    """当前用例运行环境platform == {platform}时, 运行用例. 仅支持修饰继承MiniTest的方法"""
    return wrapAll(skipIf(lambda self: self.test_config.platform != platform, f"仅支持{platform}上运行"))

"""当前用例运行环境为云测时, 运行用例. 仅支持修饰继承MiniTest的方法"""
justAtCloud = wrapAll(skipIf(lambda self: not self.test_config.platform.endswith("cloud"), "仅支持云真机上运行"))


