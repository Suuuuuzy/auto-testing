import os, json, sys
from typing import Dict, List
from contextlib import contextmanager

import WXMLDocumentParser as WXMLDocumentParserScript
import Node as NodeScript
from Event import EventInstanceEncoder

DEBUG_TOKENIZER = False
DEBUG_PARSER = False
DEBUG_PARSED_ARGS = True
DEBUG_PARTICULAR_ELEMENT = False

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

    ROOT_DIR : str = '/home/bella-xia/suzy-auto-testing/data/0_passing_groundtruth'
    ROOT_DUMP_AST_DIR : str = '/home/bella-xia/suzy-auto-testing/wxml_parser_python/all_outputs/json_ast_results'
    ROOT_DUMP_EVENT_DIR : str = '/home/bella-xia/suzy-auto-testing/wxml_parser_python/all_outputs/json_event_full_results'
    STD_OUTPUT_DIR : str = '/home/bella-xia/suzy-auto-testing/wxml_parser_python/all_outputs/output_log.txt'

    all_miniprogram_names = os.listdir(ROOT_DIR)

    # TODO: comment out this line:
    # all_miniprogram_names = ['wx0bc8123197e70985']

    if DEBUG_PARTICULAR_ELEMENT is True:
        miniprogram_name = 'wx0bc8123197e70985'
        page_name = 'pages/venue/detail/detail'
        wxml_path : str = page_name + '.wxml'
        access_page : str = os.path.join(ROOT_DIR, miniprogram_name, wxml_path)
        try:
            with open(access_page, 'r') as file:
                content : str = file.read()
        except FileNotFoundError:
            print(f'unable to open file directory {access_page}')
            exit(1)
    
        parser = WXMLDocumentParserScript.WXMLDocumentParser(input=content, page_name=page_name)
        parser.run()
        root : NodeScript.RootNode = parser.m_root

        
        # 3rd depth 1
        counter = 0
        ideal_idx = 3
        for idx in range(root.get_num_children()):
            child : NodeScript.Node = root.get_children(idx)
            if child.type() == NodeScript.NodeType.ELEMENT_NODE:
                counter += 1
            if counter == ideal_idx:
                break

        # 1st depth 2
        counter = 0
        ideal_idx = 1
        for idx in range(child.get_num_children()):
            sub_child : NodeScript.Node = child.get_children(idx)
            if sub_child.type() == NodeScript.NodeType.ELEMENT_NODE:
                counter += 1
            if counter == ideal_idx:
                break
        
        # 3st depth 3
        counter = 0
        ideal_idx = 3
        for idx in range(sub_child.get_num_children()):
            sub_sub_child : NodeScript.Node = sub_child.get_children(idx)
            if sub_sub_child.type() == NodeScript.NodeType.ELEMENT_NODE:
                counter += 1
            if counter == ideal_idx:
                break
    
        # 1st depth 4
        counter = 0
        ideal_idx = 1
        for idx in range(sub_sub_child.get_num_children()):
            sub_sub_sub_child : NodeScript.Node = sub_sub_child.get_children(idx)
            if sub_sub_sub_child.type() == NodeScript.NodeType.ELEMENT_NODE:
                counter += 1
            if counter == ideal_idx:
                break
        
        # for idx in range(sub_sub_sub_child.get_num_children()):
        #     child_instance : NodeScript.Node = sub_sub_sub_child.get_children(idx)
        #     if child_instance.type() == NodeScript.NodeType.ATTRIBUTE_NODE:
        #         print(f"[{child_instance.m_name} : {child_instance.m_auxiliary_data}]")
    
        for bind_instance in parser.m_bind_storage:
            if bind_instance[2] == sub_sub_sub_child:
                break
        
        print(parser._args_for_bind_element(bind_instance, get_full_info=True))

        
    with open(STD_OUTPUT_DIR, 'w') as output_file:

        with redirect_stdout(output_file):

            for miniprogram_name in all_miniprogram_names:
                print(f"querying miniprogram {miniprogram_name}")
                pages_data : List[str] = read_app_json(os.path.join(ROOT_DIR, miniprogram_name))
                miniprogram_ast_data : Dict[str, any] = {}
                miniprogram_event_data : Dict[str, Dict[str, any]] = {}

                # TODO: comment out this line:
                # pages_data = ['pages/venue/detail/detail']


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
                        miniprogram_ast_data[page] = parser.run(print_ast_flag=False, get_json_result=True)

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
                
