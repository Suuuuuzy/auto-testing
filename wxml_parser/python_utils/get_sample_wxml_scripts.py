import os, subprocess, random, json

ROOT_DIR = '/home/bella-xia/auto-testing/data/0_passing_groundtruth'
DEST_DIR = '/home/bella-xia/html_parser/sample_html_files'

def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        json_data = file.read()
    return json.loads(json_data)

def get_wxml_scripts(miniprogram_path):
    app_json_path = os.path.join(ROOT_DIR, miniprogram_path, 'app.json')
    json_data = read_json_file(app_json_path)
    wxml_script_list = json_data['pages']
    return wxml_script_list

def move_designate_wxml_script(miniprogram_path, script_relative_path):
    os.makedirs(os.path.join(DEST_DIR, miniprogram_path), exist_ok=True)
    subprocess.run(['cp', os.path.join(ROOT_DIR, miniprogram_path, script_relative_path), os.path.join(DEST_DIR, miniprogram_path)])

if __name__ == '__main__':
    all_miniprograms = os.listdir(ROOT_DIR)
    for miniprogram in all_miniprograms:
        wxml_list = get_wxml_scripts(miniprogram)
        first_file_idx = random.randint(0, len(wxml_list)-1)
        second_file_idx = random.randint(0, len(wxml_list)-1)
        print(f"with a total of {len(wxml_list)} files, index chosen are {first_file_idx} and {second_file_idx}")
        move_designate_wxml_script(miniprogram, wxml_list[first_file_idx] + '.wxml')
        move_designate_wxml_script(miniprogram, wxml_list[second_file_idx] + '.wxml')
