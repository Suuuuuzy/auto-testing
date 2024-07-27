#!/usr/bin/env python3.8

import json, os, re
import subprocess
import tracemalloc
import argparse
# from utils import write_to_file
import logging
logger = logging.getLogger(__name__)

logging.basicConfig(
    filename='autominium_test.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

def generate_config(input_data):
    config = {}
    for key, value in input_data.items():
        config[key] = value
    with open('config.json', 'w') as config_file:
        json.dump(config, config_file, indent=2)

def run_python_script(script_path):
    subprocess.run(['python', script_path, 'config.json'])

dev_tool_path = "/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools-cli"
script_path = '/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/main.py' 

def get_cmrf_fp():
    project_path = "/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset_unpack/"
    all_project_lists = os.listdir(project_path)
    with open("autominium_test.log") as f:
        content = f.read()
    pattern = r'/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset_unpack/(wx[a-zA-Z0-9]{16})'

    matches = re.findall(pattern, content)
    all_project_lists = set(all_project_lists) - set(matches)
    print(len(all_project_lists))
    return list(all_project_lists)
    
def get_error(error_scale):
    with open("../../miniapp_data/utils/check_logs/error_ids/" + error_scale) as f:
        all_project_lists = json.load(f)
    return all_project_lists

def get_in_file_not_run(pkgs, project_path):
    with open("autominium_test.log") as f:
        content = f.read()
    if not project_path.endswith("/"):
        project_path = project_path+"/"
    pattern = project_path + r'(wx[a-zA-Z0-9]{16}-pc)'
    matches = re.findall(pattern, content)
    pkgs = set(pkgs) - set(matches)
    print(len(pkgs))
    return list(pkgs)

def get_large_scale():
    project_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    all_project_lists = [i for i in os.listdir(project_path) if i.startswith('wx') and len(i)==21]
    print(len(all_project_lists))
    with open("autominium_test.log") as f:
        content = f.read()
    pattern = r'/media/dataj/miniapp_data/wxapkgs-42w-unpacked/(wx[a-zA-Z0-9]{16}-pc)'
    # Find all matches in the sample text
    matches = re.findall(pattern, content)
    matches = set(matches)
    all_project_lists = set(all_project_lists)
    all_project_lists = all_project_lists-matches
    print(len(all_project_lists))
    
    with open("/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_wxpay_list.log") as f:
        content = f.read()
    pattern = r'(wx[a-zA-Z0-9]{16}-pc) contains wxpay'
    # Find all matches in the sample text
    matches = re.findall(pattern, content)
    matches = set(matches)
    
    all_project_lists = all_project_lists-matches
    print(len(all_project_lists))
    
    with open("/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/wxapkgs-42w-unpacked-preprocessing.log") as f:
        content = f.read()
    pattern = r'wx[a-zA-Z0-9]{16}-pc'
     # Find all matches in the sample text
    matches = re.findall(pattern, content)
    matches = set(matches)
    
    all_project_lists = all_project_lists.intersection(matches)
    print(len(all_project_lists))

    return all_project_lists

def run_pkgs(all_project_lists, project_path):
    tracemalloc.start()
    for project in all_project_lists:
        input_data = {  
            "project_path": os.path.join(project_path, project),
            "dev_tool_path": dev_tool_path,
            "auto_authorize": True
            # "test_port" add for parallel running?
            }
        generate_config(input_data)
        run_python_script(script_path)
    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics('lineno')
    logger.info(f'Memory Allocation: {top_stats[:10]}')

def main():
    parser = argparse.ArgumentParser(
        description='Unpacking of miniapps')
    # parser.add_argument('--large_scale', action='store_true', help="run multiple package parallelly")
    parser.add_argument('--error', action='store_true', help="run error packages")
    parser.add_argument('--file', '-f',  help="run the ids in the file")
    parser.add_argument('--cmrf_fp', action='store_true',  help="unpack the ids in for cmrf fp")
    args = parser.parse_args()
    
    error_scale = None
    if args.cmrf_fp:
        project_path = "/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset_unpack"
        error_scale = "cmrf_fp_error_appids.txt"
        if args.error:
            all_project_lists = get_error(error_scale)
        else:
            all_project_lists = get_cmrf_fp()
    elif args.file is not None:
        with open(args.file) as f:
            content = json.load(f)
        project_path = content["unpackpath"]
        error_scale = args.file.split("/")[-1] + ".txt"
        if args.error:
            all_project_lists = get_error(error_scale)
        else:
            all_project_lists = get_in_file_not_run(content["pkgs"], project_path)
    else: # default: 42w large scale
        project_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
        error_scale = "error_appids.txt"
        if args.error:
            all_project_lists = get_error(error_scale)
        else:
            all_project_lists = get_large_scale()
    print(len(all_project_lists))
            
    run_pkgs(all_project_lists, project_path)
    

if __name__ == "__main__":
    main()
    # rerun_error()