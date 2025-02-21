var _defineProperty2 = require("../../@babel/runtime/helpers/defineProperty");
var app = getApp(),
  path = app.globalData.path;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //搜索框清空图标显示状态,默认不显示
    clearFlagHide: true,
    //获取焦点标识
    focusFlag: false,
    //综合排序标识, 默认true
    synSort: true,
    //权力项列表
    businessList: [],
    //权力项列表无数据
    businessListNoData: "",
    //重组后的权力项列表
    businessPowerList: [],
    //顶部标题当前选中标识
    filterTitleFlag: false,
    //搜索列表提交数据
    postData: {
      bureauCode: "",
      //部门code
      synSort: true,
      //默认综合排序
      curPage: 1,
      pagePer: 12,
      searchTitle: "",
      //查询部门条件
      powerType: "", //权力类型
    },

    //权力类型列表
    powerTypeList: [],
    //部门列表
    departmentList: [],
  },
  /**
   * 事件处理函数
   */
  //监听标题-综合排序 点击事件
  bindSynSortTap: function bindSynSortTap() {
    var that = this;
    var synSort = that.data.synSort;
    //更新排序情况,重置当前页
    that.setData(
      _defineProperty2(
        _defineProperty2(
          _defineProperty2(
            _defineProperty2(
              {
                synSort: !synSort,
              },
              "postData.synSort",
              !synSort
            ),
            "postData.curPage",
            1
          ),
          "businessList",
          []
        ),
        "businessPowerList",
        []
      )
    );
    // console.log(that.data.postData);
    //调用筛选接口
    app.selfShowLoading("加载中");
    that
      .requstItemList(that.data.postData)
      .then(function () {
        wx.hideLoading();
        //调用自定义函数，重组权力项列表
        var businessList = that.data.businessList,
          powerTypeList = that.data.powerTypeList;
        var newBusinessList = that.concatApproveList(
          businessList,
          powerTypeList
        );
        //赋值新的权力项列表
        that.setData({
          businessPowerList: newBusinessList,
        });
      })
      .catch(function () {
        wx.hideLoading();
      });
  },
  //监听标题-筛选 点击事件
  bindFilterTitleTap: function bindFilterTitleTap() {
    var that = this;
    that.setData({
      filterTitleFlag: !that.data.filterTitleFlag,
    });
  },
  //监听权力类型筛选项 点击事件
  bindPowerConditionTap: function bindPowerConditionTap(e) {
    var that = this;
    var index = e.currentTarget.dataset.idx,
      //index
      powerTypeList = that.data.powerTypeList;
    var checked = powerTypeList[index].ischecked,
      //当前选中状态
      objFilter = "powerTypeList[" + index + "].ischecked";
    //更新选中状态
    that.setData(_defineProperty2({}, objFilter, !checked));
  },
  //监听部门列表筛选项 点击事件
  bindDepartmentConditionTap: function bindDepartmentConditionTap(e) {
    var that = this;
    var index = e.currentTarget.dataset.idx,
      //index
      departmentList = that.data.departmentList;
    var checked = departmentList[index].ischecked,
      //当前选中状态
      objFilter = "departmentList[" + index + "].ischecked";
    //置空原有状态
    for (var i = 0; i < departmentList.length; i++) {
      departmentList[i].ischecked = false;
    }
    //更新选中状态
    that.setData(
      _defineProperty2(
        {
          departmentList: departmentList,
        },
        objFilter,
        !checked
      )
    );
  },
  //监听筛选重置按钮点击事件
  bindFilterResetTap: function bindFilterResetTap() {
    //重置ischeked属性值
    this.reorganizeFilterList();
  },
  //监听筛选确定按钮点击事件
  bindFilterSumitTap: function bindFilterSumitTap() {
    var that = this;
    that.setData({
      filterTitleFlag: false,
      businessPowerList: [],
      businessList: [],
    });
    //获取筛选条件
    var filterData = that.getFilterData();
    //赋值请求值
    var oldData = that.data.postData;
    oldData.curPage = 1;
    oldData.bureauCode = filterData.bureauCode;
    oldData.powerType = filterData.powertype;
    console.log(oldData);
    //调用筛选接口
    app.selfShowLoading("加载中");
    that
      .requstItemList(oldData)
      .then(function () {
        wx.hideLoading();
        //调用自定义函数，重组权力项列表
        var businessList = that.data.businessList,
          powerTypeList = that.data.powerTypeList;
        var newBusinessList = that.concatApproveList(
          businessList,
          powerTypeList
        );
        //赋值新的权力项列表
        that.setData({
          businessPowerList: newBusinessList,
        });
      })
      .catch(function () {
        wx.hideLoading();
      });
  },
  //监听业务项点击事件
  bindBusinessListTap: function bindBusinessListTap(e) {
    var id = e.currentTarget.dataset.idx,
      title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: "./businessTodo_detailList?id=" + id + "&title=" + title,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var that = this;
    that.reorganizeFilterList();
    //赋值上一级传递的数据
    //获取部门列表
    var departmentList = JSON.parse(options.departmentList);
    //判断上一级是 部门跳转 或 查询跳转
    if (options.id) {
      //部门跳转
      var id = options.id;
      this.setData(
        _defineProperty2(
          _defineProperty2({}, "postData.bureauCode", id),
          "departmentList",
          departmentList
        )
      );
    } else {
      //查询跳转
      //更新提交内容,清空原数据
      that.setData(
        _defineProperty2(
          _defineProperty2(
            _defineProperty2(
              {
                clearFlagHide: true,
              },
              "postData.searchTitle",
              options.searchCont
            ),
            "businessList",
            []
          ),
          "businessPowerList",
          []
        )
      );
    }
    //获取权力项列表，权力类型列表
    app.selfShowLoading("加载中");
    var p1 = that.requestPowerTypeList(),
      p2 = that.requstItemList(that.data.postData);
    Promise.all([p1, p2])
      .then(function () {
        wx.hideLoading();
        //调用自定义函数，重组权力项列表
        var businessList = that.data.businessList,
          powerTypeList = that.data.powerTypeList;
        var newBusinessList = that.concatApproveList(
          businessList,
          powerTypeList
        );
        that.setData({
          businessPowerList: newBusinessList,
        });
      })
      .catch(function (res) {
        wx.hideLoading();
        console.log(res);
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
  onReachBottom: function onReachBottom() {
    app.selfShowLoading("加载中");
    var that = this;
    var postData = that.data.postData;
    postData.curPage += 1;
    console.log(postData);
    that
      .requstItemList(postData)
      .then(function () {
        wx.hideLoading();
        //调用自定义函数，重组权力项列表
        var businessList = that.data.businessList,
          powerTypeList = that.data.powerTypeList;
        var newBusinessList = that.concatApproveList(
          businessList,
          powerTypeList
        );
        that.setData({
          businessPowerList: newBusinessList,
        });
      })
      .catch(function () {
        wx.hideLoading();
      });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {},
  /* 
   事件处理函数
   */
  //监听业务办理项点击事件
  businessTodoTap: function businessTodoTap() {
    wx.navigateTo({
      url: "../businessTodo_matters/businessTodo_matters",
    });
  },
  // 监听输入框输入：添加清除按钮
  searchInput: function searchInput(event) {
    //更新清除按钮状态
    this.setData({
      clearFlagHide: false,
    });
  },
  //监听键盘高度变化：判断是否添加清除按钮
  searchBoardheightchange: function searchBoardheightchange() {
    var inputValue = this.data.postData.searchTitle;
    this.setData({
      clearFlagHide: inputValue ? false : true,
    });
  },
  //监听点击完成按钮：删除清除按钮,查询数据
  searchConfirm: function searchConfirm(event) {
    var value = event.detail.value; //输入框内容
    //调用查询函数
    this.searchFun(value);
  },
  //监听清除按钮点击事件：更新value值，删除清除按钮，调起键盘
  clearTap: function clearTap() {
    this.setData(
      _defineProperty2(
        _defineProperty2(
          _defineProperty2({}, "postData.searchTitle", ""),
          "clearFlagHide",
          true
        ),
        "focusFlag",
        true
      )
    );
  },
  /**
   * 自定义事件
   */
  /**
   * 封装获取权力项列表
   * @param {Object} getData: 发送的数据
   */
  requstItemList: function requstItemList(getData) {
    var that = this;
    var listUrl = path + "/api/approve/item/list";
    return new Promise(function (resolve, reject) {
      app
        .requestUrl(listUrl, getData, "POST")
        .then(function (res) {
          // console.log(res);
          //接口出错 返回
          if (res.statusCode > 300) {
            app.selfShowModal("获取权力项列表失败");
            return;
          }
          //拼接列表数据
          var oldList = that.data.businessList;
          var newList = oldList.concat(res.data);
          newList = that.uniqueArr(newList);
          console.log(newList);

          //没有数据 提示无数据
          if (!newList.length) {
            that.setData({
              businessList: newList,
              businessListNoData: "暂无数据",
            });
            resolve();
            return;
          }
          //有数据 赋值
          that.setData({
            businessList: newList,
            businessListNoData: "",
          });
          resolve();
        })
        .catch(function (res) {
          app.selfShowModal("获取权力项列表失败");
          wx.hideLoading();
          reject();
        });
    });
  },
  /**
   * 封装获取权力类型列表
   */
  requestPowerTypeList: function requestPowerTypeList() {
    var that = this,
      powerTypeListUrl = path + "/api/approve/powerType/list";
    return new Promise(function (resolve, reject) {
      //请求接口
      app
        .requestUrl(powerTypeListUrl, "", "GET")
        .then(function (res) {
          console.log(res);
          //接口出错，提示并返回
          if (res.statusCode > 300) {
            app.selfShowModal("获取权力项类型列表失败，请联系管理员");
            reject();
            return;
          }
          //接口正常，数据赋值
          that.setData({
            powerTypeList: res.data,
          });
          resolve();
        })
        .catch(function () {
          app.selfShowModal("获取权力项类型列表失败，请联系管理员");
          reject();
        });
    });
  },
  /**
   * 将 权力项类型列表 拼接到 权力项列表中
   * @param {Object} itemList 权力项列表
   * @param {Object} powerTypeList 权力项类型列表
   */
  concatApproveList: function concatApproveList(itemList, powerTypeList) {
    for (var i = 0; i < itemList.length; i++) {
      var itemTemp = itemList[i];
      for (var j = 0; j < powerTypeList.length; j++) {
        var powerTypeTemp = powerTypeList[j];
        if (itemTemp.powerType == powerTypeTemp.typeNum) {
          Object.assign(itemTemp, powerTypeTemp);
          break;
        }
      }
    }
    return itemList;
  },
  /**
   * 根据id去重数组
   * @param {Object} arr 数组
   */
  uniqueArr: function uniqueArr(arr) {
    var res = new Map();
    return arr.filter(function (arrItem) {
      return !res.has(arrItem.id) && res.set(arrItem.id, 1);
    });
  },
  /**
   * 重组筛选条件列表
   */
  reorganizeFilterList: function reorganizeFilterList() {
    var that = this,
      powerTypeList = that.data.powerTypeList,
      //权力项列表
      departmentList = that.data.departmentList; //部门列表

    for (var i = 0; i < powerTypeList.length; i++) {
      powerTypeList[i].ischecked = false;
    }
    for (var j = 0; j < departmentList.length; j++) {
      departmentList[j].ischecked = false;
    }
    //赋值重组后的列表
    that.setData({
      powerTypeList: powerTypeList,
      departmentList: departmentList,
    });
  },
  /**
   * 根据用户筛选值获取查询条件
   */
  getFilterData: function getFilterData() {
    var that = this;
    var powerTypeList = that.data.powerTypeList,
      //权力类型列表
      departmentList = that.data.departmentList; //部门列表
    var bureauCode = "",
      powertype = [];
    // 循环部门列表，保存选中部门id
    for (var i = 0; i < departmentList.length; i++) {
      var temp = departmentList[i];
      if (temp.ischecked) {
        bureauCode = temp.id;
        break;
      }
    }
    //循环权力项列表，保存选中项typeNum
    for (var j = 0; j < powerTypeList.length; j++) {
      var powerTemp = powerTypeList[j];
      if (powerTemp.ischecked) {
        powertype.push(powerTemp.typeNum);
      }
    }
    //返回筛选数据
    if (powertype.length == 0) {
      return {
        bureauCode: bureauCode,
        powertype: "",
      };
    } else {
      return {
        bureauCode: bureauCode,
        powertype: powertype.join(","),
      };
    }
  },
  /**
   * 封装查询函数,显示查询结果
   * @param {Object} searchCont:查询内容
   */
  searchFun: function searchFun(searchCont) {
    var that = this;
    //更新提交内容,清空原数据
    that.setData(
      _defineProperty2(
        _defineProperty2(
          _defineProperty2(
            {
              clearFlagHide: true,
            },
            "postData.searchTitle",
            searchCont
          ),
          "businessList",
          []
        ),
        "businessPowerList",
        []
      )
    );
    //查询权力项列表并合并权力项
    app.selfShowLoading("加载中");
    that
      .requstItemList(that.data.postData)
      .then(function () {
        wx.hideLoading();
        //调用自定义函数，重组权力项列表
        var businessList = that.data.businessList,
          powerTypeList = that.data.powerTypeList;
        var newBusinessList = that.concatApproveList(
          businessList,
          powerTypeList
        );
        //赋值新的权力项列表
        that.setData({
          businessPowerList: newBusinessList,
        });
      })
      .catch(function () {
        wx.hideLoading();
      });
  },
});
