import re
import json
import codecs

# Define the pattern to extract the content from each line
pattern = re.compile(r"(\w+)=((?:Bundle\[\{.*?\}\]|{.*?})|\".*?\"|[^,]+)", re.UNICODE)

# Function to recursively parse entries into a dictionary
def parse_bundle_content(content):
    # Initialize an empty dictionary to store the JSON object
    result = {}
    
    # Start parsing the content
    position = 0
    while position < len(content):
        # Search for a key-value pair based on the pattern
        match = pattern.search(content, pos=position)
        if not match:
            break  # No more matches found, exit loop
        
        key, value = match.groups()
        
        # Move the position past this match
        position = match.end() + 1  # Move to the end of this match, plus one for comma

        # Check if value is a nested Bundle
        if value.startswith("Bundle[{") and value.endswith("}]"):
            # Remove outer Bundle[...] and recursively parse the inner content
            nested_content = value[8:-2]
            result[key] = parse_bundle_content(nested_content)
        elif value.startswith("{") and value.endswith("}"):
            # If it's just a nested dictionary without "Bundle[...]", parse similarly
            nested_content = value[1:-1]
            result[key] = parse_bundle_content(nested_content)
        else:
            # Handle regular values, removing any surrounding quotes if present
            result[key] = value.strip('"')

    return result

# Extract all content between the specified patterns
def process_file():
    json_output = []
    with codecs.open("../../newcrawl/logs/meta_data.txt", "r", encoding="utf-8", errors="ignore") as file:
        for line_number, line in enumerate(file, start=1):
            # Print line number for tracking
            print("Processing line {}".format(line_number))

            # Check if the line matches our extraction criteria
            match = re.search(r".*?HomeWebViewUI: (.*)", line)
            if match:
                # Concatenate and extract relevant part
                extracted_content = match.group(1)
                
                # Find all content between the patterns in the extracted content
                raw_entries = re.findall(r"arg:1:Bundle\[\{(.*?)\}\]:-:class android.os.Bundle", extracted_content)
                
                # Process each extracted entry
                for entry in raw_entries:
                    parsed_entry = parse_bundle_content(entry)
                    json_output.append(parsed_entry)

    # Save the JSON output to a file
    with open("json_output.json", "w", encoding="utf-8") as json_file:
        json.dump(json_output, json_file, ensure_ascii=False, indent=4)

    print("JSON output successfully saved to json_output.json.")

# Run the function
process_file()

