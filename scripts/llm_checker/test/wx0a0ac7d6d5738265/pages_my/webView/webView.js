var t = require("./privacyPolicy.js"),
  c = {
    data: function () {
      return { contractUrl: "", privacyPolicy: "" };
    },
    onLoad: function (c) {
      console.log("option.contractUrl", c.contractUrl);
      var r = c.contractUrl || "";
      "2" == r
        ? (this.privacyPolicy = t.b)
        : "1" == r && (this.privacyPolicy = t.a);
    },
    methods: {
      start: function (t) {
        var c = this;
        this.$api
          .$getInfoDetail(t)
          .then(function (r) {
            200 !== r.statusCode ? c.start(t) : (c.privacyPolicy = r.data);
          })
          .catch(function (r) {
            c.start(t);
          });
      },
    },
  };
var r = require("../../common/vendor.js")._export_sfc(c, [
  [
    "render",
    function (t, c, r, a, o, i) {
      return { a: o.privacyPolicy };
    },
  ],
  ["__scopeId", "data-v-bc9dba45"],
]);
wx.createPage(r);
