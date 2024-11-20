#!/usr/bin/env python3
# Created by xiazeng on 2019-05-31
import sys
import os
import os.path
import argparse
import platform

# import unittest
import logging.handlers
import json
import glob
import fnmatch
import copy
import time
import websocket
import threading

from minium.framework.minisuite import MiniSuite
from minium.framework.session import Session
from multiprocessing import Queue
from minium import build_version
from minium.framework import caseinspect
from minium.framework import minitest
from minium.framework import miniconfig
from minium.framework import miniresult
from minium.miniprogram.wx_minium import WXMinium
from minium.framework.exception import *
from minium.framework.libs import unittest
from minium.framework.wording import WORDING
from minium.framework.testaccounts import TestAccounts

unittest.TestLoader.suiteClass = unittest.TestSuite

logger = logging.getLogger("minium")
g_case_list = []
FILENAME_SUMMARY = "summary.json"
is_connected = False
test_response = None


def update_summary(summary_path: str, summary: dict):
    if os.path.isfile(summary_path):
        with open(summary_path, "r", encoding="utf8") as fd:
            _summary = json.loads(fd.read() or "{}")
    else:
        _summary = {}
    _summary.update(summary)
    with open(summary_path, "w", encoding="utf8") as fd:
        json.dump(_summary, fd, indent=4)


def run_tests(tests):
    result = miniresult.MiniResult()
    tests.run(result)
    result.print_shot_msg()
    return result


def load_from_suite(case_path, json_path):
    """
    从json文件或者 json 字符串中获取用例筛选规则，并加载用例
    :param case_path: 用例存放的路径
    :param json_path:
    :return tests: test cases
    :return mini_suite: MiniSuite
    """
    mini_suite = MiniSuite(json_path)
    test_list = unittest.TestSuite()
    messages = [""]
    messages.append("==========Scan Cases from suite===========")
    try:
        if mini_suite.case_list:  # 新版的读这个字段，按顺序loadcase
            for (
                item
            ) in (
                mini_suite.case_list
            ):  # item: {"pkg": "package1", "case_name": "casename1", "class_name": "classname1"}
                pkg = item["pkg"]
                case_name = item["case_name"]
                class_name = item.get("class_name", "")
                # import all module in pkg
                module_case_info_list = caseinspect.load_module(
                    case_path, pkg, mini_suite=mini_suite
                )
                for module_name, module_info in module_case_info_list.items():
                    messages.append(f"└─ {module_name}")
                    for case_info in module_info["case_list"]:
                        if fnmatch.fnmatch(case_info["name"], case_name) and (not class_name or class_name == case_info["class_name"]):
                            messages.append(
                                f"│  ├─ {case_info['class_name']}.{case_info['name']}"
                            )
                            case = load_from_class_and_case_name(module_name, case_info["class_name"], case_info["name"])
                            test_list.addTests(case)
                    messages[-1].replace("├", "└")
            g_case_list.append(test_list)
        else:
            for (
                pkg_cases
            ) in (
                mini_suite.pkg_list
            ):  # pkg_cases: {"pkg": "packagename", "case_list": [*casenames]}
                tests = unittest.TestSuite()
                pkg = pkg_cases["pkg"]
                case_list = pkg_cases["case_list"]
                for case_suite_info in case_list:
                    if isinstance(case_suite_info, str):
                        case_name = case_suite_info
                    else:
                        case_name = case_suite_info["name"]
                    module_case_info_list = caseinspect.load_module(
                        case_path, pkg, mini_suite=mini_suite
                    )
                    for module_name, module_info in module_case_info_list.items():
                        messages.append(f"└─ {module_name}")
                        for case_info in module_info["case_list"]:
                            if fnmatch.fnmatch(case_info["name"], case_name):
                                messages.append(
                                    f"│  ├─ {module_info['class_name']}.{case_info['name']}"
                                )
                                case = load_from_case_name(module_name, case_info["name"])
                                tests.addTests(case)
                        messages[-1].replace("├", "└")
                g_case_list.append(tests)
                test_list.addTests(tests)
        return test_list, mini_suite
    finally:
        logger.info("\n".join(messages))


