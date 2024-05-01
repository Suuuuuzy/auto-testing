import os
from tqdm import tqdm
from pipeline_utils.modify_wxml import format_wxml_style_attribute, find_wxml_files
from pipeline_utils.modify_wxs import find_wxs_files
from pipeline_utils.modify_babel import modify_babel_path
from pipeline_utils.modify_app_json import check_all_paths
from pipeline_utils.modify_config_json import modify_config_with_url


if __name__ == '__main__':
    ROOT_PATH = "C:/Users/zhiha/OneDrive/Desktop/auto-testing/miniapp_data/unveil_unpacked_data"
    MINIRPOGRAM_NAME = "wxfffff4d4572ed699-pc"
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