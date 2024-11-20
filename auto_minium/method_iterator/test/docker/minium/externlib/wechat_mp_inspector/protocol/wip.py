'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-11 19:42:21
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:46:37
FilePath: /wechat-mp-inspector/wechat_mp_inspector/protocol/wip.py
Description: 定义webkit的远程调试会话
'''
from typing import Any, Tuple, Union, Callable
import json

from wechat_mp_inspector.command import CommandType, Commands
from ..logger import logger
from pymobiledevice3.lockdown_service_provider import LockdownServiceProvider
from wechat_mp_inspector.connection.baseconn import BaseEvent
from wechat_mp_inspector.connection.lockdownconn import OPEN_TIMEOUT
from wechat_mp_inspector.event import BaseEvent
from .baseprotocol import BaseProtocol, CommandType, BaseEvent, Command, AsyncCommand
from .basewebkit import WebkitInspectorProtocol, EventType, WIP
from .protocolcommand import ProtocolCommand
from ..connection.baseconn import BaseConnection, BaseAsyncConnection
from ..connection.lockdownconn import LockdownConnection
from .basesession import BaseSession, BaseWebkitSession
from ..pages.safaripage import Page
from ..utils import super_class, json2obj, catch
import threading
import asyncio


class WIPConnection(LockdownConnection):
    def __init__(self, lockdown: LockdownServiceProvider, loop=None, timeout=None):
        super(WIPConnection, self).__init__(lockdown, loop, timeout)
        # self.ignore_method = set()
        self.logger = logger.getChild(f"Conn{self._id[-4:]}")
        self.protocol = WebkitInspectorProtocol()

    def _handle_response(self, ret_json) -> Tuple[str, Any]:
        req_id = None
        if "id" in ret_json:  # response
            req_id = ret_json["id"]
            if "error" in ret_json:
                err_msg = ret_json["error"].get("message", "")
                return req_id, Exception(err_msg)
        return req_id, ret_json

    def _handle_event(self, ret_json):
        """处理通知事件

        :param Object ret_json: 消息体
        :return None or BaseEvent: 事件
        """
        return self.protocol.parse_event(ret_json)

class WIPSession(BaseWebkitSession):
    """页面会话"""
    protocol: WebkitInspectorProtocol
    connection: WIPConnection
    def __init__(self, connection: WIPConnection, id_: str, page: Page):
        """
        :param wechat_mp_inspector.driver.iosdriver.IOSDriver driver: 
        :param str id_: 会话id
        :param _type_ page: _description_
        """
        super(WIPSession, self).__init__(id_, connection)
        self.page_ = page
        self.appid_ = page.appid_
        self.pageid_ = page.id_
        self.type_ = page.type_  # 用来帮助判断需要用什么inspector
        self.protocol = connection.protocol

    def send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, **kwargs):
        """发送命令, 并等待回复"""
        cmd = self._gen_command(command, params, sync=sync, **kwargs)
        return self.connection.send_command(cmd, session_id=self.id_, app_id = self.appid_, page_id=self.pageid_)

    async def _send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, **kwargs):
        """发送命令, 并等待回复"""
        cmd = self._gen_command(command, params, sync=sync, **kwargs)
        return await self.connection._send_command(cmd, session_id=self.id_, app_id = self.appid_, page_id=self.pageid_)

    def await_(self, awaitable):
        return self.connection.await_(awaitable)

    def on(self, event: Union[str, BaseEvent], callback: Callable):
        """监听事件"""
        return self.connection.on(event, callback)
    
    def remove_listener(self, event: Union[str, BaseEvent], callback: Callable):
        return self.connection.remove_listener(event, callback)

    def remove_all_listeners(self):
        return self.connection.remove_all_listeners()
    
    def close(self):
        self.connection.close()

class WIPTargetBaseSession(WIPSession, BaseAsyncConnection):
    def __init__(self, connection: WIPConnection, id_: str, page: Page, target_id: str):
        self._target_id = target_id
        super().__init__(connection, id_, page)
        super_class(BaseAsyncConnection, self).__init__(connection.loop)
        # self._async_msg_lock = connection._async_msg_lock
        # self._event_loop = connection._event_loop
        self.logger = logger.getChild(f"Target{target_id}")
        self.logger.setLevel(connection.logger.level)
        self.connection.on("Target.dispatchMessageFromTarget", self._dispatch_message_from_target)

    async def _dispatch_message_from_target(self, event: WIP.Target.dispatchMessageFromTarget):
        if event.targetId != self._target_id:  # ignore
            return
        # ret_json = json2obj(event.message)
        # self.logger.warning(f"{ret_json.id}: {ret_json.id in self._sync_wait_map}, {ret_json.id in self._async_msg_map}")
        self._on_message(event.message)
        # await self._async_notify()

    def _handle_response(self, ret_json):
        # 同一个协议
        return self.connection._handle_response(ret_json)

    def _handle_event(self, ret_json) -> BaseEvent:
        # 同一个协议
        return self.connection._handle_event(ret_json)

    def _receive_response(self, cmd: Command):
        # self.logger.warning("receive loop %d" % id(catch(asyncio.get_running_loop)()))
        cmd.desc = f"[{self._target_id}]{cmd.desc}"
        try:
            return super()._receive_response(cmd)
        except Exception as e:
            if str(e) == f"'{cmd.method}' was not found":
                raise NotImplementedError(f"{self._session.protocol.__class__.__name__} not support {cmd.method}") from e
            raise

    async def _async_receive_response(self, cmd: Command):
        # self.logger.warning("receive loop %d" % id(catch(asyncio.get_running_loop)()))
        cmd.desc = f"[{self._target_id}]{cmd.desc}"
        try:
            return await super()._async_receive_response(cmd)
        except Exception as e:
            if str(e) == f"'{cmd.method}' was not found":
                raise NotImplementedError(f"{self._session.protocol.__class__.__name__} not support {cmd.method}") from e
            raise

    def _check_conn_exception(self, cmd: Command):
        pass

    async def _async_check_conn_exception(self, cmd: Command):
        pass

    def _safely_send(self, cmd: CommandType, **extend):
        """真实发送消息的方法"""
        target_cmd = self.protocol.protocol.Target.sendMessageToTarget(message=cmd.dumps(), targetId=self._target_id)
        # Target.sendMessageToTarget 不关心返回, 监听 Target.dispatchMessageFromTarget 即可
        extend.update({
            "ignore_response": True,
            "session_id": self.id_, 
            "app_id": self.appid_, 
            "page_id": self.pageid_
        })
        return self.connection.send_command(self._gen_command(target_cmd, sync=False), **extend)
    
    async def _async_safely_send(self, cmd: CommandType, **extend):
        target_cmd = self.protocol.protocol.Target.sendMessageToTarget(message=cmd.dumps(), targetId=self._target_id)
        # Target.sendMessageToTarget 不关心返回, 监听 Target.dispatchMessageFromTarget 即可
        extend.update({
            "ignore_response": True,
            "session_id": self.id_, 
            "app_id": self.appid_, 
            "page_id": self.pageid_
        })
        return await self.connection._async_safely_send(self._gen_command(target_cmd, sync=False), **extend)
    
    async def _async_notify(self):
        """发送指令是在`self.connection.loop`中的, 会wait一个lock, 所以notify的时候需要在该loop中进行"""
        try:
            asyncio.get_running_loop()
        except:
            self.logger.exception("")
        # self.logger.debug(f"self.connection.loop is_running: {self.connection.loop.is_running()}")
        # self.logger.info("connection.loop == get_running_loop %d %d" % (id(self.connection.loop), id(catch(asyncio.get_running_loop)())))
        # async def _async_notify():
        #     await asyncio.sleep(0)
        #     await BaseAsyncConnection._async_notify(self)
        # return await asyncio.run_coroutine_threadsafe(_async_notify(), loop=self.connection.loop)
        await asyncio.run_coroutine_threadsafe(super()._async_notify(), loop=self.connection.loop)

    def _wait(self, cmd: Command):
        return super()._wait(cmd)

    def send_command(self, command: str, params: dict = None, *, sync=True, **kwargs):
        cmd = self._gen_command(command, params, sync=sync, **kwargs)
        return BaseAsyncConnection.send_command(self, cmd=cmd, sync=sync, **kwargs)

    async def _send_command(self, command: str, params: dict = None, *, sync=True, **kwargs):
        cmd = self._gen_command(command, params, sync=sync, **kwargs)
        return await BaseAsyncConnection._send_command(self, cmd=cmd, sync=sync, **kwargs)
    

if __name__ == "__main__":
    from pymobiledevice3.lockdown import create_using_usbmux
    import uuid, time, asyncio
    class _p:
        appid_ = "PID:1528"
        id_ = "96"
        type_ = "WIRTypeWebPage"
    page = _p()
    lockdown = create_using_usbmux()
    connection = WIPConnection(lockdown, timeout=20)
    connection.logger.setLevel(10)
    connection.get_open_pages()
    def init_app():
        for app_id, app_ in connection.connected_application.items():
            # filter bundle
            if app_.bundle == "com.tencent.qy.xin":
                page.appid_ = app_id
                return True
    async def _wait_for_app(timeout):
        etime = time.time() + timeout
        while time.time() < etime:
            await connection._send_message('_rpc_getConnectedApplications:')
            await asyncio.sleep(2)
            if init_app():
                return
    def get_pages():  # 获取当前app的页面
        connection.get_open_pages()
        pages = []
        if page.appid_ in connection.application_pages:
            for _page in connection.application_pages[page.appid_].values():
                setattr(_page, "appid_", page.appid_)
                pages.append(_page)
        return pages
    print(connection.await_(_wait_for_app(20)))
    pages = get_pages()
    for p in pages:
        if p.url == "https://servicewechat.com/preload/page-frame.html":
            page = p
    print(page)
    target_id = None
    def setTarget(event):
        global target_id
        target_id = event.targetInfo.targetId
    connection.on("Target.targetCreated", setTarget)
    id_ = str(uuid.uuid4()).upper()
    connection.await_(connection.setup_inspector_socket(id_, page.appid_, page.id_))
    async def wait():
        while True:
            if not target_id:
                await asyncio.sleep(1)
            else:
                return True
    connection.await_(wait())
    session = WIPSession(connection, id_, page)
    session2 = WIPTargetBaseSession(connection, id_, page, target_id)
    
    # print(session.await_(session._send_command(
    #     session.protocol.protocol.Runtime.evaluate(
    #         """(window.__wxConfig||window.__wxConfig__).accountInfo""", returnByValue=True
    #     )
    # )))
    # target
    cmd = session.protocol.get_command("Runtime.evaluate", {
                "expression": """(window.__wxConfig||window.__wxConfig__).accountInfo""", 
                "returnByValue": True
            }, max_timeout=3)
    cmd.id = 1
    print("-"*10)
    print((session.send_command(
        session.protocol.protocol.Target.sendMessageToTarget(
            cmd.dumps(),
            targetId=target_id
        )
        
    )))
    cmd.id = 2
    print("-"*10)
    print(session.await_(session._send_command(
        session.protocol.protocol.Target.sendMessageToTarget(
            cmd.dumps(),
            targetId=target_id
        )
    )))
    cmd.id = 3
    print("-"*10)
    print(session2.send_command(cmd))
    cmd.id = 4
    print("-"*10)
    session2.logger.info(session2.await_(session2._send_command(cmd)))