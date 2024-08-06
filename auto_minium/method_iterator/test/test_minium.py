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

import timeout_decorator

class Minium_Query(BaseDef):
    def setUp(self):
        appid = self.mini.project_path.split('/')[-1]
        # __setLog__('/home/suzy/temp/new_taint_log_file/'+appid)
        result = self.app.evaluate(
            "function(){args=arguments;__setLog__('/home/suzy/temp/new_taint_log_file/'+args[0])}",[appid], sync=True
        )
    
    def get_binding_cnt(self):
        cnt = 0
        for page in self.bind_methods:
            for event in self.bind_methods[page]["binding_event"]:
                cnt += len(self.bind_methods[page]["binding_event"][event])
        return cnt
    
    def get_ele_cnt(self):
        cnt = 0
        for page in self.eles_in_pages:
            for ele in self.eles_in_pages[page]:
                cnt += len(self.eles_in_pages[page][ele])
                # = {"inputs":inputs, "forms":forms}
        return cnt
    
    def mock_storage(self):
        functionDeclaration = """function(options,defval){
            var storageValue ='testvalue';
            storageValue.__setTaint__(__taintConstants__()['WechatAPI']);
            return {data:storageValue}
        }"""
        self.app.mock_wx_method("getStorage", functionDeclaration=functionDeclaration)
            
    @timeout_decorator.timeout(300) # set timeout to be 300s (5min)
    def test_methods(self):        
        self.eles_in_pages = {} # a global variable to record eles in pages
        text_input = "javascriptMinium"
        bind_json_file = os.path.join(self.mini.project_path, "bind_methods_navi.json") # try to find bind_methods_navi.json first
        if not os.path.exists(bind_json_file): # if it does not exist, use bind_methods.json
            bind_json_file = os.path.join(self.mini.project_path, "bind_methods.json")
        with open(bind_json_file) as f:
            self.bind_methods = json.load(f) # a global variable to record binding methods in pages
        # remove tab bar pages from bind_methods       
        app_json_file = os.path.join(self.mini.project_path, "app.json")
        with open(app_json_file) as f:
            content = json.load(f)
        self.tabbar_pages = []
        if 'tabBar' in content:
            self.tabbar_pages = [i['pagePath'] for i in content['tabBar']['list']]
        prioritized_triggers = ["bindinput", "bindconfirm", "bindsubmit", "catchsubmit"]
        pages = [page for page in self.bind_methods if page!="app"]
        for page in pages:
            for i in prioritized_triggers:
                if i in self.bind_methods[page]["binding_event"]:
                    del self.bind_methods[page]["binding_event"][i]
        self.pages = ['/' + i for i in pages]
        self.finished_pages = set()
        self.visited_pages = {} # record how many times we visit each page
        self.all_pages = set(self.pages)
        self.all_ele_cnt = 0
        self.all_binding_cnt = self.get_binding_cnt()
        self.mock_storage()
        
        def get_arg(trigger, item):
            return trigger_arg_dic[trigger]
        
        def dealWithInput(inputs, page):
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
                time.sleep(5)
                cur_path = self.app.get_current_page().path
                if page!=cur_path:
                    dealWithPage(cur_path)
        
        
                      
        def dealWithForm(forms, page):
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
                time.sleep(5)
                cur_path = self.app.get_current_page().path
                if page!=cur_path:
                    dealWithPage(cur_path)
        
        def dealWithOtherMethods(triggers, page):
            page_in_json = page[1:] if page.startswith('/') else page
            self.logger.info(f'[+] See triggers {triggers} in page: {page}')
            for trigger in triggers:
                if trigger not in trigger_arg_dic:
                    logger_main.error(f"[+] {trigger} not implemeted in trigger_arg_dic in miniapp {self.mini.project_path}")
                    # skip the ones we don't include for now, to see whether the test stops
                    self.bind_methods[page_in_json]["binding_event"][trigger] = []
                    continue
                items = self.bind_methods[page_in_json]["binding_event"][trigger]
                while len(items)>0:
                    item = items[0]
                    try:
                        # self.logger.info(f'[+] Try calling method {item["handler"]} in page {page}, current page: {self.app.get_current_page()}')
                        cur_path = self.app.get_current_page().path
                        if page!=cur_path:
                            self.logger.info(f'[+] Calling method in different pages')
                            dealWithPage(cur_path)
                            return
                            # stack = self.app.get_page_stack() 
                            # self.logger.error(f'[+] Current stack: {stack}')
                        result  = self.page.call_method(item["handler"], get_arg(trigger, item))
                        self.logger.info(f'[+] Call method {item["handler"]}, result: {result}')
                    except Exception as e:
                        self.logger.info(f'[+] Call method error {item["handler"]}')
                        logger_main.error(f'[+] Call method: {item["handler"]} error: {e} in miniapp {self.mini.project_path}')
                    items.remove(item)
                    self.logger.info(f'[+] There are {len(items)} methods for {trigger} left on page: {page}')
                    time.sleep(5) # wait until the call_method takes effect (if the call method is navigation)
                    cur_page = self.app.get_current_page()
                    cur_path = cur_page.path
                    self.logger.info(f'[+] Check current page: {cur_page}')
                    if page!=cur_path:
                        self.logger.info(f'[+] Navigate naturally, from {page} to {cur_path}')
                        # when this returns, we assume the page is still here, but it's not the case!
                        dealWithPage(cur_path)
                        return
                    
        def dealWithPage(page):
            page_in_json = page[1:] if page.startswith('/') else page
            if page in self.finished_pages:
                return
            if page not in self.eles_in_pages:
                inputs = self.find_all_inputs()
                forms = self.find_all_forms()
                # btns = self.find_all_buttons()
                self.eles_in_pages[page] = {"inputs":inputs, "forms":forms}
                ele_cnt = 0
                for ele_type in self.eles_in_pages[page]:
                    ele_cnt += len(self.eles_in_pages[page][ele_type])
                self.all_ele_cnt += ele_cnt

            # see if the page finishes
            bindings_cnt = 0
            triggers = [i for i in self.bind_methods[page_in_json]["binding_event"]]
            for trigger in triggers:
                bindings_cnt += len(self.bind_methods[page_in_json]["binding_event"][trigger])
            ele_cnt = 0
            for ele_type in self.eles_in_pages[page]:
                ele_cnt += len(self.eles_in_pages[page][ele_type])
            if bindings_cnt==0 and ele_cnt==0:
                self.finished_pages.add(page)
                self.pages.remove(page)
                logger_main.info(f'Page: {page} finished.')
                self.logger.info(f'[+] {page} finishes')
                return
            
            # for the triggers as input, we fire the event because that's where we taint e.detail.value
            dealWithInput(self.eles_in_pages[page]["inputs"], page)
            dealWithForm(self.eles_in_pages[page]["forms"], page)
            dealWithOtherMethods(triggers, page)
            
        # test starts here
        time.sleep(10) # give it some time for onLaunch?  
        MAX_VISIT_TIME = 3
        while len(self.pages)>0:
            page = self.pages[0]
            if page not in self.visited_pages:
                self.visited_pages[page] = 0
                query = {'testkey': 'testvalue'}
            else:
                if self.visited_pages[page]>MAX_VISIT_TIME:
                    self.logger.info(f'[+] Visit page: {page} {MAX_VISIT_TIME} times, we give up.')
                    self.finished_pages.add(page)
                    self.pages.remove(page)
                    continue
                query = None
            self.logger.info(f'[+] Navigate through API, to: {page}')
            if page[1:] in self.tabbar_pages: # tab bars can not pass parameters
                self.switch_tab_open(page)
            else:
                stack = self.app.get_page_stack() 
                if len(stack)>9:
                    self.relaunch_to_open(page, query)
                else:
                    self.navigate_to_open(page, query)
            
            time.sleep(5) # wait until navigation takes effect
            self.visited_pages[page] += 1
            logger_main.info(f'Page: {page} visited {self.visited_pages[page]} time.')
            dealWithPage(page)
        
        query = {'testkey': 'testvalue'}
        # visit the rest pages if they have not been visited with query
        visited_pages_set = set([i for i in self.visited_pages])
        if len(visited_pages_set)!=len(self.all_pages):
          for page in self.all_pages-visited_pages_set:
                if page[1:] not in self.tabbar_pages: # tab bars can not pass parameters
                    stack = self.app.get_page_stack() 
                    if len(stack)>9:
                        self.relaunch_to_open(page, query)
                    else:
                        self.navigate_to_open(page, query)
                    self.logger.info(f'[+] Navigate through API without dealWithPage, to: {page}')
                    time.sleep(5) # wait until navigation takes effect
                    self.visited_pages[page] = 1
                    logger_main.info(f'Page: {page} visited {self.visited_pages[page]} time.')
            
        
        
    def tearDown(self):
        logger_main.info(f'Finished {len(self.finished_pages)} pages out of {len(self.all_pages)}.')
        logger_main.info(f'Visited {len(self.visited_pages)} pages out of {len(self.all_pages)}.')
        logger_main.info(f'Visited {self.all_binding_cnt-self.get_binding_cnt()} binding functions out of {self.all_binding_cnt}.')
        logger_main.info(f'Visited {self.all_ele_cnt-self.get_ele_cnt()} input/forms out of {self.all_ele_cnt}.')
        self.mini.shutdown()
        super().tearDown()
        