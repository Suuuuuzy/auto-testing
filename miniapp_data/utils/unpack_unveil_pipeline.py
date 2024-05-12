import os, subprocess
from tqdm import tqdm
from config import *

def run_unpack_script(script_path):
    subprocess.run(['./unveilr.exe', script_path])

if __name__ == '__main__':
    # ROOT = 'C:/Users/zhiha/OneDrive/Desktop/auto-testing/miniapp_data/raw_data'
    all_unpacked_packages = os.listdir(wxapkg_ROOT)
    for package in tqdm(all_unpacked_packages):
        try:
            run_unpack_script(os.path.join(ROOT, package))
        except Exception as e:
            print(f'package {package} encountering error when trying to unpack: {str(e)}')