#!/usr/bin/env python
# -*- coding: utf-8 -*-
import datetime
from enum import Enum
import os
import os.path
import json
import urllib.parse
from functools import reduce
import base64
import time
import re
from collections import namedtuple
import os.path

import requests
import logging
import functools
import contextlib
import threading

from wda import screenhelper
from wda.xcui_element_types import xcui_element

DEBUG = True
logger = logging.getLogger()
HTTP_TIMEOUT = 70
alert_callback = None

JSONDecodeError = (
    json.decoder.JSONDecodeError if hasattr(json.decoder, "JSONDecodeError") else ValueError
)


class WDAError(Exception):
    """base wda error"""


class WDARequestError(WDAError):
    def __init__(self, status, value):
        self.status = status
        self.value = value

    def __str__(self):
        return "WDARequestError(status=%d, value=%s)" % (self.status, self.value)


class WDAEmptyResponseError(WDAError):
    """response body is empty"""


class WDAElementNotFoundError(WDAError):
    """element not found"""


class WDAElementNotDisappearError(WDAError):
    """element not disappear"""


class WCAutoError(WDAError):
    """wcauto error"""


class AppState(Enum):
    """
    0 is not installed. 
    1 is not running. 
    2 is running in background or suspended. 
    3 is running in background. 
    4 is running in foreground
    """
    NOT_INSTALLED = 0
    NOT_RUNNING = 1
    SUSPENDED = 2
    RUNNING_IN_BACKGROUND = 3
    RUNNING_IN_FOREGROUND = 4


def convert(dictionary):
    """
    Convert dict to namedtuple
    """
    return namedtuple("GenericDict", list(dictionary.keys()))(**dictionary)


def urljoin(*urls):
    """
    The default urlparse.urljoin behavior look strange
    Standard urlparse.urljoin('http://a.com/foo', '/bar')
    Expect: http://a.com/foo/bar
    Actually: http://a.com/bar

    This function fix that.
    """
    return reduce(
        urllib.parse.urljoin, [u.strip("/") + "/" for u in urls if u.strip("/")], ""
    ).rstrip("/")


def roundint(i):
    return int(round(i, 0))


def httpdo(url, method="GET", data=None):
    """
    Do HTTP Request
    """
    if isinstance(data, dict):
        data = json.dumps(data)
    if DEBUG:
        logger.debug(
            "Shell: curl -X {method} -d '{data}' '{url}'".format(
                method=method, data=data or "", url=url
            )
        )
    t = time.time()

    try:
        session = requests.Session()
        session.trust_env = False
        response = session.request(method, url, data=data, timeout=HTTP_TIMEOUT)
        session.close()
    except requests.exceptions.ConnectionError:
        # 终端云测8%左右的概率出现ConnectionError
        time.sleep(1)
        logger.error("ConnectionError should try :%s", url.split("/")[-1])
        session = requests.Session()
        session.trust_env = False
        response = session.request(method, url, data=data, timeout=HTTP_TIMEOUT)
        session.close()
    except requests.exceptions.ReadTimeout as e:
        logger.exception("http error: {} , retry to connect...".format(e))
        raise e from None

    try:
        retjson = response.json()
        if DEBUG:
            logger.debug(
                "costs:%.2f, Return:%s",
                time.time() - t,
                json.dumps(retjson, indent=4)[:512],
            )
        retjson["status"] = retjson.get("status", 0)
        r = convert(retjson)
        if r.status != 0:
            logger.error("costs:%.2f, Return:%s", time.time() - t, json.dumps(retjson, indent=4))
            raise WDARequestError(r.status, r.value)
        if isinstance(r.value, dict) and r.value.get("error"):
            raise WDARequestError(100, r.value["error"]) from None
        return r
    except JSONDecodeError:
        if response.text == "":
            raise WDAEmptyResponseError(method, url, data)
        raise WDAError(method, url, response.text) from None


class HTTPClient(object):
    def __init__(self, address, alert_callback=None, isWad=True):
        """
        Args:
            address (string): url address eg: http://localhost:8100
            alert_callback (func): function to call when alert popup
        """
        self.address = address
        self.alert_callback = alert_callback
        self.isWda = isWad

    def new_client(self, path):
        return HTTPClient(self.address.rstrip("/") + "/" + path.lstrip("/"), self.alert_callback)

    def fetch(self, method, url, data=None):
        return self._fetch_no_alert(method, url, data)
        # return httpdo(urljoin(self.address, url), method, data)

    def _fetch_no_alert(self, method, url, data=None, depth=0):
        target_url = urljoin(self.address, url)
        try:
            return httpdo(target_url, method, data)
        except WDAError as err:
            if depth >= 1:
                raise
            if not callable(self.alert_callback):
                raise
            if url.startswith("/alert") or url.startswith("/wda/alert"):
                raise  # 防止alert_callback时调用alert导致死循环
            self.alert_callback()  # 如果alert_callback会调用到_fetch_no_alert会造成死循环
            return self._fetch_no_alert(method, url, data, depth=depth + 1)

    def __getattr__(self, key):
        """Handle GET,POST,DELETE, etc ..."""
        return functools.partial(self.fetch, key)


