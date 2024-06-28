

class Attribute():

    def __init__(self, name : str = "", value : str = ""):
        self.m_name = name
        self.m_value = value
    
    def name(self):
        return self.m_name

    def value(self):
        return self.m_value
    
    def append_name(self, str_lit : str) -> None:
        self.m_name += str_lit

    def append_value(self, str_lit : str) -> None:
        self.m_value += str_lit
    
    def set_value(self, value : str) -> None:
        self.m_value = value