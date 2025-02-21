(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/common_set/common_set"],
  {
    "180b": function (n, o, t) {},
    "47dc": function (n, o, t) {
      var c = t("180b");
      t.n(c).a;
    },
    9759: function (n, o, t) {
      t.r(o);
      var c = t("f500"),
        a = t("dc27");
      for (var e in a)
        "default" !== e &&
          (function (n) {
            t.d(o, n, function () {
              return a[n];
            });
          })(e);
      t("47dc");
      var u = t("f0c5"),
        i = Object(u.a)(
          a.default,
          c.b,
          c.c,
          !1,
          null,
          null,
          null,
          !1,
          c.a,
          void 0
        );
      o.default = i.exports;
    },
    "9aa0": function (n, o, t) {
      (function (n) {
        function o(n) {
          return n && n.__esModule ? n : { default: n };
        }
        t("f567"), o(t("66fd")), n(o(t("9759")).default);
      }).call(this, t("543d").createPage);
    },
    a354: function (n, o, t) {
      (function (n) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0),
          getApp().globalData;
        var t,
          c = {
            onLoad: function (o) {
              (t = this).carColorWhite = n.getStorageSync("change_car_color");
            },
            data: function () {
              return { carColorWhite: !1 };
            },
            methods: {
              click_login_out: function () {
                n.showModal({
                  title: "提示",
                  content: "确定退出?",
                  success: function (n) {
                    n.confirm && t.excute_login_outFun();
                  },
                });
              },
              excute_login_outFun: function () {
                this.$api51.api51_login_out(
                  function (o, t) {
                    console.log("退出成功清除数据"),
                      n.navigateBack({ delta: 2 });
                  },
                  function (o, t) {
                    n.navigateBack({ delta: 2 });
                  }
                );
              },
              click_account_safe: function (o) {
                n.navigateTo({ url: "./account_safe" });
              },
              click_sound_set: function (o) {
                n.navigateTo({ url: "sound_set" });
              },
              click_param_set: function (o) {
                n.navigateTo({ url: "param_set" });
              },
              change_car_colorFun: function (o) {
                console.log(JSON.stringify(o)),
                  console.log(o.detail.value),
                  n.setStorageSync("change_car_color", o.detail.value),
                  n.$emit("change_car_color");
              },
              bindload: function (n) {
                console.log("bindload" + n);
              },
              binderror: function (n) {
                console.log("binderror" + JSON.stringify(n));
              },
            },
          };
        o.default = c;
      }).call(this, t("543d").default);
    },
    dc27: function (n, o, t) {
      t.r(o);
      var c = t("a354"),
        a = t.n(c);
      for (var e in c)
        "default" !== e &&
          (function (n) {
            t.d(o, n, function () {
              return c[n];
            });
          })(e);
      o.default = a.a;
    },
    f500: function (n, o, t) {
      t.d(o, "b", function () {
        return c;
      }),
        t.d(o, "c", function () {
          return a;
        }),
        t.d(o, "a", function () {});
      var c = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        a = [];
    },
  },
  [["9aa0", "common/runtime", "common/vendor"]],
]);