class Rect(object):
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def __str__(self):
        return "Rect(x={x}, y={y}, width={w}, height={h})".format(
            x=self.x, y=self.y, w=self.width, h=self.height
        )

    def __repr__(self):
        return str(self)

    @property
    def center(self):
        return namedtuple("Point", ["x", "y"])(self.x + self.width / 2, self.y + self.height / 2)

    @property
    def origin(self):
        return namedtuple("Point", ["x", "y"])(self.x, self.y)

    @property
    def left(self):
        return self.x

    @property
    def top(self):
        return self.y

    @property
    def right(self):
        return self.x + self.width

    @property
    def bottom(self):
        return self.y + self.height


# 参见FBCustomCommands.m
class Client(object):
    def __init__(self, target="http://127.0.0.1:8100"):
        """
        Args:
            - target(string): base URL of your iPhone, ex http://10.0.0.1:8100
        """
        self._target = target
        self.http = HTTPClient(target)

    def wait_ready(self, timeout=120):
        """
        wait until WDA back to normal

        Returns:
            bool (if wda works)
        """
        deadline = time.time() + timeout
        while time.time() < deadline:
            try:
                self.status()
                return True
            except:
                time.sleep(2)
        return False

    def status(self):
        res = self.http.get("status")
        sid = res.sessionId
        res.value["sessionId"] = sid
        return res.value

    def home(self):
        """Press home button"""
        return self.http.post("/wda/homescreen")

    def healthcheck(self):
        """Hit healthcheck"""
        return self.http.get("/wda/healthcheck")

    def deactivate(self, duration):
        return self.http.post("/wda/deactivateApp", dict(duration=duration))

    def lock(self):
        return self.http.post("/wda/lock")

    def unlock(self):
        """unlock screen, double press home"""
        return self.http.post("/wda/unlock")

    def locked(self):
        """returns locked status, true or false"""
        return self.http.get("/wda/locked").value

    def set_clipboard(self, content, content_type="plaintext"):
        """set clipboard"""
        self.http.post(
            "/wda/setPasteboard",
            {
                "content": base64.b64encode(content.encode()).decode(),
                "contentType": content_type,
            },
        )

    def get_clipboard(self):
        """get clipboard"""
        return self.http.get("/wda/getPasteboard").value

    def battery_info(self):
        """
        Returns dict: (I do not known what it means)
            eg: {"level": 1, "state": 2}
        """
        return self.http.get("/wda/batteryInfo").value

    def siri_activate(self, text):
        self.http.post("/wda/siri/activate", {"text": text})

    def device_info(self):
        """
        Returns dict:
            eg: {'currentLocale': 'zh_CN', 'timeZone': 'Asia/Shanghai'}
        """
        return self.http.get("/wda/device/info").value

    def source(self, format):
        return self.http.get("source?format=%s" % format).value

    def accessibleSource(self):
        return self.http.get("/wda/accessibleSource").value

    def screenshot(self, png_filename=None):
        """
        Screenshot with PNG format

        Args:
            - png_filename(string): optional, save file name

        Returns:
            png raw data
        """
        value = self.http.get("screenshot").value
        raw_value = base64.b64decode(value)
        if png_filename:
            with open(png_filename, "wb") as f:
                f.write(raw_value)
        if png_filename is not None:
            return os.path.abspath(png_filename)
        else:
            return raw_value

    def app_current(self):
        """
        Returns:
            dict, eg:
            {"pid": 1281,
             "name": "",
             "bundleId": "com.netease.cloudmusic"}
        """
        return self.http.get("/wda/activeAppInfo").value

    def session(
        self,
        bundle_id=None,
        shouldUseCompactResponses=False,
        arguments=None,
        environment=None,
        alert_action=None,
    ):
        """
        Launch app in a session

        Args:
            - bundle_id (str): the app bundle id
            - arguments (list): ['-u', 'https://www.google.com/ncr']
            - enviroment (dict): {"KEY": "VAL"}
            - alert_action (AlertAction): AlertAction.ACCEPT or AlertAction.DISMISS

        WDA Return json like

        {
            "value": {
                "sessionId": "69E6FDBA-8D59-4349-B7DE-A9CA41A97814",
                "capabilities": {
                    "device": "iphone",
                    "browserName": "部落冲突",
                    "sdkVersion": "9.3.2",
                    "CFBundleIdentifier": "com.supercell.magic"
                }
            },
            "sessionId": "69E6FDBA-8D59-4349-B7DE-A9CA41A97814",
            "status": 0
        }

        To create a new session, send json data like

        {
            "capabilities": {
                "alwaysMatch": {
                    "bundleId": "your-bundle-id",
                    "app": "your-app-path"
                    "shouldUseCompactResponses": (bool),
                    "shouldUseTestManagerForVisibilityDetection": (bool),
                    "maxTypingFrequency": (integer),
                    "arguments": (list(str)),
                    "environment": (dict: str->str)
                }
            },
        }

        Or {"capabilities": {}}
        """
        # if not bundle_id:
        #     # 旧版的WDA创建Session不允许bundleId为空，但是总是可以拿到sessionId
        #     # 新版的WDA允许bundleId为空，但是初始状态没有sessionId
        #     session_id = self.status().get("sessionId")
        #     if session_id:
        #         return self

        if arguments and type(arguments) is not list:
            raise TypeError("arguments must be a list")

        if environment and type(environment) is not dict:
            raise TypeError("environment must be a dict")

        capabilities = {}
        if bundle_id:
            always_match = {
                "bundleId": bundle_id,
                "arguments": arguments or [],
                "environment": environment or {},
                "shouldUseCompactResponses": shouldUseCompactResponses,
                "shouldWaitForQuiescence": False,
            }
            if alert_action:
                assert alert_action in ["accept", "dismiss"]
                capabilities["defaultAlertAction"] = alert_action

            capabilities['alwaysMatch'] = always_match

        payload = {
            "capabilities": capabilities,
            "desiredCapabilities": capabilities.get('alwaysMatch',
                                                    {}),  # 兼容旧版的wda
        }

        # when device is Locked, it is unable to start app
        # if self.locked():
        #     self.unlock()
        
        # Remove empty value to prevent WDARequestError
        for k in list(capabilities.keys()):
            if capabilities[k] is None:
                capabilities.pop(k)

        try:
            res = self.http.post('session', data=payload)
        except WDAEmptyResponseError:
            """ when there is alert, might be got empty response
            use /wda/apps/state may still get sessionId
            """
            res = self.session().app_state(bundle_id)
            if res.value != 4:
                raise

        httpclient = self.http.new_client("session/" + res.sessionId)
        if hasattr(res, "isWCAutoTest") and res.isWCAutoTest:
            httpclient.isWda = False
        return Session(httpclient, res.sessionId)


