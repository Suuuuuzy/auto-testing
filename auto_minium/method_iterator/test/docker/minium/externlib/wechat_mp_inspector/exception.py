class UniqueContextIdNotFound(Exception): ...  # context改变了, ID不存在了

class InspectorDetachedError(ConnectionError): ...  # inspector crash
