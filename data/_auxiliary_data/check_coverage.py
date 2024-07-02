import json, os


if __name__ == '__main__':
    ROOT_DIR = '/home/bella-xia/auto-testing/data/_auxiliary_data/wx0bc8123197e70985/'
    FILE_VIA_ELEMENT_DIR = os.path.join(ROOT_DIR, 'wx0bc8123197e70985_via_element.json')
    FILE_VIA_FUNC_DIR = os.path.join(ROOT_DIR, 'wx0bc8123197e70985_via_func.json')
    
    with open(FILE_VIA_ELEMENT_DIR, 'r', encoding='utf-8') as file:
            json_data_via_element = json.loads(file.read())

    with open(FILE_VIA_FUNC_DIR, 'r', encoding='utf-8') as file:
            json_data_via_func = json.loads(file.read())


    for cat, list_of_element in json_data_via_func.items():
           print(f"{cat} category has {len(json_data_via_func[cat])} instances")
    print('')

    for cat, list_of_element in json_data_via_element.items():
           print(f"{cat} category has {len(json_data_via_element[cat])} instances")