Component({
  data: {
    // 显示标志
    showFlag: true,
    selected: 1,
    color: "#303030",
    selectedColor: "#3159fa",
    list: [
      {
        pagePath: "../tab_applications/tab_applications",
        text: "应用服务",
        iconPath: "../pages/asserts/images/tabbar-more2.png",
        selectedIconPath: "../pages/asserts/images/tabbar-more_h2.png",
      },
      {
        pagePath: "../index/index",
        text: "",
        iconPath: "../pages/asserts/images/tabbar-home.png",
        selectedIconPath: "../pages/asserts/images/tabbar-home.png",
      },
      {
        pagePath: "../userCenter/userCenter",
        text: "我的",
        iconPath: "../pages/asserts/images/tabbar-user2.png",
        selectedIconPath: "../pages/asserts/images/tabbar-user_h2.png",
      },
    ],
  },
  attached: function attached() {},
  methods: {
    switchTab: function switchTab(e) {
      var data = e.currentTarget.dataset;
      var url = data.path;
      wx.switchTab({
        url: url,
      });
      this.setData({
        selected: data.index,
      });
    },
  },
});
