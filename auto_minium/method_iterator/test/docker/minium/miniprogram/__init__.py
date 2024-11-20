#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       __init__.py
Create time:    2019/11/28 15:59
Description:

"""
import typing
from .wx_minium import WXMinium
from .qq_minium import QQMinium


# application
APP_WX = "wx"
APP_QQ = "qq"

APP = {"wx": WXMinium, "qq": QQMinium}

Minium = typing.Union[WXMinium, QQMinium]
def get_minium_driver(conf, *args, **kwargs) -> Minium:
    if conf is None:
        conf = {}
    application = conf.get("app", APP_WX) if isinstance(conf, dict) else APP_WX
    if application not in APP.keys():
        raise RuntimeError("the 'app' in your config file is not in predefine, not support yet")
    return APP[application](conf, *args, **kwargs)
