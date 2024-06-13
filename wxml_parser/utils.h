#ifndef UTILS_H
#define UTILS_H

#include <iostream>
#include <sstream>
#include <locale>
#include <codecvt>
#include <stack>
#include <regex>

#include "Node.h"
#include "Event.h"

#define TAB U'\u0009'
#define BELL U'\u0007'
#define LINE_FEED U'\u000A'
#define FORM_FEED U'\u000C'
#define CARRIAGERETURN U'\u000D'

#define SPACE U'\u0020'
#define EXCLAMATION_MARK U'\u0021'
#define QUOTATION_MARK U'\u0022'
#define NUMBER_SIGN U'\u0023'
#define AMPERSAND U'\u0026'
#define APOSTROPHE U'\u0027'
#define HYPHEN_MINUS U'\u002D'
#define SOLIDUS U'\u002F'

#define LESS_THAN U'\u003C'
#define EQUAL_SIGN U'\u003D'
#define GREATER_THAN U'\u003E'
#define QUESTION_MARK U'\u003F'

#define RIGHT_SQUARE_BRACKET U'\u005D'

#define END_OF_ELEMENT "<EndOfElement>\n"
#define INTERGER_TYPE "<IntegerType>"
#define FLOAT_TYPE "<FloatType>"
#define BOOLEAN_TYPE "<BooleanType>"
#define START_OF_ARR "<StartOfArray>"
#define END_OF_ARR "<EndOfArray>"

#define SWITCH_TO(new_state)          \
    will_switch_to(State::new_state); \
    m_state = State::new_state;       \
    m_current_input_character = next_codepoint();

#define RECONSUME_IN(new_state)          \
    will_reconsume_in(State::new_state); \
    m_state = State::new_state;

#define GOTO_WITH_SWITCH(new_state) \
    SWITCH_TO(new_state)            \
    goto new_state

#define GOTO_WITH_RECONSUME(new_state) \
    RECONSUME_IN(new_state)            \
    goto new_state

#define SWITCH_TO_OR_RECONSUME_IN_WITH_STATE_NAME(state_name, is_switch) \
    m_state = state_name;                                                \
    if (is_switch)                                                       \
    {                                                                    \
        will_switch_to(state_name);                                      \
        m_current_input_character = next_codepoint();                    \
    }                                                                    \
    else                                                                 \
    {                                                                    \
        will_reconsume_in(state_name);                                   \
    }

#define CREATE_NEW_TOKEN_AND_SWITCH(token_type, new_state)                                    \
    std::optional<HTMLToken> potential_token = create_new_token(HTMLToken::Type::token_type); \
    if (potential_token.has_value())                                                          \
    {                                                                                         \
        SWITCH_TO(new_state);                                                                 \
        return potential_token.value();                                                       \
    }                                                                                         \
    GOTO_WITH_SWITCH(TagName);

#define CREATE_NEW_TOKEN_AND_RECONSUME(token_type, new_state)                                 \
    std::optional<HTMLToken> potential_token = create_new_token(HTMLToken::Type::token_type); \
    if (potential_token.has_value())                                                          \
    {                                                                                         \
        RECONSUME_IN(new_state);                                                              \
        return potential_token.value();                                                       \
    }                                                                                         \
    GOTO_WITH_RECONSUME(TagName);

#define CREATE_NEW_TOKEN_AND_EMIT_WITH_SWITCH(token_type, new_state)                          \
    std::optional<HTMLToken> potential_token = create_new_token(HTMLToken::Type::token_type); \
    m_current_token.m_doctype.m_force_quirks_flag = true;                                     \
    if (potential_token.has_value())                                                          \
    {                                                                                         \
        SWITCH_TO(OneTokBeforeNextState);                                                     \
        m_next_pos_state = State::new_state;                                                  \
        return potential_token.value();                                                       \
    }                                                                                         \
    else                                                                                      \
    {                                                                                         \
        SWITCH_TO(new_state);                                                                 \
        return emit_current_token();                                                          \
    }

#define CREATE_NEW_TOKEN_AND_EMIT_WITH_RECONSUME(token_type, new_state)                       \
    std::optional<HTMLToken> potential_token = create_new_token(HTMLToken::Type::token_type); \
    m_current_token.m_doctype.m_force_quirks_flag = true;                                     \
    if (potential_token.has_value())                                                          \
    {                                                                                         \
        RECONSUME_IN(OneTokBeforeNextState);                                                  \
        m_next_pos_state = State::new_state;                                                  \
        return potential_token.value();                                                       \
    }                                                                                         \
    else                                                                                      \
    {                                                                                         \
        RECONSUME_IN(new_state);                                                              \
        return emit_current_token();                                                          \
    }

