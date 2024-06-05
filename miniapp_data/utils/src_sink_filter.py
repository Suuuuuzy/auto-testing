import os
from tqdm import tqdm
import multiprocessing as mp
import json

taintmini_sources = ['getStorageSync', 
                    'getStorage', 
                    'getUserInfo', 
                    'getUserProfile', 
                    'getLocation', 
                    'onLocationChange', 
                    'startLocationUpdate', 
                    'startLocationUpdateBackground', 
                    'getNetworkType', 
                    'createCameraContext', 
                    'getBLEDeviceCharacteristics', 
                    'getConnectedWifi', 
                    'chooseVideo', 
                    'chooseMedia', 
                    'getFileInfo', 
                    'startRecord', 
                    'chooseAddress', 
                    'getWeRunData', 
                    'chooseInvoiceTitle', 
                    'chooseInvoice', 
                    'chooseContact']

taintmini_sinks = ['request', 
                    'uploadFile', 
                    'navigateToMiniProgram', 
                    'sendSocketMessage', 
                    'createUDPSocket'
                    ]




def find_js_files(wxapkgs):
    result = {}
    for directory in wxapkgs:
        appid = directory.split('/')[-1]
        result[appid] = {}
        # print(directory)
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.js'):
                    js_file_path = (os.path.join(root, file))
                    with open(js_file_path) as f:
                        js_content = f.read()
                        for src in taintmini_sources:
                            if src in js_content:
                                if src not in result[appid]:
                                    result[appid][src] =  [js_file_path]
                                else:
                                    result[appid][src].append(js_file_path)   
                        for sink in taintmini_sinks:
                            if sink in js_content:
                                if sink not in result[appid]:
                                    result[appid][sink] =  [js_file_path]
                                else:
                                    result[appid][sink].append(js_file_path)
        # {"api1":[pages], "api2":[pages]}
        result[appid]["path"] = directory
    return result

# filtered = {"appid":{"path":"", "api1":[pages], "api2":[pages]}}

def main():
    unpacked_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    filter_json = "src_sink/taintmini_src_sink_filtered.json"

    if os.path.exists(filter_json):
        with open(filter_json) as f:
            filtered = json.load(f)  
    else:
        filtered = {}
    
    package_names = os.listdir(unpacked_path)
    package_names = [i for i in package_names if i not in filtered]
    package_names = [os.path.join(unpacked_path, i) for i in package_names]
    package_names = package_names[:1000]
    # processes = 128
    processes = 12
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        result = pool.map(find_js_files, batched_package_names)
    print(len(result))
    # prtin(result[1])
    for i in result:
        filtered.update(i)
    with open(filter_json, "w") as f:
        json.dump(filtered, f, indent=2)
    


if __name__ == "__main__":
    main()