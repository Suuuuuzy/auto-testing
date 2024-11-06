#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python
import json, re
text = """09-26 22:14:01.315 23589 23633 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx9762c660d6b70d06_2 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_244373769_2.wxapkg
09-26 22:14:22.728 23589 23624 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx8eeeb1c87069a010$__APP___6 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1296444217_6.wxapkg
09-16 15:01:17.416 12628 12655 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx7643d5f831302ab0$/modules/indoormap/$__WITHOUT_MULTI_PLUGINCODE___335 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1619513774_335.wxapkg
09-16 15:02:50.092 12628 15137 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx9500e13a751b1e92$__APP___35 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1764673456_35.wxapkg
09-16 15:02:50.092 12628 15137 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx9500e13a751b1e92$__APP___35 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1764473456_35.wxapkg
09-16 15:02:50.092 12628 15137 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx9500e13a751b1e92$__APP___35 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1764473456_35.wxapkg
09-16 17:04:18.458  9717  9772 D Wechat7020: USEFUL INFO: The appid: WxaPkgDiff_152740959_16_11 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_152740959_11.wxapkg
09-14 22:57:31.714  7288  7360 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$__APP___18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_563179233_18.wxapkg
09-14 22:57:31.714  7288  7360 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$__APP___18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_563179233_18.wxapkg
09-14 22:57:33.452  7288  7362 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/welcome/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-965434873_18.wxapkg
09-14 22:57:33.452  7288  7362 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/welcome/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-965434873_18.wxapkg
09-14 22:57:33.502  7288  7357 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/page-result/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1976059502_18.wxapkg
09-14 22:57:33.502  7288  7357 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/page-result/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1976059502_18.wxapkg
09-14 22:57:33.534  7288  7357 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/user-paying/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1122703661_18.wxapkg
09-14 22:57:33.534  7288  7357 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/user-paying/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_1122703661_18.wxapkg
09-14 22:57:33.565  7288  7357 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/store-list/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-793290709_18.wxapkg
09-14 22:57:33.565  7288  7357 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/store-list/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-793290709_18.wxapkg
09-14 22:57:34.110  7288  7362 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/comment/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-1139233110_18.wxapkg
09-14 22:57:34.110  7288  7362 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/comment/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-1139233110_18.wxapkg
09-14 22:57:34.142  7288  7362 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/zcordercheck/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-628106894_18.wxapkg
09-14 22:57:34.142  7288  7362 D Wechat7020: USEFUL INFO: The appid: WxaPkgZstd_wx143b173be0c69447$/pages/zcordercheck/_18 and its pkg dir: /data/user/0/com.tencent.mm/MicroMsg/appbrand/pkg/general/_-628106894_18.wxapkg"""

useful_path = "../newcrawl/logs/useful_info.txt"
with open(useful_path) as f:
    text = f.read()

texts = text.split("\n")

pattern = r"(WxaPkgZstd)_(wx[a-zA-Z0-9]{16})(?:\$(?:(/[^$]+)\$)?(__[A-Z_]+__)_(\d+)|_(\d+)).*(_\d+_\d+\.wxapkg)"
diff_pattern = r"(WxaPkgDiff)_(\d+_\d+_\d+).*(_\d+_\d+\.wxapkg)"
info_sum = {}
info_sum = {"Diff":{}, "Zstd":{}}
wxid_pkg_dic = {}

for text in texts:

    info = {}

    wxapkg_file = text.split("/")[-1]
    info["wxapkg_file"] = wxapkg_file
    postfix = wxapkg_file.split("_")[-1].replace(".wxapkg", "")
    info["postfix"] = postfix

    pkg_info = text.split("The appid: ")[-1].split("_" + postfix)[0]
    # print(pkg_info)

    parts = pkg_info.split("$")

    # parts[0]
    info_type = parts[0].split("_")[0]
    info["type"] = info_type

    if info_type =="WxaPkgZstd":
        wxid = parts[0].split("_")[1]
        info["wxid"] = wxid
        info['path'] = parts[1:]
        if info_sum["Zstd"].get(info["wxid"]): # if this wxid exists, then there might be multiple wxapkgs
            if info["wxapkg_file"] not in wxid_pkg_dic[info["wxid"]]:
                wxid_pkg_dic[info["wxid"]].add(info["wxapkg_file"])
                info_sum["Zstd"][info["wxid"]].append(info)
        else:
            info_sum["Zstd"][info["wxid"]] = [info]
            wxid_pkg_dic[info["wxid"]] = set()
            wxid_pkg_dic[info["wxid"]].add(info["wxapkg_file"])
    else:
        info["Patch"] = "_"+parts[0].replace(info_type+"_", "")+"_"+postfix+".wxapkg.diff"
        info_sum["Diff"][info["Patch"]] = info

print(f'{len(info_sum["Zstd"])} pkg infos in useful_info.txt')

import os
unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
unpacked_ids = set(os.listdir(unpack_path))
unpack_len = len(unpacked_ids)
print(f"{unpack_len} dirs in data/newcrawl/pkg_unpack")

from unpack import get_ids_from_metadata
metadata_ids = get_ids_from_metadata()
print(f"Among them, {len(unpacked_ids.intersection(metadata_ids))} dirs are from meta data crawl")

output_path = "../newcrawl/logs/info.json"
with open(output_path,"w") as f:
    json.dump(info_sum, f, indent = 2)

