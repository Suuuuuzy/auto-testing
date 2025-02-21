var r = {
  props: {
    tabs: {
      type: Array,
      default: function () {
        return [];
      },
    },
    current: { type: [Number, String], default: 0 },
    bgColor: { type: String, default: "#f8f8f8" },
  },
};
exports.props = r;
