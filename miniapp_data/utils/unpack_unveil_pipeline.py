import os, subprocess
from tqdm import tqdm
# from config import *
import logging
logger = logging.getLogger(__name__)
import json
import platform
from pathlib import Path
import multiprocessing as mp

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

def handle_wxapkgs(wxapkgs):
    wxapkg_paths = wxapkgs
    for i in wxapkg_paths:
        output_path = '/media/dataj/miniapp_data/wxapkgs-11w-unpacked-new/'+i
        wxapkg_path = "/media/dataj/miniapp_data/wxapkgs-11w/" + i + ".wxapkg"
        if os.path.exists(output_path):
            logger.info('Decompile Success: {}'.format(output_path))
        else:
            if os.path.exists(wxapkg_path):
                decompile_wxapkg_with_unveilr(wxapkg_path, output_path)
                
    # all_unpacked_packages= [i for i in os.listdir(large_scale_wxapkg_ROOT) if i.endswith("wxapkg")]
    # logger.info("Total wxapkg number: "+ str(len(all_unpacked_packages)))
    
    # unpacked = os.listdir(large_scale_wxapkg_unpacked_ROOT)
    # all_unpacked_packages = [i for i in all_unpacked_packages if i.replace(".wxapkg", "") not in unpacked]
    
    # unpacked = dataj_large_scale_wxapkg_unpacked_ROOT
    # all_unpacked_packages = [i for i in all_unpacked_packages if i.replace(".wxapkg", "") not in unpacked]

    # with open('unpack_with_unveil.log') as f:
    #     content = f.read()
    # all_unpacked_packages = [i for i in all_unpacked_packages if i.replace(".wxapkg", "") not in content]
    # logger.info("Unpacked: "+  str(len(all_unpacked_packages)))
    
    # # all_unpacked_packages = all_unpacked_packages[:100]
    # for package in tqdm(all_unpacked_packages):
    #     try:
    #         decompile_wxapkg_with_unveilr(os.path.join(large_scale_wxapkg_ROOT, package), os.path.join(dataj_large_scale_wxapkg_unpacked_ROOT, package.replace(".wxapkg", "")))
    #     except Exception as e:
    #         logger.error(f'package {package} encountering error when trying to unpack: {str(e)}')
            

def main():
    # with open('/media/dataj/miniapp_data/wxapkgs-11w.json', 'r') as fp:
    with open('/media/dataj/miniapp_data/test.json', 'r') as fp:
        package_names = json.load(fp)
    # processes = 128
    processes = 12
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_wxapkgs, batched_package_names)
    main()
    
if __name__ == '__main__':
    main()