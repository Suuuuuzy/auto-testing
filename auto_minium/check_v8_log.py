import os
import re
import subprocess
LOG_PATH = "/home/suzy/temp/new_taint_log_file"
DECODED_LOG_PATH = "/home/suzy/temp/decoded_new_taint_log_file"
APP_IDS = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w-filenames.txt"
import shutil


def decode():
    # get ids of the 42w miniapps
    with open(APP_IDS) as f:
        content = f.read()
    lines = content.split('\n')
    ids = [i.split(' ')[-1] for i in lines if i.endswith("wxapkg")]
    pattern = r'wxapkgs-42w/(.*?)\.wxapkg'
    # Find all matches
    ids = [re.findall(pattern, i)[0] for i in ids]
    
    # remove empty logs
    logs = os.listdir(LOG_PATH)
    for i in logs:
        if os.path.getsize(os.path.join(LOG_PATH, i))==0:
            os.remove(os.path.join(LOG_PATH, i))
    logs = os.listdir(LOG_PATH)
    print(len(logs))
    # decode
    result = subprocess.run('./check.sh')
            # print(result)
# check logs
def check():
    cocoSinks = {   "request":["url"], 
                "uploadFile":["url", "filePath", "name"],
                "navigateToMiniProgram":["appId", "path", "extraData"],
                "sendSocketMessage":["data"],
                "createUDPSocket":[]}
    logs = os.listdir(LOG_PATH)
    for file in logs:
        de = os.path.join(DECODED_LOG_PATH, file)
        if os.path.exists(de):
            with open(de) as f:
                # print(file)
                content = f.read()
            for key in cocoSinks.keys():
                if key in content:
                    print(f"in file: {file}")
                    print(key)
    
if __name__ == "__main__":
    # decode()    
    check()