#include "HTMLTokenizer.h"

// #define TOKENIZER_DEBUG_STATES
#define TOKENIZER_DEBUG_TAGS

#define __ENUMERATE_TOKENIZER_STATE(x) \
    case State::x:                     \
        goto x;

#define GOTO_WITH_SWITCH_TO_OR_RECONSUME_IN_WITH_STATE_NAME(state_name, is_switch) \
    m_state = state_name;                                                          \
    if (is_switch)                                                                 \
    {                                                                              \
        will_switch_to(state_name);                                                \
        m_current_input_character = next_codepoint();                              \
    }                                                                              \
    else                                                                           \
    {                                                                              \
        will_reconsume_in(state_name);                                             \
    }                                                                              \
    switch (state_name)                                                            \
    {                                                                              \
        ENUMERATE_TOKENIZER_STATES                                                 \
    }

namespace Web
{
    HTMLTokenizer::HTMLTokenizer() : m_current_input_character(std::nullopt),
                                     m_last_emitted_start_tag(
                                         std::stack<std::string>())
    {
    }

    HTMLTokenizer::HTMLTokenizer(const std::u32string &input) : HTMLTokenizer()
    {
        m_input = input;
        m_current_input_character = next_codepoint();
    }

    void HTMLTokenizer::insert_input_text(const std::u32string &input)
    {
        if (m_input.length() == 0)
        {
            m_input = input;
        }
        m_current_input_character = next_codepoint();
    }

    std::optional<char32_t> HTMLTokenizer::next_codepoint()
    {
        if (m_cursor >= m_input.length())
            return std::nullopt;
        return m_input[m_cursor++];
    }

    std::optional<char32_t> HTMLTokenizer::peek_codepoint(size_t offset) const
    {
        if (m_cursor >= m_input.length())
            return std::nullopt;
        return m_input[m_cursor + offset];
    }

    HTMLToken HTMLTokenizer::emit_current_token()
    {
        if (m_current_token.type() == HTMLToken::Type::StartTag &&
            !m_current_token.m_tag.self_closing)
            will_push_starttag(m_current_token.m_tag.tag_name);

        if (m_current_token.type() == HTMLToken::Type::EndTag)
            will_pop_endtag(m_current_token.m_tag.tag_name);

        HTMLToken return_token = m_current_token;
        m_current_token = {};
        return return_token;
    }

