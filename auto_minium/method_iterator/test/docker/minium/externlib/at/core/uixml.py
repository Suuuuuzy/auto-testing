#!/usr/bin/env python
# encoding:utf-8
# created:16/8/15
import json
import functools

__author__ = 'xiazeng'

import traceback
import xml.etree.ElementTree as ET
import xml.dom.minidom
import xml.dom
import re
import logging
import html

import at.utils.decorator

logger = logging.getLogger()


def parse_int(i):
    return int(i)


def parse_boolean(b):
    if b == "true":
        return True
    else:
        return False


def parse_bounds(bounds):
    m = re.match(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", bounds)
    if m is None:
        return 0, 0, 0, 0
    return m.groups()


class ActivityProxy(object):
    def __init__(self, root_node, resgurad=None):
        self._document_node = root_node
        self._ui_views = [UiView(node, resgurad) for node in root_node.getElementsByTagName("node")]

    def find(self, **kwargs):
        for ui_view in self._ui_views:
            if ui_view.match(kwargs):
                return ui_view
        return None

    def find_all(self, **kwargs):
        ui_views = []
        for ui_view in self._ui_views:
            if ui_view.match(kwargs):
                ui_views.append(ui_view)
        return ui_views     # type: List[UiView]


class Rect(object):
    def __init__(self, x1, y1, x2, y2):
        self.left = x1
        self.top = y1
        self.right = x2
        self.bottom = y2
        self.center_x = (self.left + self.right) / 2
        self.center_y = (self.top + self.bottom) / 2
        self.width = self.right - self.left
        self.height = self.bottom - self.top

    def to_list(self):
        return [self.left, self.top, self.right, self.bottom]

    def contains(self, others):
        pass

    def __repr__(self):
        return "%d, %d, %d, %d" % (self.left, self.top, self.right, self.bottom)


class MOTION_EVENT:
    CLICK = 1
    LONG_CLICK = 2
    DOUBLE_CLICK = 3
    SCROLL_CLICK = 4
    SCROLL_DOWN = 5
    SCROLL_UP = 6
    SCROLL_LEFT = 7
    SCROLL_RIGHT = 8
    INPUT = 9


class BaseView(object):
    """
    控件的抽象
    """
    def get_rect(self):
        raise RuntimeError(u"Not Implementation")

    def surrport_action_ids(self):
        raise RuntimeError(u"Not Implementation")

    def perform(self):
        pass


class UiView(BaseView):
    def __init__(self, node: xml.dom.minidom.Element, resgurad=None):
        self._node = node
        self._node.ui_view = self  # 使得 node 可以得到 uiview 对象
        self.index = parse_int(self.g("index"))
        self.rg = resgurad
        self.raw_id = self.g("resource-id")
        if resgurad is not None:
            self.rid = resgurad.retrace_id(self.g("resource-id"))
        else:
            self.rid = self.g("resource-id")
        self.text = self.g("text")
        self.cls_name = self.g("class")
        self.package = self.g("package")
        self.content_desc = self.g("content-desc")
        self.display_id = self.g("display", None)
        self.checkable = parse_boolean(self.g("checkable"))
        self.checked = parse_boolean(self.g("checked"))
        self.clickable = parse_boolean(self.g("clickable"))
        self.enabled = parse_boolean(self.g("enabled"))
        self.focusable = parse_boolean(self.g("focusable"))
        self.focused = parse_boolean(self.g("focused"))
        self.scrollable = parse_boolean(self.g("scrollable"))
        self.long_clickable = parse_boolean(self.g("long-clickable"))
        self.password = self.g("password")
        self.selected = self.g("selected")
        self.bound_raw = self.g("bounds")
        self.bounds = parse_bounds(self.bound_raw)
        self.x1 = max(parse_int(self.bounds[0]), 0)
        self.y1 = max(parse_int(self.bounds[1]), 0)
        self.x2 = max(parse_int(self.bounds[2]), self.x1)
        self.y2 = max(parse_int(self.bounds[3]), self.y1)
        self.center_x = int((self.x1 + self.x2) / 2)
        self.center_y = int((self.y1 + self.y2) / 2)
        self.width = self.x2 - self.x1
        self.height = self.y2 - self.y1
        self.size = self.width * self.height
        self._cache = {}

    @classmethod
    def from_json(cls, json_data):
        pass

    def surrport_action_ids(self):
        action_ids = []
        if self.clickable:  action_ids.append(MOTION_EVENT.CLICK)
        if self.long_clickable: action_ids.append(MOTION_EVENT.LONG_CLICK)
        return action_ids

    def get_rect(self):
        return Rect(self.x1, self.y1, self.x2, self.y2)

    def group_name(self):
        """
        用于分组的标识
        """
        return u", ".join(
            [u"package=" + self.package, u"class=" + self.cls_name, u"resource-id=" + self.rid, u"text=" + self.text,
             u"content-desc=" + self.content_desc, u"size=%d" % self.size])

    @property
    def parent(self):
        parent_node = self._node.parentNode
        try:
            return parent_node.ui_view
        except:
            return None

    # @functools.lru_cache(1024)
    def get_xpath(self, ignore_text=False, ignore_index=False):
        """获取xpath
        /div[@id='id-74385'][@class='guest clearfix']
        """
        cache_key = f"ignore_text={ignore_text},ignore_index={ignore_index}"
        if cache_key in self._cache:
            return self._cache[cache_key]
        parent = self
        xpath = ""
        while parent:
            current_path = f"/{parent._node.tagName}"
            attr = {
                'class': parent.cls_name,
                'enabled': parent.enabled
            }
            if not ignore_index:
                current_path += f'[{parent.index}]'

            if not ignore_text and parent.text:
                attr['text'] = parent.text
            if parent.content_desc:
                attr['content-desc'] = parent.content_desc
            if parent.rid:
                attr['resource-id'] = parent.rid
            for key, value in attr.items():
                current_path += f"[@{key}='{value}']"
            xpath = current_path + xpath
            parent = parent.parent
        self._cache[cache_key] = xpath
        return xpath

    def get_equivalence_views(self):
        """
        获取中心点一样的节点列表，对这些元素进行点击的效果是一样的
        :return: 返回parent列表和child列表，两个列表都是按照亲疏关系排序
        """
        eq_parents = []
        eq_children = []
        parent = self.parent
        while parent:
            if parent.size == self.size and parent.center_x == self.center_x and self.center_y == parent.center_y:
                logger.debug("+parent:%s", parent)
                eq_parents.insert(0, parent)
                parent = parent.parent
            else:
                break

        for child_view in self.get_descendants():
            if child_view != self and child_view.center_x == self.center_x and child_view.center_y == self.center_y:
                logger.debug("+child:%s", child_view)
                eq_children.append(child_view)
        return eq_parents, eq_children

    def get_ancestors(self):
        views = []
        parent = self.parent
        while parent:
            views.append(parent)
            parent = parent.parent
        return views

    def is_leaf(self):
        return not self._node.hasChildNodes()

    def get_children(self):
        return [UiView(child_node, self.rg) for child_node in self._node.childNodes if
                child_node.nodeType == xml.dom.Node.ELEMENT_NODE]

    def get_descendants(self):
        views = [self, ]
        for view in self.get_children():
            views += view.get_descendants()
        return views

    def first_text(self):
        if self.all_texts():
            return self.all_texts()[0]
        return ""

    def all_texts(self):
        return [v.text for v in self.get_descendants() if v.text]

    def find(self, **kwargs):
        if self.match(kwargs):
            return self
        for view in self.get_children():
            ret = view.find(**kwargs)
            if ret:
                return ret
        return None

    def sibling(self, **kwargs):
        if self.parent:
            for ui_view in self.parent.get_children():
                if ui_view != self and ui_view.match(kwargs):
                    return ui_view
        return None

    def __eq__(self, obj):
        if obj is None or not isinstance(obj, UiView):
            return False
        ret = self.index == obj.index and \
            self.cls_name == obj.cls_name and \
            self.x1 == obj.x1 and\
            self.y1 == obj.y1 and \
            self.x2 == obj.x2 and \
            self.y2 == obj.y2 and \
            self.rid == obj.rid and \
            self.content_desc == obj.content_desc and \
            (self.text == obj.text if self.cls_name.endswith(".EditText") else True)
        return ret

    def __ne__(self, other):
        if self == other:
            return False
        return True

    def __hash__(self):
        return hash(self.__repr__())

    def unique_key(self):
        return self._node.toxml()

    def contains(self, view):
        if self == view:
            return False
        if view is None:
            return False
        if view.x1 == self.x1 and view.y1 == self.y1:
            if self.x2 == view.x2 and self.y2 == view.y2:
                return False

        if self.x2 >= view.x1 >= self.x1 and self.y2 >= view.y1 >= self.y1:
            if self.x2 >= view.x2 >= self.x1 and self.y2 >= view.y2 >= self.y1:
                return True
        return False

    def match(self, selector):
        if selector is None:
            return True
        if not isinstance(selector, dict):
            logger.error("selector not dict, is %s" % type(selector))
            return False
        for key, value in selector.items():
            if key == "rid":
                value = value.split("/")[-1]
            if not value:
                if getattr(self, key):
                    break
            elif isinstance(value, int):
                if value != getattr(self, key, -1):
                    break
            elif value not in getattr(self, key, ""):
                break
        else:
            return True
        return False

    def g(self, attr, default_value=None):
        try:
            value = self._node.getAttribute(attr)
        except:
            return default_value
        if isinstance(value, str):
            value = value.strip()
        return value

    def to_dict(self):
        return {
            "rid": self.rid,
            "resource-id": self.rid,
            "index": self.index,
            "class": self.cls_name,
            "text": self.text,
            "enabled": self.enabled,
            "package": self.package,
            "content-desc": self.content_desc,
            "clickable": self.clickable,
            "long_clickable": self.long_clickable,
            "scrollable": self.scrollable,
            "checked": self.checked,
            "rect": self.get_rect().to_list(),
            # "id": hash(self)
        }

    def dump_to_jsons(self):
        current_node = self.to_dict()
        current_node['nodes'] = []
        for child_node in self.get_children():
            current_node['nodes'].append(child_node.dump_to_jsons())
        return current_node

    def dump_to_json(self, filename):
        """
        转换成json文件，包含孩子节点
        :param filename:
        :return:
        """
        json_data = self.dump_to_jsons()
        with open(filename, "w") as f:
            json.dump(json_data, f)

    def __repr__(self):
        return ",".join([self.cls_name, self.content_desc, self.rid, self.package, self.first_text()])

    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, d):
        self.__dict__.update(d)

    def __str__(self):
        return u", ".join([u"package=" + self.package, u"class=" + self.cls_name, u"enabled=%s" % self.enabled,
                           u"resource-id=" + self.rid, u"text=" + self.text, u"content-desc=" + self.content_desc,
                           u"checked=%s" % self.checked, u"bounds=" + self.bound_raw, u"index=%s" % self.index])


