import os
from tqdm import tqdm
import logging
logger = logging.getLogger(__name__)
from config import *
from pipeline_utils.modify_wxml import format_wxml_style_attribute, find_wxml_files
from pipeline_utils.modify_wxs import find_wxs_files
from pipeline_utils.modify_babel import modify_babel_path
from pipeline_utils.modify_app_json import check_all_paths
from pipeline_utils.modify_config_json import modify_config_with_url
from pipeline_utils.solve_fail import solve_fail_in_mini
from main import main

if __name__ == '__main__':
    import platform
    if platform.system()=="Linux": #Linux
        ROOT = unpacked_wxapkg_ROOT
    else:
        ROOT = mac_unpacked_wxapkg_ROOT
    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    logger.info('Started')
    # ROOT_PATH = "/media/data4/jianjia_data4/miniapp_data/WeMinT_dataset/groundtruth/miniprograms"
    # MINIRPOGRAM_NAME = "wx4b7fbaa1c41967fe"
    files = os.listdir(ROOT)
    files = [i for i in files if not i.startswith('.')]
    # files = ['wx940e8bc440dd2eb9', 'wx45cf09091aead547', 'wxad2e9789b5076244', 'wx8b0d722749666d1c', 'wx7dcf14c63c2e78da', 'wx93a380ad767c58ac', 'wx791f877ab36ea8b2', 'wxaf291362a455b5e1', 'wx7e20bfb214e0423f']
    for file in tqdm(files):
        main(ROOT, file)
        logger.info(f'{file} preprocessing finished\n')
    logger.info('Finished')