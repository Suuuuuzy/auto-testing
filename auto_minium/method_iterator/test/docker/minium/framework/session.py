#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author: lockerzhang
@LastEditors: lockerzhang
@Description: 自动化 session
@Date: 2019-03-11 14:42:37
@LastEditTime: 2019-03-11 21:05:21
"""
import minium
import logging.handlers
import json
import os
import time
from minium.framework import report
from multiprocessing import Process, Queue
from queue import Empty
from minium.framework import minitest
from .miniconfig import MiniConfig
import minium.miniprogram.base_driver.minium_log as minum_log
import traceback
import sys

logger = logging.getLogger("minium.SESSION")
FILENAME_SUMMARY = "summary.json"


class Session(Process):
    """
    管理多机多账号运行
    """

    def __init__(self, conf: dict, queue: Queue, generate_report: bool = False):
        """
        初始化
        :param conf: 配置
        :param queue: 用例队列
        :param generate_report: 是否生成报告
        """
        super(Session, self).__init__()
        self.port = conf.get("port")
        self.nick_name = conf.get("account_info", {}).get("wx_nick_name", None)
        self.open_id = conf.get("account_info", {}).get("open_id", None)
        self.device_id = conf.get("device_desire", {}).get("device_info", {}).get("udid", None)
        if self.device_id is None:
            self.device_id = (
                conf.get("device_desire", {}).get("device_info", {}).get("serial", None)
            )
        self.os_type = conf.get("platform")
        self.platform = conf.get("app")
        # bug 预警: 多线程中传入不能被序列化的类时，在 spawn 模式下会导致线程启动失败
        self.conf = json.dumps(conf)
        self.queue = queue
        self.mini = None
        self.native = None
        self.generate_report = generate_report

    def run(self) -> None:
        minitest.AssertBase.CONFIG = MiniConfig(json.loads(self.conf))
        minitest.AssertBase.setUpConfig()
        while True:
            try:
                tests = self.queue.get(timeout=10)
                result = self.run_case(tests=tests)
                result.dumps(minitest.AssertBase.CONFIG.outputs)
            except Empty:
                logger.info(f"case queue is empty, test complete, release {self.device_id}")
                break
            except Exception as e:
                logger.info("run case error")
                logger.exception(e)
                exc_type, exc_value, exc_traceback = sys.exc_info()
                minum_log.report_exception(minum_log.ExceptionData(exc_value))
                break

        try:
            if not minitest.AssertBase.CONFIG.debug:
                minitest.full_reset()
        except Exception as e:
            logger.error("reset error")
            logger.exception(e)

        # gen report
        if self.generate_report:
            report.imp_main(minitest.AssertBase.CONFIG.outputs)

    @staticmethod
    def run_case(tests):
        """
        执行用例
        :return:
        """
        result = minium.MiniResult()
        tests.run(result)
        result.print_shot_msg()
        return result
