import os
import re

MAGIC = "VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL"
input_string = """
catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            wx.showToast({
                title: e + "请重新提交",
                icon: none
            });
        }
catch (e) {}
    catch (t) {}
catch (s) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            
        }
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

    # pattern = r'(catch\s*\([^)]*\)\s*{)[^}]*VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL[^}]*}'

    # # Replace the catch block contents with blank
    # output_string = re.sub(pattern, r'\1}', input_string, flags=re.DOTALL)

    # print(output_string)
    # with open(file_path, "w") as f:
    #     f.write(output_string)

def find_and_replace_catch_blocks(input_string):
    # Pattern to match the beginning of a catch block
    pattern = r'catch\s*\([^)]*\)\s*{'
    matches = list(re.finditer(pattern, input_string))

    if not matches:
        return input_string
    
    output_string = []
    last_end = 0

    for match in matches:
        start_index = match.end()
        brace_count = 1
        end_index = start_index

        # Use a stack to find the matching closing brace
        while brace_count > 0 and end_index < len(input_string):
            if input_string[end_index] == '{':
                brace_count += 1
            elif input_string[end_index] == '}':
                brace_count -= 1
            end_index += 1
        
        catch_block = input_string[match.start():end_index]
        
        if "VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL" in catch_block:
            output_string.append(input_string[last_end:match.start()])
            output_string.append('catch (e) {}')
            last_end = end_index
    
    output_string.append(input_string[last_end:])
    return ''.join(output_string)

def solve_fail(file_path):
    with open(file_path) as f:
        content = f.read()
    # Find and replace the catch blocks
    output_string = find_and_replace_catch_blocks(content)

    # print(output_string)
    with open(file_path, "w") as f:
        f.write(output_string)

# Example usage
if __name__ == '__main__':
    WXML_FILE_PATH = '/Users/jianjia/Desktop/test.js'
    solve_fail(WXML_FILE_PATH)