#!/usr/bin/env python3
# Created by xiazeng on 2019-05-22
import sys
import os

lib_path = os.path.abspath(os.path.join(".."))
# print(lib_path)
sys.path.append(lib_path)

from minium.native.qq_native.qbasenative import QBaseNative
from minium.native.lib.wx_wda import *
from urllib.parse import quote


class QiOSNative(QBaseNative):
    def __init__(self, json_conf):
        super(QiOSNative, self).__init__(json_conf)
        self.udid = json_conf.get("device_info").get("udid")  # get("device_desire").
        self.wda_project_path = json_conf.get("wda_project_path")  # get("device_desire").
        self.wda_runner = WebDriverRunner(self.udid, self.wda_project_path)
        self.app = None
        self.bundle_id = json_conf.get("bundle_id")

    ###############################
    #                    interface                        #
    ###############################

    # 打开scheme
    def open_remote_debug(self, scheme_url):
        # self.start_qq()
        # driver = wda.Client()
        # session = driver.session(bundle_id="com.tencent.qq.dailybuild")
        self.connect_QQminiApp(scheme_url)
        self.app.session(name=u"消息").wait_gone()
        time.sleep(20)

    def start_qq(self):
        """
        启动QQ
        :return:
        """
        device = DeviceTool(self.udid)
        device.find_app(bundle_id=self.bundle_id)  # com.tencent.mqq
        for i in range(3):
            try:
                logger.info("第 %d 次启动QQ, 共3次机会" % (i + 1))
                self.app = WdaUI(
                    server_url="http://localhost:%s" % self.wda_runner.port,
                    bundle_id=self.bundle_id,
                )
                self.app.session.set_alert_callback(self._alert_callback) if callable(
                    self._alert_callback
                ) else logger.error("Alert callback would not callable")
                logger.info("QQ启动成功")
                return
            except Exception as e:
                logger.error("setup error: 第 %d 次启动QQ失败: %s" % ((i + 1), str(e)))
                logger.info("正在重启 WebDriverAgent ...")
                self.wda_runner.start_driver()

    def start_app(self):
        self.start_qq()

    def stop_app(self):
        pass

    # 通过scheme链接启动手Q小程序
    def connect_QQminiApp(self, scheme_url):
        """
        :param scheme_url:
        :return:
        """
        scheme_url_urlencode = quote(scheme_url, "utf-8")
        current_path = str(os.path.abspath(os.path.dirname(__file__)))
        mini_app_command = (
            "ios-deploy  --justlaunch --bundle "
            + "%s/schemeAgent.app" % (current_path)
            + " -a "
            + "mqqapi://microapp/open?url=%s" % (scheme_url_urlencode)
        )
        os.system(mini_app_command)

    def screen_shot(self, filename: str, return_format: str = "raw") -> object:
        """ß
        截图
        :param filename: 文件存放的路径
        :param return_format: 除了将截图保存在本地之外, 需要返回的图片内容格式: raw(default) or pillow
        :return: raw data or PIL.Image
        """
        return self.app.client.screenshot(png_filename=filename, format=return_format)

    def pick_media_file(
        self,
        cap_type="camera",
        media_type="photo",
        original=False,
        duration=5.0,
        names=None,
    ):
        """
        获取媒体文件
        :param cap_type: camera: 拍摄 | album: 从相册获取
        :param names: 传入一个 list 选择多张照片或者视频(照片和视频不能同时选择, 且图片最多 9 张, 视频一次只能选择一个)
        :param media_type: photo 或者 video
        :param duration: 拍摄时长
        :param original: 是否选择原图(仅图片)
        :return:
        """
        if cap_type == "album" and names is None:
            raise Exception("从相册选择照片必须提供照片名称, 可以通过 wda inspector 查看照片名称")
        if cap_type == "camera":
            self._capture_photo(media_type=media_type, duration=duration)
        elif cap_type == "album":
            if media_type == "photo":
                if isinstance(names, str):
                    names = [names]
                self._select_photos_from_album(names=names, original=original)
            elif media_type == "video":
                if isinstance(names, list):
                    names = names[0]
                self._select_video_from_album(name=names)

    def input_text(self, text):
        """
        input 组件填写文字(使用此函数之前必须确保输入框处于输入状态)
        :param text: 内容
        :return:
        """
        self.app.session(className="TextField").set_text(text)

    def input_clear(self):
        """
        input 组件清除文字(使用此函数之前必须确保输入框处于输入状态)
        :return:
        """
        self.app.session(className="TextField").clear_text()

    def textarea_text(self, text: str, index=1):
        """
        给 textarea 输入文字需要在小程序层提供该 textarea 的 index 信息
        :param text: 内容
        :param index: 多个 textarea 同时存在一个页面从上往下排序, 计数从 1 开始
        :return:
        """
        self.app.session(className="TextView")[index].set_text(text)

    def textarea_clear(self, index=0):
        """
        给 textarea 清除文字需要在小程序层提供该 textarea 的 index 信息
        :param index: 多个 textarea 同时存在一个页面从上往下排序, 计数从 1 开始
        :return:
        """
        self.app.session(className="textView")[index].clear_text()

    def allow_login(self, answer=True):
        """
        处理app登陆确认弹框
        :return:
        """
        if answer:
            self.app.session(className="Button", name="Allow").get(timeout=10.0).click()
        else:
            # todo @locker
            pass

    def allow_get_user_info(self, answer=True):
        """
        处理获取用户信息确认弹框
        :param answer: True or False
        :return:
        """
        if self.app.session(className="StaticText", nameContains="获取你的昵称").exists:
            self.app.session(className="Button", name="允许").get(
                timeout=10.0
            ).click() if answer else self.app.session(className="Button", name="取消").get(
                timeout=10.0
            ).click()

    def allow_get_location(self, answer=True):
        """
        处理获取位置信息确认弹框
        :param answer: True or False
        :return:
        """
        if self.app.session(className="StaticText", name="获取你的位置信息").exists:
            self.app.session(className="Button", name="允许").get(
                timeout=10.0
            ).click() if answer else self.app.session(className="Button", name="拒绝").get(
                timeout=10.0
            ).click()

    def handle_modal(self, btn_text="确定", title: str = None):
        """
        处理模态弹窗
        :param title: 传入弹窗的 title 可以校验当前弹窗是否为预期弹窗
        :param btn_text: 根据传入的 文字 进行点击
        :return:
        """
        if title:
            assert self.app.session(nameContains=title).exists, "没有出现预期弹窗: %s" % title
        self.app.session(className="Button", name=btn_text).get(timeout=10.0).click()

    def handle_action_sheet(self, item):
        """
        处理上拉菜单
        :param item: 要选择的 item
        :return:
        """
        self.app.session(className="ScrollView").child(className="Button", name=item).get(
            timeout=10.0
        ).click()

    def forward_miniprogram(self, names, text: str = None, create_new_chat=True):
        """
        通过右上角更多菜单转发小程序
        ps: 好友太多会有性能问题
        :type text: 分享携带的内容
        :param names: 要分享的人
        :param create_new_chat: 是否创建群聊
        :return:
        """
        self.app.session(className="Button", name="更多").get(timeout=10.0).click()
        self.app.session(className="Button", name="转发").get(timeout=10.0).click()
        self.app.session(className="StaticText", name="创建新的聊天").get(timeout=10.0).click()
        if isinstance(names, str):
            names = [names]
        for name in names:
            self.app.session(className="TextField", name="搜索").get(timeout=10.0).set_text(name)
            # count = 10
            self.app.session(className="StaticText", name=name, visible=True).get(
                timeout=10.0
            ).click()
            # count -= 1
        self.app.session(className="Button", nameContains="完成").get(timeout=10.0).click()
        self.app.session(className="Button", name="发送").get(timeout=10.0).click()

    def forward_miniprogram_inside(self, names, create_new_chat=True):
        """
        小程序内触发转发小程序
        ps: 好友太多会有性能问题
        :param names: 要分享的人
        :param create_new_chat: 是否创建群聊
        :return:
        """
        self.app.session(className="StaticText", name="创建新的聊天").get(timeout=10.0).click()
        if isinstance(names, str):
            names = [names]
        for name in names:
            self.app.session(className="TextField", name="搜索").get(timeout=10.0).set_text(name)
            # count = 10
            self.app.session(className="StaticText", name=name, visible=True).get(
                timeout=10.0
            ).click()
            # count -= 1
        self.app.session(className="Button", nameContains="完成").get(timeout=10.0).click()
        self.app.session(className="Button", name="发送").get(timeout=10.0).click()

    def send_custom_message(self, message: str = None):
        """
        处理小程序 im 发送自定义消息
        :param message: 消息内容
        :return:
        """
        self.app.session(className="TextView").set_text(message + "\n")

    def phone_call(self):
        """
        处理小程序拨打电话
        :return:
        """
        self.app.session(className="Button", name="呼叫").get(timeout=10.0).click()
        self.app.session.alert.accept()

    def map_select_location(self, name: str):
        """
        原生地图组件选择位置
        :param name: 位置名称
        :return:
        """
        self.app.session(className="SearchField", name="搜索地点").get(timeout=10.0).set_text(name)
        self.app.session(name=name, className="StaticText").get(timeout=10.0).click()
        while self.app.session(name=name, className="StaticText").exists:
            try:
                self.app.session(name=name, className="StaticText").get(timeout=10.0).click()
                if self.app.session(className="Button", name="确定").exists:
                    break
            except Exception as e:
                logger.warning(str(e))

        self.app.session(className="Button", name="确定").get(timeout=10.0).click()

    def map_back_to_mp(self):
        """
        原生地图组件查看定位,返回小程序
        :return:
        """
        self.app.session(className="Button", name="返回").get(timeout=10.0).click()

    def deactivate(self, duration):
        """
        使app进入后台一段时间, 再切回前台
        :param duration: float
        :return: NULL
        """
        self.app.session.deactivate(duration=duration)

    @property
    def orientation(self):
        """
        获取屏幕方向
        :return:
        """
        return self.app.session.orientation()

    @orientation.setter
    def orientation(self, value):
        """
        设置屏幕方向
        :param value: (string) LANDSCAPE | PORTRAIT | UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT |
                    UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN
        :return:
        """
        self.app.session.orientation(value)

    def release(self):
        """
        remove port forward process
        :return:
        """
        self.wda_runner.remove_iproxy()

    ###############################
    #                      private                         #
    ###############################

    def _capture_photo(self, media_type, duration=10.0):
        """
        capture a photo by camera
        :param media_type: photo or video
        :param duration: capture duration
        :return:
        """
        if media_type == "photo":
            self.app.session(text="拍照").get(timeout=10.0).click()
            self.app.session(name="PhotoCapture").get(timeout=10.0).click()
        elif media_type == "video":
            self.app.session(text="拍摄").get(timeout=10.0).click()
            self.app.session(name="VideoCapture").get(timeout=10.0).click()
            time.sleep(duration)
            self.app.session(name="VideoCapture").get(timeout=10.0).click()
        time.sleep(2.0)
        while self.app.session(nameContains="Use ").exists:
            try:
                self.app.session(nameContains="Use ").get(timeout=10.0).click()
            except Exception as e:
                logger.warning(str(e))

    def _select_photos_from_album(self, names: list, original=False):
        """
        select photos from album
        :param names: photo name list
        :param original: use original photo or not
        :return:
        """
        self.app.session(text="从手机相册选择").get(timeout=10.0).click()
        # self.app.session(text="原图发送").get(timeout=10.0)
        for name in names:
            rect = self.app.session(nameContains=name).bounds
            self.app.session.click(rect.x + rect.width - 10, rect.y + 10)
        if original:
            self.app.session(text="原图发送").get(timeout=10.0).click()
        self.app.session(text="完成").get(timeout=10.0).click()
        self.app.session(text="原图发送").wait_gone(timeout=10.0)

    def _select_video_from_album(self, name: str):
        """
        select video from album
        :param name: video file name
        :return:
        """
        self.app.session(text="从手机相册选择").get(timeout=10.0).click()
        rect = self.app.session(text="发送").get(timeout=10.0).bounds
        self.app.session(nameContains=name).get(timeout=10.0).click()
        self.app.session(text="取消").wait_gone(timeout=10.0)
        self.app.session.click(rect.x + 10, rect.y + 10)
        self.app.session(text="发送").wait_gone(timeout=300.0)

    def get_authorize_settings(self):
        """
        todo @locker
        :return:
        """
        pass

    def back_from_authorize_setting(self):
        """
        todo @locker
        :return:
        """
        self.app.session(className="Button", name="返回").get(timeout=10.0).click()

    def authorize_page_checkbox_enable(self, name, enable):
        """
        todo @locker
        :return:
        """
        pass

    @staticmethod
    def _alert_callback(session):
        """
        auto accept when system alert view popup
        :return:
        """
        logger.info("出现弹框, 默认接受")
        session.alert.accept()


