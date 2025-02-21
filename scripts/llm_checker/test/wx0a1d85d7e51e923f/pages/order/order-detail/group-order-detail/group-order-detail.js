var a;
getApp().BasePage({
  data: {},
  onLoad: function (t) {
    (a = this),
      (this.id = t.id),
      (this.isManager = t.isManager),
      console.log("isManager --\x3e>", this.isManager),
      (this.dialog = this.selectComponent("#dialog")),
      this.setData({ isManager: this.isManager }),
      this.loadData();
  },
  loadData: function () {
    this.requestWithLoading(
      "group/groupOrderDetail",
      { id: this.id },
      function (t) {
        t &&
          (a.setData({ pageData: t }),
          a.user && a.user.getId() == t.user_id && a.setData({ isOwner: !0 }));
      }
    );
  },
  cancelBtn: function (t) {
    var n = this;
    this.setData({
      dialogContent: this.data.Str.realyCancelOrder[this.data.lanIndex],
    }),
      this.dialog.show(function (t) {
        a.requestWithLoading(
          "order/cancelOrder",
          { orderId: n.data.pageData.id },
          function (t) {
            t &&
              a.showT(
                {
                  content: a.data.Str.cancelOrderSucc[a.data.lanIndex],
                  icon: "success",
                  color: "cyan",
                },
                function (t) {
                  (a.page = 1), a.loadData();
                }
              );
          }
        );
      });
  },
  confirmBtn: function (t) {
    var n = this;
    this.setData({
      dialogContent: this.data.Str.realyConfirm[this.data.lanIndex],
    }),
      this.dialog.show(function (t) {
        a.requestWithLoading(
          "admin/completeShopOrder",
          { orderId: n.data.pageData.id, shopId: n.data.pageData.shop_id },
          function (t) {
            t &&
              t &&
              a.successToast(function () {
                a.loadData();
              });
          }
        );
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
