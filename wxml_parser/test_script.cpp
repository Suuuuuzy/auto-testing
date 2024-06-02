#include "WXMLDocumentParser.h"
#include <iostream>
#include <fstream>
#include <filesystem>
#include <typeinfo>

#include "nlohmann/json.hpp"

// #define TOKENIZER_DEBUG_MODE
#define PARSER_DEBUG_MODE

std::vector<std::string> get_json_info(std::string json_path)
{

    std::ifstream json_file(json_path);
    // Parse the JSON content
    nlohmann::json json_data;
    json_file >> json_data;

    // Close the file stream
    json_file.close();

    return json_data["pages"];
}

int main(int, char **)
{

    std::vector<std::filesystem::path> miniprogram_list;

    const std::filesystem::path ROOT_DIR = "/home/bella-xia/auto-testing/data/0_passing_groundtruth";

    try
    {
        for (const auto &entry : std::filesystem::directory_iterator(ROOT_DIR))
        {
            miniprogram_list.push_back(entry.path());
        }
    }
    catch (const std::filesystem::filesystem_error &e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    // for (const std::filesystem::path &miniprogram_name : miniprogram_list)
    std::cout << "there are a total of " << miniprogram_list.size() << "miniprograms" << std::endl;

    std::filesystem::path first_miniprogram_path = miniprogram_list[3];
    std::cout << "surveying miniprogram " << first_miniprogram_path.string() << std::endl;
    std::filesystem::path first_miniprogram_app_json_path = first_miniprogram_path / static_cast<std::filesystem::path>("app.json");
    // std::cout << first_miniprogram_app_json_path.string() << std::endl;

    std::vector<std::string> path_list = get_json_info(first_miniprogram_app_json_path);

    for (const std::string &page_path : path_list)
    {

        std::cout << page_path << std::endl;

        std::filesystem::path access_page = first_miniprogram_path / static_cast<std::filesystem::path>(page_path + ".wxml");

        // std::cout << access_page << std::endl;

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
            Web::WXMLDocumentParser parser(u32_content);
            parser.run();
            parser.get_all_bind_elements();
        }
        catch (const std::runtime_error &e)
        {
            std::cerr << "runtime error at page access " << page_path << std::endl;
            std::cerr << e.what() << std::endl;
            continue;
        }

#endif
        std::cout << std::endl
                  << std::endl;
        file.close();
    }

    return 0;
}