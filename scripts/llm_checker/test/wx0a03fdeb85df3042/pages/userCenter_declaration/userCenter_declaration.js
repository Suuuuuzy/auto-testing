var app = getApp(),
  path = app.globalData.path;
var userInfo = app.globalData.userInfo,
  idCard = userInfo.certificateNumber;
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
    //切换栏标题
    tabTitle: ["历史申报", "草稿箱"],
    //当前tab页
    tabCurrent: 0,
    //导航条位置
    titleBarLeft: 0,
    //单个导航条的位置
    singleBarLeft: 0,
    //单个导航栏宽度
    singleTabWidth: 0,
    //历史申报列表
    historicalDeclareList: [],
    //历史申报无数据标识 默认有数据
    historicalFlag: true,
    //草稿箱列表
    draftBoxList: [],
    //历史申报无数据标识 默认有数据
    draftBoxFlag: true,
    //查询--提交数据
    postData: {
      //身份证号
      code: "",
      //查询的受理编号
      search: "",
    },
  },
  /**
   * 事件处理函数
   */
  //监听历史申报列表点击事件
  bindHistoricalListTap: function bindHistoricalListTap(e) {
    var declareId = e.currentTarget.dataset.declareid,
      curaction = e.currentTarget.dataset.curaction; //办件状态
    //判断办件状态是否完结
    var finishFlag = curaction == "办结" ? true : false;
    var declareViewData = {
      declareId: declareId,
    };
    //调用编辑业务表单接口
    this.viewRequest(declareViewData).then(function (res) {
      //history:历史申报标志 finishFlag: 历史申报办结状态标志
      wx.navigateTo({
        url:
          "../businessTodo_declareProcessDetail/businessTodo_declareProcessDetail?data=" +
          JSON.stringify(res.data.data) +
          "&annexList=" +
          JSON.stringify(res.data.declareInstanceAnnexList) +
          "&history=1" +
          "&finishFlag=" +
          finishFlag,
      });
    });
  },
  //监听草稿箱列表点击事件
  bindDraftListTap: function bindDraftListTap(e) {
    var declareId = e.currentTarget.dataset.declareid;
    var draftEditData = {
      declareId: declareId,
    };
    //调用编辑业务表单接口
    this.editRequest(draftEditData).then(function (res) {
      wx.navigateTo({
        url:
          "../businessTodo_declareProcessDetail/businessTodo_declareProcessDetail?data=" +
          JSON.stringify(res.data.data) +
          "&annexList=" +
          JSON.stringify(res.data.declareInstanceAnnexList),
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    app.selfShowLoading("加载中");
    //重新获取用户信息
    userInfo = app.globalData.userInfo;
    idCard = userInfo.certificateNumber;
    var that = this,
      query = that.createSelectorQuery(),
      num = that.data.tabTitle.length,
      //tab栏个数
      tabCurrent = that.data.tabCurrent; //当前tab栏
    var totalWidth,
      //tab栏宽度
      titleBarWidth,
      //导航条宽度
      singleBarLeftCal;
    //初始化身份证号
    that.setData({
      "postData.code": idCard,
    });

    // 获取导航栏总宽度
    query
      .select(".common-tabTitle")
      .boundingClientRect(function (rect) {
        totalWidth = rect.width;
      })
      .exec();
    // 获取导航条宽度，因为是异步，所以在回调函数中赋值
    query
      .select(".sidebar")
      .boundingClientRect(function (rect) {
        titleBarWidth = rect.width;
      })
      .exec(function () {
        // 计算导航条距离左边的位置
        singleBarLeftCal = Math.round((totalWidth / num - titleBarWidth) / 2);
        that.setData({
          singleTabWidth: Math.round(totalWidth / num),
          singleBarLeft: singleBarLeftCal,
          titleBarLeft: singleBarLeftCal,
        });
      });

    //历史申报
    that.historyRequest();
    //草稿箱
    that.draftRequest();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {},
  /* 
   事件处理函数
   */
  //监听tab标题点击事件
  tabTitleTap: function tabTitleTap(event) {
    var index = event.currentTarget.dataset.idx,
      singleBarLeft = this.data.singleBarLeft;
    this.setData({
      tabCurrent: index,
      titleBarLeft: singleBarLeft + event.currentTarget.offsetLeft,
      //重置输入框值
      // searchInput: ''
    });
  },

  //监听swiper切换事件
  swiperChange: function swiperChange(event) {
    var current = event.detail.current,
      singleTabWidth = this.data.singleTabWidth,
      //单个tab宽度
      singleBarLeft = this.data.singleBarLeft; //导航条居中的位置

    this.setData({
      tabCurrent: current,
      titleBarLeft: singleBarLeft + singleTabWidth * current,
      //重置输入框值
      // searchInput: ''
    });
  },

  // 监听输入框输入：存储数据，添加清除按钮
  searchInput: function searchInput(event) {
    var that = this;
    var value = event.detail.value,
      url = path + "/api/business/declaration/declare/history";
    that.setData({
      clearFlagHide: false,
      searchInput: value,
      "postData.search": value,
    });

    // 请求数据
    var historyUrl = path + "/api/business/declaration/declare/history",
      //历史申报
      draftUrl = path + "/api/business/declaration/declare/draft",
      //草稿箱
      tabCurrent = that.data.tabCurrent;

    //判断当前tab页
    if (tabCurrent == 0) {
      //当前是历史申报
      that.historyRequest();
    } else {
      //当前是草稿箱
      that.draftRequest();
    }
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
    this.setData({
      clearFlagHide: true,
    });
  },
  //监听清除按钮点击事件：更新value值，删除清除按钮，调起键盘
  clearTap: function clearTap() {
    var that = this;
    that.setData({
      searchInput: "",
      clearFlagHide: true,
      focusFlag: true,
      "postData.search": "",
    });
    //判断当前tab页
    if (that.data.tabCurrent == 0) {
      //当前是历史申报
      that.historyRequest();
    } else {
      //当前是草稿箱
      that.draftRequest();
    }
  },
  /**
   * 历史申报，请求再封装
   */
  historyRequest: function historyRequest() {
    var that = this,
      historyUrl = path + "/api/business/declaration/declare/history";
    app
      .requestUrl(historyUrl, that.data.postData, "POST")
      .then(function (res) {
        wx.hideLoading();
        //成功获取数据
        if (res.data.success) {
          if (res.data.data.length != 0) {
            //有历史申报数据，更新数据
            that.setData({
              historicalDeclareList: res.data.data,
            });
          } else {
            //没有历史申报数据，更新标识
            that.setData({
              historicalFlag: false,
            });
          }
        } else {
          //接口出错
          app.selfShowModal(res.data.message);
        }
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取历史申报业务出错，请联系管理员");
      });
  },
  /**
   * 草稿箱，请求再封装
   */
  draftRequest: function draftRequest() {
    var that = this,
      draftUrl = path + "/api/business/declaration/declare/draft"; //草稿箱

    app
      .requestUrl(draftUrl, that.data.postData, "POST")
      .then(function (res) {
        if (res.data.success) {
          if (res.data.data.length != 0) {
            //有草稿箱申报数据，更新数据
            that.setData({
              draftBoxList: res.data.data,
            });
          } else {
            //没有草稿箱申报数据，更新标识
            that.setData({
              draftBoxFlag: false,
            });
          }
        } else {
          //接口出错
          app.selfShowModal(res.data.message);
        }
      })
      .catch(function () {
        app.selfShowModal("获取草稿箱业务出错，请联系管理员");
      });
  },
  /**
   * 封装编辑业务表单接口
   * @param {Object} draftEditData
   */
  editRequest: function editRequest(draftEditData) {
    var that = this,
      draftEditUrl = path + "/api/business/declaration/declare/edit";
    return new Promise(function (resolve, reject) {
      //调用编辑业务表单接口
      app
        .requestUrl(draftEditUrl, draftEditData, "POST")
        .then(function (res) {
          if (res.data.success) {
            resolve(res);
          } else {
            app.selfShowModal(res.data.message);
            reject();
          }
        })
        .catch(function () {
          app.selfShowModal("调用编辑接口失败，请联系管理员");
          reject();
        });
    });
  },
  /**
   * 封装查看业务表单接口
   * @param {Object} declareViewData
   */
  viewRequest: function viewRequest(declareViewData) {
    var that = this,
      declareViewUrl = path + "/api/business/declaration/declare/view";
    return new Promise(function (resolve, reject) {
      //调用编辑业务表单接口
      app
        .requestUrl(declareViewUrl, declareViewData, "POST")
        .then(function (res) {
          if (res.data.success) {
            resolve(res);
          } else {
            app.selfShowModal(res.data.message);
            reject();
          }
        })
        .catch(function () {
          app.selfShowModal("调用查看接口失败，请联系管理员");
          reject();
        });
    });
  },
});
