import os
from tqdm import tqdm
import logging
logger = logging.getLogger(__name__)
from config import *
from miniapp_data.utils.preprocess import preprocess

logging.basicConfig(
    filename='preprocessing.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

if __name__ == '__main__':
    import platform
    if platform.system()=="Linux": #Linux
        ROOT = dataj_large_scale_wxapkg_unpacked_ROOT
    else:
        ROOT = mac_unpacked_wxapkg_ROOT

    # logger.info('Started')
    # ROOT_PATH = "/media/data4/jianjia_data4/miniapp_data/WeMinT_dataset/groundtruth/miniprograms"
    # MINIRPOGRAM_NAME = "wx4b7fbaa1c41967fe"
    files = os.listdir(ROOT)
    files = [i for i in files if not i.startswith('.')]
    if os.path.exists("preprocessing.log"):
        with open ("preprocessing.log")as f:
            c = f.read()
    files = [i for i in files if i not in c]   
    logger.info(f'Start preprocessing {len(files)} packages')     
    # files = ['wx940e8bc440dd2eb9', 'wx45cf09091aead547', 'wxad2e9789b5076244', 'wx8b0d722749666d1c', 'wx7dcf14c63c2e78da', 'wx93a380ad767c58ac', 'wx791f877ab36ea8b2', 'wxaf291362a455b5e1', 'wx7e20bfb214e0423f']
    for file in tqdm(files):
        preprocess(os.path.join(ROOT, file))
        logger.info(f'{file} preprocessing finished')
    # logger.info('Finished')