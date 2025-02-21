var t;
getApp().BasePage({
  data: {
    formData: {
      delivery_score: 0,
      delivery_text_evaluation: "",
      shop_common_star: 0,
      good_quality_star: 0,
      good_package_star: 0,
      shop_text_evaluation: "",
    },
    imgList: [],
    canSub: !1,
  },
  onLoad: function (a) {
    (this.orderId = a.orderId),
      (t = this),
      wx.setNavigationBarTitle({
        title: this.data.Str.evaluation[this.data.lanIndex],
      }),
      this.loadData();
  },
  loadData: function () {
    this.requestWithLoading(
      "order/commentPage",
      { orderId: this.orderId },
      function (a) {
        a && t.setData({ pageData: a });
      }
    );
  },
  initSub: function () {
    0 != this.data.formData.delivery_score ||
    "" != this.data.formData.delivery_text_evaluation ||
    0 != this.data.formData.shop_common_star
      ? (this.data.canSub = !0)
      : (this.data.canSub = !1),
      this.setData({ canSub: this.data.canSub });
  },
  dissatisfiedBtn: function (t) {
    -1 == this.data.formData.delivery_score
      ? (this.data.formData.delivery_score = 0)
      : (this.data.formData.delivery_score = -1),
      this.setData({ formData: this.data.formData }),
      this.initSub();
  },
  satisfyBtn: function (t) {
    1 == this.data.formData.delivery_score
      ? (this.data.formData.delivery_score = 0)
      : (this.data.formData.delivery_score = 1),
      this.setData({ formData: this.data.formData }),
      this.initSub();
  },
  deliveryInput: function (t) {
    (this.data.formData.delivery_text_evaluation = t.detail.value),
      this.setData({ formData: this.data.formData }),
      this.initSub();
  },
  commonStarClick: function (t) {
    var a = t.currentTarget.dataset.index;
    (this.data.formData.shop_common_star = a + 1),
      this.setData({ formData: this.data.formData }),
      this.initSub();
  },
  qualityStarClick: function (t) {
    var a = t.currentTarget.dataset.index;
    (this.data.formData.good_quality_star = a + 1),
      this.setData({ formData: this.data.formData });
  },
  packageStarClick: function (t) {
    var a = t.currentTarget.dataset.index;
    (this.data.formData.good_package_star = a + 1),
      this.setData({ formData: this.data.formData });
  },
  commonInput: function (t) {
    (this.data.formData.shop_text_evaluation = t.detail.value),
      this.setData({ formData: this.data.formData });
  },
  chooseImage: function () {
    var t = this;
    this.isEditing
      ? wx.navigateTo({
          url: "../image-page/image-page?pageIndex=1&id=" + this.productId,
        })
      : wx.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album"],
          success: function (a) {
            0 != t.data.imgList.length
              ? t.setData({
                  imgList: t.data.imgList.concat({
                    url: a.tempFilePaths[0],
                    state: "local",
                  }),
                })
              : t.setData({
                  imgList: [{ url: a.tempFilePaths[0], state: "local" }],
                });
          },
        });
  },
  viewImage: function (t) {
    var a = [t.currentTarget.dataset.url];
    wx.previewImage({ current: a[0], urls: a });
  },
  delImg: function (t) {
    this.isEditing
      ? wx.navigateTo({
          url: "../image-page/image-page?pageIndex=1&id=" + this.productId,
        })
      : (this.data.imgList.splice(t.currentTarget.dataset.index, 1),
        this.setData({ imgList: this.data.imgList }));
  },
  subBtn: function () {
    if (0 == this.data.imgList.length)
      this.requestWithLoading(
        "order/addComment",
        { orderId: this.orderId, formData: JSON.stringify(this.data.formData) },
        function (a) {
          a &&
            t.successToast(function () {
              wx.navigateBack();
            });
        }
      );
    else {
      var a = {};
      (a.formData = JSON.stringify(this.data.formData)),
        (a.token = this.user.getToken()),
        (a.orderId = this.orderId),
        t.setData({ isLoading: !0 }),
        wx.uploadFile({
          url: this.req.getBaseUrl() + "order/addCommentWithImage",
          filePath: this.data.imgList[0].url,
          name: "source",
          formData: a,
          header: { "Content-Type": "multipart/form-data" },
          success: function (a) {
            var i;
            t.setData({ isLoading: !1 });
            try {
              i = JSON.parse(a.data);
            } catch (t) {
              i = !1;
            }
            i && 1 == i.resultCode
              ? t.successToast(function () {
                  wx.navigateBack();
                })
              : t.failureToast();
          },
          fail: function (a) {
            t.failureToast();
          },
          complete: function (t) {},
        });
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
