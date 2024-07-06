# this script checks the log after decoding
# logpath: /home/suzy/temp/decoded_new_taint_log_file/

import re, os, json
from tqdm import tqdm

import logging
logger = logging.getLogger(__name__)

logging.basicConfig(
    filename='decoded_check.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

sources = []
sinks = ["sensWechatApi"]

source_sink_pairs = [
    "sensWechatApi": "navigate",
    "onLaunch": "all",
    
]



class CAPNPParser:
    def __init__(self, json_string):
        self.json_string = json_string
        self.index = 0

    def parse(self):
        values = []
        value = self._parse_value()
        # print(self.index)
        self._skip_whitespace()
        if value:
            values.append(value)
        while self.index != len(self.json_string):
            value = self._parse_value()
            if value:
                values.append(value)
        if self.index != len(self.json_string):
            raise ValueError("Unexpected data after JSON value")
        return values

    def _parse_value(self):
        self._skip_whitespace()
        if self.index >= len(self.json_string):
            # print(self.index)
            # print(len(self.json_string))
            return None
            # raise ValueError("Unexpected end of JSON input")
        
        char = self.json_string[self.index]
        
        if char == '"':
            return self._parse_string()
        elif char == '(':
            return self._parse_object()
        elif char == '[':
            return self._parse_array()
        # elif char == 't':
        #     return self._parse_literal('true', True)
        # elif char == 'f':
            # return self._parse_literal('false', False)
        # elif char == 'n':
        #     return self._parse_literal('none', False)
        # elif char == 'n':
        #     return self._parse_literal('null', None)
        elif char == '-' or char.isdigit():
            return self._parse_number()
        else:
            return self._parse_key()
            # raise ValueError(f"Unexpected character: {char}")

    def _parse_object(self):
        obj = {}
        self.index += 1  # Skip '('
        self._skip_whitespace()
        
        if self.json_string[self.index] == ')':
            self.index += 1  # Skip ')'
            return obj
        
        while True:
            self._skip_whitespace()
            key = self._parse_key()
            key = key.strip()
            self._skip_whitespace()
            if self.json_string[self.index] != '=':
                raise ValueError("Expected '=' after key in object")
            self.index += 1  # Skip '='
            self._skip_whitespace()
            obj[key] = self._parse_value()
            self._skip_whitespace()
            if self.json_string[self.index] == ')':
                self.index += 1  # Skip ')'
                break
            elif self.json_string[self.index] != ',':
                raise ValueError("Expected ',' or ')' in object")
            self.index += 1  # Skip ','
        return obj
    
    def _parse_key(self):
        start_index = self.index
        while self.index < len(self.json_string):
            char = self.json_string[self.index]
            if char in ['=', ',' ,')']:
                result = self.json_string[start_index:self.index]
                # self.index += 1  # Skip closing '"'
                return result
            elif char == '\\':
                self.index += 2  # Skip escaped character
            else:
                self.index += 1
        raise ValueError("Unterminated key")
    
    def _parse_array(self):
        array = []
        self.index += 1  # Skip '['
        self._skip_whitespace()
        
        if self.json_string[self.index] == ']':
            self.index += 1  # Skip ']'
            return array
        
        while True:
            self._skip_whitespace()
            array.append(self._parse_value())
            self._skip_whitespace()
            if self.json_string[self.index] == ']':
                self.index += 1  # Skip ']'
                break
            elif self.json_string[self.index] != ',':
                raise ValueError("Expected ',' or ']' in array")
            self.index += 1  # Skip ','
        
        return array

    def _parse_string(self):
        self.index += 1  # Skip initial '"'
        start_index = self.index
        while self.index < len(self.json_string):
            char = self.json_string[self.index]
            if char == '"':
                result = self.json_string[start_index:self.index]
                self.index += 1  # Skip closing '"'
                return result
            elif char == '\\':
                self.index += 2  # Skip escaped character
            else:
                self.index += 1
        raise ValueError("Unterminated string")

    def _parse_literal(self, literal, value):
        if self.json_string[self.index:self.index + len(literal)] == literal:
            self.index += len(literal)
            return value
        else:
            raise ValueError(f"Expected literal '{literal}'")

    def _parse_number(self):
        start_index = self.index
        if self.json_string[self.index] == '-':
            self.index += 1
        while self.index < len(self.json_string) and self.json_string[self.index].isdigit():
            self.index += 1
        if self.index < len(self.json_string) and self.json_string[self.index] == '.':
            self.index += 1
            while self.index < len(self.json_string) and self.json_string[self.index].isdigit():
                self.index += 1
        if self.index < len(self.json_string) and self.json_string[self.index] in 'eE':
            self.index += 1
            if self.json_string[self.index] in '+-':
                self.index += 1
            while self.index < len(self.json_string) and self.json_string[self.index].isdigit():
                self.index += 1
        return int(self.json_string[start_index:self.index])

    def _skip_whitespace(self):
        while self.index < len(self.json_string) and self.json_string[self.index].isspace():
            self.index += 1

def main():
    
    with open('../check_wxpay_list.log') as f:
        content = f.read()
    # Define the regular expression pattern
    pattern = r'wx[a-zA-Z0-9]{16}-pc'
    # Find all matches in the sample text
    matches = re.findall(pattern, content)
    matches = set(matches)    
    wxpay_list = matches
    
    pattern_strings = ["https://payapp.weixin.qq.com/", "https://pay.weixin.qq.com/"]
    logpath = "/home/suzy/temp/decoded_new_taint_log_file/"
    logfileName = "decoded_check.log"
    with open(logfileName) as f:
        content = f.read()
        # Define the regular expression pattern
        pattern = r'wx[a-zA-Z0-9]{16}-pc'
        # Find all matches in the sample text
        matches = re.findall(pattern, content)
        matches = set(matches)
    appids = list(matches)
    logs = []
    for appid in appids:
        logs.extend([i for i in os.listdir(logpath) if i.startswith(appid)])
    diff_appids = []
    paypattern_appids = set()
    # source_type in ['sensWechatApi', 'formSubmit', 'inputBox', 'onLaunch']
    # sink_type in ["request", "uploadFile", "navigateToMiniProgram", "sendSocketMessage", "createUDPSocket"]
    # 4*5 it will make 20 items in dataflow_cnt
    dataflow_cnt = {}
    # logs = ["wx8f68418555b73c24-pc_28357_1718059684803_0"]
    for i in tqdm(logs):
        with open(os.path.join(logpath, i)) as f:
            json_string = f.read()
        appid = i.split('_')[0]
        if appid not in wxpay_list:
            diff_appids.append(appid)
        logged = False
        # json_string = '(name = "John Doe", age = 30, is_student = false, courses = [( subject = "Math" ), ( subject = "Science") ])'
        parser = CAPNPParser(json_string)
        parsed_data = parser.parse()
        # one record is possbily several dataflows (several sources -> one sink)
        for record in parsed_data:
            for range in record['message']['jsSinkTainted']['taintSource']['ranges']:
                source_type = range['type'] 
                if source_type in ['sensWechatApi', 'formSubmit', 'inputBox']: #, 'onLaunch']:
                    # if source_type not in dataflow_cnt:
                    #     dataflow_cnt[source_type] = {}
                    for content_log in record["message"]["jsSinkTainted"]["targetString"]["segments"]:
                        # content_log["content"] is the final tainted string
                        print(i)
                        print(content_log["content"])
                        suc = True
                        for tmp in pattern_strings:
                            if tmp in content_log["content"]:
                                suc = False
                        if not logged and suc:
                            logger.info(appid)
                            logged = True
                        # content_list.append(content_log["content"])
                            
    # content_list = list(set(content_list))
    # content_list.sort()
    # with open('content.txt', 'w') as f:
    #     json.dump(content_list, f, indent = 2)
    # with open("not_wxpay_logs.txt", "w") as f:
    #     json.dump(diff_appids, f, indent = 2)
    # print(f'There are {len(paypattern_appids)} mini-apps with the pattern detected')
    # print(f'The others are: {len(set(logs)-paypattern_appids)}')
    # with open('real_pattern.txt', 'w') as f:
    #     json.dump(list(set(logs)-paypattern_appids), f)
    # print(len(diff_appids))
    # print(len(logs))
                

if __name__ == "__main__":
    main()
