var n = getApp();
Page({
  data: { userinfo: n.userinfo },
  onLoad: function (n) {},
  onComment: function () {
    requirePlugin("wxacommentplugin").openComment({
      success: function (n) {
        console.log("plugin.openComment success", n);
      },
      fail: function (n) {
        console.log("plugin.openComment fail", n);
      },
    });
  },
});
