#include "Event.h"

namespace Web
{

    // EventTarget
    void to_json(nlohmann::json &j, const EventTarget &event_target)
    {
        j = nlohmann::json{
            {"id", event_target.m_id},
            {"offsetLeft", event_target.m_offset_left},
            {"offsetTop", event_target.m_offset_top},
            {"tagName", event_target.m_tag_name},
            {"dataset", event_target.m_dataset}};
    }

    void from_json(const nlohmann::json &j, EventTarget &event_target)
    {
        j.at("id").get_to(event_target.m_id);
        j.at("offsetLeft").get_to(event_target.m_offset_left);
        j.at("offsetTop").get_to(event_target.m_offset_top);
        j.at("tagName").get_to(event_target.m_tag_name);
        j.at("dataset").get_to(event_target.m_dataset);
    }

    // TouchObject
    void to_json(nlohmann::json &j, const TouchObject &touch_object)
    {
        j = nlohmann::json{
            {"identifier", touch_object.m_identifier},
            {"pageX", touch_object.m_page_x},
            {"pageY", touch_object.m_page_y},
            {"clientX", touch_object.m_client_x},
            {"clientY", touch_object.m_client_y}};
    }

    void from_json(const nlohmann::json &j, TouchObject &touch_object)
    {
        j.at("identifier").get_to(touch_object.m_identifier);
        j.at("pageX").get_to(touch_object.m_page_x);
        j.at("pageY").get_to(touch_object.m_page_y);
        j.at("clientX").get_to(touch_object.m_client_x);
        j.at("clientY").get_to(touch_object.m_client_y);
    }

    // CanvasTouchObject
    void to_json(nlohmann::json &j, const CanvasTouchObject &canvas_touch_object)
    {
        j = nlohmann::json{
            {"identifier", canvas_touch_object.m_identifier},
            {"x", canvas_touch_object.m_x},
            {"y", canvas_touch_object.m_y}};
    }

    void from_json(const nlohmann::json &j, CanvasTouchObject &canvas_touch_object)
    {
        j.at("identifier").get_to(canvas_touch_object.m_identifier);
        j.at("x").get_to(canvas_touch_object.m_x);
        j.at("y").get_to(canvas_touch_object.m_y);
    }

    // TouchEventProperties
    void to_json(nlohmann::json &j, const TouchEventProperties &touch_event_properties)
    {
        j = nlohmann::json{
            {"isCanvasTouch", touch_event_properties.is_canvas_touch},
            {"touchesArray", touch_event_properties.m_touches.m_array},
            {"touchesChangedArray", touch_event_properties.m_touches.m_changed_array},
            {"canvasTouchesArray", touch_event_properties.m_canvas_touches.m_array},
            {"canvasTouchesChangedArray", touch_event_properties.m_canvas_touches.m_changed_array}};
    }

    void from_json(const nlohmann::json &j, TouchEventProperties &touch_event_properties)
    {
        j.at("isCanvasTouch").get_to(touch_event_properties.is_canvas_touch);
        j.at("touchesArray").get_to(touch_event_properties.m_touches.m_array);
        j.at("touchesChangedArray").get_to(touch_event_properties.m_touches.m_changed_array);
        j.at("canvasTouchesArray").get_to(touch_event_properties.m_canvas_touches.m_array);
        j.at("canvasTouchesChangedArray").get_to(touch_event_properties.m_canvas_touches.m_changed_array);
    }

    // EventInstance
    void to_json(nlohmann::json &j, const EventInstance &event_instance)
    {
        j = nlohmann::json{
            {"bubblingFlag", event_instance.is_bubbling},
            {"type", event_instance.m_type},
            {"timestamp", event_instance.m_timestamp},
            {"target", event_instance.m_target},
            {"currentTarget", {{"hasCurrentTarget", event_instance.m_current_target.has_current_target}, {"currentTargetProperties", event_instance.m_current_target.m_current_target_properties}}},
            {"marks", event_instance.m_marks},
            {"details", event_instance.m_details},
            {"touchEvent", {{"isTouch", event_instance.m_touch_event.is_touch}, {"touchEventProperties", event_instance.m_touch_event.m_touch_event_properties}}}};
    }

