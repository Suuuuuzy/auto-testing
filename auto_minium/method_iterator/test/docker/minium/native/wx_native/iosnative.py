#!/usr/bin/env python3
# Created by xiazeng on 2019-05-22
import json
import logging
import threading
import platform
import typing
from types import FunctionType
from typing import Tuple, Union, List
from .basenative import BaseNative, NativeModal, ModalStatus, NodeType, _SourceTree, etree
from ...externlib.wx_wda import *
import wda
from .wording import WORDING, Language
from ...utils import Object, lazy_import, cost_debug, check_package, do_shell, wait, Version, WaitThread
import re
from enum import Enum

canUseTidevice = {}
if typing.TYPE_CHECKING:
    import tidevice
else:
    tidevice = lazy_import("tidevice")
    if tidevice is None:
        logger.warning('进行IOS测试可能还需要安装额外依赖库, 请使用以下指令安装: `pip3 install "minium[ios]"`')
OTHER_PACKAGE = "com.others.app"
WECHAT_PACKAGE = "com.tencent.xin"
WECHAT_ACTIVITY = "MainFrameViewController"
MINIPROGRAM_ACTIVITY = "WAWebViewController"
OTHER_ACTIVITY = "OtherActivity"
WEBVIEW_ACTIVITY = "WAHTMLWebViewController"
PHOTO_PREVIEW_ACTIVITY = "PhotoViewController"


logger = logging.getLogger("minium")
if "Windows" in platform.platform():
    isWindows = True
else:
    isWindows = False

class WDANode(dict, NodeType):
    isEnabled = False
    isVisible = False
    isAccessible = False
    frame = ""
    rect = {}
    value = None
    label = ""
    type = ""
    name = ""
    rawIdentifier = None
    rid = ""  # 8.0.43新加
    children = []

    def __init__(self, __map=None, **kwargs):
        if __map:
            kwargs.update(__map)
        extend = {}
        for k, v in kwargs.items():
            if hasattr(dict, k):  # dict本来的属性不可覆盖
                extend[k] = v
                continue
            # super(WDAView, self).__setattr__(k, v)
            setattr(self, k, v)
        super(WDANode, self).__init__(self.__dict__, **extend)
        if self.children:
            for i in range(len(self.children)):
                self.children[i] = WDANode(self.children[i])
        self.center_x = self.rect['x'] + int(self.rect['width'] / 2)
        self.center_y = self.rect['y'] + int(self.rect['height'] / 2)
        self._xml = None

    def __getattr__(self, __k):
        try:
            return self[__k]
        except KeyError:
            return None

    def __setattr__(self, __k, __v):
        if hasattr(self.__class__, __k):
            if __k.startswith("is") and not isinstance(__v, bool):
                __v = True if __v == "1" else False
            super(WDANode, self).__setattr__(__k, __v)
        self[__k] = __v
        # 有属性改变
        super(WDANode, self).__setattr__("_xml", None)

    @property
    def simple_text(self):
        ls = []
        if self.value:
            ls.append("@value = %s" % self.value)
        if self.label:
            ls.append("@label = %s" % self.label)
        if self.name:
            ls.append("@name = %s" % self.name)
        ls.append(f"rect = {self.rect}")
        return f"{self.type}({', '.join(ls)})"
    
    @property
    def xml(self):
        if self._xml:
            return self._xml
        n = "\n"
        return f"""<{self.type} 
  enabled="{"true" if self.isEnabled else "false"}"
  visible="{"true" if self.isVisible else "false"}"
  accessible="{"true" if self.isAccessible else "false"}"
  label="{self.label or ""}"
  value="{self.value or ""}"
  name="{self.name or ""}"
  x="{self.rect["x"]}"
  y="{self.rect["y"]}"
  width="{self.rect["width"]}"
  height="{self.rect["height"]}"
>{n.join([c.xml for c in self.children])}</{self.type}>"""

    def __str__(self):
        return self.simple_text
    
    def get_children(self):
        return self.children or []

    @classmethod
    def parse(cls, el: etree._Element):
        """trans etree element to wdanode

        :param etree._Element el: _description_
        """
        rect = {
            "y" : int(el.get("y")),
            "x" : int(el.get("x")),
            "width" : int(el.get("width")),
            "height" : int(el.get("height")),
        }
        return cls(
            isEnabled = "1" if el.get("enabled") == 'true' else "0",
            isVisible = "1" if el.get("visible") == 'true' else "0",
            isAccessible = "1" if el.get("accessible") == 'true' else "0",
            frame = "{{%d, %d}, {%d, %d}}" % (rect["x"], rect["y"], rect["width"], rect["height"]),
            rect = rect,
            value = el.get("value", None),
            label = el.get("label", ""),
            type = el.get("type") or el.tag or "",
            name = el.get("name", ""),
            rawIdentifier = None,
        )

# def extend_node(source: WDANode):
#     # 递归展开
#     nodes = [source]
#     if not source.children:
#         return nodes
#     for node in source.get_children():
#         nodes.extend(extend_node(node))
#     return nodes
#     i = 0
#     while i < len(nodes):
#         node = nodes[i]
#         i += 1
#         if not node.children:
#             continue
#         nodes.extend(node.get_children())
#     return nodes

def remove_invisible_child(source_data: WDANode, new_node=True):
    children_data = source_data.get('children', [])
    new_children = []
    if children_data:
        for child in children_data:
            new_child_data = remove_invisible_child(child, new_node)
            if new_child_data:
                new_children.append(new_child_data)

    if not source_data.isVisible and not new_children and not (source_data.type == "StaticText" and source_data.name):
        # 过滤 不可见同时又没有子节点的节点. 有文字的StaticText除外
        # logger.warning(f"remove {source_data}")
        return None

    if new_node:
        new_data = WDANode(source_data)  # copy, 防止把children改变, 影响source tree
        new_data.children = new_children
    else:
        new_data = source_data
        new_data.children = new_children
    return new_data

class Selector(Object):
    """记录元素选择条件"""
    class_name = None
    text = None
    partial_text = None
    pattern = None
    xpath = None
    def __init__(self, *, class_name=None, text=None, partial_text=None, pattern=None, xpath=None) -> None:
        """选择条件

        :param str class_name: node.type, defaults to None
        :param str text: node.name == text, defaults to None
        :param str partial_text: node.name contains partial_text, defaults to None
        :param reg_str pattern: node.name match reg_str, defaults to None
        :param str xpath: search by xpath, defaults to None
        """
        
        super(Selector, self).__init__(filter(lambda x: x[1], (
            ("class_name", class_name),
            ("text", text),
            ("partial_text", partial_text),
            ("pattern", pattern),
            ("xpath", xpath),
        )))

    def match_ui_node(self, node: WDANode):
        """当前node是否符合当前selector"""
        if self.class_name and self.class_name != node.type:
            return False
        text = node.name or node.label or ""
        if self.text and (self.text != text):
            return False
        if self.partial_text and text.find(self.partial_text) < 0:
            return False
        if self.pattern and not re.search(self.pattern, text):
            return False
        return True

