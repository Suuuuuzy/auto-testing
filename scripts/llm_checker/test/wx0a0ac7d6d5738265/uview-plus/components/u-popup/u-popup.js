require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../common/vendor.js"),
  t = require("./props.js"),
  o = require("../../libs/mixin/mpMixin.js"),
  i = require("../../libs/mixin/mixin.js"),
  n = {
    name: "u-popup",
    mixins: [o.mpMixin, i.mixin, t.props],
    data: function () {
      return { overlayDuration: this.duration + 50 };
    },
    watch: {
      show: function (e, t) {
        if (!0 === e) {
          var o = this.$children;
          this.retryComputedComponentRect(o);
        }
      },
    },
    computed: {
      transitionStyle: function () {
        var t = { zIndex: this.zIndex, position: "fixed", display: "flex" };
        return (
          (t[this.mode] = 0),
          "left" === this.mode || "right" === this.mode
            ? e.index.$u.deepMerge(t, { bottom: 0, top: 0 })
            : "top" === this.mode || "bottom" === this.mode
            ? e.index.$u.deepMerge(t, { left: 0, right: 0 })
            : "center" === this.mode
            ? e.index.$u.deepMerge(t, {
                alignItems: "center",
                "justify-content": "center",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              })
            : void 0
        );
      },
      contentStyle: function () {
        var t = {};
        if (
          (e.index.$u.sys(),
          "center" !== this.mode && (t.flex = 1),
          this.bgColor && (t.backgroundColor = this.bgColor),
          this.round)
        ) {
          var o = e.index.$u.addUnit(this.round);
          "top" === this.mode
            ? ((t.borderBottomLeftRadius = o), (t.borderBottomRightRadius = o))
            : "bottom" === this.mode
            ? ((t.borderTopLeftRadius = o), (t.borderTopRightRadius = o))
            : "center" === this.mode && (t.borderRadius = o);
        }
        return e.index.$u.deepMerge(t, e.index.$u.addStyle(this.customStyle));
      },
      position: function () {
        return "center" === this.mode
          ? this.zoom
            ? "fade-zoom"
            : "fade"
          : "left" === this.mode
          ? "slide-left"
          : "right" === this.mode
          ? "slide-right"
          : "bottom" === this.mode
          ? "slide-up"
          : "top" === this.mode
          ? "slide-down"
          : void 0;
      },
    },
    emits: ["open", "close", "click"],
    methods: {
      overlayClick: function () {
        this.closeOnClickOverlay && this.$emit("close");
      },
      close: function (e) {
        this.$emit("close");
      },
      afterEnter: function () {
        this.$emit("open");
      },
      clickHandler: function () {
        "center" === this.mode && this.overlayClick(), this.$emit("click");
      },
      retryComputedComponentRect: function (t) {
        for (
          var o = this,
            i = [
              "u-calendar-month",
              "u-album",
              "u-collapse-item",
              "u-dropdown",
              "u-index-item",
              "u-index-list",
              "u-line-progress",
              "u-list-item",
              "u-rate",
              "u-read-more",
              "u-row",
              "u-row-notice",
              "u-scroll-list",
              "u-skeleton",
              "u-slider",
              "u-steps-item",
              "u-sticky",
              "u-subsection",
              "u-swipe-action-item",
              "u-tabbar",
              "u-tabs",
              "u-tooltip",
            ],
            n = function () {
              var n = t[r],
                s = n.$children;
              i.includes(n.$options.name) &&
                "function" == typeof (null == n ? void 0 : n.init) &&
                e.index.$u.sleep(50).then(function () {
                  n.init();
                }),
                s.length && o.retryComputedComponentRect(s);
            },
            r = 0;
          r < t.length;
          r++
        )
          n();
      },
    },
  };
Array ||
  (
    e.resolveComponent("u-overlay") +
    e.resolveComponent("u-status-bar") +
    e.resolveComponent("u-icon") +
    e.resolveComponent("u-safe-bottom") +
    e.resolveComponent("u-transition")
  )();
Math ||
  (
    function () {
      return "../u-overlay/u-overlay.js";
    } +
    function () {
      return "../u-status-bar/u-status-bar.js";
    } +
    function () {
      return "../u-icon/u-icon.js";
    } +
    function () {
      return "../u-safe-bottom/u-safe-bottom.js";
    } +
    function () {
      return "../u-transition/u-transition.js";
    }
  )();
var r = e._export_sfc(n, [
  [
    "render",
    function (t, o, i, n, r, s) {
      return e.e(
        { a: t.overlay },
        t.overlay
          ? {
              b: e.o(s.overlayClick),
              c: e.p({
                show: t.show,
                duration: r.overlayDuration,
                customStyle: t.overlayStyle,
                opacity: t.overlayOpacity,
              }),
            }
          : {},
        { d: t.safeAreaInsetTop },
        (t.safeAreaInsetTop, {}),
        { e: t.closeable },
        t.closeable
          ? {
              f: e.p({ name: "close", color: "#909399", size: "18", bold: !0 }),
              g: e.o(function () {
                return s.close && s.close.apply(s, arguments);
              }),
              h: e.n("u-popup__content__close--" + t.closeIconPos),
            }
          : {},
        { i: t.safeAreaInsetBottom },
        (t.safeAreaInsetBottom, {}),
        {
          j: e.s(s.contentStyle),
          k: e.o(function () {
            return t.noop && t.noop.apply(t, arguments);
          }),
          l: e.o(s.afterEnter),
          m: e.o(s.clickHandler),
          n: e.p({
            show: t.show,
            customStyle: s.transitionStyle,
            mode: s.position,
            duration: t.duration,
          }),
        }
      );
    },
  ],
  ["__scopeId", "data-v-06221ba0"],
]);
wx.createComponent(r);
