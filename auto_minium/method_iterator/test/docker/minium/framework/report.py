#!/usr/bin/env python3
# Created by xiazeng on 2019-06-03
import json
import os.path
import sys
import glob
import shutil
import time
import re


def formatTimeFromTimestamp(format, seconds):
    # 如果format有中文，会有问题，作转码处理
    s = str(format.encode("utf-8"))
    rtn = time.strftime(s, time.localtime(seconds))
    return eval(rtn).decode("utf-8")

def formatCostTimeFromTimestamp(format, seconds):
    # 如果format有中文，会有问题，作转码处理
    s = str(format.encode("utf-8"))
    rtn = time.strftime(s, time.gmtime(seconds))
    return eval(rtn).decode("utf-8")


def getTimestampFromFormattedTime(s, format="%Y-%m-%d %H:%M:%S"):
    time_struct = time.strptime(s, format)
    return time.mktime(time_struct)


ONE_DAY = 86400
ONE_HOUR = 3600
ONE_MIN = 60
VERSION = None  # 1, 2, 3


def formatCostTime(seconds):
    if seconds > ONE_DAY:
        days = int(seconds / ONE_DAY)
        return "%d天" % days + formatCostTimeFromTimestamp("%H小时%M分钟%S秒", seconds % ONE_DAY)
    elif seconds > ONE_HOUR:
        return formatCostTimeFromTimestamp("%H小时%M分钟%S秒", seconds)
    elif seconds > ONE_MIN:
        return formatCostTimeFromTimestamp("%M分钟%S秒", seconds)
    else:
        return "%.3f秒" % seconds


def getFileLastModificationTime(file_path, format="%Y%m%d %H:%M:%S"):
    t = os.path.getmtime(file_path)
    timeStruce = time.localtime(t)
    return t, time.strftime(format, timeStruce)


def get_result_json(outputs):
    """
    获取结果json文件, 并检测是否存在"未完成的用例"的log文件
    :params outputs: path
    :return filenames: list
    :return unfinished_filenames: list
    """
    global VERSION
    # 获取v3: run.log文件，v2: ${_testMethodName}.json，需要兼容
    if VERSION is None:  # 检测报告数据版本
        filenames = glob.glob(os.path.join(outputs, "*", "*", "run.log"))
        if not filenames:
            # 尝试查找 ${_testMethodName}.json
            filenames = glob.glob(os.path.join(outputs, "*", "*", "*.json"))
            if not filenames:
                return filenames, []
            for filename in filenames:
                relpath = os.path.relpath(filename, outputs)
                test_method_name = relpath.split(os.path.sep)[0]
                if (
                    os.path.basename(filename) == "%s.json" % test_method_name
                ):  # 符合v2版本格式
                    VERSION = 2  # 版本退化
                    return get_result_json(outputs)
            # v2, v3格式都不符合
            return [], []
        else:
            VERSION = 3
            return get_result_json(outputs)
    elif VERSION == 3:
        result_json_filenames = []
        unfinished_filenames = []
        filenames = glob.glob(os.path.join(outputs, "*", "*", "run.log"))
        for filename in filenames:
            result_json_filename = os.path.join(
                os.path.dirname(filename), "result.json"
            )
            if os.path.isfile(result_json_filename):
                result_json_filenames.append(result_json_filename)
                continue
            # 有run.log但没有result.json，尝试生成一个失败结果
            unfinished_filenames.append(filename)
        return result_json_filenames, unfinished_filenames
    else:
        return glob.glob(os.path.join(outputs, "*", "*", "*.json")), []


