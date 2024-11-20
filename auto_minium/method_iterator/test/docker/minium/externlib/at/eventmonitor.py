# -*- coding: utf-8 -*-
"""
@author: 'xiazeng'
@created: 2017/5/3 
"""
import json

from .core import element
from .core import javadriver

try:
    from urllib import unquote
except ImportError:
    from urllib.parse import unquote

g_event_index = 0


class EventMonitor(object):
    def __init__(self, jd):
        self.jd = jd  # type: javadriver.JavaDriver

    def add_event_click(self, match_element, action_element):
        self.add_selector_filter(None, match_element, action_element)

    def add_selector_filter(self, name, match_element, action_element):
        """
        用于处理弹框提示，在match_element出现的时候对action_element进行点击，name是个可以
        :type name: str
        :type match_element: element.Element
        :type action_element: element.Element
        """
        if name is None:
            global g_event_index
            g_event_index += 1
            name = f"EventMonitor_{g_event_index}"
        params = {
            "MatchSelector": unquote(json.dumps(match_element._selector)),
            "ActionSelector": unquote(json.dumps(action_element._selector)),
            "name": name
        }
        self.jd.add_request_when_reconnect('AddEventMonitor', http_params=params)
        self.jd.do_request("AddEventMonitor", params)

    def sync_event(self):
        self.jd.do_request("syncEventMonitor", {})

    def clear(self):
        self.jd.do_request("clearEventMonitor", {})

    def action_when_screen(self, true_or_false):
        self.jd.do_request("setEventMonitorShouldScreen", {"should": true_or_false})

    def get_all_screen(self):
        return self.jd.do_request("getMonitorScreen", {})

    def clear_all_screen(self):
        return self.jd.do_request("clearMonitorScreen", {})

    def remove_selector_filter(self, name):
        params = {
            "name": name
        }
        self.jd.do_request("removeEventMonitor", params)

    def importPath(self, str):
        params = {
            "name": str
        }
        self.jd.do_request("importPath", params)

    def on_off(self, on):
        params = {
            "name": on
        }
        self.jd.do_request("on_off", params)