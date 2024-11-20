import sys
import types
import contextlib
from typing import Union
from functools import wraps
from unittest.case import (
    addModuleCleanup,
    FunctionTestCase,
    SkipTest,
    skip,
    skipIf as skipIfSrc,
    skipUnless,
    expectedFailure,
) # noqa: F401
from unittest.case import TestCase as TestCaseSrc



# 重写testcase

# unittest跟随python版本更新, 新版本unittest存在新的实现, 需要定义最新兼容python版本来防止出现兼容性问题, 并给用户报出来

if sys.version_info >= (3, 11):
    NEWEST_PYTHON_VERSION = (3, 11, 3)
    NEWEST_PYTHON_VERSION_STR = ".".join([str(s) for s in NEWEST_PYTHON_VERSION])
    from unittest.case import _Outcome, _ShouldStop, _addSkip, _addError, _subtest_msg_sentinel, _OrderedChainMap, _SubTest
    from unittest.case import warnings, safe_repr
    class Outcome(_Outcome):
        def __init__(self, result=None):
            super().__init__(result)
            self.skipped = []
            self.errors = []
            self.current_stage = None
            self.error_stages = []  # 失败发生在的步骤：_miniClassSetUp, _miniSetUp, _miniTearDown, setUpClass, tearDownClass, setUp, tearDown, testMethod
            self.stage_errors = {}  # 发生在每个stage的具体error

        @contextlib.contextmanager
        def testPartExecutor(self, test_case, subTest=False, error_stage=None):
            old_success = self.success
            self.success = True
            self.current_stage = error_stage or self.current_stage
            try:
                yield
            except KeyboardInterrupt:
                raise
            except SkipTest as e:
                self.success = False
                self.skipped.append((test_case, str(e)))
                _addSkip(self.result, test_case, str(e))
            except _ShouldStop:
                pass
            except:
                exc_info = sys.exc_info()
                if self.expecting_failure:
                    self.expectedFailure = exc_info
                else:
                    self.success = False
                    self.errors.append((test_case, exc_info))
                    if self.current_stage and self.current_stage in self.stage_errors:
                        self.stage_errors[self.current_stage].append(exc_info)
                    elif self.current_stage:
                        self.stage_errors[self.current_stage] = [exc_info,]
                        self.error_stages.append(self.current_stage)
                    if subTest:
                        self.result.addSubTest(test_case.test_case, test_case, exc_info)
                    else:
                        _addError(self.result, test_case, exc_info)
                # explicitly break a reference cycle:
                # exc_info -> frame -> exc_info
                exc_info = None
            else:
                if subTest and self.success:
                    self.result.addSubTest(test_case.test_case, test_case, None)
            finally:
                self.success = self.success and old_success

    class TestCase(TestCaseSrc):
        def __getattr__(self, name: str):
            if name.startswith("_") and sys.version_info > NEWEST_PYTHON_VERSION:  # 重写框架使用了很多原有的_开头的函数, 如果不存在, 有可能是因为python版本引起的
                raise AttributeError(f"'{self.__class__.__name__}' object has no attribute '{name}' maybe because your python version is greater than {NEWEST_PYTHON_VERSION_STR}")
            raise AttributeError(f"'{self.__class__.__name__}' object has no attribute '{name}'")

        def _miniSetUp(self):
            pass

        def _miniTearDown(self):
            pass

        def run(self, result=None):
            if result is None:
                result = self.defaultTestResult()
                startTestRun = getattr(result, 'startTestRun', None)
                stopTestRun = getattr(result, 'stopTestRun', None)
                if startTestRun is not None:
                    startTestRun()
            else:
                stopTestRun = None

            result.startTest(self)
            try:
                testMethod = getattr(self, self._testMethodName)
                if (getattr(self.__class__, "__unittest_skip__", False) or
                    getattr(testMethod, "__unittest_skip__", False)):
                    # If the class or method was skipped.
                    skip_why = (getattr(self.__class__, '__unittest_skip_why__', '')
                                or getattr(testMethod, '__unittest_skip_why__', ''))
                    _addSkip(result, self, skip_why)
                    return result

                expecting_failure = (
                    getattr(self, "__unittest_expecting_failure__", False) or
                    getattr(testMethod, "__unittest_expecting_failure__", False)
                )
                outcome = Outcome(result)
                self._outcome = outcome

                with outcome.testPartExecutor(self, error_stage="_miniSetUp"):
                    self._miniSetUp()
                if outcome.success:
                    with outcome.testPartExecutor(self, error_stage="setUp"):
                        self._callSetUp()
                    if outcome.success:
                        outcome.expecting_failure = expecting_failure
                        with outcome.testPartExecutor(self, error_stage="testMethod"):
                            self._callTestMethod(testMethod)
                        outcome.expecting_failure = False
                        with outcome.testPartExecutor(self, error_stage="tearDown"):
                            self._callTearDown()
                outcome.expecting_failure = False
                with outcome.testPartExecutor(self, error_stage="_miniTearDown"):
                    self._miniTearDown()
                self.doCleanups()

                if outcome.success:
                    if expecting_failure:
                        if outcome.expectedFailure:
                            self._addExpectedFailure(result, outcome.expectedFailure)
                        else:
                            self._addUnexpectedSuccess(result)
                    else:
                        result.addSuccess(self)
                return result
            finally:
                result.stopTest(self)
                if stopTestRun is not None:
                    stopTestRun()

                if self._outcome:
                    outcome = self._outcome
                    outcome.expectedFailure = None
                    outcome.errors.clear()
                    outcome.skipped.clear()
                    outcome = None
                    # clear the outcome, no more needed
                    self._outcome = None

        @contextlib.contextmanager
        def subTest(self, msg=_subtest_msg_sentinel, **params):
            """Return a context manager that will return the enclosed block
            of code in a subtest identified by the optional message and
            keyword parameters.  A failure in the subtest marks the test
            case as failed but resumes execution at the end of the enclosed
            block, allowing further test code to be executed.
            """
            if self._outcome is None or not self._outcome.result_supports_subtests:
                yield
                return
            parent = self._subtest
            if parent is None:
                params_map = _OrderedChainMap(params)
            else:
                params_map = parent.params.new_child(params)
            self._subtest = _SubTest(self, msg, params_map)
            try:
                with self._outcome.testPartExecutor(self._subtest, subTest=True):
                    yield
                if not self._outcome.success:
                    result = self._outcome.result
                    if result is not None and result.failfast:
                        raise _ShouldStop
                elif self._outcome.expectedFailure:
                    # If the test is expecting a failure, we really want to
                    # stop now and register the expected failure.
                    raise _ShouldStop
            finally:
                self._subtest = parent

        def assertSetContainsSubset(self, subset: set, superset: set, msg=None):
            """Checks whether superset is a superset of subset."""
            warnings.warn("assertSetContainsSubset is deprecated", DeprecationWarning)
            missing = []
            for item in subset:
                if item not in superset:
                    missing.append(item)

            if not missing:
                return

            standardMsg = ""
            if missing:
                standardMsg = "Missing: %s" % ",".join(safe_repr(m) for m in missing)

            self.fail(self._formatMessage(msg, standardMsg))

    # copy
    class _SubTest(TestCase):

        def __init__(self, test_case, message, params):
            super().__init__()
            self._message = message
            self.test_case = test_case
            self.params = params
            self.failureException = test_case.failureException

        def runTest(self):
            raise NotImplementedError("subtests cannot be run directly")

        def _subDescription(self):
            parts = []
            if self._message is not _subtest_msg_sentinel:
                parts.append("[{}]".format(self._message))
            if self.params:
                params_desc = ', '.join(
                    "{}={!r}".format(k, v)
                    for (k, v) in self.params.items())
                parts.append("({})".format(params_desc))
            return " ".join(parts) or '(<subtest>)'

        def id(self):
            return "{} {}".format(self.test_case.id(), self._subDescription())

        def shortDescription(self):
            """Returns a one-line description of the subtest, or None if no
            description has been provided.
            """
            return self.test_case.shortDescription()

        def __str__(self):
            return "{} {}".format(self.test_case, self._subDescription())

