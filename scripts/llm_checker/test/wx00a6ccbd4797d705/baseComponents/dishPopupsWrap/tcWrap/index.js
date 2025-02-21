(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishPopupsWrap/tcWrap/index"],
  {
    "00439": function (e, n, o) {
      "use strict";
      var t = o("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var c = {
        name: "tcDishPopupWrap",
        data: function () {
          return { category: "2" };
        },
        mixins: [t(o("0b1d")).default],
        props: {
          context: { type: String, default: "" },
          init: {
            type: Object,
            default: function () {
              return {
                dishBtnSize: { size: 24 },
                promPriceName: "促销价",
                vipTxt: "会员价",
                vipTxtNext: "会员价",
                isPreOrder: !1,
              };
            },
          },
          tcPopLayout: { type: String, default: "" },
        },
        components: {
          blockModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("pages/dishPopups-tc-pop-blockModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("c15e6"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          imgTextModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("pages/dishPopups-tc-pop-imgTextModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("3f31"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          pureTextModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("pages/dishPopups-tc-pop-pureTextModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("06c9"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          bundleModel: function () {
            o.e("pages/dishPopups-tc-pop-bundleModel-commonPackage/index")
              .then(
                function () {
                  return resolve(o("d43d"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          randomModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "pages/dishPopups-tc-pop-randomModel-commonPackage/common/vendor"
              ),
              o.e("pages/dishPopups-tc-pop-randomModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("1004"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
        },
        methods: {},
      };
      n.default = c;
    },
    "2fe3": function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("00439"),
        c = o.n(t);
      for (var a in t)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return t[e];
            });
          })(a);
      n.default = c.a;
    },
    "77db": function (e, n, o) {
      "use strict";
      o.d(n, "b", function () {
        return t;
      }),
        o.d(n, "c", function () {
          return c;
        }),
        o.d(n, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        c = [];
    },
    d84a: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("77db"),
        c = o("2fe3");
      for (var a in c)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return c[e];
            });
          })(a);
      var r = o("f0c5"),
        i = Object(r.a)(
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
      n.default = i.exports;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopupsWrap/tcWrap/index-create-component",
    {
      "baseComponents/dishPopupsWrap/tcWrap/index-create-component": function (
        e,
        n,
        o
      ) {
        o("543d").createComponent(o("d84a"));
      },
    },
    [["baseComponents/dishPopupsWrap/tcWrap/index-create-component"]],
  ]);
