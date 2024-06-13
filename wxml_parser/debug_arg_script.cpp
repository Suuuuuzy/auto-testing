#include "WXMLDocumentParser.h"
#include <iostream>
#include <fstream>
#include <filesystem>
#include <typeinfo>

#include "nlohmann/json.hpp"

int main(int, char **)
{

    std::vector<std::filesystem::path> miniprogram_list;

    const std::filesystem::path ROOT_DIR = "/home/bella-xia/auto-testing/wxml_parser/sample_wxml";
    const std::filesystem::path JSON_DUMP_DIR = "/home/bella-xia/auto-testing/wxml_parser/trial_results/trial.json";
    const std::filesystem::path miniprogram_path = "wx4ce9c3cff6c3c610";
    std::string page_directory = "sample_01";
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

    try
    {
        // Code that may throw an exception
        Web::WXMLDocumentParser parser(page_directory, u32_content);

        std::ofstream file(JSON_DUMP_DIR);
        if (file.is_open())
        {
            nlohmann::json j = parser.get_all_bind_element_args();
            file << j.dump(4); // Pretty-print with 4 spaces indentation
            file.close();
            // std::cout << "JSON data successfully written to " << json_dump_dir_first_miniprogram << std::endl;
        }
        else
        {
            std::cerr << "Failed to open the file." << std::endl;
            return 1;
        }
    }
    catch (const std::runtime_error &e)
    {
        std::cerr << e.what() << std::endl;
    }
    file.close();

    return 0;
}