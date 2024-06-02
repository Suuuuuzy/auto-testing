#ifndef HTMLTOKEN_H
#define HTMLTOKEN_H

#include "Attriute.h"
#include <cassert>
#include <cctype>
#include <sstream>
#include <iostream>
#include <stdexcept>
#include <tuple>
#include <vector>
#include <algorithm>

#define ASSERT_NOT_REACHED() \
    throw std::runtime_error("Token Type not reached.");

#define ERROREOUS_END_TAG() \
    throw std::runtime_error("Erroreous end tag.");

#define ENUMERATE_COMPONENTS                         \
    __ENUMERATE_COMPONENT(cover_image)               \
    __ENUMERATE_COMPONENT(cover_view)                \
    __ENUMERATE_COMPONENT(match_media)               \
    __ENUMERATE_COMPONENT(movable_area)              \
    __ENUMERATE_COMPONENT(movable_view)              \
    __ENUMERATE_COMPONENT(page_container)            \
    __ENUMERATE_COMPONENT(scroll_view)               \
    __ENUMERATE_COMPONENT(share_element)             \
    __ENUMERATE_COMPONENT(swiper)                    \
    __ENUMERATE_COMPONENT(swiper_item)               \
    __ENUMERATE_COMPONENT(view)                      \
    __ENUMERATE_COMPONENT(icon)                      \
    __ENUMERATE_COMPONENT(progress)                  \
    __ENUMERATE_COMPONENT(rich_text)                 \
    __ENUMERATE_COMPONENT(text)                      \
    __ENUMERATE_COMPONENT(button)                    \
    __ENUMERATE_COMPONENT(checkbox)                  \
    __ENUMERATE_COMPONENT(checkbox_group)            \
    __ENUMERATE_COMPONENT(editor)                    \
    __ENUMERATE_COMPONENT(form)                      \
    __ENUMERATE_COMPONENT(input)                     \
    __ENUMERATE_COMPONENT(keyboard_accessory)        \
    __ENUMERATE_COMPONENT(label)                     \
    __ENUMERATE_COMPONENT(picker)                    \
    __ENUMERATE_COMPONENT(picker_view)               \
    __ENUMERATE_COMPONENT(picker_view_column)        \
    __ENUMERATE_COMPONENT(radio)                     \
    __ENUMERATE_COMPONENT(radio_group)               \
    __ENUMERATE_COMPONENT(slider)                    \
    __ENUMERATE_COMPONENT(switch_comp)               \
    __ENUMERATE_COMPONENT(textarea)                  \
    __ENUMERATE_COMPONENT(fucntional_page_navigator) \
    __ENUMERATE_COMPONENT(navigator)                 \
    __ENUMERATE_COMPONENT(audio)                     \
    __ENUMERATE_COMPONENT(camera)                    \
    __ENUMERATE_COMPONENT(image)                     \
    __ENUMERATE_COMPONENT(live_player)               \
    __ENUMERATE_COMPONENT(live_pusher)               \
    __ENUMERATE_COMPONENT(video)                     \
    __ENUMERATE_COMPONENT(voip_room)                 \
    __ENUMERATE_COMPONENT(map)                       \
    __ENUMERATE_COMPONENT(canvas)                    \
    __ENUMERATE_COMPONENT(web_view)                  \
    __ENUMERATE_COMPONENT(ad)                        \
    __ENUMERATE_COMPONENT(ad_custom)                 \
    __ENUMERATE_COMPONENT(official_account)          \
    __ENUMERATE_COMPONENT(open_data)                 \
    __ENUMERATE_COMPONENT(native_component)          \
    __ENUMERATE_COMPONENT(aria_component)            \
    __ENUMERATE_COMPONENT(navigation_bar)            \
    __ENUMERATE_COMPONENT(page_meta)                 \
    __ENUMERATE_COMPONENT(import)

namespace Web
{
    class HTMLToken
    {
        friend class HTMLTokenizer;
        friend class WXMLDocumentParser;

    public:
        enum class Type
        {
            DOCTYPE,
            StartTag,
            EndTag,
            Comment,
            Character,
            EndOfFile
        };

        HTMLToken();
        Type type() const { return m_type; }
        std::tuple<std::string, bool> get_tag_meta_info() const;
        std::string to_string() const;
        bool is_tag() const;

    private:
        enum class ComponentsTag
        {
#define __ENUMERATE_COMPONENT(x) x,
            ENUMERATE_COMPONENTS
#undef __ENUMERATE_COMPONENT
        };

        std::string comp_name(ComponentsTag comp)
        {
            switch (comp)
            {
#define __ENUMERATE_COMPONENT(x)                                                  \
    case ComponentsTag::x:                                                        \
    {                                                                             \
        std::string tag_identifier = #x;                                          \
        if (tag_identifier == "switch_comp")                                      \
        {                                                                         \
            tag_identifier = "switch";                                            \
        }                                                                         \
        else                                                                      \
        {                                                                         \
            std::replace(tag_identifier.begin(), tag_identifier.end(), '_', '-'); \
        }                                                                         \
        return tag_identifier;                                                    \
    }

                ENUMERATE_COMPONENTS

#undef __ENUMERATE_COMPONENT
            default:
                ASSERT_NOT_REACHED();
            }
        }

        Type m_type{Type::EndOfFile};

        // TYPE::DOCTYPE
        struct
        {
            std::string m_name;
            std::string m_doctype_public_identifier;
            std::string m_doctype_system_idenfier;

            bool m_force_quirks_flag{false};

        } m_doctype;

        // TYPE::StartTag
        // TYPE::ENdTag
        struct
        {
            std::string tag_name;
            bool self_closing{false};
            std::vector<Attribute> attributes{std::vector<Attribute>()};
        } m_tag;

        // Type::Comment
        // Type::Character
        struct
        {
            std::string data;
        } m_comment_or_character;
    };
}

#endif // HTMLTOKEN_H