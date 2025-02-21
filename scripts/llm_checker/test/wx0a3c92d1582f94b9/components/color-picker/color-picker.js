Component({
  properties: {
    initColor: { type: String, value: "rgb(255,0,0)" },
    maskClosable: { type: Boolean, value: !0 },
    mask: { type: Boolean, value: !0 },
    show: { type: Boolean, value: !1 },
  },
  data: {},
  lifetimes: {
    attached: function () {
      var t = this.data.initColor;
      this.setData({
        hueColor:
          "#" +
          this.RGBToHex(
            this.hsv2rgb(this.rgb2hsv(this.HexToRGB(t)).h, 100, 100)
          ),
      });
    },
    ready: function () {
      this.init(this.data.initColor);
    },
  },
  methods: {
    init: function (t) {
      var e = this;
      this.setData({
        hueColor:
          "#" +
          this.RGBToHex(
            this.hsv2rgb(this.rgb2hsv(this.HexToRGB(t)).h, 100, 100)
          ),
        colorRes: t,
      });
      var s = this.createSelectorQuery();
      s.select(".target").boundingClientRect(),
        s.exec(function (s) {
          var a = s[0];
          if (a) {
            e.SV = {
              W: a.width - 28,
              H: a.height - 28,
              StepX: (a.width - 28) / 100,
              StepY: (a.height - 28) / 100,
            };
            var o = e.rgb2hsv(e.HexToRGB(t)),
              h = o.h,
              i = o.s,
              r = o.v;
            e.setData({
              hsv: { h: h, s: i, v: r },
              x: Math.round(i * e.SV.StepX),
              y: Math.round((100 - r) * e.SV.StepY),
            });
          }
        });
    },
    changeHue: function (t) {
      var e = t.detail.value;
      this.setData({
        "hsv.h": e,
        hueColor: "#" + this.RGBToHex(this.hsv2rgb(e, 100, 100)),
        colorRes:
          "#" +
          this.RGBToHex(this.hsv2rgb(e, this.data.hsv.s, this.data.hsv.v)),
        colorRgb: this.hsv2rgb(e, this.data.hsv.s, this.data.hsv.v),
      }),
        this.triggerEvent("changeColor", {
          color: this.data.colorRes,
          colorRgb: this.data.colorRgb,
        });
    },
    changeSV: function (t) {
      var e = t.detail,
        s = e.x,
        a = e.y;
      (s = Math.round(s / this.SV.StepX)),
        (a = 100 - Math.round(a / this.SV.StepY)),
        this.setData({
          "hsv.s": s,
          "hsv.v": a,
          colorRes: "#" + this.RGBToHex(this.hsv2rgb(this.data.hsv.h, s, a)),
          colorRgb: this.hsv2rgb(this.data.hsv.h, s, a),
        }),
        console.log(this.data.colorRes),
        this.triggerEvent("changeColor", {
          color: this.data.colorRes,
          colorRgb: this.data.colorRgb,
        });
    },
    close: function (t) {
      this.data.maskClosable &&
        (this.setData({ show: !1 }), this.triggerEvent("close"));
    },
    preventdefault: function () {},
    hsv2rgb: function (t, e, s) {
      var a = (t / 360).toFixed(2),
        o = (e / 100).toFixed(2),
        h = (s / 100).toFixed(2),
        i = Math.floor(6 * a),
        r = 6 * a - i,
        n = h * (1 - o),
        l = h * (1 - r * o),
        c = h * (1 - (1 - r) * o),
        v = 0,
        g = 0,
        u = 0;
      switch (i % 6) {
        case 0:
          (v = h), (g = c), (u = n);
          break;
        case 1:
          (v = l), (g = h), (u = n);
          break;
        case 2:
          (v = n), (g = h), (u = c);
          break;
        case 3:
          (v = n), (g = l), (u = h);
          break;
        case 4:
          (v = c), (g = n), (u = h);
          break;
        case 5:
          (v = h), (g = n), (u = l);
      }
      return (
        "rgb(" +
        Math.floor(255 * v) +
        "," +
        Math.floor(255 * g) +
        "," +
        Math.floor(255 * u) +
        ")"
      );
    },
    rgb2hsv: function (t) {
      var e,
        s,
        a = t.split(","),
        o = parseInt(a[0].split("(")[1]) / 255,
        h = parseInt(a[1]) / 255,
        i = parseInt(a[2].split(")")[0]) / 255,
        r = Math.max(o, h, i),
        n = Math.min(o, h, i),
        l = r,
        c = r - n;
      if (((s = 0 == r ? 0 : c / r), r == n)) e = 0;
      else {
        switch (r) {
          case o:
            e = (h - i) / c + (h < i ? 6 : 0);
            break;
          case h:
            e = (i - o) / c + 2;
            break;
          case i:
            e = (o - h) / c + 4;
        }
        e /= 6;
      }
      return {
        h: (360 * e).toFixed(),
        s: (100 * s).toFixed(),
        v: (100 * l).toFixed(),
      };
    },
    RGBToHex: function (t) {
      for (
        var e = t.match(/[0-9]{0,3}/g),
          s = "",
          a = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
          ],
          o = 0;
        o < e.length;
        o++
      ) {
        for (var h = null, i = e[o], r = i, n = []; i > 16; )
          (h = i % 16), (i = (i / 16) >> 0), n.push(a[h]);
        n.push(a[i]),
          r < 16 && "" != r && n.push(0),
          (s += n.reverse().join(""));
      }
      return s;
    },
    HexToRGB: function (t) {
      t = t.toLowerCase();
      if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (4 === t.length) {
          for (var e = "#", s = 1; s < 4; s += 1)
            e += t.slice(s, s + 1).concat(t.slice(s, s + 1));
          t = e;
        }
        var a = [];
        for (s = 1; s < 7; s += 2) a.push(parseInt("0x" + t.slice(s, s + 2)));
        return "rgb(" + a.join(",") + ")";
      }
      return t;
    },
  },
});
