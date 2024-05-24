import os, subprocess
from utils import read_json_file

def check_all(expected_arr, actual_arr):
    correct_arr = []
    missing_arr = []
    for miniprogram in expected_arr:
        if miniprogram in actual_arr:
            correct_arr.append(miniprogram)
        else:
            missing_arr.append(miniprogram)
    
    return correct_arr, missing_arr


def get_json_data(json_path):
    json_data = read_json_file(json_path)
    json_program_names = [json_instance['MiniApp'] for json_instance in json_data]
    return json_program_names

def move_file(root_dir, new_dir, file_name):
    """
    Moves a file from root_dir to new_dir.
    
    Parameters:
    - root_dir: str, the directory from which the file is moved.
    - new_dir: str, the directory to which the file is moved.
    - file_name: str, the name of the file to be moved.
    """
    src_path = os.path.join(root_dir, file_name)
    dest_path = os.path.join(new_dir, file_name)

    if not os.path.exists(src_path):
        print(f"File {src_path} does not exist.")
        return

    os.makedirs(new_dir, exist_ok=True)
    
    try:
        subprocess.run(['mv', src_path, dest_path], check=True)
        print(f"Moved {src_path} to {dest_path}.")
    except subprocess.CalledProcessError as e:
        print(f"Error moving file {file_name}: {e}")


if __name__ == '__main__':
    actual_arr = get_json_data('/home/bella-xia/auto-testing/data/auxiliary_data/all_res_rev.json')
    expected_arr = os.listdir('/home/bella-xia/auto-testing/data/groundtruth')
    correct_arr, missing_arr = check_all(expected_arr=expected_arr, actual_arr=actual_arr)
    print(f"there are {len(correct_arr)} miniprograms with query data and {len(missing_arr)} missing ones")
    print(missing_arr)
    for missing_program in missing_arr:
        move_file('/home/bella-xia/auto-testing/data/groundtruth', 
                  '/home/bella-xia/auto-testing/data/unused_groundtruth', missing_program)
