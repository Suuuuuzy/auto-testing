(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/wxIndexBar/anchor2"],
  {
    "41f1": function (n, e, t) {
      "use strict";
      (function (n) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var t = {
          props: {
            useSlot: Boolean,
            index: null,
            computedClass: { default: "" },
          },
          data: function () {
            return { active: !1, nodeName: "indexAnchor2" };
          },
          methods: {
            getRect: function (e, t) {
              var o = this;
              return new Promise(function (c) {
                n.createSelectorQuery()
                  .in(o)
                  [t ? "selectAll" : "select"](e)
                  .boundingClientRect(function (n) {
                    t && Array.isArray(n) && n.length && c(n), !t && n && c(n);
                  })
                  .exec();
              });
            },
          },
        };
        e.default = t;
      }).call(this, t("543d").default);
    },
    5148: function (n, e, t) {
      "use strict";
      var o = t("8437");
      t.n(o).a;
    },
    "7c50": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("f71f"),
        c = t("de85");
      for (var a in c)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return c[n];
            });
          })(a);
      t("5148");
      var r = t("f0c5"),
        u = Object(r.a)(
          c.default,
          o.b,
          o.c,
          !1,
          null,
          null,
          null,
          !1,
          o.a,
          void 0
        );
      e.default = u.exports;
    },
    8437: function (n, e, t) {},
    de85: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("41f1"),
        c = t.n(o);
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(a);
      e.default = c.a;
    },
    f71f: function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return c;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/wxIndexBar/anchor2-create-component",
    {
      "baseComponents/wxIndexBar/anchor2-create-component": function (n, e, t) {
        t("543d").createComponent(t("7c50"));
      },
    },
    [["baseComponents/wxIndexBar/anchor2-create-component"]],
  ]);
