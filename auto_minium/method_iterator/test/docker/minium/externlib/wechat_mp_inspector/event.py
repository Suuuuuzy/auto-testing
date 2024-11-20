'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-12 17:22:29
LastEditors: yopofeng
LastEditTime: 2023-09-28 02:17:13
FilePath: /wechat-mp-inspector/wechat_mp_inspector/event.py
Description: 定义事件
'''
import typing

class BaseEvent(object):
    """
    server端返回的通知事件
    """
    def __new__(cls, event_name, params={}, *args):
        if cls is not BaseEvent:
            return object.__new__(cls)
        # BaseEvent的情况根据event name实例化
        subclasses = {c.__name__: c for c in cls.__subclasses__()}
        if event_name in subclasses:
            inst = object.__new__(subclasses.get(event_name))
            return inst
        inst = object.__new__(cls)
        return inst

    def __init__(self, event_name, params={}) -> None:
        self.event_name = event_name
        self.params = params
        if params and isinstance(params, dict):
            for k, v in params.items():
                if hasattr(self, k) and k not in self.__dict__:
                    setattr(self, k, v)

class StateChangeEvent(BaseEvent):
    def __init__(self, value: bool) -> None:
        super().__init__("ConnectionStateChange", value)

