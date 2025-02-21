var a = wx.createInnerAudioContext(),
  t = wx.createInnerAudioContext(),
  e = wx.createInnerAudioContext(),
  n = getApp(),
  o = null;
Component({
  options: { multipleSlots: !0 },
  properties: {
    myProperty: { type: String, value: "", observer: function (a, t, e) {} },
    probability: { type: Boolean, value: !1 },
    musicflg: { type: Boolean, value: !0 },
    fastJuedin: { type: Boolean, value: !1 },
    repeat: { type: Boolean, value: !1 },
    size: { type: Object, value: { w: 659, h: 660 } },
    zhuanpanArr: {
      type: Array,
      value: [
        {
          id: 0,
          option: "转盘的标题名称",
          awards: [
            { id: 0, name: "最多17个选项", color: "red", probability: 0 },
            { id: 1, name: "选项最多填13字", color: "green", probability: 0 },
          ],
        },
      ],
    },
    awardsConfig: {
      type: Object,
      value: {
        option: "我的小决定？",
        awards: [
          { id: 0, name: "最多17个选项", color: "red", probability: 0 },
          { id: 1, name: "选项最多填13字", color: "green", probability: 0 },
        ],
      },
    },
  },
  data: {
    animationData: {},
    zhuanflg: !1,
    fastTime: 7600,
    slowTime: 3900,
    block1: "block",
    block2: "none",
    block3: "none",
    block4: "none",
  },
  created: function () {
    console.log("==========created==========");
  },
  attached: function () {
    console.log("==========attached=========="),
      (a.src =
        "https://gamesdata.oss-cn-hangzhou.aliyuncs.com/xiaojueding/start.mp3"),
      (t.src =
        "https://gamesdata.oss-cn-hangzhou.aliyuncs.com/xiaojueding/mid.mp3"),
      (e.src =
        "https://gamesdata.oss-cn-hangzhou.aliyuncs.com/xiaojueding/stop.mp3"),
      this.setData({ awardsConfig: this.data.zhuanpanArr[0] }),
      this.initAdards();
  },
  methods: {
    isNull: function (a) {
      return null == a || null == a || "" == a;
    },
    initAdards: function () {
      for (
        var a = this.data.awardsConfig,
          t = a.awards.length,
          e = 1 / t,
          n = 360 / t,
          o = n - 90,
          r = 0;
        r < t;
        r++
      )
        (a.awards[r].item2Deg = r * n + 90 - n / 2 + "deg"),
          (a.awards[r].afterDeg = o + "deg");
      this.setData({ turnNum: e, awardsConfig: a }), this._change();
    },
    reset: function () {
      console.log("reset");
      var a = this,
        t = a.data.awardsConfig;
      console.log(t);
      var e = wx.createAnimation({ duration: 1, timingFunction: "linear" });
      for (var o in ((a.animation = e),
      e.rotate(0).step(),
      (n.runDegs = 0),
      a.setData({ animationData: e.export(), block4: "block" }),
      t.awards))
        t.awards[o].opacity = "1";
      setTimeout(function () {
        a.setData({
          block1: "block",
          block2: "none",
          block3: "none",
          block4: "none",
          awardsConfig: t,
        });
      }, 300);
    },
    switchZhuanpan: function (n, r) {
      this.setData({
        awardsConfig: n,
        block1: "block",
        block3: "none",
        zhuanflg: !1,
      }),
        this.initAdards(),
        r &&
          (this.reset(),
          clearTimeout(o),
          a.stop(),
          t.stop(),
          e.stop(),
          wx.removeStorageSync("repeatArr"));
    },
    _zhuan: function () {
      var r = this,
        i = r.data.awardsConfig,
        s = (Math.random() * i.awards.length) >>> 0;
      r.data.repeat
        ? (s = r._queryRepeat(s))
        : (wx.removeStorageSync("repeatArr"),
          console.log("是否开启了概率？？？", r.data.probability),
          r.data.probability && (s = r._openProbability())),
        console.log("当前答案选项的下标==", s),
        setTimeout(function () {
          r.data.musicflg && (r.data.fastJuedin ? t.play() : a.play()),
            (n.runDegs = n.runDegs || 0),
            (n.runDegs =
              n.runDegs +
              (360 - (n.runDegs % 360)) +
              (2160 - s * (360 / i.awards.length)));
          var e = wx.createAnimation({
            duration: r.data.fastJuedin ? r.data.slowTime : r.data.fastTime,
            timingFunction: "ease",
          });
          (r.animation = e),
            e.rotate(n.runDegs).step(),
            0 == s && (n.runDegs = 0),
            r.setData({
              animationData: e.export(),
              block1: "none",
              block2: "block",
              block3: "none",
              zhuanflg: !0,
            }),
            r._setatZhuan(!0);
        }, 100),
        (o = setTimeout(
          function () {
            for (var a in i.awards) i.awards[a].opacity = a != s ? "0.3" : "1";
            r.data.musicflg && e.play(),
              r.setData({
                animationData: {},
                s_awards: i.awards[s].name,
                s_id: i.awards[s].id,
                awardsConfig: i,
                block1: "none",
                block2: "none",
                block3: "block",
                zhuanflg: !1,
              }),
              r._myAwards(!1),
              r._setatZhuan(!1);
          },
          r.data.fastJuedin ? r.data.slowTime : r.data.fastTime
        ));
    },
    _openProbability: function () {
      var a = this.data.awardsConfig.awards,
        t = [];
      for (var e in a)
        if (0 != a[e].probability)
          for (var n = 0; n < a[e].probability; n++) t.push(e);
      return t[Math.floor(Math.random() * t.length)];
    },
    _queryRepeat: function (a) {
      var t = !0,
        e = wx.getStorageSync("repeatArr"),
        n = [],
        o = this.data.awardsConfig;
      if (this.isNull(e))
        return n.push(a), wx.setStorageSync("repeatArr", n), a;
      var r = o.awards.length;
      a = (Math.random() * r) >>> 0;
      for (var i in e)
        if (a == e[i])
          return (
            (t = !1),
            e.length == r
              ? (wx.removeStorageSync("repeatArr"),
                n.push(a),
                wx.setStorageSync("repeatArr", n),
                a)
              : this._queryRepeat()
          );
      return t ? (e.push(a), wx.setStorageSync("repeatArr", e), a) : void 0;
    },
    _change: function () {
      this.triggerEvent("myData", this.data.awardsConfig);
    },
    _myAwards: function (a) {
      this.triggerEvent("myAwards", {
        s_awards: this.data.s_awards,
        end: a,
        s_id: this.data.s_id,
      });
    },
    _setatZhuan: function (a) {
      this.triggerEvent("startZhuan", a);
    },
  },
});
