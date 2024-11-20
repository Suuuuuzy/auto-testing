"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-06-06 17:25:14
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-12 16:15:34
FilePath: /at/at/webdriver/weapp/miniprogram.py
Description: 封装小程序的驱动实例
"""
import re
import requests
import time
import json
import logging
import typing
from typing import Union
import threading
from .logger import logger, setLevel
from .title import *
from .utils import pick_unuse_port, WaitThread, Object, thread_wait
from .basemp import BaseMP, BMPConfig
from .mpdriver import *
from .exception import *


class MPConfig(BMPConfig):
    skyline = True
    webview = True
    h5 = True
    timeout = 20  # 检测appservice的超时时间
    sock_cache = True  # 把sock name => pid 缓存起来(如果sock重新实例化有一定风险)
    init_page_info = False  # 尝试获取webview页面的page info
    cmd_timeout = 20  # 指令默认超时时间


class MiniProgram(BaseMP):
    IGNORE_ID = {}  # appid -> [*unique_ids], 记录一些确定不属于该小程序的 unique id, 减少重复的检查

    def __init__(self, at_instance, appid, config: MPConfig = {}) -> None:
        """小程序实例

        :param at.At at_instance: at实例
        :param str appid: 小程序appid, driver/ws链接的筛选需要基于appid
        :param MPConfig config: 配置项, 包含`skyline`, `webview`, `h5`三个配置键. 值类型为bool, 分别控制是否建立对应页面的链接, 默认都为true
        """
        super().__init__(at_instance, MPConfig(config))
        self.processpid: str = None
        self.appid = appid
        self.sock_cache: typing.Dict[str, str] = {}  # 符合条件的sock缓存一下, [(sock_name, pid)]
        self.appservice = None
        self.main = None  # maincontext, 一般只有基础库在使用
        self.skyline = None
        self.pages: typing.Dict[str, WebviewDriver] = {}  # webviewId -> driver
        self.ws2page: typing.Dict[str, str] = {}  # debugger url -> webviewId
        self.h5_pages: typing.Dict[str, H5Driver] = {}  # webviewId -> driver
        self._current_page = None
        if self.appid not in MiniProgram.IGNORE_ID:
            MiniProgram.IGNORE_ID[self.appid] = []
        self.IGNORE_ID: typing.List[str] = MiniProgram.IGNORE_ID[self.appid]
        # 加载配置
        self.config = MPConfig(config)
        self._enable_skyline = self.config.skyline
        self._enable_webview = self.config.webview
        self._enable_h5 = self.config.h5
        if self._enable_h5:
            self._enable_webview = True  # 需要检测当前页面是不是确定有web-view组件，必须开启webview检测
        self._enable_sock_cache = self.config.sock_cache
        self._enable_page_info = self.config.init_page_info
        self._fake_webview_id_map = {}  # 生成假的webview id. sock url -> webviewId
        self._fake_webview_id = 1  # 从1开始
        self._fake_webview_id_lock = threading.Lock()
        self._refresh_lock = threading.RLock()
        self._refresh_thread = None
        self._stop_refresh = False
        self._last_init_time = None
        self.init()

    def __del__(self):
        # self.close()
        pass

    def __mark(self, name, start_time):
        self.logger.debug("🚀 %s cost: %.3f" % (name, time.time() - start_time))
        # return time.time()

    def _init_pid(self) -> str or typing.List[str] or None:
        st = time.time()
        processpid = None
        if not self.processpid:
            result = self._get_current_appbrand()
            self.__mark("get appbrand pid", st)
            if len(result) == 1:
                processname, processpid = result[0]
                self.logger.debug(
                    f"current appbrand processname[{processname}], id[{processpid}]"
                )
                self.processpid = processpid
            elif result:
                result.sort(key=lambda x:int(x[1]))  # 按进称号排
                self.logger.debug(
                    f"current appbrand name-id: [{','.join([str(r) for r in result])}]"
                )
                return [r[1] for r in result]
        else:
            processpid = self.processpid
        return processpid

    def _init_tabs(self, processpids: Union[str, typing.List[str]]):
        """初始化所有符合条件的tab

        :param str or typing.List[str] processpid: 小程序进程id
        :return: appservice_titles, webview_titles, other_titles
        """
        def _init_tabs(processpid: str):
            st = time.time()
            appservice_titles: typing.List[typing.Tuple[AppServiceTitle, str, str]] = []
            webview_titles: typing.List[typing.Tuple[WebViewTitle, str, str]] = []
            other_titles: typing.List[typing.Tuple[TitleInfo, str, str, dict]] = []
            cache_cnt = len(self.sock_cache)  # appservice一个sock, webview一个sock
            if self._enable_skyline:
                cache_cnt -= 1
            if self._enable_webview:
                cache_cnt -= 1
            sock_dict = (self._enable_sock_cache and cache_cnt >= 0 and self.sock_cache) or self._get_debug_sock_name()
            if processpid not in sock_dict.values():  # 再确认一下是不是真的没有
                sock_dict = self._get_debug_sock_name(processpid)
            for sock_name, pid in sock_dict.items():  # 可能有多个remote debug port, 找出属于小程序的那个. sock_cache至少有两个才不
                # 优化点:
                # 1. appservice在一个sock中, 微信不重启不会改变.
                # 2. webview在一个sock中, 不重启也不会改变
                self.logger.debug(f"find debugger port for {sock_name}, pid: {pid}, target pid: {processpid}")
                if pid == processpid or processpid is None or processpid == "None": # 没有检测到目标pid, 全部都当符合条件
                    retry_cnt = 1  # webview title有可能会处于initial状态, 需要至少等一个visible/invisible才可以继续
                    stime = time.time()
                    while retry_cnt:
                        retry_cnt -= 1
                        is_webview_sock = False
                        tabs, tcp_port = self.get_tabs_by_sock(sock_name)
                        self.logger.info(
                            "tabs: %s" % (",".join([tab["title"] for tab in tabs]))
                        )
                        for tab in tabs:
                            webSocketDebuggerUrl = tab.get("webSocketDebuggerUrl")
                            if webSocketDebuggerUrl in self.IGNORE_ID:
                                self.logger.debug("ignore %s", webSocketDebuggerUrl)
                                continue
                            title = TitleInfo(tab["title"])  # 根据title确定对应的页面
                            if not title:
                                continue
                            if isinstance(title, AppServiceTitle):  # 小程序appservice线程
                                if title.appid and title.appid != self.appid:
                                    continue
                                appservice_titles.append((title, sock_name, tcp_port))
                                if self._enable_skyline:
                                    self.sock_cache[sock_name] = pid
                            elif isinstance(title, WebViewTitle):  # 小程序webview渲染的页面
                                webview_titles.append((title, sock_name, webSocketDebuggerUrl))
                                if title.appid != self.appid:
                                    self.logger.debug(f"ignore tab [{title}], appid not match")
                                    continue
                                if self._enable_webview:
                                    is_webview_sock = True
                                    self.sock_cache[sock_name] = pid
                            elif self._enable_h5:
                                other_titles.append(
                                    (title, sock_name, webSocketDebuggerUrl, tab)
                                )
                        if is_webview_sock and webview_titles:  # 这个sock是 webview的
                            vc = ic = nc = 0  # visible cnt, invisible cnt, initial cnt
                            for t, s, w in webview_titles:
                                if t.initial:
                                    nc += 1
                                elif t.visible:
                                    vc += 1
                                else:
                                    ic += 1
                            if not vc and not ic and nc and (time.time() - stime) < 20:  # 只有initial的, 20s内重试
                                webview_titles = list(filter(lambda x: x[1] != sock_name, webview_titles))
                                retry_cnt = 1
                            
            self.__mark("get all webview tabs", st)
            return appservice_titles, webview_titles, other_titles
        if isinstance(processpids, list):  # 多个符合的pid
            max_count = -1
            for pid in processpids:
                _appservice_titles, _webview_titles, _other_titles = _init_tabs(pid)
                # 有visible的webview页面
                if _webview_titles and [w[0].visible for w in _webview_titles].count(True):
                    self.processpid = pid
                    appservice_titles, webview_titles, other_titles = _appservice_titles, _webview_titles, _other_titles
                    break
                count = len(_appservice_titles) + len(_webview_titles) + len(_other_titles)  # 算最多的那个当活跃进程
                if count > max_count:
                    max_count = count
                    self.processpid = pid
                    appservice_titles, webview_titles, other_titles = _appservice_titles, _webview_titles, _other_titles
        else:
            # 检测符合小程序条件的tab
            appservice_titles, webview_titles, other_titles = _init_tabs(processpids)
        return appservice_titles, webview_titles, other_titles

    def _init_appservice(
        self, appservice_titles: typing.List[typing.Tuple[AppServiceTitle, str, str]]
    ):
        """初始化appservice线程

        :param typing.List[typing.Tuple[AppServiceTitle, str, str]] appservice_titles: 符合appservice线程的title
        """
        st = time.time()
        if self._enable_skyline and not (
            self.appservice and self.appservice.is_connecting
        ):  # appservice不连通了, 需要重新链接
            ts = [
                WaitThread(
                    target=self._check_appservice, args=(sock_name, title, tcp_port)
                )
                for title, sock_name, tcp_port in appservice_titles
            ]
            if ts:
                try:
                    thread_wait(ts, True, self.config.timeout)
                except (TimeoutError, ValueError) as te:
                    self.logger.warning("appservice/skyline链接建立失败")
                    self.logger.exception(te)
            else:
                self.logger.warning("appservice/skyline链接建立失败, 未检测到相关线程")
        self.__mark("check appservice thread", st)

    def _init_webview(
        self, webview_titles: typing.List[typing.Tuple[WebViewTitle, str, str]]
    ):
        """初始化webview渲染的页面

        :param typing.List[typing.Tuple[WebViewTitle, str, str]] webview_titles: 符合小程序webview渲染页面的title
        :return: current_wv_page, current_wv_sock
        """
        st = time.time()
        current_wv_page = None  # 当前webview渲染的页面
        current_wv_sock = None  # 当前webview渲染的页面对应的sock_name
        if self._enable_webview:
            new_pages = set()  # 用于更新self.pages
            semaphore = threading.Semaphore(0)  # 并行检测使用
            check_webview_threads: typing.List[
                typing.Tuple[WaitThread, WebViewTitle]
            ] = []
            for title, sock_name, webSocketDebuggerUrl in webview_titles:
                # getCurrentPages().pop().__wxWebviewId__ 对应 window.__webviewId__
                # __wxConfig__.accountInfo.appId 为appid, 插件页面中该信息也为宿主appid
                if not webSocketDebuggerUrl:  # 无法调试
                    continue
                if title.appid != self.appid:
                    continue
                t = None
                if not self.ws2page.get(webSocketDebuggerUrl):  # 未检查过, 丢到线程中并行检查
                    t = WaitThread(
                        target=self._check_webview,
                        args=(title, sock_name, webSocketDebuggerUrl, new_pages),
                        semaphore=semaphore,
                    )
                    t.start()
                    check_webview_threads.append((t, title))
                else:
                    webview_id = self.ws2page[webSocketDebuggerUrl]
                    new_pages.add(webview_id)
                    driver = self.pages[webview_id]
                    driver.title = title  # 刷新title
                    route = None
                if title.visible and not t:  # 不需要重新链接的, 可以直接更新
                    self._current_page = WebviewPage(
                        driver, route=route, webviewId=webview_id
                    )
                    current_wv_page = self._current_page
                    current_wv_sock = sock_name
                    self.logger.info("current page: %s" % self._current_page)
            for t, title in check_webview_threads:  # 等待并行链接的情况
                if title.visible:  # 只等待visible的链接成功就好
                    t.join()
                    webview_id, route, driver = t.get_result()
                    if not webview_id:
                        continue
                    self._current_page = WebviewPage(
                        driver, route=route, webviewId=webview_id
                    )
                    current_wv_page = self._current_page
                    current_wv_sock = sock_name
                    self.logger.info("current page: %s" % self._current_page)
            for old_wv_id in list(self.pages.keys()):
                if old_wv_id not in new_pages:  # 页面可能销毁了
                    driver = self.pages.pop(old_wv_id)
                    self.logger.debug(f"{str(driver.title)} maybe has destroyed")
                    webSocketDebuggerUrl = driver.ws._url
                    if webSocketDebuggerUrl in self.ws2page:
                        self.ws2page.pop(webSocketDebuggerUrl)
                    driver.ws.destroy()
                    if old_wv_id in self.h5_pages:
                        driver = self.h5_pages.pop(old_wv_id)
                        self.logger.debug(f"{str(driver.title)} maybe has destroyed")
                        webSocketDebuggerUrl = driver.ws._url
                        if webSocketDebuggerUrl in self.ws2page:
                            self.ws2page.pop(webSocketDebuggerUrl)
                        driver.ws.destroy()
            self.__mark(f"check {len(webview_titles)} webview page", st)
        else:
            self.logger.info("不进行webview页面检测")
        return current_wv_page, current_wv_sock

    def _init_h5(
        self,
        other_titles: typing.List[typing.Tuple[TitleInfo, str, str, dict]],
        current_wv_page: WebviewPage,
        current_wv_sock: str,
    ):
        """初始化h5页面

        :param typing.List[typing.Tuple[TitleInfo, str, str, dict]] other_titles: 默认title
        :param WebviewPage current_wv_page: 当前webview页面
        :param str current_wv_sock: 当前webview页面对应的sock name
        """
        if (
            self._enable_h5 and current_wv_page and other_titles
        ):  # TODO: current page是webview的页面才支持小程序h5
            # 检查
            # 1. 当前页面是否是webview页面
            # 2. 是否有wx-web-view标签
            st = time.time()
            skip = False  # 跳过检查
            h5_pages = []  # 可能的h5 driver
            ts: typing.List[typing.Tuple[WaitThread, TitleInfo]] = []
            if self.appservice:
                # current_wv_page 一般来说可以说明当前页面是webview页面, 但不能肯定visible这个标记是否靠谱, 有appservice情况下最好用页面栈确定
                current_page = self.appservice.current_page
                if not (
                    current_page.renderer == "webview"  # webview模式渲染出来的
                    and current_page.webviewId in self.pages
                    and self.pages[current_page.webviewId].is_webview  # 是webview的小程序页面
                ):
                    skip = True
                else:
                    webview_id = current_page.webviewId
            elif not current_wv_page.driver.is_webview:
                skip = True
            else:
                webview_id = current_wv_page.page_info.get("webviewId")
                current_page = current_wv_page.page_info
            semaphore = threading.Semaphore(0)  # 并行检测使用
            if not skip:
                for title, sock_name, webSocketDebuggerUrl, tab in other_titles:
                    if not webSocketDebuggerUrl:
                        continue
                    if sock_name != current_wv_sock:  # webview页面和h5页面应该是同一个tabs中
                        continue
                    if (
                        tab.get("url", "about:blank") == "about:blank"
                        or tab["title"] == "about:blank"
                    ):
                        continue
                    # 需要检测hidden属性, 全丢线程中并行检查
                    t = WaitThread(
                        target=self._check_h5,
                        args=(title, webSocketDebuggerUrl, tab, webview_id, h5_pages),
                        semaphore=semaphore,
                    )
                    t.start()
                    ts.append((t, title))
                cnt = len(ts)
                while cnt and not self.h5_pages.get(webview_id):  # 未有符合条件的链接
                    if semaphore.acquire():  # 等待 _check_h5 结果
                        cnt -= 1
                    for t, title in ts:
                        if t.get_result(block=False):  # 有返回的就是符合当前条件的链接
                            break
                if not self.h5_pages.get(webview_id) and h5_pages:
                    self.h5_pages[webview_id] = h5_pages[0]  # sock
                if self.h5_pages.get(webview_id):  # 有符合条件的h5
                    driver = self.h5_pages[webview_id]
                    current_page["url"] = driver.url
                    self._current_page = H5Page(driver, **current_page)
            self.__mark(f"check {len(ts)} h5 page", st)

    def init(self):
        """
        初始化:
        1. 扫描所有的可以debug的页面
        2. 过滤出符合当前appid的页面
        """
        stime = time.time()
        self.logger.debug(f"🚀 start init")
        self._current_page = None
        # 检测小程序进程id
        processpid = self._init_pid()
        # 检测符合小程序条件的tab
        appservice_titles, webview_titles, other_titles = self._init_tabs(processpid)
        # 检测 AppService/Skyline thread
        self._init_appservice(appservice_titles)
        # 检测小程序webview渲染的页面
        current_wv_page, current_wv_sock = self._init_webview(webview_titles)
        # 检测小程序h5页面
        self._init_h5(other_titles, current_wv_page, current_wv_sock)
        self.__mark("init total", stime)
        self.print_summary()
        self._last_init_time = time.time()

    def restart(self):
        """
        重启小程序后使用, 重启微信需要重新实例化
        """
        self.sock_cache: typing.Dict[str, str] = {}  # 符合条件的sock缓存一下, [(sock_name, pid)]
        self.appservice = None
        self.main = None  # maincontext, 一般只有基础库在使用
        self.skyline = None
        self.pages: typing.Dict[str, WebviewDriver] = {}  # webviewId -> driver
        self.ws2page: typing.Dict[str, str] = {}  # debugger url -> webviewId
        self.h5_pages: typing.Dict[str, H5Driver] = {}  # webviewId -> driver
        self._current_page = None
        self._fake_webview_id_map = {}  # 生成假的webview id. sock url -> webviewId
        self._fake_webview_id = 1  # 从1开始
        self._stop_refresh = True
        self.init()

    def refresh(self):
        """刷新webview & h5链接
        考虑独立线程刷新, 使用 _stop_refresh 来在每个阶段结束后检查是否需要继续检测
        """
        self._stop_refresh = False
        stime = time.time()
        self.logger.debug(f"🚀 start refresh")
        self._current_page = None
        # 检测小程序进程id
        processpid = self._init_pid()
        if self._stop_refresh:
            self.logger.debug("stop refresh")
            return
        # 检测符合小程序条件的tab
        _, webview_titles, other_titles = self._init_tabs(
            processpid
        )  
        if self._stop_refresh:
            self.logger.debug("stop refresh")
            return
        # 检测小程序webview渲染的页面
        current_wv_page, current_wv_sock = self._init_webview(webview_titles)
        if self._stop_refresh:
            self.logger.debug("stop refresh")
            return
        # 检测小程序h5页面
        self._init_h5(other_titles, current_wv_page, current_wv_sock)
        self.__mark("refresh total", stime)
        # self.print_summary()

    def print_summary(self):
        summary = [f"\n-----------{self.appid}调试链接概况-----------"]
        if self.appservice:  # 获取到service线程
            summary.append("链接WxaService成功")
            if not self._enable_skyline:
                summary.append("配置不开启skyline渲染线程检测")
            elif self.skyline.inited:
                summary.append("skyline渲染线程已开启")
            else:
                summary.append("skyline渲染线程未开启")
        else:
            summary.append("未链接WxaService")
        if self.pages:
            summary.append("当前小程序使用webview渲染的页面包括:")
        elif not self._enable_webview:
            summary.append("配置不开启webview页面检测")
        else:
            summary.append("未检测到当前小程序使用webview渲染的页面")
        for webview_id, driver in self.pages.items():
            summary.append(
                "[%s]%s"
                % (
                    webview_id,
                    f"{driver.title.path}[{'visible' if driver.title.visible else 'invisible'}]"
                    if driver.title
                    else "unknow",
                )
            )

        if self.h5_pages:
            summary.append("当前小程序内嵌的h5页面包括:")
        elif not self._enable_h5:
            summary.append("配置不开启h5页面检测")
        else:
            summary.append("未检测到当前小程序内嵌的h5页面")
        for webview_id, driver in self.h5_pages.items():
            summary.append("[%s]%s" % (webview_id, driver.title or "unknow"))
        summary.append("-" * 52)
        self.logger.info("\n".join(summary))

    def _check_appservice(self, sock_name, title, tcp_port):
        self.logger.info("try to connect wxaservice")
        unique_id = AppserviceWebSocket.get_unique_id(sock_name, title)
        if unique_id in self.IGNORE_ID:
            self.logger.info("ignore %s", unique_id)
            return False
        appservice_sock = AppserviceWebSocket(None, sock_name, title, str(tcp_port), msg_max_wait_time=self.config.cmd_timeout)
        # 重启小程序有可能不会改表sock, 但context的unique id可能变化, 需要重新监听
        if appservice_sock.id in WxaServiceDriver.CONTEXT:  # 已经建立了监听等操作
            WxaServiceDriver.CONTEXT.pop(appservice_sock.id)
        # service的ws都可以链接上, 但是命令不一定会响应, 需要兼容
        try:
            main_context = MainServiceDriver(appservice_sock)
        except TimeoutError as te:
            self.logger.exception(te)
            return False
        appid = None
        stime = time.time()
        while time.time() < stime + 5:  # __wxConfig?.accountInfo?.appId注入可能需要些时间
            appid = main_context.evaluate("""__wxConfig?.accountInfo?.appId || ''""")
            if appid:
                break
            if self.appservice:  # 别的线程已经初始化了
                break
            time.sleep(0.5)
        if appid == self.appid:
            self.appservice = AppserviceDriver(appservice_sock)
            self._enable_page_info = False  # 如果存在appservice相关信息由appservice更新
            if self._enable_skyline:
                self.skyline = SkylineDriver(appservice_sock)
            else:
                self.logger.info("不进行skyline页面检测")
            self.main = main_context
            return main_context.wait_init(5)  # 等一下初始化
        elif appid:  # 确认当前service不属于目标appid：
            self.IGNORE_ID.append(unique_id)
            return False
        
    def _get_real_webview_id(self, driver: WebviewDriver, title: WebViewTitle=None) -> typing.Tuple[str, str]:
        try:
            ret = driver.runtime.evaluate(
                """var i={"webview_id": window.__webviewId__, "appid": __wxConfig__.accountInfo.appId, "route": window.__route__};i"""
            )
            return ret.webview_id, ret.route
        except Exception as e:
            self.logger.exception(f"page[{title and title.path}] get appid fail")
        return None, None

    def _get_webview_id(self, driver: WebviewDriver, title: WebViewTitle) -> typing.Tuple[str, str]:
        url = driver.ws._url
        if self._enable_page_info:
            return self._get_real_webview_id(driver, title)
        else:
            with self._fake_webview_id_lock:
                if url in self._fake_webview_id_map:
                    return self._fake_webview_id_map[url], title.path
                webview_id = f"fake{self._fake_webview_id}"
                self._fake_webview_id += 1
                self._fake_webview_id_map[url] = webview_id
                return webview_id, title.path
        return None, None

    def _check_webview(
        self,
        title: WebViewTitle,
        sock_name: str,
        webSocketDebuggerUrl: str,
        new_pages: set,
    ) -> typing.Tuple[str, str, WebviewDriver]:
        try:
            webview_sock = CDPWebSocket(webSocketDebuggerUrl, msg_max_wait_time=self.config.cmd_timeout)
        except Exception as e:
            if title.visible:
                self.logger.exception(
                    f"connect page[{title.path}][visible:{title.visible}] fail"
                )
            return None, None, None
        driver = WebviewDriver(webview_sock, title)
        webview_id, route = self._get_webview_id(driver, title)
        if not webview_id:
            return None, None, None
        self.pages[
            webview_id
        ] = driver  # 后续可以通过 getCurrentPages().pop().__wxWebviewId__ 查找当前页面是否已经链接过
        new_pages.add(webview_id)
        self.ws2page[webSocketDebuggerUrl] = webview_id
        return webview_id, route, driver

    def _check_h5(
        self,
        title,
        webSocketDebuggerUrl,
        tab,
        webview_id,
        h5_pages: typing.List[H5Driver],
    ) -> H5Driver or None:
        try:
            sock = CDPWebSocket(webSocketDebuggerUrl, msg_max_wait_time=self.config.cmd_timeout)
        except Exception as e:
            self.logger.error("connect to h5 fail: {url}")
            return
        driver = H5Driver(sock, title, tab["url"])
        if not self.ws2page.get(webSocketDebuggerUrl):  # 这个websocket没有检查过
            is_mp_h5 = driver.evaluate("window.__wxjs_environment ? true : false")
            if not is_mp_h5:
                self.IGNORE_ID.append(webSocketDebuggerUrl)  # 不是mp的h5
                sock.destroy()
                return
            self.ws2page[
                webSocketDebuggerUrl
            ] = True  # 标记一下检测过的情况, 第一次检测过肯定不会有对应的webview_id
        else:  # 检测过又不在IGNORE_ID中的肯定是mp h5
            pass
        self.logger.info(f"find a mp h5 page: {title}, url: {tab['url']}")
        if not driver.hidden:
            self.h5_pages[webview_id] = driver
            self.ws2page[webSocketDebuggerUrl] = webview_id
            return driver
        h5_pages.append(driver)

    def close(self):
        """关闭所有该小程序相关的ws链接"""
        self.logger.info("close miniprogram link %s" % self.appid)
        if self.appservice:
            self.appservice.ws.destroy()
            self.appservice = None
            self.main = None
            self.skyline = None
        for d in self.pages.values():
            d.ws.destroy()
        self.pages = {}
        self.ws2page = {}
        for d in self.h5_pages.values():
            d.ws.destroy()
        self.h5_pages = {}

    def get_current_page(self, cnt):
        # 可递归重试获取当前页面
        if cnt > 2:
            return None
        if self.appservice:
            st = time.time()
            refresh_thread = WaitThread(target=self.refresh, daemon=True)
            refresh_thread.start()  # 先刷
            try:
                page = self.appservice.current_page
            except (TimeoutError, UniqueContextIdNotFound, ConnectionAbortedError):
                self.logger.exception("appservice get current page timeout, init again")
                # 没响应, 重新检测再重试
                self.appservice = None
                # 检测符合小程序条件的tab
                appservice_titles = self._init_tabs(self.processpid)[0]
                # 检测 AppService/Skyline thread
                self._init_appservice(appservice_titles)
                page = self.appservice.current_page
            self.__mark("appservice get current page info", st)
            if page.renderer == "skyline":
                self._stop_refresh = True
                refresh_thread.join()
                self.print_summary()
                return SkylinePage(self.skyline, **page)
            # webview渲染的页面
            if page.webviewId in self.pages:
                self._stop_refresh = True
                if page.webviewId in self.h5_pages:
                    return H5Page(
                        self.h5_pages[page.webviewId], **page
                    )  # 这种情况下, 没法刷新实时的url
                return WebviewPage(self.pages[page.webviewId], **page)
            refresh_thread.join()  # 之前没有出现过的page, 等待重新扫一遍
            self.print_summary()
            # self._current_page 跟 page 关联一下, update self.pages/self.h5_pages/self.ws2page
            # BUG: appservice中拿到的page信息, 有可能在chrome tabs中还没有更新过来!
            webview_id = self._current_page.page_info.get("webviewId", "")
            if str(webview_id).startswith("fake"):  # 更新真实的webview id
                real_webview_id, real_route = self._get_real_webview_id(self._current_page.driver, None)
                if real_webview_id is None:  # 链接不通？大致校验一下path吧
                    if page.route != self._current_page.page_info.get("route"):
                        # 拿不到真实webview id, 同时path不是同一个, 认为触发了以上bug
                        time.sleep(cnt+2)
                        return self.get_current_page(cnt+1)
                else:
                    # 先更新信息
                    url = self._current_page.driver.ws._url
                    self.ws2page[url] = real_webview_id
                    self.pages[real_webview_id] = self.pages.pop(webview_id)
                    if webview_id in self.h5_pages:
                        self.h5_pages[real_webview_id] = self.h5_pages.pop(webview_id)
                    if real_webview_id != page.webviewId: # 应该也触发了上面的bug了
                        time.sleep(cnt+2)
                        return self.get_current_page(cnt+1)
            if page.webviewId in self.pages:
                if page.webviewId in self.h5_pages:
                    return H5Page(self.h5_pages[page.webviewId], **page)
                return WebviewPage(self.pages[page.webviewId], **page)
            return None
        # 没有appservice只能靠webview渲染的visible判断
        self.init()
        return self._current_page

    @property
    def current_page(self):
        return self.get_current_page(0)


if __name__ == "__main__":
    import at

    level = logging.DEBUG
    logging.basicConfig(level=level)
    logging.lastResort.level = level
    logger.setLevel(level)
    at_instance = at.At()
    # "wx40f8626ddf43d362" / "wxe5f52902cf4de896" 小程序示例 / "wx3eb9cfc5787d5458" minitest-demo / "wx05c7e5a27d898286" skyline测试demo
    mini = MiniProgram(
        at_instance, "wx3eb9cfc5787d5458", {"skyline": False, "logger_level": level}
    )
    stime = time.time()
    print(mini.current_page)
    print(f"cost: {time.time() - stime}")
    stime = time.time()
    print(mini.current_page)
    print(f"cost: {time.time() - stime}")
    # time.sleep(20)
    # test_path = "/Users/yopofeng/workspace/minium/androidCloudMinium/minium/utils/js/weapp-monkey-helper/js/skylineHelper.js"
    # with open(test_path, "r") as fd:
    #     mini.current_page.driver.evaluate(fd.read())
    # a = (mini.current_page.driver.evaluate("""window.__skylineMonkeyHelper__.getFirstWxElemen()""", awaitPromise=True))
    # print(a)
    mini.close()
