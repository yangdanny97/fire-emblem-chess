(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
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
      var winSound2 = () => {
        victory.play();
      };
      exports.winSound = winSound2;
      var cursorSound2 = () => {
        cursor.play();
      };
      exports.cursorSound = cursorSound2;
      var successSound2 = () => {
        select.play();
      };
      exports.successSound = successSound2;
      var failureSound2 = () => {
        warning.play();
      };
      exports.failureSound = failureSound2;
      var moveSound2 = () => {
        move.play();
      };
      exports.moveSound = moveSound2;
      var turnStartSound2 = (turn) => {
        if (turn === 0) {
          white_turn.play();
        } else {
          black_turn.play();
        }
      };
      exports.turnStartSound = turnStartSound2;
      var captureSound2 = () => {
        capture.play();
      };
      exports.captureSound = captureSound2;
    }
  });

  // src/Utils.res.mjs
  function oppositeColor(color) {
    if (color === "White") {
      return "Black";
    } else {
      return "White";
    }
  }
  function getAsset(piece) {
    switch (piece.TAG) {
      case "Pawn":
        return `assets/` + piece._0.color + `/pawn`;
      case "King":
        return `assets/` + piece._0.color + `/king`;
      case "Queen":
        return `assets/` + piece._0.color + `/queen`;
      case "Bishop":
        return `assets/` + piece._0.color + `/bishop`;
      case "Knight":
        return `assets/` + piece._0.color + `/knight`;
      case "Rook":
        return `assets/` + piece._0.color + `/rook`;
    }
  }
  function getColor(piece) {
    switch (piece.TAG) {
      default:
        return piece._0.color;
    }
  }
  function getEmphasis(piece) {
    switch (piece.TAG) {
      default:
        return piece._0.emphasizeCoverRange;
    }
  }
  function toggleEmphasis(piece) {
    switch (piece.TAG) {
      case "Pawn":
      case "King":
        break;
      default:
        let x = piece._0;
        x.emphasizeCoverRange = !x.emphasizeCoverRange;
        return;
    }
    let p = piece._0;
    p.emphasizeCoverRange = !p.emphasizeCoverRange;
  }
  function getX(piece) {
    switch (piece.TAG) {
      default:
        return piece._0.x;
    }
  }
  function getY(piece) {
    switch (piece.TAG) {
      default:
        return piece._0.y;
    }
  }
  function withMoved(piece) {
    switch (piece.TAG) {
      case "Pawn":
        let p = piece._0;
        return {
          TAG: "Pawn",
          _0: {
            x: p.x,
            y: p.y,
            color: p.color,
            hasMoved: true,
            emphasizeCoverRange: p.emphasizeCoverRange,
            hasJustMoved2Spaces: false
          }
        };
      case "King":
        let k = piece._0;
        return {
          TAG: "King",
          _0: {
            x: k.x,
            y: k.y,
            color: k.color,
            hasMoved: true,
            emphasizeCoverRange: k.emphasizeCoverRange,
            inCheck: k.inCheck
          }
        };
      case "Queen":
        let p$1 = piece._0;
        return {
          TAG: "Queen",
          _0: {
            x: p$1.x,
            y: p$1.y,
            color: p$1.color,
            hasMoved: true,
            emphasizeCoverRange: p$1.emphasizeCoverRange
          }
        };
      case "Bishop":
        let p$2 = piece._0;
        return {
          TAG: "Bishop",
          _0: {
            x: p$2.x,
            y: p$2.y,
            color: p$2.color,
            hasMoved: true,
            emphasizeCoverRange: p$2.emphasizeCoverRange
          }
        };
      case "Knight":
        let p$3 = piece._0;
        return {
          TAG: "Knight",
          _0: {
            x: p$3.x,
            y: p$3.y,
            color: p$3.color,
            hasMoved: true,
            emphasizeCoverRange: p$3.emphasizeCoverRange
          }
        };
      case "Rook":
        let p$4 = piece._0;
        return {
          TAG: "Rook",
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
      TAG: "Pawn",
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
      TAG: "Pawn",
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
    let y = param[1];
    let x = param[0];
    switch (piece.TAG) {
      case "Pawn":
        let p = piece._0;
        return {
          TAG: "Pawn",
          _0: {
            x,
            y,
            color: p.color,
            hasMoved: p.hasMoved,
            emphasizeCoverRange: p.emphasizeCoverRange,
            hasJustMoved2Spaces: p.hasJustMoved2Spaces
          }
        };
      case "King":
        let k = piece._0;
        return {
          TAG: "King",
          _0: {
            x,
            y,
            color: k.color,
            hasMoved: k.hasMoved,
            emphasizeCoverRange: k.emphasizeCoverRange,
            inCheck: k.inCheck
          }
        };
      case "Queen":
        let p$1 = piece._0;
        return {
          TAG: "Queen",
          _0: {
            x,
            y,
            color: p$1.color,
            hasMoved: p$1.hasMoved,
            emphasizeCoverRange: p$1.emphasizeCoverRange
          }
        };
      case "Bishop":
        let p$2 = piece._0;
        return {
          TAG: "Bishop",
          _0: {
            x,
            y,
            color: p$2.color,
            hasMoved: p$2.hasMoved,
            emphasizeCoverRange: p$2.emphasizeCoverRange
          }
        };
      case "Knight":
        let p$3 = piece._0;
        return {
          TAG: "Knight",
          _0: {
            x,
            y,
            color: p$3.color,
            hasMoved: p$3.hasMoved,
            emphasizeCoverRange: p$3.emphasizeCoverRange
          }
        };
      case "Rook":
        let p$4 = piece._0;
        return {
          TAG: "Rook",
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
    let match = p.color;
    if (match === "White") {
      return 7;
    } else {
      return 0;
    }
  }
  function backRank(p) {
    let match = p.color;
    if (match === "White") {
      return 0;
    } else {
      return 7;
    }
  }
  function pawnOffsetHelper(p, n) {
    let match = p.color;
    if (match === "White") {
      return n;
    } else {
      return -n | 0;
    }
  }
  function pawn(color, x, y) {
    return {
      TAG: "Pawn",
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
      TAG: "King",
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
      TAG: "Queen",
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
      TAG: "Rook",
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
      TAG: "Bishop",
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
      TAG: "Knight",
      _0: {
        x,
        y,
        color,
        hasMoved: false,
        emphasizeCoverRange: false
      }
    };
  }

  // node_modules/@rescript/runtime/lib/es6/Primitive_option.js
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
  function valFromOption(x) {
    if (x === null || x.BS_PRIVATE_NESTED_SOME_NONE === void 0) {
      return x;
    }
    let depth = x.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return;
    } else {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
      };
    }
  }

  // node_modules/@rescript/runtime/lib/es6/Stdlib_Array.js
  function fromInitializer(length2, f) {
    if (length2 <= 0) {
      return [];
    }
    let arr = new Array(length2);
    for (let i = 0; i < length2; ++i) {
      arr[i] = f(i);
    }
    return arr;
  }

  // node_modules/@rescript/runtime/lib/es6/Stdlib_List.js
  function get(x, n) {
    if (n < 0) {
      return;
    } else {
      let _x = x;
      let _n = n;
      while (true) {
        let n$1 = _n;
        let x$1 = _x;
        if (x$1 === 0) {
          return;
        }
        if (n$1 === 0) {
          return some(x$1.hd);
        }
        _n = n$1 - 1 | 0;
        _x = x$1.tl;
        continue;
      }
      ;
    }
  }
  function getOrThrow(x, n) {
    if (n < 0) {
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    let _x = x;
    let _n = n;
    while (true) {
      let n$1 = _n;
      let x$1 = _x;
      if (x$1 !== 0) {
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
  function copyAuxCont(_cellX, _prec) {
    while (true) {
      let prec = _prec;
      let cellX = _cellX;
      if (cellX === 0) {
        return prec;
      }
      let next = {
        hd: cellX.hd,
        tl: (
          /* [] */
          0
        )
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
      let prec = _prec;
      let cellX = _cellX;
      if (cellX === 0) {
        return;
      }
      let t = cellX.tl;
      let h = cellX.hd;
      if (f(h)) {
        let next = {
          hd: h,
          tl: (
            /* [] */
            0
          )
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
  function copyAuxWithMap(_cellX, _prec, f) {
    while (true) {
      let prec = _prec;
      let cellX = _cellX;
      if (cellX === 0) {
        return;
      }
      let next = {
        hd: f(cellX.hd),
        tl: (
          /* [] */
          0
        )
      };
      prec.tl = next;
      _prec = next;
      _cellX = cellX.tl;
      continue;
    }
    ;
  }
  function concat(xs, ys) {
    if (xs === 0) {
      return ys;
    }
    let cell = {
      hd: xs.hd,
      tl: (
        /* [] */
        0
      )
    };
    copyAuxCont(xs.tl, cell).tl = ys;
    return cell;
  }
  function map(xs, f) {
    if (xs === 0) {
      return (
        /* [] */
        0
      );
    }
    let cell = {
      hd: f(xs.hd),
      tl: (
        /* [] */
        0
      )
    };
    copyAuxWithMap(xs.tl, cell, f);
    return cell;
  }
  function fromInitializer2(n, f) {
    if (n <= 0) {
      return (
        /* [] */
        0
      );
    }
    let headX = {
      hd: f(0),
      tl: (
        /* [] */
        0
      )
    };
    let cur = headX;
    let i = 1;
    while (i < n) {
      let v = {
        hd: f(i),
        tl: (
          /* [] */
          0
        )
      };
      cur.tl = v;
      cur = v;
      i = i + 1 | 0;
    }
    ;
    return headX;
  }
  function length(xs) {
    let _x = xs;
    let _acc = 0;
    while (true) {
      let acc = _acc;
      let x = _x;
      if (x === 0) {
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
      let x = _x;
      let i = _i;
      if (x === 0) {
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
    let _i = a.length - 1 | 0;
    let _res = (
      /* [] */
      0
    );
    while (true) {
      let res = _res;
      let i = _i;
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
    let len = length(x);
    let arr = new Array(len);
    fillAux(arr, 0, x);
    return arr;
  }
  function flatAux(_prec, _xs) {
    while (true) {
      let xs = _xs;
      let prec = _prec;
      if (xs !== 0) {
        _xs = xs.tl;
        _prec = copyAuxCont(xs.hd, prec);
        continue;
      }
      prec.tl = /* [] */
      0;
      return;
    }
    ;
  }
  function flat(_xs) {
    while (true) {
      let xs = _xs;
      if (xs === 0) {
        return (
          /* [] */
          0
        );
      }
      let match = xs.hd;
      if (match !== 0) {
        let cell = {
          hd: match.hd,
          tl: (
            /* [] */
            0
          )
        };
        flatAux(copyAuxCont(match.tl, cell), xs.tl);
        return cell;
      }
      _xs = xs.tl;
      continue;
    }
    ;
  }
  function forEach(_xs, f) {
    while (true) {
      let xs = _xs;
      if (xs === 0) {
        return;
      }
      f(xs.hd);
      _xs = xs.tl;
      continue;
    }
    ;
  }
  function reduce(_l, _accu, f) {
    while (true) {
      let accu = _accu;
      let l = _l;
      if (l === 0) {
        return accu;
      }
      _accu = f(accu, l.hd);
      _l = l.tl;
      continue;
    }
    ;
  }
  function has(_xs, x, eq) {
    while (true) {
      let xs = _xs;
      if (xs === 0) {
        return false;
      }
      if (eq(xs.hd, x)) {
        return true;
      }
      _xs = xs.tl;
      continue;
    }
    ;
  }
  function sort(xs, cmp) {
    let arr = toArray(xs);
    arr.sort(cmp);
    return fromArray(arr);
  }
  function find(_xs, p) {
    while (true) {
      let xs = _xs;
      if (xs === 0) {
        return;
      }
      let x = xs.hd;
      if (p(x)) {
        return some(x);
      }
      _xs = xs.tl;
      continue;
    }
    ;
  }
  function filter(_xs, p) {
    while (true) {
      let xs = _xs;
      if (xs === 0) {
        return (
          /* [] */
          0
        );
      }
      let t = xs.tl;
      let h = xs.hd;
      if (p(h)) {
        let cell = {
          hd: h,
          tl: (
            /* [] */
            0
          )
        };
        copyAuxWitFilter(p, t, cell);
        return cell;
      }
      _xs = t;
      continue;
    }
    ;
  }
  var size = length;

  // node_modules/@rescript/runtime/lib/es6/Stdlib_JsError.js
  function panic(msg) {
    throw new Error(`Panic! ` + msg);
  }

  // node_modules/@rescript/runtime/lib/es6/Stdlib_Option.js
  function getOrThrow2(x, message) {
    if (x !== void 0) {
      return valFromOption(x);
    } else {
      return panic(message !== void 0 ? message : "Option.getOrThrow called for None value");
    }
  }
  function flatMap(opt, f) {
    if (opt !== void 0) {
      return f(valFromOption(opt));
    }
  }
  function isSome(x) {
    return x !== void 0;
  }

  // src/Board.res.mjs
  function init() {
    let piecesArr = [
      pawn("White", 0, 1),
      pawn("White", 1, 1),
      pawn("White", 2, 1),
      pawn("White", 3, 1),
      pawn("White", 4, 1),
      pawn("White", 5, 1),
      pawn("White", 6, 1),
      pawn("White", 7, 1),
      rook("White", 0, 0),
      rook("White", 7, 0),
      knight("White", 1, 0),
      knight("White", 6, 0),
      bishop("White", 2, 0),
      bishop("White", 5, 0),
      queen("White", 3, 0),
      king("White", 4, 0),
      pawn("Black", 0, 6),
      pawn("Black", 1, 6),
      pawn("Black", 2, 6),
      pawn("Black", 3, 6),
      pawn("Black", 4, 6),
      pawn("Black", 5, 6),
      pawn("Black", 6, 6),
      pawn("Black", 7, 6),
      rook("Black", 0, 7),
      rook("Black", 7, 7),
      knight("Black", 1, 7),
      knight("Black", 6, 7),
      bishop("Black", 2, 7),
      bishop("Black", 5, 7),
      queen("Black", 3, 7),
      king("Black", 4, 7)
    ];
    return {
      pieces: fromArray(piecesArr)
    };
  }
  function getPiece(board, param, color) {
    let y = param[1];
    let x = param[0];
    return find(board.pieces, (p) => {
      let colorPredicate = color !== void 0 ? getColor(p) === color : true;
      if (getX(p) === x && getY(p) === y) {
        return colorPredicate;
      } else {
        return false;
      }
    });
  }
  function hasPiece(board, position, color) {
    return isSome(getPiece(board, position, color));
  }
  function hasOppositeColoredPiece(board, position, color) {
    return hasPiece(board, position, oppositeColor(color));
  }
  function checkUnobstructed(board, piece, param, canCapture) {
    let y = param[1];
    let x = param[0];
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return false;
    }
    if (!canCapture) {
      return !hasPiece(board, [
        x,
        y
      ], void 0);
    }
    let target = getPiece(board, [
      x,
      y
    ], void 0);
    if (target !== void 0) {
      if (target.TAG === "King") {
        return false;
      } else {
        return getColor(target) !== getColor(piece);
      }
    } else {
      return true;
    }
  }
  function confirmMove(board, piece, position, param) {
    let newY = position[1];
    let newX = position[0];
    let noop = (b) => b;
    let match;
    switch (piece.TAG) {
      case "Pawn":
        let p = piece._0;
        let newPawn = (p.y - newY | 0) === -2 || (p.y - newY | 0) === 2 ? withPosition(with2Spaces(p), position) : withMoved(withPosition(piece, position));
        let callback = p.x !== newX && p.y !== newY && !hasPiece(board, position, void 0) ? (b) => ({
          pieces: filter(b.pieces, (i) => {
            if (getX(i) !== newX) {
              return true;
            } else {
              return getY(i) !== p.y;
            }
          })
        }) : noop;
        match = [
          newPawn,
          callback
        ];
        break;
      case "King":
        let k = piece._0;
        let y = backRank(k);
        let castleHelper = (oldRookX, newRookX, board2) => {
          let rook2 = getOrThrow2(getPiece(board2, [
            oldRookX,
            y
          ], void 0), void 0);
          return (b) => confirmMove(b, rook2, [
            newRookX,
            y
          ], true);
        };
        match = k.hasMoved ? [
          withMoved(withPosition(piece, position)),
          noop
        ] : newX === 2 && newY === y ? [
          withMoved(withPosition(piece, position)),
          castleHelper(0, 3, board)
        ] : newX === 6 && newY === y ? [
          withMoved(withPosition(piece, position)),
          castleHelper(7, 5, board)
        ] : [
          withMoved(withPosition(piece, position)),
          noop
        ];
        break;
      default:
        match = [
          withMoved(withPosition(piece, position)),
          noop
        ];
    }
    let newPiece = match[0];
    let pieces_1 = map(filter(board.pieces, (p) => {
      if (getX(p) !== getX(piece) || getY(p) !== getY(piece)) {
        return getX(p) !== getX(newPiece) || getY(p) !== getY(newPiece);
      } else {
        return false;
      }
    }), (p) => {
      if (p.TAG === "Pawn") {
        return disable2Spaces(p._0);
      } else {
        return p;
      }
    });
    let pieces = {
      hd: newPiece,
      tl: pieces_1
    };
    return match[1]({
      pieces
    });
  }

  // src/Pieces.res.mjs
  function canCover(piece, board, position) {
    let p = getPiece(board, position, void 0);
    if (p !== void 0 && (p.TAG === "King" || getColor(p) === getColor(piece))) {
      return true;
    } else {
      return checkUnobstructed(board, piece, position, true);
    }
  }
  function unobstructedPositionsHelper(piece, board, a, b, c, d) {
    let positionHelper = (acc, position) => {
      if (!acc[0]) {
        return [
          false,
          acc[1]
        ];
      }
      let lst = acc[1];
      if (canCover(piece, board, position)) {
        if (hasPiece(board, position, void 0)) {
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
    return flat(map({
      hd: a,
      tl: {
        hd: b,
        tl: {
          hd: c,
          tl: {
            hd: d,
            tl: (
              /* [] */
              0
            )
          }
        }
      }
    }, (l) => reduce(l, [
      true,
      /* [] */
      0
    ], positionHelper)[1]));
  }
  function getUnobstructedCardinalPositions(piece, board) {
    let up = fromInitializer2(7 - getY(piece) | 0, (i) => [
      getX(piece),
      (getY(piece) + i | 0) + 1 | 0
    ]);
    let down = fromInitializer2(getY(piece), (i) => [
      getX(piece),
      (getY(piece) - i | 0) - 1 | 0
    ]);
    let left = fromInitializer2(getX(piece), (i) => [
      (getX(piece) - i | 0) - 1 | 0,
      getY(piece)
    ]);
    let right = fromInitializer2(7 - getX(piece) | 0, (i) => [
      (getX(piece) + i | 0) + 1 | 0,
      getY(piece)
    ]);
    return unobstructedPositionsHelper(piece, board, up, down, left, right);
  }
  function getUnobstructedDiagonalPositions(piece, board) {
    let ul = fromInitializer2(Math.min(getX(piece), 7 - getY(piece) | 0), (i) => [
      (getX(piece) - i | 0) - 1 | 0,
      (getY(piece) + i | 0) + 1 | 0
    ]);
    let ur = fromInitializer2(7 - Math.max(getX(piece), getY(piece)) | 0, (i) => [
      (getX(piece) + i | 0) + 1 | 0,
      (getY(piece) + i | 0) + 1 | 0
    ]);
    let dl = fromInitializer2(Math.min(getX(piece), getY(piece)), (i) => [
      (getX(piece) - i | 0) - 1 | 0,
      (getY(piece) - i | 0) - 1 | 0
    ]);
    let dr = fromInitializer2(Math.min(7 - getX(piece) | 0, getY(piece)), (i) => [
      (getX(piece) + i | 0) + 1 | 0,
      (getY(piece) - i | 0) - 1 | 0
    ]);
    return unobstructedPositionsHelper(piece, board, ul, ur, dl, dr);
  }
  function getCoveredPositions(piece, board) {
    switch (piece.TAG) {
      case "Pawn":
        let p = piece._0;
        let positions_0 = [
          p.x - 1 | 0,
          p.y + pawnOffsetHelper(p, 1) | 0
        ];
        let positions_1 = {
          hd: [
            p.x + 1 | 0,
            p.y + pawnOffsetHelper(p, 1) | 0
          ],
          tl: (
            /* [] */
            0
          )
        };
        let positions = {
          hd: positions_0,
          tl: positions_1
        };
        return filter(positions, (param) => {
          let y = param[1];
          if (y >= 0 && y <= 7) {
            return canCover(piece, board, [
              param[0],
              y
            ]);
          } else {
            return false;
          }
        });
      case "King":
        let k = piece._0;
        let positions_0$1 = [
          k.x - 1 | 0,
          k.y
        ];
        let positions_1$1 = {
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
                      tl: (
                        /* [] */
                        0
                      )
                    }
                  }
                }
              }
            }
          }
        };
        let positions$1 = {
          hd: positions_0$1,
          tl: positions_1$1
        };
        return filter(positions$1, (p2) => canCover(piece, board, p2));
      case "Queen":
        return concat(getUnobstructedDiagonalPositions(piece, board), getUnobstructedCardinalPositions(piece, board));
      case "Bishop":
        return getUnobstructedDiagonalPositions(piece, board);
      case "Knight":
        let n = piece._0;
        let positions_0$2 = [
          n.x - 2 | 0,
          n.y - 1 | 0
        ];
        let positions_1$2 = {
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
                      tl: (
                        /* [] */
                        0
                      )
                    }
                  }
                }
              }
            }
          }
        };
        let positions$2 = {
          hd: positions_0$2,
          tl: positions_1$2
        };
        return filter(positions$2, (p2) => canCover(piece, board, p2));
      case "Rook":
        return getUnobstructedCardinalPositions(piece, board);
    }
  }
  function validBoard(board, movedColor) {
    let ownKing = getOrThrow(filter(board.pieces, (p) => {
      if (p.TAG === "King") {
        return p._0.color === movedColor;
      } else {
        return false;
      }
    }), 0);
    let otherCoveredPositions = getCoveredPositionsForColor(board, oppositeColor(movedColor));
    return !has(otherCoveredPositions, [
      getX(ownKing),
      getY(ownKing)
    ], (param, param$1) => {
      if (param[0] === param$1[0]) {
        return param[1] === param$1[1];
      } else {
        return false;
      }
    });
  }
  function coveredPositionsHelper(pieces, board) {
    return reduce(
      sort(flat(reduce(
        pieces,
        /* [] */
        0,
        (acc, p) => ({
          hd: getCoveredPositions(p, board),
          tl: acc
        })
      )), (param, param$1) => {
        let x2 = param$1[0];
        let x1 = param[0];
        if (x1 === x2) {
          return param[1] - param$1[1] | 0;
        } else {
          return x1 - x2 | 0;
        }
      }),
      /* [] */
      0,
      (acc, param) => {
        let y1 = param[1];
        let x1 = param[0];
        if (acc === 0) {
          return {
            hd: [
              x1,
              y1
            ],
            tl: (
              /* [] */
              0
            )
          };
        }
        let match = acc.hd;
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
      }
    );
  }
  function getCoveredPositionsForColor(board, color) {
    return coveredPositionsHelper(filter(board.pieces, (p) => getColor(p) === color), board);
  }
  function validStateForMove(board, piece, position) {
    let newBoard = confirmMove(board, piece, position, false);
    return validBoard(newBoard, getColor(piece));
  }
  function getLegalMoves(piece, board) {
    switch (piece.TAG) {
      case "Pawn":
        let p = piece._0;
        let oneSpace_0 = p.x;
        let oneSpace_1 = p.y + pawnOffsetHelper(p, 1) | 0;
        let oneSpace = [
          oneSpace_0,
          oneSpace_1
        ];
        let twoSpace_0 = p.x;
        let twoSpace_1 = p.y + pawnOffsetHelper(p, 2) | 0;
        let twoSpace = [
          twoSpace_0,
          twoSpace_1
        ];
        let movement = checkUnobstructed(board, piece, oneSpace, false) ? !p.hasMoved && checkUnobstructed(board, piece, twoSpace, false) ? {
          hd: oneSpace,
          tl: {
            hd: twoSpace,
            tl: (
              /* [] */
              0
            )
          }
        } : {
          hd: oneSpace,
          tl: (
            /* [] */
            0
          )
        } : (
          /* [] */
          0
        );
        let capture = filter(getCoveredPositions(piece, board), (pos) => {
          if (hasOppositeColoredPiece(board, pos, p.color)) {
            return true;
          }
          let otherPiece = getPiece(board, [
            pos[0],
            p.y
          ], oppositeColor(p.color));
          if (otherPiece !== void 0 && otherPiece.TAG === "Pawn") {
            return otherPiece._0.hasJustMoved2Spaces;
          } else {
            return false;
          }
        });
        return filter(concat(movement, capture), (pos) => validStateForMove(board, {
          TAG: "Pawn",
          _0: p
        }, pos));
      case "King":
        let k = piece._0;
        let regularMoves = filter(getCoveredPositions(piece, board), (p2) => {
          if (checkUnobstructed(board, {
            TAG: "King",
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
        let y = backRank(k);
        let leftRook = getPiece(board, [
          0,
          y
        ], k.color);
        let rightRook = getPiece(board, [
          7,
          y
        ], k.color);
        let leftCastle = leftRook !== void 0 && leftRook.TAG === "Rook" && !(leftRook._0.hasMoved || hasPiece(board, [
          1,
          y
        ], void 0) || hasPiece(board, [
          2,
          y
        ], void 0) || hasPiece(board, [
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
        let rightCastle = rightRook !== void 0 && rightRook.TAG === "Rook" && !(rightRook._0.hasMoved || hasPiece(board, [
          5,
          y
        ], void 0) || hasPiece(board, [
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
        return filter(getCoveredPositions(piece, board), (pos) => {
          if (checkUnobstructed(board, piece, pos, true)) {
            return validStateForMove(board, piece, pos);
          } else {
            return false;
          }
        });
    }
  }
  function getEmphasizedCoveredPositionsForColor(board, color) {
    return coveredPositionsHelper(filter(board.pieces, (p) => {
      if (getColor(p) === color) {
        return getEmphasis(p);
      } else {
        return false;
      }
    }), board);
  }
  function getNumLegalMovesForColor(board, color) {
    return reduce(filter(board.pieces, (p) => getColor(p) === color), 0, (acc, x) => acc + size(getLegalMoves(x, board)) | 0);
  }

  // src/Grid.res.mjs
  var stroke = 12;
  var size2 = 92;
  function positionToId(x, y) {
    return String.fromCharCode(x + 65 | 0) + (y + 1 | 0).toString();
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
      id: positionToId(x, y)
    };
  }
  function makeGrid(state2) {
    let match = state2.cursorPosition;
    let otherColor = oppositeColor(state2.turn);
    let coveredPositions = getCoveredPositionsForColor(state2.board, otherColor);
    let emphasizedCoveredPositions = getEmphasizedCoveredPositionsForColor(state2.board, otherColor);
    let grid = fromInitializer(8, (x) => fromInitializer(8, (y) => makeSquare(x, y, state2.turn)));
    forEach(state2.board.pieces, (p2) => {
      grid[getX(p2)][getY(p2)].piece = p2;
    });
    forEach(coveredPositions, (param) => {
      grid[param[0]][param[1]].covered = true;
    });
    forEach(emphasizedCoveredPositions, (param) => {
      grid[param[0]][param[1]].coveredAndSelected = true;
    });
    grid[match[0]][match[1]].selection = true;
    let p = state2.selectedPiece;
    if (p !== void 0) {
      grid[getX(p)][getY(p)].selection = true;
      let l = state2.legalMoves;
      if (l !== void 0) {
        forEach(l, (param) => {
          grid[param[0]][param[1]].movement = true;
        });
      }
    }
    return [].concat(...grid);
  }
  function getInCheck(square) {
    let match = square.piece;
    if (match !== void 0 && match.TAG === "King" && match._0.color === square.color) {
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
  function getOverlayColor(square) {
    let inCheck = getInCheck(square);
    let blueOrPurple = square.movement ? square.covered ? "purple" : "blue" : "none";
    if (square.coveredAndSelected && !square.movement && !inCheck) {
      return "red";
    }
    let match = square.piece;
    if (match !== void 0 && !inCheck && !square.movement && square.covered) {
      return "lightcoral";
    } else {
      return blueOrPurple;
    }
  }
  function getX2(square) {
    let match = square.color;
    if (match === "White") {
      return square.x * size2 | 0;
    } else {
      return (7 - square.x | 0) * size2 | 0;
    }
  }
  function getY2(square) {
    let match = square.color;
    if (match === "White") {
      return (7 - square.y | 0) * size2 | 0;
    } else {
      return square.y * size2 | 0;
    }
  }

  // src/Game.js
  var Sounds2 = __toESM(require_Sounds());

  // src/GameState.res.mjs
  var Sounds = __toESM(require_Sounds(), 1);
  function init2() {
    return {
      board: init(),
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
  function draw(state2) {
    let grid = makeGrid(state2);
    drawGrid(grid);
    return state2;
  }
  function handleTurnStart(state2) {
    let state_board = state2.board;
    let state_turn = state2.turn;
    let state_cursorPosition = state2.cursorPosition;
    let state_promote = state2.promote;
    let state_lock = state2.lock;
    let state$1 = {
      board: state_board,
      turn: state_turn,
      selectedPiece: void 0,
      legalMoves: void 0,
      cursorPosition: state_cursorPosition,
      promote: state_promote,
      lock: state_lock
    };
    let color = state_turn;
    let otherColor = oppositeColor(color);
    let ownKing = getOrThrow(filter(state_board.pieces, (p) => {
      if (p.TAG === "King") {
        return p._0.color === color;
      } else {
        return false;
      }
    }), 0);
    let otherCoveredPositions = getCoveredPositionsForColor(state_board, otherColor);
    let ownKingInCheck = has(otherCoveredPositions, ownKing, (param, king2) => {
      if (param[0] === getX(king2)) {
        return param[1] === getY(king2);
      } else {
        return false;
      }
    });
    let numLegalMoves = getNumLegalMovesForColor(state_board, state_turn);
    if (numLegalMoves === 0) {
      Sounds.winSound();
      if (ownKingInCheck) {
        let winner = oppositeColor(state_turn);
        alert(winner + ` has won! Refresh the page to play again.`);
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
    Sounds.turnStartSound(state_turn);
    return draw(state$1);
  }
  function handleMoveCursor(state2) {
    Sounds.cursorSound();
    return draw(state2);
  }
  function handleCancel(state2) {
    if (state2.lock) {
      return state2;
    }
    let match = state2.selectedPiece;
    if (match !== void 0) {
      Sounds.successSound();
      return draw({
        board: state2.board,
        turn: state2.turn,
        selectedPiece: void 0,
        legalMoves: void 0,
        cursorPosition: state2.cursorPosition,
        promote: state2.promote,
        lock: state2.lock
      });
    } else {
      Sounds.failureSound();
      return state2;
    }
  }
  function handleLeft(state2) {
    let match = state2.cursorPosition;
    if (state2.lock) {
      return state2;
    }
    let y = match[1];
    let x = match[0];
    let match$1 = state2.turn;
    if (match$1 === "White") {
      if (x > 0) {
        return handleMoveCursor({
          board: state2.board,
          turn: state2.turn,
          selectedPiece: state2.selectedPiece,
          legalMoves: state2.legalMoves,
          cursorPosition: [
            x - 1 | 0,
            y
          ],
          promote: state2.promote,
          lock: state2.lock
        });
      } else {
        return state2;
      }
    } else if (x < 7) {
      return handleMoveCursor({
        board: state2.board,
        turn: state2.turn,
        selectedPiece: state2.selectedPiece,
        legalMoves: state2.legalMoves,
        cursorPosition: [
          x + 1 | 0,
          y
        ],
        promote: state2.promote,
        lock: state2.lock
      });
    } else {
      return state2;
    }
  }
  function handleRight(state2) {
    let match = state2.cursorPosition;
    if (state2.lock) {
      return state2;
    }
    let y = match[1];
    let x = match[0];
    let match$1 = state2.turn;
    if (match$1 === "White") {
      if (x < 7) {
        return handleMoveCursor({
          board: state2.board,
          turn: state2.turn,
          selectedPiece: state2.selectedPiece,
          legalMoves: state2.legalMoves,
          cursorPosition: [
            x + 1 | 0,
            y
          ],
          promote: state2.promote,
          lock: state2.lock
        });
      } else {
        return state2;
      }
    } else if (x > 0) {
      return handleMoveCursor({
        board: state2.board,
        turn: state2.turn,
        selectedPiece: state2.selectedPiece,
        legalMoves: state2.legalMoves,
        cursorPosition: [
          x - 1 | 0,
          y
        ],
        promote: state2.promote,
        lock: state2.lock
      });
    } else {
      return state2;
    }
  }
  function handleDown(state2) {
    let match = state2.cursorPosition;
    if (state2.lock) {
      return state2;
    }
    let y = match[1];
    let x = match[0];
    let match$1 = state2.turn;
    if (match$1 === "White") {
      if (y > 0) {
        return handleMoveCursor({
          board: state2.board,
          turn: state2.turn,
          selectedPiece: state2.selectedPiece,
          legalMoves: state2.legalMoves,
          cursorPosition: [
            x,
            y - 1 | 0
          ],
          promote: state2.promote,
          lock: state2.lock
        });
      } else {
        return state2;
      }
    } else if (y < 7) {
      return handleMoveCursor({
        board: state2.board,
        turn: state2.turn,
        selectedPiece: state2.selectedPiece,
        legalMoves: state2.legalMoves,
        cursorPosition: [
          x,
          y + 1 | 0
        ],
        promote: state2.promote,
        lock: state2.lock
      });
    } else {
      return state2;
    }
  }
  function handleUp(state2) {
    let match = state2.cursorPosition;
    if (state2.lock) {
      return state2;
    }
    let y = match[1];
    let x = match[0];
    let match$1 = state2.turn;
    if (match$1 === "White") {
      if (y < 7) {
        return handleMoveCursor({
          board: state2.board,
          turn: state2.turn,
          selectedPiece: state2.selectedPiece,
          legalMoves: state2.legalMoves,
          cursorPosition: [
            x,
            y + 1 | 0
          ],
          promote: state2.promote,
          lock: state2.lock
        });
      } else {
        return state2;
      }
    } else if (y > 0) {
      return handleMoveCursor({
        board: state2.board,
        turn: state2.turn,
        selectedPiece: state2.selectedPiece,
        legalMoves: state2.legalMoves,
        cursorPosition: [
          x,
          y - 1 | 0
        ],
        promote: state2.promote,
        lock: state2.lock
      });
    } else {
      return state2;
    }
  }
  function handlePromote(state2, key2) {
    if (state2.promote) {
      let match = state2.selectedPiece;
      let maybePiece;
      if (match !== void 0) {
        switch (key2) {
          case "b":
            maybePiece = bishop(getColor(match), getX(match), getY(match));
            break;
          case "n":
            maybePiece = knight(getColor(match), getX(match), getY(match));
            break;
          case "q":
            maybePiece = queen(getColor(match), getX(match), getY(match));
            break;
          case "r":
            maybePiece = rook(getColor(match), getX(match), getY(match));
            break;
          default:
            maybePiece = void 0;
        }
      } else {
        maybePiece = void 0;
      }
      if (maybePiece !== void 0) {
        let pieces = filter(state2.board.pieces, (p) => {
          if (getX(p) !== getX(maybePiece)) {
            return true;
          } else {
            return getY(p) !== getY(maybePiece);
          }
        });
        let board = {
          pieces: {
            hd: maybePiece,
            tl: pieces
          }
        };
        let state$p_turn = state2.turn;
        let state$p_selectedPiece = state2.selectedPiece;
        let state$p_legalMoves = state2.legalMoves;
        let state$p_cursorPosition = state2.cursorPosition;
        let state$p_lock = state2.lock;
        let state$p = {
          board,
          turn: state$p_turn,
          selectedPiece: state$p_selectedPiece,
          legalMoves: state$p_legalMoves,
          cursorPosition: state$p_cursorPosition,
          promote: false,
          lock: state$p_lock
        };
        Sounds.winSound();
        endTurn();
        return draw(state$p);
      }
      Sounds.failureSound();
      return state2;
    }
    Sounds.failureSound();
    return state2;
  }
  function handleSelect(state2) {
    if (state2.lock) {
      return state2;
    }
    let piece = getPiece(state2.board, state2.cursorPosition, void 0);
    let match = state2.cursorPosition;
    let y = match[1];
    let x = match[0];
    let moveHelper = (state3) => {
      let selectedPiece2 = getOrThrow2(state3.selectedPiece, void 0);
      let promote = (param) => {
        if (selectedPiece2.TAG === "Pawn") {
          return promotionRank(selectedPiece2._0) === param[1];
        } else {
          return false;
        }
      };
      let legalMove = flatMap(state3.legalMoves, (moves) => get(filter(moves, (param) => {
        if (param[0] === x) {
          return param[1] === y;
        } else {
          return false;
        }
      }), 0));
      if (legalMove !== void 0) {
        let state$p_board = confirmMove(state3.board, selectedPiece2, legalMove, true);
        let state$p_turn = state3.turn;
        let state$p_selectedPiece = withPosition(selectedPiece2, legalMove);
        let state$p_legalMoves = state3.legalMoves;
        let state$p_cursorPosition = state3.cursorPosition;
        let state$p_promote = promote(legalMove);
        let state$p = {
          board: state$p_board,
          turn: state$p_turn,
          selectedPiece: state$p_selectedPiece,
          legalMoves: state$p_legalMoves,
          cursorPosition: state$p_cursorPosition,
          promote: state$p_promote,
          lock: true
        };
        if (size(state$p_board.pieces) < size(state3.board.pieces)) {
          Sounds.captureSound();
        } else {
          Sounds.moveSound();
        }
        if (state$p_promote) {
          return draw(state$p);
        } else {
          endTurn();
          return draw(state$p);
        }
      }
      Sounds.failureSound();
      return state3;
    };
    let selectedPiece = state2.selectedPiece;
    if (selectedPiece !== void 0) {
      if (piece === void 0) {
        return moveHelper(state2);
      }
      if (getColor(piece) !== state2.turn) {
        return moveHelper(state2);
      }
      if (x === getX(selectedPiece) && y === getY(selectedPiece)) {
        return state2;
      }
      let state$p_board = state2.board;
      let state$p_turn = state2.turn;
      let state$p_legalMoves = getLegalMoves(piece, state2.board);
      let state$p_cursorPosition = state2.cursorPosition;
      let state$p_promote = state2.promote;
      let state$p_lock = state2.lock;
      let state$p = {
        board: state$p_board,
        turn: state$p_turn,
        selectedPiece: piece,
        legalMoves: state$p_legalMoves,
        cursorPosition: state$p_cursorPosition,
        promote: state$p_promote,
        lock: state$p_lock
      };
      Sounds.successSound();
      return draw(state$p);
    }
    if (piece !== void 0) {
      if (getColor(piece) === state2.turn) {
        let state$p_board$1 = state2.board;
        let state$p_turn$1 = state2.turn;
        let state$p_selectedPiece = piece;
        let state$p_legalMoves$1 = getLegalMoves(piece, state2.board);
        let state$p_cursorPosition$1 = state2.cursorPosition;
        let state$p_promote$1 = state2.promote;
        let state$p_lock$1 = state2.lock;
        let state$p$1 = {
          board: state$p_board$1,
          turn: state$p_turn$1,
          selectedPiece: state$p_selectedPiece,
          legalMoves: state$p_legalMoves$1,
          cursorPosition: state$p_cursorPosition$1,
          promote: state$p_promote$1,
          lock: state$p_lock$1
        };
        Sounds.successSound();
        return draw(state$p$1);
      }
      toggleEmphasis(piece);
      Sounds.successSound();
      return draw(state2);
    }
    Sounds.failureSound();
    return state2;
  }

  // src/GameUtils.js
  function endTurn() {
    setTimeout(() => {
      state.lock = false;
      state.turn = oppositeColor(state.turn);
      state = handleTurnStart(state);
    }, 1e3);
  }
  function drawGrid(data) {
    svg.selectAll("g").data(data, (d) => d.id).join(
      (enter) => {
        let g = enter.append("g");
        g.append("rect").attr("class", "base");
        g.append("rect").attr("class", "overlay");
        g.append("rect").attr("class", "selection");
        g.append("image");
      },
      (update) => {
        update.select(".base").attr("width", size2).attr("height", size2).attr("transform", (d) => `translate(${getX2(d)} ${getY2(d)})`).attr("fill", (d) => getInCheck(d) ? "red" : getColor2(d));
        update.select(".overlay").attr("width", size2).attr("height", size2).attr("transform", (d) => `translate(${getX2(d)} ${getY2(d)})`).attr("fill", (d) => getOverlayColor(d)).style("opacity", 0.8).style("display", (d) => getOverlayColor(d) === "none" ? "none" : "inline");
        update.select("image").attr("transform", (d) => `translate(${getX2(d)} ${getY2(d)})`).attr("width", size2).attr("height", size2).attr("id", (d) => positionToId(d.x, d.y)).attr("xlink:href", (d) => d.piece === void 0 ? "" : `./${getAsset(d.piece)}.gif`).style("display", (d) => d.piece === void 0 ? "none" : "inline");
        update.select(".selection").attr("width", size2 - stroke).attr("height", size2 - stroke).attr("transform", (d) => `translate(${getX2(d) + stroke / 2} ${getY2(d) + stroke / 2})`).attr("fill", "none").attr("stroke-width", `${stroke}px`).attr("class", "selection").attr("stroke", "goldenrod").style("display", (d) => d.selection ? "inline" : "none");
      },
      (exit) => {
        exit.remove();
      }
    );
  }

  // src/Game.js
  var audioCtx = new AudioContext();
  var start = document.getElementById("start");
  start.addEventListener("click", async () => {
    await audioCtx.resume();
    start.remove();
  });
  function setup() {
    let body = d3.select("body");
    body.on("keydown", async (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          state = handleUp(state);
          break;
        case "ArrowLeft":
        case "a":
          state = handleLeft(state);
          break;
        case "ArrowDown":
        case "s":
          state = handleDown(state);
          break;
        case "ArrowRight":
        case "d":
          state = handleRight(state);
          break;
        case "x":
          state = handleSelect(state);
          break;
        case "z":
          state = handleCancel(state);
          break;
        case "b":
        // B
        case "n":
        // N
        case "r":
        // R
        case "q":
          state = handlePromote(state, key);
          break;
      }
    });
    state = handleTurnStart(state);
    draw(state);
  }
  window.onload = () => {
    state = init2();
    svg = d3.select("#board").append("svg").attr("width", size2 * 8).attr("height", size2 * 8);
    setup();
  };
})();
