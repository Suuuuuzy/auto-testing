var _regeneratorRuntime2 = require("../../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../../@babel/runtime/helpers/asyncToGenerator");
var _global = require("../../utils/global");
var app = getApp(),
  path2 = app.globalData.path2;
Page({
  data: {
    //authCode
    authCode: "",
    //用户姓名
    userName: "",
    //用户身份证号
    idCard: "",
    // 实名完成跳转链接
    gotoUrl: "",
  },
  /**
   * 监听 开始刷脸 点击事件
   */
  bindfaceVerifyTap: function bindfaceVerifyTap() {
    var that = this;
    //检查是否支持人脸检测
    wx.checkIsSupportFacialRecognition({
      checkAliveType: 2,
      success: function success(res) {
        //请求进行基于生物识别的人脸核身
        that
          .setFacialRecognitionVerify()
          .then(function (res) {
            //请求成功
            that.requestVerify(res.errCode);
          })
          .catch(function () {});
      },
      fail: function fail(error) {
        var errCode = error.errCode;
        switch (errCode) {
          case 10001:
            app.selfShowModal("不支持人脸采集:设备没有前置摄像头");
            break;
          case 10002:
            app.selfShowModal("不支持人脸采集:没有下载到必要模型");
            break;
          case 10003:
            app.selfShowModal("不支持人脸采集:后台控制不支持");
            break;
          default:
            app.selfShowModal("该设备不支持人脸采集");
            break;
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var getAuthcode = options.authCode;
    this.setData({
      authCode: getAuthcode,
      userName: options.userName,
      idCard: options.idCard,
      gotoUrl: options.gotoUrl,
    });
  },
  /**
   * 自定义事件
   */
  /**
   * 封装调用实名认证校验接口
   * @param {Object} errCode
   */
  requestVerify: (function () {
    var _requestVerify = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee(errCode) {
        var that, authCode, verifyUrl, res;
        return _regeneratorRuntime2().wrap(
          function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  wx.showLoading({
                    title: "绑定中...",
                    mask: true,
                  });
                  that = this;
                  (authCode = that.data.authCode),
                    (verifyUrl =
                      path2 +
                      "/api/certification/verifyWeChat?code=" +
                      authCode +
                      "&errorCode=" +
                      errCode);
                  _context.next = 5;
                  return (0, _global.getTicket)("QUERY", {
                    code: authCode,
                    errorCode: errCode,
                  });
                case 5:
                  res = _context.sent;
                  wx.request({
                    url: verifyUrl,
                    method: "POST",
                    header: {
                      ticket: res.data.ticket,
                    },
                    success: function success(res) {
                      //认证出错
                      if (res.statusCode > 300) {
                        app.selfShowModal(res.data.message);
                        return;
                      }
                      //重新赋值用户信息
                      app.globalData.userInfo = res.data;
                      //调用绑定微信用户信息接口函数
                      that
                        .requestBindWeChatUser(res.data.id)
                        .then(function () {
                          wx.hideLoading();
                          wx.showToast({
                            title: "认证成功！",
                            complete: function complete() {
                              // 有下一跳转链接
                              if (
                                that.data.gotoUrl &&
                                that.data.gotoUrl != "undefined"
                              ) {
                                var origin = decodeURIComponent(
                                    that.data.gotoUrl
                                  ),
                                  suffix = origin.split("url=")[1],
                                  // 后缀
                                  prefix = origin.split(suffix)[0]; //前缀

                                if (prefix.indexOf("http") !== -1) {
                                  prefix =
                                    "/pages/webView/webView?url=" +
                                    encodeURIComponent(prefix);
                                }
                                wx.navigateTo({
                                  url: suffix
                                    ? prefix + encodeURIComponent(suffix)
                                    : prefix,
                                });
                              } else {
                                //返回应用中心
                                wx.navigateBack({
                                  delta: 2,
                                });
                              }
                            },
                          }); /* end showToast */
                        })
                        .catch(function () {
                          wx.hideLoading();
                          // 有下一跳转链接
                          if (
                            that.data.gotoUrl &&
                            that.data.gotoUrl != "undefined"
                          ) {
                            var origin = decodeURIComponent(that.data.gotoUrl),
                              suffix = origin.split("url=")[1],
                              // 后缀
                              prefix = origin.split(suffix)[0]; //前缀
                            wx.navigateTo({
                              url: suffix
                                ? prefix + encodeURIComponent(suffix)
                                : prefix,
                            });
                          } else {
                            //返回应用中心
                            wx.navigateBack({
                              delta: 2,
                            });
                          }
                        }); /* end requestBindWeChatUser*/
                    },
                    /* end success */ fail: function fail() {
                      wx.hideLoading();
                      //verify接口fail
                      app.selfShowModal("认证接口出错，请重试");
                    },
                  });
                case 7:
                case "end":
                  return _context.stop();
              }
          },
          _callee,
          this
        );
      })
    );
    function requestVerify(_x) {
      return _requestVerify.apply(this, arguments);
    }
    return requestVerify;
  })(),
  /**
   * 封装绑定微信用户信息接口
   * @param {Object} userid：用户id
   */
  requestBindWeChatUser: function requestBindWeChatUser(userid) {
    return new Promise(function (resolve, reject) {
      //获取code
      wx.login({
        success: function success(res) {
          return _asyncToGenerator2(
            /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee2() {
              var a, bindWeChatUserUrl;
              return _regeneratorRuntime2().wrap(function _callee2$(_context2) {
                while (1)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      if (!res.code) {
                        _context2.next = 6;
                        break;
                      }
                      _context2.next = 3;
                      return (0, _global.getTicket)("QUERY", {
                        userId: userid,
                        code: res.code,
                      });
                    case 3:
                      a = _context2.sent;
                      bindWeChatUserUrl =
                        path2 +
                        "/api/weChat/bindWeChatUser?userId=" +
                        userid +
                        "&code=" +
                        res.code;
                      app
                        .requestUrl(
                          bindWeChatUserUrl,
                          "",
                          "POST",
                          a.data.ticket
                        )
                        .then(function (res) {
                          if (res.statusCode > 300) {
                            app.selfShowModal(res.data.error);
                            reject();
                            return;
                          } else {
                            resolve();
                          }
                        })
                        .catch(function () {
                          app.selfShowModal("绑定微信用户失败，请联系管理员");
                          reject();
                        });
                    case 6:
                    case "end":
                      return _context2.stop();
                  }
              }, _callee2);
            })
          )();
        },
        fail: function fail() {
          //wx.login失败
          that.selfShowToast("获取code失败");
          reject();
        },
      });
    });
  },
  /**
   * 处理人脸核身错误代码
   */
  dealErrCode: function dealErrCode(errCode) {
    var that = this;
    switch (errCode) {
      case 0:
        app.selfShowModal("识别成功");
        break;
      case 10001:
        app.selfShowModal("参数错误");
        break;
      case 10002:
        app.selfShowModal("人脸特征检测失败");
        break;
      case 10003:
        app.selfShowModal("身份证号不匹配");
        break;
      case 10004:
        app.selfShowModal("公安比对人脸信息不匹配");
        break;
      case 10005:
        app.selfShowModal("正在检测中");
        break;
      case 10006:
        app.selfShowModal("appid 没有权限（后台验证部分）");
        break;
      case 10007:
        app.selfShowModal("后台获取图片失败");
        break;
      case 10008:
        app.selfShowModal("公安系统失败");
        break;
      case 10009:
        app.selfShowModal("公安未查到身份证照片比对源");
        break;
      case 10010:
        app.selfShowModal("照片质量不满足公安比对要求");
        break;
      case 10011:
        app.selfShowModal("身份证信息未开通公安比对权限");
        break;
      case 10012:
        app.selfShowModal("征信验证失败");
        break;
      case 10013:
        app.selfShowModal("征信系统错误");
        break;
      case 10014:
        app.selfShowModal("公安系统失败，征信系统成功");
        break;
      case 10015:
        app.selfShowModal("公安服务暂时不可用");
        break;
      case 10016:
        app.selfShowModal("存储用户图片失败");
        break;
      case 10017:
        app.selfShowModal("非法 identify_id");
        break;
      case 10018:
        app.selfShowModal("用户信息不存在");
        break;
      case 10020:
        app.selfShowModal("认证超时");
        break;
      case 10021:
        app.selfShowModal("重复的请求，返回上一次的结果");
        break;
      case 10022:
        app.selfShowModal("用户信息错误，请检测 json 格式");
        break;
      case 10026:
        app.selfShowModal("用户身份证数据不在公安比对数据库中");
        break;
      case 10027:
        app.selfShowModal("语音识别失败");
        break;
      case 10028:
        app.selfShowModal("唇动检测失败");
        break;
      case 10029:
        app.selfShowModal("微警超时");
        break;
      case 10030:
        app.selfShowModal("绑定身份证失败");
        break;
      case 10031:
        app.selfShowModal("没有申请征信商户号或公众号/小程序没有设置昵称");
        break;
      case 10032:
        app.selfShowModal("用户身份证数据不再征信数据库中");
        break;
      case 10040:
        app.selfShowModal("请求数据编码不对，必须是 UTF8 编码");
        break;
      case 10041:
        app.selfShowModal("非法 user_id_key");
        break;
      case 10042:
        app.selfShowModal("请求过于频繁，稍后再重试");
        break;
      case 10045:
        app.selfShowModal("系统失败");
        break;
      case 10052:
        app.selfShowModal("请求数超时征信的限制");
        break;
      case 10057:
        app.selfShowModal("检测过程中人脸主体不一致");
        break;
      case 10066:
        app.selfShowModal("人脸流水号 bioid 重复");
        break;
      case 10069:
        app.selfShowModal("活体检测暂时不可用");
        break;
      case 90100:
        app.selfShowModal("用户取消");
        break;
      case 90101:
        app.selfShowModal("用户未授权");
        break;
      case 90102:
        app.selfShowModal("底层库出错");
        break;
      case 90103:
        app.selfShowModal("CDN上传出错");
        break;
      case 90104:
        app.selfShowModal("获取配置信息出错");
        break;
      case 90105:
        app.selfShowModal("获取确认页信息失败");
        break;
      case 90106:
        app.selfShowModal("相机初始化失败");
        break;
      case 90107:
        app.selfShowModal("用户采集人脸超时");
        break;
      case 90108:
        app.selfShowModal("用户采集过程中都动态剧烈");
        break;
      case 90109:
        app.selfShowModal("设备不支持人脸采集");
        break;
      case 90199:
        app.selfShowModal("未知错误");
        break;
      default:
        wx.showModal({
          title: "提示",
          content: "人脸认证失败",
          confirmText: "重试",
          success: function success(res) {
            //重试人脸识别
            if (res.confirm) {
              that.setFacialRecognitionVerify();
            }
          },
        });
        break;
    }
  },
  /**
   * 封装人脸识别函数
   */
  setFacialRecognitionVerify: function setFacialRecognitionVerify() {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.startFacialRecognitionVerify({
        name: that.data.userName,
        idCardNumber: that.data.idCard,
        checkAliveType: 2,
        //先检查是否可以屏幕闪烁，不可以则自动为读数字
        success: function success(res) {
          if (res.errCode == 0) {
            resolve(res);
          } else {
            reject();
          }
        },
        fail: function fail(res) {
          reject();
          that.dealErrCode();
        },
      });
    });
  },
});