# 参见 FBSessionCommands.m
class Session(object):
    def __init__(self, httpclient: HTTPClient, session_id):
        """
        Args:
            - httpclient(object): for example, http://127.0.0.1:8100
            - session_id(string): wda session id
            :type httpclient: HTTPClient
        """
        self._last_screen_name = None
        # self.screen_helper = screenhelper.ScreenHelper(httpclient)
        self.http = httpclient
        self._sid = session_id
        self.disable_push_op = False

    def __str__(self):
        return "wda.Session (id=%s)" % self._sid

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.close()

    def app_launch(self, bundle_id, arguments=[], environment={}, wait_for_quiescence=False):
        """
        Args:
            - bundle_id (str): the app bundle id
            - arguments (list): ['-u', 'https://www.google.com/ncr']
            - enviroment (dict): {"KEY": "VAL"}
            - wait_for_quiescence (bool): default False
        """
        assert isinstance(arguments, (tuple, list))
        assert isinstance(environment, dict)

        return self.http.post(
            "/wda/apps/launch",
            {
                "bundleId": bundle_id,
                "arguments": arguments,
                "environment": environment,
                "shouldWaitForQuiescence": wait_for_quiescence,
            },
        )

    def app_activate(self, bundle_id):
        return self.http.post(
            "/wda/apps/launch",
            {
                "bundleId": bundle_id,
            },
        )

    def app_terminate(self, bundle_id):
        return self.http.post(
            "/wda/apps/terminate",
            {
                "bundleId": bundle_id,
            },
        )

    def app_state(self, bundle_id):
        """
        Returns example:
            {
                "value": 4,
                "sessionId": "0363BDC5-4335-47ED-A54E-F7CCB65C6A65"
            }

        value 
        0 is not installed. 
        1 is not running. 
        2 is running in background or suspended. 
        3 is running in background. 
        4 is running in foreground
        """
        return self.http.post(
            "/wda/apps/state",
            {
                "bundleId": bundle_id,
            },
        )

    def app_list(self):
        """
        Not working very well, only show springboard

        Returns:
            list of app

        Return example:
            [{'pid': 52, 'bundleId': 'com.apple.springboard'}]
        """
        return self.http.get("/wda/apps/list").value

    def set_alert_callback(self, callback):
        """
        Args:
            callback (func): called when alert popup

        Example of callback:
            def callback(session):
                session.alert.accept()
        """
        if callable(callable):
            self.http.alert_callback = functools.partial(callback, self)
        else:
            self.http.alert_callback = None

    def tap(self, x, y):
        msg = "click point : ({},{})".format(x, y)
        logger.info(msg)
        self.push_op("tap", f"x={x}, y={y}")
        return self.http.post("wda/tap/0", dict(x=x, y=y))

    def long_tap(self, x, y, duration=3):
        msg = "long click point : ({},{})".format(x, y)
        logger.info(msg)
        self.push_op("long_tap", f"x={x}, y={y}")
        return self.http.post("wda/touchAndHold", dict(x=x, y=y, duration=duration))

    def _percent2pos(self, px, py):
        w, h = self.window_size()
        x = int(px * w) if isinstance(px, float) else px
        y = int(py * h) if isinstance(py, float) else py
        assert w >= x >= 0
        assert h >= y >= 0
        return (x, y)

    def click(self, x, y):
        """
        x, y can be float(percent) or int
        """
        if isinstance(x, float) or isinstance(y, float):
            if x < 1 and y < 1:
                x, y = self._percent2pos(x, y)
            else:
                x, y = int(x), int(y)

        return self.tap(x, y)

    def double_tap(self, x, y):
        msg = "double click point : ({},{})".format(x, y)
        logger.info(msg)
        self.push_op("double_tap", f"x={x}, y={y}")
        return self.http.post("wda/doubleTap", dict(x=x, y=y))

    def tapElement(self, element_id):
        return self.http.post("/element/%s/click" % element_id)

    def drag(self, x1, y1, x2, y2, duration=0.1):
        """
        duration(float) not sure the unit, need to test so that you can known

        [[FBRoute POST:@"/uiaTarget/:uuid/dragfromtoforduration"] respondWithTarget:self action:@selector(handleDrag:)],
        """
        data = dict(fromX=x1, fromY=y1, toX=x2, toY=y2, duration=duration)
        self.push_op("drag", f"x1={x1}, y1={y1}, x2={x2}, y2={y2}")
        return self.http.post("wda/dragfromtoforduration", data)

    @property
    def orientation(self):
        """
        Return string
        One of <PORTRAIT | LANDSCAPE>
        """
        return self.http.get("orientation").value

    def orientationset(self, direction):
        """
        .portrait = @"PORTRAIT",
        .landscapeLeft = @"LANDSCAPE",
        .landscapeRight = @"UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT",
        .portraitUpsideDown = @"UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN",

        """
        data = {"orientation": direction}
        return self.http.post("orientation", data)

    def window_size(self):
        """
        Return namedtuple

        For example:
            Size(width=320, height=568)
        """
        value = self.http.get("/window/size").value
        w = roundint(value["width"])
        h = roundint(value["height"])
        return namedtuple("Size", ["width", "height"])(w, h)

    def startWebHookProxy(self, webHookUrlProxy, webHookUrlAr):

        data = {"webHookUrlProxy": webHookUrlProxy, "webHookUrlAr": webHookUrlAr}
        return self.http.post("/webhook/proxy/start", data)

    def stopWebHookProxy(self):

        data = {}
        return self.http.post("/webhook/proxy/stop", data)

    def source(self):

        data = {}
        return self.http.post("/wcsource", data)

    def push_op(self, op, msg):
        if self.disable_push_op:
            return
        # name = f"{op} {msg}"
        # self.screen_helper.screen_shot(name)

    @property
    def alert(self):
        return Alert(self)

    @property
    def keyboard(self):
        return Keyboard(self)

    def close(self):
        return self.http.delete("/")

    def __call__(self, *args, **kwargs):
        httpclient = self.http.new_client("")
        return Selector(httpclient, self, *args, **kwargs)


