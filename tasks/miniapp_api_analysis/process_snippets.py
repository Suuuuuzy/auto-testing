import json

# Input and output file names
file_name = "snippets.js.json"
output_file = "snippets_apis_try_catch.js"

# Load the JSON content
with open(file_name, 'r', encoding='utf-8') as f:
    content = json.load(f)

# Initialize counters and result set
cnt = 0
res = set()

# Process each snippet
for i in content:
    # Extract the API call and format it
    body = "".join(content[i]['body'])
    api_call = body.split('(')[0] + '()'  # Ensure it's a function call
    api_call = f"await {api_call}"  # Add 'await' prefix
    res.add(api_call)  # Add to the set to avoid duplicates

import re
with open('devtool_log.txt') as f:
    text = f.read()
    all_pattern = r'await (wx\.[a-zA-Z]+\(\))'
    all_matches = re.findall(all_pattern, text)
untested_res = []
for i in res:
    if i.replace("await ", "") not in all_matches:
        untested_res.append(i)
        


with open('from_wx_properties.json') as f:
    untested_res = json.load(f)
print("Untested APIs:", len(untested_res))

# Write the results to the output file with try-catch blocks
with open(output_file, 'w', encoding='utf-8') as f:
    initial = f"""
    onLoad: async function(){{
    """
    f.write(initial + '\n')  # Write the initial content
    for api_call in untested_res:
        # Generate the try-catch block for each API call
        try_catch_block = f"""
try {{
    await wx.{api_call}();
    console.log('Success:', '{api_call}');
}} catch (e) {{
    console.error('Error in {api_call}:', e);
}}
"""
        f.write(try_catch_block + '\n')  # Write to the file
    f.write("}," + '\n')  # Write to the file
# Print the total number of unique API calls processed
print(f"Total unique API calls processed: {len(untested_res)}")