import os, re, json, logging
from tqdm import tqdm

from pipeline_utils.modify_app_json import check_all_paths
from pipeline_utils.modify_config_json import modify_config_with_url
from pipeline_utils.modify_js import replace_plugin_instances


def pipeline_per_miniprogram(root_path, miniprogram_name):
    logger = logging.getLogger(miniprogram_name)
    logger.addHandler(
        logging.FileHandler(f"debug/{miniprogram_name}_output.out", encoding="utf-8")
    )
    f_data = f"\nSurveying miniprogram {miniprogram_name}\n"
    print(f_data)
    logger.info(f_data)
    # miniprogram_path = os.path.join(root_path, miniprogram_name)
    f_data = "\nStep 1: check config existence and modify config so that url can be processed unchecked\n"
    print(f_data)
    logger.info(f_data)
    modify_config_with_url(root_path, miniprogram_name, logger=logger)

    f_data = "Step 2: Eliminate all missing pages\n"
    print(f_data)
    logger.info(f_data)
    plugins_data = check_all_paths(root_path, miniprogram_name, logger=logger)

    f_data = "\nStep 3: Check all inclusion of plugins in js scripts\n"
    print(f_data)
    logger.info(f_data)
    if plugins_data is not None:
        f_data = f"found plugins: {plugins_data}"
        print(f_data)
        if logger is not None:
            logger.info(f_data)

        match_pattern = re.compile(r"requirePlugin")
        match_instances = replace_plugin_instances(
            match_pattern, root_path, miniprogram_name, logger=logger
        )
        f_data = f"found instances of plugin in files {match_instances}"
        print(f_data)
        if logger is not None:
            logger.info(f_data)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, encoding="utf-8")
    ROOT_PATH = "C:/Users/zhiha/OneDrive/Desktop/bella-auto-testing/miniapp_data/last25_data_copy"

    miniprogram_list = os.listdir(ROOT_PATH)
    for miniprogram_name in tqdm(miniprogram_list):
        pipeline_per_miniprogram(ROOT_PATH, miniprogram_name)
