import os
from tqdm import tqdm
import multiprocessing as mp
import logging
logger = logging.getLogger(__name__)
from preprocess import preprocess
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


if __name__ == '__main__':
    # logger.info('Started')
    ROOT = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    files = os.listdir(ROOT)
    files = [i for i in files if not i.startswith('.')]
    if os.path.exists(logfileName):
        with open (logfileName)as f:
            c = f.read()
    files = [os.path.join(ROOT, i) for i in files if i not in c]   
    logger.info(f'Start preprocessing {len(files)} packages')    
    package_names = files
    processes = 128
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_packages, batched_package_names)
        