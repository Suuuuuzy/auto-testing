import minium

class BaseTest(minium.MiniTest):

    def skip_test_work(self):
        print(self.mini.get_system_info())

    @classmethod
    def setUpClass(cls):
        super(BaseTest, cls).setUpClass()

    @classmethod
    def tearDownClass(cls):
        cls.mini.shutdown()
        super(BaseTest, cls).tearDownClass()

    def setUp(self):
        pass

    def tearDown(self):
        pass