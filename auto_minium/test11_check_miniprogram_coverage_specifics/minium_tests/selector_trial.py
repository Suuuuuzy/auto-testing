import random, re
import minium_tests.base_taint as base_taint
from typing import List


class Trial_Selector_Checker(base_taint.BaseTaint):

    def test_selector(self):
        miniprogram_path = '/home/bella-xia/auto-testing/data/0_passing_groundtruth/wx0bc8123197e70985'
        data_path = '/home/bella-xia/auto-testing/wxml_parser_python/all_outputs/json_event_results/wx0bc8123197e70985.json'

        json_data = self.get_json_data(data_path)

        page_of_interest = 'pages/governmentCoupon/index/index'
        self.open_route('/' + page_of_interest)

        element_of_interest_01 = json_data[page_of_interest]['loadList'][1]
        element_01_found_with_all_three = self.find_element_from_json_data(element_of_interest_01)
        if len(element_01_found_with_all_three) != 0:
            for element_01 in element_01_found_with_all_three:
                print(f"found element 1: {element_01.outer_wxml}")

            element_01_found_with_all_three[0].tap()
            self.page.wait_for(5)
        
        element_of_interest_02 = json_data[page_of_interest]['showRule'][0]
        element_02_found_with_all_three = self.find_element_from_json_data(element_of_interest_02)
        if len(element_02_found_with_all_three) != 0:
            for element_02 in element_02_found_with_all_three:
                print(f"found element 2: {element_02.outer_wxml}")

            element_02_found_with_all_three[0].tap()
            self.page.wait_for(5)

        # try another one

        # step 2: get another element on the current page 


        # # step 2: try selector separately
        # selector_with_selector_only = base_taint.SelectorInfo(selector=selector, 
        #                                                   inner_text=None,
        #                                                   text_contains=None,
        #                                                   value=None,
        #                                                   xpath=None)
        
        # element_found_02 = self.get_element_using_selector(selector_with_selector_only)

        # #print(f"element found with all three info: {element_found_01}")
        # #print(f"element found with only selector: {element_found_02}")

        # for element in element_found_01:
        #     print(f"found element_01 with wxml{element.outer_wxml}")
        # for element in element_found_02:
        #     print(f"found element_02 with wxml{element.outer_wxml}")


