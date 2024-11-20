# -*-coding: utf-8 -*-
"""
Author: gavinggu gavinggu@tencent.com
Date: 2023-09-18 11:32:50
LastEditors: gavinggu gavinggu@tencent.com
LastEditTime: 2023-09-20 14:42:02
FilePath: /py-minium/minium/miniprogram/h5tools/exceptions.py
Description: Exceptions that may happen in all the h5 driver code
"""


from typing import Optional
from typing import Sequence


class H5Exception(Exception):
    """小程序H5异常类型."""

    def __init__(
        self, msg: Optional[str] = None, screen: Optional[str] = None, stacktrace: Optional[Sequence[str]] = None
    ) -> None:
        super().__init__()
        self.msg = msg
        self.screen = screen
        self.stacktrace = stacktrace

    def __str__(self) -> str:
        exception_msg = f"Message: {self.msg}\n"
        if self.screen:
            exception_msg += "Screenshot: available via screen\n"
        if self.stacktrace:
            stacktrace = "\n".join(self.stacktrace)
            exception_msg += f"Stacktrace:\n{stacktrace}"
        return exception_msg


class NoSuchElementException(H5Exception):
    """
    未找到小程序H5页面元素时抛出异常
    """

    def __init__(
        self, msg: Optional[str] = None, screen: Optional[str] = None, stacktrace: Optional[Sequence[str]] = None
    ) -> None:
        with_support = f"{msg}; #no-such-element-exception"

        super().__init__(with_support, screen, stacktrace)


class NoSuchAttributeException(H5Exception):
    """
    当元素没有查找属性时，抛出异常
    """


class TimeoutException(H5Exception):
    """超时跑出异常"""


class MoveTargetOutOfBoundsException(H5Exception):
    """
    移动元素超过document边界时抛出异常
    """


class UnexpectedTagNameException(H5Exception):
    """标签名非法时抛出异常"""


class InvalidSelectorException(H5Exception):
    """
    元素选择器非法时抛出异常
    """

    def __init__(
        self, msg: Optional[str] = None, screen: Optional[str] = None, stacktrace: Optional[Sequence[str]] = None
    ) -> None:
        with_support = f"{msg}; #invalid-selector-exception"

        super().__init__(with_support, screen, stacktrace)


class InvalidArgumentException(H5Exception):
    """参数非法时抛出异常"""


class InvalidLayoutNodeException(H5Exception):
    """Node does not have a layout object 时抛出异常"""


class JavascriptException(H5Exception):
    """执行js代码失败时抛出异常"""


class ScreenshotException(H5Exception):
    """截图失败抛出异常"""


class ElementClickInterceptedException(H5Exception):
    """点击失败时抛出异常"""


class InvalidSessionIdException(H5Exception):
    """websocket session 不存在或不处于活动状态抛出异常"""


class SessionNotCreatedException(H5Exception):
    """无法创建websocket链接时抛出异常"""


class NotInputElementException(H5Exception):
    """
    对非input或textarea元素进行输入时抛出异常
    """

    def __init__(
        self, msg: Optional[str] = None, screen: Optional[str] = None, stacktrace: Optional[Sequence[str]] = None
    ) -> None:
        with_support = f"{msg}; #not-input-element-exception"

        super().__init__(with_support, screen, stacktrace)


class NotImgElementException(H5Exception):
    """
    获取非img元素的src信息时抛出异常
    """

    def __init__(
        self, msg: Optional[str] = None, screen: Optional[str] = None, stacktrace: Optional[Sequence[str]] = None
    ) -> None:
        with_support = f"{msg}; #not-img-element-exception"

        super().__init__(with_support, screen, stacktrace)


class NotVideoElementException(H5Exception):
    """
    对非视频元素调用视频相关方法时抛出异常
    """