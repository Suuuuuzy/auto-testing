#!/usr/bin/env python3
# Created by xiazeng on 2019-05-06
import datetime
import json
import os.path
import shutil
import time
import inspect
import copy

import minium
import minium.miniprogram.base_driver.minium_log
import minium.native
import xml.dom.minidom
from minium.native.exception import *
from .miniconfig import MiniConfig
from .assertbase import AssertBase, HookAssert
from .libs.unittest import SkipTest
from .logcolor import *
from .exception import *
from ..utils.emitter import ee
from ..utils.utils import retry, catch, crop_img
from .miniprogram import MiniProgram
from ..miniprogram import Minium
from ..miniprogram.base_driver.app import App
from ..miniprogram.base_driver.page import Page
from ..miniprogram.base_driver.element import BaseElement
from ..native import NativeType
from typing import Tuple, List, TypedDict, Dict, Literal, Optional, Union
from minium.miniprogram.base_driver.minium_log import report_exception, ExceptionData, report_usage, report, FeatureData
from .findwxml import search, log_search_result, get_search_result_info


# import matplotlib.pyplot as plt

logger = logging.getLogger("minium")

# {timestamp: float, start_timestamp: int, request: Union[dict, None], end_timestamp: int, response: Union[dict, None}]
class NetworkMessage(TypedDict):
    timestamp: float
    start_timestamp: int
    request: Optional[dict]
    response: Optional[dict]
    end_timestamp: int

# {"type": "log|warn|error", "message": str, "dt": str}
class LogMessage(TypedDict):
    __required_keys__ = ["type", "dt"]
    __optional_keys__ = ["args", "message"]
    type: Literal["log", "warn", "error"]
    message: str
    args: List[str]
    dt: str


g_minium: Minium = None
g_native: NativeType = None
g_log_message_list: List[LogMessage] = []
g_network_message_dict: Dict[str, NetworkMessage] = {}  # 记录请求消息
g_network_req_cache = {}  # 记录请求体消息(降低重复请求消息量)
g_network_resp_cache = {}  # 记录请求返回消息(降低重复请求消息量)
FRAMEWORK_RETRY = 1  # case失败, 框架针对错误进行重试的次数
NATIVE_CACHE = {}  # platform -> native


def full_reset():
    """
    在整个测试流程结束之后调用
    1. miniProgram 部分同 reset_minium()
    2. native 部分
        1.1 关闭微信
        1.2 释放原生 driver
    :return:
    """
    global g_minium, g_native
    if g_minium:
        reset_minium()
    for platform in list(NATIVE_CACHE.keys()):
        native = NATIVE_CACHE[platform]
        reset_native(native)
        if native == g_native:
            g_native = None
        NATIVE_CACHE.pop(platform)
    if g_native:
        reset_native(g_native)
        g_native = None

def reset_native(native: NativeType):
    logger.info("reset_native")
    try:
        native.stop_wechat()
    except Exception:
        pass
    try:
        native.release()
    except Exception:
        logger.exception("release native")
        

def reset_minium():
    """
    1. miniProgram 部分 release
        1.1 非 ide 运行退出小程序
    2. 释放所有观察者的事件监听
    3. 销毁与 ide 的连接
    :return:
    """
    global g_minium
    logger.info("reset_minium")
    if g_minium:
        g_minium.release()
    g_minium = None


def get_native(cfg: MiniConfig) -> NativeType:
    """
    native 部分完全由配置中的 platform 参数控制
    为了确保不会过多地重启微信，已存在 g_native 则不创建,
    teardown 的时候也不会 release
    :param cfg: 配置
    :return:
    """
    global g_native
    platform = cfg.platform.lower()
    if g_native is None:
        g_native = minium.native.get_native_driver(platform, cfg)
        g_native.start_wechat()
        NATIVE_CACHE[platform] = g_native
    elif g_native.platform != platform:
        if platform in NATIVE_CACHE:
            g_native = NATIVE_CACHE[platform]
            if g_native.check_connection():
                return g_native
            # 旧的实例不能用了, release掉重新实例化
            g_native.release()
            g_native = None
            NATIVE_CACHE.pop(platform)
            return get_native(cfg)
        else:
            g_native = None  # 不用release, 重新实例化一个就可以了
            return get_native(cfg)
    return g_native


