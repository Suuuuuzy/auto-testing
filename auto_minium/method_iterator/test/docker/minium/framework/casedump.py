#!/usr/bin/env python3
# Created by xiazeng on 2019-05-29
import argparse
import os.path
import sys
import json
import logging

from minium.framework import caseinspect
from minium.framework import minisuite

logger = logging.getLogger("minium")


def main():
    """
    遍历测试用例
    """
    parsers = argparse.ArgumentParser()
    parsers.add_argument(
        "-i",
        "--input",
        dest="input_path",
        type=str,
        required=True,
        help="case directory",
    )
    parsers.add_argument(
        "-f",
        "--format",
        dest="format",
        type=str,
        help="output json",
        choices=["console", "json"],
        default="console",
    )
    parsers.add_argument("-p", "--path", dest="path", type=str, help="result output path")
    parser_args = parsers.parse_args()
    input_path = parser_args.input_path
    format_type = parser_args.format
    if not os.path.exists(input_path) or not os.path.isdir(input_path):
        raise RuntimeError("case directory: %s not exists" % input_path)
    sys.path.insert(0, parser_args.input_path)
    mini_suite = minisuite.MiniSuite({
        "pkg_list": [{
            "pkg": "*",
            "case_list": ["*"]
        }]
    })
    test_cases = caseinspect.load_module(input_path, mini_suite.pkg_list[0]["pkg"], mini_suite=mini_suite)

    if format_type == "console":
        print(json.dumps(test_cases, indent=4))
    elif format_type == "json":
        path = parser_args.path
        json.dump(test_cases, open(path, "wb"), indent=4)


if __name__ == "__main__":
    main()
