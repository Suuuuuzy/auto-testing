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
import argparse, math


logging.basicConfig(
    filename='unpack_with_unveil.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

# appid only
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

def handle_wxapkgs(package_names):
    all_unpacked_packages= package_names
    print("To be unpacked: "+  str(len(all_unpacked_packages)))
    logger.info("To be unpacked: "+  str(len(all_unpacked_packages)))

    for package in tqdm(all_unpacked_packages):
        if not os.path.exists(os.path.join(output_dir, package)):
            try:
                decompile_wxapkg_with_unveilr(os.path.join(input_dir, package+".wxapkg"), os.path.join(output_dir, package))
            except Exception as e:
                logger.error(f'package {package} encountering error when trying to unpack: {str(e)}')


def prepare_split_list(num_thread):
    """
    split the list into multiple sub lists
    """
    # if the parallel is true, we will start a list of screens
    # each of the screen will include another run
    # make a tmp dir to store the 
    
    tmp_list_dir = "unpack_tmp_split_list"
    if os.path.exists(tmp_list_dir):
        os.system("rm -rf {}".format(tmp_list_dir))
    os.system("mkdir {}".format(tmp_list_dir))
    package_list = get_not_in_log()

    num_packages = len(package_list) 
    chunk_size = math.floor(num_packages / num_thread)
    sub_package_lists = [[] for i in range(num_thread)]
    file_pointer = 0
    # for package in package_list:
    #     sub_package_lists[file_pointer % num_thread].append(package)
    #     file_pointer += 1
    batch_size = (len(package_list) + num_thread - 1) // num_thread
    batched_package_list = [package_list[i:i+batch_size] for i in range(0, len(package_list), batch_size)]

    cnt = 0
    for sub_packages in batched_package_list:
        with open(os.path.join(tmp_list_dir, str(cnt)), 'w') as fp:
            json.dump(sub_packages, fp)
        cnt += 1
    

def get_not_in_log():
    with open(appid_file, 'r') as fp:
        package_names = json.load(fp)
    # not in log
    with open('unpack_with_unveil.log') as f:
        content = f.read()
        # Regular expression pattern to match and extract any string between the directory path and the .wxapkg extension
        pattern = r"/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w/([^\.]+)\.wxapkg"
        # Search for the pattern in the input string
        matches = re.findall(pattern, content)
        matches = set(matches)
    package_names = [i for i in package_names if i not in matches]
    # not unpacked
    package_names = [i for i in package_names if not os.path.exists(os.path.join(output_dir, i))]
    print(len(package_names))
    return package_names

def main():
    parser = argparse.ArgumentParser(
        description='Object graph generator for JavaScript.')
    parser.add_argument('--parallel', '-p',  type=int, help="run multiple package parallelly")
    parser.add_argument('--file', '-f',  help="unpack the ids in the file")
    
    args = parser.parse_args()
    
    if args.parallel is not None:
        num_thread = int(args.parallel)
        prepare_split_list(num_thread)
        
        for i in range(num_thread):
            cur_list_path = os.path.join("unpack_tmp_split_list", str(i))
            cur_cmd = f'activate; python unpack_unveil_pipeline.py -f {cur_list_path}'
            # screen -dmS my_session bash -c 'activate; python unpack_unveil_pipeline.py -f unpack_tmp_split_list/4'
            print(f"screen -dmS unpack_{i} bash -c '{cur_cmd}'")
            os.system(f"screen -dmS unpack_{i} bash -c '{cur_cmd}'")
    elif args.file is not None:
        with open(args.file) as f:
            package_names = json.load(f)
            handle_wxapkgs(package_names)
    else: 
        # it seems that the unpacking process can not be parallelized.....
        package_names = get_not_in_log()
        handle_wxapkgs(package_names)
    

if __name__ == '__main__':
    main()
    
    