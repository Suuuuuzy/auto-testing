#include "utils.h"

namespace Web
{
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
                             std::vector<std::tuple<std::string, std::string, Node *>> *storage,
                             bool print_flag)
    {
        if (node->get_num_bind() > 0)
        {
            assert(node->type() == NodeType::ELEMENT_NODE);
            for (size_t idx = 0; idx < node->get_num_bind(); idx++)
            {
                std::tuple<std::string, std::string> bind_info = node->get_bind_info(idx);
                if (print_flag)
                {
                    std::cout << std::endl
                              << "Element #" << storage->size() << std::endl;
                    std::cout << "Bind method: " << std::get<0>(bind_info) << " Function call: " << std::get<1>(bind_info) << std::endl;
                    print_ast(node);
                }
                storage->push_back(std::tuple(std::get<0>(bind_info), std::get<1>(bind_info), node));
            }
        }
        for (unsigned long int idx = 0; idx < node->get_num_children(); ++idx)
            print_bind_elements(node->get_children(idx), storage, print_flag);
    }

}