def ui_views_contains_texts(ui_views, *texts):
    text_dict = dict((text, 0) for text in texts)
    for ui_view in ui_views:
        for text in text_dict:
            if text in ui_view.text:
                text_dict[text] = 1
    for k, v in text_dict.items():
        if v == 0:
            return False
    return True


def ui_views_match(ui_views, *sub_views):
    """
    todo: 重构
    :param ui_views: 
    :param sub_views: 
    :return: 
    """
    sub_set_views = set(sub_views)
    for ui_view in ui_views:
        for sub_view in sub_views:
            if sub_view in sub_set_views:
                sub_set_views.remove(sub_view)
    if sub_set_views:
        return False
    return True


def view_filter(views, selector):
    result_views = []
    for view in views:
        if view.match(selector):
            result_views.append(view)
    return result_views


def get_view(views, selector, instance=0):
    hit_views = get_views(views, selector)
    if len(hit_views) <= abs(instance):
        return None
    return hit_views[instance]  # type: UiView


def get_views(views, selector):
    rets = []
    try:
        iter(views)
    except TypeError:
        logger.info("not iterable")
    else:
        for view in views:
            if view.match(selector):
                rets.append(view)
    return rets


def get_view_parents(views, target):
    result_views = []
    for view in views:
        if view.contains(target):
            result_views.append(view)
    return result_views


