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

def get_time_from_log(log_name):
    # instead of getting appid, get the direcotry  directly, store in dictionary
    print(f'Get time from log: {log_name}')
    timestamp_appid_dic = {}
    with open(log_name) as f:
        content = f.read()
    org_lines = content.split("\n")
    lines = [i for i in org_lines if "Start Running test for:" in i]
    appid_pattern = r'(wx[a-zA-Z0-9]{16}-pc)'
    short_appid_pattern = r'(wx[a-zA-Z0-9]{16}$)'
    time_pattern = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
    for line in lines:
        app_dir = line.split("Start Running test for: ")[-1]
        time_matches = re.findall(time_pattern, line)
        if len(time_matches)>0:
            unix_timestamp = convert_to_unix_timestamp(time_matches[0])
            timestamp_appid_dic[unix_timestamp] = app_dir
    
    lines = [i for i in org_lines if "pipeline - <module>: " in i]
    for line in lines:
        app_dir = line.split("pipeline - <module>: ")[-1]
        if not app_dir.endswith("-pc"):
            continue
        app_dir = os.path.join("/media/dataj/miniapp_data/wxapkgs-42w-unpacked", app_dir)
        time_matches = re.findall(time_pattern, line)
        if len(time_matches)>0:
            unix_timestamp = convert_to_unix_timestamp(time_matches[0])
            timestamp_appid_dic[unix_timestamp] = app_dir
    return timestamp_appid_dic

def get_appid_time():
    timestamp_appid_dic = {}
    logfile_prefix = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/outputs/"
    logs = os.listdir(logfile_prefix)
    logs = [i for i in logs if i.startswith("loader")]
    logs = [os.path.join(logfile_prefix, log_name) for log_name in logs]
    # print(logs)
    for i in tqdm(logs):
        timestamp_appid_dic.update(get_time_from_log(i))
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

def guess_candidates(log, timestamp_appid_dic = None):
    if not timestamp_appid_dic:
        timestamp_appid_dic = get_autominium_timestamp()
    stamps = timestamp_appid_dic.keys()
    stamps = [i for i in stamps]
    stamps.sort()
    ptra = 0
    sml_ptra = 0
    timestamp = log.split("_")[-2]
    try:
        timestamp = int(int(timestamp)/1000)
    except:
        print("not a timestamp")
        return None, None
    formatted_time = convert_from_unix_timestamp(timestamp)
    # print(f'===log==={log}')
    # print(f'Log time: {formatted_time}')
    # print(f'Log time in unix: {timestamp}')
    while stamps[ptra]<timestamp and ptra<len(stamps)-1:
        ptra+=1
        if stamps[sml_ptra] < timestamp-1000:
            sml_ptra+=1
    # print(sml_ptra, ptra)
    # print(convert_from_unix_timestamp(stamps[sml_ptra]))
    # print(convert_from_unix_timestamp(stamps[ptra]))
    res = []
    if ptra>0:
        # print('===possible appids===')
        # for i in range(-20, 0):
        #     if ptra+i in range(0, len(stamps)):
        for i in range(sml_ptra, ptra+1):
            # print(stamps[ptra+i])
            can = timestamp_appid_dic[stamps[i]]
            # print(f'{can} at time: {convert_from_unix_timestamp(stamps[ptra+i])}')
            res.append([can, convert_from_unix_timestamp(stamps[i])])
            # res[can] = convert_from_unix_timestamp(stamps[ptra+i])
        if len(res)<5:
            for i in range(-5,0):
                if ptra + i in range(0, len(stamps)):
                    can = timestamp_appid_dic[stamps[ptra + i]]
                    # print(f'{can} at time: {convert_from_unix_timestamp(stamps[ptra+i])}')
                    res.append([can, convert_from_unix_timestamp(stamps[ptra + i])])
    return res, formatted_time

def handle_logs(logs):
    timestamp_appid_dic = get_autominium_timestamp()
    decoded_log_path = "/home/suzy/temp/decoded_new_taint_log_file"
    logs = os.listdir(decoded_log_path)
    logs = sorted(logs, key=lambda x: x.split("_")[-2])
    for log in logs:
        res = guess_candidates(log, timestamp_appid_dic)



