var t = require("../../../@babel/runtime/helpers/typeof"),
  e = require("../../../common/vendor.js"),
  o = {};
!(function () {
  function r(t) {
    return t < 128
      ? [t]
      : t < 2048
      ? [192 + (t >> 6), 128 + (63 & t)]
      : [224 + (t >> 12), 128 + ((t >> 6) & 63), 128 + (63 & t)];
  }
  function n(t, e) {
    (this.typeNumber = -1),
      (this.errorCorrectLevel = e),
      (this.modules = null),
      (this.moduleCount = 0),
      (this.dataCache = null),
      (this.rsBlocks = null),
      (this.totalDataCount = -1),
      (this.data = t),
      (this.utf8bytes = (function (t) {
        for (var e = [], o = 0; o < t.length; o++)
          for (var n = r(t.charCodeAt(o)), i = 0; i < n.length; i++)
            e.push(n[i]);
        return e;
      })(t)),
      this.make();
  }
  (n.prototype = {
    constructor: n,
    getModuleCount: function () {
      return this.moduleCount;
    },
    make: function () {
      this.getRightType(),
        (this.dataCache = this.createData()),
        this.createQrcode();
    },
    makeImpl: function (t) {
      (this.moduleCount = 4 * this.typeNumber + 17),
        (this.modules = new Array(this.moduleCount));
      for (var e = 0; e < this.moduleCount; e++)
        this.modules[e] = new Array(this.moduleCount);
      this.setupPositionProbePattern(0, 0),
        this.setupPositionProbePattern(this.moduleCount - 7, 0),
        this.setupPositionProbePattern(0, this.moduleCount - 7),
        this.setupPositionAdjustPattern(),
        this.setupTimingPattern(),
        this.setupTypeInfo(!0, t),
        this.typeNumber >= 7 && this.setupTypeNumber(!0),
        this.mapData(this.dataCache, t);
    },
    setupPositionProbePattern: function (t, e) {
      for (var o = -1; o <= 7; o++)
        if (!(t + o <= -1 || this.moduleCount <= t + o))
          for (var r = -1; r <= 7; r++)
            e + r <= -1 ||
              this.moduleCount <= e + r ||
              (this.modules[t + o][e + r] =
                (0 <= o && o <= 6 && (0 == r || 6 == r)) ||
                (0 <= r && r <= 6 && (0 == o || 6 == o)) ||
                (2 <= o && o <= 4 && 2 <= r && r <= 4));
    },
    createQrcode: function () {
      for (var t = 0, e = 0, o = null, r = 0; r < 8; r++) {
        this.makeImpl(r);
        var n = u.getLostPoint(this);
        (0 == r || t > n) && ((t = n), (e = r), (o = this.modules));
      }
      (this.modules = o),
        this.setupTypeInfo(!1, e),
        this.typeNumber >= 7 && this.setupTypeNumber(!1);
    },
    setupTimingPattern: function () {
      for (var t = 8; t < this.moduleCount - 8; t++)
        null == this.modules[t][6] &&
          ((this.modules[t][6] = t % 2 == 0),
          null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0));
    },
    setupPositionAdjustPattern: function () {
      for (
        var t = u.getPatternPosition(this.typeNumber), e = 0;
        e < t.length;
        e++
      )
        for (var o = 0; o < t.length; o++) {
          var r = t[e],
            n = t[o];
          if (null == this.modules[r][n])
            for (var i = -2; i <= 2; i++)
              for (var s = -2; s <= 2; s++)
                this.modules[r + i][n + s] =
                  -2 == i || 2 == i || -2 == s || 2 == s || (0 == i && 0 == s);
        }
    },
    setupTypeNumber: function (t) {
      for (var e = u.getBCHTypeNumber(this.typeNumber), o = 0; o < 18; o++) {
        var r = !t && 1 == ((e >> o) & 1);
        (this.modules[Math.floor(o / 3)][(o % 3) + this.moduleCount - 8 - 3] =
          r),
          (this.modules[(o % 3) + this.moduleCount - 8 - 3][Math.floor(o / 3)] =
            r);
      }
    },
    setupTypeInfo: function (t, e) {
      for (
        var o = (i[this.errorCorrectLevel] << 3) | e,
          r = u.getBCHTypeInfo(o),
          n = 0;
        n < 15;
        n++
      ) {
        var s = !t && 1 == ((r >> n) & 1);
        n < 6
          ? (this.modules[n][8] = s)
          : n < 8
          ? (this.modules[n + 1][8] = s)
          : (this.modules[this.moduleCount - 15 + n][8] = s);
        s = !t && 1 == ((r >> n) & 1);
        n < 8
          ? (this.modules[8][this.moduleCount - n - 1] = s)
          : n < 9
          ? (this.modules[8][15 - n - 1 + 1] = s)
          : (this.modules[8][15 - n - 1] = s);
      }
      this.modules[this.moduleCount - 8][8] = !t;
    },
    createData: function () {
      var t = new g(),
        e = this.typeNumber > 9 ? 16 : 8;
      t.put(4, 4), t.put(this.utf8bytes.length, e);
      for (var o = 0, r = this.utf8bytes.length; o < r; o++)
        t.put(this.utf8bytes[o], 8);
      for (
        t.length + 4 <= 8 * this.totalDataCount && t.put(0, 4);
        t.length % 8 != 0;

      )
        t.putBit(!1);
      for (
        ;
        !(
          t.length >= 8 * this.totalDataCount ||
          (t.put(n.PAD0, 8), t.length >= 8 * this.totalDataCount)
        );

      )
        t.put(n.PAD1, 8);
      return this.createBytes(t);
    },
    createBytes: function (t) {
      for (
        var e = 0,
          o = 0,
          r = 0,
          n = this.rsBlock.length / 3,
          i = new Array(),
          s = 0;
        s < n;
        s++
      )
        for (
          var a = this.rsBlock[3 * s + 0],
            l = this.rsBlock[3 * s + 1],
            f = this.rsBlock[3 * s + 2],
            g = 0;
          g < a;
          g++
        )
          i.push([f, l]);
      for (
        var c = new Array(i.length), d = new Array(i.length), m = 0;
        m < i.length;
        m++
      ) {
        var p = i[m][0],
          v = i[m][1] - p;
        (o = Math.max(o, p)), (r = Math.max(r, v)), (c[m] = new Array(p));
        for (s = 0; s < c[m].length; s++) c[m][s] = 255 & t.buffer[s + e];
        e += p;
        var T = u.getErrorCorrectPolynomial(v),
          P = new h(c[m], T.getLength() - 1).mod(T);
        d[m] = new Array(T.getLength() - 1);
        for (s = 0; s < d[m].length; s++) {
          var C = s + P.getLength() - d[m].length;
          d[m][s] = C >= 0 ? P.get(C) : 0;
        }
      }
      var y = new Array(this.totalDataCount),
        b = 0;
      for (s = 0; s < o; s++)
        for (m = 0; m < i.length; m++) s < c[m].length && (y[b++] = c[m][s]);
      for (s = 0; s < r; s++)
        for (m = 0; m < i.length; m++) s < d[m].length && (y[b++] = d[m][s]);
      return y;
    },
    mapData: function (t, e) {
      for (
        var o = -1,
          r = this.moduleCount - 1,
          n = 7,
          i = 0,
          s = this.moduleCount - 1;
        s > 0;
        s -= 2
      )
        for (6 == s && s--; ; ) {
          for (var a = 0; a < 2; a++)
            if (null == this.modules[r][s - a]) {
              var l = !1;
              i < t.length && (l = 1 == ((t[i] >>> n) & 1)),
                u.getMask(e, r, s - a) && (l = !l),
                (this.modules[r][s - a] = l),
                -1 == --n && (i++, (n = 7));
            }
          if ((r += o) < 0 || this.moduleCount <= r) {
            (r -= o), (o = -o);
            break;
          }
        }
    },
  }),
    (n.PAD0 = 236),
    (n.PAD1 = 17);
  for (
    var i = [1, 0, 3, 2],
      s = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7,
      },
      u = {
        PATTERN_POSITION_TABLE: [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170],
        ],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function (t) {
          for (var e = t << 10; u.getBCHDigit(e) - u.getBCHDigit(u.G15) >= 0; )
            e ^= u.G15 << (u.getBCHDigit(e) - u.getBCHDigit(u.G15));
          return ((t << 10) | e) ^ u.G15_MASK;
        },
        getBCHTypeNumber: function (t) {
          for (var e = t << 12; u.getBCHDigit(e) - u.getBCHDigit(u.G18) >= 0; )
            e ^= u.G18 << (u.getBCHDigit(e) - u.getBCHDigit(u.G18));
          return (t << 12) | e;
        },
        getBCHDigit: function (t) {
          for (var e = 0; 0 != t; ) e++, (t >>>= 1);
          return e;
        },
        getPatternPosition: function (t) {
          return u.PATTERN_POSITION_TABLE[t - 1];
        },
        getMask: function (t, e, o) {
          switch (t) {
            case s.PATTERN000:
              return (e + o) % 2 == 0;
            case s.PATTERN001:
              return e % 2 == 0;
            case s.PATTERN010:
              return o % 3 == 0;
            case s.PATTERN011:
              return (e + o) % 3 == 0;
            case s.PATTERN100:
              return (Math.floor(e / 2) + Math.floor(o / 3)) % 2 == 0;
            case s.PATTERN101:
              return ((e * o) % 2) + ((e * o) % 3) == 0;
            case s.PATTERN110:
              return (((e * o) % 2) + ((e * o) % 3)) % 2 == 0;
            case s.PATTERN111:
              return (((e * o) % 3) + ((e + o) % 2)) % 2 == 0;
            default:
              throw new Error("bad maskPattern:" + t);
          }
        },
        getErrorCorrectPolynomial: function (t) {
          for (var e = new h([1], 0), o = 0; o < t; o++)
            e = e.multiply(new h([1, a.gexp(o)], 0));
          return e;
        },
        getLostPoint: function (t) {
          for (var e = t.getModuleCount(), o = 0, r = 0, n = 0; n < e; n++)
            for (var i = 0, s = t.modules[n][0], u = 0; u < e; u++) {
              var a = t.modules[n][u];
              if (
                (u < e - 6 &&
                  a &&
                  !t.modules[n][u + 1] &&
                  t.modules[n][u + 2] &&
                  t.modules[n][u + 3] &&
                  t.modules[n][u + 4] &&
                  !t.modules[n][u + 5] &&
                  t.modules[n][u + 6] &&
                  (u < e - 10
                    ? t.modules[n][u + 7] &&
                      t.modules[n][u + 8] &&
                      t.modules[n][u + 9] &&
                      t.modules[n][u + 10] &&
                      (o += 40)
                    : u > 3 &&
                      t.modules[n][u - 1] &&
                      t.modules[n][u - 2] &&
                      t.modules[n][u - 3] &&
                      t.modules[n][u - 4] &&
                      (o += 40)),
                n < e - 1 && u < e - 1)
              ) {
                var l = 0;
                a && l++,
                  t.modules[n + 1][u] && l++,
                  t.modules[n][u + 1] && l++,
                  t.modules[n + 1][u + 1] && l++,
                  (0 == l || 4 == l) && (o += 3);
              }
              s ^ a ? i++ : ((s = a), i >= 5 && (o += 3 + i - 5), (i = 1)),
                a && r++;
            }
          for (u = 0; u < e; u++)
            for (i = 0, s = t.modules[0][u], n = 0; n < e; n++) {
              a = t.modules[n][u];
              n < e - 6 &&
                a &&
                !t.modules[n + 1][u] &&
                t.modules[n + 2][u] &&
                t.modules[n + 3][u] &&
                t.modules[n + 4][u] &&
                !t.modules[n + 5][u] &&
                t.modules[n + 6][u] &&
                (n < e - 10
                  ? t.modules[n + 7][u] &&
                    t.modules[n + 8][u] &&
                    t.modules[n + 9][u] &&
                    t.modules[n + 10][u] &&
                    (o += 40)
                  : n > 3 &&
                    t.modules[n - 1][u] &&
                    t.modules[n - 2][u] &&
                    t.modules[n - 3][u] &&
                    t.modules[n - 4][u] &&
                    (o += 40)),
                s ^ a ? i++ : ((s = a), i >= 5 && (o += 3 + i - 5), (i = 1));
            }
          return (o += 10 * (Math.abs((100 * r) / e / e - 50) / 5));
        },
      },
      a = {
        glog: function (t) {
          if (t < 1) throw new Error("glog(" + t + ")");
          return a.LOG_TABLE[t];
        },
        gexp: function (t) {
          for (; t < 0; ) t += 255;
          for (; t >= 256; ) t -= 255;
          return a.EXP_TABLE[t];
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256),
      },
      l = 0;
    l < 8;
    l++
  )
    a.EXP_TABLE[l] = 1 << l;
  for (l = 8; l < 256; l++)
    a.EXP_TABLE[l] =
      a.EXP_TABLE[l - 4] ^
      a.EXP_TABLE[l - 5] ^
      a.EXP_TABLE[l - 6] ^
      a.EXP_TABLE[l - 8];
  for (l = 0; l < 255; l++) a.LOG_TABLE[a.EXP_TABLE[l]] = l;
  function h(t, e) {
    if (null == t.length) throw new Error(t.length + "/" + e);
    for (var o = 0; o < t.length && 0 == t[o]; ) o++;
    this.num = new Array(t.length - o + e);
    for (var r = 0; r < t.length - o; r++) this.num[r] = t[r + o];
  }
  h.prototype = {
    get: function (t) {
      return this.num[t];
    },
    getLength: function () {
      return this.num.length;
    },
    multiply: function (t) {
      for (
        var e = new Array(this.getLength() + t.getLength() - 1), o = 0;
        o < this.getLength();
        o++
      )
        for (var r = 0; r < t.getLength(); r++)
          e[o + r] ^= a.gexp(a.glog(this.get(o)) + a.glog(t.get(r)));
      return new h(e, 0);
    },
    mod: function (t) {
      var e = this.getLength(),
        o = t.getLength();
      if (e - o < 0) return this;
      for (var r = new Array(e), n = 0; n < e; n++) r[n] = this.get(n);
      for (; r.length >= o; ) {
        var i = a.glog(r[0]) - a.glog(t.get(0));
        for (n = 0; n < t.getLength(); n++)
          r[n] ^= a.gexp(a.glog(t.get(n)) + i);
        for (; 0 == r[0]; ) r.shift();
      }
      return new h(r, 0);
    },
  };
  var f = [
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12],
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16],
  ];
  function g() {
    (this.buffer = new Array()), (this.length = 0);
  }
  (n.prototype.getRightType = function () {
    for (var t = 1; t < 41; t++) {
      var e = f[4 * (t - 1) + this.errorCorrectLevel];
      if (null == e)
        throw new Error(
          "bad rs block @ typeNumber:" +
            t +
            "/errorCorrectLevel:" +
            this.errorCorrectLevel
        );
      for (var o = e.length / 3, r = 0, n = 0; n < o; n++) {
        var i = e[3 * n + 0];
        r += e[3 * n + 2] * i;
      }
      var s = t > 9 ? 2 : 1;
      if (this.utf8bytes.length + s < r || 40 == t) {
        (this.typeNumber = t), (this.rsBlock = e), (this.totalDataCount = r);
        break;
      }
    }
  }),
    (g.prototype = {
      get: function (t) {
        var e = Math.floor(t / 8);
        return (this.buffer[e] >>> (7 - (t % 8))) & 1;
      },
      put: function (t, e) {
        for (var o = 0; o < e; o++) this.putBit((t >>> (e - o - 1)) & 1);
      },
      putBit: function (t) {
        var e = Math.floor(this.length / 8);
        this.buffer.length <= e && this.buffer.push(0),
          t && (this.buffer[e] |= 128 >>> this.length % 8),
          this.length++;
      },
    });
  var c = [];
  (o = function (o) {
    if (
      ((this.options = {
        text: "",
        size: 256,
        correctLevel: 3,
        background: "#ffffff",
        foreground: "#000000",
        pdground: "#000000",
        image: "",
        imageSize: 30,
        canvasId: o.canvasId,
        context: o.context,
        usingComponents: o.usingComponents,
        showLoading: o.showLoading,
        loadingText: o.loadingText,
      }),
      "string" == typeof o && (o = { text: o }),
      o)
    )
      for (var r in o) this.options[r] = o[r];
    for (var i = null, s = ((r = 0), c.length); r < s; r++)
      if (
        c[r].text == this.options.text &&
        c[r].text.correctLevel == this.options.correctLevel
      ) {
        i = c[r].obj;
        break;
      }
    r == s &&
      ((i = new n(this.options.text, this.options.correctLevel)),
      c.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: i,
      }));
    var u = function (t) {
      var e = t.options;
      return e.pdground &&
        ((t.row > 1 && t.row < 5 && t.col > 1 && t.col < 5) ||
          (t.row > t.count - 6 &&
            t.row < t.count - 2 &&
            t.col > 1 &&
            t.col < 5) ||
          (t.row > 1 &&
            t.row < 5 &&
            t.col > t.count - 6 &&
            t.col < t.count - 2))
        ? e.pdground
        : e.foreground;
    };
    !(function (t) {
      t.showLoading && e.index.showLoading({ title: t.loadingText, mask: !0 });
      for (
        var o = e.index.createCanvasContext(t.canvasId, t.context),
          r = i.getModuleCount(),
          n = t.size,
          s = t.imageSize,
          l = (n / r).toPrecision(4),
          h = (n / r).toPrecision(4),
          f = 0;
        f < r;
        f++
      )
        for (var g = 0; g < r; g++) {
          var c = Math.ceil((g + 1) * l) - Math.floor(g * l),
            d = Math.ceil((f + 1) * l) - Math.floor(f * l),
            m = u({ row: f, col: g, count: r, options: t });
          o.setFillStyle(i.modules[f][g] ? m : t.background),
            o.fillRect(Math.round(g * l), Math.round(f * h), c, d);
        }
      if (t.image) {
        var p = Number(((n - s) / 2).toFixed(2)),
          v = Number(((n - s) / 2).toFixed(2));
        (P = p),
          (C = v),
          (y = s),
          (b = s),
          (A = 2),
          (w = 6),
          (E = !0),
          (L = !0),
          (T = o).setLineWidth(w),
          T.setFillStyle(t.background),
          T.setStrokeStyle(t.background),
          T.beginPath(),
          T.moveTo(P + A, C),
          T.arcTo(P + y, C, P + y, C + A, A),
          T.arcTo(P + y, C + b, P + y - A, C + b, A),
          T.arcTo(P, C + b, P, C + b - A, A),
          T.arcTo(P, C, P + A, C, A),
          T.closePath(),
          E && T.fill(),
          L && T.stroke(),
          o.drawImage(t.image, p, v, s, s);
      }
      var T, P, C, y, b, A, w, E, L;
      setTimeout(
        function () {
          o.draw(!0, function () {
            setTimeout(function () {
              e.index.canvasToTempFilePath(
                {
                  width: t.width,
                  height: t.height,
                  destWidth: t.width,
                  destHeight: t.height,
                  canvasId: t.canvasId,
                  quality: 1,
                  success: function (e) {
                    t.cbResult &&
                      (a(e.tempFilePath)
                        ? a(e.apFilePath)
                          ? t.cbResult(e.tempFilePath)
                          : t.cbResult(e.apFilePath)
                        : t.cbResult(e.tempFilePath));
                  },
                  fail: function (e) {
                    t.cbResult && t.cbResult(e);
                  },
                  complete: function () {
                    e.index.hideLoading();
                  },
                },
                t.context
              );
            }, t.text.length + 100);
          });
        },
        t.usingComponents ? 0 : 150
      );
    })(this.options);
    var a = function (e) {
      var o = t(e),
        r = !1;
      return (
        ("number" == o && "" == String(e)) || "undefined" == o
          ? (r = !0)
          : "object" == o
          ? ("{}" == JSON.stringify(e) ||
              "[]" == JSON.stringify(e) ||
              null == e) &&
            (r = !0)
          : "string" == o
          ? ("" == e ||
              "undefined" == e ||
              "null" == e ||
              "{}" == e ||
              "[]" == e) &&
            (r = !0)
          : "function" == o && (r = !1),
        r
      );
    };
  }).prototype.clear = function (t) {
    var o = e.index.createCanvasContext(
      this.options.canvasId,
      this.options.context
    );
    o.clearRect(0, 0, this.options.size, this.options.size),
      o.draw(!1, function () {
        t && t();
      });
  };
})();
var r = o;
exports.QRCode = r;
