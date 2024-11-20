#!/usr/bin/env python3

"""
Author:         xiazeng
Create time:    2021/11/1
Description:    

"""
import hashlib
import inspect

# 计算trace文件的时候，框架底层的文件名
import os
import typing

g_base_lib_filenames = ['case_repair_sdk', "Operator.py", "case_repair_adapter.py"]


def get_stacks(ignore_file_lists=None):
    """

    :param ignore_file_lists: 忽略的文件列表，比如一些我们依赖
    :return:
    """
    if ignore_file_lists is None:
        ignore_file_lists = g_base_lib_filenames
    else:
        ignore_file_lists += g_base_lib_filenames
    frames = inspect.stack()
    stacks = []
    if len(frames) > 2:
        current_filename = frames[0][1]
        for frame in frames[1:]:
            file_seqs = frame[1].split(os.path.sep)
            if file_seqs[-2] == "unittest":
                break
            for filename in ignore_file_lists:
                # 包含基础酷
                if filename in frame[1]:
                    break
            else:
                if frame[1] != current_filename and os.path.join("at", "core") not in frame[1] and frame[4]:
                    # 只要函数和文件信息， 文件不能包含路径名
                    # filename, function, line number, statement
                    stack_info = {
                        "file": frame[1],
                        "func": frame[3],
                        "line": frame[2],
                        "statement": frame[4][0].strip()
                    }
                    stacks.append(stack_info)
    return stacks


def get_statement():
    """拿执行操作的语句"""
    return get_stacks()[0]['statement']


def get_trace_data(enable_trace_line: bool, trace_cache: dict) -> typing.Tuple[str, dict]:
    """
    获取步骤的trace_id和trace
    """
    stack_lines = []
    stacks = get_stacks()
    for stack_info in stacks:
        # 只要函数和文件信息， 文件不包含路径名
        if enable_trace_line:
            stack_lines.append("%s#%s:%d %s" %
                               (os.path.basename(stack_info['file']), stack_info['func'], stack_info['line'],
                                stack_info['statement']))
        else:
            stack_lines.append("%s#%s %s" %
                               (os.path.basename(stack_info['file']), stack_info['func'], stack_info['statement']))

    stack_lines.reverse()
    stack_str = '\n'.join(stack_lines)
    if stack_str in trace_cache:
        # 遇到循环，堆栈是一样的，这里加个识别
        trace_cache[stack_str] = trace_cache[stack_str] + 1
        stack_str += "\nindex:%s" % trace_cache[stack_str]
    else:
        trace_cache[stack_str] = 0

    _md5 = hashlib.md5()
    _md5.update(stack_str.encode("utf-8"))
    return _md5.hexdigest(), stacks[0]
