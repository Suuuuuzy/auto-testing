var t = {
    "_toast_.isHide": !1,
    "_toast_.content": "",
    "_toast_.icon": "",
    "_toast_.color": "",
  },
  s = {
    showT: function (t, s) {
      console.log("showt"),
        t.icon && this.setData({ "_toast_.icon": t.icon }),
        t.color && this.setData({ "_toast_.color": t.color }),
        t.isUy && this.setData({ "_toast_.isUy": t.isUy });
      var o = this;
      this.setData({ "_toast_.isHide": !0, "_toast_.content": t.content }),
        setTimeout(function () {
          o.setData({ "_toast_.isHide": !1 }), "function" == typeof s && s();
        }, 2e3);
    },
  };
module.exports = {
  ToastPannel: function () {
    var o = getCurrentPages(),
      a = o[o.length - 1];
    return (
      (this.__page = a),
      Object.assign(a, s),
      (a.toastPannel = this),
      a.setData(t),
      this
    );
  },
};
