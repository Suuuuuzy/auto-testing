import os
import re

MAGIC = "VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL"
input_string = """
catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            return h();
        }
"""

after = """
catch (t) {}
"""

def find_js_files(directory):
    js_files= []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                js_files.append(os.path.join(root, file))
    return js_files

def solve_fail_in_mini(miniprogram_path):
    js_files = find_js_files(miniprogram_path)
    for file in js_files:
        solve_fail(file)

def solve_fail(file_path):
    with open(file_path) as f:
        content = f.read()
    
    pattern = r'(catch\s*\([^)]*\)\s*{)[^}]*VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL[^}]*}'

    # Replace the catch block contents with blank
    output_string = re.sub(pattern, r'\1}', content, flags=re.DOTALL)

    # print(content)
    with open(file_path, "w") as f:
        f.write(output_string)

# Example usage
if __name__ == '__main__':
    WXML_FILE_PATH = '/Users/jianjia/Desktop/test.js'
    solve_fail(WXML_FILE_PATH)