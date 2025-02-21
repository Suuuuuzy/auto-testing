var e = require("../../libs/config/props.js"),
  t = {
    props: {
      type: { type: String, default: e.defprops.text.type },
      show: { type: Boolean, default: e.defprops.text.show },
      text: { type: [String, Number], default: e.defprops.text.text },
      prefixIcon: { type: String, default: e.defprops.text.prefixIcon },
      suffixIcon: { type: String, default: e.defprops.text.suffixIcon },
      mode: { type: String, default: e.defprops.text.mode },
      href: { type: String, default: e.defprops.text.href },
      format: { type: [String, Function], default: e.defprops.text.format },
      call: { type: Boolean, default: e.defprops.text.call },
      openType: { type: String, default: e.defprops.text.openType },
      bold: { type: Boolean, default: e.defprops.text.bold },
      block: { type: Boolean, default: e.defprops.text.block },
      lines: { type: [String, Number], default: e.defprops.text.lines },
      color: { type: String, default: e.defprops.text.color },
      size: { type: [String, Number], default: e.defprops.text.size },
      iconStyle: { type: [Object, String], default: e.defprops.text.iconStyle },
      decoration: { tepe: String, default: e.defprops.text.decoration },
      margin: {
        type: [Object, String, Number],
        default: e.defprops.text.margin,
      },
      lineHeight: {
        type: [String, Number],
        default: e.defprops.text.lineHeight,
      },
      align: { type: String, default: e.defprops.text.align },
      wordWrap: { type: String, default: e.defprops.text.wordWrap },
    },
  };
exports.props = t;
