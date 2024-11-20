'''
Author: yopofeng yopofeng@tencent.com
Date: 2024-04-23 12:34:38
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-09-26 17:50:46
FilePath: /py-minium/minium/framework/findwxml.py
Description: 查找可能的xpath/selector
'''
from lxml import etree, html
from lxml import pyclasslookup
from collections import Counter
import cssselect
from cssselect.parser import Class, Hash, CombinedSelector, Element, Tree
from dataclasses import dataclass
import re
import argparse
from typing import List, TYPE_CHECKING, Tuple, Union, Dict, overload, Generator, Iterator
from .logcolor import logger
from ..utils.lazyloader import lazy_import
if TYPE_CHECKING:
    from ..miniprogram.base_driver import selector
else:
    selector = lazy_import("..miniprogram.base_driver.selector", __package__)


class MyHash(Hash):
    def canonical(self) -> str:
        # 自定义组件下 id 可能有`--`
        if self.id and self.id.find("--") > 0:
            return "%s[id='%s']" % (self.selector.canonical(), self.id)
        return "%s#%s" % (self.selector.canonical(), self.id)

class CSSSELECT_Element(Element):
    base = False
class MyElementClass(etree.ElementBase):
    # 新增一些属性
    node_id = None
    class_prefix = None
    comp_name = ""
    selector: 'selector.Selector' = None
    full_path: str = ""
    parent_class_prefix = None
    parent_id_prefix = None
    
    @classmethod
    def get_css_selector(cls, el: 'etree.ElementBase') -> 'Tree':
        el_tag = el.tag if get_comp_name(el) else filter_tag(el.tag)
        el_id = filter_id(el.attrib.get("id", ""))
        el_class = filter_class(el.attrib.get("class", ""))
        this_el = CSSSELECT_Element(element=el.tag)
        if el_id:
            setattr(el, "parent_id_prefix", "")  # 没有 prefix, 属于【跟节点】的【后代节点】
            this_el = MyHash(this_el, el_id)
            if el_id.find("--") > 0:
                    setattr(el, "parent_id_prefix", el_id.split("--")[0])
        if el_class:
            for el_cls in iter(e for e in el_class if e):
                setattr(el, "parent_class_prefix", "")  # 没有 prefix, 属于【跟节点】的【后代节点】
                this_el = Class(this_el, el_cls)
                if el_cls.find("--") > 0:
                    setattr(el, "parent_class_prefix", el_cls.split("--")[0])
        if isinstance(this_el, Element) and el_tag is None:
            this_el.base = True
        return this_el

class MyLookup(pyclasslookup.PythonElementClassLookup):
    def lookup(self, doc, root):
        return MyElementClass

@dataclass
class AutoFix:
    # 纠错策略选择
    CSS1: bool = True
    CSS2: bool = True
    CSS3: bool = True

    XPATH1: bool = True

@overload
def get_path(el: 'etree._Element'): ...
@overload
def get_path(root: 'etree._ElementTree', el: 'etree._Element'): ...

def get_path(root: 'etree._ElementTree', el: 'etree._Element'=None):
    if isinstance(root, (etree.ElementBase, etree._Element)) and el is None:
        el = root
        root = el.getroottree()
    if el is None:
        return ""
    return root.getpath(el)

def append_text(sel: 'selector.Selector') -> 'selector.Selector':
    """在现有的 sel 后添加一个 text 节点, 用于筛选 text"""
    if (sel.text or sel.contains_text) and not sel.xpath.split("/")[-1].startswith("text"):  # 可以补一个 text
        add_text_sel = selector.Selector(sel)
        del add_text_sel.text
        del add_text_sel.contains_text
        text_sel = selector.Selector(xpath=add_text_sel.to_selector() + "/text", text=sel.text, contains_text=sel.contains_text)
        return text_sel
    return None

def iter_sel(sel: 'selector.Selector'):
    yield sel
    add_text_sel = append_text(sel)
    if add_text_sel:
        yield add_text_sel

def get_class_prefix(el: MyElementClass):
    """获取元素【可能的】class 前缀"""
    comp_name = el.comp_name
    # comp2/customelement-test/test2 -> comp2-customelement-test-test2, 会尽可能的使用更少的前缀长度, 以`-`分割
    name_list = comp_name.replace("/", "-").split("-")
    # 尝试从最长的前缀开始搜索
    for i in range(len(name_list)):
        prefix = "-".join(name_list[i:])
        if el.xpath(f'//*[starts-with(@class, "{prefix}--")]'):  # 有该前缀的元素
            return prefix

def search_inst_id(els: List[MyElementClass]):
    """查找实例 id"""
    if not els:
        return None
    res: Dict[str, set] = {}  # real_id -> set(instance_ids)
    for el in els:
        idx = el.attrib.get("id").find("--")
        node_id = el.attrib.get("id")[0:idx]
        real_id = el.attrib.get("id")[idx+2:]
        if real_id not in res:
            res[real_id] = set()
        res[real_id].add(node_id)
    # 我们认为, 同一个 node 实例下, id 应该唯一存在, 如果 real id 有多个, 可能是嵌套的自定义组件进行了多次的实例化, 并且里面有部分组件有相同 id 标识
    min_len = float('inf')
    min_instance_id = []
    for rid in res:
        length = len(res[rid])
        if length < min_len:  # 清空min_instance_id
            min_instance_id = []
            min_len = length
        if length == min_len:
            min_instance_id.append(rid)
            
    if min_instance_id:  # 找得到 id
        # 最少实例是1个的话, 真实的实例 id 最有可能在这里产生
        # 最少实例是多个。即唯一的 id, 对应了多个实例 id，那很可能是"自定义组件"中的 id。或者跟自定义组件中的 id 重名了(slot)
        c = Counter([item for rid in min_instance_id for item in res[rid]])
        # 寻找一个前缀出现最多的
        inst_id, count = c.most_common(1)[0]
        logger.debug(f"id: {inst_id}, count: {count}, 该 id 是最有可能的一个")
        return inst_id

