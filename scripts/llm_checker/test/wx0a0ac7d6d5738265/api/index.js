var e = require("../@babel/runtime/helpers/typeof"),
  o = require("../common/vendor.js");
require("../store/index.js");
var n = "https://www.lingzhuo.net.cn/hxy/yongtai/mini",
  t = !1,
  i = function (e) {
    t ||
      (20004 === e.data.code &&
        (console.log("Token expired, refreshing..."), (t = !0), c()));
  },
  c = function e() {
    o.index.login({
      provider: "weixin",
      success: function (i) {
        o.index.request({
          url: n + "/wx/code2token",
          data: { code: i.code },
          dataType: "json",
          method: "POST",
          header: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          success: function (e) {
            console.log("Success, new token obtained:", e.data.message);
            var n = e.data.data.token;
            (t = !1), o.index.setStorage({ key: "token", data: n });
          },
          fail: function (o) {
            console.log("Failed to get new token:", o),
              setTimeout(function () {
                e();
              }, 2e3);
          },
        });
      },
    });
  };
(exports.get = function (t, c) {
  var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    r = {
      Authorization: "Bearer " + o.index.getStorageSync("token"),
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  return new Promise(function (s, d) {
    o.index.request({
      url: n + t,
      method: "GET",
      header: r,
      data: c,
      timeout: 1e4,
      success: function (o) {
        if ((s(o), i(o), 2e4 !== o.data.code || "object" != e(o.data)))
          return (
            o.data && console.log(JSON.stringify(o.data)),
            console.log("res.data.code !== 20000，参数：", c),
            console.log("requestUrl", n + t),
            !1
          );
      },
      fail: function (e) {
        d(e);
      },
      complete: function () {
        a && o.index.hideLoading();
      },
    });
  }).catch(function (e) {
    console.log(e);
  });
}),
  (exports.post = function (t, c) {
    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      r = {
        Authorization: "Bearer " + o.index.getStorageSync("token"),
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
    return new Promise(function (s, d) {
      o.index.request({
        url: n + t,
        method: "POST",
        header: r,
        data: c,
        timeout: 1e4,
        success: function (o) {
          if ((s(o), i(o), 2e4 !== o.data.code || "object" != e(o.data)))
            return (
              o.data && console.log(JSON.stringify(o.data)),
              console.log("res.data.code !== 20000，参数：", c),
              console.log("requestUrl", n + t),
              !1
            );
        },
        fail: function (e) {
          d(e);
        },
        complete: function () {
          a && o.index.hideLoading();
        },
      });
    }).catch(function (e) {
      console.log(e);
    });
  });
