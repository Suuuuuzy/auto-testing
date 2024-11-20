#!/usr/bin/env python3
# Created by xiazeng on 2019-06-11
import typing
from .basenative import BaseNative, logger
from ...utils.utils import Version
from ...framework.exception import MiniLaunchError
if typing.TYPE_CHECKING:
    import minium

class IdeNative(BaseNative):
    _mini: 'minium.WXMinium' = None  # ide的native操作也依赖minium的实例，可能引起循环引用，需要谨慎处理

    def __init__(self, json_conf, mini=None):
        self.use_native = False
        self.mini = mini
        super().__init__(json_conf)
        self._support_privacy = True

    def __del__(self):
        self.mini = None

    def release(self):
        super().release()
        self.mini = None

    @property
    def mini(self):
        return self._mini

    @mini.setter
    def mini(self, value):
        if self._mini == value:
            return
        self._mini = value
        if value is not None and getattr(self._mini, "connection"):
            self._get_dev_tool_info()
            try:
                # 探测一下是不是支持官方隐私弹窗操作
                self._allow_privacy()
            except NotImplementedError:
                self._support_privacy = False

    def start_wechat(self):
        pass

    def stop_wechat(self):
        ...

    def connect_weapp(self, path):
        ...

    def _get_dev_tool_info(self):
        try:
            result = self._mini.connection.send("Tool.getInfo", max_timeout=3).result
        except Exception:
            # not support Tool.getInfo
            return
        if Version(result.SDKVersion) < Version("2.7.3"):
            raise MiniLaunchError("基础库版本[%s]过低，请确认基础库版本>=2.7.3" % self.sdk_version)
        if str(result.version).endswith("2") and Version(result.version) >= "1.06.2211072":  # nightly
            self.use_native = True
        elif str(result.version).endswith("1") and Version(result.version) >= "1.06.2212011":  # RC
            self.use_native = True
        elif Version(result.version) >= "1.06.2301160":  # Stable
            self.use_native = True

    def _send(self, method, data=None):
        if self.use_native and self.mini:
            ret = self.mini.connection.send("Tool.native", {
                "method": method,
                "data": data
            })
            if "error" in ret.result:
                message = ret.result.error.get('message', '')
                if message.startswith("can not find in protocol:"):
                    raise NotImplementedError(message)
                logger.warning(f"handle {method} error: {message}")
                return Exception(message)
            return ret.result

    def send(self, method, data=None):
        if isinstance(self._send(method, data), Exception):
            return False
        return True

    def go_home(self):
        """
        跳转到小程序首页
        """
        if self.use_native:
            return self.send("goHome")

    def navigate_back(self):
        """
        左上角返回上一页
        """
        if self.use_native:
            return self.send("navigateLeft")

    def switch_tab(self, url):
        """
        点击tabBar
        """
        if self.use_native:
            return self.send("switchTab", {
                "url": url,  # tabbar 路径, 不带参数
            })

    def close_payment_dialog(self):
        """
        关闭支付弹窗
        """
        if self.use_native:
            return self.send("closePaymentDialog")

    def screen_shot(self, filename, return_format="raw"):
        if self.mini:
            self.mini.app.platform = "ide"  # 防止无限回调
            self.mini.app.screen_shot(filename, return_format)
            return filename
        return ""

    def pick_media_file(
        self,
        cap_type="camera",
        media_type="photo",
        original=False,
        duration=5.0,
        names=None,
    ):
        raise NotImplementedError("ide not implemented")

    def allow_authorize(self, answer=True, title=None):
        return self._allow_authorize(answer)

    def _allow_authorize(self, answer):
        """
        mock实现, 所有接口引发的原生弹窗授权理论上都可以使用
        """
        if self.use_native:
            return self.send("authorizeAllow" if answer else "authorizeCancel")

        if self.mini:
            return self.mini.app._evaluate_js(
                "ideHandleAuthModal",
                [
                    "允许" if answer else "拒绝",
                ],
            )
        return False
    
    def _allow_privacy(self, answer=True):
        return self.send("clickCoverView", {"data": {"nodetype": "text", "text": "同意" if answer else "拒绝"}})

    def allow_privacy(self, answer=True) -> bool:
        """处理隐私弹窗

        :param bool answer: true for 同意, false for 拒绝, defaults to True
        :raises NotImplementedError:
        :return bool: true for 处理成功, false for 处理失败
        """
        if self.mini:
            try:
                ret = self.mini.app.call_wx_method("getPrivacySetting").result.result.needAuthorization
                if ret:  # 需要处理隐私弹窗, 不支持
                    return self._allow_privacy(answer)
            except NotImplementedError as e:
                if str(e).find("wx.getPrivacySetting") >= 0:
                    return True  # 不支持getPrivacySetting接口证明没有隐私弹窗
                raise
            except:
                return False
        return False

    def allow_login(self, answer=True):
        return self._allow_authorize(answer)

    def allow_get_user_info(self, answer=True):
        return self._allow_authorize(answer)

    def allow_get_location(self, answer=True):
        ret = self._allow_authorize(answer)
        if ret is False:  # 如果是 chooseLocation, 接口会被 mock
            if self.mini:
                return self.mini.app._evaluate_js(
                    "ideHandleAuthModal",
                    [
                        "允许" if answer else "拒绝",
                    ],
                )
        return False

    def allow_get_we_run_data(self, answer=True):
        return self._allow_authorize(answer)

    def allow_record(self, answer=True):
        return self._allow_authorize(answer)

    def allow_write_photos_album(self, answer=True):
        return self._allow_authorize(answer)

    def allow_camera(self, answer=True):
        return self._allow_authorize(answer)

    def allow_get_user_phone(self, answer=True):
        return self._allow_authorize(answer)

    def allow_send_subscribe_message(self, answer=True):
        """
        允许发送订阅消息
        """
        if self.use_native:
            return self.handle_modal("允许" if answer else "取消")
        if self.mini:
            return self.mini.app._evaluate_js(
                "ideHandleAuthModal",
                [
                    "允许" if answer else "取消",
                ],
            )
        return False

    def handle_modal(self, btn_text="确定", title: str = None, force_title=False):
        """
        mock实现, 所有接口引发的原生弹窗理论上都可以使用
        ps: 需要兼容一下授权弹窗

        新工具版本支持native操作, 区分confirm/cancel, btn_text参数支持bool类型指定confirm/cancel
        """
        if self.use_native:
            cancel = not btn_text if isinstance(btn_text, bool) else btn_text in ("取消", "拒绝")
            if cancel:
                return self.send("cancelModal")
            else:
                return self.send("confirmModal")
        if self.mini:
            return self.mini.app._evaluate_js(
                "ideHandleModal",
                [
                    btn_text,
                ],
            )

    def handle_action_sheet(self, item):
        if self.mini:
            return self.mini.app._evaluate_js(
                "ideHandleModal",
                [
                    item,
                ],
            )
        # self.handle_modal(item)

    def forward_miniprogram(
        self, name: str, text: str = None, create_new_chat: bool = True
    ):
        raise NotImplementedError("ide not implemented")

    def forward_miniprogram_inside(
        self, name: str, text: str = None, create_new_chat: bool = True
    ):
        if self.use_native:
            ret = self.send("shareConfirm")
            if ret:
                self.forward_miniprogram_cancel()
            return ret
        raise NotImplementedError("ide not implemented")

    def forward_miniprogram_cancel(self):
        if self.use_native:
            return self.send("shareCancel")
        return False
        
    def handle_alter_before_unload(self, answer=True):
        """wx.enableAlertBeforeUnload弹框

        :param bool answer: true for确定, false for 取消, defaults to True
        """
        if self.use_native:
            return self.send("confirmConfirm" if answer else "confirmCancel")
        return False

    def input_text(self, text):
        if self.mini:
            self.mini.app.get_current_page().get_element("input").input(text)

    def input_clear(self):
        if self.mini:
            self.mini.app.get_current_page().get_element("input").input("")

    def textarea_text(self, text, index=0):
        if self.mini:
            els = self.mini.app.get_current_page().get_elements("textarea")
            els[index].input(text)

    def textarea_clear(self, index=0):
        if self.mini:
            els = self.mini.app.get_current_page().get_elements("textarea")
            els[index].input("")

    def send_custom_message(self, message=None):
        ...

    def phone_call(self):
        ...

    def map_select_location(self, name=None):
        if self.mini:
            return self.mini.app._evaluate_js(
                "ideHandleMap",
                [
                    name,
                ],
            )

    def map_back_to_mp(self):
        if self.mini:
            return self.mini.app._evaluate_js(
                "ideHandleMap",
                [
                    "取消",
                ],
            )

    def deactivate(self, duration):
        ...

    def get_authorize_settings(self):
        ...

    def back_from_authorize_setting(self):
        ...

    def authorize_page_checkbox_enable(self, name, enable):
        ...
    
    # jianjia begin
    def start_get_perf(self, timeinterval=15):
        """
        开始获取性能数据
        :param timeinterval: 抽样时间间隔
        :return: boolen
        """
        # jianjia
        logger.debug("=========jianjia start_get_perf in idenative=========")
        return False

    def stop_get_perf(self):
        """
        停止获取性能数据
        :return: string: json.dumps([{cpu, mem, fps, timestamp}])
        """
        pass
    # jianjia end
     
    def select_wechat_avatar(self):
        """
        选择微信头像
        """
        return self.send("clickCoverView", {"data": {"nodetype": "text", "text": "用微信头像"}})

    # back to miniprogram use
    def _get_current_activity(self):
        return ""

    def _is_in_wechat(self, activity: str):
        return True

    def _is_in_wechat_main(self, activity: str):
        return False

    def _is_in_miniprogram(self, activity: str):
        """
        需要甄别: 插件页面、webview页面、普通页面
        """
        return True

    def _is_in_target_miniprogram(self, appid: str):
        return True

    def _close_miniprogram(self):
        return True

    def _get_any_modal(self, confirm=False):
        return None

    def _is_in_payment(self):
        return False
    
