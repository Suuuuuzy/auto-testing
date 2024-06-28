from enum import Enum
from typing import List

import Attribute as AttributeScript
import Custom_Exceptions as ExceptionScript
import HTMLToken as HTMLTokenScript
import Utils as UtilsScript

TOKENIZER_DEBUG_STATES = False
TOKENIZER_DEBUG_TAGS = False

class Tokenizer_State(Enum):
    Data = 1                                    
    RCDATA = 2                                
    RAWTEXT = 3                                
    ScriptData = 4                             
    PLAINTEXT = 5                    
    TagOpen = 6
    EndTagOpen = 7                              
    TagName = 8                               
    RCDATALessThanSign = 9                        
    RCDATAEndTagOpen = 10                         
    RCDATAEndTagName = 11                         
    RAWTEXTLessThanSign = 12                      
    RAWTEXTEndTagOpen = 13                        
    RAWTEXTEndTagName = 14                        
    ScriptDataLessThanSign = 15                   
    ScriptDataEndTagOpen = 16                     
    ScriptDataEndTagName = 17                     
    ScriptDataEscapeStart = 18                    
    ScriptDataEscapeStartDash = 19                
    ScriptDataEscaped = 20                        
    ScriptDataEscapedDash = 21                    
    ScriptDataEscapedDashDash = 22                
    ScriptDataEscapedLessThanSign = 23            
    ScriptDataEscapedEndTagOpen = 24              
    ScriptDataEscapedEndTagName = 25              
    ScriptDataDoubleEscapeStart = 26              
    ScriptDataDoubleEscaped = 27                  
    ScriptDataDoubleEscapedDash = 28              
    ScriptDataDoubleEscapedDashDash = 29          
    ScriptDataDoubleEscapedLessThanSign = 30      
    ScriptDataDoubleEscapeEnd = 31                
    BeforeAttributeName = 32                      
    AttributeName = 33                            
    AfterAttributeName = 34                       
    BeforeAttributeValue = 35                     
    AttributeValueDoubleQuoted = 36               
    AttributeValueSingleQuoted = 37               
    AttributeValueUnquoted = 38                   
    AfterAttributeValueQuoted = 39                
    SelfClosingStartTag = 40                 
    # BogusComment = 41                             
    # MarkupDeclarationOpen = 42                    
    # CommentStart = 43                             
    # CommentStartDash = 44                         
    # Comment = 45                                  
    # CommentLessThanSign = 46                      
    # CommentLessThanSignBang = 47                  
    # CommentLessThanSignBangDash = 48              
    # CommentLessThanSignBangDashDash = 49          
    # CommentEndDash = 50                           
    # CommentEnd = 51                               
    # CommentEndBang = 52                           
    # DOCTYPE = 53                                  
    # BeforeDOCTYPEName = 54                        
    # DOCTYPEName = 55                              
    # AfterDOCTYPEName = 56                         
    # AfterDOCTYPEPublicKeyword = 57                
    # BeforeDOCTYPEPublicIdentifier = 58            
    # DOCTYPEPublicIdentifierDoubleQuoted = 59      
    # DOCTYPEPublicIdentifierSingleQuoted = 60      
    # AfterDOCTYPEPublicIdentifier = 61             
    # BetweenDOCTYPEPublicAndSystemIdentifiers = 62 
    # AfterDOCTYPESystemKeyword = 63                
    # BeforeDOCTYPESystemIdentifier = 64            
    # DOCTYPESystemIdentifierDoubleQuoted = 65      
    # DOCTYPESystemIdentifierSingleQuoted = 66      
    # AfterDOCTYPESystemIdentifier = 67             
    # BogusDOCTYPE = 68                             
    # CDATASection = 69                             
    # CDATASectionBracket = 70                      
    # CDATASectionEnd = 71                          
    # CharacterReference = 72                       
    # NamedCharacterReference = 73                  
    # NumericCharacterReference = 74   
    # OneTokBeforeNextState = 41                    
    EOFAndReturn = 41

    