def get_child(views, target, selector, instance=0):
    rets = get_children(views, target, selector)
    if len(rets) > abs(instance):
        return rets[instance]
    return None


def get_children(views, target, selector):
    rets = []
    for view in views:
        if target.contains(view):
            if view.match(selector):
                rets.append(view)
    return rets


def window_dump_parse(filename):
    dom = xml.dom.minidom.parse(filename)
    root = dom.documentElement
    nodes = root.getElementsByTagName("node")
    return [UiView(child) for child in nodes]


def remove_kinda_window(xml_content):
    """
    支付界面XML有很多kinda_main_container，只保留最后一个，其他的删除
    """
    tree = ET.fromstring(xml_content)
    kinda_list = []
    for parent in tree.iter("*"):
        for child in parent:
            rid = child.attrib.get('resource-id')
            if rid == 'com.tencent.mm:id/kinda_main_container':
                kinda_list.append((child, parent))
                logger.debug(child.attrib)
                break
    if len(kinda_list) > 1:
        for kind, parent in kinda_list[:-1]:
            parent.remove(kind)
    return ET.tostring(tree, 'utf-8').decode('utf-8')


def window_dump_parse_str(xml_content, resgurad=None):
    "根据XML实例化成View对象，平铺返回"
    nodes = []
    try:
        xml_content = xml_content.encode("utf-8")
        xml_content = remove_kinda_window(xml_content)
        dom = xml.dom.minidom.parseString(xml_content)  # 这里有可能出错, 因为传入的s有问题
        root = dom.documentElement
        nodes = root.getElementsByTagName("node")
    except Exception:
        logger.error(xml_content)
        logger.exception("parse xml failed")
    return [UiView(child, resgurad) for child in nodes]


