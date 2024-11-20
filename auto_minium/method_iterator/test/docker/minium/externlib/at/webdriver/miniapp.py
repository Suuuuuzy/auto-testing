#!/usr/bin/env python3
# Created by xiazeng on 2020/5/27
import logging
import at.utils.decorator
import at.webdriver.driver as driver
import at.webdriver.tabwebsocket as tabwebsocket


class MiniApp:
    def __init__(self, at_instance, remote_port_name):
        """
        对小程序的封装
        :type at_instance: at.At
        :param remote_port_name:
        """
        self.at = at_instance
        self.port = driver.pick_unuse_port()
        self.remote_port_name = remote_port_name
        self.adb = at_instance.adb
        self.adb.forward_name(f"tcp:{self.port}", f"localabstract:{remote_port_name}")

    def __del__(self):
        self.adb.forward_remove(self.port)

    @at.utils.decorator.retry_in(30, 2)
    def get_current_page(self):
        chrome_tabs = driver.tabs(self.port)
        for tab in chrome_tabs:
            if tab and "title" in tab and tab["title"].endswith(":VISIBLE"):
                logging.info('find port: %s -> %s, with title: %s', self.remote_port_name, self.port, tab['title'])
                if "webSocketDebuggerUrl" not in tab:
                    raise RuntimeError("小程序调试websocket被占用")
                sock = tabwebsocket.TabWebSocket(tab["webSocketDebuggerUrl"])
                # __wxConfig是公共库的全局变量
                lib_version = sock.run_script_with_output("window.__wechatLibVersion__")
                logging.info("lib version:%s" % lib_version)
                return driver.WebPage(sock, self.at)
        return None
