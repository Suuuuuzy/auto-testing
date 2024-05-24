import minium_tests.base_case as base_case
import minium
from typing import Dict, List


class BaseTaint(base_case.BaseCase):
    """
    封装公用页面基础操作方法
    """

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
                    input_args[input_ele.attribute("name")[0]] = input_text
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