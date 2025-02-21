#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python

# this is to generate the input file for running test,
# each line contain a miniprogram
# the output file is ../appid_file/newcrawl_run.txt
# this script will be executed when we use run_new.sh

import os

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

print(len(fullpaths))
appids = [i.split('/')[-1] for i in fullpaths]
# print(appids)

unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
files = [i for i in os.listdir(unpack_path) if i not in appids]

print(len(files))
# /media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file

with open('../appid_file/newcrawl_run.txt', 'w') as f:
    for i in files:
        f.write(os.path.join(unpack_path, i) + '\n')