import os, json

unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"

"""
get the appids with following requirements:
1. successfully unpacked
2. has meta data
3. contains app.json

output to: unpacked_in_meta.txt
"""
def appids_with_meta():
    # get unpacked files under pkg_unpack
    all_unpacked = set(os.listdir(unpack_path))
    print(f"files under pkg_unpack: {len(all_unpacked)}") # 31781

    # get appids in meta
    meta_file = "/media/dataj/wechat-devtools-linux/testing/auto-testing/scripts/meta_data_checker/bundle_results/results.json"
    with open(meta_file, "r") as f:
        meta = json.load(f)
    keys_in_meta = set([i for i in meta.keys()])
    print(f"keys_in_meta: {len(keys_in_meta)}") # 16631

    # get appids in meta and unpacked
    unapcked_in_meta = all_unpacked.intersection(keys_in_meta)
    print(f"unpacked and in meta: {len(unapcked_in_meta)}") # 13210
    
    # get appids in meta and unpacked and contain app.json
    unapcked_in_meta_appjson = set()
    cnt = 0
    with open("unpacked_in_meta.txt", "w") as f:
        for i in unapcked_in_meta:
            files = os.listdir(unpack_path + "/" + i)
            if "app.json" not in files:
                cnt += 1
                # print(unpack_path + "/" + i)
            else:
                unapcked_in_meta_appjson.add(i)
                f.write(unpack_path + "/" + i + "\n")

    print(f"unpacked and in meta and does not contain app.json: {cnt}") # 1201
    print(f"unpacked and in meta and contain app.json: {len(unapcked_in_meta_appjson)}") # 12009
    return unapcked_in_meta_appjson

"""
get the minnie's zero days, and exclude the results of taintmini
these are the numbers we report in abstract
"""
def minnie_zero_days(unapcked_in_meta_appjson):
    # get minnie flows
    flow_file = "../zero_day/inputs/zero_day_flow_546.json"
    with open(flow_file, "r") as f:
        flow = json.load(f)
    zero_day = [i for i in flow if i in unapcked_in_meta_appjson]

    # exclude results of taintmini
    taintmini_file = "input/taintmini_summary_list.txt"
    with open(taintmini_file, "r") as f:
        taintmini = f.readlines()
    taintmini = [i.strip() for i in taintmini]
    taintmini = [i.replace(unpack_path+"/", "") for i in taintmini]
    zero_day = [i for i in zero_day if i not in taintmini ]
    print(f"Zero days of Minnie: {len(zero_day)}") # 412

    flow_cnt = 0
    cnt = 0
    for i in zero_day:
        flow_cnt += len(flow[i])
        cnt += 1
    print(f"Zero day flows of Minnie: {flow_cnt}") # 2955
    assert cnt == len(zero_day)
    return zero_day
    
def get_user_num(zero_day):
    # get appids in meta
    meta_file = "/media/dataj/wechat-devtools-linux/testing/auto-testing/scripts/meta_data_checker/bundle_results/results.json"
    with open(meta_file, "r") as f:
        meta = json.load(f)
    cnt = 0
    for i in zero_day:
        if meta[i]["score_times"]:
            cnt += meta[i]["score_times"]
    return cnt

def main():
    unapcked_in_meta_appjson = appids_with_meta()
    zero_day = minnie_zero_days(unapcked_in_meta_appjson)
    cnt = get_user_num(zero_day)
    print(f'Affecting {cnt} users')

    
if __name__ == "__main__":
    main()

"""
input: 
../zero_day/inputs/zero_day_flow_546.json

output:
files under pkg_unpack: 31781
keys_in_meta: 16631
unpacked and in meta: 13210
unpacked and in meta and does not contain app.json: 1201
unpacked and in meta and contain app.json: 12009
Zero days of Minnie: 412
Zero day flows of Minnie: 2955
Affecting 4658460 users
"""