var a;
getApp().BasePage({
  data: { remark: "" },
  onLoad: function (t) {
    (a = this), this.loadDatta();
  },
  loadDatta: function () {
    this.requestWithLoading("mall/getRemark", {}, function (t) {
      t && a.setData({ pageData: t });
    });
  },
  remarkInput: function (a) {
    var t = a.detail.value;
    t && this.setData({ remark: t });
  },
  saveBtn: function (a) {
    var t = this;
    this.data.remark &&
      this.requestWithLoading(
        "mall/addRemark",
        { remark: this.data.remark },
        function (a) {
          var e = getCurrentPages(),
            n = e[e.length - 2];
          n && n.setRemark(t.data.remark), wx.navigateBack({ delta: 1 });
        }
      );
  },
  remarkClick: function (a) {
    var t = a.currentTarget.dataset.remark;
    this.setData({ remark: t }), console.log("remark --\x3e.", t);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
