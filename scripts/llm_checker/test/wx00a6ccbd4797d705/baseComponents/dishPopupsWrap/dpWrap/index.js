(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishPopupsWrap/dpWrap/index"],
  {
    "152a": function (e, n, o) {
      "use strict";
      var t = o("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var i = {
        name: "dpDishPopupWrap",
        data: function () {
          return { category: "1", isWoods: !1 };
        },
        mixins: [t(o("0b1d")).default],
        props: {
          context: { default: "", type: String },
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
          dpPopLayout: { type: String, default: "" },
        },
        components: {
          bigPictureModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "pages/dishPopups-dp-pop-bigPictureModel-commonPackage/index"
              ),
            ])
              .then(
                function () {
                  return resolve(o("3433"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          dishPageStepModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "pages/dishPopups-dp-pop-dishPageStepModel-commonPackage/index"
              ),
            ])
              .then(
                function () {
                  return resolve(o("56dc"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          fullScreenModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "pages/dishPopups-dp-pop-fullScreenModel-commonPackage/index"
              ),
            ])
              .then(
                function () {
                  return resolve(o("cbe8"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          initialModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("pages/dishPopups-dp-pop-initialModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("b90b"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          specsSingleModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e(
                "pages/dishPopups-dp-pop-specsSingleModel-commonPackage/index"
              ),
            ])
              .then(
                function () {
                  return resolve(o("298f"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          theWoodsModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("pages/dishPopups-dp-pop-theWoodsModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("9324"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
          dishSpecModel: function () {
            Promise.all([
              o.e("common/vendor"),
              o.e("pages/dishPopups-dp-pop-dishSpecModel-commonPackage/index"),
            ])
              .then(
                function () {
                  return resolve(o("428a"));
                }.bind(null, o)
              )
              .catch(o.oe);
          },
        },
        methods: {},
      };
      n.default = i;
    },
    "2dad2": function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("152a"),
        i = o.n(t);
      for (var a in t)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return t[e];
            });
          })(a);
      n.default = i.a;
    },
    a4b74: function (e, n, o) {
      "use strict";
      o.r(n);
      var t = o("c48f"),
        i = o("2dad2");
      for (var a in i)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            o.d(n, e, function () {
              return i[e];
            });
          })(a);
      var c = o("f0c5"),
        d = Object(c.a)(
          i.default,
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
      n.default = d.exports;
    },
    c48f: function (e, n, o) {
      "use strict";
      o.d(n, "b", function () {
        return t;
      }),
        o.d(n, "c", function () {
          return i;
        }),
        o.d(n, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        i = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopupsWrap/dpWrap/index-create-component",
    {
      "baseComponents/dishPopupsWrap/dpWrap/index-create-component": function (
        e,
        n,
        o
      ) {
        o("543d").createComponent(o("a4b74"));
      },
    },
    [["baseComponents/dishPopupsWrap/dpWrap/index-create-component"]],
  ]);
