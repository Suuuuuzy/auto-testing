'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-14 14:21:52
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:42:16
FilePath: /wechat-mp-inspector/wechat_mp_inspector/inspector/androidinspector.py
Description: 定义inspector基本逻辑, 与protocol互相引用
'''
from typing import Union
from .baseinspector import *
from ..protocol.cdp import CDPSession

class AndroidInspector(BaseInspector):
    DEFAULT_COMMAND_TIMEOUT = 10
    _session: CDPSession
    def __init__(self, session: CDPSession, **kwargs) -> None:
        super(AndroidInspector, self).__init__(session=session, **kwargs)

    @property
    def id(self):
        return self._session.connection.id
        
    def send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, max_timeout=None, **kwargs):
        if max_timeout is None:
            max_timeout = self.default_command_timeout
        return self._session.send_command(command, params, sync=sync, max_timeout=max_timeout, **kwargs)

    def on(self, event: Union[str, BaseEvent], callback: typing.Callable):
        return self._session.on(event, callback)

    def remove_listener(self, event: Union[str, BaseEvent], callback: typing.Callable):
        return self._session.remove_listener(event, callback)

    def remove_all_listeners(self, event: Union[str, BaseEvent]=None):
        if event:
            return self._session.remove_listener(event, callback=None)
        return self._session.remove_all_listeners()

    def close(self):
        return self._session.close()
            

    