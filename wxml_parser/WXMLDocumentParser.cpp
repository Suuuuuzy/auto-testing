#include "WXMLDocumentParser.h"

namespace Web
{

    WXMLDocumentParser::WXMLDocumentParser(const std::string &page_name) : m_pagename(page_name),
                                                                           m_root(new RootNode()), m_stack_of_open_elements(std::stack<RootNode *>()),
                                                                           m_bind_storage(std::vector<std::tuple<std::string, std::string, ElementWrapperNode *>>()),
                                                                           m_binding_events(NON_BUBBLING_BINDING_EVENTS)
    {
        for (std::string event_prefix : BINDING_PREFIX)
        {
            for (std::string bubbling_ele : BUBBLING_EVENTS)
                m_binding_events.push_back(event_prefix + bubbling_ele);
        }
    }

    WXMLDocumentParser::WXMLDocumentParser(const std::string &page_name, const std::u32string &input) : WXMLDocumentParser(page_name)
    {
        m_tokenizer.insert_input_text(input);
    }

    void WXMLDocumentParser::run(bool print_ast_flag)
    {
        assert(!m_ran_through);
        HTMLToken token = HTMLToken();
        bool loop_flag = true;
        m_stack_of_open_elements.push(m_root);
        do
        {
            token = m_tokenizer.next_token();

#ifdef PARSER_DEBUG_TOKEN
            std::cout << " MODE: " << insertion_mode_name() << " EMIT: " << token.to_string() << std::endl;
#endif

            switch (token.m_type)
            {
            case (HTMLToken::Type::StartTag):
            {
                ElementWrapperNode *element_node = new ElementWrapperNode(token.get_tag_meta_info());
                m_stack_of_open_elements.top()->add_root_child(element_node);
                for (Attribute attr : token.m_tag.attributes)
                {
                    auto return_val = element_node->add_child(new AttributeNode(attr.name(), attr.value()), &m_binding_events);
                    if (return_val.has_value())
                    {
                        std::tuple<std::string, std::string> return_tuple = return_val.value();
                        m_bind_storage.push_back(std::make_tuple(std::get<0>(return_tuple),
                                                                 std::get<1>(return_tuple),
                                                                 element_node));
                    }
                }
                if (element_node->has_end_tag())
                    m_stack_of_open_elements.push(element_node);
            }
            break;
            case (HTMLToken::Type::EndTag):
            {
                assert(token.m_tag.tag_name == m_stack_of_open_elements.top()->get_name());
                for (Attribute attr : token.m_tag.attributes)
                {
                    m_stack_of_open_elements.top()->add_child(new AttributeNode(attr.name(), attr.value()), &m_binding_events);
                }
                m_stack_of_open_elements.pop();
            }
            break;
            case (HTMLToken::Type::Character):
            {
                for (std::tuple<std::string, bool> segment : segment_string(token.m_comment_or_character.data))
                {
                    m_stack_of_open_elements.top()->add_child(new DataNode(std::get<0>(segment), std::get<1>(segment)));
                }
            }
            break;
            case (HTMLToken::Type::Comment):
            {
            }
            break;
            case (HTMLToken::Type::DOCTYPE):
            {
            }
            break;
            case (HTMLToken::Type::EndOfFile):
            {
                loop_flag = false;
            }
            break;
            default:
                ASSERT_NOT_REACHED();
            }
        } while (loop_flag);

        // clear all references for now
        m_stack_of_open_elements.pop();
        assert(m_stack_of_open_elements.empty());

        m_ran_through = true;
        m_tokenizer.restore();

        if (print_ast_flag)
            print_ast(m_root);
    }

    void WXMLDocumentParser::print_tokens()
    {
        HTMLToken token = HTMLToken();
        m_stack_of_open_elements.push(m_root);
        do
        {
            token = m_tokenizer.next_token();
            std::cout << " EMIT: " << token.to_string() << std::endl;
        } while (token.m_type != HTMLToken::Type::EndOfFile);
        m_tokenizer.restore();
    }

    nlohmann::json WXMLDocumentParser::get_all_bind_elements()
    {
        if (!m_ran_through)
            run();

        nlohmann::json bind_json_arr = nlohmann::json::array();
        get_bind_element_json(m_root, &bind_json_arr);
        return bind_json_arr;
    }

