# -*-coding: utf-8 -*-
'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-04-03 11:32:50
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-04-17 20:05:46
FilePath: /py-minium/minium/miniprogram/base_driver/page/h5page.py
Description: h5页面实例
'''

import logging
import re
import time
import platform
import subprocess
import requests
import json
import socket
import threading
from .page import Page
from websockets.sync.client import connect
from ...h5tools.h5PageOperator import H5PageOperator
from ...h5tools.utils import timer, print_caller_info_decorator
from ...h5tools.client import Sock, AndroidClient
from ...h5tools.exceptions import NoSuchElementException
from ..h5_element import H5Element


logger = logging.getLogger("minium")

_ADB_GET_TOP_ACTIVITY_CMD = {
    "Darwin": "adb shell dumpsys activity top | grep ACTIVITY | grep appbrand",  # Mac os 下查找字符串是grep
    "Linux": "adb shell dumpsys activity top | grep ACTIVITY | grep appbrand",  # Mac os 下查找字符串是grep
    "Windows": "adb shell dumpsys activity top | findstr ACTIVITY | findstr appbrand"  # windows 下查找字符串是findstr
}

class H5Config(dict):
    platform: str = ""
    appid: str = ""
    device: dict = {}  # https://minitest.weixin.qq.com/#/minium/Python/framework/config?id=device_desire%e9%85%8d%e7%bd%ae%e9%a1%b9

    def __init__(self, **kwargs):
        for k in kwargs:
            setattr(self, k, kwargs[k])
        super().__init__(self.__dict__)


class H5Page(Page):
    """h5页面实例, 实例中的`property`和`method`会替换掉.page.Page实例中的方法

    :param _type_ object: _description_
    """

    DEBUGGER_URL_MAP = {}  # page id -> debugger url. 废弃缓存, 一个pageid有可能对应多个的debugger url, 缓存会使得url无法更新

    def __init__(self, page_id, path, query, renderer="webview", debugger_url=None, config: H5Config=None, *args, app = None):
        super().__init__(page_id, path, query, renderer, *args, app=app)
        self.driver = AndroidClient(config)
        if debugger_url is None:
            try:
                debugger_url = H5Page.get_websocket_debugger_url(config)
            except:
                pages = self.driver.driver.get_pages()
                debugger_url = pages[0].webSocketDebuggerUrl
        self._is_webview = True
        self.sock = Sock(debugger_url)
        # self.client = CDPClient(debugger_url)
        # self.client.connect()

        self.client = self.driver.inspect(debugger_url, [
            "DOM.enable",
            'Runtime.enable',
            'Page.enable',
            'Overlay.enable',
        ])
        self._pageOperator = H5PageOperator()

    def __del__(self):
        type(HandlerDebugUrl())._debug_url = None

    @classmethod
    def get_websocket_debugger_url(cls, config: H5Config=None):
        debug_url = HandlerDebugUrl(config.device["serial"]).get_websocket_debug_url()
        return debug_url

    def wait(self, seconds=1):
        time.sleep(seconds)

    def get_document(self):
        """
        获得getHtml中需要的nodeId
        在调用getHtml之前必须先调用这个方法
        """
        send = json.loads(self._pageOperator.getDocument())
        return self.sock.sync_request_cdp(send)

    def get_html(
            self,
            nodeId=1
    ):
        """
        获得指定nodeId的Html代码。在一条websocket连接中，方法只能够执行一次。
        :param nodeId: getDocument方法返回的nodeId，当为1时，返回整个body的代码
        """
        self.logger.info('')
        send = json.loads(self._pageOperator.getHtml(nodeId))
        return self.sock.sync_request_cdp(send)['result']['outerHTML']

    def element_is_exists(
        self,
        selector: str = None,
        max_timeout: int = 10,
        inner_text=None,
        text_contains=None,
        value=None,
        xpath: str = None,
        **kwargs
    ) -> bool:
        """
        1、H5页面支持selector、xpath、文案定位；方法从小程序方法继承过来，保留inner_text,text_contains、value、xpath等参数
        2、未兼容H5自动化一期方法，如使用一期方法，需传入old=True参数，一期方法只支持xpath定位
        :param selector: H5页面元素selector
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param xpath: XPATH
        :param max_timeout: 超时时间
        :return:element 对象
        """
        if kwargs.get('old'):
            self.logger.info('xpath ---> ' + xpath)
            get_exist_cdp = json.loads(self._pageOperator.isElementExist(xpath))
            result_cdp = self.sock.sync_request_cdp(get_exist_cdp)
            result_type = result_cdp['result']['result']['subtype']
            num = 0
            while result_type == 'null' and num < 3:
                self.wait(2)
                get_exist_cdp = json.loads(self._pageOperator.isElementExist(xpath))
                result_cdp = self.sock.sync_request_cdp(get_exist_cdp)
                result_type = result_cdp['result']['result']['subtype']
                num = num + 1
            return result_type != 'null'
        else:
            try:
                if selector:
                    return self.wait_for(selector, max_timeout)
                elif xpath:
                    return self.wait_for(xpath, max_timeout)
                elif inner_text:
                    return self.wait_for(inner_text, max_timeout)
                elif text_contains:
                    return self.wait_for(text_contains, max_timeout)
                elif value:
                    return self.wait_for(value, max_timeout)
            except NoSuchElementException:
                return False

    def scroll_window(
            self,
            x,
            y,
            xDistance,
            yDistance,
            speed=800
    ):
        """
        通过坐标来滑动（屏幕的左上角为(0,0),向下和向右坐标逐渐增大）
        :param x: 滑动的起始X点坐标
        :param y: 滑动的起始Y点坐标
        :param xDistance: X方向滑动的距离
        :param yDistance: Y方向滑动的距离
        :param speed: 滑动的速度
        """
        send = json.loads(self._pageOperator.scrollWindow(x, y, xDistance, yDistance, speed))
        return self.sock.sync_request_cdp(send)

    def get_element_text_by_xpath(
            self,
            xpath: str
    ):
        '''
        :param xpath: 目标的xpath
        :return: 获取到的目标text内容
        '''
        self.logger.info('xpath ---> ' + xpath)
        if self.element_is_exists(xpath=xpath, old=True):
            get_text_cdp = json.loads(self._pageOperator.getElementTextByXpath(xpath))
            result_cdp = self.sock.sync_request_cdp(get_text_cdp)
            result_value = result_cdp['result']['result']['value']
        else:
            result_value = None
        return result_value

    def get_element_src_by_xpath(
            self,
            xpath: str
    ):
        """
        :param xpath: 目标的xpath
        :return: 获取到img目标的src内容
        """
        self.logger.info('xpath ---> ' + xpath)
        if self.element_is_exists(xpath=xpath, old=True):
            get_src_cdp = json.loads(self._pageOperator.getElementSrcByXpath(xpath))
            result_cdp = self.sock.sync_request_cdp(get_src_cdp)
            result_value = result_cdp['result']['result']['value']
        else:
            result_value = None
        return result_value

    def get_element_classname_by_xpath(
            self,
            xpath: str
    ):
        '''
        :param xpath:目标的xpath
        :return: 目标的className
        '''
        self.logger.info('xpath ---> ' + xpath)
        if self.element_is_exists(xpath=xpath, old=True):
            get_classname_cdp = json.loads(self._pageOperator.getElementClassNameByXpath(xpath))
            result_cdp = self.sock.sync_request_cdp(get_classname_cdp)
            result_value = result_cdp['result']['result']['value']
        else:
            result_value = None
        return result_value

    def get_relative_direction_value(
            self,
            directionKey='topp',
            contextId=None
    ):
        '''
        获取相关的方向数据参数值
        :param directionKey: 获取的方向
        :return:
        '''
        direction_cdp = json.loads(self._pageOperator.getJSValue(directionKey, contextId))
        result_cdp = self.sock.sync_request_cdp(direction_cdp)
        result_value = result_cdp['result']['result']['value']
        return result_value

    def get_window_height(self):
        '''
        :return:手机屏幕的高度
        '''
        get_window_height_cdp = json.loads(self._pageOperator.getWindowHeight())
        result_cdp = self.sock.sync_request_cdp(get_window_height_cdp)
        result_value = result_cdp['result']['result']['value']
        return result_value

    def get_window_width(self):
        '''
        :return:手机屏幕的宽度
        '''
        get_window_width_cdp = json.loads(self._pageOperator.getWindowWidth())
        result_cdp = self.sock.sync_request_cdp(get_window_width_cdp)
        result_value = result_cdp['result']['result']['value']
        return result_value

    def scroll_to_element_by_xpath(
            self,
            xpath: str,
            visibleItemXpath=None,
            speed=400
    ):
        """
        滑动屏幕，使指定xpath的控件可见
        默认滑动点为屏幕的中心，且边距为整个屏幕。当有container时，传入container中任意一个当前可见item的xpath，之后会将目标滑到该可见item的位置
        :param xpath: 要滑动到屏幕中控件的xpath
        :param visibleItemXpath: container中当前可见的一个xpath
        """
        self.logger.info('xpath ---> ' + xpath)
        send = json.loads(self._pageOperator.getElementRect(xpath))
        self.sock.sync_request_cdp(send)
        top = self.get_relative_direction_value("topp")
        bottom = self.get_relative_direction_value("bottom")
        left = self.get_relative_direction_value("left")
        right = self.get_relative_direction_value("right")

        if visibleItemXpath is None:
            endTop = 0
            endLeft = 0
            endBottom = self.get_window_height()
            endRight = self.get_window_width()
        else:
            container_cdp = json.loads(self._pageOperator.getElementRect(visibleItemXpath))
            self.sock.async_request_cdp(container_cdp)

            endTop = self.get_relative_direction_value("topp")
            endBottom = self.get_relative_direction_value("bottom")
            endLeft = self.get_relative_direction_value("left")
            endRight = self.get_relative_direction_value("right")

        '''
        竖直方向的滑动
        '''
        if bottom > endBottom:
            scrollYDistance = endBottom - bottom
        elif top < 0:
            scrollYDistance = -(top - endTop)
        else:
            scrollYDistance = 0

        if scrollYDistance < 0:
            self.scroll_window(int((endLeft + endRight) / 2), int((endTop + endBottom) / 2), 0, scrollYDistance - 80,
                               speed)
        elif scrollYDistance > 0:
            self.scroll_window(int((endLeft + endRight) / 2), int((endTop + endBottom) / 2), 0, scrollYDistance + 80,
                               speed)
        else:
            self.logger.debug('y方向不需要滑动')

        '''
        水平方向的滑动
        '''
        if right > endRight:
            scrollXDistance = endRight - right
        elif left < 0:
            scrollXDistance = -(left - endLeft)
        else:
            scrollXDistance = 0

        if scrollXDistance != 0:
            self.scroll_window(int((endLeft + endRight) / 2), int((endTop + endBottom) / 2), scrollXDistance, 0,
                               speed)
        else:
            self.logger.debug('x方向不需要滑动')

    @timer(10, 2)
    def click_element_by_xpath(
            self,
            xpath: str
    ):
        """
        :xpath: 元素xpath
        """
        self.logger.info('xpath ---> ' + xpath)
        # 防止websocket未失效但页面已经开始跳转
        # self.wait(2)
        if self.element_is_exists(xpath=xpath, old=True):
            self.logger.info('判断元素已经存在')
            self.scroll_to_element_by_xpath(xpath)
            sendStr = json.loads(self._pageOperator.getElementAndClick(xpath))
            return self.sock.sync_request_cdp(sendStr)
        else:
            raise RuntimeError("元素不存在")

    def focus_element_by_xpath(
            self,
            xpath: str
    ):
        """
        调用目标的focus()方法。
        :param xpath:目标的xpath
        """
        execute_cdp = json.loads(self._pageOperator.focusElementByXpath(xpath))
        self.sock.async_request_cdp(execute_cdp)

    def text_element_by_xpath(
            self,
            xpath: str,
            text: str
    ):
        """
        先获取输入框的焦点, 再使用Chrome debug协议的输入api,再输入文字内容
        :param xpath:输入框的xpath
        :parm text:要输入的文字
        """
        self.logger.info('xpath ---> ' + xpath + ' text ---> ' + text)
        self.focus_element_by_xpath(xpath)
        sendStrList = self._pageOperator.textElementByXpath(text)

        for command in sendStrList:
            self.sock.async_request_cdp(json.loads(command))

    def clear_input_text_by_xpath(
            self,
            xpath: str
    ):
        '''
        清空输入框的文字
        :param xpath:input框的xpath
        '''
        self.logger.info('xpath ---> ' + xpath)
        clear_input_text_cdp = json.loads(self._pageOperator.clearInputTextByXpath(xpath))
        self.sock.async_request_cdp(clear_input_text_cdp)

    @timer(10, 2)
    def click_first_element_by_text(
            self,
            text: str,
    ):
        """
        通过text来搜索，点击第一个text相符合的控件。
        """
        xpath = "//*[contains(text(), \"" + text + "\")]"
        self.click_element_by_xpath(xpath)

    @property
    def title(self):
        result = self.client.send_command("Runtime.evaluate", {
            "expression": "document.title"
        })
        return result['result']['result']['value']

    @property
    def page_url(self):
        self.client.send_command("DOM.enable")

        response = self.client.send_command("DOM.getDocument")
        root_node_id = response["result"]["root"]["nodeId"]

        response = self.client.send_command("DOM.describeNode", {"nodeId": root_node_id})
        node = response["result"]["node"]

        if node["nodeName"] == "#document":
            url = node["documentURL"]
            return url
        else:
            raise Exception("Could not find the main frame's Document node.")

    def go_back(self):
        """
        返回上一页
        """
        self.client.send_command("Page.enable")
        self.client.send_command("Page.navigate", {
            "url": "javascript:window.history.back()"
        })

    @timer(10, 2)
    def get_element(
        self,
        picker: str,
        *args
    ):
        """
        :param  picker: 支持xpath, selector, 文案定位
        """
        self.client.send_command("DOM.getDocument")
        if isinstance(picker, str) or (len(args) < 2 and isinstance(args, str)):
            picker = picker if picker else args
            result = self.client.send_command("DOM.performSearch", {"query": picker})
            search_id, count = result['result']["searchId"], result['result']["resultCount"]
        else:
            raise ValueError("Invalid arguments")

        if count == 0:
            raise Exception(f"No element found for xpath: {picker}")

        node_ids = self.client.send_command("DOM.getSearchResults", {
            "searchId": search_id,
            "fromIndex": 0,
            "toIndex": count,
        })['result']['nodeIds']

        if len(node_ids) == 1:
            return H5Element(self.client, node_ids[0])

        node_id = None
        for nid in node_ids:
            object_id = self.client.send_command('DOM.resolveNode', {'nodeId': nid})['result']['object']['objectId']
            response = self.client.send_command("DOM.describeNode", {"objectId": object_id})
            if "node" in response["result"] and response["result"]["node"]["nodeType"] == 1:
                node_id = nid
                break

        if not node_id:
            raise NoSuchElementException(picker)

        return H5Element(self.client, node_id)

    @timer(10, 2)
    def get_elements(
            self,
            picker: str,
            *args
    ):
        """
        :param  picker: 支持xpath, selector, 文案定位
        :return: List
        """
        self.client.send_command("DOM.getDocument")

        if isinstance(picker, str) or (len(args) < 2 and isinstance(args, str)):
            picker = picker if picker else args
            result = self.client.send_command("DOM.performSearch", {"query": picker})
            search_id, count = result['result']["searchId"], result['result']["resultCount"]
        else:
            raise ValueError("Invalid arguments")

        if count == 0:
            raise Exception(f"No element found for xpath: {picker}")

        node_ids = self.client.send_command("DOM.getSearchResults", {
            "searchId": search_id,
            "fromIndex": 0,
            "toIndex": count,
        })['result']['nodeIds']
        return [H5Element(self.client, node_id) for node_id in node_ids]

    def scroll_to(self, scroll_top, duration=1):
        """
        滚动到指定位置
        :param scroll_top:  位置 px
        :param duration:  滚动时长为秒
        :return:
        """
        steps = 10
        delta_y_per_step = scroll_top / steps
        sleep_time = duration / steps
        for _ in range(steps):
            self.client.send_command("Input.dispatchMouseEvent", {
                    "type": "mouseWheel",
                    "x": 0,
                    "y": 0,
                    "deltaX": 0,
                    "deltaY": delta_y_per_step,
                })
            time.sleep(sleep_time)

    def wait_for(self, condition=None, max_timeout=15):
        """
        :param condition： 可为等待时间、元素选择器、可执行函数，当为元素选择器时，支持文案、selector、xpath
        :param max_timeout： 元素等待时间
        :return boolean
        """

        s_time = time.time()
        if isinstance(condition, int):
            time.sleep(condition)
            self.logger.debug("waitFor: %s s" % (time.time() - s_time))
            return True
        elif isinstance(condition, str):
            while (time.time() - s_time) < max_timeout:
                result = self.client.send_command(
                    "DOM.performSearch",
                    {"query": condition}
                )
                search_id, count = result['result']["searchId"], result['result']["resultCount"]

                if count >= 1:
                    return True
                time.sleep(1)
            raise NoSuchElementException(f"没有找到指定元素: {condition}")
        elif hasattr(condition, "__call__"):
            while (time.time() - s_time) < max_timeout:
                res = condition()
                if res:
                    return True
                else:
                    time.sleep(0.25)
            return False


    @property
    def scroll_y(self):
        """
        获取窗口顶点与页面顶点的 y 轴偏移量
        :return:
        """
        self.client.send_command("Runtime.enable")
        response = self.client.send_command("Runtime.evaluate", {
            "expression": "window.scrollY"
        })

        scroll_y = response["result"]["result"]["value"]
        return scroll_y

    @property
    def scroll_x(self):
        """
        获取窗口顶点与页面顶点的 x 轴偏移量
        :return:
        """
        self.client.send_command("Runtime.enable")
        response = self.client.send_command("Runtime.evaluate", {
            "expression": "window.scrollX"
        })

        scroll_x = response["result"]["result"]["value"]
        return scroll_x

    @property
    def scroll_height(self):
        """
        get scroll height
        :return:
        """
        self.client.send_command("Runtime.enable")
        response = self.client.send_command("Runtime.evaluate", {
            "expression": "document.documentElement.scrollHeight"
        })

        scroll_height = response["result"]["result"]["value"]
        return scroll_height

    @property
    def scroll_width(self):
        """
        get scroll width
        :return:
        """
        self.client.send_command("Runtime.enable")
        response = self.client.send_command("Runtime.evaluate", {
            "expression": "document.documentElement.scrollWidth"
        })

        scroll_width = response["result"]["result"]["value"]
        return scroll_width


class HandlerDebugUrl(object):
    """
    获取小程序内嵌H5 websocket debug url
    :parms 当多台手机连接到PC时，需要传入deviceId，指定手机
    """
    _instance = None
    _debug_url = None
    _lock = threading.Lock()
    _res_len = 3  # 小程序内嵌H5， adb端口映射后的json，长度至少是3

    def __new__(cls, deviceId=None):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(HandlerDebugUrl, cls).__new__(cls)
        return cls._instance

    def __init__(self, deviceId=None):
        self.logger = logger
        self._device = deviceId
        self._local_url = None

    def _update_debug_url(self):
        try:
            type(self)._debug_url = self._fetch_web_socket_debug_url()
        except TimeoutError as e:
            self.logger.debug(f"获取websocket debug url 超时 {e}")
        except Exception as e:
            self.logger.debug(f"获取websocket debug url 时发生异常 {e}")

    # @print_caller_info_decorator
    def get_websocket_debug_url(self):
        """
        获取小程序内嵌h5 websocket debug url
        """
        response = self._fetch_inner()
        response_len = len(response)
        if not type(self)._debug_url or response_len <= type(self)._res_len:
            self._update_debug_url()
        elif response_len > type(self)._res_len:
            type(self)._res_len = response_len
            tmp = type(self)._debug_url.split('/')[-1]
            start = time.time()

            while tmp == type(self)._debug_url.split('/')[-1] and (time.time() - start < 15):
                time.sleep(3)
                self._update_debug_url()
        return type(self)._debug_url

    def _fetch_inner(self):
        """
        获取小程序内嵌h5页面信息
        """
        # 先获取微信appbrand进程Pid
        pid = self._fetch_weixin_tools_process_pid(self._device)
        # 重定向端口
        self.logger.debug("HandlerDebugUrl.self._local_url是{}".format(self._local_url))
        if not self._local_url:
            port = self._get_free_port()
            # port = 8099
            self._forward_local_port(port, pid, self._device)
            self._local_url = "http://localhost:%s/json" % port
        try:
            response = requests.get(self._local_url)
        except:
            self.logger.info(f"请求{self._local_url}失败， 3秒后重试")
            time.sleep(3)
            response = requests.get(self._local_url)
        return json.loads(response.content)

    def _fetch_weixin_tools_process_pid(self, device):
        """
        获取微信小程序H5进程号
        """
        os_name = platform.system()
        cmd = _ADB_GET_TOP_ACTIVITY_CMD[os_name]
        try:
            stdout, std_error = self._run_command(self._specify_device_on_cmd(cmd, device))
            str_list = stdout.split('pid=')
            pid = re.split("\s", str_list[1])[0]
            return pid
        except RuntimeError as e:
            self.logger.error(f"获取内嵌H5进程号失败，请检查设备是否在线: {e}")
            return None

    def _run_command(self, cmd, printDetails=False, cwd=None):
        """
        通过终端执行命令方法
        """
        try:
            result = subprocess.run(cmd, shell=True, cwd=cwd,
                                    capture_output=True, text=True, check=True)
            if printDetails:
                self.logger.info(f"run_command--->{result.stdout}")
            return result.stdout, result.stderr
        except subprocess.CalledProcessError as e:
            raise RuntimeError(f"{cmd}, {e}") from e

    def _specify_device_on_cmd(self, cmd, device):
        """
        指定机器执行adb命令
        """
        return cmd if device is None else cmd.replace("adb", "adb -s %s" % device)

    @timer(10, 2)
    def _fetch_web_socket_debug_url(self):
        """
        获取小程序内嵌h5 websocket debug url
        """
        response = self._fetch_inner()
        if not response:
            raise ValueError("Response from _fetch_inner is empty.")
        patten = re.compile(r'https?://\S+')
        urls = set()
        debug_url = None
        for item in response:
            if patten.search(item['url']) and item['webSocketDebuggerUrl'] not in urls:
                urls.add(item['webSocketDebuggerUrl'])
                debug_url = item['webSocketDebuggerUrl']
                break
        if not debug_url:
            raise ValueError("No websocket debug URLs found in response.")
        return debug_url

    def _forward_local_port(self, local_port, pid, device):
        cmd = "adb forward tcp:%s localabstract:webview_devtools_remote_%s" % (local_port, pid)
        self._run_command(self._specify_device_on_cmd(cmd, device))

    def _get_free_port(self):
        """
        获取PC未占用端口
        """
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('localhost', 0))
            return s.getsockname()[1]
        


