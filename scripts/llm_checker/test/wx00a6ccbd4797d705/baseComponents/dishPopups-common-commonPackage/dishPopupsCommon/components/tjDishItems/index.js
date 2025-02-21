(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index",
  ],
  {
    "275f": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("ad54"),
        s = n("3d75");
      for (var i in s)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return s[e];
            });
          })(i);
      n("615e");
      var a = n("f0c5"),
        d = Object(a.a)(
          s.default,
          o.b,
          o.c,
          !1,
          null,
          "7d2d287b",
          null,
          !1,
          o.a,
          void 0
        );
      t.default = d.exports;
    },
    "3d75": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("df97"),
        s = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      t.default = s.a;
    },
    "615e": function (e, t, n) {
      "use strict";
      var o = n("e3ae");
      n.n(o).a;
    },
    ad54: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return s;
        }),
        n.d(t, "a", function () {});
      var o = function () {
          var e = this,
            t = (e.$createElement, e._self._c, e.__get_style([e.wrapStyle]));
          e.$mp.data = Object.assign({}, { $root: { s0: t } });
        },
        s = [];
    },
    df97: function (e, t, n) {
      "use strict";
      var o = n("4ea4");
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var s = o(n("2309")),
        i = n("ca00"),
        a = {
          name: "popTjDishItems",
          data: function () {
            return { windowWidth: 0 };
          },
          props: {
            context: { type: String, default: "" },
            init: {
              type: Object,
              default: function () {
                return {
                  dishBtnSize: { size: 24 },
                  promPriceName: "促销价",
                  vipTxt: "会员价",
                  isPreOrder: !1,
                };
              },
            },
            tjData: {
              type: Array,
              default: function () {
                return [];
              },
            },
            isVip: { default: !1 },
            isWoods: { default: !1 },
            isFastFood: { type: Boolean, default: !1 },
            themeColor: { type: String, default: "" },
            layout: { type: String, default: "9" },
            widthRatio: { type: Number, default: 1 },
          },
          components: {
            dishItemWM: function () {
              Promise.all([
                n.e("common/vendor"),
                n.e(
                  "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/wmztIndex/tjdishItemPopup-index"
                ),
              ])
                .then(
                  function () {
                    return resolve(n("b838"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            dishItemFast: function () {
              Promise.all([
                n.e("common/vendor"),
                n.e(
                  "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcfastIndex/tjdishItemPopup-index"
                ),
              ])
                .then(
                  function () {
                    return resolve(n("fd7c"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
            dishItemDC: function () {
              Promise.all([
                n.e("common/vendor"),
                n.e(
                  "baseComponents/dishPopups-common-commonPackage/dishItemComponents-placeholder/dcIndex/tjdishItemPopup-index"
                ),
              ])
                .then(
                  function () {
                    return resolve(n("1896"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          methods: {
            updateTjDishNum: function () {
              var e = this;
              if (this.$refs.dishItem) {
                var t = s.default.getBusiness(this.context).dsManger;
                this.tjData.forEach(function (n, o) {
                  var s,
                    i = t.getDishNums(
                      n._businessCategory,
                      n._classId,
                      n._itemId
                    );
                  null === (s = e.$refs.dishItem[o]) ||
                    void 0 === s ||
                    s.updateItemQuantities(i);
                });
              }
            },
          },
          created: function () {
            this.windowWidth = (0, i.getSystemInfoSync)().windowWidth;
          },
          computed: {
            wrapStyle: function () {
              return "23" != this.layout || this.isWoods
                ? {}
                : {
                    "min-width": "calc((".concat(
                      this.windowWidth * this.widthRatio,
                      "px - 100rpx) / 3)"
                    ),
                  };
            },
          },
        };
      t.default = a;
    },
    e3ae: function (e, t, n) {},
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index-create-component":
        function (e, t, n) {
          n("543d").createComponent(n("275f"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/tjDishItems/index-create-component",
      ],
    ],
  ]);
