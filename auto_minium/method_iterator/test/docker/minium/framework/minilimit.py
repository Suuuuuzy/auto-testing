#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       minilimit.py
Create time:    2019/12/23 17:49
Description:

"""
from functools import wraps

__all__ = ["limit"]


def limit(platform="all", app="all", pack_name=None, sort=None):
    """
    用例装饰器
    :param platform: 系统平台
    :param app: 应用
    :param pack_name: 打包名称
    :param sort: 包内排序
    :return:
    """

    def set_limit(func):
        setattr(func, "platform", platform)
        setattr(func, "app", app)
        setattr(func, "pack_name", pack_name)
        setattr(func, "sort", sort)

        @wraps(func)
        def wrapper(*args, **kwargs):
            rtn = func(*args, **kwargs)
            return rtn

        return wrapper

    return set_limit


@limit(platform="ios", app="wx", pack_name="pkg1")
def casetest():
    print(1111)


if __name__ == "__main__":
    module = __import__("minilimit")
    attr = dir(module)
    func = getattr(module, "casetest")
    func_attr = dir(func)
    platform = getattr(func, "platform")
    app = getattr(func, "app")
    pack_name = getattr(func, "pack_name")
    sort = getattr(func, "sort")
    print(22222)