if __name__ == "__main__":

    scheme_url = text = quote("http://qq.com/ok", "utf-8")
    mini_app_command = (
        "ios-deploy  --justlaunch --bundle "
        + "./schemeAgent.app"
        + " -a "
        + "mqqapi://microapp/open?url=%s" % (scheme_url)
    )
    print(mini_app_command)
    with open("/Users/chargo/minium/test_yy/demo/config.json") as json_file:
        import json

        conf = json.load(json_file)
        nv = QiOSNative(conf.get("device_desire"))
        nv.start_qq()
        # input("xxxxxxxxxxxxxxxxxxxxx")
        # open miniprogram by scheme url
        # nv.connect_miniApp(miniapp_url)

        # test shotcut
        # nv.screen_shot('./result_img')

        # nv.pick_media_file(cap_type="album", media_type="video", names="照片23")
        # nv.input_text("hi, locker")
        # nv.input_clear()
        # nv.textarea_text(text="hi, locker",index=2)
        # nv.allow_login()
        # nv.allow_get_user_info(answer=False)
        # nv.handle_modal(title="弹窗标题", answer="确定")
        # nv.handle_action_sheet(item="item1")
        # nv.forward_miniprogram(["恒瑜_Sherlock"])
        # nv.send_custom_message("你好")
        # nv.phone_call()
        # nv.map_select_location("广州塔")
        # nv.map_back_to_mp()
        # for i in range(101):
        #     nv.handle_slider(i, index=2)
        # nv.handle_slider(0.0, index=2)
        # nv.handle_switch(0)
        # nv.remove_iproxy()
