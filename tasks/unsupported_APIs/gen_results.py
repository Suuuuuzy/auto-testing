OUTPUT_DIR = "results"
LOG_NAME = f'{OUTPUT_DIR}/api_usage.log'
RESULT_NAME = f'{OUTPUT_DIR}/api_usage.json'
OUTPUT_MD = f'{OUTPUT_DIR}/api_usage.md'
UNSUPPORTED_API_FILE = 'inputs/unsupported_API.txt'
SUPPORTED_API_FILE = 'inputs/supported_API.txt'
EVALUATION_FILE = 'inputs/evaluation_10k.txt'

import os
import re
import json
import logging

def get_checked_directories(log_file=LOG_NAME):
    """
    Extract the directories that have already been checked from the log file.
    """
    checked_dirs = set()  # Use a set to avoid duplicates

    # Regular expression to match lines containing "Scanning directory:"
    pattern = re.compile(r'Scanning directory: (.+)$')

    # Read the log file
    with open(log_file, 'r', encoding='utf-8') as f:
        for line in f:
            match = pattern.search(line)
            if match:
                checked_dirs.add(match.group(1))  # Add the directory to the set
    with open(EVALUATION_FILE) as f:
        mini_app_dirs = [line.strip() for line in f.readlines()]
    checked_dirs = set(checked_dirs) & set(mini_app_dirs)
    print(f"Found {len(checked_dirs)} directories that have already been checked.")
    return list(checked_dirs)  # Convert the set to a list

def gen_results(apis, checked_count):
    """
    Initialize or load results from the JSON file, calculate the rate of miniappids for each API,
    and output the results in Markdown table format.
    """
    if os.path.exists(RESULT_NAME):
        with open(RESULT_NAME, 'r', encoding='utf-8') as f:
            results = json.load(f)
            # Ensure "files" key exists for each API
            for api in results:
                if "files" not in results[api]:
                    results[api]["files"] = []
    else:
        # Initialize results if the file doesn't exist
        print('no results!')

    # Calculate the rate of miniappids for each API
    table_data = []
    for api in apis:
        miniappids_count = len(results[api]["miniappids"])
        if checked_count > 0:
            rate = 100.0 * miniappids_count / checked_count
        else:
            rate = 0.0
        table_data.append((api, miniappids_count, f"{rate:.2f} %"))

    # Calculate the total number of unique mini-apps across all APIs
    all_miniappids = set()
    for api in apis:
        all_miniappids.update(results[api]["miniappids"])
    total_miniappids = len(all_miniappids)
    total_rate = 100.0 * total_miniappids / checked_count if checked_count > 0 else 0.0

    # Generate Markdown table
    markdown_table = f"This is the result for {checked_count} miniapps\n"
    markdown_table += "| API | Mini-App Count | Usage Rate |\n"
    markdown_table += "|-----|----------------|------------|\n"
    for api, count, rate in table_data:
        markdown_table += f"| {api} | {count} | {rate} |\n"
    markdown_table += f"| **Total** | **{total_miniappids}** | **{total_rate:.2f} %** |\n"
    print(markdown_table)
    with open(OUTPUT_MD, "w") as f:
        f.write(markdown_table)


def main():
    # Get directories that have already been checked
    checked_dirs = get_checked_directories()
    
    # Read the list of APIs from the file
    with open(UNSUPPORTED_API_FILE) as f:
        apis = [line.strip() for line in f.readlines()]  

    with open(SUPPORTED_API_FILE) as f:
        su_apis = [line.strip() for line in f.readlines()]  
    apis = [i for i in apis if i not in su_apis]
    print(apis)
    
    # Read the list of mini-app directories from the file
    with open(EVALUATION_FILE) as f:
        mini_app_dirs = [line.strip() for line in f.readlines()]  
    gen_results(apis, len(checked_dirs))
    
    
if __name__ == "__main__":
    main()