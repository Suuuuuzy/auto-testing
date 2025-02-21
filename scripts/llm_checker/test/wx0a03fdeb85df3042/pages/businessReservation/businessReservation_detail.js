var app = getApp(),
  path3 = app.globalData.path3,
  bureauCode = app.globalData.bureauCode;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //中心窗口数
    totalWindows: "",
    //当前排队人数
    currentWaiter: "",
    //主体列表
    detailList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    app.selfShowLoading("加载中");
    var that = this;
    var passdata = JSON.parse(options.passdata),
      getQueueAreaDetailUrl = path3 + "/api/queue/getQueueAreaDetail",
      getQueueAreaDetailData = {
        areaId: passdata.id,
        bureauCode: bureauCode,
      };
    //根据传过来的参数赋值
    that.setData({
      totalWindows: passdata.totalWindows,
      currentWaiter: passdata.currentWaiter,
    });

    //查看区域下的排队详情
    app
      .requestUrl(getQueueAreaDetailUrl, getQueueAreaDetailData, "GET")
      .then(function (res) {
        wx.hideLoading();
        console.log(res);
        //获取列表出错
        if (res.statusCode > 300) {
          app.selfShowModal("获取区域排队情况列表失败");
          return;
        }
        //赋值
        that.setData({
          detailList: res.data.data,
        });
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取区域排队情况列表失败");
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
});
