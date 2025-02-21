(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup",
  ],
  {
    "1a7e": function (e, n, o) {},
    2215: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("2a72a"),
        s = o.n(t);
      for (var i in t)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return t[e];
            });
          })(i);
      n.default = s.a;
    },
    "2a72a": function (e, n, o) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var t = {
        name: "ReomveDishPopup",
        components: {
          wxPopup: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("baseComponents/wxpopup/popup"),
            ])
              .then(
                function () {
                  return resolve(o("0387"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          addDeBtn: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("baseComponents/addDeBtn/index"),
            ])
              .then(
                function () {
                  return resolve(o("cf43"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
        },
        props: {
          value: { type: Boolean, default: !1 },
          dishList: {
            type: Array,
            default: function () {
              return [];
            },
          },
          themeColor: { type: String, default: "" },
        },
        methods: {
          close: function () {
            this.$emit("input", !1);
          },
          dishChange: function (e, n) {
            this.$emit("dishChange", e, n);
          },
        },
      };
      n.default = t;
    },
    8537: function (e, n, o) {
      "use strict";
      o.d(n, "b", function () {
        return t;
      }),
        o.d(n, "c", function () {
          return s;
        }),
        o.d(n, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        s = [];
    },
    b036: function (e, n, o) {
      "use strict";
      var t = o("1a7e");
      o.n(t).a;
    },
    f622: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("8537"),
        s = o("2215");
      for (var i in s)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return s[e];
            });
          })(i);
      o("b036");
      var a = o("f0c5"),
        c = Object(a.a)(
          s.default,
          t.b,
          t.c,
          !1,
          null,
          "5e8b3204",
          null,
          !1,
          t.a,
          void 0
        );
      n.default = c.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup-create-component",
    {
      "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup-create-component":
        function (e, n, o) {
          o("543d").createComponent(o("f622"));
        },
    },
    [
      [
        "baseComponents/dishPopups-dp-components-commonPackage/sideDishList/reomveDishPopup-create-component",
      ],
    ],
  ]);