def get_child_els(el: MyElementClass, xpath: str) -> List[Union[MyElementClass, 'etree._Element']]:
    evaluator = etree.XPathEvaluator(
        etree.ElementTree(el),
        smart_strings=False,
        namespaces={"re": "http://exslt.org/regular-expressions"}
    )
    els = evaluator(f"/{el.tag}" + (xpath if xpath.startswith("/") else f"//{xpath}"))
    return els

def  get_element_css_selector(tree: MyElementClass, el: MyElementClass, css: str=None) -> 'selector.Selector':
    """把 element的 path 转化成 css selector

    :param MyElementClass tree: 根节点
    :param MyElementClass el: 当前节点
    :param str css: 参考的 css, defaults to None
    :return selector.Selector: css selector
    """
    full_xpath = get_path(tree.getroottree(), el)
    
    this_el = MyElementClass.get_css_selector(el)  # 当前节点cssselector表达
    parent_id_prefix = el.parent_id_prefix
    parent_class_prefix = el.parent_class_prefix
    # if isinstance(this_el, Element):
    #     this_el.element = el.tag
    ret_sel = selector.Selector(css='')  # 当前节点selector.Selector表达
    current_sel = ret_sel
    ever_pass = False
    def iter_parent() -> Iterator[MyElementClass]:
        nonlocal full_xpath
        parent = tree.getroottree().xpath(f"{full_xpath}/..")  # 父节点
        while parent:
            full_xpath += "/.."
            yield parent[0]
            parent = tree.getroottree().xpath(f"{full_xpath}/..")

    for parent in iter_parent():
        comp_name = get_comp_name(parent)
        new_el = MyElementClass.get_css_selector(parent)
        if comp_name:  # parent是自定义组件
            fill_custom_element_info(parent)
            if parent_class_prefix is not None:  # 当前 parent 是否为上一个有效元素的【父元素】
                if (
                    parent.class_prefix is None  # 自定义组件没有 class_prefix, 说明没有找到符合 prefix 的子组件.
                    or parent_class_prefix != parent.class_prefix  # 当前自定义组件不符合条件
                ):  
                    ever_pass = True
                    continue
            elif parent_id_prefix is not None and parent.node_id not in (None, "init", comp_name):  # 当前 parent 是否为上一个有效元素的【父元素】
                if parent_id_prefix != parent.node_id:  # 当前自定义组件不符合条件. PS: 由于parent.node_id是【推断】出来的, 所以有可嫩不准确
                    ever_pass = True
                    continue
            # 符合条件的自定义组件充值 class/id prefix
            parent_class_prefix = parent.parent_class_prefix
            parent_id_prefix = parent.parent_id_prefix
            # 把当前的信息落地
            current_sel.css = this_el.canonical()
            # 生成parent selector
            new_sel = selector.Selector(css='', node_id=parent.node_id or parent.comp_name)
            current_sel.parent = new_sel
            current_sel = new_sel
            this_el = new_el
            # if isinstance(this_el, Element):
            #     this_el.element = parent.tag
            ever_pass = False
        else:
            this_el_selector = this_el
            if isinstance(this_el, CombinedSelector):
                this_el_selector = this_el.selector  # 最近一个 selector
            # if is_normal_el(new_el):  # tag/id/class 都不特殊
            #     ever_pass = True  # combine 的时候使用 " "
            # 如果当前节点有 id/class 前缀，需要找到跟其有相同前缀的节点，直至找到该自定义组件节点
            if parent_class_prefix is not None and parent.parent_class_prefix is not None:
                # 有 class 前缀以 class 为key比较(相对准确)
                if parent_class_prefix != parent.parent_class_prefix:
                    ever_pass = True
                    continue
            elif parent_id_prefix is not None and parent.parent_id_prefix is not None and parent_id_prefix != parent.parent_id_prefix:
                ever_pass = True
                continue
            if is_normal_el(new_el) and not is_normal_el(this_el_selector):  # 当前是一个普通的(view?), 但上一个不是
                ever_pass = True  # combine 的时候使用 " "
            else:
                if parent.parent_class_prefix is not None:
                    parent_class_prefix = parent.parent_class_prefix
                if parent.parent_id_prefix is not None:
                    parent_id_prefix = parent.parent_id_prefix
                this_el = CombinedSelector(new_el, " " if ever_pass else ">", this_el)
                ever_pass = False
    current_sel.css = this_el.canonical()
    return ret_sel

