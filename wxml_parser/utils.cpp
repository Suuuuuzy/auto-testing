#include "utils.h"

namespace Web
{

    std::string replaceInvalidUtf8(const std::string &input)
    {
        std::string output;
        output.reserve(input.size()); // Reserve space for output to avoid frequent reallocations

        for (size_t i = 0; i < input.size();)
        {
            unsigned char current = input[i];

            if (current < 0x80)
            { // ASCII character (0xxxxxxx)
                output += current;
                ++i;
            }
            else if (current < 0xC0)
            { // Continuation or invalid byte (10xxxxxx)
                // Invalid UTF-8 sequence, replace with U+FFFD (Unicode replacement character)
                output += '\xEF'; // U+FFFD in UTF-8: 0xEF 0xBF 0xBD
                output += '\xBF';
                output += '\xBD';
                ++i; // Move to next byte
            }
            else if (current < 0xE0)
            { // Two-byte sequence (110xxxxx)
                if (i + 1 < input.size() && (input[i + 1] & 0xC0) == 0x80)
                { // Valid sequence
                    output += input.substr(i, 2);
                    i += 2;
                }
                else
                { // Invalid sequence
                    output += '\xEF';
                    output += '\xBF';
                    output += '\xBD';
                    ++i;
                }
            }
            else if (current < 0xF0)
            { // Three-byte sequence (1110xxxx)
                if (i + 2 < input.size() &&
                    (input[i + 1] & 0xC0) == 0x80 &&
                    (input[i + 2] & 0xC0) == 0x80)
                { // Valid sequence
                    output += input.substr(i, 3);
                    i += 3;
                }
                else
                { // Invalid sequence
                    output += '\xEF';
                    output += '\xBF';
                    output += '\xBD';
                    ++i;
                }
            }
            else if (current < 0xF8)
            { // Four-byte sequence (11110xxx)
                if (i + 3 < input.size() &&
                    (input[i + 1] & 0xC0) == 0x80 &&
                    (input[i + 2] & 0xC0) == 0x80 &&
                    (input[i + 3] & 0xC0) == 0x80)
                { // Valid sequence
                    output += input.substr(i, 4);
                    i += 4;
                }
                else
                { // Invalid sequence
                    output += '\xEF';
                    output += '\xBF';
                    output += '\xBD';
                    ++i;
                }
            }
            else
            { // Invalid UTF-8 start byte
                // Replace with U+FFFD (Unicode replacement character)
                output += '\xEF';
                output += '\xBF';
                output += '\xBD';
                ++i;
            }
        }

        return output;
    }

    std::string utf32ToUtf8(const std::u32string &utf32Str)
    {
        std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> convert;
        return convert.to_bytes(utf32Str);
    }

    std::u32string utf8ToUtf32(const std::string &utf8Str)
    {
        std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> convert;
        return convert.from_bytes(utf8Str);
    }

    std::string char32ToString(char32_t ch)
    {
        // Create a UTF-32 string with a single character
        std::u32string u32str(1, ch);

        // Use a codecvt facet to convert from UTF-32 to UTF-8
        std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> convert;
        return convert.to_bytes(u32str);
    }

    uint32_t get_next_code_point(const std::string &str, size_t &index)
    {
        uint32_t code_point = 0;
        unsigned char c1 = str[index];

        if (c1 < 0x80)
        {
            code_point = c1;
            index += 1;
        }
        else if (c1 < 0xE0)
        {
            unsigned char c2 = str[index + 1];
            code_point = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
            index += 2;
        }
        else if (c1 < 0xF0)
        {
            unsigned char c2 = str[index + 1];
            unsigned char c3 = str[index + 2];
            code_point = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
            index += 3;
        }
        else
        {
            unsigned char c2 = str[index + 1];
            unsigned char c3 = str[index + 2];
            unsigned char c4 = str[index + 3];
            code_point = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) | ((c3 & 0x3F) << 6) | (c4 & 0x3F);
            index += 4;
        }

