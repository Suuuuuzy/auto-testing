# -*- coding: utf-8 -*-
import re

__author__ = 'xiazeng'

import logging
import os

logger = logging.getLogger()


class Resguard(object):
    instances = {}
    replace_pkg_func = None
    pkg = "com.tencent.mm"

    def __init__(self, filename=None):
        self._res_mapping = None

        self._id_mapping = {}
        self._path_mapping = None
        self.has_mapping_lines = False
        
        if filename is not None and not os.path.exists(filename):
            logger.warning("not exists")
        if filename is not None and os.path.exists(filename):
            mapping = None
            self.has_mapping_lines = True
            for line in open(filename, "r"):
                if not line.startswith(" ") and ":" in line:
                    if line.strip() == "res path mapping:":
                        mapping = self._path_mapping
                    elif line.strip() == "res id mapping:":
                        mapping = self._res_mapping
                if "->" in line:
                    ls = line.strip().split("->")
                    source = ls[0].strip()
                    mapping_pkg = self.pkg
                    if self.replace_pkg_func:
                        mapping_pkg = Resguard.replace_pkg_func(self.pkg)
                    if source.startswith("%s.R.id" % mapping_pkg):
                        k = source.split(".")[-1]
                        v = ls[1].strip().split(".")[-1]
                        self._id_mapping[k] = v
                    else:
                        if mapping is not None:
                            mapping[source] = ls[1].strip()

    @classmethod
    def get_resguard(cls, serial):
        assert serial is not None
        if serial in cls.instances:
            # logger.debug("use cache Resguard, %s, %d", str(serial), id(cls.instances[serial]))
            return cls.instances[serial]    # type: Resguard
        else:
            return Resguard()

    @classmethod
    def init_resguard(cls, serial, filename):
        res = Resguard(filename)
        logger.debug('init resguard: %s', filename)
        cls.instances[serial] = res

    def retrace_id(self, s):
        if s.startswith("android:"):
            return s
        if "/" in s:
            ss = s.split("/")
            for k, v in self._id_mapping.items():
                if v == ss[-1]:
                    # logger.info("%s->%s", s, k)
                    return ss[0] + "/" + k
        else:
            for k, v in self._id_mapping.items():
                if v == s:
                    logger.info("%s->%s", s, k)
                    return k
        return s

    def retrace_xml(self, xml):
        ret_xml = xml
        rid_list = re.findall(r'resource-id="(.*?)"', xml)
        for rid in set(rid_list):
            if rid:
                ret_xml = ret_xml.replace(rid, self.retrace_id(rid))
        return ret_xml

    def resgurad_id(self, s):
        if s.startswith("android:"):
            return s
        if "/" in s:
            ss = s.split("/")
            target_s = self._id_mapping[ss[-1]] if ss[-1] in self._id_mapping else ss[-1]
            if Resguard.replace_pkg_func:
                pkg = Resguard.replace_pkg_func(ss[0].split(":")[0]) + ":id"
            else:
                pkg = ss[0]
            return pkg + "/" + target_s
        else:
            return self._id_mapping[s] if s in self._id_mapping else s


if __name__ == '__main__':
    r = Resguard("/Users/mmtest/jenkins/workspace/perf_test/base/out/resguard-mapping.txt")
    print(r.retrace_id("com.tencent.mm:id/bfm"))
    print(r.resgurad_id("chatting_avatar_iv"))
