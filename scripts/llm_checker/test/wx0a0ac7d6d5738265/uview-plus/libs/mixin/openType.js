var t = {
  props: { openType: String },
  methods: {
    onGetUserInfo: function (t) {
      this.$emit("getuserinfo", t.detail);
    },
    onContact: function (t) {
      this.$emit("contact", t.detail);
    },
    onGetPhoneNumber: function (t) {
      this.$emit("getphonenumber", t.detail);
    },
    onError: function (t) {
      this.$emit("error", t.detail);
    },
    onLaunchApp: function (t) {
      this.$emit("launchapp", t.detail);
    },
    onOpenSetting: function (t) {
      this.$emit("opensetting", t.detail);
    },
  },
};
exports.openType = t;
