'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-04-18 15:36:11
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-09-05 15:49:09
FilePath: /py-minium/minium/native/wx_native/wording.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from __future__ import annotations
from enum import Enum
import typing

class Language(Enum):
    zh = 1
    en = 2

class Item(object):
    def __init__(self, value: typing.Dict[Language, typing.Any]) -> None:
        self._value = {
            k.name: v for k, v in value.items()
        }

    @property
    def value(self):
        return self._value[WORDING.language.name]
    
    def __getattr__(self, name):
        if name in self._value:
            return self._value[name]
        raise

class Meta(type):
    def __new__(cls, name, base, attr_dict: typing.Dict[str, typing.Dict[Language, typing.Any]]):
        for k, v in attr_dict.items():
            if k.startswith("__"):
                continue
            attr_dict[k] = Item(v)
        return super().__new__(cls, name, base, attr_dict)
        

class WORDING:
    language = Language.zh

    @classmethod
    def setLanguage(cls, value: Language):
        cls.language = value

    class COMMON(object, metaclass=Meta):
        LOGIN_WORDS = {
            Language.zh: {"微信", "通讯录", "发现", "我"},
            Language.en: {"Chats", "Contacts", "Discover", "Me"}
        }

        MODAL_CONFIRM = {
            Language.zh: "确定",
            Language.en: "OK"
        }

        MODAL_CANCEL = {
            Language.zh: "取消",
            Language.en: "CANCEL"
        }
        
        LOCAL_DEBUG_MODAL_TITLE = {
            Language.zh: "本地调试已结束",
            Language.en: "Local debugging ended"
        }

        LOCAL_DEBUG_MODAL_TITLE2 = {
            Language.zh: "确认结束调试？",
            Language.en: "确认结束调试？"
        }
        
        MORE: Item = {
            Language.zh: "更多",
            Language.en: "More"
        }
        
        SEARCH: Item = {
            Language.zh: "搜索",
            Language.en: "Search"
        }

        DONE: Item = {
            Language.zh: "完成",
            Language.en: "Done"
        }

        SEND: Item = {
            Language.zh: "发送",
            Language.en: "Send"
        }

        GET_PHONE_NUMBER: Item = {
            Language.zh: "申请获取并验证你的手机号",
            Language.en: "Requests to obtain and verify your mobile number"
        }

        GET_PHONE_NUMBER_REG: Item = {
            Language.zh: "\w*获取\w*手机号\w*",
            Language.en: "[\w\s]*obtain[\w\s]*mobile number[\w\s]*"
        }



    class IOS(object, metaclass=Meta):
        # 转发/分享
        FORWARD_WORD1: Item = {
            Language.zh: "转发",
            Language.en: "Forward"
        }
        FORWARD_WORD2: Item = {
            Language.zh: "转发给朋友",
            Language.en: "Send to Chat"
        }
        FORWARD_WORD3: Item = {
            Language.zh: "发送",
            Language.en: "Send"
        }
        CREATE_CHAT1: Item = {
            Language.zh: "创建聊天",
            Language.en: "New Chat"
        }
        CREATE_CHAT2: Item = {
            Language.zh: "创建新的聊天",
            Language.en: "New Chat"
        }
        


    class ANDROID(object, metaclass=Meta):
        pass

if __name__ == "__main__":
    print(WORDING.COMMON.LOGIN_WORDS.zh)
