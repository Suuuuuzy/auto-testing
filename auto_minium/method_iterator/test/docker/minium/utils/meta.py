'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-03-06 11:38:49
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-03-14 17:45:53
FilePath: /py-minium/minium/utils/meta.py
Description: 定义一些监控类
'''


class getter:
    def __init__(self, src) -> None:
        self.__src = src

    def __call__(self, _self):
        return getattr(_self, self.__src)


class setter:
    def __init__(self, src, callback=None) -> None:
        self.__src = src
        self.__callback = callback

    def __call__(self, _self, _value):
        if _value != getattr(_self, self.__src) and self.__callback:
            self.__callback(_self, _value)
        setattr(_self, self.__src, _value)


class PropertyMeta(type):
    """属性监听
    监听类中定义以"_"开头属性, 当属性值前后有变化, 如果存在"on_{prop}_change"方法, 则触发
    """

    def __new__(cls, name, base, attr_dict):
        keys = attr_dict.keys()
        for k in list(keys):
            if k.startswith("__"):
                continue
            if k.startswith("_"):
                prop_name = k[1:]
                callback = attr_dict.get(f"on_{prop_name}_change", None)
                attr_dict[prop_name] = property(
                    getter(k), setter(k, callable(callback) and callback)
                )
        return super().__new__(cls, name, base, attr_dict)


if __name__ == "__main__":
    class A(object, metaclass=PropertyMeta):
        _id = None
        def __init__(self) -> None:
            pass

    class B(A):
        _id = None  # 需要监听的属性必须需要在cls下有定义
        def on_id_change(self, value):
            print("B.id change", value)

    b = B()
    b.id = 123