def get_id_prefix(el: MyElementClass):
    """获取元素【可能的】 id 前缀"""
    root = el.getroottree()
    evaluator = etree.XPathEvaluator(
        etree.ElementTree(el),
        smart_strings=False,
        # namespaces={"re": "http://exslt.org/regular-expressions"}
    )
    # evaluator('//*[re:match(@id, "\w+--\w+")]')
    els = get_child_els(el, '//*[contains(@id, "--")]')
    # 检查一下是否有子节点是自定义元素
    custom_els = get_child_els(el, '/descendant::*[@is]')
    maybe_not_this_els = []
    for _el in custom_els:
        # 记录一下以下可能是自定义元素下的子元素，第一遍可以尝试排除
        maybe_not_this_els.extend(get_child_els(_el, '//*[contains(@id, "--")]'))
    
    # 先剔除 maybe_not_this_els 搜索一遍, 如果有, 大概率能搜索出正确的 id（除了来自 slot 组件引起的父组件节点插入影响）
    node_id = search_inst_id([_el for _el in els if _el not in maybe_not_this_els])
    if node_id:
        return node_id
    else:
        return search_inst_id(els)

def copy_custom_element_info(src: MyElementClass, dist: MyElementClass):
    """从 src 元素中复制自定义元素信息到 dist 元素"""
    dist.comp_name = src.comp_name
    dist.class_prefix = src.class_prefix
    dist.node_id = src.node_id
    
def is_normal_el(sel: 'Tree'):
    if isinstance(sel, Element) and getattr(sel, "base", False):
        return True
    return False

def get_comp_name(el: MyElementClass):
    return el.attrib.get("is")

def filter_id(el_id: str) -> str:
    """过滤一些可能是批量生成的 id

    :param str el_id: 元素 id
    """
    if re.match(r"\w+\d+$", el_id):  # 纯数字结尾很有可能是编译出来的
        return ""
    return el_id

def filter_class(class_str: str) -> List[str]:
    """过滤一些可能是批量生成的 class

    :param str class_str: class
    :return str: 过滤后的 class
    """
    class_str = re.sub(r"data-v-[\S]+", "", class_str)
    return re.split(r"\s+", class_str.strip()) 

def filter_tag(tag: str) -> str:
    if tag.find("-") > 0:
        return tag
    return None

def fill_custom_element_info(el: MyElementClass):
    """填充自定义元素信息"""
    comp_name = get_comp_name(el)
    if not comp_name:  # 非自定义元素
        return
    el.comp_name = comp_name
    el.class_prefix = get_class_prefix(el)
    el.node_id = get_id_prefix(el)
    
def set_elements_selector(els: List[MyElementClass], sel: 'selector.Selector'):
    for el in els:
        el.selector = sel

def remote_virtual_root(xpath: str):
    return re.sub(r"^(/root|/html/body)*", "", xpath)

def search_xpath(tree: 'etree._Element', sel: 'selector.Selector', auto_fix: AutoFix=AutoFix()) -> Tuple[List['etree._Element'], str]:
    """搜索 xpath

    :return Tuple[List['etree._Element'], str]: elements, xpath
    """
    src_xpath = sel.to_selector()
    def _search_xpath(xpath: str):
        """搜索 xpath, 如果找不到, 则找其父节点, 直到找到能找到的元素

        :param str xpath: 需要查找的 xpath
        :return List['etree._Element'], str: 准确/可能的 elements, 可以找到元素的xpath
        """
        xpath = xpath.rstrip("/")
        if not xpath:
            return [], ""
        try:
            els = tree.xpath(xpath)
        except etree.XPathEvalError:
            logger.warning(xpath)
            return [], ""
        if not els:
            # print(f"can't find {xpath}")
            # 查找少一级的xpath
            return _search_xpath("/".join(xpath.split("/")[0:-1]))
        logger.debug(f"查找到 xpath: {xpath}")
        return els, xpath
    els, xpath = _search_xpath(src_xpath)
    like = []
    if xpath != src_xpath:
        if sel.need_text:
            add_text_sel = append_text(sel)
            if add_text_sel:
                _els, _xpath = _search_xpath(add_text_sel.to_selector())
                if _els and _xpath == add_text_sel.to_selector():  # 确实只是缺了 text
                    return _els, src_xpath
        if xpath:  # 看看有没有可能找出一个"相近"的结果
            sub = src_xpath[len(xpath):]  # 找不到的子 path
            not_view = None
            for tag in sub.split("/"):  # view作用类似div, 过滤掉
                if tag and not tag.startswith("view"):
                    not_view = tag
                    break
            if not not_view:
                sub_sel = selector.Selector.from_xpath(sub)
                if sub_sel.need_filter and not sub.startswith("//"):  # 有额外的信息进行定位, 且 sub 路径不是`//`开头, 可以尝试扩大搜索范围
                    for _sub_sel in iter_sel(sub_sel):
                        new_xpath = f"{xpath}/{_sub_sel.to_selector()}"
                        _els = tree.xpath(new_xpath)
                        if _els:
                            logger.warning(f"查找到一个可能的 xpath [{remote_virtual_root(new_xpath)}], 很有可能是因为页面在[{remote_virtual_root(xpath)}]后发生节点插入导致路径改变, 你可以确认一下元素是否属于你想定位的元素")
                            set_elements_selector(_els, selector.Selector.from_xpath(remote_virtual_root(new_xpath)))
                            return _els, new_xpath
                else:
                    logger.warning("未查找到非view的节点")
                    return like, xpath
            else:
                index = sub.find(not_view)
                sub = sub[index-1:]  # /notview/xxx
                nodes = xpath.split("/")
                for i in range(len(nodes)-1, -1, -1):  # 去掉 xpath尾部的view
                    if not nodes[i] or nodes[i].startswith("view"):
                        nodes.pop(i)
                    else:
                        break
                new_xpath = ("/".join(nodes) or "/") + "/" + sub
                if new_xpath != src_xpath:
                    new_sel = selector.Selector.from_xpath(new_xpath)
                    _like, _xpath = search_xpath(tree, new_sel)
                    if _like:
                        set_elements_selector(_like, selector.Selector.from_xpath(remote_virtual_root(_xpath)))
                        return _like, _xpath
    else:
        return els, xpath
    return like, xpath

