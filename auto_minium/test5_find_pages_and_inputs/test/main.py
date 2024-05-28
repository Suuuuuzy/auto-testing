#!/usr/bin/env python3.8

from test_minium import Minium_Query
import unittest, time, datetime
import subprocess
import logging
logger_main = logging.getLogger(__name__)
logging.basicConfig(
    filename='autominium_test.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)
# from utils import write_to_file

if __name__ == "__main__":
    start_time = time.time()
    logger_main.info("start time: " + str(datetime.datetime.fromtimestamp(start_time).isoformat()))
    # write_to_file("start time: " + str(datetime.datetime.fromtimestamp(start_time).isoformat()), 'test_result_log.txt')
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(Minium_Query)
    result = unittest.TextTestRunner().run(loaded_suite)
    elapse_time = "elapse time: " +  str(datetime.timedelta(seconds=(time.time() - start_time))) + "\n"
    # write_to_file(result, 'test_result_log.txt')
    # write_to_file(elapse_time, 'test_result_log.txt')
    logger_main.info(result)
    logger_main.info(elapse_time)
    # cmd = "pkill -f nwjs"
    subprocess.run(['pkill', '-f', 'nwjs'])
    # print(result)
