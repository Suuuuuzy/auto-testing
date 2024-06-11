import os
from pipeline_utils.solve_fail import solve_fail
from pipeline_utils.modify_wxml import format_wxml_style_attribute
from pipeline_utils.modify_wxs import format_wxs_style_attribute
from pipeline_utils.modify_app_json import check_borderStyle, check_window_attrs, check_attrs, read_json_file, write_json_file
import logging
logger = logging.getLogger(__name__)

def find_and_format_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = (os.path.join(root, file))
            if file.endswith('.wxml'):
                format_wxml_style_attribute(file_path)
            elif file=="bem.wxs":
                logger.info("found bem.wxs at:{}".format(os.path.join(root, file)))
                format_wxs_style_attribute(os.path.join(root, file))
            elif file.endswith('.js'):
                solve_fail(file_path)
            elif file.endswith('.json') and file!="app.json":
                # print(file)
                json_data = read_json_file(file_path)
                if not json_data:
                    continue
                check_borderStyle(json_data)
                check_window_attrs(json_data)
                check_attrs(json_data)
                write_json_file(file_path, json_data)