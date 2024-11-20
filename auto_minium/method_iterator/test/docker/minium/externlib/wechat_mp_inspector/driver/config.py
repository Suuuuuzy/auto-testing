from functools import partialmethod
import logging
from ..utils import Object


class InitDefault(type):
    """自动生成__init__调用super().__init__并把默认值设置到实例中"""
    def __new__(cls, name, base, attr_dict):
        kwargs = {}
        for k, v in attr_dict.items():
            if k.startswith("_"):
                continue
            kwargs[k] = v
        new_cls = super().__new__(cls, name, base, attr_dict)
        src_init = attr_dict.get("__init__", None)
        def new_init(self, *_args, **_kwargs):
            new_kw = {**kwargs, **_kwargs}  # 更新default
            super(new_cls, self).__init__(*_args, **new_kw)
            src_init and src_init(self, *_args, **new_kw)
        new_cls.__init__ = new_init  #partialmethod(src_init, **kwargs)
        return new_cls


class BaseConfig(Object, metaclass=InitDefault):
    """配置基类, 如果需要__init__操作, 不需要使用super().__init__初始化父类, InitDefault已经进行super操作"""
    _unique_key_ = ""  # format for str(self)
    logger_level = logging.INFO

    def __str__(self) -> str:
        if not self.__class__._unique_key_:
            return super().__str__()
        return self.__class__._unique_key_ % self


class AndroidConfig(BaseConfig):
    _unique_key_ = "%(serial)s"
    serial = None  # 设备udid


class IOSConfig(BaseConfig):
    udid = None  # 设备udid
    connect_timeout = 30  # 链接超时时间
    bundle = None  # 目标app
    wait_for_app_timeout = 180  # 等待app连接服务时间


class MPConfig(BaseConfig):
    _unique_key_ = "%(appid)s"
    platform = None
    appid = ""
    skyline = True
    webview = True
    h5 = True
    timeout = 20  # 检测appservice的超时时间
    sock_cache = True  # 把sock name => pid 缓存起来(如果sock重新实例化有一定风险)
    init_page_info = False  # 尝试获取webview页面的page info
    cmd_timeout = 20  # 指令默认超时时间


class AndroidMP(MPConfig, AndroidConfig):
    platform = "android"

class IOSMP(MPConfig, IOSConfig):
    platform = "ios"

if __name__ == "__main__":
    import json
    print(IOSMP.mro())
    print(MPConfig.__init__)
    print(IOSConfig.__init__)
    ios_mp = IOSMP({"skyline": False}, timeout=30, bundle="123", bbb="222")
    print(json.dumps(ios_mp))
