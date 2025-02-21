var a;
getApp().BasePage({
  data: {
    formData: { name: "", phone: "", wechat: "", areaName: "" },
    contactPhone: "17509989888",
  },
  onLoad: function (t) {
    (a = this),
      wx.setNavigationBarTitle({
        title: this.data.Str.applyForAgent[this.data.lanIndex],
      });
  },
  bindInputChange: function (a) {
    console.log("e --\x3e>", a);
    var t = a.currentTarget.dataset.type,
      e = a.detail.value;
    switch (t) {
      case "0":
        this.data.formData.name = e;
        break;
      case "1":
        this.data.formData.phone = e;
        break;
      case "2":
        this.data.formData.wechat = e;
        break;
      case "3":
        this.data.formData.areaName = e;
    }
    this.setData({ formData: this.data.formData });
  },
  subBtn: function (t) {
    this.requestWithLoading(
      "common/addAgentInfo",
      this.data.formData,
      function (t) {
        t &&
          a.successToast(function (t) {
            a.setData({
              formData: { name: "", phone: "", wechat: "", areaName: "" },
            });
          });
      }
    );
  },
  callPhone: function (a) {
    var t = a.currentTarget.dataset.phone;
    t && wx.makePhoneCall({ phoneNumber: t });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