class SourceTree(_SourceTree[WDANode]):
    node_type = WDANode
    def __init__(self, source: Union[str, WDANode]) -> None:
        super().__init__(source)
        self._window: typing.List[WDANode] = None

    @property
    def window(self) -> typing.List[WDANode]:
        """把window过滤出来

        :return typing.List[WDANode]: window nodes
        """
        if not self._window:
            self._window = list(filter(lambda x: x.type == "Window", self.nodes))
        return self._window
    
    # def __init__(self, source: Union[str, WDANode]) -> None:
    #     """实例化源代码树

    #     :param str or WDANode source: xml str or WDANode
    #     """
    #     self._source = source
    #     self._tree: etree._Element = None
    #     self._nodes: typing.List[WDANode] = None
    #     self._window: typing.List[WDANode] = None

    # @property
    # def tree(self):
    #     if self._tree is None:
    #         if isinstance(self._source, WDANode):
    #             self._tree = etree.XML(self._source.xml.encode("utf8"), etree.XMLParser())
    #         else:
    #             self._tree = etree.XML(self._source.encode("utf8"), etree.XMLParser())
    #     return self._tree

    # @property
    # def nodes(self):
    #     if self._nodes is None:
    #         if isinstance(self._source, WDANode):
    #             self._nodes = extend_node(self._source)
    #         else:
    #             self._nodes = trans_tree_to_nodes(self.tree)
    #     return self._nodes
    
    # @property
    # def window(self) -> typing.List[WDANode]:
    #     """把window过滤出来

    #     :return typing.List[WDANode]: window nodes
    #     """
    #     if not self._window:
    #         self._window = list(filter(lambda x: x.type == "Window", self.nodes))
    #     return self._window

    # def xpath(self, xp: str) -> typing.List[WDANode]:
    #     els = self.tree.xpath(xp)
    #     if not els:
    #         return []
    #     return [WDANode.parse(el) for el in els]
    
def can_use_tidevice(udid):
    if udid in canUseTidevice:
        return canUseTidevice[udid]
    if tidevice is None:
        canUseTidevice[udid] = False
        return False
    device = DeviceTool(udid)
    os_version = Version(device.os_version)
    if os_version >= "17.0":  # 还是检查一下
        t = tidevice.Device(udid)
        try:
            t.mount_developer_image()
            canUseTidevice[udid] = True
            return True
        except:
            canUseTidevice[udid] = False
            return False
    canUseTidevice[udid] = True
    return True
    

class StateMode(Enum):
    INITIALIZED = 0
    STATE = 1  # /wda/apps/state
    STATUS = 2  # /status

def ping_driver(address, port=None, timeout=10, state_mode=StateMode.STATUS, return_json=False):
    """ping driver状态，如果超时则返回False"""
    if state_mode is StateMode.STATE:
        url = f"{address}/wda/apps/state"
    elif state_mode is StateMode.STATUS:
        url = f"{address}/status"
    else:
        raise RuntimeError("not supported mode.")
    if port:
        url = re.sub(r":\d+", f":{port}", url)
    try:
        if state_mode is StateMode.STATUS:
            res = requests.get(url, timeout=timeout)
        else:
            res = requests.post(url, json.dumps({
                "bundleId": ""
            }))
        logger.info("ping WebDriver [%s]: %s, %s", url, res.status_code, res.text)
        if not res.text:
            return False
        if return_json:
            return res.json()
        return res.status_code == requests.codes.ok
    except Exception as e:
        logger.warning(f"获取driver状态失败: {str(e)}")
    return False


def restart_driver(wda_ip, wda_port, udid, wda_bundle=None) -> bool:
    # 使用 tidevice 重启 driver
    if not can_use_tidevice(udid):
        logger.warning(f"不支持tidevice方式重启wda")
        return False
    device = TIDevice(udid, wda_bundle, wda_port, ip=wda_ip)
    if not device.wda_bundle:
        logger.warning(f"未找到设备上安装的 wda")
        return False
    logger.info(f"找到可能的 wda app: {device.wda_bundle}")
    logger.info("starting wda...")
    device.start_driver()
    if not check_relay_port(udid, wda_port, device.remote_port):
        device.listen_port(wda_port)
    if ping_driver(f"http://{wda_ip}:{wda_port}", timeout=10):
        return True
    return False



