Component({
  properties: {
    goods: { type: Array, value: [] },
    title: { type: String },
    subTitle: { type: String },
    hasMore: { type: Boolean, value: !0 },
    isUy: {
      type: Boolean,
      value: !0,
      observer: function (e) {
        e || this.setData({ lanIndex: 0 });
      },
    },
    Str: { type: Object },
    lanIndex: { type: Number, value: 1 },
    areaId: { type: Number, value: 0 },
  },
  data: {},
  methods: { moreClick: function (e) {} },
});
