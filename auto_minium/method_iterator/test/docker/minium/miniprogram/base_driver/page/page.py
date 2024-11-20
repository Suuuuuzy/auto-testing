#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author: lockerzhang
@LastEditors: lockerzhang
@Description: 小程序页面
@Date: 2019-03-11 14:42:29
@LastEditTime: 2019-06-05 17:04:02
"""
from __future__ import annotations
import re
from functools import wraps
from typing import *
from typing_extensions import *
import xml.dom.minidom
from ....framework.exception import MiniElementNotFoundError, MiniAppError, MiniTimeoutCauseByConnectionBreakError, MiniLowVersionSdkError, PageDestroyed
import typing
import types
from ..element import *
from ..selector import Selector
from ..minium_object import MiniumObject, RetryableApi
# from .h5page import H5Page, H5Config
from ....utils.utils import timeout, lazy_import
from ....utils.emitter import ee
from ..connection import C
import json
from ..minium_log import report_exception, ExceptionData, report_usage
from ....framework.findwxml import search, get_element_full_xpath
if typing.TYPE_CHECKING:
    from ..app import App
MAX_WXML_SIZE = 204800 # 200KB

# 需要在setup中加上cssselect库
# from cssselect.xpath import HTMLTranslator
# from cssselect.parser import SelectorError

# translator = HTMLTranslator()
 

class Page(MiniumObject, metaclass=RetryableApi):
    """
    页面相关接口
    """
    __RETRY_EXCEPTION__ = (MiniTimeoutCauseByConnectionBreakError,)  # 小程序掉线Page实例可能就没用了
    __RETRY_API__ = [
        "data",
        "inner_size",
        "scroll_height",
        "scroll_width",
        "scroll_x",
        "scroll_y",
        "scroll_to",
        "_get_window_properties",
        # "element_is_exists",
        # "get_element",
        # "get_elements",
        # "_element_is_exists",
        # "get_elements_by_xpath",
        # "get_element_by_xpath",
        # element 相关底层方法
        "__get_elements",
        "_get_element",
        "_get_element_by_xpath",
        "_get_elements_by_xpath",
    ]

    PLUGIN_PATH_REG = r"^(plugin://|plugin-private://|/?__plugin__/)(\w+)/"
    FUNCTIONAL_PATH_REG = r"^__wx__\/"
    WEB_VIEW_MAP = {}  # page path -> is webview page or not 
    NAVIGATION_STYLE_MAP = {}  # page path -> navigation style

    def __init__(self, page_id, path, query, renderer=None, *args, app: App=None):
        """
        初始化页面
        """
        super().__init__()
        self.page_id = page_id
        self.is_functional = True if re.search(Page.FUNCTIONAL_PATH_REG, path) else False
        # 处理下path，普通page以"/"开头，插件以"plugin://" 或 "plugin-private://" 或 "__plugin__" 开头
        self.plugin_appid = None
        match = re.search(Page.PLUGIN_PATH_REG, path)
        if match:
            self.plugin_appid = match.group(2)
        elif not path.startswith("/"):
            path = "/" + path
        self.path = path
        self.query = query
        self.renderer = renderer or "webview"
        self.app = app
        if app:
            self.connection = app.connection
        self.cmd_ids = set()  # 存储等待回复的 cmd ids
        self._is_webview = False if (self.is_functional or self.plugin_appid) else Page.WEB_VIEW_MAP.get(path, None)  # None: 未知，true: 是，false: 否
        self._navigation_style = None

    def __del__(self):
        self.connection = None
        self.app = None

    def __repr__(self):
        return "Page(id={0}, path={1}, query={2})".format(
            self.page_id, self.path, self.query
        )

    def __eq__(self, page: Union[Self, str]):
        """
        重载 ==
        直接对比page path和query
        """
        if isinstance(page, Page):
            # 都有page id的情况, 直接判断id即可
            if page.page_id and self.page_id:
                return page.page_id == self.page_id
            # query都不为None, 进行query的对比
            if page.query is not None and self.query is not None:
                if page.query != self.query:
                    return False
            # 不同页面类型
            if self.plugin_appid != page.plugin_appid:
                return False
            # 对比 path
            if self.plugin_appid:
                # 插件页面需要处理一下path
                self_path = re.sub(Page.PLUGIN_PATH_REG, "", self.path)
                page_path = re.sub(Page.PLUGIN_PATH_REG, "", page.path)
                return self_path == page_path
            return self.path == page.path
        else:
            _page = Page(None, page, None, None)
            return self == _page

    def __ne__(self, page: Union[Self, str]) -> bool:
        return not (self == page)

    @property
    def data(self):
        """
        获取页面 Data
        :return: json
        """
        return self._send("Page.getData").result.data

    @data.setter
    def data(self, data):
        """
        设置页面 data
        :param data:
        :return:
        """
        self._send("Page.setData", {"data": data})

    @property
    def inner_size(self):
        """
        get window size
        :return:
        """
        size_arr = self._get_window_properties(["innerWidth", "innerHeight"])
        return {"width": size_arr[0], "height": size_arr[1]}

    @property
    def scroll_height(self):
        """
        get scroll height
        :return:
        """
        return self._get_window_properties(["document.documentElement.scrollHeight"])[0]

    @property
    def scroll_width(self):
        """
        get scroll width
        :return:
        """
        return self._get_window_properties(["document.documentElement.scrollWidth"])[0]

    @property
    def scroll_x(self):
        """
        获取窗口顶点与页面顶点的 x 轴偏移量
        :return:
        """
        return self._get_window_properties(["scrollX"])[0]

    @property
    def scroll_y(self):
        """
        获取窗口顶点与页面顶点的 y 轴偏移量
        :return:
        """
        return self._get_window_properties(["scrollY"])[0]

    @property
    def navigation_style(self):
        """
        page的navigationStyle
        """
        if self._navigation_style is None:
            try:
                result = self.call_function("""function(){return window.__wxConfigWindow__ && window.__wxConfigWindow__.navigationStyle}""").result.get("result")
                self._navigation_style = result or "default"
            except MiniLowVersionSdkError:
                self._navigation_style = "default"
            Page.NAVIGATION_STYLE_MAP[self.path] = self._navigation_style
        return self._navigation_style
    
    @property
    def is_webview(self):
        if self._is_webview is None:  # 没有检测过
            if self.path in Page.WEB_VIEW_MAP:
                self._is_webview = Page.WEB_VIEW_MAP[self.path]
                return self._is_webview
            if not self.app:  # 不具备检验能力
                return None
            el = self.get_elements("web-view")
            if el:
                Page.WEB_VIEW_MAP[self.path] = True
                self._is_webview = True
                return True
            else:
                Page.WEB_VIEW_MAP[self.path] = False
                self._is_webview = False
                return False
        return self._is_webview
    
    @is_webview.setter
    def is_webview(self, v: bool):
        self._is_webview = v

    @property
    def wxml(self):
        """获取当前页面的 wxml """
        def pretty_wxml(wxml):
            if not wxml:
                return ""
            try:
                # pretty
                dom = xml.dom.minidom.parseString(wxml)
                wxml = dom.toprettyxml(indent="  ")
                m = re.search(r'(<\?xml.*?\?>)', wxml)
                if m:
                    wxml = wxml.replace(m.group(1), "")
            except:
                self.logger.debug("pretty wxml error")
            return wxml
        sdk_version = self.app and self.app.extra_info and self.app.extra_info.get("sdk_version")
        page_elements = self.get_elements("page", max_timeout=0, auto_fix=False)
        if len(page_elements) > 0:
            wxml = pretty_wxml(page_elements[0].inner_wxml)
        elif sdk_version and sdk_version > "2.19.5":
            # 如果 page 没有一个统一的【root】，需要 get elements 然后拼接
            wxml = ""
            els = self.get_elements("/*", max_timeout=0, auto_fix=False)
            for el in els:
                wxml += pretty_wxml(el.outer_wxml)
        return wxml

    def wait_data_contains(self, *keys_list: Union[list, str], max_timeout: int = 10):
        """
        description: 等待Page.data中包含指定keys
        param {*} self
        param {array} keys_list: items is list or str split by "."
        param {int} max_timeout
        return {bool}
        """

        @timeout(max_timeout)
        def f():
            d = self.data
            for keys in keys_list:
                obj = d
                for key in keys if isinstance(keys, (list, tuple)) else keys.split("."):
                    if isinstance(obj, dict) and key in obj:
                        obj = obj[key]
                    else:
                        return False
            return True

        try:
            return f()
        except Exception as e:
            self.logger.exception(e)
            return False

    def element_is_exists(
        self,
        selector: str = None,
        max_timeout: int = 10,
        inner_text=None,
        text_contains=None,
        value=None,
        xpath: str = None,
    ) -> bool:
        """
        查询元素是否存在
        :param selector:
        :param max_timeout: 超时时间
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param xpath: 使用xpath
        :return: bool
        """
        if selector and selector.startswith("/"):
            # 以/或//开头的认为是xpath
            xpath = selector
            selector = None
        return self._wait(
            lambda: self._element_is_exists(
                selector,
                xpath,
                inner_text=inner_text,
                value=value,
                text_contains=text_contains,
            ),
            max_timeout,
        )

    def get_element(
        self,
        selector: Union[str, Selector],
        inner_text=None,
        text_contains=None,
        value=None,
        max_timeout=0,
        xpath=None,
        auto_fix=None,
    ) -> ElementType:
        """
        find elements in current page, by css selector or xpath
        目前支持的css选择器有:

        选择器	              样例	                      样例描述
        .class	             .intro	                    选择所有拥有 class="intro" 的组件
        #id	                 #firstname	                选择拥有 id="firstname" 的组件
        tagname	             view	                    选择所有    view 组件
        tagname, tagname	 view, checkbox	            选择所有文档的 view 组件和所有的 checkbox 组件

        ::after	             view::after	            在 view 组件后边插入内容
        ::before	         view::before	            在 view 组件前边插入内容
        >>>                  ce1>>>.ce2>>>.intro        跨自定义组件的后代选择器

        支持以/或//开头的xpath

        :param selector: CSS选择器/XPATH
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param max_timeout: 超时时间
        :return:element 对象
        """
        if isinstance(selector, Selector):
            _selector = selector
        elif xpath:
            _selector = Selector(xpath=xpath, text=inner_text, contains_text=text_contains, val=value)
        else:
            _selector = Selector(css=selector, text=inner_text, contains_text=text_contains, val=value)
        selector, is_xpath = _selector.check_selector()
        if auto_fix is None and self.app:
            auto_fix = self.app.autofix
        if is_xpath:
            # use xpath
            return self.get_element_by_xpath(
                _selector,
                max_timeout=max_timeout,
                auto_fix=auto_fix
            )
        _selector.index = 0
        r = self.get_elements(
            _selector,
            max_timeout,
            auto_fix=auto_fix
        )
        if not r:
            raise MiniElementNotFoundError(_selector)
        return r[0]

    def call_method(self, method, args=None):
        if not args:
            args = []
        if isinstance(args, dict):
            args = [args]
        return self._send("Page.callMethod", {"method": method, "args": args})

    def call_function(self, app_function: str, args=None, sync=True, desc=None):
        """
        向 webview 注入代码并执行
        :param app_function:
        :param args:
        :param sync:
        :param desc: 报错描述
        :return:
        """
        return self._page_evaluate(app_function=app_function, args=args, sync=sync)

    def wait_for(self, condition=None, max_timeout=10):
        s_time = time.time()
        if isinstance(condition, int):
            time.sleep(condition)
            self.logger.debug("waitFor: %s s" % (time.time() - s_time))
            return True
        elif isinstance(condition, str):
            while (time.time() - s_time) < max_timeout:
                if self._element_is_exists(condition):
                    return True
                else:
                    time.sleep(0.25)
            return False
        elif hasattr(condition, "__call__"):
            while (time.time() - s_time) < max_timeout:
                res = condition()
                if res:
                    return True
                else:
                    time.sleep(0.25)
            return False

    def get_elements(
        self,
        selector: Union[Selector, str],
        max_timeout=0,
        inner_text=None,
        text_contains=None,
        value=None,
        index=-1,
        xpath=None,
        auto_fix=None
    ) -> typing.List[ElementType]:
        """
        find elements in current page, by css selector
        :param selector: 选择器
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param max_timeout: 超时时间
        :param index: index == -1: get所有, index >=0: get index+1个
        :param xpath: 使用xpath
        :param auto_fix: 在max_timeout不为0且返回的元素列表为空时自动纠错, 默认False
        :return:element 对象 list
        """
        if isinstance(selector, Selector):
            _selector = selector
        elif xpath:
            _selector = Selector(xpath=xpath, text=inner_text, contains_text=text_contains, val=value)
        else:
            _selector = Selector(css=selector, text=inner_text, contains_text=text_contains, val=value, index=index)
        selector, is_xpath = _selector.check_selector()
        if auto_fix is None and self.app:
            auto_fix = self.app.autofix
        if not _selector.need_filter and _selector.css:
            # 不需要过滤内容，直接返回
            return self._get_elements_by_css(_selector, max_timeout, index=_selector.index, auto_fix=auto_fix)
        elif is_xpath:
            # xpath支持text() contains()等条件，不需要额外做过滤
            return self.get_elements_by_xpath(
                _selector,
                max_timeout=max_timeout,
                auto_fix=auto_fix,
            )

        def filter_elements(max_timeout, auto_fix):
            # 需要过滤内容，有返回元素不是终结条件, 需要获取所有元素后再作过滤
            new_selector = Selector(_selector)
            new_selector.index = -1
            elements = self._get_elements_by_css(new_selector, max_timeout, auto_fix=auto_fix)
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

        els = timeout(max_timeout)(filter_elements)(max_timeout, False)  # 先不需要 auto fix
        if not els and auto_fix and max_timeout:
            els = filter_elements(1, True)  # max_timeout只进行一次
        return els

    def scroll_to(self, scroll_top, duration=300):
        """
        滚动到指定位置
        :param scroll_top:  位置 px
        :param duration:  滚动时长
        :return:
        """
        if not self.app:
            raise RuntimeError("please instantiate Page through App.get_current_page()")
        self.app.call_wx_method(
            "pageScrollTo", [{"scrollTop": scroll_top, "duration": duration}]
        )

    def get_elements_by_xpath(
        self,
        xpath,
        max_timeout=10,
        inner_text=None,
        value=None,
        text_contains=None,
        index=-1,
        auto_fix=None,
    ) -> ElementType:
        """
        根据xpath查找元素
        :param xpath: xpath
        :param max_timeout: 超时时间
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param auto_fix: 在max_timeout不为0且返回的元素列表为空时自动纠错, 默认False
        """
        if isinstance(xpath, Selector):
            _selector = xpath
        else:
            _selector = Selector(xpath=xpath, text=inner_text, contains_text=text_contains, val=value, index=index)
        if inner_text is not None:
            _selector.text = inner_text
        elif text_contains is not None:
            _selector.contains_text = text_contains
        elif value is not None:
            _selector.val = value
        if auto_fix is None and self.app:
            auto_fix = self.app.autofix
        @timeout(max_timeout)
        def search_elements():
            return self._get_elements_by_xpath(_selector)

        els = search_elements()
        if not els and max_timeout and auto_fix:
            wxml = self.wxml
            is_similar, root, sel, els = search(wxml, _selector)
            if els:
                full_xpath = None
                if len(els) == 1 or not is_similar:
                    full_xpath = get_element_full_xpath(els[0], root, _selector)
                if not is_similar:  # 能够找到原始元素, 得上报看看具体的 case
                    self.logger.warning(f"can find {len(els)} elements, report problem")
                    report_exception(ExceptionData(MiniElementNotFoundError(_selector), wxml=wxml[0:MAX_WXML_SIZE], fix_xpath=sel.full_selector(), src_selector=_selector.full_selector()))
                    # 尝试用元素的完整 xpath 搜索
                    sel.xpath = full_xpath
                else:
                    self.logger.info(f"find {len(els)} fixed elements")
                self.logger.info(f"try to get element with new selector: {sel.full_selector()}")
                els = self._get_elements_by_xpath(sel)
                if not els:  # 纠正失败
                    self.logger.warning("auto fix fail")
                    report_exception(ExceptionData(MiniElementNotFoundError(_selector), fix_fail=True, auto_fix=auto_fix, wxml=wxml[0:MAX_WXML_SIZE], fix_xpath=sel.full_selector(), src_selector=_selector.full_selector()))
                else:
                    self.logger.info("auto fix success")
                    ee.emit("autofix_success", _selector.full_selector(), sel.full_selector(), full_xpath)
        return els

    def get_element_by_xpath(
        self, xpath, max_timeout=10, inner_text=None, value=None, text_contains=None, auto_fix=None
    ) -> ElementType:
        """
        根据xpath查找元素
        :param xpath: xpath
        :param max_timeout: 超时时间
        :param inner_text: inner_text
        :param value: value
        :param text_contains: 包含的文字
        :param auto_fix: 在max_timeout不为0且返回的元素列表为空时自动纠错, 默认False
        """
        if isinstance(xpath, Selector):
            _selector = xpath
        else:
            _selector = Selector(xpath=xpath, text=inner_text, contains_text=text_contains, val=value)
        if inner_text is not None:
            _selector.text = inner_text
        elif text_contains is not None:
            _selector.contains_text = text_contains
        elif value is not None:
            _selector.val = value
        if auto_fix is None and self.app:
            auto_fix = self.app.autofix
        
        @timeout(max_timeout)
        def search_element():
            return self._get_element_by_xpath(_selector)

        el = search_element()
        if not el and max_timeout and auto_fix:
            wxml = self.wxml
            is_similar, root, sel, els = search(wxml, _selector)
            if els:
                full_xpath = None
                if len(els) == 1 or not is_similar:
                    full_xpath = get_element_full_xpath(els[0], root, _selector)
                if not is_similar:  # 能够找到原始元素, 得上报看看具体的 case
                    self.logger.warning(f"can find {len(els)} elements, report problem")
                    report_exception(ExceptionData(MiniElementNotFoundError(_selector), wxml=wxml[0:MAX_WXML_SIZE], fix_xpath=sel.full_selector(), src_selector=_selector.full_selector()))
                    # 尝试用元素的完整 xpath 搜索
                    sel.xpath = full_xpath
                else:
                    self.logger.info(f"find {len(els)} fixed elements")
                self.logger.info(f"try to get element with new selector: {sel.full_selector()}")
                el = self._get_element_by_xpath(sel)
                if not el:  # 纠正失败
                    self.logger.warning("auto fix fail")
                    report_exception(ExceptionData(MiniElementNotFoundError(_selector), fix_fail=True, auto_fix=auto_fix, wxml=wxml[0:MAX_WXML_SIZE], fix_xpath=sel.full_selector(), src_selector=_selector.full_selector()))
                else:
                    self.logger.info("auto fix success")
                    ee.emit("autofix_success", _selector.full_selector(), sel.full_selector(), full_xpath)
        if not el:
            raise MiniElementNotFoundError(_selector)
        return el

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

    def _send(self, method, params=None, sync=True):
        if params is None:
            params = {}
        params["pageId"] = self.page_id
        # self.logger.debug(f"method {method}, params: {params}")
        cmd: C = self.connection._gen_command(method, params, sync=sync)
        self.cmd_ids.add(cmd.id)
        try:
            return (
                self.connection.send(cmd)
                if sync
                else self.connection.send_async(cmd)
            )
        finally:
            self.cmd_ids.discard(cmd.id)

    def __get_elements(self, selector: Union[str, Selector], index=-1):
        if not isinstance(selector, Selector):
            selector = Selector(css=selector, index=index)
        elements = []
        ret = self._send("Page.getElements", {"selector": selector.css})
        for el in ret.result.elements:
            elements.append(create(el, self.page_id, self.connection, selector, page=self))
            if len(elements) == (selector.index + 1):  # index==-1时，不会match，就会全部返回
                return elements
        return elements

    def __search_child(
        self, selector_list: list, parent: ElementType = None, index=-1
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
            return real_els if index <= -1 else real_els[:index+1]
        child_els = []
        for _el in real_els:
            child_el = self.__search_child(
                selector_list[0:], _el, index=-1 if index <= -1 else index - len(child_els)
            )  # selector_list[0:]相当于copy
            child_els += child_el
            if len(child_els) == (index + 1):
                return child_els
        return child_els

    def _get_elements_by_css(
        self, selector: Union[str, Selector], max_timeout=0, index=-1, auto_fix=None
    ) -> typing.List[ElementType]:
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
        if auto_fix is None and self.app:
            auto_fix = self.app.autofix
        @timeout(max_timeout)
        def search_elements(_selectors: Union[list, tuple]):
            return self.__search_child(
                _selectors[0:], index=index
            )  # __search_child回pop元素，第一次search失败后重试会有问题，copy一份

        css = _selector.full_selector()
        self.logger.info("try to get elements: %s" % css)
        _selector_list = css.split(">>>")
        _selector_list.reverse()  # 新增处理【>>>】穿透自定义组件逻辑
        els = search_elements(_selector_list)
        if (
            (auto_fix and max_timeout > 0 and _selector.need_filter)  # 上层可能过滤了, 这里需要 fix
            or len(els) == 0  # 没找到
        ):
            if auto_fix and max_timeout > 0:
                self.logger.warning(f"Could not found any element '{css}' you need, try to fix")
                wxml = self.wxml
                is_similar, root, sel, els = search(wxml, _selector)
                if els:
                    if not is_similar:  # 能够找到原始元素, 得上报看看具体的 case
                        self.logger.warning(f"can find {len(els)} elements, report problem")
                        report_exception(ExceptionData(MiniElementNotFoundError(_selector), wxml=wxml[0:MAX_WXML_SIZE], fix_selector=sel.full_selector(), src_selector=_selector.full_selector()))
                    else:
                        self.logger.info(f"find {len(els)} fixed elements")
                    if sel.is_xpath:
                        for _el in els:
                            if _el.selector:
                                sel = _el.selector
                    self.logger.info(f"try to get element with new selector: {sel.full_selector()}")
                    els = self.get_elements(sel, max_timeout=0, auto_fix=False)
                    if not els:  # 纠正失败
                        self.logger.warning("auto fix fail")
                        report_exception(ExceptionData(MiniElementNotFoundError(_selector), fix_fail=True, auto_fix=auto_fix, wxml=wxml[0:MAX_WXML_SIZE], fix_selector=sel.full_selector(), src_selector=_selector.full_selector()))
                    else:
                        self.logger.info("auto fix success")
                        ee.emit("autofix_success", _selector.full_selector(), sel.full_selector())
                    return els
            self.logger.warning(f"Could not found any element '{css}' you need")
        else:
            self.logger.info("find elements success: %s" % str(els))
        return els

    def _get_element(self, selector, max_timeout=0) -> ElementType:
        if not isinstance(selector, Selector):
            selector = Selector(css=selector)
        def search_element():
            ret = self._send("Page.getElement", {"selector": selector.css})
            return create(ret.result, self.page_id, self.connection, selector, page=self)

        self.logger.info("try to get element: %s" % selector.css)
        el = search_element()
        self.logger.info("find element success: %s" % str(el))
        return el

    def _element_is_exists(
        self, selector: str = None, xpath: str = None, **kwargs
    ) -> bool:
        """
        description:
        param {*} self
        param {str} selector: css 选择器
        param {str} xpath: xpath
        param {object} kwargs: inner_text, text_contains, value ...
        return {bool}
        """
        if selector and xpath:
            self.logger.warning("selector and xpath both not None, use selector")
        if not (selector or xpath):
            raise RuntimeError("Must use either selector or xpath")
        try:
            if selector:
                return (
                    True if self.get_elements(selector, 0, index=0, **kwargs) else False
                )
            else:
                return (
                    True
                    if self.get_elements_by_xpath(xpath, 0, index=0, **kwargs)
                    else False
                )
        except PageDestroyed:
            raise
        except Exception:
            return False

    # 正式支持xpath后，考虑复用get_element接口，通过检测selector类型来决定使用什么选择器
    # def _is_xpath(self, selector):
    #     """
    #     检测一个selector是否是xpath
    #     1. start with "/"
    #     2. start with "//"
    #     3. start with "./" or == "."
    #     4. translator.css_to_xpath(css_selector) fail
    #     """
    #     if selector.startswith("/") or selector.startswith("//") or selector.startswith("./"):
    #         return True
    #     if selector == ".":
    #         return True
    #     try:
    #         translator.css_to_xpath(selector)
    #         return False
    #     except SelectorError:
    #         return True
    #     return False
        
    def _is_origin_xpath(self, xpath: str):
        return xpath.startswith("/html") or xpath.startswith("/body") or re.search("/wx-\w+", xpath)
        
    def _resolve_xpath(self, xpath: str):
        """
        解析xpath
        """
        xpath = (
            xpath[5:] if xpath.find("/page/") == 0 else xpath
        )  # xpath不能以/page/开头（不存在的根节点）
        # /html/body/wx-view[9]/wx-mytest//wx-test2/wx-view[1]/wx-view[2]/wx-text/span[2]
        # /html/wx-tab-bar-wrapper/tab-bar/wx-view/wx-view[3]/wx-view -> /tab-bar-wrapper/view/view[3]/view
        # /html/wx-root-portal-content/wx-view/wx-view -> /root-portal-content/view/view
        # /html/body/wx-scroll-view/div/div[1]/div/wx-view[1]/wx-popup/wx-root-portal/wx-root-portal-content/wx-view/wx-view
        # `root-portal`:
        # for 录制回放: /root-portal-content/xxx -> //root-portal-content/xxx
        # for chrome inpector: 未弹出: /html/body//wx-root-portal/wx-root-portal-content/xxx, 弹出: /html/wx-root-portal-content/xxx
        # is original xpath
        # 如果xpath中包含`wx-`标签
        if self._is_origin_xpath(xpath):
            xpath = re.sub(r"/wx-", "/", "/".join(filter(lambda xp: not xp or xp.find("wx-") == 0, xpath.split("/"))))
            self.logger.info(f"maybe you are finding xpath: {xpath}")
            return xpath
        return xpath

    def _get_element_by_xpath(self, xpath: str) -> ElementType:
        """
        description: 通过xpath获取元素
        param {*} self
        param {str} xpath
        return {*} ElementType or None
        """
        if isinstance(xpath, Selector):
            _selector = xpath
        else:
            _selector = Selector(xpath=xpath)
        _selector.xpath = self._resolve_xpath(_selector.xpath)
        try:
            ret = self._send("Page.getElementByXpath", {"selector": _selector.to_selector()})
        except MiniAppError as e:
            if str(e) == "no such element":
                return None
            raise
        return create(ret.result, self.page_id, self.connection, _selector, page=self)

    def _get_elements_by_xpath(self, xpath: Union[str, Selector], index=-1) -> typing.List[ElementType]:
        """
        description: 通过xpath获取元素
        param {*} self
        param {str} xpath
        return {*} List[ElementType]
        """
        if isinstance(xpath, Selector):
            _selector = xpath
        else:
            _selector = Selector(xpath=xpath, index=index)
        _selector.xpath = self._resolve_xpath(_selector.xpath)
        if not self._can_i_use("Page.getElementsByXpath"):
            el = self._get_element_by_xpath(_selector)  # 降级使用Page.getElementByXpath
            return [el] if el else []
        try:
            ret = self._send("Page.getElementsByXpath", {"selector": _selector.to_selector()})
        except MiniAppError as e:
            if str(e) == "no such element":
                return []
            if (
                str(e).find("Page.getElementsByXpath unimplemented") > 0
            ):  # or str(e) in ["r is not iterable",]:
                self._unset_interface("Page.getElementsByXpath")
                el = self._get_element_by_xpath(_selector)  # 降级使用Page.getElementByXpath
                return [el] if el else []
            raise
        elements = []
        for el in ret.result.elements:
            elements.append(create(el, self.page_id, self.connection, _selector, page=self))
            if len(elements) == (_selector.index + 1):
                return elements
        return elements

    def _page_evaluate(self, app_function: str, args=None, sync=True):
        """
        在当前页面执行命令
        """
        if not args:
            args = []
        return self._send(
            "Page.callFunction",
            {"functionDeclaration": app_function, "args": args},
            sync=sync,
        )
    

