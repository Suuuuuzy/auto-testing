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
    
def maintest():
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(Minium_Query)
    runner = MyTestRunner(verbosity=2)
    result = runner.run(loaded_suite)
    logger_main.info(result)
    
if __name__ == "__main__":
    maintest()