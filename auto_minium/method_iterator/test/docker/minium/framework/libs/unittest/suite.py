from unittest.suite import TestSuite as TestSuiteSrc
from unittest.suite import BaseTestSuite
from unittest.suite import _call_if_exists, _DebugResult
import sys
from . import case


# 重写TestSuite
class TestSuite(TestSuiteSrc):
    def __str__(self):
        s = ""
        for test in self._tests:
            s += "%s\n" % str(test)
        return s

    def _miniClassSetUp(self, test, result):
        pass

    def _createClassFailure(self, test, result, exception=None, info=None, error_stages=None):
        addSkip = getattr(result, "addSkip", None)
        if addSkip is not None and isinstance(exception, case.SkipTest):
            addSkip(test, str(exception))
        else:
            result.startTest(test)
            addErrorStage = getattr(result, "addErrorStage", None)
            if addErrorStage is not None:
                result.addErrorStage(test, info or sys.exc_info(), error_stages)
            else:
                result.addError(test, info or sys.exc_info())
            result.stopTest(test)

    def _handleClassSetUp(self, test, result):
        previousClass = getattr(result, "_previousTestClass", None)
        currentClass = test.__class__
        if currentClass == previousClass:
            if getattr(currentClass, "__class_setup_failure_why__", None):
                self._createClassFailure(
                    test,
                    result,
                    info=getattr(currentClass, "__class_setup_failure_why__", None),
                    error_stages=getattr(currentClass, "__class_setup_failure_stages__")
                )
            return
        if result._moduleSetUpFailed:
            return
        if getattr(currentClass, "__unittest_skip__", False):
            return

        try:
            currentClass._classSetupFailed = False
        except TypeError:
            # test may actually be a function
            # so its class will be a builtin-type
            pass

        error_stages = []
        stage_errors = {}
        # run _miniClassSetUp
        _miniClassSetUp = getattr(currentClass, "_miniClassSetUp", None)
        setattr(currentClass, "__is_minitest_suite__", True)
        if _miniClassSetUp is not None:
            _call_if_exists(result, "_setupStdout")
            try:
                _miniClassSetUp()
            except Exception as e:
                if isinstance(result, _DebugResult):
                    raise
                currentClass._classSetupFailed = True
                error_stages.append("_miniClassSetUp")
                info = sys.exc_info()
                stage_errors["_miniClassSetUp"] = [info,]
                setattr(currentClass, "__class_setup_failure_why__", info)
                setattr(currentClass, "__class_setup_failure_stages__", error_stages)
                setattr(currentClass, "__class_setup_failure_errors__", stage_errors)
                className = "%s.%s" % (
                    currentClass.__module__,
                    currentClass.__qualname__,
                )
                self._createClassFailure(test, result, e, info, error_stages)
                # self._createClassOrModuleLevelException(result, e,
                #                                         '_miniClassSetUp',
                #                                         className)
                info = None
                return
            finally:
                _call_if_exists(result, "_restoreStdout")
                if currentClass._classSetupFailed is True:
                    currentClass.doClassCleanups()
                    if len(currentClass.tearDown_exceptions) > 0:
                        for exc in currentClass.tearDown_exceptions:
                            self._createClassOrModuleLevelException(
                                result, exc[1], "setUpClass", className, info=exc
                            )

        # run setUpClass
        setUpClass = getattr(currentClass, "setUpClass", None)
        if setUpClass is not None:
            _call_if_exists(result, "_setupStdout")
            try:
                setUpClass()
            except Exception as e:
                if isinstance(result, _DebugResult):
                    raise
                currentClass._classSetupFailed = True
                error_stages.append("setUpClass")
                info = sys.exc_info()
                stage_errors["_miniClassSetUp"] = [info,]
                setattr(currentClass, "__class_setup_failure_why__", info)
                setattr(currentClass, "__class_setup_failure_stages__", error_stages)
                setattr(currentClass, "__class_setup_failure_errors__", stage_errors)
                className = "%s.%s" % (
                    currentClass.__module__,
                    currentClass.__qualname__,
                )
                self._createClassFailure(test, result, e, info, error_stages)
                # self._createClassOrModuleLevelException(result, e,
                #                                         'setUpClass',
                #                                         className)
                info = None
            finally:
                _call_if_exists(result, "_restoreStdout")
                if currentClass._classSetupFailed is True:
                    currentClass.doClassCleanups()
                    if len(currentClass.tearDown_exceptions) > 0:
                        for exc in currentClass.tearDown_exceptions:
                            self._createClassOrModuleLevelException(
                                result, exc[1], "setUpClass", className, info=exc
                            )
