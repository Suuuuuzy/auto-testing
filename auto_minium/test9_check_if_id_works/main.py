from tests import baseTest
from pipeline import write_to_file
import unittest, time, datetime

if __name__ == "__main__":
    start_time = time.time()
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(baseTest)
    result = unittest.TextTestRunner().run(loaded_suite)
    #elapse_time = "elapse time: " +  str(datetime.timedelta(seconds=(time.time() - start_time))) + "\n"
    # write_to_file(result, 'test_result_log.txt')
    write_to_file(result, 'test_result_log.txt')
    # print(result)
