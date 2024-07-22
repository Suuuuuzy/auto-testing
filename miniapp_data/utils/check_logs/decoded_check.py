# this script checks the log after decoding
# logpath: /home/suzy/temp/decoded_new_taint_log_file/

import re, os, json
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

from guess_appid_from_log import get_autominium_timestamp, guess_candidates

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
    # print("$$$$$$$")
    # print(source_code)
    # source_code = source_code.replace("\\n", "\n")
    # source_code = bytes(source_code, "utf-8").decode("unicode_escape")
    source_code = source_code.encode('utf-8').decode('unicode_escape')
    source_code = source_code.replace("\\x0a", "\n")
    # source_code = bytes(source_code, "utf-8").decode("unicode_escape")
    # print("######")
    # print(source_code)
    return source_code

pattern_strings = ["https://payapp.weixin.qq.com/", "https://pay.weixin.qq.com/"]
pattern_string = '|'.join(pattern_strings)
pattern = rf'({pattern_string})'    

logpath = "/home/suzy/temp/decoded_new_taint_log_file/"

def handle_logs(logs):    
    for i in tqdm(logs):
        handle_single_log(i)           

def handle_single_log(i, appid_candidates = None):
    filename_pattern = r'\[http:\/\/127.0.0.1[.]*\]'
    logger.info(f'{i} checked')
    try:
        with open(os.path.join(logpath, i)) as f:
            json_string = f.read()
    except:
        logger.error(f'Error reading log: {i}')
        return
    appid = i.split('_')[0]
    logged = False
    parser = CAPNPParser(json_string)
    parsed_data = parser.parse()
    # one record is possbily several dataflows (several sources -> one sink)
    contents = []
    if not appid_candidates:
        appid_candidates = set() 
    for record in parsed_data:
        last_range_tainted = None
        for range in record['message']['jsSinkTainted']['taintSource']['ranges']:
            if last_range_tainted:
                taint_strings = content_log["content"][last_range_tainted:range['start']]
                logger.info(f'{i} with taint string: {taint_strings}')
                last_range_tainted = None                    
            source_type = range['type'] 
            if source_type in ['sensWechatApi', 'formSubmit', 'inputBox', 'onLaunch']:
                for content_log in record["message"]["jsSinkTainted"]["targetString"]["segments"]:
                    matches = re.findall(pattern, content_log["content"]) # content_log["content"] is the final tainted string
                    if len(matches)>0:
                        return
                    logger.info(f'{i} with type: {source_type}, content: {content_log["content"]}')
                    last_range_tainted = range['start']
        for frame in record['message']['jsSinkTainted']['stackTrace']['frames']:
            source_code = frame["frameHumanReadable"]
            source_code = convert_string(source_code)
            # get func name
            func_name = source_code.split(":")[1].split(" [")
            func_name = func_name[0].strip()
            # get source name
            url_pattern = r'\[http://127\.0\.0\.1:\d+([^\]]*)\]'
            matches = re.findall(url_pattern, source_code)
            source_name = None
            if matches:
                if "?" in matches[0]:
                    source_name = matches[0].split('?')[0]
                else:
                    source_name = matches[0]
                source_name = source_name.split("/appservice/")[1]
            # get source code
            if ("--------- s o u r c e   c o d e ---------") in frame["frameHumanReadable"]:
                source_code = source_code.split("--------- s o u r c e   c o d e ---------")[-1]
                source_code = source_code.split("-----------------------------------------")[0]
                # source_code = convert_string(source_code)
            
            if (source_name and "__dev__" not in source_name):
                # print("--------- func name ---------")
                # print(func_name)
                # print("--------- source name ---------")
                # print(source_name)
                # print("--------- s o u r c e   c o d e ---------")
                # print(source_code)
                res = search_source_name(source_name, func_name, source_code, appid_candidates)
                if len(appid_candidates)==0:
                    appid_candidates = res
                else:
                    appid_candidates = appid_candidates.intersection(res)
    return appid_candidates

def search_source_name(source_name, func_name, source_code, appid_candidates = None):
    res = set()
    timestamp_appid_dic = get_autominium_timestamp()
    if not appid_candidates:
        appid_candidates = [timestamp_appid_dic[i] for i in timestamp_appid_dic]
    # print(len(appids))
    unpack_path = "/media/dataj/miniapp_data/wxapkgs-42w-unpacked"
    # appids = os.listdir(unpack_path)
    source_code_lines = source_code.split("\n")
    max_length = 0
    for line in source_code_lines:
        if len(line) > max_length:
            max_length = len(line)
            source_code_sample = line
    # if source_code.endswith("..."):
    #     source_code = source_code[:-3]
    print(source_name, func_name, source_code)
    for appid in appid_candidates:
        source_path = os.path.join(unpack_path, appid, source_name)
        if os.path.exists(source_path):
            # print(source_path)
            res.add(appid)
            
            with open(source_path) as f:
                content = f.read()
            # if "referrer" in content:
                # print("referrer")
                # res.add(appid)
            if "anonymous" not in func_name and func_name in content and source_code_sample in content:
                res.add(appid)
            # elif "anonymous" in func_name and "WeixinJSCore" in content:
            #     res.add(appid)
            #     print(appid)
    return res
    

    
def main():
    # wxpay_list = get_appids('wxpay')'
    #  too slow
    decoded_checked_list = get_appids('decoded_checked')
    # taintmini_source_type in ['sensWechatApi']
    # taintmini_sink_type in ["request", "uploadFile", "navigateToMiniProgram", "sendSocketMessage", "createUDPSocket"]
    # 4*5 it will make 20 items in dataflow_cnt
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
    # main()
    # print(res)
    # logs = ["wx4ba44b88e6070420-pc_20963_1718135954876_1"]
    # handle_log(logs)
    log_name = "/home/suzy/temp/decoded_new_taint_log_file/wxa96cbd4a0a87e923-pc_5595_1719987337986_1"
    candidates = guess_candidates(log_name)
    print(candidates)
    
    res = handle_single_log(log_name, candidates)
    print(res)