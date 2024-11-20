#!/usr/bin/env python3
# Created by xiazeng on 2019-05-22
import typing
from typing import overload, Literal, Union

from ..framework.miniconfig import MiniConfig, logger, IOSDesire, AndroidDesire
from .exception import *

# # weChat
from minium.native.wx_native.basenative import BaseNative

# from minium.native.wx_native.androidnative import WXAndroidNative
# from minium.native.wx_native.iosnative import WXIOSNative
# from minium.native.wx_native.idenative import IdeNative

# # QQ
# from minium.native.qq_native.qandroidnative import QAndroidNative
# from minium.native.qq_native.qiosnative import QiOSNative

if typing.TYPE_CHECKING:
    from .wx_native.androidnative import WXAndroidNative
    from .wx_native.iosnative import WXIOSNative
    from .wx_native.idenative import IdeNative
    from .qq_native.qandroidnative import QAndroidNative
    from .qq_native.qiosnative import QiOSNative
    NativeType = typing.Union[IdeNative, WXAndroidNative, WXIOSNative, QAndroidNative, QiOSNative]
else:
    NativeType = BaseNative

# platform
from ..utils.platforms import *
# OS_ANDROID = "android"
# OS_IOS = "ios"
# OS_IDE = "ide"
# OS_MAC = "mac"
# OS_WIN = "win"

# application
APP_WX = "wx"
APP_QQ = "qq"


class APPS(dict):
    def __getitem__(self, __k):
        try:
            v = super().__getitem__(__k)
        except KeyError:
            v = None
        if v is not None:
            return v
        if __k == "wx_android":
            from minium.native.wx_native.androidnative import WXAndroidNative

            super().__setitem__(__k, WXAndroidNative)
            return WXAndroidNative
        elif __k == "wx_ios":
            from minium.native.wx_native.iosnative import WXIOSNative

            super().__setitem__(__k, WXIOSNative)
            return WXIOSNative
        elif __k == "ide":
            from minium.native.wx_native.idenative import IdeNative

            super().__setitem__(__k, IdeNative)
            return IdeNative
        elif __k == "qq_android":
            from minium.native.qq_native.qandroidnative import QAndroidNative

            super().__setitem__(__k, QAndroidNative)
            return QAndroidNative
        elif __k == "qq_ios":
            from minium.native.qq_native.qiosnative import QiOSNative

            super().__setitem__(__k, QiOSNative)
            return QiOSNative
        raise KeyError("APPS not support %s" % __k)


APP = APPS()


def get_native_driver(os_name, conf, *args):
    if os_name.lower() not in [OS_ANDROID, OS_IDE, OS_IOS]:
        raise RuntimeError("the 'os_name' in your config file is not in predefine")
    if os_name.lower() != OS_IDE and conf.get("app", None) not in [APP_WX, APP_QQ]:
        raise RuntimeError(
            f"the 'app': '{os_name}' in your config file is not in predefine, not support yet"
        )
    if os_name.lower() == OS_IDE:
        app = APP[os_name.lower()]({}, *args)
    elif conf.device_desire is None:
        logger.warning(
            "your platform is [{}], but dosn't configure the [device_desire] field, native"
            " interface will not in use!".format(os_name)
        )
        app = APP[OS_IDE]({})
    else:
        json_conf = {"outputs": conf.outputs, "debug": conf.debug or False}
        json_conf.update(conf.device_desire or {})
        app = APP[conf.app.lower() + "_" + os_name.lower()](json_conf)
    app.platform = os_name
    return app

@overload
def Native(platform: str, app="wx") -> NativeType: ...
@overload
def Native(json_conf: Union[AndroidDesire, IOSDesire], platform: str=None, app="wx") -> NativeType: ...

def Native(json_conf: Union[AndroidDesire, IOSDesire], platform: str=None, app="wx") -> NativeType:
    if json_conf in PLATFORMS:
        if platform:
            app = platform
        platform = json_conf
        json_conf = {}
        cfg = MiniConfig({"platform": platform, "app": app, "device_desire": json_conf})
    else:
        cfg = MiniConfig({"platform": platform, "app": app, "device_desire": json_conf})
    return get_native_driver(platform, cfg)
