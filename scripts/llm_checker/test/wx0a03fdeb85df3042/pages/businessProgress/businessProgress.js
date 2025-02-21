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
    //有无数据标识,默认有数据
    dataFlag: true,
    //办件进度列表
    busiProgress: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    //重新获取用户信息
    userInfo = app.globalData.userInfo;
    idCard = userInfo.certificateNumber;
    //判断是否我的办件
    if (options.myFlag) {
      wx.setNavigationBarTitle({
        title: "我的办件",
      });
    }
    app.selfShowLoading("加载中");
    var speedData = {
      code: idCard,
    };
    //调用封装接口
    this.requestSpeed(speedData);
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
  /**
   * 事件处理函数
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
    var that = this;
    that.setData({
      clearFlagHide: true,
    });
    //输入完成后请求接口
    app.selfShowLoading("加载中");
    var speedData = {
      code: idCard,
      search: that.data.searchInput,
    };
    //调用封装接口
    that.requestSpeed(speedData);
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
  /**
   * 自定义函数
   */
  /**
   * 封装请求办件进程接口
   * @param {Object} postData 请求数据
   */
  requestSpeed: function requestSpeed(postData) {
    var that = this;
    var speedUrl = path + "/api/business/declaration/declare/speed";

    //请求办件进程接口
    app
      .requestUrl(speedUrl, postData, "POST")
      .then(function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.statusCode > 300) {
          app.selfShowModal("获取办件进度列表失败");
          return;
        }
        var data = res.data.data;
        if (data.length != 0 || !data) {
          //有数据 则赋值
          that.setData({
            busiProgress: data,
          });
        } else {
          //没有数据，更新标识
          that.setData({
            dataFlag: false,
          });
        }
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取办件进度列表失败");
      });
  },
});