def load_from_module(module):
    """
    通过包名加载该 package 下所有用例
    :param module:
    :return:
    """
    logger.debug(f"Loading module: {module}")
    loader = unittest.TestLoader()
    test_module = caseinspect.import_module(module)
    tests = loader.loadTestsFromModule(test_module)
    logger.debug(f"put module[{module}] into queue")
    g_case_list.append(tests)
    return tests


def load_single_case(module, case_name):
    """
    加载单条 case
    :param module:
    :param case_name:
    :return:
    """
    tests = load_from_case_name(module, case_name)
    g_case_list.append(tests)
    return tests


def load_from_class_and_case_name(module, class_name, case_name):
    """
    通过包名和类名+用例名加载用例
    :param module:
    :param class_name:
    :param case_name:
    :return:
    """
    if not class_name:
        return load_from_case_name(module, case_name)
    logger.debug(f"Loading Case: {module}.{class_name}.{case_name}")
    loader = unittest.TestLoader()
    test_classes = caseinspect.get_test_classes(module)
    for test_class in test_classes:
        if test_class.__name__ == class_name and case_name in dir(test_class):
            tests = loader.loadTestsFromName(case_name, test_class)
            logger.debug(f"put case[{case_name}] into queue")
            return tests
    else:
        raise AssertionError(
            "can't not find testcase %s in module %s" % (case_name, module)
        )

def load_from_case_name(module, case_name):
    """
    通过包名和用例名加载用例
    :param module:
    :param case_name:
    :return:
    """
    logger.debug(f"Loading Case: {module}.{case_name}")
    loader = unittest.TestLoader()
    test_class = caseinspect.find_test_class(module, case_name)
    if test_class:
        tests = loader.loadTestsFromName(case_name, test_class)
        logger.debug(f"put case[{case_name}] into queue")
        return tests
    else:
        raise AssertionError(
            "can't not find testcase %s in module %s" % (case_name, module)
        )


def test_ws_connection(test_port):
    def on_open(ws):
        global is_connected
        logger.info("connection opened")
        is_connected = True

    def on_error(ws, error):
        logger.error("error: %s" % str(error))
        exit(1)

    def on_message(ws, message):
        global test_response
        logger.info("receive: %s" % message)
        message = json.loads(message)
        if message["id"] == "minitest-test-id":
            test_response = message

    def on_close(ws, *args):
        global is_connected
        logger.info("closed")
        is_connected = False

    url = "ws://localhost:{}".format(test_port)
    logger.info("start connect {}".format(url))
    client = websocket.WebSocketApp(
        url,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )

    def run_forever():
        client.run_forever()

    thread = threading.Thread(target=run_forever, args=())
    thread.daemon = True
    thread.start()
    s = time.time()
    while time.time() - s < 10 and thread.is_alive():
        if is_connected:
            logger.info("connect to WebChatTools successfully")
            logger.info("连接开发者工具成功")
            break
        time.sleep(1)
    else:
        logger.warning("connect WebChatTools fail, please confirm the test port is open")
        logger.warning("连接开发者工具失败，可能的原因有:")
        logger.warning("1. 没有打开自动化测试端口，请检查开发者工具的通知栏是否有: 小程序的自动化端口已开启，端口号是 xxxx")
        logger.warning("2. 调试基础库版本过低，请选择最新版本")
        exit(1)
    message = json.dumps(
        {
            "id": "minitest-test-id",
            "method": "App.callWxMethod",
            "params": {"method": "getSystemInfoSync", "args": []},
        },
        separators=(",", ":"),
    )
    client.send(message)
    s = time.time()
    while time.time() - s < 30:
        if test_response:
            logger.info("response successfully")
            logger.info("收到命令返回")
            break
        time.sleep(1)
    else:
        logger.warning(
            "can't receive response, please confirm miniprogram is launch successfully"
        )
        logger.warning("未收到命令返回，请确认小程序项目是否正确运行(没有白屏/报错)")
        exit(1)
    client.close()


