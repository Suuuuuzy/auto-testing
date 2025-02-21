var t = require("../../../common/vendor.js"),
  e = {
    props: {
      customStyle: {
        type: [Object, String],
        default: function () {
          return {};
        },
      },
      customClass: { type: String, default: "" },
      url: { type: String, default: "" },
      linkType: { type: String, default: "navigateTo" },
    },
    data: function () {
      return {};
    },
    onLoad: function () {
      this.$u.getRect = this.$uGetRect;
    },
    created: function () {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      $u: function () {
        return t.index.$u.deepMerge(t.index.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0,
        });
      },
      bem: function () {
        return function (t, e, n) {
          var i = this,
            r = "u-".concat(t, "--"),
            o = {};
          return (
            e &&
              e.map(function (t) {
                o[r + i[t]] = !0;
              }),
            n &&
              n.map(function (t) {
                i[t] ? (o[r + t] = i[t]) : delete o[r + t];
              }),
            Object.keys(o)
          );
        };
      },
    },
    methods: {
      openPage: function () {
        var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : "url",
          e = this[t];
        e && this.$u.route({ type: this.linkType, url: e });
      },
      $uGetRect: function (e, n) {
        var i = this;
        return new Promise(function (r) {
          t.index
            .createSelectorQuery()
            .in(i)
            [n ? "selectAll" : "select"](e)
            .boundingClientRect(function (t) {
              n && Array.isArray(t) && t.length && r(t), !n && t && r(t);
            })
            .exec();
        });
      },
      getParentData: function () {
        var e = this,
          n =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        this.parent || (this.parent = {}),
          (this.parent = t.index.$u.$parent.call(this, n)),
          this.parent.children &&
            -1 === this.parent.children.indexOf(this) &&
            this.parent.children.push(this),
          this.parent &&
            this.parentData &&
            Object.keys(this.parentData).map(function (t) {
              e.parentData[t] = e.parent[t];
            });
      },
      preventEvent: function (t) {
        t && "function" == typeof t.stopPropagation && t.stopPropagation();
      },
      noop: function (t) {
        this.preventEvent(t);
      },
    },
    onReachBottom: function () {
      t.index.$emit("uOnReachBottom");
    },
    beforeDestroy: function () {
      var e = this;
      if (this.parent && t.index.$u.test.array(this.parent.children)) {
        var n = this.parent.children;
        n.map(function (t, i) {
          t === e && n.splice(i, 1);
        });
      }
    },
  };
exports.mixin = e;
