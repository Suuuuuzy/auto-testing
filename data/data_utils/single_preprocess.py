import os
from tqdm import tqdm
import logging
logger = logging.getLogger(__name__)
from pipeline_utils.modify_files import find_and_format_files
from pipeline_utils.modify_app_json import update_app_json
from pipeline_utils.modify_config_json import modify_config_with_url
from pipeline_utils.modify_babel import modify_babel_path
import sys

def preprocess(MINIRPOGRAM_PATH):
    # MINIRPOGRAM_PATH = os.path.join(ROOT_PATH, MINIRPOGRAM_NAME)

    # print('Step 1: check config existence and modify config so that url can be processed unchecked\n')
    modify_config_with_url(MINIRPOGRAM_PATH)

    # print('Step 2: preprocess app.json \n')
    update_app_json(MINIRPOGRAM_PATH)

    # print('Step 3: Walk through the directory and modify .wxml, bem.wxs, .js, .json files\n')
    # .wxml, bem.wxs, .js, .json
    find_and_format_files(MINIRPOGRAM_PATH)

    # print('Step 4: Modify @babel typeof definition\n')
    modify_babel_path(MINIRPOGRAM_PATH)
    
    logger.info(f'{MINIRPOGRAM_PATH} preprocessing finished')

if __name__ == '__main__':
    logfileName = 'wxapkgs-42w-unpacked-preprocessing.log'
    logging.basicConfig(filename=logfileName, level=logging.INFO)
    logger.info('Started')
    # wxapkg_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked/" + sys.argv[1]
    wxapkg_path = sys.argv[1]
    preprocess(wxapkg_path)
    logger.info('preprocessing finished\n')
    logger.info('Finished')