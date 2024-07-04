import unittest
import minium_tests.miniprogram_checker_log00 as minium_script

if __name__ == "__main__":
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(minium_script.Miniprogram_Checker)
    result = unittest.TextTestRunner().run(loaded_suite)