def get_case_datas(filenames):
    """
    获取case datas
    """
    case_datas = []
    for filename in filenames:
        relative_path = os.path.sep.join(filename.split(os.path.sep)[-3:-1])
        m = json.load(open(filename, "r", encoding="utf8"))
        m["relative"] = relative_path
        # 查找同目录下 perfdata.json 和 fpsdata.json
        perf_filename = os.path.join(os.path.dirname(filename), "perfdata.json")
        fps_filename = os.path.join(os.path.dirname(filename), "fpsdata.json")
        if os.path.isfile(perf_filename):
            perf = json.load(open(perf_filename, "r", encoding="utf8"))
            m["performance"] = perf
        if os.path.isfile(fps_filename):
            fps = json.load(open(fps_filename, "r", encoding="utf8"))
            m["fps"] = fps
        case_datas.append(m)
    case_datas.sort(key=lambda a: a["start_timestamp"])
    return case_datas


def get_unfinished_case_datas(unfinished_filenames):
    unfinished_case_datas = {}  # {package_name: {class_name: {case_name: {**info}}}}
    for filename in unfinished_filenames:
        reg_package_info = r"package info: (.+), case info: (\S+)\.(\S+)"
        with open(filename, "r", encoding="utf8") as fd:
            for line in iter(fd.readline, b""):
                if not line:
                    break
                m = re.search(reg_package_info, line)
                if m:
                    package_name, class_name, case_name = m.groups()
                    if package_name in unfinished_case_datas:
                        package_info = unfinished_case_datas[package_name]
                    else:
                        package_info = {}
                        unfinished_case_datas[package_name] = package_info
                    if class_name in package_info:
                        class_info = package_info[class_name]
                    else:
                        class_info = {}
                        package_info[class_name] = class_info
                    if case_name in class_info:
                        break
                    # try to get start time in log: %Y-%m-%d %H:%M:%S
                    mm = re.search(r"\d+-\d+-\d+ \d+:\d+:\d+", line)
                    if mm:
                        start_timestamp = getTimestampFromFormattedTime(
                            mm.group(0), "%Y-%m-%d %H:%M:%S"
                        )
                        run_time = formatTimeFromTimestamp(
                            "%Y%m%d %H:%M:%S", start_timestamp
                        )
                    else:
                        start_timestamp, run_time = getFileLastModificationTime(
                            filename
                        )
                    stop_timestamp = getFileLastModificationTime(filename)[0]
                    case_info = {
                        "log_filename": os.path.basename(filename),
                        "test_type": class_name,
                        "relative": os.path.sep.join(
                            filename.split(os.path.sep)[-3:-1]
                        ),
                        "module": package_name,
                        "run_time": run_time,
                        "start_timestamp": start_timestamp,
                        "stop_timestamp": stop_timestamp,
                    }
                    class_info[case_name] = case_info
                    # try to record other log
                    log_paths = {}
                    log_files = glob.glob(
                        os.path.join(os.path.dirname(filename), "*.log")
                    )
                    for log_file in log_files:
                        log_name = os.path.basename(log_file)
                        if log_name == case_info["log_filename"]:  # run.log, pass
                            continue
                        name = os.path.splitext(log_name)[0]
                        log_paths[f"{name}_log_path"] = log_name
                    case_info.update(log_paths)
                    # try to process screen info
                    screen_info = []
                    image_files = (
                        glob.glob(
                            os.path.join(os.path.dirname(filename), "images", "*")
                        )
                        if os.path.isdir(
                            os.path.join(os.path.dirname(filename), "images")
                        )
                        else []
                    )
                    for image_file in image_files:
                        image_name = os.path.basename(image_file)
                        ts, datetime = getFileLastModificationTime(
                            image_file, "%Y-%m-%d %H:%M:%S"
                        )
                        screen_info.append(
                            {
                                "name": os.path.splitext(image_name)[0],
                                "url": "",
                                "path": "images/%s" % image_name,
                                "ts": ts,
                                "datetime": datetime,
                                "use_region": False
                            }
                        )
                        screen_info.sort(key=lambda x: x["ts"])
                        case_info["screen_info"] = screen_info
    return unfinished_case_datas


