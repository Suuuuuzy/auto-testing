#!/usr/bin/env python3
# Created by xiazeng on 2019-06-04
import sys
import inspect
import os.path
import re
import logging

from .minisuite import MiniSuite
from .exception import LoadCaseError
from . import minitest
import fnmatch

logger = logging.getLogger("minium")
target_base_class = minitest.AssertBase


def parse_document(doc_str):
    """
    解析用例的关键字段
    :param doc_str:
    :return:
    """
    pair = {}
    if not doc_str:
        return pair
    for line in doc_str.split("\n"):
        m = re.search(r"@(\w+)[\s:](.*)", line)
        if m:
            pair[m.group(1).lower()] = m.group(2)
    return pair


def import_module(module_name):
    module_name = module_name.strip()
    comps = module_name.split(".")
    mod = __import__(module_name)
    if len(comps) < 2:
        return mod
    else:
        for name in comps[1:]:
            mod = getattr(mod, name)
    return mod


def doc_format(doc_str):
    """
    去掉注释前面的空格
    :param doc_str:
    :return:
    """
    if doc_str is None:
        return None
    old_lines = doc_str.split("\n")
    min_space_count = 0
    for line in old_lines:
        line = line.replace("\t", "    ")
        space_count = 0
        for a in line:
            if a == " ":
                space_count += 1
            else:
                break
        if min_space_count < space_count:
            min_space_count = space_count
        if len(line) < min_space_count:
            min_space_count = len(line)
    new_lines = [line[min_space_count:] for line in old_lines]
    try:
        return "\n".join(new_lines).strip()
    except TypeError:
        return doc_str


def get_test_methods(test_case_class):
    s = []
    for name, value in inspect.getmembers(test_case_class):
        if name.startswith("test"):
            if callable(getattr(test_case_class, name)):
                for attr_name, func_obj in inspect.getmembers(value):
                    if attr_name == "__code__":
                        pair = parse_document(value.__doc__)
                        s.append(
                            {
                                "human_case_name": pair.get("name"),
                                "name": name,
                                "start": func_obj.co_firstlineno,
                                "filename": func_obj.co_filename,
                                "doc": doc_format(value.__doc__),
                                "co_names": func_obj.co_names,
                                "class_name": test_case_class.__name__
                            }
                        )
    return s


def get_mod(module_name):
    try:
        mod = import_module(module_name)
        return mod
    except ModuleNotFoundError as e:
        logger.exception("ignore module: %s", module_name)
        return LoadCaseError(e)


def get_mod_members(mod):
    mod_memebers = {}
    for memname, memobj in inspect.getmembers(mod):
        if inspect.isclass(memobj) and issubclass(memobj, target_base_class):
            mod_memebers[memname] = memobj
    return mod_memebers


# 获取叶子结点
def get_leaves(mod_memebers):
    leaves = []
    has_subclass_set = set()
    mod_list = list(mod_memebers.values())
    for i in range(len(mod_list)):
        obj = mod_list[i]
        if obj in has_subclass_set:  # 继承的特性，如果这个节点还有父节点，肯定已经被其子节点检查出来
            continue
        if i == len(mod_list) - 1:
            leaves.append(obj)
            continue
        for j in range(i + 1, len(mod_list)):
            cmp_obj = mod_list[j]
            if issubclass(cmp_obj, obj):
                has_subclass_set.add(obj)
            elif issubclass(obj, cmp_obj):
                has_subclass_set.add(cmp_obj)
        if obj not in has_subclass_set:
            leaves.append(obj)
    return leaves


def load_module(path, pkg: str, mini_suite: MiniSuite = None):
    sys.path.append(path)
    test_cases = {}

    human_name_mapping = {}

    # 精确查找，现将 pkg 分段 xxx.yyy.zzz.case
    pkg_path = pkg.split(".")
    # 最后一个为 case 文件
    pkg_name = pkg_path[-1]
    # 前面的 module name 全部加到路径里面去, 但是 path 不能动，后面会用到
    search_path = path
    for d in pkg_path[:-1]:
        search_path = os.path.join(search_path, d)
    if not os.path.exists(search_path):
        raise Exception(f"path to 「{pkg}」 is not exists, please check it")
    for root, dirs, filenames in os.walk(search_path):
        for filename in filenames:
            if not filename.endswith(".py"):
                continue

            if not fnmatch.fnmatch(filename.split(".")[0], pkg_name):
                continue

            module_path = os.path.join(root, filename)
            module_path = os.path.relpath(
                os.path.abspath(module_path), os.path.abspath(path)
            )
            module_name = ".".join(
                module_path.replace(os.path.sep, ".").split(".")[:-1]
            )
            # has_hit_names = set()
            mod = get_mod(module_name)
            if not mod or isinstance(mod, ModuleNotFoundError):
                if mini_suite:
                    mini_suite.set_pkg_fail(module_name, mod)
                continue

            human_name = getattr(mod, "NAME", None)
            human_id = getattr(mod, "ID", 0)
            if human_name:
                if module_name.endswith(".__init__"):
                    module_name = module_name[: -1 * len(".__init__")]
                human_name_mapping[module_name] = {
                    "human_case_module": human_name,
                    "module_id": human_id,
                }

            mod_memebers = get_mod_members(mod)
            leaves = get_leaves(mod_memebers)
            for leaf_obj in leaves:
                case_list = get_test_methods(leaf_obj)
                if case_list:
                    if module_name not in test_cases:
                        test_cases[module_name] = {
                            "class_name": leaf_obj.__name__,
                            "case_list": case_list,
                            "human_case_module": human_name,
                            "module_id": human_id,
                        }
                    else:
                        test_cases[module_name]["case_list"] += case_list
            if mini_suite:
                mini_suite.set_pkg_success(module_name)

    # 更新模块的可读性字段
    for module_name, module_info in test_cases.items():
        module_info.update(update_module_info(module_name, human_name_mapping))

    return test_cases


def update_module_info(module_name, human_name_mapping):
    module_sp = module_name.split(".")
    human_info = {}
    for i in range(len(module_sp)):
        m = ".".join(module_sp[: len(module_sp) - i])
        if m in human_name_mapping:
            human_info = human_name_mapping[m]
    return human_info


def find_test_class(module_name, test_name):
    for cls in get_test_classes(module_name):
        if test_name in dir(cls):
            return cls


def get_test_classes(module_name):
    classes = []
    test_module = import_module(module_name)
    for name in dir(test_module):
        obj = getattr(test_module, name)
        if isinstance(obj, type):
            if issubclass(obj, minitest.AssertBase):
                classes.append(obj)
    # 子类放前面, 基类放后面
    for i in range(len(classes)):
        if i == len(classes) - 1:
            break
        for j in range(i + 1, len(classes)):
            if issubclass(classes[j], classes[i]):
                tmp = classes[i]
                classes[i] = classes[j]
                classes[j] = tmp
    return classes
