'''
Author: yopofeng yopofeng@tencent.com
Date: 2022-01-17 14:18:17
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-21 19:51:34
FilePath: /py-minium/minium/native/qq_native/qbasenative.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
#!/usr/bin/env python
# encoding: utf-8
"""
@author: brill
@file: qbasenative.py
@time: 2019/7/22 10:35 AM
@desc:
"""
# !/usr/bin/env python3
# Created by xiazeng on 2019-05-22
from minium.native.wx_native.basenative import BaseNative


class QBaseNative(BaseNative):
    def __init__(self, json_conf):
        super(QBaseNative, self).__init__()

    def open_remote_debug(self, scheme_url):
        raise NotImplementedError()

    def release(self):
        raise NotImplementedError()

    def start_qq(self):
        """
        启动QQ
        :return:
        """
        raise NotImplementedError()

    def stop_qq(self):
        """
        启动QQ
        :return:
        """
        raise NotImplementedError()


class NativeError(RuntimeError):
    pass
