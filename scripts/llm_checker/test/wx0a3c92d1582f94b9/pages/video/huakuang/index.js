var t = getApp();
Page({
  data: { list: [] },
  onLoad: function (a) {
    var e = this;
    t.postData(t.apiurl + "/api/onGetPictureList", {}, function (t) {
      e.setData({ list: t.data });
    });
  },
  onSelectPicture: function (t) {
    var a = wx.getStorageSync("hk_ids"),
      e = t.currentTarget.dataset.id;
    if (a) {
      var i = [e];
      for (var n in a) a[n] != e && i.push(a[n]);
      wx.setStorageSync("hk_ids", i.splice(0, 3));
    } else wx.setStorageSync("hk_ids", [e]);
    wx.setStorageSync("pictureid", e),
      wx.setStorageSync("huakuangtitle", null),
      wx.navigateBack({ delta: 1 });
  },
});
