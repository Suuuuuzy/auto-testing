#include "WXMLDocumentParser.h"
#include <iostream>
#include <fstream>
#include <filesystem>
#include <typeinfo>

// #define TOKENIZER_DEBUG_MODE
#define PARSER_DEBUG_MODE

// #define PARSER_PRINT_MODE
#define PARSER_JSON_MODE

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

int main(int argc, char **argv)
{
    assert(argc == 2);
    const int idx = std::atoi(argv[1]);

    std::vector<std::filesystem::path>
        miniprogram_list;

    const std::filesystem::path ROOT_DIR = "/home/bella-xia/auto-testing/data/0_passing_groundtruth";
    const std::filesystem::path JSON_DUMP_DIR = "/home/bella-xia/auto-testing/wxml_parser/results";

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

    const std::string first_miniprogram_path = static_cast<std::string>(miniprogram_list[idx]);
    size_t pos = first_miniprogram_path.find_last_of('/');
    const std::string filename = (pos == std::string::npos)
                                     ? first_miniprogram_path
                                     : first_miniprogram_path.substr(pos + 1);
    const std::filesystem::path json_dump_dir_first_miniprogram = JSON_DUMP_DIR / static_cast<std::filesystem::path>("log_" + static_cast<std::string>(argv[1]) + "_" + filename + ".json");

#ifdef PARSER_PRINT_MODE

    std::cout << "this is #" << idx << " out of the " << miniprogram_list.size() << " miniprograms" << std::endl;
    std::cout << "surveying miniprogram " << first_miniprogram_path << std::endl
              << std::endl;
#endif

    const std::filesystem::path first_miniprogram_app_json_path = static_cast<std::filesystem::path>(first_miniprogram_path) / static_cast<std::filesystem::path>("app.json");
    // std::cout << first_miniprogram_app_json_path.string() << std::endl;

    std::vector<std::string> path_list = get_json_info(first_miniprogram_app_json_path);

#ifdef PARSER_JSON_MODE
    nlohmann::json miniprogram_json;
#endif

    for (const std::string &page_path : path_list)
    {

#ifdef PARSER_PRINT_MODE
        std::cout << page_path << std::endl;
#endif

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
            Web::WXMLDocumentParser parser(page_path, u32_content);
            parser.run();
#ifdef PARSER_PRINT_MODE
            parser.print_all_bind_elements();
#endif

#ifdef PARSER_JSON_MODE
            miniprogram_json[page_path] = parser.get_all_bind_elements();
#endif
        }
        catch (const std::runtime_error &e)
        {
            std::cerr << "runtime error at page access " << page_path << std::endl;
            std::cerr << e.what() << std::endl;
            continue;
        }

#endif

#ifdef PARSER_PRINT_MODE
        std::cout << std::endl
                  << std::endl;
#endif

        file.close();
    }

#ifdef PARSER_JSON_MODE
    std::ofstream file(json_dump_dir_first_miniprogram);
    if (file.is_open())
    {
        file << miniprogram_json.dump(4); // Pretty-print with 4 spaces indentation
        file.close();
        std::cout << "JSON data successfully written to " << json_dump_dir_first_miniprogram << std::endl;
    }
    else
    {
        std::cerr << "Failed to open the file." << std::endl;
        return 1;
    }
#endif

    return 0;
}