Page({
  data: { url: "", show: !0 },
  onLoad: function (t) {
    t.url ? this.setData({ url: t.url }) : this.setData({ show: !1 });
  },
});
