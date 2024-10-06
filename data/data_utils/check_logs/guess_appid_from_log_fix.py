import json, os

def get_org_fit(old_report_appid_dic):
    # print(f'{len(old_report_appid_dic)} in old report_appid_dic')
    org_hit = set()
    one_hit = set()
    all_appids = [key.split('_')[0] for key in old_report_appid_dic]
    all_appids = set(all_appids)

    for key in old_report_appid_dic:
        # print(key)
        # print('no results after checking src')
        if 'after_checking_src' not in old_report_appid_dic[key]:
            # print(key)
            continue
        fine_candidates = old_report_appid_dic[key]['after_checking_src']
        # print(fine_candidates)
        appid = key.split("/")[-1].split("_")[0]
        if len(fine_candidates)==1:
            fine_appid = fine_candidates[0].split('/')[-1]
            if fine_appid==appid:
                org_hit.add(key)
                # del report_appid_dic[report]
            else:
                one_hit.add(key)
        else:
            possible_appids = [i[0] for i in old_report_appid_dic[key]['possible']]
            possible_appids = list(set(possible_appids))
            if len(possible_appids)==1:
                # print(possible_appids[0])
                # print(key)
                pass
    # print((one_hit))         
    # print(f'len of org_hit, one_hit')
    # print(len(org_hit), len(one_hit))
    # print(f'len of logs that are sure the correct names: {len(org_hit.union(one_hit))}')
    return org_hit, one_hit

def change_one_hit_log_name(one_hit, old_report_appid_dic):
    log_root = "/home/suzy/temp/decoded_new_taint_log_file"
    for one in one_hit:
        old_name = os.path.join(log_root, one)
        new_log_name = old_report_appid_dic[one]['after_checking_src'][0].split("/")[-1] + "_" +  one
        new_name = os.path.join(log_root, new_log_name)
        print(f'{old_name} -> {new_name}')
        # change the log file name
        os.rename(old_name, new_name)
        # change the key in the dictionary
        old_report_appid_dic[new_log_name] = old_report_appid_dic[one]
        del old_report_appid_dic[one]
        # print(old_report_appid_dic[new_log_name])
    print(len(old_report_appid_dic))
    with open('guess_appid_from_log.json', 'w') as f:
        json.dump(old_report_appid_dic, f, indent = 2)

def main():
    with open('guess_appid_from_log.json') as f:
        old_report_appid_dic = json.load(f)
    org_hit, one_hit = get_org_fit(old_report_appid_dic)
    change_one_hit_log_name(one_hit, old_report_appid_dic)

def ignore_weapp_log():
    with open('guess_appid_from_log.json') as f:
        old_report_appid_dic = json.load(f)
    new_report_appid_dic = {}
    for key in old_report_appid_dic:
        if 'weapp' in key:
            continue
        new_report_appid_dic[key] = old_report_appid_dic[key]
    with open('guess_appid_from_log.json', 'w') as f:
        json.dump(new_report_appid_dic, f, indent = 2)

if __name__ == "__main__":
    main()