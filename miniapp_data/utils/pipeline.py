import os
from tqdm import tqdm
from pipeline_utils.modify_wxml import format_wxml_style_attribute, find_wxml_files
from pipeline_utils.modify_wxs import find_wxs_files
from pipeline_utils.modify_babel import modify_babel_path
from pipeline_utils.modify_app_json import check_all_paths
from pipeline_utils.modify_config_json import modify_config_with_url


def pipeline_per_miniprogram(root_path, miniprogram_name):
    print(f'\nSurveying miniprogram {miniprogram_name}\n')
    miniprogram_path = os.path.join(root_path, miniprogram_name)

    print('\nStep 1: check config existence and modify config so that url can be processed unchecked\n')
    modify_config_with_url(root_path, miniprogram_name)

    print('Step 2: Eliminate all missing pages\n')
    check_all_paths(root_path, miniprogram_name)

    print('\nStep 3: Check all invalid style format in wxml files and modify them\n')
    all_wxml_files = find_wxml_files(miniprogram_path, [])
    print(f'In total, there are {len(all_wxml_files)} wxml files for modification')
    for wxml_dir in tqdm(all_wxml_files):
        format_wxml_style_attribute(os.path.join(miniprogram_path, wxml_dir))

    print('\nStep 4: Check bem.wxs files and modify them\n')
    find_wxs_files(miniprogram_path)

    print('\nStep 5: Modify @babel typeof definition\n')
    modify_babel_path(miniprogram_path)


if __name__ == '__main__':
    ROOT_PATH = "C:/Users/zhiha/OneDrive/Desktop/auto-testing/miniapp_data/groundtruth"
    miniprogram_list = os.listdir(ROOT_PATH)
    for miniprogram_name in tqdm(miniprogram_list):
        pipeline_per_miniprogram(ROOT_PATH, miniprogram_name)
    