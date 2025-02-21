#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python
# suzy: I use this to unpack the top 50 miniapps downloaded on imac
import logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    filename='unpack_top50.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

# import subprocess, os, json
import shutil, os
import csv, json


from unpack import decompile, copy_code, move_code, decompile_wxapkg


def combine_pkgs(rootpath):
    mainpkg_path = os.path.join(rootpath, "__APP__")
    if not os.path.isdir(mainpkg_path):
        return
    subpkgs = os.listdir(rootpath)
    subpkgs = [i for i in subpkgs if os.path.isdir(os.path.join(rootpath, i))]
    if "__APP__" in subpkgs:
        subpkgs.remove("__APP__")
    # print(subpkgs)
    files_under_main_pkg = os.listdir(mainpkg_path)
    for subpkg in subpkgs:
        subpkg_name = subpkg[1:-1]
        if os.path.isdir(os.path.join(rootpath, subpkg, subpkg_name)):
            if subpkg_name in files_under_main_pkg:
                # print(os.path.join(rootpath, subpkg, subpkg_name), os.path.join(mainpkg_path, subpkg_name))
                if os.path.exists(os.path.join(mainpkg_path, subpkg_name)):
                    shutil.rmtree(os.path.join(mainpkg_path, subpkg_name))
                shutil.move(os.path.join(rootpath, subpkg, subpkg_name), mainpkg_path)
    if "___wx___" in subpkgs:
        # print(os.path.join(rootpath, "___wx___", "__wx__"), os.path.join(mainpkg_path, "__wx__"))
        if os.path.exists(os.path.join(rootpath, "___wx___", "__wx__")):
            if os.path.exists(os.path.join(mainpkg_path, "__wx__")):
                shutil.rmtree(os.path.join(mainpkg_path, "__wx__"))
            shutil.move(os.path.join(rootpath, "___wx___", "__wx__"), os.path.join(mainpkg_path))


def get_plugins_info(pkg_path): 
    files = os.listdir(pkg_path)
    if "app.json" in files:
        with open(pkg_path+'/app.json') as f:
            app_json = json.load(f)
            if "plugins" in app_json:
                return app_json["plugins"]

# this happens when a sub pkg uses the same plugin as the main pkg and registers it in the app.json
def plugin_same_id_error(app_json):
    if "plugins" in app_json:
        del app_json["plugins"]
    return app_json

# this is to deal with access_token expire error, we modify the requirePlugin to require
def plugin_access_token(app_json, plugins_info):
    # plugins_info
    # delete all plugins in app.json!
    return app_json
    
def resolve__wx__(app_json, pkg_path):
    if "pages" in app_json:
        app_json["pages"] = ["new"+i if i==("__wx__") else i for i in app_json["pages"]]
    old_path = os.path.join(pkg_path, "__wx__")
    new_path = os.path.join(pkg_path, "new__wx__")
    if os.path.isdir(old_path):
        os.rename(old_path, new_path)
    return app_json
                
def update_app_json(pkg_path, plugins_info):
    
    print(">>> updating app.json") 
    files = os.listdir(pkg_path)
    bad_item = []
    if "app.json" in files:
        with open(pkg_path+'/app.json') as f:
            app_json = json.load(f)
            if "subPackages" in app_json:
                subpkgs = app_json["subPackages"]
                for item in subpkgs:
                    if item["root"].startswith("/"):
                        print(item)
                        bad_item.append(item)
                    if "plugins" in item:
                        del item["plugins"]
                app_json["subPackages"] = [i for i in app_json["subPackages"] if i not in bad_item]
        app_json = plugin_same_id_error(app_json)
        app_json = plugin_access_token(app_json, plugins_info)
        app_json = resolve__wx__(app_json, pkg_path)
        with open(pkg_path+'/app.json', "w") as f:
            json.dump(app_json, f, indent=2)
                    
                # return app_json["plugins"]
            
def unpack_plugins(plugins):
    plugin_path = "/Users/jianjia/Library/Containers/com.tencent.xinWeChat/Data/.wxapplet/packages/__plugin__"
    dd_plugins = os.listdir(plugin_path)
    obj_plugin_path = "/Users/jianjia/Desktop/tmp/top50/__plugin__"
    print(">>> unpacking plugins")
    if not plugins:
        return
    for item in plugins:
        print(item)
        if plugins[item]["provider"] in dd_plugins:
            print(f"{plugins[item]['provider']} hit!")
            dst_plugin_path = obj_plugin_path + '/' + plugins[item]["provider"]
            if not os.path.isdir(dst_plugin_path):
                for file in os.listdir(plugin_path + '/' + plugins[item]["provider"]):
                    if file.startswith("."):
                        continue
                    src_plugin_path = plugin_path + '/' + plugins[item]["provider"] + '/' + file
                    decompile(src_plugin_path)
                    move_code(src_plugin_path, dst_plugin_path) 
                    break
            else:
                print('already there!')
        # else:
        #     del plugins[item]

