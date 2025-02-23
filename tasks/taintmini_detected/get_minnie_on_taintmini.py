import os, json, subprocess

decode_command = "/media/dataj/Documents/capnproto-install-clang/bin/capnp decode /media/dataj/jianjia_nwjs55/src/v8/src/taint_tracking/protos/logrecord.capnp TaintLogRecord"

def decode_output(base_dir):
    output_dirs = os.listdir(base_dir)
    
    for item in output_dirs:
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path):
            print(f"Decoding directory: {item_path}")
            for file in os.listdir(item_path):
                if file.endswith(".log") or file.endswith("_decoded"):
                    continue
                file_path = os.path.join(item_path, file)
                if os.path.isdir(file_path):
                    continue
                if os.path.getsize(file_path)==0:
                    os.remove(file_path)
                else:
                    decode_file(file_path)
               
def decode_file(input_file):
    # Run the decode command using subprocess
    output_file = input_file+ '_decoded'
    if os.path.exists(output_file):
        print(f">>>> {input_file} already decoded.")
        return
    # print(output_file)
    with open(input_file, 'rb') as infile, open(output_file, 'wb') as outfile:
        try:
            result = subprocess.run(
                f"{decode_command}",
                stdin=infile,
                stdout=outfile,
                shell=True,
                check=True
            )
            print(f">>>> Decoded {input_file} successfully.")

        except subprocess.CalledProcessError as e:
            print(f"Decoding failed for {input_file}. Error: {e}")



def get_decoded(base_dir):
    res = {}
    output_dirs = os.listdir(base_dir)
    
    for item in output_dirs:
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path):
            print(f"Scanning directory: {item_path}")
            for file in os.listdir(item_path):
                if file.endswith("_decoded"):
                    file_path = os.path.join(item_path, file)
                    if item in res:
                        res[item].append(file_path)
                    else:
                        res[item] = [file_path]
    return res



def check_navis(navi_apis, decoded_files):
    res = []
    for file in decoded_files:
        su = False
        with open(file) as f:
            content = f.read()
        for api in navi_apis:
            if api in content:
                res.append(file)
                su = True
        if su:
            print(f"Found navi api in {file}")
        else:
            print(f"Did not find navi api in {file}")
    return res

def main():
    base_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/tasks/tainmini_10k/output"
    decode_output(base_dir)
    res = get_decoded(base_dir)
    decoded_files = []
    for i in res:
        decoded_files.extend(res[i])

    dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/"
    len_res = len(res)
    len_all = len(os.listdir(base_dir))
    print(f"Decoded {len_res} miniapps out of {len_all} miniapps. The rate is {1.0*len_res/len_all}.")
    
    taintmini_file = "input/tainmini_10k_sum.json"
    with open(taintmini_file) as f:
        taint_content = json.load(f)
        len_taint = len(taint_content)
    print(f"Estimated total number of miniapps: {1.0*len_res/len_all*len_taint}")

if __name__ == "__main__":
    main()