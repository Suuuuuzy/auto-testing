import minium


class BaseCase(minium.MiniTest):
    """
    初始化Minium实例, 测试用例基类
    """

    def __init__(self, *args, **kwargs):
        """
        This function overrides the initiation.
        It is currently used to add an additional command which enables the console log to be recorded.
        """
        print("BaseClass __init__ called")
        super().__init__(*args, **kwargs)

    def open_route(self, route: str) -> None:
        """
        This function is used to navigate to any page-based unit in the miniprogram.
        the pages mechanism doesn't necessarily differentiate between tabBar and pages,
        so this is needed to navigate to different kinds of pages.

        Args:
            route : the string of the page route taken
        """
        try:
            self.app.navigate_to(route)
        except Exception as e:
            exception_message = e.args[0] if e.args else str(e)
            if exception_message == "can not navigateTo a tabbar page":
                self.app.switch_tab(route)
            else:
                print(
                    f"having exception {exception_message} on navigating to page {route}"
                )

    # def setUp(self):
    #     super().setUp()
    #     print("setting log to enabled")
    #     self.app.enable_log()

    # def tearDown(self):
    #     """
    #     This function overrides the initial tearDown.
    #     It will close the miniprogram after the completion of the test suite,
    #     otherwise the devTool would not move to the next miniprogram.
    #     """
    #     self.mini.shutdown()
    #     super().tearDown()

    @classmethod
    def setUpClass(cls):
        super(BaseCase, cls).setUpClass()
        print("setting log to enabled")
        cls.app.enable_log()

    @classmethod
    def tearDownClass(cls):
        # cls.mini.shutdown()
        super(BaseCase, cls).tearDownClass()

    def setUp(self):
        pass

    def tearDown(self):
        pass