def insert_custom_split(index, css_selector: 'cssselect.Selector', sel: 'selector.Selector') -> Tuple['selector.Selector', 'selector.Selector']:
    if index < 1:
        raise RuntimeError()
    cnt = 0
    current = css_selector.parsed_tree
    current_subselector = None
    current_combinator = None
    while isinstance(current, CombinedSelector):
        if current_subselector:
            current_subselector = CombinedSelector(current.subselector, current_combinator, current_subselector)
        else:
            current_combinator = current.combinator
            current_subselector = current.subselector
        current = current.selector
        cnt += 1
        if cnt == index:
            break
    subsel = current_subselector.canonical()
    if len(subsel) > 1:
        subsel = subsel.lstrip("*")
    cursel = current.canonical()
    if len(cursel) > 1:
        cursel = cursel.lstrip("*")
    p_sel = selector.Selector(sel)
    p_sel.css = cursel
    c_sel = selector.Selector(css=subsel)
    c_sel.parent = p_sel
    return p_sel, c_sel


def filter_text(els: List[MyElementClass], sel: 'selector.Selector') -> List[MyElementClass]:
    """过滤掉 text 节点"""
    if not sel.need_filter:
        return els
    def _filter_text(el: MyElementClass):
        if sel.text or sel.contains_text:
            text = (el.text or "").strip()
            if not text:
                child_els = el.cssselect("text")  # 子孙后代都会查找到, 如果只想获取子节点: get_child_els(el, "/text")
                for child_el in child_els:
                    text = (child_el.text or "").strip()
                    if text:
                        break
            if sel.text:
                return sel.text == text
            else:
                return sel.contains_text in text
        elif sel.val:
            return sel.val == el.get("value")
    return [el for el in els if _filter_text(el)]

def search_css(tree: 'MyElementClass', sel_list: List['selector.Selector'], auto_fix: AutoFix=AutoFix()) -> Tuple[List[MyElementClass], 'selector.Selector']:
    """通过 css selector 方式查找

    :params AutoFix auto_fix: 是否进行【纠错】
    :return Tuple[List[MyElementClass], 'selector.Selector']:
    """
    this_sel = _sel = sel_list[0]
    update_sel = None
    auto_fixed = False  # 尝试【自动修复】后，找到元素
    should_comp = len(sel_list) > 1  # 需要是自定义组件
    if tree.comp_name:  # 父节点是一个自定义组件
        _sel = selector.trans_selector(_sel, tree.class_prefix, tree.node_id)
    els: List[MyElementClass] = filter_text(tree.cssselect(_sel.to_selector()), _sel)
    if not els:
        # 没有找到元素, 尝试【纠错】
        s, c = selector.parse_selector(_sel)
        
        if c > 0:
            # 2. 自定义组件下的元素, 未使用 >>> 连接
            # 如[root > view .module .active view], 可以尝试[root > view .module .active >>> view]/[root > view .module >>> .active view]/...
            if auto_fix.CSS2:
                for i in range(c):
                    p_sel, c_sel = insert_custom_split(i+1, s, _sel)
                    rest = []
                    if len(sel_list) > 1:
                        rest = [selector.Selector(s) for s in sel_list[1:]]
                        rest[0].parent = c_sel
                    new_sel_list = [p_sel, c_sel, *rest]
                    _res, _update_sel, _ = search_css(tree, new_sel_list, auto_fix=AutoFix(CSS2=False, CSS3=False))
                    if _res:
                        return _res, _update_sel, True
        if c > 0 or this_sel.need_filter:  # 可能由于 text 的原因过滤掉了元素, 尝试使用该策略
            if auto_fix.CSS3:
                # 没有找到元素, 尝试【纠错】
                # 3. 使用 xpath 兜底, 除掉跨越自定义组件的干扰
                # 使用最原始的 sel 来转化
                xpath_sel = this_sel.to_custom_xpath_selector()
                # if xpath_sel.xpath.lstrip("/").startswith("root") and tree.tag == "root":  # 处理一下 root 的问题
                #     xpath_sel.xpath = "/".join(xpath_sel.xpath.lstrip("/").split("/")[1:])
                _res = get_child_els(tree, xpath_sel.to_selector())
                if not _res and xpath_sel.need_filter:
                    new_sel = append_text(xpath_sel)
                    _res = get_child_els(tree, new_sel.to_selector())
                    if _res:
                        xpath_sel = new_sel
                if _res:
                    for _el in _res:
                        css_sel = get_element_css_selector(tree, _el, css=_sel.to_selector())
                        logger.debug(css_sel.full_selector())
                        if search_css(tree, [css_sel, *sel_list[1:]], AutoFix(CSS1=False, CSS2=False, CSS3=False)):  # 能查找到的
                            _el.selector = css_sel
                    return _res, xpath_sel, True
        return els, None, False
    if len(sel_list) == 1:
        return els, _sel, False
    update_sel = _sel
    res = []
    maybe_child: Dict['selector.Selector', List] = {}
    for el in els:
        fill_custom_element_info(el)
        if should_comp and not el.comp_name:
            continue
        el.selector = _sel
        _sel.node_id = el.node_id or el.comp_name  # 填充一下以用作`full_selector`转化
        child_els, child_sel, is_auto_fixed = search_css(el, sel_list[1:])  # 这里返回的是否自动修复的元素
        if not child_els:
            # 没有找到元素, 尝试【纠错】
            # 1. 由于 <slot> 的使用, 导致 class 的前缀有问题, 特征: 元素在自定义组件中, 但前缀是父节点的(只往上溯源一层)
            if auto_fix.CSS1:
                copy_custom_element_info(tree, el)
                _child_els, _child_sel, _ = search_css(el, sel_list[1:])
                if _child_els:  # 【纠错】起作用了
                    logger.warning(f"选择器[{sel_list[1].to_selector()}]对应的元素可能属于[{_sel.parent.to_selector() if _sel.parent else 'root'}]")
                    if _sel.parent is None:
                        del _child_sel.parent
                    else:
                        _child_sel.parent = _sel.parent
                    if _child_sel in maybe_child:
                        maybe_child[_child_sel].extend(_child_els)
                    else:
                        maybe_child[_child_sel] = _child_els
        else:
            if is_auto_fixed:  # 子选择器中有通过【纠错】查询到的元素
                maybe_child[child_sel] = child_els
            else:
                res.extend(child_els)
                if child_sel:
                    update_sel = child_sel
    if not res:
        #  TODO 没有找到元素, 尝试【纠错】
        if maybe_child:  # 有通过纠错查询到的元素
            for _child_sel in maybe_child:
                res.extend(maybe_child[_child_sel])
                update_sel = _child_sel
                auto_fixed = True
    return res, update_sel, auto_fixed if res else False

