#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/12/28
Description:    

"""
import json
import time
import unittest

from attestbase import AtTestBase
import at.core.uixml


class UiXMLTest(unittest.TestCase):
    def test_json_to_views(self):
        ui_views = self.at.java_driver.get_ui_views()
        node_json = ui_views[0].dump_to_jsons()
        for ui_view in at.core.uixml.json_2_ui_views(node_json):
            print(ui_view)

    def test_remove_kinda(self):
        content = open("/Users/xiazeng/Downloads/next_step.xml", 'r').read()
        print(type(content))
        remove_content = at.core.uixml.remove_kinda_window(content).decode("utf-8")
        print(remove_content)
        # open("/Users/xiazeng/Downloads/next_step_decode.xml", 'w').write(remove_content.decode("utf-8"))
        # content = open("/Users/xiazeng/Downloads/window_dump.xml", 'r').read().encode('utf-8')
        # remove_content = at.core.uixml.remove_kinda_window(content)
        # open("/Users/xiazeng/Downloads/window_dump_decode.xml", 'w').write(remove_content.decode('utf-8'))

    def test_xpath(self):

        # filename = '/Users/xiazeng/Downloads/1645709269125.xml'
        filename = '/Users/xiazeng/Downloads/1645775262986.xml'
        s = time.time()
        ui_views = at.core.uixml.window_dump_parse(filename)
        for ui_view in ui_views:
            print(ui_view)
            print(ui_view.get_xpath())
            print(ui_view.get_xpath(True))
            print(ui_view.get_xpath(True, True))
            print(ui_view.get_xpath(False, True))
            break
        index = 0
        # for ui_view in ui_views:
        #     for ot in ui_views:
        #         xpath = ot.get_xpath()
        #         index += 1
        print(index, time.time() - s)
