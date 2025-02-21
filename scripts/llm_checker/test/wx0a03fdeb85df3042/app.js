var _regeneratorRuntime2 = require("@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("@babel/runtime/helpers/asyncToGenerator");
App({
  globalData: {
    path: "https://spj.csdsj.net/cszw_weixin",
    //申报
    path2: "https://spj.csdsj.net/gateway/zwfw-api",
    //实名认证
    path3: "https://spj.csdsj.net/cszw_weixin",
    //预约
    //预约部门编码
    bureauCode: "320581",
    //用户信息
    userInfo: "",
    //已获取用户信息标识，默认未获取
    userInfoFlag: false,
    //登录接口请求失败标志位
    weChatLoginFlag: true,
    //常熟审批平台
    basePath: "https://spj.csdsj.net/cszw_weixin",
    userinfo: {},
    passHotService: [],
  },
  onLaunch: function onLaunch() {
    //清空缓存
    console.log(1);
    wx.clearStorageSync();
  },
  onShow: function onShow() {
    //调用检查更新函数
    this.upDataApp();
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function getUserInfo(func) {
    var that = this;
    return new Promise(function (resolve, reject) {
      //微信用户登录
      wx.login({
        success: function success(res) {
          return _asyncToGenerator2(
            /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee() {
              var ticket, a, weChatLoginUrl;
              return _regeneratorRuntime2().wrap(function _callee$(_context) {
                while (1)
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      if (!res.code) {
                        _context.next = 8;
                        break;
                      }
                      ticket = "";
                      _context.next = 4;
                      return func("QUERY", {
                        code: res.code,
                      });
                    case 4:
                      a = _context.sent;
                      ticket = a.data.ticket;
                      weChatLoginUrl =
                        that.globalData.path2 +
                        "/api/authentication/weChatLogin?code=" +
                        res.code;
                      that
                        .requestUrl(weChatLoginUrl, "", "POST", ticket)
                        .then(function (res) {
                          if (res.statusCode > 300) {
                            that.globalData.weChatLoginFlag = false;
                            reject();
                          } else {
                            //保存用户信息,更新标志位
                            that.globalData.userInfo = res.data;
                            that.globalData.userInfoFlag = true;
                            resolve(res.data);
                          }
                        })
                        .catch(function (res) {
                          //更新登录失败标志位
                          that.globalData.weChatLoginFlag = false;
                          reject();
                        });
                    case 8:
                    case "end":
                      return _context.stop();
                  }
              }, _callee);
            })
          )();
        },
        fail: function fail() {
          //更新登录失败标志位
          that.globalData.weChatLoginFlag = false;
          reject();
        },
      });
    });
  },
  /**
   * @param {Object} cont
   * 封装模态框，简单提示用
   */
  selfShowModal: function selfShowModal(cont, successFun, failFun) {
    wx.showModal({
      title: "提示",
      content: cont,
      success: successFun,
      fail: failFun,
    });
  },
  /**
   * @param {Object} cont
   * 封装消息提示框，没有图标，验证提示用
   */
  selfShowToast: function selfShowToast(cont) {
    wx.showToast({
      icon: "none",
      title: cont,
    });
  },
  /**
   * 简单模态框，无取消按钮
   * @param {Object} cont 提示内容
   */
  simpleShowModal: function simpleShowModal(cont, successFun) {
    wx.showModal({
      title: "提示",
      content: cont,
      showCancel: false,
      success: successFun,
    });
  },
  /**
   * 封装loading提示框
   * @param {Object} setTitle
   */
  selfShowLoading: function selfShowLoading(setTitle) {
    wx.showLoading({
      title: setTitle,
    });
  },
  /**
   * 自定义函数,请求数据接口
   * @param {Object} url 请求地址
   * @param {Object} postdata 请求参数
   * @param {Object} method 请求方法
   */
  requestUrl: function requestUrl(url, postdata, method, ticket) {
    return new Promise(function (resolve, reject) {
      //请求数据
      wx.request({
        url: url,
        data: postdata,
        method: method,
        header: {
          ticket: ticket,
        },
        success: function success(res) {
          resolve(res);
        },
        fail: function fail() {
          reject();
        },
      });
    });
  },
  /**
   * 太仓智慧审批平台
   */
  //提示框
  showModal: function showModal(data) {
    wx.showModal({
      title: "提示",
      content: data,
      showCancel: false,
    });
  },
  isUserVerify: function isUserVerify() {
    return this.globalData.userInfo.userAuth !== null;
  },
  //检查版本更新
  upDataApp: function upDataApp() {
    if (wx.canIUse("getUpdateManager")) {
      //判断当前微信版本是否支持版本更新
      var updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          // 请求完新版本信息的回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function success(res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              // 新的版本下载失败
              title: "已经有新版本了",
              content: "新版本已经上线，请您删除当前小程序，重新搜索打开",
            });
          });
        }
      });
    } else {
      wx.showModal({
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
  },
});
