import json, os, sys, subprocess, random

def write_to_file(content, file_name):
    original_stdout = sys.stdout
    try:
    # Open the file in append mode ('a')
        with open(file_name, 'a') as file:
            sys.stdout = file
        # Write the content
            print(content)
            sys.stdout = original_stdout
    except FileNotFoundError:
    # If the file does not exist, create it and then append content
        with open(file_name, 'w') as file:
            sys.stdout = file
            print(content)
            sys.stdout = original_stdout
    except Exception as e:
        sys.stdout = original_stdout
        print("An error occurred:", e)

def generate_config(input_data):
    config = {}
    for key, value in input_data.items():
        # Customize this based on your requirements
        config[key] = value
    with open('config.json', 'w') as config_file:
        json.dump(config, config_file)

def run_python_script(script_path):
    subprocess.run(['python3', script_path, '/home/bella-xia/auto-testing/auto_minium/test7_check_if_id_works/config.json'])

def main(inputs, script_path):
    for input_data in inputs:
        write_to_file(str(input_data + "\n"), 'test_result_log.txt')
        config_data = {  
            "project_path": os.path.join(project_path, input_data),
            "dev_tool_path": dev_tool_path}
        generate_config(config_data)
        run_python_script(script_path)

if __name__ == "__main__":
    project_path = "/home/bella-xia/auto-testing/data/groundtruth"
    dev_tool_path = "/home/bella-xia/wechat-web-devtools-linux/bin/wechat-devtools-cli"
    all_inputs = []
    all_project_lists = os.listdir(project_path)[49:50]
    # random.shuffle(all_project_lists)
    all_inputs = all_project_lists
    script_path = '/home/bella-xia/auto-testing/auto_minium/test7_check_if_id_works/main.py'  # Provide the path to your Python script
    main(all_inputs, script_path)
