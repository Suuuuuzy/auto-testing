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
        text_input = """<script\x0Atype="text/javascript">javascript:alert(1);</script>"""
        pages = self.find_all_pages()

        for page in pages:
            self.open_route("/" + page)
            # print(page)
            # self.page.wait_for(1)
            # 1. inputs
            inputs = self.find_all_inputs()
            self.logger.info(f"[+] There are {len(inputs)} inputs on page {page}")
            for input_block in inputs:
                try:
                    input_block.input(text_input, with_confirm=True)
                    self.logger.info(f'[+] Action: input in page: {page}')
                except Exception as e:
                    self.logger.error(f'[+] Encountering error during input: {e}')
                value = input_block.attribute("value")[0]
            
            # 2. forms
            forms = self.find_all_forms()
            self.logger.info(f"[+] There are {len(forms)} forms on page {page}")
            for form_block in forms:
                try:
                    inputElements = self.find_all_inputs_from_component(form_block)
                    inputArrays = {}
                    for inputElement in inputElements:
                        inputArrays[inputElement.name] = text_input
                    form_block.trigger("submit", {"value" : inputArrays})
                    self.logger.info(f'[+] Action: submit a form in {form_block} page: {page}')
                except Exception as e:
                    self.logger.error(f'[+] Encountering error during submit: {e}')
            
            # 3. buttons
            btns = self.find_all_buttons()
            self.logger.info(f"[+] There are {len(btns)} buttons on page {page}")
            for btn in btns:
                btn.tap()
                self.page.wait_for(3)
                self.logger.info(f'[+] Action: tap a button in page: {page}')
                if ("/" + page)!=self.app.get_current_page().path:
                    self.app.navigate_back()
                    # self.open_route("/" + page)
            # 4. other elements
            # this is to avoid page stack overflow
            if ("/" + page)!=self.app.get_current_page().path:
                self.app.navigate_back()
        
    def tearDown(self):
        self.mini.shutdown()
        super().tearDown()
        