class HTMLTokenizer():

    def __init__(self, input : str | None):
        
        self.m_state : Tokenizer_State = Tokenizer_State.Data
        self.m_next_pos_state : Tokenizer_State = Tokenizer_State.Data
        self.m_return_state : Tokenizer_State = Tokenizer_State.Data

        self.m_current_input_character : str | None = ""
        self.m_input : str = input if input is not None else ''
        self.m_temp_buf : str = ''
        self.m_character_token_flag : bool = False

        self.m_attribute_buf : AttributeScript.Attribute = AttributeScript.Attribute()
        self.m_last_emitted_start_tag : List[str] = []
        self.m_cursor : int = 0
        self.m_current_token : HTMLTokenScript.HTMLToken = HTMLTokenScript.HTMLToken()
    

    def insert_input_text(self, input : str) -> None:
        self.m_input += input
        

    def next_token(self) -> HTMLTokenScript.HTMLToken:
        if self.m_current_input_character is not None and self.m_current_input_character == "":
            self.m_current_input_character = self._next_codepoint()
        while True:
            if (self.m_state == Tokenizer_State.Data):

                if (UtilsScript.on(
                    self.m_current_input_character, 
                    UtilsScript.LESS_THAN) is True):
                    self._switch_to(Tokenizer_State.TagOpen)
                    continue

                if (UtilsScript.on_EOF(self.m_current_input_character) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(self.m_current_input_character) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue
                    
                ExceptionScript.ASSERT_NOT_REACHED()
            
            if (self.m_state == Tokenizer_State.RCDATA):
                if (UtilsScript.on(
                    self.m_current_input_character, 
                    UtilsScript.LESS_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.RCDATALessThanSign)
                    continue

                if (UtilsScript.on_EOF(self.m_current_input_character) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(self.m_current_input_character) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue
                    
                ExceptionScript.ASSERT_NOT_REACHED()

            if (self.m_state == Tokenizer_State.RAWTEXT):
                if (UtilsScript.on(
                    self.m_current_input_character, 
                    UtilsScript.LESS_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.RAWTEXTLessThanSign)
                    continue

                if (UtilsScript.on_EOF(self.m_current_input_character) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(self.m_current_input_character) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue
                    
                ExceptionScript.ASSERT_NOT_REACHED()

            if (self.m_state == Tokenizer_State.ScriptData):
                if (UtilsScript.on(
                    self.m_current_input_character, 
                    UtilsScript.LESS_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.ScriptDataLessThanSign)
                    continue

                if (UtilsScript.on_EOF(self.m_current_input_character) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(self.m_current_input_character) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue
                    
                ExceptionScript.ASSERT_NOT_REACHED()

            if (self.m_state == Tokenizer_State.PLAINTEXT):

                if (UtilsScript.on_EOF(self.m_current_input_character) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(self.m_current_input_character) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue
                    
                ExceptionScript.ASSERT_NOT_REACHED()
            
            if (self.m_state == Tokenizer_State.TagOpen):

                if (UtilsScript.on(
                    self.m_current_input_character, 
                    UtilsScript.EXCLAMATION_MARK) is True):
                    ExceptionScript.ASSERT_UNIMPLEMENTED()
                    # self._switch_to(Tokenizer_State.MarkupDeclarationOpen)
                    # continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    self._switch_to(Tokenizer_State.EndTagOpen)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.QUESTION_MARK
                    ) is True):
                    ExceptionScript.ASSERT_UNIMPLEMENTED()
                    # return_val = self._create_new_token_and_reconsume(
                    #     HTMLTokenScript.TokenType.Comment,
                    #     Tokenizer_State.BogusComment
                    # )

                    # if return_val is not None:
                    #     return return_val
                    
                    # continue

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    return_val = self._create_new_token_and_reconsume(
                        HTMLTokenScript.TokenType.StartTag,
                        Tokenizer_State.TagName
                    )

                    if return_val is not None:
                        return return_val
                    
                    continue

                if (UtilsScript.on_EOF(self.m_current_input_character) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.EOFAndReturn)
                    return self._emit_current_token()
            
                if (UtilsScript.on_anything_else(self.m_current_input_character) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.Data)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.EndTagOpen:

                if(UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    return_val = self._create_new_token_and_reconsume(
                        HTMLTokenScript.TokenType.EndTag,
                        Tokenizer_State.TagName
                        )

                    if return_val is not None:
                        return return_val

                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.Data)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._reconsume_in(Tokenizer_State.EOFAndReturn)
                    return self._emit_current_token()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    ExceptionScript.ASSERT_UNIMPLEMENTED()
                    # return_val = self._create_new_token_and_reconsume(
                    #     HTMLTokenScript.TokenType.Comment,
                    #     Tokenizer_State.BogusComment
                    #     )
                
                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.TagName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    self._switch_to(Tokenizer_State.BeforeAttributeName)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.Data)

                    if (self.m_current_token.is_tag() is not True):
                        builder : str = ""
                        builder += "<" if self.m_current_token.m_type == HTMLTokenScript.TokenType.StartTag else "</"
                        builder += self.m_current_token.m_tag.m_tag_name
                        builder += ">"
                        self.m_current_token.m_comment_or_character.m_data += builder
                        self.m_current_token.m_type = HTMLTokenScript.TokenType.Character
                    
                    return self._emit_current_token()

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN
                    ) is True):
                    
                    if (self.m_current_token.is_tag() is not True):
                        self._reconsume_in(Tokenizer_State.Data)
                        builder : str = ""
                        builder += "<" if self.m_current_token.m_type == HTMLTokenScript.TokenType.StartTag else "</"
                        builder += self.m_current_token.m_tag.m_tag_name
                        self.m_current_token.m_comment_or_character.m_data += builder
                        self.m_current_token.m_type = HTMLTokenScript.TokenType.Character

                        return self._emit_current_token()
                
                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self.m_current_token.m_tag.m_tag_name += self.m_current_input_character.lower()
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self.m_current_token.m_tag.m_tag_name += self.m_current_input_character
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.RCDATALessThanSign:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    self.m_temp_buf = ""
                    self._switch_to(Tokenizer_State.RCDATAEndTagOpen)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.RCDATA)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.RCDATAEndTagOpen:

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    return_val = self._create_new_token_and_reconsume(
                        HTMLTokenScript.TokenType.EndTag,
                        Tokenizer_State.RCDATAEndTagName
                        )

                    if return_val is not None:
                        return return_val
                    
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._reconsume_in(Tokenizer_State.RCDATA)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.RCDATAEndTagName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.BeforeAttributeName)
                        continue
                
                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.SelfClosingStartTag)
                        continue
                
                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.Data)
                        return self._emit_current_token()
                
                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self.m_current_token.m_tag.m_tag_name += self.m_current_input_character.lower()
                    self.m_temp_buf += self.m_current_input_character
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._emit_buffer()
                    self._reconsume_in(Tokenizer_State.RAWTEXT)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.RAWTEXTLessThanSign:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    self.m_temp_buf = ""
                    self._switch_to(Tokenizer_State.RAWTEXTEndTagOpen)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.RAWTEXT)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.RAWTEXTEndTagOpen:

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self._create_new_token_and_reconsume(
                        HTMLTokenScript.TokenType.EndTag,
                        Tokenizer_State.RAWTEXTEndTagName
                        )
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._reconsume_in(Tokenizer_State.RAWTEXT)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.RAWTEXTEndTagName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    if (self._on_appropriate_end_tag() is True):
                        self._reconsume_in(Tokenizer_State.BeforeAttributeName)
                        continue
                
                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.SelfClosingStartTag)
                        continue  

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.Data)
                        return self._emit_current_token()
                
                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self.m_current_token.m_tag.m_tag_name += self.m_current_input_character.lower()
                    self.m_temp_buf += self.m_current_input_character
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._emit_buffer()
                    self._reconsume_in(Tokenizer_State.RAWTEXT)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataLessThanSign:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    self.m_temp_buf = ""
                    self._switch_to(Tokenizer_State.ScriptDataEndTagOpen)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.EXCLAMATION_MARK
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.EXCLAMATION_MARK)
                    self._switch_to(Tokenizer_State.ScriptDataEscapeStart)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.ScriptData)
                    continue
            
                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.ScriptDataEndTagOpen:

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    return_val = self._create_new_token_and_reconsume(
                        HTMLTokenScript.TokenType.EndTag,
                        Tokenizer_State.ScriptDataEndTagName
                        )
                    
                    if return_val is not None:
                        return return_val
                    
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._reconsume_in(Tokenizer_State.ScriptData)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.ScriptDataEndTagName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    if self._on_appropriate_end_tag() is True:
                        self._switch_to(Tokenizer_State.BeforeAttributeName)
                        continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    if self._on_appropriate_end_tag() is True:
                        self._switch_to(Tokenizer_State.SelfClosingStartTag)
                        continue                    

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    if self._on_appropriate_end_tag() is True:
                        self._switch_to(Tokenizer_State.Data)
                        return self._emit_current_token()
                
                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self.m_current_token.m_tag.m_tag_name += self.m_current_input_character.lower()
                    self.m_temp_buf += self.m_current_input_character
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._emit_buffer()
                    self._reconsume_in(Tokenizer_State.ScriptData)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataEscapeStart:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                    ) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self._switch_to(Tokenizer_State.ScriptDataEscapeStartDash)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._reconsume_in(Tokenizer_State.ScriptData)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataEscapeStartDash:
                
                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                    ) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self._switch_to(Tokenizer_State.ScriptDataEscapedDashDash)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._reconsume_in(Tokenizer_State.ScriptData)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.ScriptDataEscaped:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                    ) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self._switch_to(Tokenizer_State.ScriptDataEscapedDash)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.ScriptDataEscapedLessThanSign)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.ScriptDataEscapedDash:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                    ) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self._switch_to(Tokenizer_State.ScriptDataEscapedDashDash)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.ScriptDataEscapedLessThanSign)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self._switch_to(Tokenizer_State.ScriptDataEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.ScriptDataEscapedDashDash:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                    ) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.ScriptDataEscapedLessThanSign)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    self._accumulate_character_token(UtilsScript.GREATER_THAN)
                    self._switch_to(Tokenizer_State.ScriptData)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self._switch_to(Tokenizer_State.ScriptDataEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataEscapedLessThanSign:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    self.m_temp_buf = ""
                    self._switch_to(Tokenizer_State.ScriptDataEscapedEndTagOpen)
                    continue

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self.m_temp_buf = ""
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.ScriptDataDoubleEscapeStart)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._reconsume_in(Tokenizer_State.ScriptDataEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataEscapedEndTagOpen:

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    return_val = self._create_new_token_and_reconsume(
                        HTMLTokenScript.TokenType.EndTag,
                        Tokenizer_State.ScriptDataEscapedEndTagName
                        )

                    if return_val is not None:
                        return return_val
                    
                    continue
                    
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._reconsume_in(Tokenizer_State.ScriptDataEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataEscapedEndTagName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.BeforeAttributeName)
                        continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.SelfClosingStartTag)
                        continue
                
                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    
                    if (self._on_appropriate_end_tag() is True):
                        self._switch_to(Tokenizer_State.Data)
                        return self._emit_current_token()
                
                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    
                    self.m_current_token.m_tag.m_tag_name += self.m_current_input_character.lower()
                    self.m_temp_buf += self.m_current_input_character
                    self.m_current_input_character = self._next_codepoint()

                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._emit_buffer()
                    self._reconsume_in(Tokenizer_State.ScriptDataEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataDoubleEscapeStart:

                if ((UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True) or 
                    (UtilsScript.on(
                        self.m_current_input_character,
                        UtilsScript.SOLIDUS
                        ) is True) or
                            (UtilsScript.on(
                            self.m_current_input_character,
                            UtilsScript.GREATER_THAN
                            ) is True)):
                    
                    self._accumulate_character_token(self.m_current_input_character)

                    if self.m_temp_buf == "script":
                        self._switch_to(Tokenizer_State.ScriptDataDoubleEscaped)
                        continue

                    self._switch_to(Tokenizer_State.ScriptDataEscaped)
                    continue

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_temp_buf += self.m_current_input_character.lower()
                    self.m_current_input_character += self._next_codepoint()
                    continue

                if (UtilsScript.on_anythng_else(
                    self.m_current_input_character
                    ) is True):
                    self._reconsume_in(Tokenizer_State.ScriptDataEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataDoubleEscaped:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                    ) is True):
                    
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscapedDash)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN
                    ) is True):
                    
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscapedLessThanSign)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataDoubleEscapedDash:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscapedDashDash)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscapedLessThanSign)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataDoubleEscapedDashDash:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.HYPHEN_MINUS
                ) is True):
                    self._accumulate_character_token(UtilsScript.HYPHEN_MINUS)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.LESS_THAN
                ) is True):
                    self._accumulate_character_token(UtilsScript.LESS_THAN)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscapedLessThanSign)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                ) is True):
                    self._accumulate_character_token(UtilsScript.GREATER_THAN)
                    self._switch_to(Tokenizer_State.ScriptData)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.ScriptDataDoubleEscapedLessThanSign:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                ) is True):
                    self.m_temp_buf = ""
                    self._accumulate_character_token(UtilsScript.SOLIDUS)
                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscapeEnd)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                ) is True):
                    self._reconsume_in(Tokenizer_State.ScriptDataDoubleEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.ScriptDataDoubleEscapeEnd:

                if ((UtilsScript.on_whitespace(
                    self.m_current_input_character
                ) is True) or 
                (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                ) is True) or 
                (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                ) is True)):
                    
                    self._accumulate_character_token(self.m_current_input_character)
                    if (self.m_temp_buf == "script"):
                        self._switch_to(Tokenizer_State.ScriptDataEscaped)
                        continue

                    self._switch_to(Tokenizer_State.ScriptDataDoubleEscaped)
                    continue

                if (UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                ) is True):
                    self._accumulate_character_token(self.m_current_input_character)
                    self.m_temp_buf += self.m_current_input_character.lower()
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                ) is True):
                    self._reconsume_in(Tokenizer_State.ScriptDataDoubleEscaped)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.BeforeAttributeName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                ) is True):
                    
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if ((UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                ) is True) or
                (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                ) is True) or
                (UtilsScript.on_EOF(
                    self.m_current_input_character
                ) is True)):
                    self._reconsume_in(Tokenizer_State.AfterAttributeName)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.EQUAL_SIGN
                ) is True):
                    
                    self.m_attribute_buf = AttributeScript.Attribute(name = self.m_current_input_chanracter)
                    self._switch_to(Tokenizer_State.AttributeName)
                    continue

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                ) is True):
                    
                    self.m_attribute_buf = AttributeScript.Attribute()
                    self._reconsume_in(Tokenizer_State.AttributeName)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.AttributeName:

                if ((UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True) or
                    (UtilsScript.on(
                        self.m_current_input_character,
                        UtilsScript.EQUAL_SIGN
                        ) is True) or 
                        (UtilsScript.on(
                            self.m_current_input_character,
                            UtilsScript.GREATER_THAN
                            ) is True) or 
                            (UtilsScript.on_EOF(
                                self.m_current_input_character
                                ) is True)):
                    self._reconsume_in(Tokenizer_State.AfterAttributeName)
                    continue

                if ((UtilsScript.on_ascii_alpha(
                    self.m_current_input_character
                    ) is True) or 
                    (UtilsScript.on_anything_else(
                        self.m_current_input_character
                        ) is True)):
                    self.m_attribute_buf.append_name(self.m_current_input_character.lower())
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.AfterAttributeName:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):

                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):

                    self._switch_to(Tokenizer_State.SelfClosingStartTag)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.EQUAL_SIGN
                    ) is True):

                    self._switch_to(Tokenizer_State.BeforeAttributeValue)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    if (self.m_attribute_buf == "wx:else"):
                        if TOKENIZER_DEBUG_STATES is True:
                            print("getting here! wx:else causing problem")
                    else:
                        if TOKENIZER_DEBUG_STATES is True:
                            print(f"nonstandard format attribute name {self.m_attribute_buf.m_name}")
                    
                    self._switch_to(Tokenizer_State.Data)
                    self.m_current_token.m_tag.m_attributes.append(self.m_attribute_buf)
                    return self._emit_current_token()
                
                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self.m_attribute_buf = AttributeScript.Attribute()
                    self._reconsume_in(Tokenizer_State.AttributeName)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.BeforeAttributeValue:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    self.m_current_input_character = self._next_codepoint()
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.QUOTATION_MARK
                    ) is True):
                    self._switch_to(Tokenizer_State.AttributeValueDoubleQuoted)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.APOSTROPHE
                    ) is True):
                    self._switch_to(Tokenizer_State.AttributeValueSingleQuoted)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.Data)
                    return self._emit_current_token()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._reconsume_in(Tokenizer_State.AttributeValueUnquoted)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.AttributeValueDoubleQuoted:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.QUOTATION_MARK
                    ) is True):
                    self._switch_to(Tokenizer_State.AfterAttributeValueQuoted)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self.m_attribute_buf.append_value(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.AttributeValueSingleQuoted:
                
                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.APOSTROPHE
                    ) is True):
                    self._switch_to(Tokenizer_State.AfterAttributeValueQuoted)
                    continue

                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()

                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self.m_attribute_buf.append_value(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()

            if self.m_state == Tokenizer_State.AttributeValueUnquoted:

                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    self._switch_to(Tokenizer_State.BeforeAttributeName)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    if self.m_attribute_buf.m_name != "":
                        self.m_current_token.m_tag.m_attributes.append(self.m_attribute_buf)

                    self._switch_to(Tokenizer_State.Data)
                    return self._emit_current_token()
                
                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self.m_attribute_buf.append_value(self.m_current_input_character)
                    self.m_current_input_character = self._next_codepoint()
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.AfterAttributeValueQuoted:

                if self.m_attribute_buf.m_name != "":
                    self.m_current_token.m_tag.m_attributes.append(self.m_attribute_buf)
                
                if (UtilsScript.on_whitespace(
                    self.m_current_input_character
                    ) is True):
                    self._switch_to(Tokenizer_State.BeforeAttributeName)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.SOLIDUS
                    ) is True):
                    self._switch_to(Tokenizer_State.SelfClosingStartTag)
                    continue

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    self._switch_to(Tokenizer_State.Data)
                    return self._emit_current_token()
                
                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._reconsume_in(Tokenizer_State.BeforeAttributeName)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.SelfClosingStartTag:

                if (UtilsScript.on(
                    self.m_current_input_character,
                    UtilsScript.GREATER_THAN
                    ) is True):
                    self.m_current_token.m_tag.m_self_closing = True
                    self._switch_to(Tokenizer_State.Data)
                    return self._emit_current_token()
                
                if (UtilsScript.on_EOF(
                    self.m_current_input_character
                    ) is True):
                    return self._emit_EOF_and_return()
                
                if (UtilsScript.on_anything_else(
                    self.m_current_input_character
                    ) is True):
                    self._reconsume_in(Tokenizer_State.BeforeAttributeName)
                    continue

                ExceptionScript.ASSERT_NOT_REACHED()
            
            if self.m_state == Tokenizer_State.EOFAndReturn:
                return self._emit_EOF_and_return()

    def restore(self) -> None:
        self.m_cursor = 0
    

    def _next_codepoint(self) -> str | None:
        if self.m_cursor >= len(self.m_input):
            return None
        self.m_cursor += 1
        return self.m_input[self.m_cursor - 1]
    

    def _peek_codepoint(self, offset : int) -> str | None:
        if self.m_cursor + offset >= len(self.m_input):
            return None
        return self.m_input[self.m_cursor + offset]
    

    def _emit_current_token(self) -> HTMLTokenScript.HTMLToken:
        if (self.m_current_token.type() == HTMLTokenScript.TokenType.StartTag and self.m_current_token.m_tag.m_self_closing is not True):
            self._will_push_starttag(self.m_current_token.m_tag.m_tag_name)
        
        elif (self.m_current_token.type() == HTMLTokenScript.TokenType.EndTag):
            self._will_pop_endtag(self.m_current_token.m_tag.m_tag_name)
        
        return_token : HTMLTokenScript.HTMLToken = self.m_current_token
        self.m_current_token =  HTMLTokenScript.HTMLToken()

        return return_token

    
    def _create_new_token(self, token_type : HTMLTokenScript.TokenType) -> HTMLTokenScript.HTMLToken | None:
        return_token : HTMLTokenScript.HTMLToken | None = None

        if (token_type != HTMLTokenScript.TokenType.Character and self.m_character_token_flag is True):
            return_token = self._emit_current_token()
        
        self.m_character_token_flag = False
        self.m_current_token = HTMLTokenScript.HTMLToken()
        self.m_current_token.m_type = token_type

        return return_token
    

    def _accumulate_character_token(self, character : str | None) -> None:
        if (self.m_character_token_flag is not True):
            if (UtilsScript.on_whitespace(character) is True):
                return 
        
            self._create_new_token(HTMLTokenScript.TokenType.Character)
            self.m_character_token_flag = True
        
        self.m_current_token.m_comment_or_character.m_data += character
    

    def _consume(self, string_lit : str, case_insensitive: bool) -> None:
        assert self._the_next_few_characters_are(string_lit, case_insensitive)
        self.m_cursor += len(string_lit)
    

    def _the_next_few_characters_are(self, string_lit : str, case_insensitive : bool) -> bool:
        for idx in range(len(string_lit)):
            codepoint : str | None  = self._peek_codepoint(idx)

            if codepoint is None:
                return False

            if (case_insensitive is not True and codepoint != string_lit[idx]):
                return False
            
            if (case_insensitive is True and codepoint.lower() != string_lit[idx].lower()):
                return False
        
        return True
    
    def _will_switch_to(self, new_state : Tokenizer_State) -> None:
        if TOKENIZER_DEBUG_STATES is True:
            print(f"{self.m_state} switch to new state {new_state}")
    
    def _will_reconsume_in(self, new_state : Tokenizer_State) -> None:
        if TOKENIZER_DEBUG_STATES is True:
            print(f"{self.m_state} reconsume in {new_state}")
    
    def _will_continue(self) -> None:
        if TOKENIZER_DEBUG_STATES is True:
            print(f"continue in current state {self.m_state}")  
        
    def _will_pop_endtag(self, actual_tag_name : str) -> None:
        if TOKENIZER_DEBUG_TAGS is True:
            self._print_tag_stack()

        if len(self.m_last_emitted_start_tag) == 0:
            if TOKENIZER_DEBUG_TAGS is True:
                print(f"erroreous tag name: unexpected end of begintag while requiring endtag for {actual_tag_name}")
            ExceptionScript.ERROREOUS_END_TAG()
        
        elif actual_tag_name == self.m_last_emitted_start_tag[-1]:
            if TOKENIZER_DEBUG_TAGS is True:
                print(f"get expected tag name {actual_tag_name}")
            self.m_last_emitted_start_tag.pop()
        
        else:
            if TOKENIZER_DEBUG_TAGS is True:
                print(f"erroreous tag name: expected {actual_tag_name}, but instead got {self.m_last_emitted_start_tag[-1]}")
            ExceptionScript.ERROREOUS_END_TAG()

    def _will_push_starttag(self, tag_name : str) -> None:
        if TOKENIZER_DEBUG_TAGS is True:
            print(f"pushing begin tag name {tag_name}")
        self.m_last_emitted_start_tag.append(tag_name)
        
    def _print_tag_stack(self) -> None:
        print(self.m_last_emitted_start_tag)
        
    def _switch_to(self, new_state : Tokenizer_State) -> None:
        self._will_switch_to(new_state)
        self.m_state = new_state
        self.m_current_input_character = self._next_codepoint()
    

    def _reconsume_in(self, new_state: Tokenizer_State) -> None:
        self._will_switch_to(new_state)
        self.m_state = new_state
    
    
    def _emit_EOF_and_return(self) -> HTMLTokenScript.HTMLToken:
        self.m_current_token = HTMLTokenScript.HTMLToken()
        self.m_current_token.m_type = HTMLTokenScript.TokenType.EndOfFile
        self.m_state = Tokenizer_State.EOFAndReturn
        return self._emit_current_token()

    def _create_new_token_and_reconsume(self, token_type : HTMLTokenScript.TokenType, 
                                        new_state : Tokenizer_State) -> HTMLTokenScript.HTMLToken | None:
        potential_token : HTMLTokenScript.HTMLToken | None = self._create_new_token(token_type)

        if (potential_token is not None):
            self._reconsume_in(new_state)
            return potential_token
        
        self._reconsume_in(Tokenizer_State.TagName)
    
    def _on_appropriate_end_tag(self) -> bool:
        return (len(self.m_last_emitted_start_tag) != 0 and
                self.m_current_token.m_tag.m_tag_name == self.m_last_emitted_start_tag[-1])

    def _emit_buffer(self) -> None:
        self._accumulate_character_token(self.m_temp_buf)
        self.m_temp_buf = ""

            

