import re
import json
import codecs
import logging

logging.basicConfig(
    level=logging.DEBUG,  # Set the logging level
    format='%(asctime)s - %(levelname)s - %(message)s',  # Format includes time
    datefmt='%Y-%m-%d %H:%M:%S',  # Timestamp format
    filename='app.log',  # Log file name
    filemode='w'  # Overwrite the log file on each run (use 'a' to append)
)

counter_skipped_no_appid = 0
counter_skipped_only_default_appid = 0


# META_LOG = "first_100_lines.txt"
# META_LOG = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/logs/meta_data.txt"
META_LOG = "reduced_meta_data.txt"


def get_info_from_meta_json(a):
    result = {}
    try:
        datas = a["data"]
        if not datas:
            return result
        for data in datas:
            if "subBoxes" not in data:
                continue
            subBoxes = data["subBoxes"]
            for box in subBoxes:
                data = box["items"][0]
                appID = data["jumpInfo"].get("appID")
                appVersion = data["jumpInfo"].get("appVersion")
                title = data.get("title")
                source_title = data.get("source").get("title")
                score = None
                score_times = None
                if "serviceComment" in data:
                    score = data["serviceComment"]["comment"].get("score")
                    score_times = data["serviceComment"]["comment"].get("score_times")
                    if not appID:
                        weappUrl = data["serviceComment"]["comment"]["jumpInfo"].get("weappUrl")
                        if weappUrl:
                            appID = re.findall(r"wx[a-z0-9]{16}", weappUrl, re.DOTALL)
                            if len(appID)>0:
                                appID = appID[0]
                            else:
                                continue
                desc = data.get("desc")
                result[appID] = {
                    "title": title,
                    "source_title": source_title,
                    "appVersion": appVersion,
                    "score": score,
                    "score_times": score_times,
                    "desc": desc
                }
    except Exception as e:
        logging.error(f"Error: {e}")
        logging.error(json.dumps(a))
    return result
        

# Function to process the entire file at once
def process_file():
    BEGIN_CONST = "HomeWebViewUI: "
    DISCARD_CONST = "beforeHookedMethod"
    json_output = []
    
    # Step 1: Read all lines with "HomeWebViewUI: "
    extracted_content = []
    para = []
    with codecs.open(META_LOG, "r", encoding="utf-8", errors="ignore") as file:
        for line in file:
            if DISCARD_CONST in line:
                continue
            if BEGIN_CONST in line:
                last_index = line.rfind(BEGIN_CONST)
                if last_index != -1:
                    add_string = line[last_index:].replace(BEGIN_CONST, '')
                    extracted_content.append(add_string)
                    if add_string.startswith("arg:1:Bundle[{"):
                        add_string = add_string.strip()
                        para.append(add_string)
                    elif add_string.startswith("arg:"):
                        continue
                    elif add_string.startswith("sb.length"):
                        if len(para)>0:
                            para[-1] += "\n" + add_string
                    else:
                        add_string = add_string.strip()
                        if len(para)>0:
                            para[-1] += add_string
    
    # Step 2: Concatenate all extracted parts into a single string
    concatenated_content = '\n'.join(para)
        
    cleaned_text = re.sub(r'<em class="highlight">(.*?)</em>', r'\1', concatenated_content)
    cleaned_text = re.sub(r'<em class=\\\"highlight\\\">(.*?)</em>', r'\1', cleaned_text)
    cleaned_text = re.sub(r'<emclass=\\\"highlight\\\">(.*?)</em>', r'\1', cleaned_text)
    
    with open("intermediate.txt", "w") as f:
        f.write(cleaned_text)
        
    # Find the specific bundle
    bundle_matches = re.findall(r'fts_key_json_data=(.*?), fts_key_new_query=', cleaned_text)
    bundle_results = {}
    result = {}
    if bundle_matches:
        for idx, match in enumerate(bundle_matches, start=1):
            bundle_content = match
            a = None
            try:
                a = json.loads(bundle_content)
            except Exception as e:
                logging.error("json.loads Error: "+ str(e))
                logging.error(bundle_content)
            if a:
                if "query" in a:
                    bundle_results[idx] = a
                    new_result = get_info_from_meta_json(a)
                    result.update(new_result)
    else:
        print("No Bundle found.")
    
    with open(f"bundle_results/results.json", "w") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    with open(f"bundle_results/results_inter.json", "w") as f:
        json.dump(bundle_results, f, ensure_ascii=False, indent=2)


# Run the function
process_file()

#  
# grep -C 5 "wxa6d40a50372562bc" /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/logs/meta_data.txt
# head -n 100 /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/logs/meta_data.txt > first_100_lines.txt
# head -n 10000 /media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/logs/meta_data.txt > first_100_lines.txt
#  tail -n 100 app.log > first_100_lines.txt

