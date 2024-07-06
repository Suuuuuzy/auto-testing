import os, subprocess
from tqdm import tqdm
# from config import *
import logging
logger = logging.getLogger(__name__)
import json
import platform
from pathlib import Path
import multiprocessing as mp
import re

logging.basicConfig(
    filename='check_wxpay_list.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

appid_file = '/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w.json'
output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'

wxpay_filelist = os.listdir(os.path.join(output_dir, "wx7eacccd875af7c46-pc"))
# with open(os.path.join(output_dir, "wx7eacccd875af7c46-pc", "app.json")) as f:
#     app_json = json.load(f)


def check_wxpay():
    pkgs = os.listdir(output_dir)
    print(f'There are {len(pkgs)} unpacked mini-apps in total.')
    if os.path.exists('check_wxpay_list.log'):
        with open('check_wxpay_list.log') as f:
            content = f.read()
        # Define the regular expression pattern
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
        # Find all matches in the sample text
        matches = re.findall(pattern, content)
        matches = set(matches)
        print(f'There are {len(matches)} mini-apps with the wechat pay template in log.')
        pkgs = [i for i in pkgs if i not in matches]
    for pkg in pkgs:
        files = os.listdir(os.path.join(output_dir, pkg))
        wxpay = ["wxa", "wxpay"]
        for i in wxpay:
            if i in files:
                logger.info(pkg)
        # if 'app.json' in files:
        #     try:
        #         with open(os.path.join(output_dir, pkg, "app.json")) as f:
        #             tmp_app_json = json.load(f)
        #             if tmp_app_json==app_json:
        #                 logger.info(pkg)
        #     except:
        #         print(f'Error reading app.json in {pkg}')
                
            
        
if __name__ == '__main__':
    check_wxpay()