from typing import Tuple, List, Dict
import re

import Node as NodeScript
import Custom_Exceptions as ExceptionScript
from API_Data import BINDING_PREFIX, BUBBLING_EVENTS

# some pre-defined constants

TAB = '\u0009'
BELL = '\u0007'
LINE_FEED = '\u000A'
FORM_FEED = '\u000C'
CARRIAGE_RETURN = '\u000D'

SPACE = '\u0020'
EXCLAMATION_MARK = '\u0021'
QUOTATION_MARK = '\u0022'
NUMBER_SIGN = '\u0023'
AMPERSAND = '\u0026'
APOSTROPHE = '\u0027'
HYPHEN_MINUS = '\u002D'
SOLIDUS = '\u002F'

LESS_THAN = '\u003C'
EQUAL_SIGN = '\u003D'
GREATER_THAN = '\u003E'
QUESTION_MARK = '\u003F'

RIGHT_SQUARE_BRACKET = '\u005D'


def on(current_input_character: str | None, codepoint : str) -> bool:
    return current_input_character is not None and current_input_character == codepoint

def on_whitespace(current_input_character: str | None) -> bool:                                      
    return (current_input_character is not None and                
            (current_input_character == TAB or           
             current_input_character == BELL or          
             current_input_character == LINE_FEED or
             current_input_character == FORM_FEED or
             current_input_character == CARRIAGE_RETURN or
             current_input_character == SPACE))


def on_ascii_alpha(current_input_character: str | None) -> bool:                                                                                       \
    return (current_input_character is not None and                                                               
            ((current_input_character >= '\u0041' and current_input_character <= '\u005A') or 
             (current_input_character >= '\u0061' and current_input_character <= '\u007A')))

def On_ascii_alphanumeric(current_input_character: str | None) -> bool:                                                                                  \
    return (current_input_character is not None and                                                               
            ((current_input_character >= '\u0041' and current_input_character <= '\u005A') or 
             (current_input_character >= U'\u0061' and current_input_character <= U'\u007A') or 
             (current_input_character >= U'\u0030' and current_input_character <= U'\u0039')))

def on_EOF(current_input_character: str | None) -> bool: 
    return current_input_character is None

def on_anything_else(current_input_character: str | None) -> bool:
    return current_input_character is not None

def print_ast(node : NodeScript.Node | None = None, depth: int = 0) -> None:
    if node is None:
        return
    
    builder : str = ""
    
    for _ in range(depth):
        builder += "  "
    
    builder += node.to_string()

    if node.to_string()[0] == 'e':
        builder += '\n'
    
    print(builder)

    for idx in range(node.get_num_children()):
        child : NodeScript.Node | None = node.get_children(idx)
        print_ast(child, depth + 1)


def print_bind_elements(node : NodeScript.Node | None = None,
                        identifier : int = 0) -> None:
    if node is None:
        return
    
    if (node.get_num_bind() > 0):
        assert(node.type() == NodeScript.NodeType.ELEMENT_NODE)

        for idx in range(node.get_num_bind()):
            bind_info : Tuple[str, str] = node.get_bind_info(idx)
            print(f"Element # {identifier}")
            print(f"Bind method: {bind_info[0]} Function call: {bind_info[1]}")
            identifier += 1
            print_ast(node)
        
    for idx in range(node.get_num_children()):
        child : NodeScript.Node | None = node.get_children(idx)
        print_bind_elements(child, identifier)

def segment_string(text : str) -> Tuple[str, bool]:
    segments : List[Tuple[str, bool]] = []
    pattern = re.compile(r'\{\{[^}]+\}\}')
    matches = list(pattern.finditer(text))
    last_pos = 0

    for match in matches:
        match_start, match_end = match.span()

        # Add the part before the match
        if match_start > last_pos:
            segments.append((text[last_pos:match_start], False))

        # Add the match itself
        match_str = match.group()
        segments.append((match_str[2:-2], True))

        # Update the last position
        last_pos = match_end

    # Add the part after the last match, if any
    if last_pos < len(text):
        segments.append((text[last_pos:], False))

    return segments

