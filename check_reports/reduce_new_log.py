# this is trying to reduce the log to only include the relevant information
# sys.argv[1] is the miniapp_id
# this will find all logs relating to this miniappid
# and reduce them into one file

# TODO:
# eliminate the dataflows that are same/similar

import sys, os, json, re
from decoded_check import CAPNPParser, convert_string
log_basepath = "/home/suzy/temp/decoded_new_taint_log_file/"

def details_in_record(frame):
    # this is to find the source code of taint flow
    # for frame in record['message']['jsSinkTainted']['stackTrace']['frames']:
    source_code = frame["frameHumanReadable"]
    source_code = convert_string(source_code)
    # get stack frame id
    id = source_code.split(":")[0].strip()
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
        if ":" in source_name:
            source_name = source_name.split(":")[0]
    # get source code
    if ("--------- s o u r c e   c o d e ---------") in frame["frameHumanReadable"]:
        source_code = source_code.split("--------- s o u r c e   c o d e ---------")[-1]
        source_code = source_code.split("-----------------------------------------")[0]
        # print(source_name, func_name, source_code)
            
    return {"id": id, "source_name":source_name, "func_name":func_name, "source_code":source_code}

def onLaunch_hit_check(taint_string, last_range):
    if taint_string in ['testvalueOnLaunch', 'testvalueOnLoad'] and last_range['type']=='onLaunch':
        return True
    else:
        return False

def reduce_log(logpath):
    pattern_strings = ["https://payapp.weixin.qq.com/", "https://pay.weixin.qq.com/"]
    pattern_string = '|'.join(pattern_strings)
    wxpay_pattern = rf'({pattern_string})'
    soruces = ['sensWechatApi', 'onLaunch'] # 'formSubmit', 'inputBox',
    try:
        with open(logpath) as f:
            json_string = f.read()
    except:
        print(f'Error reading log: {logpath}')
        return
    appid = logpath.split('_')[0]
    parser = CAPNPParser(json_string)
    parsed_data = parser.parse()
    # print(len(parsed_data))
    useful_records = []
    bad_ranges = []
    for record in parsed_data:
        content = record["message"]["jsSinkTainted"]["targetString"]["segments"][0]["content"]
        content = convert_string(content)
        frames = record["message"]["jsSinkTainted"]["stackTrace"]["frames"]
        # frames = [i for i in frames if "/* anonymous */" not in i["frameHumanReadable"]]
        # if "/* anonymous */" and "__dev__" in i["frameHumanReadable"] then ignore this one
        bad_frames = [i for i in frames if "/* anonymous */" in i["frameHumanReadable"] and "__dev__" in i["frameHumanReadable"]]
        frames = [i for i in frames if i not in bad_frames]
        frames = [i for i in frames if "appservice" in i["frameHumanReadable"]]
        frame_info = []
        for frame in frames:
            frame_info.append(details_in_record(frame))
        record["message"]["jsSinkTainted"]["stackTrace"]["frames"] = frame_info
        
        # we don't want wxpay patterns, those are false positives
        matches = re.findall(wxpay_pattern, content) # content_log["content"] is the final tainted string
        if len(matches)>0:
            continue
        last_range_tainted = None
        last_range = None
        
        if len(record['message']['jsSinkTainted']['taintSource']['ranges'])==1:
            range = record['message']['jsSinkTainted']['taintSource']['ranges'][0]
            if range['type'] in soruces:
                range['taint_string'] = content
                if (onLaunch_hit_check(content, range)):
                    bad_ranges.append(range)
                useful_records.append(record)
            else:
                bad_ranges.append(range)
        else:
            for range in record['message']['jsSinkTainted']['taintSource']['ranges']:
                if last_range_tainted:
                    taint_string = content[last_range_tainted:range['start']]
                    last_range['taint_string'] = taint_string
                    # check onLaunch string here, if it is onLaunch, we do not need the range here
                    if onLaunch_hit_check(taint_string, last_range):
                        bad_ranges.append(range)
                    last_range_tainted = None
                elif last_range:
                    last_range['taint_string'] = ""                    
                if range['type'] in soruces:
                    last_range_tainted = range['start']
                    useful_records.append(record)
                else:
                    bad_ranges.append(range)
                last_range = range
    
    # eliminate those bad ranges
    for record in useful_records:
        record['message']['jsSinkTainted']['taintSource']['ranges'] = [i for i in record['message']['jsSinkTainted']['taintSource']['ranges'] if i not in bad_ranges]
    # eliminate those without ranges
    useful_records = [record for record in useful_records if len(record['message']['jsSinkTainted']['taintSource']['ranges'])>0]
    
    # eliminate those with not in scope sinks
    useful_records = [i for i in useful_records if in_scope_sink(i)]

    return useful_records

