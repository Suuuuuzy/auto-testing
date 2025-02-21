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
    filename='check_plugin_list.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'



def handle_plugin(pkgs):
    plugins = ["mini-shop-plugin", "live-player-plugin"]
    for pkg in tqdm(pkgs):
        contains = False
        files = os.listdir(os.path.join(output_dir, pkg))
        app_json = os.path.join(output_dir, pkg, "app.json")
        if os.path.exists(app_json):
            try:
                with open(app_json) as f:
                    content = json.load(f)
                if "plugins" in content:
                    for plugin in plugins:
                        if plugin in content["plugins"]:
                            logger.info(f'{pkg} contains the two plugin: {plugin}')
                            contains = True
                if not contains:
                    logger.info(f'{pkg} does not contain the two plugin')
            except:
                logger.error(f"Error reading app.json in {pkg}")
        

                
def check_plugin():
    pkgs = os.listdir(output_dir)
    print(f'There are {len(pkgs)} unpacked mini-apps in total.')
    matches = get_appids('plugin_checked')
    print(f'There are {len(matches)} mini-apps checked with the two plugins in log.')
    pkgs = set(pkgs)-set(matches)
    package_names = list(pkgs)
    processes = 128
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_plugin, batched_package_names)
                
            
        
if __name__ == '__main__':
    check_plugin()