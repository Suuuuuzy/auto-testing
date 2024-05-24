import minium_tests.base_taint as base_taint
import json

class PageChecker(base_taint.BaseTaint):

    def failed_test_enter_page_submit_order(self):
        PAGE = "pages/submit-order/submit-order"
        self.open_route('/' + PAGE)

        if self.app.get_current_page() == '/pages/binding-phone/binding-phone':
            button_confirm = self.page.get_element('.confirm')
            button_cancel = self.page.get_element('.cancel')
            button_confirm.tap()
            self.page.wait_for(5)
        
        self.open_route('/' + PAGE)
    
    def not_very_working_test_enter_page(self):
        PAGE = 'pages/bill/apply/apply'
        self.open_route('/' + PAGE)
        form_ele = self.page.get_element('form')
        print(form_ele.inner_wxml)
        print(form_ele.outer_wxml)
        print(form_ele.attribute('bindsubmit'))
        print(form_ele.styles('bindsubmit'))
        form_submit_result = self.hook_wx_methods_with_formelement_binds(form_ele, 'string', ['chooseInvoice', 'getUserInfo'], is_form=True)
        json_data =[{'page': PAGE,
                      'method': "bindsubmit",
                      'callback results': form_submit_result}]
        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wxad2e9789b5076244/page_checker.json'
        with open(JSON_DIR, 'w', encoding='utf-8') as file:
            json.dump(json_data, file, indent=4)

    def failed_test_enter_page_hooking_select(self):
        PAGE = 'pages/bill/apply/apply'
        self.open_route('/' + PAGE)
        tapable_ele = self.page.get_element('.choose-invoice')
        tap_bool, tap_result = self.hook_wx_methods_with_element_tap(tapable_ele, ['chooseInvoice', 'chooseInvoiceTitle', 'getUserInfo', 'request'])
        json_data =[{'page': PAGE,
                      'method': "tap",
                      'is called': tap_bool,
                      'callback results': tap_result}]
        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wxad2e9789b5076244/page_checker.json'
        with open(JSON_DIR, 'a', encoding='utf-8') as file:
            json.dump(json_data, file, indent=4)