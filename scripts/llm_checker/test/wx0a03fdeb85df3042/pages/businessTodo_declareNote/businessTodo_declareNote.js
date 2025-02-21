var app = getApp(),
  path = app.globalData.path;
var userinfo = app.globalData.userInfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //navbar标题
    tabTitle: ["服务指南", "办事材料", "常见问题"],
    //当前切换列表
    tabCurrent: 0,
    //导航条位置
    titleBarLeft: 0,
    //单个导航条的位置
    singleBarLeft: 0,
    //单个导航栏宽度
    singleTabWidth: 0,
    //事项ID
    businessId: "",
    //业务项基本信息
    businessInfo: {},
    //指南详情--定值
    serviceDetailList: [
      {
        serviceDetailListId: 1,
        detailListIcon: "../asserts/images/declareNote_sfbz.png",
        detailListText: "收费标准",
      },
      {
        serviceDetailListId: 2,
        detailListIcon: "../asserts/images/declareNote_bllc.png",
        detailListText: "办理流程",
      },
      {
        serviceDetailListId: 3,
        detailListIcon: "../asserts/images/declareNote_sltj.png",
        detailListText: "受理条件",
      },
      {
        serviceDetailListId: 4,
        detailListIcon: "../asserts/images/declareNote_flyj.png",
        detailListText: "法律依据",
      },
    ],
    //常见问题列表
    commonProblemList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    app.selfShowLoading("加载中");
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
    var businessId = options.busId;
    //保存传过来的值
    that.setData({
      businessId: businessId,
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

    //请求业务项基本信息
    that.requestBusinessInfo();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    //更新用户信息
    userinfo = app.globalData.userInfo;
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
   * 事件处理函数
   */
  //监听tab标题点击事件
  tabTitleTap: function tabTitleTap(event) {
    var index = event.currentTarget.dataset.idx,
      singleBarLeft = this.data.singleBarLeft;
    this.setData({
      tabCurrent: index,
      titleBarLeft: singleBarLeft + event.currentTarget.offsetLeft,
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
    });
  },
  //监听指南详情列表点击事件
  serviceDetailListTap: function serviceDetailListTap(event) {
    var index = event.currentTarget.dataset.idx;
    var businessInfo = this.data.businessInfo,
      flowChart = businessInfo.flowChart,
      //办理流程
      condition = businessInfo.condition,
      //受理条件
      byLow = businessInfo.byLow; //法律依据
    var flowChartArr = [];
    //办理流程图字符串转数组
    if (flowChart) {
      flowChartArr = businessInfo.flowChart.split(",");
    }
    //判断点击项
    switch (index) {
      case 1:
        break;
      case 2:
        //办理流程
        if (flowChartArr.length != 0) {
          wx.previewImage({
            urls: flowChartArr,
            current: flowChartArr[0],
          });
        } else {
          app.selfShowToast("暂无办理流程");
        }
        break;
      case 3:
        //受理条件
        if (condition) {
          wx.showModal({
            title: "受理条件",
            content: condition,
            showCancel: false,
          });
        } else {
          app.selfShowToast("暂无受理条件");
        }
        break;
      case 4:
        //法律依据
        if (byLow) {
          wx.showModal({
            title: "法律依据",
            content: byLow,
            showCancel: false,
          });
        } else {
          app.selfShowToast("暂无法律依据");
        }
        break;
      default:
        break;
    }
  },
  //监听预约按钮点击事件
  bindReservationTap: function bindReservationTap() {
    userinfo = app.globalData.userInfo;
    //判断是否实名认证
    if (!userinfo) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url: "../userCenter_verified/userCenter_preVerify",
            });
          }
        }
      );
      return;
    }
    wx.navigateTo({
      url: "../webView/webView?url=https://spj.csdsj.net/applications/z_appointCS/index.html",
    });
  },
  //监听申报按钮点击事件
  bindDeclareTap: function bindDeclareTap() {
    userinfo = app.globalData.userInfo;
    //判断是否实名认证
    if (!app.isUserVerify()) {
      app.selfShowModal(
        "您尚未实名认证，暂不能使用本功能，请前往个人中心进行实名认证",
        function (res) {
          if (res.confirm) {
            //跳转实名认证界面
            wx.navigateTo({
              url: "../userCenter_verified/userCenter_preVerify",
            });
          }
        }
      );
      return;
    }
    var businfo = this.data.businessInfo;
    //存储业务信息
    wx.setStorageSync("businessInfo", JSON.stringify(businfo));
    wx.navigateTo({
      url: "../businessTodo_declareProcess/businessTodo_declareProcess",
    });
  },
  //监听办事材料 示例材料预览点击事件
  bindMaterialPreviewTap: function bindMaterialPreviewTap(e) {
    var that = this;
    var sampleAnnexsArr = e.currentTarget.dataset.imgs;
    var imgsArr = [],
      fileArr = [];
    //预览示例材料
    if (sampleAnnexsArr.length == 0) {
      app.selfShowToast("暂无示例材料");
    } else {
      //获取图片数组，文件数组
      imgsArr = that.splitFileArr(sampleAnnexsArr).imgsArr;
      fileArr = that.splitFileArr(sampleAnnexsArr).fileArr;
      //预览图片
      if (imgsArr.length != 0) {
        wx.previewImage({
          urls: imgsArr,
        });
      }
      //预览文件
      if (fileArr.length != 0) {
        that.previewFile(fileArr);
      }
    }
  },
  /**
   * 自定义函数
   */
  /**
   * 封装请求业务项基本信息
   */
  requestBusinessInfo: function requestBusinessInfo() {
    var that = this;
    var businessId = that.data.businessId,
      businessInfoUrl = path + "/api/approve/business/info";
    app
      .requestUrl(
        businessInfoUrl,
        {
          businessId: businessId,
        },
        "POST"
      )
      .then(function (res) {
        wx.hideLoading();
        console.log(res);
        //请求失败
        if (res.statusCode > 300) {
          app.selfShowModal("获取业务项基本信息失败，请重试或联系管理员");
          return;
        }
        //请求成功
        that.setData({
          businessInfo: that.changeNull(res.data),
        });
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取业务项基本信息失败，请重试或联系管理员");
      });
  },
  /**
   * 根据材料文件数组 分离图片路径和文档路径
   * @param {Object} sampleAnnexsArr
   */
  splitFileArr: function splitFileArr(sampleAnnexsArr) {
    var fileTypeStr = "image/";
    var imgsArr = [],
      fileArr = [];
    for (var i = 0; i < sampleAnnexsArr.length; i++) {
      var temp = sampleAnnexsArr[i];
      if (temp.fileType.indexOf(fileTypeStr) != -1) {
        imgsArr.push(temp.src);
      } else {
        fileArr.push(temp.src);
      }
    }
    return {
      imgsArr: imgsArr,
      fileArr: fileArr,
    };
  },
  /**
   * 预览文件
   * @param {Object} fileArr 文件
   */
  previewFile: function previewFile(fileArr) {
    for (var i = 0; i < fileArr.length; i++) {
      var fileTemp = fileArr[i];
      //下载文档
      wx.downloadFile({
        url: fileTemp,
        success: function success(res) {
          var filePath = res.tempFilePath;
          //打开文档
          wx.openDocument({
            filePath: filePath,
            success: function success(res) {},
            fail: function fail() {
              app.selfShowModal("打开文档失败，请重试");
            },
          });
        },
        fail: function fail() {
          app.selfShowModal("下载文档失败，请重试");
        },
      });
    }
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
