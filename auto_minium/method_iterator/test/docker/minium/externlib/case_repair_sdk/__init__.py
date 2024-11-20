# -*- coding: utf-8 -*-
#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2020/9/21
Description:    

"""
import hashlib
import inspect
import json
import logging
import os.path
import uuid
import typing

import requests
from case_repair_sdk import default_trace

logger = logging.getLogger()

G_SERVER_HOST = "http://api.mt.woa.com/epuiat/"
if os.getenv("UIAT_HOST"):
    G_SERVER_HOST = os.getenv("UIAT_HOST")

DEBUG = True


def set_debug():
    global DEBUG, G_SERVER_HOST
    DEBUG = True
    G_SERVER_HOST = "http://9.134.52.250:30006/"


class RepairError(Exception):
    pass


class RecordError(Exception):
    pass


class LocatorNotFound(RecordError):
    pass


class RestartError(RepairError):
    pass


class ExitError(RepairError):
    pass


class CheckError(RepairError):
    pass


class InternalError(RepairError):
    pass


class RepairAction:
    CLICK = "click"
    LONG_CLICK = "long_click"
    RESTART = "restart"
    EXIT = "exit"


def check_response_data(r):
    if r.status_code != 200:
        logger.error(r.text)
    r.raise_for_status()
    # logger.debug(r.text.encode('utf-8'))
    res = json.loads(r.text)
    if res["rtn"] != 0:
        logger.error(r.text.encode('utf-8'))
        raise InternalError(res.get('reason') or res.get('msg'))
    repair_action = res.get("repair_action")
    if repair_action == RepairAction.EXIT:
        raise ExitError()
    elif repair_action == RepairAction.RESTART:
        raise RestartError()
    return res


class CaseRepairSdK:
    def __init__(self, test_id, app_id):
        self.test_id = test_id
        self.app_id = app_id
        self.trace_cache = dict()
        self._enable_trace_line = False
        self._cb_get_trace_data: typing.Callable[[bool, dict], typing.Tuple[str, dict]] = default_trace.get_trace_data
        self._cb_get_statement: typing.Callable[[], str] = default_trace.get_statement

    def set_get_trace_data_callback(self, cb: typing.Callable[[bool, dict], typing.Tuple[str, dict]]):
        """
        自定义获取trace
        :param cb:获取trace的回调函数
        :return:
        """
        self._cb_get_trace_data = cb

    def set_get_statement(self, cb: typing.Callable[[], str]):
        self._cb_get_statement = db

    def config_enable_trace_line(self, enabled):
        """计算trace_id是否计算行号"""
        self._enable_trace_line = enabled

    def _request(self, method, path, params=None, data=None, **kwargs):
        if params is None:
            params = {}
        params.update({
            "test_id": self.test_id,
            "app_id": self.app_id
        })
        session = requests.session()
        # session.trust_env = False
        url = G_SERVER_HOST + path
        logger.info("%s, params:%s", url, params)
        if DEBUG:
            json.dump({
                "url": url,
                "params": params,
                "data": data,
                "method": method
            }, open("debug_request.json", "w"))
        if method == 'post':
            http_res = session.post(url, params=params, data=data, **kwargs)
        else:
            http_res = session.get(url, params=params, **kwargs)
        session.close()
        logger.debug("%s, status:%s, text:%s", url, http_res.status_code, http_res.text)
        return check_response_data(http_res)

    def _get(self, path, params=None, **kwargs):
        return self._request('get', path, params, **kwargs)

    def _post(self, path, params=None, data=None, **kwargs):
        return self._request('post', path, params, data, **kwargs)

    def remove_test_data(self):
        """删除服务器上的数据"""
        self._get("repair/remove_test_data", params={"test_id": self.test_id})

    def generate_seq_id(self):
        return str(uuid.uuid4())

    def update_ui_seq(self, seq_id, seq_info):
        """
        录制模式/修复模式都需要调用。更新用例结果
        """
        seq_info['seq_id'] = seq_id
        seq_info['test_id'] = self.test_id
        return self._post("repair/update_ui_seq", data=json.dumps(seq_info))

    def upload_test_step(self, seq_name, page_name, seq_id, before_xml, after_xml, before_img_base64,
                         after_img_base64, operation, after_page_name=None, trace_id=None, traces=None):
        """
        录制模式调用。上传用例的UI操作（如单击，输入，长按等）的前后信息
        :param seq_name: 用例的独一无二的名称
        :param page_name: 当前界面页面的名称，Android推荐用activity的名称
        :param seq_id: 用例的唯一ID
        :param before_xml: UI操作之前的xml
        :param after_xml: UI操作之后的xml
        :param before_img_base64: UI操作之前的图片
        :param after_img_base64: UI操作之后的图片
        :param operation: 具体的执行动作，格式:
            {
                "action": "xxx",
                "args": [],
                "kwargs": {},
                "widget": {
                    "y": 1256,
                    "x": 541,
                    "w": 431,
                    "h": 151
                }
            }
        :param trace_id: 保证每个UI操作唯一，默认根据函数调用关系计算出hash值
        :param traces:
        :return:
        """
        if not trace_id:
            trace_id, trace = self._cb_get_trace_data(self._enable_trace_line, self.trace_cache)
        data = {
            "trace": trace,
            "before_xml": before_xml,
            "after_xml": after_xml,
            "before_img": before_img_base64,
            "after_img": after_img_base64,
            "operation": operation,
            "after_page_name": after_page_name,
            "statement": self._cb_get_statement()
        }
        params = {
            "test_id": self.test_id,
            "seq_name": seq_name,
            "page_name": page_name,
            "trace_id": trace_id,
            "seq_id": seq_id
        }
        return self._post("repair/save_test_step", params, json.dumps(data))

    def obtain_candidate(self, seq_name, page_name, seq_id, before_xml, before_img_base64, operation, trace_id=None,
                         trace=None):
        if not trace_id:
            trace_id, trace = self._cb_get_trace_data(self._enable_trace_line, self.trace_cache)
        params = {
            "test_id": self.test_id,
            "seq_name": seq_name,
            "page_name": page_name,
            "trace_id": trace_id,
            "seq_id": seq_id,
        }

        data = {
            "trace": trace,
            "before_xml": before_xml,
            "before_img": before_img_base64,
            "operation": operation,
            "statement": self._cb_get_statement()
        }
        res = self._post("repair/obtain_candidate", params, json.dumps(data))

        return res, trace_id

    def check_repair(self, seq_name, page_name, seq_id, after_xml, after_img_base64, trace_id, operation):
        """检查修复之后的结果"""
        params = {
            "test_id": self.test_id,
            "seq_name": seq_name,
            "page_name": page_name,
            "trace_id": trace_id,
            "seq_id": seq_id
        }

        data = {
            "operation": operation,
            "after_xml": after_xml,
            "after_img": after_img_base64
        }

        res = self._post("repair/check_repair", params, data=json.dumps(data))
        return res

    def start_repair_test(self, test_id, test_info):
        """开始测试的时候"""
        self._post("repair/start_repair_test", params={'test_id': test_id}, data=json.dumps(test_info))
