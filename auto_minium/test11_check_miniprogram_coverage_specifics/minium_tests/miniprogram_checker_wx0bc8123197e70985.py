import minium_tests.base_taint as base_taint
import json, random
from typing import List, Dict

class Miniprogram_Checker(base_taint.BaseTaint):

    def test_all_bubbling_events_via_method_call(self):

        # get the json data from designated json data file
        # might need to find a way for automation later?
        data_path : str = '/home/bella-xia/auto-testing/wxml_parser_python/all_outputs/json_event_results/wx0bc8123197e70985.json'
        json_data = self.get_json_data(data_path)
        querying_wx_methods = ['getUserInfo', 'chooseInvoice', 'saveImageToPhotosAlbum', 
                                    'chooseAddress', 'saveVideoToPhotosAlbum', 'request']
        dump_data_path : str = '/home/bella-xia/auto-testing/data/_auxiliary_data/wx0bc8123197e70985/wx0bc8123197e70985_via_func.json'

        dump_data : Dict[str, any] = {}

        all_pages : List[str] = self.app.get_all_pages_path()
        # for the current trial, choose a random page 
        # random_page_idx : int = random.randint(0, len(all_pages))
        # random_page : str = all_pages[random_page_idx]
        for page in all_pages:
            print(f"querying page {page}")

            page_json_data = json_data[page]
            if page_json_data is None:
                print(f'cannot find designate page {page}')
                continue

            assert isinstance(page_json_data, dict)

            for callback_func, calling_args_list in page_json_data.items():
                assert isinstance(calling_args_list, list)
                for calling_args in calling_args_list:
                    assert isinstance(calling_args, dict)

                    if 'm_type' in calling_args and self.is_bubbling_event(event_type=calling_args['m_type']) is True:
                        try:
                            print(f"querying callback function {callback_func} on page {page}")
                            return_args =  self.hook_wx_methods_with_page_defined_method_call(
                                page=page,
                                wx_methods= querying_wx_methods,
                                page_defined_method=callback_func,
                                method_args= {
                                    'type' : calling_args['m_type'],
                                    'details' : calling_args['m_details']
                                }
                            )
                            
                            none_num : int = 0

                            for wx_method, method_args in return_args.items():
                                if method_args is not None:
                                    dump_data.setdefault(wx_method, [])
                                    dump_data[wx_method].append({
                                        'page' : page,
                                        'callback_function' : callback_func,
                                        'event_name' : calling_args['m_type'],
                                        'method_params' : method_args
                                    })
                                else:
                                    none_num += 1
                            
                            if none_num == len(querying_wx_methods):
                                dump_data.setdefault('None', [])
                                dump_data['None'].append({
                                        'page' : page,
                                        'callback_function' : callback_func,
                                        'event_name' : calling_args['m_type']
                                    })

                        except Exception as e:
                            print(f"encountered exception when querying method{callback_func} on page {page}: {str(e)}")
                            dump_data.setdefault('Error', [])
                            dump_data['Error'].append({
                                'page' : page,
                                'callback_function' : callback_func,
                                'event_name' : calling_args['m_type'],
                                'error_msg' : str(e)
                                })
                            continue
        
        with open(dump_data_path, 'w', encoding='utf-8') as file:
             json.dump(dump_data, file, indent=4)
    
    def partial_passed_test_all_bubbling_events_via_element(self):

        # get the json data from designated json data file
        # might need to find a way for automation later?
        data_path : str = '/home/bella-xia/auto-testing/wxml_parser_python/all_outputs/json_event_results/wx0bc8123197e70985.json'
        json_data = self.get_json_data(data_path)
        querying_wx_methods = ['getUserInfo', 'chooseInvoice', 'saveImageToPhotosAlbum', 
                                    'chooseAddress', 'saveVideoToPhotosAlbum', 'request']
        dump_data_path : str = '/home/bella-xia/auto-testing/data/_auxiliary_data/wx0bc8123197e70985/wx0bc8123197e70985_via_element.json'

        dump_data : Dict[str, any] = {}

        all_pages : List[str] = self.app.get_all_pages_path()
        # for the current trial, choose a random page 
        # random_page_idx : int = random.randint(0, len(all_pages))
        # random_page : str = all_pages[random_page_idx]
        for page in all_pages:
            print(f"querying page {page}")

            page_json_data = json_data[page]
            if page_json_data is None:
                print(f'cannot find designate page {page}')
                continue
            assert isinstance(page_json_data, dict)

            for callback_func, calling_args_list in page_json_data.items():
                assert isinstance(calling_args_list, list)
                for calling_args in calling_args_list:
                    assert isinstance(calling_args, dict)

                    if 'm_type' in calling_args and self.is_bubbling_event(calling_args['m_type']) is True:
                        try:
                            # try finding element:
                            element_of_interest = self.find_element_from_json_data(page=page,
                                                                                   element_of_interest=calling_args)

                            if len(element_of_interest) == 0:
                                dump_data.setdefault('NotFound', [])
                                dump_data['NotFound'].append({
                                    'page' : page,
                                    'callback_function' : callback_func,
                                    'event_name' : calling_args['m_type'],
                                    'element' : {
                                        'tag' : calling_args['m_tag_name'],
                                        'attributes' : calling_args['m_attributes'],
                                        'data' : calling_args['m_data'],
                                        'xpath' : calling_args['m_xpath'],
                                        }
                                        })
                                continue

                            print(f"querying callback function {callback_func} on page {page}")
                            # params : Dict[str, any]=  {'type' : calling_args['m_type'],
                            #                            'details' : calling_args['m_details']}
                            return_args =  self.hook_wx_methods_with_bubbling_event(
                                page=page,
                                event_type=calling_args['m_type'],
                                element=element_of_interest[0],
                                wx_methods=querying_wx_methods,
                            )
                            
                            none_num : int = 0

                            for wx_method, method_args in return_args.items():
                                if method_args is not None:
                                    dump_data.setdefault(wx_method, [])
                                    dump_data[wx_method].append({
                                        'page' : page,
                                        'callback_function' : callback_func,
                                        'event_name' : calling_args['m_type'],
                                        'method_params' : method_args,
                                        'element' : {
                                        'tag' : calling_args['m_tag_name'],
                                        'attributes' : calling_args['m_attributes'],
                                        'data' : calling_args['m_data'],
                                        'xpath' : calling_args['m_xpath'],
                                        }
                                    })
                                else:
                                    none_num += 1
                            
                            if none_num == len(querying_wx_methods):
                                dump_data.setdefault('None', [])
                                dump_data['None'].append({
                                        'page' : page,
                                        'callback_function' : callback_func,
                                        'event_name' : calling_args['m_type'],
                                        'element' : {
                                        'tag' : calling_args['m_tag_name'],
                                        'attributes' : calling_args['m_attributes'],
                                        'data' : calling_args['m_data'],
                                        'xpath' : calling_args['m_xpath'],
                                        }
                                    })

                        except Exception as e:
                            print(f"encountered exception when querying method{callback_func} on page {page}: {str(e)}")
                            dump_data.setdefault('Error', [])
                            dump_data['Error'].append({
                                'page' : page,
                                'callback_function' : callback_func,
                                'event_name' : calling_args['m_type'],
                                'error_msg' : str(e)
                                })
                            continue
        
        with open(dump_data_path, 'w', encoding='utf-8') as file:
            json.dump(dump_data, file, indent=4)