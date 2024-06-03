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

    std::string WXMLDocumentParser::args_for_bind_element(size_t idx)
    {
        if (idx >= m_bind_storage.size())
        {
            OUT_OF_INDEX();
        }
        auto bind_info = m_bind_storage[idx];
        std::string bind_method = std::get<0>(bind_info);
        std::string function_call = std::get<1>(bind_info);
        Node *ref_node = std::get<2>(bind_info);

        if (bind_method == "bindtap")
        {
            // Need to find a way to filter the element to tap on
        }

        if (bind_method == "bindclick")
        {
        }

        if (bind_method == "bindchange")
        {
            // used for Input component when input text changes
        }

        if (bind_method == "bindsubmit")
        {
            // used for Form component when the form is submitted
        }

        if (bind_method == "bindreset")
        {
        }

        if (bind_method == "bindconfirm")
        {
            // Input component?
        }

        if (bind_method == "bindended")
        {
            // video component?
        }

        if (bind_method == "bindplay")
        {
        }

        if (bind_method == "bindpause")
        {
        }

        if (bind_method == "bindprogress")
        {
        }

        if (bind_method == "bindwaiting")
        {
        }

        if (bind_method == "bindinput")
        {
            // used for Input component
        }

        if (bind_method == "bindkeyboardheightchange")
        {
            // input?
        }

        if (bind_method == "bindtouchend")
        {
        }

        if (bind_method == "bindtouchmove")
        {
        }

        if (bind_method == "bindtouchstart")
        {
        }

        if (bind_method == "bindlongpress")
        {
        }

        if (bind_method == "bindlongtap")
        {
        }

        if (bind_method == "bindgetuserinfo")
        {
        }

        if (bind_method == "bindgetphonenumber")
        {
        }

        if (bind_method == "bindcontact")
        {
        }

        if (bind_method == "bindscroll")
        {
        }

        if (bind_method == "bindscrolltoupper")
        {
        }

        if (bind_method == "bindscrolltolower")
        {
        }

        if (bind_method == "bindrefresherrefresh")
        {
            // scroll-view?
        }

        if (bind_method == "bindblur")
        {
            // Input component?
        }

        if (bind_method == "bindfocus")
        {
        }

        if (bind_method == "bindlabeltap")
        {
            // Map component?
        }

        if (bind_method == "bindmarkertap")
        {
            // Map component?
        }

        if (bind_method == "bindcontroltap")
        {
        }

        if (bind_method == "bindregionchange")
        {
        }

        if (bind_method == "bindload")
        {
            // Image component?
        }

        if (bind_method == "bindimageload")
        {
            // image cropper?
        }

        if (bind_method == "bindregionchange")
        {
        }

        if (bind_method == "bindcolumnchange")
        {
            // Picker component?
        }

        if (bind_method == "bind:doswitchmember")
        {
        }

        if (bind_method == "bind:cancelevent")
        {
            // dialog Component?
        }

        if (bind_method == "bind:confirmevent")
        {
            // dialog Component?
        }

        if (bind_method == "bind:countdownevent")
        {
            // countdown Component?
        }

        if (bind_method == "bindcustomevent")
        {
        }

        if (bind_method == "bindstatepagebtnclick")
        {
            // some kind of page data?
            // seems to belong to page-state element
        }

        if (bind_method == "binderror")
        {
        }

        if (bind_method == "bindclose")
        {
        }

        if (bind_method == "bindcontact")
        {
        }

        if (bind_method == "bindmessage")
        {
            // web-view?
        }

        if (bind_method == "bindopensetting")
        {
        }

        if (bind_method == "bindtitle")
        {
        }

        if (bind_method == "bindbuttontap")
        {
        }

        if (bind_method == "binddelete")
        {
        }

        if (bind_method == "bindsuccess")
        {
        }

        if (bind_method == "bind:middle")
        {
            // scroll box?
        }

        if (bind_method == "bind:bottom")
        {
            // scroll box?
        }

        if (bind_method == "bind:top")
        {
        }

        if (bind_method == "bind:payok")
        {
        }

        if (bind_method == "bind:clear")
        {
        }

        if (bind_method == "bind:search")
        {
        }
    }
}