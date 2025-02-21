var t;
getApp().BasePage({
  data: { salonName: "", wechat: "", salonFocus: !1, wechatFocus: !1 },
  onLoad: function (a) {
    (t = this), this.setData({ salonFocus: !0 }), this.loadData();
  },
  salonInput: function (t) {
    this.setData({ salonName: t.detail.value });
  },
  wechatInput: function (t) {
    this.setData({ wechat: t.detail.value });
  },
  loadData: function () {
    this.requestWithLoading("userCenter/getSalonInfo", {}, function (a) {
      a && t.setData({ pageData: a });
    });
  },
  subBtn: function (a) {
    console.log(
      "salon name , wechat ",
      this.data.salonName + "," + this.data.wechat
    ),
      this.data.salonName
        ? this.data.wechat
          ? this.requestWithLoading(
              "userCenter/createSalonInfo",
              { salonName: this.data.salonName, wechatNo: this.data.wechat },
              function (a) {
                a &&
                  t.successToast(function () {
                    t.loadData();
                  });
              }
            )
          : this.showT(
              { content: this.data.Str.inputWechat[this.data.lanIndex] },
              function () {
                t.setData({ wechatFocus: !0 });
              }
            )
        : this.showT(
            { content: this.data.Str.inputSalonName[this.data.lanIndex] },
            function () {
              t.setData({ salonFocus: !0 });
            }
          );
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
