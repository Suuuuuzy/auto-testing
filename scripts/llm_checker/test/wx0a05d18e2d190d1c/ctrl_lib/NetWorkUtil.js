function e(e, n, l, u, a, c, i) {
  null != a && a.length > 0 && wx.showLoading({ title: a }),
    console.log("=============  NetWork Request Start  =============");
  var g = wx.getStorageSync("key_51_host");
  if (void 0 != g && "" != g) {
    console.log(g + e);
    var r = o(
      {
        "content-type": "application/json",
        Authorization:
          wx.getStorageSync("token_type") +
          " " +
          wx.getStorageSync("access_token"),
      },
      l
    );
    console.log("---------- Request Header ----------"),
      console.log(r),
      console.log("---------- Request Params ----------"),
      console.log(u),
      console.log("【end】------- Request -------【end】"),
      wx.request({
        url: g + e,
        method: null == n ? "POST" : n,
        dataType: "json",
        data: null == u ? {} : u,
        header: r,
        success: function (o) {
          if (
            (console.log(
              "【start】----- Request NetWork Success -----【start】"
            ),
            console.log("URL => " + g + e),
            console.log(o.data),
            console.log(
              "【end】------- Request NetWork Success -------【end】"
            ),
            null != a && a.length > 0 && wx.hideLoading(),
            200 == o.statusCode)
          ) {
            var n = o.data,
              l = n.errcode;
            if (
              (console.log("【_data】" + JSON.stringify(n.result) + l), 0 == l)
            ) {
              console.log("success:0");
              try {
                console.log("success:1"), c(n.result, n.message);
              } catch (e) {
                console.log("success:2"), c([], n.message);
              }
            } else i(l, n.message);
          } else
            401 == o.statusCode
              ? (void 0 != t && t("登录失效", 401), s.default.setLogin(!1))
              : i(o.statusCode, o.data.message);
        },
        fail: function (o) {
          console.log("【start】----- Request NetWork Fail -----【start】"),
            console.log("URL => " + g + e),
            console.log(o),
            console.log("【end】------- Request NetWork Fail -------【end】"),
            wx.hideLoading(),
            i(o);
        },
        complete: function (e) {
          console.log("=============  NetWork Request End  =============");
        },
      });
  } else console.log("未配置51车辆服务器主机，请联系51车联开发");
}
function o(e, o) {
  var t = {};
  for (var s in e) t[s] = e[s];
  for (var s in o) t[s] = o[s];
  return t;
}
var t,
  s = (function (e) {
    return e && e.__esModule ? e : { default: e };
  })(require("./UserOperate.js"));
module.exports = {
  postRequestBase: function (o, t, s) {
    e(o, "POST", null, null, null, t, s);
  },
  postRequestLoadingBase: function (o, t, s, n) {
    e(o, "POST", null, null, t, s, n);
  },
  postRequestParams: function (o, t, s, n) {
    e(o, "POST", null, t, null, s, n);
  },
  postRequestLoadingParams: function (o, t, s, n, l) {
    e(o, "POST", null, t, s, n, l);
  },
  postRequestHeader: function (o, t, s, n) {
    e(o, "POST", t, null, null, s, n);
  },
  postRequestLoadingHeader: function (o, t, s, n, l) {
    e(o, "POST", t, null, s, n, l);
  },
  postRequest: function (o, t, s, n, l) {
    e(o, "POST", t, s, null, n, l);
  },
  postRequestLoading: function (o, t, s, n, l, u) {
    e(o, "POST", t, s, n, l, u);
  },
  getRequestBase: function (o, t, s) {
    e(o, "GET", null, null, null, t, s);
  },
  getRequestLoadingBase: function (o, t, s, n) {
    e(o, "GET", null, null, t, s, n);
  },
  getRequestParams: function (o, t, s, n) {
    e(o, "GET", null, t, null, s, n);
  },
  getRequestLoadingParams: function (o, t, s, n, l) {
    e(o, "GET", null, t, s, n, l);
  },
  getRequestHeader: function (o, t, s, n) {
    e(o, "GET", t, null, null, s, n);
  },
  getRequestLoadingHeader: function (o, t, s, n, l) {
    e(o, "GET", t, null, s, n, l);
  },
  getRequest: function (o, t, s, n, l) {
    e(o, "GET", t, s, null, n, l);
  },
  getRequestLoading: function (o, t, s, n, l, u) {
    e(o, "GET", t, s, n, l, u);
  },
  requestNetWork: e,
  uploadFile: function (e, n, l, u) {
    var a = wx.getStorageSync("key_51_host");
    if (void 0 != a && "" != a) {
      wx.showLoading({ title: "上传中..." });
      var c = o(
        {
          "content-type": "multipart/form-data",
          Authorization:
            wx.getStorageSync("token_type") +
            " " +
            wx.getStorageSync("access_token"),
        },
        null
      );
      wx.uploadFile({
        url: a + e,
        filePath: n,
        header: c,
        name: "file",
        formData: { user: "test" },
        success: function (e) {
          if ((console.log(e.data), wx.hideLoading(), 200 == e.statusCode)) {
            var o = JSON.parse(e.data),
              n = o.errcode;
            if (
              (console.log("【_data】" + JSON.stringify(o.result) + n),
              console.log(o.result),
              console.log(n),
              0 == n)
            ) {
              console.log("success:0");
              try {
                console.log("success:1"), l(o.result, o.message);
              } catch (e) {
                console.log("success:2"), l([], o.message);
              }
            } else u(n, o.message);
          } else
            401 == e.statusCode
              ? (wx.showToast({
                  title: "登录失效",
                  icon: "loading",
                  duration: 2e3,
                }),
                s.default.setLogin(!0),
                void 0 != t && t("登录失效", 401))
              : u(e.statusCode, e.data.message);
        },
        fail: function (o) {
          console.log("【start】----- Request NetWork Fail -----【start】"),
            console.log("URL => " + a + e),
            console.log(o),
            console.log("【end】------- Request NetWork Fail -------【end】"),
            wx.hideLoading(),
            u(o);
        },
        complete: function (e) {
          console.log("=============  NetWork Request End  =============");
        },
      });
    } else console.log("未配置51车辆服务器主机，请联系51车联开发");
  },
  set_onlogin_invalid_listener: function (e) {
    t = e;
  },
};