def get_case_summary(case_datas, unfinished_case_datas=None):
    success = 0
    failed = 0
    error = 0
    costs = 0
    pkg_info = {}
    detail = []
    start_time = None
    end_time = None
    for c in case_datas:
        c["costs"] = formatCostTime(
            c.get("stop_timestamp", c["start_timestamp"]) - c["start_timestamp"]
        )
        if c["success"]:
            success += 1
        elif c["is_failure"]:
            failed += 1
        elif c["is_error"]:
            error += 1
        start_time = (
            c["start_timestamp"]
            if start_time is None
            else min(c["start_timestamp"], start_time)
        )
        end_time = (
            c.get("stop_timestamp", c["start_timestamp"])
            if end_time is None
            else max(c.get("stop_timestamp", c["start_timestamp"]), end_time)
        )
        costs = end_time - start_time
        if c.get("package"):
            if c["package"] in pkg_info:
                pkg_info[c["package"]]["case_num"] += 1
                if c["success"]:
                    pkg_info[c["package"]]["success"] += 1
                elif c["is_failure"]:
                    pkg_info[c["package"]]["failed"] += 1
                elif c["is_error"]:
                    pkg_info[c["package"]]["error"] += 1
                pkg_info[c["package"]]["start_time"] = min(
                    c["start_timestamp"], pkg_info[c["package"]]["start_time"]
                )
                pkg_info[c["package"]]["end_time"] = max(
                    c.get("stop_timestamp", c["start_timestamp"]),
                    pkg_info[c["package"]]["end_time"],
                )
                pkg_info[c["package"]]["costs"] = (
                    pkg_info[c["package"]]["end_time"]
                    - pkg_info[c["package"]]["start_time"]
                )
            else:
                pkg_info[c["package"]] = {
                    "name": c["package"],
                    "case_num": 1,
                    "success": 1 if c["success"] else 0,
                    "failed": 1 if c["is_failure"] else 0,
                    "error": 1 if c["is_error"] else 0,
                    "start_time": c["start_timestamp"],
                    "end_time": c.get("stop_timestamp", c["start_timestamp"]),
                    "costs": c.get("stop_timestamp", c["start_timestamp"])
                    - c["start_timestamp"],
                }
    if unfinished_case_datas:
        for package_name in unfinished_case_datas:
            for class_name in unfinished_case_datas[package_name]:
                for case_name in unfinished_case_datas[package_name][class_name]:
                    item = unfinished_case_datas[package_name][class_name][case_name]
                    if item.get("start_timestamp"):
                        start_time = (
                            item["start_timestamp"]
                            if start_time is None
                            else min(item["start_timestamp"], start_time)
                        )
                    if item.get("stop_timestamp"):
                        end_time = (
                            item.get("stop_timestamp", item["start_timestamp"])
                            if end_time is None
                            else max(item.get("stop_timestamp", item["start_timestamp"]), end_time)
                        )

    for package in pkg_info:
        pkg_info[package]["start_time"] = formatTimeFromTimestamp(
            "%Y/%m/%d %H:%M:%S", pkg_info[package]["start_time"]
        )
        pkg_info[package]["end_time"] = formatTimeFromTimestamp(
            "%Y/%m/%d %H:%M:%S", pkg_info[package]["end_time"]
        )
        pkg_info[package]["costs"] = formatCostTime(pkg_info[package]["costs"])
        detail.append(pkg_info[package])
    detail.sort(key=lambda a: a["start_time"])
    return success, failed, error, costs, start_time, end_time, detail


