import re, os
import jsbeautifier

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
        pattern = r'wx:key=([\'\"])\{\{([^\}]*)\}\}([\'\"])'
        # Replace the matched pattern with wx:key="index"
        content = re.sub(pattern, r'wx:key=\1\2\3', content)

        # Regular expression to match the pattern and remove unnecessary line breaks, do not remove spaces!
        pattern = r"'\n*(.*?)\n*'"
        replacement = "'" + r'\1' + "'"
        # Perform the substitution
        content = re.sub(pattern, replacement, content)
        # content = re.sub(r"(?<=')[^']*(?=')", lambda m: m.group(0).replace('\n', ''), content)
        
        pattern = r'(<[^>]*?)\s*(>)'
        # Replacement string
        replacement = r'\1\2'
        # Perform the substitution
        content = re.sub(pattern, replacement, content)

        # <view class="box-center-des">{{'分享好友
        #       领取'+(list.share||0)+'元券(满'+(list.share_full||0)+'立减)'}}</view>        
        def remove_line_breaks_inside_quotes(match):
            pattern = r'\n[\s]+'
            res = re.sub(pattern, r'', match.group(0))
            return res

        # Regular expression to find the {{}} blocks
        content = re.sub(r"{{[^{}]*}}", remove_line_breaks_inside_quotes, content)
        
        wxs_regex = re.compile(r'(<wxs[^>]*>)([\s\S]*?)<\/wxs>')
        # Function to beautify JavaScript code inside <wxs> tags
        def beautify_wxs_content(content):
            def beautify_js(match):
                # Extract JavaScript code from the match group
                prefix = match.group(1)
                js_code = match.group(2)
                # print(js_code)
                # Beautify the JavaScript code
                beautified_code = jsbeautifier.beautify(js_code)
                # Return the beautified code wrapped in the <wxs> tags
                return f'{prefix}{beautified_code}</wxs>'

            # Replace and beautify the content inside <wxs> tags
            output_text = wxs_regex.sub(beautify_js, content)
            return output_text

        # Apply the beautification process
        content = beautify_wxs_content(content)

        # Print the beautified output
        # print(content)
        # Write the modified content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)

        # print(f"Style attributes for page {file_path} formatted successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
if __name__ == '__main__':
    WXML_FILE_PATH = 'test.wxml'
    format_wxml_style_attribute(WXML_FILE_PATH)