from base_test import BaseTest

class CoverageTest(BaseTest):

    @classmethod
    def setUpClass(cls):
        try:
            super(CoverageTest, cls).setUpClass()
            cls.coverage_info = []
        except Exception as e:
            print(f"encountering error : {e}")
            cls.tearDownClass()
