#!/usr/local/bin/python2.7
# encoding: utf-8
'''
Created on 2014-8-28

@author: xiazeng
'''
import datetime
import logging
import os
import os.path
import re
import subprocess
import sys
import tempfile
import threading
import time
import traceback

import at.keycode
import at.utils.apkinfo
from at.utils import decorator, magic

from .exceptions import *

logger = logging.getLogger()

if sys.version_info[0] < 3:
    basestring = (str, unicode)
else:
    basestring = str


def run_cmd(cmd, timeout_sec=60, sync=True):
    """
    不支持重定向命令， 如: echo aa >> output
    """
    def _cb(p):
        logger.error("timeout run cmd: %s", cmd)
        p.kill()

    if not magic.is_windows():
        if isinstance(cmd, basestring):
            args = re.split(r"\s+", cmd)
        elif isinstance(cmd, list):
            args = cmd
        else:
            raise TypeError(u"cmd should be string or list")

        proc = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    else:
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)

    if not sync:
        return proc
    timer = threading.Timer(timeout_sec, _cb, [proc])
    try:
        timer.start()
        return proc.communicate()
    finally:
        timer.cancel()


def get_device_ids():
    f = os.popen("adb devices")
    devices = f.read().strip().split('\n')
    f.close()
    devices = devices[1:]
    ret = []
    for device in devices:
        serial = re.split(r'\s+', device)[0].strip()
        status = re.split(r'\s+', device)[1].strip()
        if status == 'device':
            ret.append(serial)
    return ret


def get_device_name(device_id):
    prop = os.popen('adb -s '+device_id+' shell getprop').read()
    rets = re.findall(r"\[ro.product.model\]: \[(.*)\]", prop)
    device_name = ''
    if rets:
        device_name = rets[0]
        device_name = device_name.replace(' ', '_')
    return device_name


def get_devices_names():
    ret = {}
    for device in get_device_ids():
        ret[device] = get_device_name(device)
    return ret


def get_key_value(s, key):
    r = re.compile(key+r"\s*=\s*(.*)$", re.MULTILINE)
    m = r.search(s)
    if m:
        return m.group(1)
    return None


class AdbDumpSys(object):
    def __init__(self, serial):
        self._adb = AdbWrap.apply_adb(serial)

    def _cmd(self, args):
        return self._adb.run_shell("dumpsys " + args)

    def package(self, pkg_name):
        output = self._cmd("package " + pkg_name)

        class PackageInfo(object):
            def __init__(self, s):
                self.versionName = get_key_value(s, "versionName")
                self.firstInstallTime = get_key_value(s, "firstInstallTime")
                self.lastUpdateTime = get_key_value(s, "lastUpdateTime")

            def is_first_install(self):
                return self.firstInstallTime == self.lastUpdateTime
        if "Unable to find package" in output:
            # logger.debug(output)
            return None
        return PackageInfo(output)


