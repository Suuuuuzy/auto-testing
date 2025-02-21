(global.webpackJsonp = global.webpackJsonp || []).push([
  ["pages/mine/mine"],
  {
    "4d39": function (n, a, t) {
      var o = t("52c2");
      t.n(o).a;
    },
    "52c2": function (n, a, t) {},
    "6bff": function (n, a, t) {
      t.r(a);
      var o = t("d168"),
        e = t.n(o);
      for (var i in o)
        "default" !== i &&
          (function (n) {
            t.d(a, n, function () {
              return o[n];
            });
          })(i);
      a.default = e.a;
    },
    "8b48": function (n, a, t) {
      t.d(a, "b", function () {
        return o;
      }),
        t.d(a, "c", function () {
          return e;
        }),
        t.d(a, "a", function () {});
      var o = function () {
          var n = this;
          n.$createElement;
          n._self._c;
        },
        e = [];
    },
    9251: function (n, a, t) {
      t.r(a);
      var o = t("8b48"),
        e = t("6bff");
      for (var i in e)
        "default" !== i &&
          (function (n) {
            t.d(a, n, function () {
              return e[n];
            });
          })(i);
      t("4d39");
      var c = t("f0c5"),
        s = Object(c.a)(
          e.default,
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
      a.default = s.exports;
    },
    d043: function (n, a, t) {
      (function (n) {
        function a(n) {
          return n && n.__esModule ? n : { default: n };
        }
        t("f567"), a(t("66fd")), n(a(t("9251")).default);
      }).call(this, t("543d").createPage);
    },
    d168: function (n, a, t) {
      (function (n) {
        Object.defineProperty(a, "__esModule", { value: !0 }),
          (a.default = void 0),
          getApp().globalData;
        var t,
          o = {
            data: function () {
              return {
                nickname: "--",
                avatar: "../../static/images/icon_mine_photo.png",
                showSosDialog: !1,
                version: getApp().globalData.version,
                sosPhones: [],
              };
            },
            components: {},
            props: {},
            onLoad: function (a) {
              (t = this).get_mine_info_func(),
                n.$on("user_info_update", function (n) {
                  console.log("user_info_update:" + n);
                  var a = n[0];
                  t.setData({ nickname: a.nickname, avatar: a.avatar });
                });
            },
            onUnload: function () {
              n.$off("user_info_update");
            },
            onShow: function () {
              this.getPhone();
              var a = n.getStorageSync("avatar"),
                t = wx.getStorageSync("nickname");
              console.log("avatar" + a),
                "" == a || void 0 == a
                  ? (a = "../../static/images/icon_mine_photo.png")
                  : (this.avatar = a),
                this.$api51.api51_user_islogin()
                  ? void 0 == t && (t = "")
                  : (t = "点击登录账户"),
                (this.nickname = t);
            },
            onShareAppMessage: function () {},
            methods: {
              get_mine_info_func: function () {
                this.$api51.api51_user_info(
                  function (a, o) {
                    var e = a[0];
                    n.setStorageSync("nickname", e.nickname),
                      n.setStorageSync("avatar", e.avatar),
                      (t.nickname = e.nickname),
                      (t.avatar = e.avatar);
                  },
                  function (a, t) {
                    n.showToast({ title: t + a, icon: "none" }),
                      void 0 != failed && failed(a, t);
                  }
                );
              },
              click_common_set: function (a) {
                n.navigateTo({ url: "../common_set/common_set" });
              },
              click_message: function () {
                n.navigateTo({ url: "../car_message/car_message" });
              },
              click_manager_btnFun: function () {
                n.navigateTo({ url: "../car_manage/car_manage?data=false" });
              },
              click_accountFun: function () {
                this.setData({ showSosDialog: !0 });
              },
              click_feedbackFun: function () {
                n.navigateTo({ url: "../mine_feedback/mine_feedback" });
              },
              callSosPhone: function (a) {
                console.log(a), n.makePhoneCall({ phoneNumber: a.telephone });
              },
              sos_cancelFun: function () {
                this.setData({ showSosDialog: !1 });
              },
              getPhone: function () {
                var n = this;
                this.$api51.api51_car_sos_phone_list(
                  function (a, t) {
                    console.log("phone list data" + a),
                      n.setData({ sosPhones: a });
                  },
                  function (n, a) {}
                );
              },
              setData: function (n, a) {
                var t,
                  o,
                  e = this,
                  i = [];
                Object.keys(n).forEach(function (a) {
                  (i = a.split(".")),
                    (t = n[a]),
                    (o = e.$data),
                    i.forEach(function (n, a) {
                      a + 1 == i.length
                        ? e.$set(o, n, t)
                        : o[n] || e.$set(o, n, {}),
                        (o = o[n]);
                    });
                }),
                  a && a();
              },
              click_mine_btnFun: function () {
                this.$api51.api51_user_islogin()
                  ? n.navigateTo({ url: "../mine_info/mine_info" })
                  : n.redirectTo({ url: "/pages/login/login" });
              },
            },
          };
        a.default = o;
      }).call(this, t("543d").default);
    },
  },
  [["d043", "common/runtime", "common/vendor"]],
]);
