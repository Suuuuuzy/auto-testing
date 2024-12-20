# -*- coding: utf-8 -*-
"""
@author: 'xiazeng'
@created: 2017/1/17 
"""
import base64
import json
import logging
import time

from at.core import element, javadriver, uixml, case_repair_adapter
import at.utils.commonhelper as commonhelper

logger = logging.getLogger()


class PyUiDevice(object):
    def __init__(self, jd):
        self.jd = jd  # type: javadriver.JavaDriver
        self.adb = jd.adb
        self.input_interceptor = None
        self._width = None
        self._height = None

    def set_input_interceptor(self, input_interceptor):
        self.input_interceptor = input_interceptor

    def enter(self, text):
        self.record(u"直接输入: %s", text)
        self.request_method("setText", [text])

    def enter_zh(self, zh_text):
        self.record(u"直接输入中文: %s", zh_text)
        self.request_method("setChineseText", [zh_text])

    def get_ui_view(self, selector, instance=0, views=None):
        """
        :rtype: uixml.UiView
        """
        if views is None:
            views = self.jd.get_ui_views()
            if isinstance(selector, element.Element):
                for view in views:
                    if selector.match_ui_view(view):
                        return view
            else:
                logger.error("unknown type: %s, %s", type(selector), selector)

        return uixml.get_view(views, selector, instance)

    def click_on_ui_view(self, ui_view):
        """
        :type ui_view: uixml.UiView
        :return: 
        """
        self.click_on_point(ui_view.center_x, ui_view.center_y)

    def gesture(self, points):
        self.record(u"手势: %s", json.dumps(points))
        params = []
        for point in points:
            params.append(int(point[0]))
            params.append(int(point[1]))
        self.jd.request_at_device("gesture", params)

    @case_repair_adapter.deco_do_action
    def click_on_point(self, x, y):
        self.record(u"点击坐标: %s, %s", int(x), int(y))
        if self.input_interceptor:
            return self.input_interceptor.click(x, y)
        else:
            self.request_method("click", [int(x), int(y)])

    def click_on_list(self, xy_list, max_sleep=0.5, min_sleep=0.5):
        """
        点击列表
        :param xy_list:
        :param interval: 两次点击直接最大停顿时间
        :param min_sleep: 两次点击直接最小停顿时间
        :return:
        """
        self.jd.push_op(u"点击列表点:%s", xy_list)
        for x, y in xy_list:
            t = time.time()
            self.request_method("click", [int(x), int(y)])
            sleep_time = max_sleep - (time.time() - t)
            if sleep_time > min_sleep:
                time.sleep(sleep_time)
            else:
                time.sleep(min_sleep)

    def screen_point_data(self, x, y, width, height, quality):
        self.record(u"局部截图: %s, %s, %s, %s", int(x), int(y), int(width), int(height))
        base64_str = self.request_method("screenPoint", [int(x), int(y), int(width), int(height), int(quality)])
        # logger.info("base64_str is %s"%base64_str)
        base64_data = base64.b64decode(base64_str)
        return base64_data

    def screen_point(self, filename, x, y, width, height, quality=30):
        d = self.screen_point_data(x, y, width, height, quality)
        open(filename, "wb").write(d)

    def click_on_center(self):
        self.click_on_point(self.width()/2, self.height()/2)

    def swipe(self, x1, y1, x2, y2, steps):
        self.record(u"滑动: %s,%s -> %s, %s", x1, y1, x2, y2)
        if self.input_interceptor:
            self.input_interceptor.swipe(x1, y1, x2, y2, steps)
        else:
            self.fast_scroll(x1, y1, x2, y2, 100, steps)
            # self.request_method("swipe", [int(x1), int(y1), int(x2), int(y2), steps])

    def swipe_left(self, rect, steps=10):
        y = rect.top + rect.height / 2
        x2, x1 = rect.left + rect.width / 4, rect.left + rect.width * 3 / 4
        self.swipe(x1, y, x2, y, steps)

    def swipe_right(self, rect, steps=20):
        y = rect.top + rect.height / 2
        x1, x2 = rect.left + rect.width / 4, rect.left + rect.width * 3 / 4
        self.swipe(x1, y, x2, y, steps)

    def long_click_on_point(self, x, y, duration=3*1000):
        self.record(u"长按: %s, %s, 时间:%sms", int(x), int(y), duration)
        if self.input_interceptor:
            self.input_interceptor.long_click(x, y, duration/1000.0)
        else:
            self.request_method("longClick", [int(x), int(y), duration])

    def long_click_on_center(self, duration=3*1000):
        self.long_click_on_point(self.width()/2, self.height()/2, duration)

    def get_rotation(self):
        """
        https://developer.android.com/reference/android/view/Surface.html#ROTATION_0
        :return: 0-3
        """
        return self.request_method("getRotation")

    def status_bar_height(self):
        """获取状态栏的高度"""
        return self.request_method("getStatusBarHeight")

    def height(self):
        """
        获取全屏幕大小（包括status_bar的高度）
        """
        if not self._height:
            self._height = self.request_method("getDisplayHeight")
        return self._height

    def width(self):
        if not self._width:
            self._width = self.request_method("getDisplayWidth")
        return self._width

    def device_size(self):
        return self.width(), self.height()

    def wait_window_update(self, pkg, timeout=10*1000):
        ret = self.request_method("waitForWindowUpdate", [pkg, timeout])
        if ret:
            time.sleep(2)
        return ret

    def wait_for_idle(self, timeout=10*1000):
        """
        等待一段时间内ui没有变化
        """
        return self.request_method("waitForIdle", [timeout])

    def current_package(self):
        return self.request_method("getCurrentPackageName")

    def drag(self, x1, y1, x2, y2, steps=10, first_sleep=200, last_sleep=200):
        """
        拖动
        """
        self.record(u"拖动: %s,%s -> %s, %s", x1, y1, x2, y2)
        self.custom_drag(x1, y1, x2, y2, [first_sleep]+steps*[50]+[last_sleep])

    def scroll(self, x1, y1, x2, y2, steps=20):
        """
        滑动
        """
        self.record(u"滑动: %s,%s -> %s, %s", x1, y1, x2, y2)
        self.jd.request_action(self.jd.ACTION_AT_DEVICE, "fastDrag", [int(x1), int(y1), int(x2), int(y2), 500, steps])

    def fast_scroll_one_forth_page(self, direction='up', num=1, milliseconds=100, steps=10):
        """
        滑动1/4个屏幕
        """
        width = self.width()
        height = self.height() - self.status_bar_height()
        for i in range(num):
            if direction == "up":
                self.fast_scroll(width / 2, height * 5 / 8, width / 2, height * 3 / 8, milliseconds, steps)
            elif direction == "down":
                self.fast_scroll(width / 2, height * 3 / 8, width / 2, height * 5 / 8, milliseconds, steps)
            elif direction == "left":
                self.fast_scroll(width*5/8, height/2, width*3/8, height/2, milliseconds, steps)
            elif direction == "right":
                self.fast_scroll(width*3/8, height/2, width*5/8, height/2, milliseconds, steps)
            else:
                raise TypeError("%s direction" % direction)
            time.sleep(0.1)

    def scroll_one_forth_page(self, direction, num=1):
        """
        滑动1/4个屏幕,direction是方向：up是从下往上, down是从上往下，left是从右到左，right是从左到右
        """
        width = self.width()
        height = self.height() - self.status_bar_height()
        self.jd.set_capture_op(False)
        for i in range(num):
            if direction == "up":
                self.scroll(width/2, height*5/8, width/2, height*3/8)
            elif direction == "down":
                self.scroll(width / 2, height*3/8, width / 2, height*5/8)
            elif direction == "left":
                self.scroll(width*5/8, height/2, width*3/8, height/2)
            elif direction == "right":
                self.scroll(width*3/8, height/2, width*5/8, height/2)
            else:
                raise TypeError("%s direction" % direction)
            time.sleep(0.2)
        self.jd.set_capture_op(True)
        self.record("滑动:%s", direction)

    def fast_scroll_one_page(self, direction, num=1, milliseconds=100, steps=1):
        """
        快速滑动一整屏幕
        """
        width = self.width()
        height = self.height() - self.status_bar_height()
        for i in range(num):
            if direction == "up":
                self.fast_scroll(width/2, height*7/8, width/2, height*1/8, milliseconds, steps)
            elif direction == "down":
                self.fast_scroll(width / 2, height*1/8, width / 2, height*7/8, milliseconds, steps)
            elif direction == "left":
                self.fast_scroll(width*7/8, height/2, width*1/8, height/2, milliseconds, steps)
            elif direction == "right":
                self.fast_scroll(width*1/8, height/2, width*7/8, height/2, milliseconds, steps)
            else:
                raise TypeError("%s direction" % direction)
            time.sleep(0.1)

    def scroll_one_page(self, direction):
        return self.scroll_one_forth_page(direction, 4)

    def fast_scroll(self, x1, y1, x2, y2, milliseconds=500, steps=10):
        self.record(u"快速滑动: %s,%s -> %s, %s 时间:%s", x1, y1, x2, y2, milliseconds)
        self.jd.request_action(self.jd.ACTION_AT_DEVICE, "fastDrag", [int(x1), int(y1), int(x2), int(y2), milliseconds, steps])

    def custom_drag(self, x1, y1, x2, y2, sleep_times):
        self.jd.request_action(self.jd.ACTION_AT_DEVICE, "customDrag", [int(x1), int(y1), int(x2), int(y2), json.dumps(sleep_times)])

    def request_method(self, method, params=None):
        return self.jd.request_at_device(method, params)

    def wake_up(self):
        """
        等待一段时间内ui没有变化
        """
        return self.request_method("wakeUp")

    # 处理rect相关的操作
    def screen_rect(self, filename, rect, quality=30):
        d = self.screen_point_data(rect.left, rect.top, rect.width, rect.height, quality)
        open(filename, "wb").write(d)

    def click(self, rect):
        self.click_on_point(rect.center_x, rect.center_y)

    def long_click(self, rect, microseconds=3*1000):
        self.long_click_on_point(rect.center_x, rect.center_y, microseconds)

    def screen_shot(self, filename, scale=1.0, quality=-1, max_idle=200, display_id=None):
        if display_id is None:
            try:
                scale = scale if 0 < scale < 1.0 else 1
                quality = quality if 0 < quality < 100 else 30
                res = self.jd.request_at_device("screen", [float(scale), quality, max_idle])
                if not res:
                    logger.error("uiautomator screen failed: response empty. filename: %s. try reconnect" % filename)
                    self.jd.reconnect()
                    raise RuntimeError("uiautomator screen response empty")
                commonhelper.base64_to_file(res, filename)
                return filename
            except Exception:
                logger.error("uiautomator screen failed")
        self.adb.screen(filename, display_id)
        return filename

    def record(self, msg, *args):
        if self.input_interceptor:
            self.jd.push_op(msg, *args, display=self.input_interceptor.display_id)
        else:
            self.jd.push_op(msg, *args)