class Alert(object):
    DEFAULT_ACCEPT_BUTTONS = [
        "使用App时允许", "无线局域网与蜂窝网络", "好", "稍后", "稍后提醒", "确定",
        "允许", "以后", "打开", "录屏", "Allow", "OK", "YES", "Yes", "Later", "Close"
    ]

    def __init__(self, session):
        """

        :type session: Session
        """
        self._s = session
        self.http = session.http

    @property
    def exists(self):
        try:
            self.text
        except WDAError as e:
            if e.status != 27 and e.status != 100:
                raise
            return False
        return True

    @property
    def text(self):
        return self.http.get('/alert/text').value

    def buttons(self):
        return self.http.get('/wda/alert/buttons').value

    def accept(self):
        logger.info("alert accept ")
        self._s.push_op("accept", "")
        return self.http.post('/alert/accept')

    def dismiss(self):
        logger.info("alert dismiss")
        return self.http.post('/alert/dismiss')

    def click_button(self, button_name):
        logger.info("alert click button %s" % button_name)
        self._s.push_op("click", button_name)
        return self.http.post('/alert/accept', data={"name": button_name})

    def click_button_if_exists(self, button_name):
        try:
            if button_name in self.buttons():
                logger.info("alert click button %s" % button_name)
                self._s.push_op("click", button_name)
                return self.http.post("/alert/accept", data={"name": button_name})
            return False
        except WDAError as e:
            if e.status != 27 and e.status != 100:
                raise
            return False
        return True

    @contextlib.contextmanager
    def watch_and_click(self,
                        buttons = None,
                        interval: float = 2.0):
        """ watch and click button
        Args:
            buttons: buttons name which need to click
            interval: check interval
        """
        if not buttons:
            buttons = self.DEFAULT_ACCEPT_BUTTONS

        event = threading.Event()

        def _inner():
            while not event.is_set():
                try:
                    alert_buttons = self.buttons()
                    logger.info("Alert detected, buttons: %s", alert_buttons)
                    for btn_name in buttons:
                        if btn_name in alert_buttons:
                            logger.info("Alert click: %s", btn_name)
                            self.click_button(btn_name)
                            break
                    else:
                        logger.warning("Alert not handled")
                except WDARequestError:
                    pass
                time.sleep(interval)

        threading.Thread(name="alert", target=_inner, daemon=True).start()
        yield None
        event.set()

