import os, re, json

wxpay_list_file = "/media/dataj/wechat-devtools-linux/testing/auto-testing/miniapp_data/utils/check_wxpay_list.log"
output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'

with open(wxpay_list_file) as f:
    content = f.read()
# Define the regular expression pattern
pattern = r'wx[a-zA-Z0-9]{16}-pc'
# Find all matches in the sample text
matches = re.findall(pattern, content)
matches = set(matches)
wxpay_list = (matches)

with open('auto_minium/test5_find_pages_and_inputs/autominium_test.log') as f:
    content = f.read()
paras = content.split('\n\n')
# print(paras[0])
# Define the regular expression pattern
pattern = r'wx[a-zA-Z0-9]{16}-pc'
error_appids = set()
no_error_appids = set()
for para in paras:
    if "errors=1" in para:
        # Find all matches in the sample text
        matches = re.findall(pattern, para)
        matches = set(matches)
        error_appids.update(matches)
    elif "errors=0" in para:
        # Find all matches in the sample text
        matches = re.findall(pattern, para)
        matches = set(matches)
        no_error_appids.update(matches)

unpacked_files = set(os.listdir(output_dir))
error_appids = error_appids & unpacked_files
no_error_appids = no_error_appids & unpacked_files

error_appids = error_appids - no_error_appids
print(f'Error appids: {len(error_appids)}')
print(f'No error appids: {len(no_error_appids)}')
print(f'In total: {len(no_error_appids.union(error_appids))}')

error_appids = error_appids - wxpay_list
error_appids = list(error_appids)
print(f'Error appids except with wxpay patterns: {len(error_appids)}')
with open("error_appids.txt", "w") as f:
    json.dump(error_appids, f)
    
   
        
    