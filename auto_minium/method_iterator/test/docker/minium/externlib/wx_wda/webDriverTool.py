#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       webDriverAgent.py
Create time:    2019/5/24 14:28
Description:

"""

import abc
import os
import socket
import subprocess
import re
import os.path
from sys import stderr
import requests
import time
import logging
import shutil
import platform
import psutil



logger = logging.getLogger()
isWindows = "Windows" in platform.platform()
WDA_REMOTE_PORT = "8100"
WDA_DEFAULT_IP = "127.0.0.1"


def exec_cmd(cmd):
    process = subprocess.Popen(
        cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, shell=True
    )
    return process.pid


def exec_iproxy(cmd):
    # 读不到输出, 不使用这个方法了
    logger.warning(cmd)
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    time.sleep(.5)
    if process.poll() is None:  # 还没退出, 当成功了
        return process.pid
    logger.warning(process.stdout.read())
    return None

def listen_iproxy_port(udid: str, port, remote_port="8100", local_ip=WDA_DEFAULT_IP):
    cmd = f"iproxy {port}:{remote_port} -u {udid} -s {local_ip}"
    return exec_iproxy(cmd)

def remove_iproxy_port(udid: str, port=None, remote_port=None):
    if not port:
        port = r"\d+"
    if not remote_port:
        remote_port = r"\d+"
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'iproxy':
            if not proc.info['cmdline']:
                continue
            cmdline = ' '.join(proc.info['cmdline'])
            if re.search(f"-u {udid}", cmdline) and re.search(f"{port}:{remote_port}", cmdline):
                logger.info(f"find match process: {proc.info['pid']}")
                proc.kill()

def get_tidevice_cmd_process(udid: str, cmd: str):
    procs = []
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        cmdline = proc.info['cmdline']
        if not cmdline:
            continue
        if len(cmdline) < 2:  # 参数不可能太小
            continue
        if cmdline[0].endswith("tidevice"):
            cmdline = ' '.join(cmdline)
        elif cmdline[1].endswith("tidevice"):
            cmdline = ' '.join(cmdline[1:])
        else:
            continue
        if re.search(f"-u {udid}", cmdline) and cmdline.find(cmd) >= 0:
            logger.info(f"find process: {proc.info['pid']}, cmdline: {cmdline}")
            procs.append(proc)
    return procs

def kill_tidevice_cmd(udid: str, cmd: str):
    procs = get_tidevice_cmd_process(udid, cmd)
    for proc in procs:
        logger.info(f"kill process: {proc.info['pid']}")
        proc.kill()

def remove_relay_port(udid: str, port=None, remote_port=None):
    if not port:
        port = r"\d+"
    if not remote_port:
        remote_port = r"\d+"
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        cmdline = proc.info['cmdline']
        if not cmdline:
            continue
        if len(cmdline) < 2:  # 参数不可能太小
            continue
        if cmdline[0].endswith("tidevice"):
            cmdline = ' '.join(cmdline)
        elif cmdline[1].endswith("tidevice"):
            cmdline = ' '.join(cmdline[1:])
        else:
            continue
        if re.search(f"-u {udid}", cmdline) and re.search(f"{port}\s+{remote_port}", cmdline):
            logger.info(f"find match process: {proc.info['pid']}")
            proc.kill()

def check_iproxy_port(udid: str, port, remote_port) -> bool:
    # 检查 iproxy 的映射是否已经建立
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'iproxy':
            if not proc.info['cmdline']:
                continue
            cmdline = ' '.join(proc.info['cmdline'])
            if re.search(f"-u {udid}", cmdline) and re.search(f"{port}:{remote_port}", cmdline):
                logger.info(f"find match process: {proc.info['pid']}")
                return True
    return False

def check_relay_port(udid: str, port, remote_port) -> bool:
    # 检查 iproxy 的映射是否已经建立
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        cmdline = proc.info['cmdline']
        if not cmdline:
            continue
        if len(cmdline) < 2:  # 参数不可能太小
            continue
        if cmdline[0].endswith("tidevice"):
            cmdline = ' '.join(cmdline)
        elif cmdline[1].endswith("tidevice"):
            cmdline = ' '.join(cmdline[1:])
        else:
            continue
        if re.search(f"-u {udid}", cmdline) and re.search(f"{port}\s+{remote_port}", cmdline):
            logger.info(f"find match process: {proc.info['pid']}")
            return True
    return False

def exec_cmd_until(cmd, expected_output):
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
    for line in iter(process.stdout.readline, b""):
        line = line.rstrip().decode("utf8")
        logger.debug(line)
        m = re.search(expected_output, line)
        if m:
            return process.pid, m.group(0)
    return process.pid, ""


def do_shell(command, print_msg=True):
    """
    执行 shell 语句
    :param command:
    :param print_msg:
    :return:
    """
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if print_msg:
        logger.debug(command)
    lines = []
    for line in iter(p.stdout.readline, b""):
        line = line.rstrip().decode("utf8")
        if print_msg:
            print(line)
        lines.append(line)
        if "ServerURLHere->http://" in line:
            # time.sleep(5)
            break
    return p.pid


IOS_DEVICES = {
    'i386': 'iPhone Simulator',
    'x86_64': 'iPhone Simulator',
    'iPhone3,1': 'iPhone 4',
    'iPhone3,3': 'iPhone 4 (Verizon)',
    'iPhone4,1': 'iPhone 4S',
    'iPhone5,1': 'iPhone 5 (GSM)',
    'iPhone5,2': 'iPhone 5 (GSM+CDMA)',
    'iPhone5,3': 'iPhone 5C (GSM)',
    'iPhone5,4': 'iPhone 5C (Global)',
    'iPhone6,1': 'iPhone 5S (GSM)',
    'iPhone6,2': 'iPhone 5S (Global)',
    'iPhone7,1': 'iPhone 6 Plus',
    'iPhone7,2': 'iPhone 6',
    'iPhone8,1': 'iPhone 6s',
    'iPhone8,2': 'iPhone 6s Plus',
    'iPhone8,3': 'iPhone SE (GSM+CDMA)',
    'iPhone8,4': 'iPhone SE (GSM)',
    'iPhone9,1': 'iPhone 7',
    'iPhone9,2': 'iPhone 7 Plus',
    'iPhone9,3': 'iPhone 7',
    'iPhone9,4': 'iPhone 7 Plus',
    'iPhone10,1': 'iPhone 8',
    'iPhone10,2': 'iPhone 8 Plus',
    'iPhone10,3': 'iPhone X',
    'iPhone11,2': 'iPhone XS',
    'iPhone11,4': 'iPhone XS Max',
    'iPhone11,6': 'iPhone XS Max',
    'iPhone11,8': 'iPhone XR',
    'iPhone12,1': 'iPhone 11',
    'iPhone12,3': 'iPhone 11 Pro',
    'iPhone12,5': 'iPhone 11 Pro Max',
    'iPhone12,8': 'iPhone SE 2',
    'iPhone13,1': 'iPhone 12 mini',
    'iPhone13,2': 'iPhone 12',
    'iPhone13,3': 'iPhone 12 Pro',
    'iPhone13,4': 'iPhone 12 Pro Max',
    'iPhone14,4': 'iPhone 13 mini',
    'iPhone14,5': 'iPhone 13',
    'iPhone14,2': 'iPhone 13 Pro',
    'iPhone14,3': 'iPhone 13 Pro Max',
    'iPad1,1': 'iPad 1',
    'iPad2,1': 'iPad 2 (WiFi)',
    'iPad2,2': 'iPad 2 (GSM)',
    'iPad2,3': 'iPad 2 (CDMA)',
    'iPad2,4': 'iPad 2 (WiFi)',
    'iPad2,5': 'iPad Mini (WiFi)',
    'iPad2,6': 'iPad Mini (GSM)',
    'iPad2,7': 'iPad Mini (GSM+CDMA)',
    'iPad3,1': 'iPad 3 (WiFi)',
    'iPad3,2': 'iPad 3 (GSM+CDMA)',
    'iPad3,3': 'iPad 3 (GSM)',
    'iPad3,4': 'iPad 4 (WiFi)',
    'iPad3,5': 'iPad 4 (GSM)',
    'iPad3,6': 'iPad 4 (GSM+CDMA)',
    'iPad4,1': 'iPad Air (WiFi)',
    'iPad4,2': 'iPad Air (GSM+CDMA)',
    'iPad4,4': 'iPad Mini Retina (WiFi)',
    'iPad4,5': 'iPad Mini Retina (GSM+CDMA)',
    'iPad4,6': 'iPad mini Retina (China)',
    'iPad4,7': 'iPad mini 3 (WiFi)',
    'iPad4,8': 'iPad mini 3 (GSM+CDMA)',
    'iPad4,9': 'iPad Mini 3 (China)',
    'iPad5,3': 'iPad Air 2 (WiFi)',
    'iPad5,4': 'iPad Air 2 (Cellular)',
    'iPad6,3': 'iPad Pro (9.7 inch, Wi-Fi)',
    'iPad6,4': 'iPad Pro (9.7 inch, Wi-Fi+LTE)',
    'iPad6,7': 'iPad Pro (12.9 inch, Wi-Fi)',
    'iPad6,8': 'iPad Pro (12.9 inch, Wi-Fi+LTE)'
  }

WDA_BUNDLE_NAMES = [
    r"com\.facebook\.WebDriverAgentRunner\.xctrunner",
    r"com\.facebook\.\S+\.xctrunner",
    r"com\.\S+\.WebDriverAgentRunner\.xctrunner",
    r"com\.\S+\.xctrunner",
]

class DeviceToolException(Exception):
    def __init__(self, value):
        self._value = value

    def __str__(self):
        return repr(self._value)


class DeviceTool(object):
    def __init__(self, udid=None):
        self.udid = udid
        if not self.udid:
            self.udid = self.get_default_udid()

    def exec_cmd(self, cmd, output=False) -> str:
        if output:
            process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                shell=True,
            )
            o = process.communicate()[0].strip()
            if isinstance(o, bytes):
                return str(o, encoding="utf-8")
            else:
                return str(o)
        else:
            subprocess.call(cmd, shell=True)

    def list_devices(self):
        cmd = "idevice_id -l"
        devices = self.exec_cmd(cmd, True)
        device_list = []
        if len(devices) != 0:
            device_list = devices.split("\n")
        return device_list

    def get_default_udid(self):
        devices = self.list_devices()
        if len(devices) == 0:
            raise DeviceToolException("没有设备连接...")

        return devices[0]

    def list_user_app(self):
        cmd = "ideviceinstaller -u %s -l -o list_user" % self.udid
        return self.exec_cmd(cmd, True)

    def get_property(self, key):
        cmd = "ideviceinfo -u %s -k %s" % (self.udid, key)
        return self.exec_cmd(cmd, True)

    @property
    def name(self):
        return self.get_property("DeviceName")

    @property
    def type(self):
        t = IOS_DEVICES.get(self.get_property("ProductType"))
        if t != None:
            return t
        else:
            return "unkown"

    @property
    def os_version(self):
        return self.get_property("ProductVersion")

    @property
    def region(self):
        return self.get_property("RegionInfo")

    @property
    def timezone(self):
        return self.get_property("TimeZone")

    @property
    def desc(self):
        return {
            "manu": "Apple",
            "name": self.name,
            "model": self.type,
            "version": self.os_version,
        }

    def find_app(self, bundle_id="com.tencent.xin"):
        ids = []
        ids_wetest = {}
        installed_apps = self.list_user_app()
        for id in installed_apps.split("\n"):
            if re.search("-", id):
                str = id[0 : id.find("-")].strip()
                ids.append(str)
            if re.search(",", id):
                str_wetest = id[0 : id.find(",")].strip()
                ids_wetest[str_wetest] = id.split(", ")[1][1:-1]

        if bundle_id in ids or bundle_id in ids_wetest.keys():
            logger.info(
                "检测到已安装 %s 版本的微信" % ids_wetest[bundle_id]
            ) if bundle_id in ids_wetest.keys() else logger.info("微信已安装...")
            return True
        else:
            logger.error("检测到设备未安装微信, 请前往 APP store 安装最新版微信...")
            return False

    def screenshot(self, filename):
        cmd = "idevicescreenshot -u %s '%s'" % (self.udid, filename)
        return self.exec_cmd(cmd, True)

    def get_crashes(self, dir, app_name="WeChat"):
        """
        获取指定app的crash文件列表
        比如：
            WeChat-2018-06-13-105022.ips (计入crash)
            WeChat.wakeups_resource-2018-06-13-005223.ips (使用资源太多太频繁才被系统kill, 不计入crash)
        """
        cmd = "idevicecrashreport -k -u %s %s" % (self.udid, dir)
        report = self.exec_cmd(cmd, True)
        result = []
        for line in report.split("\n"):
            if "%s-" % app_name in line:
                index = line.index("W")
                value = line[index:].strip()
                result.append(value)
        return result

    def remove_crashes(self, dir):
        cmd = "idevicecrashreport -u %s %s" % (self.udid, dir)
        return self.exec_cmd(cmd, True)


def pick_unuse_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("localhost", 0))
    addr, port = s.getsockname()
    s.close()
    return port

class WDARunner(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def __init__(self, device_id: str, *args, ip: str=WDA_DEFAULT_IP, remote_port: str=WDA_REMOTE_PORT) -> None:
        """初始化 runner

        :param str device_id: 设备 id
        :param str ip: wda服务IP, defaults to WDA_DEFAULT_IP
        :param str remote_port: 手机上 wda app 监听的端口, defaults to WDA_REMOTE_PORT
        """
        ...

    @abc.abstractmethod
    def pick_unuse_port(self):
        """更新一个未使用的端口"""
        ...

    @abc.abstractmethod
    def get_default_device(self):
        """获取默认 device id"""
        ...

    @abc.abstractmethod
    def listen_port(self, port=None, device_id=None, ip=None):
        """监听 wda 端口"""
        ...

    @abc.abstractmethod
    def remove_port(self, port=None):
        """移除监听的 wda 端口"""
        ...

    @abc.abstractmethod
    def iproxy_port(self, remote_port, port=None, device_id=None, ip=None):
        """使用 proxy 代理一个远程端口"""
        ...
        
    @abc.abstractmethod
    def remove_iproxy_port(self, remote_port):
        """移除监听的远程端口"""
        ...
        
    @abc.abstractmethod
    def remove_iproxy(self):
        """移除该设备所有的远程端口"""
        ...
        
    @abc.abstractmethod
    def start_driver(self):
        """启动 wda driver"""
        ...
        
    @abc.abstractmethod
    def run_xctest(self, print_msg=True) -> str:
        """运行 xctest"""
        ...
        
    @abc.abstractmethod
    def ping_driver(self, timeout=10) -> bool:
        """测试 driver 连通性"""
        ...
        
    @abc.abstractmethod
    def kill_driver(self):
        """关闭wda xctest"""
        ...
        
    @abc.abstractmethod
    def wait_for_driver_ready(self, timeout=100):
        """等待 wda driver 启动成功"""
        ...

    @abc.abstractmethod
    def listen_testsvr_port(self, port=None, device_id=None): ...

    @abc.abstractmethod
    def remove_iproxy_58765(self): ...

    @abc.abstractmethod
    def listen_mmui_port(self, port=None, device_id=None): ...

    @abc.abstractmethod
    def remove_iproxy_mmui(self): ...

    @abc.abstractmethod
    def find_app(self, bundle_id):
        """查找 app 是否已经安装"""
        ...

    
        

class WebDriverRunner(WDARunner):
    """基于 libmobiledevice"""
    def __init__(self, device_id: str, driver_path, port=8100, ip: str=WDA_DEFAULT_IP, remote_port: str=WDA_REMOTE_PORT) -> None:
        self.device = DeviceTool(device_id)
        self.device_id = self.device.udid
        self.driver_path = driver_path
        self.port = port
        self.iproxy_pid = None
        self.ip = ip or WDA_DEFAULT_IP
        self.remote_port = remote_port or WDA_REMOTE_PORT
        self.listen_port(port=self.port, device_id=self.device_id, ip=ip)

    def pick_unuse_port(self):
        self.port = pick_unuse_port()
        return self.port
    
    def get_default_device(self):
        return self.device.get_default_udid()

    def listen_port(self, port=None, device_id=None, ip=None):
        if not port:
            port = self.pick_unuse_port()
        self.iproxy_pid = self.iproxy_port(self.remote_port, port, device_id, ip)
        time.sleep(1)

    def remove_port(self, port=None):
        """移除监听的 wda 端口"""
        return remove_iproxy_port(self.device_id, port, remote_port=self.remote_port)

    def remove_iproxy(self):
        return remove_iproxy_port(self.device_id)
        
    def iproxy_port(self, remote_port, port=None, device_id=None, ip=None):
        if not port:
            port = pick_unuse_port()
        if not device_id:
            device_id = self.device_id
        if not ip:
            ip = WDA_DEFAULT_IP
        pid = listen_iproxy_port(device_id, port, remote_port, local_ip=ip)
        logger.info(f"[{pid}]iproxy {port}:{remote_port}")
        return pid
        
    def remove_iproxy_port(self, remote_port):
        return remove_iproxy_port(self.device_id, remote_port=remote_port)

    def listen_testsvr_port(self, port=None, device_id=None):
        self.iproxy_port(58765, port, device_id)

    def remove_iproxy_58765(self):
        self.remove_iproxy_port(58765)

    def listen_mmui_port(self, port=None, device_id=None):
        self.iproxy_port(59000, port, device_id)

    def remove_iproxy_mmui(self):
        self.remove_iproxy_port(59000)
        
    def start_driver(self):
        """后台运行 wda driver"""
        logger.info("driver_path: %s" % self.driver_path)
        if not self.driver_path:
            raise RuntimeError(f"未配置 wda 项目路径")
        driver_data_home = os.path.join(self.driver_path, self.device_id)
        if os.path.exists(driver_data_home):
            shutil.rmtree(driver_data_home)
        self.run_xctest()
        return
    
    def run_xctest(self, print_msg=True) -> str:
        base_cmd = "/Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild"
        cmd = (
            base_cmd
            + " -project {driver_path}/WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner"
            " -derivedDataPath {driver_path}/{device_id} -destination 'id={device_id}' test &"
        )
        cmd = cmd.format(driver_path=self.driver_path, device_id=self.device_id)
        p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        if print_msg:
            logger.warning(cmd)
        lines = []
        for line in iter(p.stdout.readline, b""):
            line = line.rstrip().decode("utf8")
            lines.append(line)
            if "ServerURLHere->http://" in line:
                """ServerURLHere->http://{ip}:{port}<-ServerURLHere"""
                logger.warning(line)
                return re.search(r"ServerURLHere->(\S+)<-ServerURLHere", line).group(1)
        return None

    def kill_driver(self):
        cmd = "pkill -f id=%s" % self.device_id
        exec_cmd(cmd)

    def ping_driver(self, timeout):
        url = "http://%s:%s/status" % (self.ip,  self.port)

        try:
            res = requests.get(url, timeout=timeout)
            if res.status_code == requests.codes.ok:
                logger.info("WebDriver在线")
                return True
        except:
            logger.info("获取不到Driver状态...")
            return False

    def wait_for_driver_ready(self, timeout=100):
        s = time.time()
        while time.time() - s < timeout:
            time.sleep(5)
            if self.ping_driver(10):
                break
        else:
            message = "%d秒后，仍获取不到Driver状态，请检查..." % timeout
            logger.error(message)
            raise RuntimeError(message)

    def find_app(self, bundle_id):
        """查找 app 是否已经安装"""
        return self.device.find_app(bundle_id)