class Keyboard(object):
    def __init__(self, session):
        self._s = session
        self.http = session.http

    def dismiss(self):
        return self.http.post("/wda/keyboard/dismiss")


# 参见 FBElementCommands.m
class Selector(object):
    def __init__(
        self,
        httpclient,
        session,
        text=None,
        partial_text=None,
        class_name=None,
        label=None,
        xpath=None,
        index=0,
        search_all=0,
    ):
        """

        :type httpclient: HTTPClient
        :type session: Session
        """
        self.http = httpclient
        self.session = session

        self._text = text if text else None
        self._partial_text = partial_text if partial_text else None
        self._class_name = class_name if class_name else None
        self._label = label if label else None
        self._xpath = xpath if xpath else None
        self._index = index
        self._search_all = search_all
        if class_name and not class_name.startswith("XCUIElementType"):
            self._class_name = "XCUIElementType" + class_name
        if xpath and not xpath.startswith("//XCUIElementType"):
            element = "|".join(xcui_element)
            self._xpath = re.sub(r"/(" + element + ")", "/XCUIElementType\g<1>", xpath)

        self._desc_dict = {}
        if text:
            self._desc_dict = {
                "name": text,
                "type": class_name,
                "label": self._label,
                "index": self._index,
            }
        elif partial_text:
            self._desc_dict = {
                "name": partial_text,
                "type": class_name,
                "label": self._label,
                "index": self._index,
            }
        elif label:
            self._desc_dict = {
                "name": text,
                "type": class_name,
                "label": self._label,
                "index": self._index,
            }
        elif class_name:
            self._desc_dict = {
                "name": text,
                "type": class_name,
                "label": self._label,
                "index": self._index,
            }
        self._desc = json.dumps(self._desc_dict, ensure_ascii=False)
        self._simple_desc = ", ".join([f"{k}={v}" for k, v in self._desc_dict.items() if v])

    @property
    def elements(self):
        """
        xpath: //XCUIElementTypeButton[@name='Share']
        Return like
        [
            {u'label': u'Dashboard', u'type': u'XCUIElementTypeStaticText', u'ELEMENT': u'E60237CB-5FD8-4D60-A6E4-F54B583931DF'},
            {u'label': None, u'type': u'XCUIElementTypeNavigationBar', u'ELEMENT': u'786F9BB6-7734-4B52-B341-09030256C3A6'},
            {u'label': u'Dashboard', u'type': u'XCUIElementTypeButton', u'ELEMENT': u'504C94B5-742D-4757-B954-096EE3512018'}
        ]

        Raises:
            SyntaxError
        """
        redata = {}
        if self.session.http.isWda:
            if self._text:
                using = "link text"
                value = "name={name}".format(name=self._text)
            elif self._partial_text:
                using = "partial link text"
                value = "name={name}".format(name=self._partial_text)
            elif self._label:
                using = "link text"
                value = "label={label}".format(label=self._label)
            elif self._class_name:
                using = "class name"
                value = self._class_name
            elif self._xpath:
                using = "xpath"
                value = self._xpath
            else:
                raise SyntaxError("text or className must be set at least one")
            data = {"using": using, "value": value}
            redata = self.http.post("/elements", data)
        else:
            datas = []
            if self._text:
                using = "link text"
                value = "name={name}".format(name=self._text)
                datas.append({"using": using, "value": value})
            if self._partial_text:
                using = "partial link text"
                value = "name={name}".format(name=self._partial_text)
                datas.append({"using": using, "value": value})
            if self._label:
                using = "label"
                value = "label={label}".format(label=self._label)
                datas.append({"using": using, "value": value})
            if self._class_name:
                using = "class name"
                value = self._class_name
                datas.append({"using": using, "value": value})
            if self._xpath:
                using = "xpath"
                value = self._xpath
                datas.append({"using": using, "value": value})
            if self._index:
                using = "index"
                value = self._index
                datas.append({"using": using, "value": value})

            data = {"using": "using_array", "value": datas}
            if self._index != 0 or (self._search_all == 1):
                redata = self.http.post("/elements", data)
            else:
                redata = self.http.post("/element", data)

        elems = []
        if not redata:
            return elems
        response = redata.value
        for elem in response:
            if self._class_name:
                if "type" not in elem:
                    class_name = self._property("name", eid=elem["ELEMENT"])
                else:
                    class_name = elem.get("type")
                if class_name != self._class_name:
                    continue
            if self.session.http.isWda and self._label and elem.get("label") != self._label:
                continue
            elems.append(elem)
        return elems

    def subelems(self, timeout=None, **kwargs):
        # element = self.wait(timeout)
        # element_id = element['ELEMENT']
        # if DEBUG:
        #    print "sub element_id: ", element_id
        if kwargs.get("className"):
            kwargs["class_name"] = kwargs.get("class_name") or kwargs.pop("className")
        # return subSelector(self.http, self.session, element_id, **kwargs)
        return subSelector(self.http, self.session, self, **kwargs)

    def __getitem__(self, index):
        if index >= self.count:
            raise IndexError()

        self._index = index
        return self

    def wait(self, timeout=None):
        """
        Args:
            - timeout(float): None means 30s

        Returns:
            element(json) for example:
            {"label": "Dashboard"," "type": "XCUIElementTypeStaticText"," "ELEMENT": "E60237CB-5FD8-4D60-A6E4-F54B583931DF'}
        """
        start_time = time.time()
        if timeout is None or timeout <= 0:
            timeout = 20.0
        while start_time + timeout > time.time():
            elems = self.elements
            if len(elems) > 0:
                if self.session.http.isWda:
                    return elems[self._index]
                else:
                    if len(elems) == 1:
                        return elems[0]
                    else:
                        return elems[self._index]
            time.sleep(1)

        if self.session.alert.exists and self.http.alert_callback:
            self.http.alert_callback()
            return self.wait()

        logger.error("cannot find element%s" % self._desc)
        raise WDAElementNotFoundError("element not found")

    def tap(self, timeout=None):
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        logger.info("tap element%s" % self._desc)
        self.session.push_op("tap", self._simple_desc)
        return self.http.post("element/%s/click" % eid, "")

    def clear(self, timeout=None):
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        logger.info("tap element%s" % self._desc)
        return self.http.post("element/%s/clear" % eid, "")

    def click(self, *args, **kwargs):
        """Alias of tap"""
        return self.tap(*args, **kwargs)

    def click_if_exists(self, timeout=10):
        exists = False
        t = time.time()
        while time.time() - t < timeout:
            try:
                exists = self.exists
            except WDAError as e:
                logger.error("elem not exists, %s", e)
            if exists:
                self.tap()
                return True
            time.sleep(1)
        else:
            return False

    def wait_exists(self, timeout=10):
        s = time.time()
        while time.time() - s < timeout and not self.exists:
            time.sleep(1)
        return self.exists

    def wait_disappear(self, timeout=15):
        s = time.time()
        while time.time() - s < timeout and self.exists:
            time.sleep(1)
        return not self.exists

    def tap_point(self, x, y):
        element = self.wait()
        eid = element["ELEMENT"]
        data = dict(x=x, y=y)
        logger.info("tap point (%s, %s)" % (x, y))
        self.session.push_op("tap_point", f"x={x}, y={y}")
        return self.http.post("wda/tap/%s" % eid, data)

    def tap_hold(self, duration=2.0, timeout=None, x=0, y=0):
        """
        [[FBRoute POST:@"/uiaElement/:uuid/touchAndHold"] respondWithTarget:self action:@selector(handleTouchAndHold:)],
        """
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        data = dict(duration=duration, x=x, y=y)
        logger.info("touchAndHold element%s" % self._desc)
        self.session.push_op("tap_hold", self._simple_desc)
        return self.http.post("wda/element/%s/touchAndHold" % eid, data)

    def drag(self, x2, y2, duration=0.1):
        """
        [[FBRoute POST:@"/uiaTarget/:uuid/dragfromtoforduration"] respondWithTarget:self action:@selector(handleDrag:)],
        """
        element = self.wait()
        eid = element["ELEMENT"]
        data = dict(fromX=0, fromY=0, toX=x2, toY=y2, duration=duration)
        self.session.push_op("drag", self._simple_desc)
        return self.http.post("wda/element/%s/dragfromtoforduration" % eid, data)

    def double_tap(self, timeout=None):
        """
        [[FBRoute POST:@"/wda/element/:uuid/doubleTap"] respondWithTarget:self action:@selector(handleDoubleTap:)],
        """
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        logger.info("doubleTap element%s" % self._desc)
        self.session.push_op("double_tap", self._simple_desc)
        return self.http.post("wda/element/%s/doubleTap" % eid, "")

    # 两指向外捏开可放大，两指向里捏合可以缩小，可用于图片的放大缩小
    def pinch(self, type, timeout=None):
        """
        scale(float): Use a scale between 0 and 1 to "pinch close" or zoom out and a scale greater than 1 to "pinch open" or zoom in.
        velocity(float): velocity must be less than zero when scale is less than 1
        """
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        if type == "open":
            data = {"scale": 2.0, "velocity": 5}
        elif type == "close":
            data = {"scale": 0.2, "velocity": -0.5}
        logger.info("pinch element%s" % self._desc)
        self.session.push_op("pinch", self._simple_desc)
        return self.http.post("wda/element/%s/pinch" % eid, data)

    def twoFingerTap(self):
        element = self.wait()
        eid = element["ELEMENT"]
        logger.info("twoFingerTap element%s" % self._desc)
        self.session.push_op("twoFingerTap", self._simple_desc)
        return self.http.post("wda/element/%s/twoFingerTap" % eid, "")

    def scroll(self, direction="visible", distance=1.0, timeout=None):
        """
        Scroll to somewhere, if no args provided, scroll to self visible

        Args:
            direction (str): one of "visible", "up", "down", "left", "right"
            distance (float): swipe distance, only works when direction is not "visible"
                              distance=1.0 means, element (width or height) multiply 1.0
            timeout (float): timeout to find start element
        """
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        if direction == "visible":
            data = {"toVisible": True}
        elif direction in ["up", "down", "left", "right"]:
            data = {"direction": direction, "distance": distance}

        logger.info("scroll to visible element%s" % self._desc)
        self.http.post("wda/element/{elem_id}/scroll".format(elem_id=eid), data)
        return self

    # 选择pickwheel中某个元素
    def select(self, timeout=None):
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        logger.info("select pickwheel element%s" % self._desc)
        return self.http.post("/wda/pickerwheel/%s/select" % eid, "")

    # 使用单指滑动，可用于返回上一个界面，左滑右滑的删除按钮
    def swipe(self, direction="left"):
        element = self.wait()
        eid = element["ELEMENT"]
        data = dict(direction=direction)
        logger.info("%s swipe element%s" % (direction, self._desc))
        self.session.push_op("swipe", self._simple_desc)
        return self.http.post("wda/element/%s/swipe" % eid, data)

    # swipe left or right
    def swipe_left(self, direction="left", duration=0.1):
        return self.swipe(direction)
        # mid_y = self.bounds.center[1]
        # left_x = self.bounds.left + 10
        # right_x = self.bounds.right - 10
        #
        # if direction == 'left':
        #     data = dict(fromX=right_x, fromY=mid_y, toX=left_x, toY=mid_y, duration=duration)
        # elif direction == 'right':
        #     data = dict(fromX=left_x, fromY=mid_y, toX=right_x, toY=mid_y, duration=duration)
        #
        # logger.info("swipe %s element%s" % (direction, self._desc))
        # return self.http.post('wda/dragfromtoforduration', data)

    def swipeUpDown(self, direction="up", delt_height=0.30, duration=0.1):
        mid_x = self.bounds.center[0]
        mid_y = self.bounds.center[1]
        height = delt_height * (self.bounds.bottom - self.bounds.top)
        up_y = mid_y + height / 2
        down_y = mid_y - height / 2

        if direction == "up":
            data = dict(fromX=mid_x, fromY=up_y, toX=mid_x, toY=down_y, duration=duration)
        elif direction == "down":
            data = dict(fromX=mid_x, fromY=down_y, toX=mid_x, toY=up_y, duration=duration)

        logger.info("swipe %s element%s" % (direction, self._desc))
        return self.http.post("wda/dragfromtoforduration", data)

    def _property(self, name, data="", method="GET", timeout=None, eid=None):
        if not eid:
            eid = self.wait(timeout)["ELEMENT"]
        return self.http.fetch(method, "element/%s/%s" % (eid, name), data).value

    def new_property(self, name, data="", method="GET", timeout=None, eid=None):
        if not eid:
            eid = self.wait(timeout)["ELEMENT"]
        return self.http.fetch(method, "wda/element/%s/%s" % (eid, name), data)

    def set_text(self, text, clear=False):
        if clear:
            self.clear_text()
        logger.info("set value %s element%s" % (text, self._desc))
        self.session.push_op("value", text)
        return self._property("value", data={"value": list(text)}, method="POST")

    def clear_text(self):
        logger.info("clear value element%s" % self._desc)
        return self._property("clear", method="POST")

    # 用力按，支持3dtouch
    def force_touch(self, pressure, duration, timeout=None):
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        data = dict(pressure=pressure, duration=duration)
        logger.info("force touch element%s" % self._desc)
        return self.http.post("/wda/element/%s/forceTouch" % eid, data)

    def force_touch_point(self, x, y, pressure, duration):
        element = self.wait()
        eid = element["ELEMENT"]
        data = dict(x=x, y=y, pressure=pressure, duration=duration)
        logger.info("force touch point (%s, %s)" % (x, y))
        return self.http.post("/wda/element/%s/forceTouch" % eid, data)

    def screenshot(self, png_filename):
        value = self._property("screenshot")
        raw_value = base64.b64decode(value)
        if png_filename:
            with open(png_filename, "w") as f:
                f.write(raw_value)
        if png_filename is not None:
            return os.path.abspath(png_filename)
        else:
            return raw_value

    def get_visible_cells(self):
        return self.new_property("getVisibleCells")

    def attribute(self, name):
        """
        get element attribute
        //POST element/:uuid/attribute/:name
        """
        return self._property("attribute/%s" % name)

    @property
    def exists(self):
        result = len(self.elements) > 0
        if self.session.http.isWda:
            result = len(self.elements) > (0 if self._index == -1 else self._index)
        if result:
            logger.info("exists elements%s" % self._desc)
        else:
            logger.info("Not exists elements%s" % self._desc)
        return result

    @property
    def value(self):
        """true or false"""
        return self.attribute("value")

    @property
    def enabled(self):
        """true or false"""
        return self._property("enabled")

    @property
    def accessible(self):
        """true or false"""
        return self.new_property("accessible")

    @property
    def displayed(self):
        """true or false"""
        return self._property("displayed")

    @property
    def bounds(self):
        """
        Return example:
            Rect(x=144, y=28, width=88, height=27)
        """
        value = self._property("rect")
        x, y = value["x"], value["y"]
        w, h = value["width"], value["height"]
        return Rect(x, y, w, h)

    @property
    def count(self):
        return len(self.elements)

    @property
    def class_name(self):
        return self._property("name")

    @property
    def text(self):
        return self._property("text")

    @property
    def label(self):
        return self.wait()["label"]

    def __len__(self):
        return self.count

    def elementSource(self, timeout=None):
        element = self.wait(timeout)
        eid = element["ELEMENT"]
        logger.info("get source element%s" % self._desc)
        return self.http.post("element/%s/wcsource" % eid, "")


