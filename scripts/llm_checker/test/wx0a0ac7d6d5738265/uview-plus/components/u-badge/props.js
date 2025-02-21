var e = require("../../libs/config/props.js"),
  p = {
    props: {
      isDot: { type: Boolean, default: e.defprops.badge.isDot },
      value: { type: [Number, String], default: e.defprops.badge.value },
      modelValue: {
        type: [Number, String],
        default: e.defprops.badge.modelValue,
      },
      show: { type: Boolean, default: e.defprops.badge.show },
      max: { type: [Number, String], default: e.defprops.badge.max },
      type: { type: String, default: e.defprops.badge.type },
      showZero: { type: Boolean, default: e.defprops.badge.showZero },
      bgColor: { type: [String, null], default: e.defprops.badge.bgColor },
      color: { type: [String, null], default: e.defprops.badge.color },
      shape: { type: String, default: e.defprops.badge.shape },
      numberType: { type: String, default: e.defprops.badge.numberType },
      offset: { type: Array, default: e.defprops.badge.offset },
      inverted: { type: Boolean, default: e.defprops.badge.inverted },
      absolute: { type: Boolean, default: e.defprops.badge.absolute },
    },
  };
exports.props = p;
