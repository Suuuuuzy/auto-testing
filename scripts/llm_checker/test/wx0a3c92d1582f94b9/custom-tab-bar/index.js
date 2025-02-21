getApp();
Component({
  data: { selected: 1 },
  methods: {
    switchTab: function (t) {
      wx.switchTab({ url: t.currentTarget.dataset.url });
    },
  },
});
