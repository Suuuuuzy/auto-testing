#ifndef WXMLDocumentParser_H
#define WXMLDocumentParser_H

#include <cassert>
#include "HTMLTokenizer.h"

namespace Web
{
    class WXMLDocumentParser
    {

    public:
        WXMLDocumentParser(const std::string &page_name = "");
        WXMLDocumentParser(const std::string &page_name,
                           const std::u32string &input);

        ~WXMLDocumentParser() { delete m_root; }

        HTMLToken next_token() { return m_tokenizer.next_token(); }
        void run(bool print_ast_flag = false);
        void print_tokens();
        void print_all_bind_elements()
        {
            if (!m_ran_through)
                run();

            print_bind_elements(m_root, &m_bind_storage, true);
        }
        nlohmann::json get_all_bind_elements();

        std::string args_for_bind_element(size_t idx);

    private:
        std::string m_pagename;
        RootNode *m_root;
        std::stack<RootNode *> m_stack_of_open_elements;
        std::vector<std::tuple<std::string, std::string, Node *>> m_bind_storage;
        HTMLTokenizer m_tokenizer;
        bool m_ran_through{false};
    };
}

#endif // WXMLDocumentParser_H