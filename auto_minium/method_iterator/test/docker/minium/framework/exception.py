#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       exception.py
Create time:    2020/4/22 22:13
Description:

"""
import typing
import sys
if typing.TYPE_CHECKING:
    from ..miniprogram.base_driver.selector import Selector

class MiniError(Exception):
    def __init__(self, msg):  # real signature unknown
        self.msg = msg
        Exception.__init__(self, msg)


class MiniConnectError(MiniError):
    ...


class MiniConnectSvrError(MiniConnectError):
    ...


class MiniReConnectSvrError(MiniConnectSvrError):
    ...


class MiniTimeoutError(MiniConnectError):
    ...


# 链接断了
class MiniConnectionClosedError(MiniConnectError):
    ...


# 小程序下线了
class MiniClientOfflineError(MiniConnectError):
    ...


# 调试通道错误
class MiniDebugConnectionError(MiniConnectError):
    ...


# 因断连造成的未收到指令回复
class MiniTimeoutCauseByConnectionBreakError(
    MiniTimeoutError, MiniConnectionClosedError
):
    ...


# 因小程序下线造成的未收到指令回复
class MiniTimeoutCauseByClientOffline(MiniTimeoutError, MiniClientOfflineError):
    ...


class MiniRefuseError(MiniConnectError):
    ...


class MiniNotAttributeError(AttributeError):
    ...


class MiniLaunchError(MiniError):
    ...


class MiniShutdownError(MiniError):
    ...


class MiniConfigError(MiniError):
    ...


class MiniAppError(MiniError):
    ...


class MiniCommandError(MiniAppError):
    def __init__(self, msg, msg_id=None):
        self.msg_id = msg_id
        super().__init__(msg)


class PageDestroyed(MiniCommandError):
    ...


class MiniLowVersionSdkError(MiniCommandError):
    ...


class MiniObserverError(MiniError):
    ...


class MiniNoncallableError(MiniObserverError):
    ...


class MiniParamsError(Exception):
    ...


class MiniElementNotFoundError(Exception):
    def __init__(self, selector: "Selector", *args: object) -> None:
        if isinstance(selector, str):
            # 自定义的 msg
            err = sys.exc_info()[1]
            if isinstance(err, MiniElementNotFoundError):
                self.selector = err.selector
            else:
                self.selector = None
            msg = selector
        else:
            self.selector = selector
            msg = "element[%s] not found" % selector.full_selector()
        super().__init__(msg, *args)


class LoadCaseError(ModuleNotFoundError):
    def __init__(self, *args: object, name: str = ..., path: str = ...) -> None:
        if len(args) > 0 and isinstance(args[0], ModuleNotFoundError):
            err = args[0]
            super().__init__(err.msg, *args[1:], name=err.name, path=err.path)
            self.with_traceback(err.__traceback__)
        else:
            super().__init__(*args, name=name, path=path)


class RemoteDebugConnectionLost(MiniCommandError):  # 远程调试服务掉线
    ...


class RetrySuccess(MiniError):  # 重试成功
    ...


class RetryFail(MiniError):  # 重试失败
    ...

class LoadPageError(MiniError):  # 实例化 page 错误
    ...
