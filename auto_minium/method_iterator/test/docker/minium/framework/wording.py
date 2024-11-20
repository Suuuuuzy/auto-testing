region = "en"
try:
    import locale
    language_code = locale.getlocale()[0]
    if language_code is None:
        language_code = locale.getdefaultlocale()[0]
    if language_code:
        region = language_code.split("_")[0]
except ImportError:
    pass


DEFAULT_LOCALE = "en"
if region == "zh":
    CURRENT_LOCALE = "zh"
else:
    CURRENT_LOCALE = "en"


def item(**kwargs):
    if CURRENT_LOCALE in kwargs:
        value = kwargs.get(CURRENT_LOCALE)
    elif DEFAULT_LOCALE in kwargs:
        value = kwargs.get(DEFAULT_LOCALE)
    elif len(kwargs.items()) > 0:
        value = list(kwargs.items())[0][1]
    else:
        value = ""
    return value


class obj(dict):
    def __init__(self, from_dict=None):
        if isinstance(from_dict, dict):
            for k, v in from_dict.items():
                setattr(self, k, v)
        super(obj, self).__init__(self.__dict__)

    def __getattr__(self, __k):
        try:
            return self[__k]
        except KeyError:
            return None

    def __setattr__(self, __k, __v):
        if isinstance(__v, dict):
            self[__k] = obj(__v)
        else:
            self[__k] = __v


class WORDING:
    class HELP:
        version = item(en="version", zh="版本")
        path = item(
            en = "case directory, default current directory",
            zh = "用例目录, 默认当前目录"
        )
        module = item(
            en = "case package name, usually means a python file name",
            zh = "模块名, 一般可以在python中import"
        )
        case_name = item(
            en = "case name, usually means a function",
            zh = "用例名, 一般为MiniTest类的成员函数"
        )
        module_search_path = item(
            en = "you can add some custom module into sys path by this param",
            zh = "指定python依赖的自定义模块路径, 同sys.path.append"
        )
        apk = item(
            en = "show apk path which may you need to install before running test in android device",
            zh = "运行安卓真机自动化时, 需要安装到手机的测试apk"
        )
        suite = item(
            en = "test suite file, a json format file or just a json string",
            zh = "测试套件json文件, 一般指suite.json"
        )
        config = item(
            en = "config file path",
            zh = "配置文件, 一般指config.json"
        )
        generate = item(
            en = "generate html report",
            zh = "生成html测试报告"
        )
        mode = item(
            en = "cases run mode, parallel or fork",
            zh = "运行测试用例的模式, 包括parallel(用例分配到多个账号同时测试)和fork(多个账号都分别运行全部的测试用例)"
        )
        accounts = item(
            en = "get accounts which already login",
            zh = "获取除登录主账号外的测试账号, 详情见开发者工具【工具->多账号调试】"
        )
        only_native = item(
            en = "Only init native driver",
            zh = "仅仅实例化Native驱动, 控制手机客户端"
        )
        test_connection = item(
            en = "test connection between minium and ide",
            zh = "测试minium驱动的websocket链接是否正常"
        )
        test_port = item(
            en = "test connection port, default: 9420",
            zh = "指定自动化测试端口"
        )
        task_limit_time = item(
            en = "task max runtime, default: 0, unlimited",
            zh = "测试任务最大运行时间, 超时将直接终止测试进程. 默认0, 不限时"
        )
        just_test = item(
            en = "just test loader, not run session",
            zh = "测试参数/配置文件等是否正确, 不真正运行用例"
        )
        check_env = item(
            en = "check system environment for minitest",
            zh = "检查minitest的环境"
        )

