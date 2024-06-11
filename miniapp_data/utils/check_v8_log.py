import os
import re
import subprocess
LOG_PATH = "/home/suzy/temp/new_taint_log_file"
DECODED_LOG_PATH = "/home/suzy/temp/decoded_new_taint_log_file"
def remove_and_decode():
    # remove empty logs
    logs = os.listdir(LOG_PATH)
    decoded_logs = os.listdir(DECODED_LOG_PATH)
    for i in logs:
        if os.path.getsize(os.path.join(LOG_PATH, i))==0 or i in decoded_logs:
            os.remove(os.path.join(LOG_PATH, i))
    logs = os.listdir(LOG_PATH)
    print(len(logs))
    # decode
    result = subprocess.run('./check.sh')
    # print(result)
# check logs
def check_TaintminiSinks():
    taintminiSinks = { "request":["url"], 
                        "uploadFile":["url", "filePath", "name"],
                        "navigateToMiniProgram":["appId", "path", "extraData"],
                        "sendSocketMessage":["data"],
                        "createUDPSocket":[]
                    }
    logs = os.listdir(LOG_PATH)
    for file in logs:
        de = os.path.join(DECODED_LOG_PATH, file)
        if os.path.exists(de):
            with open(de) as f:
                # print(file)
                content = f.read()
            for key in taintminiSinks.keys():
                if key in content:
                    print(f"in file: {file}")
                    print(key)
    
if __name__ == "__main__":
    remove_and_decode()    
    # check_TaintminiSinks()