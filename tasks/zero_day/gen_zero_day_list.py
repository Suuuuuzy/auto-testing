import json
input_file = 'inputs/zero_day_flow.json'
with open(input_file) as f:
    mini_app_data = json.load(f)
output_dir = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/"
with open("zero_day_miniapps.json", "w") as f:
    for miniapp in mini_app_data:
        f.write(output_dir+miniapp+'\n')