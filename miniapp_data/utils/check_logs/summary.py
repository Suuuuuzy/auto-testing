#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python
import os, re, json, sys
from get_appids import get_appids
import argparse
from tqdm import tqdm
import random

def summarize(input_json):
    
    if input_json:
        with open(input_json) as f:
            content = json.load(f)
        output_dir = content["unpackpath"]
        unpacked_files = content["pkgs"]
        if not output_dir.endswith("/"):
            output_dir = output_dir+"/"
        if unpacked_files[0].endswith('-pc'):
            pattern = output_dir + r'(wx[a-zA-Z0-9]{16}-pc)'
        else:
            pattern = output_dir + r'(wx[a-zA-Z0-9]{16})'
        unpacked_files = set(unpacked_files)
    else: # deafult: 42w large scale
        output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'
        pattern = r'wxapkgs-42w-unpacked/(wx[a-zA-Z0-9]{16}-pc)'
        unpacked_files = set(os.listdir(output_dir))
    
    
    with open('../../../auto_minium/method_iterator/autominium_test.log') as f:
        content = f.read()
    # paras = content.split('\n\n')  
    paras = content.split("Start Running test for")
    error_appids = set()
    no_error_appids = set()
    failure_appids = set()
    run_appids = set()
    
    for para in paras:
        # if "wx98dd8ef6f83607ec-pc" in para:
        #     print("found it")
        #     print(para)
        # Find all matches in the sample text
        matches = re.findall(pattern, para)
        matches = set(matches)
        if "run=0" in para:
            error_appids.update(matches)
        run_pattern = r'run=(\d+)'
        run_cnt = re.findall(run_pattern, para)
        if len(run_cnt)>0 and int(run_cnt[0])>0: # the miniapps that runs, not reloading
            no_error_appids.update(matches)
        fail_pattern = r'failures=(\d+)'
        failure_cnt = re.findall(fail_pattern, para)
        if len(failure_cnt)>0 and int(failure_cnt[0])>0:
            failure_appids.update(matches)
        if "run=" in para: # no matter fail or success
            run_appids.update(matches)
    
    run_appids = run_appids & unpacked_files
    error_appids = error_appids & run_appids
    no_error_appids = no_error_appids & run_appids
    failure_appids = failure_appids & run_appids
    
    print(f'Error appids before filtering: {len(error_appids)}')
    print(f'Num of unpacked files: {len(unpacked_files)}')
    
    # see what reasons cause the errors
    # 1. no app.json
    # no_appjson = set()
    no_appjson = set(get_appids('noappjson'))
    # for i in tqdm(run_appids):
    #     files = os.listdir(os.path.join(output_dir, i))
    #     if "app.json" not in files:
    #         no_appjson.add(i)
    print(f'{len(no_appjson)} of tested miniapps do not have app.json')
    print(f'Among the error appids, {len(error_appids.intersection(no_appjson))} of them do not have app.json')
    error_appids = error_appids-no_appjson
    no_error_appids = no_error_appids-no_appjson
    
    # 2. with the wxpay pattern
    wxpay_appids = set(get_appids('wxpay'))
    print(f'{len(wxpay_appids)} of them have wxpay patterns')
    print(f'Among the error appids, {len(error_appids.intersection(wxpay_appids))} of them have wxpay patterns')
    error_appids = error_appids - wxpay_appids
    # print(f'Error appids without wxpay patterns: {len(error_appids)}')
    no_error_appids = no_error_appids - wxpay_appids
    error_appids = error_appids - no_error_appids
    
    # 3. with the two plugins
    plugin_appids = set(get_appids('plugin'))
    print(f'{len(plugin_appids)} of them have common plugins')
    print(f'Among the error appids, {len(error_appids.intersection(plugin_appids))} of them have the two plugins')
    error_appids = error_appids - plugin_appids
    # print(f'Error appids without the two plugins: {len(error_appids)}')
    no_error_appids = no_error_appids - plugin_appids
    error_appids = error_appids - no_error_appids
    
    print(f'{len(plugin_appids.union(wxpay_appids))} of them have wxpay patterns/common plugins')
    print(f'{len(unpacked_files-wxpay_appids-no_appjson-plugin_appids)} of them should be able to run')
    
    print(f'Error appids: {len(error_appids)}')
    print(f'Failures appids: {len(failure_appids)}')
    print(f'No error appids: {len(no_error_appids)}')
    print(f'In total: {len(run_appids)}')
    
    log_path = "/home/suzy/temp/decoded_new_taint_log_file"
    logs = os.listdir(log_path)
    log_appids = set([i.split('_')[0] for i in logs])
    log_appids = log_appids & run_appids
    print(f'Total number of miniapps that have logs: {len(log_appids)}')
    print(f'log in Error appids: {len(error_appids.intersection(log_appids))}')
    print(f'log in Failures appids: {len(failure_appids.intersection(log_appids))}')
    print(f'log in No error appids: {len(no_error_appids.intersection(log_appids))}')
    
    return error_appids, no_error_appids, failure_appids, run_appids, log_appids

def output_appids(appids, filename):
    appids = list(appids)
    with open(f"/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/appid_file/{filename}", "w") as f:
        json.dump(appids, f, indent = 2)

def sample_from_appids(appids, num, output_filename):
    random_100 = random.sample(appids, num)
    random_100_dic = {}
    log_path = "/home/suzy/temp/decoded_new_taint_log_file"
    logs = os.listdir(log_path)
    for i in random_100:
        tmp_logs = [log for log in logs if log.startswith(i)]
        random_100_dic[i] = tmp_logs
    save_dic = {"pkgpath":"","unpackpath":"/media/dataj/miniapp_data/wxapkgs-42w-unpacked", "pkgs":random_100, "appid_log_dic":random_100_dic}
    with open(f"/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/appid_file/{output_filename}", "w") as f:
        json.dump(save_dic, f, indent = 2)
        
def update_log(output_filename):
    with open(output_filename) as f:
        content = json.load(f)
    pkgs = content['pkgs']
    random_100_dic = {}
    log_path = "/home/suzy/temp/decoded_new_taint_log_file"
    logs = os.listdir(log_path)
    for i in pkgs:
        tmp_logs = [log for log in logs if log.startswith(i)]
        random_100_dic[i] = tmp_logs
    content['appid_log_dic'] = random_100_dic
    with open(output_filename, "w") as f:
        json.dump(content, f, indent = 1)

def update_log_error(output_filename, no_error_appids):
    with open(output_filename) as f:
        content = json.load(f)
    content['pkgs']= [i for i in content['pkgs'] if i not in no_error_appids]
    with open(output_filename, "w") as f:
        json.dump(content, f, indent = 1)
        
if __name__ == "__main__":
    # input_json = "/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/appid_file/random_100_no_error_appids.json"
    if len(sys.argv) < 2:
        input_json = None
    else:
        input_json = sys.argv[1]
        update_log(input_json)
    error_appids, no_error_appids, failure_appids, run_appids, log_appids = summarize(input_json)
    # print(no_error_appids)
    # output_appids(error_appids, "42w_large_scale_error_appids.json")
    # update_log(100)
   
        
    