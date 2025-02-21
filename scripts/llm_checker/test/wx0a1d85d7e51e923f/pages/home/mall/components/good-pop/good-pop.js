Component({
  properties: {
    item: {
      type: Object,
      value: null,
      observer: function (t) {
        console.log("good --\x3e>", t), t && t.item && this.initData(t);
      },
    },
    isOpen: {
      type: Boolean,
      value: !0,
      observer: function (t) {
        console.log("isOpen --\x3e>", t);
      },
    },
    visible: { type: Boolean, value: !1 },
    isUy: { type: Boolean, value: !0 },
    num: { type: Number, value: 0 },
  },
  data: { good: null, index: null, _index: null, num: 0 },
  methods: {
    initData: function (t) {
      this.setData({
        good: t.item,
        index: t.index,
        _index: parseFloat(t._index),
        num: t.item.count,
      });
    },
    popOnClose: function () {
      this.setData({ visible: !1 });
    },
    onVisibleChange: function (t) {
      this.popOnClose();
    },
    addBtn: function (t) {
      console.log("add e --\x3e>", t),
        this.data.num++,
        this.setData({ num: this.data.num }),
        console.log("num --\x3e>", this.data.num),
        this.triggerEvent("addBtn", t);
    },
    removeBtn: function (t) {
      this.data.num >= 1 &&
        (this.data.num--, this.setData({ num: this.data.num })),
        this.triggerEvent("removeBtn", t);
    },
  },
});
