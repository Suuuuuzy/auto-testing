#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       minium_object.py
Create time:    2019/4/30 21:21
Description:

"""

from .minium_log import MonitorMetaClass, report_exception, ExceptionData
from .callback import Callback
from .connection import Command, Connection
from ...utils.injectjs import getInjectJsCode
from ...utils.utils import retry
from ...framework.exception import *
import subprocess
import time
import logging
import types

logger = logging.getLogger("minium")


class RetryableApi(MonitorMetaClass):
    """
    给attr_dict["__RETRY_API__"]中的接口(包括property.fget)添加retry修饰器
    __RETRY_CNT__: 接口重试次数, 默认2
    __RETRY_EXCEPTION__: 命中给定错误才重试, 默认(MiniTimeoutCauseByConnectionBreakError, MiniTimeoutCauseByClientOffline)
    """

    def __new__(mcs, cls_name, bases, attr_dict):
        if "__RETRY_API__" in attr_dict:
            if "__RETRY_CNT__" not in attr_dict:
                attr_dict["__RETRY_CNT__"] = 2
            RETRY_CNT = attr_dict["__RETRY_CNT__"]
            if "__RETRY_EXCEPTION__" not in attr_dict:
                attr_dict["__RETRY_EXCEPTION__"] = (
                    MiniTimeoutCauseByConnectionBreakError,
                    MiniTimeoutCauseByClientOffline,
                )
            RETRY_EXCEPTION = attr_dict["__RETRY_EXCEPTION__"]
            for api in attr_dict["__RETRY_API__"]:
                if api.startswith("__"):  # private method
                    api = f"_{cls_name}{api}"
                if api not in attr_dict:
                    continue
                if isinstance(attr_dict[api], property):
                    if attr_dict[api].fget:
                        attr_dict[api] = property(
                            retry(2, ValueError)(attr_dict[api].fget),
                            attr_dict[api].fset,
                            attr_dict[api].fdel,
                            attr_dict[api].__doc__,
                        )
                if not isinstance(attr_dict[api], types.FunctionType):
                    continue
                attr_dict[api] = retry(
                    RETRY_CNT,
                    RETRY_EXCEPTION,
                    lambda cnt, name: report_exception(
                        ExceptionData(RetrySuccess(f"{cls_name}.{api}"), func=name, retry=cnt - 1)
                    ),
                )(attr_dict[api])
        return super().__new__(mcs, cls_name, bases, attr_dict)


class MiniumObject(object, metaclass=MonitorMetaClass):
    _cant_use_interface = {}

    def __init__(self):
        self.logger = logger
        self.observers = {}
        self.connection: Connection = None

    def _do_shell(self, command, print_msg=True, input=b""):
        """
        执行 shell 语句
        :param command:
        :param print_msg:
        :return:
        """
        self.logger.info("de shell: %s" % command)
        p = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdin=subprocess.PIPE,
        )
        out, err = p.communicate(input)
        try:
            out = out.decode("utf8")
        except UnicodeDecodeError:
            out = out.decode("gbk")
        try:
            err = err.decode("utf8")
        except UnicodeDecodeError:
            err = err.decode("gbk")
        if print_msg:
            self.logger.info("err:\n%s" % err)
            self.logger.info("out:\n%s" % out)
        return out, err

    @classmethod
    def _can_i_use(cls, name):
        return not cls._cant_use_interface.get(name, False)

    @classmethod
    def _unset_interface(cls, name):
        cls._cant_use_interface[name] = True

    # protect method

    def _wait(self, func, timeout, interval=1):
        """
        等待直到`func`为true
        :func: callable function
        :timeout: timeout
        :interval: query step
        :return: bool
        """
        # func = lambda :True or False
        if not callable(func):
            return False
        s = time.time()
        timeout = timeout or interval
        while time.time() - s < timeout:
            if func():
                return True
            time.sleep(interval)
        return False

    def _call_wx_method(
        self, method, args=None, plugin_appid=None, sync=True, ignore_response=False
    ):
        if args is None:
            args = []
        if not isinstance(args, list):
            if isinstance(args, str):
                # 如果是字符型参数，就可以不用管是否是 sync 方法，直接转数组传参即可
                args = [args]
            elif "Sync" in method:
                # 如果是 sync 方法，则需要从字典里面提取所有的 value 成为一个数组进行传参
                if isinstance(args, dict):
                    temp_args = list()
                    for key in args.keys():
                        temp_args.append(args[key])
                    args = temp_args
            else:
                # 异步方法的话无需管 args 是str 还是 dict，直接转成 list 即可
                args = [args]

        params = {"method": method, "args": args}
        if plugin_appid:
            params["pluginId"] = plugin_appid
        if not sync:
            return self.connection.send_async(
                "App.callWxMethod", params, ignore_response=ignore_response
            )
        try:
            return self.connection.send("App.callWxMethod", params)
        except MiniCommandError as e:
            if str(e) == f"wx.{method} not exists":
                raise NotImplementedError(f"wx.{method}未实现, 请更换更新的基础库版本")
            raise

    def _evaluate(self, app_function: str, args=None, sync=False, desc=None, max_timeout=None):
        if not args:
            args = []
        if sync:
            return self.connection.send(
                Command(
                    "App.callFunction",
                    {"functionDeclaration": app_function, "args": args},
                    desc=desc,
                    max_timeout=max_timeout,
                )
            )
        else:
            return self.connection.send_async(
                "App.callFunction", {"functionDeclaration": app_function, "args": args}
            )

    def _evaluate_js(
        self,
        filename,
        args=None,
        sync=True,
        default=None,
        code_format_info=None,
        mode=None,
        **kwargs,
    ):
        """
        运行 js 代码
        :param filename: {JS_PATH} 中 JS 文件名字（不需要后缀）
        :param code_format_info: JS 内容中需要进行格式化的信息, 如内容中包含 `%s` `%(arg)s` 等的可格式化信息
        :param args: 注入函数需要输入的参数列表
        :param sync: 同步执行函数
        :param mode: js mode: 仅支持es5还是都支持
        :param default: 同步结果返回默认值
        """
        if args is None:
            args = []
        ret = self._evaluate(
            getInjectJsCode(filename, format_info=code_format_info, mode=mode),
            args,
            sync=sync,
            **kwargs,
        )
        if sync:
            return ret.get("result", {}).get("result", default)
        return ret

    def _get_async_response(self, msg_id: str):
        return self.connection.get_aysnc_msg_return(msg_id)

    def _expose_function(self, name, binding_function):
        self.connection.register(name, binding_function)
        self.connection.send("App.addBinding", {"name": name})

    def _unregister(self, name, binding_function=None):
        self.connection.remove(name, binding_function)

    def _format_mock_params(
        self,
        method,
        functionDeclaration: str = "",
        result=None,
        args=None,
        success=True,
    ) -> dict:
        params = {"method": method}
        if not args:
            args = []
        elif not isinstance(args, tuple):
            args = [args]
        if functionDeclaration:
            params.update({"functionDeclaration": functionDeclaration, "args": args})
        elif result is not None:
            # sync方法直接透传result
            if method.endswith("Sync"):
                params["result"] = result
            elif isinstance(result, str):
                params["result"] = {
                    "result": result,
                    "errMsg": "%s:%s" % (method, "ok" if success else "fail"),
                }
            elif isinstance(result, dict):
                params["result"] = result
            else:
                self.logger.warning("mock wx method accept str or dict result only")
                raise MiniParamsError("mock wx method accept str or dict result only")
        else:
            raise MiniParamsError("mock wx method need functionDeclaration or result")
        return params

    def _mock_wx_method(
        self,
        method,
        functionDeclaration: str = "",
        result=None,
        args=None,
        success=True,
        plugin_appid=None,
    ):
        params = self._format_mock_params(
            method,
            functionDeclaration,
            result,
            args,
            success
        )
        if plugin_appid:
            params["pluginId"] = plugin_appid
        return self.connection.send("App.mockWxMethod", params)
    
    def mock_wx_method(
        self,
        method,
        functionDeclaration: str = "",
        result=None,
        args=None,
        success=True,
        plugin_appid=None,
    ):
        return self._mock_wx_method(
            method,
            functionDeclaration,
            result,
            args,
            success,
            plugin_appid,
        )

    def _mock_wx_js(
        self, method, filename, args=None, code_format_info=None, plugin_appid=None
    ):
        """
        mock方法中定义的替换函数直接返回一个promise, promise不需要reject, 自动化协议会根据回调的errmsg来判断回调success/fail
        """
        return self.mock_wx_method(
            method,
            getInjectJsCode(filename, format_info=code_format_info),
            args=args,
            plugin_appid=plugin_appid,
        )
