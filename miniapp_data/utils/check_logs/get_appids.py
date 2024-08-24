import re

def get_appids(appid_type):
    if appid_type=='wxpay':
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_wxpay_list.log') as f:
            content = f.read()
        pattern = r'(wx[a-zA-Z0-9]{16}-pc) contains wxpay'
    elif appid_type=='wxpay_checked':
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_wxpay_list.log') as f:
            content = f.read()
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
    elif appid_type=='decoded_checked':
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/decoded_check.log') as f:
            content = f.read()
        pattern = r'([a-zA-Z0-9_-]+)(?=\schecked)'
    elif appid_type=="plugin_checked":
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_plugin_list.log') as f:
            content = f.read()
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
    elif appid_type=="plugin":
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_plugin_list.log') as f:
            content = f.read()
        pattern = r'(wx[a-zA-Z0-9]{16}-pc) contains the two plugin'
    elif appid_type=="noappjson_checked":
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_noappjson_list.log') as f:
            content = f.read()
        pattern = r'(wx[a-zA-Z0-9]{16}-pc)'
    elif appid_type=="noappjson":
        with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_logs/check_noappjson_list.log') as f:
            content = f.read()
        pattern = r'(wx[a-zA-Z0-9]{16}-pc) does not contain app.json'
        
    # Find all matches in the sample text
    matches = re.findall(pattern, content)
    matches = set(matches)    
    return list(matches)
