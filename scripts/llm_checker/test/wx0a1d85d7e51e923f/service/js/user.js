Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e,
  t = require("../../@babel/runtime/helpers/classCallCheck"),
  n = require("../../@babel/runtime/helpers/createClass"),
  o =
    (e = require("../../service/http/request.js")) && e.__esModule
      ? e
      : { default: e };
getApp();
var r,
  u = Symbol("token"),
  i = Symbol("id");
exports.default = (function () {
  return n(
    function e() {
      t(this, e),
        (r = new o.default()),
        (this[u] = "m_token"),
        (this[i] = "u_id");
    },
    [
      {
        key: "pLogin",
        value: function () {
          var e = this,
            t = this;
          return new Promise(function (n) {
            e.getToken()
              ? n(!0)
              : wx.login({
                  success: function (e) {
                    r._post("user/_register", { code: e.code }, function (e) {
                      if (e) {
                        var o = r._getData(e);
                        if (o)
                          return t.setToken(o.token), t.setId(o.id), void n(!0);
                      }
                      n(!1);
                    });
                  },
                  fail: function (e) {
                    n(!1);
                  },
                });
          });
        },
      },
      {
        key: "callLogin",
        value: function (e) {
          var t = this;
          try {
            wx.login({
              success: function (n) {
                r._post("user/_register", { code: n.code }, function (n) {
                  if (n) {
                    var o = r._getData(n);
                    return o
                      ? (t.setToken(o.token),
                        t.setId(o.id),
                        "function" == typeof e ? e(o.token) : null)
                      : "function" == typeof e
                      ? e(!1)
                      : null;
                  }
                  return "function" == typeof e ? e(!1) : null;
                });
              },
              fail: function (t) {
                return "function" == typeof e ? e(!1) : null;
              },
            });
          } catch (t) {
            return "function" == typeof e ? e(!1) : null;
          }
        },
      },
      {
        key: "login",
        value: function (e, t) {
          var n = this;
          t || (t = { i: 0 }),
            this.getToken()
              ? r._post("user/login", { token: this.getToken() }, function (o) {
                  var u = r._getData(o);
                  if (u)
                    return (
                      n.setToken(u.token),
                      n.setId(u.id),
                      "function" == typeof e && e(u)
                    );
                  var i = t.i;
                  if ((n.removeToken(), i >= 2))
                    return "function" == typeof e && e(!1);
                  i++, (t.i = i), n.login(e, t);
                })
              : (console.log("register"),
                wx.login({
                  success: function (t) {
                    console.log("register --\x3e>", t),
                      r._post("user/_register", { code: t.code }, function (t) {
                        var o = r._getData(t);
                        return o
                          ? (n.setToken(o.token),
                            n.setId(o.id),
                            "function" == typeof e && e(o))
                          : "function" == typeof e && e(!1);
                      });
                  },
                  fail: function (t) {
                    return "function" == typeof e && e(!1);
                  },
                }));
        },
      },
      {
        key: "setToken",
        value: function (e) {
          e && wx.setStorageSync(this[u], e);
        },
      },
      {
        key: "getToken",
        value: function () {
          return wx.getStorageSync(this[u]);
        },
      },
      {
        key: "setId",
        value: function (e) {
          e && wx.setStorageSync(this[i], e);
        },
      },
      {
        key: "getId",
        value: function () {
          return wx.getStorageSync(this[i]);
        },
      },
      {
        key: "removeToken",
        value: function () {
          wx.removeStorageSync(this[u]);
        },
      },
      {
        key: "getUserInfo",
        value: function (e, t) {
          if (
            (console.log("userInfo e --\x3e>", e),
            e && "getUserInfo:ok" == e.detail.errMsg)
          ) {
            e.detail.userInfo;
            "function" == typeof t && t(e.detail.userInfo);
          } else "function" == typeof t && t(!1);
        },
      },
      {
        key: "_getUserInfo",
        value: function (e) {
          wx.getSetting({
            success: function (t) {
              if (!t.authSetting["scope.userInfo"])
                return "function" == typeof e ? e(!1) : "";
              wx.getUserInfo({
                success: function (t) {
                  t.userInfo;
                  return "function" == typeof e ? e(t.userInfo) : "";
                },
              });
            },
          });
        },
      },
      {
        key: "getUserProfile",
        value: function (e, t) {
          var n = this;
          wx.getUserProfile({
            desc: "用于完善会员资料",
            success: function (e) {
              console.log("userInfo ---\x3e>", e);
              var o = e.userInfo;
              return (
                r._post(
                  "user/setUserInfo",
                  {
                    token: n.getToken(),
                    nickName: o.nickName,
                    avatarUrl: o.avatarUrl,
                  },
                  function (e) {}
                ),
                "function" == typeof t ? t(e.userInfo) : ""
              );
            },
            fail: function (e) {
              return "function" == typeof t ? t(!1) : "";
            },
          });
        },
      },
      {
        key: "setForm",
        value: function (e) {
          e &&
            r._post(
              "setForm",
              { token: this.getToken(), formId: e },
              function (e) {}
            );
        },
      },
    ]
  );
})();