def diff_xpath(xp1: str, xp2: str, offset_start1=0, offset_end1=None, offset_start2=0, offset_end2=None):
    """比较两个 xpath, 返回满足`xp1[0:idx1] == xp2[0:idx1]`和`xp1[0:idx1] == xp2[0:idx1]`的idx1 和 idx2"""
    if offset_end1 is not None:
        _xp1 = xp1[offset_start1:offset_end1]
    else:
        _xp1 = xp1[offset_start1:]
    if offset_end2 is not None:
        _xp2 = xp2[offset_start2:offset_end2]
    else:
        _xp2 = xp2[offset_start2:]

    if not _xp1 or not _xp2:
        return [], []
    def find_diff_index(s1, s2):
        p = 0
        while p < len(s1) and p < len(s2):
            if s1[p] != s2[p]:
                return p
            p += 1
        return p
    # 对比子串
    min_len = min(len(_xp1), len(_xp2))
    start = find_diff_index(_xp1, _xp2)
    if start == min_len and (len(_xp1) == len(_xp2) or (_xp2[start] if len(_xp2) > start else _xp1[start]) == "/"):
        pass
    else:
        start = _xp1[0:start].rfind("/") + 1
    end = find_diff_index(_xp1[-1::-1], _xp2[-1::-1])
    if end == min_len or end == 0:
        end = None
    else:
        end *= -1
        end = _xp1[end:].find("/") + end
        if end + min_len < start:  # 某个 xpath 已经遍历完了
            end = start - min_len
    res1 = []
    res2 = []
    res1.append([offset_start1, start+offset_start1])
    res1.append([offset_end1 if end is None else (end + (offset_end1 or 0)), offset_end1])
    res2.append([offset_start2, start+offset_start2])
    res2.append([offset_end2 if end is None else (end + (offset_end2 or 0)), offset_end2])
    # 搜索子串起始坐标
    def search_sub(s1: str, s2: str):
        l1 = s1.lstrip("/").split("/")
        l2 = s2.lstrip("/").split("/")
        ll1 = len(l1)
        ll2 = len(l2)
        if ll1 == ll2:
            if ll1 < 3:
                return len(s1), None, len(s2), None
            else:
                return s1[s1.find(l1[0]):].find("/"), s1.rfind(l1[-1]) - 1 - len(s1), s2[s2.find(l2[0]):].find("/"), s2.rfind(l2[-1]) - 1 - len(s2)
        change = False
        if len(l1) > len(l2):
            change = True
            tmp = l1
            l1 = l2
            l2 = tmp
        def search_res(l1: List[str], l2: List[str]):
            res = None
            while len(l1) > 0:
                for offset in range(len(l2) - len(l1) + 1):
                    l2j = offset
                    l1j = 0
                    while l1j < len(l1):
                        if l1[l1j] == l2[l2j]:
                            l1j += 1
                            l2j += 1
                        else:
                            break
                    if l1j > 1:  # 找到至少两个一样的 path就符合
                        return offset
                if res is not None:
                    break
                l1.pop(0)
            return res
        res = search_res(l1, l2)
        if res is not None:
            ss1 = s2 if change else s1
            ss2 = s1 if change else s2
            start1 = ss1.find("/".join(l1)) - 1
            start2 = ss2.find("/".join(l2[res:])) - 1
            l1.reverse()
            l2.reverse()
            res_end = search_res(l1, l2)
            l1.reverse()
            l2 = l2[res_end:]
            l2.reverse()
            match1 = "/".join(l1)
            match2 = "/".join(l2)
            end1 = ss1.rfind(match1) + len(match1) - len(ss1)
            end2 = ss2.rfind(match2) + len(match2) - len(ss2)
        else:
            return len(s1), None, len(s2), None  
            
        if change:
            return start2, end2, start1, end1
        return start1, end1, start2, end2

    s1, e1, s2, e2 = search_sub(_xp1[start: end], _xp2[start: end])
    _offset_start1 = s1 + start + offset_start1
    _offset_start2 = s2 + start + offset_start2
    _offset_end1 = None if e1 is None else (e1 + (end or 0) + (offset_end1 or 0))
    _offset_end2 = None if e2 is None else (e2 + (end or 0) + (offset_end2 or 0))
    # _offset_start1 = _xp1[start:].find("/") + start + offset_start1
    # _offset_start2 = _xp2[start:].find("/") + start + offset_start2
    # _offset_end1 = _xp1[0:end].rfind("/") - len(_xp1) + (offset_end1 or 0)
    # _offset_end2 = _xp2[0:end].rfind("/") - len(_xp2) + (offset_end2 or 0)
    _res1, _res2 = diff_xpath(xp1, xp2, _offset_start1, _offset_end1, _offset_start2, _offset_end2)
    res1.extend(_res1)
    res2.extend(_res2)
    res1.sort(key=lambda x: len(xp1) if x[0] is None else (x[0] if x[0] >= 0 else len(xp1) + x[0]))
    res2.sort(key=lambda x: len(xp2) if x[0] is None else (x[0] if x[0] >= 0 else len(xp2) + x[0]))
    return res1, res2

    x1 = xp1.split("/")
    x2 = xp2.split("/")
    idx1 = 0
    idx2 = -1
    for i in range(min(len(x1), len(x2))):
        # 从前往后, 看相同部分
        if x1[i] != x2[i]:
            break
        idx1 = i + 1
    for i in range(-1, min(len(x1), len(x2)) * -1 -1, -1):
        # 从后往前, 看相同部分
        if x1[i] != x2[i]:
            idx2 = i + 1
            break
    res1 = sum(len(x) for x in x1[0:idx1]) + idx1 + offset_start1
    res2 = (sum(len(x) for x in x1[idx2:]) - idx2) * -1 + offset_end1
    res1 = [res1, res2]
    if not (idx1 == 0 and idx2 == -1):  # 找到过, 递归看看子串是否还有相同部分
        idx1 += 1
        if idx1 <= min(len(x1), len(x2)) + idx2:
            _res = diff_xpath("/".join(x1[idx1:idx2]), "/".join(x2[idx1:idx2]), res1, res2)
            res1.extend(_res)
    return res1