    void from_json(const nlohmann::json &j, EventInstance &event_instance)
    {
        j.at("bubblingFlag").get_to(event_instance.is_bubbling);
        j.at("type").get_to(event_instance.m_type);
        j.at("timestamp").get_to(event_instance.m_timestamp);
        j.at("target").get_to(event_instance.m_target);

        const auto &current_target = j.at("currentTarget");
        current_target.at("hasCurrentTarget").get_to(event_instance.m_current_target.has_current_target);
        current_target.at("currentTargetProperties").get_to(event_instance.m_current_target.m_current_target_properties);

        j.at("marks").get_to(event_instance.m_marks);
        j.at("details").get_to(event_instance.m_details);

        const auto &touch_event = j.at("touchEvent");
        touch_event.at("isTouch").get_to(event_instance.m_touch_event.is_touch);
        touch_event.at("touchEventProperties").get_to(event_instance.m_touch_event.m_touch_event_properties);
    }

    enum class LIFECYCLE_CALLBACKS
    {
        onLaunch = 0,
        onShow,
        onHide,
        onError,
        onLoad,
        onReady,
        onUnload,
        onRouteDone
    };

    enum class EVENT_HANDLER_CALLBACKS
    {
        onError = 8,
        onPageNotFound,
        onUnhandledRejection,
        onThemeChange,
        onPullDownRefresh,
        onReachBottom,
        onShareAppMessage,
        onShareTimeline,
        onAddToFavorites,
        onPageScroll,
        onResize,
        onTabItemTap,
        onSaveExitState
    };

    enum class SENSITIVE_API
    {
        getUserInfo = 32, // 收集你的微信昵称、头像,
        getUserProfile,   // 收集你的微信昵称、头像,
        // <button open - type = userInfo>, //收集你的微信昵称、头像,
        getLocation,                   // 收集你的位置信息,
        getFuzzyLocation,              // 收集你的位置信息,
        onLocationChange,              // 收集你的位置信息,
        startLocationUpdate,           // 收集你的位置信息,
        startLocationUpdateBackground, // 收集你的位置信息,
        choosePoi,                     // 收集你的位置信息,
        chooseLocation,                // 收集你的位置信息,
        chooseAddress,                 // 收集你的地址,
        chooseInvoiceTitle,            // 收集你的发票信息,
        chooseInvoice,                 // 收集你的发票信息,
        getWeRunData,                  // 收集你的微信运动步数,
        //<button open - type = getPhoneNumber>, //收集你的手机号,
        chooseLicensePlate,      // 收集你的车牌号,
        chooseImage,             // 收集你选中的照片或视频信息,
        chooseMedia,             // 收集你选中的照片或视频信息,
        chooseVideo,             // 收集你选中的照片或视频信息,
        chooseMessageFile,       // 收集你选中的文件,
        startRecord,             // 访问你的麦克风,
        getRecorderManager,      // 访问你的麦克风,
        joinVoIPChat,            // 访问你的麦克风,
        createCameraContext,     // 访问你的摄像头,
        createVKSession,         // 访问你的摄像头,
        createLivePusherContext, // 访问你的摄像头,
        //<camera>,                      //访问你的摄像头,
        //<live - pusher>,               //访问你的摄像头,
        //<voip - room>,                 //访问你的摄像头,
        openBluetoothAdapter,      // 访问你的蓝牙,
        createBLEPeripheralServer, // 访问你的蓝牙,
        saveImageToPhotosAlbum,    // 使用你的相册（仅写入）权限,
        saveVideoToPhotosAlbum,    // 使用你的相册（仅写入）权限,
        addPhoneContact,           // 使用你的通讯录（仅写入）权限,
        addPhoneRepeatCalendar,    // 使用你的日历（仅写入）权限,
        addPhoneCalendar,          // 使用你的日历（仅写入）权限
    };

    enum class SINK_API
    {
        request = 64,
        uploadFile,
        connectSocket,
        createTCPSocket,
        createUDPSocket,
        setStorageSync,
        setStorage
    };

    enum class ROUTE_API
    {
        switchTab = 128,
        reLaunch,
        redirectTo,
        navigateTo,
        navigateToSync,
        navigateBack
    };

    enum class NAVIGATE_API
    {
        navigateToMiniProgram = 256,
        navigateBackMiniProgram,
        exitMiniProgram
    };

    const std::vector<std::string> BINDING_PREFIX =
        {
            "mut-bind:",
            "capture-bind:",
            "capture-catch:",
            "bind:",
            "catch:",
            "bind",
            "catch"};

