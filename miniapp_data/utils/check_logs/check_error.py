import os, re, json
from get_appids import get_appids
import argparse

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
        pattern = output_dir + r'(wx[a-zA-Z0-9]{16}-pc)'
        output_file = "error_ids/" + args.file.split("/")[-1] + ".txt"
    else: # deafult: 42w large scale
        output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'
        pattern = r'wxapkgs-42w-unpacked/(wx[a-zA-Z0-9]{16}-pc)'
        output_file = "error_ids/error_appids.txt"
        
    with open('../../../auto_minium/method_iterator/autominium_test.log') as f:
        content = f.read()
    paras = content.split('\n\n')    
    error_appids = set()
    no_error_appids = set()
    for para in paras:
        if "errors=1" in para:
            # Find all matches in the sample text
            matches = re.findall(pattern, para)
            matches = set(matches)
            error_appids.update(matches)
        elif "errors=0" in para:
            # Find all matches in the sample text
            matches = re.findall(pattern, para)
            matches = set(matches)
            no_error_appids.update(matches)
    
    if pkgs:
        unpacked_files = set(pkgs)
    else:
        unpacked_files = set(os.listdir(output_dir))
    
    error_appids = error_appids & unpacked_files
    no_error_appids = no_error_appids & unpacked_files
    
    error_appids = error_appids - no_error_appids
    print(f'Error appids: {len(error_appids)}')
    
    error_no_appjson = set()
    for i in error_appids:
        files = os.listdir(os.path.join(output_dir, i))
        if "app.json" not in files:
            error_no_appjson.add(i)
    print(f'Error appids due to: without app.json: {len(error_no_appjson)}')
    # 
    
    print(f'No error appids: {len(no_error_appids)}')
    print(f'In total: {len(no_error_appids.union(error_appids))}')

    wxpay_list = get_appids('wxpay')
    error_appids = error_appids - set(wxpay_list)
    print(f'Error appids without wxpay patterns: {len(error_appids)}')
    
    error_appids = error_appids-error_no_appjson
    error_appids = list(error_appids)
    # we need to run the appids in the output file again, 
    # so the final writen error ones are the ones with app.json and not wxpay
    with open(output_file, "w") as f:
        json.dump(error_appids, f, indent = 2)

if __name__ == "__main__":
    main()
   
        
    