    EventInstance WXMLDocumentParser::args_for_bind_element(size_t idx)
    {
        // std::cout << "called with idx " << idx << std::endl;
        // if (!m_ran_through)
        //     run();

        if (idx >= m_bind_storage.size())
        {
            OUT_OF_INDEX();
        }

        EventInstance event_instance;

        auto bind_info = m_bind_storage[idx];
        std::string bind_method = std::get<0>(bind_info);
        std::string function_call = std::get<1>(bind_info);
        ElementWrapperNode *ref_node = std::get<2>(bind_info);

        // fill in event target.dataset and marks
        for (size_t idx = 0; idx < ref_node->get_num_children(); idx++)
        {
            Node *ref_children = ref_node->get_children(idx);
            if (ref_children->type() == NodeType::ATTRIBUTE_NODE)
            {
                std::string attribute_name = ref_children->get_name();

                // check for dataset
                if (attribute_name.substr(0, 5) == "data-")
                    event_instance.m_target.m_dataset[replaceInvalidUtf8(attribute_name.substr(5))] = replaceInvalidUtf8(modify_attribute_name(ref_children->get_auxiliary_data()));

                else if (attribute_name.substr(0, 5) == "mark:")
                    event_instance.m_marks[replaceInvalidUtf8(attribute_name.substr(5))] = replaceInvalidUtf8(modify_attribute_name(ref_children->get_auxiliary_data()));
            }
        }

        auto it = std::find(NON_BUBBLING_BINDING_EVENTS.cbegin(),
                            NON_BUBBLING_BINDING_EVENTS.cend(), bind_method);

        // bubbling event

        if (it == NON_BUBBLING_BINDING_EVENTS.end())
        {

            std::string event_name = stripout_bubbling_event(bind_method);

            // fill in event tag name
            event_instance.m_target.m_tag_name = ref_node->get_name();
            // fill in event type
            event_instance.m_type = event_name;

            // in all bubbling elements, it seems that target is default value (0s for both x and y)
            // whereas current_target stores values relating to the object position.
            // currently the component is assumed to just have both target and current_target of default values

            EventTarget default_current_event_target;
            event_instance.m_current_target.has_current_target = true;
            event_instance.m_current_target.m_current_target_properties = default_current_event_target;

            // tap & longpress & touch start/move/end/cancel
            // has one touch and one changedtouch
            // first just use initialized value

            if (event_name == "tap" || event_name == "longpress" || event_name == "longtap" ||
                event_name == "touchstart" || event_name == "touchmove" || event_name == "touchend" || event_name == "touchcancel")
            {

                TouchObject touch, changed_touch;
                event_instance.m_touch_event.is_touch = true;

                event_instance.m_touch_event.m_touch_event_properties.m_touches.m_array.push_back(touch);
                event_instance.m_touch_event.m_touch_event_properties.m_touches.m_changed_array.push_back(changed_touch);

                if (event_name == "tap" || event_name == "longpress" || event_name == "longtap")
                {
                    // tap & longpress also has details x, y which seems to indicate the location of the tap
                    // first initialize to some random object, such as the m_client_x and m_client_y values stored in touch

                    event_instance.m_details["x"] =
                        event_instance.m_touch_event.m_touch_event_properties.m_touches.m_array[0].m_client_x;
                    event_instance.m_details["y"] =
                        event_instance.m_touch_event.m_touch_event_properties.m_touches.m_array[0].m_client_y;
                }

                return event_instance;
            }

            /*
            currently not finding instances of:
            "transitionend"
                --> Triggered when a WXSS transition or wx.createAnimation animation ends
            "animationstart"
                --> Triggered when a WXSS animation starts
            "animationiteration"
                --> Triggered after an iteration of a WXSS animation ends
            "animationend"
                --> Triggered when a WXSS animation completes
            "touchforcechange"
                --> Triggered when the screen is tapped again on an iPhone supporting 3D Touch.

            also those are of relation to wxss animation so may not be very particular
            to taint information?
            currently unimplemented
            */
            std::cerr << "currently finding instances of unimplemented bubbling event "
                      << event_name << std::endl;
            ASSERT_UNIMPLEMENTED();
        }

        // cases of non bubbling events
        std::ptrdiff_t event_idx = std::distance(NON_BUBBLING_BINDING_EVENTS.cbegin(), it);
        std::ptrdiff_t prior_idx = 0;

        if (event_idx < prior_idx + 5)
        {
            //  <button>
            // "bindgetuserinfo"
            // "bindgetphonenumber"
            // "bindchooseavatar"
            // "bindopensetting"
            // "bindlaunchapp"
            // "bindsubmit"
            // match within the first five elements (namely the button ones)

            // ensure that the element will be a button element
            if (ref_node->get_name() == "button")
            {

                // all have a current target value that seems to reflect the button position
                // here we just use the default data
                // here target and current target have the same value
                EventTarget default_current_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_target;
                event_instance.m_target = event_instance.m_current_target.m_current_target_properties;

                if (event_idx == prior_idx + 0)
                {
                    // "bindgetuserinfo"
                    // 用户点击该按钮时，会返回获取到的用户信息，
                    // 回调的detail数据与wx.getUserInfo返回的一致，open-type="getUserInfo"时有效
                    // print_ast(ref_node);
                    auto get_open_type = ref_node->get_attribute({"open-type", "openType", "opentype"});
                    assert(get_open_type.has_value());
                    assert(get_open_type.value() == "getUserInfo");

                    // fill in type
                    event_instance.m_type = "getuserinfo";

                    /*
                    for getuserinfo the detail is callback information of wx.getUserInfo
                    it is composed of the following components:

                    encryptedData {some encrypted string}
                    errMsg {currently as "getUserInfo:ok". This will be our default value}
                    iv {some random string}
                    rawData {possible the return value of wx.getUserInfo}

                            avatarUrl: {str, here set the default value to
                                        the one provided for the basic miniprogram architecture:
                                        "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"}
                            city: {str}
                            country: {str}
                            gender: {integer, may be represented as 0/1}
                            language: {str}
                            nickName: {str}
                            province: {str}
                    */

                    // set to a random string
                    event_instance.m_details["encryptedData"] = "WHZ2K5YGIp9D5AjIMo9tz+H3G5NYWjLiKXvyKWCrY6lTykC26vO";
                    event_instance.m_details["iv"] = "si5BVYyuykJtuA+8/RSRJg==";

                    // fit in errMsg to "ok"
                    event_instance.m_details["errMsg"] = "getUserInfo:ok";

                    /*
                    TODO:
                    potentially set up with alternative range of detail raw_data?
                    */

                    nlohmann::json raw_data;
                    raw_data["avatarUrl"] = "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132";
                    raw_data["city"] = "Chengdu";
                    raw_data["gender"] = 0;
                    raw_data["language"] = "English";
                    raw_data["nickName"] = "NICKNAME";

                    event_instance.m_details["rawData"] = raw_data;
                    return event_instance;
                }

                if (event_idx == prior_idx + 1)
                {
                    // "bindgetphonenumber"

                    // 手机号快速验证回调，open-type=getPhoneNumber时有效。
                    // Tips：在触发 bindgetphonenumber 回调后应立即隐藏手机号按钮组件，
                    // 或置为 disabled 状态，避免用户重复授权手机号产生额外费用。
                    auto get_open_type = ref_node->get_attribute({"open-type", "openType", "opentype"});
                    assert(get_open_type.has_value());
                    assert(get_open_type.value() == "getPhoneNumber");

                    // fill in type
                    event_instance.m_type = "getphonenumber";

                    /*
                    an error occurs. likely due to information on this website:
                    https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html

                    TODO:
                    potentially set up with alternative range of detail raw_data? if the phone number can be actually obtained
                    */

                    event_instance.m_details["errMsg"] = "getPhoneNumber:fail Error: The mobile phone user bound needs to be verified. Please complete the SMS verification step on the client";
                    return event_instance;
                }

                if (event_idx == prior_idx + 2)
                {

                    // "bindchooseavatar"
                    // 获取用户头像回调，open-type=chooseAvatar时有效
                    auto get_open_type = ref_node->get_attribute({"open-type", "openType", "opentype"});
                    assert(get_open_type.has_value());
                    assert(get_open_type.value() == "chooseAvatar");

                    // fill in type
                    event_instance.m_type = "chooseavatar";

                    /*
                    details only contains the chosen avatar's url
                    here use the same link as the one in userInfo
                    */

                    event_instance.m_details["avatarUrl"] = "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132";
                    return event_instance;
                }
                if (event_idx == prior_idx + 3)
                {
                    // "bindopensetting"
                    // 在打开授权设置页后回调，open-type=openSetting时有效
                    auto get_open_type = ref_node->get_attribute({"open-type", "openType", "opentype"});
                    assert(get_open_type.has_value());
                    assert(get_open_type.value() == "openSetting");

                    // fill in type
                    event_instance.m_type = "opensetting";

                    /*
                      details include:
                      authSetting
                            scope.userLocation: {bool} give default to true
                            scope.writePhotosAlbum: {bool} give default to true

                       errMsg: {str} "openSetting:ok"
                     */

                    event_instance.m_details["errMsg"] = "openSetting:ok";

                    nlohmann::json auth_setting;

                    /*
                    TODO:
                    perhaps more alternatives?
                    */

                    auth_setting["scope.userLocation"] = true;
                    auth_setting["scope.writePhotosAlbum"] = true;

                    event_instance.m_details["authSetting"] = auth_setting;
                    return event_instance;
                }
                if (event_idx == prior_idx + 4)
                {
                    // "bindlaunchapp"
                    // 打开 APP 成功的回调，open-type=launchApp时有效

                    // don't work with simply tapping also never really appears in the list of miniprograms
                    // so left unimplemented for now

                    ASSERT_UNIMPLEMENTED();
                }
            }
            ASSERT_UNIMPLEMENTED();
        }

        prior_idx += 5;

        if (event_idx < prior_idx + 10)
        {

            //  <scroll - view>
            //  "binddragstart"
            //  "binddragging"
            //  "binddragend"
            //  "bindscrolltoupper"
            //  "bindscrolltolower"
            //  "bindscroll"
            //  "bindrefresherpulling"
            //  "bindrefresherrefresh"
            //  "bindrefresherrestore"
            //  "bindrefresherabort"

            // match within the next ten elements (namely the scroll-view ones)

            // ensure that the element will be a scroll-view element
            if (ref_node->get_name() == "scroll-view")
            {

                // both current target and target seems to be default at 0
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                if (event_idx <= prior_idx + 1)
                {
                    //  "binddragstart"
                    // 滑动开始事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }
                    // "binddragging"
                    // 滑动事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }
                    // all attributes are the same so placed together
                    assert(ref_node->has_attribute({"enhanced"}));

                    // fill in type
                    event_instance.m_type = (event_idx == prior_idx)
                                                ? "dragstart"
                                                : "dragging";

                    /*
                      details include:
                      {scrollTop: 0, scrollLeft: 0}
                     */

                    // set to default 0
                    event_instance.m_details["scrollTop"] = 0.0;
                    event_instance.m_details["scrollLeft"] = 0.0;
                    return event_instance;
                }
                if (event_idx == prior_idx + 2)
                {
                    //"binddragend"
                    // 滑动结束事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft, velocity }
                    assert(ref_node->has_attribute({"enhanced"}));

                    // fill in type
                    event_instance.m_type = "dragend";

                    /*
                      details include:
                      scrollLeft: 0
                      scrollTop: 260.3647766113281
                      velocity: {x: 0, y: 1.3490402933229437}
                     */

                    // set to default 0
                    nlohmann::json velocity;
                    velocity["x"] = 0.0;
                    velocity["y"] = 0.0;
                    event_instance.m_details["scrollTop"] = 0.0;
                    event_instance.m_details["scrollLeft"] = 0.0;
                    event_instance.m_details["velocity"] = velocity;
                    return event_instance;
                }
                if (event_idx <= prior_idx + 4)
                {
                    //  "bindscrolltoupper"
                    // 滚动到顶部/左边时触发

                    //  "bindscrolltolower"
                    // 滚动到底部/右边时触发

                    // fill in type
                    event_instance.m_type = (event_idx == prior_idx + 3) ? "scrolltoupper" : "scrolltolower";

                    /*
                    detail includes:
                    direction : "bottom" / "top"
                    应该也可能是 left / right 取决于是scroll x 还是 scroll y
                    */
                    if (ref_node->has_attribute({"scroll-x", "scrollX", "scrollx"}))
                        event_instance.m_details["direction"] = (event_idx == prior_idx + 3) ? "left" : "right";
                    else
                        event_instance.m_details["direction"] = (event_idx == prior_idx + 3) ? "top" : "bottom";
                    return event_instance;
                }
                if (event_idx == prior_idx + 5)
                {
                    // bindscroll
                    // 滚动时触发，
                    // event.detail = {scrollLeft, scrollTop, scrollHeight,
                    // scrollWidth, deltaX, deltaY}

                    // fill in type
                    event_instance.m_type = "scroll";

                    /*
                    details include :
                    deltaX: 0
                    deltaY: -25.75849151611328
                    scrollHeight: 1381
                    scrollLeft: 0
                    scrollTop: 51.5202751159668
                    scrollWidth: 320
                    */

                    // here all set to default 0
                    // but format provided to customize into other values

                    event_instance.m_details["deltaX"] = 0.0;
                    event_instance.m_details["deltaY"] = 0.0;
                    event_instance.m_details["scrollHeight"] = 0.0;
                    event_instance.m_details["scrollLeft"] = 0.0;
                    event_instance.m_details["scrollTop"] = 0.0;
                    event_instance.m_details["scrollWidth"] = 0.0;

                    return event_instance;
                }
                //  "bindrefresherpulling"
                // 自定义下拉刷新控件被下拉

                //  "bindrefresherrefresh"
                // 自定义下拉刷新被触发

                //  "bindrefresherrestore"
                // 自定义下拉刷新被复位

                //  "bindrefresherabort"
                // 自定义下拉刷新被中止

                // 自定义下拉事件，暂时没有implement
                ASSERT_UNIMPLEMENTED();
            }
            ASSERT_UNIMPLEMENTED();
        }

        prior_idx += 10;
        if (event_idx < prior_idx + 7)
        {
            //<page - container>
            // "bind:beforeenter",
            // "bind:enter",
            // "bind:afterenter",
            // "bind:beforeleave",
            // "bind:leave",
            // "bind:afterleave",
            // "bind:clickoverlay",

            /*
            页面容器。

            小程序如果在页面内进行复杂的界面设计（如在页面内弹出半屏的弹窗、
            在页面内加载一个全屏的子页面等），用户进行返回操作会直接离开当前页面，
            不符合用户预期，预期应为关闭当前弹出的组件。 为此提供“假页”容器组件，
            效果类似于 popup 弹出层，页面内存在该容器时，当用户进行返回操作，
            关闭该容器不关闭页面。返回操作包括三种情形，右滑手势、
            安卓物理返回键和调用 navigateBack 接口
            */

            // currently unimplemented
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 7;
        if (event_idx < prior_idx + 1)
        {
            //<movable - view>
            // "bindscale"
            // 缩放过程中触发的事件，
            // event.detail = {x, y, scale}，
            // x和y字段在2.1.0之后支持

            // movable-view actually also has a bindchange function,
            // which will be enumerated later with other possible bindchange elements

            // ensure that the element will be a movable-view element
            if (ref_node->get_name() == "movable-view")
            {

                // needs to set "scale" attribute to true to be able to
                // use bindscale
                assert(ref_node->has_attribute({"scale"}));

                // fill in type
                event_instance.m_type = "scale";

                // currently unable to mimic the behavior on PC due to the inability
                // to use both fingers.

                // assume both currentTarget and target are present and default
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                // the detail field is provided based on the documentation
                event_instance.m_details["x"] = 0.0;
                event_instance.m_details["y"] = 0.0;
                event_instance.m_details["scale"] = 0.0;
                return event_instance;
            }
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 1;
        if (event_idx < prior_idx + 2)
        {
            //<cover - image>
            //"bindload",
            //"binderror",

            /*
            覆盖在原生组件之上的图片视图。
            可覆盖的原生组件同cover-view，支持嵌套在cover-view里
            */

            // ensure that the element will be a cover-image element
            if (ref_node->get_name() == "cover-image" || ref_node->get_name() == "image")
            {

                // assert there is a src attribute to provide image source
                assert(ref_node->has_attribute({"src"}));

                // both current target and target seems to be the same,
                // referring to the cover image object
                // here set them both to default
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                if (event_idx == prior_idx)
                {
                    //"bindload"
                    // 图片加载成功时触发

                    // fill in type
                    event_instance.m_type = "load";

                    /*
                    detail include:
                    height: 890
                    width: 2064

                    assume both are pixel values, so that
                    they would be integers
                    */

                    event_instance.m_details["height"] = 0;
                    event_instance.m_details["width"] = 0;
                    return event_instance;
                }
                if (event_idx == prior_idx + 1)
                {
                    //"binderror"
                    // 图片加载失败时触发

                    // fill in type
                    event_instance.m_type = "error";

                    /*
                    detail include
                    {errMsg: "GET ../../asset/images/1b.png 404 (Not Found)"}

                    here between GET and the error type should be the src data,
                    so the src data is used for providing the errMsg
                    */
                    std::stringstream ss_err;
                    ss_err << "GET " << (ref_node->get_attribute({"src"})).value() << " 404 (Not Found)";
                    event_instance.m_details["errMsg"] = ss_err.str();
                    return event_instance;
                }
            }
            // some other custom class
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 2;
        if (event_idx < prior_idx + 1)
        {
            /*
            bindchange has multiple possibilities, include but not limited to
            <movable - view>
            <checkbox - group>
            */
            // "bindchange"

            if (ref_node->get_name() == "movable-view")
            {
                // 拖动过程中触发的事件，event.detail = {x, y, source}

                // both current target and target seems to be default at 0
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                // fill in type
                event_instance.m_type = "change";

                // detail include:
                // {x: 0, y: -5.9, source: "out-of-bounds"}

                event_instance.m_details["x"] = 0.0;
                event_instance.m_details["y"] = 0.0;
                event_instance.m_details["source"] = "out-of-bounds";
                return event_instance;
            }

            if (ref_node->get_name() == "checkbox-group")
            {
                // checkbox-group中选中项发生改变时触发 change 事件，
                // detail = {value:[选中的checkbox的value的数组]}

                /*
                wxml:
                script value:
                <checkbox-group bindchange = "changeFunc"
                                wx:key="tid"
                                wx:for="{{todoList}}"
                                wx:for-item="todo" >
                    <checkbox  bindtap = "tapFunc" checked="{{todo.tcheck}}"></checkbox>
                    <text>{{todo.twork}}</text>
                </checkbox-group>

                ...

                js:
                Page({
                    data: {
                    ...

                        todoList: [
                            {"twork": "mop floor", "tcheck" : true},
                            {"twork": "mop floor again", "tcheck" : false},]
                    }
                })
                */

                // both current target and target seems to be the same,
                // referring to the checkerbox group object
                // here set them both to default
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                // fill in type
                event_instance.m_type = "change";

                /*
                to get the detail
                */

                std::vector<std::string> detail_data = std::vector<std::string>();
                for (size_t idx = 0; idx < ref_node->get_num_children(); idx++)
                {
                    Node *child_node = ref_node->get_children(idx);
                    if (child_node->type() == NodeType::ELEMENT_NODE && child_node->get_name() == "checkbox")
                    {
                        auto ele_val = child_node->get_attribute({"value"});
                        if (ele_val.has_value())
                        {
                            std::string ele_value = ele_val.value();

                            // ensure it is not script data
                            if (ele_value.substr(0, 2) != "{{" || ele_value.substr(ele_value.length() - 2) != "}}")
                            {
                                detail_data.push_back(ele_value);
                            }
                        }
                    }
                }

                // this will make sure that the detail_data contains all the check-able
                // checkboxes
                event_instance.m_details["value"] = detail_data;
                return event_instance;
            }

            // other instances of binfchange not implemented yet
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 1;
        if (event_idx < prior_idx + 2)
        {
            //<editor>
            // "bindready"
            // "bindstatuschange"

            /*
            功能描述
            富文本编辑器，可以对图片、文字进行编辑。
            编辑器导出内容支持带标签的 html和纯文本的 text，
            编辑器内部采用 delta 格式进行存储。
            通过setContents接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，
            建议开发者在小程序内使用时通过 delta 进行插入。
            富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。
            需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入 这段样式，
            并维护<ql-container><ql-editor></ql-editor></ql-container>的结构。
            图片控件仅初始化时设置有效。
            */

            if (ref_node->get_name() == "editor")
            {

                // target and current target seems to be the same, both referring
                // to the component
                // here set them both to default
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                if (event_idx == prior_idx)
                {

                    // "bindready"
                    // 编辑器初始化完成时触发

                    // fill in type
                    event_instance.m_type = "ready";

                    // seems to be completely empty details,
                    // but seems to have a lot of default function class,
                    // here set to empty std::map

                    return event_instance;
                }
                if (event_idx == prior_idx + 1)
                {
                    // "bindstatuschange"
                    // 通过 Context 方法改变编辑器内样式时触发，
                    // 返回选区已设置的样式

                    // 有点没有太看懂 bindstatuschange 的使用方式
                    // 暂时没有implement

                    ASSERT_UNIMPLEMENTED();
                }
            }
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 2;
        if (event_idx < prior_idx + 4)
        {
            // <form>
            // "bindreset"
            // "catchreset"
            // "bindsubmit"
            // "catchsubmit"

            if (ref_node->get_name() == "form")
            {

                // target and current target seems to be the same, both referring
                // to the component
                // here set them both to default
                EventTarget default_current_event_target;
                event_instance.m_current_target.has_current_target = true;
                event_instance.m_current_target.m_current_target_properties = default_current_event_target;

                // "bindreset" / "catchreset"
                // 表单重置时会触发 reset 事件

                // "bindsubmit" / "catchsubmit"
                // 携带 form 中的数据触发 submit 事件，
                // event.detail = {value : {'name': 'value'} , formId: ''}

                // 两者的区别主要在于 bindsubmit detail 多出的 value class

                // fill in type
                event_instance.m_type = (event_idx <= prior_idx + 1) ? "reset" : "submit";

                /*
                detail.target looks like:
                target: {id: "", offsetLeft: 68, offsetTop: 85, dataset: {…}}
                (basically the event instance's target)
                */
                nlohmann::json target;
                target["id"] = event_instance.m_target.m_id;
                target["offsetLeft"] = event_instance.m_target.m_offset_left;
                target["offsetTop"] = event_instance.m_target.m_offset_top;
                target["dataset"] = event_instance.m_target.m_dataset;

                event_instance.m_details["target"] = target;

                if (event_idx > prior_idx + 1)
                {

                    /*
                    only bindsubmit has this:

                    value:
                        checkbox: ["checkbox2"]
                        input: "lfskd;kcf;sf"
                        radio: "radio1"
                        slider: 61
                        switch: true
                     */

                    // step 1: find all the components of this form

                    std::vector<std::tuple<std::string, std::string>> form_components =
                        std::vector<std::tuple<std::string, std::string>>();

                    get_all_form_components(ref_node, &form_components);

                    // step 2: iterate over all components to implement the value key

                    nlohmann::json value;

                    for (auto form_component_pair : form_components)
                    {
                        std::string comp_name = std::get<0>(form_component_pair);
                        std::string comp_value = std::get<1>(form_component_pair);
                        value[comp_name] = comp_value;
                    }
                    event_instance.m_details["value"] = value;
                }
                return event_instance;
            }
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 4;
        if (event_idx <= prior_idx + 3)
        {

            /*
            the three components below:

            "bindfocus",
            "bindblur",
            "bindinput",

            are applicable for both input and editor
            */

            // target and current target seems to be the same, both referring
            // to the component
            // here set them both to default
            EventTarget default_current_event_target;
            event_instance.m_current_target.has_current_target = true;
            event_instance.m_current_target.m_current_target_properties = default_current_event_target;

            if (ref_node->get_name() == "editor")
            {

                if (event_idx <= prior_idx + 1)
                {
                    // "bindfocus"
                    // 编辑器聚焦时触发，

                    // "bindblur"
                    // 编辑器失去焦点时触发，

                    // event.detail 同为 {html, text, delta}

                    // fill in type
                    event_instance.m_type = (event_idx == prior_idx + 1)
                                                ? "focus"
                                                : "blur";

                    /*
                    the detail is given as:

                    {
                    html: "<p><br></p>"
                    text: "↵"
                    delta:
                       ops: Array(1) 0: {insert: "↵"}
                    }
                    */
                    event_instance.m_details["html"] = "<p><br></p>";
                    event_instance.m_details["text"] = "";

                    nlohmann::json delta, sub_delta;
                    sub_delta["input"] = "";
                    delta["ops"] = nlohmann::json::array();

                    delta["ops"].push_back(sub_delta);
                    event_instance.m_details["delta"] = delta;

                    return event_instance;
                }
                if (event_idx == prior_idx + 2)
                {
                    // "bindinput"
                    // 编辑器内容改变时触发，detail = {html, text, delta}

                    // similar to the two above but suppose some new
                    // text content is inserted

                    // fill in type
                    event_instance.m_type = "input";

                    /*
                    details include:
                    html: "<p>here this is</p><p><br></p>"
                    text: "here this is"

                    delta: ops: Array(1)   0: {insert: "here this is↵↵"}
                    */
                    event_instance.m_details["html"] = "<p>here this is</p><p><br></p>";
                    event_instance.m_details["text"] = "here this is";

                    nlohmann::json delta, sub_delta;
                    sub_delta["insert"] = "here this is";
                    delta["ops"] = nlohmann::json::array();
                    delta["ops"].push_back(sub_delta);
                    event_instance.m_details["delta"] = delta;

                    return event_instance;
                }
            }
            if (ref_node->get_name() == "input")
            {
                if (event_idx == prior_idx)
                {
                    // bindfocus
                    // 输入框聚焦时触发，
                    // event.detail = { value, height }
                    // height 为键盘高度，在基础库 1.9.90 起支持

                    // fill in type
                    event_instance.m_type = "focus";

                    /*
                    detail of bindfocus include:
                    {value: "", height: 0}
                    */
                    event_instance.m_details["value"] = "";
                    event_instance.m_details["height"] = 0;
                    return event_instance;
                }

                if (event_idx == prior_idx + 1)
                {
                    // bindblur
                    // 输入框失去焦点时触发，
                    // event.detail = { value, encryptedValue, encryptError }

                    // fill in the type
                    event_instance.m_type = "blur";

                    /*
                    the detail specifics seems to be different from what is suggested
                    instead has

                    cursor: 0
                    value: ""

                    */
                    event_instance.m_details["cursor"] = 0;
                    event_instance.m_details["value"] = "";
                    return event_instance;
                }
                if (event_idx == prior_idx + 2)
                {
                    // bindinput
                    // 键盘输入时触发，
                    // event.detail = {value, cursor, keyCode}，
                    // keyCode 为键值，2.1.0 起支持，
                    // 处理函数可以直接 return 一个字符串，将替换输入框的内容。

                    // fill in type
                    event_instance.m_type = "input";

                    /*
                    detail includes:

                    {value: "hello world", cursor: 11, keyCode: 68}
                    */

                    event_instance.m_details["value"] = "hello world";
                    event_instance.m_details["cursor"] = 11;
                    event_instance.m_details["keyCode"] = 68;
                    return event_instance;
                }
            }
            ASSERT_UNIMPLEMENTED();
        }
        prior_idx += 3;

        ASSERT_UNIMPLEMENTED();
    }

    nlohmann::json WXMLDocumentParser::get_all_bind_element_args()
    {
        if (!m_ran_through)
            run();
        nlohmann::json bind_arg_map;
        size_t idx = 0;
        for (auto instance : m_bind_storage)
        {
            std::string function_call = std::get<1>(instance);
            std::string tag_name = std::get<2>(instance)->get_name();
            // std::cerr << "Surveying element " << tag_name << " bind function " << std::get<0>(instance) << std::endl;
            try
            {
                EventInstance current_event_instance = args_for_bind_element(idx++);

                if (bind_arg_map.count(function_call) == 0)
                    bind_arg_map[function_call] = nlohmann::json::array();

                bind_arg_map[function_call].push_back(static_cast<nlohmann::json>(current_event_instance));
            }
            catch (const std::runtime_error &e)
            {
                if (std::string(e.what()) == "Bind Function type not implemented yet.")
                {
                    std::cerr << "Element" << tag_name << " bind function " << std::get<0>(instance) << " not yet implemented" << std::endl;
                    // std::cerr << e.what() << std::endl;
                    continue;
                    // Handle the specific error here
                }
                else
                {
                    // Handle other runtime_errors
                    std::cerr << "Caught other runtime_error: " << e.what() << std::endl;
                    return static_cast<nlohmann::json>(bind_arg_map);
                }
            }
            catch (const std::exception &e)
            {
                // Handle other exceptions
                std::cerr << "Caught exception: " << e.what() << std::endl;
                return bind_arg_map;
            }
        }
        return bind_arg_map;
    }
}