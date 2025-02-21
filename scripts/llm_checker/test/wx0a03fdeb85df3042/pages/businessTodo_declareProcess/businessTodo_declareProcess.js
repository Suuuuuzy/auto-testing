Page({
  /**
   * 页面的初始数据
   */
  data: {
    //业务列表
    businessInfo: {},
    //进度条文字
    progressText: ["申报须知", "开始申报", "申报成功"],
    //办理条件
    conditionText: "应符合相应办理条件",
    //收取材料
    materialList: [
      {
        materialName: "总平面图",
        necessary: true,
      },
      {
        materialName:
          "太仓市建设工程规划许可证申请表太仓市建设工程规划许可证申请表太仓市建设工程规划许可证申请表太仓市建设工程规划许可证申请表",
        necessary: true,
      },
      {
        materialName: "总平面图",
        necessary: false,
      },
    ],
  },
  /**
   * 事件处理函数
   */
  //监听开始申报按钮点击事件
  bindDeclareTap: function bindDeclareTap() {
    var title = this.data.businessInfo.businessName,
      busId = this.data.businessInfo.id;
    wx.navigateTo({
      url:
        "../businessTodo_declareProcessDetail/businessTodo_declareProcessDetail?title=" +
        title +
        "&busID=" +
        busId +
        "&first=true",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    //获取业务信息
    var businfo = JSON.parse(wx.getStorageSync("businessInfo"));
    //赋值
    this.setData({
      businessInfo: businfo,
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
