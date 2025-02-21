var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  r = function (e) {
    return {
      enter: "u-".concat(e, "-enter u-").concat(e, "-enter-active"),
      "enter-to": "u-".concat(e, "-enter-to u-").concat(e, "-enter-active"),
      leave: "u-".concat(e, "-leave u-").concat(e, "-leave-active"),
      "leave-to": "u-".concat(e, "-leave-to u-").concat(e, "-leave-active"),
    };
  },
  a = {
    methods: {
      clickHandler: function () {
        this.$emit("click");
      },
      vueEnter: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (i = r(a.mode)),
                      (a.status = "enter"),
                      a.$emit("beforeEnter"),
                      (a.inited = !0),
                      (a.display = !0),
                      (a.classes = i.enter),
                      (e.next = 8),
                      n.nextTick$1()
                    );
                  case 8:
                    a.$emit("enter"),
                      (a.transitionEnded = !1),
                      a.$emit("afterEnter"),
                      (a.classes = i["enter-to"]);
                  case 12:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      vueLeave: function () {
        var a = this;
        return t(
          e().mark(function t() {
            var i;
            return e().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (a.display) {
                      e.next = 2;
                      break;
                    }
                    return e.abrupt("return");
                  case 2:
                    return (
                      (i = r(a.mode)),
                      (a.status = "leave"),
                      a.$emit("beforeLeave"),
                      (a.classes = i.leave),
                      (e.next = 8),
                      n.nextTick$1()
                    );
                  case 8:
                    (a.transitionEnded = !1),
                      a.$emit("leave"),
                      setTimeout(a.onTransitionEnd, a.duration),
                      (a.classes = i["leave-to"]);
                  case 12:
                  case "end":
                    return e.stop();
                }
            }, t);
          })
        )();
      },
      onTransitionEnd: function () {
        this.transitionEnded ||
          ((this.transitionEnded = !0),
          this.$emit("leave" === this.status ? "afterLeave" : "afterEnter"),
          !this.show &&
            this.display &&
            ((this.display = !1), (this.inited = !1)));
      },
    },
  };
exports.transition = a;