class subSelector(Selector):
    """docstring for subSelector"""

    def __init__(self, httpclient, session, pra_element, **kwargs):
        super(subSelector, self).__init__(httpclient, session, **kwargs)
        self.pra_element = pra_element

    @property
    def elements(self):
        # eid = self.element_id

        element = self.pra_element.wait()
        eid = element["ELEMENT"]
        redata = {}
        if self.session.http.isWda:
            if self._text:
                using = "link text"
                value = "name={name}".format(name=self._text)
            elif self._partial_text:
                using = "partial link text"
                value = "name={name}".format(name=self._partial_text)
            elif self._label:
                using = "link text"
                value = "label={label}".format(label=self._label)
            elif self._class_name:
                using = "class name"
                value = self._class_name
            elif self._xpath:
                using = "xpath"
                value = self._xpath
            else:
                raise SyntaxError("text or className must be set at least one")
            data = {"using": using, "value": value}

            redata = self.http.post("element/%s/elements" % eid, data)

        else:
            datas = []
            if self._text:
                using = "link text"
                value = "name={name}".format(name=self._text)
                datas.append({"using": using, "value": value})
            if self._partial_text:
                using = "partial link text"
                value = "name={name}".format(name=self._partial_text)
                datas.append({"using": using, "value": value})
            if self._label:
                using = "label"
                value = "label={label}".format(label=self._label)
                datas.append({"using": using, "value": value})
            if self._class_name:
                using = "class name"
                value = self._class_name
                datas.append({"using": using, "value": value})
            if self._xpath:
                using = "xpath"
                value = self._xpath
                datas.append({"using": using, "value": value})
            if self._index != 0:
                using = "index"
                value = self._index
                datas.append({"using": using, "value": value})

            data = {"using": "using_array", "value": datas}
            redata = self.http.post("element/%s/elements" % eid, data)

        elems = []
        if not redata:
            return elems
        response = redata.value
        for elem in response:
            if self._class_name:
                if "type" not in elem:
                    class_name = self._property("name", eid=elem["ELEMENT"])
                else:
                    class_name = elem.get("type")
                if class_name != self._class_name:
                    continue
            elems.append(elem)
        return elems
