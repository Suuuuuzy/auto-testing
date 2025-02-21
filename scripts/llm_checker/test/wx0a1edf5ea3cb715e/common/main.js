(global.webpackJsonp = global.webpackJsonp || []).push([
  ["common/main"],
  {
    "4a0f": function (e, t, n) {
      var o = n("80d9");
      n.n(o).a;
    },
    "5b64": function (e, t, n) {
      (function (e, t) {
        var o = n("4ea4"),
          a = o(n("9523"));
        n("35e6");
        var i = o(n("66fd")),
          u = o(n("e70a")),
          r = o(n("ade3")),
          c = o(n("ea95")),
          l = o(n("bb5a")),
          f = o(n("cf42")),
          s = o(n("7e91"));
        function d(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t &&
              (o = o.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function p(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? d(Object(n), !0).forEach(function (t) {
                  (0, a.default)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : d(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        (e.__webpack_require_UNI_MP_PLUGIN__ = n),
          i.default.mixin(l.default),
          i.default.mixin(f.default),
          i.default.use(r.default),
          i.default.component("Avatar", function () {
            Promise.all([n.e("common/vendor"), n.e("components/Avatar")])
              .then(
                function () {
                  return resolve(n("8e59"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          i.default.component("AuthCheck", function () {
            n.e("components/AuthCheck")
              .then(
                function () {
                  return resolve(n("f03f"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          i.default.component("RechagePopup", function () {
            n.e("components/RechagePopup")
              .then(
                function () {
                  return resolve(n("824b"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          i.default.component("WxCode", function () {
            Promise.all([n.e("common/vendor"), n.e("components/WxCode")])
              .then(
                function () {
                  return resolve(n("c9ac"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          i.default.component("WxPopup", function () {
            Promise.all([n.e("common/vendor"), n.e("components/WxPopup")])
              .then(
                function () {
                  return resolve(n("f5a5"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          i.default.component("PerfectPopup", function () {
            n.e("components/PerfectPopup")
              .then(
                function () {
                  return resolve(n("f6a5"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          i.default.component("ConfirmPopup", function () {
            n.e("components/ConfirmPopup")
              .then(
                function () {
                  return resolve(n("e156"));
                }.bind(null, n)
              )
              .catch(n.oe);
          }),
          (i.default.config.productionTip = !1),
          i.default.use(s.default),
          (u.default.mpType = "app"),
          (i.default.prototype.$showLoading = function () {
            c.default.commit("request_show_loading");
          }),
          (i.default.prototype.$hideLoading = function () {
            c.default.commit("request_hide_loading");
          }),
          t(
            new i.default(p(p({}, u.default), {}, { store: c.default }))
          ).$mount();
      }).call(this, n("bc2e").default, n("543d").createApp);
    },
    "63ba": function (e, t, n) {},
    6406: function (e, t, n) {
      var o = n("63ba");
      n.n(o).a;
    },
    "80d9": function (e, t, n) {},
    d7d2: function (e, t, n) {
      n.r(t);
      var o = n("fde5"),
        a = n.n(o);
      for (var i in o)
        ["default"].indexOf(i) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(i);
      t.default = a.a;
    },
    e70a: function (e, t, n) {
      n.r(t);
      var o = n("d7d2");
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(a);
      n("4a0f"), n("6406");
      var i = n("f0c5"),
        u = Object(i.a)(
          o.default,
          void 0,
          void 0,
          !1,
          null,
          null,
          null,
          !1,
          void 0,
          void 0
        );
      t.default = u.exports;
    },
    fde5: function (e, t, n) {
      (function (e, o) {
        var a = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = a(n("ea95")),
          u = a(n("7089")),
          r = a(n("06b3")),
          c = a(n("775e")),
          l = a(n("3e96")),
          f = a(n("6320")),
          s = n("df69"),
          d =
            (n("426c"),
            new c.default({ id: "iHWefAYqKznuxWjLnr", reportApiSpeed: !0 }));
        e.$aegis = d;
        var p = {
          onLaunch: function () {
            console.log("App Launch"),
              e.$aegis.reportEvent({
                name: "onLaunch",
                ext1: "onLaunch-success",
                ext2: "uniTuikitExternal",
                ext3: "".concat(1400203341),
              }),
              e.setStorageSync("TIM_".concat(1400203341, "_isTUIKit"), !0),
              (e.$TUIKit = u.default.create({ SDKAppID: 1400203341 })),
              e.$TUIKit.setLogLevel(3),
              e.$TUIKit.registerPlugin({ "tim-upload-plugin": f.default }),
              e.$TUIKit.registerPlugin({ "cos-wx-sdk": r.default }),
              (o.$TIM = e.$TUIKit),
              (e.$TUIKitTIM = u.default),
              (e.$TUIKitEvent = u.default.EVENT),
              (e.$TUIKitVersion = u.default.VERSION),
              (e.$TUIKitTypes = u.default.TYPES),
              (e.$resetLoginData = this.resetLoginData()),
              e.$TUIKit.on(e.$TUIKitEvent.SDK_READY, this.onSDKReady),
              e.$TUIKit.on(e.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady),
              e.$TUIKit.on(e.$TUIKitEvent.KICKED_OUT, this.onKickedOut),
              e.$TUIKit.on(e.$TUIKitEvent.ERROR, this.onTIMError),
              e.$TUIKit.on(
                e.$TUIKitEvent.NET_STATE_CHANGE,
                this.onNetStateChange
              ),
              e.$TUIKit.on(e.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);
            var t = e.getStorageSync("userInfo"),
              n = e.getStorageSync("userPermission");
            i.default.commit("updateUserInfo", t),
              i.default.commit("setPermission", n),
              e.getSystemInfo({
                success: function (e) {
                  i.default.commit("setSystemInfo", e);
                },
              }),
              ((t && -1 !== t.vipLevel) || !t) &&
                ((0, s.typeLabels)({ type: 1 }).then(function (t) {
                  e.setStorage({ key: "typeLabels", data: t || [] });
                }),
                (0, s.typeLabels)({ type: 2, sex: 1 }).then(function (t) {
                  e.setStorage({ key: "manLabels", data: t || [] });
                }),
                (0, s.typeLabels)({ type: 2, sex: 2 }).then(function (t) {
                  e.setStorage({ key: "womanLabels", data: t || [] });
                }));
          },
          globalData: {
            userInfo: null,
            userProfile: null,
            isTUIKit: !0,
            headerHeight: 0,
            statusBarHeight: 0,
            SDKAppID: 1400203341,
          },
          methods: {
            resetLoginData: function () {
              (this.globalData.expiresIn = ""),
                (this.globalData.sessionID = ""),
                (this.globalData.userInfo = {
                  userID: "",
                  userSig: "",
                  token: "",
                  phone: "",
                }),
                (this.globalData.userProfile = null),
                l.default.log(
                  "| app |  resetLoginData | globalData: ".concat(
                    this.globalData
                  )
                );
            },
            onTIMError: function (t) {
              var n = t.data;
              if (2024 === n.code || 3003 === n.code) {
                var o = e.getStorageSync("userInfo"),
                  a = o.imUserId,
                  i = o.imUserSig;
                a &&
                  i &&
                  e.$TUIKit
                    .login({ userID: a, userSig: i })
                    .then(function (e) {
                      console.log(e.data),
                        !0 === e.data.repeatLogin &&
                          console.log(e.data.errorInfo);
                    })
                    .catch(function (e) {
                      console.warn("login error:", e);
                    });
              }
            },
            onSDKReady: function (t) {
              t.name;
              e.$TUIKitEvent.SDK_READY,
                e.$emit("isSDKReady", { isSDKReady: !0 });
            },
            onNetStateChange: function () {},
            onSDKReload: function () {},
            onSdkNotReady: function () {},
            onKickedOut: function () {
              e.showToast({ title: "您被踢下线", icon: "error" });
            },
          },
          onShow: function () {},
          onHide: function () {
            console.log("App Hide");
          },
        };
        t.default = p;
      }).call(this, n("543d").default, n("bc2e").default);
    },
  },
  [["5b64", "common/runtime", "common/vendor"]],
]);
