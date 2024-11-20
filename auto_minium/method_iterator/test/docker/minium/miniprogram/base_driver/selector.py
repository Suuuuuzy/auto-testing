'''
Author: yopofeng yopofeng@tencent.com
Date: 2024-01-30 12:31:32
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-07-18 17:43:49
FilePath: /py-minium/minium/miniprogram/base_driver/selector.py
Description: minium元素选择器类, 记录元素选择的信息
'''
from enum import Enum, auto
from typing import *
from typing_extensions import *
import cssselect
from cssselect import GenericTranslator
from cssselect.parser import Class, Hash, CombinedSelector
from cssselect.xpath import XPathExpr
from lxml import etree
import re

def is_valid_xpath(xpath):
    try:
        etree.XPath(xpath)
        return True
    except etree.XPathSyntaxError:
        return False

class CustomGenericTranslator(GenericTranslator):
    """重构部分方法, 可以匹配自定义组件下的 class & id"""
    def xpath_attrib_custommatch(
        self, xpath: XPathExpr, name: str, value: Optional[str]
    ) -> XPathExpr:
        value = value.strip()
        if value:
            xpath.add_condition(
                "%s and re:match(concat(' ', normalize-space(%s), ' '), %s)"
                % (name, name, self.xpath_literal(".* ([A-Za-z0-9_-]+--)?" + value + " "))
            )
        else:
            xpath.add_condition("0")
        return xpath
    
    def xpath_class(self, class_selector: Class) -> XPathExpr:
        xpath = self.xpath(class_selector.selector)
        return self.xpath_attrib_custommatch(xpath, "@class", class_selector.class_name)
    
    def xpath_hash(self, id_selector: Hash) -> XPathExpr:
        xpath = self.xpath(id_selector.selector)
        return self.xpath_attrib_custommatch(xpath, "@id", id_selector.id)


def pick(s, start="[", end="]", continuous=False):
    """提取字符串中的内容:
    字符串可能出现多个 start 和 end, 逐个提取, 返回一个列表
    :continuous: 需要连续的
    """
    res = []
    stack = []
    i = 0
    in_stack = 0
    should_be_start = False  # 下一个需要是start
    while i < len(s):
        if s[i] == start:
            should_be_start = False
            if i == 0 or s[i - 1] != "\\":
                in_stack += 1
            stack.append(s[i])
        elif should_be_start:
            should_be_start = False
            res.clear()  # 清空前面的数据
        elif s[i] == end and in_stack:
            stack.append(s[i])
            if i == 0 or s[i - 1] != "\\":
                in_stack -= 1
            if not in_stack:
                # 出栈
                res.append("".join(stack))
                stack = []
                if continuous:
                    should_be_start = True
        elif in_stack:
            stack.append(s[i])
        i += 1
    return res

class _Selector(Enum):
    def _generate_next_value_(name: str, start, count, last_values):
        name = name.lower()
        if name.startswith("selector"):
            return name[9:]
        return name
    CSS = auto()
    XPATH = auto()

    TEXT = auto()
    START_TEXT = auto()
    CONTAINS_TEXT = auto()
    VAL = auto()
    INDEX = auto()
    CHILD = auto()
    PARENT = auto()
    TEXT_REGEX = auto()
    CLASS_REGEX = auto()
    NODE_ID = auto()

class SelectorMetaClass(type):
    def __new__(mcs, cls_name, bases, attr_dict):
        def set_value(selector):
            def wrapper(self: 'Selector', v):
                if v is not None:
                    self._selector[selector] = v
            return wrapper
        def get_value(selector):
            def wrapper(self: 'Selector'):
                return self._selector.get(selector, None)
            return wrapper
        def del_value(selector):
            def wrapper(self: 'Selector'):
                if selector in self._selector:
                    self._selector.pop(selector)
            return wrapper
        for _selector in _Selector.__members__.values():
            if _selector.value not in attr_dict:
                attr_dict[_selector.value] = property(
                    get_value(_selector),
                    set_value(_selector),
                    del_value(_selector)
                )
        cls = type.__new__(mcs, cls_name, bases, attr_dict)
        for _selector in _Selector.__members__.values():
            if _selector.value not in cls.__annotations__:
                cls.__annotations__[_selector.value] = str
        return cls

