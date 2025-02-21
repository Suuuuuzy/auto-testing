var e = require("../../libs/config/props.js"),
  t = {
    props: {
      name: {
        type: [String, Number, null],
        default: e.defprops.tabbarItem.name,
      },
      icon: { icon: String, default: e.defprops.tabbarItem.icon },
      badge: {
        type: [String, Number, null],
        default: e.defprops.tabbarItem.badge,
      },
      dot: { type: Boolean, default: e.defprops.tabbarItem.dot },
      text: { type: String, default: e.defprops.tabbarItem.text },
      badgeStyle: {
        type: [Object, String],
        default: e.defprops.tabbarItem.badgeStyle,
      },
    },
  };
exports.props = t;
