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
import threading
import copy

# TODO: Add the statistics recording for the teardown function.
class Monkey_Query(BaseDef):
    logger_main = None

    def setUp(self):
        appid = self.mini.project_path.split('/')[-1]

    def get_binding_cnt(self):
        """Count all binding events for all pages."""
        return sum(
            len(events) for page in self.bind_methods for events in self.bind_methods[page]["binding_event"].values()
        )
    
    def get_all_triggered_binding_cnt(self):
        """Count all unique binding events for all pages."""
        return sum(
            len(events) for page in self.triggered_bind_methods for events in self.triggered_bind_methods[page]["binding_event"].values()
        )
    
    def get_ele_cnt(self):
        cnt = 0
        for page in self.eles_in_pages:
            for ele in self.eles_in_pages[page]:
                cnt += len(self.eles_in_pages[page][ele])
        return cnt

    def periodic_progress_log(self):
        """Log progress every 10 seconds in a separate thread."""
        while True:
            self.output_progress()
            time.sleep(5)

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
        inputs = self.find_all_inputs()
        switches = self.find_all_switches()
        pickers = self.find_all_picker()
        sliders = self.find_all_sliders()
        
        elements = forms + switches + pickers + sliders + inputs
        
        if not elements:
            self.logger_main.info("Form Filler: No forms, switches, or pickers found.")
            return

        element = random.choice(elements)
        
        try:
            if element in forms:
                element.input(self._get_random_inputs())
                if not self.eles_in_pages[self.app.get_current_page().path]:
                    self.eles_in_pages[self.app.get_current_page().path] = {"inputs":set(), "forms":set()}

                self.eles_in_pages[self.app.get_current_page().path]["forms"].add(element)

                # Update the self.eles_in_pages[page][ele_type]
                self.logger_main.info(f'Form Filler: Filled form with sample data.')
            
            elif element in inputs:
                element.input(self._get_random_inputs())

                if not self.eles_in_pages[self.app.get_current_page().path]:
                    self.eles_in_pages[self.app.get_current_page().path] = {"inputs":set(), "forms":set()}

                self.eles_in_pages[self.app.get_current_page().path]["inputs"].add(element)

                # Update the self.eles_in_pages[page][ele_type]
                self.logger_main.info(f'Form Filler: Filled input with sample data.')

            elif element in switches:
                element.switch()
                self.logger_main.info(f'Form Filler: Toggled switch {element}.')
                
            elif element in pickers:
                # element.pick()
                self.logger_main.info(f'Form Filler: Selected an option in picker {element}.')
            
            elif element in sliders:
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
        Randomly go to a page in the page history.
        """
        try:
            all_pages_path = self.app.get_all_pages_path()
            # Randomly choose a page path to navigate to
            chosen_path = random.choice(all_pages_path)
            if not chosen_path.startswith('/'):
                chosen_path = '/' + chosen_path
            self.navigate_to_open(chosen_path)
            self._onAppRoute()
            self.logger_main.info(f"Page: Navigated to {chosen_path}")
        except Exception as e:
            self.logger_main.info(f"Page: Could not navigate to a page: {e}")
            pass
    
    def _setupProgressData(self):
        bind_json_file = os.path.join(self.mini.project_path, "bind_methods_navi.json")
        if not os.path.exists(bind_json_file):
            bind_json_file = os.path.join(self.mini.project_path, "bind_methods.json")
        
        with open(bind_json_file) as f:
            self.bind_methods = json.load(f)
        
        app_json_file = os.path.join(self.mini.project_path, "app.json")
        with open(app_json_file) as f:
            content = json.load(f)
        
        self.tabbar_pages = [i['pagePath'] for i in content.get('tabBar', {}).get('list', [])]
        prioritized_triggers = ["bindinput", "bindconfirm", "bindsubmit", "catchsubmit"]
        pages = [page for page in self.bind_methods if page != "app"]
        
        for page in pages:
            for trigger in prioritized_triggers:
                if trigger in self.bind_methods[page]["binding_event"]:
                    del self.bind_methods[page]["binding_event"][trigger]
                    
        self.pages = ['/' + i for i in pages]
        self.finished_pages = set()
        self.visited_pages = {}
        self.eles_in_pages = {}
        self.all_pages = set(self.pages)
        self.all_binding_cnt = self.get_binding_cnt()

        for page in pages:
            self.eles_in_pages[page] = {"inputs":set(), "forms":set()}

        self._setupHooksForProgressLogging()

        # Clear all the binding methods and collect during the testing
        self.triggered_bind_methods = copy.deepcopy(self.bind_methods)
        for page in pages:
            for trigger in self.triggered_bind_methods[page]["binding_event"]:
                self.triggered_bind_methods[page]["binding_event"][trigger] = set()

        # Log the initialized state
        self.logger_main.info("Initial Setup: Pages and elements counted for progress logging.")
        # self.logger_main.info(f'Pages: {self.pages}')
        # self.logger_main.info(f'Bindings: {self.bind_methods}')

    def _setupHooksForProgressLogging(self):
        self._onAppRoute() # Trigger the initial page setup
        self.app.hook_wx_method("onAppRoute", after=self._onAppRoute)
    
    def _onAppRoute(self):
        """
        Update the visited pages and bind all methods on the current page.
        Registers hooks for each binding event on the page, and increments a count each time
        a binding event is triggered.
        """
        # Get the current page path
        current_page = self.app.get_current_page().path
        self.logger_main.info(f"Navigated to page: {current_page}")

        # Track the visit count for the current page
        if current_page not in self.visited_pages:
            self.visited_pages[current_page] = 1
            self.logger_main.info(f"Page {current_page} visited for the first time.")
        else:
            self.visited_pages[current_page] += 1
            self.logger_main.info(f"Page {current_page} visited {self.visited_pages[current_page]} times.")

        # Set up and register hooks for each binding event on the current page
        page_in_json = current_page[1:] if current_page.startswith('/') else current_page
        if page_in_json in self.bind_methods and "binding_event" in self.bind_methods[page_in_json]:
            for trigger, handlers in self.bind_methods[page_in_json]["binding_event"].items():
                if handlers:
                    for handler in handlers:
                        handler_name = handler["handler"]
                        self._register_hook_for_handler(handler_name, page_in_json, trigger)

        # Update the self.eles_in_pages[page]
        self.eles_in_pages[current_page] = {"inputs": set(), "forms": set()} 

    def _register_hook_for_handler(self, handler_name, page, trigger):
        """
        Register a hook for the specified handler on the current page.
        Increments the count each time the handler is called.
        """
        # Define a callback function to increment the count for this handler
        def callback(*args, **kwargs):
            self.logger_main.info(f"Handler '{handler_name}' for trigger '{trigger}' on page '{page}' called.")

            # Initialize the structure if page and trigger are not yet in bind_methods
            if page not in self.triggered_bind_methods:
                self.triggered_bind_methods[page] = {"binding_event": {}}
            if trigger not in self.triggered_bind_methods[page]["binding_event"]:
                self.triggered_bind_methods[page]["binding_event"][trigger] = set()

            self.triggered_bind_methods[page]["binding_event"][trigger].add(f"{handler_name}")

        # Register the hook for the handler on the current page
        try:
            self.app.hook_current_page_method(handler_name, callback)
        except Exception as e:
            self.logger_main.info(f"Could not register hook for handler '{handler_name}' on page '{page}': {e}")
            pass
        self.logger_main.info(f"Hook registered for handler '{handler_name}' on page '{page}' with trigger '{trigger}'.")

    def test_like_monkeys(self):
        """
        Randomly pick one action, execute it, then wait for 100ms before the next action.
        """
        self._setupProgressData()

        progress_thread = threading.Thread(target=self.periodic_progress_log, daemon=True)
        progress_thread.start()

        actions = (
            [self._clicker_gremlin] * 15 +
            [self._form_filler_gremlin] * 50 +
            [self._toucher_gremlin] * 15 +
            [self._scroller_gremlin] * 15 +
            [self._page_gremlin] * 5
        )

        for _ in range(10000):
            try:
                action = random.choice(actions)
                action()
                self.logger_main.info(f'Monkey Test: Executed {action.__name__}')
                time.sleep(0.5)
            except Exception as e:
                self.logger_main.info(f'Monkey Test: An error occurred during monkey testing: {e}')
                pass
    
    def output_progress(self):
        self.logger_main.info("==============================OUTPUT PROGRESS==============================")
        self.logger_main.info(f'Visited {len(self.visited_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {self.get_all_triggered_binding_cnt()} binding functions out of {self.all_binding_cnt}.')
        self.logger_main.info(f'Visited {self.get_ele_cnt()} input/forms out of minium.all_ele_cnt.')
        self.logger_main.info("==============================OUTPUT PROGRESS==============================")
        
    def tearDown(self):
        self.logger_main.info(f'Visited {len(self.visited_pages)} pages out of {len(self.all_pages)}.')
        self.logger_main.info(f'Visited {self.get_all_triggered_binding_cnt()} binding functions out of {self.all_binding_cnt}.')
        self.logger_main.info(f'Visited {self.get_ele_cnt()} input/forms out of minium.all_ele_cnt.')
        self.mini.shutdown()
        super().tearDown()