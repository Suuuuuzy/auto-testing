require("../../../utils/util.js");
var t = getApp();
wx.setStorageSync("num", 100);
var a = {
  data: {
    size: { w: 599, h: 600 },
    musicflg: !0,
    fastJuedin: !0,
    repeat: !1,
    s_awards: "？",
    share: !1,
    canvasWidth: 400,
    canvasHeight: 650,
    showCanvasFlag: !1,
    colorArr: [
      "#EE534F",
      "#FF7F50",
      "#FFC928",
      "#66BB6A",
      "#42A5F6",
      "#5C6BC0",
      "#AA47BC",
      "#EC407A",
      "#FFB6C1",
      "#FFA827",
    ],
    fontArr: ["italic", "oblique", "normal"],
    sizeArr: [12, 14, 16, 18, 20, 22, 24, 26, 28],
    eweimaUrl: "../../images/erweima.jpg",
    shengchengUrl: "",
    saveFrameFlag: !1,
    arrData: [{ id: 0, option: " ", awards: [] }],
    chanceCount: 0,
    tableInfo: [
      { uy_name: "شەرەپ تاختىسى", ch_name: "排行榜", icon: "turntable_tab_1" },
      { uy_name: "مىنىڭكى", ch_name: "我的", icon: "turntable_tab_2" },
    ],
    STabCur: 0,
  },
  STabSelect: function (t) {
    this.setData({
      STabCur: t.currentTarget.dataset.id,
      scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
    }),
      this.getGift();
  },
  getData: function (t) {
    this.setData({ awardsConfig: t.detail });
  },
  getAwards: function (t) {
    var a = this;
    console.log("e --\x3e>", t);
    var i = this,
      n = "";
    0 == this.data.chanceCount
      ? ((n = this.data.isUy
          ? "سىزنىڭ موكاپاتقا ئېرشىشى  پۇرسىتىڭىز يوقكەن،زاكاس چۈشۈرۈش ئارقىلىق پۇرسەتكە ئېرشىڭ"
          : "你没有获奖机会，通过下单获取获奖机会"),
        this.setData({
          dialogContent: n,
          confirm: this.data.Str.iKnow[this.data.lanIndex],
        }),
        this.dialog.show())
      : ((n = this.data.isUy
          ? " مۇبارەك بولسۇن ،بىر تال " +
            t.detail.s_awards +
            " غا ئېرىشتىڭىز.ئالاقىدار خادىملا سىز بىلەن ئالاقىلىشىدۇ"
          : "恭喜您，您获得了一个" + t.detail.s_awards + ",相关负责人跟您联系"),
        this.requestWithLoading(
          "common/sendGift",
          { infoId: t.detail.s_id },
          function (t) {
            t &&
              (i.setData({
                dialogContent: n,
                confirm: a.data.Str.iKnow[a.data.lanIndex],
                chanceCount: 0,
              }),
              i.loadChance(),
              i.dialog.show());
          }
        )),
      this.setData({
        s_awards: t.detail.end ? "？" : t.detail.s_awards,
        share: !!t.detail.end,
      });
  },
  senGift: function (t) {
    this.requestWithLoading("common/sendGift", { infoId: t }, function (t) {});
  },
  startZhuan: function (t) {
    this.setData({ zhuanflg: !!t.detail });
  },
  onLoad: function (t) {
    (this.zhuanpan = this.selectComponent("#zhuanpan")),
      wx.setNavigationBarTitle({
        title: this.data.Str.tryLucy[this.data.lanIndex],
      }),
      (this.dialog = this.selectComponent("#dialog")),
      this.loadData(),
      this.loadChance();
  },
  loadData: function () {
    var t = this;
    this.requestWithLoading("common/turntableActivityHome", {}, function (a) {
      a && (t.setData({ pageData: a }), t.initData());
    });
  },
  loadChance: function () {
    var t = this;
    this.requestNotLoading("common/turntableCount", {}, function (a) {
      a && a.count && t.setData({ chanceCount: a.count });
    }),
      this.getGift();
  },
  getGift: function () {
    var t = this;
    this.requestWithLoading(
      "common/getGiftList",
      { type: this.data.STabCur },
      function (a) {
        a && (t.setData({ giftResult: a }), t.initGift());
      }
    );
  },
  initGift: function () {
    var t = this.data.giftResult;
    if (t)
      for (var a in t)
        if (t[a].user && t[a].user.phone.length > 0) {
          t[a].user.phone = t[a].user.phone.replace(
            /^(\d{3})\d{4}(\d{4})$/,
            "$1****$2"
          );
        }
    this.setData({ giftResult: t });
  },
  initData: function () {
    console.log("initData");
    var t = this.data.pageData,
      a = [];
    if (t.activity.length > 0) {
      for (var i in (console.log("ok"), t.activity)) {
        var n = t.activity[i],
          e = [];
        for (var s in t.activity[i].info) {
          var o = t.activity[i].info[s];
          e.push({
            id: o.id,
            name: this.data.isUy ? o.uy_name : o.ch_name,
            color: o.bg_color,
            imgUrl: this.data._baseImageUrl + o.img_url,
          });
        }
        a.push({
          id: n.id,
          option: this.data.isUy ? n.uy_name : n.ch_name,
          awards: e,
        });
      }
      this.zhuanpan.switchZhuanpan(a[0]), console.log(this.data.arrData);
    }
  },
  onShow: function (t) {},
  closeSaveFrame: function () {
    this.zhuanpan.reset(), this.setData({ saveFrameFlag: !1 });
  },
  arrayRandomTakeOne: function (t) {
    return t[Math.floor(Math.random() * t.length + 1 - 1)];
  },
};
t.BasePage(a);
