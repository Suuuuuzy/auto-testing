#ifndef ATTRIBUTE_H
#define ATTRIBUTE_H

#include <string>

namespace Web
{

    class Attribute
    {
    public:
        Attribute() : m_name(""), m_value("")
        {
        }

        Attribute(const std::string &name, const std::string &value) : m_name(name), m_value(value)
        {
        }

        const std::string &name() const { return m_name; }
        const std::string &value() const { return m_value; }
        void append_name(std::string str_lit) { m_name.append(str_lit); }
        void append_value(std::string str_lit) { m_value.append(str_lit); }

        void set_value(const std::string value) { m_value = value; }

    private:
        std::string m_name;
        std::string m_value;
    };
}

#endif // ATTRIBUTE_H