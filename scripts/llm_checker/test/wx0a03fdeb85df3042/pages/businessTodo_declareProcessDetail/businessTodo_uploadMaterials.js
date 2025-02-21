var app = getApp(),
  path = app.globalData.path;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //全部文件路径
    totalFiles: [],
    //全部图片
    imgFile: [],
    //全部视频
    videoFile: [],
    //其他文件
    otherFile: [],
    //材料上传提交数据
    postData: {
      instanceAnnexId: "",
      fileName: "",
    },
    //删除材料提交数据
    delFileData: {
      id: "",
      mangodb_id: "",
    },
  },
  /**
   * 事件处理函数
   */
  //监听选择文件事件
  bindPickerFileTap: function bindPickerFileTap() {
    var that = this;
    //选择文件
    if (wx.chooseImage) {
      wx.chooseImage({
        success: function success(res) {
          var tempFiles = res.tempFiles;
          var tempImgFile = [],
            //临时存储文件
            oldTotalFile = that.data.totalFiles,
            //获取之前的文件
            oldImgFile = that.data.imgFile;

          //文件不能大于16M
          for (var i = 0; i < tempFiles.length; i++) {
            if (tempFiles[i].size > 1024 * 1024 * 16) {
              app.selfShowModal("文件不能大于16M,请重新选择");
              return;
            }
          }
          //符合限制条件后分类存储文件
          for (var j = 0; j < tempFiles.length; j++) {
            //选择了图片
            tempImgFile.push(tempFiles[j]);
          }
          //更新文件 数组合并
          Array.prototype.push.apply(oldTotalFile, tempFiles);
          Array.prototype.push.apply(oldImgFile, tempImgFile);
          that.setData({
            totalFiles: oldTotalFile,
            imgFile: oldImgFile,
          });
          console.log(that.data.imgFile);
        },
        fail: function fail(res) {
          console.log(res);
          app.selfShowModal("选择文件失败，请重新选择");
        },
      });
    } else {
      //基础库小于5.0
      app.selfShowModal("微信版本过低，暂不支持上传材料，请升级微信版本");
    }
  },
  //监听图片文件预览事件
  bindimagePreviewTap: function bindimagePreviewTap(e) {
    var that = this,
      idx = e.currentTarget.dataset.idx;
    var imgFile = that.data.imgFile,
      imgPathArr = [];
    for (var i = 0; i < imgFile.length; i++) {
      imgPathArr.push(imgFile[i].path || imgFile[i].url);
    }
    //预览图片
    wx.previewImage({
      urls: imgPathArr,
      current: imgPathArr[idx],
    });
  },
  //监听图片文件删除事件
  bindDelImgFileTap: function bindDelImgFileTap(e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var oldImgFileList = that.data.imgFile;

    //已经上传到数据库的，进行删库操作
    if (oldImgFileList[idx].id) {
      console.log(1);
      var temp = oldImgFileList[idx];
      //更新删除提交的数据
      that.setData({
        "delFileData.id": temp.id,
        "delFileData.mangodb_id": temp.mangodb_id,
      });
      //执行删除操作
      that.delFile();
    }
    //物理删除图片
    oldImgFileList.splice(idx, 1);
    that.setData({
      imgFile: oldImgFileList,
    });
  },
  //监听其他格式文件点击事件
  bindOtherPreviewTap: function bindOtherPreviewTap(e) {
    var idx = e.currentTarget.dataset.idx;
    var oldOtherFile = this.data.otherFile,
      //文件合集
      firstLoadPath = oldOtherFile[idx].path,
      //第一次上传的路径
      getfilePath = oldOtherFile[idx].path || oldOtherFile[idx].url; //当前文档路径
    var fileTypeArr, getfileType;

    //根据不同path获取文件类型
    if (firstLoadPath) {
      fileTypeArr = firstLoadPath.split("."); //分割路径
      getfileType = fileTypeArr[fileTypeArr.length - 1];
    } else {
      getfileType = oldOtherFile[idx].fileExt;
    }

    //判断文件是否可以直接打开
    if (firstLoadPath) {
      //直接打开文档
      wx.openDocument({
        filePath: firstLoadPath,
        fileType: getfileType,
        fail: function fail(res) {
          app.selfShowModal("打开文档失败");
        },
      });
    } else {
      //先下载文档到本地，再打开
      wx.downloadFile({
        url: getfilePath,
        success: function success(res) {
          //打开文档
          wx.openDocument({
            filePath: res.tempFilePath,
            fileType: getfileType,
            fail: function fail(res) {
              app.selfShowModal("打开文档失败");
            },
          });
        },
        fail: function fail() {
          app.selfShowModal("打开文档失败");
        },
      });
    }
  },
  //监听其他格式文件删除事件
  bindDelOtherFileTap: function bindDelOtherFileTap(e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var oldotherFileList = that.data.otherFile;

    //已经上传到数据库的，进行删库操作
    if (oldotherFileList[idx].id) {
      var temp = oldotherFileList[idx];
      //更新删除提交的数据
      that.setData({
        "delFileData.id": temp.id,
        "delFileData.mangodb_id": temp.mangodb_id,
      });
      //执行删除操作
      that.delFile();
    }
    //物理删除图片
    oldotherFileList.splice(idx, 1);
    that.setData({
      otherFile: oldotherFileList,
    });
  },
  //监听点击视频文件事件
  bindVideoPreviewTap: function bindVideoPreviewTap() {
    app.selfShowModal("暂不支持预览此格式的文件");
  },
  //监听删除视频文件事件
  bindDelVideoFileTap: function bindDelVideoFileTap(e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var oldVideoList = that.data.videoFile;

    //已经上传到数据库的，进行删库操作
    if (oldVideoList[idx].id) {
      var temp = oldVideoList[idx];
      //更新删除提交的数据
      that.setData({
        "delFileData.id": temp.id,
        "delFileData.mangodb_id": temp.mangodb_id,
      });
      //执行删除操作
      that.delFile();
    }
    //物理删除图片
    oldVideoList.splice(idx, 1);
    that.setData({
      videoFile: oldVideoList,
    });
  },
  //监听文件提交点击事件
  bindUploadFileTap: function bindUploadFileTap() {
    var that = this;
    var files = that.data.totalFiles;
    console.log(files);
    if (files.length == 0) {
      app.selfShowToast("请选择文件上传");
      return;
    }
    wx.showLoading({
      title: "上传中",
    });

    //移除之前已上传的文件
    var j = 0;
    while (j < files.length) {
      if (files[j].url) {
        files.splice(j, 1);
        j = 0;
        continue;
      }
      j++;
    }
    console.log(files);
    //没有要上传的文件，返回
    if (files.length == 0) {
      wx.hideLoading();
      app.selfShowToast("请选择文件上传");
      return;
    }
    //循环上传文件
    for (var i = 0; i < files.length; i++) {
      //第一次上传的文件进行上传（回显的文件没有path字段）
      //上传文件
      var uploadUrl = path + "/api/business/declaration/supply/file/upload";
      wx.uploadFile({
        url: uploadUrl,
        filePath: files[i].path,
        name: "file",
        //文件对应的key
        header: {
          "Content-Type": "multipart/form-data",
        },
        formData: that.data.postData,
        success: function success(res) {
          console.log(res);
          wx.hideLoading();
          //上传失败进行提示
          if (res.statusCode > 300) {
            app.selfShowModal(res.data.message || "上传失败,请重新上传");
            return;
          }
          //上传成功
          //返回上一级
          wx.navigateBack();
        },
        fail: function fail() {
          wx.hideLoading();
          app.selfShowModal("文件上传失败，请重新上传");
        },
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    wx.showLoading({
      title: "加载中",
    });
    console.log(options);
    var that = this,
      instanceId = options.instanceId;
    that.setData({
      "postData.instanceAnnexId": instanceId,
    });
    //显示已上传材料
    var listUrl = path + "/api/business/declaration/annex/list",
      listData = {
        instanceAnnexId: instanceId,
      };
    app
      .requestUrl(listUrl, listData, "GET")
      .then(function (res) {
        console.log(res);
        //没有已上传材料，返回
        if (res.data.result.length == 0) {
          wx.hideLoading();
          return;
        }
        var totalFile = res.data.result;
        //解析传过来的文件，回显文件
        var tempImgFile = [],
          //临时存储分类后的文件
          tempVideoFile = [],
          tempOtherFile = [];
        for (var i = 0; i < totalFile.length; i++) {
          var $this = totalFile[i];
          //是图片文件
          if (that.isImgFile($this.fileExt)) {
            tempImgFile.push($this);
          }
          //是视频文件
          else if (that.isVedioFile($this.fileExt)) {
            tempVideoFile.push($this);
          } else {
            //普通文件解析类型：word,excel,pdf,file
            var fileType = that.fileFormat($this.fileName);
            $this.fileType = fileType;
            tempOtherFile.push($this);
          }
        }
        //分类保存文件
        that.setData({
          totalFiles: totalFile,
          imgFile: tempImgFile,
          videoFile: tempVideoFile,
          otherFile: tempOtherFile,
        });
        console.log(that.data.imgFile);
        wx.hideLoading();
      })
      .catch(function (res) {
        wx.hideLoading();
        app.selfShowModal(res.message);
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {},
  /**
   * 自定义函数--根据文件路径判断格式，只支持文档、excel、psf、ppt等
   * @param {Object} path 路径名称
   */
  fileFormat: function fileFormat(path) {
    var suffix = "",
      //后缀名
      result = ""; // 返回结果
    var words = ["doc", "docx"],
      excels = ["xls", "xlsx"],
      pdfs = ["pdf"];
    try {
      var suffixArray = path.split(".");
      suffix = suffixArray[suffixArray.length - 1];
    } catch (e) {
      //TODO handle the exception
      suffix = "";
    }
    //是word文档，返回word字符串
    for (var i = 0; i < words.length; i++) {
      if (suffix == words[i]) {
        result = "word";
        return result;
      }
    }
    //是excel文档，返回excel字符串
    for (var _i = 0; _i < excels.length; _i++) {
      if (suffix == excels[_i]) {
        result = "excel";
        return result;
      }
    }
    //是pdf文档，返回pdf字符串
    for (var _i2 = 0; _i2 < pdfs.length; _i2++) {
      if (suffix == pdfs[_i2]) {
        result = "pdf";
        return result;
      }
    }
    //其他情况，返回file字符串
    result = "file";
    return result;
  },
  /**
   * 根据后缀名判断是否图片文件
   * @param {Object} suffix
   * @return {boolean} true:是图片文件
   */
  isImgFile: function isImgFile(suffix) {
    var imgSuffixArray = ["png", "jpg", "gif", "tif", "bmp"];
    for (var i = 0; i < imgSuffixArray.length; i++) {
      if (suffix == imgSuffixArray[i]) {
        return true;
      }
    }
    return false;
  },
  /**
   * 根据后缀名判断是否视频文件
   * @param {Object} suffix
   * @return {boolean} true:是视频文件
   */
  isVedioFile: function isVedioFile(suffix) {
    var vedioSuffixArray = ["mp4", "rmvb", "flv", "mpeg", "avi"];
    for (var i = 0; i < vedioSuffixArray.length; i++) {
      if (suffix == vedioSuffixArray[i]) {
        return true;
      }
    }
    return false;
  },
  /**
   * 封装文件删除接口
   */
  delFile: function delFile() {
    var that = this,
      delUrl = path + "/api/business/declaration/supply/file/delete",
      delData = that.data.delFileData;
    app
      .requestUrl(delUrl, delData, "POST")
      .then(function (res) {
        console.log(res);
        app.selfShowToast("删除成功");
      })
      .catch(function (res) {
        app.selfShowModal(res.message);
      });
  },
});
