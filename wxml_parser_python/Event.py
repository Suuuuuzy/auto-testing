from dataclasses import dataclass, field, asdict
from typing import Dict, List
import json

@dataclass
class EventTarget:
    m_id : str = ""
    m_offset_left : float = 0.0
    m_offset_top : float = 0.0
    m_tag_name : str = ""
    m_dataset : Dict[str, any] = field(default_factory=dict)

@dataclass
class TouchObject:
    m_identifier : float = 0.0
    m_page_x : float = 0.0
    m_page_y : float = 0.0
    m_client_x : float = 0.0
    m_client_y : float = 0.0

@dataclass
class CanvasTouchObject:
    m_identifier: float = 0.0
    m_x : float = 0.0
    m_y : float = 0.0

@dataclass
class m_Touches:
    m_array : List[TouchObject] = field(default_factory=list)
    m_changed_array : List[TouchObject] = field(default_factory=list)

@dataclass
class m_Canvas_Touches:
    m_array : List[CanvasTouchObject] = field(default_factory=list)
    m_changed_array : List[CanvasTouchObject] = field(default_factory=list)

@dataclass 
class TouchEventProperties:
    m_is_canvas_touch : bool = False
    m_touches : m_Touches = field(default_factory=m_Touches)
    m_canvas_touches : m_Canvas_Touches = field(default_factory=m_Canvas_Touches)

@dataclass 
class m_Current_Target:
    m_has_current_target : bool = True
    m_current_target_properties : EventTarget = field(default_factory=EventTarget)

@dataclass
class m_Touch_Event:
    m_is_touch : bool = False
    m_touch_event_properties : TouchEventProperties = field(default_factory=TouchEventProperties)

@dataclass
class EventInstance:
    m_is_bubbling : bool = True
    m_type : str = ""
    m_timestamp : int = 0
    m_target : EventTarget = field(default_factory=EventTarget)
    m_current_target : m_Current_Target = field(default_factory=m_Current_Target)
    m_marks : Dict[str, any] = field(default_factory=dict)
    m_details : Dict[str, any] = field(default_factory=dict)
    m_touch_event: m_Touch_Event = field(default_factory=m_Touch_Event)

@dataclass
class SimplifiedEventInstance:
    m_details : Dict[str, any] = field(default_factory=dict)
    m_type : str = ""
    m_tag_name : str = ""
    m_xpath : str = ""
    m_attributes : Dict[str, any] = field(default_factory=dict)
    m_data : List[str] = field(default_factory=list)

class EventInstanceEncoder(json.JSONEncoder):
    def default(self, obj):
        if (isinstance(obj, EventTarget) or isinstance(obj, TouchObject) or
        isinstance(obj, CanvasTouchObject) or isinstance(obj, m_Touches) or
        isinstance(obj, m_Canvas_Touches) or isinstance(obj, TouchEventProperties) or
        isinstance(obj, m_Current_Target) or isinstance(obj, m_Touch_Event) or
        isinstance(obj, EventInstance) or isinstance(obj, SimplifiedEventInstance)):
            return asdict(obj)  # Convert dataclass instance to dictionary
        return super().default(obj)