var t,
  a =
    (t = require("../../../../service/js/shopBusAnimation.js")) && t.__esModule
      ? t
      : { default: t };
var i,
  e,
  o = getApp();
new a.default();
o.BasePage({
  data: {
    tableInfo: [
      { uy_name: "تاماق بۇيرۇش", ch_name: "订餐", icon: "mall_shop_tab_1" },
      { uy_name: "مۇلازىمەت", ch_name: "服务", icon: "mall_shop_tab_2" },
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
      totalPrice: 0,
      deliveryFee: 0,
      packingFee: 0,
      canOrder: !1,
      tableNum: 0,
      cartItems: [],
      cashBackAmount: 0,
      lakeFee: 0,
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
    updateLoading: !1,
    isAllLoaded: !1,
    goodScrollHeight: 0,
    showWaterfall01: !0,
  },
  onLoad: function (t) {
    if (
      ((i = this),
      (this.lan = t.lan),
      (this.shopId = t.shopId),
      (this.tableNum = t.tableNum),
      (this.catId = t.catId),
      (this.goodId = t.goodId),
      (this.typeId = t.typeId),
      console.log("catId ---\x3e>", this.catId),
      this.goodId && this.setData({ selectGoodId: this.goodId }),
      console.log("selectGoodId ---\x3e>", this.data.selectGoodId),
      (this.dialog = this.selectComponent("#dialog")),
      t.scene)
    ) {
      var a = decodeURIComponent(t.scene);
      (this.shopId = a.split("&")[0]),
        (this.lan = a.split("&")[1]),
        (this.tableNum = a.split("&")[2]);
    }
    if (t.q || o.globalData.scanResult) {
      var e = decodeURIComponent(t.q ? t.q : o.globalData.scanResult);
      e &&
        ((this.shopId = this.tool.getUrlParam("shopId", e)),
        (this.tableNum = this.tool.getUrlParam("tableNum", e))),
        (o.globalData.scanResult = null);
    }
    this.tableNum &&
      ((this.data.cartList.tableNum = this.tableNum),
      this.setData({ cartList: this.data.cartList }),
      this.initTableNum()),
      this.lan && this.initShowLan(this.lan),
      this.initSharedUser(t),
      (this.busPos = {}),
      (this.busPos.x = 0.9 * o.globalData.wWidth),
      (this.busPos.y = 0.9 * o.globalData.wHeight),
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
    this.shareUserId && (o.globalData.shareUserId = this.shareUserId);
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
      var i = a.split("");
      (this.data.cartList.tableNums = i),
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
      "mall/mallHome",
      { shopId: this.shopId },
      function (a) {
        a &&
          (a.shop &&
            (i.tableNum &&
              (console.log("shop --\x3e>", i.tableNum),
              a.userLan
                ? i.initShowLan(a.userLan)
                : i.initShowLan(a.shop.default_lan + 1)),
            i.data.isUy
              ? wx.setNavigationBarTitle({ title: a.shop.uy_name })
              : wx.setNavigationBarTitle({ title: a.shop.ch_name }),
            (i.data.cartList.shop = a.shop),
            a.shop.can_delivery &&
              !t.tableNum &&
              (i.data.cartList.deliveryFee = a.shop.delivery_fee),
            i.setData({ cartList: i.data.cartList }),
            a.shop.mall_cat,
            i.catId &&
              a.shop.mall_cat &&
              a.shop.mall_cat.forEach(function (t, a) {
                i.catId == t.id &&
                  ((i.data.selectCatIndex = a), (i.catId = null));
              })),
          i.setData({ pageData: a, selectCatIndex: i.data.selectCatIndex }),
          i.STabSelect({
            currentTarget: {
              dataset: { id: i.tableNum ? a.shop.scan_tab_cur : 0 },
            },
          }));
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
              var a = i.tool.getSecond(t.created_at),
                e = "";
              if ((a = parseInt(a)) > 3600)
                e = i.data.isUy ? "1 سائەت ئىلگىرى" : "1个小时之前";
              else if (a <= 3600 && a >= 60) {
                var o = parseInt(a / 60);
                e = i.data.isUy ? o + " مىنۇت ئىلگىرى" : o + " 分钟之前";
              } else e = i.data.isUy ? a + " سىكۇنىت ئىلگىرى" : a + " 秒之前";
              t.time = e;
              var s = t.table_num;
              if (s) {
                var n = s.toString();
                1 == n.length && (n = "0" + n);
                var c = n.split("");
                t.tableNums = c;
              }
            }),
          console.log("e --\x3e>", t),
          i.setData({ shopServiceData: t }));
      }
    );
  },
  loadShopInfo: function () {
    this.data.pageData &&
      this.data.pageData.shop.mall_cat &&
      this.requestWithLoading(
        "mall/getMallShop",
        {
          shopId: this.data.pageData.shop.id,
          catId: this.data.pageData.shop.mall_cat[this.data.selectCatIndex].id,
          type: this.data.selectCatIndex + 1,
        },
        function (t) {
          if (t) {
            var a = t.shop.good_type;
            if (a) {
              var e = i.data.cartList.cartItems;
              for (var o in e)
                a.length > e[o].index &&
                  a[e[o].index].goods.length > e[o].indexx &&
                  a[e[o].index].goods[e[o].indexx].id == e[o].item.id &&
                  ((a[e[o].index].goods[e[o].indexx].count = e[o].count),
                  (a[e[o].index].count =
                    a[e[o].index].count > 0
                      ? parseInt(a[e[o].index].count) + parseInt(e[o].count)
                      : parseInt(e[o].count)),
                  (e[o].item = a[e[o].index].goods[e[o].indexx]));
              i.typeId
                ? t.shop.good_type.forEach(function (t, a) {
                    t.id == i.typeId &&
                      setTimeout(function () {
                        i.setData({
                          MainCur: a,
                          TabCur: a,
                          VerticalNavTop: 50 * a,
                        }),
                          (i.typeId = null);
                      }, 300);
                  })
                : i.setData({ MainCur: 0, TabCur: 0, VerticalNavTop: 0 });
            }
            i.setData({ list: a, shopInfo: t }),
              i.queryTopView(),
              i.initTime(),
              i.initCartList();
          }
        }
      );
  },
  catClick: function (t) {
    var a = t.currentTarget.dataset.index;
    this.setData({ selectCatIndex: a, selectGoodId: -1 }), this.loadShopInfo();
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
      i = 0;
    if (this.data.load) {
      for (
        var e = function (t) {
            wx.createSelectorQuery()
              .select("#main-" + a[t].id)
              .fields({ size: !0 }, function (e) {
                e && ((a[t].top = i), (i += e.height), (a[t].bottom = i));
              })
              .exec();
          },
          o = 0;
        o < a.length;
        o++
      )
        e(o);
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
  queryTopView: function () {},
  startCount: function () {
    e = setInterval(function () {
      i.initTime();
    }, 2e3);
  },
  clearCount: function () {
    clearInterval(e), (e = null);
  },
  initTime: function () {
    if (this.data.list) {
      var t = this.data.list;
      for (var a in t)
        for (var e in t[a].goods)
          t[a].goods[e].activity_price > 0 &&
            t[a].goods[e].activity_start_time &&
            t[a].goods[e].activity_end_time &&
            ((t[a].goods[e].time1 = this.tool.getSecond(
              t[a].goods[e].activity_start_time,
              null,
              !0
            )),
            (t[a].goods[e].time2 = this.tool.getSecond(
              t[a].goods[e].activity_end_time,
              null,
              !0
            )),
            t[a].goods[e].activity_limit_count > 0 &&
              t[a].goods[e].bought_today_count >=
                t[a].goods[e].activity_limit_count &&
              (t[a].goods[e].time2 = 0),
            t[a].goods[e].time1 < 0 &&
              t[a].goods[e].time2 > 0 &&
              (t[a].goods[e].time = this.tool.formatSeconds(
                t[a].goods[e].time2
              )));
      i.setData({ list: t });
    }
  },
  _addBtn: function (t) {
    console.log("_addBtn --\x3e>", t),
      console.log("bus --\x3e>", i.busPos),
      this.addBtn(t);
  },
  shopingCartAnimation: function () {
    var t = this;
    this.setData({ showRotate: !0 }),
      this.animate(
        ".mImg",
        [
          { opacity: 1, rotate: 8 * this.rotate },
          { opacity: 1, rotate: 8 * (this.rotate + 1) },
        ],
        10,
        function () {
          console.log("complete --\x3e>" + t.rotate),
            t.setData({
              animationImgUrl:
                "../../../resource/images/animation/shoping-cart/" +
                (t.rotate + 1) +
                ".png",
            }),
            t.rotate < 11
              ? t.shopingCartAnimation()
              : t.setData({ showRotate: !1 }),
            t.rotate++;
        }.bind(this)
      );
  },
  startAnimation: function (t) {
    var a = 0,
      e = this,
      o = e.linePos.bezier_points;
    this.setData({ hideCurveGood: !1, bus_x: e.finger.x, bus_y: e.finger.y }),
      (this.timer = setInterval(function () {
        a++,
          e.setData({ bus_x: o[a].x, bus_y: o[a].y }),
          a >= 28 &&
            (clearInterval(e.timer),
            e.setData({ hideCurveGood: !0, hideCount: !1 }),
            i.addBtn(t));
      }, 18));
  },
  addBtn: function (t) {
    console.log(t);
    var a = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.indexx,
      e = t.currentTarget.dataset.item,
      o = t.currentTarget.dataset.cindex,
      s = this.data.cartList.cartItems[o],
      n = !1;
    console.log("cIndex --\x3e>", o),
      console.log("cartItem ---\x3e>", s),
      o >= 0 && s.specificationIndexs && (n = !0),
      n
        ? (this.data.list[a].goods[i].allCount &&
            (this.data.list[a].goods[i].allCount++, this.data.list[a].count++),
          s.count++)
        : this.data.list[a].goods[i].count
        ? (this.data.list[a].goods[i].count++, this.data.list[a].count++)
        : this.data.list[a].goods[i].starting_count > 1
        ? ((this.data.list[a].goods[i].count =
            this.data.list[a].goods[i].starting_count),
          (this.data.list[a].count = this.data.list[a].goods[i].starting_count))
        : ((this.data.list[a].goods[i].count = 1),
          (this.data.list[a].count = 1)),
      n ? this.initCartList() : this.initCartList(a, i, e, 1),
      this.setData({ list: this.data.list });
  },
  removeBtn: function (t) {
    var a = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.indexx,
      e = t.currentTarget.dataset.item,
      o = t.currentTarget.dataset.cindex,
      s = this.data.cartList.cartItems[o],
      n = !1;
    console.log("cIndex --\x3e>", o),
      console.log("cartItem ---\x3e>", s),
      o >= 0 && s.specificationIndexs && (n = !0),
      n
        ? (this.data.list[a].goods[i].allCount > 1
            ? this.data.list[a].goods[i].allCount--
            : (this.data.list[a].goods[i].allCount = 0),
          s.count > 1 ? s.count-- : this.data.cartList.cartItems.splice(o, 1))
        : (this.data.list[a] &&
            this.data.list[a].goods[i] &&
            this.data.list[a].goods[i].count >= 1 &&
            (this.data.list[a].goods[i].starting_count > 1 &&
            this.data.list[a].goods[i].count <=
              this.data.list[a].goods[i].starting_count
              ? (this.data.list[a].goods[i].count = 0)
              : this.data.list[a].goods[i].count--),
          this.data.list &&
            this.data.list[a].count >= 1 &&
            this.data.list[a].count--),
      n ? this.initCartList() : this.initCartList(a, i, e, 0),
      this.setData({ list: this.data.list });
  },
  viewImg: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.previewImage({ urls: [a] });
  },
  cleanCart: function (t) {
    var a = this.data.list;
    for (var i in a)
      for (var e in ((a[i].count = 0), a[i].goods))
        a[i].goods[e].good_specification.length > 0
          ? (a[i].goods[e].allCount = 0)
          : (a[i].goods[e].count = 0);
    (this.data.cartList.cartItems = []),
      this.setData({ list: a, modalName: "" }),
      this.initCartList();
  },
  initCartList: function (t, a, i, e) {
    var o = 0,
      s = 0,
      n = !1,
      c = 0,
      d = this.data.cartList.cartItems,
      l = this.data.pageData.shop.mall_cat,
      r = this.data.pageData.shop,
      h = 0;
    for (var u in l) l[u].count = 0;
    for (var g in (l.forEach(function (t) {
      t.count = 0;
    }),
    d)) {
      if (
        (d[g].index == t &&
          d[g].indexx == a &&
          d[g].item.id == i.id &&
          ((n = !0),
          1 == e
            ? d[g].count++
            : (console.log("cartIndex --\x3e>", d[g].item.starting_count),
              1 == d[g].count ||
              (d[g].item.starting_count > 1 &&
                d[g].count <= d[g].item.starting_count)
                ? d.splice(g, 1)
                : d[g].count--)),
        d[g])
      ) {
        o += d[g].count;
        var p = d[g].item.price * d[g].count;
        d[g].item.time2 > 0 &&
          (p =
            d[g].activity_count > 0 && d[g].count > d[g].activity_count
              ? d[g].item.activity_price * d[g].activity_count +
                d[g].item.price * (d[g].count - d[g].activity_count)
              : d[g].item.activity_price * d[g].count),
          d[g].specificationIndexs && (p = d[g].amount * d[g].count),
          (s = (parseFloat(s) + parseFloat(p)).toFixed(2)),
          (h = (
            parseFloat(h) + parseFloat(d[g].item.packing_fee * d[g].count)
          ).toFixed(2));
      }
      if (l)
        for (var m in l)
          d[g] &&
            l[m].id == d[g].item.cat_id &&
            (l[m].count =
              l[m].count > 0
                ? parseInt(l[m].count) + parseInt(d[g].count)
                : parseInt(d[g].count));
    }
    if (!n && i) {
      var f = i.starting_count > 1 ? i.starting_count : 1;
      if (1 == e) {
        var I = 0;
        i.time2 > 0 && (I = 1),
          d.push({
            index: t,
            indexx: a,
            count: f,
            item: i,
            activity_count: i.activity_limit_count,
            is_activity: I,
          }),
          (h = (parseFloat(h) + parseFloat(i.packing_fee * f)).toFixed(2)),
          (o += f),
          (s = (
            parseFloat(s) +
            parseFloat(
              (this.data.list[t].goods[a].time2 > 0
                ? this.data.list[t].goods[a].activity_price
                : this.data.list[t].goods[a].price) * f
            )
          ).toFixed(2)),
          l.forEach(function (t) {
            t.id == i.cat_id && (t.count = t.count + f);
          });
      }
    }
    (this.data.cartList.allCount = o),
      (this.data.cartList.allPrice = s),
      (this.data.cartList.packingFee = h),
      s &&
        r.userPercent &&
        (c = parseFloat((s * r.userPercent) / 100).toFixed(2)),
      (this.data.cartList.cashBackAmount = c),
      this.data.cartList.allPrice >=
      parseFloat(this.data.pageData.shop.starting_price)
        ? (this.data.cartList.canOrder = !0)
        : (this.data.cartList.canOrder = !1),
      (this.data.lakeFee = parseFloat(
        this.data.pageData.shop.starting_price - this.data.cartList.allPrice
      ).toFixed(2)),
      (this.data.cartList.cartItems = d),
      (this.data.pageData.shop.mall_cat = l),
      this.setData({
        cartIndexs: d,
        cartList: this.data.cartList,
        pageData: this.data.pageData,
        lakeFee: this.data.lakeFee,
      });
  },
  selectSpecification: function (t) {
    var a = t.currentTarget.dataset.item,
      i = t.currentTarget.dataset.index,
      e = t.currentTarget.dataset.indexx,
      o = 0;
    if (a) {
      o = a.price;
      var s = [];
      if (a.good_specification) {
        for (var n in a.good_specification) {
          var c = !1;
          for (var d in s)
            a.good_specification[n].specification_type_id ==
              s[d].specification_type_id &&
              (s[d].items.push(a.good_specification[n].info), (c = !0));
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
        (this.data.goodSpecificationItem.index = i),
        (this.data.goodSpecificationItem._index = e),
        (this.data.goodSpecificationItem.amount = o),
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
      o = this.data.goodSpecificationItem.items;
    o[a].items.forEach(function (t, a) {
      console.log("eIndex --\x3e>", a),
        a != e
          ? (t.selected = 0)
          : ((t.selected = 1),
            t.price > 0 && (i.data.goodSpecificationItem.amount = t.price));
    }),
      (this.data.goodSpecificationItem.items = o),
      this.setData({ goodSpecificationItem: this.data.goodSpecificationItem }),
      this.initSpecificationIndexs();
  },
  initSpecificationIndexs: function () {
    var t = this.data.goodSpecificationItem.items;
    (this.data.goodSpecificationItem.selectIndexs = []),
      t.forEach(function (t, a) {
        t.items.forEach(function (t, e) {
          1 == t.selected &&
            i.data.goodSpecificationItem.selectIndexs.push([a, e]);
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
      i = this.data.goodSpecificationItem;
    i.count = 0;
    var e = -1,
      o = this.data.list[i.index].goods[i._index].allCount
        ? this.data.list[i.index].goods[i._index].allCount
        : 0;
    for (var s in a) {
      var n = a[s];
      if (
        (console.log("index --\x3e>", s),
        n.specificationIndexs && n.item.id == i.item.id && i.selectIndexs)
      ) {
        console.log("has fuck");
        var c = !0,
          d = !0;
        for (var l in n.specificationIndexs) {
          var r = n.specificationIndexs[l];
          (r[0] == i.selectIndexs[l][0] && r[1] == i.selectIndexs[l][1]) ||
            (c = !1);
        }
        c && d && ((e = s), (d = !1));
      }
    }
    if ((console.log("itemIndex ---\x3e>", e), -1 != e))
      1 == t
        ? (a[e].count++, o++)
        : 0 == t &&
          (1 == a[e].count
            ? (a.splice(e, 1), (i.count = 0))
            : (a[e].count--, (i.count = a[e].count)),
          o > 1 ? o-- : (o = 0)),
        0 != t && (i.count = a[e].count);
    else if (1 == t) {
      var h = i.item,
        u = {
          index: i.index,
          indexx: i._index,
          item: h,
          count: 1,
          specificationIndexs: i.selectIndexs,
          specificationItems: i.items,
          amount: i.amount > 0 ? i.amount : h.price,
        };
      a.push(u), (i.count = 1), o++;
    }
    (this.data.cartList.cartItems = a),
      (this.data.goodSpecificationItem = i),
      0 == this.data.cartList.length && (o = 0),
      (this.data.list[i.index].goods[i._index].allCount = o),
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
          i.fadeIn();
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
    var a = t.currentTarget.dataset.item,
      e = t.currentTarget.dataset.index,
      o = t.currentTarget.dataset._index;
    a &&
      ((this.data.selectGoodItem.item = a),
      (this.data.selectGoodItem.index = e),
      (this.data.selectGoodItem._index = o),
      this.setData({
        goodItemData: null,
        selectGoodItem: this.data.selectGoodItem,
      }),
      this.requestWithLoading(
        "shop/getGoodThumb",
        { goodId: a.id },
        function (t) {
          t && i.setData({ goodItemData: t }),
            i.setData({
              goodSelectItem: a,
              modalName: "showGood",
              selectGoodId: a.id,
            });
        }
      ));
  },
  thumbClick: function (t) {
    var a = t.currentTarget.dataset.type;
    this.requestWithLoading(
      "shop/setGoodThumb",
      { goodId: this.data.selectGoodId, type: a, shopId: this.shopId },
      function (t) {
        t &&
          i.successToast(function () {
            var e = i.data.selectGoodItem.index,
              o = i.data.selectGoodItem._index;
            1 == t.state
              ? 0 == a
                ? ((i.data.list[e].goods[o].thumbs_up_count =
                    i.data.list[e].goods[o].thumbs_up_count + 1),
                  (i.data.goodItemData.thumbs_up_count = 1))
                : 1 == a &&
                  ((i.data.list[e].goods[o].thumbs_down_count =
                    i.data.list[e].goods[o].thumbs_down_count + 1),
                  (i.data.goodItemData.thumbs_down_count = 1))
              : 0 == t.state &&
                (0 == a
                  ? ((i.data.list[e].goods[o].thumbs_up_count =
                      i.data.list[e].goods[o].thumbs_up_count - 1),
                    (i.data.goodItemData.thumbs_up_count = 0))
                  : 1 == a &&
                    ((i.data.list[e].goods[o].thumbs_down_count =
                      i.data.list[e].goods[o].thumbs_down_count - 1),
                    (i.data.goodItemData.thumbs_down_count = 0))),
              i.setData({
                list: i.data.list,
                goodItemData: i.data.goodItemData,
              });
          });
      }
    );
  },
  _subBtn: function (t) {
    o.getUserInfo(t, function (t) {
      t
        ? i.subBtn()
        : i.showT({
            content: i.data.Str.authorzationFail[i.data.lanIndex],
            icon: "error",
            color: "grey",
          });
    });
  },
  subBtn: function (t) {
    console.log("sub btn --\x3e>" + this.data.cartList),
      (i = this),
      this.hasCertification(function (t) {
        if ((console.log("call --\x3e", t), t)) {
          if (!i.data.pageData.shop.is_open)
            return void i.showT({
              content: i.data.Str.notService[i.data.lanIndex],
            });
          (o.globalData.cartList = i.data.cartList),
            i.setData({ isLoading: !0 }),
            setTimeout(function () {
              i.setData({ isLoading: !1 }),
                wx.navigateTo({
                  url:
                    "/pages/home/mall/mall-pay-page/mall-pay-page?title=" +
                    i.data.Str.confirmOrder[i.data.lanIndex],
                });
            }, 100);
        }
      });
  },
  hasCertification: function (t) {
    var a = this;
    this.requestWithLoading("user/hasCertification", {}, function (i) {
      i && -1 == i
        ? (wx.navigateTo({
            url:
              "/pages/common-page/login-page/login-page?title=" +
              a.data.Str.login[a.data.lanIndex],
          }),
          t(!1))
        : t(!(!i || 1 != i));
    });
  },
  onReady: function () {},
  onShow: function () {
    i.data.isPayed && (i.setData({ isPayed: !1 }), i.loadData()),
      o.globalData.orderId &&
        ((i.data.cartList.cartItems = []),
        i.setData({ isLoading: !0, isPayed: !0, cartList: i.data.cartList }),
        i.initCartList(),
        setTimeout(function () {
          i.setData({ isLoading: !1 }),
            wx.navigateTo({
              url:
                "/pages/order/order-detail/order-detail?id=" +
                o.globalData.orderId +
                "&title=" +
                i.data.Str.orderDetail[i.data.lanIndex],
            });
        }, 500)),
      o.globalData.isLogin ||
        (o.userLoginCall = function (t) {
          console.log("login call =>", t), t || o.userLogin();
        }),
      o.globalData.userInfo && this.setData({ hasUserInfo: !0 });
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
    i.callServiceRequest(a);
  },
  callServiceRequest: function (t) {
    var a = this;
    this.setData({ dialogContent: this.data.isUy ? t.uy_name : t.ch_name }),
      this.dialog.show(function (e) {
        i.requestWithLoading(
          "shop/callService",
          { typeId: t.id, shopId: a.shopId, tableNum: a.tableNum },
          function (t) {
            t &&
              i.successToast(function () {
                i.loadServiceInfo();
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
  onShareAppMessage: function () {
    var t = this.data.pageData,
      a = this.data.isUy ? t.shop.uy_name : t.shop.ch_name,
      i = this.data.ossImage + t.shop.icon_url,
      e = this.data.isUy ? 1 : 2,
      o = null;
    return (
      this.user && this.user.getId() && (o = this.user.getId()),
      {
        title: a,
        imageUrl: i,
        path:
          "/pages/home/mall/supermarket/supermarket-home?shopId=" +
          t.shop.id +
          "&lan=" +
          e +
          "&shareUserId=" +
          o,
      }
    );
  },
});
