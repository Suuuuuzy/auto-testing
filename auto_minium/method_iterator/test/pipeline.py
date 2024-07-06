#!/usr/bin/env python3.8

import json, os, re
import subprocess
import tracemalloc
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

project_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
dev_tool_path = "/media/dataj/wechat-devtools-linux/wechat-web-devtools-linux-nodebug/bin/wechat-devtools-cli"
script_path = '/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/main.py' 
    
def rerun_error():
    tracemalloc.start()
    with open("../../miniapp_data/utils/check_logs/error_appids.txt") as f:
        all_project_lists = json.load(f)
    for project in all_project_lists:
        input_data = {  
            "project_path": os.path.join(project_path, project),
            "dev_tool_path": dev_tool_path
            # "test_port" add for parallel running?
            }
        generate_config(input_data)
        run_python_script(script_path)
    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics('lineno')
    logger.info(f'Memory Allocation: {top_stats[:10]}')


def run_large_scale():
    tracemalloc.start()
    all_project_lists = [i for i in os.listdir(project_path) if i.startswith('wx') and len(i)==21]
    with open("autominium_test.log") as f:
        content = f.read()
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
        # Find all matches in the sample text
        matches = re.findall(pattern, content)
        matches = set(matches)
    all_project_lists = [i for i in all_project_lists if i not in matches]
    print(len(all_project_lists))
    
    with open("/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_wxpay_list.log") as f:
        content = f.read()
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
        # Find all matches in the sample text
        matches = re.findall(pattern, content)
        matches = set(matches)
    
    all_project_lists = [i for i in all_project_lists if i not in matches]
    print(len(all_project_lists))
    # all_project_lists = all_project_lists[:10]
    
    # 37 ground truth by taintmini
    # all_project_lists = ['wx4b7fbaa1c41967fe', 'wx9f612fdcc555956c', 'wx7bf99600808c08a2', 'wx7833284ba00b6a64', 'wxa1cfd092d869cca5', 'wx791f877ab36ea8b2', 'wx8f15d3b484a1d8aa', 'wx7ba1403e4ee38c6a', 'wxafc30d8c2288eb78', 'wx44f5fe051e87eb7c', 'wx7951c581d9200725', 'wx94453ac9e8af894a', 'wxa401b0a5dff09107', 'wx749b4ca56e3ab83a', 'wx984409fff19af0c6', 'wx7f1fb706f2661a7d', 'wxaf291362a455b5e1', 'wx4df15ce98eee5097', 'wx7ba4863cdc09ede0', 'wx771e5f1f2a5c6b03', 'wx8caf59a239eb0a8e', 'wx9cce87b6fe589396', 'wx94dce66285a76941', 'wx7a3db22c7de906d0', 'wx94eb4215c646f0c4', 'wxad57ae1cd953ccef', 'wxaa2f9004d0318568', 'wx14cf5b88e2f09f92', 'wx8ab4045adcc2efc4', 'wx45cf09091aead547', 'wxd92217a38ebcdf68', 'wx489adbe768421010', 'wx77d8f054ad997ddb', 'wx7e8d07681898656b', 'wx9390c46f3a5a833a', 'wxa12867f7bb06a013', 'wxa8734dceb63f311c']
    for project in all_project_lists:
        input_data = {  
            "project_path": os.path.join(project_path, project),
            "dev_tool_path": dev_tool_path
            # "test_port" add for parallel running?
            }
        generate_config(input_data)
        run_python_script(script_path)
    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics('lineno')
    logger.info(f'Memory Allocation: {top_stats[:10]}')


if __name__ == "__main__":
    rerun_error()