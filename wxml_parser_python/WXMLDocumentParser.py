from typing import List, Tuple, Dict

import Node as NodeScript
import Utils as UtilsScript
import Event as EventScript
import HTMLToken as HTMLTokenScript
import HTMLTokenizer as HTMLTokenizerScript
import Custom_Exceptions as ExceptionScript
from API_Data import BINDING_PREFIX, BUBBLING_EVENTS, NON_BUBBLING_BINDING_EVENTS

PARSER_DEBUG_TOKEN = False


POTENTIAL_IDENTIFIER_AND_INPUT : Dict[str, Dict[str, str | int]]= {'电话' : {'value': "13880000000", 'cursor': 11, 'keyCode': 86},
                                                                   '手机':{'value': "13880000000", 'cursor': 11, 'keyCode': 86},
                                                                   'phone':{'value': "13880000000", 'cursor': 11, 'keyCode': 86},
                                                                   'mobile':{'value': "13880000000", 'cursor': 11, 'keyCode': 86},
                                                                   '邮箱': {'value': "string_sample@163.com", 'cursor': 21, 'keyCode': 86},
                                                                   'email': {'value': "string_sample@163.com", 'cursor': 21, 'keyCode': 86}}

class WXMLDocumentParser():

    def __init__(self, input: str = "", page_name : str = ""):
        self.m_page_name : str = page_name
        self.m_root : NodeScript.RootNode = NodeScript.RootNode()
        self.m_stack_of_open_elements : List[NodeScript.RootNode] = []
        self.m_bind_storage : List[Tuple[str, str, NodeScript.ElementWrapperNode]] = []
        self.m_binding_events : List[str] = NON_BUBBLING_BINDING_EVENTS.copy()
        for prefix in BINDING_PREFIX:
            for event in BUBBLING_EVENTS:
                self.m_binding_events.append(prefix + event)

        self.m_tokenizer : HTMLTokenizerScript.HTMLTokenizer = HTMLTokenizerScript.HTMLTokenizer(input)
        self.m_ran_through : bool = False
    
    def next_token(self) -> HTMLTokenScript.HTMLToken:
        return self.m_tokenizer.next_token()
    
    def run(self, print_ast_flag : bool = False) -> str:
        assert (self.m_ran_through is False)

        token : HTMLTokenScript.HTMLToken = HTMLTokenScript.HTMLToken()
        loop_flag : bool = True
        self.m_stack_of_open_elements.append(self.m_root)

        while loop_flag is True:

            token = self.m_tokenizer.next_token()

            if token.m_type == HTMLTokenScript.TokenType.StartTag:
                element_node : NodeScript.ElementWrapperNode = NodeScript.ElementWrapperNode(token.get_tag_meta_info())
                self.m_stack_of_open_elements[-1].add_root_child(element_node)

                for attr in token.m_tag.m_attributes:
                    return_val : Tuple[str] | None = element_node.add_child(NodeScript.AttriuteNode(attr.m_name, attr.m_value), self.m_binding_events)

                    if return_val is not None:
                        self.m_bind_storage.append((return_val[0], return_val[1], element_node))
                    
                if element_node.has_end_tag():
                    self.m_stack_of_open_elements.append(element_node)
                
                continue

            if token.m_type == HTMLTokenScript.TokenType.EndTag:
                assert token.m_tag.m_tag_name == self.m_stack_of_open_elements[-1].get_name()

                for attr in token.m_tag.m_attributes:
                    self.m_stack_of_open_elements[-1].add_child(NodeScript.AttriuteNode(attr.m_name, attr.m_value))
                
                self.m_stack_of_open_elements.pop()

                continue

            if token.m_type == HTMLTokenScript.TokenType.Character:

                for segment in UtilsScript.segment_string(token.m_comment_or_character.m_data):
                    self.m_stack_of_open_elements[-1].add_child(NodeScript.DataNode(segment[0], segment[1]))
                
                continue

            if token.m_type == HTMLTokenScript.TokenType.Comment:
                ExceptionScript.ASSERT_UNIMPLEMENTED()
            
            if token.m_type == HTMLTokenScript.TokenType.DOCTYPE:
                ExceptionScript.ASSERT_UNIMPLEMENTED()

            if token.m_type == HTMLTokenScript.TokenType.EndOfFile:
                loop_flag = False
                continue        

            ExceptionScript.ASSERT_NOT_REACHED()

        self.m_stack_of_open_elements.pop()
        assert (len(self.m_stack_of_open_elements) == 0)      

        self.m_ran_through = True
        self.m_tokenizer.restore()

        if print_ast_flag is True:
            UtilsScript.print_ast(self.m_root)  
        
        return_buf : List[str] = ['']
        UtilsScript.get_ast(self.m_root, return_buf)
        return return_buf[0]
    
    def print_tokens(self) -> None:
        token : HTMLTokenScript.HTMLToken = HTMLTokenScript.HTMLToken()
        
        while (token.m_type != HTMLTokenScript.TokenType.EndOfFile):
            token = self.m_tokenizer.next_token()
            print(f"EMIT: {token.to_string()}")
        
        self.m_tokenizer.restore()

    def print_all_bind_elements(self) -> None:    
        if (self.m_ran_through is False):
            self.run()

        UtilsScript.print_bind_elements(self.m_root)
    
    def get_all_bind_elements(self) -> List[Dict[str, any]]:
        
        if (self.m_ran_through is False):
            self.run()
        
        bind_json_arr : List[Dict[str, any]] = []
        UtilsScript.get_bind_element_json(self.m_root, bind_json_arr)

        return bind_json_arr

    def get_all_bind_elements_args(self, get_full_info : bool = False) -> Dict[str, any]:

        if self.m_ran_through is False:
            self.run()

        bind_arg_map : Dict[str, List[EventScript.EventInstance] | List[EventScript.SimplifiedEventInstance]] = {}

        for instance in self.m_bind_storage:
            function_call : str = instance[1]
            tag_name : str = instance[2].get_name()

            try:
                if get_full_info is True:
                    current_event_instance : EventScript.EventInstance = self._args_for_bind_element(instance, True)
                else:
                    current_event_instance : EventScript.SimplifiedEventInstance = self._args_for_bind_element(instance, False)

                bind_arg_map.setdefault(function_call, [])
                bind_arg_map[function_call].append(current_event_instance)

            except Exception as e:

                if str(e) == "Bind Function type not implemented yet.":
                    if tag_name == 'video' or tag_name == 'scroll-view':
                        print(f"Callback functions for element {tag_name} unimplemented")
                    else:
                        print(f"Element {tag_name} bind function {instance[0]} not yet implemented")
                    continue

                if str(e) == "Data is script instead of WXML-readable format.":
                    print(f"Element {tag_name} uses data in js script instead of WXML-readable format")
                    continue
                
                print(f"Caught other error: {str(e)}")
                return bind_arg_map
    
        return bind_arg_map
    
    def _args_for_bind_element(self, bind_info : Tuple[str, str, NodeScript.ElementWrapperNode], get_full_info : bool) -> EventScript.EventInstance | EventScript.SimplifiedEventInstance:
        
        bind_method : str = bind_info[0]
        # function_call : str = bind_info[1]
        ref_node : NodeScript.ElementWrapperNode = bind_info[2]
        tag_name : str = ref_node.get_name()

        event_instance : EventScript.EventInstance  = EventScript.EventInstance()
        event_instance.m_type = bind_method[4:]
    
        default_current_event_target : EventScript.EventTarget = EventScript.EventTarget()
        event_instance.m_current_target.m_has_current_target = True
        event_instance.m_current_target.m_current_target_properties = default_current_event_target 

        for idx in range(ref_node.get_num_children()):
            ref_child : NodeScript.Node | None = ref_node.get_children(idx)

            if (ref_child is not None and ref_child.type() == NodeScript.NodeType.ATTRIBUTE_NODE):
                attribute_name = ref_child.get_name()

                if (len(attribute_name) > 5 and attribute_name[:5] == "data-"):
                    attribute_dataname : str = attribute_name[5:].decode('utf-8', errors='replace')
                    attribute_dataval : str = ref_child.get_auxiliary_data().decode('utf-8', errors='replace')
                    event_instance.m_target.m_dataset[attribute_dataname] = attribute_dataval
                
                elif (len(attribute_name) > 5 and attribute_name[:5] == "mark:"):
                    attribute_markname : str = attribute_name[5:].decode('utf-8', errors='replace')
                    attribute_markval : str = ref_child.get_auxiliary_data().decode('utf-8', errors='replace')
                    event_instance.m_marks[attribute_markname] = attribute_markval
                
                if bind_method not in NON_BUBBLING_BINDING_EVENTS:
                     
                    # bubbling event
                    event_name : str = UtilsScript.stripout_bubbling_event(bind_method)
                    event_instance.m_type = event_name
                    event_instance.m_target.m_tag_name = tag_name
                    event_instance.m_current_target.m_current_target_properties.m_tag_name = tag_name
                     
                     
                    if (event_name == "tap" or event_name == "longpress" or
                        event_name == "longtap" or event_name == "touchstart" or
                        event_name == "touchmove" or event_name == "touchend" or
                        event_name == "touchcancel"):
                        
                        touch : EventScript.TouchObject = EventScript.TouchObject()
                        changed_touch : EventScript.TouchObject = EventScript.TouchObject()
                        event_instance.m_touch_event.m_is_touch = True

                        event_instance.m_touch_event.m_touch_event_properties.m_touches.m_array.append(touch)
                        event_instance.m_touch_event.m_touch_event_properties.m_touches.m_changed_array.append(changed_touch)


                        if (event_name == "tap" or event_name == "longpress" or event_name == "longtap"):
                            event_instance.m_details["x"] = event_instance.m_touch_event.m_touch_event_properties.m_touches.m_array[0].m_client_x
                            event_instance.m_details["y"] = event_instance.m_touch_event.m_touch_event_properties.m_touches.m_array[0].m_client_y

                        return self._return_event_instance(event_instance, get_full_info)
                     
                    ExceptionScript.ASSERT_UNIMPLEMENTED()         
                    
                else:
                    #non-bubbling event

                    event_idx : int = NON_BUBBLING_BINDING_EVENTS.index(bind_method)
                    prior_idx : int = 0

                    if event_idx < prior_idx + 5:
                        
                        if tag_name == 'button':
                            #  <button>
                            # "bindgetuserinfo"
                            # "bindgetphonenumber"
                            # "bindchooseavatar"
                            # "bindopensetting"
                            # "bindlaunchapp"
                            # "bindsubmit"
                            # match within the first five elements (namely the button ones)

                            # ensure that the element will be a button element  

                            if event_idx == prior_idx:
                                assert bind_method == 'bindgetuserinfo'

                                get_open_type : str | None = ref_node.get_attribute(['open-type', 'openType', 'opentype'])
                                assert get_open_type is not None
                                assert get_open_type == 'getUserInfo'

                    
                                # for getuserinfo the detail is callback information of wx.getUserInfo
                                # it is composed of the following components:

                                # encryptedData {some encrypted string}
                                # errMsg {currently as "getUserInfo:ok". This will be our default value}
                                # iv {some random string}
                                # rawData {possible the return value of wx.getUserInfo}

                                #         avatarUrl: {str, here set the default value to
                                #                     the one provided for the basic miniprogram architecture:
                                #                     "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"}
                                #         city: {str}
                                #         country: {str}
                                #         gender: {integer, may be represented as 0/1}
                                #         language: {str}
                                #         nickName: {str}
                                #         province: {str}

                                # set to a random string
                                event_instance.m_details["encryptedData"] = "WHZ2K5YGIp9D5AjIMo9tz+H3G5NYWjLiKXvyKWCrY6lTykC26vO"
                                event_instance.m_details["iv"] = "si5BVYyuykJtuA+8/RSRJg=="

                                #  fit in errMsg to "ok"
                                event_instance.m_details["errMsg"] = "getUserInfo:ok"

                                # TODO:
                                # potentially set up with alternative range of detail raw_data?

                                raw_data : Dict[str, any] = {}
                                raw_data["avatarUrl"] = "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
                                raw_data["city"] = "Chengdu"
                                raw_data["gender"] = 0
                                raw_data["language"] = "English"
                                raw_data["nickName"] = "NICKNAME"

                                event_instance.m_details["rawData"] = raw_data
                                return self._return_event_instance(event_instance, get_full_info)


                            if event_idx == prior_idx + 1:
                                assert bind_method == "bindgetphonenumber"
                                # "bindgetphonenumber"

                                #  手机号快速验证回调，open-type=getPhoneNumber时有效。
                                # Tips：在触发 bindgetphonenumber 回调后应立即隐藏手机号按钮组件，
                                # 或置为 disabled 状态，避免用户重复授权手机号产生额外费用。
                                get_open_type : str | None = ref_node.get_attribute(["open-type", "openType", "opentype"])
                                assert get_open_type is not None
                                assert  get_open_type == "getPhoneNumber"

                                # an error occurs. likely due to information on this website:
                                # https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html

                                # TODO:
                                # potentially set up with alternative range of detail raw_data? if the phone number can be actually obtained
                                
                                event_instance.m_details["errMsg"] = "getPhoneNumber:fail Error: The mobile phone user bound needs to be verified. Please complete the SMS verification step on the client"
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 2:
                                
                                assert bind_method == "bindchooseavatar"
                                # "bindchooseavatar"
                                # 获取用户头像回调，open-type=chooseAvatar时有效
                    
                                get_open_type : str | None = ref_node.get_attribute(["open-type", "openType", "opentype"])
                                assert get_open_type is not None
                                assert get_open_type == "chooseAvatar"

                    
                                # details only contains the chosen avatar's url
                                # here use the same link as the one in userInfo
                    
                                event_instance.m_details["avatarUrl"] = "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 3:
                                assert bind_method == "bindopensetting"
                                # "bindopensetting"
                                # 在打开授权设置页后回调，open-type=openSetting时有效
                    
                                get_open_type : str | None = ref_node.get_attribute(["open-type", "openType", "opentype"])
                                assert get_open_type is not None
                                assert get_open_type == "openSetting"

                                # details include:
                                # authSetting
                                #     scope.userLocation: {bool} give default to true
                                #     scope.writePhotosAlbum: {bool} give default to true

                                # errMsg: {str} "openSetting:ok"

                                event_instance.m_details["errMsg"] = "openSetting:ok"
                    
                                # TODO:
                                # perhaps more alternatives?

                                auth_setting : Dict[str, any] = {}
                                auth_setting["scope.userLocation"] = True
                                auth_setting["scope.writePhotosAlbum"] = True

                                event_instance.m_details["authSetting"] = auth_setting
                                return self._return_event_instance(event_instance, get_full_info)
            
                            if event_idx == prior_idx + 4:
                
                                assert bind_method == "bindlaunchapp"
                                # "bindlaunchapp"
                                # 打开 APP 成功的回调，open-type=launchApp时有效

                                # don't work with simply tapping also never really appears in the list of miniprograms
                                # so left unimplemented for now

                                ExceptionScript.ASSERT_UNIMPLEMENTED()

                        ExceptionScript.ASSERT_UNIMPLEMENTED()
                
                    prior_idx += 5
                    if event_idx < prior_idx + 10:

                        if tag_name == "scroll-view":
                            
                            #  <scroll - view>
                            #  "binddragstart"
                            #  "binddragging"
                            #  "binddragend"
                            #  "bindscrolltoupper"
                            #  "bindscrolltolower"
                            #  "bindscroll"
                            #  "bindrefresherpulling"
                            #  "bindrefresherrefresh"
                            #  "bindrefresherrestore"
                            #  "bindrefresherabort"

                            #  match within the next ten elements (namely the scroll-view ones)

                            #  ensure that the element will be a scroll-view element


                            if event_idx <= prior_idx + 1:
                                
                                assert bind_method == "binddragstart" or bind_method == "binddragging"
                                #  "binddragstart"
                                # 滑动开始事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }
                                # "binddragging"
                                # 滑动事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }
                                # all attributes are the same so placed together

                                assert ref_node.has_attribute(["enhanced"])

                                #  details include:
                                #  {scrollTop: 0, scrollLeft: 0}
                                # set to default 0

                                event_instance.m_details["scrollTop"] = 0.0
                                event_instance.m_details["scrollLeft"] = 0.0
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 2:
                
                                assert bind_method == "binddragend"
                                #"binddragend"
                                # 滑动结束事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft, velocity }
                                assert ref_node.has_attribute(["enhanced"])

                    
                                #  details include:
                                #  scrollLeft: 0
                                #  scrollTop: 260.3647766113281
                                #  velocity: {x: 0, y: 1.3490402933229437}
                     

                                #  set to default 0
                                velocity : Dict[str, any] = {}
                                velocity["x"] = 0.0
                                velocity["y"] = 0.0
                                event_instance.m_details["scrollTop"] = 0.0
                                event_instance.m_details["scrollLeft"] = 0.0
                                event_instance.m_details["velocity"] = velocity
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx <= prior_idx + 4:
                
                                assert bind_method == "bindscrolltoupper" or bind_method == "bindscrolltolower"
                                #  "bindscrolltoupper"
                                # 滚动到顶部/左边时触发

                                #  "bindscrolltolower"
                                # 滚动到底部/右边时触发

                    
                                # detail includes:
                                # direction : "bottom" / "top"
                                # 应该也可能是 left / right 取决于是scroll x 还是 scroll y
                    
                                if ref_node.has_attribute(["scroll-x", "scrollX", "scrollx"]):
                                    event_instance.m_details["direction"] = "left" if (event_idx == prior_idx + 3) else "right"
                                else:
                                    event_instance.m_details["direction"] = "top" if (event_idx == prior_idx + 3)  else "bottom"
                    
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 5:
                
                                assert bind_method == "bindscroll"

                                # bindscroll
                                # 滚动时触发，
                                # event.detail = {scrollLeft, scrollTop, scrollHeight,
                                # scrollWidth, deltaX, deltaY}

                                # details include :
                                # deltaX: 0
                                # deltaY: -25.75849151611328
                                # scrollHeight: 1381
                                # scrollLeft: 0
                                # scrollTop: 51.5202751159668
                                # scrollWidth: 320

                                # here all set to default 0
                                # but format provided to customize into other values
                                
                                event_instance.m_details["deltaX"] = 0.0
                                event_instance.m_details["deltaY"] = 0.0
                                event_instance.m_details["scrollHeight"] = 0.0
                                event_instance.m_details["scrollLeft"] = 0.0
                                event_instance.m_details["scrollTop"] = 0.0
                                event_instance.m_details["scrollWidth"] = 0.0

                                return self._return_event_instance(event_instance, get_full_info)
                
                            #  "bindrefresherpulling"
                            #  自定义下拉刷新控件被下拉

                            #  "bindrefresherrefresh"
                            #  自定义下拉刷新被触发

                            #  "bindrefresherrestore"
                            #  自定义下拉刷新被复位

                            #  "bindrefresherabort"
                            #  自定义下拉刷新被中止

                            #  自定义下拉事件，暂时没有implement
                            ExceptionScript.ASSERT_UNIMPLEMENTED()
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()

                    prior_idx += 10
                    if event_idx < prior_idx + 7:
                        # <page - container>
                        # "bind:beforeenter",
                        # "bind:enter",
                        # "bind:afterenter",
                        # "bind:beforeleave",
                        # "bind:leave",
                        # "bind:afterleave",
                        # "bind:clickoverlay",

                        # 页面容器。

                        # 小程序如果在页面内进行复杂的界面设计（如在页面内弹出半屏的弹窗、
                        # 在页面内加载一个全屏的子页面等），用户进行返回操作会直接离开当前页面，
                        # 不符合用户预期，预期应为关闭当前弹出的组件。 为此提供“假页”容器组件，
                        # 效果类似于 popup 弹出层，页面内存在该容器时，当用户进行返回操作，
                        # 关闭该容器不关闭页面。返回操作包括三种情形，右滑手势、
                        # 安卓物理返回键和调用 navigateBack 接口


                        # currently unimplemented
                        ExceptionScript.ASSERT_UNIMPLEMENTED()

                    prior_idx += 7
                    if event_idx == prior_idx:
        
                        assert bind_method == "bindscale"
                        
                        if ref_node.get_name() == "movable-view":
                            
                            # <movable - view>
                            # "bindscale"
                            # 缩放过程中触发的事件，
                            # event.detail = {x, y, scale}，
                            # x和y字段在2.1.0之后支持

                            # movable-view actually also has a bindchange function,
                            # which will be enumerated later with other possible bindchange elements

                            # ensure that the element will be a movable-view element
                            # use bindscale
                            assert ref_node.has_attribute(["scale"])

                            #  currently unable to mimic the behavior on PC due to the inability
                            #  to use both fingers.

                            #  assume both currentTarget and target are present and default

                            #  the detail field is provided based on the documentation
                            event_instance.m_details["x"] = 0.0
                            event_instance.m_details["y"] = 0.0
                            event_instance.m_details["scale"] = 0.0
                            return self._return_event_instance(event_instance, get_full_info)
                        
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 1
                    if event_idx < prior_idx + 2:
                        
                        # <cover - image> & <image>
                        # "bindload",
                        # "binderror", --> also has audio, camera (camera is unimplemented because not yet found its trigger)

            
                        # 覆盖在原生组件之上的图片视图。
                        # 可覆盖的原生组件同cover-view，支持嵌套在cover-view里
            
                        if tag_name == "cover-image" or tag_name == "image":
                            
                            assert ref_node.has_attribute(["src"])
                            
                            if event_idx == prior_idx:
                                
                                assert bind_method == "bindload"
                                # "bindload"
                                # 图片加载成功时触发

                    
                                # detail include:
                                # height: 890
                                # width: 2064

                                # assume both are pixel values, so that
                                # they would be integers
                                
                                event_instance.m_details["height"] = 0
                                event_instance.m_details["width"] = 0
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 1:
                                
                                assert bind_method == "binderror"
                                # "binderror"
                                # 图片加载失败时触发

                                # detail include
                                # {errMsg: "GET ../../asset/images/1b.png 404 (Not Found)"}

                                # here between GET and the error type should be the src data,
                                # so the src data is used for providing the errMsg
                                img_src : str | None = ref_node.get_attribute(["src"])
                                event_instance.m_details["errMsg"] = f"GET {img_src} 404 (Not Found)"
                                return self._return_event_instance(event_instance, get_full_info)
                
            
                        if tag_name == "audio":
                            
                            # only has binderror
                            # 当发生错误时触发 error 事件，
                            # detail = {errMsg:MediaError.code}
                            assert bind_method == "binderror"

                            # detail includes:
                            # an errMsg of the following possible classes

                            # 1	Access to the resource is forbidden by the user
                            # 2	Network error
                            # 3	Decoding error
                            # 4	Inappropriate resources

                            # here we would use the 4th error:
                            # errMsg: "MEDIA_ERR_SRC_NOT_SUPPORTED"
                

                            event_instance.m_details["errMsg"] = "MEDIA_ERR_SRC_NOT_SUPPORTED"
                            return self._return_event_instance(event_instance, get_full_info)
                        
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 2
                    if event_idx == prior_idx:
                        
                        assert bind_method == "bindchange"

                        # bindchange has multiple possibilities, include but not limited to
                        # <input>  (although not in the documentation)
                        # <movable-view>
                        # <checkbox-group>
                        # <radio-group>
                        # <picker>
                        # <picker-view>
                        # <slider>
                        # <swiper>
                        # <switch>
            
                        #  "bindchange"

                        if tag_name == 'input':

                            # text	文本输入键盘	
                            # number	数字输入键盘	
                            # idcard	身份证输入键盘	
                            # digit	带小数点的数字键盘	
                            # safe-password	密码安全输入键盘 指引。仅 Webview 支持。	2.18.0
                            # nickname	昵称输入键盘。	2.21.2

                            class_attr : str | None = ref_node.get_attribute(['class'])
                            class_attr : str = class_attr if class_attr is not None else ''
                            type_attr : str | None = ref_node.get_attribute(['type'])
                            type_attr : str = type_attr if type_attr is not None else 'text'

                            if type_attr == 'text':
                                for (ident, input_text) in POTENTIAL_IDENTIFIER_AND_INPUT.items():
                                    if (class_attr.lower()).find(ident) != -1:
                                        event_instance.m_details['value'] = input_text['value']
                                        return self._return_event_instance(event_instance, get_full_info)
                            
                            elif type_attr == 'number' or type_attr == 'digit':
                                # only taking the first 4 items with numbers
                                for ident, input_text in list(POTENTIAL_IDENTIFIER_AND_INPUT.items())[:4]:
                                    if (class_attr.lower()).find(ident) != -1:
                                        event_instance.m_details['value'] = input_text['value']
                                        return self._return_event_instance(event_instance, get_full_info)
                                
                                event_instance.m_details['value'] = '1234567890' if type_attr == 'number' else '7.8'
                                return self._return_event_instance(event_instance, get_full_info)
                            
                            elif type_attr == 'idcard':

                                # cited from https://www.nia.gov.cn/n741440/n741542/c1599039/content.html
                                event_instance.m_details['value'] = '911124198108030024'
                                return self._return_event_instance(event_instance, get_full_info)

                            elif type_attr == 'safe-password':
                                ExceptionScript.ASSERT_UNIMPLEMENTED()

                            elif type_attr == 'nickname':
                                event_instance.m_details['value'] = 'NICKNAME'
                                return self._return_event_instance(event_instance, get_full_info)

                            event_instance.m_details['value'] = 'hello world'
                            return self._return_event_instance(event_instance, get_full_info)
                            
                        if tag_name == "movable-view":
                            
                            # 拖动过程中触发的事件，event.detail = {x, y, source}
                            # both current target and target seems to be default at 0

                            # detail include:
                            # {x: 0, y: -5.9, source: "out-of-bounds"}
                            
                            event_instance.m_details["x"] = 0.0
                            event_instance.m_details["y"] = 0.0
                            event_instance.m_details["source"] = "out-of-bounds"
                            return self._return_event_instance(event_instance, get_full_info)
            

                        if tag_name == "checkbox-group":
            
                            # checkbox-group中选中项发生改变时触发 change 事件，
                            # detail = {value:[选中的checkbox的value的数组]}

                
                            # wxml:
                            # script value:
                            # <checkbox-group bindchange = "changeFunc"
                            #                 wx:key="tid"
                            #                     wx:for="{{todoList}}"
                            #                     wx:for-item="todo" >
                            #         <checkbox  bindtap = "tapFunc" checked="{{todo.tcheck}}"></checkbox>
                            #         <text>{{todo.twork}}</text>
                            #     </checkbox-group>

                            #     ...

                            #     js:
                            #     Page({
                            #         data: {
                            #         ...

                            #             todoList: [
                            #                 {"twork": "mop floor", "tcheck" : true},
                            #                 {"twork": "mop floor again", "tcheck" : false},]
                            #         }
                            #     })
                            

                            detail_data : List[str] = []
                            for idx in range(ref_node.get_num_children()):
                                child_node : NodeScript.Node | None = ref_node.get_children(idx)
                                if child_node.type() == NodeScript.NodeType.ELEMENT_NODE and child_node.get_name() == "checkbox":
                                    ele_val : str | None  = child_node.get_attribute(["value"])
                                    
                                    if ele_val is not None:
                                        # ensure it is not script data
                                        if ele_val[:2] != "{{" or ele_val[-2:] != "}}":
                                            detail_data.append(ele_val)

                            # this will make sure that the detail_data contains all the check-able
                            # checkboxes
                            event_instance.m_details["value"] = detail_data
                            return self._return_event_instance(event_instance, get_full_info)

                        if tag_name == 'radio-group':

                            for idx in range(ref_node.get_num_children()):
                                child_node : NodeScript.Node | None = ref_node.get_children(idx)
                                if child_node.type() == NodeScript.NodeType.ELEMENT_NODE and child_node.get_name() == "radio":
                                    ele_val : str | None  = child_node.get_attribute(["value"])
                                    
                                    if ele_val is not None and (ele_val[:2] != "{{" or ele_val[-2:] != "}}"):
                                        event_instance.m_details["value"] = ele_val
                                        return self._return_event_instance(event_instance, get_full_info)
                            
                            ExceptionScript.ASSERT_NOT_WXML_DATA()

                        if tag_name == "picker":
            
                            # check the mode
                            # both current target and target seems to be the same,
                            # referring to the checkerbox group object
                            # here set them both to default
                            
                            mode_attr : str | None = ref_node.get_attribute(["mode"])

                            # defalult mode attribute as "selector"
                            mode_name : str = mode_attr if (mode_attr is not None) else "selector"

                            if mode_name == "selector":
                                
                                # detail for selector would be index of the current
                                # selection. Here to ensure that the index does not
                                # go out of range is value is chosen to be "0"
                                event_instance.m_details["value"] = 0
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if mode_name == "multiSelector":
                
                                # not sure how to set the length of the multi-selector
                                # so set default to 3. Can try to figure out more later
                                
                                event_instance.m_details["value"] = [0, 0, 0]
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if mode_name == "time":
                
                                # seems to be a string of the time
                                # do a default of 11:00                   
                                event_instance.m_details["value"] = "11:00"
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if mode_name == "date":
                
                                # seems to be a string of date
                                # do a default one of "2021-09-01"
                                event_instance.m_details["value"] = "2021-09-01"
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if mode_name == "region":
                
                                # goes to use a default address that looks like:
                                # details:
                                # code: (3) ["440000", "440100", "440105"]
                                # postcode: "510220"
                                # value: (3) ["广东省", "广州市", "海珠区"]

                                event_instance.m_details["code"] = ["440000", "440100", "440105"]
                                event_instance.m_details["postcode"] = "510220"
                                event_instance.m_details["value"] = ["广东省", "广州市", "海珠区"]
                                
                                return self._return_event_instance(event_instance, get_full_info)
                            
                            ExceptionScript.ASSERT_NOT_WXML_DATA()
            
                        if tag_name == "picker-view":

                            # 滚动选择时触发change事件，event.detail = {value}；
                            # value为数组，表示 picker-view 内的
                            # picker-view-column 当前选择的是第几项（下标从 0 开始）

                            # it will return an array, whereas the number of item in the array
                            # depends on the current picker's column number.
                            # (should depend on how many picker-view-column are there)

                            num_picker_column : int = ref_node.count_num_subelements("picker-view-column")
                            j_arr : List[int] = []
                            for _ in range(num_picker_column):
                                j_arr.append(0)
                
                            event_instance.m_details["value"] = j_arr
                            return self._return_event_instance(event_instance, get_full_info)
            
                        if tag_name == "slider":
            
                            # <slider>
                            # bindchanging

                            # try getting max, min, step information for the slider

                            min_attr : str | None = ref_node.get_attribute(["min", "Min"])
                            max_attr : str | None = ref_node.get_attribute(["max", "Max"])
                            step_attr : str | None =  ref_node.get_attribute(["step", "Step"])

                            min_comp : int = int(min_attr) if (min_attr is not None and (min_attr[:2] != "{{" or min_attr[-2:] != "}}")) else 0
                            max_comp : int = int(max_attr) if (max_attr is not None and (max_attr[:2] != "{{" or max_attr[-2:] != "}}")) else 100
                            step_comp : int = int(step_attr) if (step_attr is not None and (step_attr[:2] != "{{" or step_attr[-2:] != "}}")) else 1

                            probable_mid_step : int = ((max_comp - min_comp) / 2) / step_comp

                            event_instance.m_details["value"] = min_comp + probable_mid_step * step_comp

                            # adding some auxiliary information for step choice
                            event_instance.m_details["min-range"] = min_comp
                            event_instance.m_details["max-range"] = max_comp
                            event_instance.m_details["step-range"] = step_comp

                            return self._return_event_instance(event_instance, get_full_info)

                        if tag_name == "swiper":
                            # current 改变时会触发 change 事件，
                            # event.detail = {current, source}

                            # detail includes
                            # current: 1
                            # currentItemId: ""
                            # source: "touch"

                            # source seems to be able to take on two modes:
                            # 'autoplay' || source == 'touch'
                            # from source https://blog.csdn.net/qq_40047019/article/details/124713405

                            # to mimic user interaction, source = 'touch' is used

                            event_instance.m_details["current"] = 0
                            event_instance.m_details["currentItemId"] = ""
                            event_instance.m_details["source"] = "touch"

                            return self._return_event_instance(event_instance, get_full_info)

                        if tag_name == 'switch':

                            # 点击导致 checked 改变时会触发 change 事件，event.detail={ value}
                            # default set to true

                            event_instance.m_details['valie'] = True
                            return self._return_event_instance(event_instance, get_full_info)

            

                        # other instances of binfchange not implemented yet
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 1
                    if event_idx < prior_idx + 2:

                        # <editor>
                        # "bindready"
                        # bindstatuschange"


                        # 功能描述
                        # 富文本编辑器，可以对图片、文字进行编辑。
                        # 编辑器导出内容支持带标签的 html和纯文本的 text，
                        # 编辑器内部采用 delta 格式进行存储。
                        # 通过setContents接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，
                        # 建议开发者在小程序内使用时通过 delta 进行插入。
                        # 富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。
                        # 需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入 这段样式，
                        # 并维护<ql-container><ql-editor></ql-editor></ql-container>的结构。
                        # 图片控件仅初始化时设置有效。

                        if tag_name == "editor":
                            
                            # target and current target seems to be the same, both referring
                            # to the component
                            # here set them both to default

                            if event_idx == prior_idx:
                                assert bind_method == "bindready"

                                # "bindready"
                                # 编辑器初始化完成时触发

                                # seems to be completely empty details,
                                # but seems to have a lot of default function class,
                                # here set to empty std::map
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 1:
                                
                                assert bind_method == "bindstatuschange"
                                # "bindstatuschange"
                                # 通过 Context 方法改变编辑器内样式时触发，
                                # 返回选区已设置的样式

                                # 有点没有太看懂 bindstatuschange 的使用方式
                                # 暂时没有implement

                                ExceptionScript.ASSERT_UNIMPLEMENTED()
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 2
                    if event_idx < prior_idx + 4:
                        
                        # <form>
                        # "bindreset"
                        # "catchreset"
                        # "bindsubmit"
                        # "catchsubmit"
                        assert (bind_method == "bindreset" or bind_method == "catchreset" or 
                                bind_method == "bindsubmit" or bind_method == "catchsubmit")

                        if tag_name == "form":

                            # target and current target seems to be the same, both referring
                            # to the component
                            # here set them both to default

                            # "bindreset" / "catchreset"
                            # 表单重置时会触发 reset 事件

                            # "bindsubmit" / "catchsubmit"
                            # 携带 form 中的数据触发 submit 事件，
                            # event.detail = {value : {'name': 'value'} , formId: ''}
                            # 两者的区别主要在于 bindsubmit detail 多出的 value class

                            # detail.target looks like:
                            # target: {id: "", offsetLeft: 68, offsetTop: 85, dataset: {…}}
                            # (basically the event instance's target)
                
                            target : Dict[str, any] = {}
                            target["id"] = event_instance.m_target.m_id
                            target["offsetLeft"] = event_instance.m_target.m_offset_left
                            target["offsetTop"] = event_instance.m_target.m_offset_top
                            target["dataset"] = event_instance.m_target.m_dataset

                            event_instance.m_details["target"] = target

                            if event_idx > prior_idx + 1:
                                
                                # only bindsubmit has this:

                                # value:
                                #     checkbox: ["checkbox2"]
                                #     input: "lfskd;kcf;sf"
                                #     radio: "radio1"
                                #     slider: 61
                                #     switch: true

                                # step 1: find all the components of this form

                                form_values : Dict[str, str] =  {}
                                UtilsScript.get_all_form_components(ref_node, form_values)

                                event_instance.m_details["value"] = form_values
                            
                            return self._return_event_instance(event_instance, get_full_info)
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()

                    prior_idx += 4
                    if event_idx < prior_idx + 3:
                        
                        # the three components below:
                        # "bindfocus",
                        # "bindblur",
                        # "bindinput",

                        # are applicable for input, editor, and textarea

                        if tag_name == "editor":
                            if event_idx <= prior_idx + 1:

                                assert bind_method == "bindfocus" or bind_method == "bindblur"
                                # "bindfocus"
                                # 编辑器聚焦时触发，

                                # "bindblur"
                                # 编辑器失去焦点时触发，

                                # event.detail 同为 {html, text, delta}
                                # the detail is given as:

                                # {
                                # html: "<p><br></p>"
                                # text: "↵"
                                # delta:
                                #    ops: Array(1) 0: {insert: "↵"}
                                # }
                    
                                event_instance.m_details["html"] = "<p><br></p>"
                                event_instance.m_details["text"] = ""
                                event_instance.m_details["delta"] = {'ops': [{'insert' : ''}]}

                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 2:
                
                                assert bind_method == "bindinput"
                                # "bindinput"
                                # 编辑器内容改变时触发，detail = {html, text, delta}

                                # similar to the two above but suppose some new
                                # text content is inserted

                                # details include:
                                # html: "<p>here this is</p><p><br></p>"
                                # text: "here this is"

                                # delta: ops: Array(1)   0: {insert: "here this is↵↵"}
                    
                                event_instance.m_details["html"] = "<p>here this is</p><p><br></p>"
                                event_instance.m_details["text"] = "here this is"
                                event_instance.m_details["delta"] = {'ops': [{'insert' : "here this is"}]}

                                return self._return_event_instance(event_instance, get_full_info)
                          
                        if tag_name == "input":
            

                            if event_idx == prior_idx:
                
                                assert bind_method == "bindfocus"
                                # bindfocus
                                # 输入框聚焦时触发，
                                # event.detail = { value, height }
                                # height 为键盘高度，在基础库 1.9.90 起支持

                                # detail of bindfocus include:
                                # {value: "", height: 0}
                    
                                event_instance.m_details["value"] = ""
                                event_instance.m_details["height"] = 0
                                return self._return_event_instance(event_instance, get_full_info)
                

                            if event_idx == prior_idx + 1:
                
                                assert bind_method == "bindblur"
                                # bindblur
                                # 输入框失去焦点时触发，
                                # event.detail = { value, encryptedValue, encryptError }

                                # the detail specifics seems to be different from what is suggested
                                # instead has

                                # cursor: 0
                                # value: ""

                                event_instance.m_details["cursor"] = 0
                                event_instance.m_details["value"] = ""
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 2:
                
                                assert bind_method == "bindinput"
                                # bindinput
                                # 键盘输入时触发，
                                # event.detail = {value, cursor, keyCode}，
                                # keyCode 为键值，2.1.0 起支持，
                                # 处理函数可以直接 return 一个字符串，将替换输入框的内容。

                                # detail includes:
                                # {value: "hello world", cursor: 11, keyCode: 68}

                                # text	文本输入键盘	
                                # number	数字输入键盘	
                                # idcard	身份证输入键盘	
                                # digit	带小数点的数字键盘	
                                # safe-password	密码安全输入键盘 指引。仅 Webview 支持。	2.18.0
                                # nickname	昵称输入键盘。	2.21.2

                                class_attr : str | None = ref_node.get_attribute(['class'])
                                class_attr : str = class_attr if class_attr is not None else ''
                                type_attr : str | None = ref_node.get_attribute(['type'])
                                type_attr : str = type_attr if type_attr is not None else 'text'

                                if type_attr == 'text':
                                    for (ident, input_text) in POTENTIAL_IDENTIFIER_AND_INPUT.items():
                                        if (class_attr.lower()).find(ident) != -1:
                                            event_instance.m_details = input_text
                                            return self._return_event_instance(event_instance, get_full_info)
                            
                                elif type_attr == 'number' or type_attr == 'digit':
                                    # only taking the first 4 items with numbers
                                    for ident, input_text in list(POTENTIAL_IDENTIFIER_AND_INPUT.items())[:4]:
                                        if (class_attr.lower()).find(ident) != -1:
                                            event_instance.m_details = input_text
                                            return self._return_event_instance(event_instance, get_full_info)
                                
                                    event_instance.m_details = {'value': "1234567890", 'cursor': 10, 'keyCode': 48} if type_attr == 'number' else {'value': '7.8', 'cursor': 3, 'keyCode': 56}
                                    return self._return_event_instance(event_instance, get_full_info)
                            
                                elif type_attr == 'idcard':

                                    # cited from https://www.nia.gov.cn/n741440/n741542/c1599039/content.html
                                    event_instance.m_details = {'value': '911124198108030024', 'cursor': 18, 'keyCode': 86}
                                    return self._return_event_instance(event_instance, get_full_info)

                                elif type_attr == 'safe-password':
                                    ExceptionScript.ASSERT_UNIMPLEMENTED()

                                elif type_attr == 'nickname':
                                    event_instance.m_details = {'value': 'NICKNAME', 'cursor': 8, 'keyCode': 86}
                                    return self._return_event_instance(event_instance, get_full_info)

                                event_instance.m_details = {'value' : "hello world", 'cursor' : 11, 'keyCode': 68}
                                return self._return_event_instance(event_instance, get_full_info)

                        if tag_name == "textarea":

                            if event_idx == prior_idx:
                
                                assert bind_method == "bindfocus"

                                # 输入框聚焦时触发，event.detail = { value, height }，
                                # height 为键盘高度，在基础库 1.9.90 起支持

                                # detail of bindfocus include:
                                # {value: "", height: 0}
                    
                                event_instance.m_details["value"] = ""
                                event_instance.m_details["height"] = 0
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 1:
                
                                assert bind_method == "bindblur"
                                # 输入框失去焦点时触发，
                                # event.detail = {value, cursor}

                                # the detail specifics seems to be different from what is suggested
                                # instead has
                                # cursor: 0
                                # value: ""

                                event_instance.m_details["cursor"] = 0
                                event_instance.m_details["value"] = ""
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 2:

                                assert bind_method == "bindinput"
                                # 当键盘输入时，触发 input 事件，
                                # event.detail = {value, cursor, keyCode}，keyCode 为键值，
                                # 目前工具还不支持返回keyCode参数。**bindinput
                                # 处理函数的返回值并不会反映到 textarea 上**

                                # detail includes:
                                # {value: "hello world", cursor: 11}

                                event_instance.m_details["value"] = "hello world"
                                event_instance.m_details["cursor"] = 11
                                return self._return_event_instance(event_instance, get_full_info)
                
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
       
                    prior_idx += 3
                    if event_idx < prior_idx + 3:
                        
                        # input
                        # "bindconfirm",
                        # "bindkeyboardheightchange",
                        # "bindnicknamereview",

                        # meanwhile textarea also has
                        # function bindconfirm and bindkeyboardheightchange

                        if tag_name == "input":

                            if event_idx == prior_idx:
                
                                assert bind_method == "bindconfirm"
                                # "bindconfirm",
                                # 点击完成按钮时触发，event.detail = { value }

                                event_instance.m_details["value"] = "hello world!"
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 1:
                
                                assert bind_method == "bindkeyboardheightchange"
                                # bindkeyboardheightchange
                                # 键盘高度发生变化的时候触发此事件，
                                # event.detail = {height: height, duration: duration}

                                ExceptionScript.ASSERT_UNIMPLEMENTED()
                
                            if event_idx == prior_idx + 2: 
                
                                assert bind_method == "bindnicknamereview"
                                # "bindnicknamereview",
                                # 用户昵称审核完毕后触发，
                                # 仅在 type 为 "nickname" 时有效，event.detail = { pass, timeout}
                                check_nickname : str | None = ref_node.get_attribute(["type"])
                                assert check_nickname is not None and check_nickname == "nickname"
                    
                                # detail includes:
                                # {pass: true, timeout: false}
                    
                                event_instance.m_details["pass"] = True
                                event_instance.m_details["timeout"] = False
                                return self._return_event_instance(event_instance, get_full_info)
                
                        if tag_name == "textarea":

                            if event_idx == prior_idx:
                
                                assert bind_method == "bindconfirm"
                                # 点击完成时， 触发 confirm 事件，
                                # event.detail = {value: value}
                                # seem to be a particular problem with PC : bindconfirm won't be triggered when Enter is pressed on PC

                                class_attr : str | None = ref_node.get_attribute(['class'])
                                class_attr : str = class_attr if class_attr is not None else ''

                                for (ident, input_text) in POTENTIAL_IDENTIFIER_AND_INPUT.items():
                                    if (class_attr.lower()).find(ident) != -1:
                                        event_instance.m_details['value'] = input_text['value']
                                        return self._return_event_instance(event_instance, get_full_info)
                                
                                event_instance.m_details['value'] = 'hello world \n'
                                return self._return_event_instance(event_instance, get_full_info)
                                
                            if event_idx == prior_idx + 1:
                
                                assert bind_method == "bindkeyboardheightchange"
                                # 键盘高度发生变化的时候触发此事件，
                                # event.detail = {height: height, duration: duration}

                                #TODO
                

                            ExceptionScript.ASSERT_UNIMPLEMENTED()
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
     
                    prior_idx += 3
                    if event_idx < prior_idx + 2:
                        
                        if tag_name == "picker":
                            # <picker>
                            # "bindcancel",
                            # "bindcolumnchange",  --> mode = multiSelector

                            # mode picker functions:
                            # general: bindcancel
                            # mode = selector: bindchange
                            # mode = multiSelector: bindchange, bindcolumnchange
                            # mode = time: bindchange
                            # mode = date: bindchange
                            # mode = region: bindchange

                            if event_idx == prior_idx:
                
                                assert bind_method == "bindcancel"
                                # "bindcancel"
                                # details is given as an empty set, so just retunr
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 1:
                                assert bind_method == "bindcolumnchange"
                                # "bindcolumnchange",  --> mode = multiSelector
                                picker_mode : str | None = ref_node.get_attribute(["mode"])
                                assert picker_mode is not None and picker_mode == "multiSelector"

                                # details include
                                # column: 0
                                # value: 1
                    
                                event_instance.m_details["column"] = 0
                                event_instance.m_details["value"] = 0
                                return self._return_event_instance(event_instance, get_full_info)
                
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
      
                    prior_idx += 2
                    if event_idx < prior_idx + 2:

                        if tag_name == "picker-view":
                            # <picker - view>
                            # "bindpickstart",
                            # "bindpickend",
                            assert bind_method == "bindpickstart" or bind_method == "bindpickend"

                            # both methods do not have any detail info

                            return self._return_event_instance(event_instance, get_full_info)

                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 2
                    if event_idx == prior_idx:
                        
                        # <slider>
                        # "bindchanging"

                        if tag_name == "slider":
                            assert bind_method == "bindchanging" 

                            # try getting max, min, step information for the slider
                            min_attr : str | None = ref_node.get_attribute(["min", "Min"])
                            max_attr : str | None = ref_node.get_attribute(["max", "Max"])
                            step_attr : str | None = ref_node.get_attribute(["step", "Step"])

                            min_comp : int = int(min_attr) if (min_attr is not None and (min_attr[:2] != "{{" or min_attr[-2:] != "}}")) else 0
                            max_comp : int = int(max_attr) if (max_attr is not None and (max_attr[:2] != "{{" or max_attr[-2:] != "}}")) else 100
                            step_comp : int = int(step_attr) if (step_attr is not None and (step_attr[:2] != "{{" or step_attr[-2:] != "}}")) else 1

                            probable_mid_step : int  = ((max_comp - min_comp) / 2) // step_comp
                            event_instance.m_details["value"] = min_comp + probable_mid_step * step_comp

                            # adding some auxiliary information for step choice
                            event_instance.m_details["min-range"] = min_comp
                            event_instance.m_details["max-range"] = max_comp
                            event_instance.m_details["step-range"] = step_comp

                            return self._return_event_instance(event_instance, get_full_info)
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 1

                    if event_idx == prior_idx:
                        assert bind_method == "bindlinechange"

                        if tag_name == "textarea":
                            
                            # <textarea>
                            # "bindlinechange",

                            # 输入框行数变化时调用，
                            # event.detail = {height: 0, heightRpx: 0, lineCount: 0}

                            event_instance.m_details['height'] = 0
                            event_instance.m_details['heightRpx'] = 0
                            event_instance.m_details['lineCount'] = 0
                            return self._return_event_instance(event_instance, get_full_info)
                        
                        ExceptionScript.ASSERT_UNIMPLEMENTED()

                    prior_idx += 1

                    if event_idx == prior_idx:

                        assert bind_method == "bindactiveend" 

                        if tag_name == 'progress':
                            # <progress>
                            # "bindactiveend",
        
                
                            # detail takes the form of
                            # {curPercent: 100}
                
                            event_instance.m_details["curPercent"] = 80

                            return self._return_event_instance(event_instance, get_full_info)
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()

                    prior_idx += 1
                    if event_idx < prior_idx + 2:
        
                        if tag_name == "swiper":
                            # <swiper>
                            # "bindtransition",
                            # "bindanimationfinish",

                            if event_idx == prior_idx:
                
                                assert bind_method == "bindtransition"

                                # detail includes:
                                # {dx: 8, dy: 0}

                                # default both to 1
                    
                                event_instance.m_details["dx"] = 1
                                event_instance.m_details["dy"] = 1
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 1:
                
                                assert bind_method == "bindanimationfinish"
                    
                                # detail include:
                                # current: 0
                                # currentItemId: ""
                                # source: "touch"

                                # identical to bindchange
                    
                                event_instance.m_details["current"] = 0
                                event_instance.m_details["currentItemId"] = ""
                                event_instance.m_details["source"] = "touch"
                                return self._return_event_instance(event_instance, get_full_info)
                
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
                    prior_idx += 2
                    if event_idx < prior_idx + 3:
                        
                        # <navigator> /<functional - page - navigator>
                        # "bindsuccess",
                        # "bindfail",
                        # "bindcomplete",

                        if tag_name == "navigator":
        
                        # 找到当前navigator的open type：
                        # open-type	string	navigate	否	跳转方式	1.0.0
                        # 合法值	说明	最低版本

                        # navigate	对应 wx.navigateTo 或 wx.navigateToMiniProgram 的功能
                        # redirect	对应 wx.redirectTo 的功能
                        # switchTab	对应 wx.switchTab 的功能
                        # reLaunch	对应 wx.reLaunch 的功能	1.1.0
                        #  navigateBack	对应 wx.navigateBack 或 wx.navigateBackMiniProgram （基础库 2.24.4 版本支持）的功能	1.1.0
                        # exit

                            open_type_attr : str | None = ref_node.get_attribute(["open-type", "openType", "opentype"])
                            assert open_type_attr is not None

                            if open_type_str == "navigate" or open_type_str == "redirect":
                                open_type_str += "To" # navigateTo; redirectTo

                            # For switchTab, reLaunch, navigateBack, exit, no change is needed.

                            if event_idx == prior_idx:
                                # 当target="miniProgram"
                                # 且open-type="navigate/navigateBack"时有效时有效，
                                # 跳转小程序成功

                                assert bind_method == "bindsuccess"

                                # detail includes

                                # {errMsg: "navigateTo:ok"
                                # eventChannel:
                                #     listener: {}
                
                                event_instance.m_details["errMsg"] = open_type_str + ":ok"
                                event_instance.m_details["eventChannel"] = {'listener' : {}}
                                return self._return_event_instance(event_instance, get_full_info)
                

                            if event_idx == prior_idx + 1:
                                # 当target="miniProgram"
                                # 且open-type="navigate/navigateBack"时有效时有效，
                                # 跳转小程序失败

                                assert bind_method == "bindfail"

                                # detail includes:
                                # errMsg: "redirectTo:fail page xxxx is not found"
                     
                                event_instance.m_details["errMsg"] = open_type_str + ":fail page xxxx is not found"
                                return self._return_event_instance(event_instance, get_full_info)

                            if event_idx == prior_idx + 2:

                                assert bind_method == "bindcomplete"
                
                                # 当target="miniProgram"
                                # 且open-type="navigate/navigateBack"时有效时有效，
                                # 跳转小程序完成
       
                                # the detail from complete can be either like success or fail
                                # here use the format for success
            
                                event_instance.m_details["errMesg"] = open_type_str + ":ok"
                                event_instance.m_details["eventChannel"] = {'listener' : {}}
                                return self._return_event_instance(event_instance, get_full_info)
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 3
                    if event_idx < prior_idx + 4:

                        if tag_name == "audio":
                            
                            # <audio>
                            # "bindplay",
                            # "bindpause",
                            # "bindtimeupdate",
                            # "bindended",

                            if event_idx == prior_idx:
                                
                                #  "bindplay",
                                assert bind_method == "bindplay"

                                # detail is empty
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 1:
                                
                                # "bindpause",
                                assert bind_method == "bindpause"

                                # detail is empty
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 2:
                                # "bindtimeupdate",
                                assert bind_method == "bindtimeupdate"

                                # detail includes:
                                # currentTime: 4.167069
                                # duration: 203.075918

                                event_instance.m_details["currentTime"] = 2.0
                                event_instance.m_details["duration"] = 250.0

                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 3:
                
                                # "bindended",
                                assert bind_method == "bindended"

                                # detail is empty
                                return self._return_event_instance(event_instance, get_full_info)
                
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 4
                    if event_idx < prior_idx + 3:
                        
                        # <camera>
                        # "bindstop",
                        # "bindinitdone",
                        # "bindscancode",
        
                        if tag_name == "camera":
                            
                            if event_idx == prior_idx:
                                
                                # "bindstop",
                                # 摄像头在非正常终止时触发，如退出后台等情况

                                ExceptionScript.ASSERT_UNIMPLEMENTED()
                

                            if event_idx == prior_idx + 1:
                
                                # "bindinitdone",
                                # 相机初始化完成时触发，e.detail = {maxZoom}
                                # detail: {maxZoom: 1}

                                event_instance.m_details["maxZoom"] = 1
                                return self._return_event_instance(event_instance, get_full_info)
                
                            if event_idx == prior_idx + 2:
                
                                # "bindscancode",
                                # 在扫码识别成功时触发，
                                # 仅在 mode="scanCode" 时生效

                                mode_comp : str | None = ref_node.get_attribute(["mode"])
                                assert mode_comp is not None and mode_comp == "scanCode"

                                # 无法使用相机识别码，暂时没有implement
                                ExceptionScript.ASSERT_UNIMPLEMENTED()
            
                        ExceptionScript.ASSERT_UNIMPLEMENTED()
        
                    prior_idx += 3
                    if event_idx < prior_idx + 8:

                        if tag_name == "video":
                            # <video>
                            # "bindfullscreenchange",
                            # "bindwaiting",
                            # "bindprogress",
                            # "bindloadedmetadata",
                            # "bindcontrolstoggle",
                            # "bindenterpictureinpicture",
                            # "bindleavepictureinpicture",
                            # "bindseekcomplete",

                            # 不知道为什么无法打开视频
                            #TODO

                            ExceptionScript.ASSERT_UNIMPLEMENTED()

                        ExceptionScript.ASSERT_UNIMPLEMENTED()
                    
                    prior_idx += 8
                    if event_idx < prior_idx + 3:

                        if tag_name == 'live-player':

                            #<live - player>
                            # "bindstatechange",
                            # "bindnetstatus",
                            # "bindaudiovolumenotify",

                            ExceptionScript.ASSERT_UNIMPLEMENTED()

                        ExceptionScript.ASSERT_UNIMPLEMENTED()
                    
                    prior_idx += 3

                    if tag_name == 'map':
                        # <map>
                        # "bindmarkertap",
                        # "bindlabeltap",
                        # "bindcontroltap",
                        # "bindcallouttap",
                        # "bindupdated",
                        # "bindregionchange",
                        # "bindpoitap",
                        # "bindanchorpointtap",

                        if event_idx == prior_idx:
                            # "bindmarkertap",
                            # 点击标记点时触发，e.detail = {markerId}

                            # markers 格式参照 https://www.cnblogs.com/zwh0910/p/17104605.html，为
                            # markers: [{
                            #   id: 0,
                            #   latitude: 23.099994,
                            #   longitude: 113.324520,
                            #   width: 50,
                            #   height: 50
                            #   }],
                            
                            # detail includes : {markerId: 0}

                            event_instance.m_details['markerId'] = 0
                            return self._return_event_instance(event_instance, get_full_info)
                        
                        if event_idx == prior_idx + 1:
                            # "bindlabeltap",
                            # 点击label时触发，e.detail = {markerId}

                            # label 格式参照 https://www.cnblogs.com/zwh0910/p/17104605.html，为
                            #
                            # label:{
                            #   content:"武汉",
                            #   color:"#EE5E7B",
                            #   borderWidth:1,
                            #   borderColor:"#EE5E78",
                            #   borderRadius:5,
                            #   padding:5,
                            #   bgColor: "#fff",
                            #   textAlign: 'left'
                            # }
                            #   created inside as a component of marker
                            #
                            #   detail is the same as markertap

                            event_instance.m_details['markerId'] = 0
                            return self._return_event_instance(event_instance, get_full_info)

                        if event_idx == prior_idx + 2:
                            # "bindcontroltap",
                            # 点击控件时触发，e.detail = {controlId}
                            # 官方document上写 controls, 控件（即将废弃，建议使用 cover-view 代替）
                            ExceptionScript.ASSERT_UNIMPLEMENTED()
                        
                        if event_idx == prior_idx + 3:
                            # "bindcallouttap",
                            # 点击标记点对应的气泡时触发e.detail = {markerId}

                            # callout 格式参照
                            # callout:{
                            #   content:"华中科技大学",
                            #   color:"#EE5E7B",
                            #   borderWidth:1,
                            #   borderColor:"#EE5E78",
                            #   borderRadius:5,
                            #   padding:5，
                            #   fontSize: 16,
                            #   textAlign: 'center',
                            #   display: "ALWAYS"
                            #   }
                            # 
                            #   created inside as a component of marker
                            #
                            #   detail is the same as markertap

                            event_instance.m_details['markerId'] = 0
                            return self._return_event_instance(event_instance, get_full_info)

                        if event_idx == prior_idx + 4:
                            # "bindupdated"
                            # 在地图渲染更新完成时触发
                            # seem to have no additional information
                            return self._return_event_instance(event_instance, get_full_info)
                        
                        if event_idx == prior_idx + 5:
                            # "bindregionchange",
                            # 视野发生变化时触发，
                            # 视野改变时，regionchange 会触发两次，
                            # 返回的 type 值分别为 begin 和 end。
                            # 2.8.0 起 begin 阶段返回 causedBy，有效值为 gesture（手势触发） & update（接口触发）
                            # 2.3.0 起 end 阶段返回 causedBy，有效值为 drag（拖动导致）、
                            # scale（缩放导致）、update（调用更新接口导致）。

                            # defualt to begin and gesture

                            event_instance.m_details['causedBy'] = 'gesture'
                            event_instance.m_details['type'] = 'begin'

                            event_instance.m_type = 'begin'
                            return self._return_event_instance(event_instance, get_full_info)

                        if event_idx == prior_idx + 6:
                            # "bindpoitap",
                            # 点击地图poi点时触发，e.detail = {name, longitude, latitude}
                            # default to a specific location in Beijing map:
                            # default:
                            #   latitude: 39.921928693780934
                            #   longitude: 116.45891715595963
                            #   name: "雨霖大厦"

                            event_instance.m_details['latitude'] = 39.921928693780934
                            event_instance.m_details['longitude'] = 116.45891715595963
                            event_instance.m_defailts['name'] = '雨霖大厦'

                            return self._return_event_instance(event_instance, get_full_info)

                        if event_idx == prior_idx + 7:
                            # "bindanchorpointtap",
                            # did not find it??
                            ExceptionScript.ASSERT_UNIMPLEMENTED()

                        ExceptionScript.ASSERT_UNIMPLEMENTED()
                    
                    ExceptionScript.ASSERT_UNIMPLEMENTED()
            
                ExceptionScript.ASSERT_UNIMPLEMENTED()
    
    def _return_event_instance(self, event_instance_data : EventScript.EventInstance, get_full_info : bool) -> EventScript.EventInstance | EventScript.SimplifiedEventInstance:
        if get_full_info is True:
            return event_instance_data
        
        simplified_event_instance : EventScript.SimplifiedEventInstance = EventScript.SimplifiedEventInstance()
        simplified_event_instance.m_type = event_instance_data.m_type
        simplified_event_instance.m_details = event_instance_data.m_details
        return simplified_event_instance








        