        return code_point;
    }

    void print_per_char_string(const std::string utf8_string)
    {
        size_t index = 0;
        while (index < utf8_string.size())
        {
            uint32_t code_point = get_next_code_point(utf8_string, index);
            std::cout << "Code point: U+" << std::hex << code_point << std::dec << std::endl;
        }
    }

    void print_ast(Node *node, int depth)
    {
        if (!node)
            return;

        std::stringstream print_str;
        print_str << node->to_string();
        if (node->to_string()[0] == 'e')
            std::cout << std::endl;

        // Print indentation
        for (int i = 0; i < depth; ++i)
        {
            std::cout << "  ";
        }

        std::cout << print_str.str() << std::endl;

        // Recursively print each child
        for (long unsigned int idx = 0; idx < node->get_num_children(); ++idx)
        {
            Node *child = node->get_children(idx);
            if (child != nullptr)
                print_ast(child, depth + 1);
        }
    }

    void get_ast(Node *node, std::stringstream *buffer, int depth)
    {
        if (!node)
            return;

        // std::stringstream print_str;
        *(buffer) << node->to_string();
        if (node->to_string()[0] == 'e')
            *(buffer) << "\n";

        // Print indentation
        for (int i = 0; i < depth; ++i)
        {
            *(buffer) << "  ";
        }
        *(buffer) << "\n";

        // std::cout << print_str.str() << std::endl;

        // Recursively print each child
        for (long unsigned int idx = 0; idx < node->get_num_children(); ++idx)
        {
            Node *child = node->get_children(idx);
            if (child != nullptr)
                get_ast(child, buffer, depth + 1);
        }
    }

    std::vector<std::tuple<std::string, bool>> segment_string(const std::string &text)
    {
        std::vector<std::tuple<std::string, bool>> segments;
        std::regex pattern(R"(\{\{[^}]+\}\})");
        std::sregex_iterator iter(text.begin(), text.end(), pattern);
        std::sregex_iterator end;

        size_t last_pos = 0;

        while (iter != end)
        {
            std::smatch match = *(iter++);

            // Add the part before the match
            if (static_cast<size_t>(match.position()) > last_pos)
            {
                segments.push_back(std::tuple(text.substr(last_pos, match.position() - last_pos), false));
            }

            // Add the match itself
            std::string match_str = match.str();
            segments.push_back(std::tuple(match_str.substr(2, match_str.length() - 4), true));

            // Update the last position
            last_pos = static_cast<size_t>(match.position()) + match_str.length();
        }

        // Add the part after the last match, if any
        if (last_pos < text.length())
        {
            segments.push_back(std::tuple(text.substr(last_pos), false));
        }

        return segments;
    }

    void print_bind_elements(Node *node,
                             // std::vector<std::tuple<std::string, std::string, Node *>> *storage,
                             int identifier)
    {
        if (node->get_num_bind() > 0)
        {
            assert(node->type() == NodeType::ELEMENT_NODE);
            for (size_t idx = 0; idx < node->get_num_bind(); idx++)
            {
                std::tuple<std::string, std::string> bind_info = node->get_bind_info(idx);
                std::cout << std::endl
                          << "Element #" << identifier++ << std::endl;
                std::cout << "Bind method: " << std::get<0>(bind_info) << " Function call: " << std::get<1>(bind_info) << std::endl;
                print_ast(node);
                // storage->push_back(std::tuple(std::get<0>(bind_info), std::get<1>(bind_info), node));
            }
        }
        for (unsigned long int idx = 0; idx < node->get_num_children(); ++idx)
            print_bind_elements(node->get_children(idx), identifier);
    }

    void get_bind_element_json(Node *node, nlohmann::json *json_array)
    {
        if (node->get_num_bind() > 0)
        {
            assert(node->type() == NodeType::ELEMENT_NODE);
            for (size_t idx = 0; idx < node->get_num_bind(); idx++)
            {
                std::tuple<std::string, std::string> bind_info = node->get_bind_info(idx);
                nlohmann::json json_data;

                json_data["bind_method"] = std::get<0>(bind_info);
                json_data["function_call"] = std::get<1>(bind_info);

                std::stringstream get_ast_buffer;
                get_ast(node, &get_ast_buffer);
                json_data["ast"] = get_ast_buffer.str();

                nlohmann::json attribute_buf;

                std::vector<std::string> data_buf;

                std::vector<std::string> scriptdata_buf;

                for (size_t idx = 0; idx < node->get_num_children(); idx++)
                {
                    Node *child_node = node->get_children(idx);
                    if (child_node)
                    {
                        switch (child_node->type())
                        {
                        case (NodeType::ATTRIBUTE_NODE):
                        {
                            attribute_buf[child_node->get_name()] = child_node->get_auxiliary_data();
                        }
                        break;
                        case (NodeType::DATA_NODE):
                        {
                            if (child_node->get_auxiliary_data() == "true")
                                scriptdata_buf.push_back(child_node->get_name());
                            else
                                data_buf.push_back(child_node->get_name());
                        }
                        break;
                        default:
                            break;
                        }
                    }
                }

                json_data["attributes"] = attribute_buf;
                json_data["data"] = data_buf;
                json_data["scriptdata"] = scriptdata_buf;
                json_array->push_back(json_data);
            }
        }
        for (unsigned long int idx = 0; idx < node->get_num_children(); ++idx)
            get_bind_element_json(node->get_children(idx), json_array);
    }

    std::string stripout_bubbling_event(const std::string &bind_name)
    {
        for (const std::string &m_prefix : BINDING_PREFIX)
        {
            if (bind_name.substr(0, m_prefix.length()) == m_prefix)
            {
                std::string return_str = bind_name.substr(m_prefix.length());
                assert(std::find(BUBBLING_EVENTS.begin(), BUBBLING_EVENTS.end(), return_str) != BUBBLING_EVENTS.end());
                return return_str;
            }
        }
        ASSERT_NOT_REACHED();
    }

    std::string convert_double_to_string(const double double_num)
    {
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(2) << double_num;
        return oss.str();
    }

    std::string modify_attribute_name(const std::string &attribute_name)
    {
        const char *char_arr = attribute_name.c_str();
        char *modified_char_arr = new char[attribute_name.length() + 1];

        bool after_hyphen_flag = false;
        for (size_t idx = 0; idx < attribute_name.length(); idx++)
        {
            if (char_arr[idx] == '-')
            {
                after_hyphen_flag = true;
            }
            else if (after_hyphen_flag)
            {
                modified_char_arr[idx] = std::toupper(char_arr[idx]);
                after_hyphen_flag = false;
            }
            else
            {
                modified_char_arr[idx] = std::tolower(char_arr[idx]);
            }
        }
        modified_char_arr[attribute_name.length()] = '\0';

        std::string return_str(modified_char_arr);
        delete[] modified_char_arr;

        return return_str;
    }

    void recursive_all_subcomponents_search(
        Node *root_node, std::string sub_component_tag,
        std::vector<std::string> *subcomponent_values)
    {
        if (root_node->type() == NodeType::ELEMENT_NODE)
        {
            if (root_node->get_name() == sub_component_tag)
            {
                auto attribute_value = root_node->get_attribute({"value"});
                assert(attribute_value.has_value());
                subcomponent_values->push_back(attribute_value.value());
            }
            for (size_t idx = 0; idx < root_node->get_num_children(); ++idx)
            {
                Node *child_node = root_node->get_children(idx);
                if (child_node->type() == NodeType::ELEMENT_NODE)
                {
                    // only recursively navigate child if the child is an
                    // element wrapper node
                    recursive_all_subcomponents_search(child_node, sub_component_tag,
                                                       subcomponent_values);
                }
            }
            return;
        }
        ASSERT_NOT_REACHED();
    }

    void get_all_form_components(Node *root_node,
                                 std::vector<std::tuple<std::string, std::string>> *data)
    {
        assert(root_node->type() == NodeType::ELEMENT_NODE);
        for (size_t idx = 0; idx < root_node->get_num_children(); ++idx)
        {
            Node *child_node = root_node->get_children(idx);

            if (child_node->type() == NodeType::ELEMENT_NODE)
            {
                // only check the ElementWrapperNode
                // check if it has "name" element --> if does it can be viewed
                // in form
                auto component_name = child_node->get_attribute({"name"});

                // if the current component has name,
                // it means it is an element in the form and does not need to go any lower
                // however, depending on the type of the element, it still needs to figure
                // out the input content
                if (component_name.has_value())
                {
                    std::string component_tag = child_node->get_name();
                    std::stringstream ss_data;

                    if (component_tag == "input")
                    {
                        // cannot estimate a good input default value,
                        // so a string constant "default input string \n" is provided
                        ss_data << "input: " << "default input string. \n"
                                << END_OF_ELEMENT;
                    }
                    else if (component_tag == "slider")
                    {
                        /*
                        to know the values inherent inside a slider, it would be
                        important to be able to get the min, Max and step attriutes of a slider
                        */
                        auto min_attribute = child_node->get_attribute({"min", "Min"});
                        auto max_attribute = child_node->get_attribute({"max", "Max"});
                        auto step_attribute = child_node->get_attribute({"step", "Step"});

                        /*
                        the min attribute has default value 0
                        the max attribute has default value 100
                        the step attribute has default value 1
                        */
                        std::string min_setting = (min_attribute.has_value())
                                                      ? min_attribute.value()
                                                      : "0";
                        std::string max_setting = (max_attribute.has_value())
                                                      ? max_attribute.value()
                                                      : "100";
                        std::string step_setting = (step_attribute.has_value())
                                                       ? step_attribute.value()
                                                       : "1";

                        ss_data << "slider: " << "min: " << min_setting << END_OF_ELEMENT
                                << "max: " << max_setting << END_OF_ELEMENT
                                << "step: " << step_setting << END_OF_ELEMENT
                                << END_OF_ELEMENT;
                    }
                    else if (component_tag == "switch")
                    {
                        // since switch can only accept true or false
                        // no value is provided as it can be inferred
                        ss_data << "switch: " << "any boolean value" << END_OF_ELEMENT;
                    }
                    else if (component_tag == "checkbox-group")
                    {
                        /*
                        In the particular example that wechat-miniprogram official document provides,

                        the radio-group is given as:

                        <checkbox-group name="checkbox">
                            <label><checkbox value="checkbox1"/>选项一</label>
                            <label><checkbox value="checkbox2"/>选项二</label>
                        </checkbox-group>
                        which would have an AST of

                        radio-group
                            label
                                checkbox, value="checkbox1"

                            label
                                checkbox, value="checkbox2"

                        which means that checkbox does not need to be the direct child class of
                        checkbox-group. To find all checkox components of the radio-group (or at least
                        one to put into the detail values), a recursive search might be necessary
                        */
                        std::vector<std::string> all_checkbox_comp_values = std::vector<std::string>();
                        recursive_all_subcomponents_search(child_node, "checkbox", &all_checkbox_comp_values);

                        ss_data << "checkbox-group: " << START_OF_ARR;
                        for (std::string checkbox_value : all_checkbox_comp_values)
                        {
                            ss_data << checkbox_value << END_OF_ELEMENT;
                        }
                        ss_data << END_OF_ARR << END_OF_ELEMENT;
                    }
                    else if (component_tag == "radio-group")
                    {
                        /*
                        similar to checkbox element
                        */
                        std::vector<std::string> all_radio_comp_values = std::vector<std::string>();
                        recursive_all_subcomponents_search(child_node, "radio", &all_radio_comp_values);

                        ss_data << "radio-group: " << START_OF_ARR;
                        for (std::string radio_value : all_radio_comp_values)
                        {
                            ss_data << radio_value << END_OF_ELEMENT;
                        }
                        ss_data << END_OF_ARR << END_OF_ELEMENT;
                    }
                    else
                    {
                        ASSERT_UNIMPLEMENTED();
                    }
                    data->push_back(std::make_tuple(component_name.value(),
                                                    ss_data.str()));
                    continue;
                }

                // if the current element is an ElementWrapperNode
                // but does not have a name, it is likely that it contains
                // a child node that does
                // so recursively navigate down
                get_all_form_components(child_node, data);
            }
        }
    }
}