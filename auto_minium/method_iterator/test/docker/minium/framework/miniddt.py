#!/usr/bin/env python3
import ddt
import inspect
import re

__all__ = ["ddt_class", "ddt_case", "ddt_unpack", "ddt_data"]
index_len = 5


class Data(object):
    def __init__(self, data, name="") -> None:
        self.data = data
        self.__name__ = name


def mk_test_name(testname, value, index=0, name="", name_fmt="%(name)s_%(value)s"):
    index = "{0:0{1}}".format(index + 1, index_len)
    if name_fmt.find("%(index)s") >= 0:
        name_fmt = "%(testname)s_" + name_fmt
    else:
        name_fmt = "%(testname)s_%(index)s_" + name_fmt
    if not ddt.is_trivial(value):  # 不支持序列化类型
        name_fmt = re.sub(r"_?%\(value\)s", "", name_fmt)
    if not name:
        name_fmt = re.sub(r"_?%\(name\)s", "", name_fmt)
    try:
        value = str(value)
    except UnicodeEncodeError:
        # fallback for python2
        value = value.encode("ascii", "backslashreplace")
    test_name = name_fmt % {
        "testname": testname,
        "name": name,
        "index": index,
        "value": value,
    }
    return re.sub(r"\W|^(?=\d)", "_", test_name)[:200]  # 系统文件命名长度有限制，不宜过长


"""
rewrite ddt:
1. add definition for test name, Default is: "%(name)s_%(value)s"
    - %(index)s     needed
    - %(value)s     optional
    - %(name)s      optional
    e.g.
    @ddt_class(testNameFormat="%(name)s")
    class a:
        @ddt_case(ddt_data("abc", "name1"))
        def test(self):
            pass
    -> 
    class a:
        def test_1_name1(self):
            pass
"""


def ddt_class(arg=None, **kwargs):
    fmt_test_name = kwargs.get("testNameFormat", "%(index)s_%(name)s_%(value)s")

    def wrapper(cls):
        for name, func in list(cls.__dict__.items()):
            if hasattr(func, ddt.DATA_ATTR) and getattr(func, ddt.DATA_ATTR):
                for i, v in enumerate(getattr(func, ddt.DATA_ATTR)):
                    _name = ""
                    if isinstance(v, Data):
                        _name = getattr(v, "__name__", "")
                        v = v.data
                    test_name = mk_test_name(name, v, i, _name, fmt_test_name)
                    test_data_docstring = ddt._get_test_data_docstring(func, v)
                    if hasattr(func, ddt.UNPACK_ATTR):
                        if isinstance(v, (tuple, list)):
                            ddt.add_test(cls, test_name, test_data_docstring, func, *v)
                        elif isinstance(v, dict):
                            # unpack dictionary
                            ddt.add_test(cls, test_name, test_data_docstring, func, **v)
                    else:
                        ddt.add_test(cls, test_name, test_data_docstring, func, v)
                delattr(cls, name)
            elif hasattr(func, ddt.FILE_ATTR) and getattr(func, ddt.FILE_ATTR):
                file_attr = getattr(func, ddt.FILE_ATTR)
                ddt.process_file_data(cls, name, func, file_attr)
                delattr(cls, name)
        return cls

    # ``arg`` is the unittest's test class when decorating with ``@ddt`` while
    # it is ``None`` when decorating a test class with ``@ddt(k=v)``.
    return wrapper(arg) if inspect.isclass(arg) else wrapper


def ddt_data(data, name=""):
    return Data(data, name)


def ddt_case(*values):
    global index_len
    index_len = len(str(len(values)))
    return ddt.data(*values)


def ddt_unpack(func):
    return ddt.unpack(func)
