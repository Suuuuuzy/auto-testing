var _defineProperty2 = require("../../@babel/runtime/helpers/defineProperty");
var app = getApp(),
  path = app.globalData.path;
var userInfo = app.globalData.userInfo;
var common = require("../../utils/verify.js"),
  verify = common.verify;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //是否可编辑标识，默认可编辑
    isDisabled: false,
    //是否办结标志,默认未办结
    finishFlag: false,
    //标题
    title: "",
    //进度条文字
    progressText: ["申报须知", "开始申报", "申报成功"],
    // 申请人
    //申报主体类型
    applicantType: [],
    //申报主体类型当前选中项,string类型
    applicantTypeIndex: "",
    //项目所在区域
    projectArea: [],
    //项目所在区域当前选中项
    projectAreaIndex: "",
    //申报人证件类型
    applicantPaperType: [],
    //申报人证件类型当前选中项
    applicantPaperTypeIndex: "",
    //经办人
    //经办人证件类型
    linkManPaperType: [],
    //经办人证件类型当前选中项
    linkManPaperTypeIndex: "",
    //申报材料列表
    materialsList: [],
    //申报材料状态
    materialsStateList: [],
    //流水号
    declareId: "",
    //地址详情
    addressDetail: "",
    //提交数据
    postData: {
      declareId: "",
      //业务流水号
      engineeName: "",
      //项目名称
      projectArea: "",
      //项目所在区域
      declarePersonType: "",
      //申报主体类型
      applicantMobileEnp: "",
      //法定代表人联系电话
      operManName: "",
      //法人姓名
      operManCode: "",
      //法人身份证号
      linkManPaperType: "",
      //经办人证件类型
      linkManPaperCode: "",
      //经办人证件号码
      linkManName: "",
      //经办人姓名
      linkManMobile: "",
      //经办人手机号码
      linkManZipCode: "",
      //经办人邮政编码
      linkManAddress: "",
      //经办人地址
      applicantPaperType: "",
      //申报人证件类型
      applicantPaperCode: "",
      //申报人证件号码
      applicantName: "",
      //申请人姓名
      applicantMobile: "",
      //申请人手机
      shxydm: "",
      //社会统一信用代码
      applicantNameEnp: "",
      //申请单位名称
      applicantPhone: "",
      //申请人联系电话
      applicantAddress: "",
      //申请人联系地址
      applicantZipCode: "",
      //申请人邮政编码
      applicantEmail: "",
      //申请人邮箱地址
      isEMSSend: false,
      //是否EMS邮寄
      emsAddrId: "", //邮寄地址id
    },
  },

  /**
   * 事件处理函数
   */
  //监听申报主体类型改变事件
  bindTypeChange: function bindTypeChange(e) {
    this.bindTextChange(e, "applicantTypeIndex");
    var obj1 = this.data.applicantType[e.detail.value];
    //转换为key值
    this.setData({
      "postData.declarePersonType": obj1.passValue,
    });
  },
  //监听项目所在区域改变事件
  bindProjectAreaChange: function bindProjectAreaChange(e) {
    this.bindTextChange(e, "projectAreaIndex");
    var obj2 = this.data.projectArea[e.detail.value];
    this.setData({
      "postData.projectArea": obj2.passValue,
    });
  },
  //监听申报人证件类型改变事件
  bindIdTypeChange: function bindIdTypeChange(e) {
    this.bindTextChange(e, "applicantPaperTypeIndex");
    var obj3 = this.data.applicantPaperType[e.detail.value];
    this.setData({
      "postData.applicantPaperType": obj3.passValue,
    });
  },
  //监听项目名称输入事件
  bindEngineeNameInput: function bindEngineeNameInput(e) {
    this.bindTextChange(e, "postData.engineeName");
  },
  //监听社会统一信用代码输入事件
  bindShxydmInput: function bindShxydmInput(e) {
    this.bindTextChange(e, "postData.shxydm");
  },
  //监听申请单位名称输入事件
  bindApplicantNameEnpInput: function bindApplicantNameEnpInput(e) {
    this.bindTextChange(e, "postData.applicantNameEnp");
  },
  //监听法定代表人姓名输入事件
  bindOperManNameInput: function bindOperManNameInput(e) {
    this.bindTextChange(e, "postData.operManName");
  },
  //监听法人身份证号码输入事件
  bindOperManCodeInput: function bindOperManCodeInput(e) {
    this.bindTextChange(e, "postData.operManCode");
  },
  //监听法人联系电话输入事件
  bindApplicantMobileEnpInput: function bindApplicantMobileEnpInput(e) {
    this.bindTextChange(e, "postData.applicantMobileEnp");
  },
  //监听申报人证件号码输入事件
  bindApplicantPaperCodeInput: function bindApplicantPaperCodeInput(e) {
    this.bindTextChange(e, "postData.applicantPaperCode");
  },
  //监听申报人姓名输入事件
  bindApplicantNameInput: function bindApplicantNameInput(e) {
    this.bindTextChange(e, "postData.applicantName");
  },
  //监听申报人手机号输入事件
  bindApplicantMobileInput: function bindApplicantMobileInput(e) {
    this.bindTextChange(e, "postData.applicantMobile");
  },
  //监听联系电话输入事件
  bindApplicantPhoneInput: function bindApplicantPhoneInput(e) {
    this.bindTextChange(e, "postData.applicantPhone");
  },
  //监听联系地址输入事件
  bindApplicantAddressInput: function bindApplicantAddressInput(e) {
    this.bindTextChange(e, "postData.applicantAddress");
  },
  //监听邮政编码输入事件
  bindApplicantZipCodeInput: function bindApplicantZipCodeInput(e) {
    this.bindTextChange(e, "postData.applicantZipCode");
  },
  //监听邮箱地址输入事件
  bindApplicantEmailInput: function bindApplicantEmailInput(e) {
    this.bindTextChange(e, "postData.applicantEmail");
  },
  //监听经办人证件类型输入事件
  /* bindlinkManPaperTypeChange: function(e) {
  	this.bindTextChange(e, "linkManPaperTypeIndex");
  	let obj4 = this.data.linkManPaperType[e.detail.value];
  	this.setData({
  		"postData.linkManPaperType": obj4.passValue
  	});
  }, */

  //监听经办人证件号码输入事件
  /* bindLinkManPaperCodeInput: function(e) {
  	this.bindTextChange(e, "postData.linkManPaperCode");
  }, */

  //监听经办人姓名输入事件
  /* bindLinkManNameInput: function(e) {
  	this.bindTextChange(e, "postData.linkManName");
  }, */

  //监听经办人手机号输入事件
  /* bindLinkManMobileInput: function(e) {
  	this.bindTextChange(e, "postData.linkManMobile");
  }, */

  //监听经办人邮政编码输入事件
  bindLinkManZipCodeInput: function bindLinkManZipCodeInput(e) {
    this.bindTextChange(e, "postData.linkManZipCode");
  },
  //监听经办人联系地址输入事件
  bindLinkManAddressInput: function bindLinkManAddressInput(e) {
    this.bindTextChange(e, "postData.linkManAddress");
  },
  //监听文件上传事件
  bindFileUploadTap: function bindFileUploadTap(e) {
    //不可编辑时，不能上传图片
    if (this.data.isDisabled) {
      return;
    }
    var idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: "./businessTodo_uploadMaterials?instanceId=" + idx,
    });
  },
  //监听已上传文件点击事件
  bindFileEditTap: function bindFileEditTap(e) {
    //不可编辑时，不能上传图片
    if (this.data.isDisabled) {
      return;
    }
    var idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: "./businessTodo_uploadMaterials?instanceId=" + idx,
    });
  },
  //监听提交事件
  bindInfoSubmit: function bindInfoSubmit(e) {
    var that = this;

    //校验公共字段
    that.verifyCommon().then(function () {
      //申报主体类型--string
      var applicantType = that.data.applicantTypeIndex;

      //自然人校验
      if (applicantType == 0) {
        that.verifyNaturalPerson().then(function () {
          console.log(3);
          //校验必要材料
          that
            .verifyMaterials()
            .then(function (res) {
              //必要材料均已上传
              console.log(that.data.postData);
              //暂存提交数据
              that.saveRequest().then(function () {
                that.submitRequest();
              });
            })
            .catch(function (res) {
              app.selfShowModal(res);
            });
        });
      }
      //法人校验
      if (applicantType && applicantType != 0) {
        that.verifyLegalPerson().then(function () {
          //校验必要材料
          that
            .verifyMaterials()
            .then(function (res) {
              //必要材料均已上传
              console.log(that.data.postData);
              //暂存提交数据
              that.saveRequest().then(function () {
                that.submitRequest();
              });
            })
            .catch(function () {
              app.selfShowModal("接口出错，请联系管理员");
            });
        });
      }
    });
  },
  //监听保存为草稿事件
  bindDraftTap: function bindDraftTap(res) {
    this.saveRequest().then(function () {
      var draftFlag = true;
      wx.navigateTo({
        url:
          "../businessTodo_declareSuccess/businessTodo_declareSuccess?draftFlag=" +
          draftFlag,
      });
    });
  },
  //监听EMS邮寄结果 改变事件
  bindEMSRadiochange: function bindEMSRadiochange(e) {
    console.log(e);
    var isEms = e.detail.value == "true" ? true : false;
    //存储结果值
    this.setData(_defineProperty2({}, "postData.isEMSSend", isEms));
  },
  //监听选择邮寄地址点击事件
  bindAddressTap: function bindAddressTap() {
    //跳转我的地址页面
    wx.navigateTo({
      url: "../userCenter_address/userCenter_address?declareProcessDetail=true",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    console.log(options);
    var that = this;
    //重新获取userInfo
    userInfo = app.globalData.userInfo;
    //判断是不是第一次进入申报
    //不是第一次进入申报
    if (!options.first && JSON.stringify(options) != "{}") {
      var data = JSON.parse(options.data),
        getMaterialsList = JSON.parse(options.annexList);

      //回显材料列表
      if (getMaterialsList) {
        that.setData({
          materialsList: getMaterialsList,
        });
      }
      console.log(data);
      //是历史申报，只需读
      if (options.history) {
        that.setData({
          isDisabled: true,
        });
        //是办结件
        if (options.finishFlag == "true") {
          that.setData({
            finishFlag: true,
          });
        }
      }
      //初始化数据
      var totalData = data.declareInfo,
        //回显的数据
        getapplicantType = data.applicantType,
        //申报主体类型
        getareaMap = data.areaMap,
        //项目所在区域
        getapplicantPaperType = data.applicantPaperType; //申报人证件类型

      //封装选择框键值对
      var conversion = that.converSelectObj(
        getapplicantType,
        getareaMap,
        getapplicantPaperType
      );
      //回显基础数据
      that.setData({
        "postData.declareId": totalData.id,
        declareId: totalData.id,
        //流水号
        applicantType: conversion.applicantType,
        //申报主体类型
        projectArea: conversion.areaMap,
        //项目所在区域
        applicantPaperType: conversion.applicantPaperType,
        //申报人证件类型
        linkManPaperType: conversion.applicantPaperType, //经办人证件类型
      });

      //回显选择框数据
      var passValue1 = totalData.declarePersonType,
        //申报主体类型提交数据
        passValue2 = totalData.projectArea,
        //项目所在区域提交数据
        passValue3 = totalData.applicantPaperType,
        //申报人证件类型提交数据
        passValue4 = totalData.linkManPaperType; //经办人证件类型提交数据
      that.showSelectIndex(passValue1, passValue2, passValue3, passValue4);

      //循环传过来的对象，并赋值给postData
      var oldPostData = that.data.postData;
      for (var key in oldPostData) {
        var temp = key;
        for (var key2 in totalData) {
          if (temp == key2) {
            oldPostData[temp] = totalData[key2];
            break;
          }
        }
      }
      that.setData({
        postData: oldPostData,
      });
      return;
    }

    //是初次加载，请求初始化
    var url = path + "/api/business/declaration/start",
      title = options.title,
      busId = options.busID,
      getData = {
        businessId: busId,
      };
    //保存标题
    that.setData({
      title: title,
    });
    //请求业务申报初始化接口
    app
      .requestUrl(url, getData, "POST")
      .then(function (res) {
        console.log(res);
        var basicInfoList = res.data.data,
          instanceAnnexList = res.data.declareInstanceAnnexList;
        var getapplicantType = basicInfoList.applicantType,
          //申报主体类型
          getareaMap = basicInfoList.areaMap,
          //项目所在区域
          getapplicantPaperType = basicInfoList.applicantPaperType; //申报人证件类型
        //封装选择框键值对
        var conversion = that.converSelectObj(
          getapplicantType,
          getareaMap,
          getapplicantPaperType
        );

        //显示初始列表,固定经办人信息
        that.setData({
          "postData.declareId": basicInfoList.declareId,
          declareId: basicInfoList.declareId,
          //流水号
          materialsList: instanceAnnexList,
          //申报材料列表
          applicantType: conversion.applicantType,
          //申报主体类型
          projectArea: conversion.areaMap,
          //项目所在区域
          applicantPaperType: conversion.applicantPaperType,
          //申报人证件类型
          linkManPaperType: conversion.applicantPaperType,
          //经办人证件类型
          linkManPaperTypeIndex: 0,
          //经办人证件类型-身份证
          "postData.linkManPaperType": "1",
          //经办人身份证类型
          "postData.linkManPaperCode": userInfo.certificateNumber,
          //经办人身份证号
          "postData.linkManName": userInfo.realName,
          //经办人姓名
          "postData.linkManMobile": userInfo.mobile, //经办人手机号码
        });

        that.confirmRequest({
          declareId: basicInfoList.declareId,
        });
      })
      .catch(function () {
        app.selfShowModal("接口出错，请联系管理员");
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    var declareId = this.data.declareId;
    if (declareId) {
      console.log(declareId);
      this.confirmRequest({
        declareId: declareId,
      });
    }
    //查看是否有地址信息
    if (wx.getStorageSync("addressInfo")) {
      var addressInfo = JSON.parse(wx.getStorageSync("addressInfo"));
      console.log(addressInfo);
      //存储信息
      this.setData(
        _defineProperty2(
          _defineProperty2({}, "postData.emsAddrId", addressInfo.getId),
          "addressDetail",
          addressInfo.getAddress
        )
      );
    }
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
  /* 自定义事件 */
  /**
   * @param {Object} event
   * @param {Object} setDataObj
   * 输入框 选择框等输入值改变事件
   */
  bindTextChange: function bindTextChange(event, setDataObj) {
    var that = this;
    var value = event.detail.value.trim();
    that.setData(_defineProperty2({}, setDataObj, value));
  },
  /**
   * 公共字段校验
   */
  verifyCommon: function verifyCommon() {
    var that = this;
    var isEmsSend = that.data.postData.isEMSSend; //获取isEMSSend字段
    return new Promise(function (resolve, reject) {
      if (
        verify.isEmpty(that.data.applicantTypeIndex) &&
        that.data.applicantTypeIndex !== 0
      ) {
        app.selfShowToast("请选择申报主体类型");
        return;
      }
      if (verify.isEmpty(that.data.postData.engineeName)) {
        app.selfShowToast("请输入项目名称");
        return;
      }
      if (
        verify.isEmpty(that.data.projectAreaIndex) &&
        that.data.projectAreaIndex !== 0
      ) {
        app.selfShowToast("请选择项目所在区域");
        return;
      }
      if (
        verify.isEmpty(that.data.linkManPaperTypeIndex) &&
        that.data.linkManPaperTypeIndex !== 0
      ) {
        app.selfShowToast("请选择经办人证件类型");
        return;
      }
      if (verify.isEmpty(that.data.postData.linkManPaperCode)) {
        app.selfShowToast("请输入经办人证件号码");
        return;
      }
      if (verify.isEmpty(that.data.postData.linkManName)) {
        app.selfShowToast("请输入经办人姓名");
        return;
      }
      if (verify.isEmpty(that.data.postData.linkManMobile)) {
        app.selfShowToast("请输入经办人手机号");
        return;
      }
      if (!verify.isTel(that.data.postData.linkManMobile)) {
        app.selfShowToast("经办人手机号格式不正确");
        return;
      }
      if (isEmsSend && verify.isEmpty(that.data.postData.emsAddrId)) {
        app.selfShowModal("请选择邮寄地址");
        return;
      }
      resolve();
    });
  },
  /**
   * 自然人字段校验
   */
  verifyNaturalPerson: function verifyNaturalPerson() {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (
        verify.isEmpty(that.data.applicantPaperTypeIndex) &&
        that.data.applicantPaperTypeIndex !== 0
      ) {
        app.selfShowToast("请选择申报人证件类型");
        return;
      }
      if (verify.isEmpty(that.data.postData.applicantPaperCode)) {
        app.selfShowToast("请输入申报人证件号码");
        return;
      }
      if (verify.isEmpty(that.data.postData.applicantName)) {
        app.selfShowToast("请输入申报人姓名");
        return;
      }
      if (verify.isEmpty(that.data.postData.applicantMobile)) {
        app.selfShowToast("请输入申报人手机号");
        return;
      }
      if (!verify.isTel(that.data.postData.applicantMobile)) {
        app.selfShowToast("申报人手机号格式不正确");
        return;
      }
      resolve();
    });
  },
  /**
   * 企业法人，事业法人字段校验
   */
  verifyLegalPerson: function verifyLegalPerson() {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (verify.isEmpty(that.data.postData.shxydm)) {
        app.selfShowToast("请输入社会统一信用代码");
        return;
      }
      if (verify.isEmpty(that.data.postData.applicantNameEnp)) {
        app.selfShowToast("请输入申请单位名称");
        return;
      }
      if (verify.isEmpty(that.data.postData.operManName)) {
        app.selfShowToast("请输入法定代表人姓名");
        return;
      }
      if (verify.isEmpty(that.data.postData.operManCode)) {
        app.selfShowToast("请输入法人身份证号码");
        return;
      }
      if (!verify.isIDCard(that.data.postData.operManCode)) {
        app.selfShowToast("法人身份证号码格式不正确");
        return;
      }
      if (verify.isEmpty(that.data.postData.applicantMobileEnp)) {
        app.selfShowToast("请输入法人联系电话");
        return;
      }
      if (!verify.isTel(that.data.postData.applicantMobileEnp)) {
        app.selfShowToast("法人联系电话格式不正确");
        return;
      }
      resolve();
    });
  },
  /**
   * 必要材料校验
   */
  verifyMaterials: function verifyMaterials() {
    var that = this;
    var materialsList = that.data.materialsList,
      materialsStateList = that.data.materialsStateList;
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < materialsStateList.length; i++) {
        var tempState = materialsStateList[i],
          tempStateID = tempState.instanceAnnexId;
        //取出是否重要字段
        for (var j = 0; j < materialsList.length; j++) {
          var tempList = materialsList[j];
          if (tempStateID == tempList.instanceAnnexId) {
            tempState.important = tempList.important;
          }
        }
      }
      // console.log(materialsStateList);
      for (var k = 0; k < materialsStateList.length; k++) {
        var temp = materialsStateList[k];
        if (temp.important == "true" && !temp.flag) {
          app.selfShowToast("请上传必要材料");
          return;
        }
      }
      resolve();
    });
  },
  /**
   * 封装暂存接口
   */
  saveRequest: function saveRequest() {
    var that = this;
    return new Promise(function (resolve, reject) {
      //先暂存后提交
      var url = path + "/api/business/declaration/declare/save";
      //调用暂存接口
      app
        .requestUrl(url, that.data.postData, "POST")
        .then(function (res) {
          console.log(res);
          //暂存成功
          if (res.data.success) {
            resolve();
          } else {
            app.selfShowModal("暂存失败，请重试或联系管理员");
            reject();
            return;
          }
        })
        .catch(function () {
          app.selfShowModal("暂存失败，请重试或联系管理员");
          reject();
        });
    });
  },
  /**
   * 封装提交接口
   */
  submitRequest: function submitRequest() {
    var that = this;
    var submitUrl = path + "/api/business/declaration/declare/submit",
      submitData = {
        declareId: that.data.declareId,
      };
    //调用提交接口
    app
      .requestUrl(submitUrl, submitData, "POST")
      .then(function (res) {
        console.log(res);
        if (res.data.success) {
          console.log(res);
          var declareSN = res.data.data.declareSN,
            //业务流水号
            engineeName = res.data.data.engineeName; //项目名称

          //跳转成功页面
          wx.navigateTo({
            url:
              "../businessTodo_declareSuccess/businessTodo_declareSuccess?declareSN=" +
              declareSN +
              "&engineeName=" +
              engineeName,
          });
        } else {
          app.selfShowModal("提交失败,请重试或联系管理员");
        }
      })
      .catch(function () {
        app.selfShowModal("提交失败,请重试或联系管理员");
      });
  },
  /**
   * @param {Object} confirmData
   * 封装确定材料是否已上传接口
   */
  confirmRequest: function confirmRequest(confirmData) {
    var that = this;
    var confirmPath = path + "/api/business/declaration/confirm/annex";
    app
      .requestUrl(confirmPath, confirmData, "POST")
      .then(function (res) {
        console.log(res);
        if (res.data.success) {
          that.setData({
            materialsStateList: res.data.data,
          });
        } else {
          app.selfShowModal(res.data.message);
        }
      })
      .catch(function () {
        app.selfShowModal("接口出错，请联系管理员");
        reject();
      });
  },
  /**
   * 封装选择框对象，转成键值对
   * @param {Object} applicantType 申报主体类型
   * @param {Object} areaMap 项目所在区域
   * @param {Object} applicantPaperType 证件类型
   */
  converSelectObj: function converSelectObj(
    applicantType,
    areaMap,
    applicantPaperType
  ) {
    var newApplicantType = [],
      newAreaMap = [],
      newApplicantPaperType = [];

    //申报主体类型
    for (var appli in applicantType) {
      newApplicantType.push({
        passValue: appli,
        //传值给后台的值
        showValue: applicantType[appli], //显示给用户的值
      });
    }
    //项目所在区域
    for (var area in areaMap) {
      newAreaMap.push({
        passValue: area,
        //传值给后台的值
        showValue: areaMap[area], //显示给用户的值
      });
    }
    //证件类型
    for (var applicantPaper in applicantPaperType) {
      newApplicantPaperType.push({
        passValue: applicantPaper,
        //传值给后台的值
        showValue: applicantPaperType[applicantPaper], //显示给用户的值
      });
    }
    //返回新的选择框数组对象
    return {
      applicantType: newApplicantType,
      areaMap: newAreaMap,
      applicantPaperType: newApplicantPaperType,
    };
  },
  /**
   * 选择框 回显时，根据值更新当前选择项
   * @param {Object} applicantTypeIndex 申报主体类型提交数据
   * @param {Object} areaMapIndex 项目所在区域提交数据
   * @param {Object} applicantPaperTypeIndex 申报人证件类型提交数据
   * @param {Object} linkManPaperTypeIndex 经办人证件类型提交数据
   */
  showSelectIndex: function showSelectIndex(
    getApplicantTypeIndex,
    getAreaMapIndex,
    getApplicantPaperTypeIndex,
    getlinkManPaperTypeIndex
  ) {
    var that = this;
    var applicantType = that.data.applicantType,
      //申报主体类型数组
      areaMap = that.data.projectArea,
      //项目所在区域数组
      applicantPaperType = that.data.applicantPaperType; //证件类型数组

    //申报主体类型
    for (var x = 0; x < applicantType.length; x++) {
      if (getApplicantTypeIndex == applicantType[x].passValue) {
        that.setData({
          applicantTypeIndex: x,
        });
        console.log(that.data.applicantTypeIndex);
        break;
      }
    }
    //项目所在区域
    for (var y = 0; y < areaMap.length; y++) {
      if (getAreaMapIndex == areaMap[y].passValue) {
        that.setData({
          projectAreaIndex: y,
        });
        break;
      }
    }
    //证件类型
    for (var z = 0; z < applicantPaperType.length; z++) {
      //申报人
      if (getApplicantPaperTypeIndex == applicantPaperType[z].passValue) {
        that.setData({
          applicantPaperTypeIndex: z,
        });
      }
      //经办人
      if (getlinkManPaperTypeIndex == applicantPaperType[z].passValue) {
        that.setData({
          linkManPaperTypeIndex: z,
        });
      }
    }
  },
});
