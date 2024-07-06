#!/usr/bin/env python3.8

from monkey import Monkey_Query
import unittest, time, datetime
from utils import write_to_file

if __name__ == "__main__":
    start_time = time.time()
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(Monkey_Query)
    result = unittest.TextTestRunner().run(loaded_suite)
    elapse_time = "elapse time: " +  str(datetime.timedelta(seconds=(time.time() - start_time))) + "\n"
    write_to_file(result, 'test_result_log.txt')
    write_to_file(elapse_time, 'test_result_log.txt')
    print(result)
