import unittest
from tests.test1 import Minium_Query_wx0bc8123197e70985

if __name__ == "__main__":
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(
        Minium_Query_wx0bc8123197e70985
    )
    result = unittest.TextTestRunner().run(loaded_suite)
    print(result)
