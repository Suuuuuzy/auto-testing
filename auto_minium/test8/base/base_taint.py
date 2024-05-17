import base.base_page as base_page
import threading, minium
from typing import Tuple, Dict


class BaseTaint(base_page.BasePage):

    def onLoad_test_base(self, method: str, page: str) -> Tuple[bool, Dict]:
        """
        This function tests the onLoad lifecycle of a miniprogram page

        Args:
        method (str): the wx api function to be hooked
        page (str): the page of interest

        Returns:
        bool: a boolean indicating whether the method is called
        dict: if called, a dictionary of arguments being passed into the method
        """
        called = threading.Semaphore(0)  # 信号量
        callback_args = None

        def callback(args):
            nonlocal callback_args
            called.release()
            callback_args = args

        # hook wx API接口，获取回调后执行callback
        self.app.hook_wx_method(method, callback=callback)
        # 点击元素
        self.open_route(page)
        is_called = called.acquire(timeout=20)
        # 释放hook
        self.app.release_hook_wx_method(method)
        return is_called, callback_args
