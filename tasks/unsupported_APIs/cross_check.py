import json

taintmini_config = "/media/dataj/wechat-devtools-linux/prework/TaintMini/config.json"
with open(taintmini_config) as f:
    c = json.load(f)
cs = c['sources'] + c['sinks']
cs = [i.replace("wx.", "") for i in cs]
print(cs)
print(len(cs))


not_support  = "/media/dataj/wechat-devtools-linux/testing/auto-testing/unsupported_APIs/inputs/unsupported_API.txt"
with open(not_support) as f:
    ns = f.readlines()
ns = [x.strip() for x in ns]
print(ns)

for i in ns:
    if i in cs:
        print(i)