# -*- coding: utf-8 -*-
"""
@author: 'xiazeng'
@created: 2016/10/21 
"""
import base64
import copy
import inspect
import json
import logging
import os.path
import sys
import time
import warnings
import re

import at.core.case_repair_adapter
from at.core import uixml, javadriver, resguard, uidevice, exceptions
import at.utils.decorator as decorator

if sys.version_info[0] < 3:
    basestring = (str, unicode)
else:
    basestring = str

logger = logging.getLogger()


class AtSelector:
    SELECTOR_NIL = 0
    SELECTOR_TEXT = 1
    SELECTOR_START_TEXT = 2
    SELECTOR_CONTAINS_TEXT = 3
    SELECTOR_CLASS = 4
    SELECTOR_DESCRIPTION = 5
    SELECTOR_START_DESCRIPTION = 6
    SELECTOR_CONTAINS_DESCRIPTION = 7
    SELECTOR_INDEX = 8
    SELECTOR_INSTANCE = 9
    SELECTOR_ENABLED = 10
    SELECTOR_FOCUSED = 11
    SELECTOR_FOCUSABLE = 12
    SELECTOR_SCROLLABLE = 13
    SELECTOR_CLICKABLE = 14
    SELECTOR_CHECKED = 15
    SELECTOR_SELECTED = 16
    SELECTOR_ID = 17
    SELECTOR_PACKAGE_NAME = 18
    SELECTOR_CHILD = 19
    SELECTOR_CONTAINER = 20
    SELECTOR_PATTERN = 21
    SELECTOR_PARENT = 22
    SELECTOR_COUNT = 23
    SELECTOR_LONG_CLICKABLE = 24
    SELECTOR_TEXT_REGEX = 25
    SELECTOR_CLASS_REGEX = 26
    SELECTOR_DESCRIPTION_REGEX = 27
    SELECTOR_PACKAGE_NAME_REGEX = 28
    SELECTOR_RESOURCE_ID = 29
    SELECTOR_CHECKABLE = 30
    SELECTOR_RESOURCE_ID_REGEX = 31
    SELECTOR_USE_CUSTOM = 40

    @classmethod
    def msg(cls, sid):
        msg = {
            cls.SELECTOR_TEXT: "text",
            cls.SELECTOR_RESOURCE_ID: "rid",
            cls.SELECTOR_DESCRIPTION: "description",
            cls.SELECTOR_CLASS: "class",
            cls.SELECTOR_CONTAINS_TEXT: "contains",
            cls.SELECTOR_ENABLED: "enabled",
            cls.SELECTOR_CHECKED: "checked",
            cls.SELECTOR_CLICKABLE: "clickable",
            cls.SELECTOR_PACKAGE_NAME: "package",
            cls.SELECTOR_INSTANCE: "instance",
            cls.SELECTOR_INDEX: "index",
            cls.SELECTOR_CONTAINS_DESCRIPTION: "desc_contains",
        }
        return msg.get(sid, sid)


