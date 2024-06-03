import minium_tests.base_taint as base_taint
import json


class PageChecker(base_taint.BaseTaint):

    def failed_test_goto_projectdetail(self):
        # failure: unable to access page. seems to require auxiliary data on project
        PAGE = "pages/store/project/detail/projectDetail"
        self.open_route('/' + PAGE)
    
    def failed_test_goto_userInfoIndex(self):
        # failure: unable to access page. stops at userAuth page
        PAGE = "pages/userInfo/userInfoIndex"
        self.open_route('/' + PAGE)
    
    def success_test_goto_userAuth_check_button_element(self):
        PAGE = "pages/userInfo/userAuth/userAuth"
        self.open_route('/' + PAGE)
        selector_info_sample = base_taint.SelectorInfo('button, .btn-login', None, '立即登录', None)
        try:
            button_ele = self.get_element_using_selector(selector_info_sample)
            print("element: ", button_ele)
            print("inner wxml: ", button_ele.inner_wxml)
            print("outer wxml: ", button_ele.outer_wxml)
            print("inner text: ", button_ele.inner_text)
            print("value: ", button_ele.value)
        except Exception as e:
            print("an exception occurs during finding the button: ", e)
            return
    
    def test_goto_page_addresslist(self):
        PAGE = "pages/userInfo/userAddressList/userAddressList"
        self.open_route('/' + PAGE)
        selector_info_sample = base_taint.SelectorInfo('button, .btn-def', None, '新增地址', None)
        try:
            button_ele = self.get_element_using_selector(selector_info_sample)
            print("element: ", button_ele)
            print("inner wxml: ", button_ele.inner_wxml)
            print("outer wxml: ", button_ele.outer_wxml)
            print("inner text: ", button_ele.inner_text)
            print("value: ", button_ele.value)
        except Exception as e:
            print("an exception occurs during finding the button: ", e)
            return
        
        try:
            return_args = self.hook_wx_methods_with_element_tap(
                element=button_ele,
                wx_methods=['getUserInfo', 'request', 'chooseInvoice', 'saveImageToPhotosAlbum', 'chooseAddress']
            )        
            json_data =[{'page': PAGE,
                      'method': "addBtnClick",
                      'callback results': return_args}]
            JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wx8d762feb611da990/page_checker.json'
            with open(JSON_DIR, 'a', encoding='utf-8') as file:
                json.dump(json_data, file, indent=4)
        except Exception as e:
            print("an exception occurs during tracking button taint: ", e)
            return