def yellow(s, *poss):
    """给字符串指定区间标黄"""
    p = 0
    res = ""
    for start, end in poss:
        if start is None:
            start = len(s)
        if start < 0:
            start = len(s) + start
        if p > start:
            start = p
        res += s[p:start] + "\x1b[33m" + (s[start: end] if end is not None else s[start:]) + "\x1b[0m"
        p = len(s) if end is None else end
    return res

def format_rich_text(xml_content: str):
    rlp = []
    if xml_content.find("<rich-text") >= 0:
        p = 0
        while True:
            m = re.search(r"<rich-text.+?(nodes=\".+?\").+?</rich-text>", xml_content[p:])
            if m:
                src = m.group(0)
                nodes = m.group(1)
                rlp.append([src, src.replace(nodes, 'nodes="因无法格式化,隐藏当前内容"')])
                p += m.end()
            else:
                break
    for old, new in rlp:
        xml_content = xml_content.replace(old, new)
    return xml_content

def search(xml_or_tree: Union['etree._ElementTree', str, bytes], sel: 'selector.Selector') -> Tuple[bool, 'etree._ElementTree', 'selector.Selector', List['etree._Element'], str]:
    """
    查找元素可能的元素
    is_similar, root, sel, els, xpath
    :return bool is_similar: 是相似的元素(通过【纠错】修复的)
    :return etree._ElementTree root: 整个 xml 的根节点
    :return selector.Selector sel: 最终找到元素对应的 selector
    :return List['etree._Element'] els: 元素列表
    """
    if isinstance(xml_or_tree, bytes):
        xml_or_tree = xml_or_tree.decode("utf8")
    if isinstance(xml_or_tree, str):
        xml_or_tree = format_rich_text(xml_or_tree)
        parser = html.HTMLParser(encoding="utf8") # html.HTMLParser() # etree.XMLParser()
        setElementClassLookup = parser.setElementClassLookup if hasattr(parser, "setElementClassLookup") else parser.set_element_class_lookup
        setElementClassLookup(MyLookup())
        try:
            tree: 'etree._Element' = etree.XML(xml_or_tree.encode("utf8"), parser)
        except etree.XMLSyntaxError:
            tree = etree.fromstring('<root xmlns:wx="http://example.com/wx_namespace">' + xml_or_tree + '</root>', parser)
        root: 'etree._ElementTree' = etree.ElementTree(tree)
    else:
        tree = xml_or_tree.getroot()
        root: 'etree._ElementTree' = xml_or_tree
    is_xpath = sel.check_selector()[1]
    is_similar = False  # 找到的是否是【相似】元素
    xpath = None
    if is_xpath:
        xpath = ""
        virtual_root = False
        if tree.tag == "root" and not sel.xpath.startswith("//"):  # 虚拟的, 且 xpath 从跟节点开始搜索
            virtual_root = "/" + tree.tag
            sel = selector.Selector(xpath=f"{virtual_root}{sel.to_selector()}")
        if tree.tag == "html" and not sel.xpath.startswith("//"):  # 虚拟的, 且 xpath 从跟节点开始搜索
            virtual_root = "/html/body"
            sel = selector.Selector(xpath=f"{virtual_root}{sel.to_selector()}")
        src_xpath = sel.to_selector()
        sel = selector.Selector.from_xpath(src_xpath)
        els, xpath = search_xpath(tree, sel)
        if xpath != src_xpath:
            if els:  # 经过 fix 且能找到元素的 xpath
                is_similar = True
                sel = selector.Selector.from_xpath(xpath)
        if virtual_root and sel.xpath.startswith(virtual_root):
            sel.xpath = sel.xpath[len(virtual_root):]
    else:
        css = sel.full_selector()
        # sels = css.split(">>>")  # 自定义组件分割符号
        # parent = selector.Selector(css=sels[0])
        # sel_list = [parent]
        # for s in sels[1:]:
        #     child = selector.Selector(css=s, parent=parent)
        #     parent = child
        #     sel_list.append(child)
        sel_list = sel.to_selector_list()
        
        els, find_sel, auto_fixed = search_css(tree, sel_list)
        if not els and selector.parse_selector(sel)[1] == 0:
            # 只有一个选择器, 尝试加个 * 到最前面再 fix
            new_sel = selector.Selector(sel)
            new_sel.css = "* " + new_sel.css
            _els, _find_sel, _auto_fixed = search_css(tree, new_sel.to_selector_list())
            if _els:
                els, find_sel, auto_fixed, sel_list = _els, _find_sel, _auto_fixed, new_sel.to_selector_list()
        if not els and find_sel:
            logger.warning(f"没有找到[{css}]对应的元素, 只查找到 {find_sel.full_selector()}")
        elif not els:
            logger.warning(f"没有找到任何[{css}]对应的元素")
        elif auto_fixed:
            logger.warning(f"没有找到对应的元素 {css}, 但找到可能的元素{find_sel.full_selector()}")
            is_similar = True
            if find_sel.xpath:  # 转化成 xpath 了, 尝试转回 css
                find_css_sel = None
                for _el in iter(_el for _el in els if _el.selector):
                    if find_css_sel is None:
                        find_css_sel = _el.selector
                    elif find_css_sel.full_selector() != _el.selector.full_selector():
                        find_css_sel = None
                        break
                if find_css_sel is not None:
                    find_sel = find_css_sel
        if els and find_sel:
            sel = find_sel
    if els:
        for el in iter(el for el in els if getattr(el, "selector", None) is None):
            setattr(el, 'selector', sel)

    return is_similar, root, sel, els
        