def get_minium(cfg: MiniConfig) -> Minium:
    """
    miniProgram 部分每次 classTearDown 是否 release 由配置 close_ide 控制
    初始化有如下工作：
        1. 处理配置
        2. 如果配置了 project_path 则启动 ide
        3. 连接 ide
        4. 根据配置 platform 判断是否需要远程调试
        5. 根据配置 enable_app_log 判断是否需要监听小程序 log 输出
        6. 根据配置 enable_network_panel 判断是否需要监听小程序 request, downloadFile, uploadFile 输出
    :param cfg: 配置
    :return:
    """
    global g_minium, g_native
    if g_minium is not None and (
        cfg.close_ide or cfg.full_reset
    ):  # 如果是配置了close_ide的，先release minium
        reset_minium()
    if g_minium is None:
        g_minium = minium.miniprogram.get_minium_driver(conf=cfg, native=g_native)

        if not cfg.use_push and cfg.platform != "ide":
            g_native.connect_weapp(g_minium.qr_code)
            ret = g_minium.connection.wait_for(method="App.initialized")
            if ret is False:
                raise MiniAppError("Launch MiniProgram Fail")

        if cfg.enable_app_log:
            g_minium.app.on_exception_thrown(mini_exception_log_added)
            g_minium.connection.register("App.logAdded", mini_log_added)
            g_minium.app.enable_log()

        if cfg.enable_network_panel:
            # 没有uuid库，随便注入一个随机ID库
            g_minium.app._evaluate_js("uuid")
            g_minium.app.expose_function("mini_request_callback", request_callback)
            g_minium.app.expose_function("mini_send_request", send_request)
            g_minium.app._evaluate_js("networkPannel")

        if cfg.platform == "ide" and g_native:
            g_native.mini = g_minium  # ide native接口通过minium实现
    elif g_minium.native != g_native:
        logger.warning("Minium中native驱动改变")
        if g_native is not None:
            g_minium.native = g_native

    return g_minium


def init_miniprogram(cfg: MiniConfig) -> Tuple[NativeType, Minium, MiniProgram]:
    """
    初始化小程序
    1. 初始化native
    2. 启动微信
    3. 拉起小程序
    4. 获取必要的小程序信息
    """
    logger.info("start init miniprogram")
    native = get_native(cfg)
    mini = get_minium(cfg)
    appid = cfg.appid
    if appid and MiniProgram.get_instance(f"{appid}_{cfg.platform}"):
        logger.info("miniprogram exists")
        return native, mini, MiniProgram.get_instance(f"{appid}_{cfg.platform}")
    account_info = mini.get_app_config("accountInfo").accountInfo
    system_info = mini.get_system_info()
    appid = ""
    appname = ""
    if account_info:
        appid = account_info.get("appId", "")
        appname = account_info.get("appName", "") or account_info.get(
            "nickname", ""
        )  # 发现appname改成了nickname
    logger.info("end init miniprogram")
    return (
        native,
        mini,
        MiniProgram(f"{appid}_{cfg.platform}", appname=appname, system_info=system_info, appid=appid),
    )  # 返回一个默认的


def mini_log_added(message):
    """
    小程序 log 监听回调函数
    将小程序的 log 格式化然后保存起来
    :param message: {"type": "log|warn|error", "args": [str, ..., ]}
    :return:
    """
    dt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    message["dt"] = dt
    g_log_message_list.append(message)

def mini_exception_log_added(message):
    """
    小程序 js error 监听回调函数
    将小程序的 log 格式化然后保存起来
    :param message: {"message": str, "stack": str}
    :return:
    """
    msg = {
        "dt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "type": "error",
        "args": [message["message"] + "\n\n" + message["stack"],]
    }
    g_log_message_list.append(msg)


def send_request(message):
    [msg_id, obj, ms, hash_id, page] = message["args"]
    if hash_id and obj:  # 传了原始request obj, 记录起来
        g_network_req_cache[hash_id] = {"obj": obj, "timestamp": time.time()}
    elif hash_id and hash_id in g_network_req_cache:
        obj = g_network_req_cache[hash_id]["obj"]
        g_network_req_cache[hash_id]["timestamp"] = time.time()
    if msg_id not in g_network_message_dict:
        g_network_message_dict[msg_id] = info = {"timestamp": time.time() * 1000}
    else:
        info = g_network_message_dict[msg_id]
    info["start_timestamp"] = ms
    info["page"] = page
    info["request"] = json.loads(obj)


def request_callback(message):
    [msg_id, res, ms, hash_id, mocked] = message["args"]
    if hash_id and res:  # 传了原始response res, 记录起来
        g_network_resp_cache[hash_id] = {"res": res, "timestamp": time.time()}
    elif hash_id and hash_id in g_network_resp_cache:
        res = g_network_resp_cache[hash_id]["res"]
        g_network_resp_cache[hash_id]["timestamp"] = time.time()
    if msg_id not in g_network_message_dict:
        g_network_message_dict[msg_id] = info = {"timestamp": time.time() * 1000}
    else:
        info = g_network_message_dict[msg_id]
    info["end_timestamp"] = ms
    info["response"] = json.loads(res)
    info["mocked"] = bool(mocked)


