var e = require("../../../common/vendor.js"),
  t = require("./utils.js"),
  i = require("./mixin.js"),
  s = require("./props.js"),
  a = require("../../libs/mixin/mpMixin.js"),
  n = require("../../libs/mixin/mixin.js"),
  o = {
    name: "u-upload",
    mixins: [a.mpMixin, n.mixin, i.mixinUp, s.props],
    data: function () {
      return { lists: [], isInCount: !0 };
    },
    watch: {
      fileList: {
        handler: function () {
          this.formatFileList();
        },
        immediate: !0,
        deep: !0,
      },
    },
    emits: [
      "error",
      "beforeRead",
      "oversize",
      "afterRead",
      "delete",
      "clickPreview",
    ],
    methods: {
      formatFileList: function () {
        var t = this,
          i = this.fileList,
          s = void 0 === i ? [] : i,
          a = this.maxCount,
          n = s.map(function (i) {
            return Object.assign(Object.assign({}, i), {
              isImage:
                "image" === t.accept || e.index.$u.test.image(i.url || i.thumb),
              isVideo:
                "video" === t.accept || e.index.$u.test.video(i.url || i.thumb),
              deletable:
                "boolean" == typeof i.deletable ? i.deletable : t.deletable,
            });
          });
        (this.lists = n), (this.isInCount = n.length < a);
      },
      chooseFile: function () {
        var i = this,
          s = this.maxCount,
          a = this.multiple,
          n = this.lists;
        if (!this.disabled) {
          var o;
          try {
            o = e.index.$u.test.array(this.capture)
              ? this.capture
              : this.capture.split(",");
          } catch (e) {
            o = [];
          }
          t.chooseFile(
            Object.assign(
              {
                accept: this.accept,
                multiple: this.multiple,
                capture: o,
                compressed: this.compressed,
                maxDuration: this.maxDuration,
                sizeType: this.sizeType,
                camera: this.camera,
              },
              { maxCount: s - n.length }
            )
          )
            .then(function (e) {
              i.onBeforeRead(a ? e : e[0]);
            })
            .catch(function (e) {
              i.$emit("error", e);
            });
        }
      },
      onBeforeRead: function (t) {
        var i = this,
          s = this.beforeRead,
          a = this.useBeforeRead,
          n = !0;
        e.index.$u.test.func(s) && (n = s(t, this.getDetail())),
          a &&
            (n = new Promise(function (e, s) {
              i.$emit(
                "beforeRead",
                Object.assign(Object.assign({ file: t }, i.getDetail()), {
                  callback: function (t) {
                    t ? e() : s();
                  },
                })
              );
            })),
          n &&
            (e.index.$u.test.promise(n)
              ? n.then(function (e) {
                  return i.onAfterRead(e || t);
                })
              : this.onAfterRead(t));
      },
      getDetail: function (e) {
        return { name: this.name, index: null != e ? e : this.fileList.length };
      },
      onAfterRead: function (e) {
        var t = this.maxSize,
          i = this.afterRead;
        (
          Array.isArray(e)
            ? e.some(function (e) {
                return e.size > t;
              })
            : e.size > t
        )
          ? this.$emit("oversize", Object.assign({ file: e }, this.getDetail()))
          : ("function" == typeof i && i(e, this.getDetail()),
            this.$emit(
              "afterRead",
              Object.assign({ file: e }, this.getDetail())
            ));
      },
      deleteItem: function (e) {
        this.$emit(
          "delete",
          Object.assign(Object.assign({}, this.getDetail(e)), {
            file: this.fileList[e],
          })
        );
      },
      onPreviewImage: function (t) {
        var i = this;
        !t.isImage ||
          !this.previewFullImage ||
          e.index.previewImage({
            urls: this.lists
              .filter(function (t) {
                return (
                  "image" === i.accept ||
                  e.index.$u.test.image(t.url || t.thumb)
                );
              })
              .map(function (e) {
                return e.url || e.thumb;
              }),
            current: t.url || t.thumb,
            fail: function () {
              e.index.$u.toast("预览图片失败");
            },
          });
      },
      onPreviewVideo: function (t) {
        if (this.data.previewFullImage) {
          var i = t.currentTarget.dataset.index,
            s = this.data.lists;
          e.wx$1.previewMedia({
            sources: s
              .filter(function (e) {
                return isVideoFile(e);
              })
              .map(function (e) {
                return Object.assign(Object.assign({}, e), { type: "video" });
              }),
            current: i,
            fail: function () {
              e.index.$u.toast("预览视频失败");
            },
          });
        }
      },
      onClickPreview: function (e) {
        var t = e.currentTarget.dataset.index,
          i = this.data.lists[t];
        this.$emit(
          "clickPreview",
          Object.assign(Object.assign({}, i), this.getDetail(t))
        );
      },
    },
  };
