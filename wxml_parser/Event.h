#ifndef EVENT_H
#define EVENT_H

#include <string>
#include <vector>

#include "nlohmann/json.hpp"

/*
All information of event object comes from
https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/event.html

data of bind function cited from
https://github.com/ShenaoW/MiniScope
*/

namespace Web
{

    // Declare global variables with extern
    extern const std::vector<std::string> BINDING_PREFIX;
    extern const std::vector<std::string> BUBBLING_EVENTS;
    extern const std::vector<std::string> NON_BUBBLING_BINDING_EVENTS;

    struct EventTarget
    {
        std::string m_id{""};
        double m_offset_left{0};
        double m_offset_top{0};
        std::string m_tag_name{""};
        nlohmann::json m_dataset;
    };

    struct TouchObject
    {
        double m_identifier{0};
        double m_page_x{0};
        double m_page_y{0};
        double m_client_x{0};
        double m_client_y{0};
    };

    struct CanvasTouchObject
    {
        double m_identifier{0};
        double m_x{0};
        double m_y{0};
    };

    struct TouchEventProperties
    {
        bool is_canvas_touch{false};
        struct
        {
            std::vector<TouchObject> m_array{std::vector<TouchObject>()};
            std::vector<TouchObject> m_changed_array{std::vector<TouchObject>()};
        } m_touches;

        struct
        {
            std::vector<CanvasTouchObject> m_array{std::vector<CanvasTouchObject>()};
            std::vector<CanvasTouchObject> m_changed_array{std::vector<CanvasTouchObject>()};
        } m_canvas_touches;
    };

    struct EventInstance
    {
        bool is_bubbling{true};
        std::string m_type{""};
        int m_timestamp{0};
        EventTarget m_target;
        struct
        {
            bool has_current_target{true};
            EventTarget m_current_target_properties;
        } m_current_target;
        nlohmann::json m_marks;
        nlohmann::json m_details;
        struct
        {
            bool is_touch{false};
            TouchEventProperties m_touch_event_properties;
        } m_touch_event;
    };

    // Declare functions in header file
    void to_json(nlohmann::json &j, const EventTarget &event_target);
    void from_json(const nlohmann::json &j, EventTarget &event_target);

    void to_json(nlohmann::json &j, const TouchObject &touch_object);
    void from_json(const nlohmann::json &j, TouchObject &touch_object);

    void to_json(nlohmann::json &j, const CanvasTouchObject &canvas_touch_object);
    void from_json(const nlohmann::json &j, CanvasTouchObject &canvas_touch_object);

    void to_json(nlohmann::json &j, const TouchEventProperties &touch_event_properties);
    void from_json(const nlohmann::json &j, TouchEventProperties &touch_event_properties);

    void to_json(nlohmann::json &j, const EventInstance &event_instance);
    void from_json(const nlohmann::json &j, EventInstance &event_instance);
}

#endif // EVENT_H