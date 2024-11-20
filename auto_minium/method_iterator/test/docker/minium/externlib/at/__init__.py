# encoding:utf-8
import os.path
import json
import logging
import at.core.uidevice
import at.core.element
import at.core.javadriver
import at.core.config
import at.core.accesshelper
import at.eventmonitor
import at.apkapi
import at.core.adbwrap
import at.jlogcat
import at.core.stf
import at.core.stf.minitouch

uiautomator_version = at.core.config.UIAUTOMATOR2


def build_info():
    """打包的版本信息"""
    config_path = os.path.join(os.path.dirname(__file__), "build_info.json")
    if not os.path.exists(config_path):
        return {}
    else:
        try:
            return json.load(open(config_path, "r", encoding="utf8"))
        except:
            return {}


class At(object):
    """主入口"""
    at_cache = {}
    device_status = {}

    def __init__(self, serial=None, display_id=None, event_path=None, open_atstub=True):
        if serial is None:
            serial = at.core.adbwrap.AdbWrap.get_default_serial()

        self.serial = serial
        self.adb = at.core.adbwrap.AdbWrap.apply_adb(serial)
        self.apkapi = at.apkapi.AppApi(self.adb)
        self.java_driver = at.core.javadriver.JavaDriver.apply_driver(serial, uiautomator_version, open_atstub)
        at.core.element.Element.bind_java_driver(self.java_driver)
        self._logcat = None
        self.device = at.core.uidevice.PyUiDevice(self.java_driver)
        self.access_helper = at.core.accesshelper.AccessHelper(self.java_driver)
        self.event_monitor = at.eventmonitor.EventMonitor(self.java_driver)

        if serial not in At.at_cache:
            At.at_cache[serial] = self
            logging.info("at build info: %s", build_info())

        if event_path:
            minitouch = at.core.stf.minitouch.MiniTouch(self.serial, event_path, display_id)
            self.device.set_input_interceptor(minitouch)
            self.input_interceptor = minitouch
        else:
            self.input_interceptor = None

    @property
    def logcat(self):
        if not self._logcat:
            self._logcat = at.jlogcat.JLogCat(self.adb)
            self._logcat.setDaemon(True)
            self._logcat.start()
        return self._logcat

    @classmethod
    def set_uiautomator_version(cls, version):
        logger.info("set uiautomator_version=%s", version)
        cls.uiautomator_version = version

    def register_hook(self, hook):
        self.java_driver.hook_list.clear()
        self.java_driver.register(hook)

    @property
    def e(self):
        elem = at.core.element.Element(jd_instance=self.java_driver)
        if self.input_interceptor:
            elem.use_custom()
            elem.set_input_interceptor(self.input_interceptor)
        return elem

    def stop_logcat(self):
        if self._logcat:
            self._logcat.stop()

    def release(self):
        at.core.javadriver.JavaDriver.release_driver(self.serial)
        self.stop_logcat()

    def click_image(self, image_path):
        """点击图片，底层用的是`airtest
<https://airtest.readthedocs.io/zh_CN/latest/>`_."""
        import at.vision.template_match
        temp_path = "temp.png"
        source_path = self.device.screen_shot(temp_path)
        r = at.vision.template_match.search(image_path, source_path)
        if not r:
            raise RuntimeError("search %s failed" % image_path)
        else:
            self.device.click_on_point(r['results'][0], r['results'][1])

    def on_at_event(self, event, callback):
        """
        由AtServer返回的事件回调，目前只有click事件
        :param event:
        :param callback:
        """
        self.java_driver.websocket.add_callback(event, callback)


if __name__ == '__main__':
    import logging
    import logging.config
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger()
    uiautomator_version = at.core.config.UIAUTOMATOR2
    a = At()

    try:
        a.apkapi.add_gallery('/Users/mmtest/Downloads/222.png')
        # print a.e.text(u"消息免打扰").parent().instance(2).child().rid("com.tencent.mm:id/k2").get_desc()
    finally:
        a.release()
