# this script checks the log after decoding
# logpath: /home/suzy/temp/decoded_new_taint_log_file/

import re, os
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
    # Example usage:
    # logpath = "/home/suzy/temp/decoded_new_taint_log_file/test_parser"
    logpath = "/home/suzy/temp/decoded_new_taint_log_file/"
    for i in os.listdir(logpath):
        with open(os.path.join(logpath, i)) as f:
            json_string = f.read()
        appid = i.split('_')[0]
        # json_string = '(name = "John Doe", age = 30, is_student = false, courses = [( subject = "Math" ), ( subject = "Science") ])'
        parser = CAPNPParser(json_string)
        parsed_data = parser.parse()

        for record in parsed_data:
            for range in record['message']['jsSinkTainted']['taintSource']['ranges']:
                source_type = range['type'] 
                if source_type in ['sensWechatApi', 'formSubmit', 'inputBox', 'onLaunch']:
                    print(appid)
                    print(f'messageId: {record["messageId"]}')
                    print(f'range: {range}')
                    for content_log in record["message"]["jsSinkTainted"]["targetString"]["segments"]:
                        print(f'content: {content_log["content"]}')
                    print('\n')
        
                

if __name__ == "__main__":
    main()
