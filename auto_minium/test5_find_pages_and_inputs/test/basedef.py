import os
from time import sleep
import minium

class BaseDef(minium.MiniTest):
    
    def open_route(self, route):
        try:
            self.app.navigate_to(route)
        except Exception as e:
            exception_message = e.args[0] if e.args else str(e)
            if (exception_message == "can not navigateTo a tabbar page"):
                self.app.switch_tab(route)
            else:
                print(f'having exception {exception_message} on navigating to page {route}')
    
    def screen_shot_save(self, route):
        output_path = os.path.join(os.path.dirname(__file__), "images")
        if not os.path.isdir(os.path.dirname(output_path)):
            os.mkdir(os.path.dirname(output_path))
        #if os.path.isfile(output_path):
        #    os.remove(output_path)
        self.app.screen_shot(output_path)  # 截图并存到`output_path`文件夹中
        #self.assertTrue(os.path.isfile(output_path))
        #os.remove(output_path)
    
    def redirect_to_open(self, route):
        self.app.redirect_to(route)
    
    def relaunch_to_open(self, route):
        self.app.relaunch(route)
    
    def find_all_pages(self):
        all_pages_path = self.app.get_all_pages_path()
        return all_pages_path

    def find_all_buttons(self):
        all_buttons = self.page.get_elements("button")
        return all_buttons
    
    def find_all_inputs(self):
        all_inputs = self.page.get_elements("input")
        return all_inputs
    
    def find_all_forms(self):
        all_forms = self.page.get_elements("form")
        return all_forms

    def find_all_inputs_from_component(self, component):
        all_inputs = component.get_elements(input)
        return all_inputs
    
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
        