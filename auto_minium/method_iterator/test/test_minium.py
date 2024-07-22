from basedef import BaseDef
import os, json, time
from bind_func_arguments import trigger_arg_dic
import logging
logger_main = logging.getLogger(__name__)
logging.basicConfig(
    filename='autominium_test.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)


class Minium_Query(BaseDef):
    def setUp(self):
        appid = self.mini.project_path.split('/')[-1]
        # __setLog__('/home/suzy/temp/new_taint_log_file/'+appid)
        result = self.app.evaluate(
            "function(){args=arguments;__setLog__('/home/suzy/temp/new_taint_log_file/'+args[0])}",[appid], sync=True
        )
        
    def test_methods(self):
        eles_in_pages = {} # a global variable to record eles in pages
        text_input = "javascriptMinium"
        bind_json_file = os.path.join(self.mini.project_path, "bind_methods_navi.json") # try to find bind_methods_navi.json first
        if not os.path.exists(bind_json_file): # if it does not exist, use bind_methods.json
            bind_json_file = os.path.join(self.mini.project_path, "bind_methods.json")
        with open(bind_json_file) as f:
            bind_methods = json.load(f) # a global variable to record binding methods in pages
        pages = self.find_all_pages()
        pages = ['/' + i for i in pages]
        finished_pages = set()
        visited_pages = set()
        all_pages_length = len(pages)
        all_pages = set(pages)
        
        def get_arg(trigger, item):
            return trigger_arg_dic[trigger]
            # if trigger not in ["bindsubmit"]:
            #     return trigger_arg_dic[trigger]
            # elif trigger == "bindsubmit":
            #     arg = trigger_arg_dic[trigger]
            #     form_data = item["form_dic"]
            #     for key in form_data:
            #         form_data[key] = text_input 
            #     arg["detail"]["value"] = form_data
            #     return arg
        
        def dealWithInput(inputs):
            # 1. inputs
            # inputs = self.find_all_inputs()
            self.logger.info(f"[+] There are {len(inputs)} inputs left on page {page}")
            while len(inputs)>0:
                cur_input = inputs[0]
                try:
                    cur_input.input(text_input, with_confirm=True)
                    self.logger.info(f'[+] Action: input in page: {page}')
                except Exception as e:
                    self.logger.error(f'[+] Encountering error: {e} during input in page: {page}')
                inputs.remove(cur_input)
                cur_path = self.app.get_current_page().path
                if page!=cur_path:
                    dealWithPage(cur_path)
                    
        def dealWithForm(forms):
            # 2. forms
            # forms = self.find_all_forms()
            self.logger.info(f"[+] There are {len(forms)} forms left on page {page}")
            while len(forms)>0:
                form_block = forms[0]
                try:
                    inputElements = self.find_all_inputs_from_component(form_block)
                    inputArrays = {}
                    for inputElement in inputElements:
                        inputArrays[inputElement.name] = text_input
                    form_block.trigger("submit", {"value" : inputArrays})
                    self.logger.info(f'[+] Action: submit a form in page: {page}')
                except Exception as e:
                    self.logger.error(f'[+] Encountering error: {e} during submit in page: {page}')
                forms.remove(form_block)
                cur_path = self.app.get_current_page().path
                if page!=cur_path:
                    dealWithPage(cur_path)
                    
        def dealWithOtherMethods(triggers, page):
            page_in_json = page[1:]
            self.logger.info(f'[+] See triggers {triggers}')
            for trigger in triggers:
                if trigger not in trigger_arg_dic:
                    logger_main.error(f"[+] {trigger} not implemeted in trigger_arg_dic in miniapp {self.mini.project_path}!")
                    # skip the ones we don't include for now, to see whether the test stops
                    bind_methods[page_in_json]["binding_event"][trigger] = []
                    continue
                items = bind_methods[page_in_json]["binding_event"][trigger]
                while len(items)>0:
                    item = items[0]
                    try:
                        # self.logger.info(f'[+] Try calling method {item["handler"]} in page {page}, current page: {self.app.get_current_page()}')
                        if page!=self.app.get_current_page().path:
                            self.logger.error(f'[+] Calling method in different pages')
                            stack = self.app.get_page_stack() 
                            # self.logger.error(f'[+] Current stack: {stack}')
                        result  = self.page.call_method(item["handler"], get_arg(trigger, item))
                        self.logger.info(f'[+] Call method {item["handler"]}, result: {result}')
                    except Exception as e:
                        self.logger.info(f'[+] Call method error {item["handler"]}')
                        logger_main.error(f'[+] Call method: {item["handler"]} error: {e} in miniapp {self.mini.project_path}')
                    items.remove(item)
                    self.logger.info(f'[+] There are {len(items)} methods for {trigger} left on page: {page}')
                    time.sleep(2) # wait until the call_method takes effect (if the call method is navigation)
                    cur_page = self.app.get_current_page()
                    cur_path = cur_page.path
                    self.logger.info(f'[+] Check currnet page: {cur_page}')
                    if page!=cur_path:
                        self.logger.info(f'[+] Navigate naturally, from {page} to {cur_path}')
                        # when this returns, we assume the page is still here, but it's not the case!
                        dealWithPage(cur_path)
                        return
                    
        def dealWithPage(page):
            page_in_json = page[1:]
            if page in finished_pages:
                return
            if page not in eles_in_pages:
                inputs = self.find_all_inputs()
                forms = self.find_all_forms()
                # btns = self.find_all_buttons()
                eles_in_pages[page] = {"inputs":inputs, "forms":forms}
                
            if page_in_json not in bind_methods:
                finished_pages.add(page)
                pages.remove(page)
                logger_main.error(f'[+] {page_in_json} not in bind_methods')
                return
            # page finish checking
            bindings_cnt = 0
            prioritized_triggers = ["bindinput", "bindconfirm", "bindsubmit"]
            triggers = [i for i in bind_methods[page_in_json]["binding_event"] if i not in prioritized_triggers]
            for trigger in triggers:
                # if trigger not in ["bindsubmit"]:
                bindings_cnt += len(bind_methods[page_in_json]["binding_event"][trigger])
            ele_cnt = 0
            for ele_type in eles_in_pages[page]:
                ele_cnt += len(eles_in_pages[page][ele_type])
            if bindings_cnt==0 and ele_cnt==0:
                finished_pages.add(page)
                pages.remove(page)
                self.logger.info(f'[+] {page} finishes')
                return
            
            # for the triggers as input, we fire the event because that's where we taint e.detail.value
            dealWithInput(eles_in_pages[page]["inputs"])
            dealWithForm(eles_in_pages[page]["forms"])
            dealWithOtherMethods(triggers, page)
            
        # test starts here
        time.sleep(10) # give it some time for onLaunch?  
        query = {'fakeKey': 'fakeValue'}
        while len(pages)>0:
            page = pages[0]
            stack = self.app.get_page_stack() 
            if len(stack)>9:
                self.relaunch_to_open(page, query)
            else:
                self.navigate_to_open(page, query)
            self.logger.info(f'[+] Navigate through API, to: {page}')
            time.sleep(5) # wait until navigation takes effect
            visited_pages.add(page)
            dealWithPage(page)
        
        # visit the rest pages if they have not been visited with query
        if len(visited_pages)!=all_pages_length:
          for page in all_pages-visited_pages:
                stack = self.app.get_page_stack() 
                if len(stack)>9:
                    self.relaunch_to_open(page, query)
                else:
                    self.navigate_to_open(page, query)
                self.logger.info(f'[+] Navigate through API without dealWithPage, to: {page}')
                time.sleep(5) # wait until navigation takes effect
            
        
        
    def tearDown(self):
        self.mini.shutdown()
        super().tearDown()
        