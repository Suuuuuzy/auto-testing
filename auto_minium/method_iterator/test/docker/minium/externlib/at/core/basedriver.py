#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by xiazeng on 2017/8/25
import inspect
import json
import logging
import time
import os.path

import at.core.adbwrap as adbwrap
import at.utils.commonhelper as commonhelper
import requests

from .exceptions import *

logger = logging.getLogger()


def raise_from_res(ret, msg, data):
    from future.utils import raise_from
    if ret == 0:
        return
    if "stack" in data:
        logger.debug(data["stack"])
    elif "result" in data:
        logger.error(data["result"])
    else:
        logger.error(json.dumps(data, indent=3))

    if ret == 3:
        raise_from(NoSuchMethodError(msg), None)
    elif ret == 5:
        raise_from(UiNotFoundError(msg), None)
    elif ret == 7:
        raise_from(UiAutomatorDisconnectError(msg), None)
    elif ret == 4:
        raise_from(ParamError(msg), None)
    else:
        raise_from(RemoteError(msg), None)


class JavaBaseDriver(object):
    SERVER_PORT = 9999
    instance_cache = {}

    def __init__(self, serial):
        name = self.unique_name(serial)
        if name in JavaBaseDriver.instance_cache:
            raise AtError("%s has init, you should call apply to create a object")
        self.serial = serial
        adb = adbwrap.AdbWrap.apply_adb(serial)
        self._last_error = None
        self.adb = adb
        self._port = commonhelper.pick_unuse_port()
        self._app_server_is_run = False
        self._cmd_process = None
        self._start_ts = time.time()
        self.req_costs = []
        self.max_init_retry = 100
        self.max_request_timeout = 60
        self._reconnect_when_error = True
        self.retry_count = 2

        self.hook_list = []
        self.requests_when_reconnect = []

    def add_request_when_reconnect(self, action, http_params=None, **kwargs):
        """
        添加重启at的时候会发送的请求
        """
        self.requests_when_reconnect.append((action, http_params, kwargs))

    def set_reconnect_when_error(self, true_or_false):
        self._reconnect_when_error = true_or_false

    def reconnect(self):
        pass

    def register(self, hook):
        self.hook_list.append(hook)

    def trigger(self, event_name, *args, **kwargs):
        for hook in self.hook_list:
            if getattr(hook, event_name):
                getattr(hook, event_name)(*args, **kwargs)

    def _init(self):
        pass

    def is_remote_running(self):
        return self._app_server_is_run

    def wait_remote_finish(self, timeout=2):
        t = time.time()
        while time.time() - t < timeout:
            if not self.is_remote_running():
                return True
            time.sleep(0.01)
        logger.error("not finish")
        return False

    def set_app_server_run(self, true_or_false):
        logger.debug("true_or_false:%s", true_or_false)
        self._app_server_is_run = true_or_false

    @classmethod
    def apply(cls, serial):
        raise NotImplementedError()

    @classmethod
    def unique_name(cls, name):
        return "%s(%s)" % (cls.__name__, name)

    @classmethod
    def get_cache(cls, serial):
        name = cls.unique_name(serial)
        if name in cls.instance_cache:
            logger.info("get cache %s = %d", name, id(cls.instance_cache[name]))
            return cls.instance_cache[name]
        return None

    @classmethod
    def cache(cls, obj):
        name = obj.page_name(obj.serial)
        if name not in cls.instance_cache:
            logger.info("set cache %s = %d", name, id(obj))
            cls.instance_cache[name] = obj

    @classmethod
    def destroy(cls, serial):
        name = cls.unique_name(serial)
        logger.info(name)
        if name in cls.instance_cache:
            jd = cls.instance_cache[name]
            del cls.instance_cache[name]
            jd.close()

    @staticmethod
    def __redo_ret(res, costs=None):
        if res:
            if res.status_code == requests.codes.ok:
                ret = json.loads(res.text)
                logger.debug("%s java request costs %sms", res.text[:128], costs)
                assert "ret" in ret
                assert "msg" in ret
                assert "data" in ret
                errno = ret["ret"]
                raise_from_res(errno, ret["msg"], ret["data"])
                return ret["data"]
            else:
                raise AtUnknownError(u"pc与手机通讯异常，异常码：" + str(res.status_code))
        else:
            raise AtUnknownError(u"返回结果为空，理论上不应该出现的！" + str(res.status_code))

    @property
    def remote_url(self):
        return "http://127.0.0.1:%d/" % self._port

    def _check_env(self):
        if not self.is_remote_running():
            if self._last_error:
                raise AtError(self._last_error)
            else:
                if self.max_init_retry > 0:
                    self.max_init_retry -= 1
                    self._init()
                else:
                    raise FailedConnectAtServer("can not connect to AtServer")
        # if not self._cmd_process:
        #     raise FailedConnectAtServer("AtServer process was stopped")

        if not self.adb.is_connected():
            raise AdbDisconnectedError("adb has disconnected")

    def do_request(self, action, http_params=None, method="GET", timeout=None, **kwargs):
        if not timeout:
            timeout = self.max_request_timeout
        t = time.time()
        ret = self.request(method.lower(), action, http_params, timeout=timeout, **kwargs)
        if len(self.req_costs) > 1024:
            self.req_costs.pop()
        self.req_costs.append((action, t, time.time()))
        res = ret["result"] if ret is not None and "result" in ret else None
        return res

    def no_check_request(self, action, method="GET", params=None, **kwargs):
        url = self.remote_url + action
        logger.debug("%s, params:%s", url, params)
        session = requests.Session()
        session.trust_env = False
        res = session.request(method, url, params=params, **kwargs)
        session.close()
        return self.__redo_ret(res)

    def request(self, method, action, params=None, **kwargs):
        self._check_env()
        last_exception = None
        s = time.time()

        frames = inspect.stack()
        call = ""
        if len(frames) > 2:
            current_filename = frames[0][1]
            for frame in frames[1:]:
                ignore_files = ["monitor.py", 'case_repair_adapter.py']
                if frame[1] != current_filename and os.path.basename(frame[1]) not in ignore_files and "at/core" not in \
                        frame[1]:
                    call = ", called by %s in line %d" % (frame[3], frame[2])
                    break
        log_prefix = "path:%s, params:%s %s" % (action, json.dumps(params, ensure_ascii=False), call)

        for i in range(2):
            session = requests.Session()
            session.trust_env = False
            try:
                start_time = time.time()
                try:
                    url = self.remote_url + action
                    logger.debug(log_prefix)
                    res = session.request(method, url, params=params, **kwargs)
                    session.close()
                    costs = "%d" % ((time.time() - s) * 1000,)
                    return self.__redo_ret(res, costs)
                except (UiNotFoundError, UiAutomatorDisconnectError):
                    # 重启uiautomator重试一次
                    self.reconnect()
                    logger.debug(log_prefix)
                    res = session.request(method, url, params=params, **kwargs)
                    costs = "%d" % ((time.time() - s) * 1000,)
                    return self.__redo_ret(res, costs)

            except (UiNotFoundError, UiAutomatorDisconnectError):
                raise
            except (requests.ConnectionError,) as e:
                if action == "ping":
                    return {"result": False}
                check_status = self.check_forward()
                if self._cmd_process:
                    uiautomator_exists = True if self._cmd_process.poll() is None else False
                    logger.warning("%s, %d, forward:%s, uiautomator exists:%s, poll:%s, max_init_retry:%s, error:%s",
                                   action, i, check_status, uiautomator_exists, self._cmd_process.poll(),
                                   self.max_init_retry, e)

                last_exception = e
                if self.max_init_retry > 0:
                    self.max_init_retry -= 1
                    self.reconnect()
            except requests.Timeout as e:
                costs = time.time() - start_time
                logging.error("%s, 请求超时%ds，可能原因：\n\t- 有UI刷新\n\t- 底层逻辑超时未返回\n\t- 测试进程被禁用网络（目前vivo手机有发现）", log_prefix,
                              costs)
                self.reconnect()
                last_exception = e
            except Exception as e:
                logging.error("%s, 未知原因", log_prefix)
                last_exception = e
            time.sleep(1 + i * 2)
        else:
            logger.error("%s, 网络异常，超过重试次数:%d，adb连接状态:%s", log_prefix, self.retry_count, self.adb.is_connected())
            raise last_exception

    def check_forward(self):
        if not self.adb.is_connected():
            return False
        is_forward = False
        if str(self._port) in self.adb.run_adb("forward --list"):
            is_forward = True
        # 用别的端口，有
        self.adb.forward_remove(self._port)
        self._port = commonhelper.pick_unuse_port()
        self.adb.forward(self._port, self.SERVER_PORT)
        logger.info("forward status %s", is_forward)
        return is_forward

    def close(self, timeout=5):
        if not self.is_remote_running():
            return
        self.close_remote()
        s = time.time()
        if not self._cmd_process:
            return
        while time.time() - s < timeout:
            if self._cmd_process.poll() is not None or not self.is_remote_running():
                break
            time.sleep(1)
        else:
            self.adb.kill_pid(self._cmd_process.pid)

    def close_remote(self):
        pass

    def print_req_costs(self):
        a = {}
        for req, start, end in self.req_costs:
            if req not in a:
                a[req] = []
            a[req].append((end-start)*1000)
        for req, costs in a.items():
            logger.info("%s num:%s avg_costs:%dms", req, len(costs), sum(costs)/len(costs))

    def __del__(self):
        JavaBaseDriver.close_remote(self.serial)

