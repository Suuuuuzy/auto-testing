(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB",
  ],
  {
    "0529": function (o, e, n) {},
    "2d764": function (o, e, n) {
      "use strict";
      var t = n("0529");
      n.n(t).a;
    },
    "39b3": function (o, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var t = n("ca00"),
        i = (0, t.getProportion)(),
        s = (0, t.getSystemInfoSync)().windowWidth,
        a = {
          data: function () {
            return {
              windowWidth: s,
              showVideo: !0,
              proportion: i,
              isShowDetail: !1,
            };
          },
          props: {
            sales: { default: "" },
            themeColor: "",
            btnTxtColor: "",
            videoUrl: "",
            imgList: {
              default: function () {
                return [];
              },
            },
            showShare: !1,
            promName: "",
            promotionLimit: "",
            hyOrderLimit: "",
            aspectRatio: { string: Number, default: 4 / 3 },
            customSalesText: "",
          },
          components: {
            imageVideoSwiper: function () {
              n.e("baseComponents/imageVideoSwiper/index")
                .then(
                  function () {
                    return resolve(n("65e5"));
                  }.bind(null, n)
                )
                .catch(n.oe);
            },
          },
          methods: {
            getShowVideo: function (o) {
              this.showVideo = o;
            },
            initHead: function () {
              (this.isShowDetail = !1),
                this.$refs.imageVideoSwiper &&
                  this.$refs.imageVideoSwiper.init();
            },
            isShowFun: function () {
              this.isShowDetail = !this.isShowDetail;
            },
          },
        };
      e.default = a;
    },
    "49b6": function (o, e, n) {
      "use strict";
      n.r(e);
      var t = n("39b3"),
        i = n.n(t);
      for (var s in t)
        ["default"].indexOf(s) < 0 &&
          (function (o) {
            n.d(e, o, function () {
              return t[o];
            });
          })(s);
      e.default = i.a;
    },
    "979f": function (o, e, n) {
      "use strict";
      n.r(e);
      var t = n("be55"),
        i = n("49b6");
      for (var s in i)
        ["default"].indexOf(s) < 0 &&
          (function (o) {
            n.d(e, o, function () {
              return i[o];
            });
          })(s);
      n("2d764");
      var a = n("f0c5"),
        c = Object(a.a)(
          i.default,
          t.b,
          t.c,
          !1,
          null,
          "3196e327",
          null,
          !1,
          t.a,
          void 0
        );
      e.default = c.exports;
    },
    be55: function (o, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return t;
      }),
        n.d(e, "c", function () {
          return i;
        }),
        n.d(e, "a", function () {});
      var t = function () {
          this.$createElement, this._self._c;
        },
        i = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB-create-component",
    {
      "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB-create-component":
        function (o, e, n) {
          n("543d").createComponent(n("979f"));
        },
    },
    [
      [
        "baseComponents/dishPopups-common-commonPackage/dishPopupsCommon/components/headStyle/styleB-create-component",
      ],
    ],
  ]);
