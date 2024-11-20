#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/5/20
Description:    

"""
import logging
import unittest

logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)-5.5s %(asctime)s %(filename)s %(funcName)s %(lineno)-3d %(message)s")

logger = logging.getLogger()

from airtest.core.api import *


class AirTestTest(unittest.TestCase):
    def setUp(self) -> None:
        init_device()

    def test_login(self):
        touch((100, 100))
