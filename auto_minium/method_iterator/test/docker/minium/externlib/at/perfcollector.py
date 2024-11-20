#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by xiazeng on 2017/6/13
from __future__ import print_function
import time
import threading
import re
import logging
from at import At


logger = logging.getLogger(__name__)

class TopCollector(threading.Thread):
    def __init__(self, at, interval=0.5):
        """
        :type at: At
        :param interval:
        """
        super(TopCollector, self).__init__()
        self.at = at
        self._interval = interval
        self._should_stop = False
        self._cpu_process_names = None
        self._mem_process_names = None
        self._flow_pkg_names = None
        self._pre_shell_cmd = None
        self.top_datas = []

    def stop(self):
        self._should_stop = True
        self.join()

    def run(self) -> None:
        while not self._should_stop:
            output = self.at.adb.run_shell("top -H -b -n 1")
            self.add_output(output)

    def add_output(self, output):
        lines = output.split("\n")
        is_thread_line = False
        summary = {
            "mem": {
                "total": 0,
                "used": 0,
                "free": 0,
                "buffers": 0
            },
            "swap":{
                "total": 0,
                "used": 0,
                "free": 0,
                "cached": 0
            },
            "cpu": {

            }
        }
        threads = []
        item = {
            "time": time.time(),
            "summary": summary,
            "threads": threads
        }
        mem_r = re.compile(r"Mem:\s+(\d+)k total,\s+(\d+)k used,\s+(\d+)k free,\s+(\d+)k buffers")
        swap_r = re.compile(r"Swap:\s+(\d+)k total,\s+(\d+)k used,\s+(\d+)k free,\s+(\d+)k cached")
        cpu_r = re.compile(r"(\d+)%cpu\s+(\d+)%user\s+(\d+)%nice\s+(\d+)%sys\s+(\d+)%idle.*")
        for line in lines:
            line = line.strip()
            if not line:
                continue
            elif "PID USER" in line:
                is_thread_line = True
            elif is_thread_line:
                ls = re.split(r"\s+", line)
                #  1059 u0_a19       10 -10 2.6G 374M 158M S 91.0  19.0 147:15.43 ncent.wxpayface com.tencent.wxpayface
                if len(ls) < 13:
                    logger.error("unknown line: %s", line)
                else:
                    threads.append({
                        "VIRT": ls[4],
                        "RES": ls[5],
                        "SHR": ls[6],
                        "cpu": ls[8],
                        "mem": ls[9],
                        "time+": ls[10],
                        "thread": ls[11],
                        "process": ls[12]
                    })
            else:
                if mem_r.search(line):
                    m = mem_r.search(line)
                    summary['mem']['total'] = m.group(1)
                    summary['mem']['used'] = m.group(2)
                    summary['mem']['free'] = m.group(3)
                    summary['mem']['buffers'] = m.group(4)
                elif swap_r.search(line):
                    m = swap_r.search(line)
                    summary['swap']['total'] = m.group(1)
                    summary['swap']['used'] = m.group(2)
                    summary['swap']['free'] = m.group(3)
                    summary['swap']['cached'] = m.group(4)
                elif cpu_r.search(line):
                    m = cpu_r.search(line)
                    summary['cpu']['total'] = m.group(1)
                    summary['cpu']['user'] = m.group(2)
                    summary['cpu']['nice'] = m.group(3)
                    summary['cpu']['sys'] = m.group(4)
                else:
                    logger.error("unknown:%s", line)
        self.top_datas.append(item)


