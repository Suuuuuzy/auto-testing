var app = getApp(),
  path = app.globalData.path,
  bureauCode = app.globalData.bureauCode;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //搜索框清空图标显示状态,默认不显示
    clearFlagHide: true,
    //获取焦点标识
    focusFlag: false,
    //部门列表
    businessTodoList: [],
    //部门列表无数据提示
    businessTodoListNoData: "",
    //查询部门名称
    searchInput: "",
  },
  /**
   * 事件处理函数
   */
  //监听部门列表点击事件
  bindBusinessTodoTap: function bindBusinessTodoTap(e) {
    var id = e.currentTarget.dataset.idx;
    var businessTodoList = this.data.businessTodoList;
    //跳转下一页
    wx.navigateTo({
      url:
        "./businessTodo_detail?id=" +
        id +
        "&departmentList=" +
        JSON.stringify(businessTodoList),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    wx.showLoading({
      title: "加载中",
    });
    //获取部门列表
    this.requestList();
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
  /* 
   事件处理函数
   */
  // 监听输入框输入：添加清除按钮
  searchInput: function searchInput(event) {
    var value = event.detail.value;
    //更新清除按钮状态,保存查询项
    this.setData({
      clearFlagHide: false,
      searchInput: value,
    });
    //获取部门列表
    // this.requestList();
  },

  //监听键盘高度变化：判断是否添加清除按钮
  searchBoardheightchange: function searchBoardheightchange() {
    var inputValue = this.data.searchInput;
    this.setData({
      clearFlagHide: inputValue ? false : true,
    });
  },
  //监听点击完成按钮：删除清除按钮,跳转下一页查询结果
  searchConfirm: function searchConfirm(event) {
    //查询内容
    var searchCont = event.detail.value;
    //部门列表
    var businessTodoList = this.data.businessTodoList;
    //更新清除按钮状态
    this.setData({
      clearFlagHide: true,
    });
    wx.navigateTo({
      url:
        "./businessTodo_detail?searchCont=" +
        searchCont +
        "&departmentList=" +
        JSON.stringify(businessTodoList),
    });
  },
  //监听清除按钮点击事件：更新value值，删除清除按钮，调起键盘
  clearTap: function clearTap() {
    this.setData({
      searchInput: "",
      clearFlagHide: true,
      focusFlag: true,
    });
  },
  /**
   * 自定义函数
   */
  requestList: function requestList() {
    var that = this;
    //获取部门列表
    var searchTitle = that.data.searchInput,
      listUrl = path + "/api/approve/bureau/list",
      listData = {
        bureauCode: bureauCode,
        searchTitle: searchTitle,
      };
    app
      .requestUrl(listUrl, listData, "POST")
      .then(function (res) {
        wx.hideLoading();
        // console.log(res);
        //接口出错 返回
        if (res.statusCode > 300) {
          app.selfShowModal("获取部门列表失败");
          return;
        }
        //没有数据 提示无数据
        if (!res.data.length) {
          that.setData({
            businessTodoListNoData: "暂无数据",
            businessTodoList: res.data,
          });
          return;
        }
        //有数据 赋值
        that.setData({
          businessTodoList: res.data,
          businessTodoListNoData: "",
        });
      })
      .catch(function () {
        wx.hideLoading();
        app.selfShowModal("获取部门列表失败");
      });
  },
});
