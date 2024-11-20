#!/usr/bin/env python3
# Created by xiazeng on 2019-06-18
# import unittest
import typing
import json
import os
from minium.framework.libs import unittest
import logging

logger = logging.getLogger("minium")
if typing.TYPE_CHECKING:
    from minium.framework.assertbase import AssertBase

FILENAME_SUMMARY = "summary.json"


class MiniResult(unittest.TestResult):
    def __init__(self, stream=None, descriptions=None, verbosity=None):
        super(MiniResult, self).__init__()
        self.__stop_when_framework_error = False
        self.error_stages = []
        self.summary = {
            "test_num": 0,
            "errors": [],
            "failures": [],
            "class_errors": [],
            "class_failures": [],
        }

    def setStopWhenFrameworkError(self, value: bool):
        self.__stop_when_framework_error = bool(value)

    def startTest(self, test: 'AssertBase') -> None:
        _startTest = getattr(test, "_startTest", None)
        if _startTest:
            setattr(test, "__skip_mini_init__", True)
            _startTest()
        return super().startTest(test)

    def stopTest(self, test: 'AssertBase') -> None:
        _endTest = getattr(test, "_endTest", None)
        if _endTest:
            _endTest()
        return super().stopTest(test)

    def addError(self, test, err):
        super(MiniResult, self).addError(test, err)
        if getattr(test, "_testMethodName", None) and getattr(
            getattr(test, test._testMethodName, None), "__stop_when_error", None
        ):
            self.stop()

    def addErrorStage(self, test, err, error_stages):
        self.error_stages.append((
            test, error_stages, err
        ))
        self.addError(test, err)
        if self.__stop_when_framework_error and self.hasFrameworkError(error_stages):
            self.stop()

    def addFailure(self, test: unittest.case.TestCase, err):
        super(MiniResult, self).addFailure(test, err)
        test_method = getattr(test, test._testMethodName)
        if getattr(test_method, "__stop_when_error", None):
            self.stop()

    def hasFrameworkError(self, error_stages):
        for error_stage in error_stages:
            if error_stage.startswith("_mini"):
                return True
        return False

    def getFrameworkError(self):
        """
        有框架引起的错误
        """
        for test, error_stages, err in self.error_stages:
            if self.hasFrameworkError(error_stages):
                return err
        return None

    def finish(self):
        self.summary["test_num"] = self.testsRun

        def format_error_info(_error):
            test_case = _error[0]
            if isinstance(test_case, unittest.TestCase):
                return {
                    "module": test_case.__class__.__name__,
                    "error_type": "test_case",
                    "case_name": test_case._testMethodName,
                    "exception": _error[1],
                }
            else:
                logger.warning("setupClass or tearDownClass failed")
                return {
                    "error_type": "test_class",
                    "exception": _error[1],
                    "description": test_case.description,
                }

        for error in self.errors:
            format_info = format_error_info(error)
            if format_info["error_type"] == "test_case":
                self.summary["errors"].append(format_info)
            elif format_info["error_type"] == "test_class":
                self.summary["class_errors"].append(format_info)

        for failure in self.failures:
            format_info = format_error_info(failure)
            if format_info["error_type"] == "test_case":
                self.summary["failures"].append(format_info)
            elif format_info["error_type"] == "test_class":
                self.summary["class_failures"].append(format_info)

    def print_shot_msg(self):
        self.finish()
        title = (
            f"case num:{self.summary['test_num']}, "
            f"failed num:{len(self.summary['failures'])}, "
            f"error num:{len(self.summary['errors'])}"
        )
        title = "=" * 20 + title + "=" * 20
        s = "\n" + title
        for error in self.summary["errors"]:
            s += f"{error['module']}:{error['case_name']} has error:\n"
            s += error["exception"] + "\n"
            s += "-" * len(title) + "\n"
        for error in self.summary["failures"]:
            s += f"{error['module']}:{error['case_name']} has failure:\n"
            s += error["exception"] + "\n"
            s += "-" * len(title) + "\n"

        for error in self.summary["class_errors"]:
            s += f"{error['description']} has class error:\n"
            s += error["exception"] + "\n"
            s += "-" * len(title) + "\n"
        for error in self.summary["class_failures"]:
            s += f"{error['description']} has class failure:\n"
            s += error["exception"] + "\n"
            s += "-" * len(title) + "\n"
        try:
            logger.info(s)  # 统一用utf8
        except UnicodeEncodeError:
            logger.warning("结果中包含中文，无法打印")

    def dumps(self, output_dir):
        self.finish()
        summary_path = os.path.join(output_dir, FILENAME_SUMMARY)
        if os.path.isfile(summary_path):
            with open(summary_path, "r", encoding="utf8") as fd:
                _summary = json.loads(fd.read() or "{}")
        else:
            _summary = {}
        _summary.update(self.summary)
        with open(summary_path, "w", encoding="utf8") as fd:
            json.dump(_summary, fd, indent=4)


class Test1(unittest.TestCase):
    def test_1(self):
        self.assertTrue(True)

    def test_2(self):
        self.assertTrue(False, u"failed弄点中文")


class Test2(unittest.TestCase):
    def setUp(self):
        raise RuntimeError("setup failed")

    def test_1(self):
        self.assertTrue(True)

    def test_2(self):
        self.assertTrue(False, "failed")


class Test3(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        raise RuntimeError("setup class failed")

    def test_1(self):
        self.assertTrue(True)

    def test_2(self):
        self.assertTrue(False, "failed")



class Test4(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        raise RuntimeError("setup class failed有点中文？")

    def test_1(self):
        self.assertTrue(True)

    def test_2(self):
        self.assertTrue(False, "failed")


if __name__ == "__main__":
    loader = unittest.TestLoader()
    tests = loader.loadTestsFromTestCase(Test1)
    tests1 = loader.loadTestsFromTestCase(Test2)
    tests2 = loader.loadTestsFromTestCase(Test3)
    tests3 = loader.loadTestsFromTestCase(Test4)
    tests.addTests(tests1)
    tests.addTests(tests2)
    tests.addTests(tests3)
    result = MiniResult()
    tests.run(result)
    result.print_shot_msg()
