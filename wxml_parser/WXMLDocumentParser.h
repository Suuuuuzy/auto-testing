#ifndef WXMLDocumentParser_H
#define WXMLDocumentParser_H

#include <cassert>
#include "HTMLTokenizer.h"

#define SET_DEFAUKT_CURRENTTARGET()                            \
    EventTarget default_current_event_target;                  \
    event_instance.m_current_target.has_current_target = true; \
    event_instance.m_current_target.m_current_target_properties = default_current_event_target;

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

            print_bind_elements(m_root);
        }
        nlohmann::json get_all_bind_elements();

        nlohmann::json get_all_bind_element_args();

    private:
        EventInstance args_for_bind_element(size_t idx);

        std::string m_pagename;
        RootNode *m_root;
        std::stack<RootNode *> m_stack_of_open_elements;
        std::vector<std::tuple<std::string, std::string, ElementWrapperNode *>> m_bind_storage;
        std::vector<std::string> m_binding_events;
        HTMLTokenizer m_tokenizer;
        bool m_ran_through{false};
    };
}

#endif // WXMLDocumentParser_H