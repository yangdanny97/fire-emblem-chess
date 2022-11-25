(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/Utils.bs.js
  var require_Utils_bs = __commonJS({
    "src/Utils.bs.js"(exports) {
      "use strict";
      function oppositeColor2(color) {
        if (color === "White") {
          return "Black";
        } else {
          return "White";
        }
      }
      function getAsset2(piece) {
        switch (piece.TAG | 0) {
          case 0:
            return "assets/" + piece._0.color + "/pawn";
          case 1:
            return "assets/" + piece._0.color + "/king";
          case 2:
            return "assets/" + piece._0.color + "/queen";
          case 3:
            return "assets/" + piece._0.color + "/bishop";
          case 4:
            return "assets/" + piece._0.color + "/knight";
          case 5:
            return "assets/" + piece._0.color + "/rook";
        }
      }
      function getColor2(piece) {
        switch (piece.TAG | 0) {
          case 0:
          case 1:
            return piece._0.color;
          default:
            return piece._0.color;
        }
      }
      function getEmphasis(piece) {
        switch (piece.TAG | 0) {
          case 0:
          case 1:
            return piece._0.emphasizeCoverRange;
          default:
            return piece._0.emphasizeCoverRange;
        }
      }
      function toggleEmphasis(piece) {
        switch (piece.TAG | 0) {
          case 0:
          case 1:
            break;
          default:
            var x = piece._0;
            x.emphasizeCoverRange = !x.emphasizeCoverRange;
            return;
        }
        var p = piece._0;
        p.emphasizeCoverRange = !p.emphasizeCoverRange;
      }
      function getX2(piece) {
        switch (piece.TAG | 0) {
          case 0:
          case 1:
            return piece._0.x;
          default:
            return piece._0.x;
        }
      }
      function getY2(piece) {
        switch (piece.TAG | 0) {
          case 0:
          case 1:
            return piece._0.y;
          default:
            return piece._0.y;
        }
      }
      function withMoved(piece) {
        switch (piece.TAG | 0) {
          case 0:
            var p = piece._0;
            return {
              TAG: 0,
              _0: {
                x: p.x,
                y: p.y,
                color: p.color,
                hasMoved: true,
                emphasizeCoverRange: p.emphasizeCoverRange,
                hasJustMoved2Spaces: false
              }
            };
          case 1:
            var k = piece._0;
            return {
              TAG: 1,
              _0: {
                x: k.x,
                y: k.y,
                color: k.color,
                hasMoved: true,
                emphasizeCoverRange: k.emphasizeCoverRange,
                inCheck: k.inCheck
              }
            };
          case 2:
            var p$1 = piece._0;
            return {
              TAG: 2,
              _0: {
                x: p$1.x,
                y: p$1.y,
                color: p$1.color,
                hasMoved: true,
                emphasizeCoverRange: p$1.emphasizeCoverRange
              }
            };
          case 3:
            var p$2 = piece._0;
            return {
              TAG: 3,
              _0: {
                x: p$2.x,
                y: p$2.y,
                color: p$2.color,
                hasMoved: true,
                emphasizeCoverRange: p$2.emphasizeCoverRange
              }
            };
          case 4:
            var p$3 = piece._0;
            return {
              TAG: 4,
              _0: {
                x: p$3.x,
                y: p$3.y,
                color: p$3.color,
                hasMoved: true,
                emphasizeCoverRange: p$3.emphasizeCoverRange
              }
            };
          case 5:
            var p$4 = piece._0;
            return {
              TAG: 5,
              _0: {
                x: p$4.x,
                y: p$4.y,
                color: p$4.color,
                hasMoved: true,
                emphasizeCoverRange: p$4.emphasizeCoverRange
              }
            };
        }
      }
      function with2Spaces(p) {
        return {
          TAG: 0,
          _0: {
            x: p.x,
            y: p.y,
            color: p.color,
            hasMoved: true,
            emphasizeCoverRange: p.emphasizeCoverRange,
            hasJustMoved2Spaces: true
          }
        };
      }
      function disable2Spaces(p) {
        return {
          TAG: 0,
          _0: {
            x: p.x,
            y: p.y,
            color: p.color,
            hasMoved: p.hasMoved,
            emphasizeCoverRange: p.emphasizeCoverRange,
            hasJustMoved2Spaces: false
          }
        };
      }
      function withPosition(piece, param) {
        var y = param[1];
        var x = param[0];
        switch (piece.TAG | 0) {
          case 0:
            var p = piece._0;
            return {
              TAG: 0,
              _0: {
                x,
                y,
                color: p.color,
                hasMoved: p.hasMoved,
                emphasizeCoverRange: p.emphasizeCoverRange,
                hasJustMoved2Spaces: p.hasJustMoved2Spaces
              }
            };
          case 1:
            var k = piece._0;
            return {
              TAG: 1,
              _0: {
                x,
                y,
                color: k.color,
                hasMoved: k.hasMoved,
                emphasizeCoverRange: k.emphasizeCoverRange,
                inCheck: k.inCheck
              }
            };
          case 2:
            var p$1 = piece._0;
            return {
              TAG: 2,
              _0: {
                x,
                y,
                color: p$1.color,
                hasMoved: p$1.hasMoved,
                emphasizeCoverRange: p$1.emphasizeCoverRange
              }
            };
          case 3:
            var p$2 = piece._0;
            return {
              TAG: 3,
              _0: {
                x,
                y,
                color: p$2.color,
                hasMoved: p$2.hasMoved,
                emphasizeCoverRange: p$2.emphasizeCoverRange
              }
            };
          case 4:
            var p$3 = piece._0;
            return {
              TAG: 4,
              _0: {
                x,
                y,
                color: p$3.color,
                hasMoved: p$3.hasMoved,
                emphasizeCoverRange: p$3.emphasizeCoverRange
              }
            };
          case 5:
            var p$4 = piece._0;
            return {
              TAG: 5,
              _0: {
                x,
                y,
                color: p$4.color,
                hasMoved: p$4.hasMoved,
                emphasizeCoverRange: p$4.emphasizeCoverRange
              }
            };
        }
      }
      function promotionRank(p) {
        var match = p.color;
        if (match === "White") {
          return 7;
        } else {
          return 0;
        }
      }
      function backRank(p) {
        var match = p.color;
        if (match === "White") {
          return 0;
        } else {
          return 7;
        }
      }
      function pawnOffsetHelper(p, n) {
        var match = p.color;
        if (match === "White") {
          return n;
        } else {
          return -n | 0;
        }
      }
      function pawn(color, x, y) {
        return {
          TAG: 0,
          _0: {
            x,
            y,
            color,
            hasMoved: false,
            emphasizeCoverRange: false,
            hasJustMoved2Spaces: false
          }
        };
      }
      function king(color, x, y) {
        return {
          TAG: 1,
          _0: {
            x,
            y,
            color,
            hasMoved: false,
            emphasizeCoverRange: false,
            inCheck: false
          }
        };
      }
      function queen(color, x, y) {
        return {
          TAG: 2,
          _0: {
            x,
            y,
            color,
            hasMoved: false,
            emphasizeCoverRange: false
          }
        };
      }
      function rook(color, x, y) {
        return {
          TAG: 5,
          _0: {
            x,
            y,
            color,
            hasMoved: false,
            emphasizeCoverRange: false
          }
        };
      }
      function bishop(color, x, y) {
        return {
          TAG: 3,
          _0: {
            x,
            y,
            color,
            hasMoved: false,
            emphasizeCoverRange: false
          }
        };
      }
      function knight(color, x, y) {
        return {
          TAG: 4,
          _0: {
            x,
            y,
            color,
            hasMoved: false,
            emphasizeCoverRange: false
          }
        };
      }
      exports.oppositeColor = oppositeColor2;
      exports.getAsset = getAsset2;
      exports.getColor = getColor2;
      exports.getEmphasis = getEmphasis;
      exports.toggleEmphasis = toggleEmphasis;
      exports.getX = getX2;
      exports.getY = getY2;
      exports.withMoved = withMoved;
      exports.with2Spaces = with2Spaces;
      exports.disable2Spaces = disable2Spaces;
      exports.withPosition = withPosition;
      exports.promotionRank = promotionRank;
      exports.backRank = backRank;
      exports.pawnOffsetHelper = pawnOffsetHelper;
      exports.pawn = pawn;
      exports.king = king;
      exports.queen = queen;
      exports.rook = rook;
      exports.bishop = bishop;
      exports.knight = knight;
    }
  });

  // node_modules/rescript/lib/js/caml_array.js
  var require_caml_array = __commonJS({
    "node_modules/rescript/lib/js/caml_array.js"(exports) {
      "use strict";
      function sub(x, offset, len2) {
        var result = new Array(len2);
        var j = 0;
        var i = offset;
        while (j < len2) {
          result[j] = x[i];
          j = j + 1 | 0;
          i = i + 1 | 0;
        }
        ;
        return result;
      }
      function len(_acc, _l) {
        while (true) {
          var l = _l;
          var acc = _acc;
          if (!l) {
            return acc;
          }
          _l = l.tl;
          _acc = l.hd.length + acc | 0;
          continue;
        }
        ;
      }
      function fill(arr, _i, _l) {
        while (true) {
          var l = _l;
          var i = _i;
          if (!l) {
            return;
          }
          var x = l.hd;
          var l$1 = x.length;
          var k = i;
          var j = 0;
          while (j < l$1) {
            arr[k] = x[j];
            k = k + 1 | 0;
            j = j + 1 | 0;
          }
          ;
          _l = l.tl;
          _i = k;
          continue;
        }
        ;
      }
      function concat(l) {
        var v = len(0, l);
        var result = new Array(v);
        fill(result, 0, l);
        return result;
      }
      function set(xs, index, newval) {
        if (index < 0 || index >= xs.length) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
        }
        xs[index] = newval;
      }
      function get(xs, index) {
        if (index < 0 || index >= xs.length) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
        }
        return xs[index];
      }
      function make(len2, init2) {
        var b = new Array(len2);
        for (var i = 0; i < len2; ++i) {
          b[i] = init2;
        }
        return b;
      }
      function make_float(len2) {
        var b = new Array(len2);
        for (var i = 0; i < len2; ++i) {
          b[i] = 0;
        }
        return b;
      }
      function blit(a1, i1, a2, i2, len2) {
        if (i2 <= i1) {
          for (var j = 0; j < len2; ++j) {
            a2[j + i2 | 0] = a1[j + i1 | 0];
          }
          return;
        }
        for (var j$1 = len2 - 1 | 0; j$1 >= 0; --j$1) {
          a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
        }
      }
      function dup(prim) {
        return prim.slice(0);
      }
      exports.dup = dup;
      exports.sub = sub;
      exports.concat = concat;
      exports.make = make;
      exports.make_float = make_float;
      exports.blit = blit;
      exports.get = get;
      exports.set = set;
    }
  });

  // node_modules/rescript/lib/js/curry.js
  var require_curry = __commonJS({
    "node_modules/rescript/lib/js/curry.js"(exports) {
      "use strict";
      var Caml_array = require_caml_array();
      function app(_f, _args) {
        while (true) {
          var args = _args;
          var f = _f;
          var init_arity = f.length;
          var arity = init_arity === 0 ? 1 : init_arity;
          var len = args.length;
          var d = arity - len | 0;
          if (d === 0) {
            return f.apply(null, args);
          }
          if (d >= 0) {
            return function(f2, args2) {
              return function(x) {
                return app(f2, args2.concat([x]));
              };
            }(f, args);
          }
          _args = Caml_array.sub(args, arity, -d | 0);
          _f = f.apply(null, Caml_array.sub(args, 0, arity));
          continue;
        }
        ;
      }
      function _1(o, a0) {
        var arity = o.length;
        if (arity === 1) {
          return o(a0);
        } else {
          switch (arity) {
            case 1:
              return o(a0);
            case 2:
              return function(param) {
                return o(a0, param);
              };
            case 3:
              return function(param, param$1) {
                return o(a0, param, param$1);
              };
            case 4:
              return function(param, param$1, param$2) {
                return o(a0, param, param$1, param$2);
              };
            case 5:
              return function(param, param$1, param$2, param$3) {
                return o(a0, param, param$1, param$2, param$3);
              };
            case 6:
              return function(param, param$1, param$2, param$3, param$4) {
                return o(a0, param, param$1, param$2, param$3, param$4);
              };
            case 7:
              return function(param, param$1, param$2, param$3, param$4, param$5) {
                return o(a0, param, param$1, param$2, param$3, param$4, param$5);
              };
            default:
              return app(o, [a0]);
          }
        }
      }
      function __1(o) {
        var arity = o.length;
        if (arity === 1) {
          return o;
        } else {
          return function(a0) {
            return _1(o, a0);
          };
        }
      }
      function _2(o, a0, a1) {
        var arity = o.length;
        if (arity === 2) {
          return o(a0, a1);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [a1]);
            case 2:
              return o(a0, a1);
            case 3:
              return function(param) {
                return o(a0, a1, param);
              };
            case 4:
              return function(param, param$1) {
                return o(a0, a1, param, param$1);
              };
            case 5:
              return function(param, param$1, param$2) {
                return o(a0, a1, param, param$1, param$2);
              };
            case 6:
              return function(param, param$1, param$2, param$3) {
                return o(a0, a1, param, param$1, param$2, param$3);
              };
            case 7:
              return function(param, param$1, param$2, param$3, param$4) {
                return o(a0, a1, param, param$1, param$2, param$3, param$4);
              };
            default:
              return app(o, [
                a0,
                a1
              ]);
          }
        }
      }
      function __2(o) {
        var arity = o.length;
        if (arity === 2) {
          return o;
        } else {
          return function(a0, a1) {
            return _2(o, a0, a1);
          };
        }
      }
      function _3(o, a0, a1, a2) {
        var arity = o.length;
        if (arity === 3) {
          return o(a0, a1, a2);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2
              ]);
            case 2:
              return app(o(a0, a1), [a2]);
            case 3:
              return o(a0, a1, a2);
            case 4:
              return function(param) {
                return o(a0, a1, a2, param);
              };
            case 5:
              return function(param, param$1) {
                return o(a0, a1, a2, param, param$1);
              };
            case 6:
              return function(param, param$1, param$2) {
                return o(a0, a1, a2, param, param$1, param$2);
              };
            case 7:
              return function(param, param$1, param$2, param$3) {
                return o(a0, a1, a2, param, param$1, param$2, param$3);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2
              ]);
          }
        }
      }
      function __3(o) {
        var arity = o.length;
        if (arity === 3) {
          return o;
        } else {
          return function(a0, a1, a2) {
            return _3(o, a0, a1, a2);
          };
        }
      }
      function _4(o, a0, a1, a2, a3) {
        var arity = o.length;
        if (arity === 4) {
          return o(a0, a1, a2, a3);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3
              ]);
            case 3:
              return app(o(a0, a1, a2), [a3]);
            case 4:
              return o(a0, a1, a2, a3);
            case 5:
              return function(param) {
                return o(a0, a1, a2, a3, param);
              };
            case 6:
              return function(param, param$1) {
                return o(a0, a1, a2, a3, param, param$1);
              };
            case 7:
              return function(param, param$1, param$2) {
                return o(a0, a1, a2, a3, param, param$1, param$2);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3
              ]);
          }
        }
      }
      function __4(o) {
        var arity = o.length;
        if (arity === 4) {
          return o;
        } else {
          return function(a0, a1, a2, a3) {
            return _4(o, a0, a1, a2, a3);
          };
        }
      }
      function _5(o, a0, a1, a2, a3, a4) {
        var arity = o.length;
        if (arity === 5) {
          return o(a0, a1, a2, a3, a4);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [a4]);
            case 5:
              return o(a0, a1, a2, a3, a4);
            case 6:
              return function(param) {
                return o(a0, a1, a2, a3, a4, param);
              };
            case 7:
              return function(param, param$1) {
                return o(a0, a1, a2, a3, a4, param, param$1);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4
              ]);
          }
        }
      }
      function __5(o) {
        var arity = o.length;
        if (arity === 5) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4) {
            return _5(o, a0, a1, a2, a3, a4);
          };
        }
      }
      function _6(o, a0, a1, a2, a3, a4, a5) {
        var arity = o.length;
        if (arity === 6) {
          return o(a0, a1, a2, a3, a4, a5);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4,
                a5
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4,
                a5
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4,
                a5
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [
                a4,
                a5
              ]);
            case 5:
              return app(o(a0, a1, a2, a3, a4), [a5]);
            case 6:
              return o(a0, a1, a2, a3, a4, a5);
            case 7:
              return function(param) {
                return o(a0, a1, a2, a3, a4, a5, param);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4,
                a5
              ]);
          }
        }
      }
      function __6(o) {
        var arity = o.length;
        if (arity === 6) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4, a5) {
            return _6(o, a0, a1, a2, a3, a4, a5);
          };
        }
      }
      function _7(o, a0, a1, a2, a3, a4, a5, a6) {
        var arity = o.length;
        if (arity === 7) {
          return o(a0, a1, a2, a3, a4, a5, a6);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4,
                a5,
                a6
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [
                a4,
                a5,
                a6
              ]);
            case 5:
              return app(o(a0, a1, a2, a3, a4), [
                a5,
                a6
              ]);
            case 6:
              return app(o(a0, a1, a2, a3, a4, a5), [a6]);
            case 7:
              return o(a0, a1, a2, a3, a4, a5, a6);
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
          }
        }
      }
      function __7(o) {
        var arity = o.length;
        if (arity === 7) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4, a5, a6) {
            return _7(o, a0, a1, a2, a3, a4, a5, a6);
          };
        }
      }
      function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
        var arity = o.length;
        if (arity === 8) {
          return o(a0, a1, a2, a3, a4, a5, a6, a7);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [
                a4,
                a5,
                a6,
                a7
              ]);
            case 5:
              return app(o(a0, a1, a2, a3, a4), [
                a5,
                a6,
                a7
              ]);
            case 6:
              return app(o(a0, a1, a2, a3, a4, a5), [
                a6,
                a7
              ]);
            case 7:
              return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
          }
        }
      }
      function __8(o) {
        var arity = o.length;
        if (arity === 8) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4, a5, a6, a7) {
            return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
          };
        }
      }
      exports.app = app;
      exports._1 = _1;
      exports.__1 = __1;
      exports._2 = _2;
      exports.__2 = __2;
      exports._3 = _3;
      exports.__3 = __3;
      exports._4 = _4;
      exports.__4 = __4;
      exports._5 = _5;
      exports.__5 = __5;
      exports._6 = _6;
      exports.__6 = __6;
      exports._7 = _7;
      exports.__7 = __7;
      exports._8 = _8;
      exports.__8 = __8;
    }
  });

  // node_modules/rescript/lib/js/caml.js
  var require_caml = __commonJS({
    "node_modules/rescript/lib/js/caml.js"(exports) {
      "use strict";
      function int_compare(x, y) {
        if (x < y) {
          return -1;
        } else if (x === y) {
          return 0;
        } else {
          return 1;
        }
      }
      function bool_compare(x, y) {
        if (x) {
          if (y) {
            return 0;
          } else {
            return 1;
          }
        } else if (y) {
          return -1;
        } else {
          return 0;
        }
      }
      function float_compare(x, y) {
        if (x === y) {
          return 0;
        } else if (x < y) {
          return -1;
        } else if (x > y || x === x) {
          return 1;
        } else if (y === y) {
          return -1;
        } else {
          return 0;
        }
      }
      function string_compare(s1, s2) {
        if (s1 === s2) {
          return 0;
        } else if (s1 < s2) {
          return -1;
        } else {
          return 1;
        }
      }
      function bool_min(x, y) {
        if (x) {
          return y;
        } else {
          return x;
        }
      }
      function int_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function float_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function string_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function bool_max(x, y) {
        if (x) {
          return x;
        } else {
          return y;
        }
      }
      function int_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      function float_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      function string_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      function i64_eq(x, y) {
        if (x[1] === y[1]) {
          return x[0] === y[0];
        } else {
          return false;
        }
      }
      function i64_ge(param, param$1) {
        var other_hi = param$1[0];
        var hi = param[0];
        if (hi > other_hi) {
          return true;
        } else if (hi < other_hi) {
          return false;
        } else {
          return param[1] >= param$1[1];
        }
      }
      function i64_neq(x, y) {
        return !i64_eq(x, y);
      }
      function i64_lt(x, y) {
        return !i64_ge(x, y);
      }
      function i64_gt(x, y) {
        if (x[0] > y[0]) {
          return true;
        } else if (x[0] < y[0]) {
          return false;
        } else {
          return x[1] > y[1];
        }
      }
      function i64_le(x, y) {
        return !i64_gt(x, y);
      }
      function i64_min(x, y) {
        if (i64_ge(x, y)) {
          return y;
        } else {
          return x;
        }
      }
      function i64_max(x, y) {
        if (i64_gt(x, y)) {
          return x;
        } else {
          return y;
        }
      }
      exports.int_compare = int_compare;
      exports.bool_compare = bool_compare;
      exports.float_compare = float_compare;
      exports.string_compare = string_compare;
      exports.bool_min = bool_min;
      exports.int_min = int_min;
      exports.float_min = float_min;
      exports.string_min = string_min;
      exports.bool_max = bool_max;
      exports.int_max = int_max;
      exports.float_max = float_max;
      exports.string_max = string_max;
      exports.i64_eq = i64_eq;
      exports.i64_neq = i64_neq;
      exports.i64_lt = i64_lt;
      exports.i64_gt = i64_gt;
      exports.i64_le = i64_le;
      exports.i64_ge = i64_ge;
      exports.i64_min = i64_min;
      exports.i64_max = i64_max;
    }
  });

  // node_modules/rescript/lib/js/js_int.js
  var require_js_int = __commonJS({
    "node_modules/rescript/lib/js/js_int.js"(exports) {
      "use strict";
      function equal(x, y) {
        return x === y;
      }
      var max = 2147483647;
      var min = -2147483648;
      exports.equal = equal;
      exports.max = max;
      exports.min = min;
    }
  });

  // node_modules/rescript/lib/js/js_math.js
  var require_js_math = __commonJS({
    "node_modules/rescript/lib/js/js_math.js"(exports) {
      "use strict";
      var Js_int = require_js_int();
      function unsafe_ceil(prim) {
        return Math.ceil(prim);
      }
      function ceil_int(f) {
        if (f > Js_int.max) {
          return Js_int.max;
        } else if (f < Js_int.min) {
          return Js_int.min;
        } else {
          return Math.ceil(f);
        }
      }
      function unsafe_floor(prim) {
        return Math.floor(prim);
      }
      function floor_int(f) {
        if (f > Js_int.max) {
          return Js_int.max;
        } else if (f < Js_int.min) {
          return Js_int.min;
        } else {
          return Math.floor(f);
        }
      }
      function random_int(min, max) {
        return floor_int(Math.random() * (max - min | 0)) + min | 0;
      }
      var ceil = ceil_int;
      var floor = floor_int;
      exports.unsafe_ceil = unsafe_ceil;
      exports.ceil_int = ceil_int;
      exports.ceil = ceil;
      exports.unsafe_floor = unsafe_floor;
      exports.floor_int = floor_int;
      exports.floor = floor;
      exports.random_int = random_int;
    }
  });

  // node_modules/rescript/lib/js/caml_option.js
  var require_caml_option = __commonJS({
    "node_modules/rescript/lib/js/caml_option.js"(exports) {
      "use strict";
      function isNested(x) {
        return x.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
      }
      function some(x) {
        if (x === void 0) {
          return {
            BS_PRIVATE_NESTED_SOME_NONE: 0
          };
        } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return {
            BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
          };
        } else {
          return x;
        }
      }
      function nullable_to_opt(x) {
        if (x == null) {
          return;
        } else {
          return some(x);
        }
      }
      function undefined_to_opt(x) {
        if (x === void 0) {
          return;
        } else {
          return some(x);
        }
      }
      function null_to_opt(x) {
        if (x === null) {
          return;
        } else {
          return some(x);
        }
      }
      function valFromOption(x) {
        if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
          return x;
        }
        var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
        if (depth === 0) {
          return;
        } else {
          return {
            BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
          };
        }
      }
      function option_get(x) {
        if (x === void 0) {
          return;
        } else {
          return valFromOption(x);
        }
      }
      function option_unwrap(x) {
        if (x !== void 0) {
          return x.VAL;
        } else {
          return x;
        }
      }
      exports.nullable_to_opt = nullable_to_opt;
      exports.undefined_to_opt = undefined_to_opt;
      exports.null_to_opt = null_to_opt;
      exports.valFromOption = valFromOption;
      exports.some = some;
      exports.isNested = isNested;
      exports.option_get = option_get;
      exports.option_unwrap = option_unwrap;
    }
  });

  // node_modules/rescript/lib/js/belt_Array.js
  var require_belt_Array = __commonJS({
    "node_modules/rescript/lib/js/belt_Array.js"(exports) {
      "use strict";
      var Caml = require_caml();
      var Curry = require_curry();
      var Js_math = require_js_math();
      var Caml_option = require_caml_option();
      function get(arr, i) {
        if (i >= 0 && i < arr.length) {
          return Caml_option.some(arr[i]);
        }
      }
      function getExn(arr, i) {
        if (!(i >= 0 && i < arr.length)) {
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "belt_Array.ml",
              35,
              2
            ],
            Error: new Error()
          };
        }
        return arr[i];
      }
      function set(arr, i, v) {
        if (i >= 0 && i < arr.length) {
          arr[i] = v;
          return true;
        } else {
          return false;
        }
      }
      function setExn(arr, i, v) {
        if (!(i >= 0 && i < arr.length)) {
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "belt_Array.ml",
              45,
              2
            ],
            Error: new Error()
          };
        }
        arr[i] = v;
      }
      function swapUnsafe(xs, i, j) {
        var tmp = xs[i];
        xs[i] = xs[j];
        xs[j] = tmp;
      }
      function shuffleInPlace(xs) {
        var len = xs.length;
        for (var i = 0; i < len; ++i) {
          swapUnsafe(xs, i, Js_math.random_int(i, len));
        }
      }
      function shuffle(xs) {
        var result = xs.slice(0);
        shuffleInPlace(result);
        return result;
      }
      function reverseInPlace(xs) {
        var len = xs.length;
        var ofs = 0;
        for (var i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
          swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
        }
      }
      function reverse(xs) {
        var len = xs.length;
        var result = new Array(len);
        for (var i = 0; i < len; ++i) {
          result[i] = xs[(len - 1 | 0) - i | 0];
        }
        return result;
      }
      function make(l, f) {
        if (l <= 0) {
          return [];
        }
        var res = new Array(l);
        for (var i = 0; i < l; ++i) {
          res[i] = f;
        }
        return res;
      }
      function makeByU(l, f) {
        if (l <= 0) {
          return [];
        }
        var res = new Array(l);
        for (var i = 0; i < l; ++i) {
          res[i] = f(i);
        }
        return res;
      }
      function makeBy(l, f) {
        return makeByU(l, Curry.__1(f));
      }
      function makeByAndShuffleU(l, f) {
        var u = makeByU(l, f);
        shuffleInPlace(u);
        return u;
      }
      function makeByAndShuffle(l, f) {
        return makeByAndShuffleU(l, Curry.__1(f));
      }
      function range(start, finish) {
        var cut = finish - start | 0;
        if (cut < 0) {
          return [];
        }
        var arr = new Array(cut + 1 | 0);
        for (var i = 0; i <= cut; ++i) {
          arr[i] = start + i | 0;
        }
        return arr;
      }
      function rangeBy(start, finish, step) {
        var cut = finish - start | 0;
        if (cut < 0 || step <= 0) {
          return [];
        }
        var nb = (cut / step | 0) + 1 | 0;
        var arr = new Array(nb);
        var cur = start;
        for (var i = 0; i < nb; ++i) {
          arr[i] = cur;
          cur = cur + step | 0;
        }
        return arr;
      }
      function zip(xs, ys) {
        var lenx = xs.length;
        var leny = ys.length;
        var len = lenx < leny ? lenx : leny;
        var s = new Array(len);
        for (var i = 0; i < len; ++i) {
          s[i] = [
            xs[i],
            ys[i]
          ];
        }
        return s;
      }
      function zipByU(xs, ys, f) {
        var lenx = xs.length;
        var leny = ys.length;
        var len = lenx < leny ? lenx : leny;
        var s = new Array(len);
        for (var i = 0; i < len; ++i) {
          s[i] = f(xs[i], ys[i]);
        }
        return s;
      }
      function zipBy(xs, ys, f) {
        return zipByU(xs, ys, Curry.__2(f));
      }
      function concat(a1, a2) {
        var l1 = a1.length;
        var l2 = a2.length;
        var a1a2 = new Array(l1 + l2 | 0);
        for (var i = 0; i < l1; ++i) {
          a1a2[i] = a1[i];
        }
        for (var i$1 = 0; i$1 < l2; ++i$1) {
          a1a2[l1 + i$1 | 0] = a2[i$1];
        }
        return a1a2;
      }
      function concatMany(arrs) {
        var lenArrs = arrs.length;
        var totalLen = 0;
        for (var i = 0; i < lenArrs; ++i) {
          totalLen = totalLen + arrs[i].length | 0;
        }
        var result = new Array(totalLen);
        totalLen = 0;
        for (var j = 0; j < lenArrs; ++j) {
          var cur = arrs[j];
          for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
            result[totalLen] = cur[k];
            totalLen = totalLen + 1 | 0;
          }
        }
        return result;
      }
      function slice(a, offset, len) {
        if (len <= 0) {
          return [];
        }
        var lena = a.length;
        var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
        var hasLen = lena - ofs | 0;
        var copyLength = hasLen < len ? hasLen : len;
        if (copyLength <= 0) {
          return [];
        }
        var result = new Array(copyLength);
        for (var i = 0; i < copyLength; ++i) {
          result[i] = a[ofs + i | 0];
        }
        return result;
      }
      function sliceToEnd(a, offset) {
        var lena = a.length;
        var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
        var len = lena > ofs ? lena - ofs | 0 : 0;
        var result = new Array(len);
        for (var i = 0; i < len; ++i) {
          result[i] = a[ofs + i | 0];
        }
        return result;
      }
      function fill(a, offset, len, v) {
        if (len <= 0) {
          return;
        }
        var lena = a.length;
        var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
        var hasLen = lena - ofs | 0;
        var fillLength = hasLen < len ? hasLen : len;
        if (fillLength <= 0) {
          return;
        }
        for (var i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
          a[i] = v;
        }
      }
      function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
        if (srcofs2 <= srcofs1) {
          for (var j = 0; j < blitLength; ++j) {
            a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
          }
          return;
        }
        for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
          a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
        }
      }
      function blit(a1, ofs1, a2, ofs2, len) {
        var lena1 = a1.length;
        var lena2 = a2.length;
        var srcofs1 = ofs1 < 0 ? Caml.int_max(lena1 + ofs1 | 0, 0) : ofs1;
        var srcofs2 = ofs2 < 0 ? Caml.int_max(lena2 + ofs2 | 0, 0) : ofs2;
        var blitLength = Caml.int_min(len, Caml.int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
        if (srcofs2 <= srcofs1) {
          for (var j = 0; j < blitLength; ++j) {
            a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
          }
          return;
        }
        for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
          a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
        }
      }
      function forEachU(a, f) {
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          f(a[i]);
        }
      }
      function forEach(a, f) {
        forEachU(a, Curry.__1(f));
      }
      function mapU(a, f) {
        var l = a.length;
        var r = new Array(l);
        for (var i = 0; i < l; ++i) {
          r[i] = f(a[i]);
        }
        return r;
      }
      function map(a, f) {
        return mapU(a, Curry.__1(f));
      }
      function flatMapU(a, f) {
        return concatMany(mapU(a, f));
      }
      function flatMap(a, f) {
        return concatMany(mapU(a, Curry.__1(f)));
      }
      function getByU(a, p) {
        var l = a.length;
        var i = 0;
        var r;
        while (r === void 0 && i < l) {
          var v = a[i];
          if (p(v)) {
            r = Caml_option.some(v);
          }
          i = i + 1 | 0;
        }
        ;
        return r;
      }
      function getBy(a, p) {
        return getByU(a, Curry.__1(p));
      }
      function getIndexByU(a, p) {
        var l = a.length;
        var i = 0;
        var r;
        while (r === void 0 && i < l) {
          var v = a[i];
          if (p(v)) {
            r = i;
          }
          i = i + 1 | 0;
        }
        ;
        return r;
      }
      function getIndexBy(a, p) {
        return getIndexByU(a, Curry.__1(p));
      }
      function keepU(a, f) {
        var l = a.length;
        var r = new Array(l);
        var j = 0;
        for (var i = 0; i < l; ++i) {
          var v = a[i];
          if (f(v)) {
            r[j] = v;
            j = j + 1 | 0;
          }
        }
        r.length = j;
        return r;
      }
      function keep(a, f) {
        return keepU(a, Curry.__1(f));
      }
      function keepWithIndexU(a, f) {
        var l = a.length;
        var r = new Array(l);
        var j = 0;
        for (var i = 0; i < l; ++i) {
          var v = a[i];
          if (f(v, i)) {
            r[j] = v;
            j = j + 1 | 0;
          }
        }
        r.length = j;
        return r;
      }
      function keepWithIndex(a, f) {
        return keepWithIndexU(a, Curry.__2(f));
      }
      function keepMapU(a, f) {
        var l = a.length;
        var r = new Array(l);
        var j = 0;
        for (var i = 0; i < l; ++i) {
          var v = a[i];
          var v$1 = f(v);
          if (v$1 !== void 0) {
            r[j] = Caml_option.valFromOption(v$1);
            j = j + 1 | 0;
          }
        }
        r.length = j;
        return r;
      }
      function keepMap(a, f) {
        return keepMapU(a, Curry.__1(f));
      }
      function forEachWithIndexU(a, f) {
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          f(i, a[i]);
        }
      }
      function forEachWithIndex(a, f) {
        forEachWithIndexU(a, Curry.__2(f));
      }
      function mapWithIndexU(a, f) {
        var l = a.length;
        var r = new Array(l);
        for (var i = 0; i < l; ++i) {
          r[i] = f(i, a[i]);
        }
        return r;
      }
      function mapWithIndex(a, f) {
        return mapWithIndexU(a, Curry.__2(f));
      }
      function reduceU(a, x, f) {
        var r = x;
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          r = f(r, a[i]);
        }
        return r;
      }
      function reduce(a, x, f) {
        return reduceU(a, x, Curry.__2(f));
      }
      function reduceReverseU(a, x, f) {
        var r = x;
        for (var i = a.length - 1 | 0; i >= 0; --i) {
          r = f(r, a[i]);
        }
        return r;
      }
      function reduceReverse(a, x, f) {
        return reduceReverseU(a, x, Curry.__2(f));
      }
      function reduceReverse2U(a, b, x, f) {
        var r = x;
        var len = Caml.int_min(a.length, b.length);
        for (var i = len - 1 | 0; i >= 0; --i) {
          r = f(r, a[i], b[i]);
        }
        return r;
      }
      function reduceReverse2(a, b, x, f) {
        return reduceReverse2U(a, b, x, Curry.__3(f));
      }
      function reduceWithIndexU(a, x, f) {
        var r = x;
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          r = f(r, a[i], i);
        }
        return r;
      }
      function reduceWithIndex(a, x, f) {
        return reduceWithIndexU(a, x, Curry.__3(f));
      }
      function everyU(arr, b) {
        var len = arr.length;
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === len) {
            return true;
          }
          if (!b(arr[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function every(arr, f) {
        return everyU(arr, Curry.__1(f));
      }
      function someU(arr, b) {
        var len = arr.length;
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === len) {
            return false;
          }
          if (b(arr[i])) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function some(arr, f) {
        return someU(arr, Curry.__1(f));
      }
      function everyAux2(arr1, arr2, _i, b, len) {
        while (true) {
          var i = _i;
          if (i === len) {
            return true;
          }
          if (!b(arr1[i], arr2[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function every2U(a, b, p) {
        return everyAux2(a, b, 0, p, Caml.int_min(a.length, b.length));
      }
      function every2(a, b, p) {
        return every2U(a, b, Curry.__2(p));
      }
      function some2U(a, b, p) {
        var _i = 0;
        var len = Caml.int_min(a.length, b.length);
        while (true) {
          var i = _i;
          if (i === len) {
            return false;
          }
          if (p(a[i], b[i])) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function some2(a, b, p) {
        return some2U(a, b, Curry.__2(p));
      }
      function eqU(a, b, p) {
        var lena = a.length;
        var lenb = b.length;
        if (lena === lenb) {
          return everyAux2(a, b, 0, p, lena);
        } else {
          return false;
        }
      }
      function eq(a, b, p) {
        return eqU(a, b, Curry.__2(p));
      }
      function cmpU(a, b, p) {
        var lena = a.length;
        var lenb = b.length;
        if (lena > lenb) {
          return 1;
        } else if (lena < lenb) {
          return -1;
        } else {
          var _i = 0;
          while (true) {
            var i = _i;
            if (i === lena) {
              return 0;
            }
            var c = p(a[i], b[i]);
            if (c !== 0) {
              return c;
            }
            _i = i + 1 | 0;
            continue;
          }
          ;
        }
      }
      function cmp(a, b, p) {
        return cmpU(a, b, Curry.__2(p));
      }
      function partitionU(a, f) {
        var l = a.length;
        var i = 0;
        var j = 0;
        var a1 = new Array(l);
        var a2 = new Array(l);
        for (var ii = 0; ii < l; ++ii) {
          var v = a[ii];
          if (f(v)) {
            a1[i] = v;
            i = i + 1 | 0;
          } else {
            a2[j] = v;
            j = j + 1 | 0;
          }
        }
        a1.length = i;
        a2.length = j;
        return [
          a1,
          a2
        ];
      }
      function partition(a, f) {
        return partitionU(a, Curry.__1(f));
      }
      function unzip(a) {
        var l = a.length;
        var a1 = new Array(l);
        var a2 = new Array(l);
        for (var i = 0; i < l; ++i) {
          var match = a[i];
          a1[i] = match[0];
          a2[i] = match[1];
        }
        return [
          a1,
          a2
        ];
      }
      function joinWithU(a, sep, toString) {
        var l = a.length;
        if (l === 0) {
          return "";
        }
        var lastIndex = l - 1 | 0;
        var _i = 0;
        var _res = "";
        while (true) {
          var res = _res;
          var i = _i;
          if (i === lastIndex) {
            return res + toString(a[i]);
          }
          _res = res + (toString(a[i]) + sep);
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function joinWith(a, sep, toString) {
        return joinWithU(a, sep, Curry.__1(toString));
      }
      function initU(n, f) {
        var v = new Array(n);
        for (var i = 0; i < n; ++i) {
          v[i] = f(i);
        }
        return v;
      }
      function init2(n, f) {
        return initU(n, Curry.__1(f));
      }
      exports.get = get;
      exports.getExn = getExn;
      exports.set = set;
      exports.setExn = setExn;
      exports.shuffleInPlace = shuffleInPlace;
      exports.shuffle = shuffle;
      exports.reverseInPlace = reverseInPlace;
      exports.reverse = reverse;
      exports.make = make;
      exports.range = range;
      exports.rangeBy = rangeBy;
      exports.makeByU = makeByU;
      exports.makeBy = makeBy;
      exports.makeByAndShuffleU = makeByAndShuffleU;
      exports.makeByAndShuffle = makeByAndShuffle;
      exports.zip = zip;
      exports.zipByU = zipByU;
      exports.zipBy = zipBy;
      exports.unzip = unzip;
      exports.concat = concat;
      exports.concatMany = concatMany;
      exports.slice = slice;
      exports.sliceToEnd = sliceToEnd;
      exports.fill = fill;
      exports.blit = blit;
      exports.blitUnsafe = blitUnsafe;
      exports.forEachU = forEachU;
      exports.forEach = forEach;
      exports.mapU = mapU;
      exports.map = map;
      exports.flatMapU = flatMapU;
      exports.flatMap = flatMap;
      exports.getByU = getByU;
      exports.getBy = getBy;
      exports.getIndexByU = getIndexByU;
      exports.getIndexBy = getIndexBy;
      exports.keepU = keepU;
      exports.keep = keep;
      exports.keepWithIndexU = keepWithIndexU;
      exports.keepWithIndex = keepWithIndex;
      exports.keepMapU = keepMapU;
      exports.keepMap = keepMap;
      exports.forEachWithIndexU = forEachWithIndexU;
      exports.forEachWithIndex = forEachWithIndex;
      exports.mapWithIndexU = mapWithIndexU;
      exports.mapWithIndex = mapWithIndex;
      exports.partitionU = partitionU;
      exports.partition = partition;
      exports.reduceU = reduceU;
      exports.reduce = reduce;
      exports.reduceReverseU = reduceReverseU;
      exports.reduceReverse = reduceReverse;
      exports.reduceReverse2U = reduceReverse2U;
      exports.reduceReverse2 = reduceReverse2;
      exports.reduceWithIndexU = reduceWithIndexU;
      exports.reduceWithIndex = reduceWithIndex;
      exports.joinWithU = joinWithU;
      exports.joinWith = joinWith;
      exports.someU = someU;
      exports.some = some;
      exports.everyU = everyU;
      exports.every = every;
      exports.every2U = every2U;
      exports.every2 = every2;
      exports.some2U = some2U;
      exports.some2 = some2;
      exports.cmpU = cmpU;
      exports.cmp = cmp;
      exports.eqU = eqU;
      exports.eq = eq;
      exports.initU = initU;
      exports.init = init2;
    }
  });

  // node_modules/rescript/lib/js/belt_SortArray.js
  var require_belt_SortArray = __commonJS({
    "node_modules/rescript/lib/js/belt_SortArray.js"(exports) {
      "use strict";
      var Curry = require_curry();
      var Belt_Array = require_belt_Array();
      function sortedLengthAuxMore(xs, _prec, _acc, len, lt) {
        while (true) {
          var acc = _acc;
          var prec = _prec;
          if (acc >= len) {
            return acc;
          }
          var v = xs[acc];
          if (!lt(v, prec)) {
            return acc;
          }
          _acc = acc + 1 | 0;
          _prec = v;
          continue;
        }
        ;
      }
      function strictlySortedLengthU(xs, lt) {
        var len = xs.length;
        if (len === 0 || len === 1) {
          return len;
        }
        var x0 = xs[0];
        var x1 = xs[1];
        if (lt(x0, x1)) {
          var _prec = x1;
          var _acc = 2;
          while (true) {
            var acc = _acc;
            var prec = _prec;
            if (acc >= len) {
              return acc;
            }
            var v = xs[acc];
            if (!lt(prec, v)) {
              return acc;
            }
            _acc = acc + 1 | 0;
            _prec = v;
            continue;
          }
          ;
        } else if (lt(x1, x0)) {
          return -sortedLengthAuxMore(xs, x1, 2, len, lt) | 0;
        } else {
          return 1;
        }
      }
      function strictlySortedLength(xs, lt) {
        return strictlySortedLengthU(xs, Curry.__2(lt));
      }
      function isSortedU(a, cmp) {
        var len = a.length;
        if (len === 0) {
          return true;
        } else {
          var _i = 0;
          var last_bound = len - 1 | 0;
          while (true) {
            var i = _i;
            if (i === last_bound) {
              return true;
            }
            if (cmp(a[i], a[i + 1 | 0]) > 0) {
              return false;
            }
            _i = i + 1 | 0;
            continue;
          }
          ;
        }
      }
      function isSorted(a, cmp) {
        return isSortedU(a, Curry.__2(cmp));
      }
      function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        var src1r = src1ofs + src1len | 0;
        var src2r = src2ofs + src2len | 0;
        var _i1 = src1ofs;
        var _s1 = src[src1ofs];
        var _i2 = src2ofs;
        var _s2 = src2[src2ofs];
        var _d = dstofs;
        while (true) {
          var d = _d;
          var s2 = _s2;
          var i2 = _i2;
          var s1 = _s1;
          var i1 = _i1;
          if (cmp(s1, s2) <= 0) {
            dst[d] = s1;
            var i1$1 = i1 + 1 | 0;
            if (i1$1 >= src1r) {
              return Belt_Array.blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
            }
            _d = d + 1 | 0;
            _s1 = src[i1$1];
            _i1 = i1$1;
            continue;
          }
          dst[d] = s2;
          var i2$1 = i2 + 1 | 0;
          if (i2$1 >= src2r) {
            return Belt_Array.blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
          }
          _d = d + 1 | 0;
          _s2 = src2[i2$1];
          _i2 = i2$1;
          continue;
        }
        ;
      }
      function unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        var src1r = src1ofs + src1len | 0;
        var src2r = src2ofs + src2len | 0;
        var _i1 = src1ofs;
        var _s1 = src[src1ofs];
        var _i2 = src2ofs;
        var _s2 = src2[src2ofs];
        var _d = dstofs;
        while (true) {
          var d = _d;
          var s2 = _s2;
          var i2 = _i2;
          var s1 = _s1;
          var i1 = _i1;
          var c = cmp(s1, s2);
          if (c < 0) {
            dst[d] = s1;
            var i1$1 = i1 + 1 | 0;
            var d$1 = d + 1 | 0;
            if (i1$1 < src1r) {
              _d = d$1;
              _s1 = src[i1$1];
              _i1 = i1$1;
              continue;
            }
            Belt_Array.blitUnsafe(src2, i2, dst, d$1, src2r - i2 | 0);
            return (d$1 + src2r | 0) - i2 | 0;
          }
          if (c === 0) {
            dst[d] = s1;
            var i1$2 = i1 + 1 | 0;
            var i2$1 = i2 + 1 | 0;
            var d$2 = d + 1 | 0;
            if (!(i1$2 < src1r && i2$1 < src2r)) {
              if (i1$2 === src1r) {
                Belt_Array.blitUnsafe(src2, i2$1, dst, d$2, src2r - i2$1 | 0);
                return (d$2 + src2r | 0) - i2$1 | 0;
              } else {
                Belt_Array.blitUnsafe(src, i1$2, dst, d$2, src1r - i1$2 | 0);
                return (d$2 + src1r | 0) - i1$2 | 0;
              }
            }
            _d = d$2;
            _s2 = src2[i2$1];
            _i2 = i2$1;
            _s1 = src[i1$2];
            _i1 = i1$2;
            continue;
          }
          dst[d] = s2;
          var i2$2 = i2 + 1 | 0;
          var d$3 = d + 1 | 0;
          if (i2$2 < src2r) {
            _d = d$3;
            _s2 = src2[i2$2];
            _i2 = i2$2;
            continue;
          }
          Belt_Array.blitUnsafe(src, i1, dst, d$3, src1r - i1 | 0);
          return (d$3 + src1r | 0) - i1 | 0;
        }
        ;
      }
      function union(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        return unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
      }
      function intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        var src1r = src1ofs + src1len | 0;
        var src2r = src2ofs + src2len | 0;
        var _i1 = src1ofs;
        var _s1 = src[src1ofs];
        var _i2 = src2ofs;
        var _s2 = src2[src2ofs];
        var _d = dstofs;
        while (true) {
          var d = _d;
          var s2 = _s2;
          var i2 = _i2;
          var s1 = _s1;
          var i1 = _i1;
          var c = cmp(s1, s2);
          if (c < 0) {
            var i1$1 = i1 + 1 | 0;
            if (i1$1 >= src1r) {
              return d;
            }
            _s1 = src[i1$1];
            _i1 = i1$1;
            continue;
          }
          if (c === 0) {
            dst[d] = s1;
            var i1$2 = i1 + 1 | 0;
            var i2$1 = i2 + 1 | 0;
            var d$1 = d + 1 | 0;
            if (!(i1$2 < src1r && i2$1 < src2r)) {
              return d$1;
            }
            _d = d$1;
            _s2 = src2[i2$1];
            _i2 = i2$1;
            _s1 = src[i1$2];
            _i1 = i1$2;
            continue;
          }
          var i2$2 = i2 + 1 | 0;
          if (i2$2 >= src2r) {
            return d;
          }
          _s2 = src2[i2$2];
          _i2 = i2$2;
          continue;
        }
        ;
      }
      function intersect(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        return intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
      }
      function diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        var src1r = src1ofs + src1len | 0;
        var src2r = src2ofs + src2len | 0;
        var _i1 = src1ofs;
        var _s1 = src[src1ofs];
        var _i2 = src2ofs;
        var _s2 = src2[src2ofs];
        var _d = dstofs;
        while (true) {
          var d = _d;
          var s2 = _s2;
          var i2 = _i2;
          var s1 = _s1;
          var i1 = _i1;
          var c = cmp(s1, s2);
          if (c < 0) {
            dst[d] = s1;
            var d$1 = d + 1 | 0;
            var i1$1 = i1 + 1 | 0;
            if (i1$1 >= src1r) {
              return d$1;
            }
            _d = d$1;
            _s1 = src[i1$1];
            _i1 = i1$1;
            continue;
          }
          if (c === 0) {
            var i1$2 = i1 + 1 | 0;
            var i2$1 = i2 + 1 | 0;
            if (!(i1$2 < src1r && i2$1 < src2r)) {
              if (i1$2 === src1r) {
                return d;
              } else {
                Belt_Array.blitUnsafe(src, i1$2, dst, d, src1r - i1$2 | 0);
                return (d + src1r | 0) - i1$2 | 0;
              }
            }
            _s2 = src2[i2$1];
            _i2 = i2$1;
            _s1 = src[i1$2];
            _i1 = i1$2;
            continue;
          }
          var i2$2 = i2 + 1 | 0;
          if (i2$2 < src2r) {
            _s2 = src2[i2$2];
            _i2 = i2$2;
            continue;
          }
          Belt_Array.blitUnsafe(src, i1, dst, d, src1r - i1 | 0);
          return (d + src1r | 0) - i1 | 0;
        }
        ;
      }
      function diff(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
        return diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
      }
      function insertionSort(src, srcofs, dst, dstofs, len, cmp) {
        for (var i = 0; i < len; ++i) {
          var e = src[srcofs + i | 0];
          var j = (dstofs + i | 0) - 1 | 0;
          while (j >= dstofs && cmp(dst[j], e) > 0) {
            dst[j + 1 | 0] = dst[j];
            j = j - 1 | 0;
          }
          ;
          dst[j + 1 | 0] = e;
        }
      }
      function sortTo(src, srcofs, dst, dstofs, len, cmp) {
        if (len <= 5) {
          return insertionSort(src, srcofs, dst, dstofs, len, cmp);
        }
        var l1 = len / 2 | 0;
        var l2 = len - l1 | 0;
        sortTo(src, srcofs + l1 | 0, dst, dstofs + l1 | 0, l2, cmp);
        sortTo(src, srcofs, src, srcofs + l2 | 0, l1, cmp);
        merge(src, srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs, cmp);
      }
      function stableSortInPlaceByU(a, cmp) {
        var l = a.length;
        if (l <= 5) {
          return insertionSort(a, 0, a, 0, l, cmp);
        }
        var l1 = l / 2 | 0;
        var l2 = l - l1 | 0;
        var t = new Array(l2);
        sortTo(a, l1, t, 0, l2, cmp);
        sortTo(a, 0, a, l2, l1, cmp);
        merge(a, l2, l1, t, 0, l2, a, 0, cmp);
      }
      function stableSortInPlaceBy(a, cmp) {
        stableSortInPlaceByU(a, Curry.__2(cmp));
      }
      function stableSortByU(a, cmp) {
        var b = a.slice(0);
        stableSortInPlaceByU(b, cmp);
        return b;
      }
      function stableSortBy(a, cmp) {
        return stableSortByU(a, Curry.__2(cmp));
      }
      function binarySearchByU(sorted, key, cmp) {
        var len = sorted.length;
        if (len === 0) {
          return -1;
        }
        var lo = sorted[0];
        var c = cmp(key, lo);
        if (c < 0) {
          return -1;
        }
        var hi = sorted[len - 1 | 0];
        var c2 = cmp(key, hi);
        if (c2 > 0) {
          return -(len + 1 | 0) | 0;
        } else {
          var _lo = 0;
          var _hi = len - 1 | 0;
          while (true) {
            var hi$1 = _hi;
            var lo$1 = _lo;
            var mid = (lo$1 + hi$1 | 0) / 2 | 0;
            var midVal = sorted[mid];
            var c$1 = cmp(key, midVal);
            if (c$1 === 0) {
              return mid;
            }
            if (c$1 < 0) {
              if (hi$1 === mid) {
                if (cmp(sorted[lo$1], key) === 0) {
                  return lo$1;
                } else {
                  return -(hi$1 + 1 | 0) | 0;
                }
              }
              _hi = mid;
              continue;
            }
            if (lo$1 === mid) {
              if (cmp(sorted[hi$1], key) === 0) {
                return hi$1;
              } else {
                return -(hi$1 + 1 | 0) | 0;
              }
            }
            _lo = mid;
            continue;
          }
          ;
        }
      }
      function binarySearchBy(sorted, key, cmp) {
        return binarySearchByU(sorted, key, Curry.__2(cmp));
      }
      var Int;
      var $$String;
      exports.Int = Int;
      exports.$$String = $$String;
      exports.strictlySortedLengthU = strictlySortedLengthU;
      exports.strictlySortedLength = strictlySortedLength;
      exports.isSortedU = isSortedU;
      exports.isSorted = isSorted;
      exports.stableSortInPlaceByU = stableSortInPlaceByU;
      exports.stableSortInPlaceBy = stableSortInPlaceBy;
      exports.stableSortByU = stableSortByU;
      exports.stableSortBy = stableSortBy;
      exports.binarySearchByU = binarySearchByU;
      exports.binarySearchBy = binarySearchBy;
      exports.unionU = unionU;
      exports.union = union;
      exports.intersectU = intersectU;
      exports.intersect = intersect;
      exports.diffU = diffU;
      exports.diff = diff;
    }
  });

  // node_modules/rescript/lib/js/belt_List.js
  var require_belt_List = __commonJS({
    "node_modules/rescript/lib/js/belt_List.js"(exports) {
      "use strict";
      var Curry = require_curry();
      var Belt_Array = require_belt_Array();
      var Caml_option = require_caml_option();
      var Belt_SortArray = require_belt_SortArray();
      function head(x) {
        if (x) {
          return Caml_option.some(x.hd);
        }
      }
      function headExn(x) {
        if (x) {
          return x.hd;
        }
        throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
      }
      function tail(x) {
        if (x) {
          return x.tl;
        }
      }
      function tailExn(x) {
        if (x) {
          return x.tl;
        }
        throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
      }
      function add(xs, x) {
        return {
          hd: x,
          tl: xs
        };
      }
      function get(x, n) {
        if (n < 0) {
          return;
        } else {
          var _x = x;
          var _n = n;
          while (true) {
            var n$1 = _n;
            var x$1 = _x;
            if (!x$1) {
              return;
            }
            if (n$1 === 0) {
              return Caml_option.some(x$1.hd);
            }
            _n = n$1 - 1 | 0;
            _x = x$1.tl;
            continue;
          }
          ;
        }
      }
      function getExn(x, n) {
        if (n < 0) {
          throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
        }
        var _x = x;
        var _n = n;
        while (true) {
          var n$1 = _n;
          var x$1 = _x;
          if (x$1) {
            if (n$1 === 0) {
              return x$1.hd;
            }
            _n = n$1 - 1 | 0;
            _x = x$1.tl;
            continue;
          }
          throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
        }
        ;
      }
      function partitionAux(p, _cell, _precX, _precY) {
        while (true) {
          var precY = _precY;
          var precX = _precX;
          var cell = _cell;
          if (!cell) {
            return;
          }
          var t = cell.tl;
          var h = cell.hd;
          var next = {
            hd: h,
            tl: 0
          };
          if (p(h)) {
            precX.tl = next;
            _precX = next;
            _cell = t;
            continue;
          }
          precY.tl = next;
          _precY = next;
          _cell = t;
          continue;
        }
        ;
      }
      function splitAux(_cell, _precX, _precY) {
        while (true) {
          var precY = _precY;
          var precX = _precX;
          var cell = _cell;
          if (!cell) {
            return;
          }
          var match = cell.hd;
          var nextA = {
            hd: match[0],
            tl: 0
          };
          var nextB = {
            hd: match[1],
            tl: 0
          };
          precX.tl = nextA;
          precY.tl = nextB;
          _precY = nextB;
          _precX = nextA;
          _cell = cell.tl;
          continue;
        }
        ;
      }
      function copyAuxCont(_cellX, _prec) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return prec;
          }
          var next = {
            hd: cellX.hd,
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellX = cellX.tl;
          continue;
        }
        ;
      }
      function copyAuxWitFilter(f, _cellX, _prec) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return;
          }
          var t = cellX.tl;
          var h = cellX.hd;
          if (f(h)) {
            var next = {
              hd: h,
              tl: 0
            };
            prec.tl = next;
            _prec = next;
            _cellX = t;
            continue;
          }
          _cellX = t;
          continue;
        }
        ;
      }
      function copyAuxWithFilterIndex(f, _cellX, _prec, _i) {
        while (true) {
          var i = _i;
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return;
          }
          var t = cellX.tl;
          var h = cellX.hd;
          if (f(h, i)) {
            var next = {
              hd: h,
              tl: 0
            };
            prec.tl = next;
            _i = i + 1 | 0;
            _prec = next;
            _cellX = t;
            continue;
          }
          _i = i + 1 | 0;
          _cellX = t;
          continue;
        }
        ;
      }
      function copyAuxWitFilterMap(f, _cellX, _prec) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return;
          }
          var t = cellX.tl;
          var h = f(cellX.hd);
          if (h !== void 0) {
            var next = {
              hd: Caml_option.valFromOption(h),
              tl: 0
            };
            prec.tl = next;
            _prec = next;
            _cellX = t;
            continue;
          }
          _cellX = t;
          continue;
        }
        ;
      }
      function removeAssocAuxWithMap(_cellX, x, _prec, f) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return false;
          }
          var t = cellX.tl;
          var h = cellX.hd;
          if (f(h[0], x)) {
            prec.tl = t;
            return true;
          }
          var next = {
            hd: h,
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellX = t;
          continue;
        }
        ;
      }
      function setAssocAuxWithMap(_cellX, x, k, _prec, eq2) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return false;
          }
          var t = cellX.tl;
          var h = cellX.hd;
          if (eq2(h[0], x)) {
            prec.tl = {
              hd: [
                x,
                k
              ],
              tl: t
            };
            return true;
          }
          var next = {
            hd: h,
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellX = t;
          continue;
        }
        ;
      }
      function copyAuxWithMap(_cellX, _prec, f) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          if (!cellX) {
            return;
          }
          var next = {
            hd: f(cellX.hd),
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellX = cellX.tl;
          continue;
        }
        ;
      }
      function zipAux(_cellX, _cellY, _prec) {
        while (true) {
          var prec = _prec;
          var cellY = _cellY;
          var cellX = _cellX;
          if (!cellX) {
            return;
          }
          if (!cellY) {
            return;
          }
          var next = {
            hd: [
              cellX.hd,
              cellY.hd
            ],
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellY = cellY.tl;
          _cellX = cellX.tl;
          continue;
        }
        ;
      }
      function copyAuxWithMap2(f, _cellX, _cellY, _prec) {
        while (true) {
          var prec = _prec;
          var cellY = _cellY;
          var cellX = _cellX;
          if (!cellX) {
            return;
          }
          if (!cellY) {
            return;
          }
          var next = {
            hd: f(cellX.hd, cellY.hd),
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellY = cellY.tl;
          _cellX = cellX.tl;
          continue;
        }
        ;
      }
      function copyAuxWithMapI(f, _i, _cellX, _prec) {
        while (true) {
          var prec = _prec;
          var cellX = _cellX;
          var i = _i;
          if (!cellX) {
            return;
          }
          var next = {
            hd: f(i, cellX.hd),
            tl: 0
          };
          prec.tl = next;
          _prec = next;
          _cellX = cellX.tl;
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function takeAux(_n, _cell, _prec) {
        while (true) {
          var prec = _prec;
          var cell = _cell;
          var n = _n;
          if (n === 0) {
            return true;
          }
          if (!cell) {
            return false;
          }
          var cell$1 = {
            hd: cell.hd,
            tl: 0
          };
          prec.tl = cell$1;
          _prec = cell$1;
          _cell = cell.tl;
          _n = n - 1 | 0;
          continue;
        }
        ;
      }
      function splitAtAux(_n, _cell, _prec) {
        while (true) {
          var prec = _prec;
          var cell = _cell;
          var n = _n;
          if (n === 0) {
            return cell;
          }
          if (!cell) {
            return;
          }
          var cell$1 = {
            hd: cell.hd,
            tl: 0
          };
          prec.tl = cell$1;
          _prec = cell$1;
          _cell = cell.tl;
          _n = n - 1 | 0;
          continue;
        }
        ;
      }
      function take(lst, n) {
        if (n < 0) {
          return;
        }
        if (n === 0) {
          return 0;
        }
        if (!lst) {
          return;
        }
        var cell = {
          hd: lst.hd,
          tl: 0
        };
        var has2 = takeAux(n - 1 | 0, lst.tl, cell);
        if (has2) {
          return cell;
        }
      }
      function drop(lst, n) {
        if (n < 0) {
          return;
        } else {
          var _l = lst;
          var _n = n;
          while (true) {
            var n$1 = _n;
            var l = _l;
            if (n$1 === 0) {
              return l;
            }
            if (!l) {
              return;
            }
            _n = n$1 - 1 | 0;
            _l = l.tl;
            continue;
          }
          ;
        }
      }
      function splitAt(lst, n) {
        if (n < 0) {
          return;
        }
        if (n === 0) {
          return [
            0,
            lst
          ];
        }
        if (!lst) {
          return;
        }
        var cell = {
          hd: lst.hd,
          tl: 0
        };
        var rest = splitAtAux(n - 1 | 0, lst.tl, cell);
        if (rest !== void 0) {
          return [
            cell,
            rest
          ];
        }
      }
      function concat(xs, ys) {
        if (!xs) {
          return ys;
        }
        var cell = {
          hd: xs.hd,
          tl: 0
        };
        copyAuxCont(xs.tl, cell).tl = ys;
        return cell;
      }
      function mapU(xs, f) {
        if (!xs) {
          return 0;
        }
        var cell = {
          hd: f(xs.hd),
          tl: 0
        };
        copyAuxWithMap(xs.tl, cell, f);
        return cell;
      }
      function map(xs, f) {
        return mapU(xs, Curry.__1(f));
      }
      function zipByU(l1, l2, f) {
        if (!l1) {
          return 0;
        }
        if (!l2) {
          return 0;
        }
        var cell = {
          hd: f(l1.hd, l2.hd),
          tl: 0
        };
        copyAuxWithMap2(f, l1.tl, l2.tl, cell);
        return cell;
      }
      function zipBy(l1, l2, f) {
        return zipByU(l1, l2, Curry.__2(f));
      }
      function mapWithIndexU(xs, f) {
        if (!xs) {
          return 0;
        }
        var cell = {
          hd: f(0, xs.hd),
          tl: 0
        };
        copyAuxWithMapI(f, 1, xs.tl, cell);
        return cell;
      }
      function mapWithIndex(xs, f) {
        return mapWithIndexU(xs, Curry.__2(f));
      }
      function makeByU(n, f) {
        if (n <= 0) {
          return 0;
        }
        var headX = {
          hd: f(0),
          tl: 0
        };
        var cur = headX;
        var i = 1;
        while (i < n) {
          var v = {
            hd: f(i),
            tl: 0
          };
          cur.tl = v;
          cur = v;
          i = i + 1 | 0;
        }
        ;
        return headX;
      }
      function makeBy(n, f) {
        return makeByU(n, Curry.__1(f));
      }
      function make(n, v) {
        if (n <= 0) {
          return 0;
        }
        var headX = {
          hd: v,
          tl: 0
        };
        var cur = headX;
        var i = 1;
        while (i < n) {
          var v$1 = {
            hd: v,
            tl: 0
          };
          cur.tl = v$1;
          cur = v$1;
          i = i + 1 | 0;
        }
        ;
        return headX;
      }
      function length(xs) {
        var _x = xs;
        var _acc = 0;
        while (true) {
          var acc = _acc;
          var x = _x;
          if (!x) {
            return acc;
          }
          _acc = acc + 1 | 0;
          _x = x.tl;
          continue;
        }
        ;
      }
      function fillAux(arr, _i, _x) {
        while (true) {
          var x = _x;
          var i = _i;
          if (!x) {
            return;
          }
          arr[i] = x.hd;
          _x = x.tl;
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function fromArray(a) {
        var _i = a.length - 1 | 0;
        var _res = 0;
        while (true) {
          var res = _res;
          var i = _i;
          if (i < 0) {
            return res;
          }
          _res = {
            hd: a[i],
            tl: res
          };
          _i = i - 1 | 0;
          continue;
        }
        ;
      }
      function toArray(x) {
        var len = length(x);
        var arr = new Array(len);
        fillAux(arr, 0, x);
        return arr;
      }
      function shuffle(xs) {
        var v = toArray(xs);
        Belt_Array.shuffleInPlace(v);
        return fromArray(v);
      }
      function reverseConcat(_l1, _l2) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            return l2;
          }
          _l2 = {
            hd: l1.hd,
            tl: l2
          };
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function reverse(l) {
        return reverseConcat(l, 0);
      }
      function flattenAux(_prec, _xs) {
        while (true) {
          var xs = _xs;
          var prec = _prec;
          if (xs) {
            _xs = xs.tl;
            _prec = copyAuxCont(xs.hd, prec);
            continue;
          }
          prec.tl = 0;
          return;
        }
        ;
      }
      function flatten(_xs) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return 0;
          }
          var match = xs.hd;
          if (match) {
            var cell = {
              hd: match.hd,
              tl: 0
            };
            flattenAux(copyAuxCont(match.tl, cell), xs.tl);
            return cell;
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function concatMany(xs) {
        var len = xs.length;
        if (len === 1) {
          return xs[0];
        }
        if (len === 0) {
          return 0;
        }
        var len$1 = xs.length;
        var v = xs[len$1 - 1 | 0];
        for (var i = len$1 - 2 | 0; i >= 0; --i) {
          v = concat(xs[i], v);
        }
        return v;
      }
      function mapReverseU(l, f) {
        var _accu = 0;
        var _xs = l;
        while (true) {
          var xs = _xs;
          var accu = _accu;
          if (!xs) {
            return accu;
          }
          _xs = xs.tl;
          _accu = {
            hd: f(xs.hd),
            tl: accu
          };
          continue;
        }
        ;
      }
      function mapReverse(l, f) {
        return mapReverseU(l, Curry.__1(f));
      }
      function forEachU(_xs, f) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return;
          }
          f(xs.hd);
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function forEach(xs, f) {
        forEachU(xs, Curry.__1(f));
      }
      function forEachWithIndexU(l, f) {
        var _xs = l;
        var _i = 0;
        while (true) {
          var i = _i;
          var xs = _xs;
          if (!xs) {
            return;
          }
          f(i, xs.hd);
          _i = i + 1 | 0;
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function forEachWithIndex(l, f) {
        forEachWithIndexU(l, Curry.__2(f));
      }
      function reduceU(_l, _accu, f) {
        while (true) {
          var accu = _accu;
          var l = _l;
          if (!l) {
            return accu;
          }
          _accu = f(accu, l.hd);
          _l = l.tl;
          continue;
        }
        ;
      }
      function reduce(l, accu, f) {
        return reduceU(l, accu, Curry.__2(f));
      }
      function reduceReverseUnsafeU(l, accu, f) {
        if (l) {
          return f(reduceReverseUnsafeU(l.tl, accu, f), l.hd);
        } else {
          return accu;
        }
      }
      function reduceReverseU(l, acc, f) {
        var len = length(l);
        if (len < 1e3) {
          return reduceReverseUnsafeU(l, acc, f);
        } else {
          return Belt_Array.reduceReverseU(toArray(l), acc, f);
        }
      }
      function reduceReverse(l, accu, f) {
        return reduceReverseU(l, accu, Curry.__2(f));
      }
      function reduceWithIndexU(l, acc, f) {
        var _l = l;
        var _acc = acc;
        var _i = 0;
        while (true) {
          var i = _i;
          var acc$1 = _acc;
          var l$1 = _l;
          if (!l$1) {
            return acc$1;
          }
          _i = i + 1 | 0;
          _acc = f(acc$1, l$1.hd, i);
          _l = l$1.tl;
          continue;
        }
        ;
      }
      function reduceWithIndex(l, acc, f) {
        return reduceWithIndexU(l, acc, Curry.__3(f));
      }
      function mapReverse2U(l1, l2, f) {
        var _l1 = l1;
        var _l2 = l2;
        var _accu = 0;
        while (true) {
          var accu = _accu;
          var l2$1 = _l2;
          var l1$1 = _l1;
          if (!l1$1) {
            return accu;
          }
          if (!l2$1) {
            return accu;
          }
          _accu = {
            hd: f(l1$1.hd, l2$1.hd),
            tl: accu
          };
          _l2 = l2$1.tl;
          _l1 = l1$1.tl;
          continue;
        }
        ;
      }
      function mapReverse2(l1, l2, f) {
        return mapReverse2U(l1, l2, Curry.__2(f));
      }
      function forEach2U(_l1, _l2, f) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            return;
          }
          if (!l2) {
            return;
          }
          f(l1.hd, l2.hd);
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function forEach2(l1, l2, f) {
        forEach2U(l1, l2, Curry.__2(f));
      }
      function reduce2U(_l1, _l2, _accu, f) {
        while (true) {
          var accu = _accu;
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            return accu;
          }
          if (!l2) {
            return accu;
          }
          _accu = f(accu, l1.hd, l2.hd);
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function reduce2(l1, l2, acc, f) {
        return reduce2U(l1, l2, acc, Curry.__3(f));
      }
      function reduceReverse2UnsafeU(l1, l2, accu, f) {
        if (l1 && l2) {
          return f(reduceReverse2UnsafeU(l1.tl, l2.tl, accu, f), l1.hd, l2.hd);
        } else {
          return accu;
        }
      }
      function reduceReverse2U(l1, l2, acc, f) {
        var len = length(l1);
        if (len < 1e3) {
          return reduceReverse2UnsafeU(l1, l2, acc, f);
        } else {
          return Belt_Array.reduceReverse2U(toArray(l1), toArray(l2), acc, f);
        }
      }
      function reduceReverse2(l1, l2, acc, f) {
        return reduceReverse2U(l1, l2, acc, Curry.__3(f));
      }
      function everyU(_xs, p) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return true;
          }
          if (!p(xs.hd)) {
            return false;
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function every(xs, p) {
        return everyU(xs, Curry.__1(p));
      }
      function someU(_xs, p) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return false;
          }
          if (p(xs.hd)) {
            return true;
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function some(xs, p) {
        return someU(xs, Curry.__1(p));
      }
      function every2U(_l1, _l2, p) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            return true;
          }
          if (!l2) {
            return true;
          }
          if (!p(l1.hd, l2.hd)) {
            return false;
          }
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function every2(l1, l2, p) {
        return every2U(l1, l2, Curry.__2(p));
      }
      function cmpByLength(_l1, _l2) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            if (l2) {
              return -1;
            } else {
              return 0;
            }
          }
          if (!l2) {
            return 1;
          }
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function cmpU(_l1, _l2, p) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            if (l2) {
              return -1;
            } else {
              return 0;
            }
          }
          if (!l2) {
            return 1;
          }
          var c = p(l1.hd, l2.hd);
          if (c !== 0) {
            return c;
          }
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function cmp(l1, l2, f) {
        return cmpU(l1, l2, Curry.__2(f));
      }
      function eqU(_l1, _l2, p) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            if (l2) {
              return false;
            } else {
              return true;
            }
          }
          if (!l2) {
            return false;
          }
          if (!p(l1.hd, l2.hd)) {
            return false;
          }
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function eq(l1, l2, f) {
        return eqU(l1, l2, Curry.__2(f));
      }
      function some2U(_l1, _l2, p) {
        while (true) {
          var l2 = _l2;
          var l1 = _l1;
          if (!l1) {
            return false;
          }
          if (!l2) {
            return false;
          }
          if (p(l1.hd, l2.hd)) {
            return true;
          }
          _l2 = l2.tl;
          _l1 = l1.tl;
          continue;
        }
        ;
      }
      function some2(l1, l2, p) {
        return some2U(l1, l2, Curry.__2(p));
      }
      function hasU(_xs, x, eq2) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return false;
          }
          if (eq2(xs.hd, x)) {
            return true;
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function has(xs, x, eq2) {
        return hasU(xs, x, Curry.__2(eq2));
      }
      function getAssocU(_xs, x, eq2) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return;
          }
          var match = xs.hd;
          if (eq2(match[0], x)) {
            return Caml_option.some(match[1]);
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function getAssoc(xs, x, eq2) {
        return getAssocU(xs, x, Curry.__2(eq2));
      }
      function hasAssocU(_xs, x, eq2) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return false;
          }
          if (eq2(xs.hd[0], x)) {
            return true;
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function hasAssoc(xs, x, eq2) {
        return hasAssocU(xs, x, Curry.__2(eq2));
      }
      function removeAssocU(xs, x, eq2) {
        if (!xs) {
          return 0;
        }
        var l = xs.tl;
        var pair = xs.hd;
        if (eq2(pair[0], x)) {
          return l;
        }
        var cell = {
          hd: pair,
          tl: 0
        };
        var removed = removeAssocAuxWithMap(l, x, cell, eq2);
        if (removed) {
          return cell;
        } else {
          return xs;
        }
      }
      function removeAssoc(xs, x, eq2) {
        return removeAssocU(xs, x, Curry.__2(eq2));
      }
      function setAssocU(xs, x, k, eq2) {
        if (!xs) {
          return {
            hd: [
              x,
              k
            ],
            tl: 0
          };
        }
        var l = xs.tl;
        var pair = xs.hd;
        if (eq2(pair[0], x)) {
          return {
            hd: [
              x,
              k
            ],
            tl: l
          };
        }
        var cell = {
          hd: pair,
          tl: 0
        };
        var replaced = setAssocAuxWithMap(l, x, k, cell, eq2);
        if (replaced) {
          return cell;
        } else {
          return {
            hd: [
              x,
              k
            ],
            tl: xs
          };
        }
      }
      function setAssoc(xs, x, k, eq2) {
        return setAssocU(xs, x, k, Curry.__2(eq2));
      }
      function sortU(xs, cmp2) {
        var arr = toArray(xs);
        Belt_SortArray.stableSortInPlaceByU(arr, cmp2);
        return fromArray(arr);
      }
      function sort(xs, cmp2) {
        return sortU(xs, Curry.__2(cmp2));
      }
      function getByU(_xs, p) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return;
          }
          var x = xs.hd;
          if (p(x)) {
            return Caml_option.some(x);
          }
          _xs = xs.tl;
          continue;
        }
        ;
      }
      function getBy(xs, p) {
        return getByU(xs, Curry.__1(p));
      }
      function keepU(_xs, p) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return 0;
          }
          var t = xs.tl;
          var h = xs.hd;
          if (p(h)) {
            var cell = {
              hd: h,
              tl: 0
            };
            copyAuxWitFilter(p, t, cell);
            return cell;
          }
          _xs = t;
          continue;
        }
        ;
      }
      function keep(xs, p) {
        return keepU(xs, Curry.__1(p));
      }
      function keepWithIndexU(xs, p) {
        var _xs = xs;
        var _i = 0;
        while (true) {
          var i = _i;
          var xs$1 = _xs;
          if (!xs$1) {
            return 0;
          }
          var t = xs$1.tl;
          var h = xs$1.hd;
          if (p(h, i)) {
            var cell = {
              hd: h,
              tl: 0
            };
            copyAuxWithFilterIndex(p, t, cell, i + 1 | 0);
            return cell;
          }
          _i = i + 1 | 0;
          _xs = t;
          continue;
        }
        ;
      }
      function keepWithIndex(xs, p) {
        return keepWithIndexU(xs, Curry.__2(p));
      }
      function keepMapU(_xs, p) {
        while (true) {
          var xs = _xs;
          if (!xs) {
            return 0;
          }
          var t = xs.tl;
          var h = p(xs.hd);
          if (h !== void 0) {
            var cell = {
              hd: Caml_option.valFromOption(h),
              tl: 0
            };
            copyAuxWitFilterMap(p, t, cell);
            return cell;
          }
          _xs = t;
          continue;
        }
        ;
      }
      function keepMap(xs, p) {
        return keepMapU(xs, Curry.__1(p));
      }
      function partitionU(l, p) {
        if (!l) {
          return [
            0,
            0
          ];
        }
        var h = l.hd;
        var nextX = {
          hd: h,
          tl: 0
        };
        var nextY = {
          hd: h,
          tl: 0
        };
        var b = p(h);
        partitionAux(p, l.tl, nextX, nextY);
        if (b) {
          return [
            nextX,
            nextY.tl
          ];
        } else {
          return [
            nextX.tl,
            nextY
          ];
        }
      }
      function partition(l, p) {
        return partitionU(l, Curry.__1(p));
      }
      function unzip(xs) {
        if (!xs) {
          return [
            0,
            0
          ];
        }
        var match = xs.hd;
        var cellX = {
          hd: match[0],
          tl: 0
        };
        var cellY = {
          hd: match[1],
          tl: 0
        };
        splitAux(xs.tl, cellX, cellY);
        return [
          cellX,
          cellY
        ];
      }
      function zip(l1, l2) {
        if (!l1) {
          return 0;
        }
        if (!l2) {
          return 0;
        }
        var cell = {
          hd: [
            l1.hd,
            l2.hd
          ],
          tl: 0
        };
        zipAux(l1.tl, l2.tl, cell);
        return cell;
      }
      var size3 = length;
      var filter = keep;
      var filterWithIndex = keepWithIndex;
      exports.length = length;
      exports.size = size3;
      exports.head = head;
      exports.headExn = headExn;
      exports.tail = tail;
      exports.tailExn = tailExn;
      exports.add = add;
      exports.get = get;
      exports.getExn = getExn;
      exports.make = make;
      exports.makeByU = makeByU;
      exports.makeBy = makeBy;
      exports.shuffle = shuffle;
      exports.drop = drop;
      exports.take = take;
      exports.splitAt = splitAt;
      exports.concat = concat;
      exports.concatMany = concatMany;
      exports.reverseConcat = reverseConcat;
      exports.flatten = flatten;
      exports.mapU = mapU;
      exports.map = map;
      exports.zip = zip;
      exports.zipByU = zipByU;
      exports.zipBy = zipBy;
      exports.mapWithIndexU = mapWithIndexU;
      exports.mapWithIndex = mapWithIndex;
      exports.fromArray = fromArray;
      exports.toArray = toArray;
      exports.reverse = reverse;
      exports.mapReverseU = mapReverseU;
      exports.mapReverse = mapReverse;
      exports.forEachU = forEachU;
      exports.forEach = forEach;
      exports.forEachWithIndexU = forEachWithIndexU;
      exports.forEachWithIndex = forEachWithIndex;
      exports.reduceU = reduceU;
      exports.reduce = reduce;
      exports.reduceWithIndexU = reduceWithIndexU;
      exports.reduceWithIndex = reduceWithIndex;
      exports.reduceReverseU = reduceReverseU;
      exports.reduceReverse = reduceReverse;
      exports.mapReverse2U = mapReverse2U;
      exports.mapReverse2 = mapReverse2;
      exports.forEach2U = forEach2U;
      exports.forEach2 = forEach2;
      exports.reduce2U = reduce2U;
      exports.reduce2 = reduce2;
      exports.reduceReverse2U = reduceReverse2U;
      exports.reduceReverse2 = reduceReverse2;
      exports.everyU = everyU;
      exports.every = every;
      exports.someU = someU;
      exports.some = some;
      exports.every2U = every2U;
      exports.every2 = every2;
      exports.some2U = some2U;
      exports.some2 = some2;
      exports.cmpByLength = cmpByLength;
      exports.cmpU = cmpU;
      exports.cmp = cmp;
      exports.eqU = eqU;
      exports.eq = eq;
      exports.hasU = hasU;
      exports.has = has;
      exports.getByU = getByU;
      exports.getBy = getBy;
      exports.keepU = keepU;
      exports.keep = keep;
      exports.filter = filter;
      exports.keepWithIndexU = keepWithIndexU;
      exports.keepWithIndex = keepWithIndex;
      exports.filterWithIndex = filterWithIndex;
      exports.keepMapU = keepMapU;
      exports.keepMap = keepMap;
      exports.partitionU = partitionU;
      exports.partition = partition;
      exports.unzip = unzip;
      exports.getAssocU = getAssocU;
      exports.getAssoc = getAssoc;
      exports.hasAssocU = hasAssocU;
      exports.hasAssoc = hasAssoc;
      exports.removeAssocU = removeAssocU;
      exports.removeAssoc = removeAssoc;
      exports.setAssocU = setAssocU;
      exports.setAssoc = setAssoc;
      exports.sortU = sortU;
      exports.sort = sort;
    }
  });

  // src/Board.bs.js
  var require_Board_bs = __commonJS({
    "src/Board.bs.js"(exports) {
      "use strict";
      var Curry = require_curry();
      var Utils2 = require_Utils_bs();
      var Belt_List = require_belt_List();
      function board(piecesArr) {
        return {
          pieces: Belt_List.fromArray(piecesArr)
        };
      }
      function init2(param) {
        var piecesArr = [
          Utils2.pawn("White", 0, 1),
          Utils2.pawn("White", 1, 1),
          Utils2.pawn("White", 2, 1),
          Utils2.pawn("White", 3, 1),
          Utils2.pawn("White", 4, 1),
          Utils2.pawn("White", 5, 1),
          Utils2.pawn("White", 6, 1),
          Utils2.pawn("White", 7, 1),
          Utils2.rook("White", 0, 0),
          Utils2.rook("White", 7, 0),
          Utils2.knight("White", 1, 0),
          Utils2.knight("White", 6, 0),
          Utils2.bishop("White", 2, 0),
          Utils2.bishop("White", 5, 0),
          Utils2.queen("White", 3, 0),
          Utils2.king("White", 4, 0),
          Utils2.pawn("Black", 0, 6),
          Utils2.pawn("Black", 1, 6),
          Utils2.pawn("Black", 2, 6),
          Utils2.pawn("Black", 3, 6),
          Utils2.pawn("Black", 4, 6),
          Utils2.pawn("Black", 5, 6),
          Utils2.pawn("Black", 6, 6),
          Utils2.pawn("Black", 7, 6),
          Utils2.rook("Black", 0, 7),
          Utils2.rook("Black", 7, 7),
          Utils2.knight("Black", 1, 7),
          Utils2.knight("Black", 6, 7),
          Utils2.bishop("Black", 2, 7),
          Utils2.bishop("Black", 5, 7),
          Utils2.queen("Black", 3, 7),
          Utils2.king("Black", 4, 7)
        ];
        return {
          pieces: Belt_List.fromArray(piecesArr)
        };
      }
      function getPiece(board2, param, color) {
        var y = param[1];
        var x = param[0];
        return Belt_List.getBy(board2.pieces, function(p) {
          var colorPredicate = color !== void 0 ? Utils2.getColor(p) === color : true;
          if (Utils2.getX(p) === x && Utils2.getY(p) === y) {
            return colorPredicate;
          } else {
            return false;
          }
        });
      }
      function hasPiece(board2, position, color) {
        return getPiece(board2, position, color) !== void 0;
      }
      function hasOppositeColoredPiece(board2, position, color) {
        return hasPiece(board2, position, Utils2.oppositeColor(color));
      }
      function checkUnobstructed(board2, piece, param, canCapture) {
        var y = param[1];
        var x = param[0];
        if (x < 0 || x > 7 || y < 0 || y > 7) {
          return false;
        }
        if (!canCapture) {
          return !hasPiece(board2, [
            x,
            y
          ], void 0);
        }
        var target = getPiece(board2, [
          x,
          y
        ], void 0);
        if (target !== void 0) {
          if (target.TAG === 1) {
            return false;
          } else {
            return Utils2.getColor(target) !== Utils2.getColor(piece);
          }
        } else {
          return true;
        }
      }
      function confirmMove(board2, piece, position, param) {
        var newY = position[1];
        var newX = position[0];
        var noop = function(b) {
          return b;
        };
        var match;
        switch (piece.TAG | 0) {
          case 0:
            var p = piece._0;
            var newPawn = (p.y - newY | 0) === -2 || (p.y - newY | 0) === 2 ? Utils2.withPosition(Utils2.with2Spaces(p), position) : Utils2.withMoved(Utils2.withPosition(piece, position));
            var callback = p.x !== newX && p.y !== newY && !hasPiece(board2, position, void 0) ? function(b) {
              return {
                pieces: Belt_List.keep(b.pieces, function(i) {
                  if (Utils2.getX(i) !== newX) {
                    return true;
                  } else {
                    return Utils2.getY(i) !== p.y;
                  }
                })
              };
            } : noop;
            match = [
              newPawn,
              callback
            ];
            break;
          case 1:
            var k = piece._0;
            var y = Utils2.backRank(k);
            var castleHelper = function(oldRookX, newRookX, board3) {
              var rook = getPiece(board3, [
                oldRookX,
                y
              ], void 0);
              if (rook !== void 0) {
                return function(b) {
                  return confirmMove(b, rook, [
                    newRookX,
                    y
                  ], true);
                };
              }
              throw {
                RE_EXN_ID: "Not_found",
                Error: new Error()
              };
            };
            match = k.hasMoved ? [
              Utils2.withMoved(Utils2.withPosition(piece, position)),
              noop
            ] : newX === 2 && newY === y ? [
              Utils2.withMoved(Utils2.withPosition(piece, position)),
              castleHelper(0, 3, board2)
            ] : newX === 6 && newY === y ? [
              Utils2.withMoved(Utils2.withPosition(piece, position)),
              castleHelper(7, 5, board2)
            ] : [
              Utils2.withMoved(Utils2.withPosition(piece, position)),
              noop
            ];
            break;
          default:
            match = [
              Utils2.withMoved(Utils2.withPosition(piece, position)),
              noop
            ];
        }
        var newPiece = match[0];
        var pieces_1 = Belt_List.map(Belt_List.keep(board2.pieces, function(p2) {
          if (Utils2.getX(p2) === Utils2.getX(piece) && Utils2.getY(p2) === Utils2.getY(piece)) {
            return false;
          } else {
            return !(Utils2.getX(p2) === Utils2.getX(newPiece) && Utils2.getY(p2) === Utils2.getY(newPiece));
          }
        }), function(p2) {
          if (p2.TAG === 0) {
            return Utils2.disable2Spaces(p2._0);
          } else {
            return p2;
          }
        });
        var pieces = {
          hd: newPiece,
          tl: pieces_1
        };
        return Curry._1(match[1], {
          pieces
        });
      }
      exports.board = board;
      exports.init = init2;
      exports.getPiece = getPiece;
      exports.hasPiece = hasPiece;
      exports.hasOppositeColoredPiece = hasOppositeColoredPiece;
      exports.checkUnobstructed = checkUnobstructed;
      exports.confirmMove = confirmMove;
    }
  });

  // src/Pieces.bs.js
  var require_Pieces_bs = __commonJS({
    "src/Pieces.bs.js"(exports) {
      "use strict";
      var Board = require_Board_bs();
      var Utils2 = require_Utils_bs();
      var Belt_List = require_belt_List();
      function canCover(piece, board, position) {
        var p = Board.getPiece(board, position, void 0);
        if (p !== void 0 && (p.TAG === 1 || Utils2.getColor(p) === Utils2.getColor(piece))) {
          return true;
        } else {
          return Board.checkUnobstructed(board, piece, position, true);
        }
      }
      function unobstructedPositionsHelper(piece, board, a, b, c, d) {
        var positionHelper = function(acc, position) {
          if (!acc[0]) {
            return [
              false,
              acc[1]
            ];
          }
          var lst = acc[1];
          if (canCover(piece, board, position)) {
            if (Board.hasPiece(board, position, void 0)) {
              return [
                false,
                {
                  hd: position,
                  tl: lst
                }
              ];
            } else {
              return [
                true,
                {
                  hd: position,
                  tl: lst
                }
              ];
            }
          } else {
            return [
              false,
              lst
            ];
          }
        };
        return Belt_List.flatten(Belt_List.map({
          hd: a,
          tl: {
            hd: b,
            tl: {
              hd: c,
              tl: {
                hd: d,
                tl: 0
              }
            }
          }
        }, function(l) {
          return Belt_List.reduce(l, [
            true,
            0
          ], positionHelper)[1];
        }));
      }
      function getUnobstructedCardinalPositions(piece, board) {
        var up = Belt_List.makeBy(7 - Utils2.getY(piece) | 0, function(i) {
          return [
            Utils2.getX(piece),
            (Utils2.getY(piece) + i | 0) + 1 | 0
          ];
        });
        var down = Belt_List.makeBy(Utils2.getY(piece), function(i) {
          return [
            Utils2.getX(piece),
            (Utils2.getY(piece) - i | 0) - 1 | 0
          ];
        });
        var left = Belt_List.makeBy(Utils2.getX(piece), function(i) {
          return [
            (Utils2.getX(piece) - i | 0) - 1 | 0,
            Utils2.getY(piece)
          ];
        });
        var right = Belt_List.makeBy(7 - Utils2.getX(piece) | 0, function(i) {
          return [
            (Utils2.getX(piece) + i | 0) + 1 | 0,
            Utils2.getY(piece)
          ];
        });
        return unobstructedPositionsHelper(piece, board, up, down, left, right);
      }
      function getUnobstructedDiagonalPositions(piece, board) {
        var ul = Belt_List.makeBy(Math.min(Utils2.getX(piece), 7 - Utils2.getY(piece) | 0), function(i) {
          return [
            (Utils2.getX(piece) - i | 0) - 1 | 0,
            (Utils2.getY(piece) + i | 0) + 1 | 0
          ];
        });
        var ur = Belt_List.makeBy(7 - Math.max(Utils2.getX(piece), Utils2.getY(piece)) | 0, function(i) {
          return [
            (Utils2.getX(piece) + i | 0) + 1 | 0,
            (Utils2.getY(piece) + i | 0) + 1 | 0
          ];
        });
        var dl = Belt_List.makeBy(Math.min(Utils2.getX(piece), Utils2.getY(piece)), function(i) {
          return [
            (Utils2.getX(piece) - i | 0) - 1 | 0,
            (Utils2.getY(piece) - i | 0) - 1 | 0
          ];
        });
        var dr = Belt_List.makeBy(Math.min(7 - Utils2.getX(piece) | 0, Utils2.getY(piece)), function(i) {
          return [
            (Utils2.getX(piece) + i | 0) + 1 | 0,
            (Utils2.getY(piece) - i | 0) - 1 | 0
          ];
        });
        return unobstructedPositionsHelper(piece, board, ul, ur, dl, dr);
      }
      function getCoveredPositions(piece, board) {
        switch (piece.TAG | 0) {
          case 0:
            var p = piece._0;
            var positions_0 = [
              p.x - 1 | 0,
              p.y + Utils2.pawnOffsetHelper(p, 1) | 0
            ];
            var positions_1 = {
              hd: [
                p.x + 1 | 0,
                p.y + Utils2.pawnOffsetHelper(p, 1) | 0
              ],
              tl: 0
            };
            var positions = {
              hd: positions_0,
              tl: positions_1
            };
            return Belt_List.keep(positions, function(param) {
              var y = param[1];
              if (y >= 0 && y <= 7) {
                return canCover(piece, board, [
                  param[0],
                  y
                ]);
              } else {
                return false;
              }
            });
          case 1:
            var k = piece._0;
            var positions_0$1 = [
              k.x - 1 | 0,
              k.y
            ];
            var positions_1$1 = {
              hd: [
                k.x - 1 | 0,
                k.y - 1 | 0
              ],
              tl: {
                hd: [
                  k.x - 1 | 0,
                  k.y + 1 | 0
                ],
                tl: {
                  hd: [
                    k.x,
                    k.y - 1 | 0
                  ],
                  tl: {
                    hd: [
                      k.x,
                      k.y + 1 | 0
                    ],
                    tl: {
                      hd: [
                        k.x + 1 | 0,
                        k.y
                      ],
                      tl: {
                        hd: [
                          k.x + 1 | 0,
                          k.y - 1 | 0
                        ],
                        tl: {
                          hd: [
                            k.x + 1 | 0,
                            k.y + 1 | 0
                          ],
                          tl: 0
                        }
                      }
                    }
                  }
                }
              }
            };
            var positions$1 = {
              hd: positions_0$1,
              tl: positions_1$1
            };
            return Belt_List.keep(positions$1, function(p2) {
              return canCover(piece, board, p2);
            });
          case 2:
            return Belt_List.concat(getUnobstructedDiagonalPositions(piece, board), getUnobstructedCardinalPositions(piece, board));
          case 3:
            return getUnobstructedDiagonalPositions(piece, board);
          case 4:
            var n = piece._0;
            var positions_0$2 = [
              n.x - 2 | 0,
              n.y - 1 | 0
            ];
            var positions_1$2 = {
              hd: [
                n.x - 2 | 0,
                n.y + 1 | 0
              ],
              tl: {
                hd: [
                  n.x - 1 | 0,
                  n.y + 2 | 0
                ],
                tl: {
                  hd: [
                    n.x - 1 | 0,
                    n.y - 2 | 0
                  ],
                  tl: {
                    hd: [
                      n.x + 1 | 0,
                      n.y + 2 | 0
                    ],
                    tl: {
                      hd: [
                        n.x + 1 | 0,
                        n.y - 2 | 0
                      ],
                      tl: {
                        hd: [
                          n.x + 2 | 0,
                          n.y - 1 | 0
                        ],
                        tl: {
                          hd: [
                            n.x + 2 | 0,
                            n.y + 1 | 0
                          ],
                          tl: 0
                        }
                      }
                    }
                  }
                }
              }
            };
            var positions$2 = {
              hd: positions_0$2,
              tl: positions_1$2
            };
            return Belt_List.keep(positions$2, function(p2) {
              return canCover(piece, board, p2);
            });
          case 5:
            return getUnobstructedCardinalPositions(piece, board);
        }
      }
      function validBoard(board, movedColor) {
        var ownKing = Belt_List.getExn(Belt_List.keep(board.pieces, function(p) {
          if (p.TAG === 1) {
            return p._0.color === movedColor;
          } else {
            return false;
          }
        }), 0);
        var otherCoveredPositions = getCoveredPositionsForColor(board, Utils2.oppositeColor(movedColor));
        return !Belt_List.has(otherCoveredPositions, [
          Utils2.getX(ownKing),
          Utils2.getY(ownKing)
        ], function(param, param$1) {
          if (param[0] === param$1[0]) {
            return param[1] === param$1[1];
          } else {
            return false;
          }
        });
      }
      function getCoveredPositionsForColor(board, color) {
        return coveredPositionsHelper(Belt_List.keep(board.pieces, function(p) {
          return Utils2.getColor(p) === color;
        }), board);
      }
      function coveredPositionsHelper(pieces, board) {
        return Belt_List.reduce(Belt_List.sort(Belt_List.flatten(Belt_List.reduce(pieces, 0, function(acc, p) {
          return {
            hd: getCoveredPositions(p, board),
            tl: acc
          };
        })), function(param, param$1) {
          var x2 = param$1[0];
          var x1 = param[0];
          if (x1 === x2) {
            return param[1] - param$1[1] | 0;
          } else {
            return x1 - x2 | 0;
          }
        }), 0, function(acc, param) {
          var y1 = param[1];
          var x1 = param[0];
          if (!acc) {
            return {
              hd: [
                x1,
                y1
              ],
              tl: 0
            };
          }
          var match = acc.hd;
          if (x1 === match[0] && y1 === match[1]) {
            return acc;
          } else {
            return {
              hd: [
                x1,
                y1
              ],
              tl: acc
            };
          }
        });
      }
      function validStateForMove(board, piece, position) {
        var newBoard = Board.confirmMove(board, piece, position, false);
        return validBoard(newBoard, Utils2.getColor(piece));
      }
      function getLegalMoves(piece, board) {
        switch (piece.TAG | 0) {
          case 0:
            var p = piece._0;
            var oneSpace_0 = p.x;
            var oneSpace_1 = p.y + Utils2.pawnOffsetHelper(p, 1) | 0;
            var oneSpace = [
              oneSpace_0,
              oneSpace_1
            ];
            var twoSpace_0 = p.x;
            var twoSpace_1 = p.y + Utils2.pawnOffsetHelper(p, 2) | 0;
            var twoSpace = [
              twoSpace_0,
              twoSpace_1
            ];
            var movement = Board.checkUnobstructed(board, piece, oneSpace, false) ? !p.hasMoved && Board.checkUnobstructed(board, piece, twoSpace, false) ? {
              hd: oneSpace,
              tl: {
                hd: twoSpace,
                tl: 0
              }
            } : {
              hd: oneSpace,
              tl: 0
            } : 0;
            var capture = Belt_List.keep(getCoveredPositions(piece, board), function(pos) {
              if (Board.hasOppositeColoredPiece(board, pos, p.color)) {
                return true;
              }
              var otherPiece = Board.getPiece(board, [
                pos[0],
                p.y
              ], Utils2.oppositeColor(p.color));
              if (otherPiece !== void 0 && otherPiece.TAG === 0) {
                return otherPiece._0.hasJustMoved2Spaces;
              } else {
                return false;
              }
            });
            return Belt_List.keep(Belt_List.concat(movement, capture), function(pos) {
              return validStateForMove(board, {
                TAG: 0,
                _0: p
              }, pos);
            });
          case 1:
            var k = piece._0;
            var regularMoves = Belt_List.keep(getCoveredPositions(piece, board), function(p2) {
              if (Board.checkUnobstructed(board, {
                TAG: 1,
                _0: k
              }, p2, true)) {
                return validStateForMove(board, piece, p2);
              } else {
                return false;
              }
            });
            if (k.hasMoved || k.inCheck) {
              return regularMoves;
            }
            var y = Utils2.backRank(k);
            var leftRook = Board.getPiece(board, [
              0,
              y
            ], k.color);
            var rightRook = Board.getPiece(board, [
              7,
              y
            ], k.color);
            var leftCastle = leftRook !== void 0 && leftRook.TAG === 5 && !(leftRook._0.hasMoved || Board.hasPiece(board, [
              1,
              y
            ], void 0) || Board.hasPiece(board, [
              2,
              y
            ], void 0) || Board.hasPiece(board, [
              3,
              y
            ], void 0) || !validStateForMove(board, piece, [
              3,
              y
            ]) || !validStateForMove(board, piece, [
              2,
              y
            ]) || !validStateForMove(board, piece, [
              2,
              y
            ])) ? [
              2,
              y
            ] : void 0;
            var rightCastle = rightRook !== void 0 && rightRook.TAG === 5 && !(rightRook._0.hasMoved || Board.hasPiece(board, [
              5,
              y
            ], void 0) || Board.hasPiece(board, [
              6,
              y
            ], void 0) || !validStateForMove(board, piece, [
              5,
              y
            ]) || !validStateForMove(board, piece, [
              6,
              y
            ]) || !validStateForMove(board, piece, [
              6,
              y
            ])) ? [
              6,
              y
            ] : void 0;
            if (leftCastle !== void 0) {
              if (rightCastle !== void 0) {
                return {
                  hd: leftCastle,
                  tl: {
                    hd: rightCastle,
                    tl: regularMoves
                  }
                };
              } else {
                return {
                  hd: leftCastle,
                  tl: regularMoves
                };
              }
            } else if (rightCastle !== void 0) {
              return {
                hd: rightCastle,
                tl: regularMoves
              };
            } else {
              return regularMoves;
            }
          default:
            return Belt_List.keep(getCoveredPositions(piece, board), function(pos) {
              if (Board.checkUnobstructed(board, piece, pos, true)) {
                return validStateForMove(board, piece, pos);
              } else {
                return false;
              }
            });
        }
      }
      function getEmphasizedCoveredPositionsForColor(board, color) {
        return coveredPositionsHelper(Belt_List.keep(board.pieces, function(p) {
          if (Utils2.getColor(p) === color) {
            return Utils2.getEmphasis(p);
          } else {
            return false;
          }
        }), board);
      }
      function getNumLegalMovesForColor(board, color) {
        return Belt_List.reduce(Belt_List.keep(board.pieces, function(p) {
          return Utils2.getColor(p) === color;
        }), 0, function(acc, x) {
          return acc + Belt_List.size(getLegalMoves(x, board)) | 0;
        });
      }
      exports.canCover = canCover;
      exports.unobstructedPositionsHelper = unobstructedPositionsHelper;
      exports.getUnobstructedCardinalPositions = getUnobstructedCardinalPositions;
      exports.getUnobstructedDiagonalPositions = getUnobstructedDiagonalPositions;
      exports.getCoveredPositions = getCoveredPositions;
      exports.validStateForMove = validStateForMove;
      exports.getLegalMoves = getLegalMoves;
      exports.coveredPositionsHelper = coveredPositionsHelper;
      exports.getCoveredPositionsForColor = getCoveredPositionsForColor;
      exports.validBoard = validBoard;
      exports.getEmphasizedCoveredPositionsForColor = getEmphasizedCoveredPositionsForColor;
      exports.getNumLegalMovesForColor = getNumLegalMovesForColor;
    }
  });

  // src/Grid.bs.js
  var require_Grid_bs = __commonJS({
    "src/Grid.bs.js"(exports) {
      "use strict";
      var Utils2 = require_Utils_bs();
      var Pieces = require_Pieces_bs();
      var Belt_List = require_belt_List();
      var Belt_Array = require_belt_Array();
      var Caml_array = require_caml_array();
      var stroke2 = 12;
      var size3 = 92;
      function positionToId2(x, y) {
        return "" + String.fromCharCode(x + 65 | 0) + (y + 1 | 0).toString();
      }
      function makeSquare(x, y, color) {
        return {
          piece: void 0,
          selection: false,
          movement: false,
          covered: false,
          coveredAndSelected: false,
          x,
          y,
          color,
          id: positionToId2(x, y)
        };
      }
      function makeGrid(state2) {
        var match = state2.cursorPosition;
        var otherColor = Utils2.oppositeColor(state2.turn);
        var coveredPositions = Pieces.getCoveredPositionsForColor(state2.board, otherColor);
        var emphasizedCoveredPositions = Pieces.getEmphasizedCoveredPositionsForColor(state2.board, otherColor);
        var grid = Belt_Array.makeBy(8, function(x) {
          return Belt_Array.makeBy(8, function(y) {
            return makeSquare(x, y, state2.turn);
          });
        });
        Belt_List.forEach(state2.board.pieces, function(p2) {
          Caml_array.get(Caml_array.get(grid, Utils2.getX(p2)), Utils2.getY(p2)).piece = p2;
        });
        Belt_List.forEach(coveredPositions, function(param) {
          Caml_array.get(Caml_array.get(grid, param[0]), param[1]).covered = true;
        });
        Belt_List.forEach(emphasizedCoveredPositions, function(param) {
          Caml_array.get(Caml_array.get(grid, param[0]), param[1]).coveredAndSelected = true;
        });
        Caml_array.get(Caml_array.get(grid, match[0]), match[1]).selection = true;
        var p = state2.selectedPiece;
        if (p !== void 0) {
          Caml_array.get(Caml_array.get(grid, Utils2.getX(p)), Utils2.getY(p)).selection = true;
          var l = state2.legalMoves;
          if (l !== void 0) {
            Belt_List.forEach(l, function(param) {
              Caml_array.get(Caml_array.get(grid, param[0]), param[1]).movement = true;
            });
          }
        }
        return Belt_Array.concatMany(grid);
      }
      function getInCheck2(square) {
        var match = square.piece;
        if (match !== void 0 && match.TAG === 1 && match._0.color === square.color) {
          return square.covered;
        } else {
          return false;
        }
      }
      function getColor2(square) {
        if (square.x % 2 === square.y % 2) {
          return "maroon";
        } else {
          return "antiquewhite";
        }
      }
      function getOverlayColor2(square) {
        var inCheck = getInCheck2(square);
        var blueOrPurple = square.movement ? square.covered ? "purple" : "blue" : "none";
        if (square.coveredAndSelected && !square.movement && !inCheck) {
          return "red";
        }
        var match = square.piece;
        if (match !== void 0 && !inCheck && !square.movement && square.covered) {
          return "lightcoral";
        } else {
          return blueOrPurple;
        }
      }
      function getX2(square) {
        var match = square.color;
        if (match === "White") {
          return Math.imul(square.x, size3);
        } else {
          return Math.imul(7 - square.x | 0, size3);
        }
      }
      function getY2(square) {
        var match = square.color;
        if (match === "White") {
          return Math.imul(7 - square.y | 0, size3);
        } else {
          return Math.imul(square.y, size3);
        }
      }
      var scalingFactor = 4;
      var assetSize = 23;
      exports.scalingFactor = scalingFactor;
      exports.assetSize = assetSize;
      exports.stroke = stroke2;
      exports.size = size3;
      exports.positionToId = positionToId2;
      exports.makeSquare = makeSquare;
      exports.makeGrid = makeGrid;
      exports.getInCheck = getInCheck2;
      exports.getColor = getColor2;
      exports.getOverlayColor = getOverlayColor2;
      exports.getX = getX2;
      exports.getY = getY2;
    }
  });

  // src/Sounds.js
  var require_Sounds = __commonJS({
    "src/Sounds.js"(exports) {
      var warning = new Howl({
        src: ["./assets/sounds/warning.flac"],
        autoplay: false,
        loop: false
      });
      var capture = new Howl({
        src: ["./assets/sounds/capture.flac"],
        autoplay: false,
        loop: false
      });
      var move = new Howl({
        src: ["./assets/sounds/move.wav"],
        autoplay: false,
        loop: false
      });
      var select = new Howl({
        src: ["./assets/sounds/select.wav"],
        autoplay: false,
        loop: false
      });
      var cursor = new Howl({
        src: ["./assets/sounds/cursor.wav"],
        autoplay: false,
        loop: false
      });
      var victory = new Howl({
        src: ["./assets/sounds/victory1.flac"],
        autoplay: false,
        loop: false
      });
      var white_turn = new Howl({
        src: ["./assets/sounds/white_turn.flac"],
        autoplay: false,
        loop: false
      });
      var black_turn = new Howl({
        src: ["./assets/sounds/black_turn.flac"],
        autoplay: false,
        loop: false
      });
      var winSound = () => {
        victory.play();
      };
      exports.winSound = winSound;
      var cursorSound = () => {
        cursor.play();
      };
      exports.cursorSound = cursorSound;
      var successSound = () => {
        select.play();
      };
      exports.successSound = successSound;
      var failureSound = () => {
        warning.play();
      };
      exports.failureSound = failureSound;
      var moveSound = () => {
        move.play();
      };
      exports.moveSound = moveSound;
      var turnStartSound = (turn) => {
        if (turn === 0) {
          white_turn.play();
        } else {
          black_turn.play();
        }
      };
      exports.turnStartSound = turnStartSound;
      var captureSound = () => {
        capture.play();
      };
      exports.captureSound = captureSound;
    }
  });

  // node_modules/rescript/lib/js/belt_Option.js
  var require_belt_Option = __commonJS({
    "node_modules/rescript/lib/js/belt_Option.js"(exports) {
      "use strict";
      var Curry = require_curry();
      var Caml_option = require_caml_option();
      function keepU(opt, p) {
        if (opt !== void 0 && p(Caml_option.valFromOption(opt))) {
          return opt;
        }
      }
      function keep(opt, p) {
        return keepU(opt, Curry.__1(p));
      }
      function forEachU(opt, f) {
        if (opt !== void 0) {
          return f(Caml_option.valFromOption(opt));
        }
      }
      function forEach(opt, f) {
        forEachU(opt, Curry.__1(f));
      }
      function getExn(x) {
        if (x !== void 0) {
          return Caml_option.valFromOption(x);
        }
        throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
      }
      function mapWithDefaultU(opt, $$default, f) {
        if (opt !== void 0) {
          return f(Caml_option.valFromOption(opt));
        } else {
          return $$default;
        }
      }
      function mapWithDefault(opt, $$default, f) {
        return mapWithDefaultU(opt, $$default, Curry.__1(f));
      }
      function mapU(opt, f) {
        if (opt !== void 0) {
          return Caml_option.some(f(Caml_option.valFromOption(opt)));
        }
      }
      function map(opt, f) {
        return mapU(opt, Curry.__1(f));
      }
      function flatMapU(opt, f) {
        if (opt !== void 0) {
          return f(Caml_option.valFromOption(opt));
        }
      }
      function flatMap(opt, f) {
        return flatMapU(opt, Curry.__1(f));
      }
      function getWithDefault(opt, $$default) {
        if (opt !== void 0) {
          return Caml_option.valFromOption(opt);
        } else {
          return $$default;
        }
      }
      function orElse(opt, other) {
        if (opt !== void 0) {
          return opt;
        } else {
          return other;
        }
      }
      function isSome(param) {
        return param !== void 0;
      }
      function isNone(x) {
        return x === void 0;
      }
      function eqU(a, b, f) {
        if (a !== void 0) {
          if (b !== void 0) {
            return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
          } else {
            return false;
          }
        } else {
          return b === void 0;
        }
      }
      function eq(a, b, f) {
        return eqU(a, b, Curry.__2(f));
      }
      function cmpU(a, b, f) {
        if (a !== void 0) {
          if (b !== void 0) {
            return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
          } else {
            return 1;
          }
        } else if (b !== void 0) {
          return -1;
        } else {
          return 0;
        }
      }
      function cmp(a, b, f) {
        return cmpU(a, b, Curry.__2(f));
      }
      exports.keepU = keepU;
      exports.keep = keep;
      exports.forEachU = forEachU;
      exports.forEach = forEach;
      exports.getExn = getExn;
      exports.mapWithDefaultU = mapWithDefaultU;
      exports.mapWithDefault = mapWithDefault;
      exports.mapU = mapU;
      exports.map = map;
      exports.flatMapU = flatMapU;
      exports.flatMap = flatMap;
      exports.getWithDefault = getWithDefault;
      exports.orElse = orElse;
      exports.isSome = isSome;
      exports.isNone = isNone;
      exports.eqU = eqU;
      exports.eq = eq;
      exports.cmpU = cmpU;
      exports.cmp = cmp;
    }
  });

  // src/GameState.bs.js
  var require_GameState_bs = __commonJS({
    "src/GameState.bs.js"(exports) {
      "use strict";
      var Grid3 = require_Grid_bs();
      var Board = require_Board_bs();
      var Utils2 = require_Utils_bs();
      var Pieces = require_Pieces_bs();
      var Sounds2 = require_Sounds();
      var Belt_List = require_belt_List();
      var GameUtils = (init_GameUtils(), __toCommonJS(GameUtils_exports));
      var Belt_Option = require_belt_Option();
      function drawGrid2(prim) {
        GameUtils.drawGrid(prim);
      }
      function endTurn2(prim) {
        GameUtils.endTurn();
      }
      function winSound(prim) {
        Sounds2.winSound();
      }
      function cursorSound(prim) {
        Sounds2.cursorSound();
      }
      function successSound(prim) {
        Sounds2.successSound();
      }
      function failureSound(prim) {
        Sounds2.failureSound();
      }
      function moveSound(prim) {
        Sounds2.moveSound();
      }
      function captureSound(prim) {
        Sounds2.captureSound();
      }
      function turnStartSound(prim) {
        Sounds2.turnStartSound(prim);
      }
      function init2(param) {
        return {
          board: Board.init(void 0),
          turn: "White",
          selectedPiece: void 0,
          legalMoves: void 0,
          cursorPosition: [
            4,
            0
          ],
          promote: false,
          lock: false
        };
      }
      function draw2(state2) {
        var grid = Grid3.makeGrid(state2);
        GameUtils.drawGrid(grid);
        return state2;
      }
      function handleTurnStart3(state2) {
        var state_board = state2.board;
        var state_turn = state2.turn;
        var state_cursorPosition = state2.cursorPosition;
        var state_promote = state2.promote;
        var state_lock = state2.lock;
        var state$1 = {
          board: state_board,
          turn: state_turn,
          selectedPiece: void 0,
          legalMoves: void 0,
          cursorPosition: state_cursorPosition,
          promote: state_promote,
          lock: state_lock
        };
        var color = state_turn;
        var otherColor = Utils2.oppositeColor(color);
        var ownKing = Belt_List.getExn(Belt_List.keep(state_board.pieces, function(p) {
          if (p.TAG === 1) {
            return p._0.color === color;
          } else {
            return false;
          }
        }), 0);
        var otherCoveredPositions = Pieces.getCoveredPositionsForColor(state_board, otherColor);
        var ownKingInCheck = Belt_List.has(otherCoveredPositions, ownKing, function(param, king) {
          if (param[0] === Utils2.getX(king)) {
            return param[1] === Utils2.getY(king);
          } else {
            return false;
          }
        });
        var numLegalMoves = Pieces.getNumLegalMovesForColor(state_board, state_turn);
        if (numLegalMoves === 0) {
          Sounds2.winSound();
          if (ownKingInCheck) {
            var winner = Utils2.oppositeColor(state_turn);
            alert("" + winner + " has won! Refresh the page to play again.");
          } else {
            alert("Stalemate! Refresh the page to play again.");
          }
          return {
            board: state_board,
            turn: state_turn,
            selectedPiece: void 0,
            legalMoves: void 0,
            cursorPosition: state_cursorPosition,
            promote: state_promote,
            lock: true
          };
        }
        Sounds2.turnStartSound(state_turn);
        return draw2(state$1);
      }
      function handleMoveCursor(state2) {
        Sounds2.cursorSound();
        return draw2(state2);
      }
      function handleCancel2(state2) {
        if (state2.lock) {
          return state2;
        }
        var match = state2.selectedPiece;
        if (match !== void 0) {
          Sounds2.successSound();
          return draw2({
            board: state2.board,
            turn: state2.turn,
            selectedPiece: void 0,
            legalMoves: void 0,
            cursorPosition: state2.cursorPosition,
            promote: state2.promote,
            lock: state2.lock
          });
        } else {
          Sounds2.failureSound();
          return state2;
        }
      }
      function handleLeft2(state2) {
        var match = state2.cursorPosition;
        if (state2.lock) {
          return state2;
        }
        var y = match[1];
        var x = match[0];
        var match$1 = state2.turn;
        if (match$1 === "White") {
          if (x <= 0) {
            return state2;
          }
          var state_board = state2.board;
          var state_turn = state2.turn;
          var state_selectedPiece = state2.selectedPiece;
          var state_legalMoves = state2.legalMoves;
          var state_cursorPosition = [
            x - 1 | 0,
            y
          ];
          var state_promote = state2.promote;
          var state_lock = state2.lock;
          var state$1 = {
            board: state_board,
            turn: state_turn,
            selectedPiece: state_selectedPiece,
            legalMoves: state_legalMoves,
            cursorPosition: state_cursorPosition,
            promote: state_promote,
            lock: state_lock
          };
          Sounds2.cursorSound();
          return draw2(state$1);
        }
        if (x >= 7) {
          return state2;
        }
        var state_board$1 = state2.board;
        var state_turn$1 = state2.turn;
        var state_selectedPiece$1 = state2.selectedPiece;
        var state_legalMoves$1 = state2.legalMoves;
        var state_cursorPosition$1 = [
          x + 1 | 0,
          y
        ];
        var state_promote$1 = state2.promote;
        var state_lock$1 = state2.lock;
        var state$2 = {
          board: state_board$1,
          turn: state_turn$1,
          selectedPiece: state_selectedPiece$1,
          legalMoves: state_legalMoves$1,
          cursorPosition: state_cursorPosition$1,
          promote: state_promote$1,
          lock: state_lock$1
        };
        Sounds2.cursorSound();
        return draw2(state$2);
      }
      function handleRight2(state2) {
        var match = state2.cursorPosition;
        if (state2.lock) {
          return state2;
        }
        var y = match[1];
        var x = match[0];
        var match$1 = state2.turn;
        if (match$1 === "White") {
          if (x >= 7) {
            return state2;
          }
          var state_board = state2.board;
          var state_turn = state2.turn;
          var state_selectedPiece = state2.selectedPiece;
          var state_legalMoves = state2.legalMoves;
          var state_cursorPosition = [
            x + 1 | 0,
            y
          ];
          var state_promote = state2.promote;
          var state_lock = state2.lock;
          var state$1 = {
            board: state_board,
            turn: state_turn,
            selectedPiece: state_selectedPiece,
            legalMoves: state_legalMoves,
            cursorPosition: state_cursorPosition,
            promote: state_promote,
            lock: state_lock
          };
          Sounds2.cursorSound();
          return draw2(state$1);
        }
        if (x <= 0) {
          return state2;
        }
        var state_board$1 = state2.board;
        var state_turn$1 = state2.turn;
        var state_selectedPiece$1 = state2.selectedPiece;
        var state_legalMoves$1 = state2.legalMoves;
        var state_cursorPosition$1 = [
          x - 1 | 0,
          y
        ];
        var state_promote$1 = state2.promote;
        var state_lock$1 = state2.lock;
        var state$2 = {
          board: state_board$1,
          turn: state_turn$1,
          selectedPiece: state_selectedPiece$1,
          legalMoves: state_legalMoves$1,
          cursorPosition: state_cursorPosition$1,
          promote: state_promote$1,
          lock: state_lock$1
        };
        Sounds2.cursorSound();
        return draw2(state$2);
      }
      function handleDown2(state2) {
        var match = state2.cursorPosition;
        if (state2.lock) {
          return state2;
        }
        var y = match[1];
        var x = match[0];
        var match$1 = state2.turn;
        if (match$1 === "White") {
          if (y <= 0) {
            return state2;
          }
          var state_board = state2.board;
          var state_turn = state2.turn;
          var state_selectedPiece = state2.selectedPiece;
          var state_legalMoves = state2.legalMoves;
          var state_cursorPosition = [
            x,
            y - 1 | 0
          ];
          var state_promote = state2.promote;
          var state_lock = state2.lock;
          var state$1 = {
            board: state_board,
            turn: state_turn,
            selectedPiece: state_selectedPiece,
            legalMoves: state_legalMoves,
            cursorPosition: state_cursorPosition,
            promote: state_promote,
            lock: state_lock
          };
          Sounds2.cursorSound();
          return draw2(state$1);
        }
        if (y >= 7) {
          return state2;
        }
        var state_board$1 = state2.board;
        var state_turn$1 = state2.turn;
        var state_selectedPiece$1 = state2.selectedPiece;
        var state_legalMoves$1 = state2.legalMoves;
        var state_cursorPosition$1 = [
          x,
          y + 1 | 0
        ];
        var state_promote$1 = state2.promote;
        var state_lock$1 = state2.lock;
        var state$2 = {
          board: state_board$1,
          turn: state_turn$1,
          selectedPiece: state_selectedPiece$1,
          legalMoves: state_legalMoves$1,
          cursorPosition: state_cursorPosition$1,
          promote: state_promote$1,
          lock: state_lock$1
        };
        Sounds2.cursorSound();
        return draw2(state$2);
      }
      function handleUp2(state2) {
        var match = state2.cursorPosition;
        if (state2.lock) {
          return state2;
        }
        var y = match[1];
        var x = match[0];
        var match$1 = state2.turn;
        if (match$1 === "White") {
          if (y >= 7) {
            return state2;
          }
          var state_board = state2.board;
          var state_turn = state2.turn;
          var state_selectedPiece = state2.selectedPiece;
          var state_legalMoves = state2.legalMoves;
          var state_cursorPosition = [
            x,
            y + 1 | 0
          ];
          var state_promote = state2.promote;
          var state_lock = state2.lock;
          var state$1 = {
            board: state_board,
            turn: state_turn,
            selectedPiece: state_selectedPiece,
            legalMoves: state_legalMoves,
            cursorPosition: state_cursorPosition,
            promote: state_promote,
            lock: state_lock
          };
          Sounds2.cursorSound();
          return draw2(state$1);
        }
        if (y <= 0) {
          return state2;
        }
        var state_board$1 = state2.board;
        var state_turn$1 = state2.turn;
        var state_selectedPiece$1 = state2.selectedPiece;
        var state_legalMoves$1 = state2.legalMoves;
        var state_cursorPosition$1 = [
          x,
          y - 1 | 0
        ];
        var state_promote$1 = state2.promote;
        var state_lock$1 = state2.lock;
        var state$2 = {
          board: state_board$1,
          turn: state_turn$1,
          selectedPiece: state_selectedPiece$1,
          legalMoves: state_legalMoves$1,
          cursorPosition: state_cursorPosition$1,
          promote: state_promote$1,
          lock: state_lock$1
        };
        Sounds2.cursorSound();
        return draw2(state$2);
      }
      function handlePromote2(state2, key) {
        if (state2.promote) {
          var match = state2.selectedPiece;
          var maybePiece;
          if (match !== void 0) {
            if (key >= 78) {
              if (key >= 83) {
                maybePiece = void 0;
              } else {
                switch (key) {
                  case 78:
                    maybePiece = Utils2.knight(Utils2.getColor(match), Utils2.getX(match), Utils2.getY(match));
                    break;
                  case 79:
                  case 80:
                    maybePiece = void 0;
                    break;
                  case 81:
                    maybePiece = Utils2.queen(Utils2.getColor(match), Utils2.getX(match), Utils2.getY(match));
                    break;
                  case 82:
                    maybePiece = Utils2.rook(Utils2.getColor(match), Utils2.getX(match), Utils2.getY(match));
                    break;
                }
              }
            } else {
              maybePiece = key !== 66 ? void 0 : Utils2.bishop(Utils2.getColor(match), Utils2.getX(match), Utils2.getY(match));
            }
          } else {
            maybePiece = void 0;
          }
          if (maybePiece !== void 0) {
            var pieces = Belt_List.keep(state2.board.pieces, function(p) {
              if (Utils2.getX(p) !== Utils2.getX(maybePiece)) {
                return true;
              } else {
                return Utils2.getY(p) !== Utils2.getY(maybePiece);
              }
            });
            var board = {
              pieces: {
                hd: maybePiece,
                tl: pieces
              }
            };
            var state$p_turn = state2.turn;
            var state$p_selectedPiece = state2.selectedPiece;
            var state$p_legalMoves = state2.legalMoves;
            var state$p_cursorPosition = state2.cursorPosition;
            var state$p_lock = state2.lock;
            var state$p = {
              board,
              turn: state$p_turn,
              selectedPiece: state$p_selectedPiece,
              legalMoves: state$p_legalMoves,
              cursorPosition: state$p_cursorPosition,
              promote: false,
              lock: state$p_lock
            };
            Sounds2.winSound();
            GameUtils.endTurn();
            return draw2(state$p);
          }
          Sounds2.failureSound();
          return state2;
        }
        Sounds2.failureSound();
        return state2;
      }
      function handleSelect2(state2) {
        if (state2.lock) {
          return state2;
        }
        var piece = Board.getPiece(state2.board, state2.cursorPosition, void 0);
        var match = state2.cursorPosition;
        var y = match[1];
        var x = match[0];
        var moveHelper = function(state3) {
          var selectedPiece2 = Belt_Option.getExn(state3.selectedPiece);
          var promote = function(param) {
            if (selectedPiece2.TAG === 0) {
              return Utils2.promotionRank(selectedPiece2._0) === param[1];
            } else {
              return false;
            }
          };
          var legalMove = Belt_Option.flatMap(state3.legalMoves, function(moves) {
            return Belt_List.get(Belt_List.keep(moves, function(param) {
              if (param[0] === x) {
                return param[1] === y;
              } else {
                return false;
              }
            }), 0);
          });
          if (legalMove !== void 0) {
            var state$p_board2 = Board.confirmMove(state3.board, selectedPiece2, legalMove, true);
            var state$p_turn2 = state3.turn;
            var state$p_selectedPiece2 = Utils2.withPosition(selectedPiece2, legalMove);
            var state$p_legalMoves2 = state3.legalMoves;
            var state$p_cursorPosition2 = state3.cursorPosition;
            var state$p_promote2 = promote(legalMove);
            var state$p2 = {
              board: state$p_board2,
              turn: state$p_turn2,
              selectedPiece: state$p_selectedPiece2,
              legalMoves: state$p_legalMoves2,
              cursorPosition: state$p_cursorPosition2,
              promote: state$p_promote2,
              lock: true
            };
            if (Belt_List.size(state$p_board2.pieces) < Belt_List.size(state3.board.pieces)) {
              Sounds2.captureSound();
            } else {
              Sounds2.moveSound();
            }
            if (state$p_promote2) {
              return draw2(state$p2);
            } else {
              GameUtils.endTurn();
              return draw2(state$p2);
            }
          }
          Sounds2.failureSound();
          return state3;
        };
        var selectedPiece = state2.selectedPiece;
        if (selectedPiece !== void 0) {
          if (piece === void 0) {
            return moveHelper(state2);
          }
          if (Utils2.getColor(piece) !== state2.turn) {
            return moveHelper(state2);
          }
          if (!(x !== Utils2.getX(selectedPiece) || y !== Utils2.getY(selectedPiece))) {
            return state2;
          }
          var state$p_board = state2.board;
          var state$p_turn = state2.turn;
          var state$p_legalMoves = Pieces.getLegalMoves(piece, state2.board);
          var state$p_cursorPosition = state2.cursorPosition;
          var state$p_promote = state2.promote;
          var state$p_lock = state2.lock;
          var state$p = {
            board: state$p_board,
            turn: state$p_turn,
            selectedPiece: piece,
            legalMoves: state$p_legalMoves,
            cursorPosition: state$p_cursorPosition,
            promote: state$p_promote,
            lock: state$p_lock
          };
          Sounds2.successSound();
          return draw2(state$p);
        }
        if (piece !== void 0) {
          if (Utils2.getColor(piece) === state2.turn) {
            var state$p_board$1 = state2.board;
            var state$p_turn$1 = state2.turn;
            var state$p_selectedPiece = piece;
            var state$p_legalMoves$1 = Pieces.getLegalMoves(piece, state2.board);
            var state$p_cursorPosition$1 = state2.cursorPosition;
            var state$p_promote$1 = state2.promote;
            var state$p_lock$1 = state2.lock;
            var state$p$1 = {
              board: state$p_board$1,
              turn: state$p_turn$1,
              selectedPiece: state$p_selectedPiece,
              legalMoves: state$p_legalMoves$1,
              cursorPosition: state$p_cursorPosition$1,
              promote: state$p_promote$1,
              lock: state$p_lock$1
            };
            Sounds2.successSound();
            return draw2(state$p$1);
          }
          Utils2.toggleEmphasis(piece);
          Sounds2.successSound();
          return draw2(state2);
        }
        Sounds2.failureSound();
        return state2;
      }
      exports.drawGrid = drawGrid2;
      exports.endTurn = endTurn2;
      exports.winSound = winSound;
      exports.cursorSound = cursorSound;
      exports.successSound = successSound;
      exports.failureSound = failureSound;
      exports.moveSound = moveSound;
      exports.captureSound = captureSound;
      exports.turnStartSound = turnStartSound;
      exports.init = init2;
      exports.draw = draw2;
      exports.handleTurnStart = handleTurnStart3;
      exports.handleMoveCursor = handleMoveCursor;
      exports.handleCancel = handleCancel2;
      exports.handleLeft = handleLeft2;
      exports.handleRight = handleRight2;
      exports.handleDown = handleDown2;
      exports.handleUp = handleUp2;
      exports.handlePromote = handlePromote2;
      exports.handleSelect = handleSelect2;
    }
  });

  // src/GameUtils.js
  var GameUtils_exports = {};
  __export(GameUtils_exports, {
    drawGrid: () => drawGrid,
    endTurn: () => endTurn
  });
  function endTurn() {
    setTimeout(() => {
      state.lock = false;
      state.turn = Utils.oppositeColor(state.turn);
      state = GameState.handleTurnStart(state);
    }, 1e3);
  }
  function drawGrid(data) {
    var grid = svg.selectAll("g").data(data, (d) => d.id);
    var enter = grid.enter().append("g");
    enter.append("rect").attr("class", "base");
    enter.append("rect").attr("class", "overlay");
    enter.append("rect").attr("class", "selection");
    enter.append("image");
    grid.select(".base").attr("width", Grid.size).attr("height", Grid.size).attr("transform", (d) => `translate(${Grid.getX(d)} ${Grid.getY(d)})`).attr("fill", (d) => Grid.getInCheck(d) ? "red" : Grid.getColor(d));
    grid.select(".overlay").attr("width", Grid.size).attr("height", Grid.size).attr("transform", (d) => `translate(${Grid.getX(d)} ${Grid.getY(d)})`).attr("fill", (d) => Grid.getOverlayColor(d)).style("opacity", 0.8).style("display", (d) => Grid.getOverlayColor(d) === "none" ? "none" : "inline");
    grid.select("image").attr("transform", (d) => `translate(${Grid.getX(d)} ${Grid.getY(d)})`).attr("width", Grid.size).attr("height", Grid.size).attr("id", (d) => Grid.positionToId(d.x, d.y)).attr("xlink:href", (d) => d.piece === void 0 ? "" : `./${Utils.getAsset(d.piece)}.gif`).style("display", (d) => d.piece === void 0 ? "none" : "inline");
    grid.select(".selection").attr("width", Grid.size - Grid.stroke).attr("height", Grid.size - Grid.stroke).attr("transform", (d) => `translate(${Grid.getX(d) + Grid.stroke / 2} ${Grid.getY(d) + Grid.stroke / 2})`).attr("fill", "none").attr("stroke-width", `${Grid.stroke}px`).attr("class", "selection").attr("stroke", "goldenrod").style("display", (d) => d.selection ? "inline" : "none");
    grid.exit().remove();
  }
  var Grid, Utils, GameState;
  var init_GameUtils = __esm({
    "src/GameUtils.js"() {
      Grid = __toESM(require_Grid_bs());
      Utils = __toESM(require_Utils_bs());
      GameState = __toESM(require_GameState_bs());
    }
  });

  // src/Game.js
  var Grid2 = __toESM(require_Grid_bs());
  var Sounds = __toESM(require_Sounds());
  init_GameUtils();
  var GameState2 = __toESM(require_GameState_bs());
  function setup() {
    var body = d3.select("body");
    body.on("keydown", () => {
      var key = d3.event.keyCode;
      switch (key) {
        case 38:
        case 87:
          state = GameState2.handleUp(state);
          break;
        case 37:
        case 65:
          state = GameState2.handleLeft(state);
          break;
        case 40:
        case 83:
          state = GameState2.handleDown(state);
          break;
        case 39:
        case 68:
          state = GameState2.handleRight(state);
          break;
        case 88:
          state = GameState2.handleSelect(state);
          break;
        case 90:
          state = GameState2.handleCancel(state);
          break;
        case 66:
        case 78:
        case 82:
        case 81:
          state = GameState2.handlePromote(state, key);
          break;
      }
    });
    state = GameState2.handleTurnStart(state);
    GameState2.draw(state);
  }
  window.onload = () => {
    state = GameState2.init();
    svg = d3.select("#board").append("svg").attr("width", Grid2.size * 8).attr("height", Grid2.size * 8);
    setup();
  };
})();
