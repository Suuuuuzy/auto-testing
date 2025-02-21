(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/mine_info_detail/mine_info_detail"],
  {
    "36ba": function (a, n, t) {
      (function (a) {
        var t;
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var e = {
          data: function () {
            return { page_data: {}, text_value: "", isNickName: !1 };
          },
          onLoad: function (n) {
            (t = this),
              console.log("page_data:" + n.data),
              (t.page_data = JSON.parse(n.data)),
              (t.text_value = t.page_data.text),
              (t.isNickName = t.page_data.isNickName),
              a.setNavigationBarTitle({
                title: t.isNickName ? "修改昵称" : "修改地址",
              });
          },
          onUnload: function (a) {},
          methods: {
            input_fun: function (a) {
              console.log(a.detail.value), (t.text_value = a.detail.value);
            },
            confirm_modify: function () {
              t.text_value.length > 0
                ? t.isNickName
                  ? this.$api51.api51_change_nickname(
                      t.text_value,
                      function (n, e) {
                        console.log("修改成功..."),
                          a.setStorageSync("nickname", t.text_value),
                          a.navigateBack({ delta: 1 });
                      },
                      function (a, n) {
                        console.log("修改失败...");
                      }
                    )
                  : this.$api51.api51_change_address(
                      t.text_value,
                      function (n, t) {
                        console.log("修改成功..."),
                          a.navigateBack({ delta: 1 });
                      },
                      function (a, n) {
                        console.log("修改失败...");
                      }
                    )
                : a.showToast({
                    title: t.isNickName ? "请输入昵称" : "请输入详细地址",
                    icon: "none",
                    duration: 2e3,
                  });
            },
          },
        };
        n.default = e;
      }).call(this, t("543d").default);
    },
    "4df9": function (a, n, t) {
      t.r(n);
      var e = t("36ba"),
        i = t.n(e);
      for (var o in e)
        "default" !== o &&
          (function (a) {
            t.d(n, a, function () {
              return e[a];
            });
          })(o);
      n.default = i.a;
    },
    "756b": function (a, n, t) {
      (function (a) {
        function n(a) {
          return a && a.__esModule ? a : { default: a };
        }
        t("f567"), n(t("66fd")), a(n(t("f4cf")).default);
      }).call(this, t("543d").createPage);
    },
    ab8d: function (a, n, t) {},
    d9b8: function (a, n, t) {
      t.d(n, "b", function () {
        return e;
      }),
        t.d(n, "c", function () {
          return i;
        }),
        t.d(n, "a", function () {});
      var e = function () {
          var a = this;
          a.$createElement;
          a._self._c;
        },
        i = [];
    },
    e004: function (a, n, t) {
      var e = t("ab8d");
      t.n(e).a;
    },
    f4cf: function (a, n, t) {
      t.r(n);
      var e = t("d9b8"),
        i = t("4df9");
      for (var o in i)
        "default" !== o &&
          (function (a) {
            t.d(n, a, function () {
              return i[a];
            });
          })(o);
      t("e004");
      var c = t("f0c5"),
        u = Object(c.a)(
          i.default,
          e.b,
          e.c,
          !1,
          null,
          null,
          null,
          !1,
          e.a,
          void 0
        );
      n.default = u.exports;
    },
  },
  [["756b", "common/runtime", "common/vendor"]],
]);
