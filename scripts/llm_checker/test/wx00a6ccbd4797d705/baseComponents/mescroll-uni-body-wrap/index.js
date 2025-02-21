(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/mescroll-uni-body-wrap/index"],
  {
    "0c74": function (n, e, o) {
      "use strict";
      o.r(e);
      var t = o("cb3b"),
        c = o.n(t);
      for (var i in t)
        ["default"].indexOf(i) < 0 &&
          (function (n) {
            o.d(e, n, function () {
              return t[n];
            });
          })(i);
      e.default = c.a;
    },
    8257: function (n, e, o) {
      "use strict";
      o.d(e, "b", function () {
        return t;
      }),
        o.d(e, "c", function () {
          return c;
        }),
        o.d(e, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
    cb3b: function (n, e, o) {
      "use strict";
      var t = o("4ea4");
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var c = t(o("2309")),
        i = {
          mixins: [t(o("5b17")).default],
          components: {
            mescrollBody: function () {
              Promise.all([
                o.e("pages/mescroll-uni-commonPackage/common/vendor"),
                o.e(
                  "pages/mescroll-uni-commonPackage/mescroll-uni/mescroll-body"
                ),
              ])
                .then(
                  function () {
                    return resolve(o("a6c7"));
                  }.bind(null, o)
                )
                .catch(o.oe);
            },
          },
          props: {
            down: Object,
            up: Object,
            top: [String, Number],
            topbar: [Boolean, String],
            bottom: [String, Number],
            safearea: Boolean,
            height: [String, Number],
            bottombar: { type: Boolean, default: !0 },
            sticky: Boolean,
          },
          data: function () {
            return { componentReady: !1 };
          },
          mounted: function () {
            var n = this;
            c.default
              .getCommonPackage("mescroll-uni-commonPackage")
              .then(function (e) {
                n.componentReady = !0;
              });
          },
          methods: {
            WrapMescrollInit: function (n) {
              this.mescrollInit(n), this.$emit("init", n);
            },
            wrapDown: function (n) {
              this.$emit("down", n);
            },
            wrapUp: function (n) {
              this.$emit("up", n);
            },
            wrapInit: function (n) {
              this.$emit("init", n);
            },
            wrapEmptyClick: function (n) {
              this.$emit("emptyclick", n);
            },
            wrapTopClick: function (n) {
              this.$emit("topclick", n);
            },
            wrapScroll: function (n) {
              this.$emit("scroll", n);
            },
          },
        };
      e.default = i;
    },
    cfe9: function (n, e, o) {
      "use strict";
      o.r(e);
      var t = o("8257"),
        c = o("0c74");
      for (var i in c)
        ["default"].indexOf(i) < 0 &&
          (function (n) {
            o.d(e, n, function () {
              return c[n];
            });
          })(i);
      var a = o("f0c5"),
        r = Object(a.a)(
          c.default,
          t.b,
          t.c,
          !1,
          null,
          null,
          null,
          !1,
          t.a,
          void 0
        );
      e.default = r.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/mescroll-uni-body-wrap/index-create-component",
    {
      "baseComponents/mescroll-uni-body-wrap/index-create-component": function (
        n,
        e,
        o
      ) {
        o("543d").createComponent(o("cfe9"));
      },
    },
    [["baseComponents/mescroll-uni-body-wrap/index-create-component"]],
  ]);
