var e,
  a = getApp();
a.BaseComp({
  properties: {},
  data: {
    menuList: [
      {
        ch_name: "管理员",
        uy_name: "باشقۇرغۇچى",
        img_url: "/resource/images/mine/mine_11.png",
        url: "/pkgAdmin/pages/mine/admin/admin-home/admin-home",
        icon: "user-setting",
        color: "#FFA42F",
        flag: "admin",
      },
      {
        ch_name: "订单",
        uy_name: "زاكاس",
        img_url: "/resource/images/mine/mine_1.png",
        icon: "catalog",
        url: "/pages/mine/admin/admin-home/admin-home",
        color: "#FFA42F",
        flag: "order",
      },
      {
        ch_name: "我的收藏",
        uy_name: "ياقتۇرغانلىرىم",
        img_url: "/resource/images/mine/mine_2.png",
        icon: "heart",
        url: "/pages/mine/my-favorites/my-favorites",
        color: "#FFA42F",
        flag: "favorite",
      },
      {
        ch_name: "推荐",
        uy_name: "تەۋسىيە",
        img_url: "/resource/images/mine/mine_3.png",
        icon: "share",
        url: "/pages/mine/shop/my-shop/my-shop",
        color: "#FFA42F",
        flag: "recomend",
      },
    ],
    otherMenuList: [
      {
        ch_name: "配送员",
        uy_name: "يەتكۈزگۈچى",
        img_url: "/resource/images/mine/mine_13.png",
        icon: "member",
        url: "/pkgDelivery/pages/delivery/delivery-home",
        color: "#32D5C8",
        isWeb: !1,
        flag: "delivery",
      },
      {
        ch_name: "我的店",
        uy_name: "دۇكۇنۇم",
        img_url: "/resource/images/mine/mine_5.png",
        icon: "shop-1",
        url: "/pages/mine/shop/my-shop/my-shop",
        color: "#32D5C8",
        isWeb: !1,
        flag: "shop",
      },
      {
        ch_name: "我的地址",
        uy_name: "ئادېرىسىم",
        img_url: "/resource/images/mine/mine_14.png",
        icon: "task-location",
        url: "/pages/mine/my-address/my-address",
        color: "#32D5C8",
        isWeb: !1,
        flag: "address",
      },
      {
        ch_name: "反馈意见",
        uy_name: "تەكلىپ-پىكىر",
        img_url: "/resource/images/mine/mine_7.png",
        icon: "chat-bubble-1",
        url: "/pages/mine/delivery/delivery-home",
        color: "#32D5C8",
        isWeb: !1,
        flag: "feedback",
      },
      {
        ch_name: "服务",
        uy_name: "مۇلازىمەت",
        img_url: "/resource/images/mine/mine_8.png",
        icon: "service",
        url: "/pages/mine/shop/my-shop/my-shop",
        color: "#32D5C8",
        isWeb: !1,
        flag: "service",
      },
      {
        ch_name: "合作加盟",
        uy_name: "ۋاكالەتچى بولاي",
        img_url: "/resource/images/mine/mine_9.png",
        url: "/pages/mine/agent/agent-contact/agent-contact",
        icon: "cooperate",
        isWeb: !1,
        color: "#32D5C8",
        flag: "agent",
      },
      {
        ch_name: "关注公众号",
        uy_name: "سالۇنى قوشۇۋالاي",
        img_url: "/resource/images/mine/mine_10.png",
        url: "https://mp.weixin.qq.com/s/5NvgV2VFM173uibnW9ANYw",
        icon: "task-add-1",
        color: "#32D5C8",
        isWeb: !0,
        flag: "offical",
      },
      {
        ch_name: "关于我们",
        uy_name: "ئېتىبار ھەققىدە",
        img_url: "/resource/images/mine/mine_12.png",
        url: "https://mp.weixin.qq.com/s/8oqc_PNRMgRgQ9sw8aNZyw",
        icon: "earth",
        color: "#32D5C8",
        isWeb: !0,
        flag: "aboutUs",
      },
    ],
    phone: "",
    canIUseGetUserProfile: !1,
  },
  ready: function () {
    if (
      ((e = this),
      this.initLan(),
      wx.getUserProfile && this.setData({ canIUseGetUserProfile: !0 }),
      a.globalData.userInfo &&
        this.setData({ userInfo: a.globalData.userInfo, hasUserInfo: !0 }),
      this.setData({
        lanIndex: this.lan().getLan(),
        lanConst: this.lan().getLanConst(),
        appState: a.globalData.appState,
      }),
      this.loadCouponInfo(),
      a.globalData.homeData)
    ) {
      var n = a.globalData.homeData;
      n && n.pageData && this.setData({ pageData: n.pageData });
    }
  },
  attached: function () {
    if (((e = this), this.initLan(), a.globalData.mineData)) {
      var n = a.globalData.mineData;
      n && n.couponInfo && this.setData({ couponInfo: n.couponInfo });
    }
  },
  detached: function () {
    console.log("home detached--\x3e>", this.data),
      (a.globalData.mineData = this.data);
  },
  methods: {
    lanSwitch: function (e) {
      this.switchLan(), this.triggerEvent("lanSwitch");
    },
    onShow: function () {
      a.globalData.selectArea &&
        this.setData({ selectArea: a.globalData.selectArea });
    },
    refreshAppState: function (a) {
      console.log("mine appState --\x3e>", a),
        e || (e = this),
        a &&
          (e.setData({ appState: a }),
          a.userInfo && e.setData({ userInfo: a.userInfo, hasUserInfo: !0 })),
        this.loadCouponInfo();
    },
    serviceItemClick: function (a) {
      var n = a.currentTarget.dataset.item;
      if ("order" != n.flag) {
        if (n) {
          var t = n.url + "?title=" + n.ch_name;
          wx.navigateTo({ url: t });
        }
      } else e.triggerEvent("mOrder", n);
    },
    otherItemClick: function (e) {
      var a = e.currentTarget.dataset.item;
      if ((console.log("item --\x3e>", a), a))
        if (a.isWeb)
          wx.navigateTo({
            url:
              "/pages/home/web-page/web-page?url=" +
              a.url +
              "&title=" +
              a.ch_name,
          });
        else {
          if ("service" == a.flag || "feedback" == a.flag)
            return void this.setData({ showMakePhone: !0 });
          wx.navigateTo({ url: a.url + "?title=" + a.ch_name });
        }
    },
    closeMakePhone: function (e) {
      this.setData({ showMakePhone: !1 });
    },
    getUserProfile: function (a) {
      var n = this,
        t = a.currentTarget.dataset.type;
      console.log("type ---\x3e>" + t),
        this.user().getUserProfile(a, function (a) {
          a &&
            (e.setData({ userInfo: a, hasUserInfo: !0 }),
            1 == t &&
              wx.navigateTo({
                url:
                  "../mine/user-center/user-finance/user-finance?title=" +
                  n.data.Str.myWallet[n.data.lanIndex],
              }),
            2 == t &&
              wx.navigateTo({
                url:
                  "../mine/my-coupon/my-coupon?title=" +
                  n.data.Str.myCoupon[n.data.lanIndex],
              }));
        });
    },
    financeBtn: function (e) {
      if (
        (console.log("finance btn"),
        this.data.appState && 11 == this.data.appState.phone.length)
      ) {
        var a = this.data.Str.mine[this.data.lanIndex];
        wx.navigateTo({
          url: "/pages/mine/user-center/user-finance/user-finance?title=" + a,
        });
      }
    },
    refresh: function () {
      console.log("mine refresh"), wx.stopPullDownRefresh();
    },
    loadPhone: function () {
      e || (e = this),
        a.globalData.selectArea &&
          this.requestNotLoading(
            "basic/getAreaPhone",
            { areaId: a.globalData.selectArea.id },
            function (a) {
              a && e.setData({ phone: a.phone });
            }
          );
    },
    loadCouponInfo: function () {
      this.requestNotLoading("userCenter/getCouponCount", {}, function (a) {
        a && e.setData({ couponInfo: a });
      });
    },
    managerBtn: function (n) {
      var t = this;
      a.globalData.userInfo
        ? wx.navigateTo({
            url:
              "/pages/mine/admin/admin-home/admin-home?title=" +
              e.data.Str.manager[this.data.lanIndex],
          })
        : this.user().getUserInfo(n, function (n) {
            n
              ? ((a.globalData.userInfo = n),
                e.setData({ userInfo: n, hasUserInfo: !0 }),
                wx.navigateTo({
                  url:
                    "/pages/mine/admin/admin-home/admin-home?title=" +
                    e.data.Str.manager[t.data.lanIndex],
                }))
              : e.showToast({
                  content: e.data.Str.authorzationFail[e.data.lanIndex],
                  icon: "shangxinbiaoqing",
                  color: "grey",
                });
          });
    },
    deliveryBtn: function (n) {
      var t = this,
        o = n.currentTarget.dataset.type;
      a.globalData.userInfo
        ? "mShop" == o
          ? wx.navigateTo({
              url:
                "/pages/mine/shop/my-shop/my-shop?title=" +
                e.data.Str.myShop[this.data.lanIndex],
            })
          : wx.navigateTo({
              url:
                "/pages/mine/delivery/delivery-home?title=" +
                e.data.Str.deliveryMan[this.data.lanIndex],
            })
        : this.user().getUserInfo(n, function (n) {
            n
              ? ((a.globalData.userInfo = n),
                e.setData({ userInfo: n, hasUserInfo: !0 }),
                "mShop" == o
                  ? wx.navigateTo({
                      url:
                        "/pages/mine/shop/my-shop/my-shop?title=" +
                        e.data.Str.myShop[t.data.lanIndex],
                    })
                  : wx.navigateTo({
                      url:
                        "/pages/mine/delivery/delivery-home?title=" +
                        e.data.Str.deliveryMan[t.data.lanIndex],
                    }))
              : e.showToast({
                  content: e.data.Str.authorzationFail[e.data.lanIndex],
                  icon: "shangxinbiaoqing",
                  color: "grey",
                });
          });
    },
    loginBtn: function (e) {
      wx.navigateTo({ url: "/pages/mine/login/wechat-profile" });
    },
    scannerBtn: function () {
      wx.scanCode({
        onlyFromCamera: !0,
        success: function (a) {
          a && a.result && console.log("scanner res --\x3e>", a);
          decodeURIComponent(a.result).split("/")[4];
          e.setData({ scannerRst: a.result });
        },
      });
    },
    checkOrderByBarCode: function (e) {
      var a = this;
      this.requestWithLoading(
        "order/searchOrderByBarCode",
        { barCode: e },
        function (e) {
          e && -1 != e
            ? wx.navigateTo({
                url: "/pages/order/order-detail/order-detail?id=" + e,
              })
            : a.showToast({ content: a.data.Str.noContent[a.data.lanIndex] });
        }
      );
    },
    getUserInfo: function (n, t) {
      console.log("userInfo e", n),
        a.globalData.userInfo
          ? "function" == typeof t && t(a.globalData.userInfo)
          : this.user().getUserInfo(n, function (n) {
              n
                ? ((a.globalData.userInfo = n),
                  e.setData({ userInfo: n, hasUserInfo: !0 }),
                  "function" == typeof t && t(n))
                : e.showToast({
                    content: e.data.Str.authorzationFail[e.data.lanIndex],
                    icon: "error",
                    color: "grey",
                  });
            });
    },
    callPhone: function (e) {
      var a = e.currentTarget.dataset.phone;
      console.log("phone --\x3e>", a),
        a && wx.makePhoneCall({ phoneNumber: a });
    },
  },
});
