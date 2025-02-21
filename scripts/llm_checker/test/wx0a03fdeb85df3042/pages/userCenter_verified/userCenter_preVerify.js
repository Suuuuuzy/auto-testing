var _regeneratorRuntime2 = require("../../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../../@babel/runtime/helpers/asyncToGenerator");
var _global = require("../../utils/global");
var app = getApp(),
  path2 = app.globalData.path2;
var verifyJs = require("../../utils/verify.js"),
  verify = verifyJs.verify;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    preVerifyData: {
      userName: "",
      idCard: "",
      mobile: "",
      verifyCode: "",
    },
    //获取验证码按钮文字
    getCodeText: "获取验证码",
    //获取验证码按钮是否可用，默认可用
    getCodeDisabled: false,
    // 实名完成跳转链接
    gotoUrl: "",
  },
  /* 事件处理函数 */
  //监听表单提交事件
  bindVerifiedSubmit: function bindVerifiedSubmit(e) {
    var that = this;
    var authorizationFlag = that.data.authorizationFlag;
    //校验必填字段
    that.formVerify().then(
      /*#__PURE__*/ _asyncToGenerator2(
        /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee() {
          var preVerifyUrl, preVerifyData, res;
          return _regeneratorRuntime2().wrap(function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  wx.showLoading({
                    title: "校验中...",
                    mask: true,
                  });
                  //调用预校验接口
                  (preVerifyUrl = path2 + "/api/certification/preVerify"),
                    (preVerifyData = that.data.preVerifyData);
                  _context.next = 4;
                  return (0, _global.getTicket)("BODY", preVerifyData);
                case 4:
                  res = _context.sent;
                  app
                    .requestUrl(
                      preVerifyUrl,
                      preVerifyData,
                      "POST",
                      res.data.ticket
                    )
                    .then(function (res) {
                      wx.hideLoading();
                      //接口报错
                      if (res.statusCode > 300) {
                        app.selfShowModal(res.data.message);
                        return;
                      }
                      //进行下一步
                      wx.navigateTo({
                        url:
                          "./userCenter_verify?authCode=" +
                          res.data.authCode +
                          "&userName=" +
                          preVerifyData.userName +
                          "&idCard=" +
                          preVerifyData.idCard +
                          "&gotoUrl=" +
                          that.data.gotoUrl,
                      });
                    })
                    .catch(function () {
                      wx.hideLoading();
                      app.selfShowModal("调用提交接口失败，请重试");
                    });
                case 6:
                case "end":
                  return _context.stop();
              }
          }, _callee);
        })
      )
    );
  },
  //监听姓名输入事件
  bindUserNameInput: function bindUserNameInput(e) {
    this.setData({
      "preVerifyData.userName": e.detail.value.trim(),
    });
  },
  //监听身份证号输入事件
  bindIdCardInput: function bindIdCardInput(e) {
    this.setData({
      "preVerifyData.idCard": e.detail.value.trim(),
    });
  },
  //监听手机号输入事件
  bindMobileInput: function bindMobileInput(e) {
    this.setData({
      "preVerifyData.mobile": e.detail.value.trim(),
    });
  },
  //监听验证码输入事件
  bindVerifyCodeInput: function bindVerifyCodeInput(e) {
    this.setData({
      "preVerifyData.verifyCode": e.detail.value.trim(),
    });
  },
  //监听获取验证码按钮点击事件
  bindGetCodeTap: (function () {
    var _bindGetCodeTap = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee2() {
        var that,
          totalTime,
          mobile,
          intervalmun,
          res,
          ticket,
          sendVerifyCodeUrl;
        return _regeneratorRuntime2().wrap(
          function _callee2$(_context2) {
            while (1)
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  that = this;
                  (totalTime = 60), (mobile = that.data.preVerifyData.mobile); //判断手机号是否存在
                  if (!verify.isEmpty(mobile)) {
                    _context2.next = 5;
                    break;
                  }
                  app.selfShowToast("请输入手机号");
                  return _context2.abrupt("return");
                case 5:
                  if (verify.isTel(mobile)) {
                    _context2.next = 8;
                    break;
                  }
                  app.selfShowToast("手机号格式不正确");
                  return _context2.abrupt("return");
                case 8:
                  //设置按钮不可用
                  that.setData({
                    getCodeDisabled: true,
                  });
                  //开始倒计时
                  that.setData({
                    getCodeText: totalTime + "s",
                  });
                  intervalmun = setInterval(function () {
                    //倒计时结束
                    if (totalTime < 2) {
                      that.setData({
                        getCodeText: "获取验证码",
                        getCodeDisabled: false,
                      });
                      clearInterval(intervalmun);
                      return;
                    }
                    //进行倒计时
                    totalTime--;
                    that.setData({
                      getCodeText: totalTime + "s",
                    });
                  }, 1000); //请求发送验证码接口
                  _context2.next = 13;
                  return (0, _global.getTicket)("QUERY", {
                    mobile: mobile,
                  });
                case 13:
                  res = _context2.sent;
                  ticket = res.data.ticket;
                  sendVerifyCodeUrl =
                    path2 +
                    "/api/certification/sendVerifyCode?mobile=" +
                    mobile;
                  app
                    .requestUrl(sendVerifyCodeUrl, "", "POST", ticket)
                    .then(function (res) {
                      if (res.statusCode > 300) {
                        app.selfShowModal("发送验证码失败，请重试");
                        //恢复获取验证码状态
                        that.setData({
                          getCodeText: "获取验证码",
                          getCodeDisabled: false,
                        });
                        clearInterval(intervalmun);
                        return;
                      }
                      app.selfShowToast("已发送");
                    })
                    .catch(function () {
                      app.selfShowModal("发送验证码失败，请重试");
                      //恢复获取验证码状态
                      that.setData({
                        getCodeText: "获取验证码",
                        getCodeDisabled: false,
                      });
                      clearInterval(intervalmun);
                    });
                case 17:
                case "end":
                  return _context2.stop();
              }
          },
          _callee2,
          this
        );
      })
    );
    function bindGetCodeTap() {
      return _bindGetCodeTap.apply(this, arguments);
    }
    return bindGetCodeTap;
  })(),
  //打开授权设置页后回调
  bindCameraOpenSetting: function bindCameraOpenSetting(e) {
    var cameraAuth = e.detail.authSetting["scope.camera"];
    this.setData({
      authorizationFlag: cameraAuth,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.setData({
      gotoUrl: options.gotoUrl,
    });
  },
  /**
   * 自定义事件
   */
  /**
   * 封装表单提交校验
   */
  formVerify: function formVerify() {
    var that = this;
    var preVerifyData = that.data.preVerifyData,
      username = preVerifyData.userName,
      idcard = preVerifyData.idCard,
      mobile = preVerifyData.mobile,
      verifycode = preVerifyData.verifyCode;
    return new Promise(function (resolve, reject) {
      if (verify.isEmpty(username)) {
        app.selfShowToast("请输入用户姓名");
        return;
      }
      if (verify.isEmpty(idcard)) {
        app.selfShowToast("请输入身份证号码");
        return;
      }
      if (!verify.isIDCard(idcard)) {
        app.selfShowToast("身份证号格式不正确");
        return;
      }
      if (verify.isEmpty(mobile)) {
        app.selfShowToast("请输入手机号");
        return;
      }
      if (!verify.isTel(mobile)) {
        app.selfShowToast("手机号格式不正确");
        return;
      }
      if (verify.isEmpty(verifycode)) {
        app.selfShowToast("请输入验证码");
        return;
      }
      resolve();
    });
  },
});
