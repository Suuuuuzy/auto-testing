Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.default = void 0);
var t = [],
  e = {
    show: !1,
    title: "",
    width: null,
    theme: "default",
    message: "",
    zIndex: 100,
    overlay: !0,
    selector: "#van-dialog",
    className: "",
    asyncClose: !1,
    transition: "scale",
    customStyle: "",
    messageAlign: "",
    overlayStyle: "",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: "",
  },
  n = Object.assign({}, e);
var o = function (e) {
  return (
    (e = Object.assign(Object.assign({}, n), e)),
    new Promise(function (n, o) {
      var s,
        c = (
          e.context || (s = getCurrentPages())[s.length - 1]
        ).selectComponent(e.selector);
      delete e.context,
        delete e.selector,
        c
          ? (c.setData(Object.assign({ onCancel: o, onConfirm: n }, e)),
            wx.nextTick(function () {
              c.setData({ show: !0 });
            }),
            t.push(c))
          : console.warn(
              "未找到 van-dialog 节点，请确认 selector 及 context 是否正确"
            );
    })
  );
};
(o.alert = function (t) {
  return o(t);
}),
  (o.confirm = function (t) {
    return o(Object.assign({ showCancelButton: !0 }, t));
  }),
  (o.close = function () {
    t.forEach(function (t) {
      t.close();
    }),
      (t = []);
  }),
  (o.stopLoading = function () {
    t.forEach(function (t) {
      t.stopLoading();
    });
  }),
  (o.currentOptions = n),
  (o.defaultOptions = e),
  (o.setDefaultOptions = function (t) {
    (n = Object.assign(Object.assign({}, n), t)), (o.currentOptions = n);
  }),
  (o.resetDefaultOptions = function () {
    (n = Object.assign({}, e)), (o.currentOptions = n);
  }),
  o.resetDefaultOptions();
exports.default = o;
