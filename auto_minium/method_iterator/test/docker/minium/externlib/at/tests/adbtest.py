#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2020/8/28
Description:    

"""
import logging
from attestbase import AtTestBase


class AdbTest(AtTestBase):
    def test_file_exists(self):
        ret = self.at.adb.file_exists("/sdcard/Android")
        self.assertTrue(ret)
        ret = self.at.adb.file_exists("/sdcard/Androidd")
        self.assertFalse(ret)

    def test_get_act(self):
        act = self.at.adb.get_current_activity()
        print(act)