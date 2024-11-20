import at
from enum import Enum


class UiDefine:
    def __init__(self, _at: at.At):
        self.at = _at

        # 小程序权限申请弹框
        self.btn_authorize_ok = self.at.e.cls_name("android.widget.Button").text("允许")
        self.btn_authorize_cancel = self.at.e.cls_name("android.widget.Button").text(
            "取消"
        )

        # 小程序菜单
        self.action_menu = self.at.e.cls_name("android.widget.ImageButton").desc("更多")
        self.action_home = self.at.e.cls_name("android.widget.ImageButton").desc("关闭")
        self.title = (
            self.action_home.parent()
            .cls_name("android.widget.LinearLayout")
            .instance(1)
            .child()
            .cls_name("android.widget.TextView")
        )

        # 小程序组件
        self.comp_picker_input = self.at.e.cls_name("android.widget.EditText").rid(
            "android:id/numberpicker_input"
        )


class ScreenType(Enum):
    AT = 1
    ADB = 2
    WETEST = 3
