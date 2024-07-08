from basedef import BaseDef
import os, json, time
from bind_func_arguments import *
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
        text_input = "javascriptMinium"
        # try to find bind_methods_navi.json first
        bind_json_file = os.path.join(self.mini.project_path, "bind_methods_navi.json")
        # if it does not exist, use bind_methods.json
        if not os.path.exists(bind_json_file):
            bind_json_file = os.path.join(self.mini.project_path, "bind_methods.json")
        with open(bind_json_file) as f:
            bind_methods = json.load(f)
        pages = self.find_all_pages()
        pages = ['/' + i for i in pages]
        finished_pages = set()
        visited_pages = set()
        all_pages_length = len(pages)
        all_pages = set(pages)
        
        def get_arg(trigger, item):
            if trigger not in ["bindsubmit"]:
                return trigger_arg_dic[trigger]
            elif trigger == "bindsubmit":
                arg = trigger_arg_dic[trigger]
                form_data = item["form_dic"]
                for key in form_data:
                    form_data[key] = text_input 
                arg["detail"]["value"] = form_data
                return arg
                
        def dealWithPage(page):
            page_in_json = page[1:]
            if page in finished_pages:
                return
            bindings_cnt = 0
            for trigger in bind_methods[page_in_json]["binding_event"]:
                # if trigger not in ["bindsubmit"]:
                bindings_cnt += len(bind_methods[page_in_json]["binding_event"][trigger])
            if bindings_cnt==0:
                finished_pages.add(page)
                pages.remove(page)
                self.logger.info(f'[+] {page} finishes')
                return
            
            # we want to do bindsubmit, bindinput, bindconfirm first? then bindtap, bindblur?
            triggers = [i for i in bind_methods[page_in_json]["binding_event"]]
            prioritized_triggers = ["bindinput", "bindconfirm", "bindsubmit"]
            # if trigger in prioritized_triggers exists in triggers, move them to the front
            for trigger in prioritized_triggers:
                if trigger in triggers:
                    triggers.remove(trigger)
                    triggers.insert(0, trigger)
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
        