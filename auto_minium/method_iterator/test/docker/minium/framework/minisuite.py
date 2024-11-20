'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-04-27 10:22:31
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-06-21 17:57:21
FilePath: /py-minium/minium/framework/minisuite.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
"""
Author:         lockerzhang
Filename:       minisuite.py
Create time:    2020/1/3 16:22
Update time:    2022/4/12 16:29
Description:    测试suite实例, 同时记录package的import状态

"""
import os
import json
import fnmatch
import logging.handlers
from .exception import MiniParamsError
from json import JSONDecodeError
import traceback

logger = logging.getLogger("minium")


class MiniSuite(object):
    def __init__(self, path_or_dict=None):
        self.__suite_json = {}
        if isinstance(path_or_dict, (str, bytes)):
            try:
                if os.path.exists(path_or_dict):
                    with open(path_or_dict, "rb") as fd:
                        content = fd.read()
                    try:
                        self.__suite_json = json.loads(content.decode("utf8"))  # use utf8 encoding
                    except UnicodeDecodeError:
                        self.__suite_json = json.loads(content.decode("gbk"))
                else:
                    self.__suite_json = json.loads(path_or_dict)
            except JSONDecodeError as e:
                raise MiniParamsError(f"Suite param {path_or_dict} not file neither dict or formatted json string: {e}") from e
        elif isinstance(path_or_dict, dict):
            self.__suite_json = path_or_dict
        else:
            raise MiniParamsError(f"Suite param should string or dict, not {type(path_or_dict).__name__}")
        self.__success_pkg = set()
        self.__fail_pkg = {}

    def __getattribute__(self, __name: str):
        try:
            return super().__getattribute__(__name)
        except AttributeError:
            if __name in self.__suite_json:
                return self.__suite_json.get(__name)
            raise

    def get_case_config(self, cls_name, case_name):
        for pkg_cases in self.pkg_list:
            pkg = pkg_cases["pkg"]
            if fnmatch.fnmatch(cls_name, pkg):
                for case_info in pkg["case_list"]:
                    if isinstance(case_info, dict):
                        if fnmatch.fnmatch(case_info["name"], case_name):
                            return case_info.get("attr", dict())
        return dict()

    @property
    def pkg_list(self):
        return self.__suite_json.get("pkg_list", list())

    @property
    def case_list(self):
        return self.__suite_json.get("case_list", list())

    def set_pkg_success(self, pkg: str):
        self.__success_pkg.add(pkg)

    def set_pkg_fail(self, pkg: str, e: Exception = None):
        if pkg not in self.__fail_pkg:
            stack_lines = traceback.format_exception(type(e), e, e.__traceback__)
            self.__fail_pkg[pkg] = {
                "error_type": type(e).__name__,
                "error_value": str(e.args[0]) if len(e.args) > 0 else "",
                "errors": "".join(stack_lines)
            }

    @property
    def success_pkg(self):
        return list(self.__success_pkg)

    @property
    def fail_pkg(self):
        return dict(self.__fail_pkg)

    def get_pkg_import_result(self):
        return {
            "success": self.success_pkg,
            "fail": self.fail_pkg,
        }
