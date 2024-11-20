#!/usr/bin/env python3
# Created by xiazeng on 2020/5/27
import logging
import at.miniprogram.weapp
from attestbase import AtTestBase

logger = logging.getLogger()


class MiniTest(AtTestBase):
    def test_click_pay(self):
        m = at.miniprogram.weapp.WeApp(None, is_luggage=True)
        m.current_page.by_css_selector("body > wx-view > wx-button:nth-child(4)").click()