#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         yopofeng
Filename:       emitter.py
Create time:    2021/9/24 21:21
Description:    事件分发器

"""
from pyee import EventEmitter
from typing import Callable


class MyEventEmitter(EventEmitter):
    def remove_listener(self, event: str, f: Callable) -> None:
        """安全地移除监听函数

        :param str event: 事件名
        :param Callable f: 监听函数
        :return None: None
        """
        with self._lock:
            if f not in self._events.get(event, {}):
                return
            return self._remove_listener(event, f)

    def remove_class_listener(self, event: str, f: Callable) -> None:
        """移除目标类的监听函数(防止因为监听事件而无法释放类实例)

        :param str event: 事件名
        :param Callable f: 监听函数, 需要有__self__
        :return None: None
        """
        with self._lock:
            listeners = self.listeners(event)
            if not listeners:
                return
            cls = f.__self__.__class__
            for listener in listeners:
                if not getattr(listener, "__self__", None):
                    continue
                if (
                    listener.__self__.__class__ is cls
                    and listener.__name__ == f.__name__
                ):
                    self._remove_listener(event, listener)


# global emitter
ee = MyEventEmitter()
