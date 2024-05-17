import os
from config import *
import shutil
import platform

def copyanything(src, dst):
    # try:
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    # except:
        # print('failed')
        # raise
        
def main(appid, org_groundtruth_ROOT, unpacked_wxapkg_ROOT):
    src = os.path.join(org_groundtruth_ROOT, appid)
    if not os.path.exists(src):
        print('src does not exist')
    dst = os.path.join(unpacked_wxapkg_ROOT, appid)
    print(dst)
    copyanything(src, dst)

if __name__ == '__main__':
    appid = "wx4b1dfa2b8f503e6f"
    if platform.system()=="Linux": #Linux
        main(appid, org_groundtruth_ROOT, unpacked_wxapkg_ROOT)
    else: #Darwin
        main(appid, mac_org_groundtruth_ROOT, mac_unpacked_wxapkg_ROOT)
   
    