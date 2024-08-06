import os, re, json
from get_appids import get_appids
import argparse
from tqdm import tqdm
import random

def main():
    parser = argparse.ArgumentParser(description='Get error miniapps')
    # parser.add_argument('--large_scale', action='store_true', help="large_scale")    
    parser.add_argument('--cmrf_fp', action='store_true',  help="cmrf_fp")
    parser.add_argument('--cmrf_fn', action='store_true',  help="cmrf_fn")
    parser.add_argument('--file', '-f',  help="preprocess the ids in the file")
    args = parser.parse_args()
    
    pkgs = None
    
    if args.cmrf_fp:
        output_dir = '/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset_unpack/'
        pattern = r'fp_dataset_unpack/(wx[a-zA-Z0-9]{16})'
        output_file = "error_ids/cmrf_fp_error_appids.txt"
    elif args.cmrf_fn:
        output_dir = '/media/dataj/miniapp_data/CMRF_groundtruth/fn_dataset_unpack/'
        pattern = r'fn_dataset_unpack/(wx[a-zA-Z0-9]{16})'
        output_file = "error_ids/cmrf_fn_error_appids.txt"
    elif args.file:
        with open(args.file) as f:
            content = json.load(f)
        output_dir = content["unpackpath"]
        pkgs = content["pkgs"]
        if not output_dir.endswith("/"):
            output_dir = output_dir+"/"
        pattern = output_dir + r'(wx[a-zA-Z0-9]{16})'
        output_file = "error_ids/" + args.file.split("/")[-1] + ".txt"
    else: # deafult: 42w large scale
        output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'
        pattern = r'wxapkgs-42w-unpacked/(wx[a-zA-Z0-9]{16}-pc)'
        output_file = "error_ids/42w_large_scale_error_appids.txt"
        
    with open('../../../auto_minium/method_iterator/autominium_test.log') as f:
        content = f.read()
    paras = content.split('\n\n')    
    error_appids = set()
    no_error_appids = set()
    failure_appids = set()
    run_appids = set()
    
    for para in paras:
        # Find all matches in the sample text
        matches = re.findall(pattern, para)
        matches = set(matches)
        if "errors=1" in para:
            error_appids.update(matches)
        if "errors=0" in para:
            no_error_appids.update(matches)
        if "failures=1" in para:
            failure_appids.update(matches)
        if "run=" in para:
            run_appids.update(matches)
                    
    if pkgs:
        unpacked_files = set(pkgs)
    else:
        unpacked_files = set(os.listdir(output_dir))
    
    error_appids = error_appids & unpacked_files
    no_error_appids = no_error_appids & unpacked_files
    
    error_appids = error_appids - no_error_appids
    print(f'Error appids: {len(error_appids)}')
    print(f'Failures appids: {len(failure_appids)}')
    print(f'No error appids: {len(no_error_appids)}')
    print(f'In total: {len(run_appids)}')
    
    log_path = "/home/suzy/temp/decoded_new_taint_log_file"
    logs = os.listdir(log_path)
    log_appids = set([i.split('_')[0] for i in logs])
    print(f'Total number of miniapps that have logs: {len(log_appids)}')
    print(f'log in Error appids: {len(error_appids.intersection(log_appids))}')
    print(f'log in Failures appids: {len(failure_appids.intersection(log_appids))}')
    print(f'log in No error appids: {len(no_error_appids.intersection(log_appids))}')
    
    # randomly select 100 from no_error_appids
    random_100 = random.sample(no_error_appids, 100)
    random_100_dic = {}
    for i in random_100:
        tmp_logs = [log for log in logs if log.startswith(i)]
        random_100_dic[i] = tmp_logs
    save_dic = {"pkgpath":"","unpackpath":"/media/dataj/miniapp_data/wxapkgs-42w-unpacked", "pkgs":random_100, "appid_log_dic":random_100_dic}
    with open("/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/appid_file/random_100_no_error_appids.json", "w") as f:
        json.dump(save_dic, f, indent = 2)
    
    # see what reasons cause the errors
    error_no_appjson = set()
    for i in tqdm(error_appids):
        files = os.listdir(os.path.join(output_dir, i))
        if "app.json" not in files:
            error_no_appjson.add(i)
    print(f'Among the error appids, {len(error_no_appjson)} of them are due to lack of app.json')
    error_appids = error_appids-error_no_appjson

    wxpay_appids = set(get_appids('wxpay'))
    print(f'Among the error appids, {len(error_appids.intersection(wxpay_appids))} of them have wxpay patterns')
    error_appids = error_appids - wxpay_appids
    print(f'Error appids without wxpay patterns/lack of app.json: {len(error_appids)}')
    
    error_appids = list(error_appids)
    # we need to run the appids in the output file again, 
    # so the final writen error ones are the ones with app.json and not wxpay
    with open(output_file, "w") as f:
        json.dump(error_appids, f, indent = 2)

if __name__ == "__main__":
    main()
   
        
    