class PerfCollector(threading.Thread):
    def __init__(self, at, interval=2, nativemem = False):
        super(PerfCollector, self).__init__()
        self.at = at
        self._interval = interval
        self._should_stop = False
        self._cpu_process_names = None
        self._mem_process_names = None
        self._vmsize_process_names = None
        self._fps_process_names = None
        self._flow_pkg_names = None
        self._pre_shell_cmd = None
        self.data = {}
        self.nativemem = nativemem

    def collect_cpu(self, *process_names):
        self._cpu_process_names = process_names

    def collect_mem(self, *process_names):
        self._mem_process_names = process_names

    def collect_vmsize(self,*process_names):
        self._vmsize_process_names = process_names

    def collect_fps(self, *process_names):
        self._fps_process_names = process_names

    def collect_flow(self, *pkg_names):
        self._flow_pkg_names = pkg_names

    def stop(self):
        self._should_stop = True
        for i in range(self._interval):
            if not self.isAlive():
                break
            time.sleep(1)

    def run(self):
        while not self._should_stop:
            if self._pre_shell_cmd:
                if isinstance(self._pre_shell_cmd, str):
                    self.at.adb.run_shell(self._pre_shell_cmd)
                else:
                    for cmd in self._pre_shell_cmd:
                        self.at.adb.run_shell(cmd)

            if self._cpu_process_names:
                ret = self.at.adb.get_cpu_rate(*self._cpu_process_names)
                ts = int(time.time())
                for k, v in ret.items():
                    if "cpu" not in self.data:
                        self.data["cpu"] = {}
                    if k not in self.data["cpu"]:
                        self.data["cpu"][k] = []
                    self.data["cpu"][k].append((ts, v))

            if self._vmsize_process_names:
                ret_vmsize = self.at.adb.get_vmsize(*self._vmsize_process_names)
                ts = int(time.time())
                for k, v in ret_vmsize.items():
                    if "vmsize" not in self.data:
                        self.data["vmsize"] = {}
                    if k not in self.data["vmsize"]:
                        self.data["vmsize"][k] = []

                    self.data["vmsize"][k].append((ts, v))
            if self._mem_process_names:
                if self.nativemem:
                    ret = self.at.adb.get_mem_used_native(*self._mem_process_names)
                    ts = int(time.time())
                    for k, v in ret.items():
                        if "mem" not in self.data:
                            self.data["mem"] = {}
                        if k not in self.data["mem"]:
                            self.data["mem"][k] = []
                        self.data["mem"][k].append((ts, v[0], v[1], v[2], v[3], v[4], v[5]))
                else:
                    ret = self.at.adb.get_mem_used(*self._mem_process_names)
                    ts = int(time.time())
                    for k, v in ret.items():
                        if "mem" not in self.data:
                            self.data["mem"] = {}
                        if k not in self.data["mem"]:
                            self.data["mem"][k] = []
                        self.data["mem"][k].append((ts, v))
            if self._fps_process_names:
                ret = self.at.adb.get_fps_rate(*self._fps_process_names)
                ts = int(time.time())
                for k, v in ret.items():
                    if "fps" not in self.data:
                        self.data["fps"] = {}
                    if k not in self.data["fps"]:
                        self.data["fps"][k] = []
                    self.data["fps"][k].append((ts, v))
            if self._flow_pkg_names:
                for pkg_name in self._flow_pkg_names:
                    m_rx, m_tx, wifi_rx, wifi_tx = self.at.adb.get_pkg_traffic_stats(pkg_name)
                    ts = int(time.time())
                    if "flow" not in self.data:
                        self.data["flow"] = {}
                    if pkg_name not in self.data["flow"]:
                        self.data["flow"][pkg_name] = []
                    self.data["flow"][pkg_name].append((ts, m_rx, m_tx, wifi_rx, wifi_tx))
            time.sleep(self._interval)

    def register_pre_shell_cmd(self, cmd):
        if not isinstance(cmd, str):
            raise RuntimeError("Invalid args")

        if not self._pre_shell_cmd:
            self._pre_shell_cmd = cmd
        elif isinstance(self._pre_shell_cmd, str):
            self._pre_shell_cmd = [self._pre_shell_cmd, cmd]
        elif isinstance(self._pre_shell_cmd, list):
            self._pre_shell_cmd.append(cmd)


def test_top(serial):
    at = At(serial)
    c = TopCollector(at)
    c.setDaemon(True)
    c.start()
    for i in range(1):
        time.sleep(1)
    import json
    json.dump(c.top_datas, open("top_data.json", "w"), indent=4)
    c.stop()


def run(serial):
    at = At(serial)
    c = PerfCollector(at)
    process = ["com.tencent.mm", "com.tencent.mm:appbrand0"]
    c.collect_cpu(*process)
    c.collect_mem(*process)
    c.setDaemon(True)
    c.start()
    for i in range(1200):
        # print c.data
        for key in c.data:
            for process_name in c.data[key]:
                print(key, process_name)
                values = c.data[key][process_name]
                print(', '.join([str(v[1]) for v in values]))
        time.sleep(5)
    c.stop()


if __name__ == '__main__':
    import logging
    logging.basicConfig(level=logging.DEBUG)
    test_top("TXAP11951001223ND002112")