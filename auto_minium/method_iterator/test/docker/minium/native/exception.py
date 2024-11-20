#!/usr/bin/env python3
# Created by yopofeng on 2021-11-22
# define exceptions for native
from enum import Enum


class ResetError(Enum):
    OK = 0
    ERROR = -1
    RELAUNCH_MINIPROGRAM = -2
    RELAUNCH_APP = -3


class ModalStatus(Enum):
    OK = 0
    Error = -1
    NotOfficialModal = -2  # 不是官方提供的弹窗
    NotFound = -3
