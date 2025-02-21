(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/dishesComponents/dishBanner/index"],
  {
    "0e3b": function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("31907"),
        a = t("e734");
      for (var i in a)
        ["default"].indexOf(i) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return a[n];
            });
          })(i);
      t("af36");
      var r = t("f0c5"),
        c = Object(r.a)(
          a.default,
          o.b,
          o.c,
          !1,
          null,
          "c1f93cf8",
          null,
          !1,
          o.a,
          void 0
        );
      e.default = c.exports;
    },
    31907: function (n, e, t) {
      "use strict";
      t.d(e, "b", function () {
        return o;
      }),
        t.d(e, "c", function () {
          return a;
        }),
        t.d(e, "a", function () {});
      var o = function () {
          var n = this,
            e =
              (n.$createElement,
              n._self._c,
              n.bannerInfo.openBanner &&
              (n.bannerInfo.bannerFile.length ||
                n.bannerInfo.bannerAdScheme.length) &&
              5 != n.storeLayout
                ? n.__get_style([n.mcInfoStyle])
                : null),
            t =
              n.bannerInfo.openBanner &&
              (n.bannerInfo.bannerFile.length ||
                n.bannerInfo.bannerAdScheme.length) &&
              5 != n.storeLayout
                ? n.__get_style([n.mcInfoStyleRadius])
                : null;
          n.$mp.data = Object.assign({}, { $root: { s0: e, s1: t } });
        },
        a = [];
    },
    "78ba": function (n, e, t) {},
    af36: function (n, e, t) {
      "use strict";
      var o = t("78ba");
      t.n(o).a;
    },
    d90a: function (n, e, t) {
      "use strict";
      (function (n) {
        var o = t("4ea4");
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = o(t("9523")),
          i = t("6709"),
          r = {
            components: {
              waidaiWrap: function () {
                t.e("baseComponents/waidaiWrap/index")
                  .then(
                    function () {
                      return resolve(t("bf9e"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
              advertComponents: function () {
                Promise.all([
                  t.e("common/vendor"),
                  t.e("pages/advertComponents-commonPackage/index"),
                ])
                  .then(
                    function () {
                      return resolve(t("4a01"));
                    }.bind(null, t)
                  )
                  .catch(t.oe);
              },
            },
            data: function () {
              return { advert: {}, placeHolderHeight: 0 };
            },
            props: {
              bannerInfo: {
                type: Object,
                default: function () {
                  return {};
                },
              },
              ready: { type: Boolean, default: !1 },
              template: { type: String, default: "" },
            },
            watch: {
              ready: function (n) {
                n && this.init();
              },
            },
            computed: {
              storeLayout: function () {
                if (8 !== this.bannerInfo.storeLayout)
                  return this.bannerInfo.storeLayout;
                switch (this.bannerInfo.logoPosition) {
                  case 1:
                    return 6;
                  case 2:
                    return 3;
                  case 3:
                    return 4;
                }
              },
              mcInfoStyle: function () {
                return 8 === this.bannerInfo.storeLayout
                  ? {
                      width: "100%",
                      position: "absolute",
                      bottom: "0",
                      minHeight: "130rpx",
                    }
                  : { minHeight: "130rpx" };
              },
              mcInfoStyleRadius: function () {
                return 8 === this.bannerInfo.storeLayout
                  ? {
                      borderRadius: ""
                        .concat(this.bannerInfo.radiusNum, "rpx ")
                        .concat(this.bannerInfo.radiusNum, "rpx 0 0"),
                      background: "#FFFFFF",
                    }
                  : {};
              },
            },
            created: function () {
              console.log("bannerrrrr", this.bannerInfo), this.init();
            },
            methods: {
              adClickToPage: function (n) {
                this.$emit("adClickToPage", n);
              },
              changeWaidai: function (n) {
                this.$emit("changeWaidai", n);
              },
              init: function () {
                var n = this;
                if (
                  this.bannerInfo.bannerAdScheme &&
                  this.bannerInfo.bannerAdScheme[0]
                ) {
                  var e = this.bannerInfo.bannerAdScheme[0].schemeId;
                  (0, i.getAdvert)(
                    (0, a.default)({}, e, {}),
                    this.$options.name
                  ).then(function (t) {
                    n.advert = t[e];
                  });
                }
              },
              dishAd: function (n) {
                console.log("....dishbanner...dish"), this.$emit("dishAd", n);
              },
              initPlaceHolderHeight: function () {
                var e = this,
                  t = this;
                setTimeout(function () {
                  n.createSelectorQuery()
                    .in(e)
                    .select(".mcInfo")
                    .boundingClientRect(function (n) {
                      (t.placeHolderHeight = 2 * n.height - 30),
                        console.log(
                          "....>>>placeHolderHeight...",
                          t.placeHolderHeight
                        );
                    })
                    .exec();
                }, 500);
              },
            },
            mounted: function () {
              if (8 === this.bannerInfo.storeLayout)
                try {
                  this.initPlaceHolderHeight();
                } catch (n) {
                  console.log(n);
                }
            },
          };
        e.default = r;
      }).call(this, t("543d").default);
    },
    e734: function (n, e, t) {
      "use strict";
      t.r(e);
      var o = t("d90a"),
        a = t.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (n) {
            t.d(e, n, function () {
              return o[n];
            });
          })(i);
      e.default = a.a;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishesComponents/dishBanner/index-create-component",
    {
      "baseComponents/dishesComponents/dishBanner/index-create-component":
        function (n, e, t) {
          t("543d").createComponent(t("0e3b"));
        },
    },
    [["baseComponents/dishesComponents/dishBanner/index-create-component"]],
  ]);
