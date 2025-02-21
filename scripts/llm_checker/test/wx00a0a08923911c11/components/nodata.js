(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["components/nodata"],
  {
    1425: function (n, t, u) {
      "use strict";
      u.r(t);
      var e = u("507f"),
        r = u.n(e);
      for (var c in e)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            u.d(t, n, function () {
              return e[n];
            });
          })(c);
      t["default"] = r.a;
    },
    3969: function (n, t, u) {
      "use strict";
      u.r(t);
      var e = u("cd48"),
        r = u("1425");
      for (var c in r)
        ["default"].indexOf(c) < 0 &&
          (function (n) {
            u.d(t, n, function () {
              return r[n];
            });
          })(c);
      u("d5cb");
      var a,
        f = u("f0c5"),
        o = Object(f["a"])(
          r["default"],
          e["b"],
          e["c"],
          !1,
          null,
          null,
          null,
          !1,
          e["a"],
          a
        );
      t["default"] = o.exports;
    },
    "507f": function (n, t, u) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      t.default = {
        data: function () {
          return {};
        },
        props: ["imgtype"],
      };
    },
    af6d: function (n, t, u) {},
    cd48: function (n, t, u) {
      "use strict";
      var e;
      u.d(t, "b", function () {
        return r;
      }),
        u.d(t, "c", function () {
          return c;
        }),
        u.d(t, "a", function () {
          return e;
        });
      var r = function () {
          var n = this,
            t = n.$createElement;
          n._self._c;
        },
        c = [];
    },
    d5cb: function (n, t, u) {
      "use strict";
      var e = u("af6d"),
        r = u.n(e);
      r.a;
    },
  },
]);
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  "components/nodata-create-component",
  {
    "components/nodata-create-component": function (
      module,
      exports,
      __webpack_require__
    ) {
      __webpack_require__("543d")["createComponent"](
        __webpack_require__("3969")
      );
    },
  },
  [["components/nodata-create-component"]],
]);
