import json

# Load JSON data from the file
with open('bundle_results/results.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Count the number of unique miniapps
unique_miniapps_count = len(data)

# Calculate the average score_times
filtered_score_times = [entry['score_times'] for entry in data.values() if entry['score_times']]
average_score_times = sum(filtered_score_times) / len(filtered_score_times)

# Define score_times ranges and initialize counters
score_times_distribution = {
    '0-100': 0,
    '100-1000': 0,
    '1000-10000': 0,
    '10000-100000': 0,
    '100000+': 0
}

# Categorize each miniapp's score_times into ranges
for entry in data.values():
    score_times = entry['score_times']
    if not score_times:
        continue
    if score_times < 100:
        score_times_distribution['0-100'] += 1
    elif 100 <= score_times < 1000:
        score_times_distribution['100-1000'] += 1
    elif 1000 <= score_times < 10000:
        score_times_distribution['1000-10000'] += 1
    elif 10000 <= score_times < 100000:
        score_times_distribution['10000-100000'] += 1
    else:
        score_times_distribution['100000+'] += 1

# Output the results
print(f"Number of unique miniapps: {unique_miniapps_count}")
print(f"Number of miniapps with scores: {len(filtered_score_times):,.2f}")
print(f"Average score_times: {average_score_times:,.2f}")
print("Distribution of score_times:")
for range_label, count in score_times_distribution.items():
    print(f"{range_label}: {count:,.2f}")



"""
Number of unique miniapps: 16631
Number of miniapps with scores: 9,374.00
Average score_times: 2,888.48
Distribution of score_times:
0-100: 5,281.00
100-1000: 2,506.00
1000-10000: 1,211.00
10000-100000: 328.00
100000+: 48.00
"""