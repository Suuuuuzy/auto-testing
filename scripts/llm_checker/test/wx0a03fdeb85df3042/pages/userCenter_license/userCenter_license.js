var app = getApp(),
  path3 = app.globalData.path3;
var userInfo = app.globalData.userInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //证照列表
    licenseList: [],
    //只有证照链接的列表
    changedLicenseList: [],
    //当前证照选中项，默认第一个
    activeIndex: 0,
  },
  /**
   * 事件处理函数
   */

  //监听证照左侧列表点击事件--更改右侧内容
  bindLicenseListTap: function bindLicenseListTap(e) {
    var idx = e.currentTarget.dataset.idx;
    //更改当前选中项
    this.setData({
      activeIndex: idx,
    });
  },
  //监听图片点击事件--预览图片
  bindLicenseImgTap: function bindLicenseImgTap(e) {
    var currentIndex = this.data.activeIndex,
      //当前证照分类index
      imgIndex = e.currentTarget.dataset.idx,
      //当前选中图片index
      licenseList = this.data.licenseList,
      //证照列表
      changedLicenseList = this.data.changedLicenseList; //重组证照列表

    //预览图片
    wx.previewImage({
      urls: changedLicenseList[currentIndex].imgs,
      current: changedLicenseList[currentIndex].imgs[imgIndex],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var that = this;
    app.selfShowLoading("加载中");
    //调用我的证照接口
    userInfo = app.globalData.userInfo;
    var cardId = userInfo.certificateNumber,
      listUrl = path3 + "/api/license/personal/license/list?cardId=" + cardId;
    app
      .requestUrl(listUrl, "", "GET")
      .then(function (res) {
        wx.hideLoading();
        //请求出错--提示
        if (res.statusCode > 300) {
          app.selfShowModal("获取电子证照列表失败，请联系管理员");
          return;
        }
        //赋值
        var licenseList = res.data,
          changedLicenseList = that.changeLicenseList(licenseList);
        that.setData({
          licenseList: licenseList,
          changedLicenseList: changedLicenseList,
        });
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取电子证照列表失败，请联系管理员");
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
   * 提取证照列表的图片，并重组
   * @param {Object} licenseList 证照列表
   */
  changeLicenseList: function changeLicenseList(licenseList) {
    for (var i = 0; i < licenseList.length; i++) {
      var temp = licenseList[i].file;
      var imgList = [];
      for (var j = 0; j < temp.length; j++) {
        imgList.push(temp[j].url);
      }
      licenseList[i].imgs = imgList;
    }
    return licenseList;
  },
});
