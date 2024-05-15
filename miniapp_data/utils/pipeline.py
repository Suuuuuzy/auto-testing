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

def main(ROOT_PATH, MINIRPOGRAM_NAME):
    MINIRPOGRAM_PATH = os.path.join(ROOT_PATH, MINIRPOGRAM_NAME)

    print('\nStep 1: check config existence and modify config so that url can be processed unchecked\n')
    modify_config_with_url(ROOT_PATH, MINIRPOGRAM_NAME)

    print('Step 2: Eliminate all missing pages\n')
    check_all_paths(ROOT_PATH, MINIRPOGRAM_NAME)

    print('\nStep 3: Check all invalid style format in wxml files and modify them\n')
    all_wxml_files = find_wxml_files(MINIRPOGRAM_PATH, [])
    print(f'In total, there are {len(all_wxml_files)} wxml files for modification')
    for wxml_dir in tqdm(all_wxml_files):
        format_wxml_style_attribute(os.path.join(MINIRPOGRAM_PATH, wxml_dir))

    print('\nStep 4: Check bem.wxs files and modify them\n')
    find_wxs_files(MINIRPOGRAM_PATH)
    # all_wxs_files = find_wxs_files(MINIRPOGRAM_PATH, [])
    # print(f'In total, there are {len(all_wxs_files)} wxml files for modification')
    # for wxs_dir in tqdm(all_wxs_files):
    #     format_wxs_style_attribute(os.path.join(MINIRPOGRAM_PATH, wxs_dir))

    print('\nStep 5: Modify @babel typeof definition\n')
    modify_babel_path(MINIRPOGRAM_PATH)
    
    print('\nStep 6: Solve FAIL\n')
    solve_fail_in_mini(MINIRPOGRAM_PATH)

if __name__ == '__main__':
    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    logger.info('Started')
    # ROOT_PATH = "/media/data4/jianjia_data4/miniapp_data/WeMinT_dataset/groundtruth/miniprograms"
    # MINIRPOGRAM_NAME = "wx4b7fbaa1c41967fe"
    files = os.listdir(unpacked_wxapkg_ROOT)
    files = [i for i in files if not i.startswith('.')]
    files = ['wx940e8bc440dd2eb9', 'wx45cf09091aead547', 'wxad2e9789b5076244', 'wx8b0d722749666d1c', 'wx7dcf14c63c2e78da', 'wx93a380ad767c58ac', 'wx791f877ab36ea8b2', 'wxaf291362a455b5e1', 'wx7e20bfb214e0423f']
    for file in tqdm(files):
        main(unpacked_wxapkg_ROOT, file)
        logger.info(f'{file} preprocessing finished\n')
    logger.info('Finished')