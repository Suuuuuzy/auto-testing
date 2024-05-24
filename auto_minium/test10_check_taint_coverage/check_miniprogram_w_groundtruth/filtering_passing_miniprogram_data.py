import os
from utils import read_json_file, dump_to_json

def get_filtered_data(groundtruth_path, json_path):
    miniprogram_list = os.listdir(groundtruth_path)
    json_data = read_json_file(json_path)
    print(f"the original length of json instances are {len(json_data)}")
    filtered_json_data = []
    for instance in json_data:
        if instance['MiniApp'] in miniprogram_list:
            filtered_json_data.append(instance)
    return filtered_json_data


if __name__ == '__main__':
    PASSING_GROUNDTRUTH_DIR = "/home/bella-xia/auto-testing/data/0_passing_groundtruth"
    JSON_RES_DIR = "/home/bella-xia/auto-testing/data/_auxiliary_data/all_res_rev.json"
    filtered_json_data = get_filtered_data(PASSING_GROUNDTRUTH_DIR, JSON_RES_DIR)
    print(f"the filtered ones of json instances are {len(filtered_json_data)}")
    dump_to_json(filtered_json_data, "/home/bella-xia/auto-testing/data/_auxiliary_data/filtered_res_rev.json")