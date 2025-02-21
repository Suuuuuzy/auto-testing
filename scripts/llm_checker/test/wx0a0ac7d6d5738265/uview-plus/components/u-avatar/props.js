var a = require("../../../common/vendor.js"),
  e = require("../../libs/config/props.js"),
  r = {
    props: {
      src: { type: String, default: e.defprops.avatar.src },
      shape: { type: String, default: e.defprops.avatar.shape },
      size: { type: [String, Number], default: e.defprops.avatar.size },
      mode: { type: String, default: e.defprops.avatar.mode },
      text: { type: String, default: e.defprops.avatar.text },
      bgColor: { type: String, default: e.defprops.avatar.bgColor },
      color: { type: String, default: e.defprops.avatar.color },
      fontSize: { type: [String, Number], default: e.defprops.avatar.fontSize },
      icon: { type: String, default: e.defprops.avatar.icon },
      mpAvatar: { type: Boolean, default: e.defprops.avatar.mpAvatar },
      randomBgColor: {
        type: Boolean,
        default: e.defprops.avatar.randomBgColor,
      },
      defaultUrl: { type: String, default: e.defprops.avatar.defaultUrl },
      colorIndex: {
        type: [String, Number],
        validator: function (e) {
          return a.index.$u.test.range(e, [0, 19]) || "" === e;
        },
        default: e.defprops.avatar.colorIndex,
      },
      name: { type: String, default: e.defprops.avatar.name },
    },
  };
exports.props = r;
