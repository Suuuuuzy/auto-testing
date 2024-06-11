import os, json
import logging
logger = logging.getLogger(__name__)

def read_json_file(file_path):
    """
    Reads a JSON file and returns the parsed data.
    
    Parameters:
    - file_path: str, path to the JSON file.
    
    Returns:
    - data: dict or list, the parsed JSON data.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        logger.error(f"Error: The file {file_path} does not exist.")
    except json.JSONDecodeError:
        logger.error(f"Error: The file {file_path} is not a valid JSON file.")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        
def write_json_file(file_path, json_data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(json_data, file, indent=4)

def check_dirs(root_addr, dir_list):
    COMP_SET = {".js", ".json", ".wxml", ".wxss"}
    exist_list = []
    missing_list = []

    for dir_name in dir_list:
        exist_bool = True
        for comp in COMP_SET:
            comp_dir = os.path.join(root_addr, (dir_name + comp))
            normalized_path = os.path.normpath(comp_dir)
            if (os.path.exists(normalized_path) == False):
                missing_list.append(dir_name)
                exist_bool = False
                break
        if exist_bool:
            exist_list.append(dir_name)
    
    return {'exist': exist_list, 'miss': missing_list}


        
def process_subpackage_info(subpackage_data, root_dir):
    all_subpackage_pages_dir = []
    for item in subpackage_data:
        if 'root' in item and 'page' in item:
            root_dir = item['root']
            pages_dir = item['pages']
            all_subpackage_pages_dir.extend([os.path.join(root_dir, page_dir) for page_dir in pages_dir])
        else:
            logger.error(f'Key not in subpackage in app.json in {root_dir}')
    return check_dirs(root_dir, all_subpackage_pages_dir)

def process_page_info(pages_data, root_dir):
    all_pages_dir = []
    all_plugins_dir = []
    for page_data in pages_data:
        if page_data.split('/')[0] == '__plugin__':
            all_plugins_dir.append(page_data)
        else:
            all_pages_dir.append(page_data)
    return check_dirs(root_dir, all_pages_dir), check_dirs(root_dir, all_plugins_dir)

def check_borderStyle(json_data):
    if 'tabBar' in json_data:
        if "borderStyle" in json_data['tabBar']:
            color_str = json_data['tabBar']['borderStyle']
            if color_str not in ["black", "white"]:
                json_data['tabBar']['borderStyle'] = 'white'

def check_window_attrs(json_data):
    if "window" in json_data:
        if "onReachBottomDistance" in json_data['window']:
            distance = json_data['window']['onReachBottomDistance']
            distance = distance.replace("px", "")
            json_data['window']['onReachBottomDistance'] = int(distance)
        if "navigationBarTextStyle" in json_data['window']:
            color = json_data['window']['navigationBarTextStyle']
            if color not in ["black", "white"]:
                json_data['window']['navigationBarTextStyle'] = "white"
        if "backgroundTextStyle" in json_data['window']:
            color = json_data['window']['backgroundTextStyle']
            if color not in ["dark", "light"]:
                json_data['window']['backgroundTextStyle'] = "light"
            

def check_attrs(json_data):
    if "navigationBarTextStyle" in json_data:
        color = json_data['navigationBarTextStyle']
        if color not in ["black", "white"]:
            json_data['navigationBarTextStyle'] = "white"
    if "backgroundTextStyle" in json_data:
        color = json_data['backgroundTextStyle']
        if color not in ["dark", "light"]:
            json_data['backgroundTextStyle'] = "light"

def check_all_paths(MINIRPOGRAM_PATH, app_json_path=None):
    APP_JSON_PATH = os.path.join(MINIRPOGRAM_PATH, 'app.json')
    
    json_data = read_json_file(APP_JSON_PATH)
    if not json_data:
        return
    
    check_borderStyle(json_data)
    check_window_attrs(json_data)
    
    all_subpackage_pages = process_subpackage_info(json_data['subPackages'], MINIRPOGRAM_PATH ) if json_data.get('subPackages') is not None else {'exist': [], 'miss': []}
    all_pages, all_plugins= process_page_info(json_data['pages'], MINIRPOGRAM_PATH )

    logger.info(f"In total, there are {len(all_pages['exist'])} complete pages and {len(all_pages['miss'])} missing pages")
    logger.info(f"there are {len(all_plugins['exist'])} complete plugin pages and {len(all_plugins['miss'])} missing plugin pages")
    logger.info(f"In total, there are {len(all_plugins['exist'])} complete sub-pages and {len(all_plugins['miss'])} missing sub-pages")
    if len(all_plugins['exist']) == 0:
        json_data.pop('plugins', None)

    missed_page = all_pages['miss']
    missed_page.extend(all_plugins['miss'])
    missed_subpackges = all_subpackage_pages['miss']
    modified_pages = []

    for page in json_data['pages']:
        if page not in missed_page:
            modified_pages.append(page)
    
    if modified_pages ==[]:
        logger.info(f'Miniapp {MINIRPOGRAM_PATH} has no page after preprocessing')
    json_data['pages'] = modified_pages
    
    if len(all_subpackage_pages['exist'])== 0:
        json_data.pop('subPackages', None)
    else:
        temp_arr = []
        for root in json_data['pages']:
            root_dir = root['root']
            page_dirs = root['pages']
            temp_list = []
            for page in page_dirs:
                print(os.path.join(root_dir, page))
            
                if os.path.join(root_dir, page) not in missed_subpackges:
                    temp_list.append(page)
            temp_arr.append({'root': root, 'pages': temp_list})
        json_data['subPackages'] = temp_arr
    
    write_json_file(APP_JSON_PATH, json_data)


if __name__ == "__main__":

    ROOT_PATH = "C:/Users/zhiha/OneDrive/Desktop/miniapp_data/unpacked_data_unveilr"
    APP_JSON_PATH = 'C:/Users/zhiha/OneDrive/Desktop/miniapp_data/utils/app-mod.json'
    MINIRPOGRAM_NAME = "wx00bed543a3e9e5f7-pc"
    check_all_paths(ROOT_PATH, MINIRPOGRAM_NAME, APP_JSON_PATH)
    