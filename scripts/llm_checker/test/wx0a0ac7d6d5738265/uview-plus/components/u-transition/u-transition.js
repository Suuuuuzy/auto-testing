var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../../common/vendor.js"),
  n = require("./props.js"),
  t = require("../../libs/mixin/mpMixin.js"),
  r = require("../../libs/mixin/mixin.js"),
  s = require("./transition.js"),
  a = {
    name: "u-transition",
    data: function () {
      return {
        inited: !1,
        viewStyle: {},
        status: "",
        transitionEnded: !1,
        display: !1,
        classes: "",
      };
    },
    emits: [
      "click",
      "beforeEnter",
      "enter",
      "afterEnter",
      "beforeLeave",
      "leave",
      "afterLeave",
    ],
    computed: {
      mergeStyle: function () {
        var n = this.viewStyle,
          t = this.customStyle;
        return e(
          e(
            {
              transitionDuration: "".concat(this.duration, "ms"),
              transitionTimingFunction: this.timingFunction,
            },
            i.index.$u.addStyle(t)
          ),
          n
        );
      },
    },
    mixins: [t.mpMixin, r.mixin, s.transition, n.props],
    watch: {
      show: {
        handler: function (e) {
          e ? this.vueEnter() : this.vueLeave();
        },
        immediate: !0,
      },
    },
  };
var o = i._export_sfc(a, [
  [
    "render",
    function (e, n, t, r, s, a) {
      return i.e(
        { a: s.inited },
        s.inited
          ? {
              b: i.o(function () {
                return e.clickHandler && e.clickHandler.apply(e, arguments);
              }),
              c: i.n(s.classes),
              d: i.s(a.mergeStyle),
              e: i.o(function () {
                return e.noop && e.noop.apply(e, arguments);
              }),
            }
          : {}
      );
    },
  ],
  ["__scopeId", "data-v-d466f59e"],
]);
wx.createComponent(o);
