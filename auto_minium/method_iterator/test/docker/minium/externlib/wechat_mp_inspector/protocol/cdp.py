'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-11 19:39:54
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:46:08
FilePath: /wechat-mp-inspector/wechat_mp_inspector/protocol/cdp.py
Description: 定义Chrome DevTools协议: https://chromedevtools.github.io/devtools-protocol/
'''
import threading
import json
from typing import Tuple, Any, Callable, Dict, Union
from .basesession import BaseWebkitSession, ProtocolCommand
from ..connection.websocketconn import WebSocketConnection, STATE, lock_init
from ..pages.chromepage import *
from .basewebkit import ChromeInspectorProtocol, Command, CDP
from .baseprotocol import BaseProtocol, CommandType, BaseEvent, Command, AsyncCommand
from ..utils import get_url_path
from ..exception import InspectorDetachedError

class CDPConnection(WebSocketConnection):
    INSTANCES: Dict[str, 'CDPConnection']
    detached = False
    def __new__(
        cls, debugger_url, *args, unique_id=None, auto_reconnect=False, **kwargs
    ):
        if not debugger_url:
            debugger_url = cls.get_debugger_url(*args, **kwargs)
        # 默认不重连
        # 没有定义unique_id的情况下, 根据chrome debugger url的格式, unique_id取url的path
        if unique_id is None:
            unique_id = get_url_path(debugger_url)
        INSTANCES = cls.INSTANCES
        if unique_id in INSTANCES:
            inst = INSTANCES[unique_id]
            if inst._state == STATE.CLOSE:  # 旧实例已经断了, 替换_url重新初始化
                inst._url = debugger_url
            if inst.detached is not False:  # crash了, 重连都没什么用...
                raise InspectorDetachedError(inst.detached)
        return super().__new__(
            cls,
            debugger_url,
            *args,
            unique_id=unique_id,
            auto_reconnect=auto_reconnect,
            **kwargs
        )

    @lock_init
    def __init__(
        self, debugger_url, *args, unique_id=None, auto_reconnect=True, **kwargs
    ) -> None:
        if self._state != STATE.CLOSE:
            # 有现成实例, 不需要重新实例化
            return
        super().__init__(
            debugger_url,
            *args,
            unique_id=unique_id,
            auto_reconnect=auto_reconnect,
            **kwargs
        )
        # self.ignore_method = set()
        self.protocol = ChromeInspectorProtocol()
        self.detached = False
        self.on("Inspector.detached", self.inspector_detached)

    def _reconnect(self, optime=None, *args):
        if self.detached:
            raise InspectorDetachedError(self.detached)
        return super()._reconnect(optime, *args)

    def inspector_detached(self, event: CDP.Inspector.detached):
        self.detached = str(event.params.get("reason"))
        self.logger.warning(f"Inspector detached because {self.detached}")

    def _on_error(self, error, *args):
        if self.detached is not False:  # Inspector detached
            super()._on_error(InspectorDetachedError(self.detached))
        return super()._on_error(error, *args)

    def _handle_response(self, ret_json) -> Tuple[str, Any]:
        req_id = None
        if "id" in ret_json:  # response
            req_id = ret_json["id"]
            if "error" in ret_json:
                err_msg = ret_json["error"].get("message", "")
                return req_id, Exception(err_msg)
            if "exceptionDetails" in ret_json.get("result", {}):  # error
                exceptionDetails: ChromeInspectorProtocol.protocol.Runtime.ExceptionDetails = ret_json.result.exceptionDetails
                self.logger.error(json.dumps(exceptionDetails, indent=2))
                self.logger.error(exceptionDetails.exception.description)
                return req_id, Exception(exceptionDetails.exception.description)
        return req_id, ret_json

    def _handle_event(self, ret_json):
        """处理通知事件

        :param Object ret_json: 消息体
        :return None or BaseEvent: 事件
        """
        return self.protocol.parse_event(ret_json)



class CDPSession(BaseWebkitSession):
    connection: CDPConnection
    def __init__(self, connection: CDPConnection, id_, page: ChromeNormalPage, refresh_page_handler=None) -> None:
        super().__init__(id_, connection)
        self.protocol = connection.protocol
        self.page = page
        self.refresh_page_handler = refresh_page_handler

    def send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, **kwargs):
        """发送命令, 并等待回复"""
        cmd = self._gen_command(command, params, sync=sync, **kwargs)
        try:
            return self.connection.send_command(cmd)
        except ConnectionAbortedError as e:
            if not self.refresh_page_handler:
                raise
            # 发送指令失败, 重试也失败
            cause = e.__cause__
            if cause and isinstance(cause, ConnectionRefusedError):  # 很有可能是端口不可用了
                if self.connection.detached:  # inspector挂了
                    raise
                if self.connection.is_close_by_myself:  # 自己销毁的, 单实例可能也被销毁了, 新的connection引用会变化
                    raise
                new_page: ChromeNormalPage = self.refresh_page_handler(self.page)
                if not new_page:
                    raise
                # 刷新成功了
                self.page = new_page
                self.connection = CDPConnection(new_page.webSocketDebuggerUrl, unique_id=new_page.unique_id)
                return self.connection.send_command(cmd)
            raise

    def on(self, event: Union[str, BaseEvent], callback: Callable):
        """监听事件"""
        return self.connection.on(event, callback)
    
    def remove_listener(self, event: Union[str, BaseEvent], callback: Callable):
        return self.connection.remove_listener(event, callback)

    def remove_all_listeners(self):
        return self.connection.remove_all_listeners()

    def close(self):
        self.connection.close()
