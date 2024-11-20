#!/usr/bin/env python3.8

from test_minium import Minium_Query
import unittest, time, datetime
import subprocess
import logging
import os
import sys
import json
import signal

global logger_main
test_cases = []

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

def cleanup():
    """Function to call teardown on each test case."""
    logger_main.info("Running cleanup: calling teardown on all test cases.")
    for test_case in test_cases:
        test_case.tearDown()

def handle_termination_signal(signum, frame):
    """Handle termination signals to ensure cleanup runs."""
    logger_main.info(f"Termination signal {signum} received. Running cleanup.")
    cleanup()
    sys.exit(0)
    
def maintest(log_file_path='autominium_test.log'):
    start_time = time.time()

    global logger_main
    logger_main = logging.getLogger(__name__)
    logging.basicConfig(
        filename=log_file_path,
        level=logging.DEBUG,
        format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
    )

    Minium_Query.logger_main = logger_main
    
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(Minium_Query)
    for test_case in loaded_suite:
        logger_main.info(test_case)
        test_cases.append(test_case)
    
    signal.signal(signal.SIGTERM, handle_termination_signal)
    signal.signal(signal.SIGINT, handle_termination_signal)

    runner = MyTestRunner(verbosity=2)
    result = runner.run(loaded_suite)
    elapse_time = "Elapse time: " +  str(datetime.timedelta(seconds=(time.time() - start_time))) + "\n"
    logger_main.info(result)
    logger_main.info(elapse_time)

if __name__ == "__main__":
    maintest()