(global.webpackJsonp = global.webpackJsonp || []).push([
  [
    "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index",
  ],
  {
    "0589": function (t, n, o) {
      "use strict";
      o.d(n, "b", function () {
        return e;
      }),
        o.d(n, "c", function () {
          return i;
        }),
        o.d(n, "a", function () {});
      var e = function () {
          this.$createElement, this._self._c;
        },
        i = [];
    },
    "0ccd": function (t, n, o) {
      "use strict";
      o.r(n);
      var e = o("0589"),
        i = o("18cb");
      for (var c in i)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            o.d(n, t, function () {
              return i[t];
            });
          })(c);
      o("4996");
      var a = o("f0c5"),
        s = Object(a.a)(
          i.default,
          e.b,
          e.c,
          !1,
          null,
          "4d36e90a",
          null,
          !1,
          e.a,
          void 0
        );
      n.default = s.exports;
    },
    "18cb": function (t, n, o) {
      "use strict";
      o.r(n);
      var e = o("b53a"),
        i = o.n(e);
      for (var c in e)
        ["default"].indexOf(c) < 0 &&
          (function (t) {
            o.d(n, t, function () {
              return e[t];
            });
          })(c);
      n.default = i.a;
    },
    2481: function (t, n, o) {},
    4996: function (t, n, o) {
      "use strict";
      var e = o("2481");
      o.n(e).a;
    },
    b53a: function (t, n, o) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var e = {
        props: {
          chooseUnit4Npart: {
            type: Object,
            default: function () {
              return {
                npartPr: 0,
                npartType: 0,
                npartNum: 0,
                isShow: !1,
                isShowSame: !1,
              };
            },
          },
          chooseUnit4LimitQuantity: {
            type: Object,
            default: function () {
              return { isShow: !1, imitQuantity: 0 };
            },
          },
          themeColor: { type: String },
          customStyle: { type: String, default: "" },
        },
        methods: {
          openNpartPop: function () {
            this.$emit("openNpartPop");
          },
        },
        computed: {
          calcStyle: function () {
            if (
              this.chooseUnit4Npart.isShow ||
              this.chooseUnit4Npart.isShowSame ||
              this.chooseUnit4LimitQuantity.isShow
            )
              return this.customStyle;
          },
        },
      };
      n.default = e;
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index-create-component",
    {
      "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index-create-component":
        function (t, n, o) {
          o("543d").createComponent(o("0ccd"));
        },
    },
    [
      [
        "baseComponents/dishPopups-dp-components-commonPackage/tipsForNotShowUnit/index-create-component",
      ],
    ],
  ]);
