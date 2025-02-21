var e = {
  upload: {
    accept: "image",
    capture: function () {
      return ["album", "camera"];
    },
    compressed: !0,
    camera: "back",
    maxDuration: 60,
    uploadIcon: "camera-fill",
    uploadIconColor: "#D3D4D6",
    useBeforeRead: !1,
    previewFullImage: !0,
    maxCount: 52,
    disabled: !1,
    imageMode: "aspectFill",
    name: "",
    sizeType: function () {
      return ["original", "compressed"];
    },
    multiple: !1,
    deletable: !0,
    maxSize: Number.MAX_VALUE,
    fileList: function () {
      return [];
    },
    uploadText: "",
    width: 80,
    height: 80,
    previewImage: !0,
  },
};
exports.Upload = e;