def get_ast(node : NodeScript.Node | None, buffer : List[str], depth : int =0) -> None:
    if node is None:
        return

    for _ in range(depth):
        buffer[0] += "  "
    buffer[0] += "\n"
    
    buffer[0] += node.to_string()

    if node.to_string()[0] == 'e':
        buffer +=  "\n"
    
    for idx in range(node.get_num_children()):
        child  : NodeScript.Node | None = node.get_children(idx)
        get_ast(child, buffer, depth + 1)


def get_bind_element_json(node : NodeScript.Node, json_array : List[Dict[str, any]]) -> None:
    if node.get_num_bind() > 0:

        assert node.type() == NodeScript.NodeType.ELEMENT_NODE

        for idx in range(node.get_num_bind()):

            bind_info : Tuple[str, str] = node.get_bind_info(idx)

            json_data : Dict[str, any] = {}

            json_data['bind_method'] = bind_info[0]
            json_data['function_call'] = bind_info[1]

            get_ast_buffer : List[str] = ['']
            get_ast(node, get_ast_buffer)

            json_data['ast'] = get_ast_buffer[0]

            attribute_buf : Dict[str, any] = {}
            data_buf : List[str] = []
            scriptdata_buf : List[str] = []

            for idx in range(node.get_num_children()):
                child_node : NodeScript.Node | None = node.get_children(idx)

                if child_node is not None:

                    if (child_node.type() == NodeScript.NodeType.ATTRIBUTE_NODE):
                        attribute_buf[child_node.get_name()] = child_node.get_auxiliary_data()
                        continue

                    if (child_node.type() == NodeScript.NodeType.DATA_NODE):
                        if (child_node.get_auxiliary_data == "True"):
                            scriptdata_buf.append(child_node.get_name())
                        else:
                            data_buf.append(child_node.get_name())
                        continue

            json_data['attributes'] = attribute_buf
            json_data['data'] = data_buf
            json_data['scriptdata'] = scriptdata_buf

            json_array.append(json_data)

def stripout_bubbling_event(bind_name : str) -> str:

    for prefix in BINDING_PREFIX:
        if bind_name[:len(prefix)] == prefix:
            return_str : str = bind_name[len(prefix):]
            assert return_str in BUBBLING_EVENTS
            return return_str
    
    ExceptionScript.ASSERT_NOT_REACHED()
            
