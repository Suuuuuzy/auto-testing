import re

autominium_test_log = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/autominium_test.log"
with open(autominium_test_log) as f:
    content = f.read()
appid_pattern = r'(wx[a-zA-Z0-9]{16})'
matches = re.findall(appid_pattern, content)
matches = set(matches)
print(f"{len(matches)} miniapps tested so far")

with open("/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/decoded_check.log") as f:
    content = f.read()

matches = re.findall(appid_pattern, content)
matches = set(matches)
print(f"{len(matches)} miniapps got data flow")

c = content.split("\n")
c = [i for i in c if i]
flows = [i for i in c if 'checked' not in i and 'taint strin' not in i]
# print(f"Got {len(flows)} flows in total")

sensWechatApi = [i for i in c if "sensWechatApi" in i]
print(f"Got {len(sensWechatApi)} flows in sensWechatApi")

onLaunch = [i for i in c if "onLaunch" in i]
print(f"Got {len(onLaunch)} flows in onLaunch")

inputBox = [i for i in c if "inputBox" in i]
print(f"Got {len(inputBox)} flows in inputBox")

formSubmit = [i for i in c if "formSubmit" in i]
print(f"Got {len(formSubmit)} flows in formSubmit")

print(f"Got {len(sensWechatApi) + len(onLaunch) + len(inputBox) + len(formSubmit)} flows in total")

