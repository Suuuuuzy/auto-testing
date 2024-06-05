import re, os

def find_and_format_wxml_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.wxml'):
                file_path = (os.path.join(root, file))
                format_wxml_style_attribute(file_path)
                # wxml_files.append(os.path.join(root, file))
    # return wxml_files

def format_wxml_style_attribute(file_path):
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Define a regular expression pattern to match the style attribute
        pattern = r'style="([\s\S]*?)"'

        # Find all matches of the pattern in the content
        matches = re.findall(pattern, content)

        # Replace each match with the desired format
        for match in matches:
            formatted_match = match.replace('\n', ' ').replace('\t', ' ').replace(' ', '')
            content = content.replace(f'style="{match}"', f'style="{formatted_match}"')

        # Input string
        # input_string = 'wx:key="{{index}}"'
        # output_string = 'wx:key="index"'

        # Regular expression pattern to match wx:key="{{index}}"
        pattern = r'wx:key="\{\{(.*)\}\}"'
        
        # Replace the matched pattern with wx:key="index"
        content = re.sub(pattern, r'wx:key="\1"', content)

        # Regular expression to match the pattern and remove unnecessary line breaks and spaces
        pattern = r"'\s*(.*?)\s*'"
        replacement = "'" + r'\1' + "'"

        # Perform the substitution
        content = re.sub(pattern, replacement, content)
        
        pattern = r'(<[^>]*?)\s*(>)'

        # Replacement string
        replacement = r'\1\2'

        # Perform the substitution
        content = re.sub(pattern, replacement, content)

        # <view class="box-center-des">{{'分享好友
        #       领取'+(list.share||0)+'元券(满'+(list.share_full||0)+'立减)'}}</view>        
        def remove_line_breaks_inside_quotes(match):
            return re.sub(r"'[^']*'", lambda m: m.group(0).replace('\n', '').replace(' ', ''), match.group(0))

        # Regular expression to find the {{}} blocks
        content = re.sub(r"{{[^{}]*}}", remove_line_breaks_inside_quotes, content)
        
        # Write the modified content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)

        # print(f"Style attributes for page {file_path} formatted successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
if __name__ == '__main__':
    WXML_FILE_PATH = '/Users/jianjia/WeChatProjects/wxa1dcf85f43ea3263-pc/make_speed/other/activity/activity.wxml'
    format_wxml_style_attribute(WXML_FILE_PATH)