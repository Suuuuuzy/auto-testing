var num;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //标题
    title: "建设工程许可证的核发",
    //项目名称
    engineeName: "",
    //业务号
    declareSN: "",
    //倒计时剩余时间
    restTime: 5,
    //暂存标识
    draftFlag: false,
  },
  /**
   * 事件处理函数
   */
  bindUserCenterTap: function bindUserCenterTap() {
    clearInterval(num);
    wx.switchTab({
      url: "../index/index",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    console.log(options);
    var that = this;
    //暂存成功
    if (options.draftFlag) {
      that.setData({
        draftFlag: true,
      });
    } else {
      that.setData({
        declareSN: options.declareSN,
        engineeName: options.engineeName,
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    var that = this;
    var time = that.data.restTime;
    num = setInterval(function () {
      time--;
      that.setData({
        restTime: time,
      });
      if (time == 1) {
        clearInterval(num);
        wx.switchTab({
          url: "../index/index",
        });
      }
    }, 1000);
  },
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