class WXIOSNative(BaseNative):
    _require_conf_ = [
        # ("wda_project_path", "wda_bundle")
    ]
    stateMode = StateMode.INITIALIZED  # 0: init; 1: /wda/apps/state; 2: /status

    def __init__(self, json_conf: dict):
        if json_conf is None:
            json_conf = {}
        super(WXIOSNative, self).__init__(json_conf)
        device_info = json_conf.get("device_info", {})
        # 目标设备, 目标app
        device = DeviceTool(device_info.get("udid"))
        self.udid = device.udid
        self.bundle_id = device_info.get("bundle_id") or WECHAT_PACKAGE
        # 使用xcode + wda project需要以下信息
        self.wda_project_path = json_conf.get("wda_project_path")
        self.wda_runner = None
        # 使用tidevice
        self.wda_bundle = json_conf.get("wda_bundle", None)
        # 已经通过xcode启动好wda
        self.wda_port = json_conf.get("wda_port") or device_info.get("wda_port")
        self.wda_ip = json_conf.get("wda_ip") or device_info.get("wda_ip")
        # 目标app实例
        self.app = None
        # 当前页面源代码树
        self._full_tree = None
        self._source_tree = None
        # 获取性能的实例
        self.perf_flag = False
        self.perf = None
        self.last_cpu = 0
        self.last_fps = 0
        self.last_mem = 0
        # 健康弹窗处理
        self.health_modal_handle_thread = None
        self.stop_check = True
        self.check_done = True
        # screen_shot
        self.outputs_screen = os.path.join(
            json_conf.get("outputs") or os.path.dirname(os.path.realpath(__file__)),
            "image",
        )
        self._empty_base_screen_dir(self.outputs_screen)
        self.client_version = None
        self._app_brand_action_bar_bottom = None
        # 分享小程序相关
        self._forward_wording = None
        self._new_chat_wording = None
        # 弹窗的层级有不同
        # 同一个层级的弹窗, 倒序检测
        allow_btn = Selector(class_name="Button", text="允许")
        reject_btn = Selector(class_name="Button", text="拒绝")
        confirm_btn = Selector(class_name="Button", text="确定")
        cancel_btn = Selector(class_name="Button", text="取消")
        self._not_normal_type = (
            NativeModal.PRIVACY,
            NativeModal.PHONE,
            NativeModal.SUBSCRIBE,
            NativeModal.OPENWERUN,
            NativeModal.NOBINDPHONE,
        )  # 不是 【允许】/【拒绝】的授权窗口
        self._can_repeat_type = (
            NativeModal.NOBINDPHONE,
        )  # 有可能重复弹出的授权窗口
        self.modals_map: Tuple[Tuple[Tuple[Tuple[Selector], NativeModal, FunctionType or None ]]] = (
            (  # level 1
                (
                    (
                        Selector(text="用户隐私保护提示"),
                        Selector(text="同意"),
                    ),
                    NativeModal.PRIVACY,
                    lambda answer: Selector(text="同意" if answer else "拒绝"),
                ),
            ),
            (  # level 1
                (
                    (
                        Selector(text="发送给"),
                        Selector(class_name="Button", text="发送"),
                    ),
                    NativeModal.SHARE,
                    lambda answer: Selector(class_name="Button", text="发送" if answer else "取消"),
                ),
            ),
            (  # level 1
                (
                    (
                        Selector(pattern=WORDING.COMMON.GET_PHONE_NUMBER_REG.value),
                        Selector(text="添加手机号"),
                    ),
                    NativeModal.NOBINDPHONE,
                    lambda answer: Selector(text="取消"),
                ),
                (
                    (Selector(pattern=WORDING.COMMON.GET_PHONE_NUMBER_REG.value),),
                    NativeModal.PHONE,
                    lambda answer: Selector(text="微信绑定号码") if answer else Selector(text="不允许"),
                ),
            ),
            (
                (
                    (Selector(class_name="NavigationBar", text="开启微信运动"),),
                    NativeModal.OPENWERUN,
                    None,
                ),
            ),
            (((Selector(text="获取你的位置信息"),), NativeModal.LOCATION, lambda answer: allow_btn if answer else reject_btn),),  # level 2
            (  # level 3
                ((Selector(pattern="\w*发送\w*消息\w*"),), NativeModal.SUBSCRIBE, lambda answer: allow_btn if answer else reject_btn,),
                ((Selector(text="使用你的麦克风"),), NativeModal.RECORD, lambda answer: allow_btn if answer else reject_btn,),
                ((Selector(text="使用你的摄像头"),), NativeModal.CAMERA, lambda answer: allow_btn if answer else reject_btn,),
                ((Selector(text="保存图片或视频到你的相册"),), NativeModal.PHOTO, lambda answer: allow_btn if answer else reject_btn,),
                ((Selector(partial_text = "获取你的昵称"),), NativeModal.USERINFO, lambda answer: allow_btn if answer else reject_btn,),
                ((Selector(text="获取你的微信运动步数"),), NativeModal.WERUN, lambda answer: allow_btn if answer else reject_btn,),
                ((Selector(text="使用你的蓝牙"),), NativeModal.BLUETOOTH, lambda answer: allow_btn if answer else reject_btn,),
            ),
        )
        self._last_modal_type = None

        # 检查 wda 状态
        wda_ip = self.wda_ip or WDA_DEFAULT_IP
        wda_port = self.wda_port or pick_unuse_port()
        if not check_iproxy_port(self.udid, wda_port, WDA_REMOTE_PORT):
            listen_iproxy_port(self.udid, wda_port, WDA_REMOTE_PORT, wda_ip)
        if ping_driver(f"http://{wda_ip}:{wda_port}", timeout=10):
            self.wda_ip = wda_ip
            self.wda_port = wda_port
        elif not self.wda_project_path or isWindows:  # 没有 ping 通, 且没法使用 xcode 启动
            if restart_driver(wda_ip, wda_port, self.udid, wda_bundle=self.wda_bundle):
                self.wda_ip = wda_ip
                self.wda_port = wda_port
            else:
                logger.warning(f"尝试启动 wda 失败")

    ###############################
    #                    interface                        #
    ###############################
    def start_wechat(self, new_session=True):
        """
        启动微信
        :return:
        """
        wda_ip = self.wda_ip or WDA_DEFAULT_IP
        if self.wda_project_path and not isWindows:
            self.wda_runner = WebDriverRunner(self.udid, self.wda_project_path, port=self.wda_port, ip=wda_ip)
        elif (self.wda_ip or self.wda_port) and not (self.wda_bundle and can_use_tidevice(self.udid)):
            # 配置了ip/port & 不能使用 tidevice启动wda_bundle
            self.wda_runner = WebDriverRunner(self.udid, self.wda_project_path, port=self.wda_port, ip=wda_ip)
        else:
            if not can_use_tidevice(self.udid):
                raise RuntimeError(f"tidevice 暂不支持此系统版本: {DeviceTool(self.udid).os_version}, 启动 wda 失败, 请使用 xcode 启动")
            self.wda_runner = TIDevice(self.udid, self.wda_bundle)
        if not ping_driver(f"http://{wda_ip}:{self.wda_runner.port}", timeout=10):
            self.restart_driver()
        if not self.wda_runner.find_app(self.bundle_id):
            logger.warning(f"app {self.bundle_id} may not installed")
        for i in range(3):
            try:
                logger.info("第 %d 次启动微信, 共3次机会" % (i + 1))
                self.app = WdaUI(
                    server_url="http://%s:%s" % (self.wda_ip or "localhost", self.wda_runner.port),
                    bundle_id=self.bundle_id if new_session else None,
                )
                self.app.session.set_alert_callback(self._alert_callback) if callable(
                    self._alert_callback
                ) else logger.error("Alert callback would not callable")
                logger.info("微信启动成功")
                # 重启多次可能会进入安全模式
                if self.app.session(
                    class_name="NavigationBar", partial_text="安全模式"
                ).wait_exists(timeout=5.0):
                    while self.app.session(
                        class_name="Button", partial_text="下一步"
                    ).click_if_exists(timeout=3.0):
                        time.sleep(1)
                    self.app.session(partial_text="进入微信").click_if_exists(
                        timeout=3.0
                    )
                lan = True
                for text in WORDING.COMMON.LOGIN_WORDS.zh:
                    if not self.app.session(text=text).exists:
                        lan = False
                        break
                if lan is False:
                    lan = True
                    for text in WORDING.COMMON.LOGIN_WORDS.en:
                        if not self.app.session(text=text).exists:
                            lan = False
                            break
                    if lan is True:
                        WORDING.setLanguage(Language.en)
                else:
                    WORDING.setLanguage(Language.zh)
                return
            except Exception as e:
                if i == 2:
                    # e.args += "setup error: 第 %d 次启动微信失败" % (i + 1)
                    raise
                logger.error("setup error: 第 %d 次启动微信失败: %s" % ((i + 1), str(e)))
                if "Connection refused" in str(e):
                    logger.warning(
                        "Connection refused, 端口[%s]不可用，重新选择 iproxy 端口"
                        % self.wda_runner.port
                    )
                    self.wda_runner.remove_iproxy()
                    port = self.wda_runner.pick_unuse_port()
                    self.wda_runner.listen_port(port)
                    continue
                logger.info("正在重启 WebDriverAgent ...")
                self.wda_runner.start_driver()

    def connect_weapp(self, path):
        """
        有push的方式, 理应可以废掉
        """
        raise NotImplementedError("ios不再支持长按识别二维码的方式，请使用推送方式调用")

    def screen_shot(self, filename: str, return_format: str = "raw") -> object:
        """
        截图
        :param filename: 文件存放的路径
        :param return_format: 除了将截图保存在本地之外, 需要返回的图片内容格式: raw(default) or pillow
        :return: raw data or PIL.Image
        """
        try:
            self.app.client.screenshot(png_filename=filename)
            return filename
        except Exception as e:

            logger.warning("screen shot failed, %s" % e)

    def pick_media_file(
        self,
        cap_type="camera",
        media_type="photo",
        original=False,
        duration=5.0,
        names=None,
    ):
        """
        获取媒体文件
        :param cap_type: camera: 拍摄 | album: 从相册获取
        :param names: 传入一个 list 选择多张照片或者视频(照片和视频不能同时选择, 且图片最多 9 张, 视频一次只能选择一个)
        :param media_type: photo 或者 video
        :param duration: 拍摄时长
        :param original: 是否选择原图(仅图片)
        :return:
        """
        if cap_type == "album" and names is None:
            raise Exception("从相册选择照片必须提供照片名称, 可以通过 wda inspector 查看照片名称")
        if cap_type == "camera":
            self._capture_photo(media_type=media_type, duration=duration)
        elif cap_type == "album":
            if media_type == "photo":
                if isinstance(names, str):
                    names = [names]
                self._select_photos_from_album(names=names, original=original)
            elif media_type == "video":
                if isinstance(names, list):
                    names = names[0]
                self._select_video_from_album(name=names)

    def input_text(self, text):
        """
        input 组件填写文字(使用此函数之前必须确保输入框处于输入状态)
        :param text: 内容
        :return:
        """
        self.app.session(class_name="TextField").set_text(text)

    def input_clear(self):
        """
        input 组件清除文字(使用此函数之前必须确保输入框处于输入状态)
        :return:
        """
        self.app.session(class_name="TextField").clear_text()

    def textarea_text(self, text: str, index=0):
        """
        给 textarea 输入文字需要在小程序层提供该 textarea 的 index 信息
        :param text: 内容
        :param index: 多个 textarea 同时存在一个页面从上往下排序, 计数从 1 开始
        :return:
        """
        self.app.session(class_name="TextView")[index].set_text(text)

    def textarea_clear(self, index=0):
        """
        给 textarea 清除文字需要在小程序层提供该 textarea 的 index 信息
        :param index: 多个 textarea 同时存在一个页面从上往下排序, 计数从 1 开始
        :return:
        """
        self.app.session(class_name="TextView")[index].clear_text()

    def allow_authorize(self, answer=True, title=None):
        self.source()
        modal_type, node = self._check_auth_type(answer, 4)
        self._last_modal_type = modal_type  # 记录下即将处理的类型
        logger.info(f"处理 {modal_type.name} 弹窗")
        # if node:  # 快速处理(click指令非常慢, 并不会减少时间, 先注释掉)
        #     if isinstance(node, WDASelector):
        #         return node.click_if_exists(0.5)
        #     else:
        #         return self.click_coordinate(node.center_x, node.center_y)
        ret = self._handle_auth(modal_type, answer)
        if modal_type is NativeModal.PRIVACY and ret is True:  # 如果是【隐私弹窗】并处理成功, 则后面可能会再弹窗另外的授权弹窗
            return self.allow_authorize(answer)
        return ret

    def _allow_authorize(self, answer=True, title=None):
        """
        处理授权确认弹框
        :param answer: True or False
        :return:
        """
        logger.debug("handle Button[%s], title[%s]" % ("允许" if answer else "拒绝", title))
        if title:
            return self.app.session(
                xpath='//*[contains(@label, "{title}")]/../../..//Button[@name="{text}"]'.format(
                    title=title, text="允许" if answer else "拒绝"
                )
            ).click_if_exists(timeout=10.0)
        else:
            return self.app.session(
                xpath='//Button[@label="授权说明"]/../../..//Button[@name="{text}"]'.format(
                    text="允许" if answer else "拒绝"
                )
            ).click_if_exists(timeout=10.0)

    def allow_login(self, answer=True):
        """
        处理微信登陆确认弹框
        :return:
        """
        if answer:
            return self.app.session(class_name="Button", text="允许").click_if_exists(
                timeout=10.0
            )
        else:
            return self.app.session(class_name="Button", text="拒绝").click_if_exists(
                timeout=10.0
            )

    def allow_get_user_info(self, answer=True):
        """
        处理获取用户信息确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer, "获取你的昵称")

    def allow_get_location(self, answer=True):
        """
        处理获取位置信息确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer, "获取你的位置信息")

    def allow_get_we_run_data(self, answer=True):
        """
        处理获取微信运动数据确认弹框
        :param answer: True: 允许 or False: 拒绝
        :return:

        备注：
        - 未启用微信运动时，启用微信运动后就立即授权使用了，无须再次授权允许
        - 开启微信运动后，ios可能会有健康弹窗，出现时间不定
        处理策略：
        1. 未开启微信运动，且授权操作为“否”(answer==False)：不开启微信运动，返回false
        2. 未开启微信运动，且授权操作为“是”(answer==True)：开启微信运动，监测健康弹窗
        3. 已经开启过微信运动：监测健康弹窗，允许微信获取健康数据，再在小程序授权弹窗中再处理对app的授权与否
        4. 如果曾经不允许微信获取健康数据，调用getWeRunData时，会弹modal窗"暂不能获取完整健康数据"，即使从系统拿不到,但数据还是能从后台拿, 如果有授权弹窗，返回{answer}，否则默认True
        5. 无授权弹窗出现，默认同意，返回True
        """
        # 开启微信运动后，直接就默认了授权使用微信运动了
        if self.app.session(class_name="NavigationBar", text="开启微信运动").wait_exists(
            timeout=3.0
        ):
            if not answer:
                self.app.session(text="关闭").click_if_exists(timeout=10)
                return False
            self.app.session(class_name="Button", text="启用该功能").click_if_exists(
                timeout=10
            )
        # 监测 "暂不能获取完整健康数据" 弹窗, 如果存在，则系统层面已经不允许获取健康数据，返回False
        if self.__modal_exists("暂不能获取完整健康数据"):  # 需要用wda的接口才可以，用"私有"函数锁定防止被testsvr实例重写
            logger.error("暂不能获取完整健康数据")
            self.handle_modal("确定", title="暂不能获取完整健康数据")
            # 此时授权弹窗可能已经弹了出来, 即使从系统拿不到,但数据还是能从后台拿
            ret = self._allow_authorize(answer, "获取你的微信运动步数")
            return answer if ret else True
        # 开启之后ios可能会有健康弹窗，出现时间不定
        self.health_page_exists = False
        if not self.health_modal_handle_thread:

            def handle_health_modal():
                # print("handle_health_modal 1 %f" % time.time())
                while self.app.session.alert.exists:
                    self.app.session.alert.accept()
                    time.sleep(1)
                # print("handle_health_modal 2 %f" % time.time())
                if not self.app.search_text("想要访问并更新以下类别中的健康数据"):
                    print("handle_health_modal 3 %f" % time.time())
                    return False
                # print("health_page_exists wait %f" % time.time())
                self.health_page_exists = True
                switch = self.app.session(class_name="Switch", index=-1)
                if not self._wait(lambda: switch.exists, 10):
                    logger.error("Switch not exists")
                    return False
                if str(switch.value) == "0":
                    switch.click(timeout=5)
                accept = self.app.session(class_name="Button", text="允许", index=-1)
                if not self._wait(lambda: accept.exists and accept.enabled, 10):
                    logger.error(
                        "accept button is %s and %s"
                        % (
                            "exists" if accept.exists else "not exists",
                            "enabled" if accept.enabled else "not enabled",
                        )
                    )
                    return False
                if not accept.click_if_exists(timeout=5):
                    logger.error("accept error: button not exists")
                    return False
                time.sleep(2)
                return True

            def check_health():
                if self._wait(
                    lambda: handle_health_modal() or self.stop_check, 3 * 60, 5
                ):  # 没有健康授权之前，点不了
                    self.health_page_exists = False
                    self._allow_authorize(answer, "获取你的微信运动步数")
                # print("finish wait %f" % time.time())
                self.check_done = True
                self.health_modal_handle_thread = None

            self.stop_check = False
            self.check_done = False
            self.health_modal_handle_thread = threading.Thread(target=check_health, name="CheckHealth")
            self.health_modal_handle_thread.setDaemon(True)
            self.health_modal_handle_thread.start()
        if not self._wait(lambda: self.health_page_exists, timeout=10, interval=2):
            # print("health_page_exists wait fail %f" % time.time())
            ret = self._allow_authorize(answer, "获取你的微信运动步数")
            return answer if ret else True
        else:
            # print("start wait %f" % time.time())
            # 出现了健康授权页，就必须得等授权页处理好——系统同意授权，但真正授权由微信授权弹窗确定
            ret = self._wait(lambda: not self.health_page_exists, 3 * 60, 10)
            return answer if ret else True

    def allow_record(self, answer=True):
        """
        处理录音确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer, "使用你的麦克风")

    def allow_write_photos_album(self, answer=True):
        """
        处理保存相册确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer, "保存图片或视频到你的相册")

    def allow_camera(self, answer=True):
        """
        处理使用摄像头确认弹框
        :param answer: True or False
        :return:
        """
        return self._allow_authorize(answer, "使用你的摄像头")

    def allow_get_user_phone(self, answer=True):
        """
        处理获取用户手机号码确认弹框
        :param answer: True or False
        :return:
        """
        if self.app.session(class_name="StaticText", text=WORDING.COMMON.GET_PHONE_NUMBER.value).wait_exists(5):
            if self.app.session(text="添加手机号").exists:
                ret = self.app.session(text="取消", index=-1).click_if_exists(0.5)
                if ret and answer:
                    logger.warning("试图允许获取手机号, 但账号未绑定任何手机号")
                    return False
                return ret
            return self._allow_get_user_phone(answer)
        return False

    def _allow_get_user_phone(self, answer=True):
        # self.allow_authorize(answer, "你的手机号码")
        # 新版本获取手机号使用仿原生半屏弹窗模式
        if self.app.session(class_name="StaticText", text=WORDING.COMMON.GET_PHONE_NUMBER.value).wait_exists(0):
            if not answer:
                return self.app.session(class_name="StaticText", text="不允许").click_if_exists(0.5)
            # return self.app.session(class_name="StaticText", text="微信绑定号码").click_if_exists(0.5)
            if not self.app.session(xpath='//StaticText[contains("微信绑定号码|上次提供", @name)]').click_if_exists(0.5):
                return self._allow_authorize(answer)  # 兼容旧版本
            return True
        return False

    def allow_send_subscribe_message(self, answer=True):
        """
        允许/确定发送订阅消息
        """
        if answer:
            btn_text = "允许|确定"
        else:
            btn_text = "取消"
        btn = self.app.session(
            xpath=(
                '//StaticText[contains(@label, "以下消息")]/../../..//Button[contains("{btn_text}", @label)]'.format(
                    btn_text=btn_text
                )
            )
        )
        if not btn.wait_exists(5.0):
            return False
        if not btn.enabled:  # 需要选择一个通知enable
            self.app.session(
                xpath='//StaticText[contains(@label, "以下消息")]/../../..//Switch'
            ).click_if_exists(2.0)
        btn.tap(1.0)
        return True

    def __modal_exists(self, title):
        """
        指定title的modal是否存在
        """
        if not self.app.session(
            xpath='//Button[.//StaticText[@name="{title}"]]'.format(title=title)
        ).exists:
            # title 和 content同时传入的时候，才能get到这个title的信息, 所以此处只有确定会有title时才做处理
            logger.info(f"没有出现预期弹窗: title[{title}]")
            return False
        return True

    def modal_exists(self, title):
        """
        指定title的modal是否存在
        """
        return self.__modal_exists(title)

    def handle_modal(
        self, btn_text: Union[str, bool, WDASelector] =None, title: str = None, index=-1, force_title=False
    ):
        """
        处理模态弹窗
        :param title: 传入弹窗的 title 可以校验当前弹窗是否为预期弹窗
        :param btn_text: 根据传入的 文字 进行点击
        :param index: 当页面存在完全相同的两个控件时，通过指定 index 来选取
        :return:
        """
        if title and force_title:
            if not self.modal_exists(title):
                return False
        if not btn_text:
            btn_text = "确定"
        logger.info(f"可能出现弹框：{title}, 自动选择【{btn_text}】")
        if isinstance(btn_text, bool):
            btn_text = "确定" if btn_text else "取消"
        if isinstance(btn_text, str):
            return self.app.session(
                xpath='//Button//StaticText[@name="{btn_text}"]'.format(btn_text=btn_text),
                index=index,
            ).click_if_exists(timeout=5.0)
        elif isinstance(btn_text, WDASelector):
            return btn_text.click_if_exists(timeout=5.0)

    def handle_action_sheet(self, item):
        """
        处理上拉菜单
        :param item: 要选择的 item
        :return:
        """
        return self.app.session(class_name="ScrollView").subelems(
            class_name="Button", text=item
        ).click_if_exists(timeout=10.0)

    def forward_miniprogram(
        self, name: Union[str, list], text: str = None, create_new_chat: bool = True
    ):
        """
        通过右上角更多菜单转发小程序
        ps: 好友太多会有性能问题
        :type text: 分享携带的内容
        :param names: 要分享的人
        :param create_new_chat: 是否创建群聊
        :return:
        """
        self.app.session(class_name="Button", text=WORDING.COMMON.MORE.value).click(timeout=10.0)
        time.sleep(1)
        if self._forward_wording is None:  # 不同客户端版本有不同wording
            for word in [ WORDING.IOS.FORWARD_WORD1, WORDING.IOS.FORWARD_WORD2, WORDING.IOS.FORWARD_WORD3 ]:
                if self.app.session(class_name="Button", partial_text=word.value).exists:
                    self._forward_wording = word
                    break
        if self._forward_wording and self.app.session(class_name="Button", partial_text=self._forward_wording.value).exists:
            self.app.session(class_name="Button", partial_text=self._forward_wording.value).click(timeout=10.0)
        else:
            self.app.session(partial_text="关于").click(timeout=10.0)
            self.app.session(partial_text="推荐给朋友").click(timeout=10.0)

        return self.forward_miniprogram_inside(name, text, create_new_chat)

    def forward_miniprogram_inside(
        self, name: Union[str, list], text: str = None, create_new_chat: bool = True
    ):
        """
        小程序内触发转发小程序
        ps: 好友太多会有性能问题
        :param names: 要分享的人
        :param create_new_chat: 是否创建群聊
        :return:
        """
        ret = True
        if self.app.session(
            xpath='//Button[.//StaticText[@name="分享提示"]]'
        ).exists:  # 开发版会弹出分享提示
            self.handle_modal("确定")

        if isinstance(name, str):
            name = [name]
        if len(name) > 1:  # 多于一个人是需要新建群
            create_new_chat = True
        if not create_new_chat and self.app.session(text="暂无最近聊天").exists:
            create_new_chat = True
        if create_new_chat:
            if self._new_chat_wording is None:
                for word in [ WORDING.IOS.CREATE_CHAT1, WORDING.IOS.CREATE_CHAT2 ]:
                    if self.app.session(class_name="StaticText", text=word.value).exists:
                        self._new_chat_wording = word
                        break
                if not self._new_chat_wording:
                    raise RuntimeError("无法创建新聊天")
            self.app.session(class_name="StaticText", text=self._new_chat_wording.value).click(timeout=10.0)
        search_text = WORDING.COMMON.SEARCH.value
        for _name in name:
            el = self.app.session(
                class_name="TextField" if create_new_chat else "SearchField", text=search_text
            )
            if not el.exists and search_text:
                el = self.app.session(class_name="TextField" if create_new_chat else "SearchField")
                if el.exists:
                    search_text = ""
            el.set_text(_name)
            # count = 10
            time.sleep(1.5)  # 一定需要等待搜索出该用户
            elements = self.app.session(class_name="StaticText", partial_text=_name).elements
            for i in range(-1,-1 * (len(elements) + 1),-1):
                self.app.session(
                    class_name="StaticText", partial_text=_name, index=i
                ).click(timeout=10.0)
                if len(self.app.session(class_name="StaticText", partial_text=_name).elements) != len(elements):
                    break
            # count -= 1
        if create_new_chat:
            self.app.session(class_name="Button", partial_text=WORDING.COMMON.DONE.value).click(timeout=10.0)
        if text:
            try:
                self.app.session(class_name="TextView").set_text(text)
            except wda.WDAElementNotFoundError:
                ret = False
            except Exception as e:
                logger.warning("catch wda.WDAElementNotFoundError")
                ret = False
        self.app.session(class_name="Button", text=WORDING.COMMON.SEND.value).click(timeout=10.0)
        return ret

    def send_custom_message(self, message: str = None):
        """
        处理小程序 im 发送自定义消息
        :param message: 消息内容
        :return:
        """
        self.app.session(class_name="TextView").set_text(message + "\n")

    def phone_call(self):
        """
        处理小程序拨打电话
        :return:
        """
        self.app.session(partial_text="呼叫").click(timeout=10.0)
        self.app.session.alert.accept()

    def map_select_location(self, name: str = None):
        """
        原生地图组件选择位置
        :param name: 位置名称
        :return:
        """
        self.source()
        if self._search_el_from_source(sel=Selector(partial_text="微信不能确定你的位置")):
            self.handle_modal("取消")
        if not name:
            btn = self.app.session(class_name="Button", text="确定")
            if btn.exists and btn.enabled:
                return btn.click(timeout=10.0)
            else:
                return self.map_back_to_mp()
        self.app.session(class_name="SearchField", text="搜索地点").set_text(name)
        timeout = time.time() + 10
        while (
            timeout > time.time() 
            and self.app.session(text=name, class_name="StaticText").click_if_exists(
                timeout=5.0
            )
        ):
            btn = self.app.session(class_name="Button", text="确定")
            if btn.exists and btn.enabled:
                return self.app.session(class_name="Button", text="确定").click(
                    timeout=10.0
                )
        # 没有命中就选第一个
        timeout = time.time() + 10
        while (
            timeout > time.time()
            and self.app.session(xpath="//Table/Cell[1]").click_if_exists(timeout=5.0)
        ):
            btn = self.app.session(class_name="Button", text="确定")
            if btn.exists and btn.enabled:
                return self.app.session(class_name="Button", text="确定").click(
                    timeout=10.0
                )

    def map_back_to_mp(self):
        """
        原生地图组件查看定位,返回小程序
        :return:
        """
        self.source()
        if self._search_el_from_source(sel=Selector(partial_text="微信不能确定你的位置")):
            self.handle_modal("取消")
        return self.app.session(class_name="Button", text="取消").click_if_exists(
            timeout=10.0
        )

    def deactivate(self, duration):
        """
        使微信进入后台一段时间, 再切回前台
        :param duration: float
        :return: None
        """
        self.app.deactivate(duration=duration)

    def click_coordinate(self, x, y):
        """
        点击坐标(x,y)
        :param x:
        :param y:
        :return:
        """
        self.app.session.click(x, y)

    def get_pay_value(self):
        """
        获取支付金额, IOS隐私设置不允许获取
        """
        raise NotImplementedError("iOS private value")

    def input_pay_password(self):
        """
        输入支付密码, IOS隐私设置不允许自动化输入
        """
        raise NotImplementedError()

    def close_payment_dialog(self):
        """
        关闭支付弹窗
        """
        return self.app.session(text="closeModalBtn").click_if_exists(timeout=5.0)

    def hide_keyboard(self):
        """
        点击完成键，隐藏键盘
        :return:
        """
        self.app.session(class_name="Button", text="Done").click_if_exists(timeout=5.0)

    def select_wechat_avatar(self):
        """
        选择微信头像
        """
        self.app.session(text="用微信头像").click_if_exists(timeout=5.0)

    def text_exists(self, text="", iscontain=False, wait_seconds=5):
        """
        检测是否存在text
        """
        if iscontain:
            # partial_text参数可能不生效
            # return self.app.session(partial_text=text).exists
            return self.app.session(xpath=f'//StaticText[contains(@label, "{text}")]').exists
        else:
            return self.app.session(text=text).exists

    def text_click(self, text="", iscontain=False):
        """
        点击内容为text的控件
        """
        if iscontain:
            return self.app.session(partial_text=text).click_if_exists(timeout=10.0)
        else:
            return self.app.session(text=text).click_if_exists(timeout=10.0)

    def is_app_in_foreground(self, appid):
        # exists window contains appid
        return self.app.session(class_name="Window", partial_text=appid).exists

    # back_to_miniprogram needed

    def _get_current_activity(self) -> str:
        """
        :return: PACKAGE/ACTIVITY
        """
        activity = []
        app_status = self.app.session.app_state(self.bundle_id)
        if app_status.value == AppState.RUNNING_IN_FOREGROUND.value:
            activity.append(self.bundle_id)
        else:
            activity.append(OTHER_PACKAGE)
        # 检查胶囊 和 webview，同时存在则在小程序中
        source = self.source()
        # 这个有可能被蒙层挡住
        capsule_xpath = '//Other/Button[re:match(@label, "(更多)|(该小程序正在使用你的.*)")]/following-sibling::Button[@label="关闭"]'
        # capsule = self.app.session(
        #     xpath=capsule_xpath
        # )
        webview_xpath = "//WebView"
        # webview = self.app.session(class_name="WebView")
        # 检查tabbar
        tabbar_items = ["微信", "通讯录", "发现", "我"]
        main_frame_tabbar_xpath = f'//TabBar/Button[@label="{tabbar_items[0]}"]/' + "/".join(
                'following-sibling::Button[@label="%s"]' % item
                for item in tabbar_items[1:]
            )
        # main_frame_tabbar = self.app.session(
        #     xpath=main_frame_tabbar_xpath
        # )
        if self._full_tree.xpath(capsule_xpath) and source.xpath(webview_xpath):
            activity.append(MINIPROGRAM_ACTIVITY)
        elif source.xpath(main_frame_tabbar_xpath):
            activity.append(WECHAT_ACTIVITY)
        else:
            activity.append(OTHER_ACTIVITY)
        return "/".join(activity)

    def _is_in_wechat(self, activity: str):
        return activity.startswith(self.bundle_id)

    def _is_in_wechat_main(self, activity: str):
        return activity.endswith(WECHAT_ACTIVITY)

    def _is_in_miniprogram(self, activity: str):
        return activity.endswith(MINIPROGRAM_ACTIVITY)

    @cost_debug(0.1)
    def _get_any_modal(self, confirm=False) -> Tuple[NativeModal, bool] or None:
        self.source()
        # check auth
        modal_type, node = self._check_auth_type(confirm, 0)
        if modal_type is not NativeModal.NONE:
            return (modal_type, confirm)
        # 兜底
        if self._search_el_from_source(class_name="Button", text="确定"):
            return (NativeModal.MODAL, self.app.session(class_name="Button", text="确定"))
        # self.app.session.alert.click_button_if_exists("确定")  # 系统弹窗需要用这个才能判断
        return None


    def _get_any_modal_old(self, confirm=False):
        """
        confirm == True: 确认/允许
        confirm == False: 拒绝/取消
        1. 授权弹窗 —— 拒绝/允许
        2. 分享弹窗 —— 发送
        3. 模态弹窗 —— 取消/确定
        4. ACTION SHEET暂不支持
        """
        auth = self.app.session(
            xpath='//Button[@label="授权说明"]/../Button[@name="{text}"]'.format(text="允许" if confirm else "拒绝")
        )
        share = self.app.session(
            xpath='//Image/StaticText[@name="发送给："]/following-sibling::XCUIElementTypeOther/Button[@label="发送"]'
        )
        modal = self.app.session(
            xpath='//Button[@label=""]/StaticText[contains("确定|取消", @label)]'
        )
        action_sheet = self.app.session(xpath='//ScrollView/Button[@label="取消"]')
        if auth.exists:
            return auth
        if modal.exists:
            return modal
        if action_sheet.exists:
            return action_sheet
        if share.exists:
            return share

    def _handle_modal(self, modal: Tuple[NativeModal, bool]) -> ModalStatus:
        if not modal:
            return ModalStatus.OK
        modal_type, confirm = modal
        logger.info(f"处理 {modal_type.name} 弹窗")
        if modal_type.value < NativeModal.MODAL.value:
            if self._handle_auth(modal_type, confirm):
                return ModalStatus.OK
            return ModalStatus.NotFound
        if modal_type is NativeModal.MODAL:
            if self.handle_modal(confirm):
                return ModalStatus.OK
            return ModalStatus.NotFound
        elif modal_type is NativeModal.IMAGEPREVIEW:
            self.app.session(class_name="Image").click_if_exists(0.5)
        return ModalStatus.Error

    def _press_back(self):
        return self.app.press_back()

    def _is_in_target_miniprogram(self, appid: str):
        return True

    def _close_miniprogram(self):
        return True

    def _is_in_payment(self):
        return False

    @property
    def orientation(self):
        """
        获取屏幕方向
        :return:
        """
        return self.app.session.orientation

    @orientation.setter
    def orientation(self, value):
        """
        设置屏幕方向
        :param value: (string) LANDSCAPE | PORTRAIT | UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT |
                    UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN
        :return:
        """
        self.app.session.orientationset(value)

    def release(self):
        """
        remove port forward process
        :return:
        """
        super().release()
        if self.perf_flag:
            self.stop_get_perf()
        self.wda_runner.remove_iproxy()
        self._empty_base_screen_dir(self.outputs_screen)

    ###############################
    #                      private                         #
    ###############################

    def _capture_photo(self, media_type, duration=10.0):
        """
        capture a photo by camera
        :param media_type: photo or video
        :param duration: capture duration
        :return:
        """
        if media_type == "photo":
            self.app.session(text="拍照").click(timeout=10.0)
            self.app.session(text="轻触拍照，按住摄像").click(timeout=10.0)
        elif media_type == "video":
            self.app.session(text="拍摄").click(timeout=10.0)
            self.app.session(text="轻触拍照，按住摄像").tap_hold(duration=duration)
        time.sleep(2.0)
        while self.app.session(text="确定").exists:
            try:
                self.app.session(text="确定").click(timeout=10.0)
            except Exception as e:
                logger.warning(str(e))

    def _select_photos_from_album(self, names: list, original=False):
        """
        select photos from album
        :param names: photo name list
        :param original: use original photo or not
        :return:
        """
        self.app.session(text="从手机相册选择").click(timeout=10.0)
        for name in names:
            rect = self.app.session(partial_text=name).bounds
            self.app.session.click(rect.x + rect.width - 10, rect.y + 10)
        if original:
            self.app.session(text="原图").click(timeout=10.0)
        self.app.session(partial_text="完成").click(timeout=10.0)

    def _select_video_from_album(self, name: str):
        """
        select video from album
        :param name: video file name
        :return:
        """
        self.app.session(text="从手机相册选择").click(timeout=10.0)
        rect = self.app.session(partial_text=name).bounds
        self.app.session.click(rect.x + rect.width - 10, rect.y + 10)
        self.app.session(partial_text="完成").click(timeout=10.0)

    def stop_wechat(self):
        """
        :return:
        """
        if self.health_modal_handle_thread:  # 健康弹窗仍在监听的话，需要断掉，不然会报错
            self.stop_check = True
            self._wait(lambda: self.check_done, timeout=20, interval=2)
        self.app and self.app.session.close()

    def get_authorize_settings(self):
        """
        todo @locker
        :return:
        """
        pass

    def back_from_authorize_setting(self):
        """
        todo @locker
        :return:
        """
        self.app.session(class_name="Button", text="返回").click(timeout=10.0)

    def authorize_page_checkbox_enable(self, name, enable):
        """
        todo @locker
        :return:
        """
        pass

    @staticmethod
    def _alert_callback(session):
        """
        auto accept when system alert view popup
        :return:
        """
        if session.alert.exists:
            logger.info("出现弹框, 默认接受")
            session.alert.accept()

    def _perf_callback(self, data_type: str, value: dict):
        # logger.debug(f"@_perf_callback {data_type}, {value}")
        if data_type not in ("cpu", "fps", "memory"):
            return
        timestamp = int(value["timestamp"] / 1000)  # value["timestamp"] is ms
        if len(self.perf_data) > 0 and self.perf_data[-1]["timestamp"] == timestamp:
            item = self.perf_data[-1]
        else:
            item = {"timestamp": timestamp}
            self.perf_data.append(item)
        if data_type == "cpu":
            item.update(
                {"mem": self.last_mem, "cpu": value["value"], "fps": self.last_fps}
            )
            self.last_cpu = value["value"]
        elif data_type == "fps":
            item.update(
                {"mem": self.last_mem, "cpu": self.last_cpu, "fps": value["value"]}
            )
            self.last_fps = value["value"]
        elif data_type == "memory":
            item.update(
                {"mem": value["value"], "cpu": self.last_cpu, "fps": self.last_fps}
            )
            self.last_mem = value["value"]

    def start_get_perf(self, timeinterval=15) -> bool:
        """
        开始获取性能数据
        :param timeinterval: 抽样时间间隔
        :return: boolen
        """
        if self.perf_flag:
            return True
        if not can_use_tidevice(self.udid):
            return False
        if tidevice is None:
            return False
        t = tidevice.Device(self.udid)
        self.perf = tidevice.Performance(t, [tidevice.DataType.CPU, tidevice.DataType.MEMORY, tidevice.DataType.FPS])
        self.last_fps = 0
        self.last_cpu = 0
        self.last_mem = 0
        self.perf.start(self.bundle_id, callback=self._perf_callback)
        self.perf_flag = True
        return self.perf_flag

    def stop_get_perf(self):
        """
        停止获取性能数据
        :return: string: json.dumps([{cpu, mem, fps, timestamp}])
        """
        self.perf_flag = False
        if not self.perf:
            return ""
        self.perf.stop()
        result = json.dumps(self.perf_data)
        self.perf_data = []
        self.last_fps = 0
        self.last_cpu = 0
        self.last_mem = 0
        return result

    def click_node(self, node: Union[WDANode, List[WDANode]]):
        if not node:
            return False
        if isinstance(node, WDANode):
            node = [node]
        for n in node:
            self.click_coordinate(n.center_x, n.center_y)
        return True

    def check_connected(self):
        """检查是否存在【连接断开】的情况，有则手动断开一下"""
        s = self.source()
        view = s.xpath('//*[@name="连接断开"]/following-sibling::Button[@name="展开"]')
        if not view:
            return True
        self.click_node(view)
        time.sleep(1)
        s = self.source()
        if self.click_node(s.xpath('//Button[@name="收起"]//preceding-sibling::Button[@name="停止"]')):
            time.sleep(2)
            self.close_local_debug_modal()
        return False

    @cost_debug(0.1)
    def check_connection(self, port=None):
        try:
            ret = ping_driver(self.app.client.http.address, port, 10, StateMode.STATUS, return_json=True)
            return (ret["value"]["state"] == "success")
        except:
            return False

    # 以下方法可能被重构
    @property
    @cost_debug(1)
    def source_json(self) -> dict:
        try:
            return self.app.source(data_format="json")
        except (WDAEmptyResponseError, Exception) as e:
            logger.warning("empty response for source cmd")
            logger.info(f"{e.__class__.__name__}: {e}")
            if self.check_connection():
                logger.info(f"try to get accessible source from old wda port {self.wda_port}")
                source = self.app.client.accessibleSource()
                if source:
                    return source
            # 重新设置转发端口
            new_wda_port = self.wda_runner.pick_unuse_port()
            self.wda_runner.listen_port(port=new_wda_port, device_id=self.udid)
            logger.info(do_shell("ps -ef|grep iproxy"))
            if self.check_connection(new_wda_port):
                logger.info(f"use new wda port {new_wda_port}")
                self.wda_port = new_wda_port
                self.wda_runner.port = new_wda_port
                self.app.client.http.address = re.sub(r":\d+", f":{new_wda_port}", self.app.client.http.address)
                self.app.session.http.address = re.sub(r":\d+", f":{new_wda_port}", self.app.session.http.address)
            else:
                logger.warning(f"ping new port fail, restart driver")
                try:
                    ret = self.restart_driver()
                except RuntimeError:
                    ret = restart_driver(self.wda_ip, self.wda_port, self.udid, wda_bundle=self.wda_bundle)
                if ret:
                    logger.info("重启wda成功.")
                else:
                    raise wda.WDAError("WDA没有启动: 重启失败")
            return self.app.source(data_format="json")
        
    def restart_driver(self):
        wda_ip = self.wda_ip or WDA_DEFAULT_IP
        self.wda_runner.remove_iproxy()
        self.wda_runner.start_driver()
        self.wda_runner.listen_port(ip=wda_ip)
        if ping_driver(f"http://{wda_ip}:{self.wda_runner.port}", timeout=10):
            self.wda_ip = wda_ip
            self.wda_port = self.wda_runner.port
            return True
        else:
            logger.warning(f"启动 wda 失败, wda 项目路径: {self.wda_project_path}")
        return False
    
    @property
    @cost_debug(1)
    def source_xml(self) -> dict:
        return self.app.source(data_format="xml")
    
    @cost_debug(1)
    def source(self):
        """refresh source"""
        # xml比json返回慢进1倍, 使用source_json
        # 此函数可能需要高达2s左右的耗时
        root = WDANode(self.source_json)
        new_root = remove_invisible_child(root, True)
        self._full_tree = SourceTree(root)
        self._source_tree = SourceTree(new_root)
        # remove_invisible_child(root, False)
        # self._source_tree = SourceTree(root)
        return self._source_tree

    def _get_source_list(self) -> typing.List[WDANode]:
        stime = time.time()
        try:
            # 默认过滤掉invisible node
            self.source()
            return self._source_tree.nodes
        except Exception as e:
            logger.error(e)
            return []
        finally:
            logger.warning(f"_get_source_list cost {time.time() - stime}s")

    def log_all_nodes(self, nodes=None):
        nodes = nodes or self._get_source_list()
        logger.info("\n".join([str(view) for view in nodes ]))
        
    @property
    def source_tree(self):
        if self._source_tree is None:
            return self.source()
        return self._source_tree

    @property
    def current_nodes(self) -> typing.List[WDANode]:
        return self.source_tree.nodes

    def _window_exists(self, text=None, partial_text=None, source_list=None):
        """
        mmui不能search window, 只能通过json判断
        """
        raise NotImplementedError("release微信没有window name")
        
    def _search_el_from_source(self, el_list: typing.List[WDANode]=None, sel: Selector=None, *, class_name=None, text=None, partial_text=None, pattern=None):
        """通过source tree获取element,否则返回none

        :param typing.List[WDANode] el_list: _description_, defaults to self.current_nodes
        :param Selector sel: 指定Selector, defaults to None
        :param str class_name: type, defaults to None
        :param str text: 全匹配, defaults to None
        :param str partial_text: 包含, defaults to None
        :param str pattern: 正则, defaults to None
        """
        sel = sel or Selector(class_name=class_name, text=text, partial_text=partial_text, pattern=pattern)    
        def search_el(nodes: typing.List[WDANode]):
            if not nodes:
                return None
            for node in nodes:
                if sel.match_ui_node(node):
                    return node
                el = search_el(node.get_children())
                if el:
                    return el
            return None
        return search_el(el_list or self.current_nodes)

    @cost_debug(1)
    def _check_auth_type(self, answer=True, timeout=0) -> Tuple[NativeModal, WDANode or WDASelector]:
        """检查认证弹窗类型

        :param bool answer: true: 允许/确定, false: 拒绝/取消
        :return NativeModal: 弹窗类型
        :return WDANode: 可操作的node
        """
        # self.source()
        if isinstance(answer, bool):
            btn_text = "允许|确定" if answer else "拒绝|取消"
        else:
            btn_text = answer
        btn = {
            "class_name": "Button",
            "pattern": btn_text
        }
        btn = Selector(class_name = "Button", pattern = btn_text)
        s = time.time()
        if timeout == 0:
            timeout = 0.1
        cnt = 0
        while time.time() - s < timeout:
            if cnt > 0:
                self.source()  # 刷新current nodes
            cnt += 1
            btn_exists = self._search_el_from_source(sel=btn)
            for level in self.modals_map:  # 先遍历高层级弹窗
                ms = []
                for ui_view in reversed(self.current_nodes):
                    for modal_clss, modal_type, sel in level:
                        if (
                            modal_type
                            not in self._not_normal_type
                            and not btn_exists
                        ):  # 一般的授权弹窗, 需要验证授权按钮是否存在
                            continue
                        match = False  # 看看当前view有没有符合关键字的
                        for i, modal_cls in enumerate(modal_clss):
                            if modal_cls.match_ui_node(ui_view):
                                match = True
                                break
                        if match and len(modal_clss) <= 1:  # 只有一个条件
                            if self._last_modal_type is not modal_type:
                                return modal_type, sel and self._search_el_from_source(sel=sel(answer))
                            ms.append((modal_type, sel and self._search_el_from_source(sel=sel(answer))))  # 暂存
                        elif match:  # 当前view符合关键字的, 判断是否所有条件都符合
                            for j, modal_cls in enumerate(modal_clss):
                                if i == j:  # 已经检测过
                                    continue
                                if not self._search_el_from_source(sel=modal_cls):
                                    match = False
                                    break
                            if match:
                                if self._last_modal_type is not modal_type:
                                    # 不同的授权类型
                                    return modal_type, sel and self._search_el_from_source(sel=sel(answer))
                                elif modal_type in self._can_repeat_type:
                                    # 有可能重复弹出的授权窗
                                    self.log_all_nodes(self.current_nodes)  # 重复出现需要看看是不是handle失败了
                                    return modal_type, sel and self._search_el_from_source(sel=sel(answer))
                                ms.append((modal_type, sel and self._search_el_from_source(sel=sel(answer))))  # 暂存
                if ms:
                    return ms[-1]
            if cnt >= 2 and btn_exists:  # 检测两次后, 有授权按钮但识别不出是什么弹窗, 默认返回normal
                break
            time.sleep(1)
        else:
            return NativeModal.NONE, None
        return NativeModal.NORMAL, None

    def allow_privacy(self, answer=True):
        try:
            return self.app.session(text="同意" if answer else "拒绝", index=-1).click_if_exists(0.5)
        except WDAElementNotFoundError as e:
            logger.warning(e)
            return False

    def handle_alter_before_unload(self, answer=True):
        return self.handle_modal("确定" if answer else "取消")

    @cost_debug(1)
    def _handle_auth(self, modal_type: NativeModal, answer):
        # logger.info(f"处理 {modal_type.name} 弹窗")
        if modal_type is NativeModal.NONE:
            logger.warning("未检测到授权弹窗")
            return False
        elif modal_type is NativeModal.PRIVACY:
            return self.allow_privacy(answer)
        elif modal_type in (
            NativeModal.NORMAL,
            NativeModal.LOGIN,
            NativeModal.RECORD,
            NativeModal.CAMERA,
            NativeModal.PHOTO,
            NativeModal.USERINFO,
            NativeModal.LOCATION,
            NativeModal.BLUETOOTH,
            NativeModal.WERUN,
        ):
            return self._allow_authorize(answer)
        elif modal_type is NativeModal.SHARE:
            return self.handle_modal("发送" if answer else "取消")
        elif modal_type is NativeModal.NOBINDPHONE:
            return self.app.session(text="取消", index=-1).click_if_exists(0.5)
        elif modal_type is NativeModal.PHONE:
            return self._allow_get_user_phone(answer)
        elif modal_type is NativeModal.SUBSCRIBE:
            return self.allow_send_subscribe_message(answer)
        elif modal_type is NativeModal.OPENWERUN:
            return self.allow_get_we_run_data(answer)
        return False
    
    @property
    def webview_offset_y(self):
        """获取小程序navigate-bar底部偏移"""
        if self._app_brand_action_bar_bottom is None:
            try:
                tree = self.source()
                if tree is None:
                    return 0
                els = tree.xpath("//WebView")
                if not els:
                    return 0
                if self._pixel_ratio is None and self.mini and self.mini.app:
                    self._pixel_ratio = self.mini.app.pixel_ratio
                self._app_brand_action_bar_bottom = int(els[0].rect['y'] * self._pixel_ratio)
            except:
                return 0
        return self._app_brand_action_bar_bottom
    
    @property
    def status_bar_height(self):
        if self._status_bar_height is None and self.mini and self.mini.app:
            self.mini.app.pixel_ratio
        return self._status_bar_height or 0


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    s1 = Selector(class_name="window", text="2")
    s2 = Selector(xpath="/*")


    native = WXIOSNative(
        {
            "device_info": {
                # "udid": "aee531018e668ff1aadee0889f5ebe21a2292...",
                # "model": "iPhone XR",
                # "version": "12.2.5",
                # "name": "yopofeng's iPhone12"
            }
        }
    )
    native.start_wechat()
    try:
        print(etree.__file__)
        native._get_source_list()  # 刷新
        print(native.current_nodes)
        print(etree.dump(native.source_tree.tree))
    finally:
        native.release()
