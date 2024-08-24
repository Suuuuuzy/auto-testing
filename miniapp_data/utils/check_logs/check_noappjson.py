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
from get_appids import get_appids

logging.basicConfig(
    filename='check_noappjson_list.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'

def handle_wxpay(pkgs):    
    for pkg in tqdm(pkgs):
        files = os.listdir(os.path.join(output_dir, pkg))
        if "app.json" in files:
            logger.info(f'{pkg} contains app.json')
        else:
            logger.info(f'{pkg} does not contain app.json')

                
def check_wxpay():
    pkgs = os.listdir(output_dir)
    print(f'There are {len(pkgs)} unpacked mini-apps in total.')
    matches = get_appids('noappjson_checked')
    print(f'There are {len(matches)} mini-apps checked with the no app.json in log.')
    pkgs = set(pkgs)-set(matches)
    package_names = list(pkgs)
    processes = 128
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_wxpay, batched_package_names)
                
            
        
if __name__ == '__main__':
    check_wxpay()