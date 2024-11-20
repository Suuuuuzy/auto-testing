#!/usr/bin/env python
# encoding:utf-8
import json
import logging
import random
import time

import at.utils.apkinfo
from attestbase import AtTestBase

logger = logging.getLogger()


class AtDeviceTest(AtTestBase):
    def setUp(self):
        super(AtDeviceTest, self).setUp()
        self.device = self.at.device

    def tearDown(self) -> None:
        pass  # self.test_dump()

    def test_enter(self):
        goods = {"goods_id": 66, "env": "beta", "api_id": "26345264",
                 "goods_order": {"env": "beta", "http_heads": {"WepayTest": "apitool", "Wepaytest-Uin": "3190375045"},
                                 "ip": "", "port": "",
                                 "req": {"_sign_key": "2480150211@APIKEY#test0123456789", "appid": "wxac5f4027faf15924",
                                         "attach": "attach", "body": "body", "detail": {"cost_price": "6",
                                                                                        "goods_detail": [
                                                                                            {"goods_id": "1",
                                                                                             "goods_name": "\u5546\u54c15678",
                                                                                             "price": "5",
                                                                                             "quantity": "1",
                                                                                             "wxpay_goods_id": "5678"},
                                                                                            {"goods_id": "1",
                                                                                             "goods_name": "\u5546\u54c15678",
                                                                                             "price": "1",
                                                                                             "quantity": "1",
                                                                                             "wxpay_goods_id": "5678"}],
                                                                                        "receipt_id": "wx123"},
                                         "device_info": "iphone", "fee_type": "CNY", "goods_tag": "",
                                         "mch_id": "2480150211", "nonce_str": "",
                                         "notify_url": "http://9.2.165.87:37845/fake/revcpaynotifyv2", "openid": "",
                                         "out_trade_no": "autotest_20210720162036_60882", "pay_sign_id": "",
                                         "product_id": "", "profit_sharing": "", "receipt": "", "risk_info": "",
                                         "risk_level": "", "scene_info": {
                                         "store_info": {"address": "ddf", "area_code": "addf", "id": "id",
                                                        "name": "name"}}, "sign": "", "sign_type": "",
                                         "spbill_create_ip": "", "sub_mch_id": "", "time_expire": "", "time_start": "",
                                         "total_fee": 5.0, "trade_type": "JSAPI", "version": "", "user_truename": " "},
                                 "timeout": 6, "uri": "/pay/unifiedorder"}}
        s = json.dumps(goods)
        self.at.e.edit_text().click()
        while s:
            sub_str = s[:128]
            s = s[128:]
            text = sub_str.replace('"', '\"')
            self.adb.run_shell("am broadcast -a ADB_INPUT_TEXT --es msg '%s'" % text)

    def test_gesture(self):
        width = self.device.width()
        height = self.device.height()
        points = [
            (int(width * 0.1), int(0 + height * 0.5)),
            (int(width * 0.5), int(height * 0.1)),
            (int(width * 0.9), int(height * 0.5)),
            (int(width * 0.5), int(height * 0.9)),
            (int(width * 0.1), int(height * 0.5)),
        ]
        self.device.gesture(points)

    def test_screen(self):
        width = self.device.width()
        height = self.device.height()
        self.device.screen_shot("test.png")
        self.device.screen_point("half.png", 0, 0, width/2, height/2)

    def test_scroll(self):
        self.device.scroll_one_forth_page("up", 1)
        self.device.scroll_one_forth_page("up", 1)
        self.device.scroll_one_forth_page("down", 1)
        self.device.scroll_one_forth_page("down", 1)

    def test_many_dump(self):
        logging.basicConfig(level=logging.INFO)
        total = 0
        for i in range(100):
            s = time.time()
            content = self.at.java_driver.dump_all_views()
            costs = time.time() - s

            if costs > 5:
                logger.info("异常:%s, %s", i, costs)
            total += costs
        logger.info("平均耗时:%s", total / 100)

    def test_get_close_btn(self):
        self.at.java_driver.request_configure('setUseCustom', [True])
        self.at.java_driver.request_configure('setBlockKindaMain', [True])
        text = self.at.e.rid("com.tencent.mm:id/closeModalBtn").get_desc()
        print(text)

    def test_get_current_activity(self):
        act = self.adb.get_current_activity()
        print(act)

    def test_dump_diff_visisble(self):
        # self.at.java_driver.request_configure('setIgnoreNotVisibleNode', [True])
        # logger.info(f"{'='*40}ignoreNotVisibleNode=true{'='*40}")
        # self.test_dump()
        self.at.java_driver.request_configure('setIgnoreNotVisibleNode', [False])
        logger.info(f"{'=' * 40}ignoreNotVisibleNode=false{'=' * 40}")
        self.test_dump()

    def test_dump(self):
        index = 0
        # self.at.java_driver.remove_kinda_main(True)
        for ui_views in self.at.java_driver.dump_all_views():
            logging.info("%s index=%s %s", "=" * 60, index, "=" * 60)
            index += 1
            for ui_view in ui_views:
                logging.info(ui_view)
        # self.at.java_driver.reconnect()
        # for ui_views in self.at.java_driver.dump_all_views():
        #     logging.info("=" * 120)
        #     for ui_view in ui_views:
        #         logging.info(ui_view)

    def test_long_time_dump(self):
        # logger.setLevel(logging.INFO)
        t = time.time()
        index = 1
        width = self.at.device.width()
        height = self.at.device.height() - 100
        while time.time() - t < 60 * 60:
            self.at.device.click_on_point(random.randint(0, width), random.randint(0, width))
            if random.random() < 0.1:
                self.adb.press_back()
            elif random.random() < 0.1:
                self.adb.press_home()
            ui_views_list = self.at.java_driver.dump_all_views()
            count = 0
            for ui_views in ui_views_list:
                count += len(ui_views)
            logger.info(f"{index} window count:{len(ui_views)}, view count:{count}")
            index += 1

    def test_finish(self):

        self.at.e.text('1').click()

    def test_height(self):
        height = self.at.device.height()
        status_height = self.at.device.status_bar_height()
        logging.info("%s, %s", height, status_height)

    def test_parser(self):
        ai = at.utils.apkinfo.ApkInfo("/Users/xiazeng/Downloads/wxpayface-lpos-release-2.22.100.46-signed.apk")
        print(ai.to_dict())

    def test_window_handle(self):
        window_handle_general = r"(^(完成|关闭|关闭应用|好|允许|始终允许|好的|确定|确认|安装|下次再说|知道了|同意)$|(.*((?<!不)(忽略|允(\s){0,2}许|同(\s){0,2}意)|继续|清理|稍后|稍后处理|暂不|暂不设置|强制|下一步)).*)|^((?i)allow|Sure|SURE|accept|install|done|ok)$"
        window_handle_general = r"(^(完成|关闭|关闭应用|好|允许|始终允许|好的|确定|确认|安装|下次再说|知道了|同意)$|(.*((?<!不)(忽略|允(\s){0,2}许|同(\s){0,2}意)|继续|始终允许|清理|稍后|稍后处理|暂不|暂不设置|强制|下一步)).*)"

        self.at.event_monitor.add_event_click(self.at.e.text_matches(window_handle_general).clickable(True),
                                              self.at.e.text_matches(window_handle_general).clickable(True))
        # for sp in window_handle_special:
        #     self.at.event_monitor.add_event_click(self.at.e.text_matches(sp[0]), self.at.e.text_matches(sp[1]))
        time.sleep(60)

    def test_event_monitor(self):
        self.at.event_monitor.add_selector_filter("preftest_permission1", self.at.e.text_contains("允许微信拍摄"),
                                                  self.at.e.text("仅在使用该应用时允许"))
        self.at.event_monitor.add_selector_filter("preftest_permission2", self.at.e.text_contains("允许微信录音"),
                                                  self.at.e.text("仅在使用该应用时允许"))
        self.at.event_monitor.add_selector_filter("preftest_permission3", self.at.e.text_contains("允许微信获取"),
                                                  self.at.e.text("仅在使用该应用时允许"))
        time.sleep(40)

    def test_is_exists(self):
        click_count = 0
        for i in range(100):
            if self.at.e.text("发现").click_if_exists():
                click_count += 1
        print("success click:", click_count)

    def test_click(self):
        while True:
            self.at.device.click_on_point(1000, 2300)
            time.sleep(0.02)

    def test_get_current_package(self):
        for i in range(1000):
            logger.info(self.device.current_package())
            time.sleep(1)

    def test_clickNOn(self):
        self.at.e.text("zx").click()

    def test_enter(self):
        self.at.device.enter("adaldagdad")

    def test_logcat(self):
        self.at.logcat.start_record("test1", "MicroMsg.DynamicConfig")
        self.at.logcat.start_record("test2", "MicroMsg.KeyBordUtil")
        self.at.logcat.start_record("test3", "MicroMsg.RoomServiceFactory")
        for i in range(1):
            self.at.adb.stop_app("com.tencent.mm")
            self.at.adb.start_app("com.tencent.mm", "ui.LauncherUI")
            time.sleep(10)
        for name in self.at.logcat.filter_map:
            lines = self.at.logcat.get_lines(name)
            logger.info("%s, lines num:%s", name, len(lines))
