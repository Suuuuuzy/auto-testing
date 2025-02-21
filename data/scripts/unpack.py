#!/media/dataj/wechat-devtools-linux/testing/myenv/bin/python
import logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    filename='unpack.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

import json, os, re
from utils.wxapkg_decoder import decompile_wxapkg_with_wxUnpacker, decompile_wxapkg_with_unveilr
import shutil

# import distutils.dir_util.copy_tree as copy_tree

def decompile(src, local_unpack_path):
    if not decompile_wxapkg_with_unveilr(src):
        logger.error(f'decompile_wxapkg_with_unveilr for {src} failed')
        if not decompile_wxapkg_with_wxUnpacker(src, local_unpack_path):
            logger.error(f'decompile_wxapkg_with_wxUnpacker for {src} failed')
            return False
    return True


def move_code(source_dir, destination_dir):
    # Check if destination directory exists, if not, create it
    if not os.path.exists(destination_dir):
        os.makedirs(destination_dir)

    # Move all files and directories from the source to the destination
    for item in os.listdir(source_dir):
        source_item = os.path.join(source_dir, item)
        destination_item = os.path.join(destination_dir, item)

        # Move the directory or file
        shutil.move(source_item, destination_item)

def copy_code(source_dir, destination_dir):
    # Ensure destination directory exists
    if not os.path.exists(destination_dir):
        os.makedirs(destination_dir)

    # Loop through items in the source directory
    for item in os.listdir(source_dir):
        source_item = os.path.join(source_dir, item)
        destination_item = os.path.join(destination_dir, item)
        
        # If it's a directory, use copytree
        if os.path.isdir(source_item):
            if os.path.exists(destination_item):
                # logger.info("exists", destination_item)
                copy_code(source_item, destination_item)
            else:
                shutil.copytree(source_item, destination_item)
        else:
            # If it's a file, use copy
            if not os.path.exists(destination_item):
                shutil.copy(source_item, destination_item)

def copy_and_overwrite(from_path, to_path):
    if os.path.exists(to_path):
        shutil.rmtree(to_path)
    shutil.copytree(from_path, to_path)

def decompile_wxapkg(src, dst=None):
    local_unpack_path = src.replace(".wxapkg", "")
    if os.path.isdir(local_unpack_path) and len(os.listdir(local_unpack_path))>0:
        pass
    else:
        if not decompile(src, local_unpack_path):
            return
    print(f"local_unpack_path: {local_unpack_path}, dst: {dst}")
    # this might not be the case since there might be nested pkgs.
    # if os.listdir(local_unpack_path)== os.listdir(dst):
    #     logger.info(f'{src} already unpacked and copied!')
    #     return
    logger.info(f"Unpack subpkg, src: {src}, dst: {dst}")
    copy_code(local_unpack_path,  dst)
    
            
def process_pkg(info, dd_pkgs_prefix, unpack_pkg_prefix, wxids = None):
    dd_pkgs = os.listdir(dd_pkgs_prefix)
    if wxids==None:
        wxids = [i for i in info]
    for wxid in wxids:
        logger.info(f">>>> unpacking wxid: {wxid}")
        pkg_list = info[wxid]
        # create the obj dir for the wxid
        if not os.path.isdir(unpack_pkg_prefix + '/' + wxid):
            os.mkdir(unpack_pkg_prefix + '/' + wxid)
        for pkg in pkg_list:
            if pkg["wxapkg_file"] not in dd_pkgs:
                tmp  = pkg["wxapkg_file"]
                logger.info(f"{tmp} missing for {wxid}!")
            # unpack and move this pkg
            src = os.path.join(dd_pkgs_prefix, pkg['wxapkg_file'])
            dst = os.path.join(unpack_pkg_prefix, wxid)
            innerpath = ""
            if len(pkg['path'])>0:
                innerpath = pkg['path'][0]
                if innerpath[0] == "/":
                    innerpath = innerpath[1:]
            if innerpath!="":
                logger.info(f"innerpath: {innerpath}")
            decompile_wxapkg(src, dst=dst)

def get_ids_from_metadata():
    with open("../newcrawl/logs/meta_data.txt") as f:
        content = f.read()

    pattern = r'wx[a-zA-Z0-9]{16}'
    ids = set(re.findall(pattern, content))
    
    # ids = content.split("shopAppid=")
    # ids = [i.split("&")[0] for i in ids if i.startswith("wx")]
    return ids

def main():
    
    info_file = "../newcrawl/logs/info.json"
    pkg_prefix  = "../newcrawl/pkg"
    unpack_pkg_prefix = "../newcrawl/pkg_unpack"

    with open(info_file) as f:
        content = json.load(f)
    info = content["Zstd"]
    
    # ==============================
    # Option 1: get ids from 42w appids
    # wxids = set([i for i in info])
    
    # Option 2: get ids from meta data
    ids = get_ids_from_metadata()
    wxids = set(ids)
    
    # Option 3: only one!
    # wxids = set(["wx850d691fd02de8a1"])
    # ==============================
    
    print(f'>>>> Total number of wxids loaded: {len(wxids)}')
    
    info_ids = set([i for i in info])
    print(f'>>>> Number of wxids that are not crawled: {len(wxids-info_ids)}')
    
    # exclude the ones that have been tried unpacking
    with open("unpack.log") as f:
        content = f.read()    
    pattern = r'wx[a-zA-Z0-9]{16}'
    tried_ids = set(re.findall(pattern, content))
    wxids = wxids - tried_ids
    
    # include the ones does not have info
    pattern = r'Info not found >>> (wx[a-zA-Z0-9]{16})'
    not_found_ids = set(re.findall(pattern, content))
    wxids = (wxids.union(not_found_ids))
    
    # exclude the ones unapcked in unpack_pkg_prefix, in theory this is included in tried_ids
    wxids = list(wxids)
    files = os.listdir(unpack_pkg_prefix)
    wxids = [i for i in wxids if i in info and i not in files] 
    
    # wxids = ["wx548eca3f99062f38",
    #          "wxf4433487625264eb",
    #          "wxea1ecea148fd9f83",
    #          "wxfb116a9a6bb00643"]
    
    print(f'Unpacking {len(wxids)} pkgs')

    process_pkg(info, pkg_prefix, unpack_pkg_prefix, wxids)
    

if __name__ == '__main__':
    main()
