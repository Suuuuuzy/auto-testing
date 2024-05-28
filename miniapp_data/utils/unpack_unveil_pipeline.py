import os, subprocess
from tqdm import tqdm
from config import *
import logging
logger = logging.getLogger(__name__)

import platform
from pathlib import Path

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

def main():
    all_unpacked_packages= [i for i in os.listdir(large_scale_wxapkg_ROOT) if i.endswith("wxapkg")]
    logger.info("Total wxapkg number: "+ str(len(all_unpacked_packages)))
    
    unpacked = os.listdir(large_scale_wxapkg_unpacked_ROOT)
    all_unpacked_packages = [i for i in all_unpacked_packages if i.replace(".wxapkg", "") not in unpacked]
    
    unpacked = dataj_large_scale_wxapkg_unpacked_ROOT
    all_unpacked_packages = [i for i in all_unpacked_packages if i.replace(".wxapkg", "") not in unpacked]

    with open('unpack_with_unveil.log') as f:
        content = f.read()
    all_unpacked_packages = [i for i in all_unpacked_packages if i.replace(".wxapkg", "") not in content]
    logger.info("Unpacked: "+  str(len(all_unpacked_packages)))
    
    # all_unpacked_packages = all_unpacked_packages[:100]
    for package in tqdm(all_unpacked_packages):
        try:
            decompile_wxapkg_with_unveilr(os.path.join(large_scale_wxapkg_ROOT, package), os.path.join(dataj_large_scale_wxapkg_unpacked_ROOT, package.replace(".wxapkg", "")))
        except Exception as e:
            logger.error(f'package {package} encountering error when trying to unpack: {str(e)}')
            
if __name__ == '__main__':
    main()