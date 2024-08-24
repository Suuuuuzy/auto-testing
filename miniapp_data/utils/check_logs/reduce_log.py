# this is trying to reduce the log to only include the relevant information
# sys.argv[1] is the miniapp_id
# this will find all logs relating to this miniappid
# and reduce them into one file

# TODO:
# eliminate the dataflows that are same/similar

import sys, os, json, re
from decoded_check import CAPNPParser, convert_string
from guess_appid_from_log_fix import get_org_fit

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
    # miniapp_id = sys.argv[1]
    log_basepath = "/home/suzy/temp/decoded_new_taint_log_file/"
    all_logs = os.listdir(log_basepath)
    with open('guess_appid_from_log.json') as f:
        old_report_appid_dic = json.load(f)
    hit_logs, _ = get_org_fit(old_report_appid_dic)
    logs = [i for i in all_logs if i.startswith(miniapp_id) and i in hit_logs]
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
    
    output_reduced_log(reduced, 'reduced_log.json')
        
if __name__ == "__main__":
    if len(sys.argv)>1:
        miniapp_id = sys.argv[1]
        single_miniapp_id(miniapp_id)
    else:
        # appid_file = '/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/appid_file/random_100_no_error_appids.json'
        # with open(appid_file, 'r') as fp:
        #     package_names = json.load(fp)['pkgs']
        # appid_list = [i.replace("-pc", "") for i in package_names if "-pc" in i]
        appid_list = [
        'wx848f1d49bee28eb0',
        'wxaed7c6447ad087a0',
        'wx49d92372f67e7ac6',
        'wx7fa5661f51b7415b',
        'wx463254b5fbd99ce8',
        'wx99d225654293ae38',
        'wx7035212c262e950b',
        'wx95c1287d025976a1',
        'wx83167a630d3ada9d',
        'wx99bc965f9dd777f0',
        'wx9c35afa4f2e41205',
        'wxa10527257d07a3a6',
        'wx7736d11500c77e76',
        'wx9e96d9cb470eb8d9',
        'wx9e86755c41f40bbe',
        'wx8e42ffcd0acc793b',
        'wxa200689baad1e457',
        'wxaf156c3b42d21493',
        'wx8fa909b7b3a4c355',
        'wx89b0f7141c652852',
        'wx4a50cc16d9e62118',
        'wx70445f543b9f3ba0',
        'wx95d7ecf61193877a',
        'wx8f16e8edcc1fb4f9',
        'wx784c0436d4a440e2',
        'wx863e27c605a8e578',
        'wxa7674f8021e2c445',
        'wxa26ddccdddec0e98',
        'wxaab1c5f7ad042ffb',
        'wxa475f9d02ab93da4',
        'wx719af599a82bff68',
        'wx73d3c4cf8fe3fc6f',
        'wx9e235b1c05c9d4a9',
        'wx95f38516fd3f3ec2',
        'wxaffcfdd6fca0bdc5',
        'wxa98b64ffbca1c145',
        'wx77af30c90654b3f6',
        'wx8db15fc4be444b8d',
        'wx8baf5604185429e9',
        'wx4e12085e530a74b5',
        'wx4535e989e70b2d06',
        'wx9878bacfbd016f02',
        'wxad5770316049a2c2',
        'wx7116457e4adc13a0',
        'wx86cc4e277b5ff140',
        'wxa37f124d3cc4a161',
        'wx7babf3cd2749ae75',
        'wx778687b760029e43',
        'wx94caf4da374e55fd',
        'wx9aff9d970e948226',
        'wx8dc4a633ad0c5c4e',
        'wx785c23ad94d5add3',
        'wx80b338734e82aaed',
        'wx9a35160e86253f48',
        'wx85e688b5c04a0d84',
        'wx97b9f0abc162cc88',
        'wx88ba88cefe5f7e55',
        'wx7026fec1ee706add',
        'wx9c80838fcbe40842',
        'wx844b2f8bbe95309c',
        'wx7019173bd84817e3',
        'wxab1553a7fd28be43',
        'wx7d78caf129006a34',
        'wx8a5516e65250e33c',
        'wx8173c39b2d03396b',
        'wx8e069e65d09d83f7',
        'wx8c39a9f9a9828d6d',
        'wx804e74650d356aed',
        'wx4731867e0e2044bc',
        'wxa6234253ff1025f4',
        'wx757167867ca36a68',
        'wx799fef3c55573a3b',
        'wx9e424d0e8af44b4f',
        'wx983dbc581b3c36d1',
        'wx720c71b37dbcad85',
        'wx46b562da1cfa7127',
        'wx8b67a06d24862e20',
        'wx9af92558dedd0d62',
        'wx7f7bd6db243a27ec',
        'wx98dd8ef6f83607ec',
        'wx86fe62f8077630cd',
        'wx9160d66392ddceae',
        'wx8bbf901cbcf26850',
        'wx4bd0e5f05bd6394a',
        'wx75719171a171d932',
        'wx9f28cac8893f8099',
        'wx7c213835f43d1b22',
        'wx89698aa214a9bf6e',
        'wx8d7f3a283bc0697d',
        'wx4a96bfdd2d5ffb3a',
        'wx7b31cb3f2f390836'
        ]
        for miniapp_id in appid_list:
            print(f'======{miniapp_id}=======')
            single_miniapp_id(miniapp_id)
    # main()
    
    