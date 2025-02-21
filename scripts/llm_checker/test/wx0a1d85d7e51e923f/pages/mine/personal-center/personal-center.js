var a;
getApp().BasePage({
  data: {
    selectedMenuIndex: 0,
    imgList: [],
    selectItem: { area: null, types: [], sex: null, age: null },
    formData: {
      name: "",
      phone: "",
      area_id: 0,
      typeIds: [],
      sex: 0,
      age: 0,
      menu_id: 0,
      desc: "",
    },
    sexData: [
      { id: 1, uy_name: "ئەر", ch_name: "男" },
      { id: 2, uy_name: "ئايال", ch_name: "女" },
    ],
    ageData: [
      { id: 1, uy_name: "18~25", ch_name: "18~25" },
      { id: 2, uy_name: "25~40", ch_name: "25~40" },
      { id: 3, uy_name: "40~50", ch_name: "40~50" },
      { id: 4, uy_name: "50~60", ch_name: "50~60" },
    ],
    focus: { name: !1, phone: !1, desc: !1 },
  },
  onLoad: function (t) {
    (a = this), (this.dialog = this.selectComponent("#dialog")), a.loadData();
  },
  initFormData: function () {
    this.setData({
      formData: {
        name: "",
        phone: "",
        area_id: 0,
        typeIds: [],
        sex: 0,
        age: 0,
        menu_id: 0,
        desc: "",
      },
      selectItem: { area: null, types: [], sex: null, age: null },
    }),
      this.data.infoData &&
        (this.data.infoData.types.forEach(function (a) {
          a.checked = !1;
        }),
        this.setData({ infoData: this.data.infoData }));
  },
  loadData: function () {
    this.requestWithLoading("profile/personalPage", {}, function (t) {
      t && (a.setData({ pageData: t }), a.loadInfo());
    });
  },
  loadInfo: function () {
    this.initFormData(),
      this.data.pageData &&
        this.data.pageData.menu &&
        ((this.data.formData.menu_id =
          this.data.pageData.menu[this.data.selectedMenuIndex].id),
        this.requestWithLoading(
          "profile/loadInfo",
          { menuId: this.data.pageData.menu[this.data.selectedMenuIndex].id },
          function (t) {
            t && a.setData({ infoData: t });
          }
        ));
  },
  menuClick: function (t) {
    var e = t.currentTarget.dataset.index;
    a.setData({ selectedMenuIndex: e }), this.loadInfo();
  },
  chooseImage: function () {
    var a = this;
    this.isEditing
      ? wx.navigateTo({
          url: "../image-page/image-page?pageIndex=1&id=" + this.productId,
        })
      : wx.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album"],
          success: function (t) {
            0 != a.data.imgList.length
              ? a.setData({
                  imgList: a.data.imgList.concat({
                    url: t.tempFilePaths[0],
                    state: "local",
                  }),
                })
              : a.setData({
                  imgList: [{ url: t.tempFilePaths[0], state: "local" }],
                });
          },
        });
  },
  viewImage: function (a) {
    var t = [a.currentTarget.dataset.url];
    wx.previewImage({ current: t[0], urls: t });
  },
  delImg: function (a) {
    this.isEditing
      ? wx.navigateTo({
          url: "../image-page/image-page?pageIndex=1&id=" + this.productId,
        })
      : (this.data.imgList.splice(a.currentTarget.dataset.index, 1),
        this.setData({ imgList: this.data.imgList }));
  },
  bindInput: function (a) {
    var t = a.currentTarget.dataset.type;
    console.log("fuck type ---\x3e>", t),
      1 == t && (this.data.formData.name = a.detail.value),
      2 == t &&
        a.detail.value.length <= 11 &&
        (this.data.formData.phone = a.detail.value),
      3 == t && (this.data.formData.desc = a.detail.value),
      this.setData({ formData: this.data.formData });
  },
  selectChange: function (a) {
    switch ((console.log(a), this.data.selectIndex)) {
      case 1:
        (this.data.formData.area_id =
          this.data.infoData.areas[a.detail.value].id),
          (this.data.selectItem.area =
            this.data.infoData.areas[a.detail.value]);
        break;
      case 2:
        (this.data.formData.sex = this.data.sexData[a.detail.value].id),
          (this.data.selectItem.sex = this.data.sexData[a.detail.value]);
        break;
      case 3:
        (this.data.formData.age = this.data.ageData[a.detail.value].uy_name),
          (this.data.selectItem.age = this.data.ageData[a.detail.value]);
    }
    this.setData({
      formData: this.data.formData,
      selectItem: this.data.selectItem,
      modalName: "",
    });
  },
  selectSex: function () {
    var a = this.data.sexData;
    for (var t in a)
      this.data.selectItem.sex && this.data.selectItem.sex.id == a[t].id
        ? (a[t].checked = !0)
        : (a[t].checked = !1);
    (this.data.sexData = a),
      this.setData({ selectData: a, modalName: "selectModal", selectIndex: 2 });
  },
  selectAge: function () {
    var a = this.data.ageData;
    for (var t in a)
      this.data.selectItem.age && this.data.selectItem.age.id == a[t].id
        ? (a[t].checked = !0)
        : (a[t].checked = !1);
    (this.data.ageData = a),
      this.setData({ selectData: a, modalName: "selectModal", selectIndex: 3 });
  },
  selectAreaClick: function () {
    var a = this.data.infoData.areas;
    for (var t in a)
      this.data.selectItem.area && this.data.selectItem.area.id == a[t].id
        ? (a[t].checked = !0)
        : (a[t].checked = !1);
    (this.data.infoData.areas = a),
      this.setData({ selectData: a, modalName: "selectModal", selectIndex: 1 });
  },
  selectTypeClick: function () {
    var a = this.data.infoData.types,
      t = this.data.formData.typeIds;
    for (var e in a) for (var s in t) a[e].id == t[s] && (a[e].checked = !0);
    this.setData({ modalName: "TypeModal", infoData: this.data.infoData });
  },
  typeCheckbox: function (a) {
    var t = a.currentTarget.dataset.index;
    this.data.infoData.types[t].checked = !this.data.infoData.types[t].checked;
    var e = 0;
    this.data.infoData.types.forEach(function (a) {
      a.checked && e++;
    }),
      this.setData({ infoData: this.data.infoData, checkedCount: e });
  },
  confirmType: function (a) {
    (this.data.formData.typeIds = []), (this.data.selectItem.types = []);
    var t = this.data.infoData.types;
    for (var e in t)
      t[e].checked &&
        (this.data.formData.typeIds.push(t[e].id),
        this.data.selectItem.types.push(t[e]));
    this.setData({ selectItem: this.data.selectItem }), this.hideModal();
  },
  hideModal: function () {
    this.setData({ modalName: "" });
    var t = this.data.infoData.types;
    for (var e in t) t[e].checked = !1;
    a.setData({ infoData: this.data.infoData });
  },
  subBtn: function (t) {
    if (0 != this.data.imgList.length)
      if (this.data.formData.name)
        if (this.data.formData.sex)
          if (this.data.formData.age)
            if (this.data.formData.phone)
              if (11 == a.data.formData.phone.length)
                if (0 != a.data.formData.area_id)
                  if (0 != a.data.formData.typeIds.length)
                    if (a.data.formData.desc) {
                      var e = {
                        token: this.user.getToken(),
                        formData: JSON.stringify(a.data.formData),
                      };
                      this._upload(e);
                    } else
                      this.showT(
                        {
                          content: a.data.Str.selfIntrduction[a.data.lanIndex],
                        },
                        function (t) {
                          (a.data.focus.desc = !0),
                            a.setData({ focus: a.data.focus });
                        }
                      );
                  else
                    this.showT(
                      { content: a.data.Str.selectTypes[a.data.lanIndex] },
                      function (t) {
                        a.selectTypeClick();
                      }
                    );
                else
                  this.showT(
                    { content: a.data.Str.selectArea[a.data.lanIndex] },
                    function (t) {
                      a.selectAreaClick();
                    }
                  );
              else
                this.showT(
                  { content: a.data.Str.errPhone[a.data.lanIndex] },
                  function (t) {
                    (a.data.focus.phone = !0),
                      a.setData({ focus: a.data.focus });
                  }
                );
            else
              this.showT(
                { content: a.data.Str.inputPhone[a.data.lanIndex] },
                function (t) {
                  (a.data.focus.phone = !0), a.setData({ focus: a.data.focus });
                }
              );
          else
            this.showT(
              { content: a.data.Str.age[a.data.lanIndex] },
              function (t) {
                a.selectAge();
              }
            );
        else
          this.showT(
            { content: a.data.Str.sex[a.data.lanIndex] },
            function (t) {
              a.selectSex();
            }
          );
      else
        this.showT(
          { content: a.data.Str.inputName[a.data.lanIndex] },
          function (t) {
            (a.data.focus.name = !0), a.setData({ focus: a.data.focus });
          }
        );
    else
      this.showT(
        { content: a.data.Str.uploadYourImage[a.data.lanIndex] },
        function (t) {
          a.chooseImage();
        }
      );
  },
  _upload: function (t) {
    this.setData({ isLoading: !0 }),
      wx.uploadFile({
        url: this.req.getBaseUrl() + "profile/createServiceUser",
        filePath: this.data.imgList[0].url,
        name: "source",
        header: { "Content-Type": "multipart/form-data" },
        formData: t,
        success: function (t) {
          var e;
          a.setData({ isLoading: !1 });
          try {
            e = JSON.parse(t.data);
          } catch (a) {
            e = !1;
          }
          e && 0 != e.resultCode
            ? 1 != e.resultCode ||
              a.successToast(function () {
                a.loadInfo();
              })
            : a.failureToast();
        },
        fail: function (t) {
          a.setData({ isLoading: !1 }), a.failureToast();
        },
        complete: function (a) {},
      });
  },
  deleteBtn: function (t) {
    var e = this,
      s = t.currentTarget.dataset.id;
    this.setData({ dialogContent: this.data.Str.realyDel[this.data.lanIndex] }),
      this.dialog.show(function (t) {
        s &&
          e.requestWithLoading(
            "profile/deleteServiceUser",
            { id: s },
            function (t) {
              t &&
                a.successToast(function () {
                  a.loadInfo();
                });
            }
          );
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
