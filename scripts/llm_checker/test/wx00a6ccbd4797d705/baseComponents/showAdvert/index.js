(global.webpackJsonp = global.webpackJsonp || []).push([
  ["baseComponents/showAdvert/index"],
  {
    2057: function (e, n, t) {
      "use strict";
      var o = t("4ea4");
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.default = void 0);
      var a = o(t("2309")),
        c = t("dc18"),
        r = {
          props: { adType: { type: Number, default: 1 } },
          data: function () {
            return { unitId: "" };
          },
          beforeCreate: function () {
            a.default.injectInterFace(
              { getAdvertInfo: c.getAdvertInfo },
              "SYSTEM"
            );
          },
          created: function () {
            var e = this;
            console.log("[广告开始]"),
              a.default
                .getData({ name: "getAdvertInfo", nameSpace: "SYSTEM" })
                .then(
                  function (n) {
                    if ((console.log("广告查询", n), 0 == n.status)) {
                      var t = n.result.adUnitId;
                      t && (e.unitId = t);
                    }
                  },
                  function (e) {
                    console.log("广告查询失败", e);
                  }
                );
          },
          methods: {
            adError: function () {
              console.log("[广告]加载出错了"), this.$emit("adError");
            },
            adLoaded: function () {
              console.log("[广告]加载成功了"), this.$emit("adLoaded");
            },
          },
        };
      n.default = r;
    },
    "2cf9": function (e, n, t) {},
    7161: function (e, n, t) {
      "use strict";
      var o = t("2cf9");
      t.n(o).a;
    },
    c27b: function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t("fc13f"),
        a = t("dbbe");
      for (var c in a)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return a[e];
            });
          })(c);
      t("7161");
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
      n.default = u.exports;
    },
    dbbe: function (e, n, t) {
      "use strict";
      t.r(n);
      var o = t("2057"),
        a = t.n(o);
      for (var c in o)
        ["default"].indexOf(c) < 0 &&
          (function (e) {
            t.d(n, e, function () {
              return o[e];
            });
          })(c);
      n.default = a.a;
    },
    fc13f: function (e, n, t) {
      "use strict";
      t.d(n, "b", function () {
        return o;
      }),
        t.d(n, "c", function () {
          return a;
        }),
        t.d(n, "a", function () {});
      var o = function () {
          this.$createElement, this._self._c;
        },
        a = [];
    },
  },
]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "baseComponents/showAdvert/index-create-component",
    {
      "baseComponents/showAdvert/index-create-component": function (e, n, t) {
        t("543d").createComponent(t("c27b"));
      },
    },
    [["baseComponents/showAdvert/index-create-component"]],
  ]);
