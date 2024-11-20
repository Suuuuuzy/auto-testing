'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-21 17:27:49
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-03-04 14:17:20
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/androiddriver.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''

import time
import at
import re
import json
import uuid
import requests
from typing import List, Dict, Union, Optional, Generic, TypeVar, Type
from .basedriver import BaseDriver
from .config import AndroidConfig
from ..utils import pick_unuse_port, Object, get_url_path
from ..pages.chromepage import *
from ..protocol.basesession import BaseSession
from ..protocol.cdp import CDPSession, CDPConnection
from ..inspector.androidinspector import AndroidInspector

T = TypeVar("T")

class AndroidDriver(BaseDriver, Generic[T]):
    _cls: Type[T] = AndroidInspector
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

    IGNORE_ID = {}
    
    def __init__(self, config: AndroidConfig) -> None:
        super().__init__(config)
        self.config = config
        self.at = at.At(config.serial)
        self.appid = config.appid  # 影响get_pages

    def _get_debug_sock_name(self, pid=None) -> Dict[str, str]:
        """获取socket映射名

        :return dict[str, str]: {sock_name: pid}
        """
        if pid:  # 过滤pid
            output = self.at.adb.run_shell(f"cat /proc/net/unix|grep {pid}")
            self.logger.debug(output)
        else:
            output = self.at.adb.run_shell("cat /proc/net/unix")
        lines = output.replace("\r\n", "\n").split("\n")
        target_ports: Dict[str, str] = {}
        for line in lines:
            if "devtools_remote" in line:
                self.logger.debug(line)
            for reg_str in AndroidDriver.WEB_DEBUG_PORT_REGEX_LIST:
                m = re.search(reg_str, line)
                if m is not None and m.group() not in target_ports:
                    target_ports[m.group()] = m.group("pid")
        self.logger.debug(target_ports)
        return target_ports
    
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
        
    def p_forward(self, sock_name):
        if sock_name in AndroidDriver.CACHE_PORT:
            return AndroidDriver.CACHE_PORT[sock_name]["port"]
        port = pick_unuse_port()
        cmd = "forward tcp:%d localabstract:%s" % (port, sock_name)
        AndroidDriver.CACHE_PORT[sock_name] = {
            "sock_name": sock_name,
            "port": port,
            "serial": self.at.serial,
        }
        self.at.adb.run_adb(cmd)
        return port

    def get_tabs_by_port(self, port):
        url = AndroidDriver.LIST_URL % str(port)
        err = None
        for i in range(3):
            try:
                text = requests.get(url, timeout=5).text  # 在有的机型上没有「/list」后缀也行
                if text.strip() == "No support for /json/list":
                    AndroidDriver.LIST_URL = "http://127.0.0.1:%s/json"
                    url = AndroidDriver.LIST_URL % str(port)
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
        retry_cnt = 1
        last_err = None
        while retry_cnt:
            retry_cnt -= 1
            try:
                tcp_port = self.p_forward(sock_name)
                self.logger.info(f"{sock_name} -> {tcp_port}")
                tabs = self.get_tabs_by_port(tcp_port)
                return tabs, tcp_port
            except ConnectionRefusedError as cre:
                last_err = cre
                if sock_name in AndroidDriver.CACHE_PORT:
                    AndroidDriver.CACHE_PORT.pop(sock_name)
            except requests.exceptions.ConnectionError as e:
                last_err = e
                if str(e).find("Connection refused") > 0:
                    if sock_name in AndroidDriver.CACHE_PORT:
                        AndroidDriver.CACHE_PORT.pop(sock_name)
                        continue
                raise
        self.logger.exception(last_err)
        raise RuntimeError(f"get_tabs_by_sock[{sock_name}] fail")

    def _create_page_from_tab(self, tab, tcp_port, sock_name):
        webSocketDebuggerUrl = tab.get("webSocketDebuggerUrl")
        if webSocketDebuggerUrl in self.IGNORE_ID:
            self.logger.debug("ignore %s", webSocketDebuggerUrl)
            return None
        return ChromeNormalPage(
            tab["title"], 
            tab.get("url", ""), 
            webSocketDebuggerUrl,
            tab.get("description"),
            unique_id=tab.get("id", None) or get_url_path(webSocketDebuggerUrl),
            tcp_port=tcp_port,
            sock_name=sock_name,
        )

    def refresh_page(self, page: ChromeNormalPage) -> Optional[ChromeNormalPage]:
        """刷新page实例, 兼容逻辑, 在原port不可用时使用

        :param ChromeNormalPage page: page实例
        """
        sock_name = page.ext_info.sock_name
        tabs, tcp_port = self.get_tabs_by_sock(sock_name)
        self.logger.info(f"refresh debugger url, new port: {tcp_port}")
        for tab in tabs:
            _page = self._create_page_from_tab(tab, tcp_port, sock_name)
            if _page == page:
                return _page

    def get_pages(self) -> List[ChromeNormalPage]:
        pages = []
        sock_dict = self._get_debug_sock_name()  # sock_name -> pid
        for sock_name, pid in sock_dict.items():
            self.logger.debug(f"find debugger port for {sock_name}")
            try:
                tabs, tcp_port = self.get_tabs_by_sock(sock_name)
            except RuntimeError:
                self.logger.warning(f"get_tabs_by_sock[{sock_name}] fail, ignore it")
                return pages
            self.logger.info(
                "tabs: %s" % (",".join([tab["title"] for tab in tabs]))
            )
            for tab in tabs:
                page = self._create_page_from_tab(tab, tcp_port, sock_name)
                if not page:
                    continue
                pages.append(page)
        return pages
    
    def inspector_session(self, page: ChromeNormalPage) -> T:
        session_id = str(uuid.uuid4()).upper()
        connection = CDPConnection(page.webSocketDebuggerUrl, unique_id=page.unique_id)
        return self.__class__._cls(CDPSession(connection, session_id, page, self.refresh_page), page=page)


if __name__ == "__main__":
    import requests
    import logging
    import threading
    from ..protocol.protocoltypes import *
    from ..utils import ProcessSafeEventLoop
    logging.basicConfig(level=logging.DEBUG)
    
    config = AndroidConfig({
        "serial": "MDX0220821002622",
        "connect_timeout": 5,
    })
    driver = AndroidDriver(config)
    # requests.get("http://mmtest.oa.com/weappopentest/launchtest/SendMsgTools?user_name=yopotest1-3&app_id=wx3eb9cfc5787d5458&app_type=0")
    pages = driver.get_pages()
    target_page = None
    for page in pages:
        if isinstance(page, ChromeWebViewPage) and page.visible:
            target_page = page
            break
    if target_page is None:
        raise RuntimeError("没有符合条件的页面")
    threading.Thread(target=driver.inspector_session, args=(target_page,)).start()
    inspector = driver.inspector_session(target_page)    
    print(inspector.send_command(Runtime.evaluate(expression="""__wxConfig""", returnByValue=True)))
    inspector = driver.inspector_session(target_page)
    inspector.close()
