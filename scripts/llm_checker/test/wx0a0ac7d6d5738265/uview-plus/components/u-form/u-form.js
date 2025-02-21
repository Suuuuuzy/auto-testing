require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/toConsumableArray"),
  n = require("../../../@babel/runtime/helpers/defineProperty"),
  i = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  o = require("./props.js"),
  a = require("../../libs/mixin/mpMixin.js"),
  l = require("../../libs/mixin/mixin.js"),
  u = require("../../libs/util/async-validator.js");
u.Schema.warning = function () {};
var s = {
  name: "u-form",
  mixins: [a.mpMixin, l.mixin, o.props],
  provide: function () {
    return { uForm: this };
  },
  data: function () {
    return { formRules: {}, validator: {}, originalModel: null };
  },
  watch: {
    rules: {
      immediate: !0,
      handler: function (e) {
        this.setRules(e);
      },
    },
    propsChange: function (e) {
      var r;
      null != (r = this.children) &&
        r.length &&
        this.children.map(function (e) {
          "function" == typeof e.updateParentData && e.updateParentData();
        });
    },
    model: {
      immediate: !0,
      handler: function (e) {
        this.originalModel || (this.originalModel = t.index.$u.deepClone(e));
      },
    },
  },
  computed: {
    propsChange: function () {
      return [
        this.errorType,
        this.borderBottom,
        this.labelPosition,
        this.labelWidth,
        this.labelAlign,
        this.labelStyle,
      ];
    },
  },
  created: function () {
    this.children = [];
  },
  methods: {
    setRules: function (e) {
      if (0 !== Object.keys(e).length) {
        if (0 === Object.keys(this.model).length)
          return void t.index.$u.error(
            "设置rules，model必须设置！如果已经设置，请刷新页面。"
          );
        (this.formRules = e), (this.validator = new u.Schema(e));
      }
    },
    resetFields: function () {
      this.resetModel();
    },
    resetModel: function (e) {
      var r = this;
      this.children.map(function (e) {
        var n = null == e ? void 0 : e.prop,
          i = t.index.$u.getProperty(r.originalModel, n);
        t.index.$u.setProperty(r.model, n, i);
      });
    },
    clearValidate: function (e) {
      (e = [].concat(e)),
        this.children.map(function (r) {
          (void 0 === e[0] || e.includes(r.prop)) && (r.message = null);
        });
    },
    validateField: function (o, a) {
      var l = arguments,
        s = this;
      return i(
        e().mark(function i() {
          var c;
          return e().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  (c = l.length > 2 && void 0 !== l[2] ? l[2] : null),
                    s.$nextTick(function () {
                      var e = [];
                      (o = [].concat(o)),
                        s.children.map(function (i) {
                          var a = [];
                          if (o.includes(i.prop)) {
                            var l = t.index.$u.getProperty(s.model, i.prop),
                              d = i.prop.split("."),
                              p = d[d.length - 1],
                              h = s.formRules[i.prop];
                            if (!h) return;
                            for (
                              var m = [].concat(h), f = 0;
                              f < m.length;
                              f++
                            ) {
                              var v = m[f],
                                g = [].concat(null == v ? void 0 : v.trigger);
                              (c && !g.includes(c)) ||
                                new u.Schema(n({}, p, v)).validate(
                                  n({}, p, l),
                                  function (n, o) {
                                    var l;
                                    t.index.$u.test.array(n) &&
                                      (e.push.apply(e, r(n)),
                                      a.push.apply(a, r(n))),
                                      (i.message =
                                        null != (l = a[0]) && l.message
                                          ? a[0].message
                                          : null);
                                  }
                                );
                            }
                          }
                        }),
                        "function" == typeof a && a(e);
                    });
                case 2:
                case "end":
                  return e.stop();
              }
          }, i);
        })
      )();
    },
    validate: function (e) {
      var r = this;
      if (0 !== Object.keys(this.formRules).length)
        return new Promise(function (e, n) {
          r.$nextTick(function () {
            var i = r.children.map(function (e) {
              return e.prop;
            });
            r.validateField(i, function (i) {
              i.length
                ? ("toast" === r.errorType && t.index.$u.toast(i[0].message),
                  n(i))
                : e(!0);
            });
          });
        });
      t.index.$u.error("未设置rules，请看文档说明！如果已经设置，请刷新页面。");
    },
  },
};
var c = t._export_sfc(s, [
  [
    "render",
    function (e, r, n, i, t, o) {
      return {};
    },
  ],
]);
wx.createComponent(c);
