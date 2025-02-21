(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/mine/mine"],
  {
    7954: function (n, o, e) {
      "use strict";
      var t = e("db0b"),
        c = e.n(t);
      c.a;
    },
    c52e: function (n, o, e) {
      "use strict";
      (function (n, o) {
        var t = e("4ea4");
        e("6cdc");
        t(e("66fd"));
        var c = t(e("e550"));
        (n.__webpack_require_UNI_MP_PLUGIN__ = e), o(c.default);
      }).call(this, e("bc2e")["default"], e("543d")["createPage"]);
    },
    db0b: function (n, o, e) {},
    e018: function (n, o, e) {
      "use strict";
      (function (n, e) {
        Object.defineProperty(o, "__esModule", { value: !0 }),
          (o.default = void 0);
        o.default = {
          data: function () {
            return {
              userInfo: "",
              uniPlatform: "",
              platform: "",
              noticeCount: "",
              imId: "81037109609",
              corpId: "",
              corpKeFuUrl: "",
            };
          },
          onShow: function () {
            this.getUserInfo();
          },
          onLoad: function () {
            console.log("onload");
          },
          methods: {
            hidePop: function () {
              this.$refs.syncpopup.close();
            },
            getUserInfo: function () {
              var o = this;
              n.showLoading({ title: "加载中" }),
                this.$get(this.$api.userinfo, { bannerVersion: 1 }).then(
                  function (e) {
                    (o.platform = n.getSystemInfoSync().platform),
                      (o.uniPlatform = n.getSystemInfoSync().uniPlatform),
                      (o.userInfo = e.data),
                      o.getNoticeCount(),
                      (o.imId = getApp().globalData.systemInfo.imid),
                      (o.corpId = getApp().globalData.systemInfo.corpId),
                      (o.corpKeFuUrl =
                        getApp().globalData.systemInfo.corpKeFuUrl),
                      console.log(o.corpId);
                  }
                );
            },
            getNoticeCount: function () {
              var o = this;
              this.$get(this.$api.noticeCount, {}).then(function (e) {
                e && 1 == e.code && (o.noticeCount = e.data), n.hideLoading();
              });
            },
            syncUserInfo: function () {
              var o = this;
              o.userInfo.syncUserInfo
                ? n.showToast({
                    position: "center",
                    title: "您已经同步成功啦！",
                  })
                : o.$refs.syncpopup.open();
            },
            syncFun: function () {
              var o = this;
              o.hidePop(),
                n.getUserProfile({
                  desc: "同步数据",
                  success: function (n) {
                    console.log(n);
                    var e = {
                      avatarUrl: n.userInfo.avatarUrl,
                      nickName: n.userInfo.nickName,
                      gender: n.userInfo.gender,
                    };
                    o.$post(o.$api.syncUserInfo, e).then(function (n) {
                      console.log(n), (o.userInfo = n.data);
                    });
                  },
                });
            },
            copyUserId: function () {
              this.userInfo.id &&
                n.setClipboardData({
                  data: this.userInfo.name + "的邀请码：" + this.userInfo.id,
                  success: function () {
                    n.showToast({
                      title: "复制成功！",
                      icon: "none",
                      duration: 1e3,
                    });
                  },
                });
            },
            bindaccount: function () {
              this.userInfo.isBindManage
                ? this.goNext("/pages/account/bound")
                : this.goNext("/pages/account/boundAccount");
            },
            openContact: function () {
              console.log(111);
              var n = this;
              console.log(n.corpKeFuUrl),
                console.log(n.corpId),
                e.openCustomerServiceChat({
                  extInfo: { url: n.corpKeFuUrl },
                  corpId: n.corpId,
                  success: function (n) {
                    console.log(n);
                  },
                  fail: function (n) {
                    console.log("222"), console.log(n);
                  },
                });
            },
          },
        };
      }).call(this, e("543d")["default"], e("bc2e")["default"]);
    },
    e10a: function (n, o, e) {
      "use strict";
      e.d(o, "b", function () {
        return c;
      }),
        e.d(o, "c", function () {
          return i;
        }),
        e.d(o, "a", function () {
          return t;
        });
      var t = {
          uniIcons: function () {
            return Promise.all([
              e.e("common/vendor"),
              e.e("uni_modules/uni-icons/components/uni-icons/uni-icons"),
            ]).then(e.bind(null, "1a49"));
          },
          uniPopup: function () {
            return e
              .e("uni_modules/uni-popup/components/uni-popup/uni-popup")
              .then(e.bind(null, "27c0"));
          },
        },
        c = function () {
          var n = this,
            o = n.$createElement;
          n._self._c;
        },
        i = [];
    },
    e550: function (n, o, e) {
      "use strict";
      e.r(o);
      var t = e("e10a"),
        c = e("f673");
      for (var i in c)
        ["default"].indexOf(i) < 0 &&
          (function (n) {
            e.d(o, n, function () {
              return c[n];
            });
          })(i);
      e("7954");
      var u,
        s = e("f0c5"),
        r = Object(s["a"])(
          c["default"],
          t["b"],
          t["c"],
          !1,
          null,
          "6349aa54",
          null,
          !1,
          t["a"],
          u
        );
      o["default"] = r.exports;
    },
    f673: function (n, o, e) {
      "use strict";
      e.r(o);
      var t = e("e018"),
        c = e.n(t);
      for (var i in t)
        ["default"].indexOf(i) < 0 &&
          (function (n) {
            e.d(o, n, function () {
              return t[n];
            });
          })(i);
      o["default"] = c.a;
    },
  },
  [["c52e", "common/runtime", "common/vendor"]],
]);
