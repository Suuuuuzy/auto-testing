#!/usr/bin/env python3
# Created by xiazeng on 2020/4/13
import logging
import time
from attestbase import AtTestBase

logger = logging.getLogger()


class AtEvent(AtTestBase):
    def on_click(self, data):
        print(data)

    def test_a(self):
        self.at.on_at_event("click", self.on_click)
        time.sleep(120)
