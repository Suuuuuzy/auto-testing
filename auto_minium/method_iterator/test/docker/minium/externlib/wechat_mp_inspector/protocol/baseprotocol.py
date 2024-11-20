'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-11 17:25:44
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:45:06
FilePath: /wechat-mp-inspector/wechat_mp_inspector/protocol/baseprotocol.py
Description: 协议类, 定义生成指令和解析事件的方法
'''
import abc
from typing import Union
from ..command import CommandType, Commands, Command, AsyncCommand
from ..event import BaseEvent

class BaseProtocol(metaclass=abc.ABCMeta):
    def __init__(self, inspector=None) -> None:
        self._inspector = inspector

    async def init(self):
        """需要进行异步初始化的操作"""
        pass

    @abc.abstractmethod
    def get_command(self, command: Union[str, Commands], params: dict, *, sync=True, **kwargs) -> CommandType: pass
    @abc.abstractmethod
    def parse_event(self, message: dict) -> BaseEvent: pass