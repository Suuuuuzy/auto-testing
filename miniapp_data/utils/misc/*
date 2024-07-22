import os, re, json
import logging
logger = logging.getLogger(__name__)

logging.basicConfig(
    filename='tmp.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

def get_newly_unpacked_ids():
    logfileName = "unpack_with_unveil.log"
    with open(logfileName) as f:
        content = f.read()
    lines = content.split("\n")
    lines = [i for i in lines if i.startswith("2024-06-25")]
    # Define the regular expression pattern
    pattern = r'wx[a-zA-Z0-9]{16}-pc'
    new_unpacked_ids = []
    # Find all matches in the sample text
    for i in lines:
        matches = re.findall(pattern, i)
        # matches
        matches = list(set(matches))
        new_unpacked_ids.extend(matches)
    print(len(new_unpacked_ids))
    return new_unpacked_ids

def check_config():
    libVersionDic = {}
    data_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked/"
    all_unpacked_ids = os.listdir(data_path)
    print(len(all_unpacked_ids))
    configs = ["project.private.config.json", "project.config.json"]
    
    # all_unpacked_ids = all_unpacked_ids[:100]
    for i in all_unpacked_ids:
        if not os.path.exists(os.path.join(data_path, i)):
            continue
        files = os.listdir(os.path.join(data_path, i))
        for config in configs:
            if config in files:
                config_file = os.path.join(data_path, i, config)
                try:
                    with open(config_file) as f:
                        con = json.load(f)
                    if "condition" in con:
                        if "miniprogram" in con["condition"]:
                            if "list" in con["condition"]["miniprogram"]:
                                if con["condition"]["miniprogram"]["list"]!=[]:
                                    for item in con["condition"]["miniprogram"]["list"]:
                                        # if item['query'] != '':    
                                        # print(item)
                                        logger.info(i + "$$"+ config_file)
                                        logger.info(item)
                                    # config_ids.add(i)
                    if "libVersion" in con:
                        if con["libVersion"] not in libVersionDic:
                            libVersionDic[con["libVersion"]] = 1
                        else:
                            libVersionDic[con["libVersion"]]+=1
                except:
                    pass
    with open("tmplibVersionDic.txt", "w") as f:
        json.dump(libVersionDic, f)
            
check_config()

def check_onLaunch_Query():
    pass