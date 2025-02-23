import re

with open('devtool_log.txt') as f:
    text = f.read()

fail_pattern = r'Error in await (wx\.[a-zA-Z]+\(\)): \{errMsg: "([^"]+)"\}'

# Regular expression pattern to match success API calls
success_pattern = r'Success: await (wx\.[a-zA-Z]+\(\))'

# Find fail API calls and error messages
fail_matches = re.findall(fail_pattern, text)

# Find success API calls
success_matches = re.findall(success_pattern, text)

# Print results
print("Fail APIs and Error Messages:")
for api, error_msg in fail_matches:
    print(f"API: {api}, Error Message: {error_msg}")

print("\nSuccess APIs:")
for api in success_matches:
    print(f"API: {api}")