    const std::vector<std::string> BUBBLING_EVENTS =
        {
            /*
            The finger leaves the screen after it
            taps and holds on the screen for more than 350 ms.
            If an event callback function is specified and this event
            is triggered, the tap event is not triggered.
             */
            "longpress",
            /*
            The finger leaves the screen after it
            taps and holds on the screen for more than 350 ms
            (it is recommended to use longpress event instead).
            */
            "longtap",
            "tap",                // The finger leaves the screen after touch
            "transitionend",      // Triggered when a WXSS transition or wx.createAnimation animation ends
            "animationstart",     // Triggered when a WXSS animation starts
            "animationiteration", //  Triggered after an iteration of a WXSS animation ends
            "animationend",       // Triggered when a WXSS animation completes
            "touchstart",         // Finger touch starts
            "touchmove",          // Finger moves after touch
            "touchcancel",        // Finger touch is interrupted by call reminder, pop-up window, etc.
            "touchend",           // Finger touch ends
            "touchforcechange"    // Triggered when the screen is tapped again on an iPhone supporting 3D Touch.
    };

    const std::vector<std::string> NON_BUBBLING_BINDING_EVENTS = {
        // Non - bubbling Events in Specific Compenonts

        //<button>
        "bindgetuserinfo",
        "bindgetphonenumber",
        "bindchooseavatar",
        "bindopensetting",
        "bindlaunchapp",
        // "bindsubmit", 原来 bindsubmit在这里，
        // 但微信小程序的documentation上没有记载bindsubmit为button的binding function，应该是form的
        // details see https://developers.weixin.qq.com/miniprogram/dev/component/button.html

        //<scroll - view>
        "binddragstart",
        "binddragging",
        "binddragend",
        "bindscrolltoupper",
        "bindscrolltolower",
        "bindscroll",
        "bindrefresherpulling",
        "bindrefresherrefresh",
        "bindrefresherrestore",
        "bindrefresherabort",

        //<page - container>
        "bind:beforeenter",
        "bind:enter",
        "bind:afterenter",
        "bind:beforeleave",
        "bind:leave",
        "bind:afterleave",
        "bind:clickoverlay",

        //<movable - view>
        "bindscale",

        //<cover - image>
        "bindload",
        "binderror",

        /*
        bindchange has multiple possibilities, include but not limited to
        <movable-view>
        <checkbox-group>
        <picker>
        <slider>
        */
        "bindchange",

        //<editor>
        "bindready",
        "bindstatuschange",

        //<form>
        "bindreset",
        "catchreset",
        "bindsubmit",
        "catchsubmit",
        // form 这里应该还有bindsubmit
        // details see https : // developers.weixin.qq.com/miniprogram/dev/component/form.html

        //<input>
        /*
        the three components below:

        "bindfocus",
        "bindblur",
        "bindinput",

        are applicable for both input and editor
        */
        "bindfocus",
        "bindblur",
        "bindinput",

        "bindconfirm",
        "bindkeyboardheightchange",
        "bindnicknamereview",

        //<picker>
        "bindcancel",
        "bindcolumnchange", // mode = multiSelector

        //<picker - view>
        "bindpickstart",
        "bindpickend",

        //<slider>
        "bindchanging",

        //<textarea>
        "bindlinechange",

        //<progress>
        "bindactiveend",

        //<swiper>
        "bindtransition",
        "bindanimationfinish",

        //<navigator> /<functional - page - navigator>
        "bindsuccess",
        "bindfail",
        "bindcomplete",
        // "bindcancel",
        //  written here but navigator does not have a bindcancel attribute

        //<audio>
        "bindplay",
        "bindpause",
        "bindtimeupdate",
        "bindended",

        //<camera>
        "bindstop",
        "bindinitdone",
        "bindscancode",

        //<video>
        "bindfullscreenchange",
        "bindwaiting",
        "bindprogress",
        "bindloadedmetadata",
        "bindcontrolstoggle",
        "bindenterpictureinpicture",
        "bindleavepictureinpicture",
        "bindseekcomplete",

        //<live - player>
        "bindstatechange",
        "bindnetstatus",
        "bindaudiovolumenotify",

        //<map>
        "bindmarkertap",
        "bindlabeltap",
        "bindcontroltap",
        "bindcallouttap",
        "bindupdated",
        "bindregionchange",
        "bindpoitap",
        "bindanchorpointtap",
    };
}