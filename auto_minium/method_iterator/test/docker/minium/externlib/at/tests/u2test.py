#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/5/20
Description:    

"""
import logging
import time
import unittest

logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)-5.5s %(asctime)s %(filename)s %(funcName)s %(lineno)-3d %(message)s")

logger = logging.getLogger()

import uiautomator2


class U2Test(unittest.TestCase):
    def setUp(self) -> None:
        self.d = uiautomator2.connect()

    def test_dump(self):
        total = 0
        for i in range(100):
            s = time.time()
            content = self.d.dump_hierarchy()
            costs = time.time() - s
            if costs > 5:
                logger.info("异常:%s, %s", i, costs)
            total += costs
        logger.info("平均耗时:%s", total/100)
