var t, e;
getApp().BaseComp({
  properties: {
    title: { type: String, value: "" },
    content: { type: String, value: "" },
    confirm: { type: String, value: "" },
    cancel: { type: String, value: "" },
    contentClass: { type: String, value: "" },
    type: { type: String, value: "normal" },
    isInput: { type: Boolean, value: !1 },
    hasTitle: { type: Boolean, value: !0 },
  },
  options: { addGlobalClass: !0 },
  data: { isShow: !1, inputValue: "" },
  onReady: function () {
    this.initLan(), this.initData();
  },
  methods: {
    initData: function () {},
    bindInput: function (t) {
      console.log(t.detail.value), this.setData({ inputValue: t.detail.value });
    },
    show: function (n, i) {
      console.log("dialog show"),
        this.setData({ isShow: !0 }),
        (t = n),
        (e = i);
    },
    hide: function () {
      this.setData({ isShow: !1 });
    },
    cancelModal: function () {
      this.hide(), console.log("fuck cancel"), "function" == typeof e && e();
    },
    cancelModel: function () {
      this.hide(), console.log("fuck cancel"), "function" == typeof e && e();
    },
    confirmModel: function () {
      this.hide(), "function" == typeof t && t(this.data.inputValue);
    },
  },
});