def get_xml(el: 'etree._Element'):
    """获取一个元素的 xml 字符串"""
    return etree.tostring(el, encoding="utf8", pretty_print=True).decode("utf8").replace(' xmlns:wx="http://example.com/wx_namespace"', "")

def print_el(el: Union['etree._Element', MyElementClass], root: 'etree._ElementTree'):
    """打印元素信息"""
    s = ""
    if getattr(el, "selector", None):
        s += (f"element selector: {el.selector.full_selector()}\n")
    s += (f"\nelement path: {remote_virtual_root(get_path(root, el))}\nsourceline: {el.sourceline}\n{get_xml(el)}\n")
    logger.info(s)
    return s

def get_element_full_xpath(el: 'etree.ElementBase', root: 'etree._ElementTree', sel: 'selector.Selector'):
    full_xpath: str = root.getpath(el)
    if full_xpath.endswith("text[1]"):
        full_xpath = full_xpath[0: -3]
    if full_xpath.startswith("/root") and (not sel.xpath or not sel.xpath.startswith("/root")):
        full_xpath = full_xpath[5:]
    if full_xpath.startswith("/html/body") and (not sel.xpath or not sel.xpath.startswith("/html/body")):
        full_xpath = full_xpath[10:]
    return full_xpath

def log_xpath_diff(el: 'etree.ElementBase', root: 'etree._ElementTree', sel: 'selector.Selector'):
    if not sel.is_xpath:
        return ""
    full_xpath = get_element_full_xpath(el, root, sel)
    if full_xpath.split("/")[-1].startswith("text") and not sel.xpath.split("/")[-1].startswith("text"):
        new_sel = append_text(sel)
    else:
        new_sel = sel
    iddxs1, iddxs2 = diff_xpath(new_sel.xpath, full_xpath)
    s = ""
    s += (f'src xpath: {yellow(new_sel.xpath, *iddxs1)}\n')
    s += (f'new xpath: {yellow(full_xpath, *iddxs2)}, sourceline: {el.sourceline}\n')
    return s

