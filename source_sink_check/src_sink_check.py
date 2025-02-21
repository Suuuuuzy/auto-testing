import os
import re
import json
import logging

LOG_NAME = 'results/api_usage.log'
RESULT_NAME = 'results/api_usage.json'
OUTPUT_MD = 'results/api_usage.md'
API_FILE = 'inputs/config.json'
EVALUATION_FILE = 'inputs/evaluation_10k.txt'

# Set up logging
logging.basicConfig(
    filename=LOG_NAME,  # Log file name
    level=logging.INFO,        # Log level
    format='%(asctime)s - %(message)s'  # Log format
)

# Function to update the JSON file
def update_json_file(results, filename=RESULT_NAME):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=4)

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
    print(f"Found {len(checked_dirs)} directories that have already been checked.")
    return list(checked_dirs)  # Convert the set to a list

def gen_md(results, checked_count):
        # Calculate the rate of miniappids for each API
    table_data = []
    for api in results:
        miniappids_count = len(results[api]["miniappids"])
        if checked_count > 0:
            rate = 100.0 * miniappids_count / checked_count
        else:
            rate = 0.0
        table_data.append((api, miniappids_count, f"{rate:.2f} %"))

    # Calculate the total number of unique mini-apps across all APIs
    all_miniappids = set()
    for api in results:
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

    with open(OUTPUT_MD, "w") as f:
        f.write(markdown_table)
        
def initialize_results(apis, checked_count):
    """
    Initialize or load results from the JSON file, calculate the rate of miniappids for each API,
    and output the results in Markdown table format.
    """
    if os.path.exists(RESULT_NAME):
        with open(RESULT_NAME, 'r', encoding='utf-8') as f:
            results = json.load(f)
    else:
        results = {api: {"num": 0, "miniappids": []} for api in apis}

    gen_md(results, checked_count)
    return results

def main():
    # Get directories that have already been checked
    checked_dirs = get_checked_directories()

    with open(API_FILE) as f:
        content = json.load(f)
        apis = content['sources'] + content['sinks']
        apis = [i.replace('wx.', '') for i in apis]
    print(apis)
    # Read the list of mini-app directories from the file
    with open(EVALUATION_FILE) as f:
        mini_app_dirs = [line.strip() for line in f.readlines()]  
    results = initialize_results(apis, len(checked_dirs))

    # Scan each mini-app directory
    for mini_app_dir in mini_app_dirs:
        if mini_app_dir in checked_dirs:
            continue  # Skip this directory
        appid = mini_app_dir.split('/')[-1]  # Extract the appid from the directory path
        logging.info(f"Scanning directory: {mini_app_dir}")
        # Walk through the directory
        for root, _, files in os.walk(mini_app_dir):
            for file in files:
                # Check if the file is a JavaScript file
                if file.endswith(".js"):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            content = f.read()
                            # Check for each API in the file
                            for api in apis:
                                api_reg = api+'('
                                if re.search(re.escape(api_reg), content):
                                    # Update the results
                                    if appid not in results[api]["miniappids"]:
                                        results[api]["miniappids"].append(appid)
                                        results[api]["num"] += 1
                                    # Log the result immediately
                                    logging.info(f"API: {api} is used in appid: {appid} (file: {file_path})")
                    except Exception as e:
                        logging.error(f"Error reading file {file_path}: {e}")
        
        # Update the JSON file after checking each directory
        update_json_file(results)
        # logging.info(f"Updated JSON file after scanning directory: {mini_app_dir}")

    print("Scanning complete. Results logged in 'api_usage.log' and saved in 'api_usage.json'.")

if __name__ == "__main__":
    main()