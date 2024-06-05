from basedef import BaseDef
import os

class Minium_Query(BaseDef):
    def setUp(self):
        appid = self.mini.project_path.split('/')[-1]
        # __setLog__('/home/suzy/temp/new_taint_log_file/'+appid)
        result = self.app.evaluate(
            "function(){args=arguments;__setLog__('/home/suzy/temp/new_taint_log_file/'+args[0])}",[appid], sync=True
        )
        
    def test_inputs(self):
        text_input = "miniumjavascript"
        pages = self.find_all_pages()

        for page in pages:
            self.open_route("/" + page)
            # print(page)
            # self.page.wait_for(1)
            # 1. inputs
            inputs = self.find_all_inputs()
            self.logger.info(f"there are {len(inputs)} inputs on page {page}")
            for input_block in inputs:
                try:
                    input_block.input(text_input, with_confirm=True)
                    self.logger.info(f'action: input something in input in page: {page}')
                except Exception as e:
                    self.logger.info(f'encountering error during query: {e}')
                # self.screen_shot_save("(" + page  + ")")
                # self.page.wait_for(5)
                value = input_block.attribute("value")[0]
                # try: 
                #     self.assertEqual(text_input, value, f"element {input_block} is properly modified")
                # except AssertionError as e:
                #     print(f"failed assertion, expected input {text_input}, but gets {value}")
                # if page!=self.app.get_current_page().path:
                #     print('page changes after input, navigating back')
                #     self.app.navigate_back()
            
            # 2. forms
            forms = self.find_all_forms()
            self.logger.info(f"there are {len(forms)} forms on page {page}")
            for form_block in forms:
                try:
                    inputElements = self.find_all_inputs_from_component(form_block)
                    inputArrays = {}
                    for inputElement in inputElements:
                        inputArrays[inputElement.name] = text_input
                    form_block.trigger("submit", {"value" : inputArrays})
                    self.logger.info(f'action: submit a form in {form_block} page: {page}')
                except Exception as e:
                    self.logger.info(f'encountering error during query: {e}')
            
            # 3. buttons
            # btns = self.find_all_buttons()
            # print(f"there are {len(btns)} buttons on page {page}")
            # for btn in btns:
            #     btn.tap()
            #     self.page.wait_for(1)
            #     self.logger.info(f'action: tap a button in page: {page}')
                # if page!=self.app.get_current_page().path:
                #     self.app.navigate_back()
            # this is to avoid page stack overflow
            self.app.navigate_back()
        
    def tearDown(self):
        self.mini.shutdown()
        super().tearDown()
        