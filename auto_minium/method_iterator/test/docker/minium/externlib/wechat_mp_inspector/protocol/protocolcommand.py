"""
Author: yopofeng yopofeng@tencent.com
Date: 2023-09-15 15:52:13
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-09-15 15:54:11
FilePath: /wechat-mp-inspector/wechat_mp_inspector/protocol/protocolcommand.py
Description: 定义协议的指令类. 方便开发者根据协议内容填充参数, 供框架生成指令
"""
from dataclasses import asdict, dataclass, is_dataclass, fields

class _Optional:
    ...


OPTIONAL = _Optional()


class ProtocolCommand(object):
    """ProtocolCommand的子类使用`dataclasses.dataclass`修饰, 声明参数即可不需要定义具体方法"""
    _method_ = ""
    _arguments_ = None
    _field_names_ = None

    @classmethod
    def get_field_names(cls):
        if is_dataclass(cls):
            setattr(cls, "_field_names_", [field.name for field in fields(cls)])

    @property
    def _arguments(self):
        if not self._arguments_:
            self._arguments_ = asdict(self)
            for k, v in list(self._arguments_.items()):
                if isinstance(v, _Optional):
                    self._arguments_.pop(k)
        return self._arguments_
    
    @property
    def _method(self):
        return self.__class__._method_ or self.__class__.__name__
    
    def update(self, extend: dict):
        if is_dataclass(self.__class__):
            if self.__class__._field_names_ is None:
                self.__class__.get_field_names()
            for k, v in extend.items():
                if k in self._field_names_:
                    setattr(self, k, v)
        else:
            for k, v in extend.items():
                setattr(self, k, v)

def domainclass(cls):
    for name in dir(cls):
        if name.startswith("__"):
            continue
        attr = getattr(cls, name)
        if issubclass(attr, ProtocolCommand):
            setattr(attr, "_method_", f"{cls.__name__}.{name}")
            attr.get_field_names()
    return cls

if __name__ == "__main__":
    @dataclass
    class TPC(ProtocolCommand):
        a: int = 1
        b: str = ''

    tpc = TPC()
    tpc.update({"a": 2, "c": "bb"})
    print(tpc._arguments)