else:
    NEWEST_PYTHON_VERSION = (3, 10, 5)
    NEWEST_PYTHON_VERSION_STR = ".".join([str(s) for s in NEWEST_PYTHON_VERSION])
    from unittest.case import _Outcome, _ShouldStop, warnings, safe_repr, _OrderedChainMap, _subtest_msg_sentinel

    class Outcome(_Outcome):
        def __init__(self, result=None):
            super().__init__(result)
            # 兼容3.11
            self.skipped = []
            self.errors = []
            self.current_stage = None
            self.error_stages = []  # 失败发生在的步骤：_miniClassSetUp, _miniSetUp, _miniTearDown, setUpClass, tearDownClass, setUp, tearDown, testMethod
            self.stage_errors = {}  # 发生在每个stage的具体error

        @contextlib.contextmanager
        def testPartExecutor(self, test_case, isTest=False, error_stage=None):
            """
            rewrite for error_stages
            :error_stage: current error stage name
            """
            old_success = self.success
            self.success = True
            self.current_stage = error_stage or self.current_stage
            try:
                yield
            except KeyboardInterrupt:
                raise
            except SkipTest as e:
                self.success = False
                self.skipped.append((test_case, str(e)))
            except _ShouldStop:
                pass
            except:
                exc_info = sys.exc_info()
                if self.expecting_failure:
                    self.expectedFailure = exc_info
                else:
                    self.success = False
                    self.errors.append((test_case, exc_info))
                    if self.current_stage and self.current_stage in self.stage_errors:
                        self.stage_errors[self.current_stage].append(exc_info)
                    elif self.current_stage:
                        self.stage_errors[self.current_stage] = [exc_info,]
                        self.error_stages.append(self.current_stage)
                # explicitly break a reference cycle:
                # exc_info -> frame -> exc_info
                exc_info = None
            else:
                if self.result_supports_subtests and self.success:
                    self.errors.append((test_case, None))
            finally:
                self.success = self.success and old_success


    class TestCase(TestCaseSrc):
        def __getattr__(self, name: str):
            if name.startswith("_") and sys.version_info > NEWEST_PYTHON_VERSION:  # 重写框架使用了很多原有的_开头的函数, 如果不存在, 有可能是因为python版本引起的
                raise AttributeError(f"'{self.__class__.__name__}' object has no attribute '{name}' maybe because your python version is greater than {NEWEST_PYTHON_VERSION_STR}")
            raise AttributeError(f"'{self.__class__.__name__}' object has no attribute '{name}'")

        def _miniSetUp(self):
            pass

        def _miniTearDown(self):
            pass

        def run(self, result=None):
            orig_result = result
            if result is None:
                result = self.defaultTestResult()
                startTestRun = getattr(result, "startTestRun", None)
                if startTestRun is not None:
                    startTestRun()

            result.startTest(self)

            testMethod = getattr(self, self._testMethodName)
            if getattr(self.__class__, "__unittest_skip__", False) or getattr(
                testMethod, "__unittest_skip__", False
            ):
                # If the class or method was skipped.
                try:
                    skip_why = getattr(
                        self.__class__, "__unittest_skip_why__", ""
                    ) or getattr(testMethod, "__unittest_skip_why__", "")
                    self._addSkip(result, self, skip_why)
                finally:
                    result.stopTest(self)
                return

            expecting_failure_method = getattr(
                testMethod, "__unittest_expecting_failure__", False
            )
            expecting_failure_class = getattr(self, "__unittest_expecting_failure__", False)
            expecting_failure = expecting_failure_class or expecting_failure_method
            outcome = Outcome(result)
            try:
                self._outcome = outcome

                with outcome.testPartExecutor(self, error_stage="_miniSetUp"):
                    self._miniSetUp()
                if outcome.success:
                    with outcome.testPartExecutor(self, error_stage="setUp"):
                        self._callSetUp()
                    if outcome.success:
                        outcome.expecting_failure = expecting_failure
                        with outcome.testPartExecutor(
                            self, isTest=True, error_stage="testMethod"
                        ):
                            self._callTestMethod(testMethod)
                        outcome.expecting_failure = False
                        with outcome.testPartExecutor(self, error_stage="tearDown"):
                            self._callTearDown()
                outcome.expecting_failure = False
                with outcome.testPartExecutor(self, error_stage="_miniTearDown"):
                    self._miniTearDown()

                self.doCleanups()
                for test, reason in outcome.skipped:
                    self._addSkip(result, test, reason)
                self._feedErrorsToResult(result, outcome.errors)
                if outcome.success:
                    if expecting_failure:
                        if outcome.expectedFailure:
                            self._addExpectedFailure(result, outcome.expectedFailure)
                        else:
                            self._addUnexpectedSuccess(result)
                    else:
                        result.addSuccess(self)
                return result
            finally:
                result.stopTest(self)
                if orig_result is None:
                    stopTestRun = getattr(result, "stopTestRun", None)
                    if stopTestRun is not None:
                        stopTestRun()

                # explicitly break reference cycles:
                # outcome.errors -> frame -> outcome -> outcome.errors
                # outcome.expectedFailure -> frame -> outcome -> outcome.expectedFailure
                outcome.errors.clear()
                outcome.expectedFailure = None

                # clear the outcome, no more needed
                self._outcome = None

        @contextlib.contextmanager
        def subTest(self, msg=_subtest_msg_sentinel, **params):
            """Return a context manager that will return the enclosed block
            of code in a subtest identified by the optional message and
            keyword parameters.  A failure in the subtest marks the test
            case as failed but resumes execution at the end of the enclosed
            block, allowing further test code to be executed.
            """
            if self._outcome is None or not self._outcome.result_supports_subtests:
                yield
                return
            parent = self._subtest
            if parent is None:
                params_map = _OrderedChainMap(params)
            else:
                params_map = parent.params.new_child(params)
            self._subtest = _SubTest(self, msg, params_map)
            try:
                with self._outcome.testPartExecutor(self._subtest, isTest=True):
                    yield
                if not self._outcome.success:
                    result = self._outcome.result
                    if result is not None and result.failfast:
                        raise _ShouldStop
                elif self._outcome.expectedFailure:
                    # If the test is expecting a failure, we really want to
                    # stop now and register the expected failure.
                    raise _ShouldStop
            finally:
                self._subtest = parent

        def assertSetContainsSubset(self, subset: set, superset: set, msg=None):
            """Checks whether superset is a superset of subset."""
            warnings.warn("assertSetContainsSubset is deprecated", DeprecationWarning)
            missing = []
            for item in subset:
                if item not in superset:
                    missing.append(item)

            if not missing:
                return

            standardMsg = ""
            if missing:
                standardMsg = "Missing: %s" % ",".join(safe_repr(m) for m in missing)

            self.fail(self._formatMessage(msg, standardMsg))


    class _SubTest(TestCase):

        def __init__(self, test_case, message, params):
            super().__init__()
            self._message = message
            self.test_case = test_case
            self.params = params
            self.failureException = test_case.failureException

        def runTest(self):
            raise NotImplementedError("subtests cannot be run directly")

        def _subDescription(self):
            parts = []
            if self._message is not _subtest_msg_sentinel:
                parts.append("[{}]".format(self._message))
            if self.params:
                params_desc = ', '.join(
                    "{}={!r}".format(k, v)
                    for (k, v) in self.params.items())
                parts.append("({})".format(params_desc))
            return " ".join(parts) or '(<subtest>)'

        def id(self):
            return "{} {}".format(self.test_case.id(), self._subDescription())

        def shortDescription(self):
            """Returns a one-line description of the subtest, or None if no
            description has been provided.
            """
            return self.test_case.shortDescription()

        def __str__(self):
            return "{} {}".format(self.test_case, self._subDescription())


