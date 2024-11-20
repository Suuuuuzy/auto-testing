#!/usr/bin/env python3
# created 2021/6/4 by xiazeng
import logging
import attestbase
import at.webdriver.driver


class WebDriverTest(attestbase.AtTestBase):

    def get_h5_texts(self, process_name):
        """
        :param process_name: 测试进程支付com.tencent.mm:tools， mp业务：com.tencent.mm:toolsmp，搜一搜: com.tencent.mm
        :return:
        """
        pid = self.adb.get_android_pid(process_name)
        serial = self.at.serial

        web_sock = at.webdriver.driver.get_local_sock(serial, "xweb_devtools_remote_%d" % pid)
        if not web_sock:
            return []
        page = at.webdriver.driver.WebPage(web_sock, serial)
        texts = page.invoke_js('getTexts')
        for text in texts:
            logging.info(text)
        web_sock.close()
        return texts

    def test_dump_texts(self):
        self.get_h5_texts("com.tencent.mm:tools")
        self.get_h5_texts("com.tencent.mm")
        self.get_h5_texts("com.tencent.mm:toolsmp")