def get_all_form_components(root_node : NodeScript.Node,
                            data : Dict[str, str]):
    
    assert root_node.type() == NodeScript.NodeType.ELEMENT_NODE

    for idx in range(root_node.get_num_children()):
        child_node : NodeScript.Node | None = root_node.get_children(idx)

        # only check the ElementWrapperNode
        # check if it has "name" element --> if does it can be viewed
        # in form
        if child_node is not None and child_node.type() == NodeScript.NodeType.ELEMENT_NODE:
            component_name : str | None = child_node.get_attribute(['name'])

            # if the current component has name,
            # it means it is an element in the form and does not need to go any lower
            # however, depending on the type of the element, it still needs to figure
            # out the input content

            if component_name is not None:
                component_tag : str = child_node.get_name()

                if component_tag == 'input' or component_tag  == 'textarea':
                    # cannot estimate a good input default value,
                    # so a string constant "default input string \n" is provided
                    data[component_name] = "default input string. \n"

                elif component_tag == 'slider':
                    # to know the values inherent inside a slider, it would be
                    # important to be able to get the min, Max and step attriutes of a slider
                        
                    min_attribute : str | None = child_node.get_attribute(["min", "Min"])
                    max_attribute : str | None = child_node.get_attribute(["max", "Max"])
                    step_attribute : str | None =  child_node.get_attribute(["step", "Step"])

                        
                    # the min attribute has default value 0
                    # the max attribute has default value 100
                    # the step attribute has default value 1
                        
                    min_setting : int = int(min_attribute) if min_attribute is not None else 0
                    max_setting : int = int(max_attribute) if max_attribute is not None else 100
                    step_setting : int =  int(step_attribute) if step_attribute is not None else 1

                    mid_step: int = (max_setting - min_setting)  // step_setting

                    data[component_name] = min_setting + mid_step * step_setting
                    
                elif component_tag == "switch":     
                    # since switch can only accept true or false
                    # no value is provided as it can be inferred

                    data[component_name] = True
                    
                elif component_tag == "checkbox-group":

                    #     In the particular example that wechat-miniprogram official document provides,

                    #     the radio-group is given as:

                    #     <checkbox-group name="checkbox">
                    #         <label><checkbox value="checkbox1"/>选项一</label>
                    #         <label><checkbox value="checkbox2"/>选项二</label>
                    #     </checkbox-group>
                    #     which would have an AST of

                    #     radio-group
                    #         label
                    #             checkbox, value="checkbox1"

                    #         label
                    #             checkbox, value="checkbox2"

                    #     which means that checkbox does not need to be the direct child class of
                    #     checkbox-group. To find all checkox components of the radio-group (or at least
                    #    one to put into the detail values), a recursive search might be necessary
                        
                    checkbox_comps : List[str] = []
                    recursive_all_subcomponents_search(child_node, "checkbox", checkbox_comps)

                    data[component_name] = checkbox_comps
                    
                elif component_tag == "radio-group":
                        
                    # similar to checkbox element

                    radio_comps : List[str] = []
                    recursive_all_subcomponents_search(child_node, "radio", radio_comps)

                    data[component_name] = radio_comps

                elif component_tag == 'picker':
                    mode_attr : str | None = child_node.get_attribute(['mode'])
                    mode_name : str = mode_attr if (mode_attr is not None) else "selector"

                    if mode_name == "selector":
                                
                        # detail for selector would be index of the current
                        # selection. Here to ensure that the index does not
                        # go out of range is value is chosen to be "0"
                        data[component_name] =  0
                        
                
                    elif mode_name == "multiSelector":
                
                        # not sure how to set the length of the multi-selector
                        # so set default to 3. Can try to figure out more later
                                
                        data[component_name] =  [0, 0, 0]
                
                    elif mode_name == "time":
                                
                        data[component_name] = "11:00"
                
                    elif mode_name == "date":
                
                        # seems to be a string of date
                        # do a default one of "2021-09-01"
                        data[component_name] =  "2021-09-01"
                
                    elif mode_name == "region":

                        data[component_name] =  ["广东省", "广州市", "海珠区"]
                                
                    else:
                        ExceptionScript.ASSERT_NOT_WXML_DATA()
                
                else:
                    print(f"component with name {component_tag} in form unimplemented")
                    ExceptionScript.ASSERT_UNIMPLEMENTED()
                
                continue

            # if the current element is an ElementWrapperNode
            # but does not have a name, it is likely that it contains
            # a child node that does
            # so recursively navigate down
            get_all_form_components(child_node, data)
            

def recursive_all_subcomponents_search(node : NodeScript.Node, sub_component_tag : str, data : List[str]) -> None:
    if node.type() == NodeScript.NodeType.ELEMENT_NODE:
        
        if node.get_name() == sub_component_tag:
            
            attribute_value : str | None = node.get_attribute(["value"])
            assert attribute_value is not None
            data.append(attribute_value)
            
            for idx in range(node.get_num_children()):
            
                child_node : NodeScript.Node | None = node.get_children(idx)
                if (child_node is not None and child_node.type() == NodeScript.NodeType.ELEMENT_NODE):
                
                    # only recursively navigate child if the child is an
                    # element wrapper node
                    recursive_all_subcomponents_search(child_node, sub_component_tag, data)
                
            
        return
    ExceptionScript.ASSERT_NOT_REACHED()