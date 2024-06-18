import os
import re
import subprocess
LOG_PATH = "/home/suzy/temp/new_taint_log_file"
DECODED_LOG_PATH = "/home/suzy/temp/decoded_new_taint_log_file"
def remove_empty():
    # remove empty logs
    logs = os.listdir(LOG_PATH)
    decoded_logs = os.listdir(DECODED_LOG_PATH)
    for i in logs:
        if os.path.getsize(os.path.join(LOG_PATH, i))==0 or i in decoded_logs:
            os.remove(os.path.join(LOG_PATH, i))
    logs = os.listdir(LOG_PATH)
    print(len(logs))
    # decode
    # result = subprocess.run('./check.sh')
    # print(result)
# check logs
def check_TaintminiSinks():
    taintminiSinks = { "request":["url"], 
                        "uploadFile":["url", "filePath", "name"],
                        "navigateToMiniProgram":["appId", "path", "extraData"],
                        "sendSocketMessage":["data"],
                        "createUDPSocket":[]
                    }
    sources = [
        "inputBox",
        "formSubmit",
        "onLaunch",
        "wechatAPI"
    ]
    source_prefix = "type = "
    logs = os.listdir(DECODED_LOG_PATH)
    data_flow_cnt = 0
    for file in logs:
        de = os.path.join(DECODED_LOG_PATH, file)
        if os.path.exists(de):
            # try:
            with open(de) as f:
                # print(file)
                content = f.read()
            for key in taintminiSinks.keys():
                if key in content:
                    for src in sources:
                        if source_prefix+src in content:
                            data_flow_cnt+=1
                            print(f"in file: {file}")
                            print(src, key)
            
    print(f"Num of miniapps: {len(logs)}")
    print(f"Num of data flows: {data_flow_cnt}")
    
if __name__ == "__main__":
    remove_empty()    
    # check_TaintminiSinks()