var app = getApp(),
  path3 = app.globalData.path3,
  bureauCode = app.globalData.bureauCode;
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
    //中心窗口数
    totalWindows: "",
    //当前排队人数
    currentWaiter: "",
    //今日取号
    takeNumbers: "",
    //今日办理
    handles: "",
    //主内容列表
    reservationList: [],
  },
  /**
   * 事件处理函数
   */
  bindReservationListTap: function bindReservationListTap(e) {
    var id = e.currentTarget.dataset.idx;
    var passData = {
      id: id,
      totalWindows: this.data.totalWindows,
      currentWaiter: this.data.currentWaiter,
    };
    wx.navigateTo({
      url: "./businessReservation_detail?passdata=" + JSON.stringify(passData),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    app.selfShowLoading("加载中");
    var that = this;
    var getQueueDetailUrl =
        path3 + "/api/queue/getQueueDetail?bureauCode=" + bureauCode,
      getQueueDetailData = {
        bureauCode: bureauCode,
      };
    app
      .requestUrl(getQueueDetailUrl, "", "GET")
      .then(function (res) {
        wx.hideLoading();
        console.log(res);
        //接口出错
        if (res.statusCode > 300) {
          app.selfShowModal("查询排队详情失败");
          return;
        }
        //正常返回数据，更新数据
        that.setData({
          totalWindows: res.data.countWindow,
          currentWaiter: res.data.countDayByState0,
          takeNumbers: res.data.countDay,
          handles: res.data.countMonth,
          reservationList: res.data.data,
        });
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("查询排队详情失败");
      });
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
  // 监听输入框输入：存储数据，添加清除按钮
  searchInput: function searchInput(event) {
    var value = event.detail.value;
    this.setData({
      clearFlagHide: false,
      searchInput: value,
    });
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
    console.log(this.data.focusFlag);
    this.setData({
      searchInput: "",
      clearFlagHide: true,
      focusFlag: true,
    });
  },
});
