#!/usr/bin/env python3
# Created by xiazeng on 2019-05-22
from __future__ import annotations
import os.path
import time
import typing

from ...utils.utils import timeout, wait
from .basenative import BaseNative, NativeError, ModalStatus, NativeModal, NodeType, _SourceTree, etree, pyclasslookup
import at
import at.core.config
from at.core.adbwrap import AdbWrap
from at.core.element import Element as ATElement, AtSelector
from at.webdriver import driver
import at.core.uixml
from at.core.uixml import UiView, Rect
from at.utils import decorator
import at.keycode
import json
import logging
import threading
import shutil
import ssl
import requests
import functools
import re
from typing import *
from typing_extensions import *
from ...externlib.android_base import UiDefine, ScreenType
from .wording import Language, WORDING
import xml.etree.ElementTree as ET

at.core.uixml.parse_int = lambda i: 0 if i is None else int(i)
def parse_bounds(bounds):
    m = re.match(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", bounds or "")
    if m is None:
        return 0, 0, 0, 0
    return m.groups()
at.core.uixml.parse_bounds = parse_bounds

ssl._create_default_https_context = ssl._create_unverified_context

WECHAT_PACKAGE = "com.tencent.mm"
WECHAT_ACTIVITY = "ui.LauncherUI"
MINIPROGRAM_ACTIVITY = "plugin.appbrand.ui.AppBrandUI"
MINIPROGRAM_PLUGIN_ACTIVITY = "plugin.appbrand.ui.AppBrandPluginUI"


logger = logging.getLogger("minium")
_MIN_NORMALIZED_FRAME_LENGTH = 0.5

if etree:
    class MyElementClass(etree.ElementBase):
        ui_view = None

    class MyLookup(pyclasslookup.PythonElementClassLookup):
        def lookup(self, doc, root):
            if root.tag in ["node", "hierarchy"]:
                return MyElementClass
            # delegate to default
            return None

else:
    class MyElementClass(object): ...
    class MyLookup(object): ...


class UiViewNode(UiView, NodeType):
    _node: "etree._Element"
    def __new__(cls, source: Union[str, UiViewNode, "etree._Element"], *args, **kwargs) -> Self:
        if isinstance(source, UiViewNode):
            return source
        return object.__new__(cls)

    def __init__(self, source: Union[str, UiViewNode, "etree._Element", SourceTree], resgurad=None):
        if isinstance(source, UiViewNode):
            # copy
            return
        if isinstance(source, str):
            node = SourceTree(source).tree
        elif isinstance(source, SourceTree):
            node = source.tree
        elif isinstance(source, etree._Element):
            node = source
        else:
            raise ValueError("Invalid type %s passed into UiViewNode." % (type(source)))
        super().__init__(node, resgurad)
        if isinstance(source, str):
            self._xml = source
        else:
            self._xml = None

    @classmethod
    def parse(cls, el: etree._Element):
        return UiViewNode(el)

    @property
    def simple_text(self) -> str:
        return str(self)
    
    @property
    def xml(self) -> str:
        if self._xml is not None:
            return self._xml
        e = etree.Element(self._node.tag, self._node.attrib)
        return etree.tounicode(e, pretty_print=True)
        
    def get_children(self) -> List[UiViewNode]:
        childrens: List[etree._Element] =  self._node.getchildren()
        return [UiViewNode(child, self.rg) for child in childrens]

    @property
    def parent(self):
        parent_node: "etree._Element" = self._node.getparent()
        try:
            if hasattr(parent_node, "ui_view"):
                return parent_node.ui_view
            return UiViewNode(parent_node, self.rg)
        except:
            return None
        
    def is_leaf(self):
        return not self.get_children()
    
    def unique_key(self):
        return self.xml
    
    def g(self, attr, default_value=None):
        try:
            value = self._node.attrib[attr]
        except:
            return default_value
        if isinstance(value, str):
            value = value.strip()
        return value

def remove_kinda_window(source_tree: SourceTree) -> SourceTree:
    """
    支付界面XML有很多kinda_main_container，只保留最后一个，其他的删除
    """
    els: List["etree._Element"] = source_tree.tree.xpath("//*[@resource-id='com.tencent.mm:id/kinda_main_container']")
    for el in els[0:-1]:  # 保留最后一个
        parent: "etree._Element" = el.getparent()
        parent.remove(el)
    return source_tree

class SourceTree(_SourceTree[UiViewNode]):
    node_type = UiViewNode

    @property
    def tree(self):
        if self._tree is None:
            parser = etree.XMLParser()
            setElementClassLookup = parser.setElementClassLookup if hasattr(parser, "setElementClassLookup") else parser.set_element_class_lookup
            setElementClassLookup(MyLookup())
            if isinstance(self._source, self.node_type):
                self._tree = etree.XML(self._source.xml.encode("utf8"), parser)
            else:
                self._tree = etree.XML(self._source.encode("utf8"), parser)
        return self._tree

def auto_reconnect(func):
    @functools.wraps(func)
    def wrapper(self: WXAndroidNative, *args, **kwargs):
        try:
            ret = func(self, *args, **kwargs)
        except (requests.ConnectionError, requests.ReadTimeout) as e:
            logger.error(f"{func.__name__} error %s" % str(e))
            self.at.java_driver.reconnect()
            ret = func(self, *args, **kwargs)
        return ret

    return wrapper

class WXAndroidNative(BaseNative):
    class TitleInfo(object):
        """
        处理h5 tab的title的逻辑
        """
        def __init__(self, title):
            if isinstance(title, WXAndroidNative.TitleInfo):
                return title
            self._title = title
            ts = title.split(":")
            ts_len = len(ts)
            self.app_id  = ts[0] if ts_len == 3 else None
            self.url     = ts[1] if ts_len == 3 else None
            vsb = ts[2].upper() if ts_len == 3 else ""
            self.visible = True if vsb.startswith('VISIBLE') else (False if vsb.startswith('INVISIBLE') else None)
            self.name = ts[0]

        def __str__(self) -> str:
            return self._title
    
    WEB_DEBUG_PORT_REGEX_MAPPING = {
        "x5": [r"webview_devtools_remote_(?P<pid>\d+)"],
        "xweb": [r"com\.tencent\.mm_devtools_remote(?P<pid>\d+)", r"xweb_devtools_remote_(?P<pid>\d+)"],
        # xweb成功伪装成系统内核
        "webkit": [r"xweb_devtools_remote_(?P<pid>\d+)", r"webview_devtools_remote_(?P<pid>\d+)"],
    }
    WEB_DEBUG_PORT_REGEX_LIST = [i for ii in WEB_DEBUG_PORT_REGEX_MAPPING.values() for i in ii]

    GET_CURRENT_ACTIVITY_CMD = [
        'dumpsys activity activities | grep -E "mFocusedActivity|mResumedActivity"',
        'dumpsys activity activities | grep -E "mCurrentFocus|mFocusedApp"',
        'dumpsys window | grep -E "mCurrentFocus|mFocusedApp"',
    ]
    GET_CURRENT_ACTIVITY_CMD_IDX = 0

    GET_CURRENT_DISPLAY_CMD = [
        ('dumpsys display | grep mDisplayId', 'mDisplayId'),
    ]

    # 解绑了银行卡 + 零钱不足
    PAYMENT_RETURN_XPATH = '//node[@content-desc="添加新银行卡" and @class="android.widget.Button"]//preceding::node[contains(@content-desc, "零钱不足")]//preceding::node[@text="选择付款方式"]//preceding-sibling::node[@content-desc="返回" and @clickable="true"]'
    
    # 用户隐私
    PRIVACY_ALLOW_XPATH = '//node[contains(@text, "用户隐私")]//preceding::node[@text="拒绝"]//following::node[@text="同意"]'
    PRIVACY_DENY_XPATH = '//node[contains(@text, "用户隐私")]//preceding::node[@text="同意"]//preceding::node[@text="拒绝"]'
    # 微信头像
    USER_AVATAR_XPATH = '//node[@text="用微信头像"]//following::node[@class="android.widget.ImageView"]'
    def __init__(self, json_conf):
        super(WXAndroidNative, self).__init__(json_conf)
        if json_conf is None:
            json_conf = {}
        self.serial = json_conf.get("serial") or AdbWrap.get_default_serial()
        self.uiautomator_version = int(json_conf.get("uiautomator_version", "2"))
        at.uiautomator_version = self.uiautomator_version
        self.at = at.At(self.serial)
        self.at.java_driver.set_capture_op(False)
        self.ui = UiDefine(self.at)
        self.screen_size = self.at.device.device_size()
        self.lang = json_conf.get("lang")
        self._full_tree = None
        self._source_tree = None
        self.perf_thread = None
        self.perf_flag = False
        self.ef_able_flag = False
        self.fps_data_dict = {}  # fps dict
        self.jank_count_dict = {}  # 卡顿次数
        self.fps_thread = None
        self.startup_time = 0
        self.outputs = json_conf.get("outputs") or os.path.dirname(
            os.path.realpath(__file__)
        )
        self.debug = json_conf.get("debug", False)
        self.outputs_screen = os.path.join(self.outputs, "image")
        self.screen_type = ScreenType.AT  # 截图方式，默认使用at
        self._screen_fail_cnt = 0  # 连续截图失败次数, 超过3次则切换
        self._empty_base_screen_dir(self.outputs_screen)
        self._current_views = None
        self._app_brand_action_bar_bottom = None
        # 1. 原始版本, 使用计算数字坐标的方式进行点击.
        # 2. 数字按钮具有固定的rid, 格式为: `com.tencent.mm:id/tenpay_keyboard_{number}`
        self.pay_modal_version = 0
        # 弹窗的层级有不同
        # 同一个层级的弹窗, 倒序检测
        self._not_normal_type = (
            NativeModal.PRIVACY,
            NativeModal.PHONE,
            NativeModal.SUBSCRIBE,
            NativeModal.OPENWERUN,
            NativeModal.NOBINDPHONE,
        )  # 不是 【允许】/【拒绝】的授权窗口
        self._can_repeat_type = (
            NativeModal.NOBINDPHONE,
        )  # 有可能重复弹出的授权窗口
        self.modals_map: Tuple[Tuple[Tuple[Tuple[ATElement], NativeModal]]] = (
            (
                ((self.e.text("用户隐私保护提示"),), NativeModal.PRIVACY),
            ),
            (  # level 1
                (
                    (
                        self.e.text("发送给"),
                        self.e.rid("android:id/content")
                        .child()
                        .focusable(True)
                        .cls_name("android.widget.Button")
                        .text("发送"),
                    ),
                    NativeModal.SHARE,
                ),
            ),
            (  # level 1
                (
                    (
                        self.e.text_matches(WORDING.COMMON.GET_PHONE_NUMBER_REG.value),
                        self.e.text("添加手机号"),
                    ),
                    NativeModal.NOBINDPHONE,
                ),
                (
                    (self.e.text_matches(WORDING.COMMON.GET_PHONE_NUMBER_REG.value),),
                    NativeModal.PHONE,
                ),
            ),
            (
                (
                    (self.e.cls_name("android.widget.TextView").text("开启微信运动"),),
                    NativeModal.OPENWERUN,
                ),
            ),
            (((self.e.text("获取你的位置信息"),), NativeModal.LOCATION),),  # level 2
            (  # level 3
                ((self.e.text_matches("\w*发送\w*消息\w*"),), NativeModal.SUBSCRIBE),
                ((self.e.text("使用你的麦克风"),), NativeModal.RECORD),
                ((self.e.text("使用你的摄像头"),), NativeModal.CAMERA),
                ((self.e.text("保存图片或视频到你的相册"),), NativeModal.PHOTO),
                ((self.e.text_contains("获取你的昵称"),), NativeModal.USERINFO),
                ((self.e.text("获取你的微信运动步数"),), NativeModal.WERUN),
                ((self.e.text("使用你的蓝牙"),), NativeModal.BLUETOOTH),
            ),
        )
        self._last_modal_type = None

    @property
    def current_views(self):
        if self._current_views is None:
            return self._get_current_views()
        return self._current_views
    
    def source(self):
        res = self.at.java_driver.request_at_device("dumpUi", [])
        for _ in range(3):
            res = self.at.java_driver.request_at_device("dumpUi", [])
            if res and len(res.strip()) != 0:
                full_tree = SourceTree(res)
                if not full_tree.xpath("/hierarchy/node"):
                    self.at.java_driver.reconnect()
                    continue
                self._full_tree = full_tree
                self._source_tree = remove_kinda_window(SourceTree(res))
                return self._source_tree
            self.at.java_driver.reconnect()

    def dumpSource(self, name="source.xml"):
        file_name = os.path.join(self.outputs, f"{os.path.splitext(name)[0]}-{int(time.time())}{os.path.splitext(name)[1]}")
        with open(file_name, "w", encoding="utf8") as f:
            f.write(self.source().xml)
        return file_name

    @timeout(2, 0.5)
    def _get_current_views(self):
        self._current_views = self.at.java_driver.dump_all_views()
        if not self._current_views:
            logger.warning("当前页面没有任何控件, 重连后重试")
            self.at.java_driver.reconnect()
            self._current_views = self.at.java_driver.dump_all_views()
        return self._current_views

    def _get_view_from_current_view(self, el: ATElement):
        if not self.current_views:
            return None
        instance = el._selector.get(AtSelector.SELECTOR_INSTANCE, 0)
        for ui_view_list in self.current_views:
            for ui_view in ui_view_list:
                if el.match_ui_view(ui_view):
                    if instance == 0:
                        return ui_view
                    else:
                        instance -= 1
        return None

    def _el_exist_in_current_view(self, el: ATElement):
        if self._get_view_from_current_view(el):
            return True
        return False

    def _el_in_window(self, el: ATElement, window: list) -> bool:
        for view in window:
            if el.match_ui_view(view):
                return True
        return False

    def _empty_base_screen_dir(self, dirname):
        if os.path.exists(dirname):
            if os.path.isdir(dirname):
                try:
                    shutil.rmtree(dirname)
                except OSError:  # 不知道为什么not empty也会报错。。。
                    pass
                time.sleep(1)
            else:
                os.remove(dirname)
        if not os.path.exists(dirname):
            os.makedirs(dirname)

    def _deal_log(self, log):
        log_2 = ""
        log_4 = ""
        for line in log:
            if str(line).find(",StartUp,0") != -1:
                log_1 = str(line).split(",StartUp,0")[0]
                log_2 = str(log_1).split(",")[-1]
                logger.info(log_2)
            elif str(line).find(",StartUp,1") != -1:
                log_3 = str(line).split(",StartUp,1")[0]
                log_4 = str(log_3).split(",")[-1]
                logger.info(log_4)
            else:
                pass

        if log_2 and log_4:
            startup_time = int(log_4) - int(log_2)
            self.startup_time = startup_time
            return startup_time
        else:
            return 0

    @property
    def logcat(self):
        return self.at.logcat

    def connect_weapp(self, path):
        self.at.apkapi.launch()
        gallery_name = "atstub"
        self.at.apkapi.add_gallery(path)
        self.stop_wechat()
        self.start_wechat()
        if self.lang == "en":
            self.e.text("Discover").click()
            self.e.text("Scan").click()
            # self.e.cls_name("android.widget.ImageButton").click()
            # self.e.text("Choose QR Code from Album").click()
            self.e.cls_name("android.widget.LinearLayout").instance(1).click()
            self.e.text("All Images").click()
            self.e.text(gallery_name).click()
            self.e.desc_contains("Image 1").click()
            self.e.text_contains("Scanning").wait_disappear()
        else:
            self.e.text("发现").click()
            self.e.text("扫一扫").click()
            self.e.cls_name("android.widget.LinearLayout").instance(1).click()
            # self.e.cls_name("android.widget.ImageButton").click()
            # self.e.text("从相册选取二维码").click()
            self.e.text("所有图片").click()
            self.e.text(gallery_name).click()
            self.e.desc_contains("图片 1").click()
            self.e.text_contains("扫描中").wait_disappear()

    def screen_shot(self, filename, quality=30):
        return self._screen_shot(filename, quality)

    def _screen_shot(self, filename, quality=30, screen_type=None):
        """
        安卓截图有两种方式：
        1. via at
        2. via adb screencap
        via at现存问题: 可能因为网络、at进程被kill等问题, 截图时间超长

        :return: filename / ""
        """
        screen_type = screen_type or self.screen_type
        if screen_type == ScreenType.AT:
            stime = time.time()
            try:
                ret = self.at.device.screen_shot(filename, quality=quality)
            except (requests.ConnectionError, requests.ReadTimeout) as e:
                logger.error("screen_shot error %s, try reconnect" % str(e))
                self.at.java_driver.reconnect()
                stime = time.time()
                ret = self.at.device.screen_shot(filename, quality=quality)
            # ret = self.at.device.screen_shot(filename, quality=quality)
            if time.time() - stime > 50:  # 如果一次截图超过50s, 就切换截图类型
                logger.warning(
                    "screen_shot cost bigger than 50s, change the screen type"
                )
                self.screen_type = ScreenType.ADB
            size = 0
            if os.path.isfile(filename):
                size = os.path.getsize(filename)
                if size != 0:# 截图成功
                    self._screen_fail_cnt = 0
                    return filename
            # 截图失败了
            logger.warning(f"screen_shot {filename} exists: {os.path.isfile(filename)}, size: {size}")
            self._screen_fail_cnt += 1
            if self._screen_fail_cnt >= 3:
                logger.warning(
                    f"screen_shot fail {self._screen_fail_cnt} times, change the screen type"
                )
                self.screen_type = ScreenType.ADB
            # 换一种方式试试
            return self._screen_shot(filename, quality=quality, screen_type=ScreenType.ADB)
        elif screen_type == ScreenType.ADB:
            try:
                return self.at.adb.screen(filename, display_id=self.display_id)
            except TypeError:
                logger.warning(
                    "screen_shot via adb fail, response data empty"
                )
                # TypeError: replace() argument 1 must be str, not bytes
                # 新版本at库, 部分机型截图返回空, 触发的bug, 本地修复无用, 从这里做兼容
                # with open(filename, "w") as fd:
                #     fd.write("")
                # return filename
                return ""

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
        """ """
        self.at.e.edit_text().enter(text, is_click=False)

    def input_clear(self):
        """
        input 组件清除文字(使用此函数之前必须确保输入框处于输入状态)
        :return:
        """
        self.at.e.edit_text().enter("", is_click=False)

    def textarea_text(self, text, index=0):
        self.at.e.edit_text().instance(index).enter(text, is_click=False)

    def textarea_clear(self, index=0):
        self.at.e.edit_text().instance(index).enter("", is_click=False)

    def map_select_location(self, name=None):
        self._get_current_views()  # 刷新current views
        if self._el_exist_in_current_view(self.e.text_contains("微信不能确定你的位置")):
            self.handle_modal("取消")
        if not name:
            # 不需要搜索地址
            if self.e.text("完成").enabled(True).exists(3):
                return self.e.text("完成").enabled(True).click_if_exists()
            else:  # 不能点完成，返回
                self.map_back_to_mp()
                return False
        can_search = True
        if (
            not self.at.e.text("搜索地点").click_if_exists()
            and not self.e.rid(
                "com.tencent.mm:id/send_loc_search_hint"
            ).click_if_exists()
        ):
            logger.error("当前客户端不支持搜索地点")
            can_search = False
        if not can_search:  # 同不需要搜索
            return self.map_select_location(None)
        self.at.e.edit_text().enter_chinese(name)
        self.at.adb.press_search()
        self.at.adb.press_back()
        while (
            self.at.e.cls_name("android.widget.TextView").text_contains(name).exists()
        ):
            try:
                self.at.e.cls_name("android.widget.TextView").text_contains(
                    name
                ).click()
                if self.at.e.text("完成").exists:
                    break
            except Exception as e:
                logger.warning(str(e))
        self.at.e.text("完成").click()

    def map_back_to_mp(self):
        self._get_current_views()  # 刷新current views
        if self._el_exist_in_current_view(self.e.text_contains("微信不能确定你的位置")):
            self.handle_modal("取消")
        btn_back_txt = self.at.e.rid("com.tencent.mm:id/btn_back_txt")
        if not self._el_exist_in_current_view(btn_back_txt):
            self.e.text("取消").click()
        else:
            btn_back_txt.click_if_exists()

    def deactivate(self, duration):
        self.at.adb.press_home()
        time.sleep(duration)
        self.at.adb.start_app("com.tencent.mm", "ui.LauncherUI", "-n")
        time.sleep(2)
        screen_width = int(self.at.device.width())
        screen_height = int(self.at.device.height())
        self.at.device.swipe(
            int(screen_width / 2),
            int(screen_height * 1 / 4),
            int(screen_width / 2),
            int(screen_height * 4 / 5),
            10,
        )
        time.sleep(2)
        self.textbounds = self.at.e.rid("com.tencent.mm:id/test_mask").get_bounds()
        print(self.textbounds)
        xx = self.textbounds[0]
        yy = self.textbounds[1]
        self.at.adb.click_point(xx, yy)

    @auto_reconnect
    def _check_auth_type(self, answer=True, timeout=0) -> NativeModal:
        """检查认证弹窗类型

        :param bool answer: true: 允许/确定, false: 拒绝/取消
        :return NativeModal: 弹窗类型
        """
        btn_text = "允许|确定" if answer else "拒绝|取消"
        btn = (
            self.e.cls_name("android.widget.Button")
            .focusable(True)
            .text_matches(btn_text)
        )
        s = time.time()
        if timeout == 0:
            timeout = 0.1
        cnt = 0
        while time.time() - s < timeout:
            cnt += 1
            self._get_current_views()  # 刷新current views
            btn_exists = self._el_exist_in_current_view(btn)
            # 倒序遍历
            """
            for ui_view in [ii for i in self.current_views for ii in reversed(i)]:  # 每个window中的ui_views倒序轮询, 以防后出的弹窗对前面的弹窗进行遮挡
                for modal_clss, modal_type in self.modals_map:
                    if (
                        modal_type not in (NativeModal.PHONE, NativeModal.SUBSCRIBE)
                        and not btn_exists
                    ):  # 一般的授权弹窗, 需要验证授权按钮是否存在
                        continue
                    match = True
                    for modal_cls in modal_clss:
                        if not modal_cls.match_ui_view(ui_view):
                            match = False
                            break
                    if match:
                        return modal_type
            """
            # 按预设层级遍历
            """
            for modal_clss, modal_type in self.modals_map:
                if (
                    modal_type not in (NativeModal.PHONE, NativeModal.SUBSCRIBE)
                    and not btn_exists
                ):  # 一般的授权弹窗, 需要验证授权按钮是否存在
                    continue
                match = True
                for modal_cls in modal_clss:
                    if not self._el_exist_in_current_view(modal_cls):
                        match = False
                        break
                if match:
                    return modal_type
            """
            for level in self.modals_map:  # 先遍历高层级弹窗
                ms = []
                for window in self.current_views:
                    for j in range(len(window), 0, -1):
                        ui_view = window[j - 1]
                        for modal_clss, modal_type in level:
                            if (
                                modal_type
                                not in self._not_normal_type
                                and not btn_exists
                            ):  # 一般的授权弹窗, 需要验证授权按钮是否存在
                                continue
                            match = False  # 看看当前view有没有符合关键字的
                            for i, modal_cls in enumerate(modal_clss):
                                if modal_cls.match_ui_view(ui_view):
                                    match = True
                                    break
                            if match and len(modal_clss) <= 1:  # 只有一个条件
                                if self._last_modal_type is not modal_type:
                                    return modal_type
                                ms.append(modal_type)  # 暂存
                            elif match:  # 当前view符合关键字的, 判断是否所有条件都符合
                                for j, modal_cls in enumerate(modal_clss):
                                    if i == j:  # 已经检测过
                                        continue
                                    if not self._el_in_window(modal_cls, window):
                                        match = False
                                        break
                                if match:
                                    if self._last_modal_type is not modal_type or modal_type in self._can_repeat_type:
                                        # 不同的授权类型 / 有可能重复弹出的授权窗
                                        return modal_type
                                    ms.append(modal_type)  # 暂存
                if ms:
                    return ms[-1]
            if cnt >= 2 and btn_exists:  # 检测两次后, 有授权按钮但识别不出是什么弹窗, 默认返回normal
                break
            time.sleep(1)
        else:
            return NativeModal.NONE
        return NativeModal.NORMAL

    def _handle_auth(self, modal_type: NativeModal, answer):
        logger.info(f"处理 {modal_type.name} 弹窗")
        if modal_type is NativeModal.NONE:
            logger.warning("未检测到授权弹窗")
            return False
        elif modal_type is NativeModal.PRIVACY:
            return self.allow_privacy(answer)
        elif modal_type in (
            NativeModal.NORMAL,
            NativeModal.LOGIN,
            NativeModal.RECORD,
            NativeModal.CAMERA,
            NativeModal.PHOTO,
            NativeModal.USERINFO,
            NativeModal.LOCATION,
            NativeModal.BLUETOOTH,
            NativeModal.WERUN,
        ):
            return self._allow_authorize(answer)
        elif modal_type is NativeModal.SHARE:
            return self._handle_btn("发送" if answer else "取消")
        elif modal_type is NativeModal.NOBINDPHONE:
            return self.e.text("取消").click_if_exists(0.5)
        elif modal_type is NativeModal.PHONE:
            return self._allow_get_user_phone(answer)
        elif modal_type is NativeModal.SUBSCRIBE:
            return self.allow_send_subscribe_message(answer)
        elif modal_type is NativeModal.OPENWERUN:
            return self.allow_get_we_run_data(answer)
        return False
    
    def allow_privacy(self, answer=True):
        source = self.source()
        view = source.xpath(WXAndroidNative.PRIVACY_ALLOW_XPATH if answer else WXAndroidNative.PRIVACY_DENY_XPATH)
        if not view:
            return False
        return self.click_view(view[0])
        return self.e.text("同意" if answer else "拒绝").click_if_exists(0.5)

    def allow_authorize(self, answer=True):
        modal_type = self._check_auth_type(answer, 4)
        self._last_modal_type = modal_type  # 记录下即将处理的类型
        ret = self._handle_auth(modal_type, answer)
        if modal_type is NativeModal.PRIVACY and ret is True:  # 如果是【隐私弹窗】并处理成功, 则后面可能会再弹窗另外的授权弹窗
            return self.allow_authorize(answer)
        return ret

    def _allow_authorize(self, answer=True):
        # 点击按钮触发弹窗到客户端弹窗可能有一定延迟
        if answer:
            return self._handle_btn("允许", timeout=5.0)
        else:
            return self._handle_btn("拒绝", timeout=5.0)

    def allow_login(self, answer=True):
        return self._allow_authorize(answer)

    def allow_record(self, answer=True):
        return self._allow_authorize(answer)

    def allow_camera(self, answer=True):
        """
        处理使用摄像头确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer)

    def allow_write_photos_album(self, answer=True):
        """
        处理保存相册确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer)

    def allow_get_user_info(self, answer=True):
        return self._allow_authorize(answer)

    def allow_get_location(self, answer=True):
        return self._allow_authorize(answer)

    def allow_get_we_run_data(self, answer=True):
        """
        处理获取微信运动数据确认弹框, 测试号可能需要开通微信运动
        :param answer: True or False
        :return:
        """
        if (
            self.e.cls_name("android.widget.TextView")
            .text("开启微信运动")
            .wait_exists(timeout=3.0)
        ):
            if not answer:
                self.at.adb.press_back()
                return False
            self.e.cls_name("android.widget.TextView").text("启用该功能").click()
        return self._allow_authorize(answer)

    def _is_in_official_screen_popup(self) -> bool:
        """在官方半屏弹窗中
        """
        return self.e.desc_contains(":官方半屏承载").exists()

    def allow_get_user_phone(self, answer=True):
        """
        处理获取用户手机号码确认弹框
        :param answer: True or False
        :return:
        """
        # self._allow_authorize(answer)
        # 新版本获取手机号使用仿原生半屏弹窗模式
        if self._is_in_official_screen_popup():
            # 等久一点看看
            wait_time = 20
        else:
            wait_time = 4
        if self.e.text(WORDING.COMMON.GET_PHONE_NUMBER.value).exists(wait_time):
            if self.e.text("添加手机号").exists(0):
                ret = self.e.text("取消").click_if_exists(0.5)
                if ret and answer:
                    logger.warning("试图允许获取手机号, 但账号未绑定任何手机号")
                    return False
                return ret
            return self._allow_get_user_phone(answer)
        return False

    def _allow_get_user_phone(self, answer=True):
        # 新版本获取手机号使用仿原生半屏弹窗模式
        if self._is_in_official_screen_popup():
            # 等久一点看看
            wait_time = 20
            official_screen_popup = True
        else:
            wait_time = 4
            official_screen_popup = False
        if self.e.text(WORDING.COMMON.GET_PHONE_NUMBER.value).exists(wait_time):
            if not answer:
                return self.e.text("不允许").click_if_exists(0.5)
            # return self.e.text("微信绑定号码").click_if_exists(0.5)
            if not self.e.text_matches("微信绑定号码|上次提供").click_if_exists(0.5):
                return self._allow_authorize(answer)  # 兼容就逻辑
            return True
        if official_screen_popup:
            logger.warning("试图允许获取手机号且有官方半屏弹窗, 但未获取到相关关键字")
            self.dumpSource("getuserphone.xml")
        return False

    def allow_send_subscribe_message(self, answer=True):
        """
        允许/确定发送订阅消息
        """
        if answer:

            def get_switch():
                # android.widget.Switch / android.view.View
                for ee in (
                    (
                        self.e.cls_name("android.view.View")
                        .enabled(True)
                        .clickable(True)
                        .desc("")
                    ),
                    (
                        self.e.cls_name("android.widget.Switch")
                        .enabled(True)
                        .desc("")
                    )
                ):
                    views = ee.get_ui_views()
                    if views:
                        for v in reversed(views):  # 倒序遍历
                            if v.rid:
                                return ee, [v]
                return ee, views

            def do():
                e = (
                    self.e.cls_name("android.widget.Button")
                    .focusable(True)
                    .text_matches("允许|确定")
                )
                view = e.get_view(timeout=3)
                if view and not view.enabled:  # 不能点击, 先enable一个通知
                    ee, views = get_switch()
                    if not views:
                        logger.warning("可能不存在可选择的模板消息")
                        return False
                    for v in reversed(views):  # 倒序遍历
                        if v.rid:  # 有id的
                            ee.rid(v.rid).click_if_exists(0.5)
                            break
                    else:
                        logger.warning("可能不存在可选择的模板消息, 尝试选择")
                        ee.click_if_exists(0.5)
                elif not view:
                    return False
                return e.enabled(True).click_if_exists(1.5)

            try:
                ret = do()
            except (requests.ConnectionError, requests.ReadTimeout) as e:
                logger.error("handle btn error %s" % str(e))
                self.at.java_driver.reconnect()
                ret = do()
            except at.core.exceptions.UiNotFoundError:
                return False
            return ret
        else:
            return self._handle_btn("取消", timeout=5.0)

    def _handle_btn(self, btn_text="确定", timeout=0.5, text_matches=None):
        logger.debug("handle android.widget.Button[%s]" % (text_matches or btn_text))

        def do():
            e = self.e.cls_name("android.widget.Button").focusable(True)
            if text_matches:
                e.text_matches(text_matches)
            else:
                e.text(btn_text)
            return e.click_if_exists(timeout)

        try:
            ret = do()
        except (requests.ConnectionError, requests.ReadTimeout) as e:
            logger.error("handle btn error %s" % str(e))
            self.at.java_driver.reconnect()
            ret = do()
        except at.core.exceptions.UiNotFoundError:
            return False
        return ret

    def handle_modal(self, btn_text="确定", title=None, index=-1, force_title=False):
        if title:
            if not self.at.e.text_contains(title).exists():
                logger.info("没有出现预期弹窗：title[%s]", title)
                return False
        if isinstance(btn_text, bool):
            btn_text = "确定" if btn_text else "取消"
        ret = self._handle_btn(btn_text)
        return ret

    def handle_action_sheet(self, item):
        ret = self.e.cls_name("android.widget.TextView").text(item).click()
        return ret
    
    def handle_alter_before_unload(self, answer=True):
        return self.handle_modal("确定" if answer else "取消")

    def forward_miniprogram(self, name, text=None, create_new_chat=True):
        self.ui.action_menu.click()
        if not self.e.text("发送给朋友").click_if_exists():
            assert self.e.text("转发给朋友").click_if_exists(0.5), "找不到转发按钮"
        return self.forward_miniprogram_inside(name, text, create_new_chat)

    def _create_new_chat(self, timeout=0.5):
        # 点击"创建新聊天"/"创建聊天"/"创建新的聊天"
        return self.e.text_matches("创建(新的)?聊天").click_if_exists(timeout)

    def forward_miniprogram_inside(self, name, text=None, create_new_chat=True):
        if create_new_chat and self._create_new_chat():
            self.e.edit_text().enter(name)
            time.sleep(1)
            self.e.text_contains(name).click(True)
            time.sleep(1)
            if self.e.text("确定(1)").exists():
                self.e.text("确定(1)").enabled(True).click()
            else:
                self.e.text("完成(1)").enabled(True).click()
        else:
            self.e.text("搜索").click()
            time.sleep(1)
            self.e.edit_text().enter(name)
            time.sleep(1)
            self.e.text_contains(name).click(True)
            time.sleep(1)
        if text:
            self.e.edit_text().enter(text)
            self.at.adb.press_back()  # 键盘会挡住

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
            # next_elem = input_elem.parent().child("android.widget.Button")
            first_text = input_elem.get_text()
            while True:
                # todo: 要判断上滑还是下滑
                current_text = input_elem.get_text()
                if current_text == str(item):
                    break
                if first_text == str(item):
                    raise NativeError(" not found")
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
        super().release()
        if self.perf_flag:
            logger.info("stop_get_perf")
            self.stop_get_perf()
        self.at.release()
        self.at.adb.stop_app(at.core.config.TEST_APP_PKG)  # 把 weautomator也kill一下
        self._empty_base_screen_dir(self.outputs_screen)  # 清空截图目录

    def start_wechat(self):
        if self.at.adb.app_is_running(WECHAT_PACKAGE):
            if self.debug:
                return
            self.at.adb.stop_app(WECHAT_PACKAGE)  # 先关掉
        self.at.adb.start_app(WECHAT_PACKAGE, WECHAT_ACTIVITY)
        # 检测微信画面, 10s
        timeout = time.time() + 10
        while time.time() < timeout:
            views = self.at.java_driver.dump_ui(1)
            texts = set([v.text for v in views])
            if texts.issuperset(WORDING.COMMON.LOGIN_WORDS.zh):
                WORDING.setLanguage(Language.zh)
                logger.info("wechat language: %s" % Language.zh.name)
                break
            elif texts.issuperset(WORDING.COMMON.LOGIN_WORDS.en):
                WORDING.setLanguage(Language.en)
                logger.info("wechat language: %s" % Language.en.name)
                break
        else:
            logger.info("wechat language use default: %s" % WORDING.language.name)

    def fold_keybroad(self):
        self.at.adb.press_back()

    def to_main_ui(self, timeout=3):
        el1 = self.e.pkg(WECHAT_PACKAGE).desc("返回")
        el2 = self.e.pkg(WECHAT_PACKAGE).desc("关闭")
        while True:
            try:
                if el1.exists(timeout):
                    el1.click()
                elif el2.exists(timeout):
                    el2.click()
                else:
                    break
            except Exception:
                logger.exception("返回 failed")

    def stop_wechat(self):
        self.at.adb.stop_app(WECHAT_PACKAGE)

    def click_coordinate(self, x, y):
        self.at.adb.click_point(x, y)

    def click_point(self, x, y):
        """
        Alias for click_coordinate
        """
        return self.click_coordinate(x, y)

    def _get_mem_used_new(self, pkg_name, pid):
        used = 0
        m = None
        m2 = None
        cmd = "dumpsys meminfo %s" % pkg_name
        # logger.info(cmd)
        output_mem = self.at.adb.run_shell(cmd)
        # logger.info(output_mem)
        r = re.compile(r"TOTAL\s+(\d+)")

        r2 = re.compile(r"size:\s+\S+\s+\S+\s+\S+\s+(\d+)")
        ls = re.split(r"[\r\n]+", output_mem)
        # logger.info(ls)

        for line in ls:
            # i = i + 1
            # if i == 2:
            #     if line.find(pkg_name):
            #         logger.info("line is %s"%line)
            #         m1 = line.split("K")
            m = r.search(line)

            m2 = r2.search(line)

            m1 = line.find(pkg_name)
            # if m1:
            #     search_k = line.find("K:")
            #     search_pid = line.find("pid")
            #     if search_k and search_pid:
            #         num = line.split("K:")[0]
            #         logger.info("num is %s" % num)
            #         used = int(num) / 1024

            if m:
                used = int(m.group(1)) / 1024

            elif m2:
                used = int(m2.group(1)) / 1024

            # elif m1:
            #     logger.info("m1 is %s" % m1)
            #     used = int(m1) / 1024
        if used == 0:
            try:
                used = self._get_mem_used_new_doudi(output_mem, pkg_name, pid)
            except Exception as e:
                logger.error(e)
        return str(used)

    def _get_mem_used_new_doudi(self, output_mem, processname, pid):
        used = 0
        if output_mem.find("Total PSS by process"):
            ls = re.split(r"[\r\n]+", output_mem)
            tag = processname + " (pid " + str(pid) + " / activities)"
            for line in ls:
                if line.find(tag) > -1:
                    used_str = line.split("K: ")[0]
                    used = int(used_str.replace(",", "")) / 1024
                    break
        return used

    def _get_cpu_rate_by_file(
        self, mPid, mLastPidUserCpuTime, mLastPidKernelCpuTime, mLastTotalCpuTime
    ):
        # 计算cpu，读取/proc/stat的数据，计算cpuTime
        # 读取/proc/mPid/stat的数据，计算当前小程序的cpu数据
        pid_stat_file = "/proc/" + str(mPid) + "/stat"
        outputs = self.at.adb.run_shell("cat %s" % (pid_stat_file))
        # logger.info(outputs)
        pid_cpu_info_list = outputs.split(" ")
        # logger.info(pid_cpu_info_list)
        if len(pid_cpu_info_list) < 17:
            return 0, mLastPidUserCpuTime, mLastPidKernelCpuTime, mLastTotalCpuTime
        cpuTime = self._get_cpu_time()
        # logger.info(cpuTime)
        # 该进程处于用户态的时间
        pidUTime = int(pid_cpu_info_list[13])
        # logger.info(pidUTime)
        # 该进程处于内核态的时间
        pidSTime = int(pid_cpu_info_list[14])
        # logger.info(pidSTime)
        pidCpuUsage = 0
        # logger.info(mLastPidUserCpuTime)
        if mLastTotalCpuTime != 0:
            pidUserCpuUsage = (
                float(pidUTime - mLastPidUserCpuTime)
                / float(cpuTime - mLastTotalCpuTime)
            ) * 100
            pidKernelCpuUsage = (
                float(pidSTime - mLastPidKernelCpuTime)
                / float(cpuTime - mLastTotalCpuTime)
            ) * 100
            pidUserCpuUsage = max(0, pidUserCpuUsage)
            pidKernelCpuUsage = max(0, pidKernelCpuUsage)
            pidCpuUsage = pidUserCpuUsage + pidKernelCpuUsage

        mLastTotalCpuTime = cpuTime
        mLastPidUserCpuTime = pidUTime
        mLastPidKernelCpuTime = pidSTime
        # logger.info(pidCpuUsage)
        return (
            pidCpuUsage,
            mLastPidUserCpuTime,
            mLastPidKernelCpuTime,
            mLastTotalCpuTime,
        )

    def _get_cpu_time(self):
        stat_file = "/proc/stat"
        outputs = self.at.adb.run_shell("cat %s" % (stat_file))
        # logger.info(outputs)
        lines = outputs.split("\n")
        list = lines[0].split(" ")
        # logger.info(list)
        if len(list) < 9:
            return 0
        user = int(list[2])
        nice = int(list[3])
        system = int(list[4])
        idle = int(list[5])
        ioWait = int(list[6])
        hardIrq = int(list[7])
        softIrq = int(list[8])
        stealTime = int(list[9])

        cpuTime = user + nice + system + idle + ioWait + hardIrq + softIrq + stealTime
        return cpuTime

    def write_perf_data(self, processname, pid, curview, timeinterval):
        # 对齐
        mLastPidUserCpuTime = 0
        mLastPidKernelCpuTime = 0
        mLastTotalCpuTime = 0
        while self.perf_flag:
            stime = time.time()
            # get cpu
            (
                perf_cpu,
                mLastPidUserCpuTime,
                mLastPidKernelCpuTime,
                mLastTotalCpuTime,
            ) = self._get_cpu_rate_by_file(
                pid, mLastPidUserCpuTime, mLastPidKernelCpuTime, mLastTotalCpuTime
            )
            # get fps
            if curview:
                fps_lines = self.at.adb.get_fps(curview)
                if len(fps_lines) <= 8:
                    doudi_currentview = (
                        "com.tencent.mm/com.tencent.mm.plugin.appbrand.ui.AppBrandUI#0"
                    )
                    fps_lines = self.at.adb.get_fps(doudi_currentview)
                try:
                    refresh_period, timestamps1 = self._collectFPSData(fps_lines)
                    fps_data = self._CalculateResults(refresh_period, timestamps1)
                except Exception as e:
                    logger.error(e)
                    # logger.info(fps_lines)
                    fps_data = 0

            else:
                fps_data = 0
            # get mem
            perf_mem = self._get_mem_used_new(processname, pid)

            # record
            logger.info(
                "perf_cpu: %s, fps_data: %s, perf_mem: %s"
                % (perf_cpu, fps_data, perf_mem)
            )
            timestamp = int(time.time())
            self.perf_data.append(
                {
                    "cpu": perf_cpu,
                    "mem": float(perf_mem),
                    "fps": fps_data,
                    "timestamp": timestamp,
                }
            )
            self._screen_shot(os.path.join(self.outputs_screen, "%d.png" % timestamp))
            etime = time.time()
            if etime - stime > timeinterval:
                continue
            time.sleep(etime - stime)

    def _get_current_appbrand(self):
        """获取当前小程序进程名和进程id

        :return str, int: processname, pid
        """
        return self.at.adb.get_current_active_process(
            re.escape("com.tencent.mm:appbrand") + "\d+"
        )

    def _start_get_perf(self, timeinterval=15):
        self.perf_flag = True
        retry = 3
        while retry > 0 and self.perf_flag:
            retry -= 1
            processname, pid = self._get_current_appbrand()
            logger.info("processname [%s] pid [%s]" % (str(processname), str(pid)))
            self.at.adb.clearbuffer()
            curview = self.at.adb.get_current_active_view(
                re.escape("com.tencent.mm/com.tencent.mm.plugin.appbrand.ui.AppBrandUI")
                + "\d*#\d+"
            )
            if (not processname) or (not curview):
                logger.error("current activity is not appbrand")
                time.sleep(2)
                continue
            else:
                break
        if processname and curview:
            try:
                self.perf_data = []
                self.write_perf_data(processname, pid, curview, timeinterval)
                return self.perf_flag
            except Exception:
                self.perf_flag = False
                return self.perf_flag
        else:
            self.perf_flag = False
            return self.perf_flag

    def start_get_perf(self, timeinterval=15) -> bool:
        if self.perf_flag:  # 一个线程就够了
            return True
        self.perf_thread = threading.Thread(
            target=self._start_get_perf,
            args=(timeinterval,),
            name="GetPerformance",
            daemon=True
        )
        self.perf_thread.start()
        return True

    def start_get_start_up(self):
        """
        开始监听启动时间
        """
        self.logcat.start_record("get instanceid", "report 19175", "J2V8_Console")

    def stop_get_start_up(self):
        """
        结束监听启动时间
        :return: number
        """
        instanceid_log = self.logcat.get_lines("get instanceid")
        # logger.debug(instanceid_log)
        self.logcat.stop_record("get instanceid")
        if instanceid_log:
            self._deal_log(instanceid_log)
            logger.info("start up: %s" % self.startup_time)
        return self.startup_time

    def get_start_up(self):
        return self.startup_time

    def stop_get_perf(self):
        self.perf_flag = False
        if self.perf_thread:
            self.perf_thread.join()
        if self.perf_data:
            perf_data_str = json.dumps(self.perf_data)
            self.perf_data = []
            return perf_data_str
        else:
            logger.error("get perf data fail")
            return ""

    def get_pay_value(self):
        try:
            if self.e.text_contains("￥").exists():
                return self.e.text_contains("￥").get_text()
            else:
                return ""
        except Exception:
            return ""

    def _check_pay_modal_version(self):
        if not self.pay_modal_version:  # 先检测版本
            self._get_current_views()
            if self._el_exist_in_current_view(
                self.e.rid("com.tencent.mm:id/tenpay_keyboard_0")
            ):
                self.pay_modal_version = 2
            elif self._el_exist_in_current_view(
                self.e.text_contains("请输入支付密码")
            ) and self._el_exist_in_current_view(self.e.text_contains("￥")):
                self.pay_modal_version = 1
            else:
                raise TypeError("暂不支持当前微信客户端版本")
        return self.pay_modal_version

    def input_pay_password(self, psw=""):
        check_flag = self.e.text("请输入支付密码").click_if_exists(5)
        if not check_flag:
            return False
        if not psw:
            raise TypeError("未传入支付密码")
        psw = str(psw)
        if type(eval(psw)) is not int:
            raise TypeError("非法支付密码字符串")
        elif len(psw) != 6:
            raise TypeError("密码长度必须为6位数")
        self._check_pay_modal_version()
        for number in psw:
            if self.pay_modal_version == 1:
                point = self._get_number_point(number)
                self.at.device.click_on_point(point["x"], point["y"])
            elif self.pay_modal_version == 2:
                self.e.rid(f"com.tencent.mm:id/tenpay_keyboard_{number}").click()

        if self.e.text("支付成功").exists(10):
            self.e.text("完成").click(is_scroll=True)
        else:
            raise TypeError("支付失败")

    def close_payment_dialog(self):
        if not self._is_in_payment():
            logger.info("current views: %s", self._current_views)
            logger.error("支付框不存在")
            return True
        if self._source_tree:
            button = self._source_tree.xpath(WXAndroidNative.PAYMENT_RETURN_XPATH)
            if button:
                logger.info("找到零钱不足提示弹窗: %s", button[0])
                self.click_view(button[0])
                return
        if self.e.text_contains("￥").exists(10):
            if not self.e.desc("关闭").click_if_exists():
                # 找不到关闭按钮试下直接返回
                self._press_back()
                return True
        else:
            if self.e.text_contains("支付方式").exists():
                self.at.adb.press_back()  # 有可能找不到输入框，先后退尝试
                return True
            logger.error("支付框不存在")
        return False

    def text_exists(self, text="", iscontain=False, wait_seconds=5):
        logger.debug(f'check ui {"contain" if iscontain else "exists"} "{text}"')
        if iscontain:
            return self.e.text_contains(text).exists(wait_seconds)
        else:
            return self.e.text(text).exists(wait_seconds)

    def _is_visible(self, view: UiView) -> Optional[Rect]:
        """检查view是否可见

        :param UiView view: view
        :return Rect or None:

        判断两个矩形是否相交即可
        在x轴方向:A.center_x和B.center_x的距离一定小于或等于矩形A的宽度+矩形B的宽度的一半
        在y轴方向:A.center_Y和B.center_Y的距离一定小于或等于矩形A的高度+矩形B的高度的一半


        """
        rect = view.get_rect()
        rect_device = Rect(0, 0, self.screen_size[0], self.screen_size[1])
        new_rect = Rect(
            max(rect.left, rect_device.left),
            max(rect.top, rect_device.top),
            min(rect.right, rect_device.right),
            min(rect.bottom, rect_device.bottom),
        )  # 相交矩形
        if (
            new_rect.width >= 0 and new_rect.height >= 0
        ):
            return new_rect
        return None

    def _click_element(self, el: ATElement, check_visible=True) -> bool:
        """点击元素

        :param ATElement el: 元素
        :param bool check_visible: 检查是否可见, defaults to True
        """
        try:
            views = el.get_ui_views()
            if not views:
                el.check_scroll(True)
                views = el.get_ui_views()
        except:
            return False
        if not views:  # not exists
            return False
        elif len(views) == 1:
            if check_visible and not self._is_visible(views[0]):
                logger.warning(f"find 1 element[{el}], but it maybe not visible")
                return False
            return el.click()
        else:
            if check_visible:
                for view in views:
                    rect = self._is_visible(view)
                    if rect:
                        self.at.adb.click_point(rect.center_x, rect.center_y)
                        return True
        return el.click()

    def text_click(self, text="", iscontain=False):
        if iscontain:
            el = self.e.text_contains(text=text)
        else:
            el = self.e.text(text=text)
        return self._click_element(el)

    def get_system_info(self):
        return self.at.adb.desc

    def select_wechat_avatar(self):
        source = self.source()
        view = source.xpath(WXAndroidNative.USER_AVATAR_XPATH)
        if not view:
            return False
        return self.click_view(view[0])

    def _press_back(self):
        try:
            self.at.adb.press_key_code(at.keycode.KEYCODE_BACK)
        except Exception:
            return False
        return True

    def is_app_in_foreground(self, appid):
        # exists text like appid:page_path:VISIBLE
        return self.e.text_contains(text=appid).exists(0.5)

    # back_to_miniprogram needed
    def _is_in_wechat(self, activity: str):
        return activity.startswith(WECHAT_PACKAGE)

    def _is_in_wechat_main(self, activity: str):
        return activity.endswith(WECHAT_ACTIVITY)

    def _is_in_miniprogram(self, activity: str):
        # return re.sub(r"\d+$", "", activity).endswith(MINIPROGRAM_ACTIVITY)
        temp = re.sub(r"\d+$", "", activity)
        return temp.endswith(MINIPROGRAM_ACTIVITY) or temp.endswith(
            MINIPROGRAM_PLUGIN_ACTIVITY
        )

    def _is_in_target_miniprogram(self, appid: str):
        if not appid:
            return True
        appids = []
        for i in self.at.java_driver.dump_ui():
            match = re.match("^(wx\w+):.*$", i.content_desc)
            if match:
                appids.append(match.group(1))
        return appids[-1] == appid if len(appids) > 0 else False

    def _close_miniprogram(self):
        return self._press_back()

    def _get_any_modal(self, confirm=False) -> Optional[Tuple[NativeModal, bool]]:
        """
        confirm == True: 确认/允许
        confirm == False: 拒绝/取消
        蒙层下有button可以点击, 可以覆盖:
        1. 授权弹窗 —— 拒绝
        2. 分享弹窗 —— 取消/发送
        3. 模态弹窗 —— 取消/确定
        4. ACTION SHEET暂不支持
        """
        # check auth
        modal_type = self._check_auth_type(confirm, 0)
        if modal_type is not NativeModal.NONE:
            return (modal_type, confirm)
        # check modal
        ok = (
            self.e.rid("android:id/content")
            .child()
            .focusable(True)
            .cls_name("android.widget.Button")
            .text("确定" if confirm else "取消")
        )
        view = self._get_view_from_current_view(ok)
        if view and view.rid:  # 有rid的【确定/取消】
            return (NativeModal.MODAL, confirm)
        return None

    def _handle_modal(self, modal: Tuple[NativeModal, bool]) -> ModalStatus:
        if not modal:
            return ModalStatus.OK
        modal_type, confirm = modal
        if modal_type.value < NativeModal.MODAL.value:
            if self._handle_auth(modal_type, confirm):
                return ModalStatus.OK
            return ModalStatus.NotFound
        if modal_type is NativeModal.MODAL:
            if self.handle_modal(confirm):
                return ModalStatus.OK
            return ModalStatus.NotFound
        return ModalStatus.Error

    def _get_any_modal_old(self, confirm=False):
        """
        confirm == True: 确认/允许
        confirm == False: 拒绝/取消
        蒙层下有button可以点击, 可以覆盖:
        1. 授权弹窗 —— 拒绝
        2. 分享弹窗 —— 取消/发送
        3. 模态弹窗 —— 取消/确定
        4. ACTION SHEET暂不支持
        """
        self._get_current_views()  # 刷新一下当前所有的views信息
        modals = []
        buttons = ["允许", "确认", "确定"] if confirm else ["拒绝", "取消"]
        for button in buttons:
            btn = (
                self.e.rid("android:id/content")
                .child()
                .focusable(True)
                .cls_name("android.widget.Button")
                .text(button)
            )
            if self._el_exist_in_current_view(btn):
                modals.append(btn)

        if not modals and not confirm:  # 兜底弹窗
            ok = (
                self.e.rid("android:id/content")
                .child()
                .focusable(True)
                .cls_name("android.widget.Button")
                .text("确定")
            )
            if self._el_exist_in_current_view(ok):
                modals.append(ok)

        return modals

    def _handle_modal_old(self, modals):
        if not modals:
            return ModalStatus.OK
        if isinstance(modals, (tuple, list)):
            success_modals = []
            ret = ModalStatus.OK
            for modal in modals:
                logger.info(f"handle modal: {modal}")
                try:
                    rid = modal.get_view().rid
                except at.core.exceptions.UiNotFoundError:
                    return ModalStatus.NotFound
                if modal.click_if_exists(0):
                    if not rid:
                        ret = ModalStatus.NotOfficialModal
                    success_modals.append(modal)
            logger.info(
                f"need handle {len(modals)} modal, success {len(success_modals)}"
            )
            if len(success_modals) > 0:
                return ret
        else:
            modal = modals
            logger.info(f"handle modal: {modal}")
            try:
                rid = modal.get_view().rid
            except at.core.exceptions.UiNotFoundError:
                return ModalStatus.NotFound
            if modal.click_if_exists(0):
                if not rid:
                    return ModalStatus.NotOfficialModal
                return ModalStatus.OK
            return ModalStatus.Error
        return ModalStatus.Error

    @decorator.cached_property
    def display_id(self):
        for cmd, kw in WXAndroidNative.GET_CURRENT_DISPLAY_CMD:
            output = self.at.adb.run_adb(
                [
                    "shell",
                    cmd,
                ]
            )
            logger.debug(output)
            for line in output.split("\n"):
                line = line.strip()
                m = re.search(r"%s=(\d+)" % kw, line)
                if m:
                    logger.info(f"current display id is {m.group(1)}")
                    return int(m.group(1))
        return 0

    def _get_current_activity(self):
        for i in range(len(WXAndroidNative.GET_CURRENT_ACTIVITY_CMD)):
            idx = (i + WXAndroidNative.GET_CURRENT_ACTIVITY_CMD_IDX) % len(WXAndroidNative.GET_CURRENT_ACTIVITY_CMD)
            WXAndroidNative.GET_CURRENT_ACTIVITY_CMD_IDX = idx  # 更新一下, 下次从这个开始检查
            cmd = WXAndroidNative.GET_CURRENT_ACTIVITY_CMD[idx]
            output = self.at.adb.run_adb(
                [
                    "shell",
                    cmd,
                ]
            )
            logger.debug(output)
            for line in output.split("\n"):
                line = line.strip()
                m = re.search(r"((\w+?\.)+?(\w+)/(\.\w+)+)", line)
                if m:
                    logger.info(f"current activity is {m.group(0)}")
                    return m.group(0)
        return ""

    def _is_in_payment(self):
        source = self.source()
        if source:
            # 解绑了银行卡 + 零钱不足
            button = source.xpath(WXAndroidNative.PAYMENT_RETURN_XPATH)
            if button:
                return True
        try:
            if self.pay_modal_version == 2:
                self._get_current_views()
                return self._el_exist_in_current_view(self.e.rid("com.tencent.mm:id/tenpay_keyboard_0"))
            elif self.pay_modal_version == 1:
                self._get_current_views()
                return self._el_exist_in_current_view(self.e.text_contains("请输入支付密码")) and self._el_exist_in_current_view(self.e.text_contains("￥"))
            self._check_pay_modal_version() 
        except TypeError:
            return False
        return True

    def _get_number_point(self, number):
        """
        获取数字的中心坐标
        :param number:
        :return:
        """
        if type(number) is str:
            if type(eval(number)) is not int:
                raise TypeError("number应该为int")
            number = int(number)
        rect = self.e.rid("com.tencent.mm:id/g60").get_rect()
        column_distance = (rect.right - rect.left) / 3  # 列距
        line_distance = (rect.bottom - rect.top) / 4  # 行距

        start_center_point = {
            "x": rect.left + column_distance / 2,
            "y": rect.top + line_distance / 2,
        }

        if number == 1:
            x = start_center_point["x"]
            y = start_center_point["y"]
        elif number == 0:
            x = start_center_point["x"] + column_distance
            y = start_center_point["y"] + line_distance * 3
        else:
            row_num = (number - 1) // 3  # 跟起点相差几行
            column_num = number % 3
            if column_num == 0:
                column_num = 3
            column_num = column_num - 1  # 跟起点相差几列
            x = start_center_point["x"] + column_distance * column_num
            y = start_center_point["y"] + line_distance * row_num
        print("number:{0} ===> Point({1},{2})".format(number, x, y))
        return {"x": x, "y": y}

    def _collectFPSData(self, results):
        timestamps = []
        if len(results) < 128:
            return (0, timestamps)
        nanoseconds_per_second = 1e9
        refresh_period = int(results[0]) / nanoseconds_per_second
        # logger.debug("refresh_period: %s" % refresh_period)
        pending_fence_timestamp = (1 << 63) - 1
        for line in results[1:]:
            fields = line.split()
            if len(fields) != 3:
                continue
            if not fields[0].isnumeric():
                continue
            if int(fields[0]) == 0:
                continue
            timestamp = int(fields[1])
            if timestamp == pending_fence_timestamp:
                continue
            timestamp /= nanoseconds_per_second
            timestamps.append(timestamp)
        # logger.error("timestamps: %s" % timestamps)
        return (refresh_period, timestamps)

    def _GetNormalizedDeltas(self, data, refresh_period, min_normalized_delta=None):
        deltas = [t2 - t1 for t1, t2 in zip(data, data[1:])]
        if min_normalized_delta is not None:
            deltas = filter(
                lambda d: d / refresh_period >= min_normalized_delta, deltas
            )
            deltas = list(deltas)
        return (deltas, [delta / refresh_period for delta in deltas])

    def _CalculateResults(self, refresh_period, timestamps):
        """Returns a list of SurfaceStatsCollector.Result."""
        frame_count = len(timestamps)
        if frame_count == 0:
            return 0
        seconds = timestamps[-1] - timestamps[0]
        frame_lengths, normalized_frame_lengths = self._GetNormalizedDeltas(
            timestamps, refresh_period, _MIN_NORMALIZED_FRAME_LENGTH
        )
        if len(frame_lengths) < frame_count - 1:
            logging.warning("Skipping frame lengths that are too short.")
            frame_count = len(frame_lengths) + 1
        if len(frame_lengths) == 0:
            # raise Exception("No valid frames lengths found.")
            return 0
        return int(round((frame_count - 1) / seconds))

    @property
    def e(self):
        return self.at.e
    
    def click_view(self, view: Union[UiView, List[UiView]]):
        if not view:
            return False
        input_interceptor = self.at.input_interceptor
        if isinstance(view, UiView):
            view = [view]
        for v in view:
            if input_interceptor:
                input_interceptor.click(v.center_x, v.center_y)
                continue
            self.at.device.click_on_ui_view(v)
        return True
    
    def log_all_nodes(self, nodes=None):
        views_list = nodes or self._get_current_views()
        logger.info("\n".join([str(node) for view in views_list for node in view ]))

    # 云环境上莫名其妙卡死在这里了。。。
    @wait(60, False)
    def check_connection(self, *args):
        # 检查atsub链接
        if self.at.java_driver.ping():
            return True
        # reconnect
        try:
            self.at.java_driver.close_remote()
            self.at.adb.stop_app(at.core.config.TEST_APP_PKG)
            time.sleep(1)
            self.at.java_driver._init(True)
        except Exception as e:
            logger.exception(e)
            return False
        return self.at.java_driver.is_remote_running()

    def check_connected(self):
        """检查是否存在【连接断开】的情况，有则手动断开一下"""
        s = self.source()
        view = s.xpath('//node[@text="连接断开"]//following::node[@text="展开"]')
        if not view:
            return True
        self.click_view(view)
        time.sleep(1)
        s = self.source()
        if self.click_view(s.xpath('//node[@text="收起"]//preceding-sibling::node[@text="结束"]')):
            time.sleep(2)
            self.close_local_debug_modal()
        return False

    def close_local_debug_modal(self):
        self.handle_modal(
            btn_text=WORDING.COMMON.MODAL_CONFIRM.value,
            title=WORDING.COMMON.LOCAL_DEBUG_MODAL_TITLE.value,
            force_title=True,
        ) or self.handle_modal(
            btn_text=WORDING.COMMON.MODAL_CONFIRM.value,
            title=WORDING.COMMON.LOCAL_DEBUG_MODAL_TITLE2.value,
            force_title=True,
        )

    def get_source_tree(self):
        """获取小程序源码树"""
        for i in range(3):
            res = self.at.java_driver.request_at_device("dumpUi", []) or ""
            if res and len(res.strip()) != 0:
                tree = ET.ElementTree(ET.fromstring(res))
                return tree
            time.sleep(i+0.5)
        return None

    @property
    def webview_offset_y(self):
        """获取小程序navigate-bar底部偏移"""
        if self._app_brand_action_bar_bottom is None:
            try:
                tree = self.get_source_tree()
                if tree is None:
                    return 0
                el = tree.find(".//*[@content-desc='更多']/../*[@content-desc='关闭']/../..")  # 右上角【胶囊】的父容器, 占据navigate-bar的右上角
                x1, y1, x2, y2 = re.match(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", re.sub(r"\s", "", el.attrib["bounds"])).groups()  # [853,173][1012,279]
                self._app_brand_action_bar_bottom = int(y2)
            except:
                return 0
        return self._app_brand_action_bar_bottom
    
    @property
    def status_bar_height(self):
        if self._status_bar_height is None:
            try:
                self._status_bar_height = self.at.device.status_bar_height()
            except:
                logger.warning("get device status_bar_height fail, try use miniprogram api")
                self.mini and self.mini.app.pixel_ratio
        return self._status_bar_height or 0
    
    # for h5
    def _mph5_visible(self, h5_url: str):
        """当前可见的小程序页面是h5页面

        :param str h5_url: 预期的h5链接
        """
        pass

    def _search_mph5_debugger_url(self, chrome_tabs: List[dict], h5_url: str=None) -> str:
        """获取小程序h5页面的debugger url

        :param List[dict] chrome_tabs: tab debug info
        :return str: debugger url
        """
        maybe = []
        for tab in chrome_tabs:
            title = WXAndroidNative.TitleInfo(tab["title"])
            if h5_url and tab["url"]:
                url = tab.get("webSocketDebuggerUrl", "")
                logger.info(f"找到预期的h5页面, debbuger url: {url}")
                return url
            else:
                if title.visible is None:  # 存在h5, 但又不是小程序页面的
                    if "webSocketDebuggerUrl" not in tab:
                        continue
                    sock = driver.TabWebSocket(tab["webSocketDebuggerUrl"])
                    is_mp_h5 = sock.run_script_with_output("window.__wxjs_environment ? true : false",timeout=30)
                    if not is_mp_h5:
                        sock.close()
                        continue
                    hidden = sock.run_script_with_output("document.hidden",timeout=30)
                    if hidden:  # 如果没有这个属性或者隐藏的页面, 先遍历一下后面的
                        maybe.append(tab["webSocketDebuggerUrl"])
                        sock.close()
                        continue
                    logger.warning(f'h5 title: {sock.run_script_with_output("document.title",timeout=30)}')
                    sock.close()
                    return tab["webSocketDebuggerUrl"]
        if maybe:
            logger.warning(f'return a hidden h5 page')
            return maybe[0]
        return ""


    def _get_mp_visible_debugger_tab(self, chrome_tabs: List[dict]) -> Optional[dict]:
        """获取小程序的debugger tab

        :param List[dict] chrome_tabs: tab debug info
        :return dict or None: webSocketDebuggerUrl, h5_url if exists
        """
        for tab in chrome_tabs:
            title = WXAndroidNative.TitleInfo(tab["title"])
            tab["title"] = title
            if title.visible:
                if "webSocketDebuggerUrl" not in tab or not tab["webSocketDebuggerUrl"]:
                    logger.warning(f"webSocketDebuggerUrl not in tab[{title}] or it's none")
                    continue
                sock = driver.TabWebSocket(tab["webSocketDebuggerUrl"])
                h5_url = sock.run_script_with_output('var web_view = document.querySelector("wx-web-view"); web_view ? web_view.getAttribute("src") : "";',timeout=90)
                sock.close()
                tab["h5_url"] = h5_url
                return tab
        return None
    
    def _get_debug_sock_name(self):
        return driver.get_all_abstract_ports(self.serial, *WXAndroidNative.WEB_DEBUG_PORT_REGEX_LIST)

    def get_websocket_debugger_url(self, h5_url: str=None) -> str:
        processname, processpid = self._get_current_appbrand()
        logger.debug(f"current appbrand processname[{processname}], id[{processpid}]")
        for sock_name in self._get_debug_sock_name():  # 可能有多个remote debug port, 找出属于小程序的那个
            logger.debug(f"find debugger port for {sock_name}")
            has_matched = False

            for reg in WXAndroidNative.WEB_DEBUG_PORT_REGEX_LIST:
                m = re.match(reg, sock_name)
                if m:
                    if m.group('pid') == str(processpid).strip():
                        logger.debug(f"{sock_name} match")
                        has_matched = True
                        break
                    else:
                        logger.debug(f"{type(m.group('pid'))}({m.group('pid')}) != str({processpid})")
                        logger.debug(str(processpid).encode("utf8"))
                        logger.debug(m.group('pid').encode("utf8"))

            if has_matched:
                # 如果符合小程序的端口特征，那么再检查当前小程序是否在前台
                # logger.warning('sock name: %s', sock_name)
                tcp_port = driver.p_forward(self.serial, sock_name)
                logger.info(tcp_port)
                chrome_tabs = driver.tabs(tcp_port)
                debugger_url = self._search_mph5_debugger_url(chrome_tabs, h5_url)
                if debugger_url:
                    return debugger_url
                """ backup
                tab = self._get_mp_visible_debugger_tab(chrome_tabs)
                if not tab:
                    continue
                if h5_url and tab["h5_url"] == h5_url:
                    logger.info("找到预期的小程序h5页面")
                elif h5_url and tab["h5_url"]:
                    logger.warning(f"当前可见小程序页面与预期的h5页面不符: 预期{h5_url}, 实际{tab['h5_url']}")
                elif tab["h5_url"]:
                    logger.info(f"找到小程序h5页面{tab['h5_url']}")
                else:
                    logger.warning("没找到小程序h5页面")
                """
        logger.warning("get debugger url fail, maybe you should open the following link on wechat first\nhttp://debugxweb.qq.com/?inspector=true")
        return ""

if __name__ == "__main__":
    n = WXAndroidNative({})
    n.handle_modal("queding", "")