def search_source_name(source_name, func_name, source_code, appid_candidates = None):
    if not appid_candidates:
        return set()
    res = set()
    # unpack_paths = ["/media/dataj/miniapp_data/wxapkgs-42w-unpacked", "/media/data4/jianjia_data4/miniapp_data/WeMinT_dataset/groundtruth/miniprograms"]
    source_code_lines = source_code.split("\n")
    source_code_lines = [i.strip() for i in source_code_lines if 'function' not in i]
    max_length = 0
    source_code_sample = source_code_lines[0]
    for line in source_code_lines:
        if len(line) > max_length and "function (require, module, exports, window,top,document" not in line:
            max_length = len(line)
            source_code_sample = line
    if source_code_sample.endswith("..."):
        source_code_sample = source_code_sample[:-3].strip()
    if '\\u' in source_code_sample:
        source_code_sample = source_code_sample.encode('utf-8').decode('unicode_escape')
    for appid in appid_candidates:
        source_path = os.path.join(appid, source_name)
        if os.path.exists(source_path):
            # res.add(appid)
            with open(source_path) as f:
                source_content = f.read()
            if source_code_sample in source_content:
                res.add(appid)
            else:
                pass
                # print(appid)
                # print('not found', source_name, func_name, source_code)
                # print(f'==========source_file_name========== {source_path}')
                # print(f'==========source_code_sample========== {source_code_sample}')
    return res

def details_in_record(record):
    # this is to find the source code of taint flow
    # return a dictionary
    pair_set = {}
    # for each frame, we extract the source code and the func name
    # return the source_name, func_name, source_code pair in one record!
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
                tmp = source_name + func_name + source_code
                pair_set[tmp] = [source_name, func_name, source_code]
    return pair_set
   
   
def get_details(log_name, appid_candidates):
    if appid_candidates==None:
        return None, None
    try:
        with open(log_name) as f:
            json_string = f.read()
    except:
        print(f'Error reading log: {log_name}')
        return
    parser = CAPNPParser(json_string)
    parsed_data = parser.parse()
    detail = {}
    res = set(appid_candidates)
    # this is to get the details of each record and combine them
    for record in parsed_data:
        tmp = details_in_record(record)
        detail.update(tmp)
    # for each detail, we search the source code in the appid_candidates
    # detail_list = []
    detail_list = [detail[i] for i in detail]
    for i in detail:
        [source_name, func_name, source_code] = detail[i]
        res = res.intersection(search_source_name(source_name, func_name, source_code, res))
        # print(res)
    res = list(res)
    return res, detail_list

def deal_with_reports(report_names, old_report_appid_dic):
    report_appid_dic = {}
    org_hit = []
    one_hit = []
    for report in tqdm(report_names):
        print(f'gusesing: {report}')
        report_appid_dic[report] = {}
        appid = report.split("/")[-1].split("_")[0]
        report_name = os.path.join(report_dir, report)
        
        # get the initial candidates through autominium_test.log
        can, report_time = guess_candidates(report_name, timestamp_appid_dic)
        report_appid_dic[report]['report_time'] = report_time
        report_appid_dic[report]['possible'] = can
        if not can or not report_time:
            continue
        candidates = [key[0] for key in can]
        
        # get more fine-grained candidates through checking details of taint log
        fine_candidates, detail_list = get_details(report_name, candidates)
        report_appid_dic[report]['detail_list'] = detail_list
        # print(fine_candidates)
        report_appid_dic[report]['after_checking_src'] = fine_candidates
        if len(fine_candidates)==1:
            fine_appid = fine_candidates[0].split('/')[-1]
            if fine_appid==appid:
                org_hit.append(fine_appid)
                # del report_appid_dic[report]
            else:
                # print(fine_appid, report)
                one_hit.append(fine_appid)
                # del report_appid_dic[report]
    if old_report_appid_dic:
        old_report_appid_dic.update(report_appid_dic)
        with open('guess_appid_from_log.json', 'w') as f:
            json.dump(old_report_appid_dic, f, indent = 2)

    # if len(report_names)==1:
    #     print(report_appid_dic)
    print(f'len of original hit: {len(org_hit)}')
    print(f'len of one hit: {len(one_hit)}')
    print(f'len of others: {len(report_appid_dic)}')
    

                
if __name__ == "__main__":
    # save_autominium_timestamp()
    logname = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/autominium_test.log"
    timestamp_appid_dic = get_time_from_log(logname)
    report_dir = "/home/suzy/temp/decoded_new_taint_log_file/"
    old_report_appid_dic = None
    if len(sys.argv)>1:
        # wxf2b61febd4c2f90e_18441_1721204935476_0
        report_names = [sys.argv[1]]
    else:
        report_names = os.listdir(report_dir)
        with open('guess_appid_from_log.json') as f:
            old_report_appid_dic = json.load(f)
            # print(f'{len(old_report_appid_dic)} in old report_appid_dic')
        report_names = [i for i in report_names if i not in old_report_appid_dic]
        unresolved_report_names = [i for i in old_report_appid_dic if 'after_checking_src' in old_report_appid_dic[i] and old_report_appid_dic[i]['after_checking_src']==[]]
        report_names += unresolved_report_names
        print(len(report_names))
        
    deal_with_reports(report_names, old_report_appid_dic)
    