class AdbWrap(object):
    _serial_kv = {}
    adb_helper_dict = {}
    error_tags = [
        "no devices/emulators found",
        "error: closed",
        "more than one device/emulator",
        "device offline",
        "device not found",
        "protocol fault"
    ]

    def __init__(self, serial=None):
        self.adb_path = "adb"
        self._sdcard_path = None
        self._serial = serial
        self._last_pid = None
        self._error_msg = None
        self._last_output = None
        self._is_connected = True
        self._disconnected_cb = None
        self._call_back_list = []
        self._has_call_back = False
        serial_ids = get_device_ids()
        logger.info(str(serial_ids))
        if serial is None:
            self._serial = self.get_default_serial()
        if serial is not None and serial not in serial_ids:
            logger.error("可用手机:%s, '%s'不可用", serial_ids, serial)
            raise AdbDisconnectedError(u"手机不可用:"+serial)
        if self._serial is None and self.kv is None:
            self._serial_kv['none'] = {}
        elif self._serial is not None and self.kv is None:
            self._serial_kv[self._serial] = {}

    def check_connected(self):
        self.run_adb("shell echo 1")
        return self._is_connected

    def is_connected(self):
        return self._is_connected

    def add_disconnected_cb(self, _cb):
        self._call_back_list.append(_cb)
        self.check_connected()

    def set_connected_state(self, state):
        if not state:
            if not self._has_call_back:
                self._has_call_back = True
                for _cb in self._call_back_list:
                    _cb(self.serial, self._last_output, self._error_msg)

        self._is_connected = state

    def is_locked(self):
        output = self.run_shell(" dumpsys window policy")
        for line in output.split("\n"):
            if "isStatusBarKeyguard" in line and "true" in line:
                return True
            if "mShowingLockscreen" in line and "true" in line:
                return True
        return False

    @classmethod
    def get_default_serial(cls):
        serial_ids = get_device_ids()
        if len(serial_ids) == 0:
            raise AdbException(u"没有在线的手机")
        elif len(serial_ids) > 1:
            raise AdbException(u"多台%d手机在线，请指定serial, serials:%s" % (len(serial_ids), serial_ids))
        else:
            return serial_ids[0]

    @classmethod
    def apply_adb(cls, serial=None):
        if serial is None:
            serial = cls.get_default_serial()
        # logger.debug('serial is: %s, %s', serial, cls.adb_helper_dict.keys())
        if serial in cls.adb_helper_dict:
            # logger.debug("use cache adbHelper: " + str(serial))
            return cls.adb_helper_dict[serial]
        else:
            # logger.debug("create adbHelper: " + str(serial))
            helper = AdbWrap(serial)
            cls.adb_helper_dict[serial] = helper
            return helper

    def _run(self, cmd, sync=True, timeout_sec=60, retry=3):
        """
        :rtype: str
        """
        logger.debug(cmd)
        if not sync:
            return run_cmd(cmd, timeout_sec, sync)
        output, error = run_cmd(cmd, timeout_sec, sync)
        try:
            if magic.is_windows():
                error = error.decode("gbk")
                output = output.decode("gbk")
            else:
                error = error.decode("utf-8")
                output = output.decode("utf-8")
        except UnicodeDecodeError:
            pass

        self._last_output = output
        self._error_msg = error
        if isinstance(output, bytes):
            return output
        for error_tag in self.error_tags:

            if (error and error_tag in error) or error_tag in output:
                logger.error(error)
                if retry > 0:
                    time.sleep(11)
                    logger.warning("10 seconds later try again")
                    return self._run(cmd, sync, timeout_sec, retry-1)
                else:
                    self.set_connected_state(False)
        if error:
            logger.warning(error)

        return output

    def post_run(self, cmd, sync=True, timeout_sec=60):
        logger.debug(cmd)
        return run_cmd(cmd, timeout_sec, sync)

    def get_output_text(self):
        return self._last_output

    def get_output_lines(self):
        if self.get_output_text():
            lines = self.get_output_text().split("\n")
            return [l.strip() for l in lines]
        else:
            return []

    def get_error(self):
        return self._error_msg

    def clear_error(self):
        self._error_msg = None

    def set_error(self, msg):
        self._error_msg = msg

    @property
    def serial(self):
        return self._serial

    def restart_adb(self):
        self.run_adb("kill-server")
        self.run_adb("start-server")

    @property
    def kv(self):
        if self._serial is None:
            return self._serial_kv['none'] if "none" in self._serial_kv else None
        else:
            return self._serial_kv[self._serial] if self._serial in self._serial_kv else None

    def get(self, k):
        value = self.kv[k] if k in self.kv else None
        logger.debug("get in %s, %s=%s" % (str(self._serial), str(k), str(value)))
        return value

    def set(self, k, v):
        logger.debug("set in %s, %s=%s" % (str(self._serial), str(k), str(v)))
        self.kv[k] = v

    def unset(self, k):
        logger.debug("unset in %s, %s" % (str(self._serial), str(k)))
        if k in self.kv:
            del self.kv[k]

    def last_pid(self):
        return self._last_pid

    def prefix(self):
        if self._serial is not None:
            return "%s -s %s " % (self.adb_path, self._serial)
        else:
            return "%s " % self.adb_path

    def is_pid_running(self, pid):
        """
        判断pc的进程是否在运行
        :param pid: pc进程的process id
        :rtype: bool
        """
        if magic.is_windows():
            cmd = "tasklist /FI \"PID eq %d\"" % pid
            output = self._run(cmd)
            if str(pid) in output:
                return True
            else:
                return False
        else:
            try:
                os.kill(pid, 0)
            except OSError:
                return False
            else:
                return True

    @at.utils.decorator.retry_in(5, 1)
    def android_pid_running(self, pid, debug=False):
        cmds = ["ps", "ps -A"]
        outputs = []
        for cmd in cmds:
            output = self.run_shell(cmd)
            logger.warning(output)
            lines = output.split("\n")
            for line in lines[1:]:
                line = line.strip()
                ls = re.split(r"\s+", line)
                if len(ls) < 9:
                    continue
                if pid == int(ls[1]):
                    return True
            outputs.append(output)
        logger.warning("pid: %s not exists", pid)
        if debug:
            for output in outputs:
                logger.info(output)
        return False

    def get_android_pid(self, pkgname):
        cmds = ["ps", "ps -A"]
        for cmd in cmds:
            output = self.run_shell(cmd)
            lines = output.split("\n")
            for line in lines[1:]:
                line = line.strip()
                ls = re.split(r"\s+", line)
                if len(ls) < 9:
                    continue
                if pkgname == ls[8]:
                    return int(ls[1])
        return None

    def get_all_android_pids(self, reg=None):
        pid_mapping = {}
        cmds = ["ps", "ps -A"]
        for cmd in cmds:
            output = self.run_shell(cmd)
            lines = output.split("\n")
            for line in lines[1:]:
                line = line.strip()
                ls = re.split(r"\s+", line)
                if len(ls) < 9:
                    continue
                elif not reg or reg.match(ls[8]):
                    pid_mapping[ls[8]] = int(ls[1])
        return pid_mapping

    def get_android_uid(self, pkgname):
        try:
            pkg_pid = self.get_android_pid(pkgname)
            status_filename = "/proc/%d/status" % pkg_pid
            output = self.run_shell("cat %s" % status_filename)
            m = re.search(r"[Uu]id:\s+(\d+)", output, re.S)
            return int(m.group(1))
        except Exception as e:
            traceback.print_exc()
            return None

    def get_device_id(self):
        hex_id = self.run_shell("settings get secure android_id").strip()
        return int("0x{}".format(hex_id), 16) % 2147483647

    def get_brigthness(self):
        right = self.run_shell("dumpsys power").strip()
        return right

    def get_screen(self):
        screen = self.run_shell("dumpsys window policy").strip()
        return screen
    """
    流量统计相关，参考：http://stackoverflow.com/questions/12904809/tracking-an-applications-network-statistics-netstats-using-adb
    """
    def get_total_traffic_stats(self):
        output = self.run_shell("cat /proc/1/net/dev")
        lines = output.split("\n")
        m_tx = m_rx = wifi_tx = wifi_rx = 0
        for line in lines[2:]:
            line = line.strip()
            ls = re.split(r"\s+", line)
            if ls[0].startswith("rmnet") or ls[0].startswith("ccmni"):
                m_tx += int(ls[9])
                m_rx += int(ls[1])
            elif "lo" != ls[0]:
                wifi_tx += int(ls[9])
                wifi_rx += int(ls[1])
        return m_rx,m_tx, wifi_rx, wifi_tx

    def get_pkg_traffic_stats(self, pkgname):
        uid = self.get_android_uid(pkgname)
        output = self.run_shell("cat /proc/net/xt_qtaguid/stats")
        lines = output.split("\n")
        m_tx = m_rx = wifi_tx = wifi_rx = 0
        for line in lines[1:]:
            line = line.strip()
            ls = re.split(r"\s+", line)
            if len(ls)>3 and int(ls[3]) == uid:
                if ls[1].startswith("rmnet") or ls[1].startswith("ccmni"):
                    m_rx += int(ls[5])
                    m_tx += int(ls[7])
                elif ls[1] != "lo":
                    wifi_rx += int(ls[5])
                    wifi_tx += int(ls[7])
        return m_rx, m_tx, wifi_rx, wifi_tx

    def get_input_methods(self):
        outputs = self.run_shell("ime list -s")
        return [line.strip() for line in outputs.split("\n")]

    def set_input_method(self, input_method):
        return self.run_shell("ime set %s" % input_method)

    @decorator.cached_property
    def screen_size(self):
        output = self.run_shell("wm size")
        m = re.search(r"(\d+)x(\d+)", output)
        if m is not None:
            return int(m.group(1)), int(m.group(2))
        else:
            return 0, 0

    @decorator.cached_property
    def language(self):
        return self.get_property("persist.sys.language")

    @decorator.cached_property
    def sdk_version(self):
        version = self.get_property("ro.build.version.sdk")
        ret = -1
        try:
            ret = int(version)
        except Exception:
            pass
        return ret

    @decorator.cached_property
    def model(self):
        return self.get_property("ro.product.model")

    @decorator.cached_property
    def brand(self):
        return self.get_property("ro.product.brand")

    @decorator.cached_property
    def display(self):
        return self.get_property("ro.build.display.id")

    @decorator.cached_property
    def release(self):
        return self.get_property("ro.build.version.release")

    @decorator.cached_property
    def name(self):
        return self.brand

    @decorator.cached_property
    def desc(self):
        return {
            "name": self.brand,
            "model": self.model,
            "cpu": self.cpu_num,
            "language": self.language,
            "width": self.screen_size[0],
            "height": self.screen_size[1],
            "release": self.release,
            "sdk_version": self.sdk_version,
            "get_mem_info": self.get_mem_info(),
            # "display": self.display,
            "serial": self.serial
        }

    @decorator.cached_property
    def cpu_num(self):
        output = self.run_shell("ls /sys/devices/system/cpu/")
        m = re.findall(r"cpu[0-9]", output, re.M)
        return len(m)

    def get_property(self, name):
        return self.run_shell("getprop "+name).strip()

    def kill_pid(self, pid):
        if not self.is_pid_running(pid):
            return
        if magic.is_windows():
            cmd = "taskkill /F /PID %d" % pid
        else:
            cmd = "kill -9 %d" % pid
        self._run(cmd)

    def kill_by_name(self, name):
        if magic.is_windows():
            cmd = "TASKKILL /F /IM %s " % name
        else:
            cmd = "killall %s" % name
        logger.info(cmd)
        self._run(cmd)

    """
    android 定义了很多keycode，如果要增加API请参考：
    https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java
    """
    def press_key_code(self, code):
        self.run_shell("input keyevent %d" % code)

    def press_back(self):
        self.press_key_code(at.keycode.KEYCODE_BACK)
        time.sleep(2)

    def press_enter(self):
        logger.debug("press enter")
        self.press_key_code(at.keycode.KEYCODE_ENTER)

    def press_search(self):
        self.press_key_code(at.keycode.KEYCODE_SEARCH)

    def press_delete(self, num=1):
        for i in range(num):
            self.press_key_code(at.keycode.KEYCODE_DEL)

    def press_menu(self):
        self.press_key_code(at.keycode.KEYCODE_MENU)

    def press_home(self):
        self.press_key_code(at.keycode.KEYCODE_HOME)

    def press_app_switch(self):
        self.press_key_code(at.keycode.KEYCODE_APP_SWITCH)

    def press_number(self, number):
        number = str(number)
        for i in number:
            try:
                self.run_shell("input keyevent %d" % (int(i) + 7))
            except ValueError:
                logger.error(u"number must be string")
                break

    def click_point(self, x, y):
        logger.info("click %d, %d" % (x, y))
        self.run_shell("input tap %d %d " % (x, y))
        time.sleep(0.5)

    def click_point_for_quick(self, x, y):
        logger.info("click %d, %d" % (x, y))
        click_time = self.run_shel_for_quick("input tap %d %d " % (x, y))
        logger.info(click_time)
        return click_time
        # time.sleep(0.5)

    @at.utils.decorator.retry_in(10, 1)
    def get_current_activity(self):
        """
        :return: activity名称，包含包名，如：com.android.launcher/com.android.launcher2.Launcher 或者 com.tencent.mm/.ui.LauncherUI
        """
        act = self.get_current_activity2()
        if not act:
            act = self.get_act_by_dump_act()
        logger.debug('activity: %s', act)
        return act

    def _wrap_activity_name(self, pkg, act):
        """
        统一activity的格式
        :param pkg: 包名，如com.tencent.mm
        :param act: 包含包名，如com.tencent.mm/.ui.LauncherUI
        :return:
        """
        pkg, act = pkg.strip(), act.strip()
        if act.startswith("."):
            return pkg, pkg + '/' + act
        if "/" in act:
            return pkg, act
        return pkg, act

    def _get_top_window(self, lines):
        for line in lines:
            m = re.search(r'mFocusedApp=.* ((\S*)/(.*)) ', line)
            if m:
                return self._wrap_activity_name(m.group(2), m.group(3))

        for line in lines:
           m = re.search(r'mCurrentFocus=.* ((\S*)/(.*?))[ }]', line)
           if m:
               return self._wrap_activity_name(m.group(2), m.group(3))
        return None, None

    def get_act_by_dump_act(self):
        act = None
        output = self.run_shell("dumpsys activity activities")
        try:
            output1 = bytes.decode(output).split("\n")
        except:
            output1=output.split("\n")
        for line in output1:
            line = line.strip()
            if "mFocusedActivity" in line:
                m = re.search(r"((\w+?\.)+?(\w+)/(\.\w+)+)", line)
                if m:
                    act = m.group(0)
                    break
            if "mResumedActivity" in line:
                m = re.search(r"((\w+?\.)+?(\w+)/(\.\w+)+)", line)
                if m:
                    act = m.group(0)
                    break
        return act

    def get_current_activity2(self):
        # as a example:
        # mCurrentFocus=Window{41d2c970 u0 com.android.launcher/com.android.launcher2.Launcher}
        # mFocusedApp=AppWindowToken{4203c170 token=Token{41b77280 ActivityRecord{41b77a28 u0 com.android.launcher/com.android.launcher2.Launcher t3}}}
        output = self.run_adb("shell dumpsys window windows") # | grep -E 'mCurrentFocus|mFocusedApp'
        lines = [line.strip() for line in output.split('\n')]
        _, act = self._get_top_window(lines)
        # logger.debug('activity: %s', act)
        return act

    def get_current_active_process(self, reg_exp):
        """
        grep top 5 process, and return process match {reg_exp}
        :return: process_name, pid
        """
        output = self.run_shell("COLUMNS=512 top -m 5 -n 2 -d 2")
        lines = [re.sub(r"\x1B[^m]*m", "", line.strip()) for line in output.split("\n")]  # Filter control character
        for output2 in lines:
            r = re.compile("(%s)" % reg_exp)
            m = r.search(output2)
            if m:
                pid = output2.split()[0]
                m_name = m.group(1)
                return (m_name, pid)
        return (None, None)

    def get_current_active_view(self, reg_exp):
        """
        get current active view from SurfaceFlinger, return view name match {reg_exp}
        """
        output = self.run_adb("shell dumpsys SurfaceFlinger --list")
        lines = [line.strip() for line in output.split("\n")]
        view = None
        r = re.compile("(%s)" % reg_exp)
        for line in lines:
            m = r.search(line)
            if m:
                return m.group(1)
        return None

    def get_current_process(self):
        output = self.run_adb("shell dumpsys window windows")  # | grep -E 'mCurrentFocus|mFocusedApp'
        lines = [line.strip() for line in output.split('\n')]
        pkg, _ = self._get_top_window(lines)
        return pkg

    def get_top_process(self):
        output = self.run_shell("dumpsys activity")
        lines = [line.strip() for line in output.split('\n')]
        for line in lines:
            if "top-activity" in line:
                m = re.search(r"(\d+):(\S+)/(\w+)", line)
                return int(m.group(1)), m.group(2)
        return None, None

    def forward(self, dst_port, src_port):
        cmd = "forward tcp:%s tcp:%s" % (str(dst_port), str(src_port))
        self.run_adb(cmd)

    def forward_name(self, dst_name, src_name):
        cmd = "forward %s %s" % (dst_name, src_name)
        self.run_adb(cmd)

    def forward_remove(self, port):
        cmd = "forward --remove tcp:%s" % str(port)
        self.run_adb(cmd)

    def forward_remove_all(self):
        cmd = "forward --remove-all"
        self.run_adb(cmd)

    def forward_list(self):
        cmd = "adb forward --list"
        lines = self.run_adb(cmd).split("\n")
        ports = []
        for line in lines:
            m = re.match(r".*\s+(\S+):(\S+)\s+(\S+):(\S+)", line)
            if m:
                ports.append()

        self.run_adb(cmd)

    def app_is_running(self, pkg_name):
        pid = self.get_android_pid(pkg_name)
        if pid:
            return True
        else:
            return False

    def app_reset(self, packagename):
        '''
        清空应用数据，慎用
        '''
        cmd = "pm clear %s" % packagename
        return self.run_shell(cmd)

    def pkg_has_installed(self, pkg_name):
        lines = self.run_shell("pm list packages").split('\n')
        for line in lines:
            ls = line.split(":")
            if len(ls) == 2 and pkg_name == ls[1].strip():
                return True
        else:
            return False

    def stop_app(self, pkg_name):
        return self.run_shell("am force-stop %s" % pkg_name)

    def start_app(self, pkg_name, cls_name, option="-W -n", extra=""):
        '''
        :param extra: 如果传入extra参数，那么option必须包含"-W -n"
        '''
        if cls_name.startswith("com"):
            outputs = self.run_shell("am start %s %s/%s %s" % (option, pkg_name, cls_name, extra))
        else:
            if not cls_name.startswith("."):
                cls_name = "." + cls_name
            outputs = self.run_shell("am start %s %s/%s %s" % (option, pkg_name, cls_name, extra))
        logger.debug(outputs)
        lines = outputs.split("\n")

        for line in lines:
            logger.info(line)
            if "Status: ok" in line or "as been brought to the front" in line or "intent has been delivered to currently running top-most instance" in line:
                return True
        else:
            return False

    def restart_app(self, pkg_name, cls_name):
        self.stop_app(pkg_name)
        time.sleep(2)
        self.start_app(pkg_name, cls_name)

    def start_service(self, pkg_name, cls_name):
        if pkg_name.startswith(cls_name):
            outputs = self.run_shell("am startservice --user 0  %s/%s" % (pkg_name, cls_name))
        else:
            if not cls_name.startswith("."):
                cls_name = "." + cls_name
            outputs = self.run_shell("am startservice --user 0 %s/%s" % (pkg_name, cls_name))
        logger.debug(outputs)
        lines = outputs.split("\n")
        for line in lines:
            if "Status: ok" in line:
                return True
        else:
            return False

    def open_activity(self, activity):
        return self.run_shell("am start %s"%activity)

    def get_cpu_rate(self, *pkg_names):
        output = self.run_shell("dumpsys cpuinfo")
        ls = re.split(r"[\r\n]+", output)
        r = re.compile(r'([\.\d]+)%')
        cmd_line_reg = r".*?(?P<all>[\.\d]+)%\s+(?P<pid>\d+)/(?P<name>.*)?:\s+(?P<user>[\.\d]+)%\s+user.*?(?P<kernel>[\.\d]+)%\s+kernel.*"
        ret = {}
        for line in ls:
            for pkg_name in pkg_names:
                if pkg_name in line:
                    m = re.match(cmd_line_reg, line)
                    if m and m.group('name') == pkg_name:
                        ret[pkg_name] = float(m.group(1))
        return ret

    def get_mem_used(self, *pkg_names):
        ret = {}
        for pkg_name in pkg_names:
            output = self.run_shell("dumpsys meminfo %s" % pkg_name)
            r = re.compile(r'TOTAL\s+(\d+)')
            r2 = re.compile(r"size:\s+\S+\s+\S+\s+\S+\s+(\d+)")
            ls = re.split(r"[\r\n]+", output)
            used = 0
            for line in ls:
                m = r.search(line)
                m2 = r2.search(line)
                if m:
                    used = int(m.group(1))/1024
                elif m2:
                    used = int(m2.group(1))/1024
            ret[pkg_name]= used
        return ret

    def get_mem_used_native(self, *pkg_names):
        ret = {}
        for pkg_name in pkg_names:
            output = self.run_shell("dumpsys meminfo %s" % pkg_name)
            r1 = re.compile(r'TOTAL\s+(\d+)')
            r2 = re.compile(r"size:\s+\S+\s+\S+\s+\S+\s+(\d+)")
            r3 = re.compile(r'Native Heap\s+(\d+)') #Native Heap
            r4 = re.compile(r'Java Heap:\s+(\d+)')  #Dalvik Heap
            r5 = re.compile(r'Graphics:\s+(\d+)')  # Graphics:反应webview
            r7 = re.compile(r'Private Other:\s+(\d+)')  # Private Other:其他未分类
            r6 = re.compile(r'Code:\s+(\d+)')  # code：dex、so之类
            ls = re.split(r"[\r\n]+", output)
            used = 0
            native_used = 0
            dalvik_used = 0
            graphics_used = 0
            code_used = 0
            other_used = 0
            for line in ls:
                m1 = r1.search(line)
                m2 = r2.search(line)
                m3 = r3.search(line)
                m4 = r4.search(line)
                m5 = r5.search(line)
                m6 = r6.search(line)
                m7 = r7.search(line)
                if m1:
                    used = int(m1.group(1))/1024
                elif m2:
                    used = int(m2.group(1))/1024
                if m3:
                    native_used = int(m3.group(1))/1024
                if m4:
                    dalvik_used = int(m4.group(1))/1024
                if m5:
                    graphics_used = int(m5.group(1))/1024
                if m6:
                    code_used = int(m6.group(1))/1024
                if m7:
                    other_used = int(m7.group(1))/1024

            ret[pkg_name] = []
            ret[pkg_name].append(used)
            ret[pkg_name].append(native_used)
            ret[pkg_name].append(dalvik_used)
            ret[pkg_name].append(graphics_used)
            ret[pkg_name].append(code_used)
            ret[pkg_name].append(other_used)
        return ret

    def get_vmsize(self, *pkg_names):
        ret = {}
        ret_before = {}
        for pkg_name in pkg_names:

            pid = self.get_android_pid(pkg_name)
            if pid:
                output = self.run_shell("cat /proc/%s/status" % (pid))
                r = re.compile(r'VmSize:\s+(\d+)')
                ls = re.split(r"[\r\n]+", output)
                vmsize =0
                for line in ls:
                    m = r.search(line)
                    if m:
                        vmsize = int(m.group(1))/1024
                ret[pkg_name] = vmsize
        return ret

    def get_fps_rate(self, *pkg_names):
        """
        获取fps
        :return:
        """
        j = 0
        fps_data_list = {}
        fps_data = 0
        output = self.run_shell("dumpsys SurfaceFlinger --list | grep \"com.tencent.mm/com.tencent.mm.plugin.appbrand.ui.AppBrandUI\"") #获取当前页面

        ls = re.split(r"[\r\n]+", output)
        # logger.info(ls)
        current_windows = "com.tencent.mm/com.tencent.mm.plugin.appbrand.ui.AppBrandUI#0"
        # logger.info(current_windows)
        get_data = self.run_shell("dumpsys SurfaceFlinger --latency %s"%(current_windows))
        # logger.info(get_data)
        if(len(get_data.split()) >1):
            get_result = get_data.split()
            # logger.info(get_result)
            end_time = get_result[-2]
            start_time = get_result[2]
            cost_time = int(end_time)-int(start_time)
            # logger.info(cost_time)
            if not cost_time ==0:
                fps_data =126000000000/cost_time
            # logger.info(fps_data)
            # logger.info(get_result[-2])
            # logger.info(get_result[2])
       # for pkg_name in pkg_names:
            fps_data_list["com.tencent.mm:appbrand0"]= fps_data
            fps_data_list["com.tencent.mm:appbrand1"] = 0
            #logger.info(fps_data_list)
            # for i in get_data:
            #     logger.info(i)
            #     j = j + 1
            #     if j==2:
            #         start_time = i.split()[1]
            #         logger.info("start time %s" %(start_time))
            #     if j==128:
            #         end_time = i.split()[1]
            #         logger.info("end_time %s" % (end_time))
            self.run_shell("dumpsys SurfaceFlinger --latency-clear")
        return fps_data_list

    def clearbuffer(self):
        output = self.run_adb("shell dumpsys SurfaceFlinger --latency-clear")
        if not output:
            return True
        else:
            return None

    def get_fps(self, currentview=""):
        output = self.run_adb("shell dumpsys SurfaceFlinger --latency " + currentview)
        lines = [line.strip() for line in output.strip().split("\n")]
        return lines

    def get_mem_info(self):
        output = self.run_shell("cat /proc/meminfo")
        m_total = re.search(r"MemTotal:\s+(\d+)\s*(\w+)", output)
        m_free = re.search(r"MemFree:\s+(\d+)\s*(\w+)", output)
        max_mem = 0
        free_mem = 0
        if None != m_total:
            max_mem = int(m_total.group(1))
            unit = m_total.group(2)
            if unit.upper() == "KB":
                max_mem /= 1024
        if None != m_free:
            free_mem = int(m_free.group(1))
            unit = m_free.group(2)
            if unit.upper() == "KB":
                free_mem /= 1024
        return max_mem, free_mem

    def ping(self, ip, num=10):
        outputs = self.run_shell("ping -c %d %s" % (num, ip))
        logger.debug(outputs)
        lines = outputs.split("\n")
        r = "(?P<num>\d+) packets.*(?P<received>\d+)\s+received, .*time (?P<costs>\d+)ms"
        for l in lines:
            m = re.match(r, l)
            if m:
                return int(m.group("num")), int(m.group("received")), int(m.group("costs"))
        return -1, -1, -1

    # ======================================================================================================
    # 底层命令
    # ======================================================================================================
    def run_shell(self, cmd, sync=True, timeout_sec=30):
        cmd = " shell " + cmd

        return self.run_adb(cmd, sync, timeout_sec=timeout_sec)

    def run_shel_for_quick(self, cmd, sync=True, timeout_sec=30):
        cmd = " shell " + cmd

        click_time = self.run_adb_for_quick(cmd, sync, timeout_sec=timeout_sec)
        logger.info(click_time)
        return click_time

    def broadcast(self, action, params=None):
        if params is None:
            params = {}
        s = []
        for k, v in params.items():
            if isinstance(v, int):
                s.append("--ei %s %s" % (k, v))
            else:
                s.append("-e %s %s" % (k, v))
        self.run_shell("am broadcast -a %s %s" % (action, ' '.join(s)))

    def wait_connect(self, timeout=60):
        """
        等待设备在线
        :param timeout:
        :return:
        """
        t = time.time()
        while time.time() - t < timeout:
            if self._serial in get_device_ids():
                return True
            time.sleep(1)

    def run_adb(self, cmd, sync=True, timeout_sec=30):
        """
        运行命令: adb xxxxx
        - cmd: str || list
        """
        if not self._is_connected:
            raise AdbDisconnectedError("adb has disconnected")
        if isinstance(cmd, list):
            _cmd = []
            if magic.is_windows():
                for c in cmd:
                    _cmd.append(re.sub(r"([\|\^&])", lambda m: "^" + m.group(0) , c))  # |^&在windows中属于特殊字符，不能直接传参数
            else:
                _cmd = cmd
            cmd = re.split(r"\s+", self.prefix().strip()) + _cmd
        else:
            cmd = self.prefix() + (re.sub(r"([\|\^&])", lambda m: "^" + m.group(0) , cmd) if magic.is_windows() else cmd)  # |^&在windows中属于特殊字符，不能直接传参数
        return self._run(cmd, sync, timeout_sec)

    def run_adb_for_quick(self, cmd, sync=True, timeout_sec=30):
        """
        运行命令: adb xxxxx
        - cmd: str || list
        """

        cmd = self.prefix() + cmd
        t = time.time()
        logger.info(t)
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        tt = time.time()
        logger.info(tt)

        def _cb(p):
            logger.error("timeout %s", cmd)
            p.kill()
        timer = threading.Timer(timeout_sec, _cb, [proc])
        try:
            timer.start()
            return proc.communicate()
        finally:
            timer.cancel()
            return  tt

    def get_current_processes(self):
        outputs = self.run_shell("ps")
        processes = {}
        lines = outputs.replace("\r\n", "\n").split("\n")
        r = re.compile(r"\s+")
        for line in lines[1:]:
            line = line.strip()
            if line:
                ls = r.split(line)
                pid = int(ls[1])
                process = {
                    "pid": pid,
                    "ppid": int(ls[2]),
                    "name": ls[-1]
                }
                processes[pid] = process
        return processes

    def push(self, local, remote):
        if not os.path.exists(local):
            raise AtError("no local file:"+local)
        cmd = "push %s %s" % (local, remote)
        outputs = self.run_adb(cmd)
        if "failed" in outputs:
            return False
        else:
            return True

    def compare_push(self, path, path_in_android):
        if not os.path.exists(path):
            raise AtError("no local file:"+path)
        if self.file_exists(path_in_android):
            local_minitouch_size = int(os.path.getsize(path))
            file_size = self.file_size(path_in_android)
            if local_minitouch_size == file_size:
                logger.debug("exists skipped")
                return False
        self.push(path, path_in_android)
        return True

    def delete(self, remote, opt=""):
        # self.assert_file_exists(remote)
        cmd = "shell rm %s %s" % (opt, remote)
        return self.run_adb(cmd)

    def pull(self, remote, local):
        if local is None:
            local = os.getcwd()
        parent_directory = os.path.dirname(local)
        if not os.path.exists(parent_directory) and parent_directory.strip():
            os.makedirs(parent_directory)
        if not self.file_exists(remote):
            return False
        else:
            cmd = "pull %s %s" % (remote, local)
            outputs = self.run_adb(cmd)
            if "failed" in outputs or "error" in outputs:
                return False
            return True

    def get_sdcard_path(self):
        if self._sdcard_path is not None:
            return self._sdcard_path
        if self._serial == "f47bd83d":
            self._sdcard_path = "/storage/emulated/0"
        else:
            output = self.run_shell(" echo $EXTERNAL_STORAGE")
            if output is not None and output.strip():
                self._sdcard_path = output.strip()
            else:
                self._sdcard_path = "/sdcard"
        logger.info("sdcard:"+self._sdcard_path)
        return self._sdcard_path

    def get_file_modifytime(self, remote, is_directory=False):
        self.assert_file_exists(remote)
        if is_directory:
            opt = "-ld"
        else:
            opt = "-l"
        output = self.run_shell("ls %s %s" % (opt, remote))
        ls = output.split("\n")
        if len(ls) > 1:
            raise AdbException("%s is directry"%remote)
        m = re.search(r"\d+\-\d+\-\d+\s+\d+:\d+", output)
        if m is None:
            raise AdbException("unknow output:"+output)
        return m.group()

    def screen_cap(self, filename):
        screen_path = self.get_sdcard_path() + "/mmtest/screenshot"
        cmd = "mkdir -p "+screen_path
        self.run_shell(cmd)
        filename = os.path.basename(filename)
        filename = screen_path + "/" + filename
        cmd = "screencap -p "+filename
        self.run_shell(cmd)
        return filename

    def screen_record(self, filename, max_time, sync=True):
        screen_path = self.get_sdcard_path() + "/mmtest/record"
        cmd = "mkdir -p "+screen_path
        self.run_shell(cmd)
        filename = screen_path +"/" + filename
        cmd = "screenrecord --time-limit %s %s"%(max_time, filename)
        self.run_shell(cmd, sync)
        return filename

    @at.utils.decorator.cost_log
    def install(self, filename, opt="-r", uninstall_when_imcompatible=True):
        apk_info = at.utils.apkinfo.ApkInfo(filename)
        dumpsys = AdbDumpSys(self.serial)
        package_info = dumpsys.package(apk_info.pkg)
        # filename 路径上可能存在空格，不能直接使用string的形式
        # cmd = " install %s %s" % (opt, filename)
        cmd = ["install", *re.split(r"\s+", opt), filename]
        output = self.run_adb(cmd, True, 5*60)
        output += str(self._error_msg)
        if "Success" not in output:
            if "INSTALL_FAILED_UPDATE_INCOMPATIBLE" in output and uninstall_when_imcompatible:
                self.uninstall(apk_info.pkg)
                output = self.run_adb(cmd, True, 180)
                output += str(self._error_msg)
                if "Success" not in output:
                    if "Could not access the Package Manager" in output:
                        raise CanNotAccessToPackageManager(output)
                    logger.error(output)
                    return False
            else:
                logger.error(output)
                return False
        s = time.time()
        while time.time() - s < 300:
            current_package_info = dumpsys.package(apk_info.pkg)
            if package_info is None:
                if current_package_info is not None and current_package_info.is_first_install():
                    logger.info("install success, first install")
                    return True
            else:
                if current_package_info is not None:
                    if current_package_info.lastUpdateTime != package_info.lastUpdateTime:
                        return True
            time.sleep(1)
        logger.info("install timeout...")
        return False

    def push_install(self, filename, option="-r"):
        name = os.path.basename(filename)
        remote_path = "/sdcard/%s" % name
        self.push(filename, remote_path)
        output = self.run_shell("pm install %s %s" % (option, remote_path))
        if "Success" not in output:
            self.set_error(output)
            logger.error(output)
            return False
        else:
            return True

    def force_install(self, filename):
        cmd = " install -r -d "+filename
        output = self.run_adb(cmd)
        if "Success" not in output:
            self.set_error(output)
            logger.error(output)
            return False
        else:
            return True

    def uninstall(self, pkg_name):
        cmd = "uninstall "+pkg_name
        output = self.run_adb(cmd)
        return output

    def screen(self, local, display_id=None):
        if display_id is not None:
            raw_data = self.run_shell("screencap -d %d -p" % display_id)
            raw_data = raw_data.replace(self.line_breaker, b"\n")
            f = open(local, "wb")
            f.write(raw_data)
            f.close()
        else:
            filename = self.get_device_timefile()+".png"
            remote = self.screen_cap(filename)
            self.pull(remote, local)
            return filename

    def get_device_timefile(self):
        return self.get_device_time("%Y_%m_%d__%H_%M_%S")

    def get_device_time(self, fmt="%Y%m%d"):
        cmd = ' date "+%s"' % fmt
        return self.run_shell(cmd).strip()

    def get_time_delta(self):
        """
        近似计算运行的电脑跟手机直接的时间差值，电脑时间-手机时间
        :return:
        """
        fmt = "%Y%m%d %H:%M:%S"
        pc_now = datetime.datetime.now()
        ds = self.get_device_time(fmt)
        mobile_now = datetime.datetime.strptime(ds, fmt)
        return pc_now - mobile_now

    def pull_installed_apk(self, pkg, pc_path):
        output = self.run_shell("pm path %s" % pkg)
        path = output.strip().split(":")[-1]
        if not path:
            return False
        else:
            return self.pull(path, pc_path)

    def assert_file_exists(self, filename):
        output = self.run_shell(" ls "+filename )
        if "No such" in output:
            raise AdbException(output)

    def file_exists(self, filename):
        output = self.run_shell(" ls "+filename)
        if "No such" in output or "No such" in self._error_msg:
            return False
        else:
            return True

    def file_size(self, filepath):
        out = self.run_shell("stat -c %s {0}".format(filepath))
        if out.isdigit():
            file_size = int(out)
        else:
            file_size = 0
        return file_size

    def get_newest_filename(self, remote_dir):
        """取指定目录下最新生成的文件"""
        self.assert_file_exists(remote_dir)
        output = self.run_shell('ls ' + remote_dir + ' -t | head -1')
        return output.strip() if output and output.strip() else None

    def apk_install_info(self, pkgname):
        output = self.run_shell("pm path com.tencent.mm")
        m = re.search(r"(/\S+)+", output)
        path = m.group()
        logger.info("apk path:"+path)
        output = self.run_shell("ls -l "+path)
        m = re.search(r"\d+", output)
        return m.group(), self.get_file_modifytime(path)

    @decorator.cached_property
    def is_wetest_custom_device(self):
        model = self.get_property("ro.product.model")
        if model and "wetest" in model.lower():
            # WeTest定制手机
            return True
        return False

    @decorator.cached_property
    def is_emulator(self):
        """
        判断是否是模拟器
        :return: 
        """
        if self.is_wetest_custom_device:
            return False
        qemu = self.get_property("ro.kernel.qemu")
        if qemu and qemu != '0':
            return True
        else:
            return False

    @decorator.cached_property
    def line_breaker(self):
        if self.sdk_version >= 24:
            line_breaker = os.linesep
        else:
            line_breaker = '\r' + os.linesep
        return line_breaker.encode("ascii")

    def check_installed_apk(self, pkg, apk_path, install=False):
        """
        检查安装的apk的版本是否匹配
        :param pkg: 对比的apk的包名
        :param apk_path: 对比的apk路径
        :param install:  如果不匹配，是否重新安装
        :return:
        """
        temp_dir = tempfile.gettempdir()
        temp_apk_path = os.path.join(temp_dir, "temp.apk")
        ret = False
        if self.pull_installed_apk(pkg, temp_apk_path):
            if at.utils.apkinfo.ApkInfo(apk_path) != at.utils.apkinfo.ApkInfo(temp_apk_path):
                if install:
                    ret = self.install(apk_path)
            else:
                ret = True
        else:
            logger.debug("%s not installed", pkg)
            if install:
                ret = self.install(apk_path)
        logger.info("%s check result:%s", pkg, ret)
        if os.path.exists(temp_apk_path):
            os.remove(temp_apk_path)
        return ret

    def push_media(self, src_file_path, dest_file_path):
        '''
        src_path, dest_path 都是完整的文件全路径
        '''
        self.push(src_file_path, dest_file_path)
        self.broadcast("android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file://%s" % dest_file_path)

    def push_medias(self, src_dir_path, dest_dir_path):
        """
        推送图片视频文件夹到手机
        :param src_dir_path: 本地目录
        :param dest_dir_path: 手机上的目录
        :return:
        """
        f_list = []
        for root, dirs, filenames in os.walk(src_dir_path):
            for f in filenames:
                f_list.append(os.path.join(root, f))
        for src_f in f_list:
            f_name = os.path.basename(src_f)
            dest_f = os.path.join(dest_dir_path, f_name)
            self.push_media(src_f, dest_f)


if "__main__" == __name__:
    adb = AdbWrap.apply_adb(None)
    print(adb.get_current_activity2())
    # print adb.install("/Users/mmtest/code/MMWebTest/at/bin/AtServer.apk")
