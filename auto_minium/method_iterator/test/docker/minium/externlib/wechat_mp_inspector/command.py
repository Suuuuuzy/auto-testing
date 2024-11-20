import json
import typing
from enum import Enum, unique, auto
from .emitter import ee

MAX_WAIT_TIMEOUT = 30  # 指令默认等待回复时间

class BaseCommand(object):
    _id = None
    """
    通信命令
    :method: 命令方法
    :params: 命令参数
    :desc: 命令超时时提醒信息
    """

    def __init__(
        self,
        method: str,
        params: dict = None,
        desc: str = None,
    ) -> None:
        self._id = None
        self.method = method
        self.params = params or {}
        self.desc = desc or f"call {method}"
        self._cancel = False

    """
    with BaseCommand(method, params) as cmd:
        cmd.id = "xxx"
        send(cmd)
    """

    def __enter__(self):
        return self

    def __exit__(self, ext_type, ext_value, ext_tb):
        self._cleanup(ext_type, ext_value, ext_tb)

    def __del__(self):
        self._cleanup()

    def _cleanup(self, *args):
        pass

    def dumps(self):
        return json.dumps(
            {"id": self.id, "method": self.method, "params": self.params},
            separators=(",", ":"),
        )

    @property
    def is_cancel(self):
        return self._cancel

    def cancel(self):
        self._cancel = True

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, v):
        _id = self._id
        self._id = v
        if v != _id:
            self.on_id_change(v)

    def on_id_change(self, v):
        pass


class Command(BaseCommand):
    max_timeout = MAX_WAIT_TIMEOUT
    _id = None
    _has_response = False
    """
    通信命令
    :method: 命令方法
    :params: 命令参数
    :timeout: 命令返回时间，仅对同步指令有效
    :desc: 命令超时时提醒信息
    """

    def __init__(
        self,
        method: str,
        params: dict = None,
        max_timeout: int = None,
        desc: str = None,
        *,
        conn_id: str = "",
        **kwargs
    ) -> None:
        super().__init__(method, params, desc)
        self.max_timeout = max_timeout or Command.max_timeout
        self._has_response = False
        self.reason: Exception = None
        self.conn_id = conn_id

    def on_connect_state_change(
        self, v, reason=ConnectionAbortedError("connection break")
    ):
        if not v:  # 下线
            self.reason = reason

    @property
    def has_response(self):
        return self._has_response

    @has_response.setter
    def has_response(self, v):
        _has_response = self._has_response
        self._has_response = v
        if v != _has_response:
            self.on_has_response_change(v)

    def on_id_change(self, value):
        """有设置id的情况, 代表指令是有"回复"的

        :param string v: id
        """
        self.has_response = True

    def on_has_response_change(self, value):
        if value:
            ee.on("connect_state_change" + self.conn_id, self.on_connect_state_change)
        else:
            ee.remove_listener("connect_state_change" + self.conn_id, self.on_connect_state_change)

    def _cleanup(self, *args):
        if self.has_response:
            self.has_response = False

    @classmethod
    def set_timeout(cls, timeout):
        cls.max_timeout = timeout


class AsyncCommand(BaseCommand):
    """异步命令"""

    def __init__(self, method: str, params: dict = None, desc: str = None, ignore_response=False, **kwargs) -> None:
        super().__init__(method, params, desc)
        self.ignore_response = ignore_response
        self.result = None  # 命令返回结果

CommandType = typing.Union[Command, AsyncCommand]

# 多协议同时支持的指令, 同时作为指令映射的key
@unique
class Commands(Enum):
    NOT_SUPPORT = auto()
    GET_ALL_CONTEXT = auto()

