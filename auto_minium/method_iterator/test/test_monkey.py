"""
@Description:
----------------------------------------
The monkey test used for the ablation study of the paper. The design largely follows the https://github.com/marmelab/gremlins.js.

@Design:
----------------------------------------
- There are four types of gremlins: Clicker, FormFiller, Scroller, and Toucher.
    - Clicker: For the all the elements, the gremlin will do tap, long_press
    - FormFiller: For the FormElement, the gremlin will do input, switch, slide_to, and pick
    - Scroller: For the ViewElement and page, the gremlin will do scroll_to, swipe_to, and move_to
    - Toucher: For the all the elements, the gremlin will do move, touch
      (Refer to: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#touches)

- Strategy:
    - Randomly select a element from the page and a gremlin to do the action.
    - Don't care about any page status. Just randomly do the action.
"""

from basedef import BaseDef
import os
import json
import base64
import random
import time


# TODO: Add the statistics recording for the teardown function.
class Monkey_Query(BaseDef):
    logger_main = None

    def setUp(self):
        appid = self.mini.project_path.split('/')[-1]

    def _get_random_inputs(self):
        """
        Get random inputs for the form filler gremlin.
        """
        return random.choice(["Sample t0ext", "1234@gmail.com", "abcd", "1.234", "true", "false", "13524854859"])

    def _clicker_gremlin(self):
        """
        Randomly select an element from the current page 
        and perform either a tap or long_press action on it.
        """
        all_elements = self.find_all_elements()
        if not all_elements:
            self.logger_main.info("Clicker: No elements found on the page.")
            return

        element = random.choice(all_elements)
        action = random.choice(["tap", "long_press"])

        try:
            if action == "tap":
                element.tap()
                self.logger_main.info(f'Clicker: Successfully tapped on {element}')
            else:
                element.long_press()
                self.logger_main.info(f'Clicker: Successfully long-pressed on {element}')
        except Exception as e:
            self.logger_main.info(f'Clicker: Cannot perform {action} on {element}: {e}')
            pass
    
    def _form_filler_gremlin(self):
        """
        Randomly select a Form, Switch, Slider, or Picker element 
        And perform an input, switch, slide, or pick action on it.
        """
        forms = self.find_all_forms()
        switches = self.find_all_switches()
        pickers = self.find_all_picker()
        sliders = self.find_all_sliders()
        
        elements = forms + switches + pickers + sliders
        
        if not elements:
            self.logger_main.info("Form Filler: No forms, switches, or pickers found.")
            return

        element = random.choice(elements)
        
        try:
            if element.tag_name == "form":
                for input_field in self.find_all_inputs():
                    input_field.input(self._get_random_inputs())
                self.logger_main.info(f'Form Filler: Filled form with sample data.')
                
            elif element.tag_name == "switch":
                element.switch()
                self.logger_main.info(f'Form Filler: Toggled switch {element}.')
                
            elif element.tag_name == "picker":
                # element.pick()
                self.logger_main.info(f'Form Filler: Selected an option in picker {element}.')
            
            elif element.tag_name == "slider":
                element.slide_to(random.randint(0, 100))
                self.logger_main.info(f'Form Filler: Slid slider {element} to 50%.')
                
            else:
                self.logger_main.info(f'Form Filler: Element type {element.tag_name} not handled.')
                
        except Exception as e:
            self.logger_main.info(f'Form Filler: Could not interact with {element}: {e}')
            pass

    def _scroller_gremlin(self):
        """
        Select the current page or a View element and perform a scroll_to action on it.
        """
        view_elements = self.find_all_scroll_views()
        
        if view_elements and random.choice([True, False]):
            element = random.choice(view_elements)
            target = "View element"
        else:
            element = self.page
            target = "page"

        try:
            max_x = getattr(element, 'height', 500)  # Replace with actual property if available
            x = random.randint(0, max_x)

            element.scroll_to(x, 200) # in 200ms
            self.logger_main.info(f'Scroller: Successfully scrolled on {target}')
        except Exception as e:
            self.logger_main.info(f'Scroller: Could not scroll on {target}: {e}')
            pass
    
    def _toucher_gremlin(self):
        """
        Randomly select an element from the current page 
        and perform a move action on it by dragging to a random location within the element's bounds.
        (Triggers the touch_start, touch_move, and touch_end events)
        """
        all_elements = self.find_all_elements()
        if not all_elements:
            self.logger_main.info("Toucher: No elements found on the page.")
            return

        element = random.choice(all_elements)
        
        try:
            max_x = getattr(element, 'width', 1000)
            max_y = getattr(element, 'height', 1000)
            start_x = random.randint(0, max_x)
            start_y = random.randint(0, max_y)
            end_x = random.randint(0, max_x)
            end_y = random.randint(0, max_y)

            element.move(start_x, start_y, end_x, end_y)
            self.logger_main.info(f'Toucher: Moved from ({start_x}, {start_y}) to ({end_x}, {end_y}) on {element}')
        
        except Exception as e:
            self.logger_main.info(f'Toucher: Could not perform move on {element}: {e}')
            pass

    
    def _page_gremlin(self):
        """
        Randomly goto a page in the page history.
        """
        try:
            pages = self.app.get_page_stack()
            if not pages:
                self.logger_main.info("Page: No pages in the history.")
                return
            self.app.navigate_to(random.choice(pages).path)
        except Exception as e:
            self.logger_main.info(f'Page: Could not go back on the page: {e}')
            pass


    def test_like_monkeys(self):
        """
        Randomly pick one action, execute it, then wait for 100ms before the next action.
        """
        actions = [
            self._clicker_gremlin,
            self._clicker_gremlin,
            self._form_filler_gremlin,
            self._form_filler_gremlin,
            self._scroller_gremlin,
            self._toucher_gremlin,
            self._toucher_gremlin,
            self._page_gremlin
        ]

        for _ in range(1000):
            try:
                action = random.choice(actions)
                action()
                self.logger_main.info(f'Monkey Test: Executed {action.__name__}')
                time.sleep(0.2)
            except Exception as e:
                self.logger_main.info(f'Monkey Test: An error occurred during monkey testing: {e}')
                pass
        
    def tearDown(self):
        self.logger_main.info(f'Finished {len(self.finished_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {len(self.visited_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {self.all_binding_cnt-self.get_binding_cnt()} binding functions out of {self.all_binding_cnt}.')
        self.logger_main.info(f'Visited {self.all_ele_cnt-self.get_ele_cnt()} input/forms out of {self.all_ele_cnt}.')
        self.mini.shutdown()
        super().tearDown()