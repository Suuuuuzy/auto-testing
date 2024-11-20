#!/usr/bin/env python3
# Created by xiazeng on 2020/4/13
import logging
from attestbase import AtTestBase

logger = logging.getLogger()


class AtEvent(AtTestBase):
    def test_a(self):
        self.at.event_monitor.add_selector_filter("test", self.at.e.text("测试"), self.at.e.text("测试"))
        self.at.event_monitor.add_selector_filter("test", self.at.e.text("测试"), self.at.e.text("测试"))
        self.at.java_driver.reconnect()
        self.at.e.text("发现").click()

    def test_mm(self):
        for i in range(20):
            self.at.e.rid("com.tencent.phoenix:id/rvSubTemplates").child().rid(
                "com.tencent.phoenix:id/vRootTemplate").swipe_left(2)
