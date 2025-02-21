var _regeneratorRuntime2 = require("../../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../../@babel/runtime/helpers/asyncToGenerator");
var _app = require("../../utils/app");
var _global = require("../../utils/global");
var app = getApp(),
  path2 = app.globalData.path2;
var userinfo = app.globalData.userInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //搜索框输入值
    searchInput: "",
    //搜索框清空图标显示状态,默认不显示
    clearFlagHide: true,
    //获取焦点标识
    focusFlag: false,
    //服务列表
    hotService: [],
    //服务列表有无数据标识,默认有
    hotServiceFlag: true,
    //应用类型ID
    typeId: "",
  },
  /**
   * 事件处理函数
   */
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
    //排队情况，直接跳转
    if (hotService[index].name === "排队情况") {
      wx.navigateTo({
        url: hotService[index].weChatHomepage,
      });
      return;
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
    console.log(url);

    //符合条件进入业务
    wx.navigateTo({
      url: url,
    });
  },
  // 监听输入框输入：存储数据，添加清除按钮
  searchInput: function searchInput(event) {
    var value = event.detail.value;
    this.setData({
      clearFlagHide: false,
      searchInput: value,
    });
    //调用查询应用接口
    this.requestFindApplicationList();
  },
  //监听键盘高度变化：判断是否添加清除按钮
  searchBoardheightchange: function searchBoardheightchange() {
    var inputValue = this.data.searchInput;
    this.setData({
      clearFlagHide: inputValue ? false : true,
    });
  },
  //监听点击完成按钮：删除清除按钮
  searchConfirm: function searchConfirm() {
    var that = this;
    that.setData({
      clearFlagHide: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var passHotService = app.globalData.passHotService;
    //获取并设置标题
    var navigationBarTitle = options.navigationBarTitle;
    wx.setNavigationBarTitle({
      title: navigationBarTitle,
    });
    //有应用列表ID 则存储
    if (options.typeId) {
      this.setData({
        typeId: options.typeId,
      });
    }
    //应用列表为空，修改标识位
    if (!passHotService) {
      this.setData({
        hotServiceFlag: false,
      });
      return;
    }
    this.setData({
      hotService: passHotService,
    });
  },
  /**
   * 自定义事件
   */
  requestFindApplicationList: (function () {
    var _requestFindApplicationList = _asyncToGenerator2(
      /*#__PURE__*/ _regeneratorRuntime2().mark(function _callee() {
        var that, keyword, typeId, findApplicationListUrl, ticket, res, _res;
        return _regeneratorRuntime2().wrap(
          function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  that = this; //根据条件查询应用信息
                  (keyword = that.data.searchInput),
                    (typeId = that.data.typeId); //是热点服务
                  ticket = "";
                  if (typeId) {
                    _context.next = 11;
                    break;
                  }
                  _context.next = 6;
                  return (0, _global.getTicket)("QUERY", {
                    keyword: keyword,
                    recommend: true,
                  });
                case 6:
                  res = _context.sent;
                  ticket = res.data.ticket;
                  findApplicationListUrl =
                    path2 +
                    "/api/application/findApplicationList?keyword=" +
                    keyword +
                    "&recommend=true";
                  _context.next = 16;
                  break;
                case 11:
                  _context.next = 13;
                  return (0, _global.getTicket)("QUERY", {
                    keyword: keyword,
                    typeId: typeId,
                  });
                case 13:
                  _res = _context.sent;
                  ticket = _res.data.ticket;
                  findApplicationListUrl =
                    path2 +
                    "/api/application/findApplicationList?keyword=" +
                    keyword +
                    "&typeId=" +
                    typeId;
                case 16:
                  app
                    .requestUrl(findApplicationListUrl, "", "GET")
                    .then(function (res) {
                      console.log(res);
                      if (res.statusCode > 300) {
                        app.selfShowModal("获取应用列表失败");
                        return;
                      }
                      //接口访问正常，赋值数据
                      var hotData = res.data.content;
                      //应用列表为空，修改标识位
                      if (hotData.length == 0) {
                        that.setData({
                          hotServiceFlag: false,
                          hotService: hotData,
                        });
                        return;
                      }
                      //有应用列表则过滤后赋值
                      that.setData({
                        hotServiceFlag: true,
                        hotService: that.resetApplication(hotData),
                      });
                    })
                    .catch(function () {
                      app.selfShowModal("获取应用列表失败1");
                    });
                case 17:
                case "end":
                  return _context.stop();
              }
          },
          _callee,
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
});
