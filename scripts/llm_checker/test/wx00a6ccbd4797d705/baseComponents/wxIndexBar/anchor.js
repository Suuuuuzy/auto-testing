(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/wxIndexBar/anchor"],
  {
    "0810": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("ba1c"),
        a = t.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(c);
      e.default = a.a;
    },
    "20dc": function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return a;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
    "4a00": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("20dc"),
        a = t("0810");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return a[n];
            });
          })(c);
      t("f861");
      var r = t("f0c5"),
        u = Object(r.a)(
          a.default,
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
    "6a17": function (n, e, t) {},
    ba1c: function (n, e, t) {
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
            return { active: !1, nodeName: "indexAnchor" };
          },
          methods: {
            getRect: function (e, t) {
              var o = this;
              return new Promise(function (a) {
                n.createSelectorQuery()
                  .in(o)
                  [t ? "selectAll" : "select"](e)
                  .boundingClientRect(function (n) {
                    t && Array.isArray(n) && n.length && a(n), !t && n && a(n);
                  })
                  .exec();
              });
            },
          },
        };
        e.default = t;
      }).call(this, t("543d").default);
    },
    f861: function (n, e, t) {
      "use strict";
      var o = t("6a17");
      t.n(o).a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/wxIndexBar/anchor-create-component",
    {
      "baseComponents/wxIndexBar/anchor-create-component": function (n, e, t) {
        t("543d").createComponent(t("4a00"));
      },
    },
    [["baseComponents/wxIndexBar/anchor-create-component"]],
  ]);