def in_scope_sink(record):
    frames = record['message']['jsSinkTainted']['stackTrace']['frames']
    for frame in frames:
        if 'setStorage' in frame['func_name']:
            return False
    return True

def same_frames(record1, record2):
    frames1 = record1['message']['jsSinkTainted']['stackTrace']['frames']
    frames2 = record2['message']['jsSinkTainted']['stackTrace']['frames']
    if len(frames1) != len(frames2):
        return False
    for i in range(len(frames1)):
        if frames1[i] != frames2[i]:
            return False
    return True

def same_content(record1, record2):
    content1 = record1['message']['jsSinkTainted']['targetString']['segments'][0]['content']
    content2 = record2['message']['jsSinkTainted']['targetString']['segments'][0]['content']
    return content1 == content2

def output_reduced_log(reduced, output_path):
    for log in reduced:
        print(log)
        for record in reduced[log]:
            new_frames = []
            frames = record['message']['jsSinkTainted']['stackTrace']['frames']
            # "id": "1",
            # "source_name": "__dev__/apihook.js",
            # "func_name": "checkTaintObjectProperties(aka checkTaintObjectProperties)",
            # "source_code":
            for frame in frames:
                frame_in_one_line = f"{frame['id']}: {frame['func_name']}[{frame['source_name']}]{frame['source_code']}"
                new_frames.append(frame_in_one_line)
            record['message']['jsSinkTainted']['stackTrace']['frames'] = new_frames
            print(record['messageId'])
    with open(output_path, 'w') as f:
        json.dump(reduced, f, indent = 1)


def single_miniapp_id(miniapp_id):
    
    all_logs = os.listdir(log_basepath)
    logs = [i for i in all_logs if i.startswith(miniapp_id)]
    if len(logs)==0:
        return
    print(f"Processing {len(logs)} logs for {miniapp_id}")
    reduced = {}
    cnt = 0
    all_records = []
    for log in logs:
        same_frame_cnt = 0
        useful_records = reduce_log(os.path.join(log_basepath, log))
        unique_records = []
        for i in useful_records:
            same = False
            for j in all_records:
                if len(all_records)==2:
                    print("============")
                    print(i)
                    print(j)
                if same_frames(i, j) and same_content(i, j):
                    # print('same!')
                    same = True
                    break
            if not same:
                i['new_id'] = cnt
                cnt += 1
                unique_records.append(i)
                all_records.append(i)
        # all_records.extend(unique_records)
        reduced[log] = unique_records
        print(f'{log.split("/")[-1]} has {len(unique_records)} useful records')
    
    return reduced
        
if __name__ == "__main__":
    if len(sys.argv)>1:
        miniapp_id = sys.argv[1]
        if len(miniapp_id)>18:
            reduced = reduce_log(os.path.join(log_basepath, miniapp_id))
        else:
            reduced = single_miniapp_id(miniapp_id)
        output_reduced_log(reduced, 'reduced_log.json')
    else:
        appid_list = ['wxaa31a26d1709d34d']
        for miniapp_id in appid_list:
            print(f'======{miniapp_id}=======')
            single_miniapp_id(miniapp_id)
    
    