import unittest, minium_tests.page_checker

if __name__ == "__main__":
    loaded_suite = unittest.TestLoader().loadTestsFromTestCase(minium_tests.page_checker.PageChecker)
    result = unittest.TextTestRunner().run(loaded_suite)
