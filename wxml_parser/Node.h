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

    class Node
    {
        friend class RootNode;
        friend class ElementWrapperNode;
        friend class AttributeNode;
        friend class DataNode;

    public:
        // Constructor
        Node() : m_children(std::vector<Node *>()),
                 m_bind_info(std::vector<std::tuple<std::string, std::string>>()) {}

        virtual ~Node()
        {
            for (Node *child_node : m_children)
                delete child_node;
        }

        // Add a child node
        void add_child(Node *child) { m_children.push_back(child); }

        size_t get_num_children() { return m_children.size(); }
        size_t get_num_bind() { return m_bind_info.size(); }
        std::string get_auxiliary_data() const { return m_auxiliary_data; }
        std::string get_name() const { return m_name; }

        Node *get_children(long unsigned int idx)
        {
            return (idx < m_children.size() ? m_children[idx]
                                            : nullptr);
        }

        std::tuple<std::string, std::string> get_bind_info(long unsigned int idx)
        {
            return (idx < m_bind_info.size() ? m_bind_info[idx]
                                             : std::tuple("", ""));
        }

        virtual NodeType type() const = 0;
        virtual std::string to_string() const = 0;

    private:
        std::string m_name;
        std::vector<Node *> m_children; // Children nodes
        std::vector<std::tuple<std::string, std::string>> m_bind_info;
        std::string m_auxiliary_data;
    };

    class RootNode : public Node
    {
        friend class ElementWrapperNode;

    public:
        // Constructor
        RootNode() : Node() {}

        ~RootNode()
        {
        }

        virtual NodeType type() const override { return NodeType::ROOT_NODE; }
        virtual std::string to_string() const override { return "#root {depth: 0}"; }

        // void set_depth(int depth) { m_depth = depth; }
        int get_depth() const { return m_depth; }

        void add_root_child(RootNode *child)
        {
            Node::add_child(child);
            assert(child->type() == NodeType::ELEMENT_NODE);
            child->m_depth = m_depth + 1;
        }

    private:
        int m_depth{0};
    };

    class ElementWrapperNode : public RootNode
    {
    public:
        // Constructor
        ElementWrapperNode(const std::tuple<std::string, bool> &tag_meta_info) : RootNode()
        {
            m_name = std::get<0>(tag_meta_info);
            m_auxiliary_data = std::get<1>(tag_meta_info) ? "false" : "true";
        }

        ~ElementWrapperNode()
        {
        }

        void add_child(Node *child)
        {
            RootNode::add_child(child);
            if (child->type() == NodeType::ATTRIBUTE_NODE &&
                (child->m_name).substr(0, 4) == "bind")
            {
                m_bind_info.push_back(std::tuple(child->m_name, child->m_auxiliary_data));
            }
        }

        virtual NodeType type() const override { return NodeType::ELEMENT_NODE; }

        virtual std::string to_string() const override
        {
            std::stringstream ss;
            ss << "#element{" << m_name << "} {depth: " << m_depth << "}";
            return ss.str();
        }

        bool has_end_tag() const { return m_auxiliary_data == "true"; }
    };

    class AttributeNode : public Node
    {
    public:
        AttributeNode(std::string attribute_name, std::string attribute_value = "") : Node()
        {
            m_name = attribute_name;
            m_auxiliary_data = attribute_value;
        }

        ~AttributeNode()
        {
        }

        virtual NodeType type() const override { return NodeType::ATTRIBUTE_NODE; }

        virtual std::string to_string() const override
        {
            std::stringstream ss;
            ss << "#attribute{" << m_name << ": " << m_auxiliary_data << "}";
            return ss.str();
        }
    };

    class DataNode : public Node
    {
    public:
        DataNode(std::string data, bool is_script = false) : Node()
        {
            m_name = data;
            m_auxiliary_data = is_script ? "true" : "false";
        }

        ~DataNode()
        {
        }

        virtual NodeType type() const override { return NodeType::DATA_NODE; }
        virtual std::string to_string() const override
        {
            std::stringstream ss;
            if (m_auxiliary_data == "true")
                ss << "script";
            ss << "data{" << m_name << "}";
            return ss.str();
        }
    };
}
#endif // NODE_H