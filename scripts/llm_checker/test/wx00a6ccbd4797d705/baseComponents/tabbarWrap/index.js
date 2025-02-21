(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/tabbarWrap/index"],
  {
    "1e7e3": function (e, n, a) {
      "use strict";
      var t = a("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var o = t(a("2309")),
        r = {
          name: "tabbarWrap",
          components: {
            tabbarCommonpackage: function () {
              Promise.all([
                a.e("common/vendor"),
                a.e("pages/tabbar-commonPackage/tabbarWrap"),
              ])
                .then(
                  function () {
                    return resolve(a("f1d0"));
                  }.bind(null, a)
                )
                .catch(a.oe);
            },
          },
          props: ["nameSpace"],
          data: function () {
            return {
              componentReady: !1,
              itemsNum: 0,
              centerClass: "",
              show: !1,
              hide: "hide",
            };
          },
          beforeMount: function () {
            var e = this,
              n = this.nameSpace;
            if (n) {
              var a = o.default.getTabbar(n),
                t = a.items,
                r = a.styleType,
                c = t.length;
              1 == c ||
                (5 != r && 2 != r && 3 != r) ||
                (c % 2 == 1 && (this.centerClass = "iconCenter")),
                c &&
                  ((this.itemsNum = c),
                  (this.hide = "show"),
                  o.default
                    .getCommonPackage("tabbar-commonPackage")
                    .then(function (n) {
                      e.componentReady = !0;
                    }));
            }
          },
          methods: {
            init: function () {
              this.hide = "hide";
            },
          },
        };
      n.default = r;
    },
    4169: function (e, n, a) {
      "use strict";
      var t = a("8a4c");
      a.n(t).a;
    },
    "79fa8": function (e, n, a) {
      "use strict";
      a.d(n, "b", function () {
        return t;
      }),
        a.d(n, "c", function () {
          return o;
        }),
        a.d(n, "a", function () {});
      var t = function () {
          var e = this,
            n = (e.$createElement, e._self._c, Math.ceil(e.itemsNum / 2));
          e.$mp.data = Object.assign({}, { $root: { g0: n } });
        },
        o = [];
    },
    "8a4c": function (e, n, a) {},
    "9f9f": function (e, n, a) {
      "use strict";
      a.r(n);
      var t = a("1e7e3"),
        o = a.n(t);
      for (var r in t)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            a.d(n, e, function () {
              return t[e];
            });
          })(r);
      n.default = o.a;
    },
    aa4f: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = a("79fa8"),
        o = a("9f9f");
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            a.d(n, e, function () {
              return o[e];
            });
          })(r);
      a("4169");
      var c = a("f0c5"),
        i = Object(c.a)(
          o.default,
          t.b,
          t.c,
          !1,
          null,
          "79eb9b96",
          null,
          !1,
          t.a,
          void 0
        );
      n.default = i.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/tabbarWrap/index-create-component",
    {
      "baseComponents/tabbarWrap/index-create-component": function (e, n, a) {
        a("543d").createComponent(a("aa4f"));
      },
    },
    [["baseComponents/tabbarWrap/index-create-component"]],
  ]);
