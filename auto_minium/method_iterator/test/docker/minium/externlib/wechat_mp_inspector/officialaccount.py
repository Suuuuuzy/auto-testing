'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-07-11 15:35:44
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-11-30 21:22:34
FilePath: /wechat-mp-inspector/wechat_mp_inspector/officialaccount.py
Description: 公众号实例
'''
import time
import json
import typing
import threading
from urllib3.util import parse_url
from .basemp import BaseMP, BMPConfig, Tab
from .mpdriver import H5Driver, H5Page, CDPWebSocket
from .utils import WaitThread

class OAConfig(BMPConfig):
    cmd_timeout = 10  # 指令最大超时时间

class OfficialAccount(BaseMP):
    IGNORE_ID = {}
    def __init__(self, at_instance, domain_list: typing.List[str]=("mp.weixin.qq.com",), config: OAConfig = {}) -> None:
        super().__init__(at_instance, OAConfig(config))
        self.processpid = None
        self.domain_list = domain_list
        self._current_page = None
        # self.init()

    def init(self):
        processpid = self._init_pid()
        tabs = self._init_tabs(processpid)
        tabs = self._filter_tab(tabs)
        self._init_h5(tabs)

    def __mark(self, name, start_time):
        self.logger.debug("🚀 %s cost: %.3f" % (name, time.time() - start_time))

    def _init_pid(self):
        st = time.time()
        if not self.processpid:
            processname, processpid = self._get_current_mm()
            self.__mark("get mm pid", st)
            self.logger.debug(
                f"current mm processname[{processname}], id[{processpid}]"
            )
            self.processpid = processpid
        else:
            processpid = self.processpid
        return processpid

    def _init_tabs(self, processpid) -> typing.List[Tab]:
        result = []
        for sock_name, pid in self._get_debug_sock_name().items():  # 可能有多个remote debug port, 找出属于小程序的那个. sock_cache至少有两个才不
            # 优化点:
            # 1. appservice在一个sock中, 微信不重启不会改变.
            # 2. webview在一个sock中, 不重启也不会改变
            self.logger.debug(f"find debugger port for {sock_name}, pid: {pid}, target pid: {processpid}")
            if pid == str(processpid).strip() or processpid is None: # 没有检测到目标pid, 全部都当符合条件
                retry_cnt = 1  # webview title有可能会处于initial状态, 需要至少等一个visible/invisible才可以继续
                while retry_cnt:
                    retry_cnt -= 1
                    tabs, tcp_port = self.get_tabs_by_sock(sock_name)
                    self.logger.info(
                        "tabs: %s" % (",".join([tab["title"] for tab in tabs]))
                    )
                    for tab in tabs:
                        webSocketDebuggerUrl = tab.get("webSocketDebuggerUrl")
                        if webSocketDebuggerUrl in self.IGNORE_ID:
                            self.logger.debug("ignore %s", webSocketDebuggerUrl)
                            continue
                        result.append(Tab(tab))
            self.logger.debug("all tabs: \n%s" % json.dumps(result, indent=4))
        return result

    def _filter_tab(self, tabs: typing.List[Tab]):
        result = []
        for tab in tabs:
            if tab.description:
                if tab.description.empty or tab.description.never_attached:  # 没有链接过的过滤掉
                    self.logger.debug(f"filter {tab.url}")
                    continue
                url = parse_url(tab.url)
                if url and url.host not in self.domain_list:
                    self.logger.debug(f"filter domain {tab.url}")
                    continue
            result.append(tab)
        return result
    
    def _check_hidden(self, tab):
        try:
            sock = CDPWebSocket(tab.webSocketDebuggerUrl, msg_max_wait_time=self.config.cmd_timeout)
        except Exception as e:
            self.logger.error("connect to h5 fail: {url}")
            return
        driver = H5Driver(sock, tab.title, tab.url)
        self.logger.info(f"find a mp h5 page: {tab.title}, url: {tab.url}")
        if not driver.hidden:
            return driver
        else:
            driver.close()

    def _init_h5(self, tabs: typing.List[Tab]):
        self._current_page = None
        no_desc = True
        for tab in tabs:
            if tab.description:
                no_desc = False
            if tab.description and tab.description.attached:
                try:
                    sock = CDPWebSocket(tab.webSocketDebuggerUrl, msg_max_wait_time=self.config.cmd_timeout)
                except Exception as e:
                    self.logger.error(f"connect to h5 fail: {tab.url}")
                    from .basewebsocket import test_link
                    test_link(tab.webSocketDebuggerUrl)
                    return
                driver = H5Driver(sock, tab.title, tab.url)
                self._current_page = H5Page(driver)
                return
        if not no_desc:
            return
        # 兼容没有`description`的设备
        semaphore = threading.Semaphore(0)
        ts: typing.List[typing.Tuple[WaitThread, Tab]] = []
        for tab in tabs:
            # 需要检测hidden属性, 全丢线程中并行检查
            t = WaitThread(
                target=self._check_hidden,
                args=(tab,),
                semaphore=semaphore,
            )
            t.start()
            ts.append((t, tab))
        cnt = len(ts)
        while cnt:  # 未有符合条件的链接
            if semaphore.acquire():  # 等待 _check_h5 结果
                cnt -= 1
            for t, tab in ts:
                if t.get_result(block=False):  # 有返回的就是符合当前条件的链接
                    driver = t.get_result(block=False)
                    self._current_page = H5Page(driver)
                    return

    @property
    def current_page(self):
        self.init()
        return self._current_page

