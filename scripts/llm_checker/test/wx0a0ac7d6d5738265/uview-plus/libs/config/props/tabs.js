exports.Tabs = {
  tabs: {
    duration: 300,
    list: function () {
      return [];
    },
    lineColor: "#3c9cff",
    activeStyle: function () {
      return { color: "#303133" };
    },
    inactiveStyle: function () {
      return { color: "#606266" };
    },
    lineWidth: 20,
    lineHeight: 3,
    lineBgSize: "cover",
    itemStyle: function () {
      return { height: "44px" };
    },
    scrollable: !0,
    current: 0,
    keyName: "name",
  },
};
