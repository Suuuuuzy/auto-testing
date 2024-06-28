#ifndef NODE_H
#define NODE_H

#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <memory>
#include <optional>

#include "HTMLToken.h"

enum class NodeType
{
    ROOT_NODE,
    ELEMENT_NODE,
    ATTRIBUTE_NODE,
    DATA_NODE,
};

namespace Web
{
    ////////////////////////////////////////////////////////////////////////
    // Node Declaration
    ////////////////////////////////////////////////////////////////////////
    class Node
    {
        friend class RootNode;
        friend class ElementWrapperNode;
        friend class AttributeNode;
        friend class DataNode;

    public:
        Node();

        virtual ~Node();

        std::string get_auxiliary_data() const;
        std::string get_name() const;

        size_t get_num_children() const;
        Node *get_children(long unsigned int idx) const;
        std::optional<std::tuple<std::string, std::string>> add_child(Node *child, std::vector<std::string> *binding_events = nullptr);

        size_t get_num_bind() const;
        std::tuple<std::string, std::string> get_bind_info(long unsigned int idx) const;

        bool has_attribute(const std::vector<std::string> &attribute_names) const;
        std::optional<std::string> get_attribute(const std::vector<std::string> &attribute_names) const;

        virtual NodeType type() const = 0;
        virtual std::string to_string() const = 0;

    private:
        std::string m_name;
        std::vector<Node *> m_children; // Children nodes
        std::vector<std::tuple<std::string, std::string>> m_bind_info;
        std::string m_auxiliary_data;
    };

    ////////////////////////////////////////////////////////////////////////
    // RootNode Declaration
    ////////////////////////////////////////////////////////////////////////
    class RootNode : public Node
    {
        friend class ElementWrapperNode;

    public:
        RootNode() : Node() {}

        ~RootNode()
        {
        }

        virtual NodeType type() const override;
        virtual std::string to_string() const override;

        int get_depth() const;
        void add_root_child(RootNode *child);

    private:
        int m_depth{0};
    };

    ////////////////////////////////////////////////////////////////////////
    // ElementWrapperNode Declaration
    ////////////////////////////////////////////////////////////////////////
    class ElementWrapperNode : public RootNode
    {
    public:
        ElementWrapperNode(const std::tuple<std::string, bool> &tag_meta_info);

        ~ElementWrapperNode()
        {
        }

        std::optional<std::tuple<std::string, std::string>> add_child(Node *child, std::vector<std::string> *binding_events = nullptr);

        virtual NodeType type() const override;
        virtual std::string to_string() const override;

        bool has_end_tag() const;
        bool has_attribute(const std::vector<std::string> &attribute_names) const;
        int count_num_subelements(const std::string &element_name) const;
        std::optional<std::string> get_attribute(const std::vector<std::string> &attribute_names) const;
    };

    ////////////////////////////////////////////////////////////////////////
    // AttributNode Declaration
    ////////////////////////////////////////////////////////////////////////
    class AttributeNode : public Node
    {
    public:
        AttributeNode(std::string attribute_name, std::string attribute_value = "");

        ~AttributeNode()
        {
        }

        virtual NodeType type() const override;
        virtual std::string to_string() const override;
    };

    ////////////////////////////////////////////////////////////////////////
    // DataNode Declaration
    ////////////////////////////////////////////////////////////////////////
    class DataNode : public Node
    {
    public:
        DataNode(std::string data, bool is_script = false);

        ~DataNode()
        {
        }

        virtual NodeType type() const override;
        virtual std::string to_string() const override;
    };
}
#endif // NODE_H