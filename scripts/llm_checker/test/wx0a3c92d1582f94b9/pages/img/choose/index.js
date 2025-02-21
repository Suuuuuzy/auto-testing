var e = getApp();
Page({
  data: {},
  onLoad: function (e) {},
  longPicSew: function (o) {
    wx.chooseImage({
      count: 9,
      sourceType: ["album"],
      sizeType: ["compressed"],
      fail: function (e) {},
      success: function (o) {
        var a = o.tempFilePaths;
        (e.images = a), wx.navigateTo({ url: "./choose?mode=smart&seo=1" });
      },
    });
  },
  onShareAppMessage: function (e) {
    return {
      title: "苹果用这个拼长图|长截图超好用，真心推荐！",
      path: "/pages/img/img?type=8777",
      imageUrl: "/images/icon-choose.jpg",
    };
  },
});