def cp_sub_pkg_into_main_pkg(plugins_info, appid):
    print(">>> copying plugins")
    src_plugin_path = "/Users/jianjia/Desktop/tmp/top50/__plugin__"
    pkg_path = "/Users/jianjia/Desktop/tmp/top50/" + appid + "/__APP__"
    # print(pkg_path)
    if not plugins_info:
        return
    for item in plugins_info:
        plugin_id = plugins_info[item]["provider"]
        plugin_path = os.path.join(src_plugin_path, plugin_id, "__PLUGINCODE__")
        obj_plugin_path = os.path.join(pkg_path, plugins_info[item]["subpackage"][1:], "__plugin__/", plugin_id)
        # print(plugin_path, obj_plugin_path)
        try:
            copy_code(plugin_path, obj_plugin_path)
        except:
            print(f"{plugin_id} already there!")

def unpack_main_pkg(rootpath, appname):
    appid = rootpath.split("/")[-2]
    print(f">>> unpacking main pkg {appname}: {appid}")
    obj_app_path = "/Users/jianjia/Desktop/tmp/top50"
    dst_path = obj_app_path+'/'+appid
    if os.path.isdir(dst_path):
        print("already there!")
    else:
        decompile(rootpath)
        move_dir(rootpath, dst_path)
    try:
        print(">>> combine subpkgs into main pkg")
        combine_pkgs(dst_path)
    except:
        print("already combined!!")
    return appid




def process_one_pkg(rootpath, appname):
    # decompile and move main pkg
    appid = unpack_main_pkg(rootpath, appname)
    
    # decompile and move sub pkgs
    pkg_path = "/Users/jianjia/Desktop/tmp/top50/" + appid + "/__APP__"
    
    source = pkg_path+'/app.json'
    destination = pkg_path+'/app_copy.json'
    shutil.copy2(source, destination)
    
    plugins_info = get_plugins_info(pkg_path)
    unpack_plugins(plugins_info)

    # cp sub pkgs into main pkg
    cp_sub_pkg_into_main_pkg(plugins_info, appid)

    # deal with app.json
    update_app_json(pkg_path, plugins_info)
    
    print(f"====finished {appname}:{appid} at {pkg_path}")
    return pkg_path


def get_wxids_from_csv(csvfile):
    wxids =[]
    with open(csvfile, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            # skip the first row
            if row[6]=="original_dir":
                continue
            # print(row[6])  # Each row is a list of strings
            rootpath = row[6]
            appname = row[2]
            rootpath = rootpath.replace("/Users/jianjia/Library/Containers/com.tencent.xinWeChat/Data/.wxapplet", "../top50")
            # print(f'rootpath: {rootpath}, appname: {appname}, appid: {row[4]}')
            wxids.append(row[4])
    return wxids

def process_pkg(pkg_prefix, unpack_pkg_prefix, wxids):
    for wxid in wxids:
        rootpath = os.path.join(pkg_prefix, wxid)
        wxapkg_path = [i for i in os.listdir(rootpath) if not i.startswith(".")][0]
        rootpath = os.path.join(rootpath, wxapkg_path)
        logger.info(f">>>> unpacking wxid: {wxid} at dir: {rootpath}")
        
        if not os.path.isdir(unpack_pkg_prefix + '/' + wxid):
            os.mkdir(unpack_pkg_prefix + '/' + wxid)
        
        # unpack and combine local pkgs
        wxapkgs = [i for i in os.listdir(rootpath) if i.endswith(".wxapkg")]
        for pkg in wxapkgs:
            src = os.path.join(rootpath, pkg)
            innerpath = pkg.replace(".wxapkg", "")
            if innerpath=="__APP__":
                innerpath=""
            else:
                innerpath = innerpath.split("_")[1]
            decompile_wxapkg(src, dst=unpack_pkg_prefix + '/' + wxid)
        
        
        # deal with plugins??
        

def main():
    
    csvfile = '../top50/miniapp-dataset-top50.csv'
    wxids = get_wxids_from_csv(csvfile)
    print(wxids)
    
    # wxids = ["wxde8ac0a21135c07d"]
    pkg_prefix  = "../top50/packages"
    unpack_pkg_prefix = "../top50/packages_unpack"
    
    process_pkg(pkg_prefix, unpack_pkg_prefix, wxids)

if __name__ == '__main__':
    main()