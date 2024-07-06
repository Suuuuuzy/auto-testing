import os, re
import subprocess

import logging
logger = logging.getLogger(__name__)

logging.basicConfig(
    filename='check_navi.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

project_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
all_project_lists = [i for i in os.listdir(project_path) if i.startswith('wx') and len(i)==21]
print(len(all_project_lists))

with open("/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_wxpay_list.log") as f:
    content = f.read()
    pattern = r'wx[a-zA-Z0-9]{16}-pc'
    # Find all matches in the sample text
    matches = re.findall(pattern, content)
    matches = set(matches)

all_project_lists = [i for i in all_project_lists if i not in matches]
print(len(all_project_lists))
    
    
for pkg in all_project_lists:
    pkg_path = os.path.join(project_path, pkg)
    bind_json_file = os.path.join(pkg_path, "bind_methods_navi.json")
    if not os.path.exists(bind_json_file):
        script_path = "/media/data4/jianjia_data4/miniapp_data/unpack/MiniScope/src/static/miniapp.py"
        subprocess.run(['python', script_path, pkg_path, "1"])
        logger.info(f"Generate bind_methods_navi.json for {pkg_path}")
        
    