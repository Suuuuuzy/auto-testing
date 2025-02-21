var t,
  a =
    (t = require("../../../../service/lib/map/qqmap-wx-jssdk.min")) &&
    t.__esModule
      ? t
      : { default: t };
var o,
  e,
  s = getApp(),
  n = requirePlugin("chooseLocation");
s.BasePage({
  data: {
    isEditing: !1,
    formData: {
      searchAddressId: 0,
      houseNum: "",
      contactName: "",
      contactPhone: "",
    },
    inputFocus: { house: !1, name: !1, phone: !1 },
    mSelectAddress: null,
    selectLocation: null,
    location: { lat: "", lng: "" },
    itemData: [],
  },
  onLoad: function (t) {
    (this.id = t.id),
      (this.isVolunteer = t.isVolunteer),
      console.log("add isVolunteer --\x3e>", this.isVolunteer),
      (e = new a.default({ key: "AM3BZ-7LAC6-QAIS6-EXVBO-N2EZT-IHBBT" })),
      this.setData({ isVolunteer: this.isVolunteer }),
      (o = this),
      this.id && this.setData({ isEditing: !0 }),
      1 != this.isVolunteer && this.initNearAddress(),
      s.userLogin(function () {
        o.loadData();
      });
  },
  initNearAddress: function () {
    console.log("location --", s.globalData.wxLocation);
    var t = s.globalData.wxLocation,
      a = null;
    t && (a = { latitude: t.location.lat, longitude: t.location.lng }),
      e.reverseGeocoder({
        get_poi: 1,
        location: a,
        success: function (t) {
          console.log("result --\x3e>", t);
          t = t.result;
          if (
            ((o.data.location.lat = t.location.lat),
            (o.data.location.lng = t.location.lng),
            o.setData({ location: o.data.location }),
            t.poi_count > 0)
          ) {
            o.setData({ itemData: t.pois });
            var a = t.pois[0];
            o.setData({
              selectLocation: {
                name: a.title,
                latitude: a.location.lat,
                longitude: a.location.lng,
                address: a.address,
                district: a.ad_info.district,
                province: a.ad_info.province,
                city: a.ad_info.city,
              },
            });
          }
        },
        fail: function (t) {
          console.log("fail location --\x3e>", t);
        },
      });
  },
  selectAddress: function () {
    var t = this.data.location;
    JSON.stringify({ latitude: t.lat, longitude: t.lng });
    console.log("location ---\x3e>", t),
      console.log("isVolunteer --\x3e>>", this.isVolunteer),
      wx.chooseLocation({
        success: function (t) {
          console.log("succes --\x3e>", t),
            t &&
              o.setData({
                selectLocation: {
                  name: t.name,
                  latitude: t.latitude,
                  longitude: t.longitude,
                  address: t.address,
                  district: "",
                  province: "",
                  city: "",
                },
              });
        },
        fail: function (t) {
          console.log("fail --\x3e>", t);
        },
      });
  },
  loadData: function () {
    this.id
      ? this.requestWithLoading(
          "common/getAddressById",
          { id: this.id },
          function (t) {
            t.address &&
              ((o.data.formData.houseNum = t.address.house_number),
              (o.data.formData.contactName = t.address.contact_name),
              (o.data.formData.contactPhone = t.address.contact_phone),
              (o.data.formData.searchAddressId = t.address.search_address_id),
              o.setData({
                formData: o.data.formData,
                mSelectAddress: t.address.search_address,
              }));
          }
        )
      : this.requestWithLoading("common/addAddressPage", {}, function (t) {
          t &&
            ((o.data.formData.contactPhone = t.phone),
            o.setData({ pageData: t, formData: o.data.formData }));
        });
  },
  cleanPhone: function (t) {
    o || (o = this),
      (o.data.formData.contactPhone = ""),
      o.setData({ formData: o.data.formData });
  },
  subBtn: function (t) {
    console,
      o || (o = this),
      this.data.selectLocation || this.data.mSelectAddress
        ? this.data.formData.houseNum
          ? this.data.formData.contactName
            ? this.data.formData.contactPhone
              ? 11 == this.data.formData.contactPhone.length
                ? this.requestWithLoading(
                    this.data.isEditing
                      ? "common/updateAddress"
                      : "common/addAddress",
                    {
                      formData: JSON.stringify(this.data.formData),
                      selectLocation: JSON.stringify(this.data.selectLocation),
                      id: this.id,
                    },
                    function (t) {
                      t &&
                        o.successToast(function (t) {
                          wx.navigateBack({});
                        });
                    }
                  )
                : this.showT(
                    { content: this.data.Str.errPhone[this.data.lanIndex] },
                    function (t) {
                      (o.data.inputFocus.phone = !0),
                        o.setData({ inputFocus: o.data.inputFocus });
                    }
                  )
              : this.showT(
                  { content: this.data.Str.inputPhone[this.data.lanIndex] },
                  function (t) {
                    (o.data.inputFocus.phone = !0),
                      o.setData({ inputFocus: o.data.inputFocus });
                  }
                )
            : this.showT(
                {
                  content: this.data.Str.inputContactPerson[this.data.lanIndex],
                },
                function (t) {
                  (o.data.inputFocus.name = !0),
                    o.setData({ inputFocus: o.data.inputFocus });
                }
              )
          : this.showT(
              { content: this.data.Str.inputHouseNum[this.data.lanIndex] },
              function (t) {
                (o.data.inputFocus.house = !0),
                  o.setData({ inputFocus: o.data.inputFocus });
              }
            )
        : this.showT(
            { content: this.data.Str.selectAddress[this.data.lanIndex] },
            function (t) {
              o.selectAddress();
            }
          );
  },
  inputHouseNum: function (t) {
    this.data.formData.houseNum = t.detail.value;
  },
  inputContactName: function (t) {
    this.data.formData.contactName = t.detail.value;
  },
  inputPhone: function (t) {
    var a = t.detail.value;
    a.length > 11 && (a = this.data.formData.contactPhone),
      11 == a.length &&
        ((this.data.inputFocus.phone = !1),
        this.setData({ inputFocus: this.data.inputFocus })),
      (this.data.formData.contactPhone = a),
      this.setData({ formData: this.data.formData });
  },
  deleteBtn: function (t) {
    this.requestWithLoading(
      "common/deleteAddressById",
      { id: this.id },
      function (t) {
        t &&
          o.successToast(function (t) {
            wx.navigateBack({});
          });
      }
    );
  },
  onReady: function () {},
  onShow: function () {
    s.globalData.mSelectAddress &&
      ((o.data.formData.searchAddressId = s.globalData.mSelectAddress.id),
      o.setData({ mSelectAddress: s.globalData.mSelectAddress })),
      console.log("mSelectAddrsss --\x3e>", this.data.mSelectAddress);
    var t = n.getLocation();
    console.log("show location --\x3e>", t),
      t && this.setData({ selectLocation: t });
  },
  onHide: function () {},
  onUnload: function () {
    s.globalData.mSelectAddress = null;
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
});
