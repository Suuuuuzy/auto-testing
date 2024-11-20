# -*-coding: utf-8 -*-
'''
Author: gavinggu gavinggu@tencent.com
Date: 2023-09-04 11:07:50
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-10-18 10:41:34
FilePath: /py-minium/minium/miniprogram/h5tools/client.py
Description: h5 通信模块
'''
import logging
import json
from websockets.sync.client import connect
from wechat_mp_inspector import AndroidConfig, AndroidDriver


logger = logging.getLogger("minium")


class CDPClient:

    _request_id = 0

    def __init__(self, websocket_debug_url):
        self.websocket_debug_url = websocket_debug_url
        self.websocket = None

    def _send(self, message):
        self.websocket.send(json.dumps(message))

    def _receive(self):
        return json.loads(self.websocket.recv())

    def connect(self):
        self.websocket = connect(self.websocket_debug_url)

    def send_command(self, method, params=None):
        type(self)._request_id += 1
        message = {
            'id': type(self)._request_id,
            'method': method,
            'params': params or {},
        }
        self._send(message)

        while True:
            response_data = self._receive()
            if 'id' in response_data and response_data['id'] == type(self)._request_id:
                return response_data

    def disconnect(self):
        if self.websocket:
            self.websocket.close()


# new client
class AndroidClient:
    CACHE = {}
    driver: AndroidDriver = None

    def __init__(self, config: dict) -> None:
        self.inspector = None
        self.page = None
        key = f"{config.device['serial']}-{config.appid}" if config.appid else f"{config.device['serial']}"
        if key in AndroidClient.CACHE:
            self.driver = AndroidClient.CACHE[key]
        else:
            self.driver = AndroidDriver(AndroidConfig(config.device, logger_level=logging.DEBUG))
            AndroidClient.CACHE[key] = self.driver

    def inspect(self, debugger_url: str, enable_list=[]):
        pages = self.driver.get_pages()
        for page in pages:
            if page.webSocketDebuggerUrl.split("/")[-1] == debugger_url.split("/")[-1]:
                self.page = page
                break
        if not self.page:
            logger.warning(f"driver无法获取 {debugger_url} 的page实例")
            raise RuntimeError(f"driver无法获取 {debugger_url} 的page实例")
        inspector = self.driver.inspector_session(self.page)
        for e in enable_list:
            inspector.send_command(e)
        return inspector


class Sock:

    def __init__(self, url):
        self._url = url
        self._req_id = 0
        self.logger = logger

    def async_request_cdp(self, sendStr):
        "不阻塞异步执行, 不需要返回数据"
        with connect(self._url) as websocket:
            websocket.send(self._set_req_id(sendStr))

    def sync_request_cdp(self, sendStr):
        "阻塞直到获取返回数据, 或者超时报错"
        with connect(self._url) as websocket:
            send_message = self._set_req_id(sendStr)
            websocket.send(send_message)
            rec_message = websocket.recv(timeout=20)
            return json.loads(rec_message)

    def _set_req_id(self, params):
        "添加请求websocket请求id"
        self._req_id += 1
        if isinstance(params, dict):
            params["id"] = self._req_id
            params = json.dumps(params, ensure_ascii=False)
        elif isinstance(params, str):
            try:
                self.logger.info(f"未带id的协议参数{params}")
                params_dict = json.loads(params)
                params_dict["id"] = self._req_id
                params = json.dumps(params_dict, ensure_ascii=False)
            except json.JSONDecodeError:
                self.logger.error(f"Invalid JSON string: {params}")
        else:
            self.logger.info(f"Unsupported params type: {type(params)}")
            return None
        return params