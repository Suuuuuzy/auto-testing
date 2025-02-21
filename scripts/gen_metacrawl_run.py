#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python

# this is to generate the input file for running test,
# each line contain a miniprogram
# the output file is ../appid_file/metacrawl_run.txt
# this script will be executed when we use run_meta.sh

import os, re
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


pipline_logpath = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/logs/pipeline_multi.log"
with open(pipline_logpath) as f:
    content = f.read()
pattern = r'wx[a-zA-Z0-9]{16}'
ids = set(re.findall(pattern, content))
    
# already tested appids
tested_appids = [i.split('/')[-1] for i in fullpaths]
tested_appids = set(tested_appids).union(ids)
print("already tested appids under newcrawl: " + str(len(tested_appids)))
with open('../appid_file/tested_on_mathine_suzy.txt', 'w') as f:
    for i in tested_appids:
        f.write(i + '\n')


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
        
        
files = set(files)
app_on_machine0 = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file/app_on_machine0.txt"
with open(app_on_machine0) as f:
    content = f.read()
    machine0 = content.split('\n')
    machine0 = set(machine0)
    
files = files-machine0
print("metacrawl_run_on_suzy: " + str(len(files)))
with open('../appid_file/metacrawl_run_on_suzy.txt', 'w') as f:
    for i in files:
        f.write(os.path.join(unpack_path, i) + '\n')

