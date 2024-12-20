#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import time
import platform
import os
import json
import subprocess
from .base_driver.app import App
from .base_driver.connection import Connection
from minium.framework.exception import *
from .base_driver.minium_object import MiniumObject

MAC_DEVTOOL_PATH = "/Applications/QQ小程序开发者工具.app/Contents/MacOS/cli"
WINDOWS_DEVTOOL_PATH = "path/to/devTool/cli.bat"
TEST_PORT = "9421"
# cur_path = os.path.dirname(os.path.realpath(__file__))
# resource_path = os.path.join(os.path.dirname(cur_path), "qq_resources")
# if not os.path.exists(resource_path):
#     os.mkdir(resource_path)


class LogLevel(object):
    INFO = 20
    DEBUG_SEND = 12
    METHOD_TRACE = 11
    DEBUG = 9


class QQMinium(MiniumObject):
    def __init__(self, conf, uri="ws://localhost", **kwargs):
        super().__init__()
        self.logger.info("init qq minium ...")
        self.sessions = {}
        self.app = None
        self.connection = None
        test_port = str(conf.test_port) if conf.get("test_port", None) else str(TEST_PORT)
        self.uri = uri + ":" + test_port
        self.project_path = conf.project_path
        self.test_port = test_port
        if conf.get("dev_tool_path", None):
            self.dev_tool_path = conf.dev_tool_path
        elif "Darwin" in platform.platform():
            self.dev_tool_path = MAC_DEVTOOL_PATH
        elif "Windows" in platform.platform():
            self.dev_tool_path = WINDOWS_DEVTOOL_PATH
        else:
            self.logger.warning("Dev tool doesn't support current OS yet")
        self._is_windows = "Windows" in platform.platform()
        self.launch_dev_tool()

    def launch_dev_tool(self):
        self.logger.info("Starting dev tool ...")
        if self.project_path:
            if not os.path.exists(self.dev_tool_path):
                raise MiniConfigError("dev_tool_path: %s not exists" % self.dev_tool_path)
            if not os.path.exists(self.project_path):
                raise MiniConfigError("project_path: %s not exists" % self.project_path)
            if not os.path.isdir(self.project_path):
                raise MiniConfigError("project_path: %s is not director" % self.project_path)
            if self._is_windows:
                cmd_template = '"%s" --auto %s --auto-port %s'
            else:
                cmd_template = "%s --auto %s --auto-port %s"
            cmd_start = cmd_template % (
                self.dev_tool_path,
                self.project_path,
                self.test_port,
            )
            status = self._do_shell(cmd_start, True)
            if self._is_windows:
                time.sleep(10)
            else:
                time.sleep(5)
            if status[-1] == "":
                self.logger.info("Dev tool is opening, but can't open project, quit now...")
                cmd = self.dev_tool_path + " --quit"
                self._do_shell(cmd, True)
                time.sleep(3)
                self.logger.info("Starting dev tool again...")
                status = self._do_shell(cmd_start, True)
                Exception("Please check MiniProgram project if config error or not") if status[
                    -1
                ] == "" else self.logger.info("Restart finish")
        else:
            status = ["Open project with automation enabled success  /Users/sherlock/svn/demo"]
        if "Open project with automation enabled success " in status[-1]:
            try:
                connection = Connection(self.uri)
                self.app = App(connection)
                self.connection = connection
            except Exception as e:
                import traceback

                traceback.print_exc()
                self.logger.exception(str(e))
                exit(0)
        else:
            self.logger.warning(
                "Open project with automation enabled fail! Try to login dev tool ..."
            )
            self.launch_dev_tool_with_login()

    def launch_dev_tool_with_login(self):
        if self._is_windows:
            cmd_template = '"%s" -l --login-qr-output terminal --auto --auto %s --auto-port %s'
        else:
            cmd_template = "%s  -l --login-qr-output terminal --auto --auto %s --auto-port %s"
        cmd_start = cmd_template % (
            self.dev_tool_path,
            self.project_path,
            self.test_port,
        )
        status = self._do_shell(cmd_start, True)
        if "Open project with automation enabled success " in status[-1]:
            connection = Connection(self.uri)
            self.app = App(connection)
            self.connection = connection
        else:
            self.logger.error(
                "Open project with automation enabled fail! make sure project path is right"
            )
            exit(-1)

    def get_app_json(self):
        if not self.project_path:
            return None
        try:
            paths = [
                os.path.join(self.project_path, "app.json"),
                os.path.join(self.project_path, "miniprogram", "app.json"),
            ]
            for path in paths:
                if os.path.exists(path):
                    return json.load(open(path, "rb"))
            raise FileNotFoundError()
        except Exception as e:
            self.logger.error("Get app json fail, cause: %s" % str(e))
            return None

    def get_system_info(self):
        return self.app.call_wx_method("getSystemInfoSync").result.result

    def enable_remote_debug(self, path=None, use_push=None, connect_timeout=None):
        if path is None:
            path = os.path.join("", "debug_qrcode.jpg")
        qrUrl = self.connection.send("Tool.enableRemoteDebug", max_timeout=180).result.qrUrl
        self.logger.debug("Tool.enableRemoteDebug  " + qrUrl)
        return qrUrl

    def shutdown(self):
        self.logger.info("QQ Dev tool closing")
        # if not os.path.exists(self.project_path):
        #     self.logger.error("dev_tool_path: %s not exists" % self.dev_tool_path)
        #     return
        if self._is_windows:
            status, ret = subprocess.getstatusoutput('"{self.dev_tool_path}" --quit')
            # status, ret = subprocess.getstatusoutput(f'"{self.dev_tool_path}" --quit')
        else:
            status, ret = subprocess.getstatusoutput("{self.dev_tool_path} --quit")
            # status, ret = subprocess.getstatusoutput(f'{self.dev_tool_path} --quit')

        if status == 0:
            self.logger.info("QQ Dev tool has quit, Minium Test complete")
        else:
            self.logger.error(ret)
            self.logger.warning("QQ Minium Test complete, but dev tool has not quit yet")
