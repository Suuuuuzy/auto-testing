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
from utils import *
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA1
from Crypto.Cipher import AES
import shutil
from check_logs.get_unpack_fail_ids import get_from_log, get_id_set_from_42w_file

logging.basicConfig(
    filename='unpack_with_unveil.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)


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
        cmdline = [decompiler_tool, wxapkg, '-o', output_path, '-f', '--clear-output']
    else:
        cmdline = [decompiler_tool, wxapkg, '-f', '--clear-output']
    try:
        out = subprocess.check_output(cmdline)
        # logger.info(out)
        logger.info('Decompile Success: {}'.format(wxapkg))
    except Exception as e:
        logger.error(e)

def decompile_with_self_built_unveilr(wxapkg, output_path=None):
    node_tool = 'node'
    decompiler_tool = '/media/data4/jianjia_data4/miniapp_data/unpack/unveilr/bin/index.js'
    if output_path is not None:
        cmdline = [node_tool, decompiler_tool, wxapkg, '-o', output_path, '-f', '--clear-output']
    else:
        cmdline = [decompiler_tool, wxapkg, '-f', '--clear-output']
    # print(cmdline)
    try:
        out = subprocess.check_output(cmdline)
        # logger.info(out)
        logger.info('Decompile Success: {}'.format(wxapkg))
    except Exception as e:
        logger.error(e)

# Decompile with wxappUnpacker
# 微信小程序包 自定义标识
WXAPKG_FLAG = 'V1MMWX'
WXAPKG_FLAG_LEN = len(WXAPKG_FLAG)
WXAPPUNPACKER_PATH = os.path.dirname(os.path.abspath(__file__)) + '/wxappUnpacker'
UNPACK_COMMAND = 'node ' + WXAPPUNPACKER_PATH + os.sep + '/wuWxapkg.js {}'


def decompile_wxapkg_with_wxUnpacker(package_path):
    success_flg = True
    command = UNPACK_COMMAND.format(package_path)
    execute_flg, execute_result = execute_cmd(command)
    # 执行出错，那么检查出错是不是解密造成的，如果是，就再一次解密，然后重新做一次反编译
    if execute_flg is False:
        if "Magic number is not correct" in execute_result:
            logger.error("{} decompile fail, need decrypt".format(package_path))
            match = re.search("(wx[a-z0-9A-Z]{16})", package_path)
            if match:
                # 小程序的文件名中有小程序的ID，才能进行解密
                decrypt_flg = decrypt_app(package_path, match.group(0))
                if decrypt_flg:
                    logger.info("{} decrypt success".format(package_path))
                    # 如果解密成功,再试一次反编译
                    re_execute_flg, re_execute_result = execute_cmd(command)
                    if re_execute_flg is False:
                        logger.error("{} failed to recompile after decryption".format(package_path))
                    return re_execute_flg
                else:
                    logger.info("{} decrypt fail".format(package_path))
                    return False
            # 遍历完出错结果也没有找到是解密造成的，那就是错了。
            success_flg = False
            logger.error("{} decompile fail".format(package_path))
        else:
            logger.error(execute_result)
            success_flg = False
    else:
        logger.info("{} decrypt success".format(package_path))
    return success_flg

def decrypt_app(app_name, appid):
    return decrypt(appid, app_name, app_name)


def decrypt(wxid, input_file, output_file):
    return decrypt_by_salt_and_iv(wxid, input_file, output_file, 'saltiest', 'the iv: 16 bytes')


def decrypt_by_salt_and_iv(wxid, input_file, output_file, salt, iv):
    try:
        key = PBKDF2(wxid.strip().encode('utf-8'), salt.encode('utf-8'), 32, count=1000, hmac_hash_module=SHA1)
        # 读取加密的内容
        if not os.path.exists(input_file):
            logger.error("{} is not exist", input_file)
            return False
        with open(input_file, mode='rb') as f:
            data_byte = f.read()
        if data_byte[0:WXAPKG_FLAG_LEN].decode("utf-8") != WXAPKG_FLAG:
            logger.info(f'{input_file} The file does not need to be decrypted, or it is not a wxapkg encryption package')
            return False
        # 初始化密钥
        cipher = AES.new(key, AES.MODE_CBC, iv.encode('utf-8'))
        # 解密头部1024个字节
        origin_data = cipher.decrypt(data_byte[WXAPKG_FLAG_LEN: 1024 + WXAPKG_FLAG_LEN])
        # 初始化xor密钥, 解密剩余字节
        xor_key = 0x66
        if len(wxid) >= 2:
            xor_key = ord(wxid[len(wxid) - 2])
        af_data = data_byte[1024 + WXAPKG_FLAG_LEN:]
        out = bytearray()
        for i in range(len(af_data)):
            out.append(af_data[i] ^ xor_key)
        origin_data = origin_data[0:1023] + out
        # 保存解密后的数据
        with open(output_file, mode='wb') as f:
            f.write(origin_data)
        return True
    except Exception as e:
        logger.error(e)
        return False
    

def handle_wxapkgs(package_names, input_dir, output_dir, unpacker = None):
    all_unpacked_packages= package_names
    print("To be unpacked: "+  str(len(all_unpacked_packages)))
    logger.info("To be unpacked: "+  str(len(all_unpacked_packages)))

    for package in tqdm(all_unpacked_packages):
        if not os.path.exists(os.path.join(output_dir, package)):
            # try:
            if unpacker=="self_built_unveilr":
                decompile_with_self_built_unveilr(os.path.join(input_dir, package+".wxapkg"), os.path.join(output_dir, package))
            elif unpacker=="wxUnpacker":
                res = decompile_wxapkg_with_wxUnpacker(os.path.join(input_dir, package+".wxapkg"))
                if res:
                    if os.path.exists(os.path.join(input_dir, package)):
                        shutil.move(os.path.join(input_dir, package), os.path.join(output_dir, package))
                        print(f'{package} unpack and move sucess')
                else:
                    print(f'{package} unpack failed')
            else: # default
                decompile_wxapkg_with_unveilr(os.path.join(input_dir, package+".wxapkg"), os.path.join(output_dir, package))
            # except Exception as e:
            #     logger.error(f'package {package} encountering error when trying to unpack: {str(e)}')


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
    
    batch_size = (len(package_list) + num_thread - 1) // num_thread
    batched_package_list = [package_list[i:i+batch_size] for i in range(0, len(package_list), batch_size)]

    cnt = 0
    for sub_packages in batched_package_list:
        with open(os.path.join(tmp_list_dir, str(cnt)), 'w') as fp:
            json.dump(sub_packages, fp)
        cnt += 1
    

def get_42w_not_in_log(output_dir):
    log_matches = get_from_log('unpack_with_unveil.log')
    log_matches = log_matches.union(get_from_log('unpack_with_unveil_test.log'))    
    log_matches = get_id_set_from_42w_file()-log_matches
    
    print(len(log_matches))
    return log_matches

def main():
    parser = argparse.ArgumentParser(
        description='Unpacking of miniapps')
    parser.add_argument('--parallel', '-p',  type=int, help="run multiple package parallelly")
    parser.add_argument('--file', '-f',  help="unpack the ids in the file")
    parser.add_argument('--single', '-s', help="unpack a single file")
    parser.add_argument('--output', '-o', help="unpack a single file, the output dir")
    parser.add_argument('--cmrf_fp', action='store_true',  help="unpack the ids in for cmrf fp")
    parser.add_argument('--cmrf_fn', action='store_true',  help="unpack the ids in for cmrf fn")
    # decide what program we use to unpack
    parser.add_argument('--self_built_unveilr', action='store_true',  help="unpack with self-built unveilr") 
    parser.add_argument('--wxUnpacker', action='store_true',  help="unpack with wxUnpacker") 
    args = parser.parse_args()
    
    if args.file is not None:
        with open(args.file) as f:
            content = json.load(f)
        input_dir = content["pkgpath"]
        output_dir = content["unpackpath"]
        package_names = content["pkgs"]
        # unpacked = os.listdir(output_dir)
        # package_names = [i for i in package_names if i not in unpacked]
    elif args.cmrf_fp:
        output_dir = "/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset_unpack"
        input_dir = "/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset"
        package_names = os.listdir(input_dir)
        package_names = [i for i in package_names if i.endswith(".wxapkg")]
        package_names = [i.replace(".wxapkg", "") for i in package_names]
        unpacked = os.listdir(output_dir)
        package_names = [i for i in package_names if i not in unpacked]
    elif args.cmrf_fn:
        output_dir = "/media/dataj/miniapp_data/CMRF_groundtruth/fn_dataset_unpack"
        input_dir = "/media/dataj/miniapp_data/CMRF_groundtruth/fn_dataset"
        package_names = os.listdir(input_dir)
        package_names = [i for i in package_names if i.endswith(".wxapkg")]
        package_names = [i.replace(".wxapkg", "") for i in package_names]
        unpacked = os.listdir(output_dir)
        package_names = [i for i in package_names if i not in unpacked]
    elif args.single:
        # args.single: /media/dataj/miniapp_data/wxapkgs-11w/wx507477e9caef7015-pc.wxapkg
        # input_dir: /media/dataj/miniapp_data/wxapkgs-11w/
        # output_dir: /media/dataj/miniapp_data/wxapkgs-11w/
        # intput: /media/data4/jianjia_data4/miniapp_data/wxapkgs-42w
        # output_dir: /media/dataj/miniapp_data/wxapkgs-42w-unpacked
        package_names = [args.single.split("/")[-1]]
        input_dir = args.single.replace(package_names[0], "")
        package_names[0] = package_names[0].replace(".wxapkg", "")
        output_dir = args.output
        if not args.output:
            output_dir = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    else: 
        output_dir = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked/"
        input_dir = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w/"
        # it seems that the unpacking process can not be parallelized.....
        package_names = get_42w_not_in_log(output_dir)
    
    if args.self_built_unveilr: # self_built_unveilr
        handle_wxapkgs(package_names, input_dir, output_dir, "self_built_unveilr")
    elif args.wxUnpacker: # wxUnpacker
        handle_wxapkgs(package_names, input_dir, output_dir, "wxUnpacker")
    else: # default: unveilr
        handle_wxapkgs(package_names, input_dir, output_dir)

    # if args.parallel is not None:
    #     # Decode wxapkgs with multiprocess
    #     processes = 128
    #     batch_size = (len(package_names) + processes - 1) // processes
    #     batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    #     with mp.Pool(processes=processes) as pool:
    #         pool.map(handle_wxapkgs, batched_package_names)

def handle_wxapkgs_with_wxUnpacker(pkgs):
    input_dir = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w"
    output_dir = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    for package in pkgs:
        res = decompile_wxapkg_with_wxUnpacker(os.path.join(input_dir, package+".wxapkg"))
        if res:
            if os.path.exists(os.path.join(input_dir, package)):
                if os.path.exists(os.path.join(output_dir, package)):
                    shutil.rmtree(os.path.join(output_dir, package), ignore_errors=True)
                shutil.move(os.path.join(input_dir, package), os.path.join(output_dir, package))
                logger.info(f'{package} unpack and move sucess')
                
def unpack_failed_with_wxUnpacker():
    jsonfile = "../appid_file/unpack_failed.json"
    with open(jsonfile) as f:
            content = json.load(f)
    package_names = content["pkgs"]
    
    processes = 64
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_wxapkgs_with_wxUnpacker, batched_package_names)
    
    
                        
if __name__ == '__main__':
    main()
# unpack_failed_with_wxUnpacker()

def clean_input_dir(packages):
    input_dir = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w"
    output_dir = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    
    pattern = r"(wx[a-zA-Z0-9]{16}-pc)"    
    cnt = 0
    for package in tqdm(packages):
        if os.path.isdir(os.path.join(input_dir, package)):
            log_matches = re.findall(pattern, package)
            if len(log_matches) > 0:
                print('move 1')
                cnt += 1
                if os.path.exists(os.path.join(output_dir, package)):
                    shutil.rmtree(os.path.join(output_dir, package), ignore_errors=True)
                shutil.move(os.path.join(input_dir, package), os.path.join(output_dir, package))
    print(cnt)

def clean_input_dir_in_batch():
    input_dir = "/media/data4/jianjia_data4/miniapp_data/wxapkgs-42w"
    package_names = os.listdir(input_dir)
    
    processes = 64
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(clean_input_dir, batched_package_names)