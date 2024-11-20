#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by xiazeng on 2018/9/4
import time
import logging

logger = logging.getLogger()

WEB_DEBUG_PORT_REGEX_MAPPING = {
    "x5": [r"webview_devtools_remote_(?P<pid>\d+)"],
    "xweb": [r"com\.tencent\.mm_devtools_remote(?P<pid>\d+)", r"xweb_devtools_remote_(?P<pid>\d+)", r"webview_devtools_remote_(?P<pid>\d+)"],
    # xweb成功伪装成系统内核
    "webkit": [r"xweb_devtools_remote_(?P<pid>\d+)", r"webview_devtools_remote_(?P<pid>\d+)"],
}

MM_TOOL_PROCESS_NAME = "com.tencent.mm:tools"

X5_CLASS_NAMES = [
    "com.tencent.tbs.core.webkit.WebView",
    "com.tencent.smtt.webkit.WebView",
    "com.tencent.tbs.core.webkit.WebView",
    "com.tencent.tbs.core.webkit.tencent.TencentWebViewProxy"
]


def get_web_type(jd, timeout=10):
    t = time.time()
    while time.time() - t < timeout:
        ui_views = jd.dump_ui()
        # print ui_views
        if contains_x5(ui_views):
            return 'x5'
        for ui_view in ui_views:
            if ui_view.rid == "com.tencent.mm:id/logo_wv_container":
                return 'xweb'
            if ui_view.cls_name == "android":
                return "webkit"
    return "xweb"   # 我们测试大部分都用web


def contains_x5(ui_views):
    for ui_view in ui_views:
        for x5_cls_name in X5_CLASS_NAMES:
            if x5_cls_name in ui_view.cls_name:
                logger.info(u"contains x5 view, %s", ui_view.cls_name)
                return True
        # if u"X5内核提供技术支持" in ui_view.text:
        #     logger.info(u"contains x5 desc, %s", ui_view)
        #     return True
    return False
