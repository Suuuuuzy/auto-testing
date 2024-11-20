import logging
import sys

class Log(object):
    NOTSET = logging.NOTSET
    DEBUG = logging.DEBUG
    INFO = logging.INFO
    WARNING = logging.WARNING
    ERROR = logging.ERROR
    CRITICAL = logging.CRITICAL
    _instance = None
    
    """
    单例模式
    """
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(Log, cls).__new__(cls, *args, **kwargs)
            cls._instance.init()
        return cls._instance

    def init(self, name='default'):
        self.name = name
        self.logger = logging.getLogger(self.name)
        self.logger.setLevel(self.INFO)
        if not self.logger.handlers:
            format = logging.Formatter("%(asctime)-8s %(thread)d %(funcName)s %(message)s")
            consoleHandler = logging.StreamHandler(sys.stdout)
            consoleHandler.setFormatter(format)
            self.logger.addHandler(consoleHandler)

    def setLevel(self, level):
        self.logger.setLevel(level)

    def getLogger(self):
        return self.logger

    def setDebugLogMode(self):
        self.logger.setLevel(self.DEBUG)
