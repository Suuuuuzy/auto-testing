import os, json, time
import threading
from basedef import BaseDef
from bind_func_arguments import get_arg, trigger_arg_dic

class Minium_Query(BaseDef):
    logger_main = None
    
    def setUp(self):
        appid = self.mini.project_path.split('/')[-1]
    
    def periodic_progress_log(self):
        """Log progress every 5 seconds in a separate thread."""
        while True:
            self.output_progress()
            time.sleep(5)
        
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
    
    def _setupProcessOutput(self):
        progress_thread = threading.Thread(target=self.periodic_progress_log, daemon=True)
        progress_thread.start()

    def test_methods(self):
        page = self.app.get_current_page()
        page._send("Page.waitForDebugger", {})
            
    def output_progress(self):
        self.logger_main.info("==============================OUTPUT PROGRESS==============================")
        self.logger_main.info(f'Finished {len(self.finished_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {len(self.visited_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {self.all_binding_cnt-self.get_binding_cnt()} binding functions out of {self.all_binding_cnt}.')
        self.logger_main.info(f'Visited {self.all_ele_cnt-self.get_ele_cnt()} input/forms out of {self.all_ele_cnt}.')
        self.logger_main.info("==============================OUTPUT PROGRESS==============================")
        
    def tearDown(self):
        self.logger_main.info(f'Finished {len(self.finished_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {len(self.visited_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {self.all_binding_cnt-self.get_binding_cnt()} binding functions out of {self.all_binding_cnt}.')
        self.logger_main.info(f'Visited {self.all_ele_cnt-self.get_ele_cnt()} input/forms out of {self.all_ele_cnt}.')
        self.mini.shutdown()
        super().tearDown()