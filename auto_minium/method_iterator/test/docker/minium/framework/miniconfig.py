#!/usr/bin/env python3
# Created by xiazeng on 2019-05-22
import os
import json
import logging
import yaml
import copy
from typing import TypedDict, Union, Optional

logger = logging.getLogger("minium")


class Path(str):
    pass


class IOSDevice(TypedDict):
    udid: str
    model: Optional[str]
    version: Optional[str]
    name: Optional[str]

class IOSDesire(TypedDict):
    device_info: IOSDevice
    wda_bundle: Optional[str]
    wda_project_path: Optional[str]


class AndroidDesire(TypedDict):
    serial: Optional[str]
    uiautomator_version: Optional[int]



default_config = {
    "debug": False,                             # debug模式
    "base_dir": os.path.abspath(os.getcwd()),   # 如果没有配置, 默认工作目录, 如果通过文件生成则为文件所在目录
    "platform": "ide",                          # 平台: ide, android, ios
    "app": "wx",                                # 承载的app: wx
    "debug_mode": "debug",                      # 日志级别
    "close_ide": False,                         # 是否关闭IDE
    # "assert_capture": True,                   # 断言时是否截图, 不再对外. 仍可使用, 如只想setup&teardown时截图, 可以配置auto_capture: auto & assert_capture: false
    # "framework_capture": True,                # setup, teardown时自动截图
    # "error_capture": True,                    # case报错时自动截图
    "auto_capture": "auto",                     # auto: setup, teardown, assert时自动截图. error: 只有case报错时自动截图. assert: 断言时自动截图. False/"": 不截图
    "check_mp_foreground": True,                # case开始时, 检查小程序是否在前台
    "auto_relaunch": True,                      # case开始时是否回到主页
    "device_desire": {},                        # 真机调试配置
    "account_info": {},                         # 账号配置
    "report_usage": True,                       # 是否需要报告
    "remote_connect_timeout": 180,              # 真机调试中小程序在真机上打开的等待时间
    "request_timeout": 60,                      # 自动化控制指令请求超时时间
    "use_push": True,                           # 真机调试中是否使用推送形式打开小程序, false则需要扫调试二维码
    "full_reset": False,                        # 每个测试class结束，是否释放调试链接
    "outputs": None,                            # 测试产物输出路径
    "enable_app_log": False,                    # 记录小程序日志
    "enable_network_panel": False,              # 记录小程序网络请求
    "project_path": None,                       # 小程序项目路径
    "dev_tool_path": None,                      # 开发者工具命令行工具路径
    "test_port": 9420,                          # 小程序自动化测试调试端口
    "mock_native_modal": {},                    # 仅在IDE生效, mock所有会有原生弹窗的接口
    "mock_request": [],                         # mock request接口，item结构为{rule: {}, success or fail}, 同app.mock_request参数
    "auto_authorize": False,                    # 自动处理授权弹窗
    "audits": None,                             # 开启体验评分，仅在IDE生效, None为不改变
    "teardown_snapshot": False,                 # teardown快照，纪录page.data & page.wxml
    "mock_images_dir": Path(""),                # 需要进行"上传"操作的图片放置的目录
    "mock_images": {},                          # 需要进行"上传"操作的图片, key为图片名(标识用), value为base64格式的图片数据
    "need_perf": False,                         # 需要性能数据
    "appid": None,                              # 小程序appid
    "enable_h5": True,                          # 开启h5自动化能力
    "autofix": False,                           # 查找元素是否使用自动纠错功能, 默认false
}


def get_log_level(debug_mode):
    return {
        "info": logging.INFO,
        "debug": logging.DEBUG,
        "warn": logging.WARNING,
        "error": logging.ERROR,
    }.get(debug_mode, logging.INFO)


class MiniConfig(dict):
    def __init__(self, from_dict=None):
        default = copy.deepcopy(default_config)
        if isinstance(from_dict, dict):
            for k, v in from_dict.items():
                if k in default_config and isinstance(default_config[k], Path):  # 路径类配置
                    if not v or os.path.isabs(v):
                        v = Path(v)
                    else:
                        v = Path(os.path.abspath(os.path.join(
                            from_dict.get("base_dir") or default_config["base_dir"],
                            v
                        )))
                default[k] = v
        # 特殊处理一下capture相关字段
        def setValue(key: str, value: bool):
            nonlocal default
            # 如果default[key]已经是bool类型, 则不修改原属性
            if isinstance(default.get(key), bool):
                return
            default[key] = value

        for mode in (default["auto_capture"] or "").split(","):
            if mode == "auto":
                setValue("framework_capture", True)
                setValue("error_capture", False)  # teardown时截图就不需要错误截图了
                setValue("assert_capture", True)  # 默认开启
            elif mode == "error":
                setValue("error_capture", True)
                setValue("framework_capture", False)
            elif mode == "assert":
                setValue("assert_capture", True)
        else:
            setValue("framework_capture", False)
            setValue("error_capture", False)
            setValue("assert_capture", False)
            
        for k, v in default.items():
            setattr(self, k, v)
        super(MiniConfig, self).__init__(self.__dict__)

    def __getattr__(self, __k):
        try:
            return self[__k]
        except KeyError:
            return None

    def __setattr__(self, __k, __v):
        if hasattr(self.__class__, __k):
            super().__setattr__(__k, __v)
        else:
            self[__k] = __v

    @property
    def outputs(self):
        return self["outputs"]

    @outputs.setter
    def outputs(self, v):
        if v is None:  # create default outputs dir
            outputs = os.path.join(os.getcwd(), "outputs")
        else:
            outputs = v
        if not os.path.exists(outputs):
            os.makedirs(outputs)
        self["outputs"] = outputs

    @classmethod
    def from_file(cls, filename, encoding=None):
        logger.info("load config from %s", filename)
        _, ext = os.path.splitext(filename)
        for _encoding in set([encoding, "utf8"]):  # 优先使用配置的encoding, 默认使用utf8
            try:
                with open(filename, "r", encoding=_encoding) as f:
                    if ext == ".json":
                        json_dict = json.load(f)
                    elif ext == ".yml" or ext == ".yaml":
                        json_dict = yaml.load(f)
                    else:
                        raise RuntimeError(f"unknown extension {ext} for {filename}")
            except UnicodeDecodeError:
                continue

        if isinstance(json_dict, list):
            config_list = list()
            for c in json_dict:
                if not c.get("base_dir"):
                    c["base_dir"] = os.path.dirname(os.path.abspath(filename))
                config_list.append(MiniConfig(c))
            return config_list
        if not json_dict.get("base_dir"):
            json_dict["base_dir"] = os.path.dirname(os.path.abspath(filename))
        return MiniConfig(json_dict)



if __name__ == "__main__":
    a = MiniConfig({"outputs": "xxxx"})
    print(a.outputs)
    print(a.sss)
