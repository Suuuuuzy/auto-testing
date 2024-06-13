#include "Node.h"

namespace Web
{
    ////////////////////////////////////////////////////////////////////////
    // Node implementation
    ////////////////////////////////////////////////////////////////////////
    Node::Node() : m_children(std::vector<Node *>()),
                   m_bind_info(std::vector<std::tuple<std::string, std::string>>()) {}

    Node::~Node()
    {
        for (Node *child_node : m_children)
            delete child_node;
    }

    std::optional<std::tuple<std::string, std::string>> Node::add_child(Node *child, std::vector<std::string> *binding_events)
    {
        m_children.push_back(child);
        return std::nullopt;
    }

    size_t Node::get_num_children() const { return m_children.size(); }
    size_t Node::get_num_bind() const { return m_bind_info.size(); }
    std::string Node::get_auxiliary_data() const { return m_auxiliary_data; }
    std::string Node::get_name() const { return m_name; }

    bool Node::has_attribute(const std::vector<std::string> &attribute_names) const { return false; }
    std::optional<std::string> Node::get_attribute(const std::vector<std::string> &attribute_names) const { return std::nullopt; }

    Node *Node::get_children(long unsigned int idx) const
    {
        return (idx < m_children.size() ? m_children[idx]
                                        : nullptr);
    }

    std::tuple<std::string, std::string> Node::get_bind_info(long unsigned int idx) const
    {
        return (idx < m_bind_info.size() ? m_bind_info[idx]
                                         : std::tuple("", ""));
    }

    ////////////////////////////////////////////////////////////////////////
    // RootNode implementation
    ////////////////////////////////////////////////////////////////////////
    NodeType RootNode::type() const { return NodeType::ROOT_NODE; }
    std::string RootNode::to_string() const { return "#root {depth: 0}"; }
    int RootNode::get_depth() const { return m_depth; }

    void RootNode::add_root_child(RootNode *child)
    {
        auto return_val = Node::add_child(child);
        assert(!return_val.has_value());
        assert(child->type() == NodeType::ELEMENT_NODE);
        child->m_depth = m_depth + 1;
    }

    ////////////////////////////////////////////////////////////////////////
    // ElementWrapperNode implementation
    ////////////////////////////////////////////////////////////////////////
    ElementWrapperNode::ElementWrapperNode(const std::tuple<std::string, bool> &tag_meta_info) : RootNode()
    {
        m_name = std::get<0>(tag_meta_info);
        m_auxiliary_data = std::get<1>(tag_meta_info) ? "false" : "true";
    }

    std::optional<std::tuple<std::string, std::string>> ElementWrapperNode::add_child(Node *child, std::vector<std::string> *binding_events)
    {
        auto return_val = RootNode::add_child(child);
        assert(!return_val.has_value());
        if (child->type() == NodeType::ATTRIBUTE_NODE && binding_events)
        {
            auto it = std::find(binding_events->begin(), binding_events->end(), child->m_name);
            if (it != binding_events->end())
            {
                m_bind_info.push_back(std::tuple(child->m_name, child->m_auxiliary_data));

                return std::make_tuple(child->m_name, child->m_auxiliary_data);
            }
        }
        return std::nullopt;
    }

    NodeType ElementWrapperNode::type() const { return NodeType::ELEMENT_NODE; }

    std::string ElementWrapperNode::to_string() const
    {
        std::stringstream ss;
        ss << "#element{" << m_name << "} {depth: " << m_depth << "}";
        return ss.str();
    }

    bool ElementWrapperNode::has_end_tag() const { return m_auxiliary_data == "true"; }

    bool ElementWrapperNode::has_attribute(const std::vector<std::string> &attribute_names) const
    {
        for (Node *m_child : m_children)
        {
            if (m_child->type() == NodeType::ATTRIBUTE_NODE)
            {
                for (const std::string &attribute_name : attribute_names)
                {
                    if (m_child->m_name == attribute_name)
                        return true;
                }
            }
        }
        return false;
    }

    std::optional<std::string> ElementWrapperNode::get_attribute(const std::vector<std::string> &attribute_names) const
    {
        for (Node *m_child : m_children)
        {
            if (m_child->type() == NodeType::ATTRIBUTE_NODE)
            {
                for (const std::string &attribute_name : attribute_names)
                {
                    if (m_child->m_name == attribute_name)
                        return m_child->m_auxiliary_data;
                }
            }
        }
        return std::nullopt;
    }

    ////////////////////////////////////////////////////////////////////////
    // AttributeNode implementation
    ////////////////////////////////////////////////////////////////////////
    AttributeNode::AttributeNode(std::string attribute_name, std::string attribute_value) : Node()
    {
        m_name = attribute_name;
        m_auxiliary_data = attribute_value;
    }

    NodeType AttributeNode::type() const { return NodeType::ATTRIBUTE_NODE; }

    std::string AttributeNode::to_string() const
    {
        std::stringstream ss;
        ss << "#attribute{" << m_name << ": " << m_auxiliary_data << "}";
        return ss.str();
    }

    ////////////////////////////////////////////////////////////////////////
    // DataNode implementation
    ////////////////////////////////////////////////////////////////////////
    DataNode::DataNode(std::string data, bool is_script) : Node()
    {
        m_name = data;
        m_auxiliary_data = is_script ? "true" : "false";
    }

    NodeType DataNode::type() const { return NodeType::DATA_NODE; }

    std::string DataNode::to_string() const
    {
        std::stringstream ss;
        if (m_auxiliary_data == "true")
            ss << "script";
        ss << "data{" << m_name << "}";
        return ss.str();
    }
}