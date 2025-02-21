var app = getApp(),
  path2 = app.globalData.path2;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //回调链接
    url: "",
    //认证用户信息
    userInfo: null,
    //认证成功标志
    verifyFlag: false,
    //错误信息
    msg: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var url = decodeURIComponent(options.url),
      userInfo = JSON.parse(options.userInfo);
    // console.log('url', url)
    // console.log('userInfo', userInfo)
    this.setData({
      url: url,
      userInfo: userInfo,
    });
  },
  /**
   * 监听 开始刷脸 点击事件
   */
  bindfaceVerifyTap: function bindfaceVerifyTap() {
    var that = this;
    //检查是否支持人脸检测
    wx.checkIsSupportFacialRecognition({
      checkAliveType: 2,
      success: function success() {
        //请求进行基于生物识别的人脸核身
        that
          .setFacialRecognitionVerify()
          .then(function () {
            //请求成功,更新成功标志
            that.setData({
              verifyFlag: true,
            });
            //调用返回原链接函数
            that.returnBack();
          })
          .catch(function (error) {
            //存储错误信息
            that.setData({
              msg: error.errMsg,
            });
            //调用返回原页面函数
            that.returnBack();
          });
      },
      fail: function fail(error) {
        //调用解析错误码函数
        var msg = that.dealErrCode(error.errCode);
        //存储错误信息
        that.setData({
          msg: msg,
        });
        //调用返回原页面函数
        that.returnBack();
      },
    });
  },
  /**
   * 处理 是否支持人脸检测接口 错误代码
   */
  dealErrCode: function dealErrCode(errCode) {
    var msg = "";
    switch (errCode) {
      case 10001:
        msg = "不支持人脸采集:设备没有前置摄像头";
        break;
      case 10002:
        msg = "不支持人脸采集:没有下载到必要模型";
        break;
      case 10003:
        msg = "不支持人脸采集:后台控制不支持";
        break;
      default:
        msg = "该设备不支持人脸采集";
        break;
    }
    return msg;
  },
  /**
   * 封装人脸识别函数
   */
  setFacialRecognitionVerify: function setFacialRecognitionVerify() {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.startFacialRecognitionVerify({
        name: that.data.userInfo.realName,
        idCardNumber: that.data.userInfo.certificateNumber,
        checkAliveType: 2,
        //先检查是否可以屏幕闪烁，不可以则自动为读数字
        success: function success(res) {
          console.log(res);
          if (res.errCode == 0) {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail: function fail(error) {
          reject(error);
        },
      });
    });
  },
  /**
   * 返回原页面
   */
  returnBack: function returnBack() {
    if (this.data.url.indexOf("http") !== -1) {
      //设置链接的传参数，并进行编码
      var setUrl = encodeURIComponent(
        this.data.url +
          "?userInfo=" +
          JSON.stringify(this.data.userInfo) +
          "&verifyFlag=" +
          this.data.verifyFlag +
          "&msg=" +
          this.data.msg
      );
      wx.navigateTo({
        url: "../webView/webView?url=" + setUrl,
      });
    } else {
      var join = this.data.url.indexOf("?") === -1 ? "?" : "&";
      var naviUrl =
        this.data.url +
        join +
        "verifyFlag=" +
        JSON.stringify(this.data.verifyFlag) +
        "&msg=" +
        this.data.msg;
      wx.navigateTo({
        url: naviUrl,
      });
    }
  },
});
