#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author: lockerzhang
@LastEditors: lockerzhang
@Description: client 入口
@Date: 2019-03-11 14:42:52
@LastEditTime: 2019-06-05 15:05:04
"""
import platform
import os
import base64
import json
import re
import threading
import time
from websocket import WebSocketConnectionClosedException
from typing import Union, Optional

from ..utils.injectjs import getInjectJsCode, setInjectJsMode
from .base_driver.version import build_version
from .base_driver.minium import BaseMinium
from .base_driver.app import App
from .base_driver.connection import Connection, Command
from .base_driver.minium_object import MiniumObject
from .base_driver.callback import Callback
from ..framework.miniconfig import MiniConfig, get_log_level
from ..framework.exception import *
from ..native import get_native_driver, NativeType
from ..utils.platforms import *
from ..utils.utils import (
    isWindows,
    isMacOS,
    Version,
    WaitThread,
    WaitTimeoutError,
    add_path_to_env,
    pick_unuse_port,
    catch,
)
from ..utils.emitter import ee

MAC_DEVTOOL_PATH = "/Applications/wechatwebdevtools.app/Contents/MacOS/cli"
WINDOWS_DEVTOOL_PATH = "C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat"
TEST_PORT = 9420
UPLOAD_URL = "https://stream.weixin.qq.com/weapp/UploadFile"


class LogLevel(object):
    INFO = 20
    DEBUG_SEND = 12
    METHOD_TRACE = 11
    DEBUG = 9


class ConfigPath(str): ...


class ProjectPath(str): ...


def is_project_path(path: str):
    project_private_config_path = os.path.join(path, "project.private.config.json")
    project_config_path = os.path.join(path, "project.config.json")
    if os.path.isfile(project_config_path) or os.path.isfile(
        project_private_config_path
    ):
        return True
    return False


def is_config_path(path: str) -> Union[bool, MiniConfig]:
    if os.path.isfile(path):
        try:
            return MiniConfig.from_file(path)
        except:
            return False
    return False


class WXMinium(BaseMinium):
    """
    自动化入口
    """

    def __init__(
        self,
        conf: Union[MiniConfig, ConfigPath, ProjectPath] = None,
        uri="ws://localhost",
        native: NativeType = None,
        **kwargs,
    ):
        """
        初始化
        :param uri: WebSocket 地址
        :param conf: 配置
        :param native: native实例
        """
        super().__init__()
        # 私有变量
        self.__wait_for_initialized_time = None  # 等待app.initialized信号的最后时间
        # 公有变量
        if not conf:
            conf = MiniConfig()
        elif isinstance(conf, dict):
            conf = MiniConfig(conf)
        elif isinstance(conf, str):
            # 识别是否是 config.json / project_path
            ret = is_config_path(conf)
            if ret is not False:
                conf = ret
            elif is_project_path(conf):
                conf = MiniConfig({"project_path": conf})
            else:
                raise ValueError(f"{conf} 不是合法的 project path 或 config path")
        self.conf = conf
        self.logger.setLevel(get_log_level(conf.debug_mode))
        self.logger.debug(self.conf)
        self._native = native
        if native is None and conf.platform:
            try:
                self._native = get_native_driver(conf.platform, conf)
            except KeyError as ke:  # 配置不全
                self.logger.error(ke)
            except Exception as e:
                self.logger.warning(
                    f"instantiate {conf.platform} native driver fail: {str(e)}"
                )
            else:
                if not self.native.is_in_wechat():
                    self.native.start_wechat()
        self.version = build_version().get("version", "1.2.0")
        self.sdk_version: Version = Version("0.0.0")
        self.dev_tool_version: Version = Version("0.0.0")
        self.platform = "ide"  # ide, android, ios
        # self.logger.info(self.version)
        self.start_cmd = ""
        self._app = None
        self.connection = None
        test_port = (
            str(conf.test_port) if conf.get("test_port", None) else str(TEST_PORT)
        )
        if test_port == "rand":
            test_port = str(pick_unuse_port())
        self.uri = uri + ":" + test_port
        self.test_port = test_port
        self.open_id = conf.get("account_info", {}).get("open_id", None)
        self.ticket = conf.get("account_info", {}).get("ticket", None)
        self.project_path = conf.get("project_path", None)
        self.is_remote = False
        self.is_connected = False
        self.is_audits_running = False  # 体验评分在跑
        self.launch_app_lock = threading.RLock()  # 全局只需有一个launch app的线程
        self.__is_app_relaunching = False
        self.last_launch_time = time.time()
        self.last_launch_cost_time = 1  # 最后一次拉起小程序需要的时间
        self.last_launch_error = None  # 成功为none

        try:
            self.launch_weapp()

            if self.native:
                self.native.mini = self
            # 判断隐私状态
            if self.native:
                try:
                    need_authorization = self._call_wx_method(
                        "getPrivacySetting"
                    ).result.result.needAuthorization
                except NotImplementedError:
                    need_authorization = False  # 该版本没有隐私弹窗
                self.native._allowed_privacy = not need_authorization
            # 根据配置注入一些必要的代码
            if self.app and not self.app.is_injected:
                self._inject()
        except:
            ee.remove_listener(
                "ide_closed", self._relaunch_ide
            )  # 防止创建失败的minium实例仍引起relaunch
            raise

    @property
    def app(self) -> App:
        return self._app

    @app.setter
    def app(self, v: Optional[App]):
        if v:
            setInjectJsMode(v.js_mode)  # 每次更新app实例时更新一下
        self._app = v

    @property
    def native(self) -> NativeType:
        return self._native

    @native.setter
    def native(self, v: Optional[NativeType]):
        platform_change = False
        if v:
            if self._native is None or self._native.platform != v.platform:
                platform_change = True
        self._native = v
        if platform_change:
            self._native_platform_change(self._native.platform)

    @property
    def page(self) -> App.CurrentPage:
        return self.app.current_page

    def __del__(self):
        if self.native and self.conf.auto_authorize:
            self.native.release_auto_authorize()
        self.native = None

    def __getattr__(self, name):
        """
        当minium中方法不存在且native中存在，返回native的方法
        """
        if name != "native" and name != "_native" and self.native:
            item = getattr(self.native, name, None)
            if callable(item):
                return item
        raise AttributeError(
            "'%s' object has no attribute '%s'" % (self.__class__.__name__, name)
        )

    def _get_dev_tool_info(self):
        try:
            result = self.connection.send("Tool.getInfo", max_timeout=3).result
        except:
            # not support Tool.getInfo
            return
        self.sdk_version = Version(result.SDKVersion)
        if self.sdk_version < Version("2.7.3"):
            raise MiniLaunchError(
                "基础库版本[%s]过低，请确认基础库版本>=2.7.3" % self.sdk_version
            )
        self.dev_tool_version = Version(result.version)

    def __setup_dev_tool(self):
        if self.conf.get(
            "dev_tool_path", None
        ):  # 配置了cli路径(一定需要是路径), 检查路径是否正确
            if isWindows and not (
                self.conf.dev_tool_path.endswith("cli")
                or self.conf.dev_tool_path.endswith("cli.bat")
            ):
                raise MiniConfigError(
                    "[dev_tool_path] is not correct, it's usually named as 'cli' or 'cli.bat'"
                )
            self.dev_tool_path = self.conf.dev_tool_path
            if not os.path.exists(self.dev_tool_path):
                raise MiniConfigError(
                    "[dev_tool_path] is not correct, it should be a absolute path"
                )
            if isWindows and os.path.exists(self.dev_tool_path):
                add_path_to_env(os.path.dirname(self.dev_tool_path))
                self.dev_tool_path = os.path.basename(self.dev_tool_path)
        else:  # 检查默认配置
            if isMacOS:
                if os.path.exists(MAC_DEVTOOL_PATH):
                    self.dev_tool_path = MAC_DEVTOOL_PATH
                elif self._do_shell("which cli")[
                    0
                ].strip():  # 看看cli是否已经加到path, 可以直接调用
                    self.dev_tool_path = "cli"
                else:
                    self.logger.warning(
                        "default dev_tool_path[%s] not exists and command[cli] not found"
                        % MAC_DEVTOOL_PATH
                    )
                    self.dev_tool_path = None
            elif isWindows:
                if os.path.exists(WINDOWS_DEVTOOL_PATH):
                    # "${WINDOWS_DEVTOOL_PATH}" auto --project xxx --auto-port 9420  ---  有些用户有问题
                    # add path to env, cli.bat auto --project xxx --auto-port 9420  --- 最新使用这种
                    add_path_to_env(os.path.dirname(WINDOWS_DEVTOOL_PATH))
                    self.dev_tool_path = os.path.basename(WINDOWS_DEVTOOL_PATH)
                elif self._do_shell("where cli.bat")[
                    0
                ].strip():  # 看看cli是否已经加到path, 可以直接调用
                    self.dev_tool_path = "cli.bat"
                else:
                    self.logger.warning(
                        "default dev_tool_path[%s] not exists and command[cli.bat] not found"
                        % WINDOWS_DEVTOOL_PATH
                    )
                    self.dev_tool_path = None
            else:
                self.logger.warning("Dev tool doesn't support current OS yet")
                self.dev_tool_path = None

        # 用到project path的时候一定需要cli path
        if self.project_path and not self.dev_tool_path:
            raise MiniConfigError(
                "dev_tool_path not exists and not config default cli command"
            )

    def __wait_app_initialized(self, signal: Command):
        """
        等待 {signal.method} 信号, 代表小程序ready了, 可以响应命令了
        """
        self.__wait_for_initialized_time = time.time()
        timeout = signal.max_timeout
        self.logger.info(
            "wait for [%s], start at %d"
            % (signal.method, self.__wait_for_initialized_time)
        )
        ret = self.connection.wait_for(signal)
        ctime = time.time()
        if not ret and (ctime - self.__wait_for_initialized_time) < timeout:
            # 没有监听到信号，同时等待期间时间有更新
            if signal.is_cancel:
                return ret
            signal.max_timeout = timeout - (ctime - self.__wait_for_initialized_time)
            self.logger.warning(
                "rewait [%s] for %f" % (signal.method, signal.max_timeout)
            )
            ret = self.connection.wait_for(signal)
        return ret

    def _evaluate_js(
        self,
        filename,
        args=None,
        sync=True,
        default=None,
        code_format_info=None,
        **kwargs,
    ):
        """
        重写, 默认使用self.app.js_mode参数
        """
        return super(WXMinium, self)._evaluate_js(
            filename, args, sync, default, code_format_info, self.app.js_mode, **kwargs
        )

    def _inject(self):
        # conf.mock_native_modal
        use_native = getattr(self.native, "use_native", False)
        if self.platform == "ide" and isinstance(self.conf.mock_native_modal, dict):
            # IDE上不支持部分原生接口, 用特殊方法mock
            # mini_auth_setting: 记录MOCK过的授权窗，如果确认过授权，后面不需要再通过handle来点击;
            # mock_native_modal_list: 回调栈;
            # handle_mock_native_modal: 弹窗操作;
            # handle_mock_map_modal: 地图操作;
            # mock_native_modal: 添加回调栈;
            # mock_map_modal: 添加地图操作回调栈
            has_mock_native_modal = self._evaluate_js("ideMockModal")
            if not has_mock_native_modal:
                # mock wx.showModal
                not use_native and self._mock_show_modal()
                # mock wx.showActionSheet, action sheet不支持ide的native操作
                self._mock_show_action_sheet()
                # mock wx.requestSubscribeMessage
                not use_native and self._mock_request_subscribe_message()
                # 授权相关接口需要先获取SETTING
                mini_setting = (
                    self.app.call_wx_method("getSetting")
                    .get("result", {})
                    .get("result")
                )
                # 获取到原始setting，mock这个接口
                not use_native and self.app._mock_wx_js(
                    "getSetting", "ideMockAuthSetting"
                )
                # 因为不是真正授权了，只能返回一个假的授权状态
                not use_native and self.app._mock_wx_js("authorize", "ideMockAuth")
                # mock wx.getLocation，先看看是否有`scope.userLocation`权限，如果已有，则不需要MOCK
                if (
                    not use_native
                    and mini_setting["authSetting"].get("scope.userLocation") is None
                ):  # 没有授权，mock掉使之不弹窗
                    self._mock_get_location(
                        self.conf.mock_native_modal.get("location", {})
                    )
                # mock wx.chooseLocation, 授权过获取位置也应该mock掉，不然会弹窗
                # ide 暂不支持原生 select location
                if mini_setting["authSetting"].get(
                    "scope.userLocation"
                ) in (
                    None,
                    True,
                ):
                    self._mock_choose_location(
                        self.conf.mock_native_modal.get("location", {}),
                        self.conf.mock_native_modal.get("locations", {}),
                    )
                # mock getWeRunData, 没有授权，mock掉使之不弹窗, 返回的参数由于有加密信息，直接mock数据会导致后面后台解密过不去，需要添加配置来输入MOCK数据
                if (
                    not use_native
                    and mini_setting["authSetting"].get("scope.werun") is None
                ):
                    self._mock_get_we_run_data(
                        self.conf.mock_native_modal.get("weRunData", {}).get(
                            "encryptedData", "testencryptedData"
                        ),
                        self.conf.mock_native_modal.get("weRunData", {}).get(
                            "iv", "testiv"
                        ),
                    )
                # mock getUserProfile, 基础库2.10.4后才支持
                if self.sdk_version >= Version("2.10.4"):
                    not use_native and self._mock_get_user_profile(
                        self.conf.mock_native_modal.get("userInfo", {})
                    )

        # conf.mock_request
        self._evaluate_js(
            "mockNetwork",
            args=[
                "request",
            ],
        )  # 先mock, 再打开network panel才能记录mock的请求
        if self.conf.mock_request and isinstance(self.conf.mock_request, (list, tuple)):
            for item in self.conf.mock_request:
                try:
                    self.app.mock_request(**item)
                except Exception as e:
                    self.logger.exception(
                        "mock_request config error, configure item is %s, error is %s"
                        % (str(item), str(e))
                    )

        # conf.auto_authorize
        if self.conf.auto_authorize and self.native:  # 需要native实例来处理
            self._set_auto_authorize()

        # conf.mock_images_dir
        # 需要进行mock的图片放置的文件夹
        # conf.mock_images
        # 需要进行mock的图片的kv对
        if self.conf.mock_images_dir or self.conf.mock_images:
            # mockChooseImage
            self.app.reflesh_mocked_images(
                self.conf.mock_images_dir, self.conf.mock_images
            )

    def _set_auto_authorize(self):
        self.native.set_auto_authorize()

        # hook 可能引起弹窗的函数: authorize, getLocation, chooseLocation, getWeRunData, getUserProfile
        def notify(*args):
            self.native.notify()

        self.app.hook_wx_method("authorize", after=notify)
        self.app.hook_wx_method("getLocation", after=notify)
        self.app.hook_wx_method("chooseLocation", after=notify)
        self.app.hook_wx_method("getWeRunData", after=notify)
        self.app.hook_wx_method("getUserProfile", after=notify)
        notify()  # 小程序可能刚起来就会有授权弹窗

    def _mock_show_modal(self):
        """
        mock showModal, 不弹窗, 但可以用native方法调用
        """
        self.app._mock_wx_js("showModal", "ideMockShowModal")

    def _mock_show_action_sheet(self):
        """
        mock showActionSheet, 不弹窗, 但可以用native方法调用
        """
        self.app._mock_wx_js("showActionSheet", "ideMockShowActionSheet")

    def _mock_request_subscribe_message(self):
        """
        mock requestSubscribeMessage, 不弹窗, 但可以用native方法调用
        """
        self.app._mock_wx_js("requestSubscribeMessage", "ideMockSubscribeMessage")

    def _mock_get_location(self, location=None):
        """
        mock getLocation, 不弹窗, 但可以用native方法调用
        """
        if location is None:
            location = {}
        self.app._mock_wx_js("getLocation", "ideMockGetLocation", location)

    def _mock_choose_location(self, location, locations):
        """
        mock chooseLocation, 不弹窗, 但可以用native方法调用
        """
        self.app._mock_wx_js(
            "chooseLocation", "ideMockChooseLocation", (location, locations)
        )

    def _mock_get_we_run_data(self, encrypted_data, iv):
        """
        mock getWeRunData, 不弹窗, 但可以用native方法调用
        """
        self.app._mock_wx_js(
            "getWeRunData", "ideMockGetWeRunData", (encrypted_data, iv)
        )

    def _mock_get_user_profile(self, user_info):
        """
        mock getUserProfile, 不弹窗, 但可以用native方法调用
        """
        self.app._mock_wx_js("getUserProfile", "ideMockGetUserProfile", user_info)

    def _dev_cli(self, cmd, input=b""):
        cmd_template = "%s %s"
        # do_shell 返回 output & error, 但是，实际上cli命令out返回的是error message, err返回的是output message
        err, out = self._do_shell(cmd_template % (self.dev_tool_path, cmd), input=input)
        if err:
            print("[!] ERR: %s" % err)
            print("[!] OUT: %s" % out)
            # error like:
            # [error] {
            #   code: 10,
            #   message: 'Error: 错误 Error: Port 9422 is in use (code 10)Error: Port 9422 is in use\n' +
            #     '    at Object.exports.auto [as method] (f6d9ab0.js:2:925)\n' +
            #     '    at processTicksAndRejections (node:internal/process/task_queues:93:5)\n' +
            #     '    at async f8c86db.js:2:3593\n' +
            #     '    at async Object.<anonymous> (df8c86db.js:2:2983)'
            # }
            # reg = re.search(
            #     r"(\[error\]\s*{\s*code:\s*(\d+),\s*message:.*(Error:.*\(code\s\d+\)))",
            #     err,
            #     re.M,
            # )
            # if reg:
            #     # 提取message信息返回
            #     return reg.group(3)
            return out
        return

    def _get_system_info(self):
        """
        description: 获取当前系统信息，更新platform/sdk_version
        param {*} self
        return {*}
        """
        try:
            system_info = self.get_system_info()
        except MiniTimeoutCauseByConnectionBreakError:
            # 链接断链了
            raise
        except MiniTimeoutError as te:
            # 命令没响应，应该是基础库版本问题
            if self.sdk_version < Version("2.7.3"):
                raise MiniLaunchError(
                    "基础库版本[%s]过低，请确认基础库版本>=2.7.3" % self.sdk_version
                ) from te
            raise
        self.sdk_version = Version(
            system_info.get("SDKVersion", None) or self.sdk_version.version
        )
        platform = system_info.get("platform", "ide").lower()
        self.platform = "ide" if platform == "devtools" else platform

    def _native_platform_change(self, platform):
        if platform != "ide" and self.platform == "ide":
            # launch/connect后仍然是ide, 需要启动远程调试
            try:
                path = self.enable_remote_debug(
                    use_push=self.conf.get("use_push", True),
                    connect_timeout=self.conf.get("remote_connect_timeout", 180),
                )
            except (
                RemoteDebugConnectionLost
            ):  # 远程连接建立后仍然报 remote lost, 可能是小程序挂了
                self.release()
                raise
            except MiniLaunchError as ml:  # 怎么都拉不起, 尝试重启小程序
                if self.native:
                    self.native.start_wechat()
                raise ml
            self.qr_code = path

    def _app_initialized_callback(self, args):
        params = args[0] if isinstance(args, (tuple, list)) and len(args) == 1 else args
        self.logger.info("receive App.initialized")
        if params and params.get("from") == "devtools":

            def _relaunch():
                if not self.launch_app_lock.acquire(False):
                    self.logger.info("other thread relaunching app")
                    # 已经有线程在 launch weapp
                    return
                self.logger.info("start instantiate app %d" % threading.get_ident())
                self.__is_app_relaunching = True
                stime = time.time()
                # 真机调试下也有可能刷
                try:
                    self._get_system_info()
                    if self.platform != "ide":
                        return
                    if self.app:
                        injected = (
                            self.app.evaluate(
                                """function(){return (global.__minium__) ? true : false}""",
                                sync=True,
                            )
                            .get("result", {})
                            .get("result", False)
                        )
                        if injected:
                            self.logger.warning(
                                "receive App.initialized, but not relaunch miniprogram"
                            )
                            return
                    # 收到 App.initialized 说明是第一次打开, 不需要 relaunch
                    self._instantiate_app(False)
                    if not self.app.is_injected:
                        self._inject()
                except Exception as e:
                    self.logger.exception(e)
                finally:
                    self.logger.info(
                        f"end instantiate app, cost: {time.time() - stime}"
                    )
                    self.__is_app_relaunching = False
                    self.launch_app_lock.release()

            t = threading.Thread(target=_relaunch)
            t.setDaemon(True)
            t.start()
            return t

    def _listen_app_initialized(self):
        # listen {"method":"App.initialized","params":{"from":"devtools"}}
        # 单例
        self.connection.remove("App.initialized", self._app_initialized_callback)
        self.connection.register("App.initialized", self._app_initialized_callback)

    @property
    def is_app_relaunching(self):
        return self.__is_app_relaunching

    def launch_weapp(self):
        """
        拉起小程序
        """
        self.__setup_dev_tool()
        stime = time.time()
        self.launch_dev_tool()
        if self.platform == "ide":
            # launch/connect后仍然是ide, 需要启动远程调试
            self._native_platform_change(self.conf.get("platform", None))
        self.last_launch_cost_time = time.time() - stime
        self._listen_app_initialized()

    def _relaunch_ide(self, *args):
        """重新拉起ide"""
        if not self.app:
            self.logger.error("relaunch app but app is never launch successfully, pass")
            return

        def _relaunch():
            if not self.launch_app_lock.acquire(False):
                self.logger.info("other thread relaunching app")
                # 已经有线程在 launch weapp
                return
            self.logger.info("start relaunch app %d" % threading.get_ident())
            self.__is_app_relaunching = True
            stime = time.time()
            try:
                if (
                    self.start_cmd
                    and "--auto-account" in self.start_cmd
                    and self.connection
                ):
                    try:
                        self.logger.info("try to close tool")
                        setattr(self.connection, "_is_close_by_cmd", True)
                        self.connection.send_async("Tool.close", ignore_response=True)
                        if self.native and self.platform != "ide":
                            self.native.close_local_debug_modal()
                    except:
                        pass
                if self.connection:
                    self.connection.destroy()
                self.close_project()
                self.launch_dev_tool()
                if self.platform == "ide":
                    self._native_platform_change(self.conf.get("platform", None))
                self.last_launch_cost_time = time.time() - stime
                self.last_launch_error = None
                # 根据配置注入一些必要的代码
                if not self.app.is_injected:
                    self._inject()
                self._listen_app_initialized()
            except Exception as e:
                self.last_launch_error = e
                self.logger.exception(e)
                if self.connection:
                    self.connection.destroy()
            finally:
                self.logger.info("end relaunch app")
                self.__is_app_relaunching = False
                self.launch_app_lock.release()

        t = threading.Thread(target=_relaunch)
        t.setDaemon(True)
        t.start()
        return t

    def _update_project_config(self):
        project_private_config_path = os.path.join(
            self.project_path, "project.private.config.json"
        )
        project_config_path = os.path.join(self.project_path, "project.config.json")
        if os.path.isfile(project_config_path):
            conf = {}
            setting = {}
            with open(project_config_path, "r", encoding="UTF-8") as fd:
                j = json.loads(fd.read().strip())
            if os.path.isfile(project_private_config_path):
                with open(project_private_config_path, "r", encoding="UTF-8") as fd:
                    j.update(json.loads(fd.read().strip()))
            self.sdk_version = Version(
                j.get("libVersion", "").strip() or self.sdk_version.version
            )
            if self.sdk_version < Version("2.7.3"):  # 尝试fix基础库版本信息
                conf["libVersion"] = "3.0.0"  # latest应该是不合法的
            # update setting
            if j.get("setting", None) is None:
                j["setting"] = {}
            if (
                self.conf.audits is not None
            ):  # 即使工具启动了，修改config.json依然会开始运行体验评分，所以每次launch认为audit running
                setting["autoAudits"] = self.conf.audits
            if conf:  # 需要更新
                j.update(conf)
                j["setting"].update(setting)
                json.dump(j, open(project_config_path, "w", encoding="UTF-8"), indent=2)

    def close_project(self):
        if not self.start_cmd:
            return
        if self.project_path and "--auto-account" not in self.start_cmd:
            self._dev_cli(f'close --project "{self.project_path}"')

    def launch_dev_tool(self):
        """加载开发者工具
        拉起开发者工具 -> 连接开发者工具 -> 实例化 App
        """
        # start dev tool with minium model
        self.logger.info("Starting dev tool and launch MiniProgram project ...")
        is_port_in_use = False
        if self.project_path:
            if not os.path.exists(self.project_path):
                raise MiniConfigError("project_path: %s not exists" % self.project_path)
            if not os.path.isdir(self.project_path):
                raise MiniConfigError(
                    "project_path: %s is not directory" % self.project_path
                )
            if not os.path.isfile(
                os.path.join(self.project_path, "project.config.json")
            ):
                raise MiniConfigError(
                    "can't find project.config.json in %s, please confirm the directory contains"
                    " miniproject project" % self.project_path
                )
            self._update_project_config()
            # config start cmd
            self.start_cmd = 'auto --project "%s" --auto-port %s' % (
                self.project_path,
                self.test_port,
            )
            if self.open_id:
                self.start_cmd += f" --auto-account {self.open_id}"
            elif self.ticket:
                self.start_cmd += f" --test-ticket {self.ticket}"
            # run cmd
            err_msg = self._dev_cli(self.start_cmd, input=b"y")
            if err_msg:
                # launch error
                if "Port %s is in use" % self.test_port in err_msg:
                    # 开发者工具可能已经打开并占用了测试端口, 可直接尝试连接
                    is_port_in_use = True
                else:
                    # 其他错误直接报错看看什么问题
                    self.logger.error(err_msg)
                    # raise MiniLaunchError("raise others" + err_msg)
            else:
                # launch success, wait ide init
                if isWindows:
                    # windows更卡
                    time.sleep(10)
                else:
                    time.sleep(5)
        else:
            self.start_cmd = None
            self.logger.warning(
                "Can not find `project_path` in config, that means you must open dev tool by"
                " automation way first"
            )
            self.logger.warning(
                "If you are not running command like [cli auto --project /path/to/project"
                " --auto-port 9420], you may config `project_path` or run this command first"
            )
            err_msg = None
        try:
            self.connect_dev_tool(is_port_in_use)
            return
        except MiniConnectError as e:
            # ws连接不上
            self.logger.error(f"{str(e)}, restart now...")
            if is_port_in_use:
                # 端口被占用，先尝试关掉项目再重试
                if self.connection:
                    self.connection.send("Tool.close")
                elif "--auto-account" not in self.start_cmd:
                    self.close_project()
                else:
                    raise MiniLaunchError(
                        "In the case with multi-account mode and no connection with dev tool,"
                        " please close devtools by your self"
                    ) from e
                time.sleep(5)
            if self.start_cmd:  # 重启一次
                self.logger.info("Starting dev tool again...")
                err_msg = self._dev_cli(self.start_cmd, input=b"y")
                if err_msg:
                    raise MiniLaunchError(err_msg) from e
                else:
                    self.logger.info("Restart success")
                    # launch success, wait ide init
                    if isWindows:
                        # windows更卡
                        time.sleep(10)
                    else:
                        time.sleep(5)
                self.connect_dev_tool(False)
                return
            raise e
        except MiniLaunchError:
            # 初始化app error
            raise

    def connect_dev_tool(self, should_relaunch=False):
        """链接开发者工具并实例化 App"""
        i = 3
        while i:
            try:
                self.logger.info(f"Trying to connect Dev tool: {self.uri}")
                
                self.connection = Connection.create(
                    self.uri, timeout=self.conf.get("request_timeout")
                )
                self._get_dev_tool_info()
                # 直连 / 端口占用后直连的情况都应relaunch复位一下
                self._instantiate_app(not self.start_cmd or should_relaunch)
                ee.on("ide_closed", self._relaunch_ide)
            except RemoteDebugConnectionLost:  # 链接上了, 但小程序没有响应
                raise
            except MiniLaunchError:
                raise
            except Exception as e:
                self.logger.exception(e)
                i -= 1
                if i == 0:
                    raise MiniConnectError(
                        "three times try to connect Dev tool has all fail ..."
                    )
                continue
            else:
                break
        self.is_connected = True
        self.is_audits_running = self.conf.audits
        return True

    def launch_dev_tool_with_login(self):
        # login first
        if not self.dev_tool_path or not os.path.exists(self.dev_tool_path):
            raise MiniConfigError("dev_tool_path: %s not exists" % self.dev_tool_path)
        if isWindows:
            cmd_template = '"%s"  login'
        else:
            cmd_template = "%s login"
        # 需要输出二维码，所以直接用os.system就好了
        ret = os.system(cmd_template % self.dev_tool_path)
        if ret == 0:
            return self.launch_dev_tool()

    def _instantiate_app(self, should_relaunch=False):
        """实例化 app"""
        # 获取当前真正的 platform
        # should_relaunch: 非第一次拉起才需要 relaunch
        self._get_system_info()
        if self.app:
            app = self.app
            app.release()  # 释放上一个
            del app
        self.app = App(
            self.connection,
            self.conf.get("auto_relaunch") and should_relaunch,
            native=self.native,
            platform=self.platform,
            enable_h5=self.conf.get("enable_h5", True),
            autofix=self.conf.get("autofix", False),
            # extra info
            sdk_version=self.sdk_version,
        )
        self.logger.info(f"new app instanst {self.app}, whether should relaunch: {should_relaunch}")
        self.last_launch_time = time.time()

    def get_app_config(self, *names):
        """
        获取 app 的配置
        :return: object
        """
        return self._evaluate_js("getAppConfig", args=names)

    def get_system_info(self):
        """
        获取系统信息
        :return:
        """
        return (
            self._call_wx_method("getSystemInfoSync")
            .get("result", {"result": {}})
            .get("result", None)
        )

    def enable_remote_debug(self, use_push=True, path=None, connect_timeout=180):
        """
        开启真机调试
        监听信号:
        v1: App.initialized
        v2: Tool.onRemoteDebugConnected
        """
        self.reset_remote_debug()
        time.sleep(2)
        RETRY_TIMES = 3
        if use_push:
            retry_times = RETRY_TIMES
            while retry_times > 0:
                thread1 = None
                thread2 = None
                semaphore = threading.Semaphore(0)  # 用Semaphore标记其中一个信号已到达
                try:
                    cmd1 = Command(
                        "App.initialized",
                        max_timeout=connect_timeout + 30 * (RETRY_TIMES - retry_times),
                    )
                    thread1 = WaitThread(
                        target=self.__wait_app_initialized,
                        args=(cmd1,),
                        semaphore=semaphore,
                    )
                    thread1.setDaemon(True)
                    thread1.start()
                    cmd2 = Command(
                        "Tool.onRemoteDebugConnected",
                        max_timeout=connect_timeout + 30 * (RETRY_TIMES - retry_times),
                    )
                    thread2 = WaitThread(
                        target=self.__wait_app_initialized,
                        args=(cmd2,),
                        semaphore=semaphore,
                    )
                    thread2.setDaemon(True)
                    thread2.start()
                    self.logger.info(
                        f"Enable remote debug, for the {4 - retry_times}th times"
                    )
                    self.connection.send(
                        "Tool.enableRemoteDebug",
                        params={"auto": True},
                        max_timeout=connect_timeout,
                    )
                    self.is_remote = True
                    # 成功发起远程调试后, update一下等待时间
                    self.__wait_for_initialized_time = time.time()
                except Exception as e:
                    retry_times -= 1
                    self.logger.error("enable remote debug fail ...")
                    self.logger.error(e)
                    if retry_times == 0:
                        self.logger.error(
                            "Enable remote debug has been fail three times. Please check your"
                            " network or proxy effective or not "
                        )
                        raise
                    continue
                else:
                    retry_times -= 1
                    ret1 = ret2 = False
                    if self.native:
                        while not semaphore.acquire(timeout=10):
                            # 等待初始化信号, 每 10s 检测一下是不是【断开连接】
                            if not self.native.check_connected():
                                self.logger.warning("出现连接断开的情况，重试...")
                                break
                    else:
                        semaphore.acquire()  # 等待初始化信号
                    if thread1:
                        ret1 = thread1.get_result(block=False) or False
                    if thread2:
                        ret2 = thread2.get_result(block=False) or False
                    if retry_times == 0 and ret1 is False and ret2 is False:
                        self.logger.error(
                            "Wait for APP initialized has been fail three times. Please check your"
                            " phone's current foreground APP is WeChat or not, and check"
                            " miniProgram has been open or not "
                        )
                        raise MiniLaunchError("Launch APP Error")
                    cmd1.cancel()
                    cmd2.cancel()
                    if ret1 is True or ret2 is True:
                        break
                    else:
                        # 等不到App.initialized一般就是白屏，通道不通，exit会报错，跳出重试，需要catch
                        # if self.native and not self.native.check_connected():
                        #     self.logger.warning("出现连接断开的情况，重试...")
                        try:
                            self.app.exit()
                        except (MiniTimeoutError, MiniConnectionClosedError):
                            # 白屏的时候切换一下扫码编译，有时会有意想不到效果
                            self.connection.send(
                                "Tool.enableRemoteDebug",
                                params={"auto": False},
                                max_timeout=connect_timeout,
                            )
            # 远程调试开启成功后，小程序运行态已经转到手机，需要重新实例化app
            self._instantiate_app(False)
            setattr(self.connection, "_is_close_app_by_cmd", False)  # 重新拉起重置一下
            if not self.app.is_injected:
                self._inject()
            return None
        if path is None:
            path = os.path.join(self.conf.outputs, "debug_qrcode.jpg")
        qr_data = self.connection.send(
            "Tool.enableRemoteDebug", max_timeout=connect_timeout
        ).result.qrCode
        with open(path, "wb") as qr_img:
            qr_img.write(base64.b64decode(qr_data))

        return path

    @catch
    def reset_remote_debug(self):
        """
        重置远程调试，解决真机调试二维码扫码界面报-50003 等常见错误
        :return:
        """
        return self.connection.send("Tool.resetRemoteDebug")

    def clear_auth(self):
        """
        清除用户授权信息. 公共库 2.9.4 开始生效
        :return:
        """
        if (
            self.conf.mock_native_modal and self.conf.platform == "ide"
        ):  # 对授权弹窗MOCK了，需要清除MOCK信息
            self._evaluate_js("clearMockAuth")
        self.connection.send("Tool.clearAuth")
        if self.native:
            self.native._allowed_privacy = False

    def get_test_accounts(self):
        """
        获取已登录的真机账号
        :return: list [{openid, nickName}]
        """
        return self.connection.send("Tool.getTestAccounts").result.accounts

    def shutdown(self):
        """
        关闭 Driver, 释放native引用
        :return: status
        """
        ee.remove_listener("ide_closed", self._relaunch_ide)
        if self.native and getattr(self.native, "mini", None):
            self.native.mini = None  # IDE native借用minium通信通道交互
        self.native = None
        # 释放app
        if self.is_remote and self.app:
            try:
                self.logger.info("MiniProgram closing")
                self.app.exit()
            except (
                MiniTimeoutError,
                MiniAppError,
                WebSocketConnectionClosedException,
                MiniConnectionClosedError,
            ) as e:
                self.logger.exception(f"Close app excrption:{e}")
            finally:
                self.is_remote = False
                if self.app is not None:
                    self.app.native = None
                    self.app = None
        # 释放connection
        if self.connection:
            try:
                setattr(self.connection, "_is_close_by_cmd", True)
                self.connection.send_async("Tool.close", ignore_response=True)
            except (
                WebSocketConnectionClosedException,
                MiniConnectionClosedError,
                MiniClientOfflineError,
            ):
                pass
            finally:
                if self._wait(
                    lambda: not self.connection._is_connected, 5, 1
                ):  # already closed
                    self.connection.remove_all_observers()
                else:
                    self.connection.destroy()
                self.connection = None

    def stop_audits(self, report_path=None):
        """
        停止体验评分
        """
        if self.is_audits_running and self.app.platform == "ide":  # 仅工具上有意义
            self.logger.info("stopping audits")
            self.is_audits_running = False
            try:
                self.app.stop_audits(
                    report_path
                    or (
                        self.conf.outputs
                        and os.path.join(self.conf.outputs, "audits.html")
                    )
                )
            except (
                MiniTimeoutError,
                MiniAppError,
                WebSocketConnectionClosedException,
                MiniConnectionClosedError,
            ) as e:
                self.logger.exception(f"Stop audits excrption:{e}")

    def release(self):
        """
        释放所有资源, 不允许在case中调用
        :return: None
        """
        native = self.native
        # 停止体验评分, 结果存outputs目录
        self.stop_audits()
        self.shutdown()
        # 清理一下手机弹窗
        if self.conf.platform != "ide" and native:
            native.close_local_debug_modal()
        native = None

    def wait_app_relaunch(self, timeout=None) -> Optional[Exception]:
        wait_launch_time = (
            self.last_launch_cost_time + 20 if timeout is None else timeout
        )
        self.logger.warning(
            f"app is relaunching, wait {wait_launch_time} seconds for it"
        )
        if not self.launch_app_lock.acquire(timeout=wait_launch_time):
            return TimeoutError(
                f"app did not relaunch within {wait_launch_time} seconds"
            )
        self.logger.warning("app is relaunch complete")
        self.launch_app_lock.release()
        if self.last_launch_error:
            return self.last_launch_error


if __name__ == "__main__":

    mini = WXMinium()
