import base.base_case as base_case
import threading, minium
from typing import Dict, Optional, List


class BasePage(base_case.BaseCase):
    """
    封装公用页面基础操作方法
    """

    def hook_wx_method(self, method, selector):
        """
        封装hook wx API接口,获取回调
        :param method: API接口
        :param selector: 触发元素选择器
        :return: 信号量，回调信息
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
        self.page.get_element(selector).tap()
        is_called = called.acquire(timeout=10)
        # 释放hook
        self.app.release_hook_wx_method(method)
        return is_called, callback_args

    def Hook_current_page_method_base(
        self,
        page: str,
        method: str,
        callback: any = None,
        expected_callback: Optional[Dict] = None,
    ) -> None:
        """
        this function hooks and then calls a page-defined methods

        Args:
        page: the miniprogram page of interest
        method: the page-defined method to be hooked and called
        callback: the callback function to be used during hooking
        expected_callback: the argument passed into the function
        """

        if callback is None:
            callback = minium.Callback()

        self.open_route(page)

        self.app.hook_current_page_method(method, callback.callback)
        self.app.current_page.call_method(method, expected_callback)
        self.assertTrue(callback.wait_called(timeout=10), "callback called")
        if expected_callback:
            if isinstance(expected_callback, dict):
                self.assertDictEqual(
                    expected_callback, callback.get_callback_result(), "callback ok"
                )
            else:
                self.assertEqual(
                    expected_callback, callback.get_callback_result(), "callback ok"
                )
        self.app.release_hook_current_page_method(method)

    def Hook_wxmethod_within_current_page_method_base(
        self, page: str, method: str, wx_method: str, callback: any = None
    ) -> Dict[str, any]:
        """
        this function hoods a wx api method while calling a current page-defined method

        Args:

        page (str) : the miniprogram page of interest
        method (str) : the page-defined method to be called
        wx_method (str) : the wx api method to be hooked
        callback (any) : custom callback function used for hooking wx api method

        Returns:
        Dict : the dict of arguments passed to the wx api method
        """
        if callback is None:
            callback = minium.Callback()

        self.open_route(page)

        # self.app.hook_current_page_method(method, callback.callback)
        self.app.hook_wx_method(wx_method, callback=callback.callback)
        self.app.current_page.call_method(method)
        self.assertTrue(callback.wait_called(timeout=10), "callback called")
        # 释放hook
        self.app.release_hook_wx_method(method)
        return callback.get_callback_result()

    def Hook_method_inside_current_page_method_base(
        self, page: str, method_hooked: str, method_called: str, callback: any = None
    ) -> Dict[str, any]:
        """
        this function hoods a page-defined method while calling another page-defined method

        Args:

        page (str) : the miniprogram page of interest
        method_hooked (str) : the page-defined method to be hooked
        method_called (str) : the page_defined method to be called
        callback (any) : custom callback function used for hooking page-defined method

        Returns:
        Dict : the dict of arguments passed to the page-defined method
        """

        if callback is None:
            callback = minium.Callback()

        self.open_route(page)

        self.app.hook_current_page_method(method_hooked, callback.callback)
        self.app.current_page.call_method(method_called)
        self.assertTrue(callback.wait_called(timeout=10), "callback called")
        self.app.release_hook_current_page_method(method_hooked)
        return callback.get_callback_result()

    def Hook_method_with_form_input(
        self,
        form_ele: minium.BaseElement,
        input_text: str,
        bindsubmit_method: Optional[str] = None,
    ) -> List[Dict[str, any]]:
        """
        this function hoods a method used by a form via bindsubmit

        Args:

        form_ele (minium.BaseElement) : the element of interest
        input_text (str) : the text inputed to each block of the form
        bindsubmit_method (str) : the method binded to submit function,
        provided if not accessible through element itself

        Returns:
        List[Dict] : a list of all the instances where an arg passes into the wx api method
        (currently set to request)
        """

        print(form_ele)
        all_inputs = form_ele.get_elements("input")
        input_args = {}
        if len(all_inputs) == 0:
            print("unable to find any input. Submit attempt failed")
        else:
            print(f"the current form has {len(all_inputs)} fields")
            for input_ele in all_inputs:
                input_args[input_ele.attribute("name")[0]] = input_text

        if bindsubmit_method:
            callback = minium.Callback()

            # self.app.hook_current_page_method(bindsubmit_method, callback.callback)
            self.app.hook_wx_method("request", callback=callback.callback)
            form_ele.trigger("submit", {"value": input_args})

            arg_list = []
            max_iter = 10
            try:
                for _ in range(max_iter):
                    if callback.wait_called(timeout=10):
                        arg_list.append(callback.get_callback_result())
                    else:
                        break
                    # self.app.hook_wx_method("request", callback=callback.callback)
            except Exception as e:
                print(f"Ending request hook with error {e}")

            # 释放hook
            self.app.release_hook_wx_method("request")
            # self.app.release_hook_wx_method(bindsubmit_method)
            return arg_list

    def hook_multi_wx_method_via_method_base(
        self, method: str, wx_methods: List[str], page: str
    ) -> List[Dict[str, any]]:
        """
        this function hoods several wx methods via one page-defined method call

        Args:

        method (str) : the page-defined method to be called
        wx_methods (List[str]): a list of wx api methods to be hooked and monitored
        page (str) : the miniprogram page of interest

        Returns:
        List[Dict] : a list of all the instances of wx api methods passed args
        """
        self.open_route(page)
        callback_arr = {}
        for wx_method in wx_methods:
            callback_arr[wx_method] = minium.Callback()
            self.app.hook_wx_method(
                wx_method, callback=callback_arr[wx_method].callback
            )

        # 点击元素
        self.app.current_page.call_method(method)

        for wx_method in wx_methods:
            self.assertTrue(callback_arr[wx_method].wait_called(timeout=10), "true")

        return_arr = [
            callback_arr[wx_method].get_callback_result() for wx_method in wx_methods
        ]
        return return_arr


## ...
