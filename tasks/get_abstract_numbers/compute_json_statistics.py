import json

# Load JSON data from the file
with open('/media/dataj/wechat-devtools-linux/testing/auto-testing/scripts/meta_data_checker/bundle_results/results.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# calculate the number for 12009 dataset
meta_file = "/media/dataj/wechat-devtools-linux/testing/auto-testing/tasks/get_abstract_numbers/unpacked_in_meta.txt"
with open(meta_file, "r") as f:
    meta = f.readlines()
meta = [i.strip() for i in meta]
meta = [i.replace("/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack/", "") for i in meta]
print(f"unpacked and in meta: {len(meta)}") # 12009

data = {i: data[i] for i in meta if i in data}

# Count the number of unique miniapps
unique_miniapps_count = len(data)

# Calculate the average score_times
filtered_score_times = [entry['score_times'] for entry in data.values() if entry['score_times']]
average_score_times = sum(filtered_score_times) / len(filtered_score_times)

# Define score_times ranges and initialize counters
score_times_distribution = {
    'null': 0,
    '0-100': 0,
    '100-1000': 0,
    '1000-10000': 0,
    '10000+': 0,
    '10000-100000': 0,
    '100000+': 0
}

# Categorize each miniapp's score_times into ranges
for entry in data.values():
    score_times = entry['score_times']
    if not score_times:
        score_times_distribution['null'] += 1
    elif score_times < 100:
        score_times_distribution['0-100'] += 1
    elif 100 <= score_times < 1000:
        score_times_distribution['100-1000'] += 1
    elif 1000 <= score_times < 10000:
        score_times_distribution['1000-10000'] += 1
    # elif 10000 <= score_times < 100000:
    #     score_times_distribution['10000-100000'] += 1
    else:
        score_times_distribution['10000+'] += 1

# Output the results
print(f"Number of unique miniapps: {unique_miniapps_count}")
print(f"Number of miniapps with scores: {len(filtered_score_times):,.2f}")
print(f"Average score_times: {average_score_times:,.2f}")
print("Distribution of score_times:")
for range_label, count in score_times_distribution.items():
    print(f"{range_label}: {count:,.2f}")


"""
unpacked and in meta: 12009
Number of unique miniapps: 12009
Number of miniapps with scores: 6,431.00
Average score_times: 2,388.49
Distribution of score_times:
null: 5,578.00
0-100: 3,592.00
100-1000: 1,854.00
1000-10000: 764.00
10000-100000: 194.00
100000+: 27.00
"""