import re, os, json

from datetime import datetime

def convert_to_unix_timestamp(date_time_str, date_format='%Y-%m-%d %H:%M:%S'):
    # Convert the string to a datetime object
    dt = datetime.strptime(date_time_str, date_format)
    # Convert the datetime object to a Unix timestamp
    unix_timestamp = int(dt.timestamp())
    return unix_timestamp

def get_appid_time():
    timestamp_appid_dic = {}
    logfile_prefix = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/outputs/"
    logs = os.listdir(logfile_prefix)
    logs = [i for i in logs if i.startswith("loader")]
    for i in logs:
        logfile = os.path.join(logfile_prefix, i)
        with open(logfile) as f:
            content = f.read()
        lines = content.split("\n")
        appid_pattern = r'(wx[a-zA-Z0-9]{16}-pc)'
        time_pattern = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
        appid_set = set()
        for line in lines:
            matches = re.findall(appid_pattern, line)
            time_matches = re.findall(time_pattern, line)
            if len(matches)>0 and matches[0] not in appid_set:
                unix_timestamp = convert_to_unix_timestamp(time_matches[0])
                # print(str(unix_timestamp) + ' ' + matches[0])
                timestamp_appid_dic[unix_timestamp] = matches[0]
                appid_set.add(matches[0])
        # print(matches)
    timestamp_appid_dic = sorted_dict = dict(sorted(timestamp_appid_dic.items(), key=lambda item: item[0]))
    return timestamp_appid_dic

def save_autominium_timestamp():
    timestamp_appid_dic = get_appid_time()
    with open("autominium_timestamp.txt", "w") as f:
        json.dump(timestamp_appid_dic, f, indent = 2)
    
def get_autominium_timestamp():
    with open("autominium_timestamp.txt") as f:
        timestamp_appid_dic = json.load(f)
    return timestamp_appid_dic

def guess_candidates(log, timestamp_appid_dic = None, stamps = None):
    if not timestamp_appid_dic:
        timestamp_appid_dic = get_autominium_timestamp()
    if not stamps:
        stamps = timestamp_appid_dic.keys()
        stamps = [int(i) for i in stamps]
    ptra = 0
    timestamp = log.split("_")[-2]
    try:
        timestamp = int(int(timestamp)/1000)
    except:
        print("not a timestamp")
        return
    # print(timestamp)
    # print(stamps)
    while stamps[ptra]<timestamp and ptra<len(stamps)-1:
        ptra+=1
    print(f'===log==={log}')
    # print(ptra)
    res = set()
    if ptra>0:
        print('===possible appids===')
        for i in [0, -2, -1, 1, 2]:
            if ptra+i in range(0, len(stamps)):
                # print(stamps[ptra+i])
                res.add(timestamp_appid_dic[str(stamps[ptra+i])])
    return res

def handle_logs(logs):
    timestamp_appid_dic = get_autominium_timestamp()
    stamps = timestamp_appid_dic.keys()
    stamps = [int(i) for i in stamps]
    decoded_log_path = "/home/suzy/temp/decoded_new_taint_log_file"
    logs = os.listdir(decoded_log_path)
    logs = sorted(logs, key=lambda x: x.split("_")[-2])
    for log in logs:
        res = guess_candidates(log, timestamp_appid_dic, stamps)
    
if __name__ == "__main__":
    # save_autominium_timestamp()
    res = guess_candidates("/home/suzy/temp/decoded_new_taint_log_file/wxa61a33da1c0cf420-pc_29307_1720476598946_0")