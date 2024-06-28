from enum import Enum
from typing import List, Tuple, Optional
from abc import ABC, abstractmethod

class NodeType(Enum):
    ROOT_NODE = 1
    ELEMENT_NODE = 2
    ATTRIBUTE_NODE = 3
    DATA_NODE = 4


class Node(ABC):
    def __init__(self):
        self.m_name: str = ""
        self.m_children: List['Node'] = []
        self.m_bind_info: List[Tuple[str, str]] = []
        self.m_auxiliary_data: str = ""
    
    def get_auxiliary_data(self) -> str:
        return self.m_auxiliary_data

    def get_name(self) -> str:
        return self.m_name
    
    def get_num_children(self) -> int:
        return len(self.m_children)

    def get_children(self, idx : int) -> Optional['Node']:
        if idx < len(self.m_children):
            return self.m_children[idx]
        return None
    
    def add_child(self, child : 'Node', binding_events: List[str] | None = None)-> Tuple[str, str] | None:
        self.m_children.append(child)
        return None
    
    def get_num_bind(self):
        return len(self.m_bind_info)
    
    def get_bind_info(self, idx : int) -> Tuple[str, str]:
        if idx < len(self.m_bind_info):
            return self.m_bind_info[idx]
        return ("", "")
    
    def has_attribute(self, attribute_names: List[str]) -> bool:
        # Dummy implementation as there's no attribute data in the base class
        return False

    def get_attribute(self, attribute_names: List[str]) -> str | None:
        # Dummy implementation as there's no attribute data in the base class
        return None

    @abstractmethod
    def type(self) -> NodeType:
        pass

    @abstractmethod
    def to_string(self) -> str:
        pass

class RootNode(Node):
    def __init__(self):
        super().__init__()
        self.m_depth = 0
    
    def type(self) -> NodeType:
        return NodeType.ROOT_NODE
    
    def to_string(self) -> str:
        return "#root {depth: 0}"

    def get_depth(self) -> int:
        return self.m_depth
    
    def add_root_child(self, child : Optional['RootNode']) -> None:
        return_val = super().add_child(child)
        assert(return_val is None)
        assert(child.type() == NodeType.ELEMENT_NODE)
        child.m_depth += 1

class ElementWrapperNode(RootNode):
    def __init__(self, tag_meta_info : Tuple[str, bool] | None):
        super().__init__()

        if tag_meta_info is not None:
            self.m_name = tag_meta_info[0]
            self.m_auxiliary_data = "False" if (tag_meta_info[1] is True) else "True"

    def type(self) -> NodeType:
        return NodeType.ELEMENT_NODE
    
    def to_string(self) -> str:
        return f"#element{{ {self.m_name} }} {{depth: {self.m_depth} }}";

    def add_child(self, child: Node, binding_events: List[str] | None = None) -> Tuple[str] | None:
        return_val = super().add_child(child, binding_events)
        assert(return_val is None)

        if (child.type() == NodeType.ATTRIBUTE_NODE and binding_events is not None):

            try:
                idx = binding_events.index(child.m_name)
                _ = binding_events[idx]  # it will be the element if found
                return (child.m_name, child.m_auxiliary_data)
            except ValueError:
                return None
        return None
    
    def has_end_tag(self) -> bool:
        return self.m_auxiliary_data == "True"
    
    def has_attribute(self, attribute_names: List[str]) -> bool:
        for child in self.m_children:
            if (child.type() == NodeType.ATTRIBUTE_NODE):
                try:
                    idx = attribute_names.index(child.m_name)
                    _ = attribute_names[idx]  # it will be the element if found
                    return True
                except ValueError:
                    continue
        return False
    
    def get_attribute(self, attribute_names: List[str]) -> str | None:
        for child in self.m_children:
            if (child.type() == NodeType.ATTRIBUTE_NODE):
                try:
                    _ = attribute_names.index(child.m_name)
                    return child.m_auxiliary_data
                except ValueError:
                    continue
        return None

    def count_num_subelements(self, element_name : str) -> int:
        count = 0
        for child in self.m_children:
            if (child.type() == NodeType.ATTRIBUTE_NODE and child.m_name == element_name):
                count += 1
        
        return count
    

class AttriuteNode(Node):

    def __init__(self, attribute_name : str, attribute_value : str):
        super().__init__()

        self.m_name = attribute_name
        self.m_auxiliary_data = attribute_value
    
    def type(self) -> NodeType:
        return NodeType.ATTRIBUTE_NODE
    
    def to_string(self) -> str:
        return f"#attribute {{ {self.m_name}: {self.m_auxiliary_data} }}"

class DataNode(Node):
        def __init__(self, data : str, is_script : bool):
            super().__init__()
            self.m_name = data
            self.m_auxiliary_data = "True" if is_script else "False"
    
        def type(self) -> NodeType:
            return NodeType.DATA_NODE
    
        def to_string(self) -> str:
            return f"#scriptdata {{ {self.m_name}}}" if self.m_auxiliary_data == "True" else f"#data {{ {self.m_name}}}"

