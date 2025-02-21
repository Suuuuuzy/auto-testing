var e = require("../../libs/config/props.js"),
  t = {
    props: {
      label: { type: String, default: e.defprops.formItem.label },
      prop: { type: String, default: e.defprops.formItem.prop },
      borderBottom: {
        type: [String, Boolean],
        default: e.defprops.formItem.borderBottom,
      },
      labelWidth: {
        type: [String, Number],
        default: e.defprops.formItem.labelWidth,
      },
      rightIcon: { type: String, default: e.defprops.formItem.rightIcon },
      leftIcon: { type: String, default: e.defprops.formItem.leftIcon },
      required: { type: Boolean, default: e.defprops.formItem.required },
      leftIconStyle: {
        type: [String, Object],
        default: e.defprops.formItem.leftIconStyle,
      },
    },
  };
exports.props = t;
