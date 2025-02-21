(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/teach/teach"],
  {
    4824: function (n, t, e) {
      (function (n) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var e = {
          data: function () {
            return {
              curIndex: 0,
              imageList: [
                "https://img.alicdn.com/imgextra/i4/831133163/O1CN01SV6L6C1ZEhOBcFxZa_!!831133163.jpg",
                "https://img.alicdn.com/imgextra/i2/831133163/O1CN01ziSIUY1ZEhO3QdFAp_!!831133163.jpg",
                (src =
                  "https://img.alicdn.com/imgextra/i4/831133163/O1CN013X46BU1ZEhVKq53Ny_!!831133163.jpg"),
                "https://img.alicdn.com/imgextra/i2/831133163/O1CN01Qfokp61ZEhVMWS4hz_!!831133163.jpg",
              ],
            };
          },
          onLoad: function () {
            var n = null;
            wx.createInterstitialAd &&
              ((n = wx.createInterstitialAd({
                adUnitId: getApp().globalData.parseAdCard,
              })).onLoad(function () {}),
              n.onError(function (n) {}),
              n.onClose(function () {})),
              n &&
                n.show().catch(function (n) {
                  console.error(n);
                });
          },
          methods: {
            change: function () {
              this.curIndex <= 2
                ? (this.curIndex = this.curIndex + 1)
                : n.switchTab({ url: "../index/index" });
            },
          },
        };
        t.default = e;
      }).call(this, e("543d").default);
    },
    4994: function (n, t, e) {
      var a = function () {
          this.$createElement, this._self._c;
        },
        i = [];
      e.d(t, "b", function () {
        return a;
      }),
        e.d(t, "c", function () {
          return i;
        }),
        e.d(t, "a", function () {});
    },
    "6fc6": function (n, t, e) {
      e.r(t);
      var a = e("4994"),
        i = e("f9e2");
      for (var c in i)
        "default" !== c &&
          (function (n) {
            e.d(t, n, function () {
              return i[n];
            });
          })(c);
      e("bd64");
      var o = e("f0c5"),
        u = Object(o.a)(
          i.default,
          a.b,
          a.c,
          !1,
          null,
          null,
          null,
          !1,
          a.a,
          void 0
        );
      t.default = u.exports;
    },
    "98de": function (n, t, e) {
      (function (n) {
        function t(n) {
          return n && n.__esModule ? n : { default: n };
        }
        e("616a"), e("921b"), t(e("66fd")), n(t(e("6fc6")).default);
      }).call(this, e("543d").createPage);
    },
    b704: function (n, t, e) {},
    bd64: function (n, t, e) {
      var a = e("b704");
      e.n(a).a;
    },
    f9e2: function (n, t, e) {
      e.r(t);
      var a = e("4824"),
        i = e.n(a);
      for (var c in a)
        "default" !== c &&
          (function (n) {
            e.d(t, n, function () {
              return a[n];
            });
          })(c);
      t.default = i.a;
    },
  },
  [["98de", "common/runtime", "common/vendor"]],
]);
