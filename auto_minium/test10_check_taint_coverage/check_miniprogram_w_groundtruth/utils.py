import json, csv

def read_json_file(file_path):
    """
    Reads a JSON file and returns the parsed data.
    
    Parameters:
    - file_path: str, path to the JSON file.
    
    Returns:
    - data: dict or list, the parsed JSON data.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Error: The file {file_path} does not exist.")
    except json.JSONDecodeError:
        print(f"Error: The file {file_path} is not a valid JSON file.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


def dump_to_csv(data, csv_file_path):
    """
    Dumps an array of dictionaries into a CSV file.
    
    Parameters:
    - data: list of dict, the data to write to the CSV file.
    - csv_file_path: str, the path to the CSV file.
    """
    if not data:
        print("Error: The data is empty.")
        return
    
    # Extract the field names (CSV headers) from the keys of the first dictionary
    fieldnames = data[0].keys()
    
    try:
        with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(data)
        print(f"Data successfully written to {csv_file_path}")
    except Exception as e:
        print(f"An error occurred while writing to the CSV file: {e}")


def dump_to_json(data, json_file_path):
    """
    Dumps an array of dictionaries into a JSON file.
    
    Parameters:
    - data: list of dict, the data to write to the JSON file.
    - json_file_path: str, the path to the JSON file.
    """
    try:
        with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
            json.dump(data, jsonfile, ensure_ascii=False, indent=4)
        print(f"Data successfully written to {json_file_path}")
    except Exception as e:
        print(f"An error occurred while writing to the JSON file: {e}")

