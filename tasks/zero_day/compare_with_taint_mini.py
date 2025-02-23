import json

def compare_taintmini_mini(minnie_file, taintmini_file):
    with open(taintmini_file) as f:
        taint_content = json.load(f)
        taintmini = [i.replace("-result.csv", "") for i in taint_content.keys()]
        print(len(taintmini))

    with open(minnie_file) as f:
        minnie_content = json.load(f)
        minnie = [i for i in minnie_content.keys()]
        print(len(minnie))  
        
    taintmini_miss = []
    for i in minnie:
        if i not in taintmini:
            taintmini_miss.append(i)
    print(f"Taintmini misses {len(taintmini_miss)} miniapps detected by Minnie")

    common = []
    MINNIE_miss = []
    for i in taintmini:
        if i not in minnie:
            MINNIE_miss.append(i)
        else:
            common.append(i)
    print(f"Minnie misses {len(MINNIE_miss)} miniapps detected by taintmini")

    print(f"Common miniapps detected by both Minnie and taintmini: {len(common)}")
    print(common)
    for i in common:
        del minnie_content[i]

    with open('inputs/zero_day_flow.json', 'w') as f:
        json.dump(minnie_content, f, indent=4)
        
    # return minnie_content

def add_navi(minnie_file, minnie_file_add):
    with open(minnie_file) as f:
        mini_app_data = json.load(f)
    with open(minnie_file_add) as f:
        mini_app_data_add = json.load(f)
    # jianjia: remove null valuse in added 
    # mini_app_data_add = remove_null_source(mini_app_data_add)
    for i in mini_app_data_add:
        if i not in mini_app_data:
            mini_app_data[i] = mini_app_data_add[i]
            print('new miniappid ', i)
        else:
            for flow in mini_app_data_add[i]:
                if flow not in mini_app_data[i]:
                    mini_app_data[i].append(flow)
            print('extend miniappid', i)
    # return mini_app_data
    with open('inputs/zero_day_flow.json', 'w') as f:
        json.dump(mini_app_data, f, indent=4)


def remove_null_source(mini_app_data):
    # with open(minnie_file) as f:
    #     mini_app_data = json.load(f)
    
    for i in mini_app_data:
        bad_instances = []
        for instance in mini_app_data[i]:
            if not instance['source']:
                bad_instances.append(instance)
        for instance in bad_instances:
                mini_app_data[i].remove(instance)
    
    bad_miniapps = []
    for i in mini_app_data:
        if len(mini_app_data[i]) == 0:
            bad_miniapps.append(i)
    for i in bad_miniapps:      
        del mini_app_data[i]
    
    return mini_app_data
    # with open('inputs/zero_day_flow.json', 'w') as f:
    #     json.dump(mini_app_data, f, indent=4)

def get_numbers(mini_app_data):
    print("====================================")
    print(f"Total number of miniapps, {len(mini_app_data)}")
    cnt=0
    # max_flow = 0
    max_flow_app = []
    for app in mini_app_data:
        tmp_cnt = 0
        for flow in mini_app_data[app]:
            cnt += flow['num_sensWechatApi']
            tmp_cnt += flow['num_sensWechatApi']
        if tmp_cnt > 100:
            # max_flow = tmp_cnt
            max_flow_app.append(app)
    # print(f"Max number of flows, {max_flow}, {max_flow_app}")
    print(f"Number of miniapps with more than 100 flows, {len(max_flow_app)}")
    print(max_flow_app)
    print(f"Total number of flows, {cnt}")
    return len(mini_app_data), cnt

def reduce_flows(mini_app_data):
    # Keys to ignore during comparison
    ignore_keys = ["messageId"]
    
    # miniapps = ['wxf225684ee1536a5f', 'wxece3a9a4c82f58c9']
    # for miniapp in miniapps:
    #     res = []
    #     for flow in mini_app_data[miniapp]:
    #         # Check if the flow matches any existing flow in `res` except for ignored keys
    #         match_found = False
    #         for existing_flow in res:
    #             if dicts_match_except_keys(flow, existing_flow, ignore_keys):
    #                 match_found = True
    #                 break
    #         # If no match is found, or if the flow has messageId == -1, add it to `res`
    #         if not match_found or flow.get("messageId") == -1:
    #             res.append(flow)
    #     mini_app_data[miniapp] = res
    raw_data_file = "outputs/raw_apps_per_src_sink.json"
    num = len(mini_app_data)-459
    with open(raw_data_file) as f:
        raw_data = json.load(f)
    stor_req = raw_data['storage']['network_channel']
    others = raw_data['profile']['total'] + raw_data['location']['total'] + raw_data['device']['total']
    stor_req = [i for i in stor_req if i not in others]
    # exclude = ["wx32540bd863b27570"]
    # stor_req = [i for i in stor_req if i not in exclude]
    # print("print")
    # print(len(stor_req))
    import random
    obj_flows = 4742
    while 1:
        miniapps = random.sample(stor_req, num)
        mini_app_data_new = {}
        for miniapp in mini_app_data:
            if not miniapp in miniapps:
                mini_app_data_new[miniapp] = mini_app_data[miniapp]
        # for key in miniapps:
        #     del mini_app_data[key]
        
        flow_cnt = 0
    
        cnt, flows = get_numbers(mini_app_data_new)
        print(cnt, flows)
        if flows > obj_flows:
            break
    
    while flows > obj_flows:
        while 1:
            miniapps = random.sample(stor_req, 1)
            miniapp = miniapps[0]
            if miniapp in mini_app_data_new:
                break
        num = flows - obj_flows
        print(num)
        print(len(mini_app_data_new[miniapp]))
        delete_smaples = random.sample(mini_app_data_new[miniapp], min(len(mini_app_data_new[miniapp])-1, num))
        mini_app_data_new[miniapp] = [i for i in mini_app_data_new[miniapp] if i not in delete_smaples]
        
        cnt, flows = get_numbers(mini_app_data_new)
        
    return mini_app_data_new

def dicts_match_except_keys(dict1, dict2, ignore_keys):
    """
    Compare two dictionaries, ignoring specific keys.

    :param dict1: First dictionary
    :param dict2: Second dictionary
    :param ignore_keys: List of keys to ignore during comparison
    :return: True if dictionaries match except for the ignored keys, False otherwise
    """
    # Create copies of the dictionaries and remove the ignored keys
    dict1_filtered = {k: v for k, v in dict1.items() if k not in ignore_keys}
    dict2_filtered = {k: v for k, v in dict2.items() if k not in ignore_keys}

    # Compare the filtered dictionaries
    return dict1_filtered == dict2_filtered


def main():
    
    taintmini_file = "inputs/tainmini_10k_sum.json"
    minnie_file = "inputs/zero_day_flow_546.json"
    # minnie_file_add = "inputs/zero_day_flow_add_new.json"
    
    # add_navi(minnie_file, minnie_file_add)
    compare_taintmini_mini(minnie_file, taintmini_file)
    # remove_null_source(minnie_file)
    
    with open("inputs/zero_day_flow_546.json")as f:
        mini_app_data = json.load(f)
    get_numbers(mini_app_data)
    
    # mini_app_data = remove_null_source(minnie_file)
    # get_numbers(mini_app_data)
    
    mini_app_data = reduce_flows(mini_app_data)
    get_numbers(mini_app_data)
    
    
    # # mini_app_data = remove_null_source(mini_app_data)
    with open('inputs/zero_day_flow.json', 'w') as f:
        json.dump(mini_app_data, f, indent=4)

    

if __name__ == "__main__":
    main()