#define DONT_CONSUME_NEXT_INPUT_CHARACTER \
    --m_cursor;

#define IGNORE_CHARACTER_AND_CONTINUE \
    ;                                 \
    (state) SWITCH_TO(state)

#define ON(codepoint) \
    if (m_current_input_character.has_value() && m_current_input_character.value() == codepoint)

#define ON_WHITESPACE                                           \
    if (m_current_input_character.has_value() &&                \
        (m_current_input_character.value() == TAB ||            \
         m_current_input_character.value() == BELL ||           \
         m_current_input_character.value() == LINE_FEED ||      \
         m_current_input_character.value() == FORM_FEED ||      \
         m_current_input_character.value() == CARRIAGERETURN || \
         m_current_input_character.value() == SPACE))

#define ON_ASCII_ALPHA                                                                                         \
    if (m_current_input_character.has_value() &&                                                               \
        ((m_current_input_character.value() >= U'\u0041' && m_current_input_character.value() <= U'\u005A') || \
         (m_current_input_character.value() >= U'\u0061' && m_current_input_character.value() <= U'\u007A')))

#define ON_ASCII_ALPHANUMERIC                                                                                  \
    if (m_current_input_character.has_value() &&                                                               \
        ((m_current_input_character.value() >= U'\u0041' && m_current_input_character.value() <= U'\u005A') || \
         (m_current_input_character.value() >= U'\u0061' && m_current_input_character.value() <= U'\u007A') || \
         (m_current_input_character.value() >= U'\u0030' && m_current_input_character.value() <= U'\u0039')))

#define ON_EOF \
    if (!m_current_input_character.has_value())

#define ON_APPROPRIATE_END_TAG               \
    if (!m_last_emitted_start_tag.empty() && \
        m_current_token.m_tag.tag_name == m_last_emitted_start_tag.top())

#define ANYTHING_ELSE \
    if (m_current_input_character.has_value())

#define BEGIN_STATE(state) \
    state : case (State::state):

#define END_STATE         \
    ASSERT_NOT_REACHED(); \
    break;

#define EMIT_EOF_AND_RETURN                              \
    m_current_token = {};                                \
    m_current_token.m_type = HTMLToken::Type::EndOfFile; \
    m_state = State::EOFAndReturn;                       \
    return emit_current_token();

#define EMIT_BUFFER                                             \
    for (long unsigned int i = 0; i < m_temp_buf.length(); i++) \
    {                                                           \
        accumulate_character_token(m_temp_buf[i]);              \
    }                                                           \
    m_temp_buf = utf8ToUtf32("");

#define FLUSH_CODE_POINTS_CONSUMED_AS_CHAR_REF                      \
    if ((m_return_state == State::AttributeValueDoubleQuoted) ||    \
        (m_return_state == State::AttributeValueSingleQuoted) ||    \
        (m_return_state == State::AttributeValueUnquoted))          \
    {                                                               \
        for (long unsigned int i = 0; i < m_temp_buf.length(); i++) \
        {                                                           \
            m_attribute_buf.append_value(                           \
                char32ToString(                                     \
                    m_current_input_character.value()));            \
        }                                                           \
    }                                                               \
    else                                                            \
    {                                                               \
        for (long unsigned int i = 0; i < m_temp_buf.length(); i++) \
        {                                                           \
            accumulate_character_token(                             \
                m_current_input_character.value());                 \
        }                                                           \
    }

namespace Web
{
    // used to convert between char32_t and char
    std::string replaceInvalidUtf8(const std::string &input);
    std::string utf32ToUtf8(const std::u32string &utf32Str);
    std::u32string utf8ToUtf32(const std::string &utf8Str);
    std::string char32ToString(char32_t ch);

    // used to print out auxiliary data
    void print_per_char_string(const std::string utf8_string);
    void print_ast(Node *node, int depth = 0);
    void get_ast(Node *node, std::stringstream *buffer, int depth = 0);
    void print_bind_elements(Node *node,
                             // std::vector<std::tuple<std::string, std::string, Node *>> *storage,
                             int identifier = 0);
    void get_bind_element_json(Node *node, nlohmann::json *json_array);

    // used to split script data and non-script data
    std::vector<std::tuple<std::string, bool>> segment_string(const std::string &text);

    std::string stripout_bubbling_event(const std::string &bind_name);
    std::string convert_double_to_string(const double double_num);

    std::string modify_attribute_name(const std::string &attribute_name);

    void get_all_form_components(Node *root_node,
                                 std::vector<std::tuple<std::string, std::string>> *data);
}

#endif // UTILS_H