def json_to_xml_content(node, root=None):
    if root is None:
        root = ET.fromstring(f"""
        <hierarchy rotation="0">
        </hierarchy>
        """)
    rect = node['rect']
    if isinstance(rect, list):
        bounds = f"[{rect[0]},{rect[1]}][{rect[2]},{rect[3]}]"
    elif isinstance(rect, dict):
        bounds = f"[{rect['x']},{rect['y']}][{rect['x'] + rect['w']},{rect['y'] + rect['h']}]"
    text = html.escape(node['text'])
    desc = html.escape(node['content-desc'])
    elem = ET.fromstring(f"""
        <node index="{node['index']}" text="{text}" class="{node['class']}" package="{node['package']}" content-desc="{desc}"
          checkable="false" checked="false" clickable="false" enabled="true" focusable="false" focused="false"
          scrollable="false" long-clickable="false" password="false" selected="false" bounds="{bounds}"
          resource-id="{node['resource-id']}"></node>
        """)
    root.append(elem)
    for sub_node in node.get('nodes', list()):
        json_to_xml_content(sub_node, elem)

    xml_content = ET.tostring(root, 'unicode')
    return xml_content


def json_2_ui_views(node):
    xml_content = json_to_xml_content(node)
    return window_dump_parse_str(xml_content)


def window_dump_2_activity_proxy(xml_content, resgurad=None):
    try:
        xml_content = xml_content.encode("utf-8")
        xml_content = remove_kinda_window(xml_content)
        dom = xml.dom.minidom.parseString(xml_content)  # 这里有可能出错, 因为传入的s有问题
        root_node = dom.documentElement
        return ActivityProxy(root_node, resgurad)
    except Exception:
        logger.exception("parse xml failed")
    return None


def ui_views_same_rate(ui_views, other_views):
    if not other_views or not ui_views:
        return 0
    eq_num = 0
    for v in ui_views:
        for other_view in other_views:
            if other_view == v:
                eq_num += 1
                break
    return eq_num * 1.0 / len(other_views) if other_views else 0


def find_ui_view_by_element(ui_views, elem):
    for ui_view in ui_views:
        if elem.match_ui_view(ui_view):
            return ui_view
    return None


if __name__ == '__main__':
    vs = window_dump_parse("window_dump.xml")
    import pickle

    pickle.dump(vs, open('test.pickle', 'w'), 2)
    ss = pickle.load(open('test.pickle', 'rb'))
    print(1)
    # pickle.dump(vs, open('test.pickle', 'w'), 2)
