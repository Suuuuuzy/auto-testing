(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot"],
  {
    "0232": function (t, e, n) {
      "use strict";
      var i = n("4193"),
        o = n.n(i);
      o.a;
    },
    "27f2": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("c512"),
        o = n("7f6d");
      for (var s in o)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return o[t];
            });
          })(s);
      n("0232");
      var d,
        r = n("f0c5"),
        u = Object(r["a"])(
          o["default"],
          i["b"],
          i["c"],
          !1,
          null,
          null,
          null,
          !1,
          i["a"],
          d
        );
      e["default"] = u.exports;
    },
    4193: function (t, e, n) {},
    "7f6d": function (t, e, n) {
      "use strict";
      n.r(e);
      var i = n("fb65"),
        o = n.n(i);
      for (var s in i)
        ["default"].indexOf(s) < 0 &&
          (function (t) {
            n.d(e, t, function () {
              return i[t];
            });
          })(s);
      e["default"] = o.a;
    },
    c512: function (t, e, n) {
      "use strict";
      var i;
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "c", function () {
          return s;
        }),
        n.d(e, "a", function () {
          return i;
        });
      var o = function () {
          var t = this,
            e = t.$createElement,
            n = (t._self._c, "nav" === t.mode ? t.info.length : null);
          t.$mp.data = Object.assign({}, { $root: { g0: n } });
        },
        s = [];
    },
    fb65: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      e.default = {
        name: "UniSwiperDot",
        emits: ["clickItem"],
        props: {
          info: {
            type: Array,
            default: function () {
              return [];
            },
          },
          current: { type: Number, default: 0 },
          dotsStyles: {
            type: Object,
            default: function () {
              return {};
            },
          },
          mode: { type: String, default: "default" },
          field: { type: String, default: "" },
        },
        data: function () {
          return {
            dots: {
              width: 6,
              height: 6,
              bottom: 10,
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, .3)",
              border: "1px rgba(0, 0, 0, .3) solid",
              selectedBackgroundColor: "#333",
              selectedBorder: "1px rgba(0, 0, 0, .9) solid",
            },
          };
        },
        watch: {
          dotsStyles: function (t) {
            this.dots = Object.assign(this.dots, this.dotsStyles);
          },
          mode: function (t) {
            "indexes" === t
              ? ((this.dots.width = 14), (this.dots.height = 14))
              : ((this.dots.width = 6), (this.dots.height = 6));
          },
        },
        created: function () {
          "indexes" === this.mode &&
            ((this.dots.width = 12), (this.dots.height = 12)),
            (this.dots = Object.assign(this.dots, this.dotsStyles));
        },
        methods: {
          clickItem: function (t) {
            this.$emit("clickItem", t);
          },
        },
      };
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot-create-component",
  {
    "uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot-create-component":
      function (module, exports, __webpack_require__) {
        __webpack_require__("543d")["createComponent"](
          __webpack_require__("27f2")
        );
      },
  },
  [
    [
      "uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot-create-component",
    ],
  ],
]);
