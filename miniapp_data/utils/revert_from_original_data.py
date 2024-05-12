import os
from config import *
import shutil

def copyanything(src, dst):
    try:
        if os.path.exists(dst):
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
    except:
        print('failed')
        # raise
        
def main(appid):
    src = os.path.join(org_groundtruth_ROOT, appid)
    if not os.path.exists(src):
        print('src does not exist')
    dst = os.path.join(unpacked_wxapkg_ROOT, appid)
    print(dst)
    copyanything(src, dst)

if __name__ == '__main__':
    appid = "wx7fbb70a732424777"
    main(appid)