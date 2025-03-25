import os, csv, random, json
unpack_path = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"

def get_meta_ids(id_file):
    # Read the total number of test appids
    with open(id_file, "r") as f:
        ids = f.readlines()
    ids = [i.replace(unpack_path+"/", "") for i in ids]
    ids = [i.strip() for i in ids]
    # print(ids[:10])
    return ids

def get_taintmini_res(files, output_dir, ids, output=False):
    # List all files in the output directory (excluding bench.csv files)

    # Initialize results list and counter
    results = []
    flow_cnt = 0
    file_cnt = 0
    detected = []
    headers = ""
    miniapp_paths = []
    # Process each file
    for file in files:
        appid = file.replace("-result.csv", "")
        if appid not in ids:
            continue
        file_cnt+=1
        file_path = os.path.join(output_dir, file)
        su = False
        if os.path.isfile(file_path):
            with open(file_path, "r") as f:
                reader = csv.reader(f, delimiter="|")
                headers = next(reader)  # Read the header row
                for row in reader:
                    if not row:
                        continue
                    row = [cell.strip() for cell in row]
                    miniapp_path = os.path.join(unpack_path, appid)
                    if miniapp_path not in miniapp_paths:
                        miniapp_paths.append(miniapp_path)
                    row.insert(0, miniapp_path)
                    row.insert(0, appid)
                    row.append(0)
                    if row not in results:
                        results.append(row)
                        flow_cnt += 1
                        su = True
        if su:
            detected.append(file)
    if output:
        print("Num of successfully run appids:", file_cnt)
        print("Num of detected appids:", len(detected))
        print(f"Percentage of reported appids out of all tested: {100.0 * len(detected) / len(ids):.2f}%")
        print(f"Percentage of reported appids out of all successfully run: {100.0 * len(detected) / file_cnt:.2f}%")
        print("Total num of flows:", flow_cnt)
    return detected, file_cnt, flow_cnt, results, headers, miniapp_paths

# Generate the new CSV file
def generate_csv(summary_csv, results, headers):
    # Add "File Name" to the headers
    headers = ["App ID"] + ["File Name"] + headers + ["TP"]
    
    # Open the CSV file for writing
    with open(summary_csv, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file, delimiter="|")
        # Write headers
        writer.writerow(headers)
        # Write data rows
        writer.writerows(results)

def cmp_minnie(detected):
    
    detected = [i.replace("-result.csv", "") for i in detected]
    # print(detected[:10])
    detected = set(detected)
    
    file_cnt = 0
    flow_cnt = 0
    
    # get minnie flows
    flow_file = "../zero_day/input/zero_day_flow_546.json"
    
    with open(flow_file, "r") as f:
        flow = json.load(f)
    for i in detected:
        if i in flow:
            file_cnt += 1
            flow_cnt += len(flow[i])
    print("Num of Minnie detected appids:", file_cnt)
    print(f"Num of flows by Minnie: {flow_cnt}")
    
def main():
    
    id_file = "../get_abstract_numbers/unpacked_in_meta.txt"
    ids = get_meta_ids(id_file)
    # Print summary statistics
    print("Num of total test appids:", len(ids))
    
    output_dir = "/media/dataj/wechat-devtools-linux/prework/TaintMini/tasks/evaluation_14k/evaluation_14k_results"
    
    # =============== sample begin ===============
    sample_csv = "output/taintmini_sample_100.csv"  # New CSV file for summary
    files = random.sample(ids, 100)
    summary_list = "output/taintmini_sample_list_100.txt"  # New CSV file for summary
    with open(summary_list, "w") as f:
        for i in files:
            f.write(unpack_path + "/" + i + "\n")
    # test the result on Minnie:
    
    files = [i+"-result.csv" for i in files]
    detected, file_cnt, flow_cnt, results, headers, miniapp_paths = get_taintmini_res(files, output_dir, ids, True)
    headers = ["page_name", "page_method", "ident", "source", "sink"]
    generate_csv(sample_csv, results, headers)
    # =============== sample end ===============

    cmp_minnie(detected)
    
    
if __name__ == "__main__":
    main()

