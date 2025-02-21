var app = getApp(),
  path = app.globalData.path;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    //头部权力项列表
    itemList: {},
    //底部业务项列表
    businessList: [],
    //权力项id
    itemId: "",
  },
  /**
   * 事件处理函数
   */
  //监听列表项点击事件
  bindBusinessListTap: function bindBusinessListTap(e) {
    var busID = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url:
        "../businessTodo_declareNote/businessTodo_declareNote?busId=" + busID,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    app.selfShowLoading("加载中");
    var that = this;
    var id = options.id,
      title = options.title;
    //保存传过来的数据
    that.setData({
      title: title,
      itemId: id,
    });
    //请求获取权力项信息接口
    var p1 = that.requestItemInfo(),
      p2 = that.requestBusinessList();
    Promise.all([p1, p2])
      .then(function () {
        wx.hideLoading();
      })
      .catch(function () {
        wx.hideLoading();
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
  /**
   * 自定义函数
   */
  /**
   * 封装获取权力项信息接口
   */
  requestItemInfo: function requestItemInfo() {
    var that = this,
      itemId = that.data.itemId,
      itemInfoUrl = path + "/api/approve/item/info?itemId=" + itemId;
    return new Promise(function (resolve, reject) {
      app
        .requestUrl(itemInfoUrl, "", "GET")
        .then(function (res) {
          console.log(res);
          //请求出错
          if (res.statusCode > 300) {
            app.selfShowModal("获取权力项信息失败，请重试或联系管理员");
            reject();
            return;
          }
          //请求成功，赋值
          that.setData({
            itemList: that.changeNull(res.data),
          });
          resolve();
        })
        .catch(function () {
          app.selfShowModal("获取权力项信息失败，请重试或联系管理员");
          reject();
        });
    });
  },
  /**
   * 封装获取业务项信息接口
   */
  requestBusinessList: function requestBusinessList() {
    var that = this,
      itemId = that.data.itemId,
      itemInfoUrl = path + "/api/approve/business/list";
    return new Promise(function (resolve, reject) {
      app
        .requestUrl(
          itemInfoUrl,
          {
            itemId: itemId,
          },
          "POST"
        )
        .then(function (res) {
          //请求出错
          if (res.statusCode > 300) {
            app.selfShowModal("获取业务项信息失败，请重试或联系管理员");
            reject();
            return;
          }
          //请求成功，赋值
          that.setData({
            businessList: res.data,
          });
          resolve();
        })
        .catch(function () {
          app.selfShowModal("获取业务项信息失败，请重试或联系管理员");
          reject();
        });
    });
  },
  /**
   * 遍历对象 值 null 转换为 无
   */
  changeNull: function changeNull(obj) {
    for (var i in obj) {
      if (!obj[i] || obj[i] == null) {
        obj[i] = "无";
      }
    }
    return obj;
  },
});
