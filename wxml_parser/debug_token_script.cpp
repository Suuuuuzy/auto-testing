#include "WXMLDocumentParser.h"
#include <iostream>
#include <fstream>
#include <filesystem>
#include <typeinfo>

#include "nlohmann/json.hpp"

// #define TOKENIZER_DEBUG_MODE
#define PARSER_DEBUG_MODE

int main(int, char **)
{

    std::vector<std::filesystem::path> miniprogram_list;

    const std::filesystem::path ROOT_DIR = "/home/bella-xia/auto-testing/wxml_parser/sample_wxml";

    // std::filesystem::path miniprogram_path = "wxaf291362a455b5e1";
    std::string page_directory = "sample";
    std::filesystem::path access_page = ROOT_DIR / static_cast<std::filesystem::path>(page_directory + ".wxml");

    std::ifstream file(access_page);

    if (!file.is_open())
    {
        std::cerr << "Unable to open file" << std::endl;
        return 1;
    }

    std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());

    std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> convert;
    std::u32string u32_content = convert.from_bytes(content);

#ifdef TOKENIZER_DEBUG_MODE
    Web::HTMLTokenizer tokenizer(u32_content);
    tokenizer.next_token();
#endif
#ifdef PARSER_DEBUG_MODE
    try
    {
        // Code that may throw an exception
        Web::WXMLDocumentParser parser(page_directory, u32_content);
        parser.print_tokens();
    }
    catch (const std::runtime_error &e)
    {
        std::cerr << e.what() << std::endl;
    }

#endif
    file.close();

    return 0;
}