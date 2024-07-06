import minium_tests.base_taint as base_taint
import json


class PageChecker(base_taint.BaseTaint):

    def failed_test_goto_page_index_with_direct_call(self):
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
                

