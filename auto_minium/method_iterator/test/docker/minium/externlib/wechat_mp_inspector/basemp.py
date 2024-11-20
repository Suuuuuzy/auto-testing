
'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-07-11 15:35:44
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-12-11 17:30:11
FilePath: /wechat-mp-inspector/wechat_mp_inspector/miniprogram.py
Description: 开放平台基础实例
'''
import re
import requests
import time
import json
from .logger import logger
from .title import *
from .utils import pick_unuse_port, Object
from .mpdriver import *
from .exception import *
from typing import List, Tuple

class Tab(Object):
    @property
    def description(self):
        return self["description"]

    @description.setter
    def description(self, v):
        if isinstance(v, dict):
            self["description"] = v
        elif isinstance(v, str):
            try:
                self["description"] = json.loads(v, object_hook=Object)
            except ValueError:
                self["description"] = v
        else:
            self["description"] = v

class BMPConfig(Object):
    logger_level = logging.INFO

class BaseMP(object):
    WEB_DEBUG_PORT_REGEX_MAPPING = {
        "x5": [r"webview_devtools_remote_(?P<pid>\d+)"],
        "xweb": [
            r"com\.tencent\.mm_devtools_remote(?P<pid>\d+)",
            r"xweb_devtools_remote_(?P<pid>\d+)",
        ],
        # xweb成功伪装成系统内核
        "webkit": [
            r"xweb_devtools_remote_(?P<pid>\d+)",
            r"webview_devtools_remote_(?P<pid>\d+)",
        ],
        # appservice
        "appservice": [
            r"mm_(?P<pid>\d+)_devtools_remote",
        ],
    }
    WEB_DEBUG_PORT_REGEX_LIST = [
        i for ii in WEB_DEBUG_PORT_REGEX_MAPPING.values() for i in ii
    ]

    CACHE_PORT = {}  # sock_name -> port, sock name反查反射端口

    LIST_URL = "http://127.0.0.1:%s/json/list"

    def __init__(self, at_instance, config: BMPConfig = None) -> None:
        """封装微信小程序通用方法

        :param at.At at_instance: at实例
        """
        self.at = at_instance
        self.config = config
        self.logger = logger
        self.logger.setLevel(self.config.logger_level)

    def _get_current_active_process(self, reg_exp, top_m=15):
        """
        grep top 5 process, and return process match {reg_exp}
        :return: process_name, pid

        top m[10], n[2] times, per d[2] seconds
        """
        output = self.at.adb.run_shell(f'COLUMNS=512 top -m {top_m} -n 2 -d 2|grep -e "{reg_exp}"')
        self.logger.debug(output)
        lines = [re.sub(r"\x1B[^m]*m", "", line.strip()) for line in output.strip().split("\n")]  # Filter control character
        result = []
        for output2 in lines:
            r = re.compile("(%s)" % reg_exp)
            m = r.search(output2)
            if m:
                pid = output2.split()[0]
                m_name = m.group(1)
                result.append((m_name, pid))
        if result:
            return result
        # 没有match的, 退化成非grep的形式看看
        return [self.at.adb.get_current_active_process(reg_exp)]

    def _get_current_appbrand(self):
        """获取当前小程序进程名和进程id

        :return str, int: List[(processname, pid)]
        """
        for top_m in (15, 20):  # 如果top15找不到尝试使用top20
            result: List[Tuple[str, str]] = [(r[0], str(r[1]).strip()) for r in self._get_current_active_process(
                re.escape("com.tencent.mm:appbrand") + "\d*", top_m=top_m
            )]
            tmp = {}
            for r in result:
                processname, processpid = r
                if not processpid or processpid == "None":
                    continue
                if processpid not in tmp:
                    tmp[processpid] = r
                    self.logger.debug(
                        f"current appbrand processname[{processname}], id[{processpid}]"
                    )
            result = list(tmp.values())
            if result:
                return result
        return [(None, None),]

    def _get_current_mm(self):
        """获取当前小程序进程名和进程id

        :return str, int: processname, pid
        """
        for top_m in (15, 20):  # 如果top15找不到尝试使用top20
            result = self._get_current_active_process(r"com\.tencent\.mm.*", top_m=top_m)
            for pname, pid in result:
                if pname == "com.tencent.mm":
                    return pname, pid
        return None, None

    def _get_debug_sock_name(self, pid=None):
        """获取socket映射名

        :return dict[str, str]: {sock_name: pid}
        """
        if pid:  # 过滤pid
            output = self.at.adb.run_shell(f"cat /proc/net/unix|grep {pid}")
            self.logger.debug(output)
        else:
            output = self.at.adb.run_shell("cat /proc/net/unix")
        lines = output.replace("\r\n", "\n").split("\n")
        target_ports = {}
        for line in lines:
            if "devtools_remote_" in line:
                self.logger.debug(line)
            for reg_str in BaseMP.WEB_DEBUG_PORT_REGEX_LIST:
                m = re.search(reg_str, line)
                if m is not None and m.group() not in target_ports:
                    target_ports[m.group()] = m.group("pid")
        self.logger.debug(target_ports)
        return target_ports

    def p_forward(self, sock_name):
        if sock_name in BaseMP.CACHE_PORT:
            return BaseMP.CACHE_PORT[sock_name]["port"]
        port = pick_unuse_port()
        cmd = "forward tcp:%d localabstract:%s" % (port, sock_name)
        BaseMP.CACHE_PORT[sock_name] = {
            "sock_name": sock_name,
            "port": port,
            "serial": self.at.serial,
        }
        self.at.adb.run_adb(cmd)
        return port

    def get_tabs_by_port(self, port):
        url = BaseMP.LIST_URL % str(port)
        err = None
        for i in range(3):
            try:
                text = requests.get(url, timeout=5).text  # 在有的机型上没有「/list」后缀也行
                if text.strip() == "No support for /json/list":
                    BaseMP.LIST_URL = "http://127.0.0.1:%s/json"
                    url = BaseMP.LIST_URL % str(port)
                    continue
                break
            except requests.ConnectionError as e:
                time.sleep((i + 1) * 2)
                err = e
        else:
            raise err
        total_tabs = json.loads(text)
        self.logger.debug(
            "find %d chrome tabs: %s",
            len(total_tabs),
            "\n".join(["%s %s" % (tab["title"], tab.get("webSocketDebuggerUrl")) for tab in total_tabs]),
        )
        # self.logger.debug("message: %s", total_tabs)
        return total_tabs

    def get_tabs_by_sock(self, sock_name):
        tcp_port = self.p_forward(sock_name)
        self.logger.info(f"{sock_name} -> {tcp_port}")
        tabs = self.get_tabs_by_port(tcp_port)
        return tabs, tcp_port
