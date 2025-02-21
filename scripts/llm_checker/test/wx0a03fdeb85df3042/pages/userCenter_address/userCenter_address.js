var app = getApp(),
  path = app.globalData.path;
var userInfo = app.globalData.userInfo,
  idCard = userInfo.certificateNumber;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //我的地址列表
    addressList: [],
    //有无地址标识,默认有
    addressFlag: true,
    //是否是从申请详情页跳转的,默认不是
    declareProcessDetailFlag: false,
  },
  /**
   * 事件处理函数
   */

  //监听使用按钮点击事件
  defaultBtnTap: function defaultBtnTap(event) {
    var that = this,
      idx = event.currentTarget.dataset.idx;
    var oldAddressList = that.data.addressList;
    //调用设置默认地址接口
    that
      .defaultAddressRequest({
        id: idx,
        defalutFlag: true,
      })
      .then(function () {
        //设置默认地址成功，修改页面样式
        //循环查找修改的列表
        for (var i = 0; i < oldAddressList.length; i++) {
          var obj = oldAddressList[i];
          obj.flag = false;
          if (obj.id == idx) {
            obj.flag = true;
          }
        }
        //更新数据--页面上更新
        that.setData({
          addressList: oldAddressList,
        });
      })
      .catch(function () {
        //设置默认地址失败
        app.selfShowModal("设置默认地址接口出错，请联系管理员");
      });
  },
  //监听编辑按钮点击事件
  addressEditTap: function addressEditTap(event) {
    var that = this,
      idx = event.currentTarget.dataset.idx,
      getAddressList = that.data.addressList;

    //循环查找编辑的列表
    for (var i = 0; i < getAddressList.length; i++) {
      var obj = getAddressList[i];
      if (obj.id == idx) {
        wx.navigateTo({
          url:
            "../userCenter_addressAdd/userCenter_addressAdd?curObj=" +
            JSON.stringify(obj),
        });
      }
    }
  },
  //监听删除按钮点击事件
  addressDelTap: function addressDelTap(event) {
    var that = this,
      idx = event.currentTarget.dataset.idx;
    var oldAddressList = that.data.addressList;

    //更新后台数据
    that
      .delAddressRequest({
        id: idx,
      })
      .then(function () {
        //数据库删除成功，开始删除页面数据
        //循环查找删除的列表
        for (var i = 0; i < oldAddressList.length; i++) {
          var obj = oldAddressList[i];
          if (obj.id == idx) {
            oldAddressList.splice(i, 1);
          }
        }
        //更新数据
        that.setData({
          addressList: oldAddressList,
        });
        //没有地址数据，更新标识位
        if (oldAddressList.length == 0) {
          that.setData({
            addressFlag: false,
          });
        }
      })
      .catch(function () {
        app.selfShowModal("删除地址接口出错，请联系管理员");
      });
  },
  //新增地址
  addAddressTap: function addAddressTap() {
    wx.navigateTo({
      url: "../userCenter_addressAdd/userCenter_addressAdd",
    });
  },
  //监听地址列表点击事件
  bindAddressListTap: function bindAddressListTap(e) {
    //是申报详情页跳转的
    if (this.data.declareProcessDetailFlag) {
      //获取地址信息
      var addressInfo = {
        getId: e.currentTarget.dataset.idx,
        //获取地址id
        getAddress: e.currentTarget.dataset.address, //获取地址
      };
      //保存数据
      wx.setStorageSync("addressInfo", JSON.stringify(addressInfo));
      var pages = getCurrentPages(),
        //所有页面栈
        getDelta = 1; //查找距离申报详情的页面栈
      for (var i = pages.length - 1; i < 0; i--) {
        if (
          "pages/businessTodo_declareProcessDetail/businessTodo_declareProcessDetail" ==
          pages[i].route
        ) {
          getDelta = pages.length - 1 - i;
          break;
        }
      }
      //跳转回详情页
      wx.navigateBack({
        delta: getDelta,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var that = this;
    //重新获取用户信息
    userInfo = app.globalData.userInfo;
    idCard = userInfo.certificateNumber;
    //是从申请详情页跳转的,更新状态
    if (options.declareProcessDetail) {
      that.setData({
        declareProcessDetailFlag: true,
      });
    } else {
      //不是从申请详情页跳转的
      that.setData({
        declareProcessDetailFlag: false,
      });
    }
    console.log(that.data.declareProcessDetailFlag);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    app.selfShowLoading("加载中");
    //请求我的地址接口
    this.addressRequest();
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
  /**
   * 自定义函数，我的地址接口
   */
  addressRequest: function addressRequest() {
    var that = this,
      myAddressUrl = path + "/api/space/address/index",
      postData = {
        code: idCard,
      },
      method = "POST";
    app
      .requestUrl(myAddressUrl, postData, method)
      .then(function (res) {
        wx.hideLoading();
        if (res.data.success) {
          var data = res.data.data;
          if (!data || data.length == 0) {
            //没有地址,更新标识
            that.setData({
              addressFlag: false,
            });
            return;
          }
          //有地址，更新地址元素
          that.setData({
            addressFlag: true,
            addressList: res.data.data,
          });
        } else {
          console.log(res.data.message);
          app.selfShowModal("获取地址列表出错，请联系管理员");
        }
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取地址列表出错，请联系管理员");
      });
  },
  /**
   * 设置默认地址接口
   * @param {Object} postData 请求数据
   */
  defaultAddressRequest: function defaultAddressRequest(postData) {
    var myAddressUrl = path + "/api/space/address/flag",
      method = "POST";
    return new Promise(function (resolve, reject) {
      app
        .requestUrl(myAddressUrl, postData, method)
        .then(function (res) {
          if (!res.data.success) {
            reject();
          } else {
            resolve();
          }
        })
        .catch(function () {
          reject();
        });
    });
  },
  /**
   * 删除地址接口
   * @param {Object} postData 请求数据
   */
  delAddressRequest: function delAddressRequest(postData) {
    var that = this;
    var myAddressUrl = path + "/api/space/address/delete",
      method = "POST";
    return new Promise(function (resolve, reject) {
      app
        .requestUrl(myAddressUrl, postData, method)
        .then(function (res) {
          //删除失败，提示
          if (!res.data.success) {
            reject();
          } else {
            resolve();
          }
        })
        .catch(function () {
          reject();
        });
    });
  },
});
