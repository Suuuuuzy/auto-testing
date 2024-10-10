import re, os, json
# /media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/unpack_with_unveil.log
from get_appids import get_id_set_from_42w_file

def get_from_log(log_name):
    with open(log_name) as f:
        content = f.read()
    # on 42w dataset:
    # Regular expression pattern to match and extract any string between the directory path and the .wxapkg extension
    pattern = r"/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w/(wx[a-zA-Z0-9]{16}-pc)\.wxapkg"
    # Search for the pattern in the input string
    log_matches = re.findall(pattern, content)
    log_matches = set(log_matches)

    return log_matches


def agg():
    log_matches = get_from_log('../../utils/unpack_with_unveil.log')
    log_matches = log_matches.union(get_from_log('../../utils/unpack_with_unveil_test.log'))    
    log_matches = log_matches.intersection(get_id_set_from_42w_file())
    
    output_dir = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    unpacked_files = set(os.listdir(output_dir))
    
    success_files = unpacked_files & log_matches
    failed_appids = log_matches - success_files
    
    print("# on 42w dataset:")
    print(f"try to unpack: {len(log_matches)}")
    print(f"success: {len(success_files)}")
    print(f"fail: {len(failed_appids)}")
    print(f"success rate: {len(success_files)/len(log_matches)}")
    
    with open("../../appid_file/unpack_failed.json", "w") as f:
    #   "pkgpath": "",
    #   "unpackpath": "/media/dataj/miniapp_data/wxapkgs-42w-unpacked",
    #   "pkgs":
    #    "appid_log_dic"
        fail_dic = {"pkgpath": "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w",
            "unpackpath": "/media/dataj/miniapp_data/wxapkgs-42w-unpacked",
            "pkgs":list(failed_appids),
            "appid_log_dic":{}}        
        json.dump(fail_dic, f, indent=2)
        print('Output unpack failed json successfully!')

if __name__ == '__main__':
    agg()