'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-21 17:32:32
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2024-02-28 17:44:40
FilePath: /wechat-mp-inspector/wechat_mp_inspector/inspector/iosinspector.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
import asyncio
import json
from typing import Callable, Union
from pymobiledevice3.services.webinspector import WirTypes
from ..logger import logger
from ..utils import AsyncCallback, async_wait, WaitTimeoutError, super_class
from ..protocol.protocolcommand import ProtocolCommand
from ..protocol.wip import WIPSession, WIPTargetBaseSession, WIP, CommandType, BaseEvent, Command, AsyncCommand, BaseSession
from .baseinspector import BaseInspector
from ..connection.baseconn import BaseConnection, BaseAsyncConnection


class IOSInspectorSession(BaseInspector):
    _session: WIPSession
    INSTANCES = {}  # "appid_.pageid_" -> IOSInspectorSession

    @property
    def id(self):
        return f"{self._session.appid_}:{self._session.pageid_}"

    @classmethod
    def get_instance(cls, session: WIPSession):
        cache_key = f"{session.appid_}.{session.pageid_}"
        if cache_key in cls.INSTANCES:  # 有实例了
            return cls.INSTANCES[cache_key]
        
    @classmethod
    def set_instance(cls, session: WIPSession, inst: 'IOSInspectorSession'):
        cache_key = f"{session.appid_}.{session.pageid_}"
        cls.INSTANCES[cache_key] = inst

    @classmethod
    def del_instance(cls, session: WIPSession):
        cache_key = f"{session.appid_}.{session.pageid_}"
        if cache_key in cls.INSTANCES:  # 有实例了
            cls.INSTANCES.pop(cache_key)

    @classmethod
    def check_target_base(cls, session: WIPSession) -> bool:
        """检查inspector是不是基于target的"""
        type_ = session.type_
        if type_ is WirTypes.JAVASCRIPT:
            return False
        else:
            return True

    @classmethod
    async def create(cls, session: WIPSession, *args, timeout=None, target_base=None, **kwargs):
        if target_base is None:
            target_base = cls.check_target_base(session)
        if target_base is True:
            return await IOSTargetInspectorSession.create(session, *args, timeout=timeout, **kwargs)
        inst = cls.get_instance(session)
        if inst:
            return inst
        # 没什么用
        if session.page_.connection_id_ and session.page_.connection_id_ != session.connection.connection_id:  # 有connection id
            # await session.connection._forward_connection_died(session.page_.connection_id_, session.appid_, session.pageid_)
            # await session.connection._forward_web_page_close(session.appid_, session.pageid_, session.page_.connection_id_)
            pass
        await session.connection._forward_indicate_web_view(session.appid_, session.pageid_, True)
        await session.connection._forward_indicate_web_view(session.appid_, session.pageid_, False)
        await session.connection.setup_inspector_socket(session.id_, session.appid_, session.pageid_)
        inst = cls(session, *args, **kwargs)
        cls.set_instance(session, inst)
        return inst
    
    def _close(self):
        cache_key = f"{self._session.appid_}.{self._session.pageid_}"
        if cache_key in self.__class__.INSTANCES:
            self.__class__.INSTANCES.pop(cache_key)

    def close(self):
        self._close()
    
    # 异步相关
    def await_(self, awaitable):
        return self._session.connection.await_(awaitable)
    
    def send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, max_timeout=None, **kwargs):
        """发送命令, 并等待回复
        
        ❕❕❕不能在子线程中使用(asyncio的一堆问题...)
        """
        if max_timeout is None:
            max_timeout = self.default_command_timeout
        return self._session.send_command(command, params, sync=sync, max_timeout=max_timeout, **kwargs)

    async def _send_command(self, command: Union[str, ProtocolCommand, CommandType], params: dict = None, *, sync=True, max_timeout=None, **kwargs):
        if max_timeout is None:
            max_timeout = self.default_command_timeout
        cmd = self._session._gen_command(command, params, sync=sync, max_timeout=max_timeout, **kwargs)
        return await self._session._send_command(cmd)

    def on(self, event: Union[str, BaseEvent], callback: Callable):
        return self._session.on(event, callback)

    def remove_listener(self, event: Union[str, BaseEvent], callback: Callable):
        return self._session.remove_listener(event, callback)

    def remove_all_listeners(self, event: Union[str, BaseEvent]=None):
        if event:
            return self.remove_listener(event)
        return self._session.remove_all_listeners()


class IOSTargetInspectorSession(IOSInspectorSession):
    _session: WIPTargetBaseSession

    @property
    def id(self):
        return f"{self._session.appid_}:{self._session.pageid_}:{self._session._target_id}"

    @classmethod
    async def create(cls, session: WIPSession, *args, timeout=None, target_base=None, **kwargs):
        inst = cls.get_instance(session)
        if inst:
            return inst
        callback = AsyncCallback()
        session.on("Target.targetCreated", callback)
        session.on("Target.targetInfoChanged", callback)
        await session.connection._forward_indicate_web_view(session.appid_, session.pageid_, True)
        await session.connection._forward_indicate_web_view(session.appid_, session.pageid_, False)
        await session.connection.setup_inspector_socket(session.id_, session.appid_, session.pageid_)
        if timeout is None:
            await callback._waiter
        else:
            try:
                await async_wait(callback._waiter, timeout)
            except WaitTimeoutError:
                logger.warning(f"create [a]{session.appid_}.[p]{session.pageid_}.[s]{session.id_} fail, wait targetCreated timeout")
                return None
        target_info: WIP.Target.TargetInfo = callback.get_result().targetInfo  # event.params
        target_id = target_info.targetId
        logger.info(f'Created: {target_id}, page id: {session.pageid_}')
        logger.debug(json.dumps(target_info, indent=2))
        new_session = WIPTargetBaseSession(session.connection, session.id_, session.page_, target_id)
        target = cls(new_session, *args, **kwargs)
        cls.set_instance(new_session, target)
        return target
