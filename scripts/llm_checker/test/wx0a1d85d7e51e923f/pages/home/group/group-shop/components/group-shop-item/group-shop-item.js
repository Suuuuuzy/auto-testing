Component({
  properties: {
    item: { type: Object, value: null },
    goods: { type: Array, value: [] },
    navUrl: { type: String, value: "" },
    isUy: {
      type: Boolean,
      value: !0,
      observer: function (e) {
        this.setData({ lanIndex: e ? 1 : 0 });
      },
    },
    Str: { type: Object },
    lanIndex: { type: Number, value: 1 },
    ossImage: {
      type: String,
      value: "https://etwarjan.oss-cn-zhangjiakou.aliyuncs.com/public",
    },
    deliveryLimit: {
      type: Number,
      value: 0,
      observer: function (e) {
        e > 0 &&
          this.properties.item._distance > 0 &&
          this.properties.item._distance / 1e3 >= e &&
          this.setData({ canArrive: !1 });
      },
    },
  },
  data: { canArrive: !0 },
  methods: {},
});