def get_config(config):
    conf_list = []
    if config:
        conf_list = miniconfig.MiniConfig.from_file(config)
        conf_list = [conf_list] if not isinstance(conf_list, list) else conf_list
    else:
        conf_list.append(miniconfig.MiniConfig())
    return conf_list


def run_session(conf_list, run_mode, only_native, generate_report, task_limit_time):
    session_list = list()
    q = Queue()
    for tests in g_case_list:
        q.put(tests)
    for c in conf_list:
        new_q = Queue()
        if run_mode == "fork":
            for tests in copy.deepcopy(g_case_list):
                new_q.put(tests)
            q = new_q
        if only_native:
            c.only_native = True
        logger.info(f"start session with {run_mode} mode \n{c}\n")
        s = Session(conf=c, queue=q, generate_report=generate_report)
        s.daemon = True
        s.start()
        session_list.append(s)

    rest_time = task_limit_time  # 任务剩余时间
    for se in session_list:
        stime = time.time()
        se.join(rest_time)
        if not task_limit_time:
            # 不限制时间
            continue
        # 计算剩余时间
        rest_time = rest_time - (time.time() - stime)
        if rest_time <= 0:  # 超时
            break
    for se in session_list:
        if se.is_alive():
            se.kill()


def check_env(config_list):
    """
    check system environment for minitest
    :param config:
    :return:
    """
    # default dev_tool_path
    MAC_DEVTOOL_PATH = "/Applications/wechatwebdevtools.app/Contents/MacOS/cli"
    WINDOWS_DEVTOOL_PATH = "C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat"

    if sys.version_info.major < 3 and sys.version_info.minor < 8:
        logger.warning("python version is less than 3.8, please update")

    is_mac = True
    SLASH = os.sep

    if platform.system().lower() == "windows":
        is_mac = False
        SLASH = "\\"

    for config in config_list:
        dev_tool_path = None
        if config.dev_tool_path:
            dev_tool_path = config.dev_tool_path
        elif is_mac:
            dev_tool_path = MAC_DEVTOOL_PATH
        else:
            dev_tool_path = WINDOWS_DEVTOOL_PATH
        if not os.path.exists(dev_tool_path):
            logger.error("`dev_tool_path` %s not exists, please check", dev_tool_path)
            exit(0)

        project_config = None
        if config.project_path:
            logger.debug("checking project_path")
            if not os.path.exists(config.project_path):
                logger.error(
                    "`project_path` %s in config is not exists", config.project_path
                )
                exit(0)

            logger.debug("checking project.config.json")
            if not os.path.exists(config.project_path + SLASH + "project.config.json"):
                logger.error("project.config.json not found in %s", config.project_path)
                exit(0)
            else:
                with open(
                    config.project_path + SLASH + "project.config.json",
                    "r",
                    encoding="utf8",
                ) as f:
                    project_config = json.load(f)

            if project_config is not None:
                if "miniprogramRoot" in project_config:
                    miniprogramRoot = (
                        config.project_path + SLASH + project_config["miniprogramRoot"]
                    )
                else:
                    miniprogramRoot = config.project_path
                if not os.path.exists(miniprogramRoot):
                    logger.error("miniprogramRoot in project.config.json not exists")
                    exit(0)
                # check app.json
                if not os.path.exists(
                    os.path.abspath(miniprogramRoot) + SLASH + "app.json"
                ):
                    logger.error(
                        f"app.json not exists in `{miniprogramRoot}`, \
please make sure `{miniprogramRoot}` is miniprogram project path"
                    )
                    exit(0)
                if "cloudfunctionRoot" in project_config:  # use tencent cloud
                    cloudfunctionRoot = (
                        config.project_path
                        + SLASH
                        + project_config["cloudfunctionRoot"]
                    )
                    if not os.path.exists(cloudfunctionRoot):
                        logger.error(
                            "cloudfunctionRoot in project.config.json not exists"
                        )
                        exit(0)

            start_cli = os.popen(
                dev_tool_path
                if is_mac
                else ('"%s"' % dev_tool_path)
                + " auto --project "
                + config.project_path
                + "--auto-port 9420"
            )
            logger.info(start_cli)

