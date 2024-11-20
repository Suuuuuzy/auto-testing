#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python

# this is to generate the input file for running test,
# each line contain a miniprogram
# the output file is ../appid_file/metacrawl_run.txt
# this script will be executed when we use run_meta.sh

import os, re, json
from unpack import get_ids_from_metadata


def read_good_miniapp_ids(input_file):
  """
  Read the list of miniapp IDs from the input file.
  Assume the file looks like:
  {
    "wx2c348cf579062e56": {
        "score": 4.0,
        "score_times": 106607,
        "title": "美团外卖丨外卖美食奶茶咖啡水果"
    },
    "wxde8ac0a21135c07d": {
        "score": 4.5,
        "score_times": 83923,
        "title": "美团丨外卖美食买菜酒店电影购物"
    },
  }
  """
  miniapp_ids = []
  with open(input_file, 'r', encoding='utf-8') as file:
    data = json.load(file)
    
    # Sort miniapp IDs based on score_times in descending order
    sorted_miniapp_ids = sorted(data.keys(), key=lambda id: data[id]['score_times'], reverse=True)
    
    return sorted_miniapp_ids

INPUT_FILE = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/scripts/meta_data_checker/meta_json_output.json"
miniapp_ids = read_good_miniapp_ids(INPUT_FILE)



logpath= "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/autominium_test.log"
with open(logpath) as f:
    content = f.read()
para = content.split("Start Running test for: ")
fullpaths = []
for i in para:
    fullpath = i.split('\n')[0]
    if 'newcrawl' not in fullpath:
        continue
    fullpaths.append(fullpath)


pipline_logpath = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/logs/pipeline_multi.log"
with open(pipline_logpath) as f:
    content = f.read()
pattern = r'wx[a-zA-Z0-9]{16}'
ids = set(re.findall(pattern, content))
    
# already tested appids
tested_appids = [i.split('/')[-1] for i in fullpaths]
tested_appids = set(tested_appids).union(ids)
print("already tested appids under newcrawl: " + str(len(tested_appids)))

# metadata crawled appids
metadata_ids = set(get_ids_from_metadata())

# the metadata ids: unpacked and not tested
unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
files = [i for i in os.listdir(unpack_path) if i not in tested_appids and i in metadata_ids]

print("the metadata that are unpacked and not tested: " + str(len(files)))
# /media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file

print("the total number of good metadata: " + str(len(miniapp_ids)))
miniapp_ids = [i for i in miniapp_ids if i in files]
print("the good metadata that are unpacked and not tested: " + str(len(miniapp_ids)))

with open('../appid_file/good_metacrawl_run.txt', 'w') as f:
    for i in miniapp_ids:
        f.write(os.path.join(unpack_path, i) + '\n')