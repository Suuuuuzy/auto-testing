#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/4/6
Description:    

"""
import base64
import datetime
import os
import logging
import time


class ScreenHelper:
    SCREEN_LIST = []  # 遇到控制多台手机会有问题
    SCREEN_DIR = None

    def __init__(self, http):
        self.http = http
        logging.debug("create screen helper")

    def screen_shot(self, name):
        if self.SCREEN_DIR is None:
            logging.error("called after screen_on_operation")
            return
        relative_path = "%d.jpg" % int(time.time() * 1000)
        path = os.path.join(self.SCREEN_DIR, relative_path)
        value = self.http.get("screenshot").value
        raw_value = base64.b64decode(value)
        with open(path, "wb") as f:
            f.write(raw_value)
        screen_info = {
            "name": name,
            "time": datetime.datetime.now().strftime("%Y%m%d %H:%M:%S"),
            "relative_path": relative_path,
        }
        if len(ScreenHelper.SCREEN_LIST) > 1024:
            ScreenHelper.SCREEN_LIST.pop()
        ScreenHelper.SCREEN_LIST.append(screen_info)
        return path

    @classmethod
    def screen_on_operation(cls, screen_dir):
        logging.debug("screen_dir:%s", screen_dir)
        cls.SCREEN_DIR = screen_dir
