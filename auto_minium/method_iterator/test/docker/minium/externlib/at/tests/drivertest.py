#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/5/14
Description:    

"""
import logging

import attestbase
import at.webdriver.driver

logging.basicConfig(level=logging.DEBUG)


class DriverTest(attestbase.AtTestBase):
    def test_click(self):
        pid = self.at.adb.get_android_pid("com.tencent.mm:tools")
        web_sock = at.webdriver.driver.get_local_sock(self.at.serial, "xweb_devtools_remote_%d" % pid)
        page = at.webdriver.driver.WebPage(web_sock, self.at.adb.serial, self.at)
        page.by_text_contains("统计").click()
        page.close()

    def test_click_lr(self):
        pid = self.at.adb.get_android_pid("com.tencent.mm:toolsmp")
        web_sock = at.webdriver.driver.get_local_sock(self.at.serial, "xweb_devtools_remote_%d" % pid)
        page = at.webdriver.driver.WebPage(web_sock, self.at.adb.serial, self.at)
        texts = page.invoke_js('getTexts')
        for text in texts:
            logging.info(text)
        web_sock.close()
        return texts
