Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer: function (t, e, s) {
        this.setData({ items: t });
      },
    },
  },
  data: { items: [] },
  methods: {},
});
