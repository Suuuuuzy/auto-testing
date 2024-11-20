'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-21 13:36:33
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-03-01 20:45:03
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/basedriver.py
Description: 驱动基类, 定义驱动基本运转方式
'''
import abc
import logging
from typing import List
from .config import *
from ..logger import logger
from ..inspector.baseinspector import BaseInspector
from ..protocol.basesession import BaseSession
from ..pages.basepage import BasePage

class BaseDriver(metaclass=abc.ABCMeta):
    def __init__(self, config=BaseConfig) -> None:
        self.logger = logger.getChild(self.__class__.__name__)
        self.logger.setLevel(config.logger_level)
        logger.setLevel(config.logger_level)

    @abc.abstractmethod
    def get_pages(self) -> List[BasePage]: ...

    @abc.abstractmethod
    def inspector_session(self, page: BasePage) -> BaseInspector: ...

    def close(self): ...

