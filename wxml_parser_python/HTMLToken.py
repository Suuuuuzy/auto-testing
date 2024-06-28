from enum import Enum
from dataclasses import dataclass, field
from typing import List, Tuple

# import Exceptions
import Attribute

@dataclass
class _DOCTYPE:
    m_name : str = ""
    m_doctype_public_identifier : str = ""
    m_doctype_system_idenfier : str = ""
    m_force_quirks_flag : bool = False

@dataclass
class _Tag:
    m_tag_name : str = ""
    m_self_closing : bool = False
    m_attributes : List[Attribute.Attribute] = field(default_factory=list)

@dataclass
class _Comment_or_Character:
    m_data : str = ""


class TokenType(Enum):
    DOCTYPE = 1
    StartTag = 2
    EndTag = 3
    Comment = 4
    Character = 5
    EndOfFile = 6

class HTMLToken():

    def __init__(self):
        self.m_type = TokenType.StartTag
        self.m_doctype : _DOCTYPE = _DOCTYPE()
        self.m_tag : _Tag = _Tag()
        self.m_comment_or_character : _Comment_or_Character = _Comment_or_Character()

    def type(self) -> TokenType:
        return self.m_type
    
    def get_tag_meta_info(self) -> Tuple[str, bool]:
        assert self.m_type == TokenType.StartTag or self.m_type == TokenType.EndTag
        return (self.m_tag.m_tag_name, self.m_tag.m_self_closing)

    def to_string(self) -> str:
        builder : str = ""

        if self.m_type == TokenType.DOCTYPE:
            builder += f"DOCTYPE {{ doctype name: {self.m_doctype.m_name} }}"
        elif self.m_type == TokenType.StartTag or self.m_type == TokenType.EndTag:
            builder += "StartTag" if self.m_type == TokenType.StartTag else "EndTag"
            builder += f" {{ tag name: {self.m_tag.m_tag_name} }} {{ attribute sets: "
            for attribute in self.m_tag.m_attributes:
                builder += f"< {attribute.m_name}: {attribute.m_value} > "
            builder += f"}}"
        elif self.m_type == TokenType.Comment:
            builder += f"Comment {{ comment data: {self.m_comment_or_character.m_data} }}"
        elif self.m_type == TokenType.Character:
            builder += f"Character {{ character data: {self.m_comment_or_character.m_data} }}"
        elif self.m_type == TokenType.EndOfFile:
            builder += "EndOfFile"

        return builder

    def is_tag(self) -> bool:
        for tag_char in self.m_tag.m_tag_name:
            if not tag_char.islower() and tag_char != '-' and tag_char != '_':
                return False
        return True