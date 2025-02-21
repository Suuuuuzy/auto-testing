var e = require("../../libs/config/props.js"),
  r = {
    props: {
      value: { type: [String, Number, null], default: e.defprops.tabbar.value },
      safeAreaInsetBottom: {
        type: Boolean,
        default: e.defprops.tabbar.safeAreaInsetBottom,
      },
      border: { type: Boolean, default: e.defprops.tabbar.border },
      zIndex: { type: [String, Number], default: e.defprops.tabbar.zIndex },
      activeColor: { type: String, default: e.defprops.tabbar.activeColor },
      inactiveColor: { type: String, default: e.defprops.tabbar.inactiveColor },
      fixed: { type: Boolean, default: e.defprops.tabbar.fixed },
      placeholder: { type: Boolean, default: e.defprops.tabbar.placeholder },
    },
  };
exports.props = r;
