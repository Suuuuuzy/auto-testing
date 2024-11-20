# -*- coding: utf-8 -*-
"""
@author: 'xiazeng'
@created: 2016/12/2 
"""
import re
import time
import datetime
import threading
import sys

if sys.version_info[0] < 3:
    from Queue import Queue, Empty
else:
    from queue import Queue, Empty

import logging

logger = logging.getLogger()


def decode_bytes(bs):
    ds = ['ascii', 'utf-8', 'gbk']
    for d in ds:
        try:
            return bs.decode(d)
        except UnicodeDecodeError:
            pass
    # 可能出现utf-8被截断的场景
    # UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe9 in position 4094: invalid continuation byte
    return bs.decode("utf-8", 'ignore')


class LogRecord(object):
    reg_str = r"(?P<time>(\d{4}-)?\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d+)\s+" \
              r"(?P<level>[VDIWEFS])\/" \
              r"(?P<tag>.*(?=\(\s*\d+\s*\)))\(\s*" \
              r"(?P<pid>\d+)\s*\)\s*:\s+" \
              r"(?P<msg>.*)"
    reg = re.compile(reg_str, flags=re.VERBOSE | re.MULTILINE)

    def __init__(self, line):
        self.raw_line = line
        m = LogRecord.reg.match(line)
        if m is None:
            raise RuntimeError("invalided line:" + line)
        self.time = m.group("time")
        self.level = m.group("level")
        self.tag = m.group("tag")
        self.pid = m.group("pid")
        self.msg = m.group("msg")

    @property
    def ts(self):
        t = self.time.split(".")
        if len(self.time.split("-")) != 3:
            time_str = "%s-%s" % (datetime.datetime.now().year, t[0])
        else:
            time_str = int(t[0])
        timetuple = time.strptime(time_str, "%Y-%m-%d %H:%M:%S")
        ts = time.mktime(timetuple) * 1000 + int(t[1])
        return ts

    @classmethod
    def is_valid_line(cls, line):
        m = cls.reg.match(line)
        if not m:
            logger.warning(line)
        return m is not None

    def __repr__(self):
        return "%s %s %s %s" % (self.time, self.level, self.tag, self.msg)


class AsynchronousFileReader(threading.Thread):
    """
    Helper class to implement asynchronous reading of a file
    in a separate thread. Pushes read lines on a queue to
    be consumed in another thread.
    """

    def __init__(self, fd, process, queue):
        assert isinstance(queue, Queue)
        assert callable(fd.readline)
        threading.Thread.__init__(self)
        self._fd = fd
        self._process = process
        self.daemon = True
        self._queue = queue
        self._should_stop = False

    def run(self):
        """The body of the tread: read lines and put them on the queue."""
        count = 0
        next_count = 10000
        start = time.time()
        try:
            while True:
                if self._should_stop:
                    break
                if self._process.poll() is not None:
                    logging.error("process stopped:%s, logcount:%s", self._process.poll(), count)
                    break
                line = self._fd.readline()
                if line:
                    count += 1
                    self._queue.put(line)
                    if count > next_count:
                        t = time.time() - start
                        logger.debug("total:%s, cost:%d, produce rate:%s per second", count, t, int(count / t))
                        next_count += next_count
                    if line == b'read: unexpected EOF!\n':
                        break
        except:
            logger.exception("exception")

        logger.info("read logcat finish: %s", self._should_stop)

    def eof(self):
        """Check whether there is no more content to expect."""
        return not self.is_alive()

    def stop(self):
        self._should_stop = True
        self.join(1)


class JLogCat(threading.Thread):
    def __init__(self, adb):
        threading.Thread.__init__(self)
        self._is_stop = False
        self.adb = adb
        # Launch the asynchronous readers of the process' stdout.
        self.stdout_queue = Queue()
        self._bg_run()
        self.mutex = threading.Lock()
        self.filter_map = {}
        self.filter_values = []
        self.names = []
        self.redirect_file = None

    def redirect_to_path(self, path):
        self.redirect_file = open(path, "a")

    def _bg_run(self, clear_logcat=True):
        if clear_logcat:
            self.adb.run_adb("logcat -c")
        self.process = self.adb.run_adb("logcat  -v time", False)
        logging.info("process_id:%s", self.process.pid)
        stdout_reader = AsynchronousFileReader(self.process.stdout, self.process, self.stdout_queue)
        stdout_reader.start()
        self.stdout_reader = stdout_reader

    def run(self):
        # Check the queues if we received some output (until there is nothing more to get).
        retype = type(re.compile('hello, world'))
        line_count = 0
        start = time.time()
        next_count = 10000

        while not self._is_stop:
            if self.stdout_reader.eof():
                self._bg_run(clear_logcat=False)
            while not self.stdout_queue.empty() and not self._is_stop:
                line = None
                try:
                    line = self.stdout_queue.get(timeout=0.1)
                except Empty:
                    logger.info("empty")
                    pass
                line = decode_bytes(line)
                line_count += 1
                if line_count > next_count:
                    t = time.time() - start
                    logger.debug("total:%s, cost:%d, consume rate:%s per second", line_count, t, int(line_count / t))
                    next_count += next_count
                if line:
                    if self.redirect_file:
                        self.redirect_file.write(line)
                    for fm in self.filter_values:
                        records = fm["records"]
                        for keyword in fm["keywords"]:
                            if isinstance(keyword, str):
                                if keyword in line:
                                    logger.debug("[%s]+logcat, %s", self.ident, line.strip())
                                    records.append(line.strip())
                            elif isinstance(keyword, retype):
                                if keyword.match(line):
                                    logger.debug("[%s]+logcat, %s", self.ident, line.strip())
                                    records.append(line.strip())
        logger.info("finished: %s", self._is_stop)

    def start_record(self, name, *args):
        """
        开始等待，日志
        :param name:标识名称，任意字符串，后面取日志要根据这个标识来区分
        :param *args: 日志匹配的关键字
        :return:
        """
        self.mutex.acquire()
        self.filter_map[name] = {
            "keywords": args,
            "records": []
        }
        self.filter_values = list(self.filter_map.values())
        self.mutex.release()

    def _get_records(self, name):
        self.mutex.acquire()
        if name not in self.filter_map:
            lines = []
        else:
            lines = self.filter_map[name]["records"]
        records = [LogRecord(l) for l in lines if LogRecord.is_valid_line(l)]
        self.mutex.release()
        return records

    def get_lines(self, name):
        return self._get_records(name)

    def wait_records(self, name, count=1, timeout=10):
        s = time.time()
        records = []
        while time.time() - s < timeout:
            records = self._get_records(name)
            if len(records) >= count:
                return records
            time.sleep(0.1)
        return records

    def new_wait_records(self, name, count=1, timeout=20):
        time.sleep(timeout)
        records = self._get_records(name)
        if len(records) < count:
            time.sleep(5)
            records = self._get_records(name)
        return records

    def stop_record(self, name):
        records = self._get_records(name)
        self.mutex.acquire()
        del self.filter_map[name]
        self.filter_values = list(self.filter_map.values())
        self.mutex.release()
        return records

    def stop(self):
        self._is_stop = True
        self.stdout_reader.stop()
        self.join()
        self.adb.kill_pid(self.process.pid)
        if self.redirect_file:
            self.redirect_file.close()
        logger.info("logcat finish")

    def __del__(self):
        self.stop()
