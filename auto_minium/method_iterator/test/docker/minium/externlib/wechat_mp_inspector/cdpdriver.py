"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-06-06 17:07:54
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-09 17:25:55
FilePath: /at/at/webdriver/weapp/cdpdriver.py
Description: 根据cdp实现driver
"""
import json
from .basewebsocket import (
    BaseWebSocket,
    BaseEvent,
    Command,
    AsyncCommand,
)
from .utils import Callback, cost_debug
from .emitter import ee


class CDPWebSocket(BaseWebSocket):
    def __new__(
        cls, debugger_url, *args, unique_id=None, auto_reconnect=False, **kwargs
    ):
        # 默认不重连
        return super().__new__(
            cls,
            debugger_url,
            *args,
            unique_id=unique_id,
            auto_reconnect=auto_reconnect,
            **kwargs
        )

    def __init__(
        self, debugger_url, *args, unique_id=None, auto_reconnect=True, **kwargs
    ) -> None:
        super().__init__(
            debugger_url,
            *args,
            unique_id=unique_id,
            auto_reconnect=auto_reconnect,
            **kwargs
        )
        self.ignore_method = set()

    def _handle_response(self, ret_json):
        """处理返回信息
        默认cdp格式为例, `exceptionDetails` if error

        :param Object ret_json: 消息体
        :return ID or None(not response), dict or Exception: ID, 返回的消息体 / 报错
        """
        req_id = None
        if "id" in ret_json:  # response
            req_id = ret_json["id"]
            if "error" in ret_json:
                err_msg = ret_json["error"].get("message", "")
                return req_id, Exception(err_msg)
            if "exceptionDetails" in ret_json.get("result", {}):  # error
                self.logger.error(json.dumps(ret_json.result.exceptionDetails, indent=2))
                self.logger.error(ret_json.result.exceptionDetails.exception.description)
                return req_id, Exception(ret_json.result.exceptionDetails.exception.description)
        return req_id, ret_json.get("result", {})

    def _handle_event(self, ret_json):
        """处理通知事件
        默认x5事件通知格式

        :param Object ret_json: 消息体
        :return None or BaseEvent: 事件
        """
        if "method" in ret_json and "params" in ret_json:
            method = ret_json["method"]
            if method in self.ignore_method:
                return
            return BaseEvent(method, ret_json["params"])
        return None

    def send_cdp_command(self, domain, command, params=None, timeout=None, **kwargs):
        if params is None:
            params = {}
        params.update(kwargs)
        return self.send("%s.%s" % (domain, command), params, max_timeout=timeout)

    def send_cdp_command_async(
        self, domain, command, params=None, ignore=None, **kwargs
    ):
        if params is None:
            params = {}
        params.update(kwargs)
        return self.send_async(
            "%s.%s" % (domain, command), params, ignore_response=ignore
        )


class Runtime(object):
    TMP = set()
    def __init__(self, ws: CDPWebSocket, ) -> None:
        self.ws = ws
        if id(ws) not in Runtime.TMP:
            self._test_pong()
            Runtime.TMP.add(id(ws))

    def run_method(self, method, params=None, timeout=None):
        return self.ws.send_cdp_command("Runtime", method, params, timeout)

    def run_method_async(self, method, params=None, ignore=False):
        return self.ws.send_cdp_command_async("Runtime", method, params, ignore)

    def _test_pong(self):
        """5s一次来自inpector的pong信息"""
        _id = self.run_method_async("addBinding", {"name": "test_pong"})
        ee.once(_id, lambda *args: self.run_method_async("evaluate", {"expression": """setInterval(function(){typeof test_pong !== "undefined" && test_pong(new Date().toString().slice(0, 24))}, 5000)"""}))

    def add_binding(self, name):
        return self.run_method("addBinding", {"name": name})

    def on(self, event, callback: Callback = None) -> Callback:
        if callback is None:
            _callback = Callback()
        elif isinstance(callback, Callback):
            _callback = callback
        else:
            _callback = Callback(callback)
        self.ws.on("Runtime." + event, _callback.callback)
        return _callback

    def discard_console(self):
        """
        Runtime.discardConsoleEntries
        异步即可
        """
        self.ws.ignore_method.add("Runtime.consoleAPICalled")
        return self.run_method_async("discardConsoleEntries", ignore=True)

    def disable(self):
        """Runtime.disable"""
        return self.run_method("disable")

    def enable(self):
        """Runtime.enable"""
        return self.run_method("enable")

    @cost_debug(5)
    def evaluate(
        self,
        expression: str,
        context_id=None,
        unique_context_id=None,
        timeout=None,
        return_by_value=True,
        **kwargs
    ):
        # {"expression": script, "includeCommandLineAPI": True}
        params = {"expression": expression, "includeCommandLineAPI": True}
        if unique_context_id:
            params.update({"uniqueContextId": unique_context_id})
        elif context_id:
            params.update(
                {
                    "contextId": context_id,
                }
            )
        if return_by_value:
            params.update({"returnByValue": return_by_value})
        params.update(kwargs)
        return self.run_method("evaluate", params, timeout).result.value

    def callFunction(
        self,
        functionDeclaration,
        arguments=None,
        context_id=None,
        unique_context_id=None,
        timeout=None,
        return_by_value=True,
        **kwargs
    ):
        params = {"functionDeclaration": functionDeclaration}
        if arguments:
            params["arguments"] = arguments
        if unique_context_id:
            params.update({"uniqueContextId": unique_context_id})
        elif context_id:
            params.update(
                {
                    "contextId": context_id,
                }
            )
        if return_by_value:
            params.update({"returnByValue": return_by_value})
        params.update(kwargs)
        return self.run_method("callFunctionOn", params, timeout).result.value