def _whether_need_skip(func: types.FunctionType, *args, **kwargs):
    if func.__code__.co_argcount == 0:
        need_skip = func()
    elif func.__code__.co_argcount == 1:
        need_skip = func(args[0])  # just use TestCase
    else:
        need_skip = func(*args, **kwargs)  # mybe ddt case
    return need_skip

def skipIf(func_or_condition: Union[types.FunctionType, bool], reason=''):
    """
    Skip a test if the condition is true.
    """
    if isinstance(func_or_condition, bool):
        return skipIfSrc(func_or_condition, reason)
    def wrapper(wrapped):
        @wraps(wrapped)
        def inner(*args, **kwargs):
            if len(args) == 0:  # not TestCase
                return wrapped(*args, **kwargs)
            if isinstance(args[0], TestCaseSrc):  # is TestCase
                self = args[0]
                if _whether_need_skip(func_or_condition, *args, **kwargs):
                    self.skipTest(reason)
                return wrapped(*args, **kwargs)
            # normal wrapped func
            if _whether_need_skip(func_or_condition, *args, **kwargs):
                raise SkipTest(reason)
            return wrapped(*args, **kwargs)
        return inner
    return wrapper

def expectedException(exception_or_type: Union[Exception, type]):
    def wrapper(wrapped):
        @wraps(wrapped)
        def inner(self: TestCase, *args, **kwargs):
            if isinstance(exception_or_type, type):
                _type = exception_or_type
                _value = None
            else:
                _type = exception_or_type.__class__
                _value = exception_or_type.__repr__()
            with self.assertRaises(_type) as cm:
                wrapped(self, *args, **kwargs)
            if _value is not None:
                self.assertEqual(_value, cm.exception.__repr__())
            # try:
            #     return wrapped(self, *args, **kwargs)
            # except _type as t:
            #     if _value is None or _value == t.__repr__():
            #         return
            #     raise t
            # else:
            #     raise
        return inner
    return wrapper