class Selector(object, metaclass=SelectorMetaClass):
    _selector: Dict[_Selector, Union[str, int, _Selector]]
    parent: 'Selector'
    text: str
    contains_text: str
    val: str
    index: int  # index == -1: 所有, index >= 0: 第{index+1}个
    
    @overload
    def __init__(self, _: 'Selector') -> None: ...
    @overload
    def __init__(self, _: str) -> None: ...
    @overload
    def __init__(self, **selector) -> None: ...

    def __init__(self, _: 'Selector'=None, parent: 'Selector'=None, **selector) -> None:
        self._selector = {_Selector.INDEX: -1}
        if _:
            if isinstance(_, Selector):
                for k, v in _._selector.items():
                    self._selector[k] = v
                return
            else:
                selector["css"] = _
        if parent:
            self.parent = parent
        for k, v in selector.items():
            if v is not None and hasattr(_Selector, k.upper()):
                setattr(self, k, v)
        if self.css is None and self.xpath is None:
            raise ValueError("selector must have css or xpath")
        if self.is_xpath:
            self.parse_xpath(self.xpath)
        # self._selector.update({getattr(_Selector, k.upper()): v for k, v in selector.items() if v is not None})

    def _check_custom_css(self):
        if self.css and self.css.find(">>>") > 0:
            parent = self.parent
            for _css in self.css.split(">>>"):
                sel = Selector(css=_css.strip(), parent=parent, node_id="init")
                parent = sel
            # 更新相关信息
            self._selector[_Selector.CSS] = parent.css
            self.parent = parent.parent

    @classmethod
    def from_xpath(cls, xpath: str) -> 'Selector':
        """转化从 to_selector 方法格式化来的 xpath"""
        sel = cls(xpath=xpath)
        sel.parse_xpath(xpath)
        return sel

    def parse_xpath(self, xpath: str) -> None:
        last = xpath.split("/")[-1]
        conditions = pick(last, continuous=True)
        if not conditions:
            self.xpath = xpath
            return
        _xpath = xpath[0:xpath.rfind(conditions[0])]
        sel = self
        sel.xpath = _xpath
        for k, v in {
            # _Selector.INDEX: r"\[(?P<value>\d+)\]",
            _Selector.CONTAINS_TEXT: r"\[contains\(text\(\),\s*['\"](?P<value>.+)['\"]\)\]",
            _Selector.TEXT: r"\[(normalize-space\()?text\(\)(\))?\s*=\s*['\"](?P<value>.+)['\"]\]",
            _Selector.VAL: r"\[@value\s*=\s*['\"](?P<value>.+)['\"]\]"
        }.items():
            for i in range(len(conditions)-1, -1, -1):
                c = conditions[i]
                m = re.search(v, c)
                if m:
                    setattr(sel, k.value, m.group("value"))
                    del conditions[i]
        for i in range(len(conditions)):
            c = conditions[i]
            m = re.search(r"\[(?P<value>\d+)\]", c)
            if m:
                setattr(sel, _Selector.INDEX.value, int(m.group("value")) - 1)
                del conditions[i]
                break
        for c in conditions:
            sel.xpath += c

    @property
    def need_filter(self):
        return not (self.text is None and self.val is None and self.contains_text is None)
    
    @property
    def need_text(self):
        return not (self.text is None and self.contains_text is None)

    @property
    def is_xpath(self):
        return self.check_selector()[1]

    @property
    def index(self):
        return self._selector.get(_Selector.INDEX, None)
    
    @index.setter
    def index(self, v):
        if v is not None:
            self._selector[_Selector.INDEX] = int(v)

    @index.deleter
    def index(self):
        if _Selector.INDEX in self._selector:
            self._selector.pop(_Selector.INDEX)
    
    @property
    def css(self) -> str:
        return self._selector.get(_Selector.CSS, None)
    
    @css.setter
    def css(self, v: str):
        if v is not None:
            self._selector[_Selector.CSS] = v.strip()
            self._check_custom_css()

    @css.deleter
    def css(self):
        if _Selector.CSS in self._selector:
            self._selector.pop(_Selector.CSS)
    
    @property
    def xpath(self) -> str:
        return self._selector.get(_Selector.XPATH, None)
    
    @xpath.setter
    def xpath(self, v: str):
        if v is not None:
            self._selector[_Selector.XPATH] = v.strip()

    @xpath.deleter
    def xpath(self):
        if _Selector.XPATH in self._selector:
            self._selector.pop(_Selector.XPATH)

    def check_selector(self) -> Tuple[str, bool]:
        selector = self.css
        is_xpath = False
        if not selector and self.xpath:
            return self.xpath, True
        elif not selector:
            selector = self.xpath = self._selector.get(_Selector.XPATH, "//*")
            is_xpath = True
        elif selector.startswith("/"):
            self.xpath = selector
            self.css = ""
            is_xpath = True
        return selector, is_xpath

    def to_selector_list(self):
        """返回 css selector list"""
        sel_list = [self]
        parent = self.parent
        cnt = 0
        while parent:
            cnt += 1
            sel_list.append(parent)
            parent = parent.parent
            if cnt > 1000:  # 防止极端的循环引用
                break
        sel_list.reverse()  # append -> reverse 比 insert(0)效率高
        return sel_list

    def to_selector(self):
        if not self._selector:
            raise ValueError('No element found')
        selector, is_xpath = self.check_selector()
        if is_xpath:
            if _Selector.TEXT in self._selector:
                selector += '[normalize-space(text())="%s"]' % self._selector[_Selector.TEXT]
            elif _Selector.CONTAINS_TEXT in self._selector:
                selector += '[contains(text(), "%s")]' % self._selector[_Selector.CONTAINS_TEXT]
            elif _Selector.VAL in self._selector:
                selector += '[@value="%s"]' % self._selector[_Selector.VAL]
            elif isinstance(self._selector.get(_Selector.INDEX), int) and self._selector[_Selector.INDEX] > -1:
                selector += f'[{self._selector[_Selector.INDEX] + 1}]'
            return selector if is_valid_xpath(selector) else ("//" + selector)
        else:
            return selector
    
    def full_selector(self) -> str:
        def has_xpath(selector: Selector):
            if selector.xpath:
                return True
            if selector.parent:
                return has_xpath(selector.parent)
            return False
        if has_xpath(self):  # 统一转化成xpath
            return self.to_xpath()
        if self.parent:
            if self.parent.node_id:
                return self.parent.full_selector() + " >>> " + remove_prefix(self).css
            return self.parent.full_selector() + " " + self.css
        return self.css

    def to_xpath_selector(self):
        """转成xpath选择器"""
        self.check_selector()
        if self.xpath:
            return self
        else:
            try:
                selector = Selector(self)
            except TypeError:
                print(self)
                raise
            selector.xpath = GenericTranslator().css_to_xpath(self.css)
            selector.css = ""
            return selector
        
    def to_custom_xpath_selector(self):
        self.check_selector()
        if self.xpath:
            return self
        else:
            try:
                selector = Selector(self)
            except TypeError:
                print(self)
                raise
            selector.xpath = CustomGenericTranslator().css_to_xpath(self.css)
            selector.css = ""
            return selector

    def to_xpath(self):
        """转成xpath表达"""
        xpath_selector = self.to_xpath_selector()
        xpath = xpath_selector.to_selector()
        if self.parent and (xpath.startswith("//") or xpath.startswith("/descendant-or-self::")):
            return self.parent.to_xpath() + xpath
        return xpath

    def __repr__(self):
        return f"{{{', '.join([f'{k.value}: {v}'for (k, v) in self._selector.items()])}}}"


