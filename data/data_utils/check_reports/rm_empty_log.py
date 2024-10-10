#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python3
import os
import re
import subprocess
LOG_PATH = "/home/suzy/temp/new_taint_log_file"
DECODED_LOG_PATH = "/home/suzy/temp/decoded_new_taint_log_file"

def remove_empty_and_decode():
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
    print(result)

if __name__ == "__main__":
    remove_empty_and_decode()    
