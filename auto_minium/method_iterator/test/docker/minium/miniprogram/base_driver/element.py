#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author: lockerzhang
@LastEditors: lockerzhang
@Description: 元素相关的操作和信息获取
@Date: 2019-03-11 14:42:10
@LastEditTime: 2019-06-06 15:13:32
"""
from __future__ import annotations
import typing
from typing import Union
from ...framework.exception import MiniElementNotFoundError, MiniTimeoutCauseByConnectionBreakError
from .minium_object import MiniumObject, RetryableApi
from ...utils.utils import timeout
from ...utils.emitter import ee
import time
from .prefixer import *
from .connection import Command
from .selector import Selector
from ...framework.exception import MiniCommandError
if typing.TYPE_CHECKING:
    from .page import Page


class Element:
    tagName: str
    elementId: str
    nodeId: typing.Optional[str]


class Rect(dict):
    key_map = {
        "x": "left",
        "y": "top",
        "w": "width",
        "h": "height",
    }

    def __getattr__(self, name):
        name = Rect.key_map.get(name, name)
        return self[name]

    def __getitem__(self, name):
        name = Rect.key_map.get(name, name)
        return super(Rect, self).__getitem__(name)


DEFAULT_ENV = {}

class BaseElement(MiniumObject, metaclass=RetryableApi):
    """
    元素基类
    """
    __RETRY_EXCEPTION__ = (MiniTimeoutCauseByConnectionBreakError,)  # 小程序掉线Element实例可能就没用了
    __RETRY_API__ = [
        "data",
        # "size",
        "offset",
        # "rect",
        # "page_scroll_x",
        # "page_scroll_y",
        # "page_offset",
        # "value",
        # "inner_text",
        "inner_wxml",
        "outer_text",
        "styles",
        "attribute",
        "scroll_to",
        # private
        "_property",  # 属性相关
        "_dom_property",  # dom属性相关
        "_get_window_properties",  # window属性相关
        "__get_elements",  # get element相关都经过该接口
    ]

    def __init__(self, element: Element, page_id: str, connection, selector: Selector=None, env: dict=DEFAULT_ENV):
        """
        初始化
        """
        super().__init__()
        self.selector = selector
        self.env = env
        self.parent_node_id = None  # 自定义组件中的自元素需要记录一下其父元素的node id
        self.element_id = element.elementId
        self.page_id = page_id
        self._tag_name = element.tagName
        self.connection = connection

    def __str__(self) -> str:
        return "%(class)s[%(eid)s][%(tag)s]" % {
            "class": self.__class__.__name__,
            "eid": self.element_id,
            "tag": self._tag_name,
        }

    def __getattribute__(self, item):
        # element 的魔法糖，获取标签上{name}属性
        try:
            return super(BaseElement, self).__getattribute__(item)
        except AttributeError:
            if not item.startswith("__"):
                prop = self._property(item)[0]
                if prop is not None:
                    return prop
                attr = self.attribute(item)[0]
                if attr is not None:
                    return attr
            raise

    @property
    def data(self):
        """
        自定义组件子类来实现
        :param data:
        :return:
        """
        return

    @data.setter
    def data(self, data):
        """
        自定义组件子类来实现
        :param data:
        :return:
        """
        pass

    @property
    def size(self):
        """
        get element size
        :return: {"width", "height"}
        """
        size_arr = self._dom_property(["offsetWidth", "offsetHeight"])
        return Rect({"width": size_arr[0], "height": size_arr[1]})

    @property
    def offset(self):
        """
        get element offset,
        :return: {"left","top"}
        """
        rtn = self._send("Element.getOffset")
        return Rect(rtn.result)

    @property
    def rect(self):
        """
        get element Rect
        :return: {"left","top","width", "height"}
        """
        rect = self.offset
        rect.update(self.size)
        return rect

    @property
    def clientRect(self):
        """
        get element Rect: 相对客户端的坐标
        :return: {"left","top","width", "height"}
        """
        rect = self.offset
        scrollX, scrollY = self._get_window_properties(["scrollX", "scrollY"])
        rect["left"] -= scrollX
        rect["top"] -= scrollY
        rect.update(self.size)
        return rect

    @property
    def page_scroll_x(self):
        """
        获取窗口顶点与页面顶点的 x 轴偏移量
        :return:
        """
        return self._get_window_properties(["scrollX"])[0]

    @property
    def page_scroll_y(self):
        """
        获取窗口顶点与页面顶点的 y 轴偏移量
        :return:
        """
        return self._get_window_properties(["scrollY"])[0]

    @property
    def page_offset(self):
        """
        获取页面的偏移坐标
        """
        ret = self._get_window_properties(["scrollX", "scrollY"])
        return Rect({"left": ret[0], "top": ret[1]})

    @property
    def value(self):
        """
        get element vaule
        :return:
        """
        return self._property("value")[0]

    @property
    def inner_text(self):
        """
        get element text
        :return:
        """
        return self._dom_property("innerText")[0]

    text = inner_text

    @property
    def inner_wxml(self):
        """
        get wxml for element
        :return:
        """
        return self._send("Element.getWXML", {"type": "inner"}).result.wxml

    @property
    def outer_wxml(self):
        """
        get wxml for element self
        :return:
        """
        return self._send("Element.getWXML", {"type": "outer"}).result.wxml

    def styles(self, names):
        """
        get element styles
        :param names:
        :return:
        """
        return self._getter("getStyles", "styles", names)

    def call_method(self, method: str, *params):
        """
        子类来实现
        """
        pass

    def call_func(self, func: str, args=None):
        """
        在 WebView 中执行 JS 脚本，同时会传入 dom 元素
        :param func: 方法名
        :param args: 参数
        :return:
        """
        if not args:
            args = []
        return self._send(
            "Element.callFunction", {"functionName": func, "args": args}
        ).result

    def tap(self, *args, **kwargs):
        """
        点击
        :return: NULL
        """
        self._send("Element.tap")
        ee.emit("notify")

    def click(self, *args, **kwargs):
        """
        点击, 同 tap
        :return: NULL
        """
        styles = self.styles("pointer-events")
        if styles and styles[0] == "none":
            self.logger.warning("can't click, because pointer-events is none")
            return
        self.tap()
        time.sleep(1)

    def move(self, x_offset, y_offset, move_delay=350, smooth=False):
        """
        移动 element
        :param x_offset: x 方向上的偏移，往右为正数，往左为负数
        :param y_offset: y 方向上的偏移，往下为正数，往上为负数
        :param move_delay: 移动延时 (ms)
        :param smooth: 是否平滑移动
        :return:
        """
        self._move(
            x_offset=x_offset, y_offset=y_offset, move_delay=move_delay, smooth=smooth
        )

    def long_press(self, duration=350):
        """
        长按
        :param duration: 时长 (ms)
        :return: NULL
        """
        offset = self.offset
        size = self.size
        page_offset = self.page_offset
        ori_changed_touch = ori_touch = {
            "identifier": 0,
            "pageX": offset["left"] + size["width"] // 2,
            "pageY": offset["top"] + size["height"] // 2,
            "clientX": offset["left"] + size["width"] // 2 - page_offset.x,
            "clientY": offset["top"] + size["height"] // 2 - page_offset.y,
        }
        self._touch_start(touches=[ori_touch], changed_touches=[ori_changed_touch])
        time.sleep(duration / 1000)
        self._touch_end(changed_touches=[ori_changed_touch])
        ee.emit("notify")

    def touch_start(self, touches: list, changed_touches: list):
        """
        touch start
        :param touches:
        :param changed_touches:
        :return:
        """
        self._touch_start(touches=touches, changed_touches=changed_touches)

    def touch_end(self, changed_touches: list):
        """
        touch end
        :param changed_touches:
        :return:
        """
        self._touch_end(changed_touches=changed_touches)

    def touch_move(self, touches: list, changed_touches: list):
        """
        touch move
        :param touches:
        :param changed_touches:
        :return:
        """
        self._touch_move(touches=touches, changed_touches=changed_touches)

    def touch_cancel(self):
        """
        touch cancel
        :return: NULL
        """
        self._send("Element.touchcancel")

    def slide(self, direction, distance):
        """
        拖动
        :param direction:方向
        :param distance:距离
        :return:NULL
        """
        raise NotImplementedError()

    def _get_selector(self, selector, inner_text=None, value=None, text_contains=None, index=-1) -> Selector:
        if isinstance(selector, Selector):
            _selector = selector
        else:
            _selector = Selector(css=selector, text=inner_text, contains_text=text_contains, val=value, index=index)
        return _selector

    def get_element(
        self, selector, inner_text=None, value=None, text_contains=None, max_timeout=0
    ):
        """
        find elements in current page
        目前支持的选择器有：

        选择器	              样例	                      样例描述
        .class	             .intro	                    选择所有拥有 class="intro" 的组件
        #id	                 #firstname	                选择拥有 id="firstname" 的组件
        tagname	             view	                    选择所有    view 组件
        tagname, tagname	 view, checkbox	            选择所有文档的 view 组件和所有的 checkbox 组件
        ::after	             view::after	            在 view 组件后边插入内容
        ::before	         view::before	            在 view 组件前边插入内容

        :param selector: 选择器
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param max_timeout: 超时时间
        :return:element 对象
        """
        _selector = self._get_selector(
            selector,
            inner_text=inner_text,
            value=value,
            text_contains=text_contains,
            index=0,
        )
        r = self.get_elements(
            _selector,
            max_timeout,
        )
        if not r:
            raise MiniElementNotFoundError(_selector)
        return r[0]

    def get_elements(
        self,
        selector,
        max_timeout=0,
        inner_text=None,
        text_contains=None,
        value=None,
        index=-1,
    ) -> typing.List[ElementType]:  # type: ignore # noqa: F811
        """
        find elements in current page
        目前支持的选择器有：

        选择器	              样例	                      样例描述
        .class	             .intro	                    选择所有拥有 class="intro" 的组件
        #id	                 #firstname	                选择拥有 id="firstname" 的组件
        tagname	             view	                    选择所有    view 组件
        tagname, tagname	 view, checkbox	            选择所有文档的 view 组件和所有的 checkbox 组件
        ::after	             view::after	            在 view 组件后边插入内容
        ::before	         view::before	            在 view 组件前边插入内容

        :param selector: 选择器
        :param max_timeout: 超时时间
        :return:element 对象 list
        """
        _selector = self._get_selector(selector, inner_text, value, text_contains, index)
        if not _selector.need_filter:
            return self._get_elements_by_css(_selector, max_timeout)

        @timeout(max_timeout)
        def filter_elements():
            # 需要过滤内容，有返回元素不是终结条件, 需要获取所有元素后再作过滤
            new_selector = Selector(_selector)
            new_selector.index = -1
            elements = self._get_elements_by_css(new_selector, max_timeout)
            els = []
            for element in elements:
                if _selector.text and element.inner_text != _selector.text:
                    continue
                if _selector.val and element.value() != _selector.val:
                    continue
                if _selector.contains_text and _selector.contains_text not in element.inner_text:
                    continue
                # element.selector.text = inner_text
                # element.selector.contains_text = text_contains
                # element.selector.val = value
                els.append(element)
                if len(els) == (_selector.index + 1):
                    return els
            return els

        return filter_elements()

    def __get_elements(self, selector: typing.Union[str, Selector], index=-1):
        if not isinstance(selector, Selector):
            selector = Selector(css=selector, index=index)
        elements = []
        ret = self._send("Element.getElements", {"selector": selector.css})
        selector.parent = self.selector
        for el in ret.result.elements:
            elements.append(create(el, self.page_id, self.connection, selector))
            if len(elements) == (selector.index + 1):  # index==-1时，不会match，就会全部返回
                return elements
        return elements

    def __search_child(
        self, selector_list: list, parent: ElementType = None, index=-1  # type: ignore # noqa: F811
    ) -> typing.List[ElementType]:
        # index == -1: get所有, index >=0: get index+1个
        if len(selector_list) == 0:
            return []
        _selector = selector_list.pop()
        should_be_custom_element = bool(
            len(selector_list)
        )  # 出了最后一层selector，都需要是自定义组件，不然不能往下走
        if parent:
            els = parent.get_elements(
                _selector, max_timeout=0
            )  # 调用element.get_elements方法，要求立刻返回，不然会影响效率
        else:
            els = self.__get_elements(_selector)
            # 给每个element继承自定义组件的node id
            parent_node_id = getattr(self, "node_id", self.parent_node_id)
            if parent_node_id:
                for _el in els:
                    _el.parent_node_id = parent_node_id
        if len(els) == 0:
            return []
        real_els = []
        for _el in els:
            if should_be_custom_element and isinstance(_el, CustomElement):
                real_els.append(_el)
            elif not should_be_custom_element:
                real_els.append(_el)
            else:
                self.logger.warn("%s should be a custom element" % _selector)
        if not real_els or len(selector_list) == 0:  # 找不到 或 没有子选择器了
            return real_els
        child_els = []
        for _el in real_els:
            child_el = self.__search_child(
                selector_list[0:], _el
            )  # selector_list[0:]相当于copy
            child_els += child_el
            if len(child_els) == (index + 1):
                return child_els
        return child_els

    def _get_elements_by_css(self, selector: typing.Union[str, Selector], max_timeout=0, index=-1) -> typing.List[ElementType]:
        """
        1. 现存自定义组件中的class会自动加前缀，但不包括slot占位的元素
        2. slot元素的class命名规则
        2.1 <page><test><view class="这个class不会加前缀"></view></test></page>
        2.2 <custom><test><view class="这个class会加上custom组件对应的前缀"></view></test></custom>
        3. 自定义组件中通过id获取元素失败
        """
        if isinstance(selector, Selector):
            _selector = selector
        else:
            _selector = Selector(css=selector, index=index)
        @timeout(max_timeout)
        def search_elements(_selectors: Union[list, tuple]):
            return self.__search_child(_selectors[0:], index=_selector.index)

        css = _selector.full_selector()
        self.logger.info("try to get elements: %s" % css)
        _selector_list = css.split(">>>")
        _selector_list.reverse()  # 新增处理【>>>】穿透自定义组件逻辑
        els = search_elements(_selector_list)
        if len(els) == 0:
            self.logger.warning(f"Could not found any element '{css}' you need")
        else:
            self.logger.info("find elements success: %s" % str(els))
        return els

    def attribute(self, name):
        """
        获取元素属性
        :return: attribute
        """
        return self._getter("getAttributes", "attributes", name)

    def trigger(self, trigger_type, detail):
        """
        just a trigger
        :param trigger_type:
        :param detail:
        :return:
        """
        return self._trigger(trigger_type, detail)

    def trigger_events(self, events):
        """触发DOM事件序列, 录制回放用
        touch事件可以只提供type, interval参数

        :param [{type, interval?, touches?, changedTouches?, detail?}...] events: 事件列表
        """
        for event in events:
            interval = event.get("interval", 0)
            if event["type"] == "touchstart":
                self._touch_start(event["touches"], event["changedTouches"])
            elif event["type"] == "touchmove":
                self._touch_move(event["touches"], event["changedTouches"])
            elif event["type"] == "touchend":
                self._touch_end(event["changedTouches"])
            else:
                self.trigger(event["type"], event["detail"])
            time.sleep(interval)

    def dispatch_event(
        self,
        event_name,
        selector=None,
        touches=None,
        change_touches=None,
        detail=None,
        **kwargs,
    ):
        params = {"eventName": event_name, "eventData": {}}
        if selector:
            params["$"] = selector
        if touches:
            params["eventData"]["touches"] = touches
        if change_touches:
            params["eventData"]["changeTouches"] = change_touches
        if detail:
            params["eventData"]["detail"] = detail
        if kwargs:
            params["eventData"].update(kwargs)
        return self._send("Element.dispatchEvent", params)

    def scroll_to(self, top, left):
        return self.dispatch_event(
            "scroll", scrollDetail={"scrollTop": top, "scrollLeft": left}
        )

    # private method

    def _property(self, name):
        """
        get property
        :param name:
        :return:
        """
        return self._getter("getProperties", "properties", name)

    def _dom_property(self, name):
        """
        get property from dom
        :param name:
        :return:
        """
        return self._getter("getDOMProperties", "properties", name)

    def _get_window_properties(self, names=None):
        """
        获取 window 对象的属性值。
        :param names:
        :return:
        """
        if names is None:
            names = []
        return self._send(
            "Page.getWindowProperties", {"names": names}
        ).result.properties

    def _trigger(self, trigger_type, detail):
        params = dict()
        params["type"] = trigger_type
        if detail:
            params["detail"] = detail
        return self._send("Element.triggerEvent", params)

    def _getter(self, method, return_name, names=""):
        if isinstance(names, list):
            result = self._send("Element." + method, {"names": names})
        elif isinstance(names, str):
            result = self._send("Element." + method, {"names": [names]})
        else:
            raise Exception("invalid names type")
        ret = getattr(result.result, return_name)
        return ret

    def _send(self, method, params=None, extra_time=0):
        if params is None:
            params = {}
        params["elementId"] = self.element_id
        params["pageId"] = self.page_id

        return self.connection.send(method, params, max_timeout=Command.max_timeout+extra_time)

    def _move(self, x_offset, y_offset, move_delay=350, smooth=False):
        offset = self.offset
        size = self.size
        page_offset = self.page_offset
        ori_changed_touch = ori_touch = {
            "identifier": 0,
            "pageX": offset["left"] + size["width"] // 2,
            "pageY": offset["top"] + size["height"] // 2,
            "clientX": offset["left"] + size["width"] // 2 - page_offset.x,
            "clientY": offset["top"] + size["height"] // 2 - page_offset.y,
        }
        self._touch_start(touches=[ori_touch], changed_touches=[ori_changed_touch])
        # time.sleep(move_delay / 1000)
        if smooth and (x_offset or y_offset):  # offset不能都为0
            time.sleep(move_delay / 4000)
            temp_x_offset = temp_y_offset = 0
            max_offset = max(abs(x_offset), abs(y_offset))
            step = (move_delay / 2000) / max_offset
            while abs(temp_x_offset) <= abs(x_offset) or abs(temp_y_offset) <= abs(
                y_offset
            ):
                if temp_x_offset == x_offset:
                    pass
                elif not x_offset == 0:
                    temp_x_offset = (
                        (temp_x_offset + 1) if x_offset > 0 else (temp_x_offset - 1)
                    )
                if temp_y_offset == y_offset:
                    pass
                elif not y_offset == 0:
                    temp_y_offset = (
                        (temp_y_offset + 1) if y_offset > 0 else (temp_y_offset - 1)
                    )

                changed_touch = touch = {
                    "identifier": 0,
                    "pageX": offset["left"] + size["width"] // 2 + temp_x_offset,
                    "pageY": offset["top"] + size["height"] // 2 + temp_y_offset,
                    "clientX": offset["left"]
                    + size["width"] // 2
                    - page_offset.x
                    + temp_x_offset,
                    "clientY": offset["top"]
                    + size["height"] // 2
                    - page_offset.y
                    + temp_y_offset,
                }
                self._touch_move(touches=[touch], changed_touches=[changed_touch])
                if temp_x_offset == x_offset and temp_y_offset == y_offset:
                    break
                time.sleep(step)
            time.sleep(move_delay / 4000)
        else:
            time.sleep(move_delay / 2000)
            changed_touch = touch = {
                "identifier": 0,
                "pageX": offset["left"] + size["width"] // 2 + x_offset,
                "pageY": offset["top"] + size["height"] // 2 + y_offset,
                "clientX": offset["left"]
                + size["width"] // 2
                - page_offset.x
                + x_offset,
                "clientY": offset["top"]
                + size["height"] // 2
                - page_offset.y
                + y_offset,
            }
            self._touch_move(touches=[touch], changed_touches=[changed_touch])
            time.sleep(move_delay / 2000)
        # time.sleep(move_delay / 1000)
        self._touch_end(changed_touches=[changed_touch])

    def _touch_start(self, touches: list, changed_touches: list):
        self._send(
            "Element.touchstart",
            params={"touches": touches, "changedTouches": changed_touches},
        )

    def _touch_move(self, touches: list, changed_touches: list):
        self._send(
            "Element.touchmove",
            params={"touches": touches, "changedTouches": changed_touches},
        )

    def _touch_end(self, changed_touches: list):
        touches = []
        self._send(
            "Element.touchend",
            params={"touches": touches, "changedTouches": changed_touches},
        )

    # def _get_elements(self, selector, max_timeout=0, index=-1):
    #     @timeout(max_timeout)
    #     def search_elements(_selector):
    #         elements = []
    #         ret = self._send("Element.getElements", {"selector": _selector})
    #         if hasattr(ret, "error"):
    #             raise Exception(
    #                 "Error when finding elements[%s], %s" % (_selector, ret.error)
    #             )
    #         for el in ret.result.elements:
    #             elements.append(create(el, self.page_id, self.connection))
    #         return elements

    #     def search_child(
    #         selector_list: list, parent: BaseElement = None
    #     ):  # index == -1: get所有, index >=0: get index+1个
    #         if len(selector_list) == 0:
    #             return
    #         _selector = selector_list.pop()
    #         should_be_custom_element = bool(
    #             len(selector_list)
    #         )  # 出了最后一层selector，都需要是自定义组件，不然不能往下走
    #         if parent:
    #             els = parent.get_elements(_selector)
    #         else:
    #             els = search_elements(_selector)
    #         if len(els) == 0:
    #             return []
    #         real_els = []
    #         for _el in els:
    #             if should_be_custom_element and isinstance(_el, CustomElement):
    #                 real_els.append(_el)
    #             elif not should_be_custom_element:
    #                 real_els.append(_el)
    #             else:
    #                 self.logger.warn("%s should be a custom element" % _selector)
    #         if not real_els or len(selector_list) == 0:  # 找不到 或 没有子选择器了
    #             return real_els
    #         child_els = []
    #         for _el in real_els:
    #             child_el = search_child(selector_list[0:], _el)
    #             child_els += child_el
    #             if index == -1:
    #                 continue
    #             elif len(child_els) > index:
    #                 return child_els
    #         return child_els

    #     try:
    #         self.logger.info("try to find elements: %s" % selector)
    #         _selector_list = selector.split(">>>")
    #         if len(_selector_list) > 1:  # 新增处理【>>>】穿透自定义组件逻辑
    #             _selector_list.reverse()
    #             els = search_child(_selector_list)
    #         else:
    #             els = search_elements(selector)
    #         if len(els) == 0:
    #             self.logger.warning(
    #                 f"Could not found any element '{selector}' you need"
    #             )
    #         else:
    #             self.logger.info("find elements success: %s" % str(els))
    #         return els
    #     except Exception as e:
    #         raise Exception("elements search fail cause: " + str(e))


class FormElement(BaseElement):
    """
    表单类型元素
    """

    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(FormElement, self).__init__(element, page_id, connection)

    #####################
    #       input       #
    #####################
    def input(self, text: str, with_confirm=False):
        """
        input 标签输入文本
        :param text: 输入的文本
        :param with_confirm: 输入后触发confirm
        :return:
        """
        if self._tag_name != "input" and self._tag_name != "textarea":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        # 3.3.4重构了 input, 导致 textarea.input 失败
        if self._tag_name == "textarea" and self.env.get("sdk_version") and self.env.get("sdk_version") > "3.3.3":
            self.logger.warning(
                f'sdk version {self.env.get("sdk_version")} may not support textarea.input, please use lower sdk version'
            )
            # return
        func = "{x}.input".format(x=self._tag_name)
        value = text.strip()
        if text.endswith("\n"):  # 换行符结尾认为是confirm
            with_confirm = True
        less_then_3_3_0 = self.env.get("sdk_version") and self.env.get("sdk_version") < "3.3.0"
        try:
            # v3.3.0 后直接支持with_confirm
            self.call_func(func, args=[value, with_confirm])
        except MiniCommandError as ce:
            if str(ce) == "e.stopPropagation is not a function":  # 基础库(v3.3.4)引入的报错, ide 环境下兼容一下
                if with_confirm:
                    self.trigger("confirm", {"value": value})
                self.trigger("blur", {"value": value, "cursor": len(value)})
                return
            raise
        if with_confirm and less_then_3_3_0:
            # 需要显式触发一个
            self.trigger("confirm", {"value": value})
        if less_then_3_3_0:
            self.trigger("blur", {"value": value, "cursor": len(value)})
        # self.trigger("input", {"value": text})

    #####################
    #       picker      #
    #####################
    def pick(self, value):
        """
        处理 picker 组件
        picker 的类型:{
            selector: 普通选择器 => value(int) 表示选择了 range 中的第几个 (下标从 0 开始) ,
            multiSelector: 多列选择器 => value(int) 表示选择了 range 中的第几个 (下标从 0 开始)  ,
            time: 时间选择器 => value(str) 表示选中的时间，格式为"hh:mm"
            date: 日期选择器 => value(str) 表示选中的日期，格式为"YYYY-MM-DD"
            region: 省市区选择器 => value(int) 表示选中的省市区，默认选中每一列的第一个值
            }
        :param value: 需要选择的选项
        :return:
        """
        if self._tag_name != "picker":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        self.trigger("change", {"value": value})
        return
    
    def tap(self, force=False, **kwargs):
        """input/picker点击事件会触发拉起键盘/选择器

        :param bool force: 组件绑定了bindtap事件, 一定需要触发tap操作, defaults to False
        :return None: 
        """
        if self._tag_name in ("picker", "input") and not force:
            return
        return super().tap(**kwargs)

    def click(self, force=False):
        if self._tag_name in ("picker", "input") and not force:
            return
        return super(FormElement, self).click()

    #####################
    #       switch      #
    #####################
    def switch(self):
        """
        点击改变 switch 的状态
        :return:
        """
        if self._tag_name != "switch":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "switch.tap"
        self.call_func(func, args=[])

    #####################
    #       slider      #
    #####################
    def slide_to(self, value):
        """
        slider 组件滑动到指定数值
        :return:
        """
        if self._tag_name != "slider":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "slider.slideTo"
        self.call_func(func, args=[value])


class ViewElement(BaseElement):
    """
    视图类型元素
    """

    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(ViewElement, self).__init__(element, page_id, connection)

    #####################
    #   scroll-view     #
    #####################
    def scroll_to(self, x=0, y=0):
        """
        scroll-view 滚动指定距离
        :param x: x 轴上的距离
        :param y: y 轴上的距离
        :return:
        """
        if self._tag_name != "scroll-view":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "scroll-view.scrollTo"
        self.call_func(func, args=[x, y])

    @property
    def scroll_left(self):
        """
        scroll-view scrollLeft
        :return:
        """
        if self._tag_name != "scroll-view":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "scroll-view.scrollLeft"
        return self.call_func(func)

    @property
    def scroll_top(self):
        """
        scroll-view scrollTop
        :return:
        """
        if self._tag_name != "scroll-view":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "scroll-view.scrollTop"
        return self.call_func(func)

    @property
    def scroll_width(self):
        """
        scroll-view scrollWidth
        :return:
        """
        if self._tag_name != "scroll-view":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "scroll-view.scrollWidth"
        self.call_func(func)

    @property
    def scroll_height(self):
        """
        scroll-view 滚动指定距离
        :return:
        """
        if self._tag_name != "scroll-view":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "scroll-view.scrollHeight"
        self.call_func(func)

    #####################
    #       swiper      #
    #####################
    def swipe_to(self, index):
        """
        切换滑块视图容器当前的页面
        :param index:
        :return:
        """
        if self._tag_name != "swiper":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "swiper.swipeTo"
        self.call_func(func, args=[index])
        self._trigger("animationfinish", {"current": index, "currentItemId": "", "source": "touch"})

    def trigger(self, trigger_type, detail):
        if trigger_type == "animationfinish":  # swiper会自动触发
            return
        return super().trigger(trigger_type, detail)

    ########################
    #       movable-view   #
    ########################
    def move_to(self, x, y):
        """
        可移动的视图容器拖拽滑动
        :param x: x轴方向的偏移
        :param y: y轴方向的偏移
        :return:
        """
        if self._tag_name != "movable-view":
            self.logger.warning(
                "Element's type is not fit for the method which you call"
            )
            return
        func = "movable-view.moveTo"
        self.call_func(func, args=[x, y])


class VideoElement(BaseElement):
    """
    视频播放类型元素
    """

    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(VideoElement, self).__init__(element, page_id, connection)
        self.video_id = element.get("videoId", None)
        self.media_type = MediaType.VIDEO

    def _call_context_method(self, method: str, args: list = None):
        if not args:
            args = []
        params = {"videoId": self.video_id, "method": method, "args": args}
        if self.parent_node_id:
            params["nodeId"] = self.parent_node_id
        return self._send("Element.callContextMethod", params=params)

    def play(self):
        """
        播放视频
        :return:
        """
        # self.controller.play()
        self._call_context_method(method="play")

    def pause(self):
        """
        暂停视频
        :return:
        """
        # self.controller.pause()
        self._call_context_method(method="pause")

    def stop(self):
        """
        停止视频
        :return:
        """
        # self.controller.stop()
        self._call_context_method(method="stop")

    def seek(self, position: int):
        """
        跳转到指定位置
        :param position: 跳转到的位置，单位 s
        :return:
        """
        # self.controller.seek(position)
        self._call_context_method(method="seek", args=[position])

    def send_danmu(self, text: str, color="#ff0000"):
        """
        发送弹幕
        :param text: 弹幕文字
        :param color: 弹幕颜色
        :return:
        """
        # self.controller.send_danmu(text, color)
        self._call_context_method(
            method="sendDanmu", args=[{"text": text, "color": color}]
        )

    def playback_rate(self, rate: float):
        """
        设置倍速播放
        :param rate: 倍率，支持 0.5/0.8/1.0/1.25/1.5，2.6.3 起支持 2.0 倍速
        :return:
        """
        # self.controller.playback_rate(rate)
        self._call_context_method(method="playbackRate", args=[rate])

    def request_full_screen(self, direction=0):
        """
        全屏
        :param direction: 设置全屏时视频的方向，不指定则根据宽高比自动判断
        0	正常竖向
        90	屏幕逆时针90度
        -90	屏幕顺时针90度
        :return: status
        """
        # self.controller.request_full_screen(direction)
        self._call_context_method(
            method="requestFullScreen", args=[{"direction": direction}]
        )

    def exit_full_screen(self):
        """
        退出全屏
        :return:
        """
        # self.controller.exit_full_screen()
        self._call_context_method(method="exitFullScreen")

    def show_status_bar(self):
        """
        显示状态栏，仅在iOS全屏下有效
        :return:
        """
        # self.controller.show_status_bar()
        self._call_context_method(method="showStatusBar")

    def hide_status_bar(self):
        """
        隐藏状态栏，仅在iOS全屏下有效
        :return:
        """
        # self.controller.hide_status_bar()
        self._call_context_method(method="hideStatusBar")


class AudioElement(BaseElement):
    """
    音频播放类型元素
    """

    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(AudioElement, self).__init__(element, page_id, connection)
        self.controller = AudioController(self)
        self.media_type = MediaType.AUDIO

    def set_src(self, src):
        """
        设置音频地址
        :param src: 音频地址
        :return:
        """
        self.controller.setSrc(src)

    def play(self):
        """
        播放音频
        :return:
        """
        self.controller.play()

    def pause(self):
        """
        暂停音频
        :return:
        """
        self.controller.pause()

    def seek(self, position):
        """
        跳转到指定位置
        :param position: 时间，单位：s
        :return:
        """
        self.controller.seek(position)


class LivePlayerElement(BaseElement):
    """
    直播播放类型元素
    """

    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(LivePlayerElement, self).__init__(element, page_id, connection)
        self.controller = LivePlayerController(self)
        self.media_type = MediaType.LIVE_PLAY

    def play(self):
        """
        播放
        :return:
        """
        self.controller.play()

    def stop(self):
        """
        停止
        :return:
        """
        self.controller.stop()

    def mute(self):
        """
        静音
        :return:
        """
        self.controller.mute()

    def pause(self):
        """
        暂停
        :return:
        """
        self.controller.pause()

    def resume(self):
        """
        恢复
        :return:
        """
        self.controller.resume()

    def request_full_screen(self, direction=0):
        """
        全屏
        :param direction: 方向
        0	正常竖向
        90	屏幕逆时针90度
        -90	屏幕顺时针90度
        :return: status
        """
        self.controller.requestFullScreen(direction)

    def exit_full_screen(self):
        """
        退出全屏
        :return:
        """
        self.controller.exitFullScreen()

    def snapshot(self):
        """
        截屏
        :return:
        """
        self.controller.snapshot()

    def request_picture_in_picture(self):
        """
        画中画，2.15.0后支持
        :return:
        """
        self.controller.requestPictureInPicture()

    def exit_picture_in_picture(self):
        """
        退出画中画
        :return:
        """
        self.controller.exitPictureInPicture()


class LivePusherElement(BaseElement):
    """
    直播推流类型元素
    """

    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(LivePusherElement, self).__init__(element, page_id, connection)
        self.controller = LivePusherController(self)
        self.media_type = MediaType.LIVE_PUSH

    def start(self):
        """
        开始推流，同时开启摄像头预览
        :return:
        """
        self.controller.start()

    def stop(self):
        """
        停止推流，同时停止摄像头预览
        :return:
        """
        self.controller.stop()

    def pause(self):
        """
        暂停推流
        :return:
        """
        self.controller.pause()

    def resume(self):
        """
        恢复推流
        :return:
        """
        self.controller.resume()

    def switch_camera(self):
        """
        切换前后摄像头
        :return:
        """
        self.controller.switchCamera()

    def snapshot(self):
        """
        截屏
        :return:
        """
        self.controller.snapshot()

    def toggle_torch(self):
        """
        切换手电筒
        :return:
        """
        self.controller.toggleTorch()

    def play_bgm(self, url):
        """
        播放背景音
        :param url: 背景音链接
        :return:
        """
        self.controller.playBGM({"url": url})

    def stop_bgm(self):
        """
        停止背景音
        :return:
        """
        self.controller.stopBGM()

    def pause_bgm(self):
        """
        暂停背景音
        :return:
        """
        self.controller.pauseBGM()

    def resume_bgm(self):
        """
        恢复背景音
        :return:
        """
        self.controller.resumeBGM()

    def set_bgm_volume(self, volume):
        """
        设置背景音音量
        :param volume: 音量大小，范围是 0-1
        :return:
        """
        self.controller.setBGMVolume({"volume": volume})

    def set_mic_volume(self, volume):
        """
        设置麦克风音量
        :param volume: 音量大小，范围是 0-1
        :return:
        """
        self.controller.setMICVolume({"volume": volume})

    def start_preview(self):
        """
        开启摄像头预览
        :return:
        """
        self.controller.startPreview()

    def stop_preview(self):
        """
        关闭摄像头预览
        :return:
        """
        self.controller.stopPreview()

    def send_message(self, msg):
        self.controller.sendMessage({"msg": msg})


class CustomElement(BaseElement):
    def __init__(self, element, page_id, connection):
        """
        初始化
        """
        super(CustomElement, self).__init__(element, page_id, connection)
        self.node_id = element.get("nodeId", None)

    def _send(self, method, params=None):
        if params is None:
            params = {}
        params["elementId"] = self.element_id
        params["pageId"] = self.page_id
        params["nodeId"] = self.node_id
        return self.connection.send(method, params)

    @property
    def data(self):
        return self._send("Element.getData").result.data

    @data.setter
    def data(self, data):
        """
        设置页面 data
        :param data:
        :return:
        """
        self._send("Element.setData", {"data": data})

    def call_method(self, method: str, *params):
        """
        调用自定义组件实例方法
        :param method:
        :param params:
        :return:
        """
        if not params:
            params = []
        return self._send("Element.callMethod", {"method": method, "args": params})


class MediaController(object):
    """
    媒体类型元素控制
    1. 使用 `wx.createXXXContext` 接口创建 context （还有一种是通过 wx.createSelectorQuery().select("#ID").context获取）
    2. 以"{pageId}_{elementId}"为key记录context
    3. hook page.onUnload, 页面销毁时需要清除
    4. 通过evaluate调用context的方法
    TODO: plugin中不支持evaluate
    """

    create_context_method = ""  # `wx.createXXXContext` 中的 `createXXXContext`
    allow_method = ()  # controller支持的方法与context上的一致

    def __init__(self, element: BaseElement):
        """
        初始化
        """
        self.element = element
        self.element_id = element.attribute("id")[0]
        # if not self.create_context_method:
        #     raise Exception("%s.create_context_method will not be empty" % self.__class__.__name__)
        self.create_context()

    def create_context(self):
        # 以"{pageId}_{elementId}"为key创建context, elementId是标签上的ID
        # hook page.onUnload, 页面销毁时需要清除
        self.element._evaluate_js(
            "createContext",
            [self.element_id, self.element.page_id],
            code_format_info={"createMediaContext": self.create_context_method},
        )

    def _call_context_method(self, method: str, args: list = None):
        if not args:
            args = []
        if not isinstance(args, list):
            args = [args]
        return self.element._evaluate_js(
            "callContextMethod",
            [self.element_id, self.element.page_id, method, args],
            code_format_info={"createMediaContext": self.create_context_method},
            desc="evaluate %s.%s" % (self.create_context_method[6:], method),
        )

    # 透传context的方法
    def __getattribute__(self, name: str) -> typing.Any:
        try:
            return super().__getattribute__(name)
        except AttributeError:
            if name in self.allow_method:
                return lambda *args, **kwargs: self._call_context_method(
                    name, *args, **kwargs
                )
            raise


class AudioController(MediaController):
    """
    音频播放控制
    """

    create_context_method = "createAudioContext"
    allow_method = (
        "setSrc",
        "play",
        "pause",
        "seek",
    )


class LivePlayerController(MediaController):
    """
    直播播放控制
    """

    create_context_method = (
        "createLivePlayerContext"  # `wx.createXXXContext` 中的 `createXXXContext`
    )
    allow_method = (
        "play",
        "stop",
        "mute",
        "pause",
        "requestFullScreen",
        "exitFullScreen",
        "requestPictureInPicture",
        "exitPictureInPicture",
        "resume",
        "snapshot",
    )


class LivePusherController(MediaController):
    """
    直播播放/推流控制
    """

    create_context_method = (
        "createLivePusherContext"  # `wx.createXXXContext` 中的 `createXXXContext`
    )
    allow_method = (
        "pause",
        "pauseBGM",
        "playBGM",
        "resume",
        "resumeBGM",
        "sendMessage",
        "setBGMVolume",
        "setMICVolume",
        "snapshot",
        "start",
        "startPreview",
        "stop",
        "stopBGM",
        "stopPreview",
        "switchCamera",
        "toggleTorch",
    )


ELEMENT_TYPE: typing.Dict[str, 'ElementType'] = {
    "video": VideoElement,
    "audio": AudioElement,
    "live-player": LivePlayerElement,
    "live-pusher": LivePusherElement,
    "scroll-view": ViewElement,
    "swiper": ViewElement,
    "movable-view": ViewElement,
    "input": FormElement,
    "textarea": FormElement,
    "switch": FormElement,
    "slider": FormElement,
    "picker": FormElement,
}


ElementType = typing.Union[
    BaseElement,
    CustomElement,
    VideoElement,
    AudioElement,
    ViewElement,
    FormElement,
    LivePlayerElement,
    LivePusherElement,
]


def create(element: Element, page_id: str, connection, selector, page: Page=None) -> ElementType:
    if page and page.app:
        env = {
            "sdk_version": page.app.extra_info.get("sdk_version")
        }
    else:
        env = {}
    if "nodeId" in element.keys():
        el = CustomElement(element, page_id, connection)
        el.selector = Selector(selector)
        el.env = env
        el.selector.node_id = el.node_id
    else:
        el = ELEMENT_TYPE.get(element.tagName, BaseElement)(
            element, page_id, connection
        )
        el.selector = selector
        el.env = env
    return el
