import os, subprocess
from tqdm import tqdm
# from config import *
import logging
logger = logging.getLogger(__name__)
import json
import platform
from pathlib import Path
import sys
from single_unpack_unveil import decompile_wxapkg_with_unveilr
from single_preprocess import preprocess

logging.basicConfig(
    filename='unpack_with_unveil.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

# Decompile with unveilr
class UnsupportedOSException(Exception):
    pass

if __name__ == '__main__':
    wxapkg_ROOT = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w"
    unpack_ROOT = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    appid = sys.argv[1]
    wxapkg_path = os.path.join(wxapkg_ROOT, appid)
    output_path = os.path.join(unpack_ROOT, appid.replace(".wxapkg", ""))
    
    decompile_wxapkg_with_unveilr(wxapkg_path, output_path)
    preprocess(output_path)