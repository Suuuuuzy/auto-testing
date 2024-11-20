# -*- coding: utf-8 -*-
"""
@author: 'xiazeng'
@created: 2016/12/12
"""

import datetime
import json
import re
import logging
import subprocess
import threading
import time
import sys

from at.utils import magic
from at.core import uixml, config, resguard, basedriver
from at.core.exceptions import *
from at.core.websocketcli import WebSocketCli

if sys.version_info[0] < 3:
    from Queue import Queue, Empty
    from urllib import unquote
else:
    from queue import Queue, Empty
    from urllib.parse import unquote


RESPONSE_ERROR_JSON_PARSE_ERROR = 6
RESPONSE_ERROR_UI_OBJECT_NOT_FOUND = 5
RESPONSE_ERROR_NO_SUCH_METHOD = 3
RESPONSE_ERROR_PARAMS_UNVALIDED = 4
UNKNOW_ERROR = 7

logger = logging.getLogger()


def enqueue_output(out, queue):
    for line in iter(out.readline, b''):
        queue.put(line)
    out.close()


class JavaDriver(basedriver.JavaBaseDriver):
    ACTION_QUIT = "quit"
    ACTION_GET_TIMESTAMP = "timestamp"
    ACTION_PING = "ping"
    ACTION_IMPORTPATH = "importPath"
    ACTION_GETLIST = "getrespondlist"
    ACTION_ONOFF = "on_off"
    ACTION_HAS_READY = "hasReady"
    ACTION_BASEUI = "baseUi"
    ACTION_UI_DEVICE = "uiDevice"
    ACTION_UI_CFG = "uiCfg"
    ACTION_PY_CFG = "pyCfg"
    ACTION_HTTP_GET = "httpGet"
    ACTION_UI_SELECTOR = "pySelector"
    ACTION_LOGCAT = "logcat"
    ACTION_UPLOAD = "upload"
    ACTION_CONTEXT_UTIL = "contextUtil"
    ACTION_SYS_HANDLER = "sysDialogHandler"
    ACTION_DIALOG_HANDLER = "appDialogHandler"
    ACTION_AT_DEVICE = "aTDevice"
    ACTION_SCREEN_CAPTURE = "ScreenCapture"

    UPLOAD_DIR = "/data/local/tmp"
    SERVER_PORT = 9999
    WEBSOCKET_SERVER_PORT = 9998

    java_drivers = {}

    def __init__(self, serial, uiautomator=config.UIAUTOMATOR2, open_atstub=True):
        super(JavaDriver, self).__init__(serial)
        self._server_thread = None
        self.mobile_gap_ms = 0  # 跟手机的时机差距，毫秒
        self.app_outputs = []
        self.device_operation_records = []
        self.operation_list = []
        self.ui_trace_list = []
        self._capture_op = True
        self._server_cmd = ""
        self._stop_cmd = ""
        self.uiautomator_version = uiautomator
        self._last_op_msg = None
        self._run_app_server_retry = 1
        self._init(open_atstub=open_atstub)
        self._remove_kinda_main = False

    def release_variable(self):
        self.device_operation_records = []
        self.operation_list = []
        self.ui_trace_list = []

    def reconnect(self):
        self.close_remote()
        time.sleep(1)
        self._init()

    def _init(self, open_atstub=False):
        self._run_app_server_retry = 2
        cmd = "uiautomator runtest %s -c %s#%s " % (config.JAR_STUB_FILENAME,
                                                    config.JAR_STUB_CLASS,
                                                    config.STUB_CASE_NAME)
        install_ret = self._init_uiautomator2()
        if install_ret:
            if magic.is_windows():
                cmd = 'am instrument -w -r  -e class "%s#%s" "%s/androidx.test.runner.AndroidJUnitRunner"' % (
                    config.TEST_APP_CLS, config.STUB_CASE_NAME, config.TEST_APP_PKG
                )
            else:
                cmd = "am instrument -w -r  -e class '%s#%s' '%s/androidx.test.runner.AndroidJUnitRunner'" % (
                    config.TEST_APP_CLS, config.STUB_CASE_NAME, config.TEST_APP_PKG
                )
            self._stop_cmd = "am instrument -w -r  -e class '%s#null' '%s/androidx.test.runner.AndroidJUnitRunner'" % (
                config.TEST_APP_CLS, config.TEST_APP_PKG
            )
        else:
            raise RuntimeError("init uiautomator2 failed1")

        self.adb.run_shell(f"dumpsys deviceidle  whitelist +{config.TEST_APP_PKG}")
        if self.adb.sdk_version >= 24:
            self.adb.run_shell("cmd appops  set com.tencent.weautomator RUN_IN_BACKGROUND allow")

        cmd = self.adb.prefix() + " shell " + cmd
        self._server_cmd = cmd
        self.adb.forward(self._port, JavaDriver.SERVER_PORT)
        if not self.ping():
            self.set_app_server_run(False)
            self.run_remote_server()
            if open_atstub:
                if not self.wait_for_ui_ready(5):
                    self.adb.start_app(config.TEST_APP_PKG, config.TEST_APK_ACT)
                    time.sleep(2)
                    self.adb.press_back()
            if not self.wait_for_ui_ready():
                self.set_app_server_run(False)
                raise FailedConnectAtServer("启动AtServer失败")
        else:
            self.set_app_server_run(True)
        self.adb.forward(JavaDriver.WEBSOCKET_SERVER_PORT, JavaDriver.WEBSOCKET_SERVER_PORT)
        self.websocket = WebSocketCli(JavaDriver.WEBSOCKET_SERVER_PORT)
        for action, http_params, kwargs in self.requests_when_reconnect:
            self.do_request(action, http_params, **kwargs)

    def _init_uiautomator2(self):
        ret = True
        if not self.adb.pkg_has_installed(config.TEST_APP_PKG):
            ret = self.adb.install(config.STUB_APK_PATH, opt="-t -r")
            if not ret:
                return False
        return ret

    def _init_uiautomator(self):
        ret = False
        if not self.adb.pkg_has_installed(config.TEST_APP_PKG):
            ret = self.adb.install(config.STUB_APK_PATH)
            if not ret:
                return False
        return ret

    @classmethod
    def apply_driver(cls, serial, version=config.UIAUTOMATOR2, open_atstub=True):
        assert serial is not None
        if serial in cls.java_drivers:
            # logger.debug("use cache JavaDriver, %s, %d", str(serial), id(cls.java_drivers[serial]))
            return cls.java_drivers[serial]
        else:
            jd = JavaDriver(serial, version, open_atstub)
            logger.info("create JavaDriver, %s, %d", str(serial), id(jd))
            cls.java_drivers[serial] = jd
            return jd

    @classmethod
    def release_driver(cls, serial):
        logger.info(serial)
        if serial in cls.java_drivers:
            jd = cls.java_drivers[serial]
            del cls.java_drivers[serial]
            jd.close()

    def remove_kinda_main(self, is_remove=True):
        self.request_configure('setUseCustom', [is_remove])  # 屏蔽非最上层页面元素
        self.request_configure('setBlockKindaMain', [is_remove])
        self._remove_kinda_main = is_remove

    def run_remote_server(self, max_wait_timeout=15):
        if self._server_thread is None:
            s = time.time()
            try_count = 0
            while time.time() - s < max_wait_timeout:
                if not self.adb.app_is_running("uiautomator"):
                    break
                pid = self.adb.get_android_pid("uiautomator")
                self.adb.run_shell("kill %s" % pid)
                time.sleep(0.1)
                try_count += 1
                logger.error("uiautomator is running, try %d" % try_count)
            else:
                self._last_error = u"UiAutomator已经被占用"
                raise AtError(u"UiAutomator已经被占用")
            self._server_thread = threading.Thread(target=self._run_app_server, args=(self._server_cmd,))
            self._server_thread.setDaemon(True)
            self._server_thread.start()
        else:
            logger.error("last thread has not stop")

    def wait_for_ui_ready(self, timeout=30):
        s = time.time()
        logger.debug("wait_for_ui_ready start")
        t = time.time() - s
        while t < timeout and not self.is_remote_running():  # todo: 偶现adb命令阻塞卡住
            time.sleep(0.2)
            t = time.time() - s
        logger.debug(", %.2f " % t)

        if not self.is_remote_running():
            logger.debug(u"launch uiautomator timeout: %dms" % ((time.time() - s)*1000))
            return False
        if time.time() - s > timeout:
            # raise FailedConnectAtServer(u"AtServer启动失败，可能uiautomator被占用，请执行adb命令检查手机环境")
            logger.debug("init atserver timeout")
            return False
        while t < timeout:
            if self.ping():
                break
            time.sleep(0.2)
            t = time.time() - s
        if t >= timeout:
            # raise FailedConnectAtServer(u"AtServer启动失败，手机比较卡，请执行adb命令检查手机环境")
            return False
        logger.info("At init completed")
        return True

    def _run_app_server(self, cmd):
        logger.info(cmd)
        self._run_app_server_retry -= 1
        if magic.is_windows():
            process = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                   shell=True)
        else:
            args = re.split(r"\s+", cmd)
            process = subprocess.Popen(args, close_fds=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                       stderr=subprocess.PIPE,
                                       shell=False)
        q = Queue()
        t = threading.Thread(target=enqueue_output, args=(process.stdout, q))
        t.daemon = True  # thread dies with the program
        t.start()
        t = threading.Thread(target=enqueue_output, args=(process.stderr, q))
        t.daemon = True  # thread dies with the program
        t.start()
        is_crashed = False
        s = time.time()
        while process.poll() is None or not q.empty():
            line = None
            try:
                line = q.get(timeout=0.1)
                if magic.is_windows():
                    line = line.decode("gbk")
                else:
                    line = line.decode("utf-8")
            except Empty:
                pass
            except:
                logger.exception("not catch exception")
            if line is not None and len(line.strip()) > 0 and "CDS" not in line:
                if "test=%s" % config.STUB_CASE_NAME in line:
                    # 检查到用例真正运行才算启动成功
                    if not self._app_server_is_run:
                        self._cmd_process = process
                        self.set_app_server_run(True)
                self.app_outputs.append(line)
                if "close [socket]" not in line:
                    logger.debug("java print:" + line.strip())
                if "Process crashed" in line:
                    is_crashed = True
        logger.info("subprocess stopped, ret code:" + str(process.returncode))
        self._server_thread = None
        self.set_app_server_run(False)
        return is_crashed

    def ping(self):
        try:
            s = time.time()
            result = self.no_check_request(self.ACTION_PING)
            costs = (time.time() - s) * 1000
            if result:
                if isinstance(result, dict) and 'currentTimeMillis' in result:
                    mobile_millis = result['currentTimeMillis']
                    self.mobile_gap_ms = mobile_millis - (s * 1000 + costs / 2)
                return True
            else:
                return False
        except Exception:
            logger.error("ping failed")
            return False

    def getrespondlist(self):
        ret = self.do_request(self.ACTION_GETLIST)
        return ret

    def importPath(self, str):
        ret = self.do_request(self.ACTION_IMPORTPATH, str)

    def on_off(self, on):
        ret = self.do_request(self.ACTION_ONOFF, on)

    def ui_is_ready(self):
        return self.do_request(self.ACTION_HAS_READY, None)

    def dump_ui(self, retry=3):
        """
        获取顶层窗口的views, 获取的views是按照从上到下顺序，重试5次
        todo: 重构时要放到uidevice里面去
        """
        views = []  # type: list[uixml.UiView]
        i = 0
        for i in range(retry):
            res = self.request_at_device("dumpUi", [])
            if res and len(res.strip()) != 0:
                if self._remove_kinda_main:
                    res = uixml.remove_kinda_window(res)
                views = uixml.window_dump_parse_str(res, resguard.Resguard.get_resguard(self.serial))
                for view in views:
                    if view.size != 0:
                        return views
            time.sleep(i+0.5)
        logger.debug('views len: %s, try:%s', len(views), i+1)
        return views

    def get_ui_views(self):
        """

        :rtype: list[uixml.UiView]
        """
        ui_views = []
        for us in self.dump_all_views():
            ui_views += us
        return ui_views

    def get_all_window_xmls(self):
        """
        获取所有窗口的views, 获取的views是按照从上到下顺序，重试5次
        todo: 重构时要放到uidevice里面去
        """
        for i in range(3):
            res = self.request_at_device("dumpXmls", [])
            if res and len(res) != 0:
                return res
            logger.info("dumpXmls return empty value, retry again")
            time.sleep(i+0.5)
        logger.error("get_all_window_xmls failed")
        return []

    def dump_all_views(self):
        """
        获取所有窗口的views, 获取的views是按照从上到下顺序，重试5次
        todo: 重构时要放到uidevice里面去
        """
        views_list = []  # type: list[list[uixml.UiView]]
        for views_str in self.get_all_window_xmls():
            if self._remove_kinda_main:
                views_str = uixml.remove_kinda_window(views_str)
            views = uixml.window_dump_parse_str(views_str, resguard.Resguard.get_resguard(self.serial))
            views_list.append(views)
        return views_list

    def dump_activity_proxy(self):
        for i in range(5):
            res = self.request_at_device("dumpUi", [])
            if res and len(res.strip()) != 0:
                return uixml.window_dump_2_activity_proxy(res, resguard.Resguard.get_resguard(self.serial))
            time.sleep(i+1)
        return None

    def network_is_ok(self, url="www.qq.com"):
        return self.request_java(self.ACTION_HTTP_GET, [url])

    def has_view(self, selector):
        for v in self.dump_ui():
            if v.match(selector):
                return True
        return False

    def request_action(self, action, method, params):
        action = action + "/" + method
        return self.request_java(action, params)

    def request_ui_method(self, method, params):
        """
        send cmd to mobile, ask for a uiautormator action
        """
        action = self.ACTION_BASEUI + "/" + method
        return self.request_java(action, params)

    def request_at_device(self, method, params=None):
        if params is None:
            params = []
        return self.request_action(self.ACTION_AT_DEVICE, method, params)

    def request_screen_capture(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_SCREEN_CAPTURE + "/" + method
        return self.request_java(action, params)

    def request_ui_device(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_UI_DEVICE + "/" + method
        return self.request_java(action, params)

    def request_ui_configure(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_UI_CFG + "/" + method
        return self.request_java(action, params)

    def request_configure(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_PY_CFG + "/" + method
        return self.request_java(action, params)

    def request_logcat(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_LOGCAT + "/" + method
        return self.request_java(action, params)

    def request_context(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_CONTEXT_UTIL + "/" + method
        return self.request_java(action, params)

    def request_sys_handler(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_SYS_HANDLER + "/" + method
        return self.request_java(action, params, timeout=90)

    def request_dialog_handler(self, method, params=None):
        if params is None:
            params = []
        action = self.ACTION_DIALOG_HANDLER + "/" + method
        return self.request_java(action, params)

    def request_ui_selector(self, selectors, method, params=None, child_selectors=None, parent_selector=None):
        if params is None:
            params = []
        # logger.info(method)
        action = self.ACTION_UI_SELECTOR + "/" + method
        http_params = dict()
        http_params["params"] = unquote(json.dumps(params))
        http_params["UiSelector"] = unquote(json.dumps(selectors))
        return self.do_request(action, http_params)

    def request_java(self, action, params, **kwargs):
        http_params = dict()
        logger.debug("%s params %s", action, json.dumps(params, ensure_ascii=False))
        http_params["params"] = unquote(json.dumps(params))
        return self.do_request(action, http_params, **kwargs)

    def close_remote(self):
        if self.is_remote_running():
            self.adb.run_shell(self._stop_cmd)
            if self._port:
                self.adb.forward_remove(self._port)
            self.wait_remote_finish()

    def get_unix_ts(self):
        return self.do_request(self.ACTION_GET_TIMESTAMP)

    def set_capture_op(self, true_or_false):
        """
        设置操作是否自动截图
        :param true_or_false:
        :return:
        """
        self._capture_op = true_or_false

    def get_capture_op(self):
        return self._capture_op

    def push_op(self, msg, *args, **kwargs):
        if not self._capture_op:
            return
        display = kwargs.get('display')
        plus_micro_seconds = time.time() - self._start_ts
        dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        msg = msg % args
        if u"检查" not in msg:
            if self._last_op_msg:
                self.trigger("event_capture", self._last_op_msg[:128], display)
            else:
                self.trigger("event_capture", "start", display)
            self._last_op_msg = msg
        self.device_operation_records.append(u"%s%10.2fs %s" % (dt, plus_micro_seconds, msg))
        self.operation_list.append({
            "mobile_time_ms": int(time.time() * 1000 + self.mobile_gap_ms),
            "costs": plus_micro_seconds,  # 距离最开始的时间,
            "msg": msg
        })
