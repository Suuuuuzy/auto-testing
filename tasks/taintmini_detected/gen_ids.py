import json
MINIAPP_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/"
taintmini = "input/tainmini_10k_sum.json"

with open(taintmini) as f:
    taint_content = json.load(f)
    taintmini = [i.replace("-result.csv", "") for i in taint_content.keys()]
    print(len(taintmini))
with open("output/tainmini_10k.txt", "w") as f:
    for i in taintmini:
        f.write(MINIAPP_PATH + i +'\n')
    