def generate_meta(outputs):
    """
    v2: ${outputs}/${self._testMethodName}/${datetime.datetime.now().strftime("%Y%m%d%H%M%S")}/
        (${self._testMethodName}.json|${self._testMethodName}.log)
    v3: ${outputs}/${self._testMethodName}/${datetime.datetime.now().strftime("%Y%m%d%H%M%S")}/(result.json|run.log)

    如果case没有正确跑完, 会出现有run.log但没有result.json的情况, 尝试生成一个失败结果
    """
    filenames, unfinished_filenames = get_result_json(outputs)
    if not filenames and not unfinished_filenames:
        return False
    # case datas
    case_datas = get_case_datas(filenames)

    # unfinished cases
    unfinished_case_datas = get_unfinished_case_datas(unfinished_filenames)

    # summary
    success, failed, error, costs, start_time, end_time, detail = get_case_summary(
        case_datas,
        unfinished_case_datas
    )

    summary = {
        "case_num": len(case_datas),
        "success": success,
        "failed": failed,
        "error": error,
        "costs": formatCostTime(costs),
        "start_time": formatTimeFromTimestamp("%Y/%m/%d %H:%M:%S", start_time),
        "end_time": formatTimeFromTimestamp("%Y/%m/%d %H:%M:%S", end_time),
        "detail": detail,
    }
    meta_json = {
        "case_datas": case_datas,
        "summary": summary,
        "unfinished_case_datas": unfinished_case_datas,
    }
    return meta_json


def generate_meta_v2(outputs):
    tasks = glob.glob(os.path.join(outputs, "[0123456789]*"))
    task_datas = []
    for task in tasks:
        task_data = generate_meta(task)
        if not task_data:
            continue
        for case_data in task_data["case_datas"]:
            case_data["relative"] = os.path.join(
                os.path.basename(task), case_data["relative"]
            )
        if "unfinished_case_datas" in task_data:
            for k in task_data["unfinished_case_datas"]:
                for kk in task_data["unfinished_case_datas"][k]:
                    for kkk in task_data["unfinished_case_datas"][k][
                        kk
                    ]:  # kkk == case name
                        case_data = task_data["unfinished_case_datas"][k][kk][kkk]
                        case_data["relative"] = os.path.join(
                            os.path.basename(task), case_data["relative"]
                        )
        task_datas.append(task_data)
    task_datas.sort(key=lambda a: a["summary"]["start_time"], reverse=True)

    summary = {}
    meta_json = {"version": 2, "task_datas": task_datas, "summary": summary}
    return meta_json


generate_meta_v3 = generate_meta_v2


# meta_json = generate_meta("/Users/mmtest/code/minium/py-sample/outputs")
# json.dump(meta_json, open("meta.json", "w"), indent=4)


def imp_main(input_path, output_path=None):
    if output_path is None:
        output_path = input_path
    if os.path.exists(output_path) and input_path != output_path:
        print("delete ", output_path)
        shutil.rmtree(output_path)
    if input_path != output_path:
        shutil.copytree(input_path, output_path)
    meta_json = generate_meta_v2(output_path)
    json.dump(meta_json, open(os.path.join(output_path, "meta.json"), "w", encoding="utf8"), indent=4)
    dist_path = os.path.join(os.path.dirname(__file__), "dist")
    for filename in os.listdir(dist_path):
        path = os.path.join(dist_path, filename)
        target = os.path.join(output_path, filename)
        if os.path.exists(target):
            if os.path.isdir(target):
                shutil.rmtree(target)
            else:
                os.remove(target)
        if os.path.isdir(path):
            shutil.copytree(path, target)
        else:
            shutil.copy(path, target)


def main():
    if len(sys.argv) < 2 or sys.argv[1] == "-h":
        print(
            """
Usage: minireport data_path report_output_path\n\n
    data_path: default report data folder is the folder named 'output' in case folder\n
    report_output_path: anyplace you want
            """
        )
        exit(0)
    input_path = sys.argv[1]
    output_path = None
    if len(sys.argv) > 2:
        output_path = sys.argv[2]
    return imp_main(input_path, output_path)


if __name__ == "__main__":
    # outputs = "D:/dddd/weixin/miniumtest/miniprogram-demo-test/outputs"
    # meta_json = generate_meta_v2(outputs)
    # print(meta_json)
    main()
