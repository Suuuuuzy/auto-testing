'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-14 14:21:52
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:44:02
FilePath: /wechat-mp-inspector/wechat_mp_inspector/inspector/baseinspector.py
Description: 定义inspector基本逻辑, 与protocol互相引用
'''
import typing
from typing import Union
import abc
from ..protocol.basesession import BaseSession
from ..event import BaseEvent
from ..command import CommandType
from ..protocol.protocolcommand import ProtocolCommand

class BaseInspector(metaclass=abc.ABCMeta):
    DEFAULT_COMMAND_TIMEOUT = 10
    def __init__(self, session: BaseSession, **kwargs) -> None:
        self._session = session
        self.default_command_timeout = self.__class__.DEFAULT_COMMAND_TIMEOUT

    def set_default_command_timeout(self, timeout: int):
        self.default_command_timeout = timeout

    @property
    def id(self):
        return self._session.id_
        
    @abc.abstractmethod
    def send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, max_timeout=DEFAULT_COMMAND_TIMEOUT, **kwargs):
        pass

    async def _send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, max_timeout=DEFAULT_COMMAND_TIMEOUT, **kwargs):
        raise NotImplementedError()

    @abc.abstractmethod
    def on(self, event: Union[str, BaseEvent], callback: typing.Callable):
        pass

    @abc.abstractmethod
    def remove_listener(self, event: Union[str, BaseEvent], callback: typing.Callable): ...

    @abc.abstractmethod
    def remove_all_listeners(self, event: Union[str, BaseEvent]=None): ...

    @abc.abstractmethod
    def close(self): ...
            

    