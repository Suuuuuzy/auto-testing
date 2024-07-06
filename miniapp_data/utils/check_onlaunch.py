import os, re, json
import logging
logger = logging.getLogger(__name__)

logging.basicConfig(
    filename='onlaunch.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)


onLaunchAPIS = [ # miniProgram   
        "App.onLaunch", # params equal to: "wx.getLaunchOptionsSync"
        "wx.getEnterOptionsSync", # if cold start, params equal to "App.onLaunch", if hot start, params equal to "App.onShow" 
        "App.onShow",  # params equal to: "wx.onAppShow"
        "Page.onLoad", 
        # miniGame
        "wx.onShow",
        "wx.getLaunchOptionsSync"
        ]


def check_onlaunch():
    data_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked/"
    all_unpacked_ids = os.listdir(data_path)
    print(len(all_unpacked_ids))
    for pkg in all_unpacked_ids:
        try:
            with open(os.path.join(data_path, pkg, "app.json")) as f:
                app_json = json.load(f)
            if "pages" in app_json:
                for page in app_json["pages"]:
                    js_file = os.path.join(data_path, pkg, page+".js")
                    with open(js_file) as f:
                        content =  f.read()
                    
        except:
            logger.error(f"Error reading app.json in {pkg}")
    
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
                except:
                    pass

            
check_config()