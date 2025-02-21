var _regeneratorRuntime2 = require("../../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../../@babel/runtime/helpers/asyncToGenerator");
var _global = require("../../utils/global");
var app = getApp(),
  path2 = app.globalData.path2;
var userinfo = app.globalData.userInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //实名认证标识
    isVerified: false,
    //用户真实姓名
    realName: "",
    //用户信息
    userinfo: "",
    //导航栏列表
    navList: [
      {
        navListId: 1,
        navIcon: "../asserts/images/userCenter_nav_wdbj.png",
        navText: "我的办件",
      },
      {
        navListId: 2,
        navIcon: "../asserts/images/userCenter_nav_wdyy.png",
        navText: "我的预约",
      },
      {
        navListId: 3,
        navIcon: "../asserts/images/userCenter_nav_wddz.png",
        navText: "我的地址",
      },
      {
        navListId: 4,
        navIcon: "../asserts/images/userCenter_nav_wdzz.png",
        navText: "企业空间",
      },
    ],
    //applicationList
    applicationListCopy: [
      {
        applicationId: 1,
        applicationListIcon: "../asserts/images/userCenter_appList_wdsb.png",
        applicationListTitle: "我的申报",
        applicationListSubTitle: "点击查看我的历史申报",
      },
      {
        applicationId: 2,
        applicationListIcon: "../asserts/images/userCenter_appList_cssp.png",
        applicationListTitle: "常熟智慧审批平台",
        applicationListSubTitle: "常熟行政审批局网上审批",
      },
      {
        applicationId: 3,
        applicationListIcon: "../asserts/images/userCenter_appList_cygl.png",
        applicationListTitle: "行政审批局餐饮管理系统",
        applicationListSubTitle: "常熟市行政审批局餐饮管理系统",
      },
      {
        applicationId: 4,
        applicationListIcon: "../asserts/images/dzzz.png",
        applicationListTitle: "我的电子证照",
        applicationListSubTitle: "",
      },
      {
        applicationId: 5,
        applicationListIcon: "../asserts/images/userCenter_appList_jcbd.png",
        applicationListTitle: "解除绑定实名认证",
      },
    ],
    applicationList: [],
  },
  /**
   * 事件处理函数
   */
  //点击导航栏列表事件
  navListTap: function navListTap(event) {
    var index = event.currentTarget.dataset.idx;
    var qykjUrl =
      "https://spj.csdsj.net/csweb_apps/enterprise-space/index.html#/";
    //判断是否实名
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
      return;
    }
    //已实名
    switch (index) {
      case 1:
        wx.navigateTo({
          url: "../businessProgress/businessProgress?myFlag=true",
        });
        break;
      case 2:
        wx.navigateTo({
          url: "../webView/webView?url=https://spj.csdsj.net/applications/z_appointCS/view/my.html",
        });
        break;
      case 3:
        wx.navigateTo({
          url: "../userCenter_address/userCenter_address",
        });
        break;
      case 4:
        wx.navigateTo({
          url: "../webView/webView?url=" + qykjUrl,
        });
        break;
      default:
        break;
    }
  },
  //点击应用列表事件
  applicationListTap: function applicationListTap(event) {
    var that = this;
    var index = event.currentTarget.dataset.idx;
    //判断是否实名认证
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
      return;
    }
    //已实名，可以办业务
    switch (index) {
      case 1:
        wx.navigateTo({
          url: "../userCenter_declaration/userCenter_declaration",
        });
        break;
      case 2:
        // 常熟智慧审批平台
        wx.navigateTo({
          url: "../../packageA/login/login?forward=true",
        });
        break;
      case 3:
        // 行政审批局餐饮管理系统
        wx.navigateTo({
          url: "../webView/webView?url=https://spj.csdsj.net/csweb_apps/menuEvaluation/index.html",
        });
        break;
      case 4:
        // 电子证照
        wx.navigateTo({
          url: "../webView/webView?url=https://spj.csdsj.net/csApp/index.html#/licenceV2",
        });
        break;
      case 5:
        //提示是否解除绑定
        wx.showModal({
          title: "提示",
          content: "确认解除绑定实名认证吗？",
          success: function success(res) {
            if (res.confirm) {
              //解绑用户信息
              that.requestDeleteByUserId();
            }
          },
        });
        break;
      default:
        break;
    }
  },
  //监听点击实名认证事件
  bindVerifiedTap: function bindVerifiedTap() {
    wx.navigateTo({
      url: "../userCenter_verified/userCenter_preVerify",
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    //修改当前选中tabbar
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
    var that = this;
    //更新userInfo
    userinfo = app.globalData.userInfo;
    that.setData({
      userinfo: userinfo,
    });
    //根据用户ID查询实名认证信息
    if (app.isUserVerify()) {
      //存在实名认证信息
      that.setData({
        isVerified: true,
        realName: userinfo.realName,
      });
      this.setData({
        applicationList: that.data.applicationListCopy,
      });
    } else {
      var applicationList = this.data.applicationListCopy.filter(function (i) {
        return [4, 5].indexOf(i.applicationId) === -1;
      });
      this.setData({
        applicationList: applicationList,
      });
    }
  },
  /**
   * 封装解绑用户实名信息
   */
  requestDeleteByUserId: (function () {
    var _requestDeleteByUserId = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee() {
        var that, userId, res, deleteUrl;
        return _regeneratorRuntime2().wrap(
          function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  that = this;
                  userinfo = app.globalData.userInfo;
                  userId = userinfo.id;
                  _context.next = 5;
                  return (0, _global.getTicket)("QUERY", {
                    userId: userId,
                  });
                case 5:
                  res = _context.sent;
                  console.log(res.data.ticket);
                  deleteUrl =
                    path2 + "/api/weChat/unBindWeChatUser?userId=" + userId; //调用删除接口
                  app
                    .requestUrl(deleteUrl, "", "POST", res.data.ticket)
                    .then(function (res) {
                      if (res.statusCode > 300) {
                        app.selfShowModal("解除绑定失败，请重试或联系管理员");
                        return;
                      }
                      // 更新全局实名信息
                      app.globalData.userInfo = {
                        userAuth: null,
                      };
                      userinfo = "";
                      var applicationList =
                        that.data.applicationListCopy.filter(function (i) {
                          return [4, 5].indexOf(i.applicationId) === -1;
                        });
                      that.setData({
                        isVerified: false,
                        userinfo: "",
                        applicationList: applicationList,
                      });
                      app.selfShowToast("解除绑定成功!");
                    })
                    .catch(function (e) {
                      console.log(e, "e");
                      app.selfShowModal("解除绑定失败，请重试或联系管理员");
                    });
                case 9:
                case "end":
                  return _context.stop();
              }
          },
          _callee,
          this
        );
      })
    );
    function requestDeleteByUserId() {
      return _requestDeleteByUserId.apply(this, arguments);
    }
    return requestDeleteByUserId;
  })(),
});
