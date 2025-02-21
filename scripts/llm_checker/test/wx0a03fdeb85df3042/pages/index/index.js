var _regeneratorRuntime2 = require("../../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../../@babel/runtime/helpers/asyncToGenerator");
var _app = require("../../utils/app");
var _userApi = require("../api/user-api");
var _global = require("../../utils/global");
var app = getApp(),
  path2 = app.globalData.path2;
var globalUserInfo = app.globalData.userInfo,
  flag = app.globalData.userInfoFlag;
Page({
  data: {
    //获取用户信息标志
    userInfoFlag: false,
    //用户实名制信息
    userinfo: "",
    //通知
    notice: "暂无通知",
    //业务办理等操作项
    businessChoose: [
      {
        businessid: "1",
        businessImg: "../asserts/images/index_ywbl.png",
        businessName: "业务办理",
      },
      {
        businessid: "2",
        businessImg: "../asserts/images/index_bjjd.png",
        businessName: "办件进度",
      },
      {
        businessid: "3",
        businessImg: "../asserts/images/index_zxyy.png",
        businessName: "在线预约",
      },
    ],
    //热点服务
    hotService: [],
    //热点服务无数据内容
    hotServiceNoData: "",
    //公共服务，公共资源，便民服务
    commonItem: [],
    //其他无数据内容
    commonItemNoData: "",
  },
  /**
   * 事件处理函数
   */
  /**
   * 人才子女入学banner点击事件
   */
  bindRuXueTap: function bindRuXueTap() {
    //判断是否实名认证
    if (this.toVerify()) {
      wx.navigateTo({
        url: "../webView/webView?url=https://spj.csdsj.net/csweb_apps/talent-child/index.html#/",
      });
    }
  },
  bindOneThingTapNew: function bindOneThingTapNew() {
    wx.navigateTo({
      url: "../webView/webView?url=https://spj.csdsj.net/csweb_apps/cs-mobile-onething/#/",
    });
  },
  //监听一件事点击事件
  bindOneThingTap: function bindOneThingTap() {
    //判断是否实名认证
    if (this.toVerify()) {
      // 旧地址 https://spj.csdsj.net/csweb_apps/one-thing/index.html#/
      // 新地址 https://spj.csdsj.net/csweb_apps/cs-mobile-onething/#/
      wx.navigateTo({
        url: "../webView/webView?url=https://spj.csdsj.net/csweb_apps/one-thing/index.html#/",
      });
    }
  },
  // 监听顶部业务点击事件
  businessTap: function businessTap(event) {
    var idx = event.currentTarget.dataset.idx;
    switch (idx) {
      // 业务办理
      case 0:
        wx.navigateTo({
          url: "../businessTodo/businessTodo",
        });
        break;
      // 办件进度
      case 1:
        //判断是否实名认证
        if (this.toVerify()) {
          wx.navigateTo({
            url: "../businessProgress/businessProgress",
          });
        }
        break;
      // 在线预约
      case 2:
        wx.navigateTo({
          url: "../webView/webView?url=https://spj.csdsj.net/applications/z_appointCS/index.html",
        });
        break;
      case 3:
        //判断是否实名认证
        if (!app.isUserVerify()) {
          app.selfShowModal(
            "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
            function (res) {
              if (res.confirm) {
                //跳转实名认证界面
                wx.navigateTo({
                  url:
                    "/pages/userCenter_verified/userCenter_preVerify?gotoUrl=" +
                    encodeURIComponent("/tools/scanCode/scanCode"),
                });
              }
            }
          );
          return;
        }
        wx.navigateTo({
          url: "/tools/scanCode/scanCode",
        });
        break;
      default:
        break;
    }
  },
  //监听个人中心点击事件
  userCenterTap: function userCenterTap(event) {
    wx.switchTab({
      url: "../userCenter/userCenter",
    });
  },
  //监听热点服务点击事件
  bindHotServiceTap: function bindHotServiceTap(e) {
    var index = e.currentTarget.dataset.idx,
      hotService = this.data.hotService;

    //判断实名认证等级
    if (hotService[index].certificationLevel != 0 && !app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url: "../userCenter_verified/userCenter_preVerify",
            });
          }
        }
      );
      return;
    }
    if (hotService[index].id && this.data.userinfo.id) {
      (0, _userApi.addAppLog)({
        appId: hotService[index].id,
        terminalType: "MOBILE_H5",
        userId: this.data.userinfo.id,
      });
    }
    if ((0, _app.isExternalProgram)(hotService[index].weChatHomepage)) {
      (0, _app.jumpMiniProgram)(hotService[index].weChatHomepage);
      return;
    }
    var webUrl =
      "../webView/webView?url=" +
      hotService[index].weChatHomepage +
      "&appId=" +
      hotService[index].id;
    var url =
      hotService[index].weChatHomepage.indexOf("applet::") !== -1
        ? hotService[index].weChatHomepage.split("applet::")[1]
        : webUrl;

    //符合条件进入业务
    wx.navigateTo({
      url: url,
    });
  },
  //监听更多热点服务点击事件
  bindHotServiceMoreTap: function bindHotServiceMoreTap() {
    app.globalData.passHotService = this.data.hotService;
    wx.navigateTo({
      url: "/pages/index_applicationList/index_applicationList?navigationBarTitle=热点服务",
    });
  },
  // 适老化专栏
  handleGoAged: function handleGoAged() {
    wx.navigateTo({
      url: "/aNetTools/OptimalAging/OptimalAging",
    });
  },
  //监听应用类型点击事件
  bindTypeTap: function bindTypeTap(e) {
    var parentidx = e.currentTarget.dataset.parentidx,
      childidx = e.currentTarget.dataset.childidx;
    var commonItem = this.data.commonItem,
      passCurrentType = commonItem[parentidx].applications[childidx]; //当前应用对象
    //判断实名认证等级
    if (passCurrentType.certificationLevel != 0 && !app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url: "../userCenter_verified/userCenter_preVerify",
            });
          }
        }
      );
      return;
    }
    if (passCurrentType.id && this.data.userinfo.id) {
      (0, _userApi.addAppLog)({
        appId: passCurrentType.id,
        terminalType: "MOBILE_H5",
        userId: this.data.userinfo.id,
      });
    }

    //排队情况，直接跳转
    if (passCurrentType.name === "排队情况") {
      wx.navigateTo({
        url: passCurrentType.weChatHomepage,
      });
      return;
    }
    var webUrl =
      "../webView/webView?url=" +
      passCurrentType.weChatHomepage +
      "&appId=" +
      passCurrentType.id;
    var url =
      passCurrentType.weChatHomepage.indexOf("applet::") !== -1
        ? passCurrentType.weChatHomepage.split("applet::")[1]
        : webUrl;
    if ((0, _app.isExternalProgram)(passCurrentType.weChatHomepage)) {
      (0, _app.jumpMiniProgram)(passCurrentType.weChatHomepage);
      return;
    }

    //符合条件进入业务
    wx.navigateTo({
      url: url,
    });
  },
  //监听更多应用类型点击事件
  bindTypeMoreTap: function bindTypeMoreTap(e) {
    var parentIdx = e.currentTarget.dataset.parentidx;
    var commonItem = this.data.commonItem;
    var appList = commonItem[parentIdx].applications;
    app.globalData.passHotService = appList;

    //跳转到应用明细页面
    wx.navigateTo({
      url:
        "../index_applicationList/index_applicationList?typeId=" +
        commonItem[parentIdx].id +
        "&navigationBarTitle=" +
        commonItem[parentIdx].name,
    });
  },
  //监听企业设立登记点击事件
  bindEstablishTap: function bindEstablishTap() {
    if (!app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url: "../userCenter_verified/userCenter_preVerify",
            });
          }
        }
      );
    } else {
      //跳转企业设立登记
      var url = "https://spj.csdsj.net/wx-establish/index.html";
      wx.navigateTo({
        url: "../webView/webView?url=" + url,
      });
    }
  },
  education: function education() {
    var url = "https://spj.csdsj.net/csweb_apps/cs-education/index.html#/";
    if (!app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url:
                "../userCenter_verified/userCenter_preVerify?gotoUrl=" +
                encodeURIComponent(url),
            });
          }
        }
      );
    } else {
      wx.navigateTo({
        url: "/pages/webView/webView?url=" + url,
      });
    }
  },
  onEduThingTap: function onEduThingTap() {
    //教育入学一件事地址
    var url =
      "https://spj.csdsj.net/cszw_weixin/machine/process/opinion/view/7f000001fffffffff6d07e34000114b5";
    if (!app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url:
                "../userCenter_verified/userCenter_preVerify?gotoUrl=" +
                encodeURIComponent(url),
            });
          }
        }
      );
    } else {
      wx.navigateTo({
        url: "/pages/webView/webView?url=" + url,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: (function () {
    var _onLoad = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee(options) {
        var _this = this;
        return _regeneratorRuntime2().wrap(
          function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  app.selfShowLoading("加载中");
                  // 隐藏tabbar
                  this.getTabBar().setData({
                    showFlag: false,
                  });

                  // 获取用户信息
                  app
                    .getUserInfo(_global.getTicket)
                    .then(function () {
                      //更新用户信息标志
                      console.log("首页加载");
                      flag = app.globalData.userInfoFlag;
                      globalUserInfo = app.globalData.userInfo;
                      //存储用户信息标志
                      _this.setData({
                        userInfoFlag: flag,
                        userinfo: globalUserInfo,
                      });
                      //根据条件查询应用信息
                      //查询应用类型接口
                      Promise.all([
                        _this.requestFindApplicationList(),
                        _this.requestFindApplicationTypeListUrl(),
                      ])
                        .then(function () {
                          //清除加载标志
                          wx.hideLoading();
                          //保存应用服务列表
                          app.applications = {
                            hotService: _this.data.hotService,
                            others: _this.data.commonItem,
                          };
                          // 显示tabbar
                          _this.getTabBar().setData({
                            showFlag: true,
                          });
                        })
                        .catch(function () {
                          //清除加载标志
                          wx.hideLoading();
                        });
                    })
                    .catch(function () {
                      //清除加载标志
                      wx.hideLoading();
                      //登录未成功，提示重新进入小程序
                      app.showModal("网络连接异常，请检查您的网络");
                    });
                case 3:
                case "end":
                  return _context.stop();
              }
          },
          _callee,
          this
        );
      })
    );
    function onLoad(_x) {
      return _onLoad.apply(this, arguments);
    }
    return onLoad;
  })(),
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    //修改当前tabbar
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
    //更新userinfo
    globalUserInfo = app.globalData.userInfo;
    flag = app.globalData.userInfoFlag;
    //更新本页面用户信息
    this.setData({
      userinfo: globalUserInfo,
      userInfoFlag: flag,
    });
  },
  /**
   * 自定义函数
   */
  /**
   * 封装根据条件查询应用信息接口
   */
  requestFindApplicationList: (function () {
    var _requestFindApplicationList = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee2() {
        var that, res, findApplicationListUrl;
        return _regeneratorRuntime2().wrap(
          function _callee2$(_context2) {
            while (1)
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  that = this;
                  _context2.next = 3;
                  return (0, _global.getTicket)("QUERY", {
                    page: "0",
                    size: 100,
                    sort: "order",
                    recommend: true,
                  });
                case 3:
                  res = _context2.sent;
                  findApplicationListUrl =
                    path2 +
                    "/api/application/findApplicationList?page=0&size=100&sort=order&recommend=true";
                  return _context2.abrupt(
                    "return",
                    new Promise(function (resolve, reject) {
                      app
                        .requestUrl(
                          findApplicationListUrl,
                          "",
                          "GET",
                          res.data.ticket
                        )
                        .then(function (res) {
                          if (res.statusCode > 300) {
                            app.simpleShowModal("获取热点服务列表失败");
                            reject();
                            return;
                          }
                          resolve();
                          //接口访问正常，赋值数据
                          //删除不在移动端显示的应用
                          var resetData = that.resetApplication(
                            res.data.content
                          );
                          //无数据
                          if (resetData.length == 0) {
                            that.setData({
                              hotServiceNoData: "暂无应用",
                            });
                            return;
                          } else {
                            that.setData({
                              hotService: resetData,
                            });
                          }
                        })
                        .catch(function () {
                          app.simpleShowModal("获取热点服务列表失败");
                          reject();
                        });
                    })
                  );
                case 6:
                case "end":
                  return _context2.stop();
              }
          },
          _callee2,
          this
        );
      })
    );
    function requestFindApplicationList() {
      return _requestFindApplicationList.apply(this, arguments);
    }
    return requestFindApplicationList;
  })(),
  /**
   * 封装查询应用类型接口
   */
  requestFindApplicationTypeListUrl: (function () {
    var _requestFindApplicationTypeListUrl = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee3() {
        var that, res, findApplicationTypeListUrl;
        return _regeneratorRuntime2().wrap(
          function _callee3$(_context3) {
            while (1)
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  that = this;
                  _context3.next = 3;
                  return (0, _global.getTicket)("QUERY", {
                    channel: "wechat",
                    withApp: true,
                  });
                case 3:
                  res = _context3.sent;
                  findApplicationTypeListUrl =
                    path2 +
                    "/api/application/findApplicationTypeList?channel=wechat&withApp=true";
                  return _context3.abrupt(
                    "return",
                    new Promise(function (resolve, reject) {
                      app
                        .requestUrl(
                          findApplicationTypeListUrl,
                          "",
                          "GET",
                          res.data.ticket
                        )
                        .then(function (res) {
                          if (res.statusCode > 300) {
                            app.simpleShowModal("获取应用类型失败");
                            reject();
                            return;
                          }
                          resolve();
                          var typeData = res.data;
                          for (var i = 0; i < typeData.length; i++) {
                            var tempType = typeData[i];
                            //删除不在移动端显示的应用，并重新赋值
                            tempType.applications = that.resetApplication(
                              tempType.applications
                            );
                            if (tempType.applications.length == 0) {
                              that.setData({
                                commonItemNoData: "暂无应用",
                              });
                            }
                          }
                          //赋值数据
                          that.setData({
                            commonItem: typeData,
                          });
                        })
                        .catch(function () {
                          app.simpleShowModal("获取应用类型失败");
                          reject();
                        });
                    })
                  );
                case 6:
                case "end":
                  return _context3.stop();
              }
          },
          _callee3,
          this
        );
      })
    );
    function requestFindApplicationTypeListUrl() {
      return _requestFindApplicationTypeListUrl.apply(this, arguments);
    }
    return requestFindApplicationTypeListUrl;
  })(),
  /**
   * 应用列表是否在移动端显示，不显示则删除
   * @param {Object} hotService 要检测的列表
   */
  resetApplication: function resetApplication(hotService) {
    var i = 0;
    while (i < hotService.length) {
      var temp = hotService[i];
      //不能在移动端显示，则删除
      if (!temp.mobileEnabled || temp.status != 0) {
        hotService.splice(i, 1);
        i = 0;
        continue;
      } else {
        i++;
      }
    }
    return hotService;
  },
  /**
   * 未实名认证 跳转认证界面
   */
  toVerify: function toVerify() {
    if (!app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url: "../userCenter_verified/userCenter_preVerify",
            });
          }
        }
      );
      return false;
    } else {
      return true;
    }
  },
});
