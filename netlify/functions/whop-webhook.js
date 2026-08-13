var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/standardwebhooks/dist/timing_safe_equal.js
var require_timing_safe_equal = __commonJS({
  "node_modules/standardwebhooks/dist/timing_safe_equal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timingSafeEqual = void 0;
    function assert(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    function timingSafeEqual(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert(a instanceof DataView);
      assert(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
    exports2.timingSafeEqual = timingSafeEqual;
  }
});

// node_modules/@stablelib/base64/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/@stablelib/base64/lib/base64.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      (function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      })()
    );
    exports2.Coder = Coder;
    var stdCoder = new Coder();
    function encode3(data) {
      return stdCoder.encode(data);
    }
    exports2.encode = encode3;
    function decode2(s) {
      return stdCoder.decode(s);
    }
    exports2.decode = decode2;
    var URLSafeCoder = (
      /** @class */
      (function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      })(Coder)
    );
    exports2.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    exports2.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    exports2.decodeURLSafe = decodeURLSafe;
    exports2.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports2.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports2.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});

// node_modules/fast-sha256/sha256.js
var require_sha256 = __commonJS({
  "node_modules/fast-sha256/sha256.js"(exports2, module2) {
    (function(root, factory) {
      var exports3 = {};
      factory(exports3);
      var sha256 = exports3["default"];
      for (var k in exports3) {
        sha256[k] = exports3[k];
      }
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        module2.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports2, function(exports3) {
      "use strict";
      exports3.__esModule = true;
      exports3.digestLength = 32;
      exports3.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      var Hash = (
        /** @class */
        (function() {
          function Hash2() {
            this.digestLength = exports3.digestLength;
            this.blockSize = exports3.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        })()
      );
      exports3.Hash = Hash;
      var HMAC = (
        /** @class */
        (function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        })()
      );
      exports3.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports3.hash = hash;
      exports3["default"] = hash;
      function hmac2(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports3.hmac = hmac2;
      function fillBuffer(buffer, hmac3, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac3.reset();
        if (num > 1) {
          hmac3.update(buffer);
        }
        if (info) {
          hmac3.update(info);
        }
        hmac3.update(counter);
        hmac3.finish(buffer);
        counter[0]++;
      }
      var hkdfSalt = new Uint8Array(exports3.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac2(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      exports3.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      exports3.pbkdf2 = pbkdf2;
    });
  }
});

// node_modules/standardwebhooks/dist/index.js
var require_dist = __commonJS({
  "node_modules/standardwebhooks/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Webhook = exports2.WebhookVerificationError = void 0;
    var timing_safe_equal_1 = require_timing_safe_equal();
    var base64 = require_base64();
    var sha256 = require_sha256();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = class _ExtendableError extends Error {
      constructor(message2) {
        super(message2);
        Object.setPrototypeOf(this, _ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message2).stack;
      }
    };
    var WebhookVerificationError = class _WebhookVerificationError extends ExtendableError {
      constructor(message2) {
        super(message2);
        Object.setPrototypeOf(this, _WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    };
    exports2.WebhookVerificationError = WebhookVerificationError;
    var Webhook = class _Webhook {
      constructor(secret, options) {
        if (!secret) {
          throw new Error("Secret can't be empty.");
        }
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(_Webhook.prefix)) {
            secret = secret.substring(_Webhook.prefix.length);
          }
          this.key = base64.decode(secret);
        }
      }
      verify(payload, headers_) {
        const headers = {};
        for (const key of Object.keys(headers_)) {
          headers[key.toLowerCase()] = headers_[key];
        }
        const msgId = headers["webhook-id"];
        const msgSignature = headers["webhook-signature"];
        const msgTimestamp = headers["webhook-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          throw new WebhookVerificationError("Missing required headers");
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder2 = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(",");
          if (version !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder2.encode(signature), encoder2.encode(expectedSignature))) {
            return JSON.parse(payload.toString());
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer.");
        }
        const encoder2 = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder2.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    };
    exports2.Webhook = Webhook;
    Webhook.prefix = "whsec_";
  }
});

// whop-webhook.src.mjs
var whop_webhook_src_exports = {};
__export(whop_webhook_src_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(whop_webhook_src_exports);

// node_modules/@whop/sdk/internal/tslib.mjs
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

// node_modules/@whop/sdk/internal/utils/uuid.mjs
var uuid4 = function() {
  const { crypto: crypto2 } = globalThis;
  if (crypto2?.randomUUID) {
    uuid4 = crypto2.randomUUID.bind(crypto2);
    return crypto2.randomUUID();
  }
  const u8 = new Uint8Array(1);
  const randomByte = crypto2 ? () => crypto2.getRandomValues(u8)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (+c ^ randomByte() & 15 >> +c / 4).toString(16));
};

// node_modules/@whop/sdk/internal/errors.mjs
function isAbortError(err) {
  return typeof err === "object" && err !== null && // Spec-compliant fetch implementations
  ("name" in err && err.name === "AbortError" || // Expo fetch
  "message" in err && String(err.message).includes("FetchRequestCanceledException"));
}
var castToError = (err) => {
  if (err instanceof Error)
    return err;
  if (typeof err === "object" && err !== null) {
    try {
      if (Object.prototype.toString.call(err) === "[object Error]") {
        const error = new Error(err.message, err.cause ? { cause: err.cause } : {});
        if (err.stack)
          error.stack = err.stack;
        if (err.cause && !error.cause)
          error.cause = err.cause;
        if (err.name)
          error.name = err.name;
        return error;
      }
    } catch {
    }
    try {
      return new Error(JSON.stringify(err));
    } catch {
    }
  }
  return new Error(err);
};

// node_modules/@whop/sdk/core/error.mjs
var WhopError = class extends Error {
};
var APIError = class _APIError extends WhopError {
  constructor(status, error, message2, headers) {
    super(`${_APIError.makeMessage(status, error, message2)}`);
    this.status = status;
    this.headers = headers;
    this.error = error;
  }
  static makeMessage(status, error, message2) {
    const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message2;
    if (status && msg) {
      return `${status} ${msg}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (msg) {
      return msg;
    }
    return "(no status code or body)";
  }
  static generate(status, errorResponse, message2, headers) {
    if (!status || !headers) {
      return new APIConnectionError({ message: message2, cause: castToError(errorResponse) });
    }
    const error = errorResponse;
    if (status === 400) {
      return new BadRequestError(status, error, message2, headers);
    }
    if (status === 401) {
      return new AuthenticationError(status, error, message2, headers);
    }
    if (status === 403) {
      return new PermissionDeniedError(status, error, message2, headers);
    }
    if (status === 404) {
      return new NotFoundError(status, error, message2, headers);
    }
    if (status === 409) {
      return new ConflictError(status, error, message2, headers);
    }
    if (status === 422) {
      return new UnprocessableEntityError(status, error, message2, headers);
    }
    if (status === 429) {
      return new RateLimitError(status, error, message2, headers);
    }
    if (status >= 500) {
      return new InternalServerError(status, error, message2, headers);
    }
    return new _APIError(status, error, message2, headers);
  }
};
var APIUserAbortError = class extends APIError {
  constructor({ message: message2 } = {}) {
    super(void 0, void 0, message2 || "Request was aborted.", void 0);
  }
};
var APIConnectionError = class extends APIError {
  constructor({ message: message2, cause }) {
    super(void 0, void 0, message2 || "Connection error.", void 0);
    if (cause)
      this.cause = cause;
  }
};
var APIConnectionTimeoutError = class extends APIConnectionError {
  constructor({ message: message2 } = {}) {
    super({ message: message2 ?? "Request timed out." });
  }
};
var BadRequestError = class extends APIError {
};
var AuthenticationError = class extends APIError {
};
var PermissionDeniedError = class extends APIError {
};
var NotFoundError = class extends APIError {
};
var ConflictError = class extends APIError {
};
var UnprocessableEntityError = class extends APIError {
};
var RateLimitError = class extends APIError {
};
var InternalServerError = class extends APIError {
};

// node_modules/@whop/sdk/internal/utils/values.mjs
var startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
var isAbsoluteURL = (url) => {
  return startsWithSchemeRegexp.test(url);
};
var isArray = (val) => (isArray = Array.isArray, isArray(val));
var isReadonlyArray = isArray;
function maybeObj(x) {
  if (typeof x !== "object") {
    return {};
  }
  return x ?? {};
}
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
var validatePositiveInteger = (name, n) => {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new WhopError(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new WhopError(`${name} must be a positive integer`);
  }
  return n;
};
var safeJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return void 0;
  }
};

// node_modules/@whop/sdk/internal/utils/sleep.mjs
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// node_modules/@whop/sdk/version.mjs
var VERSION = "0.0.42";

// node_modules/@whop/sdk/internal/detect-platform.mjs
function getDetectedPlatform() {
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return "deno";
  }
  if (typeof EdgeRuntime !== "undefined") {
    return "edge";
  }
  if (Object.prototype.toString.call(typeof globalThis.process !== "undefined" ? globalThis.process : 0) === "[object process]") {
    return "node";
  }
  return "unknown";
}
var getPlatformProperties = () => {
  const detectedPlatform = getDetectedPlatform();
  if (detectedPlatform === "deno") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(Deno.build.os),
      "X-Stainless-Arch": normalizeArch(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
  }
  if (typeof EdgeRuntime !== "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  }
  if (detectedPlatform === "node") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(globalThis.process.platform ?? "unknown"),
      "X-Stainless-Arch": normalizeArch(globalThis.process.arch ?? "unknown"),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
  }
  const browserInfo = getBrowserInfo();
  if (browserInfo) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
      "X-Stainless-Runtime-Version": browserInfo.version
    };
  }
  return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": VERSION,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function getBrowserInfo() {
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }
  const browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
var normalizeArch = (arch) => {
  if (arch === "x32")
    return "x32";
  if (arch === "x86_64" || arch === "x64")
    return "x64";
  if (arch === "arm")
    return "arm";
  if (arch === "aarch64" || arch === "arm64")
    return "arm64";
  if (arch)
    return `other:${arch}`;
  return "unknown";
};
var normalizePlatform = (platform) => {
  platform = platform.toLowerCase();
  if (platform.includes("ios"))
    return "iOS";
  if (platform === "android")
    return "Android";
  if (platform === "darwin")
    return "MacOS";
  if (platform === "win32")
    return "Windows";
  if (platform === "freebsd")
    return "FreeBSD";
  if (platform === "openbsd")
    return "OpenBSD";
  if (platform === "linux")
    return "Linux";
  if (platform)
    return `Other:${platform}`;
  return "Unknown";
};
var _platformHeaders;
var getPlatformHeaders = () => {
  return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
};

// node_modules/@whop/sdk/internal/shims.mjs
function getDefaultFetch() {
  if (typeof fetch !== "undefined") {
    return fetch;
  }
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Whop({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function makeReadableStream(...args) {
  const ReadableStream = globalThis.ReadableStream;
  if (typeof ReadableStream === "undefined") {
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  }
  return new ReadableStream(...args);
}
function ReadableStreamFrom(iterable) {
  let iter = Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
  return makeReadableStream({
    start() {
    },
    async pull(controller) {
      const { done, value } = await iter.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
    async cancel() {
      await iter.return?.();
    }
  });
}
async function CancelReadableStream(stream) {
  if (stream === null || typeof stream !== "object")
    return;
  if (stream[Symbol.asyncIterator]) {
    await stream[Symbol.asyncIterator]().return?.();
    return;
  }
  const reader = stream.getReader();
  const cancelPromise = reader.cancel();
  reader.releaseLock();
  await cancelPromise;
}

// node_modules/@whop/sdk/internal/request-options.mjs
var FallbackEncoder = ({ headers, body }) => {
  return {
    bodyHeaders: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

// node_modules/@whop/sdk/internal/qs/formats.mjs
var default_format = "RFC3986";
var default_formatter = (v) => String(v);
var formatters = {
  RFC1738: (v) => String(v).replace(/%20/g, "+"),
  RFC3986: default_formatter
};
var RFC1738 = "RFC1738";

// node_modules/@whop/sdk/internal/qs/utils.mjs
var has = (obj, key) => (has = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), has(obj, key));
var hex_table = /* @__PURE__ */ (() => {
  const array = [];
  for (let i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
})();
var limit = 1024;
var encode = (str, _defaultEncoder, charset, _kind, format) => {
  if (str.length === 0) {
    return str;
  }
  let string = str;
  if (typeof str === "symbol") {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  let out = "";
  for (let j = 0; j < string.length; j += limit) {
    const segment = string.length >= limit ? string.slice(j, j + limit) : string;
    const arr = [];
    for (let i = 0; i < segment.length; ++i) {
      let c = segment.charCodeAt(i);
      if (c === 45 || // -
      c === 46 || // .
      c === 95 || // _
      c === 126 || // ~
      c >= 48 && c <= 57 || // 0-9
      c >= 65 && c <= 90 || // a-z
      c >= 97 && c <= 122 || // A-Z
      format === RFC1738 && (c === 40 || c === 41)) {
        arr[arr.length] = segment.charAt(i);
        continue;
      }
      if (c < 128) {
        arr[arr.length] = hex_table[c];
        continue;
      }
      if (c < 2048) {
        arr[arr.length] = hex_table[192 | c >> 6] + hex_table[128 | c & 63];
        continue;
      }
      if (c < 55296 || c >= 57344) {
        arr[arr.length] = hex_table[224 | c >> 12] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
        continue;
      }
      i += 1;
      c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
      arr[arr.length] = hex_table[240 | c >> 18] + hex_table[128 | c >> 12 & 63] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
    }
    out += arr.join("");
  }
  return out;
};
function is_buffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
}
function maybe_map(val, fn) {
  if (isArray(val)) {
    const mapped = [];
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
}

// node_modules/@whop/sdk/internal/qs/stringify.mjs
var array_prefix_generators = {
  brackets(prefix) {
    return String(prefix) + "[]";
  },
  comma: "comma",
  indices(prefix, key) {
    return String(prefix) + "[" + key + "]";
  },
  repeat(prefix) {
    return String(prefix);
  }
};
var push_to_array = function(arr, value_or_array) {
  Array.prototype.push.apply(arr, isArray(value_or_array) ? value_or_array : [value_or_array]);
};
var toISOString;
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  allowEmptyArrays: false,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encodeDotInKeys: false,
  encoder: encode,
  encodeValuesOnly: false,
  format: default_format,
  formatter: default_formatter,
  /** @deprecated */
  indices: false,
  serializeDate(date) {
    return (toISOString ?? (toISOString = Function.prototype.call.bind(Date.prototype.toISOString)))(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
function is_non_nullish_primitive(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
}
var sentinel = {};
function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder2, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
  let obj = object;
  let tmp_sc = sideChannel;
  let step = 0;
  let find_flag = false;
  while ((tmp_sc = tmp_sc.get(sentinel)) !== void 0 && !find_flag) {
    const pos = tmp_sc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        find_flag = true;
      }
    }
    if (typeof tmp_sc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate?.(obj);
  } else if (generateArrayPrefix === "comma" && isArray(obj)) {
    obj = maybe_map(obj, function(value) {
      if (value instanceof Date) {
        return serializeDate?.(value);
      }
      return value;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder2 && !encodeValuesOnly ? (
        // @ts-expect-error
        encoder2(prefix, defaults.encoder, charset, "key", format)
      ) : prefix;
    }
    obj = "";
  }
  if (is_non_nullish_primitive(obj) || is_buffer(obj)) {
    if (encoder2) {
      const key_value = encodeValuesOnly ? prefix : encoder2(prefix, defaults.encoder, charset, "key", format);
      return [
        formatter?.(key_value) + "=" + // @ts-expect-error
        formatter?.(encoder2(obj, defaults.encoder, charset, "value", format))
      ];
    }
    return [formatter?.(prefix) + "=" + formatter?.(String(obj))];
  }
  const values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  let obj_keys;
  if (generateArrayPrefix === "comma" && isArray(obj)) {
    if (encodeValuesOnly && encoder2) {
      obj = maybe_map(obj, encoder2);
    }
    obj_keys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray(filter)) {
    obj_keys = filter;
  } else {
    const keys = Object.keys(obj);
    obj_keys = sort ? keys.sort(sort) : keys;
  }
  const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  const adjusted_prefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encoded_prefix + "[]" : encoded_prefix;
  if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
    return adjusted_prefix + "[]";
  }
  for (let j = 0; j < obj_keys.length; ++j) {
    const key = obj_keys[j];
    const value = (
      // @ts-ignore
      typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key]
    );
    if (skipNulls && value === null) {
      continue;
    }
    const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
    const key_prefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? "." + encoded_key : "[" + encoded_key + "]");
    sideChannel.set(object, step);
    const valueSideChannel = /* @__PURE__ */ new WeakMap();
    valueSideChannel.set(sentinel, sideChannel);
    push_to_array(values, inner_stringify(
      value,
      key_prefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      // @ts-ignore
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder2,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
}
function normalize_stringify_options(opts = defaults) {
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  const charset = opts.charset || defaults.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  let format = default_format;
  if (typeof opts.format !== "undefined") {
    if (!has(formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  const formatter = formatters[format];
  let filter = defaults.filter;
  if (typeof opts.filter === "function" || isArray(opts.filter)) {
    filter = opts.filter;
  }
  let arrayFormat;
  if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  const allowDots = typeof opts.allowDots === "undefined" ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
    // @ts-ignore
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
    // @ts-ignore
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
}
function stringify(object, opts = {}) {
  let obj = object;
  const options = normalize_stringify_options(opts);
  let obj_keys;
  let filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray(options.filter)) {
    filter = options.filter;
    obj_keys = filter;
  }
  const keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
  const commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!obj_keys) {
    obj_keys = Object.keys(obj);
  }
  if (options.sort) {
    obj_keys.sort(options.sort);
  }
  const sideChannel = /* @__PURE__ */ new WeakMap();
  for (let i = 0; i < obj_keys.length; ++i) {
    const key = obj_keys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    push_to_array(keys, inner_stringify(
      obj[key],
      key,
      // @ts-expect-error
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel
    ));
  }
  const joined = keys.join(options.delimiter);
  let prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
}

// node_modules/@whop/sdk/internal/utils/query.mjs
function stringifyQuery(query) {
  return stringify(query, { arrayFormat: "brackets" });
}

// node_modules/@whop/sdk/internal/utils/log.mjs
var levelNumbers = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
};
var parseLogLevel = (maybeLevel, sourceName, client) => {
  if (!maybeLevel) {
    return void 0;
  }
  if (hasOwn(levelNumbers, maybeLevel)) {
    return maybeLevel;
  }
  loggerFor(client).warn(`${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(Object.keys(levelNumbers))}`);
  return void 0;
};
function noop() {
}
function makeLogFn(fnLevel, logger, logLevel) {
  if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
    return noop;
  } else {
    return logger[fnLevel].bind(logger);
  }
}
var noopLogger = {
  error: noop,
  warn: noop,
  info: noop,
  debug: noop
};
var cachedLoggers = /* @__PURE__ */ new WeakMap();
function loggerFor(client) {
  const logger = client.logger;
  const logLevel = client.logLevel ?? "off";
  if (!logger) {
    return noopLogger;
  }
  const cachedLogger = cachedLoggers.get(logger);
  if (cachedLogger && cachedLogger[0] === logLevel) {
    return cachedLogger[1];
  }
  const levelLogger = {
    error: makeLogFn("error", logger, logLevel),
    warn: makeLogFn("warn", logger, logLevel),
    info: makeLogFn("info", logger, logLevel),
    debug: makeLogFn("debug", logger, logLevel)
  };
  cachedLoggers.set(logger, [logLevel, levelLogger]);
  return levelLogger;
}
var formatRequestDetails = (details) => {
  if (details.options) {
    details.options = { ...details.options };
    delete details.options["headers"];
  }
  if (details.headers) {
    details.headers = Object.fromEntries((details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(([name, value]) => [
      name,
      name.toLowerCase() === "authorization" || name.toLowerCase() === "api-key" || name.toLowerCase() === "x-api-key" || name.toLowerCase() === "cookie" || name.toLowerCase() === "set-cookie" ? "***" : value
    ]));
  }
  if ("retryOfRequestLogID" in details) {
    if (details.retryOfRequestLogID) {
      details.retryOf = details.retryOfRequestLogID;
    }
    delete details.retryOfRequestLogID;
  }
  return details;
};

// node_modules/@whop/sdk/internal/parse.mjs
async function defaultParseResponse(client, props) {
  const { response, requestLogID, retryOfRequestLogID, startTime } = props;
  const body = await (async () => {
    if (response.status === 204) {
      return null;
    }
    if (props.options.__binaryResponse) {
      return response;
    }
    const contentType = response.headers.get("content-type");
    const mediaType = contentType?.split(";")[0]?.trim();
    const isJSON = mediaType?.includes("application/json") || mediaType?.endsWith("+json");
    if (isJSON) {
      const contentLength = response.headers.get("content-length");
      if (contentLength === "0") {
        return void 0;
      }
      const json = await response.json();
      return json;
    }
    const text = await response.text();
    return text;
  })();
  loggerFor(client).debug(`[${requestLogID}] response parsed`, formatRequestDetails({
    retryOfRequestLogID,
    url: response.url,
    status: response.status,
    body,
    durationMs: Date.now() - startTime
  }));
  return body;
}

// node_modules/@whop/sdk/core/api-promise.mjs
var _APIPromise_client;
var APIPromise = class _APIPromise extends Promise {
  constructor(client, responsePromise, parseResponse = defaultParseResponse) {
    super((resolve) => {
      resolve(null);
    });
    this.responsePromise = responsePromise;
    this.parseResponse = parseResponse;
    _APIPromise_client.set(this, void 0);
    __classPrivateFieldSet(this, _APIPromise_client, client, "f");
  }
  _thenUnwrap(transform) {
    return new _APIPromise(__classPrivateFieldGet(this, _APIPromise_client, "f"), this.responsePromise, async (client, props) => transform(await this.parseResponse(client, props), props));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  async withResponse() {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return { data, response };
  }
  parse() {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then((data) => this.parseResponse(__classPrivateFieldGet(this, _APIPromise_client, "f"), data));
    }
    return this.parsedPromise;
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
};
_APIPromise_client = /* @__PURE__ */ new WeakMap();

// node_modules/@whop/sdk/core/pagination.mjs
var _AbstractPage_client;
var AbstractPage = class {
  constructor(client, response, body, options) {
    _AbstractPage_client.set(this, void 0);
    __classPrivateFieldSet(this, _AbstractPage_client, client, "f");
    this.options = options;
    this.response = response;
    this.body = body;
  }
  hasNextPage() {
    const items = this.getPaginatedItems();
    if (!items.length)
      return false;
    return this.nextPageRequestOptions() != null;
  }
  async getNextPage() {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new WhopError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    }
    return await __classPrivateFieldGet(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
  }
  async *iterPages() {
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
};
var PagePromise = class extends APIPromise {
  constructor(client, request, Page) {
    super(client, request, async (client2, props) => new Page(client2, props.response, await defaultParseResponse(client2, props), props.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
};
var CursorPage = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
    this.page_info = body.page_info || {};
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    const cursor = this.page_info?.end_cursor;
    if (!cursor) {
      return null;
    }
    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        after: cursor
      }
    };
  }
};

// node_modules/@whop/sdk/internal/uploads.mjs
var checkFileSupport = () => {
  if (typeof File === "undefined") {
    const { process: process2 } = globalThis;
    const isOldNode = typeof process2?.versions?.node === "string" && parseInt(process2.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (isOldNode ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function makeFile(fileBits, fileName, options) {
  checkFileSupport();
  return new File(fileBits, fileName ?? "unknown_file", options);
}
function getName(value) {
  return (typeof value === "object" && value !== null && ("name" in value && value.name && String(value.name) || "url" in value && value.url && String(value.url) || "filename" in value && value.filename && String(value.filename) || "path" in value && value.path && String(value.path)) || "").split(/[\\/]/).pop() || void 0;
}
var isAsyncIterable = (value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function";

// node_modules/@whop/sdk/internal/to-file.mjs
var isBlobLike = (value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function";
var isFileLike = (value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value);
var isResponseLike = (value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function";
async function toFile(value, name, options) {
  checkFileSupport();
  value = await value;
  if (isFileLike(value)) {
    if (value instanceof File) {
      return value;
    }
    return makeFile([await value.arrayBuffer()], value.name);
  }
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop());
    return makeFile(await getBytes(blob), name, options);
  }
  const parts = await getBytes(value);
  name || (name = getName(value));
  if (!options?.type) {
    const type = parts.find((part) => typeof part === "object" && "type" in part && part.type);
    if (typeof type === "string") {
      options = { ...options, type };
    }
  }
  return makeFile(parts, name, options);
}
async function getBytes(value) {
  let parts = [];
  if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
  value instanceof ArrayBuffer) {
    parts.push(value);
  } else if (isBlobLike(value)) {
    parts.push(value instanceof Blob ? value : await value.arrayBuffer());
  } else if (isAsyncIterable(value)) {
    for await (const chunk of value) {
      parts.push(...await getBytes(chunk));
    }
  } else {
    const constructor = value?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof value}${constructor ? `; constructor: ${constructor}` : ""}${propsForError(value)}`);
  }
  return parts;
}
function propsForError(value) {
  if (typeof value !== "object" || value === null)
    return "";
  const props = Object.getOwnPropertyNames(value);
  return `; props: [${props.map((p) => `"${p}"`).join(", ")}]`;
}

// node_modules/@whop/sdk/core/resource.mjs
var APIResource = class {
  constructor(client) {
    this._client = client;
  }
};

// node_modules/@whop/sdk/internal/utils/path.mjs
function encodeURIPath(str) {
  return str.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var EMPTY = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null));
var createPathTagFunction = (pathEncoder = encodeURIPath) => function path2(statics, ...params) {
  if (statics.length === 1)
    return statics[0];
  let postPath = false;
  const invalidSegments = [];
  const path3 = statics.reduce((previousValue, currentValue, index) => {
    if (/[?#]/.test(currentValue)) {
      postPath = true;
    }
    const value = params[index];
    let encoded = (postPath ? encodeURIComponent : pathEncoder)("" + value);
    if (index !== params.length && (value == null || typeof value === "object" && // handle values from other realms
    value.toString === Object.getPrototypeOf(Object.getPrototypeOf(value.hasOwnProperty ?? EMPTY) ?? EMPTY)?.toString)) {
      encoded = value + "";
      invalidSegments.push({
        start: previousValue.length + currentValue.length,
        length: encoded.length,
        error: `Value of type ${Object.prototype.toString.call(value).slice(8, -1)} is not a valid path parameter`
      });
    }
    return previousValue + currentValue + (index === params.length ? "" : encoded);
  }, "");
  const pathOnly = path3.split(/[?#]/, 1)[0];
  const invalidSegmentPattern = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let match;
  while ((match = invalidSegmentPattern.exec(pathOnly)) !== null) {
    invalidSegments.push({
      start: match.index,
      length: match[0].length,
      error: `Value "${match[0]}" can't be safely passed as a path parameter`
    });
  }
  invalidSegments.sort((a, b) => a.start - b.start);
  if (invalidSegments.length > 0) {
    let lastEnd = 0;
    const underline = invalidSegments.reduce((acc, segment) => {
      const spaces = " ".repeat(segment.start - lastEnd);
      const arrows = "^".repeat(segment.length);
      lastEnd = segment.start + segment.length;
      return acc + spaces + arrows;
    }, "");
    throw new WhopError(`Path parameters result in path with invalid segments:
${invalidSegments.map((e) => e.error).join("\n")}
${path3}
${underline}`);
  }
  return path3;
};
var path = /* @__PURE__ */ createPathTagFunction(encodeURIPath);

// node_modules/@whop/sdk/resources/ai-chats.mjs
var AIChats = class extends APIResource {
  /**
   * Returns a paginated list of AI chat threads for the current authenticated user.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/ai_chats", CursorPage, { query, ...options });
  }
  /**
   * Create a new AI chat thread and send the first message to the AI agent.
   *
   * Required permissions:
   *
   * - `ai_chat:create`
   */
  create(body, options) {
    return this._client.post("/ai_chats", { body, ...options });
  }
  /**
   * Retrieves the details of an existing AI chat.
   */
  retrieve(id, options) {
    return this._client.get(path`/ai_chats/${id}`, options);
  }
  /**
   * Update an AI chat's title, notification preferences, or associated company
   * context.
   *
   * Required permissions:
   *
   * - `ai_chat:update`
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/ai_chats/${id}`, { body, ...options });
  }
  /**
   * Delete an AI chat thread so it no longer appears in the user's chat list.
   *
   * Required permissions:
   *
   * - `ai_chat:delete`
   */
  delete(id, options) {
    return this._client.delete(path`/ai_chats/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/access-tokens.mjs
var AccessTokens = class extends APIResource {
  /**
   * Create a short-lived access token for authenticating API requests. When using
   * API key authentication, provide company_id or user_id. When using OAuth, the
   * user is derived from the token. Use this token with Whop's web and mobile
   * embedded components.
   *
   * @example
   * ```ts
   * const accessToken = await client.accessTokens.create();
   * ```
   */
  create(body = {}, options) {
    return this._client.post("/access_tokens", { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/account-links.mjs
var AccountLinks = class extends APIResource {
  /**
   * Generate a URL that directs a sub-merchant to their account portal, such as the
   * hosted payouts dashboard or the KYC onboarding flow.
   *
   * @example
   * ```ts
   * const accountLink = await client.accountLinks.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   refresh_url: 'refresh_url',
   *   return_url: 'return_url',
   *   use_case: 'account_onboarding',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/account_links", { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/accounts/preferences.mjs
var Preferences = class extends APIResource {
  /**
   * Retrieves the account's preferences: a singleton settings document keyed by
   * preference name.
   */
  retrieve(accountID, options) {
    return this._client.get(path`/accounts/${accountID}/preferences`, options);
  }
  /**
   * Updates the account's preferences. Each top-level key present in the body is
   * replaced as a whole; omitted keys are left untouched. `ads_payment_methods`
   * always requires a `primary` entry. `backup` is optional and any pairing is
   * allowed — two cards, `card`+`platform_balance`, or a single method — so a
   * card-only advertiser can fund ads without a platform balance. The `primary` and
   * `backup` must be different sources. A `platform_balance` entry may omit `id` to
   * use the account's default Whop balance. Configuring a `card` requires a user
   * token; account API keys can set up platform-balance billing only.
   */
  update(accountID, body, options) {
    return this._client.patch(path`/accounts/${accountID}/preferences`, { body, ...options });
  }
};

// node_modules/@whop/sdk/internal/headers.mjs
var brand_privateNullableHeaders = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* iterateHeaders(headers) {
  if (!headers)
    return;
  if (brand_privateNullableHeaders in headers) {
    const { values, nulls } = headers;
    yield* values.entries();
    for (const name of nulls) {
      yield [name, null];
    }
    return;
  }
  let shouldClear = false;
  let iter;
  if (headers instanceof Headers) {
    iter = headers.entries();
  } else if (isReadonlyArray(headers)) {
    iter = headers;
  } else {
    shouldClear = true;
    iter = Object.entries(headers ?? {});
  }
  for (let row of iter) {
    const name = row[0];
    if (typeof name !== "string")
      throw new TypeError("expected header name to be a string");
    const values = isReadonlyArray(row[1]) ? row[1] : [row[1]];
    let didClear = false;
    for (const value of values) {
      if (value === void 0)
        continue;
      if (shouldClear && !didClear) {
        didClear = true;
        yield [name, null];
      }
      yield [name, value];
    }
  }
}
var buildHeaders = (newHeaders) => {
  const targetHeaders = new Headers();
  const nullHeaders = /* @__PURE__ */ new Set();
  for (const headers of newHeaders) {
    const seenHeaders = /* @__PURE__ */ new Set();
    for (const [name, value] of iterateHeaders(headers)) {
      const lowerName = name.toLowerCase();
      if (!seenHeaders.has(lowerName)) {
        targetHeaders.delete(name);
        seenHeaders.add(lowerName);
      }
      if (value === null) {
        targetHeaders.delete(name);
        nullHeaders.add(lowerName);
      } else {
        targetHeaders.append(name, value);
        nullHeaders.delete(lowerName);
      }
    }
  }
  return { [brand_privateNullableHeaders]: true, values: targetHeaders, nulls: nullHeaders };
};

// node_modules/@whop/sdk/resources/accounts/accounts.mjs
var Accounts = class extends APIResource {
  constructor() {
    super(...arguments);
    this.preferences = new Preferences(this._client);
  }
  /**
   * Lists accounts visible to the credential. User tokens return the user's business
   * accounts; business account API keys return the requesting business account and
   * its connected accounts.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/accounts", CursorPage, { query, ...options });
  }
  /**
   * Creates an account. User tokens create business accounts; business account API
   * keys create connected accounts. Tax fields (`tax_remitted_by`,
   * `product_tax_code_id`, `business_address`, `tax_identifiers`) are configured
   * with Update Account, not at creation.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/accounts", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves the business account associated with the current business account API
   * key.
   */
  me(options) {
    return this._client.get("/accounts/me", options);
  }
  /**
   * Retrieves a single account visible to the credential, including its crypto
   * wallet.
   */
  retrieve(accountID, options) {
    return this._client.get(path`/accounts/${accountID}`, options);
  }
  /**
   * Updates an account. User tokens can update business accounts; business account
   * API keys can update connected accounts.
   */
  update(accountID, body, options) {
    return this._client.patch(path`/accounts/${accountID}`, { body, ...options });
  }
  /**
   * Lists the recommended actions computed for the account — the same set embedded
   * on the account resource, served on their own so a caller can fetch just the
   * recommendations.
   */
  recommendActions(accountID, options) {
    return this._client.get(path`/accounts/${accountID}/recommend_actions`, options);
  }
  /**
   * Starts an LLC formation for a business account. On submission, the application
   * is validated and the response returns a hosted checkout URL. Once paid, the
   * filing is submitted. Track progress through the account's
   * [`llc_formation`](/api-reference/beta/accounts/retrieve-account) field on
   * Retrieve Account.
   */
  registerLlc(accountID, params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post(path`/accounts/${accountID}/llc`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};
Accounts.Preferences = Preferences;

// node_modules/@whop/sdk/resources/ad-campaigns.mjs
var AdCampaigns = class extends APIResource {
  /**
   * Lists the ad campaigns for an account, with stats over the requested window.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/ad_campaigns", CursorPage, { query, ...options });
  }
  /**
   * Creates an ad campaign for an account.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/ad_campaigns", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a single ad campaign with stats over the requested window.
   */
  retrieve(id, query = {}, options) {
    return this._client.get(path`/ad_campaigns/${id}`, { query, ...options });
  }
  /**
   * Updates an ad campaign's editable fields (title, budget, schedule, bid strategy,
   * special ad categories, and, before launch, budget optimization), and launches a
   * draft campaign by setting status to active. Objective, budget type and desired
   * cost per result are fixed at creation and cannot be changed.
   */
  update(id, body, options) {
    return this._client.patch(path`/ad_campaigns/${id}`, { body, ...options });
  }
  /**
   * Deletes an ad campaign and archives it on the ad platform (cascades to ad groups
   * and ads). Returns true on success.
   */
  delete(id, options) {
    return this._client.delete(path`/ad_campaigns/${id}`, options);
  }
  /**
   * Pauses an active ad campaign.
   */
  pause(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ad_campaigns/${id}/pause`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Resumes a paused ad campaign.
   */
  unpause(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ad_campaigns/${id}/unpause`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retries billing for an ad campaign whose payment previously failed.
   */
  retryPayment(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ad_campaigns/${id}/retry_payment`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/ad-groups.mjs
var AdGroups = class extends APIResource {
  /**
   * Lists ad groups for the account, newest first.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/ad_groups", CursorPage, { query, ...options });
  }
  /**
   * Creates an ad group (ad set) in a campaign.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/ad_groups", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a single ad group.
   */
  retrieve(id, query = {}, options) {
    return this._client.get(path`/ad_groups/${id}`, { query, ...options });
  }
  /**
   * Updates an ad group's editable fields. Only the keys you send are changed.
   */
  update(id, body, options) {
    return this._client.patch(path`/ad_groups/${id}`, { body, ...options });
  }
  /**
   * Deletes an ad group. Returns true on success.
   */
  delete(id, options) {
    return this._client.delete(path`/ad_groups/${id}`, options);
  }
  /**
   * Pauses delivery of an ad group.
   */
  pause(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ad_groups/${id}/pause`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Resumes delivery of a paused ad group.
   */
  unpause(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ad_groups/${id}/unpause`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Searches the ad platform's targeting taxonomy for options to target an ad group
   * with. Each result comes back in the exact shape the ad-group body accepts for
   * its `type`, so it can be used in `detailed_targeting`, `regions`, or `languages`
   * as-is. A blank `query` browses the small fixed lists (behaviors, demographic
   * categories, languages); interests and locations need a search term.
   */
  searchTargetingOptions(query, options) {
    return this._client.get("/ad_groups/targeting_options", { query, ...options });
  }
  /**
   * Estimates how many people a draft targeting spec can reach, before an ad group
   * is created. The body takes the same targeting fields as creating an ad group —
   * `regions`, `demographics`, `detailed_targeting`, `audiences`, `languages`, and
   * `devices` — and nothing is persisted.
   */
  estimateReach(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/ad_groups/estimate_reach", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/ad-reports.mjs
var AdReports = class extends APIResource {
  /**
   * Performance report for a company, ad campaigns, ad groups, or ads. Always
   * returns aggregate `summary` totals summed across the scope. Set `granularity` to
   * additionally get a time series, or set `breakdown` (`campaign`/`ad_group`/`ad`)
   * to additionally get per-entity rows inside the requested scope. Exactly one of
   * `companyId`, `adCampaignIds`, `adGroupIds`, or `adIds` must be provided.
   *
   * Required permissions:
   *
   * - `ad_campaign:stats:read`
   */
  retrieve(query, options) {
    return this._client.get("/ad_reports", { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/ads.mjs
var Ads = class extends APIResource {
  /**
   * Lists the ads for an account, with stats over the requested window.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/ads", CursorPage, { query, ...options });
  }
  /**
   * Creates an ad in an ad group.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/ads", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a single ad with stats over the requested window.
   */
  retrieve(id, query = {}, options) {
    return this._client.get(path`/ads/${id}`, { query, ...options });
  }
  /**
   * Updates an ad's editable fields.
   */
  update(id, body, options) {
    return this._client.patch(path`/ads/${id}`, { body, ...options });
  }
  /**
   * Deletes an ad. Returns true on success.
   */
  delete(id, options) {
    return this._client.delete(path`/ads/${id}`, options);
  }
  /**
   * Pauses an active ad.
   */
  pause(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ads/${id}/pause`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Resumes a paused ad.
   */
  unpause(id, params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post(path`/ads/${id}/unpause`, {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/affiliates/overrides.mjs
var Overrides = class extends APIResource {
  /**
   * Returns a paginated list of overrides for an affiliate.
   *
   * Required permissions:
   *
   * - `affiliate:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const overrideListResponse of client.affiliates.overrides.list(
   *   'aff_xxxxxxxxxxxxxx',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(id, query = {}, options) {
    return this._client.getAPIList(path`/affiliates/${id}/overrides`, CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Creates a commission override for an affiliate.
   *
   * Required permissions:
   *
   * - `affiliate:create`
   *
   * @example
   * ```ts
   * const override = await client.affiliates.overrides.create(
   *   'aff_xxxxxxxxxxxxxx',
   *   {
   *     id: 'id',
   *     commission_value: 6.9,
   *     override_type: 'standard',
   *     plan_id: 'plan_xxxxxxxxxxxxx',
   *   },
   * );
   * ```
   */
  create(id, body, options) {
    return this._client.post(path`/affiliates/${id}/overrides`, { body, ...options });
  }
  /**
   * Retrieves the details of a specific affiliate override.
   *
   * Required permissions:
   *
   * - `affiliate:basic:read`
   *
   * @example
   * ```ts
   * const override = await client.affiliates.overrides.retrieve(
   *   'override_id',
   *   { id: 'aff_xxxxxxxxxxxxxx' },
   * );
   * ```
   */
  retrieve(overrideID, params, options) {
    const { id } = params;
    return this._client.get(path`/affiliates/${id}/overrides/${overrideID}`, options);
  }
  /**
   * Updates an existing affiliate override.
   *
   * Required permissions:
   *
   * - `affiliate:update`
   *
   * @example
   * ```ts
   * const override = await client.affiliates.overrides.update(
   *   'override_id',
   *   { id: 'aff_xxxxxxxxxxxxxx' },
   * );
   * ```
   */
  update(overrideID, params, options) {
    const { id, ...body } = params;
    return this._client.patch(path`/affiliates/${id}/overrides/${overrideID}`, { body, ...options });
  }
  /**
   * Deletes an affiliate override.
   *
   * Required permissions:
   *
   * - `affiliate:update`
   *
   * @example
   * ```ts
   * const override = await client.affiliates.overrides.delete(
   *   'override_id',
   *   { id: 'aff_xxxxxxxxxxxxxx' },
   * );
   * ```
   */
  delete(overrideID, params, options) {
    const { id } = params;
    return this._client.delete(path`/affiliates/${id}/overrides/${overrideID}`, options);
  }
};

// node_modules/@whop/sdk/resources/affiliates/affiliates.mjs
var Affiliates = class extends APIResource {
  constructor() {
    super(...arguments);
    this.overrides = new Overrides(this._client);
  }
  /**
   * Returns a paginated list of affiliates for the actor in context, with optional
   * filtering by status, search, and sorting.
   *
   * Required permissions:
   *
   * - `affiliate:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const affiliateListResponse of client.affiliates.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/affiliates", CursorPage, { query, ...options });
  }
  /**
   * Creates or finds an affiliate for a company and user.
   *
   * Required permissions:
   *
   * - `affiliate:create`
   *
   * @example
   * ```ts
   * const affiliate = await client.affiliates.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   user_identifier: 'user_identifier',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/affiliates", { body, ...options });
  }
  /**
   * Retrieves the details of an existing affiliate.
   *
   * Required permissions:
   *
   * - `affiliate:basic:read`
   *
   * @example
   * ```ts
   * const affiliate = await client.affiliates.retrieve(
   *   'aff_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/affiliates/${id}`, options);
  }
  /**
   * Archives an existing Affiliate
   *
   * Required permissions:
   *
   * - `affiliate:update`
   *
   * @example
   * ```ts
   * const response = await client.affiliates.archive(
   *   'aff_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  archive(id, options) {
    return this._client.post(path`/affiliates/${id}/archive`, options);
  }
  /**
   * Unarchives an existing Affiliate
   *
   * Required permissions:
   *
   * - `affiliate:update`
   *
   * @example
   * ```ts
   * const response = await client.affiliates.unarchive(
   *   'aff_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  unarchive(id, options) {
    return this._client.post(path`/affiliates/${id}/unarchive`, options);
  }
};
Affiliates.Overrides = Overrides;

// node_modules/@whop/sdk/resources/app-builds.mjs
var AppBuilds = class extends APIResource {
  /**
   * Returns a paginated list of build artifacts for a given app, with optional
   * filtering by platform, status, and creation date.
   *
   * Required permissions:
   *
   * - `developer:manage_builds`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const appBuildListResponse of client.appBuilds.list(
   *   { app_id: 'app_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/app_builds", CursorPage, { query, ...options });
  }
  /**
   * Upload a new build artifact for an app. The build must include a compiled code
   * bundle for the specified platform.
   *
   * Required permissions:
   *
   * - `developer:manage_builds`
   *
   * @example
   * ```ts
   * const appBuild = await client.appBuilds.create({
   *   attachment: { id: 'id' },
   *   checksum: 'checksum',
   *   platform: 'ios',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/app_builds", { body, ...options });
  }
  /**
   * Retrieves the details of an existing app build.
   *
   * Required permissions:
   *
   * - `developer:manage_builds`
   *
   * @example
   * ```ts
   * const appBuild = await client.appBuilds.retrieve(
   *   'apbu_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/app_builds/${id}`, options);
  }
  /**
   * Promote an approved or draft app build to production so it becomes the active
   * version served to users.
   *
   * Required permissions:
   *
   * - `developer:manage_builds`
   *
   * @example
   * ```ts
   * const appBuild = await client.appBuilds.promote(
   *   'apbu_xxxxxxxxxxxxx',
   * );
   * ```
   */
  promote(id, options) {
    return this._client.post(path`/app_builds/${id}/promote`, options);
  }
};

// node_modules/@whop/sdk/resources/apps.mjs
var Apps = class extends APIResource {
  /**
   * Returns a paginated list of apps on the Whop platform, with optional filtering
   * by company, type, view support, and search query.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const appListResponse of client.apps.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/apps", CursorPage, { query, ...options });
  }
  /**
   * Register a new app on the Whop developer platform. Apps provide custom
   * experiences that can be added to products.
   *
   * Required permissions:
   *
   * - `developer:create_app`
   * - `developer:manage_api_key`
   * - `developer:update_app`
   *
   * @example
   * ```ts
   * const app = await client.apps.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   name: 'name',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/apps", { body, ...options });
  }
  /**
   * Retrieves the details of an existing app.
   *
   * Required permissions:
   *
   * - `developer:manage_api_key`
   * - `developer:update_app`
   *
   * @example
   * ```ts
   * const app = await client.apps.retrieve(
   *   'app_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/apps/${id}`, options);
  }
  /**
   * Update the settings, metadata, or status of an existing app on the Whop
   * developer platform.
   *
   * Required permissions:
   *
   * - `developer:update_app`
   * - `developer:manage_api_key`
   *
   * @example
   * ```ts
   * const app = await client.apps.update('app_xxxxxxxxxxxxxx');
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/apps/${id}`, { body, ...options });
  }
  /**
   * Lists a hosted app's server runtime logs, most recent first: console output,
   * uncaught exceptions, and failed-request summaries captured on whop.app hosting.
   * Logs are retained for 7 days.
   *
   * @example
   * ```ts
   * const response = await client.apps.logs('id');
   * ```
   */
  logs(id, query = {}, options) {
    return this._client.get(path`/apps/${id}/logs`, { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/audiences.mjs
var Audiences = class extends APIResource {
  /**
   * Lists uploaded customer-list audiences for an account. Pass `audience_id` to
   * return a specific audience.
   */
  list(query, options) {
    return this._client.getAPIList("/audiences", CursorPage, { query, ...options });
  }
  /**
   * Creates an audience. Default (`audience_type` omitted or `custom`): creates one
   * audience from an uploaded customer identity CSV file (`name`, `column_mapping`,
   * and `file_id` required) and starts processing it; responds with the audience
   * object. With `audience_type: lookalike`: creates a ladder of Meta lookalike
   * audiences from an existing ready custom audience (`source_audience_id`, `count`,
   * and `percentage` required) — `count` equal similarity bands slicing the top
   * `percentage`% (3 audiences at 6% = 0–2%, 2–4%, 4–6%), each returned as its own
   * audience in a `{ data: [...] }` envelope.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/audiences", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Deletes an audience so it is no longer available for targeting.
   */
  delete(audienceID, options) {
    return this._client.delete(path`/audiences/${audienceID}`, options);
  }
};

// node_modules/@whop/sdk/resources/authorized-users.mjs
var AuthorizedUsers = class extends APIResource {
  /**
   * Returns a paginated list of authorized team members for a company, with optional
   * filtering by user, role, and creation date.
   *
   * Required permissions:
   *
   * - `company:authorized_user:read`
   * - `member:email:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const authorizedUserListResponse of client.authorizedUsers.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/authorized_users", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing authorized user.
   *
   * Required permissions:
   *
   * - `company:authorized_user:read`
   * - `member:email:read`
   *
   * @example
   * ```ts
   * const authorizedUser =
   *   await client.authorizedUsers.retrieve(
   *     'ausr_xxxxxxxxxxxxx',
   *   );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/authorized_users/${id}`, options);
  }
  /**
   * Add a new authorized user to a company.
   *
   * Required permissions:
   *
   * - `authorized_user:create`
   * - `member:email:read`
   *
   * @example
   * ```ts
   * const authorizedUser = await client.authorizedUsers.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   role: 'owner',
   *   user_id: 'user_xxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/authorized_users", { body, ...options });
  }
  /**
   * Remove an authorized user from a company.
   *
   * Required permissions:
   *
   * - `authorized_user:delete`
   *
   * @example
   * ```ts
   * const authorizedUser = await client.authorizedUsers.delete(
   *   'ausr_xxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, params = {}, options) {
    const { company_id } = params ?? {};
    return this._client.delete(path`/authorized_users/${id}`, { query: { company_id }, ...options });
  }
};

// node_modules/@whop/sdk/resources/bounties.mjs
var Bounties = class extends APIResource {
  /**
   * Lists bounties visible to the credential — for an account API key, the account's
   * bounties including scheduled drafts; for a user token, the bounties the user can
   * see and work.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const bountyListItem of client.bounties.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/bounties", CursorPage, { query, ...options });
  }
  /**
   * Creates a bounty and escrows its reward pool. Publishes immediately, or as a
   * scheduled draft when you set `publish_at`.
   *
   * @example
   * ```ts
   * const bounty = await client.bounties.create({
   *   description: 'description',
   *   gross_reward_amount: 0,
   *   title: 'title',
   * });
   * ```
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/bounties", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a bounty by ID. Bounties outside the caller's scope return `404`.
   *
   * @example
   * ```ts
   * const bounty = await client.bounties.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/bounties/${id}`, options);
  }
  /**
   * Updates a bounty. A published bounty accepts title, description, and country
   * targeting while it is still open with nothing under review. A scheduled
   * (not-yet-published) draft additionally accepts the reward, winner slots, and
   * schedule.
   *
   * @example
   * ```ts
   * const bounty = await client.bounties.update('id');
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/bounties/${id}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/bounty-submissions.mjs
var BountySubmissions = class extends APIResource {
  /**
   * Lists bounty submissions visible to the credential — for a user token, the
   * submissions they authored plus those on bounties they posted; for an account API
   * key, the submissions on the account's bounties.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/bounty_submissions", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Submits work to a workforce bounty. Include a `deliverable` payload matching the
   * bounty's accepted deliverable type: `content_url` for link-based bounties,
   * `media` for upload-based bounties. The submission lands directly in review.
   * Requires a user credential — account API keys cannot author submissions.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/bounty_submissions", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/cards.mjs
var Cards = class extends APIResource {
  /**
   * Lists issued Whop virtual cards for an account or user, including pending
   * invitation cards that have not been issued by the card provider yet. Pass
   * exactly one of account*id (a biz* identifier) or user*id (a user* identifier).
   * Non-owner team members only see cards assigned to them. Users without the
   * payout:account:read scope can still list cards assigned to them (for example
   * moderators or external cardholders). Use GET /cards/:card_id to retrieve a
   * single card with its secrets.
   */
  list(query = {}, options) {
    return this._client.get("/cards", { query, ...options });
  }
  /**
   * Issues a virtual card. For an individual (consumer) card issuing account, the
   * card is issued to the account's own cardholder. For a company (business) card
   * issuing account, pass assigned*user_id to issue the card to a company member; if
   * that member is not yet an approved card-issuing user, the card is provisioned
   * asynchronously or an onboarding invitation is sent (HTTP 202). Pass exactly one
   * of account_id (a biz* identifier) or user*id (a user* identifier). Returns the
   * newly created card resource.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/cards", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a single card by its icrd\_ identifier, including its secrets (full
   * card number, CVC, and cardholder name) for active cards.
   */
  retrieve(cardID, query = {}, options) {
    return this._client.get(path`/cards/${cardID}`, { query, ...options });
  }
  /**
   * Updates an issued card. All fields are optional; only the fields you pass are
   * changed. Updates the card name, billing address, and spending limits in one
   * call, sets a new PIN, freezes or unfreezes the card, or cancels it. Pass
   * canceled: true alone to cancel the card — cancellation is permanent and a
   * canceled card cannot be uncanceled. Pass exactly one of account*id (a biz*
   * identifier) or user*id (a user* identifier). Assigned cardholders without the
   * payout:account:update scope can update the PIN and freeze state of their own
   * card. The PIN can only be changed on a card assigned to the acting user. Returns
   * the updated card resource.
   */
  update(cardID, body, options) {
    return this._client.patch(path`/cards/${cardID}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/chat-channels.mjs
var ChatChannels = class extends APIResource {
  /**
   * Returns a paginated list of chat channels within a specific company, with
   * optional filtering by product.
   *
   * Required permissions:
   *
   * - `chat:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chatChannelListResponse of client.chatChannels.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/chat_channels", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing chat channel.
   *
   * Required permissions:
   *
   * - `chat:read`
   *
   * @example
   * ```ts
   * const chatChannel = await client.chatChannels.retrieve(
   *   'id',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/chat_channels/${id}`, options);
  }
  /**
   * Update moderation settings for a chat channel, such as who can post, banned
   * words, and media restrictions.
   *
   * Required permissions:
   *
   * - `chat:moderate`
   *
   * @example
   * ```ts
   * const chatChannel = await client.chatChannels.update('id');
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/chat_channels/${id}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/checkout-configurations.mjs
var CheckoutConfigurations = class extends APIResource {
  /**
   * Lists checkout configurations for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const checkoutConfigurationListResponse of client.checkoutConfigurations.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/checkout_configurations", CursorPage, { query, ...options });
  }
  /**
   * Creates a reusable checkout configuration for an existing or inline plan.
   *
   * @example
   * ```ts
   * const checkoutConfiguration =
   *   await client.checkoutConfigurations.create();
   * ```
   */
  create(params = {}, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params ?? {};
    return this._client.post("/checkout_configurations", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a checkout configuration by ID. This endpoint is public so a checkout
   * page can load from the configuration URL.
   *
   * @example
   * ```ts
   * const checkoutConfiguration =
   *   await client.checkoutConfigurations.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/checkout_configurations/${id}`, options);
  }
  /**
   * Deletes a checkout configuration so its checkout URL can no longer be used.
   *
   * @example
   * ```ts
   * await client.checkoutConfigurations.delete('id');
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/checkout_configurations/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: "*/*" }, options?.headers])
    });
  }
};

// node_modules/@whop/sdk/resources/companies.mjs
var Companies = class extends APIResource {
  /**
   * Retrieves the details of an existing company.
   *
   * Required permissions:
   *
   * - `company:basic:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/companies/${id}`, options);
  }
  /**
   * Returns a paginated list of companies. When parent_company_id is provided, lists
   * connected accounts under that platform. When omitted, lists companies the
   * current user has access to.
   *
   * Required permissions:
   *
   * - `company:basic:read`
   */
  list(query = {}, options) {
    return this._client.getAPIList("/companies", CursorPage, { query, ...options });
  }
  /**
   * Create a new company. Pass parent_company_id to create a connected account under
   * a platform, or omit it to create a company for the current user.
   *
   * Required permissions:
   *
   * - `company:create`
   * - `company:basic:read`
   */
  create(body, options) {
    return this._client.post("/companies", { body, ...options });
  }
  /**
   * Update a company's title, description, logo, and other settings.
   *
   * Required permissions:
   *
   * - `company:update`
   * - `company:basic:read`
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/companies/${id}`, { body, ...options });
  }
  /**
   * Create an API key for a connected account (child company) owned by a parent
   * company.
   */
  createAPIKey(parentCompanyID, body, options) {
    return this._client.post(path`/companies/${parentCompanyID}/api_keys`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/company-token-transactions.mjs
var CompanyTokenTransactions = class extends APIResource {
  /**
   * Returns a paginated list of token transactions for a user or company, depending
   * on the authenticated actor, with optional filtering by user and transaction
   * type.
   *
   * Required permissions:
   *
   * - `company_token_transaction:read`
   * - `member:basic:read`
   * - `company:basic:read`
   */
  list(query, options) {
    return this._client.getAPIList("/company_token_transactions", CursorPage, { query, ...options });
  }
  /**
   * Create a token transaction to add, subtract, or transfer tokens for a member
   * within a company.
   *
   * Required permissions:
   *
   * - `company_token_transaction:create`
   * - `member:basic:read`
   * - `company:basic:read`
   *
   * @example
   * ```ts
   * const companyTokenTransaction =
   *   await client.companyTokenTransactions.create({
   *     amount: 6.9,
   *     company_id: 'biz_xxxxxxxxxxxxxx',
   *     destination_user_id: 'destination_user_id',
   *     transaction_type: 'transfer',
   *     user_id: 'user_xxxxxxxxxxxxx',
   *   });
   * ```
   */
  create(body, options) {
    return this._client.post("/company_token_transactions", { body, ...options });
  }
  /**
   * Retrieves the details of an existing company token transaction.
   *
   * Required permissions:
   *
   * - `company_token_transaction:read`
   * - `member:basic:read`
   * - `company:basic:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/company_token_transactions/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/course-chapters.mjs
var CourseChapters = class extends APIResource {
  /**
   * Returns a paginated list of chapters within a course, ordered by position.
   *
   * Required permissions:
   *
   * - `courses:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const courseChapterListResponse of client.courseChapters.list(
   *   { course_id: 'cors_xxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/course_chapters", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Create a new chapter within a course to organize lessons into sections.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const courseChapter = await client.courseChapters.create({
   *   course_id: 'cors_xxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/course_chapters", { body, ...options });
  }
  /**
   * Retrieves the details of an existing course chapter.
   *
   * Required permissions:
   *
   * - `courses:read`
   *
   * @example
   * ```ts
   * const courseChapter = await client.courseChapters.retrieve(
   *   'chap_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/course_chapters/${id}`, options);
  }
  /**
   * Update a chapter's title within a course.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const courseChapter = await client.courseChapters.update(
   *   'chap_xxxxxxxxxxxxx',
   *   { title: 'title' },
   * );
   * ```
   */
  update(id, body, options) {
    return this._client.patch(path`/course_chapters/${id}`, { body, ...options });
  }
  /**
   * Permanently delete a chapter and all of its lessons from a course.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const courseChapter = await client.courseChapters.delete(
   *   'chap_xxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/course_chapters/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/course-lesson-interactions.mjs
var CourseLessonInteractions = class extends APIResource {
  /**
   * Returns a paginated list of lesson interactions, filtered by lesson, course,
   * user, or completion status.
   *
   * Required permissions:
   *
   * - `courses:read`
   * - `course_analytics:read`
   */
  list(query = {}, options) {
    return this._client.getAPIList("/course_lesson_interactions", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing course lesson interaction.
   *
   * Required permissions:
   *
   * - `courses:read`
   * - `course_analytics:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/course_lesson_interactions/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/course-lessons.mjs
var CourseLessons = class extends APIResource {
  /**
   * Returns a paginated list of lessons within a course or chapter, ordered by
   * position.
   *
   * Required permissions:
   *
   * - `courses:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const courseLessonListResponse of client.courseLessons.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/course_lessons", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Create a new lesson within a course chapter. Lessons can contain video, text, or
   * assessment content.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const lesson = await client.courseLessons.create({
   *   chapter_id: 'chap_xxxxxxxxxxxxx',
   *   lesson_type: 'text',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/course_lessons", { body, ...options });
  }
  /**
   * Retrieves the details of an existing course lesson.
   *
   * Required permissions:
   *
   * - `courses:read`
   *
   * @example
   * ```ts
   * const lesson = await client.courseLessons.retrieve(
   *   'lesn_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/course_lessons/${id}`, options);
  }
  /**
   * Update a lesson's content, type, visibility, assessment questions, or media
   * attachments.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const lesson = await client.courseLessons.update(
   *   'lesn_xxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/course_lessons/${id}`, { body, ...options });
  }
  /**
   * Permanently delete a lesson and remove it from its chapter.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const courseLesson = await client.courseLessons.delete(
   *   'lesn_xxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/course_lessons/${id}`, options);
  }
  /**
   * Mark a lesson as completed for the current user after they finish the content.
   *
   * @example
   * ```ts
   * const response = await client.courseLessons.markAsCompleted(
   *   'lesson_id',
   * );
   * ```
   */
  markAsCompleted(lessonID, options) {
    return this._client.post(path`/course_lessons/${lessonID}/mark_as_completed`, options);
  }
  /**
   * Record that the current user has started viewing a lesson, creating progress
   * tracking records.
   *
   * @example
   * ```ts
   * const response = await client.courseLessons.start(
   *   'lesson_id',
   * );
   * ```
   */
  start(lessonID, options) {
    return this._client.post(path`/course_lessons/${lessonID}/start`, options);
  }
  /**
   * Submit answers for a quiz or knowledge check lesson and receive a graded result.
   *
   * @example
   * ```ts
   * const response =
   *   await client.courseLessons.submitAssessment('lesson_id', {
   *     answers: [{ question_id: 'question_id' }],
   *   });
   * ```
   */
  submitAssessment(lessonID, body, options) {
    return this._client.post(path`/course_lessons/${lessonID}/submit_assessment`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/course-students.mjs
var CourseStudents = class extends APIResource {
  /**
   * Returns a paginated list of students enrolled in a course, with optional name
   * filtering.
   *
   * Required permissions:
   *
   * - `courses:read`
   * - `course_analytics:read`
   */
  list(query, options) {
    return this._client.getAPIList("/course_students", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing course student.
   *
   * Required permissions:
   *
   * - `courses:read`
   * - `course_analytics:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/course_students/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/courses.mjs
var Courses = class extends APIResource {
  /**
   * Returns a paginated list of courses, filtered by either an experience or a
   * company.
   *
   * Required permissions:
   *
   * - `courses:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const courseListResponse of client.courses.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/courses", CursorPage, { query, ...options });
  }
  /**
   * Create a new course within an experience, with optional chapters, lessons, and a
   * certificate.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const course = await client.courses.create({
   *   experience_id: 'exp_xxxxxxxxxxxxxx',
   *   title: 'title',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/courses", { body, ...options });
  }
  /**
   * Retrieves the details of an existing course.
   *
   * Required permissions:
   *
   * - `courses:read`
   *
   * @example
   * ```ts
   * const course = await client.courses.retrieve(
   *   'cors_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/courses/${id}`, options);
  }
  /**
   * Update a course's title, description, visibility, thumbnail, or chapter
   * ordering.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const course = await client.courses.update(
   *   'cors_xxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/courses/${id}`, { body, ...options });
  }
  /**
   * Permanently delete a course and all of its chapters, lessons, and student
   * progress.
   *
   * Required permissions:
   *
   * - `courses:update`
   *
   * @example
   * ```ts
   * const course = await client.courses.delete(
   *   'cors_xxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/courses/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/deposits.mjs
var Deposits = class extends APIResource {
  /**
   * Resolves a deposit destination and returns the on-chain addresses that can fund
   * it. No authentication is required; any business can be resolved by its account
   * ID. A caller authenticated as a user can additionally resolve their own user
   * account.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/deposits", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/dispute-alerts.mjs
var DisputeAlerts = class extends APIResource {
  /**
   * Returns a paginated list of dispute alerts for a company, with optional
   * filtering by creation date.
   *
   * Required permissions:
   *
   * - `payment:dispute_alert:read`
   * - `payment:basic:read`
   * - `payment:dispute:read`
   */
  list(query, options) {
    return this._client.getAPIList("/dispute_alerts", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing dispute alert.
   *
   * Required permissions:
   *
   * - `payment:dispute_alert:read`
   * - `payment:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `payment:dispute:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/dispute_alerts/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/disputes.mjs
var Disputes = class extends APIResource {
  /**
   * Returns a paginated list of disputes for a company, with optional filtering by
   * creation date. A dispute represents a chargeback or inquiry filed by a customer
   * against a payment.
   *
   * Required permissions:
   *
   * - `payment:dispute:read`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `company:basic:read`
   * - `payment:basic:read`
   */
  list(query, options) {
    return this._client.getAPIList("/disputes", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing dispute.
   *
   * Required permissions:
   *
   * - `payment:dispute:read`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `company:basic:read`
   * - `payment:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/disputes/${id}`, options);
  }
  /**
   * Submit a payment dispute to the payment processor for review. Once submitted, no
   * further edits can be made.
   *
   * Required permissions:
   *
   * - `payment:dispute`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `company:basic:read`
   * - `payment:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   */
  submitEvidence(id, options) {
    return this._client.post(path`/disputes/${id}/submit_evidence`, options);
  }
  /**
   * Update a dispute with evidence data to attempt to win the dispute.
   *
   * Required permissions:
   *
   * - `payment:dispute`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `company:basic:read`
   * - `payment:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   */
  updateEvidence(id, body = {}, options) {
    return this._client.post(path`/disputes/${id}/update_evidence`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/dm-channels.mjs
var DmChannels = class extends APIResource {
  /**
   * Returns a paginated list of DM channels for the currently authenticated user,
   * sorted by most recently active.
   *
   * Required permissions:
   *
   * - `dms:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dmChannelListResponse of client.dmChannels.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/dm_channels", CursorPage, { query, ...options });
  }
  /**
   * Create a new DM channel between two or more users, optionally scoped to a
   * specific company. Returns the existing channel if one already exists.
   *
   * @example
   * ```ts
   * const dmChannel = await client.dmChannels.create({
   *   with_user_ids: ['string'],
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/dm_channels", { body, ...options });
  }
  /**
   * Retrieves the details of an existing DM channel.
   *
   * Required permissions:
   *
   * - `dms:read`
   *
   * @example
   * ```ts
   * const dmChannel = await client.dmChannels.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/dm_channels/${id}`, options);
  }
  /**
   * Update the settings of an existing DM channel, such as its display name. Only an
   * admin of the channel can perform this action.
   *
   * Required permissions:
   *
   * - `dms:channel:manage`
   *
   * @example
   * ```ts
   * const dmChannel = await client.dmChannels.update('id');
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/dm_channels/${id}`, { body, ...options });
  }
  /**
   * Permanently delete a DM channel and all of its messages. Only an admin of the
   * channel can perform this action.
   *
   * Required permissions:
   *
   * - `dms:channel:manage`
   *
   * @example
   * ```ts
   * const dmChannel = await client.dmChannels.delete('id');
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/dm_channels/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/dm-members.mjs
var DmMembers = class extends APIResource {
  /**
   * Returns a paginated list of members in a specific DM channel, sorted by the date
   * they were added.
   *
   * Required permissions:
   *
   * - `dms:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dmMemberListResponse of client.dmMembers.list(
   *   { channel_id: 'channel_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/dm_members", CursorPage, { query, ...options });
  }
  /**
   * Add a new user to an existing DM channel. Only an admin of the channel can add
   * members.
   *
   * Required permissions:
   *
   * - `dms:channel:manage`
   *
   * @example
   * ```ts
   * const dmMember = await client.dmMembers.create({
   *   channel_id: 'channel_id',
   *   user_id: 'user_xxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/dm_members", { body, ...options });
  }
  /**
   * Retrieves the details of an existing DM member.
   *
   * Required permissions:
   *
   * - `dms:read`
   *
   * @example
   * ```ts
   * const dmMember = await client.dmMembers.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/dm_members/${id}`, options);
  }
  /**
   * Update a DM channel member's settings, such as their notification preferences or
   * membership status.
   *
   * Required permissions:
   *
   * - `dms:channel:manage`
   *
   * @example
   * ```ts
   * const dmMember = await client.dmMembers.update('id');
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/dm_members/${id}`, { body, ...options });
  }
  /**
   * Remove a user from a DM channel. An admin can remove any member, and a member
   * can remove themselves.
   *
   * Required permissions:
   *
   * - `dms:channel:manage`
   *
   * @example
   * ```ts
   * const dmMember = await client.dmMembers.delete('id');
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/dm_members/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/entries.mjs
var Entries = class extends APIResource {
  /**
   * Returns a paginated list of waitlist entries for a company, with optional
   * filtering by product, plan, status, and creation date.
   *
   * Required permissions:
   *
   * - `plan:waitlist:read`
   * - `member:email:read`
   */
  list(query, options) {
    return this._client.getAPIList("/entries", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing waitlist entry.
   *
   * Required permissions:
   *
   * - `plan:waitlist:read`
   * - `member:email:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/entries/${id}`, options);
  }
  /**
   * Approve a pending waitlist entry, triggering the checkout process to grant the
   * user access to the plan.
   *
   * Required permissions:
   *
   * - `plan:waitlist:manage`
   */
  approve(id, options) {
    return this._client.post(path`/entries/${id}/approve`, options);
  }
  /**
   * Deny a pending waitlist entry, preventing the user from gaining access to the
   * plan.
   *
   * Required permissions:
   *
   * - `plan:waitlist:manage`
   * - `plan:basic:read`
   * - `member:email:read`
   */
  deny(id, options) {
    return this._client.post(path`/entries/${id}/deny`, options);
  }
};

// node_modules/@whop/sdk/resources/events.mjs
var Events = class extends APIResource {
  /**
   * Lists identity-linked events, most recent first. Pass identifier for one
   * person's journey, or omit it to list events for an account within an explicit
   * time range. Events are shaped like the POST /events intake: attribution in
   * context, identity in user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const eventListResponse of client.events.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/events", CursorPage, { query, ...options });
  }
  /**
   * Tracks a conversion or engagement event for an account.
   *
   * @example
   * ```ts
   * const event = await client.events.create({
   *   account_id: 'account_id',
   *   event_name: 'course_completed',
   * });
   * ```
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/events", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/experiences.mjs
var Experiences = class extends APIResource {
  /**
   * Returns a paginated list of experiences belonging to a company, with optional
   * filtering by product and app.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const experienceListResponse of client.experiences.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/experiences", CursorPage, { query, ...options });
  }
  /**
   * Required permissions:
   *
   * - `experience:create`
   *
   * @example
   * ```ts
   * const experience = await client.experiences.create({
   *   app_id: 'app_xxxxxxxxxxxxxx',
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/experiences", { body, ...options });
  }
  /**
   * Retrieves the details of an existing experience.
   *
   * @example
   * ```ts
   * const experience = await client.experiences.retrieve(
   *   'exp_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/experiences/${id}`, options);
  }
  /**
   * Required permissions:
   *
   * - `experience:update`
   *
   * @example
   * ```ts
   * const experience = await client.experiences.update(
   *   'exp_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/experiences/${id}`, { body, ...options });
  }
  /**
   * Required permissions:
   *
   * - `experience:delete`
   *
   * @example
   * ```ts
   * const experience = await client.experiences.delete(
   *   'exp_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/experiences/${id}`, options);
  }
  /**
   * Attach an experience to a product, making it accessible to the product's
   * customers.
   *
   * Required permissions:
   *
   * - `experience:attach`
   *
   * @example
   * ```ts
   * const experience = await client.experiences.attach(
   *   'exp_xxxxxxxxxxxxxx',
   *   { product_id: 'prod_xxxxxxxxxxxxx' },
   * );
   * ```
   */
  attach(id, body, options) {
    return this._client.post(path`/experiences/${id}/attach`, { body, ...options });
  }
  /**
   * Detach an experience from a product, removing customer access to it through that
   * product.
   *
   * Required permissions:
   *
   * - `experience:detach`
   *
   * @example
   * ```ts
   * const experience = await client.experiences.detach(
   *   'exp_xxxxxxxxxxxxxx',
   *   { product_id: 'prod_xxxxxxxxxxxxx' },
   * );
   * ```
   */
  detach(id, body, options) {
    return this._client.post(path`/experiences/${id}/detach`, { body, ...options });
  }
  /**
   * Duplicates an existing experience. The name will be copied, unless provided. The
   * new experience will be attached to the same products as the original experience.
   * If duplicating a Forum or Chat experience, the new experience will have the same
   * settings as the original experience, e.g. who can post, who can comment, etc. No
   * content, e.g. posts, messages, lessons from within the original experience will
   * be copied.
   *
   * Required permissions:
   *
   * - `experience:create`
   *
   * @example
   * ```ts
   * const experience = await client.experiences.duplicate(
   *   'exp_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  duplicate(id, body = {}, options) {
    return this._client.post(path`/experiences/${id}/duplicate`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/fee-markups.mjs
var FeeMarkups = class extends APIResource {
  /**
   * Returns a paginated list of fee markups configured for a company. If the company
   * is a platform account, returns the platform default markups.
   *
   * Required permissions:
   *
   * - `company:update_child_fees`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const feeMarkupListResponse of client.feeMarkups.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/fee_markups", CursorPage, { query, ...options });
  }
  /**
   * Create or update a fee markup for a company. If a markup for the specified fee
   * type already exists, it will be updated with the new values.
   *
   * Required permissions:
   *
   * - `company:update_child_fees`
   *
   * @example
   * ```ts
   * const feeMarkup = await client.feeMarkups.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   fee_type: 'crypto_withdrawal_markup',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/fee_markups", { body, ...options });
  }
  /**
   * Delete a fee markup configuration for a company. This removes the custom fee
   * override and reverts to the parent company's default fees.
   *
   * Required permissions:
   *
   * - `company:update_child_fees`
   *
   * @example
   * ```ts
   * const feeMarkup = await client.feeMarkups.delete('id');
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/fee_markups/${id}`, options);
  }
};

// node_modules/@whop/sdk/lib/upload-file.mjs
function normalizeUploadHeaders(headers) {
  if (!headers)
    return void 0;
  const out = {};
  for (const [key, value] of Object.entries(headers)) {
    if (value === null || value === void 0)
      continue;
    out[key] = String(value);
  }
  return out;
}
async function uploadFile(client, file, options) {
  const pollIntervalMs = options?.pollIntervalMs ?? 1e3;
  const pollTimeoutMs = options?.pollTimeoutMs ?? 12e4;
  const requestOptions = options?.requestOptions ?? void 0;
  const normalized = await toFile(file, options?.filename ?? void 0);
  const filename = (options?.filename ?? normalized.name)?.trim();
  if (!filename) {
    throw new Error("uploadFile: could not determine a filename; pass { filename } or provide a named File.");
  }
  const created = await client.files.create({ filename }, requestOptions);
  if (created.upload_status === "failed") {
    throw new Error(`uploadFile: file creation failed (id: ${created.id}).`);
  }
  if (created.upload_status !== "ready") {
    if (!created.upload_url) {
      throw new Error("uploadFile: missing upload_url from files.create response.");
    }
    const fetchImpl = client.fetch ?? getDefaultFetch();
    const uploadResponse = await fetchImpl(created.upload_url, {
      method: "PUT",
      headers: normalizeUploadHeaders(created.upload_headers) ?? {},
      body: normalized
    });
    if (!uploadResponse.ok) {
      throw new Error(`uploadFile: upload failed (status ${uploadResponse.status} ${uploadResponse.statusText}).`);
    }
  }
  const deadline = Date.now() + pollTimeoutMs;
  while (true) {
    const current = await client.files.retrieve(created.id, requestOptions);
    if (current.upload_status === "ready")
      return current;
    if (current.upload_status === "failed") {
      throw new Error(`uploadFile: processing failed (id: ${current.id}).`);
    }
    if (Date.now() >= deadline) {
      throw new Error(`uploadFile: timed out waiting for file to become ready (id: ${current.id}).`);
    }
    await sleep(pollIntervalMs);
  }
}

// node_modules/@whop/sdk/resources/files.mjs
var Files = class extends APIResource {
  /**
   * Retrieves the details of an existing file.
   */
  retrieve(id, options) {
    return this._client.get(path`/files/${id}`, options);
  }
  /**
   * Create a new file record and receive a presigned URL for uploading content to
   * S3.
   */
  create(body, options) {
    return this._client.post("/files", { body, ...options });
  }
  /**
   * Upload a file (create -> upload to presigned URL -> poll retrieve until ready).
   *
   * Polls for up to 2 minutes by default.
   */
  upload(file, options) {
    const { filename, ...requestOptions } = options ?? {};
    return uploadFile(this._client, file, {
      filename,
      requestOptions
    });
  }
};

// node_modules/@whop/sdk/resources/financial-activity.mjs
var FinancialActivity = class extends APIResource {
  /**
   * Returns a paginated activity feed for one account or user, derived from ledger
   * lines with typed resource and source objects for presentation. Pass exactly one
   * of `account_id` (a `biz_` identifier) or `user_id` (a `user_` identifier).
   * Filter by line type, currency, posted timestamp, or settlement date to reconcile
   * a specific window. Pass `include_owned_accounts=true` with your own `user_id` to
   * aggregate your personal ledger and the businesses you own into one feed; each
   * row then carries the owning `account`.
   */
  list(query = {}, options) {
    return this._client.get("/financial-activity", { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/forum-posts.mjs
var ForumPosts = class extends APIResource {
  /**
   * Returns a paginated list of forum posts within a specific experience, with
   * optional filtering by parent post or pinned status.
   *
   * Required permissions:
   *
   * - `forum:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const forumPostListResponse of client.forumPosts.list(
   *   { experience_id: 'exp_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/forum_posts", CursorPage, { query, ...options });
  }
  /**
   * Create a new forum post or comment within an experience. Supports text content,
   * attachments, polls, paywalling, and pinning. Pass experience_id 'public' with a
   * company_id to post to a company's public forum.
   *
   * Required permissions:
   *
   * - `forum:post:create`
   *
   * @example
   * ```ts
   * const forumPost = await client.forumPosts.create({
   *   experience_id: 'exp_xxxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/forum_posts", { body, ...options });
  }
  /**
   * Retrieves the details of an existing forum post.
   *
   * Required permissions:
   *
   * - `forum:read`
   *
   * @example
   * ```ts
   * const forumPost = await client.forumPosts.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/forum_posts/${id}`, options);
  }
  /**
   * Edit the content, attachments, pinned status, or visibility of an existing forum
   * post or comment.
   *
   * @example
   * ```ts
   * const forumPost = await client.forumPosts.update('id');
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/forum_posts/${id}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/forums.mjs
var Forums = class extends APIResource {
  /**
   * Returns a paginated list of forums within a specific company, with optional
   * filtering by product.
   *
   * Required permissions:
   *
   * - `forum:read`
   */
  list(query, options) {
    return this._client.getAPIList("/forums", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing forum.
   *
   * Required permissions:
   *
   * - `forum:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/forums/${id}`, options);
  }
  /**
   * Update moderation and notification settings for a forum, such as who can post,
   * who can comment, and email notification preferences.
   *
   * Required permissions:
   *
   * - `forum:moderate`
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/forums/${id}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/invoices.mjs
var Invoices = class extends APIResource {
  /**
   * Returns a paginated list of invoices for a company, with optional filtering by
   * product, status, collection method, and creation date.
   *
   * Required permissions:
   *
   * - `invoice:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const invoiceListItem of client.invoices.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/invoices", CursorPage, { query, ...options });
  }
  /**
   * Create an invoice for a customer. The invoice can be charged automatically using
   * a stored payment method, or sent to the customer for manual payment.
   *
   * Required permissions:
   *
   * - `invoice:create`
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.create({
   *   collection_method: 'send_invoice',
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   plan: {},
   *   product: { title: 'title' },
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/invoices", { body, ...options });
  }
  /**
   * Retrieves the details of an existing invoice.
   *
   * Required permissions:
   *
   * - `invoice:basic:read`
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.retrieve(
   *   'inv_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/invoices/${id}`, options);
  }
  /**
   * Void an open invoice so it can no longer be paid. Voiding is permanent and
   * cannot be undone.
   *
   * Required permissions:
   *
   * - `invoice:update`
   *
   * @example
   * ```ts
   * const response = await client.invoices.void(
   *   'inv_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  void(id, options) {
    return this._client.post(path`/invoices/${id}/void`, options);
  }
  /**
   * Mark an open invoice as paid when payment was collected outside of Whop.
   *
   * Required permissions:
   *
   * - `invoice:update`
   *
   * @example
   * ```ts
   * const response = await client.invoices.markPaid(
   *   'inv_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  markPaid(id, options) {
    return this._client.post(path`/invoices/${id}/mark_paid`, options);
  }
  /**
   * Mark an open invoice as uncollectible when payment is not expected.
   *
   * Required permissions:
   *
   * - `invoice:update`
   *
   * @example
   * ```ts
   * const response = await client.invoices.markUncollectible(
   *   'inv_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  markUncollectible(id, options) {
    return this._client.post(path`/invoices/${id}/mark_uncollectible`, options);
  }
  /**
   * Update a draft invoice's details.
   *
   * Required permissions:
   *
   * - `invoice:update`
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.update(
   *   'inv_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/invoices/${id}`, { body, ...options });
  }
  /**
   * Delete a draft invoice.
   *
   * Required permissions:
   *
   * - `invoice:update`
   *
   * @example
   * ```ts
   * const invoice = await client.invoices.delete(
   *   'inv_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/invoices/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/leads.mjs
var Leads = class extends APIResource {
  /**
   * Returns a paginated list of leads for a company, with optional filtering by
   * product and creation date.
   *
   * Required permissions:
   *
   * - `lead:basic:read`
   * - `member:email:read`
   * - `access_pass:basic:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const leadListResponse of client.leads.list({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/leads", CursorPage, { query, ...options });
  }
  /**
   * Record a new lead for a company, capturing a potential customer's interest in a
   * specific product.
   *
   * Required permissions:
   *
   * - `lead:manage`
   * - `member:email:read`
   * - `access_pass:basic:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const lead = await client.leads.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/leads", { body, ...options });
  }
  /**
   * Retrieves the details of an existing lead.
   *
   * Required permissions:
   *
   * - `lead:basic:read`
   * - `member:email:read`
   * - `access_pass:basic:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const lead = await client.leads.retrieve(
   *   'lead_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/leads/${id}`, options);
  }
  /**
   * Update the metadata or referrer information on an existing lead record.
   *
   * Required permissions:
   *
   * - `lead:manage`
   * - `member:email:read`
   * - `access_pass:basic:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const lead = await client.leads.update(
   *   'lead_xxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/leads/${id}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/ledger-accounts.mjs
var LedgerAccounts = class extends APIResource {
  /**
   * Retrieves the details of an existing ledger account.
   *
   * Required permissions:
   *
   * - `company:balance:read`
   * - `payout:account:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/ledger_accounts/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/media.mjs
var Media = class extends APIResource {
  /**
   * Starts an AI media generation job billed from the account's balance. Generation
   * is asynchronous — poll `GET /media/{id}` until the asset is `ready`, then use
   * `file.id` anywhere attachments are accepted.
   */
  generate(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/media/generate", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a media asset by ID. Poll this while the asset is `processing`.
   */
  retrieve(id, options) {
    return this._client.get(path`/media/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/members.mjs
var Members = class extends APIResource {
  /**
   * Returns a paginated list of members for a company, with extensive filtering by
   * product, plan, status, access level, and more.
   *
   * Required permissions:
   *
   * - `member:basic:read`
   * - `member:email:read`
   * - `member:phone:read`
   */
  list(query = {}, options) {
    return this._client.getAPIList("/members", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing member.
   *
   * Required permissions:
   *
   * - `member:basic:read`
   * - `member:email:read`
   * - `member:phone:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/members/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/memberships.mjs
var Memberships = class extends APIResource {
  /**
   * Returns a paginated list of memberships, with optional filtering by product,
   * plan, status, and user.
   *
   * Required permissions:
   *
   * - `member:basic:read`
   * - `member:email:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const membershipListResponse of client.memberships.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/memberships", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing membership.
   *
   * Required permissions:
   *
   * - `member:basic:read`
   * - `member:email:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.retrieve(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/memberships/${id}`, options);
  }
  /**
   * Update a membership's metadata or other mutable properties.
   *
   * Required permissions:
   *
   * - `member:manage`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.update(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/memberships/${id}`, { body, ...options });
  }
  /**
   * Cancel a membership either immediately or at the end of the current billing
   * period. Immediate cancellation revokes access right away.
   *
   * Required permissions:
   *
   * - `membership:cancel`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.cancel(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  cancel(id, body = {}, options) {
    return this._client.post(path`/memberships/${id}/cancel`, { body, ...options });
  }
  /**
   * Pause a membership's recurring payments. The customer retains access but will
   * not be charged until the membership is resumed.
   *
   * Required permissions:
   *
   * - `member:manage`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.pause(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  pause(id, body = {}, options) {
    return this._client.post(path`/memberships/${id}/pause`, { body, ...options });
  }
  /**
   * Resume a previously paused membership's recurring payments. Billing resumes on
   * the next cycle.
   *
   * Required permissions:
   *
   * - `member:manage`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.resume(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  resume(id, options) {
    return this._client.post(path`/memberships/${id}/resume`, options);
  }
  /**
   * Reverse a pending cancellation for a membership that was scheduled to cancel at
   * period end.
   *
   * Required permissions:
   *
   * - `member:manage`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.uncancel(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  uncancel(id, options) {
    return this._client.post(path`/memberships/${id}/uncancel`, options);
  }
  /**
   * Add free days to extend a membership's current billing period, expiration date,
   * or Stripe trial.
   *
   * Required permissions:
   *
   * - `member:manage`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.addFreeDays(
   *   'mem_xxxxxxxxxxxxxx',
   *   { free_days: 42 },
   * );
   * ```
   */
  addFreeDays(id, body, options) {
    return this._client.post(path`/memberships/${id}/add_free_days`, { body, ...options });
  }
  /**
   * Re-run access fulfillment for a membership. Recomputes the member's content
   * access on Whop, re-validates their Discord link (re-adding them to the server
   * and re-assigning roles if needed), and re-fulfills TradingView indicator access.
   * Telegram access is invite-based and cannot be resynced here. The outcome is
   * written to the membership's logs.
   *
   * Required permissions:
   *
   * - `membership:resync_access`
   * - `member:email:read`
   * - `member:basic:read`
   *
   * @example
   * ```ts
   * const membership = await client.memberships.resyncAccess(
   *   'mem_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  resyncAccess(id, options) {
    return this._client.post(path`/memberships/${id}/resync_access`, options);
  }
};

// node_modules/@whop/sdk/resources/messages.mjs
var Messages = class extends APIResource {
  /**
   * Returns a paginated list of messages within a specific experience chat, DM, or
   * group chat channel, sorted by creation time.
   *
   * Required permissions:
   *
   * - `chat:read`
   */
  list(query, options) {
    return this._client.getAPIList("/messages", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing message.
   *
   * Required permissions:
   *
   * - `chat:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/messages/${id}`, options);
  }
  /**
   * Send a new message in an experience chat, DM, or group chat channel. Supports
   * text content, attachments, polls, and replies.
   *
   * Required permissions:
   *
   * - `chat:message:create`
   */
  create(body, options) {
    return this._client.post("/messages", { body, ...options });
  }
  /**
   * Edit the content, attachments, or pinned status of an existing message in an
   * experience chat, DM, or group chat channel.
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/messages/${id}`, { body, ...options });
  }
  /**
   * Permanently delete a message from an experience chat, DM, or group chat channel.
   * Only the message author or a channel admin can delete a message.
   *
   * Required permissions:
   *
   * - `chat:message:create`
   */
  delete(id, options) {
    return this._client.delete(path`/messages/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/notifications.mjs
var Notifications = class extends APIResource {
  /**
   * Send a push notification to users in an experience or company team. The
   * notification is processed asynchronously and supports targeting specific users.
   *
   * Required permissions:
   *
   * - `notification:create`
   *
   * @example
   * ```ts
   * const notification = await client.notifications.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   content: 'content',
   *   title: 'title',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/notifications", { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/partners/businesses/earnings.mjs
var Earnings = class extends APIResource {
  /**
   * Lists the earnings Whop pays out for one referred business's activity, most
   * recent first.
   */
  list(id, query = {}, options) {
    return this._client.getAPIList(path`/partners/businesses/${id}/earnings`, CursorPage, { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/partners/businesses/businesses.mjs
var Businesses = class extends APIResource {
  constructor() {
    super(...arguments);
    this.earnings = new Earnings(this._client);
  }
  /**
   * Lists the businesses the authenticated user referred onto Whop, most recent
   * first.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/partners/businesses", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves a single referred business and its referral terms.
   */
  retrieve(id, options) {
    return this._client.get(path`/partners/businesses/${id}`, options);
  }
};
Businesses.Earnings = Earnings;

// node_modules/@whop/sdk/resources/partners/partners.mjs
var Partners = class extends APIResource {
  constructor() {
    super(...arguments);
    this.businesses = new Businesses(this._client);
  }
  /**
   * Lists the users the caller referred onto Whop (newest first), each with the
   * second-tier earnings the caller has made from that user's businesses.
   */
  referredUsers(query = {}, options) {
    return this._client.get("/partners/referred_users", { query, ...options });
  }
  /**
   * Enrolls the calling user in the Whop partner program, making their partner
   * businesses eligible for earnings. Idempotent — enrolling again keeps the
   * original enrollment time.
   */
  create(params = {}, options) {
    const { "Idempotency-Key": idempotencyKey } = params ?? {};
    return this._client.post("/partners", {
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Ranks referrers by partner business earnings — all-time by default, or over the
   * current day, month, year, or trailing 30 days. Authentication is optional:
   * authenticated callers also get their own standing, anonymous callers get the
   * rankings alone.
   */
  leaderboard(query = {}, options) {
    return this._client.get("/partners/leaderboard", { query, ...options });
  }
};
Partners.Businesses = Businesses;

// node_modules/@whop/sdk/resources/payment-methods.mjs
var PaymentMethods = class extends APIResource {
  /**
   * Returns a paginated list of payment methods for a member or company, with
   * optional filtering by creation date. A payment method is a stored representation
   * of how a customer intends to pay, such as a card, bank account, or digital
   * wallet.
   *
   * Required permissions:
   *
   * - `member:payment_methods:read`
   */
  list(query = {}, options) {
    return this._client.getAPIList("/payment_methods", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing payment method.
   *
   * Required permissions:
   *
   * - `member:payment_methods:read`
   */
  retrieve(id, query = {}, options) {
    return this._client.get(path`/payment_methods/${id}`, { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/payments.mjs
var Payments = class extends APIResource {
  /**
   * Returns a paginated list of payments for the actor in context, with optional
   * filtering by product, plan, status, billing reason, currency, and creation date.
   *
   * Required permissions:
   *
   * - `payment:basic:read`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `promo_code:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const paymentListResponse of client.payments.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/payments", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing payment.
   *
   * Required permissions:
   *
   * - `payment:basic:read`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `promo_code:basic:read`
   * - `payment:dispute:read`
   * - `payment:resolution_center_case:read`
   *
   * @example
   * ```ts
   * const payment = await client.payments.retrieve(
   *   'pay_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/payments/${id}`, options);
  }
  /**
   * Issue a full or partial refund for a payment. The refund is processed through
   * the original payment processor and the membership status is updated accordingly.
   *
   * Required permissions:
   *
   * - `payment:manage`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `promo_code:basic:read`
   * - `payment:dispute:read`
   * - `payment:resolution_center_case:read`
   *
   * @example
   * ```ts
   * const payment = await client.payments.refund(
   *   'pay_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  refund(id, body = {}, options) {
    return this._client.post(path`/payments/${id}/refund`, { body, ...options });
  }
  /**
   * Retry a failed or pending payment. This re-attempts the charge using the
   * original payment method and plan details.
   *
   * Required permissions:
   *
   * - `payment:manage`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `promo_code:basic:read`
   * - `payment:dispute:read`
   * - `payment:resolution_center_case:read`
   *
   * @example
   * ```ts
   * const payment = await client.payments.retry(
   *   'pay_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  retry(id, options) {
    return this._client.post(path`/payments/${id}/retry`, options);
  }
  /**
   * Void a payment that has not yet been settled. Voiding cancels the payment before
   * it is captured by the payment processor.
   *
   * Required permissions:
   *
   * - `payment:manage`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `promo_code:basic:read`
   * - `payment:dispute:read`
   * - `payment:resolution_center_case:read`
   *
   * @example
   * ```ts
   * const payment = await client.payments.void(
   *   'pay_xxxxxxxxxxxxxx',
   * );
   * ```
   */
  void(id, options) {
    return this._client.post(path`/payments/${id}/void`, options);
  }
  /**
   * Charge an existing member off-session using one of their stored payment methods.
   * You can provide an existing plan, or create a new one in-line. This endpoint
   * will respond with a payment object immediately, but the payment is processed
   * asynchronously in the background. Use webhooks to be notified when the payment
   * succeeds or fails.
   *
   * Required permissions:
   *
   * - `payment:charge`
   * - `plan:create`
   * - `access_pass:create`
   * - `access_pass:update`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   * - `promo_code:basic:read`
   * - `payment:dispute:read`
   * - `payment:resolution_center_case:read`
   *
   * @example
   * ```ts
   * const payment = await client.payments.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   member_id: 'mber_xxxxxxxxxxxxx',
   *   payment_method_id: 'pmt_xxxxxxxxxxxxxx',
   *   plan: { currency: 'usd' },
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/payments", { body, ...options });
  }
  /**
   * Returns the list of fees associated with a specific payment, including platform
   * fees and processing fees.
   *
   * Required permissions:
   *
   * - `payment:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const paymentListFeesResponse of client.payments.listFees(
   *   'pay_xxxxxxxxxxxxxx',
   * )) {
   *   // ...
   * }
   * ```
   */
  listFees(id, query = {}, options) {
    return this._client.getAPIList(path`/payments/${id}/fees`, CursorPage, {
      query,
      ...options
    });
  }
};

// node_modules/@whop/sdk/resources/payout-accounts.mjs
var PayoutAccounts = class extends APIResource {
  /**
   * Retrieves the details of an existing payout account.
   *
   * Required permissions:
   *
   * - `payout:account:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/payout_accounts/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/payouts/methods.mjs
var Methods = class extends APIResource {
  /**
   * Lists the saved payout methods (bank accounts, digital wallets, crypto
   * addresses) that an account or user can withdraw to, most recently added first.
   * Pass exactly one of account*id (a biz* identifier) or user*id (a user*
   * identifier). Pass an amount to additionally get a fee and delivery quote per
   * method for withdrawing that amount.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/payouts/methods", CursorPage, { query, ...options });
  }
  /**
   * Saves a new payout method for an account or user by submitting the destination's
   * required fields, keyed by field id (list them with GET
   * /payouts/methods?destination_id=...). Sensitive values are vaulted in transit
   * and never stored raw; a Basis Theory token id may be passed in place of a raw
   * value. The created method is immediately usable as payout_method_id on POST
   * /payouts. A field validation failure returns the destination's full
   * required_fields schema alongside the error.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/payouts/methods", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/payouts/payouts.mjs
var Payouts = class extends APIResource {
  constructor() {
    super(...arguments);
    this.methods = new Methods(this._client);
  }
  /**
   * Lists payouts (withdrawal requests) for an account or user, most recent first.
   * Pass exactly one of account*id (a biz* identifier) or user*id (a user*
   * identifier). The saved payout method on each payout additionally requires the
   * payout:destination:read scope and is null without it.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/payouts", CursorPage, { query, ...options });
  }
  /**
   * Creates a payout from a stablecoin account to a saved payout method. The
   * account's funds move from its stablecoin balance to an external bank account,
   * wallet, or crypto address. Accounts that pay out from a fiat balance use POST
   * /withdrawals. Requires the payouts API to be enabled for the account; contact
   * support to enable it. The payout settles asynchronously; poll GET /payouts for
   * the entry whose payout_request_id matches this payout's id.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/payouts", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};
Payouts.Methods = Methods;

// node_modules/@whop/sdk/resources/people.mjs
var People = class extends APIResource {
  /**
   * Lists the people (visitors and customers) of an account, aggregated from pixel
   * events. The account is inferred from an account API key; other credentials must
   * pass account_id.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/people", CursorPage, { query, ...options });
  }
  /**
   * Retrieves one person for an account, aggregated from pixel events.
   */
  retrieve(personID, query = {}, options) {
    return this._client.get(path`/people/${personID}`, { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/plans.mjs
var Plans = class extends APIResource {
  /**
   * Returns a paginated list of plans belonging to an account, with optional
   * filtering by visibility, type, release method, and product.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const planListResponse of client.plans.list({
   *   account_id: 'account_id',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/plans", CursorPage, { query, ...options });
  }
  /**
   * Create a new pricing plan for a product. The plan defines the billing interval,
   * price, and availability for customers.
   *
   * @example
   * ```ts
   * const plan = await client.plans.create();
   * ```
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/plans", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves the details of an existing plan.
   *
   * @example
   * ```ts
   * const plan = await client.plans.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/plans/${id}`, options);
  }
  /**
   * Update a plan's pricing, billing interval, visibility, stock, and other
   * settings.
   *
   * @example
   * ```ts
   * const plan = await client.plans.update('id');
   * ```
   */
  update(id, body, options) {
    return this._client.patch(path`/plans/${id}`, { body, ...options });
  }
  /**
   * Permanently delete a plan from a product. Existing memberships on this plan will
   * not be affected.
   *
   * @example
   * ```ts
   * const plan = await client.plans.delete('id');
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/plans/${id}`, options);
  }
  /**
   * Previews tax for a plan before checkout, based on the buyer's location.
   *
   * @example
   * ```ts
   * const response = await client.plans.calculateTax('id');
   * ```
   */
  calculateTax(id, params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post(path`/plans/${id}/calculate_tax`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@whop/sdk/resources/products.mjs
var Products = class extends APIResource {
  /**
   * Returns a paginated list of products belonging to a company.
   */
  list(query, options) {
    return this._client.getAPIList("/products", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing product. This endpoint is publicly
   * accessible.
   */
  retrieve(id, options) {
    return this._client.get(path`/products/${id}`, options);
  }
  /**
   * Creates a new product for a company.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/products", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Updates an existing product.
   */
  update(id, body, options) {
    return this._client.patch(path`/products/${id}`, { body, ...options });
  }
  /**
   * Deletes a product. Only products with no memberships, entries, reviews, or
   * invoices can be deleted.
   */
  delete(id, options) {
    return this._client.delete(path`/products/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/promo-codes.mjs
var PromoCodes = class extends APIResource {
  /**
   * Returns a paginated list of promo codes belonging to a company, with optional
   * filtering by product, plan, and status.
   *
   * Required permissions:
   *
   * - `promo_code:basic:read`
   * - `access_pass:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const promoCodeListResponse of client.promoCodes.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/promo_codes", CursorPage, { query, ...options });
  }
  /**
   * Create a new promo code that applies a discount at checkout. Can be scoped to
   * specific products or plans.
   *
   * Required permissions:
   *
   * - `promo_code:create`
   * - `access_pass:basic:read`
   *
   * @example
   * ```ts
   * const promoCode = await client.promoCodes.create({
   *   amount_off: 6.9,
   *   base_currency: 'usd',
   *   code: 'code',
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   new_users_only: true,
   *   promo_duration_months: 42,
   *   promo_type: 'percentage',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/promo_codes", { body, ...options });
  }
  /**
   * Retrieves the details of an existing promo code.
   *
   * Required permissions:
   *
   * - `promo_code:basic:read`
   * - `access_pass:basic:read`
   *
   * @example
   * ```ts
   * const promoCode = await client.promoCodes.retrieve(
   *   'promo_xxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/promo_codes/${id}`, options);
  }
  /**
   * Archive a promo code, preventing it from being used in future checkouts.
   * Existing memberships are not affected.
   *
   * Required permissions:
   *
   * - `promo_code:delete`
   *
   * @example
   * ```ts
   * const promoCode = await client.promoCodes.delete(
   *   'promo_xxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/promo_codes/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/reactions.mjs
var Reactions = class extends APIResource {
  /**
   * Returns a paginated list of emoji reactions on a specific message or forum post,
   * sorted by most recent.
   *
   * Required permissions:
   *
   * - `chat:read`
   */
  list(query, options) {
    return this._client.getAPIList("/reactions", CursorPage, { query, ...options });
  }
  /**
   * Add an emoji reaction or poll vote to a message or forum post. In forums, the
   * reaction is always a like.
   *
   * Required permissions:
   *
   * - `chat:read`
   */
  create(body, options) {
    return this._client.post("/reactions", { body, ...options });
  }
  /**
   * Retrieves the details of an existing reaction.
   *
   * Required permissions:
   *
   * - `chat:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/reactions/${id}`, options);
  }
  /**
   * Remove an emoji reaction from a message or forum post. Only the reaction author
   * or a channel admin can remove a reaction.
   *
   * Required permissions:
   *
   * - `chat:read`
   */
  delete(id, params = {}, options) {
    const { emoji } = params ?? {};
    return this._client.delete(path`/reactions/${id}`, { query: { emoji }, ...options });
  }
};

// node_modules/@whop/sdk/resources/refunds.mjs
var Refunds = class extends APIResource {
  /**
   * Returns a paginated list of refunds, with optional filtering by payment,
   * company, user, and creation date.
   *
   * Required permissions:
   *
   * - `payment:basic:read`
   */
  list(query = {}, options) {
    return this._client.getAPIList("/refunds", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing refund.
   *
   * Required permissions:
   *
   * - `payment:basic:read`
   * - `plan:basic:read`
   * - `access_pass:basic:read`
   * - `member:email:read`
   * - `member:basic:read`
   * - `member:phone:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/refunds/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/resolution-center-cases.mjs
var ResolutionCenterCases = class extends APIResource {
  /**
   * Returns a paginated list of resolution center cases, with optional filtering by
   * company, status, and creation date.
   *
   * Required permissions:
   *
   * - `payment:resolution_center_case:read`
   */
  list(query = {}, options) {
    return this._client.getAPIList("/resolution_center_cases", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing resolution center case.
   *
   * Required permissions:
   *
   * - `payment:resolution_center_case:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/resolution_center_cases/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/reviews.mjs
var Reviews = class extends APIResource {
  /**
   * Returns a paginated list of customer reviews for a specific product, with
   * optional filtering by star rating and creation date.
   */
  list(query, options) {
    return this._client.getAPIList("/reviews", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing review.
   */
  retrieve(id, options) {
    return this._client.get(path`/reviews/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/setup-intents.mjs
var SetupIntents = class extends APIResource {
  /**
   * Returns a paginated list of setup intents for a company, with optional filtering
   * by creation date. A setup intent securely collects and stores a member's payment
   * method for future use without charging them immediately.
   *
   * Required permissions:
   *
   * - `payment:setup_intent:read`
   * - `member:basic:read`
   * - `member:email:read`
   */
  list(query, options) {
    return this._client.getAPIList("/setup_intents", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing setup intent.
   *
   * Required permissions:
   *
   * - `payment:setup_intent:read`
   * - `member:basic:read`
   * - `member:email:read`
   */
  retrieve(id, options) {
    return this._client.get(path`/setup_intents/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/shipments.mjs
var Shipments = class extends APIResource {
  /**
   * Returns a paginated list of shipments, with optional filtering by payment,
   * company, or user.
   *
   * Required permissions:
   *
   * - `shipment:basic:read`
   * - `payment:basic:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const shipmentListResponse of client.shipments.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/shipments", CursorPage, { query, ...options });
  }
  /**
   * Create a new shipment with a tracking code for a specific payment within a
   * company.
   *
   * Required permissions:
   *
   * - `shipment:create`
   * - `payment:basic:read`
   *
   * @example
   * ```ts
   * const shipment = await client.shipments.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   payment_id: 'pay_xxxxxxxxxxxxxx',
   *   tracking_code: 'tracking_code',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/shipments", { body, ...options });
  }
  /**
   * Retrieves the details of an existing shipment.
   *
   * Required permissions:
   *
   * - `shipment:basic:read`
   * - `payment:basic:read`
   *
   * @example
   * ```ts
   * const shipment = await client.shipments.retrieve(
   *   'ship_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/shipments/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/social-accounts.mjs
var SocialAccounts = class extends APIResource {
  /**
   * Lists the social accounts linked to an account or user.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/social_accounts", CursorPage, { query, ...options });
  }
  /**
   * Creates or returns a Whop-managed Facebook page for an account.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/social_accounts", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Starts an OAuth connection flow and returns an authorize_url where the user can
   * connect a social account.
   */
  connect(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/social_accounts/connect", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Disconnects a social account from an account or user without deleting the
   * underlying platform account.
   */
  delete(id, params = {}, options) {
    const { account_id, user_id } = params ?? {};
    return this._client.delete(path`/social_accounts/${id}`, { query: { account_id, user_id }, ...options });
  }
  /**
   * Lists the existing posts of a connected Facebook page or Instagram account.
   */
  posts(id, query, options) {
    return this._client.get(path`/social_accounts/${id}/posts`, { query, ...options });
  }
  /**
   * Lists the active lead (instant) forms that already exist on a connected Facebook
   * page, so an ad can reuse one as its `lead_gen_form_id` instead of authoring a
   * new form. Every active form comes back in a single response — the list is not
   * paginated.
   */
  leadForms(id, query, options) {
    return this._client.get(path`/social_accounts/${id}/lead_forms`, { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/stats.mjs
var Stats = class extends APIResource {
  /**
   * Lists every metric you can query, with its unit and the properties you can
   * filter or break it down by.
   */
  list(options) {
    return this._client.get("/stats", options);
  }
  /**
   * Retrieves a metric as a time series of points for an account over a time range.
   */
  retrieve(metric, query, options) {
    return this._client.get(path`/stats/${metric}`, { query, ...options });
  }
};

// node_modules/@whop/sdk/resources/support-channels.mjs
var SupportChannels = class extends APIResource {
  /**
   * Returns a paginated list of support channels for a specific company, with
   * optional filtering by resolution status and custom sorting.
   *
   * Required permissions:
   *
   * - `support_chat:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const supportChannelListResponse of client.supportChannels.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/support_channels", CursorPage, {
      query,
      ...options
    });
  }
  /**
   * Retrieves the details of an existing support channel.
   *
   * Required permissions:
   *
   * - `support_chat:read`
   *
   * @example
   * ```ts
   * const supportChannel =
   *   await client.supportChannels.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/support_channels/${id}`, options);
  }
  /**
   * Open a new support channel between a company team member and a customer. Returns
   * the existing channel if one already exists for that user.
   *
   * Required permissions:
   *
   * - `support_chat:create`
   *
   * @example
   * ```ts
   * const supportChannel = await client.supportChannels.create({
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   user_id: 'user_xxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/support_channels", { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/swaps.mjs
var Swaps = class extends APIResource {
  /**
   * Returns a stateless swap price preview. No funds move and nothing is persisted.
   */
  createQuote(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/swaps/quote", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Executes a swap from the account's wallet. Runs asynchronously; poll GET
   * /swaps/{id} for status.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/swaps", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Lists the account's swaps. Currently returns the in-flight or most recent swap,
   * so zero or one rows.
   */
  list(query, options) {
    return this._client.get("/swaps", { query, ...options });
  }
  /**
   * Returns the status of a specific swap, by the id returned from POST /swaps.
   */
  retrieve(id, options) {
    return this._client.get(path`/swaps/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/team-members.mjs
var TeamMembers = class extends APIResource {
  /**
   * Lists an account's team members, including pending invites (`status: "pending"`,
   * `ausri_` ids; `user` is `null` for invites sent to an email with no Whop account
   * yet). For accepted members, `email` requires the
   * `company:authorized_user:email:read` scope and is `null` otherwise.
   */
  list(query, options) {
    return this._client.getAPIList("/team_members", CursorPage, { query, ...options });
  }
  /**
   * Retrieves a team member by ID. `email` requires the
   * `company:authorized_user:email:read` scope and is `null` otherwise.
   */
  retrieve(id, options) {
    return this._client.get(path`/team_members/${id}`, options);
  }
  /**
   * Adds a user to an account's team with a system role. If the user has not yet
   * accepted, an invitation is sent instead and the response is `202` with
   * `{ "object": "team_member_invite", "invitation_sent": true }`. If the user
   * already has a pending invite, the request fails with a `400`. Custom roles
   * cannot be granted via the API.
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/team_members", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Changes a team member's system role. Requires a user session — account API keys
   * cannot change member roles. The account owner's role cannot be changed, and you
   * cannot change your own role.
   */
  update(id, body, options) {
    return this._client.patch(path`/team_members/${id}`, { body, ...options });
  }
  /**
   * Removes a team member from the account, or revokes a pending invite when given
   * an `ausri_` ID. A user session may delete its own membership to leave the team
   * without the delete scope. The account owner cannot be removed.
   */
  delete(id, options) {
    return this._client.delete(path`/team_members/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/topups.mjs
var Topups = class extends APIResource {
  /**
   * Add funds to a company's platform balance by charging a stored payment method.
   * Top-ups have no fees or taxes and do not count as revenue.
   *
   * Required permissions:
   *
   * - `payment:charge`
   *
   * @example
   * ```ts
   * const topup = await client.topups.create({
   *   amount: 6.9,
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   currency: 'usd',
   *   payment_method_id: 'pmt_xxxxxxxxxxxxxx',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/topups", { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/transfers.mjs
var Transfers = class extends APIResource {
  /**
   * Lists ledger transfers for an account. You must specify an origin_id or a
   * destination_id.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transferListResponse of client.transfers.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/transfers", CursorPage, { query, ...options });
  }
  /**
   * Moves funds out of an account. `type` selects the kind of movement (default
   * `ledger`): `ledger` transfers credit between two ledger accounts and returns a
   * Transfer; `wallet_send` sends USDT from the origin account's Ethereum wallet to
   * a recipient; `claim_link` funds a shareable claim link anyone with the URL can
   * redeem.
   *
   * @example
   * ```ts
   * const transfer = await client.transfers.create({
   *   amount: 0,
   *   origin_id: 'origin_id',
   * });
   * ```
   */
  create(params, options) {
    const { "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/transfers", {
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Retrieves a ledger transfer by ID.
   *
   * @example
   * ```ts
   * const transfer = await client.transfers.retrieve('id');
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/transfers/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/users.mjs
var Users = class extends APIResource {
  /**
   * Retrieves a user's public profile by user\_ tag, username, or 'me'.
   */
  retrieve(id, query = {}, options) {
    return this._client.get(path`/users/${id}`, { query, ...options });
  }
  /**
   * Checks whether a user has access to an account, product, or experience the
   * caller can reach.
   */
  checkAccess(resourceID, params, options) {
    const { id } = params;
    return this._client.get(path`/users/${id}/access/${resourceID}`, options);
  }
  /**
   * Updates a user. A user token updates their own global profile; an API key
   * updates the user's account-specific profile override (account_id required).
   */
  update(id, params, options) {
    const { account_id, ...body } = params;
    return this._client.patch(path`/users/${id}`, { query: { account_id }, body, ...options });
  }
  /**
   * Updates the authenticated user's global profile, or their profile override for
   * an account when account_id is given. Not available to API keys.
   */
  updateMe(params, options) {
    const { account_id, ...body } = params;
    return this._client.patch("/users/me", { query: { account_id }, body, ...options });
  }
  /**
   * Search for users by name or username, ranked by social proximity to the
   * authenticated user. Returns the user's most recently followed users when no
   * query is given.
   */
  list(query = {}, options) {
    return this._client.getAPIList("/users", CursorPage, { query, ...options });
  }
  /**
   * Lists the recommended actions computed for the user: personal suggestions (e.g.
   * start a business or become an affiliate) pooled with the highest-impact actions
   * across the accounts the user owns. Business actions are tagged with their
   * `account_id`/`account_name`; personal actions leave those `null`. Self-only:
   * `id` must be `me` or the authenticated user's own tag/username.
   */
  recommendActions(id, options) {
    return this._client.get(path`/users/${id}/recommend_actions`, options);
  }
};

// node_modules/@whop/sdk/resources/verifications.mjs
var Verifications = class extends APIResource {
  /**
   * Returns verifications for an account, including their status and any required
   * actions.
   *
   * @example
   * ```ts
   * const verifications = await client.verifications.list({
   *   account_id: 'account_id',
   * });
   * ```
   */
  list(query, options) {
    return this._client.get("/verifications", { query, ...options });
  }
  /**
   * Returns verifications for an account, including their status and any required
   * actions.
   *
   * @example
   * ```ts
   * const verification = await client.verifications.retrieve(
   *   'verification_id',
   * );
   * ```
   */
  retrieve(verificationID, options) {
    return this._client.get(path`/verifications/${verificationID}`, options);
  }
  /**
   * Starts a hosted verification session for an account or user, or returns the
   * active session when one already exists. Any fields you include in the request
   * body are used to prefill the session. Send `documents` (with `document_type`) to
   * instead verify the person from identity documents included in this request — no
   * hosted session involved. If the account already has an `approved` verification
   * the request is rejected; unlink it first to start a new one.
   *
   * @example
   * ```ts
   * const verification = await client.verifications.create({
   *   account_id: 'account_id',
   * });
   * ```
   */
  create(params, options) {
    const { account_id, "Idempotency-Key": idempotencyKey, ...body } = params;
    return this._client.post("/verifications", {
      query: { account_id },
      body,
      ...options,
      headers: buildHeaders([
        { ...idempotencyKey != null ? { "Idempotency-Key": idempotencyKey } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * Updates editable profile details or submits answers for items returned in
   * `requested_information`. Once a verification is `approved` its profile details
   * are locked and can no longer be edited.
   *
   * @example
   * ```ts
   * const verification = await client.verifications.update(
   *   'verification_id',
   * );
   * ```
   */
  update(verificationID, body, options) {
    return this._client.patch(path`/verifications/${verificationID}`, { body, ...options });
  }
};

// node_modules/@whop/sdk/resources/webhooks.mjs
var import_standardwebhooks = __toESM(require_dist(), 1);
var Webhooks = class extends APIResource {
  unwrap(body, { headers, key }) {
    if (headers !== void 0) {
      const keyStr = key === void 0 ? this._client.webhookKey : key;
      if (keyStr === null)
        throw new Error("Webhook key must not be null in order to unwrap");
      const wh = new import_standardwebhooks.Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body);
  }
  /**
   * Returns a paginated list of webhook endpoints configured for a company, ordered
   * by most recently created.
   *
   * Required permissions:
   *
   * - `developer:manage_webhook`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhookListResponse of client.webhooks.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/webhooks", CursorPage, { query, ...options });
  }
  /**
   * Creates a new webhook
   *
   * Required permissions:
   *
   * - `developer:manage_webhook`
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   url: 'https://example.com/path',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/webhooks", { body, ...options });
  }
  /**
   * Retrieves the details of an existing webhook.
   *
   * Required permissions:
   *
   * - `developer:manage_webhook`
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve(
   *   'hook_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/webhooks/${id}`, options);
  }
  /**
   * Updates a webhook
   *
   * Required permissions:
   *
   * - `developer:manage_webhook`
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.update(
   *   'hook_xxxxxxxxxxxxx',
   * );
   * ```
   */
  update(id, body = {}, options) {
    return this._client.patch(path`/webhooks/${id}`, { body, ...options });
  }
  /**
   * Deletes a webhook
   *
   * Required permissions:
   *
   * - `developer:manage_webhook`
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.delete(
   *   'hook_xxxxxxxxxxxxx',
   * );
   * ```
   */
  delete(id, options) {
    return this._client.delete(path`/webhooks/${id}`, options);
  }
};

// node_modules/@whop/sdk/resources/withdrawals.mjs
var Withdrawals = class extends APIResource {
  /**
   * Returns a paginated list of withdrawals for a company, with optional sorting and
   * date filtering.
   *
   * Required permissions:
   *
   * - `payout:withdrawal:read`
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const withdrawalListResponse of client.withdrawals.list(
   *   { company_id: 'biz_xxxxxxxxxxxxxx' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(query, options) {
    return this._client.getAPIList("/withdrawals", CursorPage, { query, ...options });
  }
  /**
   * Retrieves the details of an existing withdrawal.
   *
   * Required permissions:
   *
   * - `payout:withdrawal:read`
   * - `payout:destination:read`
   *
   * @example
   * ```ts
   * const withdrawal = await client.withdrawals.retrieve(
   *   'wdrl_xxxxxxxxxxxxx',
   * );
   * ```
   */
  retrieve(id, options) {
    return this._client.get(path`/withdrawals/${id}`, options);
  }
  /**
   * Creates a withdrawal request for a ledger account
   *
   * Required permissions:
   *
   * - `payout:withdraw_funds`
   * - `payout:destination:read`
   *
   * @example
   * ```ts
   * const withdrawal = await client.withdrawals.create({
   *   amount: 6.9,
   *   company_id: 'biz_xxxxxxxxxxxxxx',
   *   currency: 'usd',
   * });
   * ```
   */
  create(body, options) {
    return this._client.post("/withdrawals", { body, ...options });
  }
  /**
   * Generates a withdrawal PDF invoice and returns a temporary download URL.
   *
   * Required permissions:
   *
   * - `payout:withdrawal:read`
   *
   * @example
   * ```ts
   * const response = await client.withdrawals.generatePdf(
   *   'wdrl_xxxxxxxxxxxxx',
   * );
   * ```
   */
  generatePdf(id, options) {
    return this._client.post(path`/withdrawals/${id}/generate_pdf`, options);
  }
};

// node_modules/@whop/sdk/internal/utils/env.mjs
var readEnv = (env) => {
  if (typeof globalThis.process !== "undefined") {
    return globalThis.process.env?.[env]?.trim() || void 0;
  }
  if (typeof globalThis.Deno !== "undefined") {
    return globalThis.Deno.env?.get?.(env)?.trim() || void 0;
  }
  return void 0;
};

// node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var strictDecoder = new TextDecoder("utf-8", { fatal: true });
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
function encode2(string) {
  const bytes = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    if (code > 127) {
      throw new TypeError("non-ASCII string encountered in encode()");
    }
    bytes[i] = code;
  }
  return bytes;
}

// node_modules/jose/dist/webapi/lib/crypto_key.js
var unusable = (name, prop = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
function checkUsage(key, usage) {
  if (usage && !key.usages.includes(usage)) {
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
  }
}
function checkModulusLength(alg, key) {
  const { modulusLength } = key.algorithm;
  if (typeof modulusLength !== "number" || modulusLength < 2048) {
    throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
  }
}
function checkCryptoKey(key, expected, usage) {
  const algorithm = key.algorithm;
  if (algorithm.name !== expected.name) {
    throw unusable(expected.name);
  }
  if (expected.hash && algorithm.hash?.name !== expected.hash) {
    throw unusable(expected.hash, "algorithm.hash");
  }
  if (expected.namedCurve && algorithm.namedCurve !== expected.namedCurve) {
    throw unusable(expected.namedCurve, "algorithm.namedCurve");
  }
  if (expected.length !== void 0 && algorithm.length !== expected.length) {
    throw unusable(expected.length, "algorithm.length");
  }
  checkUsage(key, usage);
}

// node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(", ")}, or ${last}.`;
  } else if (types.length === 2) {
    msg += `one of type ${types[0]} or ${types[1]}.`;
  } else {
    msg += `of type ${types[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var withAlg = (alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types);

// node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(message2, options) {
    super(message2, options);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JWTExpired = class extends JOSEError {
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWSInvalid = class extends JOSEError {
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
};
var JWKSInvalid = class extends JOSEError {
  static code = "ERR_JWKS_INVALID";
  code = "ERR_JWKS_INVALID";
};
var JWKSNoMatchingKey = class extends JOSEError {
  static code = "ERR_JWKS_NO_MATCHING_KEY";
  code = "ERR_JWKS_NO_MATCHING_KEY";
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
  }
};
var JWKSMultipleMatchingKeys = class extends JOSEError {
  [Symbol.asyncIterator] = async function* () {
  };
  static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
  }
};
var JWKSTimeout = class extends JOSEError {
  static code = "ERR_JWKS_TIMEOUT";
  code = "ERR_JWKS_TIMEOUT";
  constructor(message2 = "request timed out", options) {
    super(message2, options);
  }
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
  }
};

// node_modules/jose/dist/webapi/lib/is_key_like.js
var isCryptoKey = (key) => {
  if (key?.[Symbol.toStringTag] === "CryptoKey")
    return true;
  try {
    return key instanceof CryptoKey;
  } catch {
    return false;
  }
};
var isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
var isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);

// node_modules/jose/dist/webapi/lib/base64.js
function decodeBase64(encoded) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(encoded);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// node_modules/jose/dist/webapi/util/base64url.js
var invalid = "The input to be decoded is not correctly encoded.";
function decode(input) {
  if (Uint8Array.fromBase64) {
    try {
      return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), {
        alphabet: "base64url"
      });
    } catch (cause) {
      throw new TypeError(invalid, { cause });
    }
  }
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  if (encoded.includes("+") || encoded.includes("/")) {
    throw new TypeError(invalid);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError(invalid);
  }
}

// node_modules/jose/dist/webapi/lib/type_checks.js
function isObject(input) {
  if (typeof input !== "object" || input === null || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(input);
  if (prototype === null) {
    return true;
  }
  let proto = prototype;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return prototype === proto;
}
function isDisjoint(...headers) {
  const parameters = /* @__PURE__ */ new Set();
  for (const header of headers) {
    if (!header)
      continue;
    for (const parameter of Object.keys(header)) {
      if (parameters.has(parameter)) {
        return false;
      }
      parameters.add(parameter);
    }
  }
  return true;
}
var isJWK = (key) => isObject(key) && typeof key.kty === "string";
var isPrivateJWK = (key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
var isPublicJWK = (key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0;
var isSecretJWK = (key) => key.kty === "oct" && typeof key.k === "string";

// node_modules/jose/dist/webapi/lib/helpers.js
function decodeBase64url(value, label, ErrorClass) {
  try {
    return decode(value);
  } catch {
    throw new ErrorClass(`Failed to base64url decode the ${label}`);
  }
}
function encodeBase64url(value, label, ErrorClass) {
  try {
    return encode2(value);
  } catch {
    throw new ErrorClass(`The ${label} is not a valid base64url string`);
  }
}
function parseJoseHeader(b64, ErrorClass, message2) {
  let parsed;
  try {
    parsed = JSON.parse(strictDecoder.decode(decode(b64)));
  } catch {
    throw new ErrorClass(message2);
  }
  if (!isObject(parsed)) {
    throw new ErrorClass(message2);
  }
  return parsed;
}

// node_modules/jose/dist/webapi/lib/jwk_to_key.js
async function jwkToKey(entry, jwk) {
  if (jwk.kty === "RSA" && "oth" in jwk && jwk.oth !== void 0) {
    throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
  }
  if (!entry.kty.includes(jwk.kty)) {
    throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
  }
  const algorithm = entry.resolve?.({ kty: jwk.kty, crv: jwk.crv }) ?? entry.subtle;
  const isPrivate = !!(jwk.d || jwk.priv);
  const keyData = { ...jwk };
  if (keyData.kty !== "AKP") {
    delete keyData.alg;
  }
  delete keyData.use;
  return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? !isPrivate, jwk.key_ops ?? entry.usages[isPrivate ? 1 : 0]);
}

// node_modules/jose/dist/webapi/lib/key.js
var tag = (key) => key[Symbol.toStringTag];
var jwkMatchesOp = (entry, key, usage) => {
  const { alg } = entry;
  if (key.use !== void 0) {
    const expected = usage === "sign" || usage === "verify" ? "sig" : "enc";
    if (key.use !== expected) {
      throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
    }
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
  }
  if (Array.isArray(key.key_ops)) {
    const expectedKeyOp = usage === "encrypt" || usage === "decrypt" ? entry.ops?.[usage === "encrypt" ? 0 : 1] : usage;
    if (expectedKeyOp && !key.key_ops.includes(expectedKeyOp)) {
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
    }
  }
};
function checkKeyType(entry, key, usage) {
  const { alg, secret } = entry;
  const privateKey = usage === "decrypt" || usage === "sign";
  if (secret && key instanceof Uint8Array)
    return [BYTES, key];
  if (isJWK(key)) {
    if (secret ? !isSecretJWK(key) : !(privateKey ? isPrivateJWK(key) : isPublicJWK(key))) {
      throw new TypeError(secret ? `JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present` : `JSON Web Key for this operation must be a ${privateKey ? "private" : "public"} JWK`);
    }
    jwkMatchesOp(entry, key, usage);
    return [JWK, key];
  }
  if (!isKeyLike(key)) {
    throw new TypeError(secret ? withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array") : withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
  }
  if (secret) {
    if (key.type !== "secret") {
      throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
  } else {
    if (key.type === "secret") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    const expectedType = privateKey ? "private" : "public";
    if ((key.type === "public" || key.type === "private") && key.type !== expectedType) {
      const operation = usage === "sign" ? "signing" : usage === "verify" ? "verifying" : `${usage.slice(0, -1)}tion`;
      throw new TypeError(`${tag(key)} instances for asymmetric algorithm ${operation} must be of type "${expectedType}"`);
    }
  }
  return isCryptoKey(key) ? [CRYPTO, key] : [KEYOBJECT, key];
}
var BYTES = 0;
var CRYPTO = 1;
var KEYOBJECT = 2;
var JWK = 3;
var cache;
var nist = {
  __proto__: null,
  prime256v1: "P-256",
  secp384r1: "P-384",
  secp521r1: "P-521"
};
function cached(key, alg, value) {
  cache ||= /* @__PURE__ */ new WeakMap();
  const entry = cache.get(key);
  if (value) {
    if (entry) {
      entry[alg] = value;
    } else {
      cache.set(key, { __proto__: null, [alg]: value });
    }
  }
  return value ?? entry?.[alg];
}
var handleJWK = async (key, jwk, entry) => cached(key, entry.alg) ?? cached(key, entry.alg, await jwkToKey(entry, { ...jwk, alg: entry.alg }));
var handleKeyObject = (keyObject, entry) => {
  const hit = cached(keyObject, entry.alg);
  if (hit)
    return hit;
  const isPublic = keyObject.type === "public";
  const usages = entry.usages[isPublic ? 0 : 1];
  const { asymmetricKeyType } = keyObject;
  const crv = nist[keyObject.asymmetricKeyDetails?.namedCurve];
  const params = entry.resolve?.({ crv, asymmetricKeyType }) ?? entry.subtle;
  return cached(keyObject, entry.alg, keyObject.toCryptoKey(params, isPublic, usages));
};
async function prepareKey(entry, key, usage) {
  const tagged = checkKeyType(entry, key, usage);
  switch (tagged[0]) {
    case BYTES:
    case CRYPTO:
      return tagged[1];
    case JWK: {
      const key2 = tagged[1];
      if (key2.k) {
        return decode(key2.k);
      }
      if (!Object.isFrozen(key2)) {
        const { key_ops } = key2;
        if (Array.isArray(key_ops))
          Object.freeze(key_ops);
        Object.freeze(key2);
      }
      return handleJWK(key2, key2, entry);
    }
    case KEYOBJECT: {
      const keyObject = tagged[1];
      if (keyObject.type === "secret") {
        return keyObject.export();
      }
      if ("toCryptoKey" in keyObject && typeof keyObject.toCryptoKey === "function") {
        return handleKeyObject(keyObject, entry);
      }
      return handleJWK(keyObject, keyObject.export({ format: "jwk" }), entry);
    }
  }
}

// node_modules/jose/dist/webapi/lib/key_descriptor.js
function table(entries) {
  const out = { __proto__: null };
  for (const alg in entries) {
    out[alg] = { ...entries[alg], alg };
  }
  return out;
}

// node_modules/jose/dist/webapi/lib/jwe_algorithms.js
var wrap = [
  ["encrypt", "wrapKey"],
  ["decrypt", "unwrapKey"]
];
var derive = [[], ["deriveBits"]];
var none = [[], []];
function rsaes(bits) {
  return {
    kty: ["RSA"],
    subtle: { name: "RSA-OAEP", hash: `SHA-${bits}` },
    usages: wrap,
    ops: ["wrapKey", "unwrapKey"]
  };
}
function ecdh() {
  return {
    kty: ["EC", "OKP"],
    subtle: { name: "ECDH" },
    resolve: ({ kty, crv, asymmetricKeyType }) => {
      if (crv === "X25519" || asymmetricKeyType === "x25519") {
        return { name: "X25519" };
      }
      if (kty === "OKP") {
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      return { name: "ECDH", namedCurve: crv };
    },
    usages: derive,
    ops: [void 0, "deriveBits"]
  };
}
function aeskw(bits, gcm = false) {
  return {
    kty: ["oct"],
    secret: true,
    subtle: { name: gcm ? "AES-GCM" : "AES-KW", length: bits },
    usages: none,
    ops: gcm ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"]
  };
}
function pbes2() {
  return {
    kty: ["oct"],
    secret: true,
    subtle: { name: "PBKDF2" },
    usages: none,
    ops: ["deriveBits", "deriveBits"]
  };
}
var JWE = table({
  dir: {
    kty: ["oct"],
    secret: true,
    subtle: { name: "AES-GCM" },
    usages: none,
    ops: ["encrypt", "decrypt"]
  },
  "RSA-OAEP": rsaes(1),
  "RSA-OAEP-256": rsaes(256),
  "RSA-OAEP-384": rsaes(384),
  "RSA-OAEP-512": rsaes(512),
  "ECDH-ES": ecdh(),
  "ECDH-ES+A128KW": ecdh(),
  "ECDH-ES+A192KW": ecdh(),
  "ECDH-ES+A256KW": ecdh(),
  A128KW: aeskw(128),
  A192KW: aeskw(192),
  A256KW: aeskw(256),
  A128GCMKW: aeskw(128, true),
  A192GCMKW: aeskw(192, true),
  A256GCMKW: aeskw(256, true),
  "PBES2-HS256+A128KW": pbes2(),
  "PBES2-HS384+A192KW": pbes2(),
  "PBES2-HS512+A256KW": pbes2()
});
var contentOps = ["encrypt", "decrypt"];
function contentEncryption(bits, cbc = false) {
  return {
    kty: ["oct"],
    secret: true,
    subtle: { name: cbc ? "AES-CBC" : "AES-GCM", length: bits },
    usages: none,
    ops: contentOps,
    cekBits: bits,
    ivBits: cbc ? 128 : 96,
    cbc
  };
}
var ENC = table({
  A128GCM: contentEncryption(128),
  A192GCM: contentEncryption(192),
  A256GCM: contentEncryption(256),
  "A128CBC-HS256": contentEncryption(256, true),
  "A192CBC-HS384": contentEncryption(384, true),
  "A256CBC-HS512": contentEncryption(512, true)
});

// node_modules/jose/dist/webapi/lib/options.js
var JWS_RECOGNIZED = { __proto__: null, b64: true };
function validateAlgorithms(option, algorithms) {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return [];
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  const recognized = recognizedOption === void 0 ? recognizedDefault : { __proto__: null, ...recognizedOption, ...recognizedDefault };
  for (const parameter of protectedHeader.crit) {
    if (!(parameter in recognized)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (!Object.hasOwn(joseHeader, parameter) || joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized[parameter] && (!Object.hasOwn(protectedHeader, parameter) || protectedHeader[parameter] === void 0)) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return protectedHeader.crit;
}

// node_modules/jose/dist/webapi/lib/signing.js
async function getSigKey(entry, key, usage) {
  if (key instanceof Uint8Array) {
    return crypto.subtle.importKey("raw", key, entry.subtle, false, [
      usage
    ]);
  }
  checkCryptoKey(key, entry.subtle, usage);
  if (entry.minRsaBits)
    checkModulusLength(entry.alg, key);
  return key;
}
async function verify(entry, key, signature, data) {
  const cryptoKey = await getSigKey(entry, key, "verify");
  try {
    return await crypto.subtle.verify(entry.signing, cryptoKey, signature, data);
  } catch {
    return false;
  }
}

// node_modules/jose/dist/webapi/lib/jws_algorithms.js
var sig = [["verify"], ["sign"]];
function hmac(bits) {
  const subtle = { name: "HMAC", hash: `SHA-${bits}` };
  return { kty: ["oct"], secret: true, subtle, signing: subtle, usages: sig };
}
function rsa(bits, saltLength) {
  const name = saltLength ? "RSA-PSS" : "RSASSA-PKCS1-v1_5";
  const subtle = { name, hash: `SHA-${bits}` };
  return {
    kty: ["RSA"],
    subtle,
    signing: saltLength ? { ...subtle, saltLength } : subtle,
    usages: sig,
    minRsaBits: 2048
  };
}
function ecdsa(crv, bits) {
  return {
    kty: ["EC"],
    crv,
    subtle: { name: "ECDSA", namedCurve: crv },
    signing: { name: "ECDSA", hash: `SHA-${bits}` },
    usages: sig
  };
}
function eddsa() {
  const subtle = { name: "Ed25519" };
  return {
    kty: ["OKP"],
    crv: "Ed25519",
    subtle,
    signing: subtle,
    usages: sig
  };
}
function mldsa(bits) {
  const name = `ML-DSA-${bits}`;
  const subtle = { name };
  return {
    kty: ["AKP"],
    subtle,
    signing: subtle,
    usages: sig
  };
}
var JWS = table({
  HS256: hmac(256),
  HS384: hmac(384),
  HS512: hmac(512),
  RS256: rsa(256),
  RS384: rsa(384),
  RS512: rsa(512),
  PS256: rsa(256, 32),
  PS384: rsa(384, 48),
  PS512: rsa(512, 64),
  ES256: ecdsa("P-256", 256),
  ES384: ecdsa("P-384", 384),
  ES512: ecdsa("P-521", 512),
  EdDSA: eddsa(),
  Ed25519: eddsa(),
  "ML-DSA-44": mldsa(44),
  "ML-DSA-65": mldsa(65),
  "ML-DSA-87": mldsa(87)
});
function jwsAlgorithm(alg) {
  const entry = typeof alg === "string" ? JWS[alg] : void 0;
  if (!entry) {
    throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
  return entry;
}

// node_modules/jose/dist/webapi/lib/jws_verify.js
function prepareVerify(options) {
  return [options && validateAlgorithms("algorithms", options.algorithms), options?.crit];
}
async function verifySignature(jws, shared, key) {
  const { protected: encodedProtected, header, payload: inputPayload } = jws;
  let parsedProt = {};
  if (encodedProtected) {
    parsedProt = parseJoseHeader(encodedProtected, JWSInvalid, "JWS Protected Header is invalid");
  }
  let joseHeader;
  if (header !== void 0) {
    if (!isDisjoint(parsedProt, header)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    joseHeader = { ...parsedProt, ...header };
  } else {
    joseHeader = parsedProt;
  }
  const extensions = validateCrit(JWSInvalid, JWS_RECOGNIZED, shared[1], parsedProt, joseHeader);
  let b64 = true;
  if (extensions.includes("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  if (shared[0] && !shared[0].has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof inputPayload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof inputPayload !== "string" && !(inputPayload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
  }
  const entry = jwsAlgorithm(alg);
  const data = concat(encodedProtected !== void 0 ? encode2(encodedProtected) : new Uint8Array(), encode2("."), typeof inputPayload === "string" ? b64 ? shared[2] ??= encodeBase64url(inputPayload, "payload", JWSInvalid) : encoder.encode(inputPayload) : inputPayload);
  const signature = decodeBase64url(jws.signature, "signature", JWSInvalid);
  const k = await prepareKey(entry, key, "verify");
  const verified = await verify(entry, k, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    payload = decodeBase64url(inputPayload, "payload", JWSInvalid);
  } else if (typeof inputPayload === "string") {
    payload = encoder.encode(inputPayload);
  } else {
    payload = inputPayload;
  }
  return [payload, parsedProt, b64, k, resolvedKey];
}
async function verifyCompact(jws, shared, key) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  return verifySignature({ payload, protected: protectedHeader, signature }, shared, key);
}

// node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = (date) => Math.floor(date.getTime() / 1e3);
var multipliers = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
  y: 31557600
};
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var checkFailed = "check_failed";
function secs(str) {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const numericDate = Math.round(value * multipliers[matched[3][0].toLowerCase()]);
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
}
function validateInput(label, input) {
  if (!Number.isFinite(input)) {
    throw new TypeError(`Invalid ${label} input`);
  }
  return input;
}
var normalizeTyp = (value) => {
  if (value.includes("/")) {
    return value.toLowerCase();
  }
  return `application/${value.toLowerCase()}`;
};
var checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some((aud) => audPayload.includes(aud));
  }
  return false;
};
function validateNumericDate(payload, claim, required = false) {
  const value = payload[claim];
  if (value === void 0 && !required)
    return void 0;
  if (typeof value !== "number") {
    throw new JWTClaimValidationFailed(`"${claim}" claim must be a number`, payload, claim, "invalid");
  }
  return value;
}
function unexpectedClaim(payload, claim) {
  throw new JWTClaimValidationFailed(`unexpected "${claim}" claim value`, payload, claim, checkFailed);
}
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
  let payload;
  try {
    payload = JSON.parse(strictDecoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", checkFailed);
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!Object.hasOwn(payload, claim)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer !== void 0 && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    unexpectedClaim(payload, "iss");
  }
  if (subject !== void 0 && payload.sub !== subject) {
    unexpectedClaim(payload, "sub");
  }
  if (audience !== void 0 && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    unexpectedClaim(payload, "aud");
  }
  const { clockTolerance } = options;
  let tolerance = 0;
  if (typeof clockTolerance === "string") {
    tolerance = secs(clockTolerance);
  } else if (clockTolerance !== void 0) {
    if (typeof clockTolerance !== "number") {
      throw new TypeError("Invalid clockTolerance option type");
    }
    tolerance = clockTolerance;
  }
  validateInput("clockTolerance option", tolerance);
  const { currentDate } = options;
  const now = validateInput("currentDate option", epoch(currentDate || /* @__PURE__ */ new Date()));
  const iat = validateNumericDate(payload, "iat", maxTokenAge !== void 0);
  const nbf = validateNumericDate(payload, "nbf");
  if (nbf !== void 0) {
    if (nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", checkFailed);
    }
  }
  const exp = validateNumericDate(payload, "exp");
  if (exp !== void 0) {
    if (exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", checkFailed);
    }
  }
  if (maxTokenAge !== void 0) {
    const age = now - iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", checkFailed);
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", checkFailed);
    }
  }
  return payload;
}

// node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const verified = await verifyCompact(jwt, prepareVerify(options), key);
  if (!verified[2]) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = validateClaimsSet(verified[1], verified[0], options);
  const result = { payload, protectedHeader: verified[1] };
  if (typeof key === "function") {
    return { ...result, key: verified[3] };
  }
  return result;
}

// node_modules/jose/dist/webapi/lib/key_algorithm.js
function unsupportedAlg(source = 'JWK "alg" (Algorithm) Parameter') {
  throw new JOSENotSupported(`Invalid or unsupported ${source} value`);
}
function keyAlgorithm(alg, source) {
  return (typeof alg === "string" ? JWS[alg] ?? JWE[alg] : void 0) ?? unsupportedAlg(source);
}

// node_modules/jose/dist/webapi/jwks/local.js
function signatureAlgorithm(alg) {
  const entry = typeof alg === "string" ? JWS[alg] : void 0;
  if (!entry || entry.secret) {
    throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
  }
  return entry;
}
function isJWKSLike(jwks) {
  if (!jwks || typeof jwks !== "object") {
    return false;
  }
  const { keys } = jwks;
  return Array.isArray(keys) && keys.every(isObject);
}
var LocalJWKSetImpl = class {
  #jwks;
  #cached = /* @__PURE__ */ new WeakMap();
  constructor(jwks) {
    if (!isJWKSLike(jwks)) {
      throw new JWKSInvalid("JSON Web Key Set malformed");
    }
    this.#jwks = structuredClone(jwks);
  }
  jwks() {
    return this.#jwks;
  }
  async getKey(protectedHeader, token) {
    const { alg, kid } = { ...protectedHeader, ...token?.header };
    const entry = signatureAlgorithm(alg);
    const candidates = this.#jwks.keys.filter((jwk2) => entry.kty.includes(jwk2.kty) && (typeof kid !== "string" || kid === jwk2.kid) && (!(typeof jwk2.alg === "string" || jwk2.kty === "AKP") || alg === jwk2.alg) && (typeof jwk2.use !== "string" || jwk2.use === "sig") && (!Array.isArray(jwk2.key_ops) || jwk2.key_ops.includes("verify")) && (!entry.crv || jwk2.crv === entry.crv));
    const { 0: jwk, length } = candidates;
    if (length === 0) {
      throw new JWKSNoMatchingKey();
    }
    if (length !== 1) {
      const error = new JWKSMultipleMatchingKeys();
      const _cached = this.#cached;
      error[Symbol.asyncIterator] = async function* () {
        for (const jwk2 of candidates) {
          try {
            yield await importWithAlgCache(_cached, jwk2, entry);
          } catch {
          }
        }
      };
      throw error;
    }
    return importWithAlgCache(this.#cached, jwk, entry);
  }
};
async function importWithAlgCache(cache2, jwk, entry) {
  const cached2 = cache2.get(jwk) || cache2.set(jwk, { __proto__: null }).get(jwk);
  if (cached2[entry.alg] === void 0) {
    const key = await jwkToKey(entry, { ...jwk, alg: entry.alg, ext: true });
    if (key.type !== "public") {
      throw new JWKSInvalid("JSON Web Key Set members must be public keys");
    }
    cached2[entry.alg] = key;
  }
  return cached2[entry.alg];
}
function createLocalJWKSet(jwks) {
  const set = new LocalJWKSetImpl(jwks);
  const localJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
  Object.defineProperty(localJWKSet, "jwks", {
    value: () => structuredClone(set.jwks())
  });
  return localJWKSet;
}

// node_modules/jose/dist/webapi/jwks/remote.js
function isCloudflareWorkers() {
  return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
}
var USER_AGENT;
if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "jose";
  const VERSION2 = "v6.2.8";
  USER_AGENT = `${NAME}/${VERSION2}`;
}
var customFetch = /* @__PURE__ */ Symbol();
async function fetchJwks(url, headers, signal, fetchImpl = fetch) {
  const response = await fetchImpl(url, {
    method: "GET",
    signal,
    redirect: "manual",
    headers
  }).catch((err) => {
    if (err.name === "TimeoutError") {
      throw new JWKSTimeout();
    }
    throw err;
  });
  if (response.status !== 200) {
    throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
  }
  try {
    return await response.json();
  } catch {
    throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
}
var jwksCache = /* @__PURE__ */ Symbol();
function isFreshJwksCache(input, cacheMaxAge) {
  if (typeof input !== "object" || input === null) {
    return false;
  }
  if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) {
    return false;
  }
  if (!("jwks" in input) || !isObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isObject)) {
    return false;
  }
  return true;
}
var RemoteJWKSetImpl = class {
  #url;
  #timeoutDuration;
  #cooldownDuration;
  #cacheMaxAge;
  #jwksTimestamp;
  #pendingFetch;
  #headers;
  #customFetch;
  #local;
  #cache;
  constructor(url, options) {
    if (!(url instanceof URL)) {
      throw new TypeError("url must be an instance of URL");
    }
    this.#url = new URL(url.href);
    const opts = options ?? {};
    this.#timeoutDuration = typeof opts.timeoutDuration === "number" ? opts.timeoutDuration : 5e3;
    this.#cooldownDuration = typeof opts.cooldownDuration === "number" ? opts.cooldownDuration : 3e4;
    this.#cacheMaxAge = typeof opts.cacheMaxAge === "number" ? opts.cacheMaxAge : 6e5;
    this.#headers = new Headers(opts.headers);
    if (USER_AGENT && !this.#headers.has("User-Agent")) {
      this.#headers.set("User-Agent", USER_AGENT);
    }
    if (!this.#headers.has("accept")) {
      this.#headers.set("accept", "application/json");
      this.#headers.append("accept", "application/jwk-set+json");
    }
    this.#customFetch = opts[customFetch];
    const cache2 = opts[jwksCache];
    if (cache2 !== void 0) {
      this.#cache = cache2;
      if (isFreshJwksCache(cache2, this.#cacheMaxAge)) {
        this.#jwksTimestamp = this.#cache.uat;
        this.#local = createLocalJWKSet(this.#cache.jwks);
      }
    }
  }
  pendingFetch() {
    return !!this.#pendingFetch;
  }
  #validFor(duration) {
    return typeof this.#jwksTimestamp === "number" && Date.now() < this.#jwksTimestamp + duration;
  }
  coolingDown() {
    return this.#validFor(this.#cooldownDuration);
  }
  fresh() {
    return this.#validFor(this.#cacheMaxAge);
  }
  jwks() {
    return this.#local?.jwks();
  }
  async getKey(protectedHeader, token) {
    if (!this.#local || !this.fresh()) {
      await this.reload();
    }
    try {
      return await this.#local(protectedHeader, token);
    } catch (err) {
      if (err instanceof JWKSNoMatchingKey) {
        if (this.coolingDown() === false) {
          await this.reload();
          return this.#local(protectedHeader, token);
        }
      }
      throw err;
    }
  }
  async reload() {
    if (this.#pendingFetch && isCloudflareWorkers()) {
      this.#pendingFetch = void 0;
    }
    this.#pendingFetch ||= fetchJwks(this.#url.href, this.#headers, AbortSignal.timeout(this.#timeoutDuration), this.#customFetch).then((json) => {
      this.#local = createLocalJWKSet(json);
      if (this.#cache) {
        this.#cache.uat = Date.now();
        this.#cache.jwks = json;
      }
      this.#jwksTimestamp = Date.now();
    }).finally(() => {
      this.#pendingFetch = void 0;
    });
    await this.#pendingFetch;
  }
};
function createRemoteJWKSet(url, options) {
  const set = new RemoteJWKSetImpl(url, options);
  const remoteJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
  Object.defineProperties(remoteJWKSet, {
    coolingDown: {
      get: () => set.coolingDown(),
      enumerable: true
    },
    fresh: {
      get: () => set.fresh(),
      enumerable: true
    },
    reload: {
      value: () => set.reload(),
      enumerable: true
    },
    reloading: {
      get: () => set.pendingFetch(),
      enumerable: true
    },
    jwks: {
      value: () => set.jwks(),
      enumerable: true
    }
  });
  return remoteJWKSet;
}

// node_modules/jose/dist/webapi/key/import.js
async function importJWK(jwk, alg, options) {
  if (!isObject(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  alg ??= jwk.alg;
  const ext = options?.extractable ?? jwk.ext;
  if (jwk.kty !== "oct" && !alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode(jwk.k);
    case "RSA":
      return jwkToKey(keyAlgorithm(alg), { ...jwk, alg, ext });
    case "AKP": {
      if (typeof jwk.alg !== "string" || !jwk.alg) {
        throw new TypeError('missing "alg" (Algorithm) Parameter value');
      }
      if (alg !== void 0 && alg !== jwk.alg) {
        throw new TypeError("JWK alg and alg option value mismatch");
      }
      return jwkToKey(keyAlgorithm(jwk.alg), { ...jwk, ext });
    }
    case "EC":
    case "OKP":
      return jwkToKey(keyAlgorithm(alg), { ...jwk, alg, ext });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}

// node_modules/@whop/sdk/lib/verify-user-token.mjs
var USER_TOKEN_HEADER_NAME = "x-whop-user-token";
var DEFAULT_JWKS_URL = "https://api.whop.com/.well-known/jwks.json";
var jwksCache2 = /* @__PURE__ */ new Map();
function getRemoteJwks(url) {
  let existing = jwksCache2.get(url);
  if (existing)
    return existing;
  existing = createRemoteJWKSet(new URL(url), {
    cacheMaxAge: 12 * 60 * 60 * 1e3,
    cooldownDuration: 3e4
  });
  jwksCache2.set(url, existing);
  return existing;
}
function getUserToken(tokenOrHeadersOrRequest, options) {
  const headerName = options?.headerName ?? USER_TOKEN_HEADER_NAME;
  if (typeof tokenOrHeadersOrRequest === "string")
    return tokenOrHeadersOrRequest;
  if (tokenOrHeadersOrRequest instanceof Headers)
    return tokenOrHeadersOrRequest.get(headerName);
  if (tokenOrHeadersOrRequest instanceof Request)
    return tokenOrHeadersOrRequest.headers.get(headerName);
  return null;
}
function makeUserTokenVerifierFromSdk(client) {
  return async function verifyUserToken(tokenOrHeadersOrRequest, options) {
    if (!client.appID) {
      throw Error("You must set appID in the Whop client constructor if you want to verify user tokens.");
    }
    const baseOptions = { appId: client.appID };
    if (client.userTokenPublicKey)
      baseOptions.publicKey = client.userTokenPublicKey;
    if (client.userTokenJwksUrl)
      baseOptions.jwksUrl = client.userTokenJwksUrl;
    return await internalVerifyUserToken(tokenOrHeadersOrRequest, {
      ...baseOptions,
      ...options
    });
  };
}
async function internalVerifyUserToken(tokenOrHeadersOrRequest, options) {
  try {
    const tokenString = getUserToken(tokenOrHeadersOrRequest, {
      headerName: options?.headerName
    });
    if (!tokenString) {
      throw new Error("Whop user token not found. If you are the app developer, ensure you are developing in the whop.com iframe and have the dev proxy enabled.");
    }
    const verifyOptions = { issuer: "urn:whopcom:exp-proxy", algorithms: ["ES256"] };
    let token;
    if (options.publicKey) {
      const key = await importJWK(JSON.parse(options.publicKey), "ES256").catch(() => {
        throw new Error("Invalid public key provided to verifyUserToken");
      });
      token = await jwtVerify(tokenString, key, verifyOptions).catch(() => {
        throw new Error("Invalid user token provided to verifyUserToken");
      });
    } else {
      const jwks = getRemoteJwks(options.jwksUrl ?? DEFAULT_JWKS_URL);
      token = await jwtVerify(tokenString, jwks, verifyOptions).catch(() => {
        throw new Error("Invalid user token provided to verifyUserToken");
      });
    }
    if (!(token.payload.sub && token.payload.aud) || Array.isArray(token.payload.aud)) {
      throw new Error("Invalid user token provided to verifyUserToken");
    }
    if (options.appId && token.payload.aud !== options.appId)
      throw new Error("Invalid app id provided to verifyUserToken");
    return {
      appId: token.payload.aud,
      userId: token.payload.sub
    };
  } catch (e) {
    if (options.dontThrow) {
      return null;
    }
    throw e;
  }
}

// node_modules/@whop/sdk/client.mjs
var _Whop_instances;
var _a;
var _Whop_encoder;
var _Whop_baseURLOverridden;
var Whop = class {
  /**
   * API Client for interfacing with the Whop API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['WHOP_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookKey=process.env['WHOP_WEBHOOK_SECRET'] ?? null]
   * @param {string | null | undefined} [opts.appID=process.env['WHOP_APP_ID'] ?? null]
   * @param {string | null | undefined} [opts.version=process.env['WHOP_API_VERSION'] ?? 2026-07-20]
   * @param {string} [opts.baseURL=process.env['WHOP_BASE_URL'] ?? https://api.whop.com/api/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL = readEnv("WHOP_BASE_URL"), apiKey = readEnv("WHOP_API_KEY"), webhookKey = readEnv("WHOP_WEBHOOK_SECRET") ?? null, appID = readEnv("WHOP_APP_ID") ?? null, version = readEnv("WHOP_API_VERSION") ?? "2026-07-20", userTokenPublicKey = readEnv("WHOP_USER_TOKEN_PUBLIC_KEY") ?? null, userTokenJwksUrl = readEnv("WHOP_USER_TOKEN_JWKS_URL") ?? null, ...opts } = {}) {
    _Whop_instances.add(this);
    _Whop_encoder.set(this, void 0);
    this.verifyUserToken = makeUserTokenVerifierFromSdk(this);
    this.apps = new Apps(this);
    this.invoices = new Invoices(this);
    this.courseLessonInteractions = new CourseLessonInteractions(this);
    this.products = new Products(this);
    this.socialAccounts = new SocialAccounts(this);
    this.audiences = new Audiences(this);
    this.media = new Media(this);
    this.people = new People(this);
    this.events = new Events(this);
    this.companies = new Companies(this);
    this.webhooks = new Webhooks(this);
    this.plans = new Plans(this);
    this.entries = new Entries(this);
    this.forumPosts = new ForumPosts(this);
    this.transfers = new Transfers(this);
    this.ledgerAccounts = new LedgerAccounts(this);
    this.memberships = new Memberships(this);
    this.authorizedUsers = new AuthorizedUsers(this);
    this.teamMembers = new TeamMembers(this);
    this.appBuilds = new AppBuilds(this);
    this.shipments = new Shipments(this);
    this.checkoutConfigurations = new CheckoutConfigurations(this);
    this.messages = new Messages(this);
    this.chatChannels = new ChatChannels(this);
    this.users = new Users(this);
    this.payments = new Payments(this);
    this.supportChannels = new SupportChannels(this);
    this.experiences = new Experiences(this);
    this.reactions = new Reactions(this);
    this.members = new Members(this);
    this.forums = new Forums(this);
    this.promoCodes = new PromoCodes(this);
    this.courses = new Courses(this);
    this.courseChapters = new CourseChapters(this);
    this.courseLessons = new CourseLessons(this);
    this.reviews = new Reviews(this);
    this.courseStudents = new CourseStudents(this);
    this.accessTokens = new AccessTokens(this);
    this.notifications = new Notifications(this);
    this.disputes = new Disputes(this);
    this.refunds = new Refunds(this);
    this.withdrawals = new Withdrawals(this);
    this.accountLinks = new AccountLinks(this);
    this.accounts = new Accounts(this);
    this.financialActivity = new FinancialActivity(this);
    this.stats = new Stats(this);
    this.payouts = new Payouts(this);
    this.partners = new Partners(this);
    this.cards = new Cards(this);
    this.swaps = new Swaps(this);
    this.deposits = new Deposits(this);
    this.setupIntents = new SetupIntents(this);
    this.paymentMethods = new PaymentMethods(this);
    this.feeMarkups = new FeeMarkups(this);
    this.verifications = new Verifications(this);
    this.leads = new Leads(this);
    this.topups = new Topups(this);
    this.files = new Files(this);
    this.companyTokenTransactions = new CompanyTokenTransactions(this);
    this.dmMembers = new DmMembers(this);
    this.aiChats = new AIChats(this);
    this.dmChannels = new DmChannels(this);
    this.disputeAlerts = new DisputeAlerts(this);
    this.resolutionCenterCases = new ResolutionCenterCases(this);
    this.payoutAccounts = new PayoutAccounts(this);
    this.affiliates = new Affiliates(this);
    this.bounties = new Bounties(this);
    this.bountySubmissions = new BountySubmissions(this);
    this.adCampaigns = new AdCampaigns(this);
    this.adGroups = new AdGroups(this);
    this.ads = new Ads(this);
    this.adReports = new AdReports(this);
    if (apiKey === void 0) {
      throw new WhopError("The WHOP_API_KEY environment variable is missing or empty; either provide it, or instantiate the Whop client with an apiKey option, like new Whop({ apiKey: 'My API Key' }).");
    }
    const options = {
      apiKey,
      webhookKey,
      appID,
      version,
      userTokenPublicKey,
      userTokenJwksUrl,
      ...opts,
      baseURL: baseURL || `https://api.whop.com/api/v1`
    };
    this.baseURL = options.baseURL;
    this.timeout = options.timeout ?? _a.DEFAULT_TIMEOUT;
    this.logger = options.logger ?? console;
    const defaultLogLevel = "warn";
    this.logLevel = defaultLogLevel;
    this.logLevel = parseLogLevel(options.logLevel, "ClientOptions.logLevel", this) ?? parseLogLevel(readEnv("WHOP_LOG"), "process.env['WHOP_LOG']", this) ?? defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? getDefaultFetch();
    __classPrivateFieldSet(this, _Whop_encoder, FallbackEncoder, "f");
    const customHeadersEnv = readEnv("WHOP_CUSTOM_HEADERS");
    if (customHeadersEnv) {
      const parsed = {};
      for (const line of customHeadersEnv.split("\n")) {
        const colon = line.indexOf(":");
        if (colon >= 0) {
          parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
        }
      }
      options.defaultHeaders = { ...parsed, ...options.defaultHeaders };
    }
    this._options = options;
    this.apiKey = apiKey;
    this.webhookKey = webhookKey;
    this.appID = appID;
    this.version = version;
    this.userTokenPublicKey = userTokenPublicKey;
    this.userTokenJwksUrl = userTokenJwksUrl;
  }
  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options) {
    const client = new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      webhookKey: this.webhookKey,
      appID: this.appID,
      version: this.version,
      userTokenPublicKey: this.userTokenPublicKey,
      userTokenJwksUrl: this.userTokenJwksUrl,
      ...options
    });
    return client;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values, nulls }) {
    return;
  }
  async authHeaders(opts) {
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }
  stringifyQuery(query) {
    return stringifyQuery(query);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${VERSION}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${uuid4()}`;
  }
  makeStatusError(status, error, message2, headers) {
    return APIError.generate(status, error, message2, headers);
  }
  buildURL(path2, query, defaultBaseURL) {
    const baseURL = !__classPrivateFieldGet(this, _Whop_instances, "m", _Whop_baseURLOverridden).call(this) && defaultBaseURL || this.baseURL;
    const url = isAbsoluteURL(path2) ? new URL(path2) : new URL(baseURL + (baseURL.endsWith("/") && path2.startsWith("/") ? path2.slice(1) : path2));
    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }
    if (typeof query === "object" && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }
    return url.toString();
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(options) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(request, { url, options }) {
  }
  get(path2, opts) {
    return this.methodRequest("get", path2, opts);
  }
  post(path2, opts) {
    return this.methodRequest("post", path2, opts);
  }
  patch(path2, opts) {
    return this.methodRequest("patch", path2, opts);
  }
  put(path2, opts) {
    return this.methodRequest("put", path2, opts);
  }
  delete(path2, opts) {
    return this.methodRequest("delete", path2, opts);
  }
  methodRequest(method, path2, opts) {
    return this.request(Promise.resolve(opts).then((opts2) => {
      return { method, path: path2, ...opts2 };
    }));
  }
  request(options, remainingRetries = null) {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, void 0));
  }
  async makeRequest(optionsInput, retriesRemaining, retryOfRequestLogID) {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }
    await this.prepareOptions(options);
    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining
    });
    await this.prepareRequest(req, { url, options });
    const requestLogID = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0");
    const retryLogStr = retryOfRequestLogID === void 0 ? "" : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();
    loggerFor(this).debug(`[${requestLogID}] sending request`, formatRequestDetails({
      retryOfRequestLogID,
      method: options.method,
      url,
      options,
      headers: req.headers
    }));
    if (options.signal?.aborted) {
      throw new APIUserAbortError();
    }
    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();
    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new APIUserAbortError();
      }
      const isTimeout = isAbortError(response) || /timed? ?out/i.test(String(response) + ("cause" in response ? String(response.cause) : ""));
      if (retriesRemaining) {
        loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - ${retryMessage}`);
        loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (${retryMessage})`, formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message
        }));
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - error; no more retries left`);
      loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (error; no more retries left)`, formatRequestDetails({
        retryOfRequestLogID,
        url,
        durationMs: headersTime - startTime,
        message: response.message
      }));
      if (isTimeout) {
        throw new APIConnectionTimeoutError();
      }
      throw new APIConnectionError({ cause: response });
    }
    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${response.ok ? "succeeded" : "failed"} with status ${response.status} in ${headersTime - startTime}ms`;
    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
        await CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage2}`);
        loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage2})`, formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          durationMs: headersTime - startTime
        }));
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID, response.headers);
      }
      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;
      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
      const errText = await response.text().catch((err2) => castToError(err2).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? void 0 : errText;
      loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage})`, formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        message: errMessage,
        durationMs: Date.now() - startTime
      }));
      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }
    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(`[${requestLogID}] response start`, formatRequestDetails({
      retryOfRequestLogID,
      url: response.url,
      status: response.status,
      headers: response.headers,
      durationMs: headersTime - startTime
    }));
    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }
  getAPIList(path2, Page, opts) {
    return this.requestAPIList(Page, opts && "then" in opts ? opts.then((opts2) => ({ method: "get", path: path2, ...opts2 })) : { method: "get", path: path2, ...opts });
  }
  requestAPIList(Page, options) {
    const request = this.makeRequest(options, null, void 0);
    return new PagePromise(this, request, Page);
  }
  async fetchWithTimeout(url, init, ms, controller) {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal)
      signal.addEventListener("abort", abort, { once: true });
    const timeout = setTimeout(abort, ms);
    const isReadableBody = globalThis.ReadableStream && options.body instanceof globalThis.ReadableStream || typeof options.body === "object" && options.body !== null && Symbol.asyncIterator in options.body;
    const fetchOptions = {
      signal: controller.signal,
      ...isReadableBody ? { duplex: "half" } : {},
      method: "GET",
      ...options
    };
    if (method) {
      fetchOptions.method = method.toUpperCase();
    }
    try {
      return await this.fetch.call(void 0, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }
  async shouldRetry(response) {
    const shouldRetryHeader = response.headers.get("x-should-retry");
    if (shouldRetryHeader === "true")
      return true;
    if (shouldRetryHeader === "false")
      return false;
    if (response.status === 408)
      return true;
    if (response.status === 409)
      return true;
    if (response.status === 429)
      return true;
    if (response.status >= 500)
      return true;
    return false;
  }
  async retryRequest(options, retriesRemaining, requestLogID, responseHeaders) {
    let timeoutMillis;
    const retryAfterMillisHeader = responseHeaders?.get("retry-after-ms");
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }
    const retryAfterHeader = responseHeaders?.get("retry-after");
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1e3;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }
    if (timeoutMillis === void 0) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);
    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }
  calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8;
    const numRetries = maxRetries - retriesRemaining;
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
    const jitter = 1 - Math.random() * 0.25;
    return sleepSeconds * jitter * 1e3;
  }
  async buildRequest(inputOptions, { retryCount = 0 } = {}) {
    const options = { ...inputOptions };
    const { method, path: path2, query, defaultBaseURL } = options;
    const url = this.buildURL(path2, query, defaultBaseURL);
    if ("timeout" in options)
      validatePositiveInteger("timeout", options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });
    const req = {
      method,
      headers: reqHeaders,
      ...options.signal && { signal: options.signal },
      ...globalThis.ReadableStream && body instanceof globalThis.ReadableStream && { duplex: "half" },
      ...body && { body },
      ...this.fetchOptions ?? {},
      ...options.fetchOptions ?? {}
    };
    return { req, url, timeout: options.timeout };
  }
  async buildHeaders({ options, method, bodyHeaders, retryCount }) {
    let idempotencyHeaders = {};
    if (this.idempotencyHeader && method !== "get") {
      if (!options.idempotencyKey)
        options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }
    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(retryCount),
        ...options.timeout ? { "X-Stainless-Timeout": String(Math.trunc(options.timeout / 1e3)) } : {},
        ...getPlatformHeaders(),
        "X-Whop-App-Id": this.appID,
        "Api-Version-Date": this.version
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers
    ]);
    this.validateHeaders(headers);
    return headers.values;
  }
  _makeAbort(controller) {
    return () => controller.abort();
  }
  buildBody({ options }) {
    const { body, headers: rawHeaders } = options;
    if (!body) {
      if (body == null && "body" in options) {
        return __classPrivateFieldGet(this, _Whop_encoder, "f").call(this, { body, headers: buildHeaders([rawHeaders]) });
      }
      return { bodyHeaders: void 0, body: void 0 };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) || body instanceof ArrayBuffer || body instanceof DataView || typeof body === "string" && // Preserve legacy string encoding behavior for now
      headers.values.has("content-type") || // `Blob` is superset of `File`
      globalThis.Blob && body instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
      body instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
      globalThis.ReadableStream && body instanceof globalThis.ReadableStream
    ) {
      return { bodyHeaders: void 0, body };
    } else if (typeof body === "object" && (Symbol.asyncIterator in body || Symbol.iterator in body && "next" in body && typeof body.next === "function")) {
      return { bodyHeaders: void 0, body: ReadableStreamFrom(body) };
    } else if (typeof body === "object" && headers.values.get("content-type") === "application/x-www-form-urlencoded") {
      return {
        bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
        body: this.stringifyQuery(body)
      };
    } else {
      return __classPrivateFieldGet(this, _Whop_encoder, "f").call(this, { body, headers });
    }
  }
};
_a = Whop, _Whop_encoder = /* @__PURE__ */ new WeakMap(), _Whop_instances = /* @__PURE__ */ new WeakSet(), _Whop_baseURLOverridden = function _Whop_baseURLOverridden2() {
  return this.baseURL !== "https://api.whop.com/api/v1";
};
Whop.Whop = _a;
Whop.DEFAULT_TIMEOUT = 6e4;
Whop.WhopError = WhopError;
Whop.APIError = APIError;
Whop.APIConnectionError = APIConnectionError;
Whop.APIConnectionTimeoutError = APIConnectionTimeoutError;
Whop.APIUserAbortError = APIUserAbortError;
Whop.NotFoundError = NotFoundError;
Whop.ConflictError = ConflictError;
Whop.RateLimitError = RateLimitError;
Whop.BadRequestError = BadRequestError;
Whop.AuthenticationError = AuthenticationError;
Whop.InternalServerError = InternalServerError;
Whop.PermissionDeniedError = PermissionDeniedError;
Whop.UnprocessableEntityError = UnprocessableEntityError;
Whop.toFile = toFile;
Whop.Apps = Apps;
Whop.Invoices = Invoices;
Whop.CourseLessonInteractions = CourseLessonInteractions;
Whop.Products = Products;
Whop.SocialAccounts = SocialAccounts;
Whop.Audiences = Audiences;
Whop.Media = Media;
Whop.People = People;
Whop.Events = Events;
Whop.Companies = Companies;
Whop.Webhooks = Webhooks;
Whop.Plans = Plans;
Whop.Entries = Entries;
Whop.ForumPosts = ForumPosts;
Whop.Transfers = Transfers;
Whop.LedgerAccounts = LedgerAccounts;
Whop.Memberships = Memberships;
Whop.AuthorizedUsers = AuthorizedUsers;
Whop.TeamMembers = TeamMembers;
Whop.AppBuilds = AppBuilds;
Whop.Shipments = Shipments;
Whop.CheckoutConfigurations = CheckoutConfigurations;
Whop.Messages = Messages;
Whop.ChatChannels = ChatChannels;
Whop.Users = Users;
Whop.Payments = Payments;
Whop.SupportChannels = SupportChannels;
Whop.Experiences = Experiences;
Whop.Reactions = Reactions;
Whop.Members = Members;
Whop.Forums = Forums;
Whop.PromoCodes = PromoCodes;
Whop.Courses = Courses;
Whop.CourseChapters = CourseChapters;
Whop.CourseLessons = CourseLessons;
Whop.Reviews = Reviews;
Whop.CourseStudents = CourseStudents;
Whop.AccessTokens = AccessTokens;
Whop.Notifications = Notifications;
Whop.Disputes = Disputes;
Whop.Refunds = Refunds;
Whop.Withdrawals = Withdrawals;
Whop.AccountLinks = AccountLinks;
Whop.Accounts = Accounts;
Whop.FinancialActivity = FinancialActivity;
Whop.Stats = Stats;
Whop.Payouts = Payouts;
Whop.Partners = Partners;
Whop.Cards = Cards;
Whop.Swaps = Swaps;
Whop.Deposits = Deposits;
Whop.SetupIntents = SetupIntents;
Whop.PaymentMethods = PaymentMethods;
Whop.FeeMarkups = FeeMarkups;
Whop.Verifications = Verifications;
Whop.Leads = Leads;
Whop.Topups = Topups;
Whop.Files = Files;
Whop.CompanyTokenTransactions = CompanyTokenTransactions;
Whop.DmMembers = DmMembers;
Whop.AIChats = AIChats;
Whop.DmChannels = DmChannels;
Whop.DisputeAlerts = DisputeAlerts;
Whop.ResolutionCenterCases = ResolutionCenterCases;
Whop.PayoutAccounts = PayoutAccounts;
Whop.Affiliates = Affiliates;
Whop.Bounties = Bounties;
Whop.BountySubmissions = BountySubmissions;
Whop.AdCampaigns = AdCampaigns;
Whop.AdGroups = AdGroups;
Whop.Ads = Ads;
Whop.AdReports = AdReports;

// whop-webhook.src.mjs
var handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }
  const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET;
  const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID;
  const GA4_API_SECRET = process.env.GA4_API_SECRET;
  if (!WHOP_WEBHOOK_SECRET || !GA4_MEASUREMENT_ID || !GA4_API_SECRET) {
    console.error("whop-webhook: missing one of WHOP_WEBHOOK_SECRET / GA4_MEASUREMENT_ID / GA4_API_SECRET");
    return { statusCode: 500, body: "Server misconfigured" };
  }
  const whopsdk = new Whop({
    apiKey: "unused",
    // no outbound Whop API calls made here, only local signature verification
    webhookKey: Buffer.from(WHOP_WEBHOOK_SECRET).toString("base64")
    // matches Whop's documented setup exactly
  });
  const rawBody = event.body || "";
  const headers = {};
  for (const [k, v] of Object.entries(event.headers || {})) headers[k.toLowerCase()] = v;
  let webhookData;
  try {
    webhookData = whopsdk.webhooks.unwrap(rawBody, { headers });
  } catch (err) {
    console.error("whop-webhook: signature verification failed:", err && err.message);
    return { statusCode: 400, body: "Invalid signature" };
  }
  console.log("whop-webhook: verified event type =", webhookData.type, " id =", headers["webhook-id"]);
  if (webhookData.type === "payment.succeeded") {
    const payment = webhookData.data || {};
    const amount = payment.final_amount ?? payment.amount ?? payment.total ?? null;
    const currency = (payment.currency || "usd").toString().toUpperCase();
    const transactionId = payment.id || payment.receipt_id || "whop_" + Date.now();
    const planId = payment.plan && payment.plan.id || payment.plan_id || "unknown_plan";
    const clientId = "whop-webhook." + transactionId;
    try {
      const res = await fetch(
        "https://www.google-analytics.com/mp/collect?measurement_id=" + encodeURIComponent(GA4_MEASUREMENT_ID) + "&api_secret=" + encodeURIComponent(GA4_API_SECRET),
        {
          method: "POST",
          body: JSON.stringify({
            client_id: clientId,
            events: [
              {
                name: "purchase",
                params: {
                  transaction_id: transactionId,
                  value: amount === null ? 99 : amount,
                  currency,
                  items: [{ item_id: planId, item_name: "High Status Method Membership" }],
                  source: "whop_webhook"
                }
              }
            ]
          })
        }
      );
      console.log("whop-webhook: GA4 Measurement Protocol responded", res.status);
    } catch (err) {
      console.error("whop-webhook: failed to reach GA4 Measurement Protocol:", err && err.message);
    }
  }
  return { statusCode: 200, body: "OK" };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
