var e = require("../../libs/config/props.js"),
  p = {
    props: {
      accept: { type: String, default: e.defprops.upload.accept },
      capture: { type: [String, Array], default: e.defprops.upload.capture },
      compressed: { type: Boolean, default: e.defprops.upload.compressed },
      camera: { type: String, default: e.defprops.upload.camera },
      maxDuration: { type: Number, default: e.defprops.upload.maxDuration },
      uploadIcon: { type: String, default: e.defprops.upload.uploadIcon },
      uploadIconColor: {
        type: String,
        default: e.defprops.upload.uploadIconColor,
      },
      useBeforeRead: {
        type: Boolean,
        default: e.defprops.upload.useBeforeRead,
      },
      afterRead: { type: Function, default: null },
      beforeRead: { type: Function, default: null },
      previewFullImage: {
        type: Boolean,
        default: e.defprops.upload.previewFullImage,
      },
      maxCount: { type: [String, Number], default: e.defprops.upload.maxCount },
      disabled: { type: Boolean, default: e.defprops.upload.disabled },
      imageMode: { type: String, default: e.defprops.upload.imageMode },
      name: { type: String, default: e.defprops.upload.name },
      sizeType: { type: Array, default: e.defprops.upload.sizeType },
      multiple: { type: Boolean, default: e.defprops.upload.multiple },
      deletable: { type: Boolean, default: e.defprops.upload.deletable },
      maxSize: { type: [String, Number], default: e.defprops.upload.maxSize },
      fileList: { type: Array, default: e.defprops.upload.fileList },
      uploadText: { type: String, default: e.defprops.upload.uploadText },
      width: { type: [String, Number], default: e.defprops.upload.width },
      height: { type: [String, Number], default: e.defprops.upload.height },
      previewImage: { type: Boolean, default: e.defprops.upload.previewImage },
    },
  };
exports.props = p;
