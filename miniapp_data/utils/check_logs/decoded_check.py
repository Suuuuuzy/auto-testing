# this script checks the log after decoding in largescale
# output result to decoded_check.log
# logpath: /home/suzy/temp/decoded_new_taint_log_file/

import re, os, json, sys
from random import sample 
from tqdm import tqdm
from get_appids import get_appids
import multiprocessing as mp
import logging
logger = logging.getLogger(__name__)

logging.basicConfig(
    filename='decoded_check.log',
    level=logging.DEBUG,
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)


# sources = []
# sinks = ["sensWechatApi"]

# source_sink_pairs = [
#     "sensWechatApi": "navigate",
#     "onLaunch": "all",
    
# ]

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

def convert_string(source_code):
    source_code = source_code.encode('utf-8').decode('unicode_escape')
    source_code = source_code.replace("\\x09", " ")
    source_code = source_code.replace("\\x0a", "\n")
    return source_code

    

logpath = "/home/suzy/temp/decoded_new_taint_log_file/"

def handle_logs(logs):    
    for i in tqdm(logs):
        handle_single_log(i)           


 
def handle_single_log(i):
    pattern_strings = ["https://payapp.weixin.qq.com/", "https://pay.weixin.qq.com/"]
    pattern_string = '|'.join(pattern_strings)
    pattern = rf'({pattern_string})'
    logger.info(f'{i} checked')
    try:
        with open(os.path.join(logpath, i)) as f:
            json_string = f.read()
    except:
        logger.error(f'Error reading log: {i}')
        return
    appid = i.split('_')[0]
    parser = CAPNPParser(json_string)
    parsed_data = parser.parse()
    # one record is possbily several dataflows (several sources -> one sink)
    for record in parsed_data:
        content = record["message"]["jsSinkTainted"]["targetString"]["segments"][0]["content"]
        content = convert_string(content)
        # we don't want wxpay patterns, those are false positives
        matches = re.findall(pattern, content) # content_log["content"] is the final tainted string
        if len(matches)>0:
            continue
        last_range_tainted = None
        for range in record['message']['jsSinkTainted']['taintSource']['ranges']:
            if last_range_tainted:
                taint_strings = content[last_range_tainted:range['start']]
                logger.info(f'{i} with taint string: {taint_strings}')
                last_range_tainted = None                    
            source_type = range['type'] 
            if source_type in ['sensWechatApi', 'formSubmit', 'inputBox', 'onLaunch']:
                logger.info(f'{i} has taint type: {source_type}, content: {content}')
                last_range_tainted = range['start']



    

    
def main():
    decoded_checked_list = get_appids('decoded_checked')
    logs = os.listdir(logpath)
    print(f'In total, there are {len(logs)} decoded logs')
    logs = set(logs)-set(decoded_checked_list)
    # print(f'There are {len(logs)} decoded logs not checked yet')
    package_names = list(logs)
    processes = 128
    batch_size = (len(package_names) + processes - 1) // processes
    batched_package_names = [package_names[i:i+batch_size] for i in range(0, len(package_names), batch_size)]
    with mp.Pool(processes=processes) as pool:
        pool.map(handle_logs, batched_package_names)
    


    
if __name__ == "__main__":
    main()
    # logname = "wx4e6f00d46ac5843e-pc_23996_1722216224789_0"
    # get_details(logname)