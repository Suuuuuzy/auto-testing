import minium, threading
from pipeline import write_to_file

class baseTest(minium.MiniTest):

    def test_work(self):
        is_exception_thrown = threading.Semaphore(0)  # 监听回调, 阻塞当前主线程
        e = None
        def on_exception(err):
            nonlocal e
            is_exception_thrown.release()
            e = err

        self.app.on_exception_thrown(on_exception)
        try:
            # print(self.mini.get_system_info())
            self.app.navigate_to(self.app.get_current_page())  # 进入页面会throw error
        except:
            pass
        if is_exception_thrown.acquire(timeout=10) is True:
            write_to_file(f"get exception when loading into the page: {e}", 'test_result_log.txt')
        # self.assertTrue(, "监听到报错")
        # self.assertTrue(is_exception_thrown.acquire(timeout=10), "监听到第二次报错")
        # self.assertEqual(e.message, "thisonload is not defined")
        # self.assertIsNotNone(e.stack, "stack not empty")
        

    @classmethod
    def setUpClass(cls):
        try:
            super(baseTest, cls).setUpClass()
        except Exception as e:
            write_to_file(f"encountering error during set up Class :\n {e}\n\n", 'test_result_log.txt')
            cls.tearDownClass()

    @classmethod
    def tearDownClass(cls):
        cls.mini.shutdown()
        super(baseTest, cls).tearDownClass()

    def setUp(self):
        pass

    def tearDown(self):
        pass