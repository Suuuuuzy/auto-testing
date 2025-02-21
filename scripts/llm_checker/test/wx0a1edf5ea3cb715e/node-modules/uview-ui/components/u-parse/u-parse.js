require("../../../../@babel/runtime/helpers/Arrayincludes"),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    ["node-modules/uview-ui/components/u-parse/u-parse"],
    {
      "1cca": function (e, t, n) {
        n.d(t, "b", function () {
          return i;
        }),
          n.d(t, "c", function () {
            return o;
          }),
          n.d(t, "a", function () {});
        var i = function () {
            this.$createElement;
            var e = (this._self._c, this.nodes.length);
            this.$mp.data = Object.assign({}, { $root: { g0: e } });
          },
          o = [];
      },
      "4fae": function (e, t, n) {
        var i = n("6c0b");
        n.n(i).a;
      },
      "6c0b": function (e, t, n) {},
      "98bd": function (e, t, n) {
        n.r(t);
        var i = n("1cca"),
          o = n("a00c");
        for (var s in o)
          ["default"].indexOf(s) < 0 &&
            (function (e) {
              n.d(t, e, function () {
                return o[e];
              });
            })(s);
        n("4fae");
        var a = n("f0c5"),
          r = Object(a.a)(
            o.default,
            i.b,
            i.c,
            !1,
            null,
            null,
            null,
            !1,
            i.a,
            void 0
          );
        t.default = r.exports;
      },
      a00c: function (e, t, n) {
        n.r(t);
        var i = n("fd08"),
          o = n.n(i);
        for (var s in i)
          ["default"].indexOf(s) < 0 &&
            (function (e) {
              n.d(t, e, function () {
                return i[e];
              });
            })(s);
        t.default = o.a;
      },
      fd08: function (e, t, n) {
        (function (e, i) {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var o = {},
            s = e.getFileSystemManager ? e.getFileSystemManager() : null,
            a = n("19b9"),
            r = {
              name: "parser",
              data: function () {
                return { showAm: "", nodes: [] };
              },
              components: {
                trees: function () {
                  n.e("node-modules/uview-ui/components/u-parse/libs/trees")
                    .then(
                      function () {
                        return resolve(n("916b"));
                      }.bind(null, n)
                    )
                    .catch(n.oe);
                },
              },
              props: {
                html: String,
                autopause: { type: Boolean, default: !0 },
                autoscroll: Boolean,
                autosetTitle: { type: Boolean, default: !0 },
                compress: Number,
                loadingImg: String,
                useCache: Boolean,
                domain: String,
                lazyLoad: Boolean,
                selectable: Boolean,
                tagStyle: Object,
                showWithAnimation: Boolean,
                useAnchor: Boolean,
              },
              watch: {
                html: function (e) {
                  this.setContent(e);
                },
              },
              created: function () {
                (this.imgList = []),
                  (this.imgList.each = function (e) {
                    for (var t = 0, n = this.length; t < n; t++)
                      this.setItem(t, e(this[t], t, this));
                  }),
                  (this.imgList.setItem = function (e, t) {
                    var n = this;
                    if (null != e && t) {
                      if (0 == t.indexOf("http") && this.includes(t)) {
                        for (
                          var o, a = t.split("://")[0], r = a.length;
                          (o = t[r]) &&
                          ("/" != o || "/" == t[r - 1] || "/" == t[r + 1]);
                          r++
                        )
                          a += Math.random() > 0.5 ? o.toUpperCase() : o;
                        return (a += t.substr(r)), (this[e] = a);
                      }
                      if (((this[e] = t), t.includes("data:image"))) {
                        var c,
                          l = t.match(/data:image\/(\S+?);(\S+?),(.+)/);
                        if (!l) return;
                        (c = ""
                          .concat(i.env.USER_DATA_PATH, "/")
                          .concat(Date.now(), ".")
                          .concat(l[1])),
                          s &&
                            s.writeFile({
                              filePath: c,
                              data: l[3],
                              encoding: l[2],
                              success: function () {
                                return (n[e] = c);
                              },
                            });
                      }
                    }
                  });
              },
              mounted: function () {
                this.html && this.setContent(this.html);
              },
              beforeDestroy: function () {
                this.imgList.each(function (t) {
                  t &&
                    t.includes(e.env.USER_DATA_PATH) &&
                    s &&
                    s.unlink({ filePath: t });
                }),
                  clearInterval(this._timer);
              },
              methods: {
                setContent: function (t, n) {
                  var i,
                    s = this;
                  if (!t) return (this.nodes = []);
                  var r,
                    c = new a(t, this);
                  if (this.useCache) {
                    var l = (function (e) {
                      for (var t = e.length, n = 5381; t--; )
                        n += (n << 5) + e.charCodeAt(t);
                      return n;
                    })(t);
                    o[l] ? (i = o[l]) : ((i = c.parse()), (o[l] = i));
                  } else i = c.parse();
                  this.$emit("parse", i),
                    (this.nodes = n ? this.nodes.concat(i) : i),
                    i.length &&
                      i.title &&
                      this.autosetTitle &&
                      e.setNavigationBarTitle({ title: i.title }),
                    this.imgList && (this.imgList.length = 0),
                    (this.videoContexts = []),
                    this.$nextTick(function () {
                      (function e(t) {
                        for (var n = t.length; n--; )
                          t[n].top &&
                            ((t[n].controls = []),
                            t[n].init(),
                            e(t[n].$children));
                      })(s.$children),
                        s.$emit("load");
                    }),
                    clearInterval(this._timer),
                    (this._timer = setInterval(function () {
                      e.createSelectorQuery()
                        .in(s)
                        .select("#_top")
                        .boundingClientRect()
                        .exec(function (e) {
                          e &&
                            ((s.rect = e[0]),
                            s.rect.height == r &&
                              (s.$emit("ready", s.rect),
                              clearInterval(s._timer)),
                            (r = s.rect.height));
                        });
                    }, 350)),
                    this.showWithAnimation &&
                      !n &&
                      (this.showAm = "animation:_show .5s");
                },
                getText: function () {
                  for (
                    var e,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : this.nodes,
                      n = "",
                      i = 0;
                    (e = t[i++]);

                  )
                    if ("text" == e.type)
                      n += e.text
                        .replace(/&nbsp;/g, " ")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&amp;/g, "&");
                    else if ("br" == e.type) n += "\n";
                    else {
                      var o =
                        "p" == e.name ||
                        "div" == e.name ||
                        "tr" == e.name ||
                        "li" == e.name ||
                        ("h" == e.name[0] &&
                          e.name[1] > "0" &&
                          e.name[1] < "7");
                      o && n && "\n" != n[n.length - 1] && (n += "\n"),
                        e.children && (n += this.getText(e.children)),
                        o && "\n" != n[n.length - 1]
                          ? (n += "\n")
                          : ("td" != e.name && "th" != e.name) || (n += "\t");
                    }
                  return n;
                },
                in: function (e) {
                  e.page && e.selector && e.scrollTop && (this._in = e);
                },
                navigateTo: function (t) {
                  var n = this;
                  if (!this.useAnchor)
                    return t.fail && t.fail("Anchor is disabled");
                  var i = e
                    .createSelectorQuery()
                    .in(this._in ? this._in.page : this)
                    .select(
                      (this._in ? this._in.selector : "#_top") +
                        (t.id
                          ? ""
                              .concat(">>>", "#")
                              .concat(t.id, ",")
                              .concat(this._in ? this._in.selector : "#_top")
                              .concat(">>>", ".")
                              .concat(t.id)
                          : "")
                    )
                    .boundingClientRect();
                  this._in
                    ? i
                        .select(this._in.selector)
                        .scrollOffset()
                        .select(this._in.selector)
                        .boundingClientRect()
                    : i.selectViewport().scrollOffset(),
                    i.exec(function (i) {
                      if (!i[0]) return t.fail && t.fail("Label not found");
                      var o =
                        i[1].scrollTop +
                        i[0].top -
                        (i[2] ? i[2].top : 0) +
                        (t.offset || 0);
                      n._in
                        ? (n._in.page[n._in.scrollTop] = o)
                        : e.pageScrollTo({ scrollTop: o, duration: 300 }),
                        t.success && t.success();
                    });
                },
                getVideoContext: function (e) {
                  if (!e) return this.videoContexts;
                  for (var t = this.videoContexts.length; t--; )
                    if (this.videoContexts[t].id == e)
                      return this.videoContexts[t];
                },
              },
            };
          t.default = r;
        }).call(this, n("543d").default, n("bc2e").default);
      },
    },
  ]),
  (global.webpackJsonp = global.webpackJsonp || []).push([
    "node-modules/uview-ui/components/u-parse/u-parse-create-component",
    {
      "node-modules/uview-ui/components/u-parse/u-parse-create-component":
        function (e, t, n) {
          n("543d").createComponent(n("98bd"));
        },
    },
    [["node-modules/uview-ui/components/u-parse/u-parse-create-component"]],
  ]);
