Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var e = require("../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../@babel/runtime/helpers/createClass"),
  n = "https://etwarjan.ouqila.cn/api/et/v1/",
  a = "https://yeltapan.ouqila.cn/api/yl/v1/",
  u = { _post: "Post", _get: "Get" },
  r = "_appInfo",
  o = { _success: 1, _error: 0 };
exports.default = (function () {
  return t(
    function t() {
      e(this, t), (this.baseUrl = n);
    },
    [
      {
        key: "getBaseUrl",
        value: function () {
          return n;
        },
      },
      {
        key: "getBaseUrl_",
        value: function () {
          return _baseUrl;
        },
      },
      {
        key: "getMethod",
        value: function () {
          return u;
        },
      },
      {
        key: "getOssImage",
        value: function () {
          return "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/public";
        },
      },
      {
        key: "getConstant",
        value: function () {
          return o;
        },
      },
      {
        key: "getBaseImageUrl",
        value: function () {
          return "https://etwarjan.ouqila.cn/";
        },
      },
      {
        key: "_getBaseImageUrl",
        value: function () {
          return "https://etwarjan.ouqila.cn/uploads/";
        },
      },
      {
        key: "_post",
        value: function (e, t, n) {
          var r =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
          t && ((t.host = "et"), (t.appId = this.getAppId())),
            wx.request({
              url: 0 == r ? this.getBaseUrl() + e : 1 == r ? a + e : "",
              data: t,
              method: u._post,
              success: function (e) {
                return "function" == typeof n && n(e.data);
              },
              fail: function (e) {
                return "function" == typeof n && n(!1);
              },
            });
        },
      },
      {
        key: "_get",
        value: function (e, t, n) {
          wx.request({
            url: this.getBaseUrl() + e,
            data: t,
            method: u._get,
            success: function (e) {
              return "function" == typeof n && n(e.data);
            },
            fail: function (e) {
              return !1;
            },
          });
        },
      },
      {
        key: "_upload",
        value: function (e, t, n, a) {
          var u =
            arguments.length > 4 && void 0 !== arguments[4]
              ? arguments[4]
              : "source";
          wx.uploadFile({
            url: this.getBaseUrl() + e,
            filePath: n,
            name: u,
            formData: t,
            header: { "Content-Type": "multipart/form-data" },
            success: function (e) {
              var t = !1;
              try {
                t = JSON.parse(e.data);
              } catch (e) {
                t = !1;
              }
              return "function" == typeof a && a(t);
            },
            fail: function (e) {
              return "function" == typeof a && a(!1);
            },
          });
        },
      },
      {
        key: "_getData",
        value: function (e) {
          return e && e.resultCode == o._success
            ? e.resultData
            : (e && e.resultCode, !1);
        },
      },
      {
        key: "getLogUrl",
        value: function () {
          return "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/logo/etewar_logo_.png";
        },
      },
      {
        key: "getAppInfo",
        value: function () {
          var e = wx.getStorageSync(this[r]);
          return "undefined" === e || "" === e ? e : wx.getAccountInfoSync();
        },
      },
      {
        key: "getAppId",
        value: function () {
          var e = this.getAppInfo();
          return e && e.miniProgram ? e.miniProgram.appId : null;
        },
      },
    ]
  );
})();
