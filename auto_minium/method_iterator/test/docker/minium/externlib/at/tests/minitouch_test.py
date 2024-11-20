# -*- coding: utf-8 -*-
# Created by xiazeng on 2020/3/10
import time
import logging
from at.tests.attestbase import AtTestBase
from at.core.stf.minitouch import MiniTouch

logger = logging.getLogger()


class MiniTouchTest(AtTestBase):
    def setUp(self):
        super(MiniTouchTest, self).setUp()
        self.front = MiniTouch(self.at.serial, input_event="/dev/input/event1")
        self.back = MiniTouch(self.at.serial, input_event="/dev/input/event0")

    def tearDown(self):
        self.front.release()
        self.back.release()

    def test_feed_back(self):
        self.front.click(399, 650)

    def test_click(self):
        self.back.click(100, 800)
        time.sleep(5)
        self.front.click(400, 1100)
        time.sleep(1)
        for i in range(11):
            self.front.click(750, 20)
            time.sleep(0.1)
