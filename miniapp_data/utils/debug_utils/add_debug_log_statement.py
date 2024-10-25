import os
from typing import List, Dict, Optional


# constants used for shifts
goto_child_parent_flags: Dict[str, str] = {"}": "{", "]": "[", ")": "("}
goto_neighbor_flags: List[str] = [",", ";"]
goto_quotation_flags: List[str] = ['"', "'"]

# constants used for parse
opcode_arr: List[str] = ["ASSIGN", "APPLY", "FUNC"]


class BasicJSNode:
    def __init__(
        self, node_type: str = "root", node_layer: int = 0, node_core_flag: bool = False
    ) -> None:
        self.node_type = node_type
        self.node_layer = node_layer
        self.node_core_flag = node_core_flag
        self.children: List[BasicJSNode] = []

    def append_children(self, child) -> int:
        try:
            child.node_layer = self.node_layer + 1
            self.children.append(child)
        except Exception as e:
            print(f"encountering error when trying to add child node: {str(e)}")
            return -1

        return len(self.children)

    def write_self_and_children(self, file_descripter=None):
        if file_descripter is None:
            return
        file_descripter.write("".join(" " for _ in range(self.node_layer)))
        file_descripter.write(self.node_type)
        file_descripter.write("\n")
        for child in self.children:
            child.write_self_and_children(file_descripter)

        if self.node_core_flag is True:
            file_descripter.write("\n")


class BasicJSParser:
    def __init__(self, text: str = "") -> None:
        self.text: str = text
        self.total_len: int = len(text)
        print(f"received text with length {self.total_len}")
        self.len_parsed: int = 0
        self.cur_layer: int = 1
        self.parser_stack: List[str] = []
        self.parser_tree_stack: List[BasicJSNode] = [BasicJSNode(node_core_flag=True)]

    def peek_next(self, num_char: int = 1) -> Optional[str]:
        if self.len_parsed + num_char >= self.total_len:
            return None
        return self.text[self.len_parsed : self.len_parsed + num_char]

    def consume_next(self, num_char: int = 1) -> Optional[str]:
        peek_result = self.peek_next(num_char)
        if peek_result is not None:
            self.len_parsed += num_char
        return peek_result

    def create_opcode(self, opcode: int) -> BasicJSNode:
        return BasicJSNode(node_type=opcode_arr[opcode], node_core_flag=True)

    def parse_all(self):
        self.parse_body()

    def parse_body(self):
        # iteratively parse, statement by statement
        while self.parse_single_stmt() is not False:
            continue

    def parse_single_stmt(self) -> bool:
        # first check if we have sonsumed all text
        # if it is so, directly return False
        current_char = self.consume_next()
        if current_char is None:
            return False

        # otherwise starts parsing
        # first record down the current layer
        # stmt_layer = self.cur_layer
        buf_str: str = ""
        assign_opcode = None
        lhs = None

        # exterior condition: always ensure we have not reach the end of the line
        while not (self.cur_layer == 1 and current_char in goto_neighbor_flags):

            # assignment
            if self.cur_layer == 1 and current_char == "=":
                assign_opcode = self.create_opcode(opcode=0)
                lhs = self.parse_single_comp(buf_str)
                buf_str = ""

            if current_char in goto_child_parent_flags.values():
                self.cur_layer += 1
                self.parser_stack.append(current_char)

            if (
                current_char in goto_child_parent_flags.keys()
                and self.parser_stack[-1] == goto_child_parent_flags[current_char]
            ):
                self.cur_layer -= 1
                self.parser_stack.pop()

            # ending the loop by appending the current character
            buf_str += current_char
            current_char = self.consume_next()
            if current_char is None:
                print("------ unexpected end of line -------")
                return False

        rhs = self.parse_single_comp(buf_str)
        if lhs is not None and assign_opcode is not None:
            self.parser_tree_stack[-1].append_children(assign_opcode)
            self.parser_tree_stack[-1].append_children(lhs)
        self.parser_tree_stack[-1].append_children(rhs)
        return True

    def parse_single_comp(self, lit_str: str):
        return BasicJSNode(node_type=lit_str)

    def parse_assign_stmt(self, lhs: str):
        new_node = BasicJSNode(node_type="assign")
        self.parser_tree_stack[-1].append_children(new_node)
        self.parser_tree_stack.append(new_node)
        self.parser_tree_stack[-1].append_children(BasicJSNode(node_type=lhs))
        self.cur_layer += 1
        self.parse_basic_comp(stoppers=self.goto_neighbor_flags)
        self.cur_layer -= 1
        self.parser_tree_stack.pop()

    def parse_apply_stmt(self, lhs: str):
        new_node = BasicJSNode(node_type=f"apply_{lhs}")
        self.parser_tree_stack[-1].append_children(new_node)
        self.parser_tree_stack.append(new_node)
        self.cur_layer += 1
        self.parse_basic_comp(stoppers=[")"])
        self.cur_layer -= 1
        self.parser_tree_stack.pop()

    def parse_basic_comp(self, stoppers: List[str] = []):
        buf_str: str = ""
        orig_layer: int = self.cur_layer
        current_char = self.consume_next()

        while current_char is not None:

            buf_str += current_char

            if self.cur_layer == orig_layer and current_char in stoppers:
                # self.parser_tree_stack.pop()
                return

            # go into child level
            if current_char in self.goto_child_parent_flags.values():
                self.parser_stack.append(current_char)
                new_node = BasicJSNode(node_type=buf_str)
                self.parser_tree_stack[-1].append_children(new_node)
                self.parser_tree_stack.append(new_node)
                self.cur_layer += 1
                buf_str = ""

            # return to parent level
            elif current_char in self.goto_child_parent_flags.keys() and (
                len(self.parser_stack) > 0
                and self.parser_stack[-1] == self.goto_child_parent_flags[current_char]
            ):
                self.parser_stack.pop()
                new_node = BasicJSNode(node_type=buf_str)
                self.parser_tree_stack[-1].append_children(new_node)
                self.parser_tree_stack.pop()

                self.cur_layer -= 1
                buf_str = ""

            # goto the next statement line
            elif current_char in self.goto_neighbor_flags:
                new_node = BasicJSNode(node_type=buf_str)
                self.parser_tree_stack[-1].append_children(new_node)
                buf_str = ""

            current_char = self.consume_next()

    def parse_require_stmt(self, end_indicator: str) -> str:
        require_script_buf: str = ""
        while True:
            consume_char = self.consume_next()
            if consume_char != end_indicator:
                require_script_buf += consume_char
            else:
                break
        try:
            consume_char = self.consume_next()
            assert consume_char == ")"
        except Exception as e:
            print(f"expecting the next character to be ')', instead got {consume_char}")
            exit(0)
        peeking_end = self.peek_next()
        if peeking_end in self.goto_neighbor_flags:
            self.consume_next()
        return require_script_buf

    def write_all(self, file_descripter=None):
        if file_descripter is None:
            print(f"unable to write anything because the file descripter is null")
            return

        self.parser_tree_stack[0].write_self_and_children(file_descripter)


if __name__ == "__main__":
    ROOT_DIR = "last25_data"
    MINIPROGRAM_DIR = "wxfdcee92a299bcaf1_腾讯公益"
    FILE_DIR = "pages/index/main.js"
    path_dir = os.path.join(ROOT_DIR, MINIPROGRAM_DIR, FILE_DIR)

    with open(path_dir, "r", encoding="utf-8") as f:
        js_parser = BasicJSParser(text=f.read())

    js_parser.parse_all()

    with open("output.txt", "w", encoding="utf-8") as f:
        js_parser.write_all(f)
