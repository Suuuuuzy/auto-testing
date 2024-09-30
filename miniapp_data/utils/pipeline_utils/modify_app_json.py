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
        json.dump(json_data, file, indent=2)


def check_page(page_path):
    # COMP_SET = {".js", ".json", ".wxml", ".wxss"}
    COMP_SET = {".js", ".wxml"}
    for comp in COMP_SET:
        comp_dir = page_path+comp
        if (os.path.exists(comp_dir) == False):
            return False
    return True


def process_subpackage_info(app_json, root_dir):
    subpackage_data = app_json['subPackages']
    missing_subpackages = []
    for item in subpackage_data:
        if 'root' in item and 'pages' in item:
            if item['root'].startswith('/'):
                item['root'] = item['root'][1:]
            pages = item['pages']
            missing_pages = []
            for page in pages:
                if not check_page(os.path.join(root_dir, item['root'], page)):
                    missing_pages.append(page)
            item['pages'] = [i for i in item['pages'] if i not in missing_pages]
            if item['pages']==[]:
                # print(f'no pages in {item["name"]}') # name might not exist
                missing_subpackages.append(item)
        else:
            logger.error(f'root/pages not in subpackage in app.json in {root_dir}')
    
    app_json['subPackages'] = [i for i in subpackage_data if i not in missing_subpackages]
    if app_json['subPackages']==[]:
        del app_json['subPackages']
    # print(app_json)



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
            if isinstance(distance, str):
                if "px" in distance:
                    distance = distance.replace("px", "")
                if "r" in distance:
                    distance = distance.replace("r", "")
                try:
                    json_data['window']['onReachBottomDistance'] = int(distance)
                except:
                    json_data['window']['onReachBottomDistance'] = 50
        if "navigationBarTextStyle" in json_data['window']:
            color = json_data['window']['navigationBarTextStyle']
            if color not in ["black", "white"]:
                json_data['window']['navigationBarTextStyle'] = "white"
        if "backgroundTextStyle" in json_data['window']:
            color = json_data['window']['backgroundTextStyle']
            if color not in ["dark", "light"]:
                json_data['window']['backgroundTextStyle'] = "light"
        if "backgroundColor" in json_data['window']:
            color = json_data['window']['backgroundColor']
            if not color.startswith("#"):
                json_data['window']['backgroundColor'] = "#ffffff"

def check_attrs(json_data):
    if "navigationBarTextStyle" in json_data:
        color = json_data['navigationBarTextStyle']
        if color not in ["black", "white"]:
            json_data['navigationBarTextStyle'] = "white"
    if "backgroundTextStyle" in json_data:
        color = json_data['backgroundTextStyle']
        if color not in ["dark", "light"]:
            json_data['backgroundTextStyle'] = "light"
    if "backgroundColor" in json_data:
        color = json_data['backgroundColor']
        if not color.startswith("#"):
            json_data['backgroundColor'] = "#ffffff"

def check_components(root_path, json_data):
    if "usingComponents" in json_data:
        names = [i for i in json_data["usingComponents"]]
        for name in names:
            if not check_page(os.path.join(root_path, json_data["usingComponents"][name])):
                del json_data["usingComponents"][name]

def check_all_paths(MINIRPOGRAM_PATH, APP_JSON_PATH=None):
    
    if not APP_JSON_PATH:
        APP_JSON_PATH = os.path.join(MINIRPOGRAM_PATH, 'app.json')
    
    json_data = read_json_file(APP_JSON_PATH)
    if not json_data:
        return
    
    check_borderStyle(json_data)
    check_window_attrs(json_data)
    if 'subPackages' in json_data:
        process_subpackage_info(json_data, MINIRPOGRAM_PATH)
    if 'pages' in json_data:
        pages = json_data['pages']
        missing_pages = []
        for page in pages:
            if not check_page(os.path.join(MINIRPOGRAM_PATH, page)):
                missing_pages.append(page)
        json_data['pages'] = [i for i in pages if i not in missing_pages]
    if 'preloadRule' in json_data:
        pages = [i for i in json_data['preloadRule']]
        for page in pages:
            if not check_page(os.path.join(MINIRPOGRAM_PATH, page)):
                del json_data['preloadRule'][page]
    if 'plugins' in json_data:
        plugins = [i for i in json_data['plugins']]
        for itemkey in plugins:
            if 'provider' in json_data['plugins'][itemkey]:
                del json_data['plugins'][itemkey]
            

    
    write_json_file(APP_JSON_PATH, json_data)


if __name__ == "__main__":

    APP_JSON_PATH = '/Users/jianjia/WeChatProjects/wx916b5de2bad511d0-pc/app.json'
    MINIRPOGRAM_NAME = "/Users/jianjia/WeChatProjects/wx916b5de2bad511d0-pc"
    check_all_paths(MINIRPOGRAM_NAME, APP_JSON_PATH)
    