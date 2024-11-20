import re
import json
import codecs

# Define the nested_pattern to extract key-value pairs and handle nested structures
nested_pattern = re.compile(r"(\w+)=((?:Bundle\[\{.*?\}\]|{.*?})|\".*?\"|[^,]+)", re.UNICODE)

counter_skipped_no_appid = 0
counter_skipped_only_default_appid = 0

# Function to parse each content
def parse_each_content(content):
    # Initialize an empty dictionary to store the JSON object
    result = {}

    # Use the provided regular expression pattern
    pattern = re.compile(
        r'(?:\\"|")weappUrl(?:\\"|"):(?:\\"|")[^\"]*?id=(wx(?!82e6ae1175f264fa)[a-z0-9]{16})[^\"]*?(?:\\"|").*?(?:\\"|")score(?:\\"|"):(?:\\"|")([0-9.]+)(?:\\"|").*?(?:\\"|")score_times(?:\\"|"):([0-9]+).*?(?:\\"|")style(?:\\"|"):\d*?,(?:\\"|")title(?:\\"|"):(?:\\"|")(.*?)(?:\\"|")(?:,|})',
        re.DOTALL
    )

    # Search for matches in the content
    for match in pattern.finditer(content):
        app_id, score, score_times, title = match.groups()
        
        adjusted_title = re.sub(r'$', '', title, flags=re.MULTILINE)
        adjusted_title = re.sub(r'^', '', adjusted_title, flags=re.MULTILINE)
        adjusted_title = adjusted_title.replace('<em class=\\"highlight\\">', '')
        adjusted_title = adjusted_title.replace('<em class="highlight">', '')
        adjusted_title = adjusted_title.replace('<em class=\\\\"highlight\\\\">', '')
        adjusted_title = adjusted_title.replace('</em>', '')

        # Add the app_id with score, score_times, and title to the result
        result[app_id] = {
            "score": float(score),
            "score_times": int(score_times),
            "title": adjusted_title
        }
        
    another_pattern = re.compile(
        r'jumpInfo(?:\\"|"):{(?:\\"|")appID(?:\\"|"):(?:\\"|")(wx(?!82e6ae1175f264fa)[a-z0-9]{16})[^\"]*?(?:\\"|").*?(?:\\"|")score(?:\\"|"):(?:\\"|")([0-9.]+)(?:\\"|").*?(?:\\"|")score_times(?:\\"|"):([0-9]+).*?(?:\\"|")style(?:\\"|"):\d*?,(?:\\"|")title(?:\\"|"):(?:\\"|")(.*?)(?:\\"|")(?:,|})',
        re.DOTALL
    )
    
    for match in another_pattern.finditer(content):
        app_id, score, score_times, title = match.groups()
        
        adjusted_title = re.sub(r'\\n', '', title, flags=re.MULTILINE)
        adjusted_title = re.sub(r'$', '', title, flags=re.MULTILINE)
        adjusted_title = re.sub(r'^', '', adjusted_title, flags=re.MULTILINE)
        adjusted_title = adjusted_title.replace('<em class=\\"highlight\\">', '')
        adjusted_title = adjusted_title.replace('<em class="highlight">', '')
        adjusted_title = adjusted_title.replace('<em class=\\\\"highlight\\\\">', '')
        adjusted_title = adjusted_title.replace('</em>', '')

        # Add the app_id with score, score_times, and title to the result
        result[app_id] = {
            "score": float(score),
            "score_times": int(score_times),
            "title": adjusted_title
        }

    return result


# Function to find_appId for each_value
def find_appId(each_value):
    global counter_skipped_no_appid, counter_skipped_only_default_appid
    appId_list = re.findall(r"wx[a-z0-9]{16}", each_value, re.DOTALL)
    if not appId_list:
        counter_skipped_no_appid += 1
        return None
    elif all(id == "wx82e6ae1175f264fa" for id in appId_list): 
        # "wx82e6ae1175f264fa" is a common id that should be excluded
        counter_skipped_only_default_appid += 1
        return None
    else:
        return [id for id in appId_list if id != "wx82e6ae1175f264fa"]


# Function to process the entire file at once
def process_file():
    BEGIN_CONST = "HomeWebViewUI: "
    json_output = []
    
    # Step 1: Read all lines with "HomeWebViewUI: "
    extracted_content = []
    with codecs.open("/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/logs/meta_data.txt", "r", encoding="utf-8", errors="ignore") as file:
        for line in file:
            # Extract the content following "HomeWebViewUI: "
            if BEGIN_CONST in line:
                extracted_content.append(line[line.find(BEGIN_CONST):].replace(BEGIN_CONST, ''))
    
    # Step 2: Concatenate all extracted parts into a single string
    concatenated_content = ''.join(extracted_content)
    
    # Step 3: Extract all `arg:1:Bundle[{...}]` entries
    raw_entries = re.findall(r"arg:1:Bundle\[\{(.*?)\}\]:-:class android\.os\.Bundle", concatenated_content, re.DOTALL)
    
    # # Step 4: Assign AppId to each raw_entry
    # entry_with_appId = {}
    # for each in raw_entries:
    #     find_result = find_appId(each)
    #     if not find_result:
    #         continue
    #     for each_id in find_result:
    #         entry_with_appId[each_id] = each
    
    # Step 5: Parse the concatenated entries
    json_output = {}
    for each in raw_entries:
        new_entries = parse_each_content(each)
        
        conflicting_keys = json_output.keys() & new_entries.keys()
        if conflicting_keys:
            for key in conflicting_keys:
                if json_output[key] != new_entries[key]:
                    print("Conflict appId: ", key, ", Current Value in json_output: {", json_output[key], ", New Value: ", new_entries[key])
        
        json_output = {**json_output, **new_entries}

    # Save the JSON output to a file
    with open("meta_data_output.json", "w", encoding="utf-8") as json_file:
        json.dump(json_output, json_file, ensure_ascii=False, indent=4)

    print("JSON output successfully saved to json_output.json.")

# Run the function
process_file()

