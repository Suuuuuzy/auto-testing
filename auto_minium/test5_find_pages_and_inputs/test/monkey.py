from basedef import BaseDef
import os
import json
import base64


class Monkey_Query(BaseDef):
    
    def test_inputs(self):
        text_input = self.mini.project_path
        page = "/pages/chatvc/chatvc"
        self.open_route(page)
        
        # cwd = os.getcwd()
        # print(cwd)
        image_name = "test.png"  # 运行这个case时需要在本目录下有名为test.png的图片
        with open(image_name, "rb") as fd:
            c = fd.read()
            image_b64data = base64.b64encode(c).decode("utf8")
        self.app.mock_choose_image(image_name, image_b64data)
        
        btns = self.find_all_buttons()
        print(f"there are {len(btns)} buttons on page {page}")
        for btn in btns:
            btn.tap()
            self.page.wait_for(1)
            self.logger.info(f'action: tap a button in page: {page}')
            while page!=self.app.get_current_page().path:
                self.app.navigate_back()
        # this is to avoid page stack overflow
        self.app.navigate_back()
        
        # # 1. inputs
        # inputs = self.find_all_inputs()
        # self.logger.info(f"there are {len(inputs)} inputs on page {page}")
        # for input_block in inputs:
        #     try:
        #         input_block.input(text_input, with_confirm=True)
        #         self.logger.info(f'action: input in {str(input_block)} in page: {page}')
        #     except Exception as e:
        #         self.logger.info(f'encountering error during query: {e}')
        #     # self.screen_shot_save("(" + page  + ")")
        #     # self.page.wait_for(5)
        #     value = input_block.attribute("value")[0]
        #     try: 
        #         self.assertEqual(text_input, value, f"element {input_block} is properly modified")
        #     except AssertionError as e:
        #         self.logger.info(f"failed assertion, expected input {text_input}, but gets {value}")
        
        # # 2. forms
        # forms = self.find_all_forms()
        # self.logger.info(f"there are {len(forms)} forms on page {page}")
        # for form_block in forms:
        #     try:
        #         inputElements = self.find_all_inputs_from_component(form_block)
        #         inputArrays = {}
        #         for inputElement in inputElements:
        #             inputArrays[inputElement.name] = text_input
        #         form_block.trigger("submit", {"value" : inputArrays})
        #         self.logger.info(f'action: submit a form in {form_block} page: {page}')
        #     except Exception as e:
        #         self.logger.info(f'encountering error during query: {e}')
                    
        # add clicking buttons
        # while len(pages):
        #     cur_page = pages.pop()
        #     self.open_route("/" + page)
        #     cur_btns = btn_dic[cur_page]
        #     for btn in cur_btns:
        #         # this button has ben tapped
        #         if btn_dic[cur_page][btn]!=1:
        #             continue
        #         btn.tap()
        #         self.page.wait_for(1)
        #         btn_dic[cur_page][btn] = 0
        #         # this page has been finished
        #         if sum(btn_dic[cur_page].values())!=0:
        #             pages.append(cur_page)
        #         new_page = self.app.get_current_page().path
        #         if cur_page==new_page:
        #             continue
        #         else:
        #             cur_page=new_page
        #             break
            
        # print('before')
        # print(btn_dic) 
        # cur_page = None
        # while len(pages):
        #     if not cur_page or cur_page not in pages:
        #         cur_page = pages.pop()
        #         self.open_route("/" + cur_page)
        #     cur_btns = btn_dic[cur_page]
        #     if len(cur_btns) ==0:
        #         cur_page = None
        #         continue
        #     while 1:
        #         cur_btns.pop().tap()
        #         self.page.wait_for(1)
        #         # if this page does not finish
        #         if len(cur_btns):
        #             if cur_page not in pages:
        #                 pages.append(cur_page)
        #             new_page = self.app.get_current_page().path
        #             if cur_page==new_page:
        #                 continue
        #             else:
        #                 cur_page=new_page
        #                 break
        #         # if this page finishes
        #         else:
        #             cur_page = None
        #             break
        # print('after')  
        # print(btn_dic)    

                
     
       
    def tearDown(self):
        self.mini.shutdown()
        super().tearDown()
        