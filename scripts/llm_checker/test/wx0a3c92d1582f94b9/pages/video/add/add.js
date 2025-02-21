var t = getApp();
Page({
  data: {
    formData: [
      {
        type: "select",
        title: "样式",
        name: "type",
        value: ["1", "2", "3"],
        msg: ["带图字", "图", "文字"],
        state: "0",
        select_type: "0",
        index: 0,
        i: 0,
      },
      {
        type: "img",
        title: "图标",
        name: "img",
        data: [0, 200, 200, 200, 200],
        is_auth: "0",
        index: 1,
      },
      {
        type: "input",
        title: "文字",
        msg: "例:小葩去水印",
        name: "text",
        value: "",
        state: "1",
        is_auth: "0",
        index: 2,
      },
      {
        type: "select",
        title: "颜色",
        name: "textcolor",
        value: ["#ff0000", "#1A58EA", "#00ff00", "#FEC923", "#000000"],
        msg: ["红色", "蓝色", "绿色", "黄色", "黑色"],
        state: "0",
        select_type: "1",
        index: 3,
      },
      {
        type: "select",
        title: "透明度",
        name: "transparent",
        value: [
          "1",
          "0.9",
          "0.8",
          "0.7",
          "0.6",
          "0.5",
          "0.4",
          "0.3",
          "0.2",
          "0.1",
        ],
        msg: [
          "透明度100%",
          "透明度90%",
          "透明度80%",
          "透明度70%",
          "透明度60%",
          "透明度50%",
          "透明度40%",
          "透明度30%",
          "透明度20%",
          "透明度10%",
        ],
        state: "0",
        select_type: "0",
        index: 4,
        i: 0,
      },
    ],
    list: [],
    selectColor: {},
    icon: "",
  },
  onLoad: function (a) {
    var e = this;
    t.postData(t.apiurl + "/icon/onGetList", {}, function (t) {
      e.setData({ list: t.data });
    });
  },
  onShow: function () {
    var a = wx.getStorageSync("img");
    if ("" != a) {
      var e = this,
        o = a.index,
        i = a.url;
      wx.setStorageSync("img", ""),
        wx.showLoading({ title: "检测图片", mask: !0 }),
        t.base64src(a.url, function (a) {
          t.checkImg(a, function () {
            wx.hideLoading(), wx.setStorageSync("img_bg", a), e.editData(o, i);
          });
        });
    }
  },
  del: function (a) {
    var e = this,
      o = a.currentTarget.dataset.id;
    t.postData(t.apiurl + "/icon/onDel", { id: o }, function (a) {
      t.postData(t.apiurl + "/icon/onGetList", {}, function (t) {
        e.setData({ list: t.data });
      });
    });
  },
  onSubmit: function (a) {
    var e = a.detail.value.type;
    if (3 != e && "" == a.detail.value.img)
      return wx.showToast({ title: "请上传图标", icon: "none" }), !1;
    if (2 != e && "" == a.detail.value.text)
      return wx.showToast({ title: "请输入文字", icon: "none" }), !1;
    var o = this,
      i = a.detail.value;
    wx.showLoading({ title: "正在生成..." }),
      t.postData(
        t.apiurl + "/icon/onCreateImg",
        i,
        function (t) {
          o.setData({ icon: t.data.img });
        },
        function (t) {
          o.setData({ error: t.msg });
        }
      );
  },
  onUpload: function () {
    var a = this;
    t.base64src(a.data.icon, function (e) {
      wx.showLoading({ title: "上传图片", mask: !0 });
      var o = {};
      (o.timestamp = Date.parse(new Date()) / 1e3),
        t.getSign(o).then(function (i) {
          (o.sign = i),
            wx.uploadFile({
              url: "https://47oss.ddfans.com/douyin/uploadIcon.php",
              filePath: e,
              name: "files",
              formData: o,
              success: function (e) {
                wx.hideLoading(),
                  (e.data = JSON.parse(e.data)),
                  "1" == e.data.code
                    ? (((o = {}).icon = e.data.url),
                      (o.opacity =
                        a.data.formData[4].value[a.data.formData[4].i]),
                      t.postData(
                        t.apiurl + "/icon/onAdd",
                        o,
                        function (t) {
                          console.log(t),
                            wx.setStorageSync("icon_id", t.data.id),
                            wx.navigateBack({ delta: 1 });
                        },
                        function (t) {
                          a.setData({ error: t.msg });
                        }
                      ))
                    : wx.showToast({
                        title: e.data.msg + ",请重新上传",
                        icon: "none",
                        mask: !0,
                      });
              },
              fail: function (t) {
                wx.showToast({ title: "请求出错！", icon: "none", mask: !0 });
              },
            });
        });
    });
  },
  clearIcon: function () {
    this.setData({ icon: "" });
  },
  uploadImg: function (t) {
    var a = t.currentTarget.dataset.index;
    wx.navigateTo({
      url:
        "./uploadimg/index?index=" +
        a +
        "&w=" +
        t.currentTarget.dataset.w +
        "&isface=" +
        t.currentTarget.dataset.face +
        "&h=" +
        t.currentTarget.dataset.h +
        "&wOk=" +
        t.currentTarget.dataset.wok +
        "&hOk=" +
        t.currentTarget.dataset.hok +
        ("chooseavatar" == t.type ? "&url=" + t.detail.avatarUrl : ""),
    });
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
  bindPickerChange: function (t) {
    var a = t.target.dataset.index,
      e = t.detail.value,
      o = this.data.formData;
    (o[a].i = e),
      "自定义" == o[a].msg[e] && (o[a].value = ""),
      this.setData({ formData: o });
  },
  bindSelectColor: function (t) {
    console.log(t),
      this.setData({
        selectColor: {
          show: !0,
          color: t.currentTarget.dataset.color,
          index: t.currentTarget.dataset.index,
          selected: t.currentTarget.dataset.selected,
          type: 0,
        },
      });
  },
  selectColor: function (t) {
    console.log(t);
    var a = this.data.selectColor;
    (a.selected = t.currentTarget.dataset.value),
      this.setData({ selectColor: a });
  },
  pickColor: function (t) {
    console.log(t);
    var a = this.data.selectColor;
    (a.selected = t.detail.color), this.setData({ selectColor: a });
  },
  colorPickerHide: function () {
    var t = this.data.formData;
    (t[this.data.selectColor.index].selected = this.data.selectColor.selected),
      this.setData({ formData: t, selectColor: {} });
  },
  colorPicker: function () {
    var t = this.data.selectColor;
    (t.type = 1), this.setData({ selectColor: t });
  },
});