class Element(object):
    """控件元素，用于选择和操作控件，选择请用选择器函数，选择器函数返回自身(self)，可以做链式选择。
    非选择器函数返回None或者对应的属性
    """
    default_jd = None
    default_resguard_filename = None

    def __init__(self, **selector):
        """
        :param selector:手动填入选择器， 如果需要试用多设备，请传入jd_instance实例
        """
        self.input_interceptor = None
        self._resguard = None
        self._private_jd = None
        self._resguard_filename = None
        if "jd_instance" in selector:
            self._private_jd = selector["jd_instance"]
            del selector["jd_instance"]
        if "resguard_filename" in selector:
            self._resguard_filename = selector["resguard_filename"]
            del selector["resguard_filename"]
        self._selector = selector
        self._selectors = [{"name": "current", "values": self._selector}]

    def get_xml_attr(self):
        """获取控件所有属性

        :return: Dict 控件的xml属性
        """
        attr = {}
        for select_id, value in self.get_selector().items():
            if select_id == AtSelector.SELECTOR_PACKAGE_NAME:
                attr['package'] = value
            elif select_id == AtSelector.SELECTOR_CONTAINS_TEXT:
                logger.error("not support: %s", AtSelector.msg(select_id))
            elif select_id == AtSelector.SELECTOR_CONTAINS_DESCRIPTION:
                logger.error("not support: %s", AtSelector.msg(select_id))
            elif select_id == AtSelector.SELECTOR_TEXT:
                attr['text'] = value
            elif select_id == AtSelector.SELECTOR_CLASS:
                attr['class'] = value
            elif select_id == AtSelector.SELECTOR_RESOURCE_ID:
                attr['resource-id'] = self.resguard.retrace_id(value)
            elif select_id == AtSelector.SELECTOR_DESCRIPTION:
                attr['content-desc'] = value
            elif select_id == AtSelector.SELECTOR_ENABLED:
                attr['enabled'] = value
            else:
                logger.error("not support: %s", AtSelector.msg(select_id))
                # raise RuntimeError("unknown select_id:%s" % select_id)
        return attr

    def set_input_interceptor(self, input_interceptor):
        """操作拦截，比如拦截点击操作，用input_interceptor来实现具体的点击

        :param input_interceptor:
        :return: None
        """
        self.input_interceptor = input_interceptor

    def match_ui_view(self, ui_view):
        for select_id, value in self.get_selector().items():
            if select_id == AtSelector.SELECTOR_PACKAGE_NAME:
                if value not in ui_view.package:
                    return False
            elif select_id == AtSelector.SELECTOR_TEXT:
                if ui_view.text != value:
                    return False
            elif select_id == AtSelector.SELECTOR_START_TEXT:
                if not ui_view.text.startswith(value):
                    return False
            elif select_id == AtSelector.SELECTOR_CONTAINS_TEXT:
                if value not in ui_view.text:
                    return False
            elif select_id == AtSelector.SELECTOR_DESCRIPTION:
                if ui_view.content_desc != value:
                    return False
            elif select_id == AtSelector.SELECTOR_START_DESCRIPTION:
                if not ui_view.content_desc.startswith(value):
                    return False
            elif select_id == AtSelector.SELECTOR_CONTAINS_DESCRIPTION:
                if value not in ui_view.content_desc:
                    return False
            elif select_id == AtSelector.SELECTOR_CLASS:
                if ui_view.cls_name != value:
                    return False
            elif select_id == AtSelector.SELECTOR_RESOURCE_ID:
                if ui_view.raw_id != value:
                    return False
            elif select_id == AtSelector.SELECTOR_CHECKABLE:
                if ui_view.checkable != value:
                    return False
            elif select_id == AtSelector.SELECTOR_CHECKED:
                if ui_view.checked != value:
                    return False
            elif select_id == AtSelector.SELECTOR_INDEX:
                pass
                # index 不做校验
                # if ui_view.index != value:
                #     return False
            elif select_id == AtSelector.SELECTOR_FOCUSABLE:
                if ui_view.focusable != value:
                    return False
            elif select_id == AtSelector.SELECTOR_FOCUSED:
                if ui_view.focused != value:
                    return False
            elif select_id == AtSelector.SELECTOR_CLICKABLE:
                if ui_view.clickable != value:
                    return False
            elif select_id == AtSelector.SELECTOR_LONG_CLICKABLE:
                if ui_view.long_clickable != value:
                    return False
            elif select_id == AtSelector.SELECTOR_USE_CUSTOM:
                pass
            elif select_id == AtSelector.SELECTOR_INSTANCE:
                pass
            elif select_id == AtSelector.SELECTOR_ENABLED:
                if ui_view.enabled != value:
                    return False
            elif select_id == AtSelector.SELECTOR_TEXT_REGEX:
                if not re.match(value, ui_view.text):
                    return False
            elif select_id == AtSelector.SELECTOR_DESCRIPTION_REGEX:
                if not re.match(value, ui_view.content_desc):
                    return False
            elif select_id == AtSelector.SELECTOR_RESOURCE_ID_REGEX:
                if not re.match(value, ui_view.raw_id):
                    return False
            else:
                raise RuntimeError("unknown select_id:%s" % select_id)
        return True

    def get_selector(self):
        """返回当前选择器"""
        return self._selector

    def __repr__(self):
        values = []
        suffix = ""
        for sid, value in self._selector.items():
            if sid == AtSelector.SELECTOR_RESOURCE_ID:
                value = self.resguard.retrace_id(value)
            if sid == AtSelector.SELECTOR_PACKAGE_NAME:
                suffix = "%s=%s" % (AtSelector.msg(sid), value)
            else:
                values.append("%s=%s" % (AtSelector.msg(sid), value))
        if suffix:
            values.append(suffix)
        return u', '.join(values)

    def __hash__(self):
        return hash(repr(self))

    @property
    def jd(self):
        """
        :rtype: javadriver.JavaDriver
        :return: 
        """
        if self._private_jd:
            return self._private_jd  # type: javadriver.JavaDriver
        elif Element.default_jd:
            return Element.default_jd   # type: javadriver.JavaDriver
        else:
            raise exceptions.AtError("elem should be passed a JavaDriver")

    @decorator.cached_property
    def device(self):
        return uidevice.PyUiDevice(self.jd)

    @property
    def resguard(self):
        return resguard.Resguard.get_resguard(self.jd.serial)

    @classmethod
    def bind_java_driver(cls, jd):
        cls.default_jd = jd

    @classmethod
    def bind_resguard_filename(cls, filename):
        if filename:
            cls.default_resguard_filename = filename

    def child(self, **selector):
        """
        选择器切换，使用这个函数之后，选择器切换到孩子的方向上，后续的过滤条件只对孩子生效
        """
        self._selector = copy.deepcopy(selector)
        self._selectors.append({"name": "child", "values": self._selector})
        return self

    def parent(self, **selector):
        """
        选择器切换，使用这个函数之后，选择器切换到祖先方向上，后续的过滤条件只对祖先生效
        """
        self._selector = copy.deepcopy(selector)
        self._selectors.append({"name": "parent", "values": self._selector})
        return self

    def text(self, text=None):
        """
        选择器，过滤text=text的控件

        :param text: 完全匹配
        :return:
        """
        if text is None:
            return self._action("getText")  # self.get_attr("text")
        self._selector[AtSelector.SELECTOR_TEXT] = text
        return self

    def text_contains(self, text):
        """
        选择器，过滤包含text的控件

        :param text: 匹配包含的文本
        :return:
        """
        self._selector[AtSelector.SELECTOR_CONTAINS_TEXT] = text
        return self

    def text_start(self, text):
        """
        选择器，过滤以text开头的控件
        :param text: 匹配开始的文本
        :return:
        """
        self._selector[AtSelector.SELECTOR_START_TEXT] = text
        return self

    def instance(self, index):
        """
        选择器，符合过滤条件的元素序号，可以简单理解为从上到下，元素的顺序，0是第一个

        :param index: 按照XML的树形结构前序遍历的顺序
        :return:
        """
        self._selector[AtSelector.SELECTOR_INSTANCE] = index
        return self

    def text_matches(self, java_regx_str):
        """
        :param text: 匹配文本，请传入java的正则表达式
        :return:
        """
        self._selector[AtSelector.SELECTOR_TEXT_REGEX] = java_regx_str
        return self

    def rid(self, rid=None):
        """选择器，过滤控件的资源ID属性（resource-id）
        
        :param rid: 匹配resource-id
        :return:
        """
        if rid is None:
            return self.get_attr("resource_id")
        rid = self.resguard.resgurad_id(rid)
        self._selector[AtSelector.SELECTOR_RESOURCE_ID] = rid
        return self

    def index(self, index=None):  # 不建议使用，
        """选择器，过滤控件的index条件，可以理解为这个控件在兄弟姐妹中排行第几

        *warnings* 但是这个有时候跟渲染时机有问题，导致操作不稳定

        :param index: 匹配index，uiAutomatorviewer中的index
        :return:
        """
        warnings.warn('不建议用index来选择控件', DeprecationWarning)
        if index is None:
            return self.get_attr("index")
        self._selector[AtSelector.SELECTOR_INDEX] = index
        return self

    def clickable(self, true_or_false):
        """
        选择器，过滤控件的clickable属性
        :param true_or_false:
        :return:
        """
        self._selector[AtSelector.SELECTOR_CLICKABLE] = true_or_false
        return self

    def checkable(self, true_or_false):
        """
        选择器，过滤控件的checkable属性
        :param true_or_false:
        :return:
        """
        self._selector[AtSelector.SELECTOR_CHECKABLE] = true_or_false
        return self

    def checked(self, true_or_false):
        """选择器，过滤控件的checked属性

        :param true_or_false:
        :return:
        """
        self._selector[AtSelector.SELECTOR_CHECKED] = true_or_false
        return self

    def enabled(self, true_or_false):
        """选择器，过滤控件的enabled属性

        :param true_or_false:
        :return: self
        """
        self._selector[AtSelector.SELECTOR_ENABLED] = true_or_false
        return self

    def focusable(self, true_or_false):
        """选择器，过滤控件的focusable属性

        :param true_or_false:
        :return:
        """
        self._selector[AtSelector.SELECTOR_FOCUSABLE] = true_or_false
        return self

    def longClickable(self, true_or_false):
        """选择器，过滤控件的longClickable属性

        :param true_or_false:
        :return:
        """
        self._selector[AtSelector.SELECTOR_LONG_CLICKABLE] = true_or_false
        return self

    def selected(self, true_or_false):
        """选择器，过滤控件的select属性

        :param true_or_false:
        :return:
        """
        self._selector[AtSelector.SELECTOR_SELECTED] = true_or_false
        return self

    def use_custom(self):
        """选择器，使用at重写的过滤方法
        :return:
        """
        self._selector[AtSelector.SELECTOR_USE_CUSTOM] = 1
        return self

    def cls_name(self, cls_name=None):
        """选择器， 过滤控件的控件的类名，如：android.widget.EditText

        :param cls_name: 匹配class_name
        :return: Element
        """
        if cls_name is None:
            return self.get_attr("cls_name")
        self._selector[AtSelector.SELECTOR_CLASS] = cls_name
        return self

    def desc(self, desc, true_or_false=False):
        """选择器， 过滤控件的控件包含的description

        :param desc: description
        :param true_or_false: 找不到是否尝试滑动
        :return: Element
        """
        self.check_scroll(true_or_false)
        if desc is None:
            return self._action("getContentDescription")
        self._selector[AtSelector.SELECTOR_DESCRIPTION] = desc
        return self

    def pkg(self, pkg_name):
        """选择器，控件所属的包名

        :param pkg_name: 控件所属的包名
        :return:
        """
        self._selector[AtSelector.SELECTOR_PACKAGE_NAME] = pkg_name
        return self

    def desc_contains(self, desc, true_or_false=False):
        """选择器，选择description包含的文本

        :param desc:
        :param true_or_false:
        :return:
        """

        self.check_scroll(true_or_false)
        self._selector[AtSelector.SELECTOR_CONTAINS_DESCRIPTION] = desc
        return self

    def desc_reg(self, desc, true_or_false=False):
        self.check_scroll(true_or_false)
        self._selector[AtSelector.SELECTOR_DESCRIPTION_REGEX] = desc
        return self

    def list_view(self):
        """快捷选择器，选择ListView
        :return:
        """
        self.cls_name("android.widget.ListView")
        return self

    def edit_text(self):
        """快捷选择器， 选择EditText
        :return:
        """
        self.cls_name("android.widget.EditText")
        return self

    def get_attr(self, attr):
        views = uixml.get_views(self.jd.dump_ui(), self._selector)
        if not views:
            return None
        if len(views) == 1:
            if hasattr(views[0], attr):
                return getattr(self.views[0], attr)
            else:
                raise AttributeError("no this attribute %s in %s" % (str(attr), type(views[0])))
        else:
            rets = []
            for v in views:
                if hasattr(v, attr):
                    rets.append(getattr(v, attr))
                else:
                    raise AttributeError("no this attribute %s in %s" % (str(attr), type(v)))
            return rets

    def get_ui_views(self):
        ui_views = []
        for ui_view in self.jd.dump_ui():
            if self.match_ui_view(ui_view):
                ui_views.append(ui_view)
        return ui_views

    def _get_view(self):
        instance = self._selector.get(AtSelector.SELECTOR_INSTANCE, 0)
        for ui_view_list in self.jd.dump_all_views():
            for ui_view in ui_view_list:
                if self.match_ui_view(ui_view):
                    if instance == 0:
                        return ui_view
                    else:
                        instance -= 1
        return None

    def get_view(self, timeout=1.0):
        """获取符合条件的view

        :rtype: uixml.UiView
        :return:
        """
        s = time.time()
        retry = 2
        while time.time() - s < timeout or retry > 0:
            view = self._get_view()
            if view:
                logger.info(view)
                return view
            retry -= 1
            time.sleep(0.5)
        raise exceptions.UiNotFoundError()

    def wait_exists(self, timeout=10.0, should_throw_exception=False):
        """等待出现

        :param timeout: 超时时间
        :param should_throw_exception: 等不到是否抛异常
        :return:
        """
        s = time.time()
        if timeout == 0:
            timeout += 0.01
        while time.time() - s < timeout:
            try:
                ui_view = self.get_view(timeout=0.5)
                if ui_view:
                    logging.info("%s exists, view:%s", self, ui_view)
                    return True
            except exceptions.UiNotFoundError:
                time.sleep(0.1)
        logging.info("%s exists:%s, costs:%.2f", self, False, time.time() - s)
        if should_throw_exception:
            raise exceptions.UiNotFoundError("not exists")
        return False

    def wait_disappear(self, timeout=20, should_throw_exception=False):
        """等待当前控件消失

        :param timeout: 最大等待时间
        :param should_throw_exception:
        :return: 如果控件消失了，返回True；如果控件最后还在，返回False
        """
        s = time.time()
        while time.time() - s < timeout:
            if not self.exists(0):
                return True
            time.sleep(0.2)
        else:
            if should_throw_exception:
                raise exceptions.UiNotFoundError("still exists")
            return False

    def wait_disappear_by_idle(self, timeout, idle_time=1):
        """等待当前控件消失，会校验两次，适用于闪烁的场景，比如某个loading控件一闪一闪

        :param timeout:
        :param idle_time: 两次检查的时间间隔
        :return:
        """
        s = time.time()
        while time.time() - s < timeout:
            loop_start = time.time()
            if not self.exists(0):
                remain = time.time() - loop_start
                if remain < idle_time:
                    time.sleep(idle_time - remain)
                if not self.exists(0):
                    return True
            time.sleep(0.5)
        else:
            return False

    def get_rect(self):
        """获取矩形坐标"""
        bounds = self._action("pyGetBounds")
        return uixml.Rect(*bounds)

    def get_bounds(self):
        return self._action("pyGetBounds")

    def screen_data(self, quality=100):
        base64_str = self._action("screen", [quality])
        base64_data = base64.b64decode(base64_str)
        return base64_data

    def screen(self, filename, quality=100):
        d = self.screen_data(quality)
        open(filename, "wb").write(d)

    def get_text(self):
        """获取文本"""
        return self._action("getText")

    def get_counts(self):
        """获取匹配控件的数量"""
        if self.exists():
            return self._action("getCounts")
        return 0

    def get_desc(self):
        return self._action("getDesc")

    def sleep(self, seconds):
        time.sleep(seconds)
        return self

    def _action(self, method, params=None, is_async=False):
        """
        调用java层方法，不建议直接调用
        :param method: 方法名称
        :param params: 参数
        :param is_async: 是否用子线程
        :return:
        """
        if params is None:
            params = list()
        if is_async:
            import threading
            t = threading.Thread(target=self.jd.request_ui_selector, name="", args=(self._selectors, method, params))
            t.setDaemon(True)
            t.start()
        else:
            return self.jd.request_ui_selector(self._selectors, method, params)

    def record(self, name):
        if self.input_interceptor:
            self.jd.push_op(u"%s: %s", name, self, display=self.input_interceptor.display_id)
        else:
            self.jd.push_op(u"%s: %s", name, self)

    def check_scroll(self, is_scroll):
        if is_scroll:
            if self.exists(0):
                return True
            if not self._action("scrollExists"):
                logger.error("scrollExists failed")
            else:
                return True
        return False

    def scroll_exists(self):
        return self.check_scroll(True)

    def fast_click(self, is_scroll=False):
        self.record(u"快速点击")
        return self.long_click(100, is_scroll=is_scroll)

    def drag_to(self, x, y, steps=120, is_scroll=False, is_async=False):
        self.record(u"拖动")
        self.check_scroll(is_scroll)
        self._action("dragTo", [int(x), int(y), steps], is_async=is_async)

    def click_position(self,is_scroll=False, is_retry=False, is_url=False):
        self.check_scroll(is_scroll)
        ret = self._action("click")
        # ret = False
        if ret is False:
            logger.warning("click failed, %s, is_retry %s", ret, is_retry)
            if is_retry:
                try:
                    bounds = self.get_bounds()
                    x = (bounds[0] + bounds[2]) / 8
                    y = (bounds[1] + bounds[3]) / 5
                    self.jd.adb.click_point(x, y)
                except:
                    logger.exception("retry click failed")
            if is_url:
                bounds = self.get_bounds()
                width = bounds[2] - bounds[0]
                height = bounds[3] - bounds[1]
                x = bounds[0] + width / 2
                y = bounds[1] + height / 8
                device = uidevice.PyUiDevice(self.jd)
                time.sleep(2)
                if not device.click_on_point(x, y):
                    y += height / 8
                    time.sleep(2)
                    return device.click_on_point(x, y)
                else:
                    return True
        return ret

    @at.core.case_repair_adapter.deco_do_action
    def click(self, is_scroll=False, is_retry=False, is_url=False):
        """点击

        :param is_url:
        :param is_retry:
        :param is_scroll: 不存在的时候是否滑动
        :return:
        """
        self.record(u"点击")
        self.check_scroll(is_scroll)
        if self.input_interceptor:
            view = self.get_view(10)
            logger.debug(view)
            return self.input_interceptor.click(view.center_x, view.center_y)
        if is_url:
            bounds = self.get_bounds()
            width = bounds[2] - bounds[0]
            height = bounds[3] - bounds[1]
            x = bounds[0] + width / 5
            device = uidevice.PyUiDevice(self.jd)
            retrys = 3
            while retrys > 0:
                y = bounds[1] + height*9.0/10 / retrys   # 尝试3次分别点不同地方
                device.click_on_point(x, y)
                capture_op = self.jd.get_capture_op()
                self.jd.set_capture_op(False)
                if self.wait_disappear(5):
                    self.jd.set_capture_op(capture_op)
                    return True
                self.jd.set_capture_op(capture_op)
                retrys = retrys-1
            return False

        ret = self._action("click")
        if ret is False:
            logger.warning("click failed, %s, is_retry %s", ret, is_retry)
            if is_retry:
                try:
                    bounds = self.get_bounds()
                    x = (bounds[0] + bounds[2])/2
                    y = (bounds[1] + bounds[3])/2
                    self.jd.adb.click_point(x, y)
                except:
                    logger.exception("retry click failed")
        return ret

    def swipe_left(self, steps=50):
        self.record(u"向左滑动")
        return self._action("swipeLeft", [steps])

    def swipe_up(self, steps=50):
        self.record(u"向上滑动")
        return self._action("swipeUp", [steps])

    def swipe_right(self, steps=50):
        self.record(u"向右滑动")
        return self._action("swipeRight", [steps])

    def swipe_down(self, steps=50):
        self.record(u"向下滑动")
        return self._action("swipeDown", [steps])

    def delay_click(self, delay):
        """
        延后delay秒点击
        :param delay:
        :return:
        """
        self.record(u"延迟点击(%ss):" % delay)
        return self._action("delayClick", [delay * 1000])

    @at.core.case_repair_adapter.deco_do_action
    def double_click(self, is_scroll=False):
        """双击"""
        self.record(u"双击")
        self.check_scroll(is_scroll)
        if self.input_interceptor:
            rect = self.get_rect()
            return self.input_interceptor.double_click(rect.center_x, rect.center_y)
        else:
            return self._action("doubleClick", [100])

    @at.core.case_repair_adapter.deco_do_action
    def long_click(self,  duration=4000, is_scroll=False):
        """长按"""
        self.record(u"长按")
        self.check_scroll(is_scroll)
        if self.input_interceptor:
            rect = self.get_rect()
            return self.input_interceptor.long_click(rect.center_x, rect.center_y)
        else:
            return self._action("longPress", [duration, ])

    def click_if_exists(self, timeout=3):
        """如果存在就点击，不存在就不操作，不抛出异常"""
        if timeout == 0:
            try:
                view = self.get_view()
                self.device.click_on_ui_view(view)
                return True
            except exceptions.UiNotFoundError:
                logger.warning("not exists by selector:" + self.__repr__())
                return False
        else:
            t = time.time()
            while time.time() - t < timeout:
                if self.exists(0.5):
                    try:
                        # 可能真正点击的时候又不在了，所以这个异常应该要catch住
                        return self.click()
                    except:
                        return False
            else:
                logger.warning("not exists by selector:" + self.__repr__())
                return False

    def click_button_right(self, is_scroll=False):
        self.record(u"点击右下角")
        self.check_scroll(is_scroll)
        return self._action("clickBottomRight")

    @at.core.case_repair_adapter.deco_do_action
    def enter(self, text, is_clear_text=False, is_scroll=False, is_click=True):
        """输入文本

        :param text:输入的内容
        :param is_clear_text:
        :param is_scroll:
        :param is_click: 输入前是否需要点击，小程序的组件需要传False，并且先调用click方法点击触发输入光标在输入框
        :return:
        """
        self.record(u"输入:%s" % text)
        self.check_scroll(is_scroll)
        if not isinstance(text, basestring):
            raise TypeError(u"需要传入字符串，而实际类型是：%s" % str(type(text)))
        logger.info("enter %s %s, %s" % (text, str(self._selector), is_clear_text))
        return self._action("setText", [text, is_clear_text, is_click])

    def enter_chinese(self, text, is_clear_text=False, is_scroll=False, is_click=True):
        warnings.warn('enter_chinese', DeprecationWarning)
        self.record(u"输(%s)" % text)
        self.check_scroll(is_scroll)
        if not isinstance(text, basestring):
            raise TypeError(u"需要传入字符串，而实际类型是：%s" % str(type(text)))
        logger.info("enter %s %s" % (text, str(self._selector)))
        return self._action("setChineseText", [text, is_clear_text, is_click])

    def exists(self, seconds=2.000):  # seconds指一个最小时间，而不是最大时间，最大时间无法控制
        """是否存在"""
        # self.record(u"exists")
        return self.wait_exists(seconds)

    def tap_scroll(self, direction="up"):
        rect = self.get_bounds()
        device = uidevice.PyUiDevice(self.jd)
        center_x = (rect[0]+rect[2])/2
        center_y = (rect[1]+rect[3])/2
        min_width = rect[0] + int((rect[2] - rect[0])*1.0/4)
        max_width = rect[0] + int((rect[2] - rect[0])*3.0/4)
        min_height = rect[1] + int((rect[3] - rect[1])*1.0/4)
        max_height = rect[1] + int((rect[3] - rect[1])*3.0/4)
        duration = 100
        steps = 2
        if direction == "up":
            device.fast_scroll(center_x, max_height, center_x, min_height, duration, steps)
        elif direction == "down":
            device.fast_scroll(center_x, min_height, center_x, max_height, duration, steps)
        elif direction == "left":
            device.fast_scroll(max_width, center_y, min_width, center_y, duration, steps)
        elif direction == "right":
            device.fast_scroll(min_width, center_y, max_width, center_y, duration, steps)
        else:
            raise RuntimeError("direction should be one of up, down, left, right")

    def assert_exists(self, timeout=10):
        """动作函数，校验控件是否存在，不存在抛出Assert异常

        :param timeout:
        :return:
        """
        s = time.time()
        while time.time() - s < timeout:
            if self.exists(0.5):
                return True
            time.sleep(0.5)
        raise exceptions.UiNotFoundError("not exists")

    def assert_not_exist(self, timeout=3):
        """校验控件是否存在，存在抛出Assert异常

        :param timeout:
        :return:
        """
        s = time.time()
        exists = True
        while time.time() - s < timeout:
            try:
                if self.get_view():
                    exists = True
            except exceptions.UiNotFoundError:
                exists = False
        if exists:
            raise AssertionError("%s not exists" % self)
