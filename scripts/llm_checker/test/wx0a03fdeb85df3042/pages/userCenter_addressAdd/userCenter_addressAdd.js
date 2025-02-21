var app = getApp(),
  path = app.globalData.path;
var userInfo = app.globalData.userInfo,
  idCard = userInfo.certificateNumber;
var common = require("../../utils/verify.js"),
  verify = common.verify;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //地址
    id: "",
    //姓名
    name: "",
    //联系电话
    tel: "",
    //邮政编码
    zipCode: "",
    //省市区
    region: [],
    //详细地址
    detailAddress: "",
    //是否是默认地址
    defaultAddress: false,
    //主题名称
    topic: "",
    //自定义标签名
    customTopic: "",
    //当前选中标签
    curTopic: "",
    //自定义标签显示标识--‘+’，‘input’
    customTopicFlag: true,
    //标签确定按钮标识
    customButtonFlag: true,
  },
  /**
   * 事件处理函数
   * */
  //监听定位按钮点击事件
  bindLocationTap: function bindLocationTap() {
    var that = this;
    // 获取用户的当前权限
    wx.getSetting({
      success: function success(res) {
        // 没有位置授权
        if (!res.authSetting["scope.userLocation"]) {
          // 发起授权
          wx.authorize({
            scope: "scope.userLocation",
            success: function success(res) {
              //授权成功
              var p1 = new Promise(that.chooseLocation);
              p1.then(function (res) {
                //地址不为空，解析地址
                if (!verify.isEmpty(res.address)) {
                  var obj = that.regexAddress(res.address);
                  //赋值
                  that.setData({
                    region: obj.region,
                    detailAddress: obj.detailAddress,
                  });
                }
              });
            },
            fail: function fail(res) {
              wx.showModal({
                title: "位置信息未授权",
                content:
                  '尚未开启政务网APP位置授权，不能使用该功能。请到"设置"中开启',
              });
            },
          });
        } else {
          //位置已授权
          var p1 = new Promise(that.chooseLocation);
          p1.then(function (res) {
            //地址不为空，解析地址
            if (!verify.isEmpty(res.address)) {
              var obj = that.regexAddress(res.address);
              //赋值
              that.setData({
                region: obj.region,
                detailAddress: obj.detailAddress,
              });
            }
          });
        }
      },
    });
  },
  //监听省市区选择
  bindRegionChange: function bindRegionChange(e) {
    this.setData({
      region: e.detail.value,
    });
  },
  //监听姓名输入事件
  bindNameInput: function bindNameInput(e) {
    this.setData({
      name: e.detail.value,
    });
  },
  //监听联系电话输入事件
  bindTelInput: function bindTelInput(e) {
    this.setData({
      tel: e.detail.value,
    });
  },
  //监听邮政编码输入事件
  bindZipCodeInput: function bindZipCodeInput(e) {
    this.setData({
      zipCode: e.detail.value,
    });
  },
  //监听详细地址输入事件
  bindDetailAddressInput: function bindDetailAddressInput(e) {
    this.setData({
      detailAddress: e.detail.value,
    });
  },
  //监听默认地址改变事件
  bindSwitchChange: function bindSwitchChange(e) {
    this.setData({
      defaultAddress: e.detail.value,
    });
  },
  //监听表单提交事件
  bindCompleteSubmit: function bindCompleteSubmit(e) {
    var that = this,
      value = e.detail.value;
    var getName = value.name,
      getTel = value.tel,
      getZipCode = value.zipCode,
      getRegion = that.data.region,
      getDetailAddress = value.detailAddress,
      getDefaultAddress = value.defaultAddress,
      getTopic = that.data.topic;

    //不能为空字段
    if (verify.isEmpty(getName)) {
      wx.showToast({
        icon: "none",
        title: "请输入收货人姓名",
      });
      return;
    }
    if (verify.isEmpty(getTel)) {
      wx.showToast({
        icon: "none",
        title: "请输入联系电话",
      });
      return;
    }
    //手机号验证
    if (!verify.isTel(getTel)) {
      wx.showToast({
        icon: "none",
        title: "手机号格式不正确",
      });
      return;
    }
    if (verify.isEmpty(getZipCode)) {
      wx.showToast({
        icon: "none",
        title: "请输入邮政编码",
      });
      return;
    }
    //邮编验证
    if (!verify.isPostalCode(getZipCode)) {
      wx.showToast({
        icon: "none",
        title: "邮政编码格式不正确",
      });
      return;
    }
    if (verify.isEmpty(getRegion)) {
      wx.showToast({
        icon: "none",
        title: "请选择配送地址",
      });
      return;
    }
    if (verify.isEmpty(getDetailAddress)) {
      wx.showToast({
        icon: "none",
        title: "请输入详细地址",
      });
      return;
    }
    var saveUrl = path + "/api/space/address/add",
      saveData = {
        code: idCard,
        receiverName: getName,
        mobile: getTel,
        province: getRegion[0],
        city: getRegion[1],
        country: getRegion[2],
        address: getDetailAddress,
        zipCode: getZipCode,
        defalutFlag: getDefaultAddress,
        topic: getTopic,
        id: that.data.id,
      },
      saveMethod = "POST";
    //调用新增地址接口
    app
      .requestUrl(saveUrl, saveData, saveMethod)
      .then(function (res) {
        if (res.data.success) {
          wx.navigateBack({
            delta: 1,
          });
        } else {
          app.selfShowModal(res.data.message);
        }
      })
      .catch(function () {
        app.selfShowModal("新增地址接口出错，请联系管理员");
      });
  },
  //监听’家‘标签点击事件
  bindHomeTap: function bindHomeTap(e) {
    var getTopic = e.currentTarget.dataset.topic;
    this.setData({
      topic: getTopic,
      curTopic: 0,
    });
  },
  //监听’公司‘标签点击事件
  bindCompanyTap: function bindCompanyTap(e) {
    var getTopic = e.currentTarget.dataset.topic;
    this.setData({
      topic: getTopic,
      curTopic: 1,
    });
  },
  //监听’学校‘标签点击事件
  bindSchoolTap: function bindSchoolTap(e) {
    var getTopic = e.currentTarget.dataset.topic;
    this.setData({
      topic: getTopic,
      curTopic: 2,
    });
  },
  //监听新增标签事件
  bindCustomAddTap: function bindCustomAddTap() {
    var that = this;
    that.setData({
      customTopicFlag: false,
    });
  },
  //监听输入标签名
  bindCustomTopicInput: function bindCustomTopicInput(e) {
    var value = e.detail.value;
    this.setData({
      customTopic: value,
    });
  },
  //监听标签名输入框聚焦事件
  bindCustomTopicFocus: function bindCustomTopicFocus() {
    this.setData({
      //显示确定按钮
      customButtonFlag: true,
    });
  },
  //监听自定义标签确定按钮
  bindCustomTopicConfirm: function bindCustomTopicConfirm() {
    var getFlag = this.data.customButtonFlag;
    var customTopic = this.data.customTopic;
    if (customTopic.length > 5) {
      wx.showToast({
        icon: "none",
        title: "最多输入5个字哦~",
      });
      return;
    }
    this.setData({
      customButtonFlag: !getFlag,
      curTopic: 3,
      topic: customTopic,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    //重新获取用户信息
    userInfo = app.globalData.userInfo;
    idCard = userInfo.certificateNumber;
    var that = this;

    //上个页面有传参
    if (JSON.stringify(options) != "{}") {
      var curObj = JSON.parse(options.curObj);
      var getRegion = [curObj.province, curObj.city, curObj.country];
      //初始赋值
      that.setData({
        id: curObj.id,
        name: curObj.receiverName,
        tel: curObj.mobile,
        zipCode: curObj.zipCode,
        region: getRegion,
        detailAddress: curObj.address,
        defaultAddress: curObj.flag,
        topic: curObj.theme,
        customTopic: curObj.theme,
      });
      if (!curObj.theme) {
        return;
      }
      //根据主题回显样式
      switch (curObj.theme) {
        case "家":
          that.setData({
            curTopic: 0,
          });
          break;
        case "公司":
          that.setData({
            curTopic: 1,
          });
          break;
        case "学校":
          that.setData({
            curTopic: 2,
          });
          break;
        default:
          that.setData({
            curTopic: 3,
            customTopicFlag: false,
            customButtonFlag: false,
          });
      }
    }
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
   * 自定义事件
   */
  /**
   * 打开地图选择位置函数
   * @param {Object} resolve
   * @param {Object} reject
   */
  chooseLocation: function chooseLocation(resolve, reject) {
    wx.chooseLocation({
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(res) {
        wx.showToast({
          icon: "none",
          text: "选择位置失败",
        });
      },
    });
  },
  /**
   * 根据地址拆分省市区和详细地址
   * @param {Object} address
   */
  regexAddress: function regexAddress(address) {
    var patten = /.+?(省|市|自治区|自治州|县|区)/g;
    var region = address.match(patten);
    //详细地址中有其他关键字的情况
    if (region.length != 3) {
      region = region.splice(0, 3);
    }
    var detailAddress = address.slice(region.join("").length);
    return {
      region: region,
      detailAddress: detailAddress,
    };
  },
});
