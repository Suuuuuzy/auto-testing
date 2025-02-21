var _global = require("../../utils/global");
var app = getApp();
var getuserInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //跳转链接
    url: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var that = this;
    // 解码跳转链接
    var webViewUrl = decodeURIComponent(options.q || options.url);
    // 调用http转https协议函数
    webViewUrl = that.changeProtocol(webViewUrl);
    //更新用户实名认证信息
    getuserInfo = app.globalData.userInfo;

    //如果用户必须实名认证，判断用户是否认证，realName为实名认证标识
    if (options.realName == true || options.realName == "true") {
      // 未登录
      if (!app.globalData.userInfoFlag) {
        //显示加载标志
        app.selfShowLoading("登录中");
        // 调用登录接口
        app
          .getUserInfo(_global.getTicket)
          .then(function () {
            getuserInfo = app.globalData.userInfo;
            //清除加载标志
            wx.hideLoading();
            // 用户未实名
            if (!app.isUserVerify()) {
              //获取到用户未实名,调用跳转实名认证页面函数
              that.gotoVerify(
                encodeURIComponent("../webView/webView?url=" + webViewUrl)
              );
            } else {
              // 用户已实名，调用跳转下个页面函数
              that.gotoNext(that, webViewUrl, getuserInfo);
            }
          })
          .catch(function () {
            //清除加载标志
            wx.hideLoading();
            // 进行提示
            app.simpleShowModal("登录失败");
          });
      } else if (!app.isUserVerify()) {
        // 已登录但用户未实名,调用跳转实名认证页面函数
        that.gotoVerify("../webView/webView?url=" + webViewUrl);
      } else {
        // 已登录且实名，调用跳转下个页面函数
        that.gotoNext(that, webViewUrl, getuserInfo);
      }
    } else {
      // 非扫码进入
      // 调用跳转下个页面函数
      that.gotoNext(that, webViewUrl, getuserInfo);
    }
  },
  // 封装跳转下一页面函数
  gotoNext: function gotoNext(that, decodeUri, getuserInfo) {
    // 判断链接是否带参数
    var approvalId = app.globalData.userinfo.id
      ? app.globalData.userinfo.id
      : "";
    var openIdAnd = approvalId.length > 0 ? "&openId=".concat(approvalId) : "";
    var jonner = decodeUri.indexOf("?") >= 0 ? "&" : "?";
    var url =
      decodeUri +
      jonner +
      "userId=" +
      (getuserInfo.id ? getuserInfo.id : "") +
      "&time=" +
      new Date().getTime() +
      openIdAnd;
    console.log("当前进入url:", url);
    // 设置跳转链接
    that.setData({
      url: url,
    });
  },
  //自定义函数
  /**
   * 跳转实名认证页面
   */
  gotoVerify: function gotoVerify(url) {
    var gotoUrl = url ? url : "";
    app.simpleShowModal(
      "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
      function (res) {
        if (res.confirm) {
          //跳转实名认证界面
          wx.navigateTo({
            url:
              "../userCenter_verified/userCenter_preVerify?gotoUrl=" + gotoUrl,
          });
        }
      }
    );
  },
  /**
   * http协议转https
   */
  changeProtocol: function changeProtocol(url) {
    var result = url;
    // 判断是否https协议,不是则替换
    if (url.indexOf("https") == -1) result = url.replace(/http/, "https");
    // 返回结果值
    return result;
  },
});
