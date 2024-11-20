'''
Author: yopofeng yopofeng@tencent.com
Date: 2023-07-03 14:55:52
LastEditors: yopofeng yopofeng@tencent.com
LastEditTime: 2023-07-20 21:12:55
FilePath: /wechat-mp-inspector/wechat_mp_inspector/logger.py
Description: 日志相关模块
'''
import logging

logger = logging.getLogger("WMI")
logger.propagate = False
LOG_FORMATTER = "[%(levelname)1.1s %(asctime)s %(name)s %(module)s#%(lineno)d %(funcName)s] %(message)s"

console_handler = logging.StreamHandler()
formatter = logging.Formatter(LOG_FORMATTER, "%Y-%m-%d %H:%M:%S")
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)
logger.setLevel(logging.INFO)
g_console_handler = console_handler

def setLevel(level):
    logger.setLevel(level)
    g_console_handler.setLevel(level)
