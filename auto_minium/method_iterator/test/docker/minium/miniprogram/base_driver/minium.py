#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Author: yopofeng yopofeng@tencent.com
Date: 2022-10-12 11:50:48
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-03-27 11:48:24
FilePath: /py-minium/minium/miniprogram/base_driver/minium.py
Description: minium基类
"""
from .app import App
from .connection import Connection
from .minium_object import MiniumObject
from ...framework.miniconfig import MiniConfig
from ...native import NativeType


class BaseMinium(MiniumObject):
    """
    自动化入口
    """

    app: App
    connection: Connection
    conf: MiniConfig
    native: NativeType
    platform: str
    is_app_relaunching: bool = False

    def __init__(
        self,
        conf: MiniConfig = None,
        uri="ws://localhost",
        native: NativeType = None,
        **kwargs,
    ):
        super().__init__()

    # framework use
    def wait_app_relaunch(self) -> None or Exception:
        ...

    def clear_auth(self):
        """清除用户授权信息"""
        ...

    def get_system_info(self) -> dict:
        """获取系统信息

        :return dict: 同小程序接口[wx.getSystemInfo](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfo.html)
        """
        ...

    def enable_remote_debug(self, use_push=True, path=None, connect_timeout=180):
        """在真机上运行自动化

        :param bool use_push: 是否直接推送到客户端, defaults to True
        :param str path: 远程调试二维码的保存路径, defaults to None
        :param int connect_timeout: 连接超时时间，单位 s, defaults to 180
        """
        ...

    def reset_remote_debug(self):
        """重置远程调试，解决真机调试二维码扫码界面报-50003 等常见错误。一般供测试框架调用"""
        ...

    def shutdown(self):
        """测试结束时调用, 停止 微信开发者IDE 以及 minium, 并回收资源。一般供测试框架调用"""
        ...
