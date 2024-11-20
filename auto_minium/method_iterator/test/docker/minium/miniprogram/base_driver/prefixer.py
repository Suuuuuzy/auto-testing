#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author: lockerzhang
@LastEditors: lockerzhang
@Description: file content
@Date: 2019-03-11 20:34:28
@LastEditTime: 2019-03-11 20:52:04
"""

from enum import Enum


class MediaType(Enum):
    """
    媒体类型
    """

    UNKNOW = 1
    VIDEO = 2
    AUDIO = 3
    LIVE_PLAY = 4
    LIVE_PUSH = 5


class MediaStatus(Enum):
    """
    媒体状态
    """

    PLAYING = 10
    STOP = 11
    RESUME = 12
    PAUSE = 13
    PUSHING = 14


class AppStatus(Enum):
    """
    APP 活动状态
    """

    FOREGROUND = 1001
    BACKGROUND = 1002


class Orientation(Enum):
    """
    屏幕方向
    """

    ORIENTATION_UP = 1010
    ORIENTATION_DOWN = 1011
    ORIENTATION_LEFT = 1012
    ORIENTATION_RIGHT = 1013
