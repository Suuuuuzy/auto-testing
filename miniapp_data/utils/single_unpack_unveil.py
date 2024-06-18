import os, subprocess
from tqdm import tqdm
# from config import *
import logging
logger = logging.getLogger(__name__)
import json
import platform
from pathlib import Path
import sys

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
        logger.info(out)
        logger.info('Decompile Success: {}'.format(wxapkg))
        return True
    except Exception as e:
        logger.error(e)
        return False

    
if __name__ == '__main__':
    wxapkg_path = sys.argv[1]
    # output_path = wxapkg_path.replace(".wxapkg", "")
    output_path = sys.argv[2]
    decompile_wxapkg_with_unveilr(wxapkg_path, output_path)