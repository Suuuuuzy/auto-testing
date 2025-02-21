import json
from collections import defaultdict

flow_file = "inputs/zero_day_flow.json"
with open(flow_file) as f:
    content = json.load(f)

# Create a dictionary to store the count of items for each miniappid
distribution = defaultdict(int)

# Count the number of items for each miniappid
for miniappid, items in content.items():
    distribution[miniappid] = len(items)

# import numpy as np
# import matplotlib.pyplot as plt

# # Extract and sort the counts
# counts = sorted(distribution.values())

# # Compute CDF values
# cdf = np.arange(1, len(counts) + 1) / len(counts)

# # Plot the CDF
# plt.figure(figsize=(8, 5))
# plt.plot(counts, cdf, marker="o", linestyle="-", color="b", label="CDF")
# plt.xlabel("Number of Items per MiniAppID")
# plt.ylabel("Cumulative Probability")
# plt.title("Cumulative Distribution Function (CDF) of MiniApp Items")
# plt.grid(True)
# plt.legend()

# # Save the CDF plot
# output_cdf_img = "miniapp_cdf.png"
# plt.savefig(output_cdf_img, dpi=300)

# print(f"Saved CDF graph as {output_cdf_img}")


# Define the ranges
ranges = [
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 10),
    (10, 20),
    (20, 30),
    (30, 40),
    (40, 50),
    (50, float('inf'))  # Use infinity for the upper bound of the last range
]

# Create a dictionary to store the count of miniappids in each range
range_counts = defaultdict(int)

# Categorize the miniappids into ranges
for miniappid, count in distribution.items():
    for range_start, range_end in ranges:
        # if count > 50:
        #     print('>50', count, miniappid)
        if range_start <= count < range_end:
            range_counts[f"{range_start}-{range_end}"] += 1
            break

print(len(content))

# Sort the range_counts by numerical order
sorted_ranges = sorted(range_counts.keys(), key=lambda x: float(x.split("-")[0]))

# Print the ordered range counts
print("Categorized distribution of miniappids:")
for range_label in sorted_ranges:
    count = range_counts[range_label]
    percentage = count / len(distribution) * 100
    print(f"{range_label}: {count} miniappids, {percentage:.2f}%")
"""
459
Categorized distribution of miniappids:
1-2: 119 miniappids, 25.93%
2-3: 75 miniappids, 16.34%
3-4: 36 miniappids, 7.84%
4-10: 117 miniappids, 25.49%
10-20: 74 miniappids, 16.12%
20-30: 15 miniappids, 3.27%
30-40: 11 miniappids, 2.40%
40-50: 11 miniappids, 2.40%
50-inf: 1 miniappids, 0.22%
"""


