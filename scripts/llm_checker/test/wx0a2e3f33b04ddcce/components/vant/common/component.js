Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VantComponent = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      i = {};
    t(e, i, {
      data: "data",
      props: "properties",
      mixins: "behaviors",
      methods: "methods",
      beforeCreate: "created",
      created: "attached",
      mounted: "ready",
      relations: "relations",
      destroyed: "detached",
      classes: "externalClasses",
    });
    var r = e.relation;
    r && s(i, e, r);
    (i.externalClasses = i.externalClasses || []),
      i.externalClasses.push("custom-class"),
      (i.behaviors = i.behaviors || []),
      i.behaviors.push(n.basic),
      e.field && i.behaviors.push("wx://form-field");
    i.properties &&
      Object.keys(i.properties).forEach(function (e) {
        Array.isArray(i.properties[e]) && (i.properties[e] = null);
      });
    (i.options = { multipleSlots: !0, addGlobalClass: !0 }), Component(i);
  });
var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../mixins/basic"),
  i = {
    ancestor: {
      linked: function (e) {
        this.parent = e;
      },
      unlinked: function () {
        this.parent = null;
      },
    },
    descendant: {
      linked: function (e) {
        (this.children = this.children || []), this.children.push(e);
      },
      unlinked: function (e) {
        this.children = (this.children || []).filter(function (n) {
          return n !== e;
        });
      },
    },
  };
function t(e, n, i) {
  Object.keys(i).forEach(function (t) {
    e[t] && (n[i[t]] = e[t]);
  });
}
function s(n, t, s) {
  var r = s.type,
    a = s.name,
    d = s.linked,
    o = s.unlinked,
    l = s.linkChanged,
    c = t.beforeCreate,
    h = t.destroyed;
  "descendant" === r &&
    ((n.created = function () {
      c && c.bind(this)(), (this.children = this.children || []);
    }),
    (n.detached = function () {
      (this.children = []), h && h.bind(this)();
    })),
    (n.relations = Object.assign(
      n.relations || {},
      e({}, "../".concat(a, "/index"), {
        type: r,
        linked: function (e) {
          i[r].linked.bind(this)(e), d && d.bind(this)(e);
        },
        linkChanged: function (e) {
          l && l.bind(this)(e);
        },
        unlinked: function (e) {
          i[r].unlinked.bind(this)(e), o && o.bind(this)(e);
        },
      })
    ));
}