def remove_prefix(sel: 'Selector'):
    """移除 selector 中的 class_prefix 和 id_prefix"""
    group = cssselect.parse(sel.to_selector())
    def extend(tree: Union[CombinedSelector, Class, Hash]):
        if not tree:
            return
        if isinstance(tree, CombinedSelector):
            extend(tree.selector)
            extend(tree.subselector)
        elif isinstance(tree, Class):
            tree.class_name = re.sub(r"\S+?--", "", tree.class_name, count=1)
            extend(tree.selector)
        elif isinstance(tree, Hash):
            tree.id = re.sub(r"\S+?--", "", tree.id, count=1)
            extend(tree.selector)
    for _selector in group:
        extend(_selector.parsed_tree)
    new_sel = Selector(sel)
    new_sel.css = group[0].canonical()
    return new_sel

def trans_selector(sel: 'Selector', class_prefix = '', id_prefix = '') -> 'Selector':
    """给 selector 添加 class_prefix 和 id_prefix"""
    group = cssselect.parse(sel.to_selector())
    def extend(tree: Union[CombinedSelector, Class, Hash]):
        if isinstance(tree, CombinedSelector):
            extend(tree.selector)
            extend(tree.subselector)
        elif isinstance(tree, Class):
            if class_prefix and not tree.class_name.startswith(f"{class_prefix}--"):
                tree.class_name = f"{class_prefix}--{tree.class_name}"
            if tree.selector:
                extend(tree.selector)
        elif isinstance(tree, Hash):
            if id_prefix and not tree.id.startswith(f"{id_prefix}--"):
                tree.id = f"{id_prefix}--{tree.id}"
            if tree.selector:
                extend(tree.selector)
    for _selector in group:
        extend(_selector.parsed_tree)
    new_sel = Selector(sel)
    new_sel.css = group[0].canonical()
    return new_sel

def parse_selector(sel: 'Selector') -> Tuple[cssselect.Selector, int]:
    """parse selector, 同时计算 combine 的个数"""
    group = cssselect.parse(sel.to_selector())
    def count(sel: CombinedSelector):
        if not isinstance(sel, CombinedSelector):
            return 0
        return count(sel.selector) + count(sel.subselector) + 1
    for _selector in group:
        return _selector, count(_selector.parsed_tree)
    return None, 0
        
# def xpath_to_css(xpath):
#     # 简单的 XPath 到 CSS 选择器转换
#     css = xpath
#     # 替换常见的 XPath 表达式
#     css = css.replace('//', ' ')
#     css = css.replace('/', ' > ')
#     css = css.replace('[@', '[')
#     css = css.replace('[contains(@', '[*|=')
#     css = css.replace(']', ']')
#     css = css.replace('@', '')
#     css = css.replace('text()', '')
#     return css

if __name__ == "__main__":
    sel = Selector(xpath="(//article[@class='markdown-section'])[1]")
    assert sel.to_selector() == "(//article[@class='markdown-section'])[1]", "ok"
    sel = Selector(xpath="(//*[contains(@nodes,'1.')]/parent::view/following-sibling::view)[3]")
    assert sel.full_selector() == "(//*[contains(@nodes,'1.')]/parent::view/following-sibling::view)[3]", "ok"


    
