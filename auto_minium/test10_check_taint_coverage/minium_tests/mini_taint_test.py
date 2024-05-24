import minium_tests.base_taint  as base_taint
import json

class MiniTaintCoverageTest(base_taint.BaseTaint):

    @classmethod
    def setUpClass(cls):
        super(MiniTaintCoverageTest, cls).setUpClass()
        cls.coverage = []
        cls.wx_methods = ["chooseInvoice",
            "getUserInfo",
            "chooseInvoiceTitle",
            "saveImageToPhotosAlbum",
            "getLocation",
            "chooseImage",
            "createCameraContext",
            "getUserProfile",
            "chooseLocation",
            "chooseAddress",
            "saveVideoToPhotosAlbum",
            "chooseInvoice",
            "chooseInvoiceTitle",
            ]

    @classmethod
    def tearDownClass(cls):
        JSON_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/minium_test_hook.json'
        with open(JSON_DIR, 'w', encoding='utf-8') as file:
            json.dump(cls.coverage, file, indent=4)
        super(MiniTaintCoverageTest, cls).tearDownClass()
    

    def test_input_coverage(self):
        text_input = "string"
        pages = self.app.get_all_pages_path()

        for page in pages:
            self.open_route("/" + page)
            self.page.wait_for(5)
            inputs = self.page.get_elements("input")
            input_method_calls = []
            print(f"there are {len(inputs)} elements on page {page}")
            for input_block in inputs:
                try:
                    input_call_result = self.hook_wx_methods_with_formelement_binds(input_block, text_input, self.wx_methods, is_form=False)
                    input_method_calls.append(input_call_result)
                except Exception as e:
                    print(f'encountering error during input query: {e}')
            self.coverage.append({'page': page,
                                  'method': "bindchange",
                                  'callback results': input_method_calls})
            self.app.navigate_back()
        

    def test_submit_coverage(self):
        text_input = "string"
        pages = self.app.get_all_pages_path()

        for page in pages:
            self.open_route("/" + page)
            self.page.wait_for(5)
            forms = self.page.get_elements("form")
            form_method_calls = []
            print(f"there are {len(forms)} elements on page {page}")
            for form_block in forms:
                try:
                    form_call_result = self.hook_wx_methods_with_formelement_binds(form_block, text_input, self.wx_methods, is_form=True)
                    form_method_calls.append(form_call_result)
                except Exception as e:
                    print(f'encountering error during form query: {e}')
            self.coverage.append({'page': page,
                                  'method': "bindsubmit",
                                  'callback results': form_method_calls})
            self.app.navigate_back()

