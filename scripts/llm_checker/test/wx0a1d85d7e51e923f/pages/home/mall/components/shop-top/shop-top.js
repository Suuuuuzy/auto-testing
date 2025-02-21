var t = require("../../../../../utils/tools");
Component({
  properties: {
    shop: {
      type: Object,
      observer: function (t) {
        if (t.shopStars && t.shopStars.shopStar) {
          var e = Number(t.shopStars.shopStar).toFixed(1);
          this.setData({ star: e });
        }
        this.initDistance();
      },
    },
    ossImageUrl: { type: String },
    isUy: {
      type: Boolean,
      value: !0,
      observer: function (t) {
        this.setData({ lanIndex: t ? 1 : 0 });
      },
    },
    lat: { type: Number },
    lng: { type: Number },
    Str: {
      type: Object,
      value: null,
      observer: function (t) {
        console.log("str --\x3e>", t.minut[this.data.lanIndex]);
      },
    },
  },
  attached: function () {
    console.log("shopTop attached");
  },
  data: {
    star: "5.0",
    distance: null,
    lanIndex: 1,
    marquee: { speed: 60, loop: -1, delay: 0 },
    visible: !0,
  },
  methods: {
    initDistance: function () {
      if (
        this.properties.lat &&
        this.properties.lng &&
        this.properties.shop &&
        this.properties.shop.lng &&
        this.properties.shop.lat
      ) {
        var e = (0, t.getDistance)(
          this.properties.lat,
          this.properties.lng,
          this.properties.shop.lat,
          this.properties.shop.lng
        );
        e >= 0 &&
          ((e =
            e < 1e3
              ? parseInt(e) + "m"
              : parseFloat(e / 1e3).toFixed(2) + "Km"),
          this.setData({ distance: e }));
      }
    },
  },
});
