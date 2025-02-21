var e = {
  props: {
    status: { type: String, default: "loading" },
    height: { type: [Number, String], default: "83vh" },
    fontSize: { type: [Number, String], default: 32 },
    iconSize: { type: [Number, String], default: 32 },
    loadFontColor: { type: String, default: "#63DAE0" },
    threshold: { type: [Number, String], default: 100 },
    line: { type: Boolean, default: !1 },
    triggered: { type: Boolean, default: !1, required: !0 },
    placeholderHeight: { type: Boolean, default: !1 },
  },
};
exports.props = e;
