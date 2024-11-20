try:
    import __builtin__ as builtins
except ImportError:
    import builtins
import sys
import importlib.util
import logging
import types
import threading

logger = logging.getLogger("minium")

_origimport = __import__


# rewrite importlib.util._LazyModule
class _LazyModule(types.ModuleType):

    """A subclass of the module type which triggers loading upon attribute access."""

    def __getattribute__(self, attr):
        __dict__ = super(types.ModuleType, self).__getattribute__("__dict__")
        if attr in __dict__:
            return __dict__[attr]
        elif attr == "__dict__":
            return __dict__
        elif attr == "__class__":
            return super(types.ModuleType, self).__getattribute__("__class__")
        load_lock: '_RLock' = self.__spec__.loader_state["load_lock"]
        if not load_lock.acquire(blocking=False):  # 不是当前线程占用
            load_lock.acquire()
        elif load_lock.count > 1:
            return super(types.ModuleType, self).__getattribute__(attr)
        try:
            if self.__class__ == types.ModuleType:
                return getattr(self, attr)
            """Trigger the load of the module and return the attribute."""
            # All module metadata must be garnered from __spec__ in order to avoid
            # using mutated values.
            # Stop triggering this method.
            # 👇 rewrite, move to finally
            # self.__class__ = types.ModuleType
            # Get the original name to make sure no object substitution occurred
            # in sys.modules.
            original_name = self.__spec__.name
            # Figure out exactly what attributes were mutated between the creation
            # of the module and now.
            attrs_then = self.__spec__.loader_state['__dict__']
            attrs_now = __dict__
            attrs_updated = {}
            for key, value in attrs_now.items():
                # Code that set the attribute may have kept a reference to the
                # assigned object, making identity more important than equality.
                if key not in attrs_then:
                    attrs_updated[key] = value
                elif id(attrs_now[key]) != id(attrs_then[key]):
                    attrs_updated[key] = value
            self.__spec__.loader.exec_module(self)
            # If exec_module() was used directly there is no guarantee the module
            # object was put into sys.modules.
            if original_name in sys.modules:
                if id(self) != id(sys.modules[original_name]):
                    raise ValueError(f"module object for {original_name!r} "
                                    "substituted in sys.modules during a lazy "
                                    "load")
            # Update after loading since that's what would happen in an eager
            # loading situation.
            __dict__.update(attrs_updated)
        finally:
            # Stop triggering this method.
            self.__class__ = types.ModuleType
            load_lock.release()
        return getattr(self, attr)

    def __delattr__(self, attr):
        """Trigger the load and then perform the deletion."""
        # To trigger the load and raise an exception if the attribute
        # doesn't exist.
        self.__getattribute__(attr)
        delattr(self, attr)

    
class _RLock(object):
    lock: threading.RLock
    count: int
    def __init__(self):
        self.lock = threading.RLock()
        self.count = 0

    def acquire(self, blocking=True):
        if self.lock.acquire(blocking=blocking):
            self.count += 1
            return True
        return False
    
    def release(self):
        self.lock.release()
        self.count -= 1

class LazyLoader(importlib.util.LazyLoader):
    def exec_module(self, module) -> None:
        super().exec_module(module)
        module.__class__ = _LazyModule
        loader_state = module.__spec__.loader_state
        loader_state["load_lock"] = _RLock()

def check_package(name, package=None):
    spec = importlib.util.find_spec(name, package)
    if spec is None:
        # logger.warning(f"can't find the {name!r} module")
        return None
    return spec

def lazy_import(name, package=None):
    """lazy import module"""
    spec = importlib.util.find_spec(name, package)
    if spec is None:
        # logger.warning(f"can't find the {name!r} module")
        return None
    original_name = spec.name
    if original_name in sys.modules:
        return sys.modules[original_name]
    loader = LazyLoader(spec.loader)
    spec.loader = loader
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    loader.exec_module(module)
    return module

def _lazyimport(name, globals=None, locals=None, fromlist=None, level=0):
    logger.warning(f"_lazyimport({name}, {globals is None}, {locals is None}, {fromlist}, {level})")
    if fromlist or name == "_io":
        return _origimport(name, globals, locals, fromlist, level)
    return lazy_import(name)

def enable():
    "enable global demand-loading of modules"
    global is_enabled
    if not is_enabled:
        builtins.__import__ = _lazyimport
        is_enabled = True

def disable():
    "disable global demand-loading of modules"
    global is_enabled
    if is_enabled:
        builtins.__import__ = _origimport
        is_enabled = False

is_enabled = False
class enabled(object):
    def __enter__(self):
        global is_enabled
        self.old = is_enabled
        if not is_enabled:
            enable()
    def __exit__(self, *args):
        if not self.old:
            disable()

if __name__ == "__main__":
    pass