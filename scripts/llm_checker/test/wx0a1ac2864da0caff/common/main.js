(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["common/main"],
  {
    5418: function (e, t, n) {
      "use strict";
      var a = n("ba37"),
        o = n.n(a);
      o.a;
    },
    "6c16": function (e, t, n) {
      "use strict";
      (function (e, t, a) {
        var o = n("47a9"),
          r = o(n("7ca3")),
          u = o(n("3b2d"));
        n("b45a");
        var c = n("7791"),
          i = o(n("3240")),
          l = o(n("402d")),
          p = o(n("26e0")),
          d = o(n("94e2")),
          f = o(n("1ccc")),
          s = o(n("2eeb"));
        function m(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            t &&
              (a = a.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        (e.__webpack_require_UNI_MP_PLUGIN__ = n),
          (i.default.config.productionTip = !1),
          (d.default.mpType = "app"),
          l.default.extend(s.default),
          i.default.use(f.default),
          p.default.commit("UPDATE_NAV", {
            navigationBarHeight: c.navigationBarHeight,
            navigationBarHeightPlaceholder: c.navigationBarHeightPlaceholder,
            documentClassName: c.documentClassName,
            appId: c.appId,
          }),
          (i.default.prototype.$system = c.system),
          (i.default.prototype.$alert = c.alert),
          (i.default.prototype.$router = {
            push: function (e) {
              !(function (e) {
                return "object" === (0, u.default)(e);
              })(e)
                ? t.navigateTo({ url: e })
                : e.isTab
                ? t.switchTab({ url: e.path })
                : e.reLaunch
                ? t.reLaunch({ url: e.path })
                : t.navigateTo({ url: e });
            },
            replace: function (e) {
              t.redirectTo({ url: e });
            },
            back: function () {
              e.navigateBack();
            },
          }),
          (i.default.prototype.$backTo = function () {
            var e = getCurrentPages();
            e && 0 !== e.length && 1 !== e.length
              ? t.navigateBack()
              : t.reLaunch({ url: "/" });
          }),
          (i.default.prototype.$toast = c.toast),
          (i.default.prototype.$dayjs = l.default),
          (i.default.prototype.$rpx = c.rpx),
          (i.default.prototype.$tracking = function (t, n) {
            n || (n = {}),
              (n = Object.assign(n, {
                common_utm_source: p.default.state.utm.utm_source,
              })),
              n.event_name &&
                (n = {
                  common_event_name: n.event_name,
                  common_event_category: n.event_category,
                  common_event_value: n.event_value,
                }),
              e.reportAnalytics(t, n),
              e.reportEvent(t, n);
          }),
          i.default.mixin({
            onShareAppMessage: function (e) {
              return {
                title: "百达翡丽时计查询",
                path: "/pages/index",
                imageUrl: void 0,
              };
            },
          });
        var v = t.getUpdateManager();
        v.onCheckForUpdate(function (e) {
          e.hasUpdate &&
            (v.onUpdateReady(function () {
              t.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                showCancel: !1,
                success: function (e) {
                  e.confirm && v.applyUpdate();
                },
              });
            }),
            v.onUpdateFailed(function () {
              t.showModal({
                title: "已经有新版本了哟~",
                content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开~",
              });
            }));
        });
        var g = new i.default(
          (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? m(Object(n), !0).forEach(function (t) {
                    (0, r.default)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : m(Object(n)).forEach(function (t) {
                    Object.defineProperty(
                      e,
                      t,
                      Object.getOwnPropertyDescriptor(n, t)
                    );
                  });
            }
            return e;
          })({ mpType: "app", store: p.default }, d.default)
        );
        a(g).$mount();
      }).call(
        this,
        n("3223")["default"],
        n("df3c")["default"],
        n("df3c")["createApp"]
      );
    },
    "94e2": function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("dce3");
      for (var o in a)
        ["default"].indexOf(o) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(o);
      n("5418");
      var r = n("828b"),
        u = Object(r["a"])(
          a["default"],
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
      t["default"] = u.exports;
    },
    ba37: function (e, t, n) {},
    dce3: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("fbde"),
        o = n.n(a);
      for (var r in a)
        ["default"].indexOf(r) < 0 &&
          (function (e) {
            n.d(t, e, function () {
              return a[e];
            });
          })(r);
      t["default"] = o.a;
    },
    fbde: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var a = {
        onLaunch: function (e) {
          console.log(e);
          var t = e.query.utm_source;
          t || (t = ""),
            this.$store.commit("UPDATE_UTM", {
              utm_source: decodeURIComponent(t),
            }),
            this.$tracking("enter_miniprogram", { start_page: e.path });
        },
      };
      t.default = a;
    },
  },
  [["6c16", "common/runtime", "common/vendor"]],
]);
