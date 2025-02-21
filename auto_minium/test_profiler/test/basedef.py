import os
from time import sleep
import minium

class BaseDef(minium.MiniTest):
    
    def navigate_to_open(self, route, query=None):
        """以导航的方式跳转到指定页面,不允许跳转到 tabbar 页面,支持相对路径和绝对路径, 小程序中页面栈最多十层"""
        try:
            # query = {"value1": "1", "value2": "dd"}
            # page = self.app.navigate_to("/pages/testapp/testapp", query)
            # if query:
            self.app.navigate_to(route, query)
            # else:
                # self.app.navigate_to(route)
        except Exception as e:
            exception_message = e.args[0] if e.args else str(e)
            if (exception_message == "can not navigateTo a tabbar page"):
                self.app.switch_tab(route)
            else:
                print(f'having exception {exception_message} on navigating to page {route}')
    
    def redirect_to_open(self, route):
        """关闭当前页面，重定向到应用内的某个页面,不允许跳转到 tabbar 页面"""
        self.app.redirect_to(route)
    
    def relaunch_to_open(self, route, query=None):
        """关闭所有页面，打开到应用内的某个页面"""
        # if query:
        self.app.relaunch(route, query)
        # else:
            # self.app.navigate_to(route)
    
    def switch_tab_open(self, route):
        """跳转到 tabBar 页面,会关闭其他所有非 tabBar 页面"""
        self.app.switch_tab(route)
    
    def screen_shot_save(self, route):
        output_path = os.path.join(os.path.dirname(__file__), "images")
        if not os.path.isdir(os.path.dirname(output_path)):
            os.mkdir(os.path.dirname(output_path))
        self.app.screen_shot(output_path)  # 截图并存到`output_path`文件夹中
    
    def find_all_elements(self):
        all_elements = self.page.get_elements(selector="button,view,checkbox,input,textarea,form,scroll-view,switch,picker,radio-group", index=-1)
        return all_elements
    
    def find_all_pages(self):
        all_pages_path = self.app.get_all_pages_path()
        return all_pages_path

    def find_all_buttons(self):
        all_buttons = self.page.get_elements("button")
        return all_buttons
    
    def find_all_inputs(self):
        all_inputs = self.page.get_elements("input")
        textareas = self.page.get_elements("textarea")
        return all_inputs + textareas
    
    def find_all_forms(self):
        all_forms = self.page.get_elements("form")
        return all_forms
    
    def find_all_scroll_views(self):
        all_scroll_views = self.page.get_elements("scroll-view")
        return all_scroll_views
    
    def find_all_switches(self):
        all_switches = self.page.get_elements("switch")
        return all_switches
    
    def find_all_picker(self):
        all_pickers = self.page.get_elements("picker")
        return all_pickers

    def find_all_sliders(self):
        all_sliders = self.page.get_elements("slider")
        return all_sliders
    
    def find_all_radio_groups(self):
        all_radio_groups = self.page.get_elements("radio-group")
        return all_radio_groups

    def find_all_inputs_from_component(self, component):
        all_inputs = component.get_elements("input")
        textareas = component.get_elements("textarea")
        return all_inputs + textareas
    
    def element_is_exists(self, element):
        self.logger.info(f"asserting element {element}")
        bool = self.page.element_is_exists(element)
        try:
            assert bool == True
        except AssertionError:
            self.logger.error(f'assertion fails, invalid element {element}')
            raise AssertionError(f'assertion fails, invalid element {element}')
    
    def send_key(self, element, text: str):
        sleep(1)

        ele_text = self.page.get_element(element)
        ele_text.input(text)
    
    def check_key(self, element, text: str):
        sleep(1)

        ele_text = self.page.get_element(element)
        value = ele_text.attribute("value")[0]
        self.assertEqual(text, value, f"element {element} is properly modified")
        
    def tap(self, element):
        sleep(1)

        try:
            for _ in range(10):
                ele = self.mini.page.wait_for(element, max_timeout=3)
                if ele:
                    self.mini.logger.info(f'current tapping on element: {element}')
                    ele_tap = self.page.get_element(element)
                    ele_tap.tap()
                    sleep(0.7)
                    return
                else:
                    self.mini.logger.info(f'unable to find element {element}')
            raise RuntimeError(f'unable to find element {element}, exceeding waittime')
        except AttributeError as e:
            self.mini.logger.error(f'unable to tap on element {element}, getting error {e}')
            raise
        