var t = require("@babel/runtime/helpers/slicedToArray"),
  e = require("@babel/runtime/helpers/regeneratorRuntime"),
  n = require("@babel/runtime/helpers/asyncToGenerator"),
  a = require("/utils/md5.js");
wx.cloud.init({ env: "xpjqsy-8gs9ggoi2cb1a7fd" });
var o,
  i = 0;
function r() {
  return (r = n(
    e().mark(function t(n) {
      return e().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                wx.getStorageSync("token") && "" != wx.getStorageSync("token")
                  ? n.getUser(function (t) {
                      n.checkGetSignCallback &&
                        (n.checkGetSignCallback(),
                        (n.checkGetSignCallback = !1));
                    })
                  : n.login({}, function (t) {
                      n.getUser(function (t) {
                        n.checkGetSignCallback &&
                          (n.checkGetSignCallback(),
                          (n.checkGetSignCallback = !1));
                      });
                    }),
                t.abrupt("return")
              );
            case 2:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
App({
  api: "https://api123.ddfans.com/zbapi/xcx_api.php",
  imgurl: "",
  name: "小葩去水印",
  apiurl: "https://apis.ddfans.com/bian/public/index.php/water",
  type: "0",
  images: [],
  appid: "wx0a3c92d1582f94b9",
  sign: "",
  ad_time: 3600,
  ad_jili: "adunit-a567626cbb9da4c8",
  moneyData: [],
  userinfo: "",
  investShow: !0,
  isInvest: !1,
  code_img: "https://apis.ddfans.com/bian/public/static/image/xpjqsy_code.jpg",
  payStatus: "",
  orderNo: "",
  invest_msg: "",
  downHost: "",
  showadappid: "",
  tmp: "wXGPoBL0fssX808qR26havGZlZE3efhqq5D9j_xZXDw",
  token_v: 1,
  parent_id: "",
  task: { share: { show: !1 } },
  _v: 0,
  onShow: function (t) {
    if (
      (wx.setKeepScreenOn({ keepScreenOn: !0 }),
      null != t && "" != t && null != t.referrerInfo && "" != t.referrerInfo)
    ) {
      var e = t.referrerInfo.extraData;
      e && ((this.payStatus = e.paySuccess), (this.orderNo = e.trade_order_id));
    }
  },
  onLaunch: function (t) {
    var e = this;
    console.log(t, "onLaunch"),
      t.query.parent_id
        ? (e.parent_id = t.query.parent_id)
        : t.query.scene && (e.parent_id = t.query.scene);
    var n = wx.getUpdateManager();
    n.onCheckForUpdate(function (t) {
      t.hasUpdate &&
        n.onUpdateReady(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function (t) {
              t.confirm && n.applyUpdate();
            },
          });
        });
    }),
      wx.setStorageSync("showVip", !1),
      (wx.getStorageSync("token_v") &&
        wx.getStorageSync("token_v") == e.token_v) ||
        wx.setStorageSync("token", null),
      wx.showLoading({ title: "加载中..." }),
      (function (t) {
        return r.apply(this, arguments);
      })(e).then(function (t) {}),
      wx.getStorageSync("city")
        ? (e.city = wx.getStorageSync("city"))
        : e.postData(e.apiurl + "/api/getCity", {}, function (t) {
            (e.city = t.data), wx.setStorageSync("city", t.data);
          });
  },
  login: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      e = arguments.length > 1 ? arguments[1] : void 0,
      n = this;
    wx.login({
      success: function (a) {
        (t.code = a.code),
          (t._v = n._v),
          n.parent_id && (t.parent_id = n.parent_id),
          n.postData(n.apiurl + "/user/onLogin", t, function (t) {
            wx.setStorageSync("token", t.data.token),
              wx.setStorageSync("token_v", n.token_v),
              "function" == typeof e && e(t.data);
          });
      },
    });
  },
  getSign:
    ((o = n(
      e().mark(function t(n) {
        var o, i, r, c;
        return e().wrap(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  if (((o = this), wx.getStorageSync("sign"))) {
                    t.next = 9;
                    break;
                  }
                  return (
                    (t.next = 4),
                    wx.cloud.callFunction({
                      name: "sign",
                      data: { name: "去水印" },
                    })
                  );
                case 4:
                  (i = t.sent),
                    (o.sign = i.result),
                    wx.setStorageSync("sign", i.result),
                    (t.next = 10);
                  break;
                case 9:
                  o.sign = wx.getStorageSync("sign");
                case 10:
                  for (c in ((r = ""), n)) "sign" != c && (r += n[c]);
                  return t.abrupt("return", a.hex_md5(o.utf8(r + o.sign)));
                case 13:
                case "end":
                  return t.stop();
              }
          },
          t,
          this
        );
      })
    )),
    function (t) {
      return o.apply(this, arguments);
    }),
  getAllListData: function (t, e, n) {
    wx.request({
      url: t,
      data: e,
      dataType: "json",
      method: "GET",
      success: function (t) {
        "function" == typeof n && n(t.data);
      },
    });
  },
  getUser: function (t) {
    var e = {},
      n = this;
    (e.token = wx.getStorageSync("token")),
      (e._v = n._v),
      n.postData(n.apiurl + "/user/onGetUser", e, function (e) {
        (n.userinfo = e.data),
          (n.isInvest =
            !(!wx.getStorageSync("invest") && !n.isInvest) || e.data.isInvest),
          "function" == typeof t && t(e.data);
      });
  },
  _pay: function (t) {
    this.postData(this.apiurl + "/user/onPay", {}, function (t) {
      "function" == typeof cb && cb(t);
    });
  },
  _payNew: function (t, e) {
    this.postData(this.apiurl + "/user/onPay", { money: t }, function (t) {
      "function" == typeof cb && cb(t);
    });
  },
  postData: function (t, e, n, a) {
    var o = this,
      r = JSON.parse(JSON.stringify(e));
    "" != o.city && (e.city = o.city),
      (e.len = wx.getStorageSync("history_link")
        ? wx.getStorageSync("history_link").length
        : 0),
      wx.getStorageSync("token") &&
        ((e.token = wx.getStorageSync("token")), (e._v = o._v)),
      wx.request({
        url: t,
        data: e,
        dataType: "json",
        timeout: 1e6,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        success: function (c) {
          "1" == c.data.code
            ? ("https://qsys.ddfans.com/water/public/index.php/index/index/getret" !=
                t &&
                -1 == t.indexOf("/user/onPay") &&
                wx.hideLoading(),
              (i = 0),
              "function" == typeof n && n(c.data))
            : "1024" == c.data.code && i < 2
            ? ((i += 1), o.postData(t, e, n, a))
            : "1023" == c.data.code
            ? i < 2
              ? ((i += 1),
                wx.setStorageSync("sign", null),
                o.getSign(r).then(function (e) {
                  (r.sign = e), o.postData(t, r, n, a);
                }))
              : ((i = 0),
                wx.showToast({
                  title: c.data.msg + ":" + c.data.code,
                  icon: "none",
                }),
                "function" == typeof a && a(c.data))
            : "1029" == c.data.code ||
              "1104" == c.data.code ||
              "1114" == c.data.code
            ? (wx.hideLoading(), "function" == typeof a && a(c.data))
            : c.data.msg
            ? (wx.hideLoading(),
              (i = 0),
              wx.showToast({ title: c.data.msg, icon: "none" }),
              "function" == typeof a && a(c.data))
            : (wx.hideLoading(),
              (i = 0),
              wx.showToast({
                title: "服务器异常:" + c.data.code,
                icon: "none",
              }),
              "function" == typeof a && a(c.data));
        },
        fail: function (t) {
          wx.hideLoading(),
            (i = 0),
            wx.showToast({ title: "服务器异常，稍后重试", icon: "none" }),
            "function" == typeof a && a(t.data);
        },
      });
  },
  isURL: function (t) {
    return !!new RegExp(
      "((https|http|ftp|rtsp|mms)?://)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\.[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)"
    ).test(t);
  },
  utf8: function (t) {
    for (var e = "", n = 0; n < t.length; n++) {
      var a = t.charCodeAt(n);
      a < 128
        ? (e += String.fromCharCode(a))
        : a < 2048
        ? ((e += String.fromCharCode((a >> 6) | 192)),
          (e += String.fromCharCode((63 & a) | 128)))
        : a < 65536
        ? ((e += String.fromCharCode((a >> 12) | 224)),
          (e += String.fromCharCode(((a >> 6) & 63) | 128)),
          (e += String.fromCharCode((63 & a) | 128)))
        : ((e += String.fromCharCode((a >> 18) | 240)),
          (e += String.fromCharCode(((a >> 12) & 63) | 128)),
          (e += String.fromCharCode(((a >> 6) & 63) | 128)),
          (e += String.fromCharCode((63 & a) | 128)));
    }
    return e;
  },
  addHistory: function (t) {
    console.log(t);
    for (
      var e = wx.getStorageSync("history_link")
          ? wx.getStorageSync("history_link")
          : [],
        n = new Date(),
        a = [],
        o = 0;
      o < e.length;
      o++
    )
      e[o].data != t && o < 29 && a.push(e[o]);
    a.unshift({
      data: t,
      time: n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate(),
    }),
      wx.setStorageSync("history_link", a);
  },
  base64src: function (e, n) {
    var a = wx.getFileSystemManager(),
      o = Date.parse(new Date()),
      i = /data:image\/(\w+);base64,(.*)/.exec(e) || [],
      r = t(i, 3),
      c = r[1],
      s = r[2];
    if (!c) return new Error("ERROR_BASE64SRC_PARSE");
    var u = "".concat(wx.env.USER_DATA_PATH, "/").concat(o, ".").concat(c),
      d = wx.base64ToArrayBuffer(s);
    a.writeFile({
      filePath: u,
      data: d,
      encoding: "binary",
      success: function () {
        n(u);
      },
      fail: function (t) {
        return console.log(t), new Error("ERROR_BASE64SRC_WRITE");
      },
    });
  },
  checkImg: function (t, e) {
    wx.showLoading({ title: "检测图片", mask: !0 }),
      wx.uploadFile({
        url: "https://api123.ddfans.com/zbapi/zbCheak.php",
        filePath: t,
        name: "content",
        formData: { type: "imgCheck" },
        success: function (t) {
          wx.hideLoading(),
            (t.data = JSON.parse(t.data)),
            "1" == t.data.code
              ? "function" == typeof e && e(t.data)
              : wx.showToast({
                  title: t.data.msg + ",请重新上传",
                  icon: "none",
                  mask: !0,
                });
        },
        fail: function (t) {
          wx.showToast({ title: "请求出错！", icon: "none", mask: !0 });
        },
      });
  },
  get24Time: function () {
    var t = Date.parse(new Date()),
      e = new Date(t),
      n =
        e.getFullYear() +
        "/" +
        (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) +
        "/" +
        (e.getDate() < 10 ? "0" + e.getDate() : e.getDate()) +
        " 23:59:59";
    return Date.parse(new Date(n)) / 1e3;
  },
});
