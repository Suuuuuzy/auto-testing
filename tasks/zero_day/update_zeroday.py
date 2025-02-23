import json
with open('inputs/zero_day_flow.json')as f:
    mini_app_data = json.load(f)

with open('inputs/zero_day_flow_add.json')as f:
    mini_app_data_add = json.load(f)

for i in mini_app_data_add:
    if i not in mini_app_data:
        mini_app_data[i] = mini_app_data_add[i]
        print('new miniappid ', i)
    else:
        # mini_app_data_tmp = set(mini_app_data[i])
        # mini_app_data_add_tmp = set(mini_app_data_add[i])
        # mini_app_data[i] = list(mini_app_data_tmp.union(mini_app_data_add_tmp))
        mini_app_data[i].extend(mini_app_data_add[i])
        print('extend miniappid', i)

with open('inputs/zero_day_flow.json', 'w') as f:
    json.dump(mini_app_data, f, indent=4)