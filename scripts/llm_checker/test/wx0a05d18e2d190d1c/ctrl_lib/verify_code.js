function e(e) {
  return e && e.__esModule ? e : { default: e };
}
function t(e) {
  wx.setStorageSync("last_msg_id", e);
}
function n() {
  (c = 59),
    void 0 != a && a(c),
    (s = setTimeout(function () {
      o();
    }, 1e3));
}
function o() {
  c > 0 &&
    ((c -= 1),
    (s = setTimeout(function () {
      o();
    }, 1e3)),
    void 0 != a && a(c));
}
function i() {
  return wx.getStorageSync("key_51_appid");
}
var a,
  s,
  u = e(require("./NetWorkUtil.js")),
  c = (e(require("./UserOperate.js")), 59);
module.exports = {
  get_sms_code: function (e) {
    var o = { appId: i(), mobile: e };
    u.default.postRequestLoadingParams(
      "api/Sms/SendCaptcha",
      o,
      "发送中...",
      function (e, o) {
        t(e[0].smsId), n();
      },
      function (e, t) {
        wx.showModal({ content: t + e });
      }
    );
  },
  get_common_code: function (e) {
    var o = { appId: i(), mobile: e };
    u.default.postRequestLoadingParams(
      "api/Common/SendCaptcha",
      o,
      "发送中...",
      function (e, o) {
        t(e[0].smsId), n();
      },
      function (e, t) {
        wx.showModal({ content: t + e });
      }
    );
  },
  get_user_code: function (e) {
    var o = { appId: i(), mobile: e };
    u.default.postRequestLoadingParams(
      "api/User/SendCaptcha",
      o,
      "发送中...",
      function (e, o) {
        t(e[0].smsId), n();
      },
      function (e, t) {
        wx.showModal({ content: t + e });
      }
    );
  },
  on_verify_code_listener: function (e) {
    a = e;
  },
  on_release: function () {
    void 0 != s && clearTimeout(s);
  },
  get_msg_id: function () {
    return wx.getStorageSync("last_msg_id");
  },
  reset: function () {
    (c = 0), void 0 != a && a(c);
  },
};