class MetaMiniTest(HookAssert):
    def __new__(cls, name, bases, attrs):
        return super(MetaMiniTest, cls).__new__(cls, name, bases, attrs)

    @property
    def app(cls):
        if not inspect.isclass(cls):
            cls = type(cls)
        return cls._app or (cls.mini and cls.mini.app)

    @app.setter
    def app(cls, value):
        if not inspect.isclass(cls):
            cls = type(cls)
        cls._app = value


class MiniTest(AssertBase, metaclass=MetaMiniTest):
    mini: Minium = None
    native: NativeType = None
    appId = ""
    appName = ""
    logger = logger

    _app: App = None
    _app_launch_time = None

    def __init__(self, methodName: str = "runTest") -> None:
        super().__init__(methodName)
        # 这个case是否需要重试, 目前重试原则为
        # 1. case运行过程中遇到断连的情况
        self.__will_retry = None

    @property
    def app(self) -> minium.App:
        return self._app or (self.mini and self.mini.app)

    @app.setter
    def app(self, value):
        self._app = value

    @classmethod
    def _miniClassSetUp(cls):
        logger.debug("=====================")
        logger.debug("Testing class：%s" % cls.__name__)
        logger.debug("=====================")
        super(MiniTest, cls)._miniClassSetUp()
        if not cls.CONFIG.report_usage:
            minium.miniprogram.base_driver.minium_log.existFlag = 1

        native, mini, miniprogram = init_miniprogram(cls.CONFIG)
        cls.native = native
        cls.mini = mini
        if cls.CONFIG.need_perf:  # start get perf thread
            cls.native.start_get_perf(timeinterval=0.8)
        cls.DEVICE_INFO["system_info"] = miniprogram.system_info

    @classmethod
    def tearDownClass(cls):
        """
        1. 存在 g_minium
        2. 配置 close_ide=True
        3. ide 下不释放
        :return:
        """
        if cls.CONFIG.full_reset:
            logger.info("full reset")
            if cls.CONFIG.audits and cls.mini and hasattr(cls.mini, "stop_audits"):
                cls.mini.stop_audits(
                    os.path.join(cls.CONFIG.outputs, "audits_%s.html" % cls.__name__)
                )
            full_reset()
            cls.mini = None
            cls.native = None
            return
        if g_minium and cls.CONFIG.close_ide and cls.CONFIG.platform == "ide":
            logger.info("close ide and reset minium")
            if cls.CONFIG.audits and cls.mini and hasattr(cls.mini, "stop_audits"):
                cls.mini.stop_audits(
                    os.path.join(cls.CONFIG.outputs, "audits_%s.html" % cls.__name__)
                )
            reset_minium()
            cls.mini = None

    def _check_debug_connection(self) -> ResetError:
        """检查调试通道

        :return None or Exception: None for ok
        """
        if self.native:
            if not self.native.check_connection():
                self.logger.warning("check native connection error, relaunch app")
                return ResetError.RELAUNCH_APP
        if self.mini:  # 小程序异常退出和链接断连都会自动重连和重新拉起
            if self.mini.is_app_relaunching:
                self.logger.warning("app is relaunching, wait for it")
                e = self.mini.wait_app_relaunch()
                if e:
                    self.logger.warning(e)
                    return ResetError.RELAUNCH_APP
            if self.mini.connection and self.mini.connection.is_reconnecting:
                self.logger.warning("connection is reconnecting, wait for it")
                e = self.mini.connection.wait_reconnect()
                if e:
                    self.logger.warning(e)
                    return ResetError.RELAUNCH_APP
        return ResetError.OK

    def _update_miniprogram(self, native, mini):
        self.logger.debug(
            "start update miniprogram, class is: %s" % self.__class__.__name__
        )
        self.__class__.native = native
        self.__class__.mini = mini
        self.mini = mini
        self.native = native
        self.logger.debug(
            "finish update miniprogram, current native: %s, minium: %s"
            % (id(self.mini), id(self.native))
        )

    def init_miniprogram(self):
        """case中重新实例化小程序"""
        try:
            native, mini, _ = init_miniprogram(self.__class__.CONFIG)
        except Exception:
            self._update_miniprogram(g_native, g_minium)
            raise
        else:
            self._update_miniprogram(native, mini)

    def relaunch_miniprogram(self):
        """重新拉起小程序"""
        reset_minium()
        self.init_miniprogram()
        self._app_launch_time = self.mini.last_launch_time
        self._framework_capture("relaunch_miniprogram")

    def _setup_results(self):
        super(MiniTest, self)._setup_results()

    def _miniSetUp(self):
        super(MiniTest, self)._miniSetUp()
        self._is_perf_setup = False
        self._is_audits_setup = False
        self.autofix_info = []  # 自动纠错信息, 一般包含自动纠错的参数, 原始代码位置等
        self.results["autofix_info"] = self.autofix_info
        self._setup_autofix_listener()
        logger.info("=========Current case: %s=========" % self._testMethodName)
        if self.__will_retry is not None:
            self.logger.warning(f"第{FRAMEWORK_RETRY-self.__will_retry}次重试")
        logger.info(
            "package info: %s, case info: %s.%s"
            % (
                self.results.get("module", ""),
                self.__class__.__name__,
                self._testMethodName,
            )
        )
        if self.test_config.only_native:
            logger.info(f"Only native: {self.test_config.only_native}, setUp complete")
            return
        else:
            check_result = self._check_debug_connection()
            if check_result != ResetError.OK:  # 调试通道不通
                self.logger.warning("check debug connection fail")
                if check_result == ResetError.RELAUNCH_APP:
                    full_reset()
                    self._update_miniprogram(None, None)
                elif check_result == ResetError.RELAUNCH_MINIPROGRAM:
                    reset_minium()
                    self._update_miniprogram(self.native, None)
                self.init_miniprogram()

            if check_result == ResetError.OK and self.test_config.check_mp_foreground:
                ret = self.native and self.native.back_to_miniprogram()
                if ret and ret != ResetError.OK:
                    if ret == ResetError.RELAUNCH_APP or ret == ResetError.ERROR:
                        self.logger.warning(
                            "back_to_miniprogram error, reset app, post native: %s, minium: %s"
                            % (id(self.mini), id(self.native))
                        )
                        full_reset()
                        self._update_miniprogram(None, None)
                        self.init_miniprogram()
                    elif ret == ResetError.RELAUNCH_MINIPROGRAM:
                        self.logger.warning(
                            "back_to_miniprogram error, reset miniprogram, post minium: %s"
                            % id(self.native)
                        )
                        reset_minium()
                        self._update_miniprogram(self.native, None)
                        self.init_miniprogram()
            if self.test_config.auto_relaunch:
                self.mini.app.go_home()
        # 体验评分是个整体的评价，每个case太短了，没意义
        # if self.test_config.audits:
        #     self._is_audits_setup = self._setup_audits()
        self._app_launch_time = self.mini.last_launch_time
        self._framework_capture("setup")
        self._is_perf_setup = self._setup_perf()
        # jianjia
        # logger.info("=========setup perf=========", self._is_perf_setup)
        # update start_timestamp
        self.results["start_timestamp"] = time.time()
        logger.info("=========case: %s start=========" % self._testMethodName)

    def _setup_perf(self):
        self._get_perf_flag = False
        self.perf_data = ""
        if self.test_config.need_perf:
            # logger.debug("_setup_perf")
            self._get_perf_flag = bool(self.native.start_get_perf(timeinterval=0.8))
        return True

    @catch
    def _teardown_perf(self):
        """
        落地性能相关数据
        """
        if not self._is_perf_setup:
            return
        # jianjia
        # logger.debug("=========jianjia _teardown_perf=========", self._get_perf_flag)
        perf_init = {
            "startup": self.native.get_start_up(),  # 启动时间
            "avg_cpu": 0,  # 平均CPU
            "max_cpu": 0,  # 最大CPU
            "cpu_data_list": [],  # cpu 数据，可以每3s 打一次
            "avg_mem": 0,  # 平均内存
            "max_mem": 0,  # 最大内存
            "mem_data_list": [],  # 内存数据，可以每3s 打一次
            "avg_fps": 0,  # 平均FPS, 小游戏才有
            "min_fps_rt": 0,  # 最小FPS, 小游戏才有
            "fps_data_list": [],  # FPS数据，可以每3s 打一次
            "fps_time_series_list": [],
            "cpu_time_series_list": [],
            "mem_time_series_list": [],
        }
        if self._get_perf_flag:
            self._get_perf_flag = False
            perf_str = self.native.get_perf_data(self.setup_time)
            if self.native.outputs_screen and os.listdir(self.native.outputs_screen):
                page_path = self.page.path
                for file_name in os.listdir(self.native.outputs_screen):
                    file_name_all = os.path.join(self.native.outputs_screen, file_name)
                    file_name_noext = os.path.splitext(file_name)[0]
                    try:
                        if int(file_name_noext) < self.setup_time:  # 过滤不属于这个case的文件
                            continue
                    except ValueError:
                        continue
                    # logger.error(file_name_all)
                    shutil.copy(file_name_all, self.screen_dir)
                    path = os.path.join(self.screen_dir, file_name)
                    # logger.error(path)
                    self.screen_info.append(
                        {
                            "name": file_name,
                            "url": page_path,
                            "path": self.get_relative_path(path),
                            "ts": int(file_name_noext),
                            "datetime": datetime.datetime.fromtimestamp(
                                int(file_name_noext)
                            ).strftime("%Y-%m-%d %H:%M:%S"),
                        }
                    )
            # jianjia
            logger.debug("=========jianjia perf_str=========", perf_str)
            if not perf_str:
                self.perf_data = json.dumps(perf_init)
            else:
                try:
                    perf_arr = json.loads(perf_str)
                    perf_re = perf_init
                    timestamp_arr = []
                    cpu_arr = []
                    mem_arr = []
                    fps_arr = []
                    fps_time_series_list = []
                    cpu_time_series_list = []
                    mem_time_series_list = []
                    for item in perf_arr:
                        _timestamp = int(item["timestamp"])
                        timestamp_arr.append(_timestamp)
                        if item.get("cpu", None) is not None:
                            cpu_arr.append(int(item["cpu"]))
                            cpu_time_series_list.append(_timestamp)
                        if item.get("fps", None) is not None:
                            fps_arr.append(int(item["fps"]))
                            fps_time_series_list.append(_timestamp)
                        if item.get("mem", None) is not None:
                            mem_arr.append(float(item["mem"]))
                            mem_time_series_list.append(_timestamp)
                    perf_re["fps_time_series_list"] = fps_time_series_list
                    perf_re["cpu_time_series_list"] = cpu_time_series_list
                    perf_re["mem_time_series_list"] = mem_time_series_list
                    perf_re["cpu_data_list"] = cpu_arr
                    perf_re["mem_data_list"] = mem_arr
                    perf_re["fps_data_list"] = fps_arr
                    perf_re["avg_cpu"] = sum(cpu_arr) / (len(cpu_arr) or 1)
                    perf_re["avg_mem"] = sum(mem_arr) / (len(mem_arr) or 1)
                    perf_re["avg_fps"] = sum(fps_arr) / (len(fps_arr) or 1)
                    perf_re["max_cpu"] = max(cpu_arr)
                    perf_re["max_mem"] = max(mem_arr)
                    perf_re["min_fps_rt"] = min(fps_arr)
                    self.perf_data = json.dumps(perf_re)
                except Exception:
                    self.perf_data = json.dumps(perf_init)

        else:
            self.perf_data = json.dumps(perf_init)
        self.results["perf_data"] = self.perf_data

    # 不应在case setup做
    def _setup_audits(self):
        self.audit_html = ""
        self.audit_json = ""
        self.start_audit = False
        if self.test_config.platform == "ide":
            logger.info(f"start run audits score")
            self.start_audit = True
            # 开始执行体验评分用例
        else:
            logger.warn(f"Only ide can run audits score")
        return True

    # 不应在case teardown做
    def _teardown_audits(self):
        """
        落地测评数据
        """
        if not self._is_audits_setup:
            return
        if self.start_audit:
            self.stop_audits()
        self.results["audit_html"] = self.audit_html
        self.results["audit_json"] = self.audit_json

    def _add_autofix_info(self, old_selector: str, new_selector: str, full_xpath = None):
        lines = []
        stack = inspect.stack()
        for caller_frame in stack:
            lines.append(f'File "{caller_frame.filename}", line {caller_frame.lineno}, in {caller_frame.function}')
            self.logger.debug(f"{caller_frame.filename}: {caller_frame.function}.{caller_frame.lineno}")
        self.autofix_info.append({
            "old_selector": old_selector,
            "new_selector": new_selector,
            "full_xpath": full_xpath,
            "line_num": self._get_line_number(lines, "testMethod")
        })


    def _setup_autofix_listener(self):
        ee.on("autofix_success", self._add_autofix_info)

    @catch
    def _teardown_autofix_listener(self):
        ee.remove_listener("autofix_success", self._add_autofix_info)

    @catch
    def _teardown_collect_autofix_info(self):
        if getattr(self, "autofix_info"):  # 有 autofix 信息，上报一下
            if self.results["success"]:
                self.results["autofix_succ"] = True
            else:
                self.results["autofix_succ"] = False
            report(FeatureData("AutoFix", 1 if self.results["success"] else 0, *self.autofix_info))
            for info in reversed(self.autofix_info):
                line_num = info["line_num"]
                if line_num != -1:
                    line_num = line_num - self.results["source"]["start"]
                # 添加注释
                self.results["source"]["code"][line_num] += f"  # 此步骤经过自动化工具修复, 原选择器{info['old_selector']}, 修复后选择器{info['new_selector']}" + ( f", 找到唯一元素{info['full_xpath']}" if info.get("full_xpath", None) else "")

    def _teardown_collect(self):
        super()._teardown_collect()
        self._teardown_collect_autofix_info()
        
    def get_weapp_logs(self) -> List[LogMessage]:
        """返回当前case运行期间捕获的小程序日志, 包括jserror

        :return [{"type": "log|warn|error", "message": str, "dt": str}]: 消息列表
        """
        log_messages = g_log_message_list
        return [
            {"type": log["type"], "message": (log["args"][0] if len(log["args"]) else ""), "dt": log["dt"]}
            for log in log_messages
        ]
    
    def get_current_requests(self):
        """返回当前case运行期间捕获的小程序请求日志

        :return [{timestamp: float, start_timestamp: int, request: Union[dict, None], end_timestamp: int, response: Union[dict, None]}]: 消息列表
        """
        network_message = g_network_message_dict
        network_message_list = [network_message[msg_id] for msg_id in network_message]
        network_message_list.sort(
            key=lambda x: x.get("start_timestamp", None) or x["timestamp"]
        )
        return network_message_list
        

    @catch
    def _teardown_app_log(self):
        """
        落地小程序相关的log
        """
        global g_log_message_list, g_network_message_dict
        # 落地小程序log
        weapp_path = "weapp.log"
        weapp_filename = self.wrap_filename(weapp_path)
        log_messages = g_log_message_list
        g_log_message_list = []
        with open(weapp_filename, "w", encoding="UTF-8") as f:
            for log_message in log_messages:
                f.write(json.dumps(log_message, ensure_ascii=False) + "\n")
        self.results["weapp_log_path"] = weapp_path

        # 落地网络请求log
        request_path = "request.log"
        request_filename = self.wrap_filename(request_path)
        network_message = g_network_message_dict
        g_network_message_dict = {}
        network_message_list = [network_message[msg_id] for msg_id in network_message]
        network_message_list.sort(
            key=lambda x: x.get("start_timestamp", None) or x["timestamp"]
        )
        with open(request_filename, "w", encoding="UTF-8") as f:
            # msg => {timestamp, start_timestamp, request: Union[dict, None], end_timestamp, response: Union[dict, None]}
            for msg in network_message_list:
                # logger.debug("\nrequest: {}\nresponse: {}".format(msg.get("request", "Error: Request None"),
                # msg.get("response", "Error: Response Empty")))
                if not msg.get("start_timestamp"):
                    msg["start_timestamp"] = msg["timestamp"]
                    msg["request"] = None
                if not msg.get("end_timestamp"):
                    msg["end_timestamp"] = msg["timestamp"]
                    msg["response"] = None
                f.write(json.dumps(msg, ensure_ascii=False) + "\n")
        self.results["request_log_path"] = request_path

    def _teardown_snapshot(self):
        try:
            if self.test_config.teardown_snapshot:
                self.results["page_wxml"] = self.page_wxml
                self.results["page_data"] = self.page.data
        except Exception as e:
            logger.exception(e)
            self.results["page_data"] = None
            self.results["page_wxml"] = ""

    @catch
    def _teardown_check_element(self, error):
        """找不到元素的话，尝试从 page wxml 中查找"""
        if (
            isinstance(error, MiniElementNotFoundError)
            and self.results["page_wxml"]
        ):
            xml_content = ""
            if error.selector.is_xpath:
                xpath = error.selector.full_selector()
                if xpath.find("/root-portal") > -1:
                    xpath = xpath.replace(r".*\/(\/)?(root-portal-content|root-portal)", "//root-portal-content")
                if xpath.startswith("/tab-bar-wrapper"):
                    xml_content = self.page.get_element("tab-bar-wrapper").outer_wxml
                elif xpath.startswith("//root-portal-content"):
                    xml_content = self.page.get_element("root-portal-content").outer_wxml
            wxml_path = self.wrap_filename(self.results["page_wxml"])
            if os.path.isfile(wxml_path):
                with open(wxml_path, "r") as fd:
                    xml_content = fd.read()
            if xml_content:
                is_similar, root, sel, els = search(xml_content, error.selector)
                if els:
                    self.results["error_extra_info"] = get_search_result_info(is_similar, root, sel, els, error.selector)
                    report_usage("AutoFix")  # 自动纠错能查找到数据的话上报一下。
                log_search_result(is_similar, root, sel, els, error.selector)
            return
        return

    @catch
    def _check_case_error(self, error: Exception):
        """检查失败的case的错误, 决定是否需要重试或者获取更多信息

        :param Exception error: case运行产生的错误
        """
        if not error:
            return
        if isinstance(error, (MiniConnectionClosedError, MiniReConnectSvrError)):
            # 因为断连而产生的指令超时, 可尝试重试{1}次
            if self.__will_retry is None:
                self.__will_retry = FRAMEWORK_RETRY
            return
        if (
            isinstance(error, MiniElementNotFoundError)
            and not self.test_config.teardown_snapshot
        ):
            # 找不到元素, 把wxml拿回来帮助用户排查. 如果配置了`teardown_snapshot`, 则已经获取过不需要再获取
            self.results["page_wxml"] = self.page_wxml
            return
        last_launch_time = self.mini and self.mini.last_launch_time
        if last_launch_time and last_launch_time != self._app_launch_time:
            # 过程中可能存在 app 重启的情况, 框架原因，重试一次
            if self.__will_retry is None:
                self.__will_retry = FRAMEWORK_RETRY
            return
        
    def _callTestMethod(self, method):
        try:
            self.logger.info("call test method")
            method()
        except SkipTest:
            raise
        except:
            self.logger.exception("test exception")
            raise
        finally:
            self.logger.info("end test method")

    def _miniTearDown(self):
        logger.debug("=========Current case Down: %s=========" % self._testMethodName)
        self._framework_capture("teardown")
        sys_info = self._get_error_info()[0]
        if sys_info:  # case失败了
            self._check_case_error(sys_info[1])
        # 更新小程序专属的数据
        self._teardown_perf()
        self._teardown_app_log()
        self._teardown_snapshot()
        self._teardown_check_element(sys_info and sys_info[1])
        self._teardown_autofix_listener()
        super(MiniTest, self)._miniTearDown()

    def _cleanup_before_retry(self):
        # 清理一下输出路径(等于删除上一个结果)
        if self.test_config.case_output and os.path.isdir(self.test_config.case_output):
            shutil.rmtree(self.test_config.case_output)
        # self._app_launch_time = self.mini.last_launch_time

    def run(self, result=None):
        ret = super().run(result)
        if self.__will_retry is None:
            return ret
        while self.__will_retry > 0 and not self.results["success"]:
            self.__will_retry -= 1
            self._cleanup_before_retry()
            self.logger.warning(f"第{FRAMEWORK_RETRY-self.__will_retry}次重试")
            ret = super().run(result)
        else:
            if self.results["success"]:
                report_exception(ExceptionData(
                    RetrySuccess(self._testMethodName),
                    retry=FRAMEWORK_RETRY - self.__will_retry,
                ))
            else:
                report_exception(ExceptionData(
                    RetryFail(self._testMethodName),
                    retry=FRAMEWORK_RETRY - self.__will_retry,
                ))
        return ret

    @property
    def page(self) -> minium.PageType:
        return self.mini.app.current_page

    @property
    def page_wxml(self) -> str:
        if not self.mini:
            return ""
        wxml = self.page.wxml
        if wxml:
            filename = datetime.datetime.now().strftime("%d%H%M%S.wxml")
            filepath = self.wrap_filename(filename)
            with open(filepath, "wb") as fd:
                fd.write(wxml.encode("utf8", "replace"))
            return filename
        return wxml

    @catch
    @retry(2)
    def _framework_capture(self, name=""):
        """框架截图, 尝试两次, 不报错

        :param str name: 截图文件名, defaults to ""
        """
        if not self.test_config.framework_capture:
            return ""
        return self.capture(name)

    @catch
    @retry(2)
    def _error_capture(self, error: Exception):
        """报错截图, 尝试两次, 不报错

        :param Exception error: 具体报错, 截图文件名由报错类名定义
        """
        if not self.test_config.error_capture:
            return ""
        return self.capture(error.__class__.__name__)

    def capture(self, name="", region: Union[App.CurrentPage, Page, BaseElement]=None):
        """
        :param name: 图片名称
        ::param region: 截图区域, 默认为当前页面
        :return: str: image_path or ""
        """
        if name:
            filename = "%s.png" % name
        else:
            filename = "%s.png" % datetime.datetime.now().strftime("%H%M%S%f")
        path = os.path.join(self.screen_dir, filename)
        if os.path.isfile(path):
            # 文件已经存在，重命名
            tmp = os.path.splitext(filename)
            filename = (
                tmp[0] + "_%s" % datetime.datetime.now().strftime("%H%M%S%f") + tmp[1]
            )
            path = os.path.join(self.screen_dir, filename)
        logger.info("capture %s" % filename)
        self.native.screen_shot(path)
        if os.path.exists(path):
            page_path = (
                self.mini.app._current_page.path
                if self.mini and self.mini.app._current_page
                else ""
            )
            if region:
                if isinstance(region, (Page, App.CurrentPage)):  # 把状态栏干掉
                    self.add_screen(name, path, page_path, "page")
                    # self.mini.app.pixel_ratio  # 访问一下获取状态栏的高度
                    crop_img(path, [0, getattr(self.native, "status_bar_height", 0), None, None])
                    return path
                elif isinstance(region, BaseElement):
                    self.add_screen(name, path, page_path, "element")
                    offset_y = 0
                    if self.mini.app.current_page.page_id == region.page_id:  # 还在当前页面
                        navigation_style = self.mini.app.current_page.navigation_style
                        if navigation_style != "custom" and hasattr(
                            self.native, "webview_offset_y"
                        ):
                            # 非自定义页面是, 拿一下webview_offset_y
                            offset_y = self.native.webview_offset_y
                    rect = region.clientRect
                    real_rect = list(int(p * self.mini.app.pixel_ratio) for p in [rect["left"], rect["top"], rect["width"], rect["height"]])
                    real_rect[1] += offset_y  # 增加导航栏偏移
                    crop_img(path, real_rect)
                    return path
            self.add_screen(name, path, page_path)
            return path
        else:
            logger.warning("%s not exists", path)
        return ""

    def tap_capture(self, name, page_id):
        """
        点击截图
        :param name: 截图文件名
        :param page_id: 点击元素所属的页面id
        """
        raise NotImplementedError("仅云测支持")

    def tap_mark(self, name: str, point: Tuple, page_id):
        """
        给截图标记点击的点
        :return: bool
        """
        raise NotImplementedError("仅云测支持")

    def stop_audits(self, format=None):
        """
        获取体验评分
        :return: 体验评分报告
        """
        format = ["html", "json"] if format is None else format
        ret = self.mini.app._stop_audits()
        if len(format) == 0:
            raise Exception("未定义format")
        if not "result" in ret:
            raise Exception("stop_audits获取数据为空")
        if not "report" in ret["result"]:
            raise Exception("stop_audits获取html数据为空")
        if not "data" in ret["result"]:
            raise Exception("stop_audits获取json数据为空")

        for item in format:
            if item == "html":
                audits_html_file = "Audits.html"
                audits_htmlname = self.wrap_filename(audits_html_file)
                html_result = ret["result"]["report"]
                with open(audits_htmlname, "w", encoding="utf-8") as h_f:
                    h_f.write(html_result)
                h_f.close()
                self.audit_html = audits_html_file
                logger.info("success create Audits.html")
            elif item == "json":
                audits_json_file = "Audits.json"
                audits_jsonname = self.wrap_filename(audits_json_file)
                json_result = ret["result"]["data"]
                with open(audits_jsonname, "w", encoding="UTF-8") as j_f:
                    j_f.write(json_result)
                j_f.close()
                self.audit_json = audits_json_file
                logger.info("success create Audits.json")
            else:
                pass

    # 录制回放专用接口
    def mark_step_start(self, key, **kwargs):
        """录制回放步骤标记
        1. 打日志
        2. 额外信息加入`result.step_info`中

        :param str key: 步骤键名
        """
        self.logger.debug("[minitest replay] %s" % key)
        self.results.step_info.append(
            {"key": key, "timestamp": int(time.time()), **kwargs}
        )

    # 小程序定制化的校验
    def assertPageData(self, data, msg=None):
        """

        :param data:
        :param msg:
        :return:
        """
        pass

    def assertContainTexts(self, texts, msg=None):
        pass

    def assertTexts(self, texts, selector="", msg=None):
        for text in texts:
            elem = self.page.get_element(selector, inner_text=text)
            if elem is None:
                raise AssertionError("selector:%s, inner_text=%s not Found")

    def hook_assert(self, name, ret, reason=None):
        if self.test_config.assert_capture:
            filename = "{0}-{1}".format(name, "success" if ret else "failed")
            retry(2)(self.capture)(filename)
            wxml = ""
            if ret is False:
                wxml = self.page_wxml
            return {"img": filename, "wxml": wxml}
        
    def _log_info_when_error(self):
        super()._log_info_when_error()
        if self.mini:
            logger.warning(f"mini: 基础库{self.mini.sdk_version}, 开发者工具{self.mini.dev_tool_version}")
        if self.native:
            logger.warning(f"native: {self.native}")
