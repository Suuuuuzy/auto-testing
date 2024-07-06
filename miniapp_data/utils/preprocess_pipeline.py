import os, re, json
from tqdm import tqdm
import multiprocessing as mp
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


def preprocess_all():
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
    logger.info(f'Start preprocessing {len(files)} packages')    
    package_names = files
    processes = 128
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_packages, batched_package_names)

def proprocess_error():
    # logger.info('Started')
    ROOT = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    with open("check_logs/error_appids.txt") as f:
        files = json.load(f) 
    files = [os.path.join(ROOT, i) for i in files]  
    logger.info(f'Start preprocessing {len(files)} packages')    
    package_names = files
    processes = 128
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_packages, batched_package_names)
        
if __name__ == '__main__':
    proprocess_error()