class TIDevice(WDARunner):
    """基于 tidevice """
    def __init__(self, device_id: str, wda_bundle=None, port: str="8100", ip: str=WDA_DEFAULT_IP, remote_port: str=WDA_REMOTE_PORT) -> None:
        """
        :wda_bundle: wda的bundle id
        """
        self.device_id = device_id or self.get_default_device()
        if not self.device_id:
            raise RuntimeError("未检测到任何设备")
        self.wda_bundle = wda_bundle or self.get_wda_bundle_id()
        if not self.wda_bundle:
            raise RuntimeError("未检测到设备上的WebDriverAgentRunner, 请确认已经安装")
        self.port = port
        self.iproxy_pid = None
        self.ip = ip or WDA_DEFAULT_IP
        self.remote_port = remote_port or WDA_REMOTE_PORT
        # self.run_xctest()
        self.listen_port(self.port)

    def iproxy_port(self, remote_port, port=None, device_id=None, ip=None):
        """使用 proxy 代理一个远程端口"""
        if not port:
            port = pick_unuse_port()
        if not device_id:
            device_id = self.device_id
        if not ip:
            ip = WDA_DEFAULT_IP
        cmd = 'tidevice -u "{device_id}" relay {port} {remote_port}'
        cmd = cmd.format(port=port, device_id=device_id, remote_port=remote_port)
        pid = exec_cmd(cmd)
        logger.info(f"[{pid}]tidevice relay {port} {remote_port}")
        return pid

    def listen_port(self, port=None, device_id=None, ip=None):
        if not port:
            port = self.pick_unuse_port()

        self.iproxy_pid = self.iproxy_port(self.remote_port, port=port)
        time.sleep(1)

    def remove_port(self, port=None):
        """移除监听的 wda 端口"""
        return remove_relay_port(self.device_id, port, remote_port=self.remote_port)

    def remove_iproxy_port(self, remote_port):
        """移除监听的远程端口"""
        return remove_relay_port(self.device_id, remote_port=remote_port)

    def remove_iproxy(self):
        """移除该设备所有的远程端口"""
        return remove_relay_port(self.device_id)

    def ping_driver(self, timeout=10):
        """
        检查端口是不是一个wda proxy
        """
        try:
            session = requests.Session()
            session.trust_env = False  # localhost不需要代理
            session.get(f"http://{self.ip}:{self.port}/status", timeout=timeout)
        except requests.HTTPError as he:
            return False
        return True
    
    def wait_for_driver_ready(self, timeout=100):
        """等待 wda driver 启动成功"""
        s = time.time()
        while time.time() - s < timeout:
            time.sleep(5)
            if self.ping_driver(10):
                break
        else:
            message = "%d秒后，仍获取不到Driver状态，请检查..." % timeout
            logger.error(message)
            raise RuntimeError(message)

    def pick_unuse_port(self):
        self.port = pick_unuse_port()
        return self.port

    def exec_cmd(self, cmd, output=False):
        if output:
            process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                shell=True,
            )
            return process.communicate()[0].strip()
        else:
            subprocess.call(cmd, shell=True)

    def get_default_device(self):
        """
        获取默认设备id
        `tidevice list` return like `12308101-001A08903AA0023Y abc's iPhone12P`
        """
        output = self.exec_cmd("tidevice list", True)
        lines = output.decode("utf8").split("\n")
        if len(lines) == 0 or lines[0].strip() == "":
            return None
        for line in lines:
            udid = line.split(" ")[0]
            if udid != "UDID":
                return udid
            
    def list_user_app(self):
        """返回 app 列表
        `tidevice applist` return like `com.netease.cloudmusic 网易云音乐 6.4.6`
        """
        result = []
        cmd = "tidevice"
        if self.device_id:
            cmd += " -u %s" % self.device_id
        cmd += " applist"
        output = self.exec_cmd(cmd, True).decode("utf8")
        lines = output.split("\n")
        for line in lines:
            line = line.strip()
            if not line:
                continue
            re_match = re.match("(\S+)\s(.*)", line)
            if not re_match:
                continue
            bundle, name = re_match.groups()
            result.append([bundle, name])
        return result

    def get_wda_bundle_id(self):
        """
        如果没有传入wda_bundle, 可以通过applist识别可能的bundle id
        `tidevice applist` return like `com.netease.cloudmusic 网易云音乐 6.4.6`
        """
        apps = self.list_user_app()
        for reg in WDA_BUNDLE_NAMES:
            for app_bundle, name in apps:
                if re.match(reg, app_bundle):
                    logger.info(f"找到可能的 wda app: {app_bundle}, {name}")
                    return app_bundle
        logger.warning(f"未找到设备上安装的 wda")
        logger.warning("\n".join([", ".join(app) for app in apps]))
        return None

    def find_app(self, bundle_id):
        """查找 app 是否已经安装"""
        apps = self.list_user_app()
        for app_bundle, name in apps:
            if app_bundle == bundle_id:
                return True
        return False

    def run_xctest(self):
        # tidevice -u 00008101-001A08903AA0001E xctest --bundle_id "com.*.xctrunner"
        # check whether xctest running
        if not isWindows:
            procs = get_tidevice_cmd_process(self.device_id, "xctest")
            if procs:
                # 已经有在运行的了
                return True
        cmd = 'tidevice -u "{device_id}" xctest --bundle_id "{wda_bundle}"'
        cmd = cmd.format(device_id=self.device_id, wda_bundle=self.wda_bundle)
        pid, output = exec_cmd_until(cmd, r"(Launch failed|No app matches|WebDriverAgent start successfully)")
        if output == "Launch failed":
            raise Exception("Launch WebDriverAgent for xctest fail")
        elif output == "No app matches":
            raise Exception("Can't find app[%s], please ensure that you have install it" % self.wda_bundle)
        elif output == "WebDriverAgent start successfully":
            return True
        time.sleep(1)

    def start_driver(self):
        """后台运行 wda driver"""
        return self.run_xctest()

    def listen_testsvr_port(self, port=None, device_id=None):
        self.iproxy_port(58765, port, device_id)

    def remove_iproxy_58765(self):
        self.remove_iproxy_port(58765)

    def listen_mmui_port(self, port=None, device_id=None):
        self.iproxy_port(59000, port, device_id)

    def remove_iproxy_mmui(self):
        self.remove_iproxy_port(59000)

    def kill_driver(self):
        kill_tidevice_cmd(self.device_id, "xctest")


if __name__ == "__main__":
    runner = WebDriverRunner(
        device_id="00008020-000445EE3684002E",
        driver_path="/Users/sherlock/github/WebDriverAgent",
    )
    device = DeviceTool(udid="00008020-000445EE3684002E")
    device.find_app("com.tencent.xin")
