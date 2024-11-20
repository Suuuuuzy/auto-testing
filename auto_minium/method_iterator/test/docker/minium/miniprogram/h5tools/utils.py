import time
import inspect
from functools import wraps


def timer(timeout, interval=1, message="函数执行超时"):
    """
    函数执行定时器
    :param timeout   超时时间
    :param interval  每个interval间隔时间，被装饰函数调用一次
    :param message   超时后，默认message
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            result = {'value': None, 'error': None}

            while True:
                if time.time() - start_time > timeout:
                    break

                try:
                    result['value'] = func(*args, **kwargs)
                    return result['value']
                except Exception as e:
                    result['error'] = e

                time.sleep(interval)

            if result['error']:
                raise result['error']
            raise TimeoutError(message)

        return wrapper

    return decorator


def print_caller_info_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 获取当前堆栈帧列表
        stack = inspect.stack()

        # stack[0] 是当前函数 wrapper 的堆栈帧
        # stack[1] 是调用 wrapper 的函数的堆栈帧，即被装饰的函数
        # stack[2] 是调用被装饰函数的函数的堆栈帧
        caller_frame = stack[2]

        # 获取调用者的函数名、文件名和行号
        function_name = caller_frame.function
        file_name = caller_frame.filename
        line_number = caller_frame.lineno

        print(f"Called by function '{function_name}' in file '{file_name}', line {line_number}")

        # 调用被装饰的函数
        return func(*args, **kwargs)

    return wrapper