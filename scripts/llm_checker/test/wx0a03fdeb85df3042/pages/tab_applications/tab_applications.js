var _userApi = require("../api/user-api");
var _app = require("../../utils/app");
var app = getApp();
var applications = app.applications;
var userinfo = app.globalData.userInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //热点服务
    hotService: [],
    //公共服务，公共资源，便民服务
    commonItem: [],
    //无数据标志，默认有数据
    noDataFlag: false,
  },
  //监听热点服务点击事件
  bindHotServiceTap: function bindHotServiceTap(e) {
    userinfo = app.globalData.userInfo;
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
    //排队情况，直接跳转
    if (hotService[index].name === "排队情况") {
      wx.navigateTo({
        url: hotService[index].weChatHomepage,
      });
      return;
    }
    if (userinfo.id) {
      (0, _userApi.addAppLog)({
        appId: hotService[index].id,
        terminalType: "MOBILE_H5",
        userId: userinfo.id,
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
  //监听应用类型点击事件
  bindTypeTap: function bindTypeTap(e) {
    userinfo = app.globalData.userInfo;
    var parentidx = e.currentTarget.dataset.parentidx,
      childidx = e.currentTarget.dataset.childidx;
    var commonItem = this.data.commonItem,
      passCurrentType = commonItem[parentidx].applications[childidx]; //当前应用对象
    //判断实名认证等级
    if (passCurrentType.certificationLevel != 0 && !userinfo) {
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
    if (userinfo.id) {
      (0, _userApi.addAppLog)({
        appId: passCurrentType.id,
        terminalType: "MOBILE_H5",
        userId: userinfo.id,
      });
    }
    //排队情况，直接跳转
    if (passCurrentType.name === "排队情况") {
      wx.navigateTo({
        url: passCurrentType.weChatHomepage,
      });
      return;
    }
    if ((0, _app.isExternalProgram)(passCurrentType.weChatHomepage)) {
      (0, _app.jumpMiniProgram)(passCurrentType.weChatHomepage);
      return;
    }
    var url =
      passCurrentType.weChatHomepage.indexOf("applet::") !== -1
        ? passCurrentType.weChatHomepage.split("applet::")[1]
        : "../webView/webView?url=" +
          passCurrentType.weChatHomepage +
          "&appId=" +
          passCurrentType.id;

    //符合条件进入业务
    wx.navigateTo({
      url: url,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    applications = app.applications;
    userinfo = app.globalData.userInfo;
    //没有应用数据--返回
    if (
      applications.hotService.length == 0 &&
      applications.others.length == 0
    ) {
      this.setData({
        noDataFlag: true,
      });
      return;
    }
    this.setData({
      hotService: applications.hotService,
      commonItem: applications.others,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    userinfo = app.globalData.userInfo;
    //修改当前选中tabbar
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
  },
});