Array ||
  (e.resolveComponent("u-icon") + e.resolveComponent("u-loading-icon"))();
Math ||
  (
    function () {
      return "../u-icon/u-icon.js";
    } +
    function () {
      return "../u-loading-icon/u-loading-icon.js";
    }
  )();
var r = e._export_sfc(o, [
  [
    "render",
    function (t, i, s, a, n, o) {
      return e.e(
        { a: t.previewImage },
        t.previewImage
          ? {
              b: e.f(n.lists, function (i, s, a) {
                return e.e(
                  { a: i.isImage || (i.type && "image" === i.type) },
                  i.isImage || (i.type && "image" === i.type)
                    ? {
                        b: i.thumb || i.url,
                        c: t.imageMode,
                        d: e.o(function (e) {
                          return o.onPreviewImage(i);
                        }, s),
                        e: e.s({
                          width: t.$u.addUnit(t.width),
                          height: t.$u.addUnit(t.height),
                        }),
                      }
                    : {
                        f: "895b3a47-0-" + a,
                        g: e.p({
                          color: "#80CBF9",
                          size: "26",
                          name:
                            i.isVideo || (i.type && "video" === i.type)
                              ? "movie"
                              : "folder",
                        }),
                        h: e.t(
                          i.isVideo || (i.type && "video" === i.type)
                            ? "视频"
                            : "文件"
                        ),
                      },
                  { i: "uploading" === i.status || "failed" === i.status },
                  "uploading" === i.status || "failed" === i.status
                    ? e.e(
                        { j: "failed" === i.status },
                        "failed" === i.status
                          ? {
                              k: "895b3a47-1-" + a,
                              l: e.p({
                                name: "close-circle",
                                color: "#ffffff",
                                size: "25",
                              }),
                            }
                          : {
                              m: "895b3a47-2-" + a,
                              n: e.p({
                                size: "22",
                                mode: "circle",
                                color: "#ffffff",
                              }),
                            },
                        { o: i.message },
                        i.message ? { p: e.t(i.message) } : {}
                      )
                    : {},
                  {
                    q: "uploading" !== i.status && (t.deletable || i.deletable),
                  },
                  "uploading" !== i.status && (t.deletable || i.deletable)
                    ? {
                        r: "895b3a47-3-" + a,
                        s: e.p({ name: "close", color: "#ffffff", size: "10" }),
                        t: e.o(function (e) {
                          return o.deleteItem(s);
                        }, s),
                      }
                    : {},
                  { v: "success" === i.status },
                  "success" === i.status
                    ? {
                        w: "895b3a47-4-" + a,
                        x: e.p({
                          name: "checkmark",
                          color: "#ffffff",
                          size: "12",
                        }),
                      }
                    : {},
                  { y: s }
                );
              }),
            }
          : {},
        { c: n.isInCount },
        n.isInCount
          ? e.e(
              { d: t.$slots.default || t.$slots.$default },
              t.$slots.default || t.$slots.$default
                ? {
                    e: e.o(function () {
                      return o.chooseFile && o.chooseFile.apply(o, arguments);
                    }),
                  }
                : e.e(
                    {
                      f: e.p({
                        name: t.uploadIcon,
                        size: "26",
                        color: t.uploadIconColor,
                      }),
                      g: t.uploadText,
                    },
                    t.uploadText ? { h: e.t(t.uploadText) } : {},
                    {
                      i: t.disabled ? "" : "u-upload__button--hover",
                      j: e.o(function () {
                        return o.chooseFile && o.chooseFile.apply(o, arguments);
                      }),
                      k: e.n(t.disabled && "u-upload__button--disabled"),
                      l: e.s({
                        width: t.$u.addUnit(t.width),
                        height: t.$u.addUnit(t.height),
                      }),
                    }
                  )
            )
          : {},
        { m: e.s(t.$u.addStyle(t.customStyle)) }
      );
    },
  ],
  ["__scopeId", "data-v-895b3a47"],
]);
wx.createComponent(r);
