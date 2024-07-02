import minium_tests.base_taint as base_taint
import json


class PageChecker(base_taint.BaseTaint):

    def cannot_find_taint_test_goto_page_index_with_direct_call(self):
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_2_wx78d2ee5255a3ed63.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)
        all_page_bind_info = self.get_json_data(JSON_DIR)
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        for groundtruth_func in groundtruth_data:
            for idx in range(groundtruth_func.get("GroundTruth")):
                PAGE = (groundtruth_func.get("GroundTruth_Pages"))[idx]
                page_bind_infos = all_page_bind_info.get(PAGE)
                json_data[PAGE] = []
                self.open_route("/" + PAGE)
        
                for bind_info in page_bind_infos:
                    if bind_info.get('bind_method') == 'bindtap':
                        try:
                            return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                                                                                            wx_methods=['getUserInfo', 'chooseInvoice',  'chooseImage',
                                                                                                         'chooseAddress', 'getLocation', 'saveImageToPhotosAlbum'],
                                                                                            page_defined_method=bind_info.get("function_call"), method_args={})

                            json_data[PAGE].append({'method': bind_info.get('function_call'),
                                                    'callback results': return_args})

                        except Exception as e:
                            print(f"running into error when testing bindtap function {bind_info.get('function_call')} on page {PAGE}: ", e)
                            continue
                # self.app.navigate_back()
        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/page_checker.json'
        with open(JSON_DIR, 'a', encoding='utf-8') as file:
                json.dump(json_data, file, indent=4)
    
    def failed_test_shareImg_page_bindtap(self):
        '''
        fails because the image url is invalid
        '''
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_2_wx78d2ee5255a3ed63.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)[2]
        all_page_bind_info = self.get_json_data(JSON_DIR)
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        PAGE = (groundtruth_data.get("GroundTruth_Pages"))[0]
        page_bind_infos = all_page_bind_info.get(PAGE)[0]
        json_data[PAGE] = []
        self.open_route("/" + PAGE)

        if page_bind_infos.get('bind_method') == 'bindtap':
            try:
                return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                                    wx_methods=['saveImageToPhotosAlbum'],
                                    page_defined_method=page_bind_infos.get("function_call"), method_args={})
                print(f"returning arg for function '{page_bind_infos.get('function_call')}' is: ", return_args)

            except Exception as e:
                print(f"running into error when testing bindtap function {page_bind_infos.get('function_call')} on page {PAGE}: ", e)   


    def failed_test_qrVoucher_page_bindtap(self):
        '''
        running into error when testing bindtap function onPreviewQrc on 
        page pages/qrvoucher/qrvoucher:  page.onPreviewQrc not exists

        through checking, the wxml labels function onPreviewQrc for bindtap, which is nevertheless
        not defined in the corresponding js file
        '''

        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_2_wx78d2ee5255a3ed63.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)[2]
        all_page_bind_info = self.get_json_data(JSON_DIR)
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        PAGE = (groundtruth_data.get("GroundTruth_Pages"))[1]
        page_bind_infos = all_page_bind_info.get(PAGE)
        json_data[PAGE] = []
        self.open_route("/" + PAGE)

        for page_info in page_bind_infos:
            if page_info.get('bind_method') == 'bindtap':
                try:
                    return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                                        wx_methods=['saveImageToPhotosAlbum'],
                                        page_defined_method=page_info.get("function_call"), method_args={})
                    print(f"returning arg for function '{page_info.get('function_call')}' is: ", return_args)

                except Exception as e:
                    print(f"running into error when testing bindtap function {page_info.get('function_call')} on page {PAGE}: ", e) 

    def partial_failed_test_scanning_page_bindtap(self):
        '''
        the function that uses wx.saveImageToPhotosAlbum is prese, which is
        nevertheless neither used by other functions in the script nor binded to 
        any user actions. not sure why it is there or what it would be able to do to
        constitute taint
        '''
        
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_2_wx78d2ee5255a3ed63.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)[2]
        all_page_bind_info = self.get_json_data(JSON_DIR)
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        PAGE = (groundtruth_data.get("GroundTruth_Pages"))[2]
        page_bind_infos = all_page_bind_info.get(PAGE)
        json_data[PAGE] = []
        self.open_route("/" + PAGE)

        for page_info in page_bind_infos:
            if page_info.get('bind_method') == 'bindtap':
                try:
                    return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                                        wx_methods=['saveImageToPhotosAlbum'],
                                        page_defined_method=page_info.get("function_call"), method_args={})
                    print(f"returning arg for function '{page_info.get('function_call')}' is: ", return_args)

                except Exception as e:
                    print(f"running into error when testing bindtap function {page_info.get('function_call')} on page {PAGE}: ", e)  
                    continue      

    def partial_failed_test_set_page_bindtap(self):
        '''
        same problem as above
        '''
        
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_2_wx78d2ee5255a3ed63.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)[1]
        all_page_bind_info = self.get_json_data(JSON_DIR)
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        PAGE = (groundtruth_data.get("GroundTruth_Pages"))[1]
        page_bind_infos = all_page_bind_info.get(PAGE)
        json_data[PAGE] = []
        self.open_route("/" + PAGE)

        for page_info in page_bind_infos:
            if page_info.get('bind_method') == 'bindtap':
                try:
                    return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                                        wx_methods=['chooseImage'],
                                        page_defined_method=page_info.get("function_call"), method_args={})
                    print(f"returning arg for function '{page_info.get('function_call')}' is: ", return_args)

                except Exception as e:
                    print(f"running into error when testing bindtap function {page_info.get('function_call')} on page {PAGE}: ", e)  
                    continue   


    def test_index_page_bindtap(self):
        '''
        same problem as above
        '''
        
        JSON_DIR = "/home/bella-xia/auto-testing/wxml_parser/json_results/log_2_wx78d2ee5255a3ed63.json"
        GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/wx78d2ee5255a3ed63/groundtruth.json"
        groundtruth_data = self.get_json_data(GROUNDTRUTH_DIR)[1]
        all_page_bind_info = self.get_json_data(JSON_DIR)
        json_data = {}
        # self.app.mock_wx_method("getLocation", result="result")

        PAGE = (groundtruth_data.get("GroundTruth_Pages"))[0]
        page_bind_infos = all_page_bind_info.get(PAGE)
        json_data[PAGE] = []
        self.open_route("/" + PAGE)

        for page_info in page_bind_infos:
            if page_info.get('bind_method') == 'bindtap':
                try:
                    return_args = self.hook_wx_methods_with_page_defined_method_call(page=PAGE, 
                                        wx_methods=['chooseImage'],
                                        page_defined_method=page_info.get("function_call"), method_args={})
                    print(f"returning arg for function '{page_info.get('function_call')}' is: ", return_args)

                except Exception as e:
                    print(f"running into error when testing bindtap function {page_info.get('function_call')} on page {PAGE}: ", e)  
                    continue   

