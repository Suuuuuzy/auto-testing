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

def kill_wechat():
    # Find PIDs of processes containing "wechat"
    find_process = subprocess.run(['pgrep', '-f', 'wechat-web-devtools-linux-nodebug'], capture_output=True, text=True)

    # Check if any PIDs were found
    if find_process.stdout:
        pids = find_process.stdout.splitlines()  # Split output into lines to get individual PIDs
        for pid in pids:
            # Kill each process using SIGKILL
            subprocess.run(['kill', '-9', pid])
            print(f"Killed process with PID: {pid}")
    else:
        print("No processes found matching 'wechat'.")
    
def maintest():
    kill_wechat()
    # subprocess.run(['pkill', '-f', 'wechat'])
    # subprocess.run(['pkill', '-f', 'nwjs'])
    start_time = time.time()
    with open("config.json") as f:
        config = json.load(f)
    logger_main.info("Start Running test for: " + config["project_path"])
    
    app_json = os.path.join(config["project_path"], "app.json")
    if not os.path.exists(app_json):
        logger_main.error("No app.json for: " + config["project_path"])
        return
    # preprocess
    script_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/data_utils/single_preprocess.py"
    subprocess.run(['python', script_path, config["project_path"]])
    logger_main.info(f"Preprocess for {config['project_path']}")
    
    bind_json_file = os.path.join(config["project_path"], "bind_methods.json")
    bind_navi_json_file = os.path.join(config["project_path"], "bind_methods_navi.json")
    # regenrate the bind_methods.json file
    if os.path.exists(bind_json_file):
        os.remove(bind_json_file)
    if os.path.exists(bind_navi_json_file):
        os.remove(bind_navi_json_file)
    if (not os.path.exists(bind_json_file)) and (not os.path.exists(bind_navi_json_file)):
        script_path = "/media/dataj/wechat-devtools-linux/prework/MiniScope/src/static/generate_binds_for_jianjia.py"
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

if __name__ == "__main__":
    maintest()