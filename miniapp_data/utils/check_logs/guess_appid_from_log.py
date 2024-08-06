import re, os, json, sys

from datetime import datetime
from tqdm import tqdm
from decoded_check import CAPNPParser, convert_string

def convert_to_unix_timestamp(date_time_str, date_format='%Y-%m-%d %H:%M:%S'):
    # Convert the string to a datetime object
    dt = datetime.strptime(date_time_str, date_format)
    # Convert the datetime object to a Unix timestamp
    unix_timestamp = int(dt.timestamp())
    return unix_timestamp

def convert_from_unix_timestamp(unix_timestamp):
    # Convert to a human-readable datetime
    human_readable = datetime.fromtimestamp(unix_timestamp)

    # Format the datetime as a string
    formatted_time = human_readable.strftime('%Y-%m-%d %H:%M:%S')

    # print("Human-readable time:", formatted_time)
    return formatted_time


def get_appid_time():
    timestamp_appid_dic = {}
    logfile_prefix = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/outputs/"
    logs = os.listdir(logfile_prefix)
    logs = [i for i in logs if i.startswith("loader")]
    print(logs)
    for i in tqdm(logs):
        print(i)
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
    formatted_time = convert_from_unix_timestamp(timestamp)
    print(f'Log time: {formatted_time}')
    print(f'Log time in unix: {timestamp}')
    # print(stamps)
    while stamps[ptra]<timestamp and ptra<len(stamps)-1:
        ptra+=1
    print(f'===log==={log}')
    res = set()
    if ptra>0:
        print('===possible appids===')
        for i in [0, -2, -1, 1, 2]:
            if ptra+i in range(0, len(stamps)):
                # print(stamps[ptra+i])
                can = timestamp_appid_dic[str(stamps[ptra+i])]
                print(can)
                res.add(can)
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



def search_source_name(source_name, func_name, source_code, appid_candidates = None):
    if not appid_candidates:
        return set()
    res = set()
        # appid_candidates = [timestamp_appid_dic[i] for i in timestamp_appid_dic]
    # print(len(appids))
    unpack_paths = ["/media/dataj/miniapp_data/wxapkgs-42w-unpacked", "/media/data4/jianjia_data4/miniapp_data/WeMinT_dataset/groundtruth/miniprograms"]
    source_code_lines = source_code.split("\n")
    max_length = 0
    for unpack_path in unpack_paths:
        for line in source_code_lines:
            if len(line) > max_length:
                max_length = len(line)
                source_code_sample = line
        # print(source_name, func_name)
        for appid in appid_candidates:
            source_path = os.path.join(unpack_path, appid, source_name)
            if os.path.exists(source_path):
                print(source_path)
                res.add(appid)
    return res


def details_in_record(record, appid_candidates):
    # this is to find the source code of taint flow
    for frame in record['message']['jsSinkTainted']['stackTrace']['frames']:
        source_code = frame["frameHumanReadable"]
        source_code = convert_string(source_code)
        # get func name
        func_name = source_code.split(":")[1].split(" [")
        func_name = func_name[0].strip()
        # get source name
        url_pattern = r'\[http://127\.0\.0\.1:\d+([^\]]*)\]'
        matches = re.findall(url_pattern, source_code)
        source_name = None
        if matches:
            if "?" in matches[0]:
                source_name = matches[0].split('?')[0]
            else:
                source_name = matches[0]
            source_name = source_name.split("/appservice/")[1]
        # get source code
        if ("--------- s o u r c e   c o d e ---------") in frame["frameHumanReadable"]:
            source_code = source_code.split("--------- s o u r c e   c o d e ---------")[-1]
            source_code = source_code.split("-----------------------------------------")[0]
            # print(source_name, func_name, source_code)
            if source_name and "__dev__" not in source_name:
                appid_candidates = search_source_name(source_name, func_name, source_code, appid_candidates)
    return appid_candidates
   
   
def get_details(i, appid_candidates):
    try:
        with open(i) as f:
            json_string = f.read()
    except:
        print(f'Error reading log: {i}')
        return
    parser = CAPNPParser(json_string)
    parsed_data = parser.parse()
    # one record is possbily several dataflows (several sources -> one sink)
    for record in parsed_data:
        appid_candidates = details_in_record(record, appid_candidates)
    print("===after checking sources===")
    print(appid_candidates)


if __name__ == "__main__":
    # save_autominium_timestamp()
    logname = sys.argv[1]
    i = "/home/suzy/temp/decoded_new_taint_log_file/" + logname
    appid_candidates = guess_candidates(i)
    get_details(i, appid_candidates)
    print()