#include "HTMLToken.h"

namespace Web
{

    HTMLToken::HTMLToken() {}

    std::string HTMLToken::to_string() const
    {
        std::string builder = "";
        switch (m_type)
        {
        case HTMLToken::Type::DOCTYPE:
        {
            builder.append("DOCTYPE");
            builder.append(" { doctype name: ");
            builder.append(m_doctype.m_name);
            builder.append(" } ");
        }
        break;
        case HTMLToken::Type::StartTag:
        {
            builder.append("StartTag");
            builder.append(" { tag name: ");
            builder.append(m_tag.tag_name);
            builder.append(" } ");
            builder.append(" {attribute sets: ");
            for (long unsigned int i = 0; i < m_tag.attributes.size(); ++i)
            {
                builder.append("< ");
                builder.append(m_tag.attributes[i].name());
                builder.append(" : ");
                builder.append(m_tag.attributes[i].value());
                builder.append("> ");
            }
            builder.append(" }");
        }
        break;
        case HTMLToken::Type::EndTag:
        {
            builder.append("EndTag");
            builder.append(" { tag name: ");
            builder.append(m_tag.tag_name);
            builder.append(" } ");
            builder.append(" {attribute sets: ");
            for (long unsigned int i = 0; i < m_tag.attributes.size(); ++i)
            {
                builder.append("< ");
                builder.append(m_tag.attributes[i].name());
                builder.append(" : ");
                builder.append(m_tag.attributes[i].value());
                builder.append("> ");
            }
            builder.append(" }");
        }
        break;
        case HTMLToken::Type::Comment:
        {
            builder.append("Comment");
            builder.append(" { comment data: ");
            builder.append(m_comment_or_character.data);
            builder.append(" } ");
        }
        break;
        case HTMLToken::Type::Character:
        {
            builder.append("Character");
            builder.append(" { character data: ");
            builder.append(m_comment_or_character.data);
            builder.append(" } ");
        }
        break;

        case HTMLToken::Type::EndOfFile:
        {
            builder.append("EndOfFile");
        }
        break;
        default:
            break;
        }
        return builder;
    }

    std::tuple<std::string, bool> HTMLToken::get_tag_meta_info() const
    {
        assert((m_type == Type::StartTag) || (m_type == Type::EndTag));
        return std::tuple(m_tag.tag_name, m_tag.self_closing);
    }

    bool HTMLToken::is_tag() const
    {
        /*
#define __ENUMERATE_COMPONENT(x)                           \
    {                                                      \
        if (m_tag.tag_name == comp_name(ComponentsTag::x)) \
            return true;                                   \
    }

        ENUMERATE_COMPONENTS

#undef __ENUMERATE_COMPONENT
        return false;
        */
        for (char tag_char : m_tag.tag_name)
        {
            if (!std::islower(tag_char) && !(tag_char == '-') && !(tag_char == '_'))
                return false;
        }
        return true;
    }
}