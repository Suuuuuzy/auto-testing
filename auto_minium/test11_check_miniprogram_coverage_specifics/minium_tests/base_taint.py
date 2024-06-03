import minium_tests.base_case as base_case
import minium
from collections import namedtuple
from typing import Dict, List

'''
PS: selector 仅支持下列语法:

ID选择器: #the-id
class选择器(可以连续指定多个): .a-class.another-class
标签选择器: view
子元素选择器: .the-parent > .the-child
后代选择器: .the-ancestor .the-descendant
跨自定义组件的后代选择器: custom-element1>>>.custom-element2>>>.the-descendant
custom-element1 和 .custom-element2必须是自定义组件标签或者能获取到自定义组件的选择器
多选择器的并集：#a-node, .some-other-nodes
xpath: 可以在真机调试的wxml pannel选择节点->右键->copy->copy full xpath获取，暂不支持[text()='xxx']这类xpath条件
'''
SelectorInfo = namedtuple('SelectorInfo', ['selector', 'inner_text', 'text_contains', 'value'])

class BaseTaint(base_case.BaseCase):
    """
    封装公用页面基础操作方法
    """
    def get_element_using_selector(self, selector_info):
        return self.page.get_element(
            selector=selector_info.selector, 
            inner_text=selector_info.inner_text, 
            text_contains=selector_info.text_contains, 
            value=selector_info.value)

    def input_text_helper(self, default_text, class_name):
        POTENTIAL_IDENTIFIER_AND_INPUT = {'电话' : '13880000000',
                                          '手机':'13880000000',
                                          'phone':'13880000000',
                                          'mobile':'13880000000',
                                          '邮箱': 'string_sample@163.com',
                                           'email':'string_sample@163.com'}
        for (ident, input_text) in POTENTIAL_IDENTIFIER_AND_INPUT.items():
            if (class_name.lower()).find(ident) != -1:
                return input_text
        return default_text

    def hook_wx_methods_with_formelement_binds(
        self,
        element: minium.BaseElement,
        input_text: str,
        wx_methods: List[str],
        is_form: bool = False
    ) -> Dict[str, any]:
        """
        this function hoods a method used by a form via bindsubmit

        Args:
        ele (minium.BaseElement) : the element of interest
        input_text (str) : the text inputed to each block of the form
        wx_methods (list[str]): the list of wx methods to be tested
        is_form (bool) : identifier for whether this is a form element or input element

        Returns:
        Dict[str, any]: a dictionary of all the instances where an arg 
        passes into the wx api method
        """
        callback_arr = {}
        return_arr = {}
        for wx_method in wx_methods:
            callback_arr[wx_method] = minium.Callback()
            self.app.hook_wx_method(
                wx_method, callback=callback_arr[wx_method].callback
            )

        if is_form:
            all_inputs = element.get_elements("input")
            input_args = {}
            if len(all_inputs) == 0:
                print("unable to find any input. Submit attempt failed")
            else:
                print(f"the current form has {len(all_inputs)} fields")
                for input_ele in all_inputs:
                    class_name = input_ele.attribute("name")[0]
                    input_args[class_name] = self.input_text_helper(input_text, class_name)
            print(f'here is the input argumets: {input_args}')
            element.trigger("submit", {"value": input_args})
        else:
            element.trigger('change', {'value': input_text})

        for wx_method in wx_methods:
            if callback_arr[wx_method].wait_called(timeout=5) is True:
                return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
            else:
                return_arr[wx_method] = None
            self.app.release_hook_wx_method(wx_method)

        return return_arr

    def hook_wx_methods_with_element_tap(
        self,
        element: minium.BaseElement,
        wx_methods: List[str]
    ) -> Dict[str, any]:
        
        # called = threading.Semaphore(0)  # 信号量
        # callback_args = None

        # def callback(args):
        #     nonlocal callback_args
        #     called.release()
        #     callback_args = args
        
        callback_arr = {}
        return_arr = {}
        for wx_method in wx_methods:
            # callback_arr[wx_method] = {}
            # callback_arr[wx_method]['before'] = minium.Callback()
            # callback_arr[wx_method]['after'] = minium.Callback()
            callback_arr[wx_method] = minium.Callback()
            # print('callback identified')
            # print(callback_arr[wx_method]['before'], callback_arr[wx_method]['after'],  callback_arr[wx_method]['callback'])
            self.app.hook_wx_method(wx_method, 
                                    # before=callback_arr[wx_method]['before'],
                                    # after=callback_arr[wx_method]['after'],
                                    callback=callback_arr[wx_method])
        # callback = minium.Callback()
        # self.app.hook_wx_method('chooseInvoiceTitle', callback=callback)
        element.tap()

        # self.app.call_wx_method('chooseInvoiceTitle', args={"success": None})

        # if callback.wait_called(timeout=10) is True:
        #     return_arr = callback.get_callback_result()
        #     print('got it!')
        # else: 
        #     return_arr = None
        #     print('not very workinggggg')

        for wx_method in wx_methods:
        #     if callback_arr[wx_method]['before'].wait_called(timeout=10) is True and callback_arr[wx_method]['after'].wait_called(timeout=10) is True and callback_arr[wx_method]['callback'].wait_called(timeout=10) is True:
            if callback_arr[wx_method].wait_called(timeout=10) is True:
                return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
            else:
                return_arr[wx_method] = None
        # is_called = called.acquire(timeout=10)
            self.app.release_hook_wx_method(wx_method)

        return return_arr

    def hook_wx_methods_with_page_defined_method_call(
        self,
        wx_methods: List[str],
        page_defined_method: str,
        method_args: Dict[str, any]
    ) -> Dict[str, any]:
        
        callback_arr = {}
        return_arr = {}
        for wx_method in wx_methods:
            # callback_arr[wx_method] = {}
            # callback_arr[wx_method]['before'] = minium.Callback()
            # callback_arr[wx_method]['after'] = minium.Callback()
            callback_arr[wx_method] = minium.Callback()
            # print('callback identified')
            # print(callback_arr[wx_method]['before'], callback_arr[wx_method]['after'],  callback_arr[wx_method]['callback'])
            self.app.hook_wx_method(wx_method, callback=callback_arr[wx_method])
        # callback = minium.Callback()
        # self.app.hook_wx_method('chooseInvoiceTitle', callback=callback)
        # element.tap()
        self.app.current_page.call_method(page_defined_method, [method_args])

        # self.app.call_wx_method('chooseInvoiceTitle', args={"success": None})

        # if callback.wait_called(timeout=10) is True:
        #     return_arr = callback.get_callback_result()
        #     print('got it!')
        # else: 
        #     return_arr = None
        #     print('not very workinggggg')

        for wx_method in wx_methods:
            # if callback_arr[wx_method]['before'].wait_called(timeout=10) is True and callback_arr[wx_method]['after'].wait_called(timeout=10) is True and callback_arr[wx_method]['callback'].wait_called(timeout=10) is True:
            if callback_arr[wx_method].wait_called(timeout=10) is True:
                return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
            else:
                return_arr[wx_method] = None
            self.app.release_hook_wx_method(wx_method)
        # is_called = called.acquire(timeout=10)
        # self.app.release_hook_wx_method('chooseInvoiceTitle')

        return return_arr


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
            self.assertTrue(callback_arr[wx_method].wait_called(timeout=5), "true")

        return_arr = [
            callback_arr[wx_method].get_callback_result() for wx_method in wx_methods
        ]
        return return_arr


## ...