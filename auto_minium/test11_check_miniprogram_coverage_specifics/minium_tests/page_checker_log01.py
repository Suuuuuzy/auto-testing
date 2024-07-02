import minium_tests.base_taint as base_taint
import json


class PageChecker(base_taint.BaseTaint):

    def failed_test_goto_page_index_with_direct_call(self):
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_1_wxaf291362a455b5e1.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wxaf291362a455b5e1/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)
        all_page_bind_info = self.get_json_data(JSON_DIR)
        groundtruth_getloc = groundtruth_data[0]
        json_data = {}
        self.app.mock_wx_method("getLocation", result="result")

        for idx in range(groundtruth_getloc.get("GroundTruth")):
            PAGE = (groundtruth_getloc.get("GroundTruth_Pages"))[idx]
            page_bind_infos = all_page_bind_info.get(PAGE)
            self.open_route("/" + PAGE)
        
            for bind_info in page_bind_infos:
                if bind_info.get('bind_method') == 'bindtap':
                    try:
                        return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                        wx_methods=['getUserInfo', 'chooseInvoice',  'saveImageToPhotosAlbum',
                                    'chooseAddress', "getLocation"],
                            page_defined_method=bind_info.get("function_call"), method_args={})

                        json_data[PAGE].append({'method': bind_info.get('function_call'),
                                                'callback results': return_args})

                    except Exception as e:
                        print(f"running into error when testing bindtap function {bind_info.get('function_call')} on page {PAGE}: ", e)
                        continue
            self.app.navigate_back()

        self.app.restore_wx_method("getLocation")
        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wxad2e9789b5076244/page_checker.json'
        with open(JSON_DIR, 'a', encoding='utf-8') as file:
                json.dump(json_data, file, indent=4)

    def test_goto_page(self):
        '''
        error : running into error when testing bindtap function 'OnShow' on page 
        pages/member_mainpage/member_mainpage:  Cannot read property 'canHook' of undefined
        when trying to call current-page method 

        error "pages/member_mainpage/member_mainpage" unable to access to the components and
        calling function leads to errors
        '''
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_1_wxaf291362a455b5e1.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wxaf291362a455b5e1/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)
        all_page_bind_info = self.get_json_data(JSON_DIR)
        groundtruth_getloc = groundtruth_data[0]
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        PAGE = (groundtruth_getloc.get("GroundTruth_Pages"))[1]
        print(f"navigating to page {PAGE}")
        page_bind_infos = all_page_bind_info.get(PAGE)
        self.open_route("/" + PAGE)

        for bind_info in page_bind_infos:
            if bind_info.get('bind_method') == 'bindtap':
                try:
                    print(f"testing function call {bind_info.get('function_call')}")
                    return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                        wx_methods=['getUserInfo', 'chooseInvoice', 'chooseAddress', "getLocation"],
                        page_defined_method=bind_info.get("function_call"), method_args={})
                    json_data[PAGE].append({'method': bind_info.get('function_call'),
                                            'callback results': return_args})
                    print("current state of json data: ", json_data)

                except Exception as e:
                    print(f"running into error when testing bindtap {bind_info.get('function_call')} function on page {PAGE}: ", e)
                
        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wxaf291362a455b5e1/page_checker.json'
        with open(JSON_DIR, 'a', encoding='utf-8') as file:
                json.dump(json_data, file, indent=4)
        '''
        for idx in range(groundtruth_getloc.get("GroundTruth")):
            PAGE = (groundtruth_getloc.get("GroundTruth_Pages"))[idx]
            page_bind_infos = all_page_bind_info.get(PAGE)
            self.open_route("/" + PAGE)
        
            for bind_info in page_bind_infos:
                if bind_info.get('bind_method') == 'bindtap':
                    try:
                        return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                        wx_methods=['getUserInfo', 'chooseInvoice',  'saveImageToPhotosAlbum',
                                    'chooseAddress', "getLocation"],
                            page_defined_method=bind_info.get("function_call"), method_args={})

                        json_data[PAGE].append({'method': bind_info.get('function_call'),
                                                'callback results': return_args})

                    except Exception as e:
                        print(f"running into error when testing bindtap function {bind_info.get('function_call')} on page {PAGE}: ", e)
                        continue
            self.app.navigate_back()

        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wxaf291362a455b5e1/page_checker.json'
        with open(JSON_DIR, 'a', encoding='utf-8') as file:
                json.dump(json_data, file, indent=4)
        
        # self.app.restore_wx_method("getLocation")
        '''
                

