import os, re, json
from tqdm import tqdm
import multiprocessing as mp
import argparse
import logging
logger = logging.getLogger(__name__)
from single_preprocess import preprocess
logfileName = 'wxapkgs-42w-unpacked-preprocessing.log'
logging.basicConfig(
    filename= logfileName,
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

def handle_packages(pkgs):
    for pkg in tqdm(pkgs):
        preprocess(pkg)

def get_42w_not_preprocessed_appid():
    # logger.info('Started')
    ROOT = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    files = os.listdir(ROOT)
    files = [i for i in files if not i.startswith('.')]
    if os.path.exists(logfileName):
        with open(logfileName) as f:
            content = f.read()
            # Define the regular expression pattern
            pattern = r'wx[a-zA-Z0-9]{16}-pc'
            # Find all matches in the sample text
            matches = re.findall(pattern, content)
            matches = set(matches)
    files = [os.path.join(ROOT, i) for i in files if i not in matches]   
    return files

def get_error_ids():
     # logger.info('Started')
    ROOT = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    with open("../appid_file/42w_large_scale_error_appids.json") as f:
        files = json.load(f) 
    files = [os.path.join(ROOT, i) for i in files]  
    return files

def get_cmrf_fp_appid():
    ROOT = "/media/dataj/miniapp_data/CMRF_groundtruth/fp_dataset_unpack"
    files = os.listdir(ROOT)
    files = [os.path.join(ROOT, i) for i in files]  
    return files

def run_pkgs_in_parallel(package_names):
    logger.info(f'Start preprocessing {len(package_names)} packages')    
    processes = 10
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_packages, batched_package_names)

def main():
    parser = argparse.ArgumentParser(
    description='preprocess of miniapp packages.')
    parser.add_argument('--error',  action='store_true',  help="preprocess the errors")
    parser.add_argument('--cmrf_fp', action='store_true',  help="preprocess cmrf_fp")
    parser.add_argument('--file', '-f',  help="preprocess the ids in the file")
    
    args = parser.parse_args()
    if args.error:
        pkgs = get_error_ids()
    elif args.cmrf_fp:
        pkgs = get_cmrf_fp_appid()
    elif args.file is not None:
        with open(args.file) as f:
            content = json.load(f)
        project_path = content["unpackpath"]
        pkgs = content["pkgs"]
        pkgs = [os.path.join(project_path, i) for i in pkgs]
    else:
        pkgs = get_42w_not_preprocessed_appid()
    # pkgs = pkgs[:300]
    run_pkgs_in_parallel(pkgs)
        
        
    
if __name__ == '__main__':
    main()