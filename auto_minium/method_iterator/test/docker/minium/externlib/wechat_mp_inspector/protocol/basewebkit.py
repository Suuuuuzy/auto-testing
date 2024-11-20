'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-12 11:10:33
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-10-23 15:00:57
FilePath: /wechat-mp-inspector/wechat_mp_inspector/protocol/basewebkit.py
Description: 定义基于webkit的浏览器内核调试协议共通的部分
'''
import typing
from .baseprotocol import BaseProtocol, CommandType, Command, AsyncCommand
from ..command import Commands
from ..event import BaseEvent
from .protocolcommand import ProtocolCommand
from .protocoltypes import EventTypes, create_event
from . import protocoltypes as WIP
CDP = WIP  # protocoltypes是融合了两个协议的

EventType = typing.Union[BaseEvent, WIP.EventTypes]


class BaseWebkitProtocol(BaseProtocol):
    protocol = WIP
    def parse_event(self, message: dict) -> EventType:
        if "method" in message and "params" in message:
            method = message["method"]
            return self.protocol.create_event(method, message["params"])
        return
    
    def get_command(self, command: str, params: dict=None, *, sync=True, **kwargs) -> CommandType:
        target = None
        for c in command.split("."):
            target = getattr(target or self.protocol, c, None)
            if target is None:
                raise TypeError(f"command {command} is not support for WebkitInspectorProtocol")
        if params is None:
            params = {}
        try:
            cmd: ProtocolCommand = target(**params)
        except TypeError as te:
            raise TypeError(f"gen command {command} fail") from te
        if sync:
            return Command(cmd._method, cmd._arguments, **kwargs)
        return AsyncCommand(cmd._method, cmd._arguments, **kwargs)

class WebkitInspectorProtocol(BaseWebkitProtocol):
    protocol = WIP

class ChromeInspectorProtocol(BaseWebkitProtocol):
    protocol = CDP


