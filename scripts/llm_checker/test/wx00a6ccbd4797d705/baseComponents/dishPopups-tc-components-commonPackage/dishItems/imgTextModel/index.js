(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index",
  ],
  {
    "25cc": function (e, n, o) {
      "use strict";
      var t = o("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = t(o("734e")),
        c = t(o("2309")),
        i = {
          props: {
            itemWidth: { default: "" },
            showDishLabel: { default: !1 },
            addCookBtnColor: { default: "" },
            context: { default: "" },
            showPriceType: {},
            showUnitName: { type: Boolean, default: !1 },
          },
          components: {},
          mixins: [a.default],
          computed: {
            gqText: function () {
              var e, n;
              return (
                {
                  1: "iconfont icon-qiangguangle f52",
                  2: "iconfont icon-yishouqing f52",
                }[
                  (null ===
                    (e = c.default.getDecorate(this.context).decorationData) ||
                  void 0 === e ||
                  null === (n = e.dishPage) ||
                  void 0 === n
                    ? void 0
                    : n.gqText) || 1
                ] || "iconfont icon-qiangguangle f52"
              );
            },
          },
        };
      n.default = i;
    },
    "2a36": function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("50f5"),
        a = o("d604");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return a[e];
            });
          })(c);
      o("3b55");
      var i = o("f0c5"),
        s = Object(i.a)(
          a.default,
          t.b,
          t.c,
          !1,
          null,
          "3dda0f3e",
          null,
          !1,
          t.a,
          void 0
        );
      n.default = s.exports;
    },
    "3b55": function (e, n, o) {
      "use strict";
      var t = o("5631");
      o.n(t).a;
    },
    "50f5": function (e, n, o) {
      "use strict";
      o.d(n, "b", function () {
        return t;
      }),
        o.d(n, "c", function () {
          return a;
        }),
        o.d(n, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    5631: function (e, n, o) {},
    d604: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("25cc"),
        a = o.n(t);
      for (var c in t)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return t[e];
            });
          })(c);
      n.default = a.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index-create-component",
    {
      "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index-create-component":
        function (e, n, o) {
          o("543d").createComponent(o("2a36"));
        },
    },
    [
      [
        "baseComponents/dishPopups-tc-components-commonPackage/dishItems/imgTextModel/index-create-component",
      ],
    ],
  ]);
