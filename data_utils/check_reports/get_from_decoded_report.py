# jianjia: 10/7
# this is used to get useful info from newcrawled data reports
log_basepath = "/home/suzy/temp/decoded_new_taint_log_file/"
info_path = "decoded_report_info.json"

import os, json
from datetime import datetime
from reduce_new_log import reduce_log

# Function to convert timestamp to readable time
def convert_timestamp_to_readable_time(timestamp):
    # Convert timestamp from milliseconds to seconds and create a datetime object
    readable_time = datetime.fromtimestamp(timestamp / 1000)
    return readable_time


def main():
    all_logs = os.listdir(log_basepath)
    # print(len(all_logs))
    # print(all_logs[:10])
    old_record = []
    if os.path.exists(info_path):
        with open(info_path) as f:
            old_record = json.load(f)
    print(f'>>> Processing {len(all_logs)} reports')
    if old_record:
        info = old_record
        all_logs = [i for i in all_logs if i not in old_record]
    else:
        info  = {}
    for i in all_logs:
        tmp = {}
        try:
            timestamp = int(i.split('_')[-2])
            readable_time = convert_timestamp_to_readable_time(timestamp)
            # print(f"Readable time: {readable_time}")
            
            appid  = i.split('_')[0]
            # print(appid)
            tmp['appid'] = appid
            tmp['report_time'] = str(readable_time)
            tmp['report_time_int'] = timestamp
            
            # tmp['taint_info'] = reduce_log(log_basepath + i)
            
            info[i] = tmp
            # print(timestamp)
        except:
            print(f'error processing timestamp: {i}')
    
    sorted_info = dict(sorted(info.items(), key=lambda item: item[1]['report_time_int'], reverse=True))
    
    cnt = 0
    for i in sorted_info:
        cnt += 1
        if cnt>200:
            break
        sorted_info[i]['taint_info'] = reduce_log(log_basepath + i)
    

    print(f'>>> In total we have {len(sorted_info)} reports')
    
    with open('decoded_report_info.json', "w") as f:
        json.dump(sorted_info, f, indent=1)


if __name__ == "__main__":
    main()
    