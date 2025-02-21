var t = require("../common/component"),
  i = require("../mixins/link"),
  n = require("../mixins/button"),
  e = require("../mixins/open-type");
(0, t.VantComponent)({
  mixins: [i.link, n.button, e.openType],
  relation: {
    type: "ancestor",
    name: "goods-action",
    current: "goods-action-button",
  },
  props: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: { type: String, value: "danger" },
  },
  methods: {
    onClick: function (t) {
      this.$emit("click", t.detail), this.jumpLink();
    },
    updateStyle: function () {
      if (null != this.parent) {
        var t = this.parent.children,
          i = void 0 === t ? [] : t,
          n = i.length,
          e = i.indexOf(this);
        this.setData({ isFirst: 0 === e, isLast: e === n - 1 });
      }
    },
  },
});
