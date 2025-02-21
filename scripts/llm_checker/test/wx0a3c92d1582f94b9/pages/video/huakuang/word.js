var t = getApp();
Page({
  data: {
    formData: [
      {
        type: "input",
        title: "标题",
        msg: "例:小葩去水印",
        name: "text",
        value: "",
        state: "1",
        is_auth: "0",
        index: 0,
      },
    ],
    data: {},
  },
  onLoad: function (a) {
    var e = this;
    wx.setStorageSync("huakuangtitle", null),
      t.postData(
        t.apiurl + "/api/onGetPictureInfo",
        { id: a.id },
        function (t) {
          e.setData({ data: t.data });
        }
      );
  },
  onSubmit: function (t) {
    if ("" == t.detail.value.text)
      return wx.showToast({ title: "请输入标题", icon: "none" }), !1;
    var a = wx.getStorageSync("hk_ids");
    if (a) {
      var e = [this.data.data.id];
      for (var i in a) a[i] != this.data.data.id && e.push(a[i]);
      wx.setStorageSync("hk_ids", e.splice(0, 3));
    } else wx.setStorageSync("hk_ids", [this.data.data.id]);
    wx.setStorageSync("pictureid", this.data.data.id),
      wx.setStorageSync("huakuangtitle", t.detail.value.text),
      wx.navigateBack({ delta: 2 });
  },
  editData: function (t, a) {
    var e = this.data.formData;
    (e[t].value = a), this.setData({ formData: e });
  },
  bindinput: function (t) {
    var a = t.target.dataset.index,
      e = t.detail.value;
    this.editData(a, e);
  },
});
