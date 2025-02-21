var t,
  a = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("../../../@babel/runtime/helpers/createForOfIteratorHelper"),
  o = (t = require("../../../utils/util")) && t.__esModule ? t : { default: t };
var s,
  n,
  c = getApp();
c.BasePage({
  data: {
    tableInfo: [
      { uy_name: "تاماق بۇيرۇش", ch_name: "订餐", icon: "mall_shop_tab_1" },
      { uy_name: "مۇلازىمەت", ch_name: "服务", icon: "mall_shop_tab_2" },
    ],
    evaluationTypes: [
      { id: 1, uy_name: "ھەممىسى", ch_name: "全部", count: 0 },
      { id: 2, uy_name: "ياخشى ئىنكاس", ch_name: "好评", count: 0 },
      { id: 3, uy_name: "ناچار ئىنكاس", ch_name: "差评", count: 0 },
      { id: 4, uy_name: "رەسىملىك ئىنكاس", ch_name: "有图评价", count: 0 },
    ],
    selectCatIndex: 0,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: !0,
    cartList: {
      shop: null,
      allCount: 0,
      allPrice: 0,
      actualPrice: 0,
      totalPrice: 0,
      deliveryFee: 0,
      packingFee: 0,
      canOrder: !1,
      tableNum: 0,
      cartItems: [],
      cashBackAmount: 0,
      lakeFee: 0,
      hasDynamicPrice: !1,
      discountAmount: 0,
      discountDeliveryFee: 0,
      shopCoupons: [],
      shopCouponSelectedItem: null,
      discountGoodAmount: 0,
    },
    hideCurveGood: !0,
    scroll: { scrollTop: 0, hasScrollTop: !1 },
    noMore: !1,
    STabCur: 0,
    scrollLeft: 0,
    pageHeights: { topViewHeight: 0, bottomViewHeight: 0, scrollHeight: 0 },
    selectGoodId: -1,
    selectGoodItem: { item: null, index: -1, _index: -1 },
    animationImgUrl: "../../../resource/images/animation/shoping-cart/1.png",
    showRotate: !1,
    goodSpecificationItem: {
      item: null,
      index: -1,
      _index: -1,
      items: [],
      amount: 0,
      selectIndexs: [],
      count: 0,
    },
    bottomDialogAnimationData: {},
    evluationTypeIndex: 0,
    customBarHeight: c.globalData.CustomBar,
    statusBarHeight: c.globalData.StatusBar,
    Custom: c.globalData.Custom,
    shopStars: 5,
    location: null,
  },
  onLoad: function (t) {
    if (
      ((s = this),
      (this.lan = t.lan),
      (this.shopId = t.shopId),
      (this.tableNum = t.tableNum),
      this.shopId && this.cart.removeShopItems(this.shopId),
      (this.catId = t.catId),
      (this.goodId = t.goodId),
      (this.typeId = t.typeId),
      console.log("catId ---\x3e>", this.catId),
      this.goodId && this.setData({ selectGoodId: this.goodId }),
      console.log("selectGoodId ---\x3e>", this.data.selectGoodId),
      c.globalData.location &&
        (this.setData({ location: c.globalData.location.location }),
        console.log("location --??", c.globalData.location)),
      (this.dialog = this.selectComponent("#dialog")),
      t.scene)
    ) {
      var a = decodeURIComponent(t.scene);
      (this.shopId = a.split("&")[0]),
        (this.lan = a.split("&")[1]),
        (this.tableNum = a.split("&")[2]);
    }
    if (t.q || c.globalData.scanResult) {
      var e = decodeURIComponent(t.q ? t.q : c.globalData.scanResult);
      e &&
        ((this.shopId = this.tool.getUrlParam("shopId", e)),
        (this.tableNum = this.tool.getUrlParam("tableNum", e))),
        (c.globalData.scanResult = null);
    }
    this.tableNum &&
      ((this.data.cartList.tableNum = this.tableNum),
      this.setData({ cartList: this.data.cartList }),
      this.initTableNum()),
      this.lan && this.initShowLan(this.lan),
      this.initSharedUser(t),
      (this.busPos = {}),
      (this.busPos.x = 0.9 * c.globalData.wWidth),
      (this.busPos.y = 0.9 * c.globalData.wHeight),
      this.shopId && this.loadData();
  },
  initSharedUser: function (t) {
    if (
      ((this.shareUserId = 0),
      t.shareUserId && (this.shareUserId = t.shareUserId),
      t.scene)
    ) {
      var a = decodeURIComponent(t.scene);
      this.shareUserId = a.split("&")[0];
    }
    this.shareUserId && (c.globalData.shareUserId = this.shareUserId);
  },
  initShowLan: function (t) {
    console.log("lan ---\x3e>>", t),
      1 == t
        ? this.data.isUy || this.switchLan()
        : 2 == t && this.data.isUy && this.switchLan();
  },
  initTableNum: function () {
    var t = this.data.cartList.tableNum;
    if ((console.log("tableNum --\x3e>", t), t)) {
      var a = t.toString();
      1 == a.length && ((a = "0" + a), console.log("strNum ---\x3e>", a));
      var e = a.split("");
      (this.data.cartList.tableNums = e),
        this.setData({ cartList: this.data.cartList });
    }
  },
  STabSelect: function (t) {
    this.setData({
      STabCur: t.currentTarget.dataset.id,
      scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
    }),
      1 == this.data.STabCur ? this.loadServiceInfo() : this.loadShopInfo();
  },
  loadData: function () {
    var t = this;
    this.requestWithLoading(
      "mall/_mallHome",
      { shopId: this.shopId },
      function (a) {
        if (a) {
          if (
            (1 != a.hasUser &&
              s.user.callLogin(function (t) {
                console.log("callLogin --\x3e>", t), s.user.setToken();
              }),
            a.shop)
          ) {
            s.tableNum &&
              (console.log("shop --\x3e>", s.tableNum),
              a.userLan
                ? s.initShowLan(a.userLan)
                : s.initShowLan(a.shop.default_lan + 1)),
              a.hasTable &&
                ((s.data.cartList.tableNum = a.hasTable),
                s.setData({ cartList: s.data.cartList })),
              s.data.isUy
                ? wx.setNavigationBarTitle({ title: a.shop.uy_name })
                : wx.setNavigationBarTitle({ title: a.shop.ch_name });
            var e = s.cart.getShopItem(a.shop.id);
            e && (s.data.cartList.cartItems = e),
              a.shop && s.initShopImage(a.shop),
              (s.data.cartList.shop = a.shop),
              a.shop.can_delivery &&
                !t.tableNum &&
                ((s.data.cartList.deliveryFee = a.shop.delivery_fee),
                a.shop.activity_delivery_fee &&
                  a.shop.activity_delivery_fee.length > 0 &&
                  a.shop.activity_delivery_fee[0].activity_delivery_fee <
                    a.shop.delivery_fee &&
                  (s.data.cartList.discountDeliveryFee = (
                    parseFloat(a.shop.delivery_fee) -
                    parseFloat(
                      a.shop.activity_delivery_fee[0].activity_delivery_fee
                    )
                  ).toFixed(2)),
                a.shop.coupons &&
                  a.shop.coupons.length > 0 &&
                  ((s.data.cartList.shopCoupons = a.shop.coupons),
                  s.data.cartList.shopCoupons.sort(function (t, a) {
                    return t.coupon_limit - a.coupon_limit;
                  }),
                  console.log("coupns --\x3e", s.data.cartList.shopCoupons))),
              s.setData({ cartList: s.data.cartList }),
              a.shop.mall_cat &&
                (a.shop.mall_cat.push({
                  id: -1,
                  uy_name: s.data.Str.shopEvaluation[1],
                  ch_name: s.data.Str.shopEvaluation[0],
                }),
                a.shop.mall_cat.push({
                  id: 0,
                  uy_name: s.data.Str.shopDetails[1],
                  ch_name: s.data.Str.shopDetails[0],
                })),
              s.catId &&
                a.shop.mall_cat &&
                a.shop.mall_cat.forEach(function (t, a) {
                  s.catId == t.id &&
                    ((s.data.selectCatIndex = a), (s.catId = null));
                });
          }
          s.setData({ pageData: a, selectCatIndex: s.data.selectCatIndex }),
            s.STabSelect({
              currentTarget: {
                dataset: { id: s.tableNum ? a.shop.scan_tab_cur : 0 },
              },
            });
        }
      }
    );
  },
  loadServiceInfo: function () {
    this.requestWithLoading(
      "shop/shopServiceHome",
      { shopId: this.shopId },
      function (t) {
        t &&
          (t.serviceLog &&
            t.serviceLog.length > 0 &&
            t.serviceLog.forEach(function (t) {
              var a = s.tool.getSecond(t.created_at),
                e = "";
              if ((a = parseInt(a)) > 3600)
                e = s.data.isUy ? "1 سائەت ئىلگىرى" : "1个小时之前";
              else if (a <= 3600 && a >= 60) {
                var i = parseInt(a / 60);
                e = s.data.isUy ? i + " مىنۇت ئىلگىرى" : i + " 分钟之前";
              } else e = s.data.isUy ? a + " سىكۇنىت ئىلگىرى" : a + " 秒之前";
              t.time = e;
              var o = t.table_num;
              if (o) {
                var n = o.toString();
                1 == n.length && (n = "0" + n);
                var c = n.split("");
                t.tableNums = c;
              }
            }),
          console.log("e --\x3e>", t),
          s.setData({ shopServiceData: t }));
      }
    );
  },
  loadShopInfo: function () {
    this.data.pageData &&
      this.data.pageData.shop.mall_cat &&
      this.requestWithLoading(
        "mall/_getMallShop",
        {
          shopId: this.data.pageData.shop.id,
          catId: this.data.pageData.shop.mall_cat[this.data.selectCatIndex].id,
          type: this.data.selectCatIndex + 1,
        },
        function (t) {
          if (t) {
            var a = t.shop.good_type,
              e = [];
            if (a) {
              for (var i = 0, o = a.length; i < o; i++)
                0 != a[i].goods.length && e.push(a[i]);
              for (
                var n = s.data.cartList.cartItems, c = 0, l = n.length;
                c < l;
                c++
              )
                e.length > n[c].index &&
                  e[n[c].index].goods.length > n[c].indexx &&
                  e[n[c].index].goods[n[c].indexx].id == n[c].item.id &&
                  -1 != e[n[c].index].goods[n[c].indexx].in_stock &&
                  ((e[n[c].index].goods[n[c].indexx].count = n[c].count),
                  (e[n[c].index].count =
                    e[n[c].index].count > 0
                      ? parseInt(e[n[c].index].count) + parseInt(n[c].count)
                      : parseInt(n[c].count)),
                  (n[c].item = e[n[c].index].goods[n[c].indexx]));
              s.typeId
                ? t.shop.good_type.forEach(function (t, a) {
                    t.id == s.typeId &&
                      setTimeout(function () {
                        s.setData({
                          MainCur: a,
                          TabCur: a,
                          VerticalNavTop: 50 * a,
                        }),
                          (s.typeId = null);
                      }, 300);
                  })
                : s.setData({ MainCur: 0, TabCur: 0, VerticalNavTop: 0 });
            }
            s.setData({ list: e, shopInfo: t }),
              s.goodId &&
                setTimeout(function () {
                  console.log("fuck"),
                    e.forEach(function (t, a) {
                      t.goods &&
                        t.goods.length > 0 &&
                        t.goods.forEach(function (t, e) {
                          t.id == s.goodId &&
                            s.goodItemClick({
                              currentTarget: {
                                dataset: { item: t, index: a, _index: e },
                              },
                            });
                        });
                    }),
                    (s.goodId = null);
                }, 250),
              console.log("what--\x3e>" + s.goodId),
              s.queryTopView(),
              s.initTime(),
              s.initCartList();
          }
        }
      );
  },
  catClick: function (t) {
    var a = t.currentTarget.dataset.index;
    this.setData({ selectCatIndex: a, selectGoodId: -1 }),
      a < this.data.pageData.shop.mall_cat.length - 2
        ? this.loadShopInfo()
        : -1 == this.data.pageData.shop.mall_cat[a].id &&
          this.loadShopEvaluation();
  },
  loadShopEvaluation: function (t) {
    var a = this;
    this.requestWithLoading(
      "mall/mallShopEvaluation",
      { shopId: this.data.pageData.shop.id },
      function (t) {
        t &&
          (s.setData({ shopEvaluationData: t, evluationTypeIndex: 0 }),
          t.all &&
            (a.data.evaluationTypes.forEach(function (a) {
              1 == a.id
                ? (a.count = t.all.allCount)
                : 2 == a.id
                ? (a.count = t.godEvaluation)
                : 3 == a.id
                ? (a.count = t.all.allCount - t.godEvaluation)
                : 4 == a.id && (a.count = t.imageEvaluation);
            }),
            s.setData({ evaluationTypes: s.data.evaluationTypes })));
      }
    );
  },
  evaluationTypeClick: function (t) {
    var a = t.currentTarget.dataset.item,
      e = t.currentTarget.dataset.index;
    s.setData({ evluationTypeIndex: e }),
      a && s.loadShopEvaluationWithType(a.id);
  },
  loadShopEvaluationWithType: function (t) {
    this.requestWithLoading(
      "mall/getShopEvaluation",
      { shopId: this.data.pageData.shop.id, type: t },
      function (t) {
        t &&
          ((s.data.shopEvaluationData.evaluation = t),
          s.setData({ shopEvaluationData: s.data.shopEvaluationData }));
      }
    );
  },
  tabSelect: function (t) {
    this.setData({
      TabCur: t.currentTarget.dataset.id,
      MainCur: t.currentTarget.dataset.id,
      VerticalNavTop: 50 * (t.currentTarget.dataset.id - 1),
    });
  },
  VerticalMain: function (t) {
    this.initPageTop(t);
    var a = this.data.list,
      e = 0;
    if (this.data.load) {
      for (
        var i = function (t) {
            wx.createSelectorQuery()
              .select("#main-" + a[t].id)
              .fields({ size: !0 }, function (i) {
                i && ((a[t].top = e), (e += i.height), (a[t].bottom = e));
              })
              .exec();
          },
          o = 0;
        o < a.length;
        o++
      )
        i(o);
      this.setData({ load: !1, list: a });
    }
    for (var s = t.detail.scrollTop + 20, n = 0; n < a.length; n++)
      if (s > a[n].top && s < a[n].bottom)
        return (
          this.setData({ VerticalNavTop: 50 * (a[n].id - 1), TabCur: a[n].id }),
          !1
        );
  },
  initPageTop: function (t) {
    if (!this.tableNum) {
      var a = t.detail.scrollTop;
      !this.data.scroll.hasScrollTop &&
        a > 30 &&
        ((this.data.scroll.hasScrollTop = !0),
        this.queryTopView(),
        this.setData({ scroll: this.data.scroll }));
    }
  },
  queryTopView: function () {
    setTimeout(function () {
      var t = wx.createSelectorQuery();
      t.select("#topView").boundingClientRect(),
        t.exec(function (t) {
          console.log("query res", t),
            console.log("wHeight --\x3e>", c.globalData.wHeight),
            t &&
              t[0].height &&
              c.globalData.wHeight &&
              c.globalData.pRatio &&
              (t[0].bottom &&
                ((s.data.pageHeights.scrollHeight =
                  c.globalData.wHeight -
                  t[0].height -
                  120 / c.globalData.pRatio -
                  c.globalData.StatusBar -
                  44 -
                  10),
                (s.data.pageHeights.topViewHeight = t[0].height)),
              s.setData({ pageHeights: s.data.pageHeights }),
              console.log("pageHeights ---\x3e>", s.data.pageHeights));
        });
    }, 300);
  },
  clearCount: function () {
    clearInterval(n), (n = null);
  },
  initTime: function () {
    var t = this;
    if (this.data.list && this.data.list.length > 0) {
      for (var a = [], e = this.data.list, i = 0, o = e.length; i < o; i++) {
        for (
          var n = [],
            c = function () {
              var o = e[i].goods[l];
              (o.price = parseFloat(o.price)),
                t.initActivity(o)
                  ? ((o.isActivity = 1),
                    a.some(function (t) {
                      return t.id == o.id;
                    }) || a.push(o))
                  : ((o.isActivity = 0), n.push(o));
            },
            l = 0,
            d = e[i].goods.length;
          l < d;
          l++
        )
          c();
        e[i].goods = n;
      }
      a.length > 0 &&
        e.unshift({
          id: -1,
          uy_name: "پائالىيەت🔥",
          ch_name: "活动🔥",
          goods: a,
        });
      var r = [];
      e.forEach(function (t) {
        0 != t.goods.length && r.push(t);
      }),
        s.setData({ list: r }),
        console.log("initList --\x3e>", this.data.list);
    }
  },
  initActivity: function (t) {
    if (!t.activity_start_time || !t.activity_end_time || t.activity_price <= 0)
      return !1;
    var a = o.default.formatTime(new Date()),
      e = o.default.formatTime(new Date(t.activity_start_time)),
      i = o.default.formatTime(new Date(t.activity_end_time));
    return a > e && a < i;
  },
  _addBtn: function (t) {
    console.log("_addBtn --\x3e>", t),
      console.log("bus --\x3e>", s.busPos),
      this.addBtn(t);
  },
  addBtn: function (t) {
    console.log(t);
    var a = t.currentTarget.dataset,
      e = a.index,
      i = a._index,
      o = a.item;
    e instanceof Number || (e = parseFloat(e)),
      i instanceof Number || (i = parseFloat(i));
    var s = t.currentTarget.dataset.type,
      n = t.currentTarget.dataset.cindex,
      c = this.data.cartList.cartItems[n],
      l = !1;
    console.log("index --\x3e>", e),
      console.log("_index --\x3e>", i),
      console.log("item --\x3e>", o),
      2 == s &&
        (this.data.goodSelectItem &&
          (this.data.goodSelectItem.count
            ? this.data.goodSelectItem.count++
            : (this.data.goodSelectItem.count = 1)),
        this.setData({ goodSelectItem: this.data.goodSelectItem })),
      console.log("cIndex --\x3e>", n),
      console.log("cartItem ---\x3e>", c),
      n >= 0 && c.specificationIndexs && (l = !0),
      l
        ? (this.data.list[e].goods[i].allCount &&
            (this.data.list[e].goods[i].allCount++, this.data.list[e].count++),
          c.count++)
        : this.data.list[e].goods[i].count
        ? (this.data.list[e].goods[i].count++, this.data.list[e].count++)
        : this.data.list[e].goods[i].starting_count > 1
        ? ((this.data.list[e].goods[i].count =
            this.data.list[e].goods[i].starting_count),
          (this.data.list[e].count = this.data.list[e].goods[i].starting_count))
        : ((this.data.list[e].goods[i].count = 1),
          (this.data.list[e].count = 1)),
      l ? this.initCartList() : this.initCartList(e, i, o, 1),
      this.setData({ list: this.data.list });
  },
  removeBtn: function (t) {
    var a = t.currentTarget.dataset.index,
      e = t.currentTarget.dataset._index,
      i = t.currentTarget.dataset.item;
    a instanceof Number || (a = parseFloat(a)),
      e instanceof Number || (e = parseFloat(e));
    var o = t.currentTarget.dataset.type,
      s = t.currentTarget.dataset.cindex,
      n = this.data.cartList.cartItems[s],
      c = !1;
    console.log("cIndex --\x3e>", s),
      console.log("cartItem ---\x3e>", n),
      2 == o &&
        (this.data.goodSelectItem &&
          (this.data.goodSelectItem.count > 1
            ? this.data.goodSelectItem.count--
            : (this.data.goodSelectItem.count = 0)),
        this.setData({ goodSelectItem: this.data.goodSelectItem })),
      s >= 0 && n.specificationIndexs && (c = !0),
      c
        ? (this.data.list[a].goods[e].allCount > 1
            ? this.data.list[a].goods[e].allCount--
            : (this.data.list[a].goods[e].allCount = 0),
          n.count > 1 ? n.count-- : this.data.cartList.cartItems.splice(s, 1))
        : (this.data.list[a] &&
            this.data.list[a].goods[e] &&
            this.data.list[a].goods[e].count >= 1 &&
            (this.data.list[a].goods[e].starting_count > 1 &&
            this.data.list[a].goods[e].count <=
              this.data.list[a].goods[e].starting_count
              ? (this.data.list[a].goods[e].count = 0)
              : this.data.list[a].goods[e].count--),
          this.data.list &&
            this.data.list[a].count >= 1 &&
            this.data.list[a].count--),
      c ? this.initCartList() : this.initCartList(a, e, i, 0),
      this.setData({ list: this.data.list });
  },
  viewImg: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.previewImage({ urls: [a] });
  },
  cleanCart: function (t) {
    for (var a in this.data.list)
      for (var e in ((this.data.list[a].count = 0), this.data.list[a].goods))
        this.data.list[a].goods[e].good_specification.length > 0
          ? (this.data.list[a].goods[e].allCount = 0)
          : (this.data.list[a].goods[e].count = 0);
    (this.data.cartList.cartItems = []),
      this.setData({ list: this.data.list, modalName: "" }),
      this.initCartList();
  },
  initCartList: function (t, a, e, o) {
    var n = 0,
      c = 0,
      l = !1,
      d = 0,
      r = this.data.cartList.cartItems,
      h = this.data.pageData.shop.mall_cat,
      u = this.data.pageData.shop,
      g = 0;
    for (var p in h) h[p].count = 0;
    for (var m in (h.forEach(function (t) {
      t.count = 0;
    }),
    r)) {
      if (
        (r[m].index == t &&
          r[m].indexx == a &&
          r[m].item.id == e.id &&
          ((l = !0),
          1 == o
            ? r[m].count++
            : (console.log("cartIndex --\x3e>", r[m].item.starting_count),
              1 == r[m].count ||
              (r[m].item.starting_count > 1 &&
                r[m].count <= r[m].item.starting_count)
                ? r.splice(m, 1)
                : r[m].count--)),
        r[m])
      ) {
        n += r[m].count;
        var f = r[m].item.price * r[m].count;
        r[m].item.isActivity > 0 &&
          (f =
            r[m].activity_count > 0 && r[m].count > r[m].activity_count
              ? r[m].item.activity_price * r[m].activity_count +
                r[m].item.price * (r[m].count - r[m].activity_count)
              : r[m].item.activity_price * r[m].count),
          r[m].specificationIndexs && (f = r[m].amount * r[m].count),
          (c = (parseFloat(c) + parseFloat(f)).toFixed(2)),
          (g = (
            parseFloat(g) + parseFloat(r[m].item.packing_fee * r[m].count)
          ).toFixed(2));
      }
      if (h)
        for (var v in h)
          r[m] &&
            h[v].id == r[m].item.cat_id &&
            (h[v].count =
              h[v].count > 0
                ? parseInt(h[v].count) + parseInt(r[m].count)
                : parseInt(r[m].count));
    }
    if (!l && e) {
      var I = e.starting_count > 1 ? e.starting_count : 1;
      if (1 == o) {
        var _ = 0;
        e.isActivity > 0 && (_ = 1),
          r.push({
            index: t,
            indexx: a,
            count: I,
            item: e,
            activity_count: e.activity_limit_count,
            is_activity: _,
          }),
          (g = (parseFloat(g) + parseFloat(e.packing_fee * I)).toFixed(2)),
          (n += I),
          (c = (
            parseFloat(c) +
            parseFloat(
              (this.data.list[t].goods[a].isActivity > 0
                ? this.data.list[t].goods[a].activity_price
                : this.data.list[t].goods[a].price) * I
            )
          ).toFixed(2)),
          h.forEach(function (t) {
            t.id == e.cat_id && (t.count = t.count + I);
          });
      }
    }
    (this.data.cartList.allCount = n),
      (this.data.cartList.allPrice = c),
      (this.data.cartList.packingFee = g),
      c &&
        u.userPercent &&
        (d = parseFloat((c * u.userPercent) / 100).toFixed(2)),
      (this.data.cartList.cashBackAmount = d),
      (this.data.cartList.discountAmount = 0),
      (this.data.cartList.shopCouponSelectedItem = null);
    var x,
      y = i(this.data.cartList.shopCoupons);
    try {
      for (y.s(); !(x = y.n()).done; ) {
        var D = x.value;
        console.log("coupnItem -", D),
          D &&
            D.coupon_limit > 0 &&
            parseFloat(c) >= parseFloat(D.coupon_limit) &&
            ((this.data.cartList.discountAmount = parseFloat(D.coupon_amount)),
            (this.data.cartList.shopCouponSelectedItem = D));
      }
    } catch (t) {
      y.e(t);
    } finally {
      y.f();
    }
    console.log("discountAmount => " + this.data.cartList.discountAmount),
      this.data.cartList.allPrice >=
      parseFloat(this.data.pageData.shop.starting_price)
        ? (this.data.cartList.canOrder = !0)
        : (this.data.cartList.canOrder = !1),
      (this.data.lakeFee = parseFloat(
        this.data.pageData.shop.starting_price - this.data.cartList.allPrice
      ).toFixed(2));
    var S,
      b = 0,
      L = i(r);
    try {
      for (L.s(); !(S = L.n()).done; ) {
        var T = S.value;
        T.count > 0 &&
          T.item &&
          (b = (parseFloat(b) + parseFloat(T.item.price * T.count)).toFixed(2));
      }
    } catch (t) {
      L.e(t);
    } finally {
      L.f();
    }
    (this.data.cartList.discountGoodAmount = (b - c).toFixed(2)),
      (this.data.cartList.totalPrice = parseFloat(b)),
      (this.data.cartList.actualPrice = parseFloat(
        c - this.data.cartList.discountAmount
      ).toFixed(2)),
      console.log("allToatlPrice=" + b),
      console.log("actuaslPrice ->" + this.data.cartList.actualPrice),
      (this.data.cartList.cartItems = r),
      (this.data.pageData.shop.mall_cat = h),
      this.setData({
        cartIndexs: r,
        cartList: this.data.cartList,
        pageData: this.data.pageData,
        lakeFee: this.data.lakeFee,
      }),
      console.log("totalPrice = ", this.data.cartList.cartItems),
      s.initDynamicDeliveryFee();
  },
  initDynamicDeliveryFee: function () {
    var t = this.data.pageData,
      a = this.data.cartList;
    if (t.shop.can_delivery && t.deliveryFee && !this.tableNum) {
      var e = t.shop.delivery_fee,
        i = parseFloat(t.deliveryFee.ending_price),
        o = parseFloat(a.allPrice);
      o < i / 3
        ? (e = t.deliveryFee.delivery_1_fee)
        : o >= i / 3 && o < (2 * i) / 3
        ? (e = t.deliveryFee.delivery_2_fee)
        : o >= (2 * i) / 3 &&
          o < i &&
          ((e = t.deliveryFee.delivery_3_fee),
          console.log("delivery3Fee --\x3e>", e)),
        console.log("it is ok --\x3e>", a.allPrice < i),
        console.log("ok --\x3e>", e),
        (a.deliveryFee = e),
        (a.hasDynamicPrice = !0),
        this.setData({ cartList: a });
    }
  },
  selectSpecification: function (t) {
    var a = t.currentTarget.dataset.item,
      e = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.indexx,
      o = 0;
    if (a) {
      o = a.price;
      var s = [];
      if (a.good_specification) {
        for (var n in a.good_specification) {
          var c = !1;
          for (var l in s)
            a.good_specification[n].specification_type_id ==
              s[l].specification_type_id &&
              (s[l].items.push(a.good_specification[n].info), (c = !0));
          c ||
            ((a.good_specification[n].info.selected = 1),
            (a.good_specification[n].items = [a.good_specification[n].info]),
            s.push(a.good_specification[n]),
            a.good_specification[n].info.price > 0 &&
              (o = a.good_specification[n].info.price));
        }
        console.log("items --\x3e>", s),
          s.sort(function (t, a) {
            return t.type.id - a.type.id;
          }),
          (this.data.goodSpecificationItem.items = s);
      }
      (this.data.goodSpecificationItem.item = a),
        (this.data.goodSpecificationItem.index = e),
        (this.data.goodSpecificationItem._index = i),
        (this.data.goodSpecificationItem.amount = o),
        console.log(
          "specificationItem --\x3e>",
          this.data.goodSpecificationItem
        ),
        this.setData({
          modalName: "showSpecification",
          goodSpecificationItem: this.data.goodSpecificationItem,
        }),
        this.initSpecificationIndexs();
    }
  },
  selectTagItem: function (t) {
    var a = t.currentTarget.dataset.index,
      e = t.currentTarget.dataset._index,
      i = this.data.goodSpecificationItem.items;
    i[a].items.forEach(function (t, a) {
      console.log("eIndex --\x3e>", a),
        a != e
          ? (t.selected = 0)
          : ((t.selected = 1),
            t.price > 0 && (s.data.goodSpecificationItem.amount = t.price));
    }),
      (this.data.goodSpecificationItem.items = i),
      this.setData({ goodSpecificationItem: this.data.goodSpecificationItem }),
      this.initSpecificationIndexs();
  },
  initSpecificationIndexs: function () {
    var t = this.data.goodSpecificationItem.items;
    (this.data.goodSpecificationItem.selectIndexs = []),
      t.forEach(function (t, a) {
        t.items.forEach(function (t, e) {
          1 == t.selected &&
            s.data.goodSpecificationItem.selectIndexs.push([a, e]);
        });
      }),
      this.setData({ goodSpecificationItem: this.data.goodSpecificationItem }),
      console.log("indexs ---\x3e>", this.data.goodSpecificationItem),
      this.initSpecificaionCount(2);
  },
  addSpecificationItemBtn: function (t) {
    console.log("fuck2"), this.initSpecificaionCount(1);
  },
  specificationRemoveBtn: function (t) {
    this.initSpecificaionCount(0);
  },
  initSpecificaionCount: function (t) {
    var a = this.data.cartList.cartItems,
      e = this.data.goodSpecificationItem;
    e.count = 0;
    var i = -1,
      o = this.data.list[e.index].goods[e._index].allCount
        ? this.data.list[e.index].goods[e._index].allCount
        : 0;
    for (var s in a) {
      var n = a[s];
      if (
        (console.log("index --\x3e>", s),
        n.specificationIndexs && n.item.id == e.item.id && e.selectIndexs)
      ) {
        console.log("has fuck");
        var c = !0,
          l = !0;
        for (var d in n.specificationIndexs) {
          var r = n.specificationIndexs[d];
          (r[0] == e.selectIndexs[d][0] && r[1] == e.selectIndexs[d][1]) ||
            (c = !1);
        }
        c && l && ((i = s), (l = !1));
      }
    }
    if ((console.log("itemIndex ---\x3e>", i), -1 != i))
      1 == t
        ? (a[i].count++, o++)
        : 0 == t &&
          (1 == a[i].count
            ? (a.splice(i, 1), (e.count = 0))
            : (a[i].count--, (e.count = a[i].count)),
          o > 1 ? o-- : (o = 0)),
        0 != t && (e.count = a[i].count);
    else if (1 == t) {
      var h = e.item,
        u = {
          index: e.index,
          indexx: e._index,
          item: h,
          count: 1,
          specificationIndexs: e.selectIndexs,
          specificationItems: e.items,
          amount: e.amount > 0 ? e.amount : h.price,
        };
      a.push(u), (e.count = 1), o++;
    }
    (this.data.cartList.cartItems = a),
      (this.data.goodSpecificationItem = e),
      0 == this.data.cartList.length && (o = 0),
      (this.data.list[e.index].goods[e._index].allCount = o),
      this.setData({
        cartList: this.data.cartList,
        goodSpecificationItem: this.data.goodSpecificationItem,
        list: this.data.list,
      }),
      this.initCartList();
  },
  showDetail: function () {
    if ("detailModal" == this.data.modalName) this.hideModal();
    else {
      this.setData({ modalName: "detailModal" });
      var t = wx.createAnimation({ delay: 600, timingFunction: "ease" });
      (this.animation = t),
        setTimeout(function () {
          s.fadeIn();
        }, 200);
    }
  },
  fadeIn: function () {
    this.animation.translateY(0).step(),
      this.setData({ bottomDialogAnimationData: this.animation.export() });
  },
  hideModal: function () {
    this.setData({ modalName: "" });
  },
  goodItemClick: function (t) {
    var a = t.currentTarget.dataset,
      e = a.item,
      i = a.index,
      o = a._index;
    i instanceof Number || (i = parseFloat(i)),
      o instanceof Number || (o = parseFloat(o)),
      e &&
        ((this.data.selectGoodItem.item = e),
        (this.data.selectGoodItem.index = i),
        (this.data.selectGoodItem._index = o),
        this.setData({
          goodItemData: null,
          selectGoodItem: this.data.selectGoodItem,
          goodSelectItem: e,
          showGood: !0,
          selectGoodId: e.id,
        }));
  },
  popOnClose: function () {
    this.setData({ showGood: !1 });
  },
  onVisibleChange: function (t) {
    console.log("ok"), this.popOnClose();
  },
  thumbClick: function (t) {
    var a = t.currentTarget.dataset.type;
    this.requestWithLoading(
      "shop/setGoodThumb",
      { goodId: this.data.selectGoodId, type: a, shopId: this.shopId },
      function (t) {
        t &&
          s.successToast(function () {
            var e = s.data.selectGoodItem.index,
              i = s.data.selectGoodItem._index;
            1 == t.state
              ? 0 == a
                ? ((s.data.list[e].goods[i].thumbs_up_count =
                    s.data.list[e].goods[i].thumbs_up_count + 1),
                  (s.data.goodItemData.thumbs_up_count = 1))
                : 1 == a &&
                  ((s.data.list[e].goods[i].thumbs_down_count =
                    s.data.list[e].goods[i].thumbs_down_count + 1),
                  (s.data.goodItemData.thumbs_down_count = 1))
              : 0 == t.state &&
                (0 == a
                  ? ((s.data.list[e].goods[i].thumbs_up_count =
                      s.data.list[e].goods[i].thumbs_up_count - 1),
                    (s.data.goodItemData.thumbs_up_count = 0))
                  : 1 == a &&
                    ((s.data.list[e].goods[i].thumbs_down_count =
                      s.data.list[e].goods[i].thumbs_down_count - 1),
                    (s.data.goodItemData.thumbs_down_count = 0))),
              s.setData({
                list: s.data.list,
                goodItemData: s.data.goodItemData,
              });
          });
      }
    );
  },
  loginBtn: function (t) {
    var i = this;
    return e(
      a().mark(function t() {
        var e;
        return a().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  i.setData({ showUnloginDialog: !1, isLoading: !0 }),
                  (t.next = 3),
                  i.user.pLogin()
                );
              case 3:
                (e = t.sent),
                  i.setData({ isLoading: !1 }),
                  e
                    ? i.successToast(function () {
                        s.subBtn();
                      })
                    : i.failureToast();
              case 6:
              case "end":
                return t.stop();
            }
        }, t);
      })
    )();
  },
  _subBtn: function (t) {
    var i = this;
    return e(
      a().mark(function t() {
        var e;
        return a().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (
                  (console.log("isLogin --\x3e>", c.globalData.isLogin),
                  !c.globalData.isLogin)
                ) {
                  t.next = 5;
                  break;
                }
                i.subBtn(), (t.next = 14);
                break;
              case 5:
                return (
                  i.setData({ isLoading: !0 }), (t.next = 8), i.user.pLogin()
                );
              case 8:
                if (((e = t.sent), i.setData({ isLoading: !1 }), e)) {
                  t.next = 13;
                  break;
                }
                return i.setData({ showUnloginDialog: !0 }), t.abrupt("return");
              case 13:
                i.subBtn();
              case 14:
                return t.abrupt("return");
              case 15:
              case "end":
                return t.stop();
            }
        }, t);
      })
    )();
  },
  subBtn: function (t) {
    console.log("sub btn --\x3e>" + this.data.cartList.totalPrice), (s = this);
    var a = JSON.stringify(this.data.cartList);
    wx.navigateTo({
      url:
        "/pages/home/mall/mall-pay-page/mall-pay-page?title=" +
        s.data.Str.confirmOrder[s.data.lanIndex] +
        "&cartList=" +
        a,
    });
  },
  hasCertification: function (t) {
    var a = this;
    this.requestWithLoading("user/hasCertification", {}, function (e) {
      e && -1 == e
        ? (wx.navigateTo({
            url:
              "/pages/common-page/login-page/login-page?title=" +
              a.data.Str.login[a.data.lanIndex],
          }),
          t(!1))
        : t(!(!e || 1 != e));
    });
  },
  onReady: function () {},
  onShow: function () {
    s.data.isPayed && (s.setData({ isPayed: !1 }), s.loadData()),
      c.globalData.orderId &&
        ((s.data.cartList.cartItems = []),
        s.setData({ isLoading: !0, isPayed: !0, cartList: s.data.cartList }),
        s.initCartList(),
        setTimeout(function () {
          s.setData({ isLoading: !1 }),
            wx.navigateTo({
              url:
                "/pages/order/order-detail/order-detail?id=" +
                c.globalData.orderId +
                "&title=" +
                s.data.Str.orderDetail[s.data.lanIndex],
            });
        }, 500)),
      c.globalData.isLogin ||
        (c.userLoginCall = function (t) {
          console.log("login call =>", t), t || c.userLogin();
        }),
      c.globalData.userInfo && this.setData({ hasUserInfo: !0 });
    var t = getCurrentPages(),
      a = t[t.length - 1];
    a.data.loginSuccessBack && ((a.data.loginSuccessBack = !1), this.subBtn());
  },
  topClik: function (t) {
    (this.data.scroll.hasScrollTop = !this.data.scroll.hasScrollTop),
      this.queryTopView(),
      this.setData({ scroll: this.data.scroll });
  },
  setFavoriate: function (t) {
    var a = this;
    this.data.pageData.shop &&
      this.requestWithLoading(
        "shop/setShopFavorites",
        { shopId: this.data.pageData.shop.id },
        function (t) {
          t &&
            ((a.data.pageData.shop.favorites =
              a.data.pageData.shop.favorites &&
              a.data.pageData.shop.favorites.length > 0
                ? null
                : "ok"),
            a.setData({ pageData: a.data.pageData }));
        }
      );
  },
  callServiceBtn: function (t) {
    console.log("user e", t);
    var a = t.currentTarget.dataset.item;
    s.callServiceRequest(a);
  },
  callServiceRequest: function (t) {
    var a = this;
    this.setData({ dialogContent: this.data.isUy ? t.uy_name : t.ch_name }),
      this.dialog.show(function (e) {
        s.requestWithLoading(
          "shop/callService",
          { typeId: t.id, shopId: a.shopId, tableNum: a.tableNum },
          function (t) {
            t &&
              s.successToast(function () {
                s.loadServiceInfo();
              });
          }
        );
      });
  },
  onHide: function () {},
  btnCall: function (t) {
    var a = t.currentTarget.dataset.phone;
    a && wx.makePhoneCall({ phoneNumber: a });
  },
  onUnload: function () {
    console.log("onUnload"), this.clearCount();
    var t = getCurrentPages(),
      a = t[t.length - 2];
    a && a.setData({ refreshData: { backShop: !0 } });
  },
  shopDetailBtn: function (t) {
    var a = this.data.pageData.shop.mall_cat.length;
    this.setData({ selectCatIndex: a - 1, selectGoodId: -1 });
  },
  clickShopLocation: function (t) {
    this.data.pageData.shop &&
      this.data.pageData.shop.lat &&
      wx.openLocation({
        type: "gcj02",
        latitude: Number(this.data.pageData.shop.lat),
        longitude: Number(this.data.pageData.shop.lng),
        scale: 18,
      });
  },
  onPullDownRefresh: function () {
    this.loadData();
  },
  onReachBottom: function () {},
  initShopImage: function (t) {
    if (t && t.icon_url) {
      0 == t.zan_count && 0 == t.zan_count
        ? (t.stars = 5)
        : (t.stars = ((t.zan_count / (t.zan_count + t.cha_count)) * 5).toFixed(
            1
          ));
      var a =
        this.data.ossImage +
        t.icon_url +
        "?x-oss-process=image/resize,m_lfit,h_400,w_400";
      a &&
        wx.getImageInfo({
          src: a,
          success: function (a) {
            console.log("getImage --\x3e>", a),
              s.setData({ shopIcon: a.path }),
              s.startCanvas(t, a.path);
          },
        }),
        this.setData({ shopStars: t.stars }),
        console.log("stars --\x3e>", this.data.shopStars);
    }
  },
  startCanvas: function (t, a) {
    if (t && a) {
      var e,
        i = this;
      wx.getSystemInfo({
        success: function (t) {
          e = t.windowWidth / 750;
        },
      });
      var o = wx.createCanvasContext("myCanvas"),
        s = (this.data.Str.etewarService[this.data.lanIndex], 0);
      if (
        (6 == t.area_id &&
          0 == t.delivery_fee &&
          (this.data.Str.sanGongliMianyun[this.data.lanIndex], (s = 1)),
        o.drawImage(a, 0 * e, 0 * e, 640 * e, 512 * e),
        (o.font = "24px UKIJ Basma Aq"),
        o.setTextAlign("left"),
        1 == s)
      ) {
        var n = "/resource/images/common/mianpeisong_uy.png";
        this.data.isUy || (n = "/resource/images/common/mianpeisong_ch.png"),
          o.drawImage(n, 10 * e, 5 * e, 500 * e, 50 * e);
      } else o.setFontSize(16);
      if (t.coupons && t.coupons.length > 0) {
        o.setFontSize(16);
        for (var c = 0; c < t.coupons.length; c++) {
          var l = t.coupons[c];
          o.setFillStyle("#CC3333"),
            o.fillRect((130 * c + 15) * e, 15 * e, 120 * e, 60 * e),
            o.fill();
          var d = "满" + l.coupon_limit + "减" + l.coupon_amount;
          o.setFillStyle("white"),
            o.fillText(d, (130 * c + 20) * e, 55 * e, 110 * e);
        }
      }
      if (t && t.stars > 0) {
        for (var r = 35, h = 0; h < 5; h++) {
          var u = "/resource/images/common/starfill.png";
          t.stars < h + 1 && (u = "/resource/images/common/star.png"),
            (r = 35 * (h + 1)),
            o.drawImage(u, r * e, 360 * e, 32 * e, 32 * e);
        }
        o.setFillStyle("white"),
          o.setFontSize(24),
          o.fillText(t.stars, 210 * e, 390 * e);
      }
      if (t && t.types && t.types.length > 0)
        for (var g = 15, p = 0; p < t.types.length; p++) {
          var m =
            "/resource/images/shop/types/" +
            (this.data.isUy ? "uy" : "ch") +
            "/" +
            t.types[p].id +
            ".png";
          o.drawImage(m, g * e, 430 * e, 154 * e, 54 * e), (g += 169);
        }
      o.draw(),
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: "myCanvas",
            success: function (t) {
              var a = t.tempFilePath;
              i.setData({ shareImagePath: a });
            },
            fail: function (t) {
              console.log(t);
            },
          });
        }, 200);
    }
  },
  backBtn: function (t) {
    var a = getCurrentPages();
    a[a.length - 2]
      ? wx.navigateBack({ delta: 1 })
      : wx.redirectTo({ url: "/pages/index/index" });
  },
  homeBtn: function (t) {
    wx.redirectTo({ url: "/pages/index/index" });
  },
  onShareAppMessage: function (t) {
    var a = null;
    "menu" == t.from || ("button" == t.from && (a = t.target.dataset.item));
    var e = this.data.pageData,
      i = this.data.isUy ? e.shop.uy_name : e.shop.ch_name,
      o = this.data.shareImagePath
        ? this.data.shareImagePath
        : this.data.ossImage + e.shop.icon_url;
    a &&
      ((i += " "),
      (i = (this.data.isUy ? a.uy_name : a.ch_name) + " "),
      a.isActivity && a.isActivity > 0
        ? this.data.isUy
          ? ((i += "ئەسلى باھاسى " + a.price),
            (i += ",ئېتىبار باھاسى" + a.activity_price))
          : ((i += "原价为" + a.price + "元,"),
            (i += "现优惠价为" + a.activity_price + "元"))
        : this.data.isUy
        ? (i += ",باھاسى" + a.price + "يۈەن")
        : (i += ",价格为" + a.price + "元"),
      (o = a.img_url));
    var s = this.data.isUy ? 1 : 2,
      n = null;
    return (
      this.user && this.user.getId() && (n = this.user.getId()),
      {
        title: i,
        imageUrl: o,
        path:
          "/pages/home/mall/mall-home?shopId=" +
          e.shop.id +
          "&lan=" +
          s +
          "&shareUserId=" +
          n +
          "&goodId=" +
          (null != a ? a.id : null),
      }
    );
  },
  onShareTimeline: function (t) {
    var a = this.data.isUy
        ? this.data.pageData.shop.uy_name
        : this.data.pageData.shop.ch_name,
      e = this.data.ossImage + this.data.pageData.shop.icon_url,
      i = this.data.goodSelectItem;
    return (
      i &&
        ((a += " ,"),
        (a += this.data.isUy ? i.uy_name : i.ch_name),
        i.isActivity && i.isActivity > 0
          ? this.data.isUy
            ? ((a += " "),
              (a += "ئەسلى باھاسى " + i.price),
              (a += ",ئېتىبار باھاسى" + i.activity_price))
            : ((a += "原价为" + i.price + "元,"),
              (a += "现优惠价为" + i.activity_price + "元"))
          : this.data.isUy
          ? (a += ",باھاسى" + i.price + "يۈەن")
          : (a += ",价格为" + i.price + "元"),
        (e = i.img_url)),
      { title: a, imageUrl: e }
    );
  },
});
