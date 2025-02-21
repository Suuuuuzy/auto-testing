(global.webpackJsonp = global.webpackJsonp || []).push([
  ["common/main"],
  {
    "23be": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("3774"),
        a = n.n(o);
      for (var r in o)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(r);
      t.default = a.a;
    },
    3774: function (e, t, n) {
      "use strict";
      (function (e) {
        var o = n("4ea4");
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          n("3a10"),
          n("4dcb"),
          n("cd7f");
        var a = o(n("295b")),
          r = n("ca00"),
          s = o(n("2309")),
          c = n("9861"),
          i = n("f4bc"),
          u = (n("9f15"), o(n("353d"))),
          d = 0,
          f = {
            onLaunch: function (t) {
              console.log("App Launch", t), this.setParams(t, !0, "Launch");
              var n = t.scene;
              s.default.setBusState("wxEntryScene", n, "SYSTEM");
              var o = e.getUpdateManager();
              o.onUpdateReady(function () {
                e.showModal({
                  title: "更新提示",
                  content: "有新的版本啦，是否重启应用?",
                  success: function (e) {
                    e.confirm && o.applyUpdate();
                  },
                });
              }),
                o.onUpdateFailed(function () {
                  e.showToast({
                    title: "新版本更新失败，请重新打开",
                    icon: "none",
                    duration: 2e3,
                  });
                });
              try {
                var u = (0, r.getStorageSync)("authData" + a.default.baseKey);
                if (u) {
                  u.storeFileVerson != a.default.storeFileVerson &&
                    (0, r.clearStorageSync)();
                  var d = u.exp,
                    f = u.loginTime;
                  new Date().getTime() - f < d
                    ? (s.default.setBusState("token", u.token, "SYSTEM"),
                      e.getStorage({
                        key: a.default.refusePhoneAuthKey,
                        success: function (e) {
                          s.default.setBusState(
                            "refusePhoneAuth",
                            !0,
                            "SYSTEM"
                          );
                        },
                      }))
                    : e.removeStorage({ key: a.default.refusePhoneAuthKey }),
                    s.default.setBusState(
                      "baseInfo",
                      { openId: u.openId, unionId: u.unionId },
                      "SYSTEM"
                    );
                }
              } catch (e) {
                (0, r.clearStorageSync)();
              }
              wx.canIUse("onNetworkStatusChange") &&
                (wx.onNetworkStatusChange(function (t) {
                  var n = t.isConnected,
                    o = t.networkType;
                  if ((console.log("netChange", n, o), n))
                    (0, c.startLogAction)(i.loggerkeys.NETWORKCHANGE, {
                      isConnected: n,
                      networkType: o,
                    }).endAction();
                  else if (
                    (s.default.setBusState(
                      "error",
                      { type: 1, message: "网络开小差了，请检查网络" },
                      "SYSTEM"
                    ),
                    e.navigateTo({ url: "/pages/system/errorPage/index" }),
                    wx.canIUse("setStorage"))
                  ) {
                    var u = {
                      time: (0, r.formatTime)(new Date(), "/", !0),
                      message: "网络断开",
                    };
                    wx.setStorage({
                      key: a.default.baseKey + "netbreak",
                      data: u,
                    });
                  }
                }),
                wx.canIUse("getStorage") &&
                  wx.getStorage({
                    key: a.default.baseKey + "netbreak",
                    success: function (e) {
                      var t = e.data;
                      (0, c.startLogAction)(i.loggerkeys.NETWORKBREAK, {
                        time: t.time,
                        message: t.message,
                      }).endAction(),
                        wx.removeStorage({
                          key: a.default.baseKey + "netbreak",
                          success: function () {
                            console.log("断网信息已删除");
                          },
                        });
                    },
                  })),
                wx.canIUse("onNetworkWeakChange") &&
                  wx.onNetworkWeakChange(function (e) {
                    e.weakNet &&
                      (0, c.startLogAction)(i.loggerkeys.NETWORKWEAK, {
                        networkType: e.networkType,
                      }).endAction();
                  }),
                wx.canIUse("onLazyLoadError") &&
                  wx.onLazyLoadError(function (e) {
                    (0, c.startLogAction)(i.loggerkeys.LAZYLOADERROR, {
                      type: e.type,
                      msg: e.errMsg,
                      subpackage: JSON.stringify(e.subpackage),
                    }).endAction();
                  }),
                this.minDo(),
                console.warn(
                  "系统启动输出打包发布时间 2024年9月4日 17:16   pro--msgj"
                );
            },
            onError: function (e) {
              console.warn("appError", e),
                (0, c.sendError)(e, { actionType: "minError" });
            },
            onShow: function (e) {
              this.setParams(e, !1, "appShow"),
                d > 0 &&
                  (0, c.startLogAction)(i.loggerkeys.APPSHOW).endAction();
            },
            onHide: function () {
              (0, c.startLogAction)(i.loggerkeys.APPHIDE).endAction(), d++;
            },
            onPageNotFound: function (t) {
              console.warn("页面不存在，跳转首页"),
                console.log(t),
                0 != t.path.indexOf("pages/index/index")
                  ? (console.warn("跳转"),
                    e.redirectTo({ url: "/pages/index/index" }))
                  : console.warn("未跳转");
            },
            methods: {
              setParams: function (e, t, n) {},
              minDo: function () {
                var e;
                r.pageEvnTypes.iswxxcx
                  ? (e = wx.getExtConfigSync())
                  : r.pageEvnTypes.iszfbxcx
                  ? (e = my.getExtConfigSync())
                  : r.pageEvnTypes.isttxcx &&
                    (e = tt.getExtConfigSync().extConfig);
                var t = {
                  mpId: e.mpId,
                  appId: e.appId,
                  appName: e.appName,
                  isvAppId: e.isvAppId ? e.isvAppId : "",
                };
                e.hasOwnProperty("gcId") && (t.gcId = e.gcId),
                  s.default.setBusState("baseInfo", t, "SYSTEM"),
                  this.initZa(t);
              },
              initZa: function (e) {
                u.default.setPara({
                  server_url: a.default.zaServer_url,
                  autoTrack: !1,
                  appid: e.appId,
                  app_name: e.appName,
                  debug: !1,
                }),
                  (s.default.zaMin = u.default);
              },
            },
            globalData: {},
          };
        t.default = f;
      }).call(this, n("543d").default);
    },
    "3dfd": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("23be");
      for (var a in o)
        ["default"].indexOf(a) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return o[e];
            });
          })(a);
      n("7c55");
      var r = n("f0c5"),
        s = Object(r.a)(
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
      t.default = s.exports;
    },
    "56d7": function (e, t, n) {
      "use strict";
      (function (e) {
        var t = n("4ea4"),
          o = t(n("9523"));
        n("6cdc");
        var a = n("ca00"),
          r = t(n("3dfd")),
          s = t(n("66fd")),
          c = n("9861");
        function i(e, t) {
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
        (wx.__webpack_require_UNI_MP_PLUGIN__ = n),
          (s.default.config.productionTip = !1),
          (r.default.mpType = "app"),
          (s.default.config.errorHandler = function (e, t, n) {
            var o = {
                t: "vError",
                n: t.$options.name || "组件没有填写name",
                ptime: a.publishTime2,
                m: e.message,
              },
              r = e.stack;
            console.log(JSON.stringify(o)),
              console.error(r),
              (0, c.sendError)(o, { actionType: "vueError" });
          }),
          e(
            new s.default(
              (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {};
                  t % 2
                    ? i(Object(n), !0).forEach(function (t) {
                        (0, o.default)(e, t, n[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(n)
                      )
                    : i(Object(n)).forEach(function (t) {
                        Object.defineProperty(
                          e,
                          t,
                          Object.getOwnPropertyDescriptor(n, t)
                        );
                      });
                }
                return e;
              })({}, r.default)
            )
          ).$mount();
      }).call(this, n("543d").createApp);
    },
    "7c55": function (e, t, n) {
      "use strict";
      var o = n("96df");
      n.n(o).a;
    },
    "96df": function (e, t, n) {},
  },
  [["56d7", "common/runtime", "common/vendor"]],
]);
