#!/usr/bin/env python
# encoding: utf-8
"""
@author: brill
@file: qandroidnative.py
@time: 2019/7/22 10:52 AM
@desc:
"""
import time

import at

from minium.framework.exception import *
from minium.native.qq_native.qbasenative import QBaseNative, NativeError
from ..lib.android_base import UiDefine

QQ_PACKAGE = "com.tencent.mobileqq"
QQ_ACTIVITY = ".activity.SplashActivity"

QQ_MINI_ACTIVITY = "com.tencent.mobileqq.mini.appbrand.ui.AppBrandUI"


class QUiDefine(UiDefine):
    pass


class QAndroidNative(QBaseNative):
    def __init__(self, json_conf):
        super(QAndroidNative, self).__init__(json_conf)
        if json_conf is None:
            json_conf = {}
        self.serial = json_conf.get("serial")
        self.at = at.At(self.serial)
        self.ui = QUiDefine(self.at)

    # 打开scheme
    def open_remote_debug(self, scheme_url):
        self.at.apkapi.launch()
        self.start_qq()
        self.open_scheme(scheme_url)
        self.at.e.cls_name("com.tencent.tbs.core.webkit.WebView").exists(20)

    #  打开qq
    def start_qq(self):
        self.at.adb.start_app(QQ_PACKAGE, QQ_ACTIVITY)

    def start_app(self):
        self.start_qq()

    def stop_app(self):
        self.stop_qq()

    # 关闭QQ
    def stop_qq(self):
        self.at.adb.stop_app(QQ_PACKAGE)

    def open_scheme(self, scheme=None):
        if scheme is None:
            raise NativeError("scheme 不能为空")
        # shell = "am start -a \"android.intent.action.VIEW\" -d \"%s\"" % scheme
        shell = 'am start -d "mqqapi://microapp/open?fakeUrl=%s"' % scheme
        print(shell)
        res = self.at.adb.run_shell(shell)
        print(res)
        return self.weapp_has_launched()

    def screen_shot(self, filename, quality=30):
        return self.at.device.screen_shot(filename, quality=quality)

    def ensure_in_foreground(self):
        act_name = self.at.adb.get_current_activity()
        return act_name

    def weapp_has_launched(self, timeout=30, raise_exception=False):
        time0 = time.time()
        while time.time() - time0 < timeout:
            act_name = self.ensure_in_foreground()
            if act_name.__contains__(QQ_MINI_ACTIVITY):
                return True
            time.sleep(1)
        raise MiniLaunchError("launch mini app timeout")

    def pick_media_file(
        self,
        cap_type="camera",
        media_type="photo",
        original=False,
        duration=5.0,
        index_list=None,
    ):
        pass

    def input_text(self, text):
        pass

    def _allow_authorize(self, answer):
        if answer:
            self.ui.btn_authorize_ok.click()
        else:
            self.ui.btn_authorize_cancel.click()

    def allow_login(self, answer=True):
        self._allow_authorize(answer)

    def allow_get_user_info(self, answer=True):
        self._allow_authorize(answer)

    def allow_get_location(self, answer=True):
        pass

    def handle_modal(self, btn_text="确定", title=None):
        if title:
            self.e.text(title).parent().cls_name(
                "android.widget.FrameLayout"
            ).child().cls_name("android.widget.Button").text(btn_text).click()
        self.e.cls_name("android.widget.Button").text(btn_text).click()

    def handle_action_sheet(self, item):
        self.e.cls_name("android.widget.TextView").text(item).click()

    def forward_miniprogram(self, name, text=None, create_new_chat=True):
        self.ui.action_menu.click()
        self.e.text("转发").click()
        return self.forward_miniprogram_inside(name, text, create_new_chat)

    def forward_miniprogram_inside(self, name, text=None, create_new_chat=True):
        if create_new_chat:
            self.e.text("创建新聊天").click()
            self.e.text_contains(name).click(True)
            self.e.text("确定(1)").enabled(True).click()
        else:
            self.e.text_contains(name).click(True)
        if text:
            self.e.edit_text().enter(text)
        self.e.cls_name("android.widget.Button").text("发送").click()
        self.e.text("已转发").wait_disappear()

    def send_custom_message(self, message=None):
        pass

    def call_phone(self):
        pass

    def handle_picker(self, *items):
        instance = 0
        for item in items:
            input_elem = self.ui.comp_picker_input.instance(instance)
            next_elem = input_elem.parent().child("android.widget.Button")
            first_text = input_elem.get_text()
            while True:
                # todo: 要判断上滑还是下滑
                current_text = input_elem.get_text()
                if current_text == str(item):
                    break
                if first_text == str(item):
                    raise NativeError(f" not found")
            instance += 1

    def get_authorize_settings(self):
        """
        在小程序的授权页面，获取小程序的授权设置
        :return:
        """
        ui_views = self.at.java_driver.dump_ui()
        setting_map = {}
        for ui_view in ui_views:
            if ui_view.cls_name == "android.view.View" and ui_view.content_desc in [
                "已开启",
                "已关闭",
            ]:
                check_status = True if ui_view.content_desc == "已开启" else False
                parant_view = ui_view.sibling().get_children()[0]
                setting_map[parant_view.text] = check_status
        return setting_map

    def back_from_authorize_setting(self):
        """
        从小程序授权页面跳转回小程序
        :return:
        """
        self.at.adb.press_back()

    def authorize_page_checkbox_enable(self, name, enable):
        """
        在小程序授权设置页面操作CheckBox
        :param name: 设置的名称
        :param enable: 是否打开
        :return:
        """
        setting_map = self.get_authorize_settings()
        if setting_map.get(name) == enable:
            return
        self.e.text(name).parent().instance(2).child().cls_name(
            "android.view.View"
        ).click()
        if not enable:
            self.e.cls_name("android.widget.Button").text("关闭授权").click_if_exists(5)

    def release(self):
        self.stop_qq()
        self.at.release()

    @property
    def e(self):
        return self.at.e


if __name__ == "__main__":
    qqnative = QAndroidNative(None)
    qqnative.open_scheme("123123")
