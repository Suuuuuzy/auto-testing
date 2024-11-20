#!/usr/bin/env python
# encoding:utf-8
import logging

from attestbase import AtTestBase

logger = logging.getLogger()


class ElementTest(AtTestBase):
    @property
    def e(self):
        return self.at.e

    def test_action(self):
        self.e.text(u"发现").click()
        self.e.list_view().swipe_left()
        self.e.list_view().swipe_right()
        self.e.text(u"朋友圈").click()
        self.e.list_view().swipe_up()
        self.e.list_view().swipe_down()

    def test_input(self):
        self.e.edit_text().enter("hello world!")
        self.e.edit_text().enter("hello ", is_clear_text=False)
        self.e.edit_text().enter("world", is_click=False)

    def test_enter_sns(self):
        a = self.at
        a.e.text("发现").click()
        a.e.text("朋友圈").click()
        a.e.desc("拍照分享").long_click()
        a.e.text("我知道了").click_if_exists()
        a.e.edit_text().enter("发个纯文本朋友圈")
        a.e.text("发表").click()
        a.e.text("发个纯文本朋友圈").assert_exists()

    def test_mm_enter(self):
        # self.at.device.enter("测试")
        # self.at.e.edit_text().enter("测试")
        self.at.e.cls_name("android.widget.EditText").enter("测试")  # com.tencent.mm.ui.widget.cedit.edit.CustomEditText

    def test_exists(self):
        print(self.at.e.pkg("com.tencent.mm").desc(u"图片").exists())

    def test_handle_modal(self):
        self.at.e.text("")

    def test_index_click(self):
        for ui_views in self.at.java_driver.dump_all_views():
            logging.info("=" * 120)
            for ui_view in ui_views:
                logging.info(ui_view)
        self.e.rid("com.tencent.mm:id/d8a").index(6).click()
        self.e.rid("android.view.View").index()
