import sys

def write_to_file(content, file_name):
    original_stdout = sys.stdout
    try:
    # Open the file in append mode ('a')
        with open(file_name, 'a') as file:
            sys.stdout = file
        # Write the content
            print(content)
            sys.stdout = original_stdout
    except FileNotFoundError:
    # If the file does not exist, create it and then append content
        with open(file_name, 'w') as file:
            sys.stdout = file
            print(content)
            sys.stdout = original_stdout
    except Exception as e:
        sys.stdout = original_stdout
        print("An error occurred:", e)