import os, json, sys
from typing import Dict, List
from contextlib import contextmanager

import WXMLDocumentParser as WXMLDocumentParserScript
from Event import EventInstanceEncoder

DEBUG_TOKENIZER = False
DEBUG_PARSER = False
DEBUG_PARSED_ARGS = True

def read_app_json(miniprogram_path) -> List[str]:
    json_path = os.path.join(miniprogram_path, 'app.json')
    try:
        with open(json_path, 'r') as file:
            json_data = json.load(file)
    except FileNotFoundError:
        print(f"The file {json_path} does not exist.")
        exit(1)
    except json.JSONDecodeError:
        print(f"Error decoding JSON in file {json_path}.")
        exit(1)
    return json_data['pages']


@contextmanager
def redirect_stdout(to_file):
    original_stdout = sys.stdout  # Save a reference to the original standard output
    sys.stdout = to_file  # Redirect standard output to the file
    try:
        yield  # Allow code to run with redirected stdout
    finally:
        sys.stdout = original_stdout  # Restore original stdout

if __name__ == '__main__':

    ROOT_DIR : str = '/home/bella-xia/auto-testing/data/0_passing_groundtruth'
    ROOT_DUMP_AST_DIR : str = '/home/bella-xia/auto-testing/wxml_parser_python/all_outputs/json_ast_results'
    ROOT_DUMP_EVENT_DIR : str = '/home/bella-xia/auto-testing/wxml_parser_python/all_outputs/json_event_results'
    STD_OUTPUT_DIR : str = '/home/bella-xia/auto-testing/wxml_parser_python/all_outputs/output_log.txt'

    all_miniprogram_names = os.listdir(ROOT_DIR)

    # TODO: comment out this line:
    # all_miniprogram_names = ['wx94453ac9e8af894a']

    with open(STD_OUTPUT_DIR, 'w') as output_file:

        with redirect_stdout(output_file):

            for miniprogram_name in all_miniprogram_names:
                print(f"querying miniprogram {miniprogram_name}")
                pages_data : List[str] = read_app_json(os.path.join(ROOT_DIR, miniprogram_name))
                miniprogram_ast_data : Dict[str, any] = {}
                miniprogram_event_data : Dict[str, Dict[str, any]] = {}

                # TODO: comment out this line:
                # pages_data = ['pages/index/index']

                for page in pages_data:
                    print(f"workng on page {page}")
                    wxml_path : str = page + '.wxml'

                    access_page : str = os.path.join(ROOT_DIR, miniprogram_name, wxml_path)

                    try:
                        with open(access_page, 'r') as file:
                            content : str = file.read()
        
                    except FileNotFoundError:
                        print(f'unable to open file directory {access_page}')
                        exit(1)
    
                    parser = WXMLDocumentParserScript.WXMLDocumentParser(input=content, page_name=page)

                    if DEBUG_TOKENIZER is True:
                        parser.print_tokens()

                    if DEBUG_PARSER is True:
                        miniprogram_ast_data[page] = parser.run(print_ast_flag=False)

                    if DEBUG_PARSED_ARGS is True:
                        miniprogram_event_data[page] = parser.get_all_bind_elements_args()
        
                if DEBUG_PARSER is True:
                    dump_ast_dir = os.path.join(ROOT_DUMP_AST_DIR, miniprogram_name)
                    with open(dump_ast_dir + '.json', 'w') as json_ast_file:
                        json.dump(miniprogram_ast_data, json_ast_file, indent=4)
        
                if DEBUG_PARSED_ARGS is True:
                    dump_event_dir = os.path.join(ROOT_DUMP_EVENT_DIR, miniprogram_name)
                    with open(dump_event_dir + '.json', 'w') as json_event_file:
                        json.dump(miniprogram_event_data, json_event_file, indent=4, cls=EventInstanceEncoder)           
                