def get_search_result_info(is_similar: bool, root: 'etree._ElementTree', find_sel: 'selector.Selector', els: 'etree.ElementBase', src_sel: 'selector.Selector'):
    """获取搜索结果的总结信息"""
    s = ""
    if find_sel.is_xpath:
        xpath = find_sel.to_selector()
        if is_similar:
            src_xpath = src_sel.to_selector()
            if els:
                s += (f"查找到可能符合的元素路径\n")
                for el in els:
                    # s += log_xpath_diff(el, root, src_sel)
                    s += print_el(el, root)
            elif xpath:
                s += (f"未查找到 [{src_xpath}], 但查找到以下路径 [{xpath}], 请检查页面元素层级是否改变, 如果页面元素层级改变, 请手动修改路径\n")
        elif els:
            s += (f"查找到你指定的xpath: [{src_sel.to_selector()}] elements\n")
            is_full_xpath = (src_sel.to_selector().find("//") == -1)  # 可能是 full xpath, 输出一下 diff 信息
            for el in els:
                # if is_full_xpath:
                    # s += log_xpath_diff(el, root, src_sel)
                s += print_el(el, root)
    elif els:
        if is_similar:
            s += (f"查找到可能符合的{len(els)}个元素路径{find_sel.full_selector()}\n")
        else:
            s += (f"查找到{len(els)}个元素\n")
        for el in els:
            s += print_el(el, root)
    return s


def log_search_result(is_similar: bool, root: 'etree._ElementTree', find_sel: 'selector.Selector', els: 'etree.ElementBase', src_sel: 'selector.Selector'):
    if find_sel.is_xpath:
        xpath = find_sel.to_selector()
        if is_similar:
            src_xpath = src_sel.to_selector()
            if els:
                logger.info("\n"+"-"*20)
                logger.info(f"查找到可能符合的元素路径")
                for el in els:
                    logger.info(log_xpath_diff(el, root, src_sel))
                    print_el(el, root)
            elif xpath:
                logger.warning(f"未查找到 [{src_xpath}], 但查找到以下路径 [{xpath}], 请检查页面元素层级是否改变, 如果页面元素层级改变, 请手动修改路径")
            else:
                logger.warning(f"未查找到 [{src_xpath}]")
        elif els:
            logger.info("\n"+"-"*20)
            logger.info(f"查找到你指定的xpath: [{src_sel.to_selector()}] elements")
            is_full_xpath = (src_sel.to_selector().find("//") == -1)  # 可能是 full xpath, 输出一下 diff 信息
            for el in els:
                if is_full_xpath:
                    logger.info(log_xpath_diff(el, root, src_sel))
                print_el(el, root)
        else:
            logger.warning("未查找任何符合的元素")
    else:
        if not els:
            logger.warning("未查找任何符合的元素")
            return
        logger.info("\n"+"-"*20)
        if is_similar:
            logger.info(f"查找到可能符合的{len(els)}个元素路径{find_sel.full_selector()}")
        else:
            logger.info(f"查找到{len(els)}个元素")
        for el in els:
            print_el(el, root)
    

def main():
    parsers = argparse.ArgumentParser()
    parsers.add_argument(
        dest="path",
        type=str,
        help="wxml file path",
        nargs=1
    )
    parsers.add_argument(
        dest="selector", type=str, help="selector or xpath", nargs=1
    )
    parsers.add_argument(
        "-t", "--text", dest="inner_text", type=str, default=None, help="inner_text"
    )
    parsers.add_argument(
        "-c", "--contains", dest="text_contains", type=str, default=None, help="text_contains"
    )
    parsers.add_argument(
        "-v", "--value", dest="value", type=str, default=None, help="value"
    )
    parsers.add_argument(
        "-i", "--index", dest="index", type=int, default=-1, help="index"
    )
    parsers.format_help()
    parser_args = parsers.parse_args()
    wxml_path = parser_args.path[0]
    selector_or_xpath: str = parser_args.selector[0]
    if not wxml_path or not selector_or_xpath:
        logger.error(f"缺少参数")
        exit(-1)
    with open(wxml_path, "r", encoding="utf8") as fd:
        xml_content = fd.read()
    src_sel = selector.Selector(css=selector_or_xpath, text=parser_args.inner_text, contains_text=parser_args.text_contains, val=parser_args.value, index=parser_args.index)
    is_similar, root, sel, els = search(xml_content, src_sel)
    log_search_result(is_similar, root, sel, els, src_sel)

if __name__ == "__main__":
    # iddxs1, iddxs2 = diff_xpath(new_sel.xpath, full_xpath)
    # logger.info(f'src xpath: {yellow(1new_sel.xpath, *iddxs1)}')
    # logger.info(f'new xpath: {yellow(full_xpath, *iddxs2)},
    wxml_path = "/Users/yopofeng/workspace/minium/minitest-demo/testcase/outputs/20240926170745/test_element_not_found_7/20240926171248640211/26171249.wxml"
    src_sel = selector.Selector(css='#test2')
    with open(wxml_path, "r", encoding="utf8") as fd:
        xml_content = fd.read()
    is_similar, root, sel, els = search(xml_content, src_sel)
    log_search_result(is_similar, root, sel, els, src_sel)