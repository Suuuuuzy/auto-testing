# -*-coding: utf-8 -*-
'''
Author: gavinggu gavinggu@tencent.com
Date: 2023-09-04 14:23:50
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-04-17 20:04:49
FilePath: /py-minium/minium/miniprogram/base_driver/h5_element.py
Description: h5页面元素测试动作
'''

import time
import logging
import json
from ..h5tools.exceptions import *


logger = logging.getLogger("minium")


class H5Element:
    def __init__(self, client, node_id):
        self.client = client
        self.node_id = node_id
        self.logger = logger

    def click(self):
        """
        点击元素
        """
        self._scroll_into_view()

        self._draw_rectangle_box_and_take_screenshot()

        remote_object_id = self.client.send_command('DOM.resolveNode', {'nodeId':
                                                    self.node_id})['result']['object'][
            'objectId']

        click_script = """
                function() {
                    var node = this;
                    while (node && typeof node.click !== 'function') {
                        node = node.parentElement;
                    }
                    if (node) {
                        node.click();
                    } else {
                        throw new Error('No clickable parent element found.');
                    }
                }"""

        self.client.send_command('Runtime.callFunctionOn', {
            'objectId': remote_object_id,
            'functionDeclaration': click_script,
        })

    def tap(self):
        """
        点击只监听touch事件的元素
        """
        self._scroll_into_view()

        self._draw_rectangle_box_and_take_screenshot()

        response = self.client.send_command("DOM.resolveNode", {"nodeId": self.node_id})
        object_id = response["result"]["object"]["objectId"]

        response = self.client.send_command("DOM.getBoxModel", {"objectId": object_id})
        box = response["result"]["model"]["border"]
        x = (box[0] + box[2]) / 2
        y = (box[1] + box[3]) / 2

        self.client.send_command("Input.dispatchTouchEvent", {
            "type": "touchStart",
            "touchPoints": [{"x": x, "y": y}]
        })

        self.client.send_command("Input.dispatchTouchEvent", {
            "type": "touchEnd",
            "touchPoints": []
        })

    def _scroll_into_view(self):
        """
        将元素滚动到可见位置
        """
        backend_node_id = self.client.send_command("DOM.describeNode", {"nodeId": self.node_id})['result']['node'][
            'backendNodeId']
        try:
            self.client.send_command("DOM.scrollIntoViewIfNeeded", {"backendNodeId": backend_node_id})
        except Exception:
            self.logger.info("元素无需滚动")


    @property
    def inner_text(self):
        """
        获取元素文案
        """
        remote_object_id = self.client.send_command('DOM.resolveNode', {'nodeId':
                                                                        self.node_id})['result']['object']['objectId']

        return self.client.send_command('Runtime.callFunctionOn', {
            'objectId': remote_object_id,
            'functionDeclaration': 'function() { return this.innerText; }',
            'returnByValue': True,
        })['result']['result']['value']

    def _get_center_coordinates(self):
        """
        获取元素中心位置
        """
        box_model = self.client.send_command("DOM.getBoxModel", {"nodeId": self.node_id})
        [x1, y1, x2, y2, x3, y3, x4, y4] = box_model['result']["model"]["border"]
        return (x1 + x3) / 2, (y1 + y3) / 2

    def _draw_rectangle_box_and_take_screenshot(self):
        """
        画出元素位置，并截图
        """
        # Highlight the element's rectangle box
        id2 = self.client.send_command('Overlay.highlightNode', {'nodeId': self.node_id, 'highlightConfig': {
            'contentColor': {'r': 255, 'g': 234, 'b': 33, 'a': 0.5}}})

        # Take a screenshot before clicking the element
        # screenshot_data = self.client.send_command('Page.captureScreenshot')['result']['data']
        # with open('screenshot_before_click.png', 'wb') as f:
        #     f.write(base64.b64decode(screenshot_data))

        # Remove the highlight
        self.client.send_command('Overlay.hideHighlight')

    def _node_name(self):
        """
        获取元素的nodename
        :return: 目标的nodename
        """
        result = self.client.send_command("DOM.describeNode",{
            "nodeId": self.node_id
        })
        return result['result']['node']['nodeName'].lower()

    def _focus(self):
        """
        获取元素的nodename
        """
        self.client.send_command("DOM.focus",{
            "nodeId": self.node_id
        })

    def input(
            self,
            text,
            with_confirm=False
    ):
        """
        input & textarea 组件输入文字
        param text:要输入的文字
        param with_confirm：输入完毕后, 是否触发confirm事件
        """
        if self._node_name() not in ['input', 'textarea']:
            raise NotInputElementException(f"元素不是input或textarea类型: {self}")
        self._focus()
        self.client.send_command('Input.insertText', {
            'text': text
        })
        if with_confirm:
            self._focus()
            self.client.send_command('Input.dispatchKeyEvent',{
                "type": "keyDown",
                "modifiers": 0,
                "code": "Enter",
                "key": "Enter",
                "windowsVirtualKeyCode": 13,
                "nativeVirtualKeyCode": 13,
                "autoRepeat": False,
                "isKeypad": False,
                "isSystemKey": False
            })
            self.client.send_command('Input.dispatchKeyEvent',{
                "type": "char",
                "modifiers": 0,
                "text": "\r",
                "unmodifiedText": "\r",
                "code": "Enter",
                "key": "Enter",
                "windowsVirtualKeyCode": 13,
                "nativeVirtualKeyCode": 13,
                "autoRepeat": False,
                "isKeypad": False,
                "isSystemKey": False
            })
            self.client.send_command('Input.dispatchKeyEvent', {
                "type": "keyUp",
                "modifiers": 0,
                "code": "Enter",
                "key": "Enter",
                "windowsVirtualKeyCode": 13,
                "nativeVirtualKeyCode": 13,
                "autoRepeat": False,
                "isKeypad": False,
                "isSystemKey": False
            })

    def input_clear(self):
        """
        清空输入框的文字
        """
        self._focus()
        object_id = self.client.send_command('DOM.resolveNode', {
            'nodeId':self.node_id
        })['result']['object']['objectId']
        self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': 'function() { this.value = ""; }',
        })

    def get_classname(self):
        """
        获取元素的classname
        :return: 目标的className
        '''
        """
        result = self.client.send_command("DOM.getAttributes", {
            "nodeId": self.node_id
        })
        if 'attributes' in result['result'] and 'class' in result['result']['attributes']:
            index = result['result']['attributes'].index('class')
            return result['result']['attributes'][index+1]
        else:
            return ""

    def get_src(self):
        """
        获取 img 元素的src
        :return: 目标的src
        '''
        """
        result = self.client.send_command("DOM.getAttributes", {
            "nodeId": self.node_id
        })
        if self._node_name() not in ['img']:
            raise NotImgElementException(f"元素不是img类型: {self}")
        if 'attributes' in result['result'] and 'src' in result['result']['attributes']:
            index = result['result']['attributes'].index('src')
            return result['result']['attributes'][index+1]
        else:
            return ""

    def attribute(self, name=None):
        """
        获取元素属性
        :param name: 属性名称, 类型支持str|list
        :return: 属性值, str|list
        """
        if name is None:
            return None
        if isinstance(name, str):
            value = self.client.send_command("DOM.getAttributes", {
                "nodeId": self.node_id,
            })
            try:
                index = value["result"]["attributes"].index(name)
                return value["result"]["attributes"][index+1]
            except (ValueError, IndexError):
                return None
        elif isinstance(name, list):
            if "" in name:
                raise InvalidArgumentException(f"属性名不能为空")
            result = []
            for attr in name:
                value = self.client.send_command("DOM.getAttributes", {
                    "nodeId": self.node_id,
                })
                try:
                    index = value["result"]["attributes"].index(attr)
                    result.append(value["result"]["attributes"][index + 1])
                except (ValueError, IndexError):
                    return None
            return result
        else:
            raise InvalidArgumentException(f"参数非法")

    def long_press(self, duration=350):
        """
        长按元素
        :param duration: 时长，ms
        :return:
        """
        self._scroll_into_view()
        x, y = self._get_center_coordinates()
        self.client.send_command("Input.dispatchMouseEvent", {
            "type": "mousePressed",
            "x": x,
            "y": y,
            "button": "left",
            "clickCount": 1,
        })
        time.sleep(duration / 1000)
        self.client.send_command("Input.dispatchMouseEvent", {
            "type": "mouseReleased",
            "x": x,
            "y": y,
            "button": "left",
            "clickCount": 1,
        })

    def styles(self, names=None):
        """
        获取元素的样式属性
        :param name: 需要获取的 style 属性, 类型支持str|list
        :return: style 属性, str|list
        """
        object_id = self.client.send_command('DOM.resolveNode', {
            'nodeId': self.node_id
        })['result']['object']['objectId']
        function_declaration = 'function() { return JSON.stringify(window.getComputedStyle(this)); }'
        response = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': function_declaration,
            'returnByValue': True
        })
        style = json.loads(response["result"]["result"]["value"])
        if names is None:
            return None
        if isinstance(names, str):
            try:
                return style[names]
            except (ValueError, IndexError):
                return None
        elif isinstance(names, list):
            if "" in names:
                raise InvalidArgumentException(f"属性名不能为空")
            result = []
            for attr in names:
                try:
                    result.append(style[attr])
                except (ValueError, IndexError):
                    return None
            return result
        else:
            raise InvalidArgumentException(f"参数非法")

    def scroll_to(self, top, left):
        """
        元素滚动
        :param top: x 轴上滚动的距离
        :param left: y 轴上滚动的距离
        :return:
        """
        object_id = self.client.send_command('DOM.resolveNode', {
            'nodeId': self.node_id
        })['result']['object']['objectId']
        function_declaration = f'function() {{ this.scrollLeft += {top}; this.scrollTop += {left}; }}'
        result = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': function_declaration,
            'returnByValue': True
        })

    def _dispatch_touch_event(self, event_type, touches, changed_touches):
        """
        触发触摸事件
        """
        touch_event = {
            "type": event_type,
            "touchPoints": [
                {
                    "identifier": touch["identifier"],
                    "x": touch["pageX"],
                    "y": touch["pageY"],
                }
                for touch in changed_touches
            ],
        }
        self.client.send_command("Input.dispatchTouchEvent", touch_event)

    def touch_start(self, touches, changed_touches):
        """
        触发元素的 touchstart 事件
        :param touches
        :param changed_touches
        :return:
        """
        self._dispatch_touch_event("touchStart", touches, changed_touches)

    def touch_move(self, touches, changed_touches):
        """
        触发元素的 touchmove 事件
        :param touches
        :param changed_touches
        :return:
        """
        self._dispatch_touch_event("touchMove", touches, changed_touches)

    def touch_end(self, changed_touches):
        """
        触发元素的 touchend 事件
        :param changed_touches
        :return:
        """
        self._dispatch_touch_event("touchEnd", [], changed_touches)

    def move(self, x_offset, y_offset, move_delay=350, smooth=False):
        """
        移动元素（触发元素的 touchstart、touchmove、touchend 事件）
        :param x_offset: x 方向上的偏移，往右为正数，往左为负数
        :param y_offset: y 方向上的偏移，往下为正数，往上为负数
        :param move_delay: 	移动前摇，ms
        :param smooth: 平滑移动
        :return:
        """
        box_model = self.client.send_command("DOM.getBoxModel", {"nodeId": self.node_id})
        x1, y1, _, _, x2, y2, _, _ = box_model["result"]["model"]["border"]
        width, height = x2 - x1, y2 - y1
        size = {"width": width, "height": height}
        offset = {"left": x1, "top": y1}

        scroll_x = self.client.send_command("Runtime.evaluate", {"expression": "window.scrollX"})
        scroll_y = self.client.send_command("Runtime.evaluate", {"expression": "window.scrollY"})
        page_offset = {
            "x": scroll_x["result"]["result"]["value"],
            "y": scroll_y["result"]["result"]["value"],
        }

        ori_touch = {
            "identifier": 0,
            "pageX": offset["left"] + size["width"] // 2,
            "pageY": offset["top"] + size["height"] // 2,
            "clientX": offset["left"] + size["width"] // 2 - page_offset["x"],
            "clientY": offset["top"] + size["height"] // 2 - page_offset["y"],
        }

        self.touch_start(touches=[ori_touch], changed_touches=[ori_touch])

        if smooth and (x_offset or y_offset):
            time.sleep(move_delay / 4000)
            temp_x_offset = temp_y_offset = 0
            max_offset = max(abs(x_offset), abs(y_offset))
            step = (move_delay / 2000) / max_offset

            while abs(temp_x_offset) <= abs(x_offset) or abs(temp_y_offset) <= abs(y_offset):
                if temp_x_offset != x_offset and x_offset != 0:
                    temp_x_offset = (temp_x_offset + 1) if x_offset > 0 else (temp_x_offset - 1)

                if temp_y_offset != y_offset and y_offset != 0:
                    temp_y_offset = (temp_y_offset + 1) if y_offset > 0 else (temp_y_offset - 1)

                touch = {
                    "identifier": 0,
                    "pageX": offset["left"] + size["width"] // 2 + temp_x_offset,
                    "pageY": offset["top"] + size["height"] // 2 + temp_y_offset,
                    "clientX": offset["left"] + size["width"] // 2 - page_offset["x"] + temp_x_offset,
                    "clientY": offset["top"] + size["height"] // 2 - page_offset["y"] + temp_y_offset,
                }

                self.touch_move(touches=[ori_touch], changed_touches=[touch])

                if temp_x_offset == x_offset and temp_y_offset == y_offset:
                    break

                time.sleep(step)

            time.sleep(move_delay / 4000)
        else:
            time.sleep(move_delay / 2000)
            touch = {
                "identifier": 0,
                "pageX": offset["left"] + size["width"] // 2 + x_offset,
                "pageY": offset["top"] + size["height"] // 2 + y_offset,
                "clientX": offset["left"] + size["width"] // 2 - page_offset["x"] + x_offset,
                "clientY": offset["top"] + size["height"] // 2 - page_offset["y"] + y_offset,
            }

            self.touch_move(touches=[ori_touch], changed_touches=[touch])
            time.sleep(move_delay / 2000)

        self.touch_end(changed_touches=[touch])

    def _call_video_method(self, method_name, *args):
        """
        调用video相关方法
        """
        object_id = self.client.send_command('DOM.resolveNode', {
            'nodeId': self.node_id
        })['result']['object']['objectId']

        is_video_element = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': 'function() { return this.nodeName.toLowerCase() === "video"; }',
            'returnByValue': True
        })

        if not is_video_element['result']['result']['value']:
            raise NotVideoElementException(f"非video元素")
        if method_name == "set_current_time":
            function_declaration = f'function() {{ this.currentTime = {args[0]}; }}'
        else:
            function_declaration = f'function() {{ this.{method_name}(); }}'

        result = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': function_declaration,
            'returnByValue': True
        })
        return result

    def play(self):
        """
        播放视频
        """
        self._call_video_method('play')

    def pause(self):
        """
        暂停视频
        """
        self._call_video_method('pause')

    def seek(self, position):
        """
        跳转到指定位置
        :param position: 跳转到的位置，单位 s
        :return:
        """
        self._call_video_method("set_current_time", position)

    def stop(self):
        """
        停止视频
        """
        self.pause()
        self._call_video_method("set_current_time", "0")

    def set_attribute(self, attribute_name, attribute_value):
        """
        更改元素的attribute取值
        :param attribute_name: attribute名称
        :param attribute_value: attribute内容
        """
        self.client.send_command("DOM.setAttributesAsText", {
            "nodeId": self.node_id,
            "text": f'{attribute_name}="{attribute_value}"'
        })

    @property
    def top(self):
        """
        获取元素顶部相对于视图窗口顶部的top值
        """
        object_id = self.client.send_command('DOM.resolveNode', {'nodeId': self.node_id})['result']['object'][
            'objectId']
        top = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': 'function() { return this.getBoundingClientRect().top; }',
            'returnByValue': True,
        })['result']['result']['value']
        return top

    @property
    def left(self):
        """
        获取元素左侧相对于视图窗口左侧的left值
        """
        object_id = self.client.send_command('DOM.resolveNode', {'nodeId': self.node_id})['result']['object'][
            'objectId']
        left = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': 'function() { return this.getBoundingClientRect().left; }',
            'returnByValue': True,
        })['result']['result']['value']
        return left

    @property
    def bottom(self):
        """
        获取元素底部相对于视图窗口顶部的bottom值
        """
        object_id = self.client.send_command('DOM.resolveNode', {'nodeId': self.node_id})['result']['object'][
            'objectId']
        bottom = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': 'function() { return this.getBoundingClientRect().bottom; }',
            'returnByValue': True,
        })['result']['result']['value']
        return bottom

    @property
    def right(self):
        """
        获取元素右侧相对于视图窗口左侧的right值
        """
        object_id = self.client.send_command('DOM.resolveNode', {'nodeId': self.node_id})['result']['object'][
            'objectId']
        right = self.client.send_command('Runtime.callFunctionOn', {
            'objectId': object_id,
            'functionDeclaration': 'function() { return this.getBoundingClientRect().right; }',
            'returnByValue': True,
        })['result']['result']['value']
        return right