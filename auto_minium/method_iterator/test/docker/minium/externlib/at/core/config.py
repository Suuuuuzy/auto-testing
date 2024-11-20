# -*- coding: utf-8 -*-
"""
@author: 'xiazeng'
@created: 2017/3/31 
"""
import os.path

AT_ROOT = os.path.dirname(os.path.dirname(__file__))
JAR_STUB_FILENAME = "AtStub.jar"
JAR_STUB_PATH = os.path.join(AT_ROOT, "bin", JAR_STUB_FILENAME)
JAR_STUB_CLASS = "com.tencent.mm.test.at.Stub"
STUB_CASE_NAME = "testStartServer"

STUB_APK_PATH = os.path.join(AT_ROOT, "bin", "AtServer.apk")
TEST_APK_ACT = "ui.LauncherUI"
TEST_APK_SERVICE = "ui.ApiService"

TEST_APP_CLS = "com.tencent.weautomator.at.Stub"
TEST_APP_PKG = "com.tencent.weautomator"

STF_LIB_PATH = os.path.join(AT_ROOT, "bin", "stf_libs")

# version
UIAUTOMATOR2 = 2
