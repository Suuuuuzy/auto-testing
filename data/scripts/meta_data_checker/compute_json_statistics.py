import json

# Load JSON data from the file
with open('meta_data_output.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Count the number of unique miniapps
unique_miniapps_count = len(data)

# Calculate the average score_times
total_score_times = sum(entry['score_times'] for entry in data.values())
average_score_times = total_score_times / unique_miniapps_count

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
print("Number of unique miniapps: {}".format(unique_miniapps_count))
print("Average score_times: {:.2f}".format(average_score_times))
print("Distribution of score_times:")
for range_label, count in score_times_distribution.items():
    print("{}: {}".format(range_label, count))

