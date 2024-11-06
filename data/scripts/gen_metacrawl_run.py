#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python

# this is to generate the input file for running test,
# each line contain a miniprogram
# the output file is ../appid_file/metacrawl_run.txt
# this script will be executed when we use run_meta.sh

import os
from unpack import get_ids_from_metadata
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

# already tested appids
print("already tested appids under newcrawl: " + str(len(fullpaths)))
tested_appids = [i.split('/')[-1] for i in fullpaths]

# metadata crawled appids
metadata_ids = set(get_ids_from_metadata())

# the metadata ids: unpacked and not tested
unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
files = [i for i in os.listdir(unpack_path) if i not in tested_appids and i in metadata_ids]

print("the metadata that are unpacked and not tested: " + str(len(files)))
# /media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file

with open('../appid_file/metacrawl_run.txt', 'w') as f:
    for i in files:
        f.write(os.path.join(unpack_path, i) + '\n')