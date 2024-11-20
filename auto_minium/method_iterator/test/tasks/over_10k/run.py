
INPUT_FILE = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file/larger_than_10k_meta_output.json"
OUTPUT_FILE = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/appid_file/metacrawl_over_10k_ids.txt"
SCRIPT_PATH = "/media/dataj/wechat-devtools-linux/testing/auto-testing/auto_minium/method_iterator/test/pipeline_multi.py"
import json
with open(OUTPUT_FILE, "w") as fout:
    with open(INPUT_FILE) as f:
        content = json.load(f)
        for i in content:
            fout.write(i + '\n')