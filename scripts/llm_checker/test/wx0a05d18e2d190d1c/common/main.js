(global.webpackJsonp = global.webpackJsonp || []).push([
  ["common/main"],
  {
    "3b03": function (t, e, o) {},
    "755f": function (t, e, o) {
      (function (t) {
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function n(t, e) {
          var o = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              o.push.apply(o, n);
          }
          return o;
        }
        function i(t, e, o) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: o,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = o),
            t
          );
        }
        o("f567");
        var r = e(o("66fd")),
          a = e(o("ac5f"));
        o("b97c");
        var c = e(o("8298"));
        (r.default.config.productionTip = !1),
          (a.default.mpType = "app"),
          (r.default.prototype.$device_ctrl_gps = 1),
          (r.default.prototype.$device_locator_gps = 2),
          (r.default.prototype.$device_ctrl_ble = 3),
          (r.default.prototype.$device_ctrl_key = 4),
          (r.default.prototype.$device_door_gps = 5),
          (r.default.prototype.$operate_edit = 100),
          (r.default.prototype.$operate_add = 101),
          (r.default.prototype.$api51 = requirePlugin("plugin_51car")),
          (r.default.prototype.$api_host = "https://sjkcwxapp.51carlink.com/"),
          (r.default.prototype.$app_id =
            "cb0c81b8-5a23-466b-8b81-ab8700f7f7c1"),
          (r.default.prototype.$app_version = "1.0.0"),
          r.default.mixin(c.default),
          t(
            new r.default(
              (function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var o = null != arguments[e] ? arguments[e] : {};
                  e % 2
                    ? n(Object(o), !0).forEach(function (e) {
                        i(t, e, o[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(o)
                      )
                    : n(Object(o)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(o, e)
                        );
                      });
                }
                return t;
              })({}, a.default)
            )
          ).$mount();
      }).call(this, o("543d").createApp);
    },
    ac5f: function (t, e, o) {
      o.r(e);
      var n = o("b5ae");
      for (var i in n)
        "default" !== i &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(i);
      o("c5cd");
      var r = o("f0c5"),
        a = Object(r.a)(
          n.default,
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
      e.default = a.exports;
    },
    b5ae: function (t, e, o) {
      o.r(e);
      var n = o("e416"),
        i = o.n(n);
      for (var r in n)
        "default" !== r &&
          (function (t) {
            o.d(e, t, function () {
              return n[t];
            });
          })(r);
      e.default = i.a;
    },
    c5cd: function (t, e, o) {
      var n = o("3b03");
      o.n(n).a;
    },
    e416: function (t, e, o) {
      (function (t) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = (function (t) {
            return t && t.__esModule ? t : { default: t };
          })(o("66fd")),
          i = "APP",
          r = {
            onLaunch: function () {
              var e = this;
              t.getSystemInfo({
                success: function (t) {
                  (e.height_rpx = t.windowHeight),
                    (e.width_rpx = t.windowWidth),
                    e.init_custom_bar(t);
                },
              }),
                console.log(i + "onLaunch"),
                this.$api51.api51_init(this.$api_host, this.$app_id),
                this.$api51.set_on_current_car_change_listener(function (e) {
                  console.log("当前车辆变化:" + JSON.stringify(e)),
                    t.setStorageSync("current_car", JSON.stringify(e));
                }),
                this.$api51.set_on_empty_car_listener(function () {
                  e.show_bind_notice("您还没有添加任何车辆", "添加");
                }),
                this.$api51.set_on_unbind_gps_listener(function (t) {
                  console.log("当前车辆发生变化:"),
                    e.show_bind_notice("您还没有绑定手机控车模组", "绑定");
                });
              var o = !1;
              this.$api51.api51_onlogin_invalid_listener(function () {
                o ||
                  ((o = !0),
                  t.showModal({
                    title: "提示",
                    content: "登录失效",
                    cancelText: "取消",
                    confirmText: "登录",
                    complete: function (e) {
                      e.confirm
                        ? ((o = !1),
                          t.navigateTo({ url: "/pages/login/login" }))
                        : (o = !1);
                    },
                  })),
                  console.log("登录失效.....");
              });
            },
            globalData: { userInfo: null, version: "wx 1.1.15" },
            onShow: function () {
              console.log(i + "onShow");
            },
            onHide: function () {
              console.log(i + "onHide");
            },
            methods: {
              show_bind_notice: function (e, o) {
                t.showModal({
                  title: "提示",
                  content: e,
                  showCancel: !0,
                  cancelText: "取消",
                  cancelColor: "#000000",
                  confirmText: o,
                  confirmColor: "#3CC51F",
                  success: function (e) {
                    e.confirm &&
                      t.navigateTo({
                        url: "/pages/car_manage/car_manage",
                        fail: function (t) {
                          console.log("fail:" + JSON.stringify(t));
                        },
                      });
                  },
                });
              },
              init_custom_bar: function (t) {
                n.default.prototype.StatusBar = t.statusBarHeight;
                var e = wx.getMenuButtonBoundingClientRect();
                (n.default.prototype.Custom = e),
                  (n.default.prototype.CustomBar =
                    e.bottom + e.top - t.statusBarHeight),
                  (n.default.prototype.BodyH =
                    t.windowHeight - n.default.prototype.CustomBar),
                  (n.default.prototype.IOS = "IOS" == t.platform.toUpperCase()),
                  (n.default.prototype.maxH = t.windowHeight),
                  (n.default.prototype.maxW = t.windowWidth),
                  console.log(
                    "CustomBar>>>>>>>>>>>>" + n.default.prototype.CustomBar
                  ),
                  console.log(
                    "windowH*W >>>>>>" +
                      t.windowHeight +
                      " * " +
                      t.windowWidth +
                      " bodyH:" +
                      n.default.prototype.BodyH +
                      " screenH:" +
                      t.screenHeight
                  );
              },
            },
          };
        e.default = r;
      }).call(this, o("543d").default);
    },
  },
  [["755f", "common/runtime", "common/vendor"]],
]);
