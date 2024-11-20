"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-10-09 16:41:56
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-10-18 16:02:27
FilePath: /wechat-mp-inspector/wechat_mp_inspector/driver/mpdriver.py
Description: 小程序驱动
"""
import uuid
import asyncio
from dataclasses import asdict
from typing import Dict, List, Tuple, Iterable, TYPE_CHECKING, Callable, Union, Optional

from ..lazyloader import lazy_import
from ..pages.basepage import BasePage
from wechat_mp_inspector.inspector.baseinspector import BaseInspector
from .basedriver import BaseConfig, BaseDriver
from .androiddriver import (
    AndroidDriver,
    AndroidConfig,
    AndroidInspector,
    CDPConnection,
    CDPSession,
)

from ..inspector.wxainspector import WebviewInspector, H5Inspector

if TYPE_CHECKING:
    import wechat_mp_inspector.driver.iosdriver as iosdriver
    import wechat_mp_inspector.pages.safaripage as safaripage
    import wechat_mp_inspector.inspector.androidwxainspector as AWI
    import wechat_mp_inspector.inspector.ioswxainspector as IWI
else:
    iosdriver = lazy_import("wechat_mp_inspector.driver.iosdriver")
    safaripage = lazy_import("wechat_mp_inspector.pages.safaripage")
    AWI = lazy_import("wechat_mp_inspector.inspector.androidwxainspector")
    IWI = lazy_import("wechat_mp_inspector.inspector.ioswxainspector")
from ..pages.basepage import *
from ..pages.chromepage import *
from .config import AndroidMP, IOSMP, MPConfig
from ..logger import logger
import threading
import time
from ..utils import WaitThread, thread_wait, get_url_path, async_race
from ..exception import *
from ..emitter import MyEventEmitter
from ..pages.mppage import WebviewPage, H5Page, SkylinePage

class MiniProgram(BaseDriver):
    driver: BaseDriver = None
    config: MPConfig = None

    IGNORE_ID = {}  # appid -> [*unique_ids], 记录一些确定不属于该小程序的 unique id, 减少重复的检查

    def __new__(cls, appid, config: MPConfig = None):
        if config is None:
            raise ValueError("platform/serial/udid cannot all be None")
        if config.serial is None and config.udid is None and config.platform is None:
            raise ValueError("platform/serial/udid cannot all be None")
        config.appid = appid
        if config.platform is not None:
            if config.platform == "ios":
                inst = object.__new__(IOSMiniProgram)
                inst.config = IOSMP(config)
                inst.driver = iosdriver.IOSDriver(inst.config)
            else:
                inst = object.__new__(AndroidMiniProgram)
                inst.config = AndroidMP(config)
                inst.driver = AndroidDriver(inst.config)
        else:
            if config.serial:
                inst = object.__new__(AndroidMiniProgram)
                inst.config = AndroidMP(config)
                inst.driver = AndroidDriver(inst.config)
            else:
                inst = object.__new__(IOSMiniProgram)
                inst.config = IOSMP(config)
                inst.driver = iosdriver.IOSDriver(inst.config)
        return inst

    def __init__(self, appid, config: MPConfig = None):
        self.appid = appid
        self.config = config
        self.logger = logger.getChild(f"Mini{self.appid}")
        self.logger.setLevel(config.logger_level)
        if self.appid not in MiniProgram.IGNORE_ID:
            MiniProgram.IGNORE_ID[self.appid] = []
        self.IGNORE_ID: List[str] = MiniProgram.IGNORE_ID[self.appid]

    def get_pages(self):
        return self.driver.get_pages()

    @property
    def current_page(self):
        return None


class AndroidMiniProgram(MiniProgram):
    driver: AndroidDriver
    config: AndroidMP

    def __init__(self, appid, config: AndroidMP = None):
        super().__init__(appid, config)
        self.processpid: str = None
        self.at = self.driver.at
        self.sock_cache: Dict[str, str] = {}  # 符合条件的sock缓存一下, [(sock_name, pid)]
        self.appservice: AWI.AppserviceInspector = None
        self.main = None  # maincontext, 一般只有基础库在使用
        self.skyline: AWI.SkylineInspector = None
        self.pages: Dict[str, AWI.WebviewInspector] = {}  # webviewId -> inspector
        self.ws2page: Dict[str, str] = {}  # debugger url -> webviewId
        self.h5_pages: Dict[str, AWI.H5Inspector] = {}  # webviewId -> inspector
        self._current_page = None
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
        if self._enable_skyline:  # 默认先检测appservice链接, 进行一次初始化
            self.init()

    def __mark(self, name, start_time):
        self.logger.debug("🚀 %s cost: %.3f" % (name, time.time() - start_time))

    def _get_current_appbrand(self):
        """获取当前小程序进程名和进程id

        :return str, int: List[(processname, pid)]
        """
        for top_m in (15, 20):  # 如果top15找不到尝试使用top20
            result: List[Tuple[str, str]] = [(r[0], str(r[1]).strip()) for r in self.driver._get_current_active_process(
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

    def _init_pid(self) -> str or List[str] or None: # type: ignore
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

    def _get_pages(
        self, processpids: Union[str, List[str]]
    ) -> Tuple[
        List["ChromeAppServicePage"],
        List["ChromeWebViewPage"],
        List["ChromeNormalPage"],
    ]:
        """获取pid下的page实例

        :param str pid: process id, defaults to None
        :return List[NormalPage]: 页面实例
        """

        def _init_tabs(processpid: str):
            st = time.time()
            appservice_titles: List["ChromeAppServicePage"] = []
            webview_titles: List["ChromeWebViewPage"] = []
            other_titles: List["ChromeNormalPage"] = []
            cache_cnt = len(self.sock_cache)  # appservice一个sock, webview一个sock
            if self._enable_skyline:
                cache_cnt -= 1
            if self._enable_webview:
                cache_cnt -= 1
            sock_dict = (
                self._enable_sock_cache and cache_cnt >= 0 and self.sock_cache
            ) or self.driver._get_debug_sock_name()
            if processpid not in sock_dict.values():  # 再确认一下是不是真的没有
                sock_dict = self.driver._get_debug_sock_name(processpid)
            for (
                sock_name,
                pid,
            ) in (
                sock_dict.items()
            ):  # 可能有多个remote debug port, 找出属于小程序的那个. sock_cache至少有两个才不
                # 优化点:
                # 1. appservice在一个sock中, 微信不重启不会改变.
                # 2. webview在一个sock中, 不重启也不会改变
                self.logger.debug(f"find debugger port for {sock_name}")
                if pid == processpid:
                    retry_cnt = (
                        1  # webview title有可能会处于initial状态, 需要至少等一个visible/invisible才可以继续
                    )
                    stime = time.time()
                    while retry_cnt:
                        retry_cnt -= 1
                        is_webview_sock = False
                        tabs, tcp_port = self.driver.get_tabs_by_sock(sock_name)
                        self.logger.info(
                            "tabs: %s" % (",".join([tab["title"] for tab in tabs]))
                        )
                        for tab in tabs:
                            webSocketDebuggerUrl = tab.get("webSocketDebuggerUrl")
                            if not webSocketDebuggerUrl:
                                continue
                            page = ChromeNormalPage(
                                tab["title"],
                                tab.get("url", ""),
                                webSocketDebuggerUrl,
                                tab.get("description"),
                                unique_id=tab.get("id", None) or get_url_path(webSocketDebuggerUrl),
                                tcp_port=tcp_port,
                                sock_name=sock_name,
                            )
                            if not page:
                                continue
                            if page.unique_id in self.IGNORE_ID:
                                self.logger.debug("ignore %s", page.unique_id)
                                continue
                            if isinstance(
                                page, ChromeAppServicePage
                            ):  # 小程序appservice线程
                                if page.appid and page.appid != self.appid:
                                    continue
                                appservice_titles.append(page)
                                if self._enable_skyline:
                                    self.sock_cache[sock_name] = pid
                            elif isinstance(page, ChromeWebViewPage):  # 小程序webview渲染的页面
                                webview_titles.append(page)
                                if page.appid != self.appid:
                                    self.logger.debug(
                                        f"ignore tab [{page.title}], appid not match"
                                    )
                                    continue
                                if self._enable_webview:
                                    is_webview_sock = True
                                    self.sock_cache[sock_name] = pid
                            elif self._enable_h5:
                                other_titles.append(page)
                        if is_webview_sock and webview_titles:  # 这个sock是 webview的
                            vc = ic = nc = 0  # visible cnt, invisible cnt, initial cnt
                            for t in webview_titles:
                                if t.initial:
                                    nc += 1
                                elif t.visible:
                                    vc += 1
                                else:
                                    ic += 1
                            if (
                                not vc and not ic and nc and (time.time() - stime) < 20
                            ):  # 只有initial的, 20s内重试
                                webview_titles = list(
                                    filter(
                                        lambda x: x.ext_info.sock_name != sock_name,
                                        webview_titles,
                                    )
                                )
                                retry_cnt = 1

            self.__mark("get all page", st)
            return appservice_titles, webview_titles, other_titles

        if isinstance(processpids, list):  # 多个符合的pid
            max_count = -1
            for pid in processpids:
                _appservice_titles, _webview_titles, _other_titles = _init_tabs(pid)
                # 有visible的webview页面
                if _webview_titles and [w.visible for w in _webview_titles].count(True):
                    self.processpid = pid
                    appservice_titles, webview_titles, other_titles = (
                        _appservice_titles,
                        _webview_titles,
                        _other_titles,
                    )
                    break
                count = (
                    len(_appservice_titles) + len(_webview_titles) + len(_other_titles)
                )  # 算最多的那个当活跃进程
                if count > max_count:
                    max_count = count
                    self.processpid = pid
                    appservice_titles, webview_titles, other_titles = (
                        _appservice_titles,
                        _webview_titles,
                        _other_titles,
                    )
        else:
            # 检测符合小程序条件的tab
            appservice_titles, webview_titles, other_titles = _init_tabs(processpids)
        return appservice_titles, webview_titles, other_titles

    def _check_appservice(self, page: ChromeAppServicePage):
        self.logger.info("try to connect wxaservice")
        unique_id = page.unique_id
        if unique_id in self.IGNORE_ID:
            self.logger.info("ignore %s", unique_id)
            return False
        inspector = self.inspector_session(page)
        inspector.set_default_command_timeout(self.config.cmd_timeout)
        # 重启小程序有可能不会改表sock, 但context的unique id可能变化, 需要重新监听
        if inspector.id in AWI.WxaInspector.CONTEXT:  # 已经建立了监听等操作
            AWI.WxaInspector.CONTEXT.pop(inspector.id)
        # service的ws都可以链接上, 但是命令不一定会响应, 需要兼容
        try:
            main_context = AWI.MainServiceInspector(inspector, page)
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
            self.appservice = AWI.AppserviceInspector(inspector, page)
            self._enable_page_info = False  # 如果存在appservice相关信息由appservice更新
            if self._enable_skyline:
                self.skyline = AWI.SkylineInspector(inspector, page)
            else:
                self.logger.info("不进行skyline页面检测")
            self.main = main_context
            return main_context.wait_init(5)  # 等一下初始化
        elif appid:  # 确认当前service不属于目标appid：
            self.IGNORE_ID.append(unique_id)
            return False

    def _init_appservice(
        self, appservice_pages: Iterable["ChromeAppServicePage"]
    ) -> AWI.AppserviceInspector:
        """初始化appservice线程

        :param Iterable['ChromeAppServicePage'] appservice_titles: 符合appservice线程的page
        """
        st = time.time()
        if self._enable_skyline and not (
            self.appservice and self.appservice.is_connecting
        ):  # appservice不连通了, 需要重新链接
            ts = [
                WaitThread(target=self._check_appservice, args=(page,))
                for page in appservice_pages
            ]
            if ts:
                try:
                    thread_wait(ts, True, self.config.timeout)
                except (TimeoutError, ValueError) as te:
                    self.logger.warning("appservice/skyline链接建立失败")
                    self.logger.exception(te)
                except Exception as e:
                    self.logger.error("appservice/skyline链接建立失败")
                    self.logger.exception(e)
            else:
                self.logger.warning("appservice/skyline链接建立失败, 未检测到相关线程")
        self.__mark("check appservice thread", st)
        return self.appservice

    def _get_real_webview_id(
        self, inspector: AWI.WebviewInspector, page: ChromeWebViewPage
    ) -> Tuple[str, str]:
        try:
            ret = inspector.runtime.evaluate(
                """var i={"webview_id": window.__webviewId__, "appid": __wxConfig__.accountInfo.appId, "route": window.__route__};i"""
            )
            return ret.webview_id, ret.route
        except Exception as e:
            self.logger.exception(f"page[{page.path}] get appid fail")
        return None, None

    def _get_webview_id(
        self, inspector: AWI.WebviewInspector, page: ChromeWebViewPage
    ) -> Tuple[str, str]:
        if self._enable_page_info:
            return self._get_real_webview_id(inspector, page)
        else:
            with self._fake_webview_id_lock:
                if inspector.id in self._fake_webview_id_map:
                    return self._fake_webview_id_map[inspector.id], page.path
                webview_id = f"fake{self._fake_webview_id}"
                self._fake_webview_id += 1
                self._fake_webview_id_map[inspector.id] = webview_id
                return webview_id, page.path

    def _check_webview(
        self,
        page: ChromeWebViewPage,
        new_pages: set,
    ) -> Tuple[str, str, AWI.WebviewInspector]:
        try:
            inspector = self.inspector_session(page)
        except Exception as e:
            if page.visible:
                self.logger.exception(
                    f"connect page[{page.path}][visible:{page.visible}] fail"
                )
            return None, None, None
        webview_id, route = self._get_webview_id(inspector, page)
        if not webview_id:
            return None, None, None
        self.pages[
            webview_id
        ] = inspector  # 后续可以通过 getCurrentPages().pop().__wxWebviewId__ 查找当前页面是否已经链接过
        new_pages.add(webview_id)
        self.ws2page[page.unique_id] = webview_id
        return webview_id, route, inspector

    def _init_webview(self, webview_pages: Iterable["ChromeWebViewPage"]):
        """初始化webview渲染的页面

        :param Iterable['ChromeWebViewPage'] webview_titles: 符合小程序webview渲染页面的page
        :return: current_wv_page
        """
        st = time.time()
        current_wv_page = None  # 当前webview渲染的页面
        if self._enable_webview:
            new_pages = set()  # 用于更新self.pages
            semaphore = threading.Semaphore(0)  # 并行检测使用
            check_webview_threads: List[Tuple[WaitThread, ChromeWebViewPage]] = []
            for page in webview_pages:
                # getCurrentPages().pop().__wxWebviewId__ 对应 window.__webviewId__
                # __wxConfig__.accountInfo.appId 为appid, 插件页面中该信息也为宿主appid
                if not page.webSocketDebuggerUrl:  # 无法调试
                    continue
                if page.appid != self.appid:
                    continue
                t = None
                if not self.ws2page.get(page.unique_id):  # 未检查过, 丢到线程中并行检查
                    t = WaitThread(
                        target=self._check_webview,
                        args=(page, new_pages),
                        semaphore=semaphore,
                    )
                    t.start()
                    check_webview_threads.append((t, page))
                else:
                    webview_id = self.ws2page[page.unique_id]
                    new_pages.add(webview_id)
                    inspector = self.pages[webview_id]
                    inspector.page = page  # 刷新title
                    route = None
                if page.visible and not t:  # 不需要重新链接的, 可以直接更新
                    self._current_page = WebviewPage(
                        inspector, route=route, webviewId=webview_id
                    )
                    current_wv_page = self._current_page
                    self.logger.info("current page: %s" % self._current_page)
            for t, page in check_webview_threads:  # 等待并行链接的情况
                if page.visible:  # 只等待visible的链接成功就好
                    t.join()
                    webview_id, route, inspector = t.get_result()
                    if not webview_id:
                        continue
                    self._current_page = WebviewPage(
                        inspector, route=route, webviewId=webview_id
                    )
                    current_wv_page = self._current_page
                    self.logger.info("current page: %s" % self._current_page)
            for old_wv_id in list(self.pages.keys()):
                if old_wv_id not in new_pages:  # 页面可能销毁了
                    inspector = self.pages.pop(old_wv_id)
                    self.logger.debug(
                        f"{str(inspector.page.title)} maybe has destroyed"
                    )
                    if inspector.page.unique_id in self.ws2page:
                        self.ws2page.pop(inspector.page.unique_id)
                    inspector._session.connection.destroy()
                    if old_wv_id in self.h5_pages:
                        inspector = self.h5_pages.pop(old_wv_id)
                        self.logger.debug(
                            f"{str(inspector.page.title)} maybe has destroyed"
                        )
                        if inspector.page.unique_id in self.ws2page:
                            self.ws2page.pop(inspector.page.unique_id)
                        inspector._session.connection.destroy()
            self.__mark(f"check {len(list(webview_pages))} webview page", st)
        else:
            self.logger.info("不进行webview页面检测")
        return current_wv_page

    def _check_h5(
        self,
        page: ChromeNormalPage,
        webview_id,
        h5_pages: List[AWI.H5Inspector],
    ) -> Optional[AWI.H5Inspector]:
        self.logger.info(f"check {page}")
        try:
            inspector = self.inspector_session(page)
        except Exception as e:
            self.logger.error(f"connect to h5 fail: {page.url}")
            return
        if not self.ws2page.get(page.unique_id):  # 这个websocket没有检查过
            is_mp_h5 = inspector.evaluate("window.__wxjs_environment ? true : false")
            if not is_mp_h5:
                self.IGNORE_ID.append(page.unique_id)  # 不是mp的h5
                inspector._session.connection.destroy()
                return
            self.ws2page[page.unique_id] = True  # 标记一下检测过的情况, 第一次检测过肯定不会有对应的webview_id
        else:  # 检测过又不在IGNORE_ID中的肯定是mp h5
            pass
        self.logger.info(f"find a mp h5 page: {page.title}, url: {page.url}")
        if not inspector.hidden:
            self.h5_pages[webview_id] = inspector
            self.ws2page[page.unique_id] = webview_id
            return inspector
        h5_pages.append(inspector)

    def _init_h5(
        self,
        normal_pages: Iterable["ChromeNormalPage"],
        current_wv_page: WebviewPage,
    ):
        """初始化h5页面

        :param Iterable[NormalPage] normal_pages: 普通页面
        :param WebviewPage current_wv_page: 当前webview页面
        """
        if (
            self._enable_h5 and current_wv_page and normal_pages
        ):  # TODO: current page是webview的页面才支持小程序h5
            # 检查
            # 1. 当前页面是否是webview页面
            # 2. 是否有wx-web-view标签
            st = time.time()
            skip = False  # 跳过检查
            h5_pages = []  # 可能的h5 driver
            ts: List[Tuple[WaitThread, ChromeNormalPage]] = []
            if self.appservice:
                # current_wv_page 一般来说可以说明当前页面是webview页面, 但不能肯定visible这个标记是否靠谱, 有appservice情况下最好用页面栈确定
                # current_wv_page 可能存在fake[x]的webview id, 与appservice的真实id不一致, 检验相关信息后, 应继续使用current_wv_page
                current_page = self.appservice.current_page
                if not current_page.renderer == "webview":  # 不是webview模式渲染出来的
                    skip = True
                elif (
                    current_page.webviewId in self.pages
                    and not self.pages[current_page.webviewId].is_webview
                ):  # 不是web-view的小程序页面
                    skip = True
                else:
                    webview_id = current_page.webviewId
                    if current_wv_page.page_info.get("webviewId", "").startswith(
                        "fake"
                    ):
                        # 虚拟id, 对比一下path
                        if (
                            current_wv_page.page_info.get("route", "").rstrip(".html")
                            != current_page.route
                        ):
                            self.logger.warning(
                                f"检测current page异常: {current_page.route} != {current_wv_page.page_info.get('route', '')}, 可能是{current_wv_page.inspector.page.title}不准确引起"
                            )
                        else:
                            real_id, _ = self._get_real_webview_id(
                                current_wv_page.inspector,
                                current_wv_page.inspector.page,
                            )
                            if real_id != webview_id:
                                self.logger.warning(
                                    f"检测current page异常, webviewId不一样: {current_page.webviewId} != {real_id}"
                                )
                            else:
                                fake_id = current_wv_page.page_info.get("webviewId")
                                # 用真实webview id, 需要更新 self.pages & self.ws2page
                                if fake_id in self.pages:
                                    inspector = self.pages[fake_id]
                                    self.ws2page[inspector.page.unique_id] = webview_id
                                    self.pages[webview_id] = self.pages.pop(fake_id)

            elif not current_wv_page.inspector.is_webview:
                skip = True
            else:
                webview_id = current_wv_page.page_info.get("webviewId")
                current_page = current_wv_page.page_info
            semaphore = threading.Semaphore(0)  # 并行检测使用
            if not skip:
                for page in normal_pages:
                    if not page.webSocketDebuggerUrl:
                        continue
                    if (
                        page.ext_info.sock_name
                        != current_wv_page.inspector.page.ext_info.sock_name
                    ):  # webview页面和h5页面应该是同一个tabs中
                        continue
                    if not page.url or page.empty:
                        continue
                    # 需要检测hidden属性, 全丢线程中并行检查
                    t = WaitThread(
                        target=self._check_h5,
                        args=(page, webview_id, h5_pages),
                        semaphore=semaphore,
                    )
                    t.start()
                    ts.append((t, page))
                cnt = len(ts)
                while cnt and not self.h5_pages.get(webview_id):  # 未有符合条件的链接
                    if semaphore.acquire():  # 等待 _check_h5 结果
                        cnt -= 1
                    for t, _ in ts:
                        if t.get_result(block=False):  # 有返回的就是符合当前条件的链接
                            break
                if not self.h5_pages.get(webview_id) and h5_pages:
                    self.h5_pages[webview_id] = h5_pages[0]  # sock
                if self.h5_pages.get(webview_id):  # 有符合条件的h5
                    inspector = self.h5_pages[webview_id]
                    current_page["url"] = inspector.page.url
                    self._current_page = H5Page(inspector, **current_page)
            self.__mark(f"check {len(ts)} h5 page", st)

    def _print_summary(self):
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
        for webview_id, inspector in self.pages.items():
            summary.append(
                "[%s]%s"
                % (
                    webview_id,
                    f"{inspector.page.path}[{'visible' if inspector.page.visible else 'invisible'}]"
                    if inspector.page
                    else "unknow",
                )
            )

        if self.h5_pages:
            summary.append("当前小程序内嵌的h5页面包括:")
        elif not self._enable_h5:
            summary.append("配置不开启h5页面检测")
        else:
            summary.append("未检测到当前小程序内嵌的h5页面")
        for webview_id, inspector in self.h5_pages.items():
            summary.append("[%s]%s" % (webview_id, inspector.page.title or "unknow"))
        summary.append("-" * 52)
        self.logger.info("\n".join(summary))

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
        appservice_pages, webview_pages, normal_pages = self._get_pages(processpid)
        # 检测 AppService/Skyline thread
        self._init_appservice(appservice_pages)
        # 检测小程序webview渲染的页面
        current_wv_page = self._init_webview(webview_pages)
        # 检测小程序h5页面
        self._init_h5(
            normal_pages,
            current_wv_page,
        )
        self.__mark("init total", stime)
        self._print_summary()

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
        _, webview_pages, normal_pages = self._get_pages(processpid)
        if self._stop_refresh:
            self.logger.debug("stop refresh")
            return
        # 检测小程序webview渲染的页面
        current_wv_page = self._init_webview(webview_pages)
        if self._stop_refresh:
            self.logger.debug("stop refresh")
            return
        # 检测小程序h5页面
        self._init_h5(
            normal_pages,
            current_wv_page,
        )
        self.__mark("refresh total", stime)

    # mp driver 方法
    @property
    def current_page(self):
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
                appservice_pages = self._get_pages(self.processpid)[0]
                # 检测 AppService/Skyline thread
                self.appservice = self._init_appservice(appservice_pages)
                if not self.appservice:
                    self.logger.error("重新建立appservice/skyline链接失败")
                    return self.current_page
                page = self.appservice.current_page
            self.__mark("appservice get current page info", st)
            if page.renderer == "skyline":
                self._stop_refresh = True
                refresh_thread.join()
                self._print_summary()
                return SkylinePage(self.skyline, **page)
            # webview渲染的页面
            if page.webviewId in self.pages:
                if page.webviewId in self.h5_pages:
                    # 更新一下信息
                    normal_pages = self._get_pages(self._init_pid())[2]
                    inspector = self.h5_pages[page.webviewId]
                    for np in normal_pages:
                        if np == inspector.page:  # up info
                            inspector.page = np
                            break
                    return H5Page(inspector, **page)  # 这种情况下, 没法刷新实时的url
                return WebviewPage(self.pages[page.webviewId], **page)
            refresh_thread.join()  # 之前没有出现过的page, 等待重新扫一遍.
            self._print_summary()
            # self._current_page 跟 page 关联一下, update self.pages/self.h5_pages/self.ws2page
            webview_id = self._current_page.page_info.get("webviewId", "")
            if str(webview_id).startswith("fake"):  # 更新真实的webview id
                url = self._current_page.inspector.page.webSocketDebuggerUrl
                self.ws2page[url] = page.webviewId
                self.pages[page.webviewId] = self.pages.pop(webview_id)
                if webview_id in self.h5_pages:
                    self.h5_pages[page.webviewId] = self.h5_pages.pop(webview_id)
            if page.webviewId in self.pages:
                if page.webviewId in self.h5_pages:
                    return H5Page(self.h5_pages[page.webviewId], **page)
                return WebviewPage(self.pages[page.webviewId], **page)
            return None
        # 没有appservice只能靠webview渲染的visible判断
        self.init()
        return self._current_page

    # driver 方法
    def get_pages(self):
        appservice_pages, webview_pages, normal_pages = self._get_pages(
            self._init_pid()
        )
        return appservice_pages + webview_pages + normal_pages

    def inspector_session(self, page: ChromeNormalPage):
        session_id = str(uuid.uuid4()).upper()
        connection = CDPConnection(page.webSocketDebuggerUrl, unique_id=page.unique_id)
        session = CDPSession(connection, session_id, page, self.driver.refresh_page)
        if isinstance(page, ChromeAppServicePage):
            return AWI.WxaInspector(session, page)
        elif isinstance(page, ChromeWebViewPage):
            return AWI.WebviewInspector(session, page)
        elif isinstance(page, ChromeNormalPage):
            return AWI.H5Inspector(session, page)
        return AndroidInspector(session)


class IOSMiniProgram(MiniProgram):
    driver: "iosdriver.IOSDriver"
    config: IOSMP

    def __init__(self, appid, config: IOSMP = None):
        super().__init__(appid, config)
        self.ee = MyEventEmitter()
        self.inited = None
        self.closed = False
        # driver中其他实例
        self.appservice: IWI.AppserviceInspector = None
        self.skyline: IWI.SkylineInspector = None
        self.main: IWI.MainServiceInspector = None
        self.pages: Dict[str, IWI.WebviewInspector] = {}  # webviewId -> inspector
        self.uid2wid: Dict[str, str] = {}  # unique_id -> webviewId
        self.h5_pages: Dict[str, IWI.H5Inspector] = {}  # webviewId -> inspector
        self._current_page = None

        # 配置
        self._enable_skyline = self.config.skyline
        self._enable_webview = self.config.webview
        self._enable_h5 = self.config.h5
        if self._enable_h5:
            self._enable_webview = True  # 需要检测当前页面是不是确定有web-view组件，必须开启webview检测
        self._enable_page_info = self.config.init_page_info
        self._fake_webview_id_map = {}  # 生成假的webview id. sock url -> webviewId
        self._fake_webview_id = 1  # 从1开始
        self._fake_webview_id_lock = asyncio.Lock()

    @classmethod
    def listen_app(cls, mini: "IOSMiniProgram", timeout=20):
        while not mini.closed and not mini.inited:  # app没有初始化 & driver未释放
            try:
                mini.inited = mini.driver.wait_for_app(timeout)
            except TimeoutError:
                mini.inited = False
            if not mini.inited:
                mini.logger.warning("app没加载好")
            else:
                mini.logger.info("监听到app")
                mini.ee.emit("app_ready")

    def close(self):
        self.closed = True

    def __mark(self, name, start_time):
        self.logger.debug("🚀 %s cost: %.3f" % (name, time.time() - start_time))

    def _check_appservice(self, page: "safaripage.SafariAppServicePage") -> bool:
        self.logger.info("try to connect appservice")
        unique_id = page.unique_id
        if unique_id in self.IGNORE_ID:
            self.logger.info("ignore %s", unique_id)
            return False
        type_ = page.type_ or IWI.WxaInspector.check_type(page.title)
        if type_ is not IWI.AppserviceInspector:
            return False
        inspector = self.inspector_session(page)
        if inspector is None:
            return False
        inspector.set_default_command_timeout(self.config.cmd_timeout)
        appid = None
        stime = time.time()
        while time.time() < stime + 5:  # __wxConfig?.accountInfo?.appId注入可能需要些时间
            appid = inspector.evaluate("""__wxConfig?.accountInfo?.appId || ''""")
            if appid:
                break
            if self.appservice:  # 别的线程已经初始化了
                break
        if appid == self.appid:
            self.appservice = inspector
            self._enable_page_info = False
            return True
        elif appid:
            self.IGNORE_ID.append(unique_id)
        return False

    def _check_skyline(self, page: "safaripage.SafariAppServicePage") -> bool:
        if not self._enable_skyline:
            self.logger.info("不进行skyline页面检测")
            return False
        self.logger.info("try to connect skyline")
        unique_id = page.unique_id
        if unique_id in self.IGNORE_ID:
            self.logger.info("ignore %s", unique_id)
            return False
        type_ = page.type_ or IWI.WxaInspector.check_type(page.title)
        if type_ is not IWI.SkylineInspector:
            return False
        inspector = self.inspector_session(page)
        if inspector is None:
            return False
        inspector.set_default_command_timeout(self.config.cmd_timeout)
        appid = None
        stime = time.time()
        while time.time() < stime + 5:  # __wxConfig?.accountInfo?.appId注入可能需要些时间
            appid = inspector.evaluate("""__wxConfig?.accountInfo?.appId || ''""")
            if appid:
                break
            if self.skyline:  # 别的线程已经初始化了
                break
        if appid == self.appid:
            self.skyline = inspector
            self._enable_page_info = False
            return True
        elif appid:
            self.IGNORE_ID.append(unique_id)
        return False

    def _init_appservice(
        self, appservice_pages: Dict[str, "safaripage.SafariAppServicePage"]
    ) -> 'IWI.AppserviceInspector':
        """初始化appservice线程

        :param Dict[str, 'SafariAppServicePage'] appservice_titles: 符合appservice线程的page
        """
        st = time.time()
        # inspector = self.inspector_session(appservice_pages["main"])
        if not self.appservice and "appservice" in appservice_pages:
            # check appservice
            self._check_appservice(appservice_pages["appservice"])
        if not self.skyline and self._enable_skyline and "skyline" in appservice_pages:
            # check skyline
            self._check_skyline(appservice_pages["skyline"])
        self.__mark("check appservice thread", st)
        return self.appservice

    async def _get_real_webview_id(
        self, inspector: "IWI.WebviewInspector", page: "safaripage.SafariWebViewPage"
    ) -> Tuple[str, str]:
        try:
            ret = await inspector._evaluate(
                """var i={"webview_id": window.__webviewId__, "appid": (window.__wxConfig__||window.__wxConfig).accountInfo.appId, "route": window.__route__};i"""
            )
            page.appid = ret.appid
            return ret.webview_id, ret.route
        except Exception as e:
            self.logger.exception(f"page[{page}] get appid fail")
        return None, None

    async def _get_webview_id(
        self, inspector: "IWI.WebviewInspector", page: "safaripage.SafariWebViewPage"
    ) -> Tuple[str, str]:
        if self._enable_page_info or page.appid == "preload":
            return await self._get_real_webview_id(inspector, page)
        else:
            return await self._get_fake_webview_id(inspector, page)

    async def _get_fake_webview_id(
        self, inspector: "IWI.PageInspector", page: "safaripage.SafariNormalPage"
    ):
        async with self._fake_webview_id_lock:
            if inspector.id in self._fake_webview_id_map:
                return self._fake_webview_id_map[inspector.id], getattr(
                    page, "path", ""
                )
            webview_id = f"fake{page.id_}"
            self._fake_webview_id += 1
            self._fake_webview_id_map[inspector.id] = webview_id
            return webview_id, getattr(page, "path", "")

    async def _check_webview(
        self,
        page: "safaripage.SafariWebViewPage",
        inspector: WebviewInspector,
        new_pages: set,
    ) -> Tuple[str, str, "IWI.WebviewInspector", bool]:
        """检查webview页面状态

        :param safaripage.SafariWebViewPage page: 页面实例
        :param WebviewInspector inspector: inspector实例
        :param set new_pages: 新页面集合
        :return Tuple[str, str, "IWI.WebviewInspector", bool]: webview_id, route, inspector, visible
        """
        self.logger.info(f"checking {page}")
        webview_id, route = await self._get_webview_id(inspector, page)
        if not webview_id:
            return None, None, None, False
        self.pages[
            webview_id
        ] = inspector  # 后续可以通过 getCurrentPages().pop().__wxWebviewId__ 查找当前页面是否已经链接过
        new_pages.add(webview_id)
        self.uid2wid[page.unique_id] = webview_id
        hidden = await inspector._hidden()
        return webview_id, route, inspector, not hidden

    async def _page_hidden(self, inspector: "IWI.PageInspector"):
        try:
            return await inspector._hidden()
        except TimeoutError:
            inspector.close()
            return True

    async def _check_visible_page(
        self, pages: List["safaripage.SafariNormalPage"], check_func: Callable=_check_webview, page_type=WebviewPage, inspector_map: Dict[str, "IWI.PageInspector"]={}
    ):
        """检查当前没有hidden的页面

        :param List[safaripage.SafariNormalPage] pages: 页面列表
        :param Callable check_func: 检查函数, 参考self._check_webview, defaults to _check_webview
        :param WebviewPage page_type: current_page的实例化类, defaults to WebviewPage
        :param dict inspector_map: 记录 webviewid -> inspector的dict
        :return WebviewPage, set: current_page, current_pages
        """
        current_page = None
        current_pages = set()  # 用于更新self.pages
        check_threads: List[asyncio.Future] = []
        for page in pages:
            if not self.uid2wid.get(page.unique_id):  # 未检查过, 丢到线程中并行检查
                try:
                    inspector = self.inspector_session(page)
                except Exception as e:
                    self.logger.exception(f"inspect {page} fail")
                    continue
                if inspector is None:
                    self.logger.warning(f"inspect {page} fail")
                    continue
                future = self.driver.ensure_future(
                    check_func(page, inspector, current_pages)
                )
                check_threads.append(future)
            else:
                webview_id = self.uid2wid[page.unique_id]
                current_pages.add(webview_id)
                inspector = inspector_map[webview_id]
                inspector.page = page  # 刷新title
                route = None
        if check_threads:  # 有新页面
            results = self.driver.await_(asyncio.gather(*check_threads))  # 等待并行链接的情况
            for webview_id, route, inspector, visible in results:
                if not webview_id:
                    continue
                if visible:
                    current_page = page_type(
                        inspector, route=route, webviewId=webview_id
                    )
                    self.logger.info("current page: %s" % current_page)
        if (
            not current_page and current_pages
        ):
            inspectors = [inspector_map[webview_id] for webview_id in current_pages]
            hidden, idx = self.driver.await_(
                async_race(
                    *[self._page_hidden(inspector) for inspector in inspectors],
                    expected_result=False,
                    loop=self.driver.loop,
                )
            )
            if hidden is False:
                inspector = inspectors[idx]
                current_page = page_type(
                    inspector, route=route, webviewId=webview_id
                )
                self.logger.info("current page: %s" % current_page)
        if not current_page:  # 没有任何webview页面是visible, 可能是h5页面, 也可能当前页面是skyline
            self.logger.warning("no visible webview page")
        return current_page, current_pages

    def _init_webview(
        self, webview_pages: List["safaripage.SafariWebViewPage"]
    ) -> "IWI.WebviewInspector":
        """初始化webview页面

        :param List[safaripage.SafariWebViewPage] webview_pages: webview页面列表
        :return IWI.WebviewInspector: 当前webview页面的inspector
        """
        st = time.time()
        current_wv_page = None  # 当前webview渲染的页面
        if self._enable_webview:
            _webview_pages = []
            for page in webview_pages:
                if page.appid != self.appid and page.appid != "preload":  # preload竟然也能用
                    continue
                _webview_pages.append(page)
            current_wv_page, current_pages = self.driver.await_(self._check_visible_page(_webview_pages, self._check_webview, WebviewPage, self.pages))
            """
            current_pages = set()  # 用于更新self.pages
            check_webview_threads: List[asyncio.Future] = []
            for page in webview_pages:
                # getCurrentPages().pop().__wxWebviewId__ 对应 window.__webviewId__
                # __wxConfig__.accountInfo.appId 为appid, 插件页面中该信息也为宿主appid
                if page.appid != self.appid and page.appid != "preload":  # preload竟然也能用
                    continue
                t = None
                if not self.uid2wid.get(page.unique_id):  # 未检查过, 丢到线程中并行检查
                    try:
                        inspector = self.inspector_session(page)
                    except Exception as e:
                        self.logger.exception(f"inspect {page} fail")
                        continue
                    if inspector is None:
                        self.logger.warning(f"inspect {page} fail")
                        continue
                    future = self.driver.ensure_future(
                        self._check_webview(page, inspector, current_pages)
                    )
                    check_webview_threads.append(future)
                else:
                    webview_id = self.uid2wid[page.unique_id]
                    current_pages.add(webview_id)
                    inspector = self.pages[webview_id]
                    inspector.page = page  # 刷新title
                    route = None
            if check_webview_threads:  # 有新页面
                results = self.driver.await_(
                    asyncio.gather(*check_webview_threads)
                )  # 等待并行链接的情况
                for webview_id, route, inspector, visible in results:
                    if not webview_id:
                        continue
                    if visible:
                        self._current_page = WebviewPage(
                            inspector, route=route, webviewId=webview_id
                        )
                        current_wv_page = self._current_page
                        self.logger.info("current page: %s" % self._current_page)
            if (
                not current_wv_page and current_pages
            ):  # 没有任何webview页面是visible, 可能是h5页面, 也可能当前页面是skyline
                inspectors = [self.pages[webview_id] for webview_id in current_pages]
                hidden, idx = self.driver.await_(
                    async_race(
                        *[inspector._hidden() for inspector in inspectors],
                        expected_result=False,
                        loop=self.driver.loop,
                    )
                )
                if hidden is False:
                    inspector = inspectors[idx]
                    self._current_page = WebviewPage(
                        inspector, route=route, webviewId=webview_id
                    )
                    current_wv_page = self._current_page
                    self.logger.info("current page: %s" % self._current_page)
            if not current_wv_page:  # 没有任何webview页面是visible, 可能是h5页面, 也可能当前页面是skyline
                self.logger.warning("no visible webview page")
            """
            if current_wv_page:
                self._current_page = current_wv_page
            # 清理旧页面
            for old_wv_id in list(self.pages.keys()):
                if old_wv_id not in current_pages:  # 页面可能销毁了
                    inspector = self.pages.pop(old_wv_id)
                    self.logger.debug(f"{str(inspector.page)} maybe has destroyed")
                    if inspector.page.unique_id in self.uid2wid:
                        self.uid2wid.pop(inspector.page.unique_id)
                    inspector.close()
                    if old_wv_id in self.h5_pages:
                        inspector = self.h5_pages.pop(old_wv_id)
                        self.logger.debug(f"{str(inspector.page)} maybe has destroyed")
                        if inspector.page.unique_id in self.uid2wid:
                            self.uid2wid.pop(inspector.page.unique_id)
                        inspector.close()
            self.__mark(f"check {len(webview_pages)} webview page", st)
        else:
            self.logger.info("不进行webview页面检测")
        return current_wv_page

    async def _check_h5(
        self, page: "safaripage.SafariNormalPage", inspector: H5Inspector
    ):
        self.logger.info(f"checking {page}")
        webview_id, route = await self._get_fake_webview_id(inspector, page)
        if not webview_id:
            return None, None, None, False
        self.h5_pages[webview_id] = inspector
        self.uid2wid[page.unique_id] = webview_id
        hidden = await inspector._hidden()
        return webview_id, route, inspector, not hidden

    def _init_h5(
        self,
        normal_pages: List["safaripage.SafariNormalPage"],
        current_wv_page: "safaripage.SafariWebViewPage",
    ):
        """初始化h5页面

        :param List[safaripage.SafariNormalPage] normal_pages: 页面实例
        :param safaripage.SafariWebViewPage current_wv_page: 当前webview页面, 但ios上如果没有appservice应该检测不出来当前是哪个
        """
        if self._enable_h5 and normal_pages:
            st = time.time()
            if self.appservice:
                # TODO
                pass
            else:
                if current_wv_page:
                    # 没有appservice情况下, webview page的visible状态不明
                    return None
                check_webview_threads: List[asyncio.Future] = []
                for page in normal_pages:
                    pass

    def _init(self):
        """
        初始化:
        1. 扫描所有的可以debug的页面
        2. 过滤出符合当前appid的页面
        """
        stime = time.time()
        _appservice_pages, _webview_pages, _normal_pages = self._get_pages()
        # 初始化 appservice
        self.logger.info("🚀🚀🚀🚀 service 🚀🚀🚀🚀")
        self.logger.info("\n".join([str(_) for _ in _webview_pages]))
        appservice_pages = IWI.WxaInspector.check_service_page(_appservice_pages, self.appid)
        self._init_appservice(appservice_pages)
        self.logger.debug(self.appservice)

        # 检测小程序webview渲染的页面
        self.logger.info("🚀🚀🚀🚀 webview 🚀🚀🚀🚀")
        self.logger.info("\n".join([str(_) for _ in _webview_pages]))
        self.logger.info("🚀🚀🚀🚀 normal 🚀🚀🚀🚀")
        self.logger.info("\n".join([str(_) for _ in _normal_pages]))
        current_wv_page = self._init_webview(_webview_pages)
        # 检测h5页面
        self._init_h5(
            _normal_pages,
            current_wv_page,
        )

        self.__mark("init total", stime)

    def _refresh(self):
        stime = time.time()
        _appservice_pages, _webview_pages, _normal_pages = self._get_pages()
        # 检测小程序webview渲染的页面
        self.logger.info("🚀🚀🚀🚀 webview 🚀🚀🚀🚀")
        self.logger.info("\n".join([str(_) for _ in _webview_pages]))
        self.logger.info("🚀🚀🚀🚀 normal 🚀🚀🚀🚀")
        self.logger.info("\n".join([str(_) for _ in _normal_pages]))
        current_wv_page = self._init_webview(_webview_pages)
        # 检测h5页面
        self._init_h5(
            _normal_pages,
            current_wv_page,
        )
        self.__mark("refresh total", stime)

    def init(self, timeout=10):
        if self.inited is None:
            self.inited = False
            threading.Thread(target=IOSMiniProgram.listen_app, args=(self, ), daemon=True).start()
            # IOSMiniProgram.listen_app(self)
        if not self.inited:
            self.ee.remove_listener("app_ready", self._init)
            self.ee.on("app_ready", self._init)
            if self.wait_init(timeout=timeout):
                self._init()
        else:
            self._init()
        return self.inited
        # if not self.driver.wait_for_app(20):
        #     self.logger.warning("app没加载好")

    def wait_init(self, timeout=10):
        if self.inited:
            return True
        s = threading.Semaphore(0)
        self.ee.once("app_ready", s.release)
        return s.acquire(timeout=timeout)

    # mp driver 方法
    @property
    def current_page(self):
        if self.appservice:
            current_page = self.appservice.current_page

    # driver 方法
    def _get_pages(
        self,
    ) -> Tuple[
        List["safaripage.SafariAppServicePage"],
        List["safaripage.SafariWebViewPage"],
        List["safaripage.SafariNormalPage"],
    ]:
        pages = self.driver.get_pages()
        appservice_pages = []
        webview_pages = []
        other_pages = []
        for p in pages:
            inst = safaripage.SafariNormalPage(p)
            if inst:
                if isinstance(inst, safaripage.SafariAppServicePage):
                    appservice_pages.append(inst)
                elif isinstance(inst, safaripage.SafariWebViewPage):
                    webview_pages.append(inst)
                else:
                    other_pages.append(inst)
        return appservice_pages, webview_pages, other_pages

    def get_pages(
        self,
    ) -> List[
        "safaripage.SafariNormalPage"
        or "safaripage.SafariAppServicePage"
        or "safaripage.SafariWebViewPage"
    ]:
        appservice_pages, webview_pages, normal_pages = self._get_pages()
        return appservice_pages + webview_pages + normal_pages

    async def _inspector_session(
        self, page: "safaripage.SafariNormalPage"
    ) -> Union[
        "IWI.WxaInspector",
        "IWI.WebviewInspector",
        "IWI.H5Inspector",
        "IWI.IOSInspectorSession",
    ]:
        session_id = str(uuid.uuid4()).upper()
        session = iosdriver.WIPSession(self.driver.connection, session_id, page.page)
        if isinstance(page, safaripage.SafariAppServicePage):
            return await IWI.WxaInspector.create(session, page, timeout=10)
        elif isinstance(page, safaripage.SafariWebViewPage):
            return await IWI.WebviewInspector.create(session, page, timeout=10)
        elif isinstance(page, safaripage.SafariNormalPage):
            return await IWI.H5Inspector.create(session, page)
        return await IWI.IOSInspectorSession.create(session)

    def inspector_session(
        self, page: "safaripage.SafariNormalPage"
    ) -> Union[
        "IWI.WxaInspector",
        "IWI.WebviewInspector",
        "IWI.H5Inspector",
        "IWI.IOSInspectorSession",
    ]:
        return self.driver.await_(self._inspector_session(page), loop=self.driver.connection.loop)


if __name__ == "__main__":
    from ..protocol.protocoltypes import *
    import sys
    import asyncio

    print(sys.version_info)

    appid = "wx3eb9cfc5787d5458"
    # readme
    # mini: AndroidMiniProgram = MiniProgram(
    #     appid, AndroidMP(logger_level=10, skyline=True)
    # )
    # print(mini.current_page)
    # print(mini.current_page)
    # mini: AndroidMiniProgram = MiniProgram(
    #     appid, AndroidMP(logger_level=10, skyline=False)
    # )
    # print(mini.current_page)
    # android
    # mini: AndroidMiniProgram = MiniProgram(appid, AndroidMP(logger_level=10, skyline=False))
    # wv_page = None
    # h5_page = None
    # pages = mini.get_pages()
    # for page in pages:
    #     if isinstance(page, ChromeWebViewPage) and page.visible:
    #         wv_page = page
    #     elif not isinstance(page, (ChromeWebViewPage, ChromeAppServicePage)) and isinstance(page, NormalPage) and not page.empty:
    #         h5_page = page
    # if wv_page is None and h5_page is None:
    #     raise RuntimeError("没有符合条件的页面")
    # if wv_page:
    #     inspector = mini.inspector_session(wv_page)
    #     logger.warning("webview:: %s" % inspector.send_command(Runtime.evaluate(expression="""__wxConfig""", returnByValue=True)))
    #     inspector.close()
    # if h5_page:
    #     inspector = mini.inspector_session(h5_page)
    #     logger.warning("h5: %s" % inspector.send_command(Runtime.evaluate(expression="""document.title""", returnByValue=True)))
    #     inspector.close()

    # print(mini.current_page)
    # logger.info(mini.current_page.evaluate("""__wxConfig__?.accountInfo?.appId"""))

    # ios
    mini: IOSMiniProgram = MiniProgram(
        appid,
        IOSMP(
            {"bundle": "com.tencent.qy.xin", "connect_timeout": 5, "logger_level": 10, "init_page_info": True, "cmd_timeout": 3}
        ),
    )
    # IOSMiniProgram.listen_app(mini)
    # mini.wait_init(10)
    if not mini.init(1):
        if not mini.wait_init(10):
            exit(-1)
    # exit(0)
    time.sleep(3)
    a, w, n = mini._get_pages()

    print("🚀🚀🚀🚀 appservice 🚀🚀🚀🚀")
    print("\n".join([str(_) for _ in a]))
    print("🚀🚀🚀🚀 webview 🚀🚀🚀🚀")
    print("\n".join([str(_) for _ in w]))
    inspector1: IWI.WxaInspector = None
    for i in range(len(a)-1, -1, -1):
        inspector1 = mini.inspector_session(a[i])
        if inspector1 is not None:
            break
    try:
        print(inspector1)
        inspector1.await_(inspector1._send_command(
            "Runtime.evaluate", {
                "expression": """(window.__wxConfig||window.__wxConfig__).accountInfo""", 
                "returnByValue": True
            }, max_timeout=3
        ))
        logger.info("🚀🚀🚀🚀 %s", inspector1.evaluate(
            """__wxConfig.accountInfo""", returnByValue=True
        ))
    except:
        logger.exception("")
    
    inspector2: IWI.WebviewInspector = None
    for i in range(len(w)):
        inspector2 = mini.inspector_session(w[i])
        if inspector2 is not None:
            break
    logger.info("🚀🚀🚀🚀 %s", inspector2.evaluate(
        """(window.__wxConfig||window.__wxConfig__).accountInfo""", returnByValue=True, timeout=3
    ))


    # mini.init()
    # print(f"current page {mini._current_page}")

    # mini._refresh()
    # print(f"current page {mini._current_page}")
    # pages= mini.get_pages()
    # for p in pages:
    #     print(p)
    # inspector2.await_(asyncio.sleep(3))
    mini.driver.connection.destroy()
    mini.close()
