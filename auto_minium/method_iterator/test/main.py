#!/usr/bin/env python3.8

from test_minium import Minium_Query
import unittest, time, datetime
import subprocess
import logging
import os
import json
logger_main = logging.getLogger(__name__)
logging.basicConfig(
    filename='autominium_test.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)
# from utils import write_to_file

def run_python_script(script_path):
    subprocess.run(['python', script_path, config["project_path"]])
    
class MyTestResult(unittest.TextTestResult):
    def addError(self, test, err):
        super().addError(test, err)
        error_message = self._exc_info_to_string(err, test)
        # Log the error message
        logger_main.error("Error in test: %s\n%s", test, error_message)

    def addFailure(self, test, err):
        super().addFailure(test, err)
        failure_message = self._exc_info_to_string(err, test)
        # Log the failure message
        logger_main.error("Failure in test: %s\n%s", test, failure_message)
        
class MyTestRunner(unittest.TextTestRunner):
    def _makeResult(self):
        return MyTestResult(self.stream, self.descriptions, self.verbosity)
    
if __name__ == "__main__":
    start_time = time.time()
    with open("config.json") as f:
        config = json.load(f)
    logger_main.info("Start Running test for: " + config["project_path"])
    
    bind_json_file = os.path.join(config["project_path"], "bind_methods.json")
    bind_navi_json_file = os.path.join(config["project_path"], "bind_methods_navi.json")
    if (not os.path.exists(bind_json_file)) and (not os.path.exists(bind_navi_json_file)):
        script_path = "/media/dataj/MiniScope/src/static/miniapp.py"
        subprocess.run(['python', script_path, config["project_path"]])
        logger_main.info(f"Generate bind_methods.json for {config['project_path']}")
    
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(Minium_Query)
    runner = MyTestRunner(verbosity=2)
    result = runner.run(loaded_suite)
    elapse_time = "Elapse time: " +  str(datetime.timedelta(seconds=(time.time() - start_time))) + "\n"
    logger_main.info(result)
    logger_main.info(elapse_time)
    # cmd = "pkill -f nwjs"
    # subprocess.run(['pkill', '-f', 'nwjs'])