    HTMLToken HTMLTokenizer::next_token()
    {
        for (;;)
        {
            /*
#ifdef TOKENIZER_DEBUG_STATES
            if (!m_current_input_character.has_value())
            {
                std::cout << "current token EOF" << std::endl;
            }
            else
            {
                std::cout << "current token " << char32ToString(m_current_input_character.value()) << std::endl;
            }
#endif
*/
            switch (m_state)
            {
                BEGIN_STATE(Data)
                {
                    // SPECIAL CASE FOR WXML:
                    // maybe it is relevant but it is not very used by the current aim of the parser
                    // so it is currently neglected
                    /*
                    ON(AMPERSAND)
                    {
                        m_return_state = State::Data;
                        SWITCH_TO(CharacterReference);
                    }
                    */
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(TagOpen);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(RCDATA)
                {
                    // SPECIAL CASE FOR WXML:
                    // maybe it is relevant but it is not very used by the current aim of the parser
                    // so it is currently neglected
                    /*
                    ON(AMPERSAND)
                    {
                        m_return_state = State::RCDATA;
                        SWITCH_TO(CharacterReference);
                    }
                    */
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(RCDATALessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(RAWTEXT)
                {
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(RAWTEXTLessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptData)
                {
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(ScriptDataLessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(PLAINTEXT)
                {
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(TagOpen)
                {
                    ON(EXCLAMATION_MARK)
                    {
                        GOTO_WITH_SWITCH(MarkupDeclarationOpen);
                    }
                    ON(SOLIDUS)
                    {
                        GOTO_WITH_SWITCH(EndTagOpen);
                    }
                    ON_ASCII_ALPHA
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(StartTag, TagName);
                        m_current_token.m_comment_or_character.data.append(char32ToString(LESS_THAN));
                    }
                    ON(QUESTION_MARK)
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(Comment, BogusComment);
                    }
                    ON_EOF
                    {
                        accumulate_character_token(LESS_THAN);
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_RECONSUME(Data);
                    }
                }
                END_STATE
                BEGIN_STATE(EndTagOpen)
                {
                    ON_ASCII_ALPHA
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(EndTag, TagName);
                    }
                    ON(GREATER_THAN)
                    {
                        GOTO_WITH_SWITCH(Data);
                    }
                    ON_EOF
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(Comment, BogusComment);
                    }
                }
                END_STATE
                BEGIN_STATE(TagName)
                {
                    ON_WHITESPACE
                    {

                        // if (m_current_token.is_tag())
                        //{
                        GOTO_WITH_SWITCH(BeforeAttributeName);
                        /*
                   }
                   else
                   {

                   m_current_token.m_type = HTMLToken::Type::Character;
                   GOTO_WITH_SWITCH(Data);
                   } */
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        if (!m_current_token.is_tag())
                        {
                            std::stringstream ss;
                            ss << (m_current_token.m_type == HTMLToken::Type::StartTag ? "<" : "</")
                               << m_current_token.m_tag.tag_name << ">";
                            m_current_token.m_comment_or_character.data.append(ss.str());
                            m_current_token.m_type = HTMLToken::Type::Character;
                        }
                        return emit_current_token();
                    }
                    ON_ASCII_ALPHA
                    {
                        m_current_token.m_tag.tag_name.append(char32ToString(
                            switch_char_to_lower_case(m_current_input_character.value())));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_tag.tag_name.append(char32ToString(m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(RCDATALessThanSign)
                {
                    ON(SOLIDUS)
                    {
                        m_temp_buf = utf8ToUtf32("");
                        GOTO_WITH_SWITCH(RCDATAEndTagOpen);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_RECONSUME(RCDATA);
                    }
                }
                END_STATE
                BEGIN_STATE(RCDATAEndTagOpen)
                {
                    ON_ASCII_ALPHA
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(EndTag, RCDATAEndTagName);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        GOTO_WITH_RECONSUME(RCDATA);
                    }
                }
                END_STATE
                BEGIN_STATE(RCDATAEndTagName)
                {
                    ON_WHITESPACE
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            GOTO_WITH_SWITCH(BeforeAttributeName);
                        }
                    }
                    ON(SOLIDUS)
                    {
                        ON_APPROPRIATE_END_TAG
                        {

                            GOTO_WITH_SWITCH(SelfClosingStartTag);
                        }
                    }
                    ON(GREATER_THAN)
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            SWITCH_TO(Data);
                            return emit_current_token();
                        }
                    }
                    ON_ASCII_ALPHA
                    {
                        char32_t lower_case_ascii = switch_char_to_lower_case(m_current_input_character.value());
                        m_current_token.m_tag.tag_name.append(char32ToString(lower_case_ascii));
                        m_temp_buf.append(std::u32string(1, m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        EMIT_BUFFER
                        GOTO_WITH_RECONSUME(RAWTEXT);
                    }
                }
                END_STATE
                BEGIN_STATE(RAWTEXTLessThanSign)
                {
                    ON(SOLIDUS)
                    {
                        m_temp_buf = utf8ToUtf32("");
                        GOTO_WITH_SWITCH(RAWTEXTEndTagOpen);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_RECONSUME(RAWTEXT);
                    }
                }
                END_STATE
                BEGIN_STATE(RAWTEXTEndTagOpen)
                {
                    ON_ASCII_ALPHA
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(EndTag, RAWTEXTEndTagName);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        GOTO_WITH_RECONSUME(RAWTEXT);
                    }
                }
                END_STATE
                BEGIN_STATE(RAWTEXTEndTagName)
                {
                    ON_WHITESPACE
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            GOTO_WITH_RECONSUME(BeforeAttributeName);
                        }
                    }
                    ON(SOLIDUS)
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            GOTO_WITH_SWITCH(SelfClosingStartTag);
                        }
                    }
                    ON(GREATER_THAN)
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            SWITCH_TO(Data);
                            return emit_current_token();
                        }
                    }
                    ON_ASCII_ALPHA
                    {
                        char32_t current_lowered_ascii = switch_char_to_lower_case(m_current_input_character.value());
                        m_current_token.m_tag.tag_name.append(char32ToString(current_lowered_ascii));
                        m_temp_buf.append(std::u32string(1, m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        EMIT_BUFFER;
                        GOTO_WITH_RECONSUME(RAWTEXT);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataLessThanSign)
                {
                    ON(SOLIDUS)
                    {
                        m_temp_buf = utf8ToUtf32("");
                        GOTO_WITH_SWITCH(ScriptDataEndTagOpen);
                    }
                    ON(EXCLAMATION_MARK)
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(EXCLAMATION_MARK);
                        GOTO_WITH_SWITCH(ScriptDataEscapeStart);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_RECONSUME(ScriptData);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEndTagOpen)
                {
                    ON_ASCII_ALPHA
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(EndTag, ScriptDataEndTagName);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        GOTO_WITH_RECONSUME(ScriptData);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEndTagName)
                {
                    ON_WHITESPACE
                    {
                        ON_APPROPRIATE_END_TAG
                        {

                            GOTO_WITH_SWITCH(BeforeAttributeName);
                        }
                    }
                    ON(SOLIDUS)
                    {
                        ON_APPROPRIATE_END_TAG
                        {

                            GOTO_WITH_SWITCH(SelfClosingStartTag);
                        }
                    }
                    ON(GREATER_THAN)
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            SWITCH_TO(Data);
                            return emit_current_token();
                        }
                    }
                    ON_ASCII_ALPHA
                    {
                        char32_t current_lowered_ascii = switch_char_to_lower_case(m_current_input_character.value());
                        m_current_token.m_tag.tag_name.append(char32ToString(current_lowered_ascii));
                        m_temp_buf.append(std::u32string(1, m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        EMIT_BUFFER
                        GOTO_WITH_RECONSUME(ScriptData);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapeStart)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        GOTO_WITH_SWITCH(ScriptDataEscapeStartDash);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(ScriptData);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapeStartDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        GOTO_WITH_SWITCH(ScriptDataEscapedDashDash);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(ScriptData);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscaped)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        GOTO_WITH_SWITCH(ScriptDataEscapedDash);
                    }
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(ScriptDataEscapedLessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapedDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        GOTO_WITH_SWITCH(ScriptDataEscapedDashDash);
                    }
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(ScriptDataEscapedLessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        GOTO_WITH_SWITCH(ScriptDataEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapedDashDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(LESS_THAN)
                    {
                        GOTO_WITH_SWITCH(ScriptDataEscapedLessThanSign);
                    }
                    ON(GREATER_THAN)
                    {
                        accumulate_character_token(GREATER_THAN);
                        GOTO_WITH_SWITCH(ScriptData);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        GOTO_WITH_SWITCH(ScriptDataEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapedLessThanSign)
                {
                    ON(SOLIDUS)
                    {
                        m_temp_buf = utf8ToUtf32("");
                        GOTO_WITH_SWITCH(ScriptDataEscapedEndTagOpen);
                    }
                    ON_ASCII_ALPHA
                    {
                        m_temp_buf = utf8ToUtf32("");
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_RECONSUME(ScriptDataDoubleEscapeStart);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_RECONSUME(ScriptDataEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapedEndTagOpen)
                {
                    ON_ASCII_ALPHA
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(EndTag, ScriptDataEscapedEndTagName);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        GOTO_WITH_RECONSUME(ScriptDataEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataEscapedEndTagName)
                {
                    ON_WHITESPACE
                    {
                        ON_APPROPRIATE_END_TAG
                        {

                            GOTO_WITH_SWITCH(BeforeAttributeName);
                        }
                    }
                    ON(SOLIDUS)
                    {
                        ON_APPROPRIATE_END_TAG
                        {

                            GOTO_WITH_SWITCH(SelfClosingStartTag);
                        }
                    }
                    ON(GREATER_THAN)
                    {
                        ON_APPROPRIATE_END_TAG
                        {
                            SWITCH_TO(Data);
                            return emit_current_token();
                        }
                    }
                    ON_ASCII_ALPHA
                    {
                        char32_t current_lowered_ascii = switch_char_to_lower_case(m_current_input_character.value());
                        m_current_token.m_tag.tag_name.append(char32ToString(current_lowered_ascii));
                        m_temp_buf.append(std::u32string(1, m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(LESS_THAN);
                        accumulate_character_token(SOLIDUS);
                        EMIT_BUFFER
                        GOTO_WITH_RECONSUME(ScriptDataEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataDoubleEscapeStart)
                {
                    ON_WHITESPACE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        if (m_temp_buf == utf8ToUtf32("script"))
                        {
                            GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(ScriptDataEscaped);
                        }
                    }
                    ON(SOLIDUS)
                    {
                        accumulate_character_token(m_current_input_character.value());
                        if (m_temp_buf == utf8ToUtf32("script"))
                        {
                            GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(ScriptDataEscaped);
                        }
                    }
                    ON(GREATER_THAN)
                    {
                        accumulate_character_token(m_current_input_character.value());
                        if (m_temp_buf == utf8ToUtf32("script"))
                        {
                            GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(ScriptDataEscaped);
                        }
                    }
                    ON_ASCII_ALPHA
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_temp_buf.append(std::u32string(
                            1, switch_char_to_lower_case(m_current_input_character.value())));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(ScriptDataEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataDoubleEscaped)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscapedDash);
                    }
                    ON(LESS_THAN)
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscapedLessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataDoubleEscapedDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscapedDashDash);
                    }
                    ON(LESS_THAN)
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscapedLessThanSign);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataDoubleEscapedDashDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        accumulate_character_token(HYPHEN_MINUS);
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(LESS_THAN)
                    {
                        accumulate_character_token(LESS_THAN);
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscapedLessThanSign);
                    }
                    ON(GREATER_THAN)
                    {
                        accumulate_character_token(GREATER_THAN);
                        GOTO_WITH_SWITCH(ScriptData);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataDoubleEscapedLessThanSign)
                {
                    ON(SOLIDUS)
                    {
                        m_temp_buf = utf8ToUtf32("");
                        accumulate_character_token(SOLIDUS);
                        GOTO_WITH_SWITCH(ScriptDataDoubleEscapeEnd);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(ScriptDataDoubleEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(ScriptDataDoubleEscapeEnd)
                {
                    ON_WHITESPACE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        if (m_temp_buf == utf8ToUtf32("script"))
                        {
                            GOTO_WITH_SWITCH(ScriptDataEscaped);
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                        }
                    }
                    ON(SOLIDUS)
                    {
                        accumulate_character_token(m_current_input_character.value());
                        if (m_temp_buf == utf8ToUtf32("script"))
                        {
                            GOTO_WITH_SWITCH(ScriptDataEscaped);
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                        }
                    }
                    ON(GREATER_THAN)
                    {
                        accumulate_character_token(m_current_input_character.value());
                        if (m_temp_buf == utf8ToUtf32("script"))
                        {
                            GOTO_WITH_SWITCH(ScriptDataEscaped);
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(ScriptDataDoubleEscaped);
                        }
                    }
                    ON_ASCII_ALPHA
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_temp_buf.append(std::u32string(
                            1, switch_char_to_lower_case(m_current_input_character.value())));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(ScriptDataDoubleEscaped);
                    }
                }
                END_STATE
                BEGIN_STATE(BeforeAttributeName)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(SOLIDUS)
                    {
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }
                    ON(GREATER_THAN)
                    {
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }
                    ON_EOF
                    {
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }
                    ON(EQUAL_SIGN)
                    {
                        m_attribute_buf = Web::Attribute(
                            char32ToString(m_current_input_character.value()), "");
                        GOTO_WITH_SWITCH(AttributeName);
                    }
                    ANYTHING_ELSE
                    {
                        m_attribute_buf = Web::Attribute("", "");
                        GOTO_WITH_RECONSUME(AttributeName);
                    }
                }
                END_STATE
                BEGIN_STATE(AttributeName)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }
                    ON(EQUAL_SIGN)
                    {
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }

                    ON(GREATER_THAN)
                    {
                        // SPECIAL CASE FOR WXML:
                        // wx:else is an attribute in tag that does not require any attriute value
                        // so the current block will abruptly terminate in GREATER_THAN
                        // here leave the consumption task to state AfterAttributeName
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }
                    ON_EOF
                    {
                        GOTO_WITH_RECONSUME(AfterAttributeName);
                    }
                    ON_ASCII_ALPHA
                    {
                        m_attribute_buf.append_name(
                            char32ToString(
                                switch_char_to_lower_case(
                                    m_current_input_character.value())));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        m_attribute_buf.append_name(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AfterAttributeName)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(SOLIDUS)
                    {
                        GOTO_WITH_SWITCH(SelfClosingStartTag);
                    }
                    ON(EQUAL_SIGN)
                    {
                        GOTO_WITH_SWITCH(BeforeAttributeValue);
                    }
                    ON(GREATER_THAN)
                    {
                        // SPECIAL CASE FOR WXML:
                        // wx:else is an attribute in tag that does not require any attriute value
                        // it seems to also happen in other cases, not sure if it is a
                        // decript error or default format
                        if (m_attribute_buf.name() == "wx:else")
                        {
#ifdef TOKENIZER_DEBUG_STATES
                            std::cout << "getting here! wx:else causing problem " << std::endl;
#endif
                        }
                        else
                        {
#ifdef TOKENIZER_DEBUG_STATES
                            std::cout << "nonstandard format attribute name " << m_attribute_buf.name() << std::endl;
#endif
                        }
                        SWITCH_TO(Data);
                        m_current_token.m_tag.attributes.push_back(m_attribute_buf);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_attribute_buf = Attribute("", "");
                        GOTO_WITH_RECONSUME(AttributeName);
                    }
                }
                END_STATE
                BEGIN_STATE(BeforeAttributeValue)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(QUOTATION_MARK)
                    {
                        GOTO_WITH_SWITCH(AttributeValueDoubleQuoted);
                    }
                    ON(APOSTROPHE)
                    {
                        GOTO_WITH_SWITCH(AttributeValueSingleQuoted);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(AttributeValueUnquoted);
                    }
                }
                END_STATE
                BEGIN_STATE(AttributeValueDoubleQuoted)
                {
                    ON(QUOTATION_MARK)
                    {
                        GOTO_WITH_SWITCH(AfterAttributeValueQuoted);
                    }
                    // SPECIAL CASE FOR WXML:
                    // it seems that there is not such thing as AMPERSAND going to reference mode so I will just
                    // delete this for now
                    /*
                    ON(AMPERSAND)
                    {
                        m_return_state = State::AttributeValueDoubleQuoted;
                        SWITCH_TO(CharacterReference);
                    }
                    */
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_attribute_buf.append_value(
                            char32ToString(m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AttributeValueSingleQuoted)
                {
                    ON(APOSTROPHE)
                    {
                        GOTO_WITH_SWITCH(AfterAttributeValueQuoted);
                    }
                    // SPECIAL CASE FOR WXML:
                    // it seems that there is not such thing as AMPERSAND going to reference mode so I will just
                    // delete this for now
                    /*
                    ON(AMPERSAND)
                    {
                        m_return_state = State::AttributeValueSingleQuoted;
                        SWITCH_TO(CharacterReference);
                    }
                    */
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_attribute_buf.append_value(
                            char32ToString(m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AttributeValueUnquoted)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(BeforeAttributeName);
                    }
                    // SPECIAL CASE FOR WXML:
                    // it seems that there is not such thing as AMPERSAND going to reference mode so I will just
                    // delete this for now
                    /*
                    ON(AMPERSAND)
                    {
                        m_return_state = State::AttributeValueUnquoted;
                        SWITCH_TO(CharacterReference);
                    }
                    */
                    ON(GREATER_THAN)
                    {
                        if (m_attribute_buf.name() != "")
                            m_current_token.m_tag.attributes.push_back(m_attribute_buf);
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_attribute_buf.append_value(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AfterAttributeValueQuoted)
                {
                    if (m_attribute_buf.name() != "")
                    {
                        m_current_token.m_tag.attributes.push_back(m_attribute_buf);
                    }
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(BeforeAttributeName);
                    }
                    ON(SOLIDUS)
                    {
                        GOTO_WITH_SWITCH(SelfClosingStartTag);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(BeforeAttributeName);
                    }
                }
                END_STATE
                BEGIN_STATE(SelfClosingStartTag)
                {
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_tag.self_closing = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(BeforeAttributeName);
                    }
                }
                END_STATE
                BEGIN_STATE(BogusComment)
                {
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        GOTO_WITH_RECONSUME(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(MarkupDeclarationOpen)
                {
                    DONT_CONSUME_NEXT_INPUT_CHARACTER
                    if (the_next_few_characters_are("--", false))
                    {
                        consume("--", false);
                        CREATE_NEW_TOKEN_AND_SWITCH(Comment, CommentStart);
                    }
                    if (the_next_few_characters_are("DOCTYPE", false))
                    {
                        consume("DOCTYPE", false);
                        GOTO_WITH_SWITCH(DOCTYPE);
                    }
                    if (the_next_few_characters_are("[CDATA[", false))
                    {
                        consume("[CDATA[", false);

                        /* "Consume those characters. If there is an adjusted current node
                        and it is not an element in the HTML namespace, then
                        switch to the CDATA section state. Otherwise, this is
                        a cdata-in-html-content parse error.
                        Create a comment token whose data is the "[CDATA[" string.
                        Switch to the bogus comment state." -- P1285

                        TODO: TBH I am not very sure what is an "adjusted current node"
                        and it doesn't seem very convenient to implement checking,
                        so for now I will assume that it will always be switching
                        to CDATA section state
                        */
                        GOTO_WITH_SWITCH(CDATASection);
                    }
                    ANYTHING_ELSE
                    {
                        CREATE_NEW_TOKEN_AND_RECONSUME(Comment, BogusComment);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentStart)
                {
                    ON(HYPHEN_MINUS)
                    {
                        GOTO_WITH_SWITCH(CommentStartDash);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentStartDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        GOTO_WITH_SWITCH(CommentEnd);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(HYPHEN_MINUS));
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(Comment)
                {
                    ON(LESS_THAN)
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(m_current_input_character.value()));
                        GOTO_WITH_SWITCH(CommentLessThanSign);
                    }
                    ON(HYPHEN_MINUS)
                    {
                        GOTO_WITH_SWITCH(CommentEndDash);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(CommentLessThanSign)
                {
                    ON(EXCLAMATION_MARK)
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(m_current_input_character.value()));
                        GOTO_WITH_SWITCH(CommentLessThanSignBang);
                    }
                    ON(LESS_THAN)
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentLessThanSignBang)
                {
                    ON(HYPHEN_MINUS)
                    {
                        GOTO_WITH_SWITCH(CommentLessThanSignBangDash);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentLessThanSignBangDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        GOTO_WITH_SWITCH(CommentLessThanSignBangDashDash);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(CommentEndDash);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentLessThanSignBangDashDash)
                {
                    ON_EOF
                    {
                        GOTO_WITH_RECONSUME(CommentEnd);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(CommentEnd);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentEndDash)
                {
                    ON(HYPHEN_MINUS)
                    {
                        GOTO_WITH_SWITCH(CommentEnd);
                    }
                    ON_EOF
                    {
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(HYPHEN_MINUS));
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentEnd)
                {
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON(EXCLAMATION_MARK)
                    {
                        GOTO_WITH_SWITCH(CommentEndBang);
                    }
                    ON(HYPHEN_MINUS)
                    {
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(HYPHEN_MINUS));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON_EOF
                    {
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        for (int i = 0; i < 2; ++i)
                        {
                            m_current_token.m_comment_or_character.data.append(
                                char32ToString(HYPHEN_MINUS));
                        }
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(CommentEndBang)
                {
                    ON(HYPHEN_MINUS)
                    {
                        for (int i = 0; i < 2; ++i)
                        {
                            m_current_token.m_comment_or_character.data.append(
                                char32ToString(HYPHEN_MINUS));
                        }
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(EXCLAMATION_MARK));
                        GOTO_WITH_SWITCH(CommentEndDash);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        for (int i = 0; i < 2; ++i)
                        {
                            m_current_token.m_comment_or_character.data.append(
                                char32ToString(HYPHEN_MINUS));
                        }
                        m_current_token.m_comment_or_character.data.append(
                            char32ToString(EXCLAMATION_MARK));
                        GOTO_WITH_RECONSUME(Comment);
                    }
                }
                END_STATE
                BEGIN_STATE(DOCTYPE)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(BeforeDOCTYPEName);
                    }
                    ON(GREATER_THAN)
                    {
                        GOTO_WITH_RECONSUME(BeforeDOCTYPEName);
                    }
                    ON_EOF
                    {
                        CREATE_NEW_TOKEN_AND_EMIT_WITH_RECONSUME(DOCTYPE, EOFAndReturn);
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(BeforeDOCTYPEName);
                    }
                }
                END_STATE
                BEGIN_STATE(BeforeDOCTYPEName)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON_ASCII_ALPHA
                    {
                        create_new_token(HTMLToken::Type::DOCTYPE);
                        m_current_token.m_doctype.m_name.append(
                            char32ToString(
                                switch_char_to_lower_case(m_current_input_character.value())));
                        GOTO_WITH_SWITCH(DOCTYPEName);
                    }
                    ON(GREATER_THAN)
                    {
                        CREATE_NEW_TOKEN_AND_EMIT_WITH_SWITCH(DOCTYPE, Data);
                        /*
                        std::optional<HTMLToken> potential_token = create_new_token(HTMLToken::Type::DOCTYPE);
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                        */
                    }
                    ON_EOF
                    {
                        CREATE_NEW_TOKEN_AND_EMIT_WITH_RECONSUME(DOCTYPE, EOFAndReturn);
                        /*
                        create_new_token(HTMLToken::Type::DOCTYPE);
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                        */
                    }
                    ANYTHING_ELSE
                    {
                        std::optional<HTMLToken> potential_token = create_new_token(HTMLToken::Type::DOCTYPE);
                        m_current_token.m_doctype.m_name.append(char32ToString(m_current_input_character.value()));
                        if (potential_token.has_value())
                        {
                            SWITCH_TO(DOCTYPEName);
                            return potential_token.value();
                        }
                        else
                        {
                            GOTO_WITH_SWITCH(DOCTYPEName);
                        }
                    }
                }
                END_STATE
                BEGIN_STATE(DOCTYPEName)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(AfterDOCTYPEName);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_ASCII_ALPHA
                    {
                        m_current_token.m_doctype.m_name.append(
                            char32ToString(
                                switch_char_to_lower_case(m_current_input_character.value())));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_name.append(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AfterDOCTYPEName)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        if (the_next_few_characters_are("PUBLIC", true))
                        {
                            consume("PUBLIC", true);
                            GOTO_WITH_SWITCH(AfterDOCTYPEPublicKeyword);
                        }
                        if (the_next_few_characters_are("SYSTEM", true))
                        {
                            consume("SYSTEM", true);
                            GOTO_WITH_SWITCH(AfterDOCTYPESystemKeyword);
                        }
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(AfterDOCTYPEPublicKeyword)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(BeforeDOCTYPEPublicIdentifier);
                    }
                    ON(QUOTATION_MARK)
                    {
                        m_current_token.m_doctype.m_doctype_public_identifier = "";
                        GOTO_WITH_SWITCH(DOCTYPEPublicIdentifierSingleQuoted);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(BeforeDOCTYPEPublicIdentifier)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(QUOTATION_MARK)
                    {
                        m_current_token.m_doctype.m_doctype_public_identifier = "";
                        GOTO_WITH_SWITCH(DOCTYPEPublicIdentifierDoubleQuoted);
                    }
                    ON(APOSTROPHE)
                    {
                        m_current_token.m_doctype.m_doctype_public_identifier = "";
                        GOTO_WITH_SWITCH(DOCTYPEPublicIdentifierSingleQuoted);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(DOCTYPEPublicIdentifierDoubleQuoted)
                {
                    ON(QUOTATION_MARK)
                    {
                        GOTO_WITH_SWITCH(AfterDOCTYPEPublicIdentifier);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_doctype_public_identifier.append(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(DOCTYPEPublicIdentifierSingleQuoted)
                {
                    ON(APOSTROPHE)
                    {
                        GOTO_WITH_SWITCH(AfterDOCTYPEPublicIdentifier);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_doctype_public_identifier.append(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AfterDOCTYPEPublicIdentifier)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(BetweenDOCTYPEPublicAndSystemIdentifiers);
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON(QUOTATION_MARK)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierDoubleQuoted);
                    }
                    ON(APOSTROPHE)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierSingleQuoted);
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(BetweenDOCTYPEPublicAndSystemIdentifiers)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON(QUOTATION_MARK)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierDoubleQuoted);
                    }
                    ON(APOSTROPHE)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierSingleQuoted);
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(AfterDOCTYPESystemKeyword)
                {
                    ON_WHITESPACE
                    {
                        GOTO_WITH_SWITCH(BeforeDOCTYPESystemIdentifier);
                    }
                    ON(QUOTATION_MARK)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierDoubleQuoted);
                    }
                    ON(APOSTROPHE)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierSingleQuoted);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(BeforeDOCTYPESystemIdentifier)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(QUOTATION_MARK)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierDoubleQuoted);
                    }
                    ON(APOSTROPHE)
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier = "";
                        GOTO_WITH_SWITCH(DOCTYPESystemIdentifierSingleQuoted);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(DOCTYPESystemIdentifierDoubleQuoted)
                {
                    ON(QUOTATION_MARK)
                    {
                        GOTO_WITH_SWITCH(AfterDOCTYPESystemIdentifier);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier.append(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(DOCTYPESystemIdentifierSingleQuoted)
                {
                    ON(APOSTROPHE)
                    {
                        GOTO_WITH_SWITCH(AfterDOCTYPESystemIdentifier);
                    }
                    ON(GREATER_THAN)
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_token.m_doctype.m_doctype_system_idenfier.append(
                            char32ToString(
                                m_current_input_character.value()));
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(AfterDOCTYPESystemIdentifier)
                {
                    ON_WHITESPACE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        m_current_token.m_doctype.m_force_quirks_flag = true;
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        GOTO_WITH_RECONSUME(BogusDOCTYPE);
                    }
                }
                END_STATE
                BEGIN_STATE(BogusDOCTYPE)
                {
                    ON(GREATER_THAN)
                    {
                        SWITCH_TO(Data);
                        return emit_current_token();
                    }
                    ON_EOF
                    {
                        RECONSUME_IN(EOFAndReturn);
                        return emit_current_token();
                    }
                    ANYTHING_ELSE
                    {
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                END_STATE
                BEGIN_STATE(CDATASection)
                {
                    ON(RIGHT_SQUARE_BRACKET)
                    {
                        GOTO_WITH_SWITCH(CDATASectionBracket);
                    }
                    ON_EOF
                    {
                        EMIT_EOF_AND_RETURN;
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(m_current_input_character.value());
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                }
                BEGIN_STATE(CDATASectionBracket)
                {
                    ON(RIGHT_SQUARE_BRACKET)
                    {
                        GOTO_WITH_SWITCH(CDATASectionEnd);
                    }
                    ANYTHING_ELSE
                    {
                        accumulate_character_token(RIGHT_SQUARE_BRACKET);
                        GOTO_WITH_RECONSUME(CDATASection);
                    }
                }
                END_STATE
                BEGIN_STATE(CDATASectionEnd)
                {
                    ON(RIGHT_SQUARE_BRACKET)
                    {
                        accumulate_character_token(RIGHT_SQUARE_BRACKET);
                        m_current_input_character = next_codepoint();
                        continue;
                    }
                    ON(GREATER_THAN)
                    {
                        GOTO_WITH_SWITCH(Data);
                    }
                    ANYTHING_ELSE
                    {
                        for (int i = 0; i < 2; ++i)
                        {
                            accumulate_character_token(RIGHT_SQUARE_BRACKET);
                        }
                        GOTO_WITH_RECONSUME(CDATASection);
                    }
                }
                END_STATE
                BEGIN_STATE(CharacterReference)
                {
                    ON_ASCII_ALPHANUMERIC
                    {
                        GOTO_WITH_RECONSUME(NamedCharacterReference);
                    }
                    ON(NUMBER_SIGN)
                    {
                        m_temp_buf.append(
                            std::u32string(
                                1, m_current_input_character.value()));
                        GOTO_WITH_SWITCH(NumericCharacterReference);
                    }
                    ANYTHING_ELSE
                    {
                        FLUSH_CODE_POINTS_CONSUMED_AS_CHAR_REF;
                        GOTO_WITH_SWITCH_TO_OR_RECONSUME_IN_WITH_STATE_NAME(m_return_state, false);
                    }
                }
                END_STATE
                BEGIN_STATE(NamedCharacterReference)
                {
                }
                END_STATE
                /*
                BEGIN_STATE(AmbiguousAmpersand)
                {
                }
                END_STATE
                */
                BEGIN_STATE(NumericCharacterReference)
                {
                }
                END_STATE
                BEGIN_STATE(OneTokBeforeNextState)
                {
                    SWITCH_TO_OR_RECONSUME_IN_WITH_STATE_NAME(m_next_pos_state, false);
                    return emit_current_token();
                }
                END_STATE
                BEGIN_STATE(EOFAndReturn)
                {
                    EMIT_EOF_AND_RETURN;
                }
                END_STATE
            default:
                END_STATE
            }
        }
    }

    void HTMLTokenizer::consume(const std::string &string_lit, bool case_insensitive)
    {
        assert(the_next_few_characters_are(string_lit, case_insensitive));
        m_cursor += string_lit.length();
    }

    std::optional<HTMLToken> HTMLTokenizer::create_new_token(HTMLToken::Type token_type)
    {
        std::optional<HTMLToken> return_token = std::nullopt;
        if (token_type != HTMLToken::Type::Character &&
            m_character_token_flag)
            return_token = emit_current_token();

        m_character_token_flag = false;
        m_current_token = {};
        m_current_token.m_type = token_type;
        return return_token;
    }

    bool HTMLTokenizer::the_next_few_characters_are(const std::string &string_lit, bool case_insensitive) const
    {
        for (size_t i = 0; i < string_lit.length(); ++i)
        {
            auto codepoint = peek_codepoint(i);
            // std::cout << "Peek codepoint " << char32ToString(codepoint.value()) << " expected as " << string_lit[i] << "\n"
            // << std::endl;
            if (!codepoint.has_value())
                return false;

            // FIXME: this should be more unicode-aware

            if (case_insensitive && codepoint.value() != static_cast<char32_t>(string_lit[i]))
                return false;
            if (!case_insensitive &&
                (switch_char_to_lower_case(codepoint.value()) != switch_char_to_lower_case(static_cast<char32_t>(string_lit[i]))))
                return false;
        }
        return true;
    }

    void HTMLTokenizer::accumulate_character_token(std::optional<char32_t> m_current_input_character)
    {
        if (!m_character_token_flag)
        {
            ON_WHITESPACE
            {
                return;
            }
            create_new_token(HTMLToken::Type::Character);
            m_character_token_flag = true;
        }

        m_current_token.m_comment_or_character.data.append(char32ToString(m_current_input_character.value()));
    }

    char32_t HTMLTokenizer::switch_char_to_lower_case(const char32_t &current_input_char) const
    {
        if (current_input_char >= U'A' && current_input_char <= U'Z')
        {
            return current_input_char + 0x0020;
        }
        return current_input_char;
    }

    [[maybe_unused]] void HTMLTokenizer::will_switch_to(State new_state)
    {
#ifdef TOKENIZER_DEBUG_STATES
        std::cout << state_name(m_state) << " switch to new state " << state_name(new_state) << std::endl;
#endif
    }

    [[maybe_unused]] void HTMLTokenizer::will_reconsume_in(State new_state)
    {
#ifdef TOKENIZER_DEBUG_STATES
        std::cout << state_name(m_state) << " reconsume in new state " << state_name(new_state) << std::endl;
#endif
    }

    [[maybe_unused]] void HTMLTokenizer::will_continue()
    {
#ifdef TOKENIZER_DEBUG_STATES
        std::cout << "continue in current state " << state_name(m_state) << std::endl;
#endif
    }

    void HTMLTokenizer::will_pop_endtag(std::string actual_tag_name)
    {
#ifdef TOKENIZER_DEBUG_TAGS
        print_tag_stack();
#endif
        if (m_last_emitted_start_tag.empty())
        {
#ifdef TOKENIZER_DEBUG_TAGS
            std::cout << "erroreous tag name: unexpected end of begintag while requiring endtag for " << actual_tag_name << std::endl;
#endif
            ERROREOUS_END_TAG();
        }
        if (actual_tag_name == m_last_emitted_start_tag.top())
        {
#ifdef TOKENIZER_DEBUG_TAGS
            std::cout << "got expected tag name " << actual_tag_name << std::endl;
#endif
            m_last_emitted_start_tag.pop();
        }
        else
        {
#ifdef TOKENIZER_DEBUG_TAGS
            std::cout << "erroreous tag name: expected " << m_last_emitted_start_tag.top() << " but got instead " << actual_tag_name << std::endl;
#endif
            ERROREOUS_END_TAG();
        }
    }
    void HTMLTokenizer::will_push_starttag(std::string tag_name)
    {
#ifdef TOKENIZER_DEBUG_TAGS
        print_tag_stack();
        std::cout << "pushing begin tag name " << tag_name << std::endl;
#endif
        m_last_emitted_start_tag.push(tag_name);
    }

    void HTMLTokenizer::print_tag_stack()
    {
        std::stack<std::string> stack_copy = std::stack<std::string>(m_last_emitted_start_tag);
        while (!stack_copy.empty())
        {
            std::cout << stack_copy.top() << " ";
            stack_copy.pop();
        }
        std::cout << std::endl;
    }
}

#undef __ENUMERATE_TOKENIZER_STATE