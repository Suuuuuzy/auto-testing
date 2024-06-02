#include "WXMLDocumentParser.h"

namespace Web
{

    WXMLDocumentParser::WXMLDocumentParser() : m_root(new RootNode()), m_stack_of_open_elements(std::stack<RootNode *>()),
                                               m_bind_storage(std::vector<std::tuple<std::string, std::string, Node *>>())
    {
    }

    WXMLDocumentParser::WXMLDocumentParser(const std::u32string &input) : WXMLDocumentParser()
    {
        m_tokenizer.insert_input_text(input);
    }

    void WXMLDocumentParser::run(bool print_ast_flag)
    {
        assert(!m_ran_through);
        HTMLToken token = HTMLToken();
        bool loop_flag = true;
        m_stack_of_open_elements.push(m_root);
        do
        {
            token = m_tokenizer.next_token();

#ifdef PARSER_DEBUG_TOKEN
            std::cout << " MODE: " << insertion_mode_name() << " EMIT: " << token.to_string() << std::endl;
#endif

            switch (token.m_type)
            {
            case (HTMLToken::Type::StartTag):
            {
                ElementWrapperNode *element_node = new ElementWrapperNode(token.get_tag_meta_info());
                m_stack_of_open_elements.top()->add_root_child(element_node);
                for (Attribute attr : token.m_tag.attributes)
                {
                    element_node->add_child(new AttributeNode(attr.name(), attr.value()));
                }
                if (element_node->has_end_tag())
                    m_stack_of_open_elements.push(element_node);
            }
            break;
            case (HTMLToken::Type::EndTag):
            {
                assert(token.m_tag.tag_name == m_stack_of_open_elements.top()->get_name());
                for (Attribute attr : token.m_tag.attributes)
                {
                    m_stack_of_open_elements.top()->add_child(new AttributeNode(attr.name(), attr.value()));
                }
                m_stack_of_open_elements.pop();
            }
            break;
            case (HTMLToken::Type::Character):
            {
                for (std::tuple<std::string, bool> segment : segment_string(token.m_comment_or_character.data))
                {
                    m_stack_of_open_elements.top()->add_child(new DataNode(std::get<0>(segment), std::get<1>(segment)));
                }
            }
            break;
            case (HTMLToken::Type::Comment):
            {
            }
            break;
            case (HTMLToken::Type::DOCTYPE):
            {
            }
            break;
            case (HTMLToken::Type::EndOfFile):
            {
                loop_flag = false;
            }
            break;
            default:
                ASSERT_NOT_REACHED();
            }
        } while (loop_flag);

        // clear all references for now
        m_stack_of_open_elements.pop();
        assert(m_stack_of_open_elements.empty());

        m_ran_through = true;
        m_tokenizer.restore();

        if (print_ast_flag)
            print_ast(m_root);
    }

    void WXMLDocumentParser::print_tokens()
    {
        HTMLToken token = HTMLToken();
        m_stack_of_open_elements.push(m_root);
        do
        {
            token = m_tokenizer.next_token();
            std::cout << " EMIT: " << token.to_string() << std::endl;
        } while (token.m_type != HTMLToken::Type::EndOfFile);
        m_tokenizer.restore();
    }
}