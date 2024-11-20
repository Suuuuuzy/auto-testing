#!/usr/bin/env python
# encoding:utf-8
import logging
import logging.config
import unittest

import at
import at.core.config

logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)-5.5s %(asctime)s %(filename)s %(funcName)s %(lineno)-3d %(message)s")

logger = logging.getLogger()


class AtTestBase(unittest.TestCase):
    def setUp(self):
        logging.basicConfig(level=logging.DEBUG)
        self.at = at.At()
        self.adb = self.at.adb
