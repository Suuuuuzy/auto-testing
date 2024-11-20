"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-06-06 16:54:44
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-06 16:55:52
FilePath: /wechat_mp_inspector/__init__.py
Description: 封装底层与webdriver类似的小程序自动化驱动
"""

import json
import os
from .logger import setLevel, logger
from .miniprogram import MiniProgram
from .officialaccount import OfficialAccount
from .mpdriver import SkylinePage, WebviewPage, H5Page


from .driver.androiddriver import AndroidConfig, AndroidDriver

with open(os.path.join(os.path.dirname(__file__), "build_info.json"), "r") as fd:
    build_info = json.load(fd)

version = build_info["version"]
