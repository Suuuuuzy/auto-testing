var e = require("../../libs/config/props.js"),
  t = {
    props: {
      hairline: { type: Boolean, default: e.defprops.button.hairline },
      type: { type: String, default: e.defprops.button.type },
      size: { type: String, default: e.defprops.button.size },
      shape: { type: String, default: e.defprops.button.shape },
      plain: { type: Boolean, default: e.defprops.button.plain },
      disabled: { type: Boolean, default: e.defprops.button.disabled },
      loading: { type: Boolean, default: e.defprops.button.loading },
      loadingText: {
        type: [String, Number],
        default: e.defprops.button.loadingText,
      },
      loadingMode: { type: String, default: e.defprops.button.loadingMode },
      loadingSize: {
        type: [String, Number],
        default: e.defprops.button.loadingSize,
      },
      openType: { type: String, default: e.defprops.button.openType },
      formType: { type: String, default: e.defprops.button.formType },
      appParameter: { type: String, default: e.defprops.button.appParameter },
      hoverStopPropagation: {
        type: Boolean,
        default: e.defprops.button.hoverStopPropagation,
      },
      lang: { type: String, default: e.defprops.button.lang },
      sessionFrom: { type: String, default: e.defprops.button.sessionFrom },
      sendMessageTitle: {
        type: String,
        default: e.defprops.button.sendMessageTitle,
      },
      sendMessagePath: {
        type: String,
        default: e.defprops.button.sendMessagePath,
      },
      sendMessageImg: {
        type: String,
        default: e.defprops.button.sendMessageImg,
      },
      showMessageCard: {
        type: Boolean,
        default: e.defprops.button.showMessageCard,
      },
      dataName: { type: String, default: e.defprops.button.dataName },
      throttleTime: {
        type: [String, Number],
        default: e.defprops.button.throttleTime,
      },
      hoverStartTime: {
        type: [String, Number],
        default: e.defprops.button.hoverStartTime,
      },
      hoverStayTime: {
        type: [String, Number],
        default: e.defprops.button.hoverStayTime,
      },
      text: { type: [String, Number], default: e.defprops.button.text },
      icon: { type: String, default: e.defprops.button.icon },
      iconColor: { type: String, default: e.defprops.button.icon },
      color: { type: String, default: e.defprops.button.color },
    },
  };
exports.props = t;
