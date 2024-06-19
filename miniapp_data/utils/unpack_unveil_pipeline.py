import os, subprocess
from tqdm import tqdm
# from config import *
import logging
logger = logging.getLogger(__name__)
import json
import platform
from pathlib import Path
import multiprocessing as mp
import re

logging.basicConfig(
    filename='unpack_with_unveil.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

appid_file = '/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w.json'

# Decompile with unveilr
class UnsupportedOSException(Exception):
    pass

def decompile_wxapkg_with_unveilr(wxapkg, output_path=None):
    """
    Decompile wx miniapp
    @param package_path: Path to package.
    @return:
    """
    system = platform.system()
    machine = platform.machine()

    if system == 'Linux':
        if machine.startswith('arm'):
            # Linux ARM 
            decompiler_tool = Path(__file__).parent / "unveilr/unveilr@2.0.1-linux-arm64"
        else:
            # Linux x86 
            decompiler_tool = Path(__file__).parent / "unveilr/unveilr@2.0.1-linux-x64"
    elif system == 'Windows':
        # Windows x86 
        decompiler_tool = Path(__file__).parent / "unveilr/unveilr@2.0.1-win-x64.exe"
    elif system == 'Darwin':
        if machine.startswith('arm'):
            # macOS ARM 
            decompiler_tool = Path(__file__).parent / "unveilr/unveilr@2.0.1-macos-arm64"
        else:
            # macOS x86 
            decompiler_tool = Path(__file__).parent / "unveilr/unveilr@2.0.1-macos-x64"
    else:
        # 
        logger.error(("Unsupported OS: {} {}".format(system, machine)))
        raise UnsupportedOSException("Unsupported OS: {} {}".format(system, machine))
    
    if output_path is not None:
        cmdline = [decompiler_tool, wxapkg, '-o', output_path, '-f']
    else:
        cmdline = [decompiler_tool, wxapkg, '-f']

    try:
        out = subprocess.check_output(cmdline)
        logger.info(out)
        logger.info('Decompile Success: {}'.format(wxapkg))
        return True
    except Exception as e:
        logger.error(e)
        return False

output_dir = '/media/dataj/miniapp_data/wxapkgs-42w-unpacked/'
input_dir = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w/"
    
def handle_wxapkgs(wxapkgs):
    with open('unpack_with_unveil.log') as f:
        content = f.read()
    wxapkg_paths = [i for i in wxapkg_paths if not os.path.exists(output_dir + i)]
    
    for i in tqdm(wxapkg_paths):
        output_path = output_dir + i
        wxapkg_path = input_dir + i + ".wxapkg"
        print(output_path)
        # if i in content or 
        if os.path.exists(output_path):
            # print('already processed')
            pass
            # logger.info('Decompile Success: {}'.format(output_path))
        else:
            if os.path.exists(wxapkg_path):
                try:
                    decompile_wxapkg_with_unveilr(wxapkg_path, output_path)
                    logger.info('Decompile Success: {}'.format(output_path))
                except Exception as e:
                    logger.error(f'package {package} encountering error when trying to unpack: {str(e)}')

def handle_wxapkgs_old(package_names):
    all_unpacked_packages= package_names
    print("Total wxapkg number: "+ str(len(all_unpacked_packages)))
    logger.info("Total wxapkg number: "+ str(len(all_unpacked_packages)))
    
    # all_unpacked_packages = [i for i in all_unpacked_packages if not os.path.exists(output_dir + i)]
    
    with open('unpack_with_unveil.log') as f:
        content = f.read()
        # Define the regular expression pattern
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
        # Find all matches in the sample text
        matches = re.findall(pattern, content)
        matches = set(matches)
        
    all_unpacked_packages = [i for i in all_unpacked_packages if i not in matches]
    print("To be unpacked: "+  str(len(all_unpacked_packages)))
    logger.info("To be unpacked: "+  str(len(all_unpacked_packages)))

    # all_unpacked_packages = all_unpacked_packages[:100]
    for package in tqdm(all_unpacked_packages):
        if not os.path.exists(os.path.join(output_dir, package)):
            try:
                decompile_wxapkg_with_unveilr(os.path.join(input_dir, package+".wxapkg"), os.path.join(output_dir, package))
            except Exception as e:
                logger.error(f'package {package} encountering error when trying to unpack: {str(e)}')
            

def main():
    with open(appid_file, 'r') as fp:
        package_names = json.load(fp)
    print(len(package_names))
    # processes = 20
    processes = 20
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_wxapkgs, batched_package_names)
    
if __name__ == '__main__':
    # main()
    
    
    with open(appid_file, 'r') as fp:
        package_names = json.load(fp)
    handle_wxapkgs_old(package_names)