def fprint_accounts(accounts):
    if not accounts:
        return
    for account in accounts:
        print(f"nickName: {account['nickName']},\topenid: {account['openid']}")

def main():
    # bug: 在 fork 模式下Python 会出现 crash
    # crashed on child side of fork pre-exec
    # Invalid dylib load. Clients should not load the unversioned libcrypto dylib as it does not have a stable ABI.
    import multiprocessing

    multiprocessing.set_start_method("spawn")
    # 解析参数
    parsers = argparse.ArgumentParser()
    parsers.add_argument(
        "-v", "--version", dest="version", action="store_true", default=False, help=WORDING.HELP.version
    )
    parsers.add_argument(
        "-p",
        "--path",
        dest="path",
        type=str,
        help=WORDING.HELP.path,
        default=None,
    )
    parsers.add_argument(
        "-m",
        "--module",
        dest="module_path",
        type=str,
        help=WORDING.HELP.module,
    )
    parsers.add_argument(
        "--case",
        dest="case_name",
        type=str,
        default=None,
        help=WORDING.HELP.case_name,
    )
    parsers.add_argument(
        "--module_search_path",
        dest="sys_path_list",
        nargs="*",
        help=WORDING.HELP.module_search_path,
    )
    parsers.add_argument(
        "--apk",
        dest="apk",
        action="store_true",
        default=False,
        help=WORDING.HELP.apk,
    )
    parsers.add_argument(
        "-s",
        "--suite",
        dest="suite_path",
        type=str,
        default=None,
        help=WORDING.HELP.suite,
    )
    parsers.add_argument(
        "-c", "--config", dest="config", type=str, default=None, help=WORDING.HELP.config
    )
    parsers.add_argument(
        "-g",
        "--generate",
        dest="generate",
        action="store_true",
        default=False,
        help=WORDING.HELP.generate
    )

    parsers.add_argument(
        "--mode",
        dest="run_mode",
        type=str,
        default="fork",
        help=WORDING.HELP.mode
    )

    parsers.add_argument(
        "-a",
        "--accounts",
        dest="accounts",
        action="store_true",
        help=WORDING.HELP.accounts
    )

    parsers.add_argument(
        "--only-native",
        dest="only_native",
        action="store_true",
        help=WORDING.HELP.only_native,
    )

    parsers.add_argument(
        "--test-connection",
        dest="test_connection",
        action="store_true",
        help=WORDING.HELP.test_connection
    )

    parsers.add_argument(
        "--test-port",
        dest="test_port",
        type=str,
        default="9420",
        help=WORDING.HELP.test_port
    )

    parsers.add_argument(
        "--task-limit-time",
        dest="task_limit_time",
        type=str,
        default="0",
        help=WORDING.HELP.task_limit_time
    )

    parsers.add_argument(
        "--test",
        dest="just_test",
        action="store_true",
        default=False,
        help=WORDING.HELP.just_test
    )

    parsers.add_argument(
        "--check-env",
        dest="check_env",
        action="store_true",
        default=False,
        help=WORDING.HELP.check_env
    )

    parsers.format_help()

    parser_args = parsers.parse_args()
    version = parser_args.version
    path = parser_args.path
    module = parser_args.module_path
    apk = parser_args.apk
    case_name = parser_args.case_name
    generate_report = parser_args.generate
    suite_path = parser_args.suite_path
    config = parser_args.config
    sys_path_list = parser_args.sys_path_list
    show_accounts = parser_args.accounts
    run_mode = parser_args.run_mode
    only_native = parser_args.only_native
    test_connection = parser_args.test_connection
    test_port = parser_args.test_port
    task_limit_time = int(parser_args.task_limit_time) or None
    just_test = parser_args.just_test
    is_check_env = parser_args.check_env

    if show_accounts:
        # 打印已登录的多账号
        if config:
            fprint_accounts(WXMinium(get_config(config)[0]).get_test_accounts())
            fprint_accounts(TestAccounts)
        else:
            # 没有配置的先看看端口是否打开了
            # logger.setLevel(logging.WARNING)
            test_ws_connection(9420)
            fprint_accounts(WXMinium(miniconfig.MiniConfig({"debug_mode": "warn"})).get_test_accounts())
            fprint_accounts(TestAccounts)
        exit(0)

    if test_connection:
        # 测试ws链接是否正常
        test_ws_connection(test_port)
        exit(0)

    if sys_path_list:
        # 添加 package 寻找路径到 sys.path
        for sys_path in sys_path_list:
            if not sys_path:
                continue
            logger.info("insert %s to sys.path", sys_path)
            sys.path.insert(0, sys_path)

    if version:
        # 打印 minium 版本信息
        print(build_version())
        exit(0)

    if apk:
        # 打印 android uiautomator 相关的 apk 包路径
        bin_root = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "native",
            "lib",
            "at",
            "bin",
            "*apk",
        )
        print("please install apk:")
        for filename in glob.glob(bin_root):
            print(f"adb install -r {filename}")
        exit(0)

    if path is None:
        # 用例目录路径
        logger.debug("case directory path not specified, use current path")
        path = os.getcwd()

    if not os.path.exists(path) or not os.path.isdir(path):
        logger.error("case directory: %s not exists" % path)
        parsers.print_help()
        exit(0)

    sys.path.insert(0, path)

    # 处理 config 参数
    if config and not os.path.exists(config):
        # raise RuntimeError("config not exists:%s" % config)
        logger.error("config not exists:%s" % config)
        parsers.print_help()
        exit(0)
    conf_list = get_config(config)
    def _update_summary(summary_json):
        for conf in conf_list:
            if conf.outputs:
                summary_path = os.path.join(conf.outputs, FILENAME_SUMMARY)
                update_summary(summary_path, summary_json)
    # 提前预加载默认配置，否则处理 suite 的时候logger 参数不生效
    if not config:
        minitest.AssertBase.setUpConfig(default=True)
    else:
        minitest.AssertBase.CONFIG = conf_list[0]
        minitest.AssertBase.setUpConfig(default=False)

    # 处理 suite、case、module 参数
    suite = None
    tests = None
    if suite_path:
        tests, suite = load_from_suite(path, suite_path)
        logger.info(f"load {tests.countTestCases()} cases")
        logger.info(
            f'import package 【{",".join(suite.success_pkg)}】 success, import package 【{",".join(suite.fail_pkg)}】 fail'
        )
    elif module is None:
        # raise RuntimeError("suite_path or pkg is necessary")
        logger.error("suite_path or module_path is necessary at least one")
        parsers.print_help()
        exit(0)
    elif case_name is None:
        load_from_module(module)
    else:
        load_single_case(module, case_name)
    print("after load %s" % suite_path or module)
    print(f"g_case_list size: {len(g_case_list)}")
    for c in g_case_list:
        print(str(c))
    # 处理一下import error的问题
    if suite and suite.fail_pkg:
        _update_summary({"import_error": suite.fail_pkg})

    if is_check_env:
        check_env(conf_list)
        print("check env done")
        exit(0)

    # 输出版本信息
    print(build_version())
    if just_test:
        exit(0)
    if tests and tests.countTestCases() == 0:
        logger.warning(f"total case number is 0, test end")
        _update_summary({
            "session_error": {
                "error_type": "LoadCaseError",
                "error_value": "用例数为0"
            }
        })
        exit(0)
    # 启动 session
    run_session(conf_list, run_mode, only_native, generate_report, task_limit_time)
    exit(0)


if __name__ == "__main__":
    main()
