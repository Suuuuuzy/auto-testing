import minium_tests.base_case as base_case
import minium, re
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

SelectorInfo = namedtuple('SelectorInfo', ['selector', 'inner_text', 'text_contains', 'value', 'xpath'])

BUBBLING_EVENTS : List[str] = [
            "longpress",
            "longtap",
            "tap",                # The finger leaves the screen after touch
            "transitionend",      # Triggered when a WXSS transition or wx.createAnimation animation ends
            "animationstart",     # Triggered when a WXSS animation starts
            "animationiteration", #  Triggered after an iteration of a WXSS animation ends
            "animationend",       # Triggered when a WXSS animation completes
            "touchstart",         # Finger touch starts
            "touchmove",          # Finger moves after touch
            "touchcancel",        # Finger touch is interrupted by call reminder, pop-up window, etc.
            "touchend",           # Finger touch ends
            "touchforcechange"    # Triggered when the screen is tapped again on an iPhone supporting 3D Touch.
]

class BaseTaint(base_case.BaseCase):
    """
    封装公用页面基础操作方法
    """
    
    def get_element_using_selector(self, selector_info : SelectorInfo):
        return self.page.get_elements(
            selector=selector_info.selector, 
            inner_text=selector_info.inner_text, 
            text_contains=selector_info.text_contains, 
            value=selector_info.value,
            xpath=selector_info.xpath)

    def find_element_from_json_data(self, 
                                    page : str,
                                    element_of_interest : Dict[str, any],
                                    text_contains_is_none : bool = False,
                                    xpath_is_none : bool = False):
    
        if (self.app.get_current_page() != page):
            print(f"currently at page {self.app.get_current_page()}, redirecting to {page}")
            self.open_route("/" + page)
            
        # 1. find selector
        # selector can be composed of tag name and classes
        selector : str = ''
        tag_name : str = element_of_interest['m_tag_name']
        selector += tag_name

        if 'id' in element_of_interest['m_attributes']:
            class_id : str = element_of_interest['m_attributes']['id']
            selector += '#' + class_id

        if 'class' in element_of_interest['m_attributes']:
            class_names : str = element_of_interest['m_attributes']['class']

            # split class names by white space
            class_name_list : List[str] = class_names.split(' ')

            # after splitting, need to make sure the class is not partially or completely script data
            # here use re to do the filtering
            filtered_class_list : List[str] = []
            script_data_pattern = re.compile(r'{{[\S]*}}')
            for class_name in class_name_list:
                match_flag = re.search(script_data_pattern, class_name)

                if match_flag is None:
                    filtered_class_list.append(class_name)
            
            for filtered_class in filtered_class_list:
                selector += '.' + filtered_class
            
        # 2. find inner text or text contains
        # text contains is almost always the safer choice
        text_contains : str | None = None
        for data_instance in element_of_interest['m_data']:
            script_data_pattern = re.compile(r'{{[\S]*}}')
            if re.search(script_data_pattern, data_instance) is None:
                text_contains = data_instance
                break
        
        # 3. get xpath
        xpath = element_of_interest['m_xpath']

        # construct selector_info:
        selector_instance : SelectorInfo = SelectorInfo(selector=selector, 
                                                        inner_text=None,
                                                        text_contains=None if text_contains_is_none is True else text_contains,
                                                        value=None,
                                                        xpath=None if xpath_is_none is True else xpath)
        
        return self.get_element_using_selector(selector_info=selector_instance)
    
    def is_bubbling_event(self, event_type : str) -> bool:
        return event_type in BUBBLING_EVENTS

    def hook_wx_methods_with_bubbling_event(
        self,
        page : str,
        event_type : str,
        element: minium.BaseElement,
        wx_methods: List[str]
    ) -> Dict[str, any]:
        
        if (self.app.get_current_page() != page):
            print(f"currently at page {self.app.get_current_page()}, redirecting to {page}")
            self.open_route("/" + page)

        callback_arr = {}
        return_arr = {}
        for wx_method in wx_methods:
            callback_arr[wx_method] = minium.Callback()
            self.app.hook_wx_method(wx_method, 
                                    callback=callback_arr[wx_method])

        if event_type == 'longpress':
            element.long_press()
        elif event_type == 'tap':
            element.tap()
        elif event_type == 'touchstart':
            element.touch_start()
        elif event_type == 'touchmove':
            element.touch_move()
        elif event_type == 'touchend':
            element.touch_end()
        else:
            print(f"bubbling event {event_type} not implemented")

        for wx_method in wx_methods:
            if callback_arr[wx_method].wait_called(timeout=10) is True:
                return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
            else:
                return_arr[wx_method] = None
            self.app.release_hook_wx_method(wx_method)
        
        self.app.navigate_back()

        return return_arr

    def hook_wx_methods_with_page_defined_method_call(
        self, page: str, wx_methods: List[str], page_defined_method: str,
        method_args: Dict[str, any]
    ) -> Dict[str, any]:
        
        if (self.app.get_current_page() != page):
            print(f"currently at page {self.app.get_current_page()}, redirecting to {page}")
            self.open_route("/" + page)
        
        callback_arr = {}
        return_arr = {}
        for wx_method in wx_methods:
            callback_arr[wx_method] = minium.Callback()
            self.app.hook_wx_method(wx_method, callback=callback_arr[wx_method])

        self.app.current_page.call_method(page_defined_method, method_args)

        for wx_method in wx_methods:
            if callback_arr[wx_method].wait_called(timeout=10) is True:
                return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
            else:
                return_arr[wx_method] = None
            self.app.release_hook_wx_method(wx_method)

        self.app.navigate_back()

        return return_arr
    
    def hook_wx_methods_with_open_page(
        self, page: str, wx_methods: List[str]
    ) -> Dict[str, any]:
        
        if (self.app.get_current_page() != page):
            print(f"currently at page {self.app.get_current_page()}, redirecting to {page}")
            self.open_route("/" + page)
        
        callback_arr = {}
        return_arr = {}
        for wx_method in wx_methods:
            callback_arr[wx_method] = minium.Callback()
            self.app.hook_wx_method(wx_method, callback=callback_arr[wx_method])

        self.open_route("/" + page)

        for wx_method in wx_methods:
            if callback_arr[wx_method].wait_called(timeout=10) is True:
                return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
            else:
                return_arr[wx_method] = None
            self.app.release_hook_wx_method(wx_method)
        
        self.app.navigate_back()
        return return_arr
    
    # Two unused functions here:

    # input_text_helper: previously used to identify whether the input data should be particular data type (e.g. phone number / email)
    # this part is now shifted to the parser

    # hood_wx_methods_with_formelement_binds: unable to pre-identify method name and components, so also shifted to the parser

    # def input_text_helper(self, default_text, class_name):
    #     POTENTIAL_IDENTIFIER_AND_INPUT = {'电话' : '13880000000',
    #                                       '手机':'13880000000',
    #                                       'phone':'13880000000',
    #                                       'mobile':'13880000000',
    #                                       '邮箱': 'string_sample@163.com',
    #                                        'email':'string_sample@163.com'}
    #     for (ident, input_text) in POTENTIAL_IDENTIFIER_AND_INPUT.items():
    #         if (class_name.lower()).find(ident) != -1:
    #             return input_text
    #     return default_text

    # def hook_wx_methods_with_formelement_binds(
    #     self,
    #     element: minium.BaseElement,
    #     input_text: str,
    #     wx_methods: List[str],
    #     is_form: bool = False
    # ) -> Dict[str, any]:
    #     """
    #     this function hoods a method used by a form via bindsubmit

    #     Args:
    #     ele (minium.BaseElement) : the element of interest
    #     input_text (str) : the text inputed to each block of the form
    #     wx_methods (list[str]): the list of wx methods to be tested
    #     is_form (bool) : identifier for whether this is a form element or input element

    #     Returns:
    #     Dict[str, any]: a dictionary of all the instances where an arg 
    #     passes into the wx api method
    #     """
    #     callback_arr = {}
    #     return_arr = {}
    #     for wx_method in wx_methods:
    #         callback_arr[wx_method] = minium.Callback()
    #         self.app.hook_wx_method(
    #             wx_method, callback=callback_arr[wx_method].callback
    #         )

    #     if is_form:
    #         all_inputs = element.get_elements("input")
    #         input_args = {}
    #         if len(all_inputs) == 0:
    #             print("unable to find any input. Submit attempt failed")
    #         else:
    #             print(f"the current form has {len(all_inputs)} fields")
    #             for input_ele in all_inputs:
    #                 class_name = input_ele.attribute("name")[0]
    #                 input_args[class_name] = self.input_text_helper(input_text, class_name)
    #         print(f'here is the input argumets: {input_args}')
    #         element.trigger("submit", {"value": input_args})
    #     else:
    #         element.trigger('change', {'value': input_text})

    #     for wx_method in wx_methods:
    #         if callback_arr[wx_method].wait_called(timeout=5) is True:
    #             return_arr[wx_method] = callback_arr[wx_method].get_callback_result()
    #         else:
    #             return_arr[wx_method] = None
    #         self.app.release_hook_wx_method(wx_method)

    #     return return_arr