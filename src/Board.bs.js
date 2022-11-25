// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils = require("./Utils.bs.js");
var Belt_List = require("rescript/lib/js/belt_List.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");

function board(piecesArr) {
  return {
          pieces: Belt_List.fromArray(piecesArr)
        };
}

function init(param) {
  var piecesArr = [
    Utils.pawn("White", 0, 1),
    Utils.pawn("White", 1, 1),
    Utils.pawn("White", 2, 1),
    Utils.pawn("White", 3, 1),
    Utils.pawn("White", 4, 1),
    Utils.pawn("White", 5, 1),
    Utils.pawn("White", 6, 1),
    Utils.pawn("White", 7, 1),
    Utils.rook("White", 0, 0),
    Utils.rook("White", 7, 0),
    Utils.knight("White", 1, 0),
    Utils.knight("White", 6, 0),
    Utils.bishop("White", 2, 0),
    Utils.bishop("White", 5, 0),
    Utils.queen("White", 3, 0),
    Utils.king("White", 4, 0),
    Utils.pawn("Black", 0, 6),
    Utils.pawn("Black", 1, 6),
    Utils.pawn("Black", 2, 6),
    Utils.pawn("Black", 3, 6),
    Utils.pawn("Black", 4, 6),
    Utils.pawn("Black", 5, 6),
    Utils.pawn("Black", 6, 6),
    Utils.pawn("Black", 7, 6),
    Utils.rook("Black", 0, 7),
    Utils.rook("Black", 7, 7),
    Utils.knight("Black", 1, 7),
    Utils.knight("Black", 6, 7),
    Utils.bishop("Black", 2, 7),
    Utils.bishop("Black", 5, 7),
    Utils.queen("Black", 3, 7),
    Utils.king("Black", 4, 7)
  ];
  return {
          pieces: Belt_List.fromArray(piecesArr)
        };
}

function getPiece(board, param, color) {
  var y = param[1];
  var x = param[0];
  return Belt_List.getBy(board.pieces, (function (p) {
                var colorPredicate = color !== undefined ? Utils.getColor(p) === color : true;
                if (Utils.getX(p) === x && Utils.getY(p) === y) {
                  return colorPredicate;
                } else {
                  return false;
                }
              }));
}

function hasPiece(board, position, color) {
  return Belt_Option.isSome(getPiece(board, position, color));
}

function hasOppositeColoredPiece(board, position, color) {
  return hasPiece(board, position, Utils.oppositeColor(color));
}

function checkUnobstructed(board, piece, param, canCapture) {
  var y = param[1];
  var x = param[0];
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return false;
  }
  if (!canCapture) {
    return !hasPiece(board, [
                x,
                y
              ], undefined);
  }
  var target = getPiece(board, [
        x,
        y
      ], undefined);
  if (target !== undefined) {
    if (target.TAG === /* King */1) {
      return false;
    } else {
      return Utils.getColor(target) !== Utils.getColor(piece);
    }
  } else {
    return true;
  }
}

function confirmMove(board, piece, position, param) {
  var newY = position[1];
  var newX = position[0];
  var noop = function (b) {
    return b;
  };
  var match;
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        var p = piece._0;
        var newPawn = (p.y - newY | 0) === -2 || (p.y - newY | 0) === 2 ? Utils.withPosition(Utils.with2Spaces(p), position) : Utils.withMoved(Utils.withPosition(piece, position));
        var callback = p.x !== newX && p.y !== newY && !hasPiece(board, position, undefined) ? (function (b) {
              return {
                      pieces: Belt_List.keep(b.pieces, (function (i) {
                              if (Utils.getX(i) !== newX) {
                                return true;
                              } else {
                                return Utils.getY(i) !== p.y;
                              }
                            }))
                    };
            }) : noop;
        match = [
          newPawn,
          callback
        ];
        break;
    case /* King */1 :
        var k = piece._0;
        var y = Utils.backRank(k);
        var castleHelper = function (oldRookX, newRookX, board) {
          var rook = Belt_Option.getExn(getPiece(board, [
                    oldRookX,
                    y
                  ], undefined));
          return function (b) {
            return confirmMove(b, rook, [
                        newRookX,
                        y
                      ], true);
          };
        };
        match = k.hasMoved ? [
            Utils.withMoved(Utils.withPosition(piece, position)),
            noop
          ] : (
            newX === 2 && newY === y ? [
                Utils.withMoved(Utils.withPosition(piece, position)),
                castleHelper(0, 3, board)
              ] : (
                newX === 6 && newY === y ? [
                    Utils.withMoved(Utils.withPosition(piece, position)),
                    castleHelper(7, 5, board)
                  ] : [
                    Utils.withMoved(Utils.withPosition(piece, position)),
                    noop
                  ]
              )
          );
        break;
    default:
      match = [
        Utils.withMoved(Utils.withPosition(piece, position)),
        noop
      ];
  }
  var newPiece = match[0];
  var pieces_1 = Belt_List.map(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) === Utils.getX(piece) && Utils.getY(p) === Utils.getY(piece)) {
                return false;
              } else {
                return !(Utils.getX(p) === Utils.getX(newPiece) && Utils.getY(p) === Utils.getY(newPiece));
              }
            })), (function (p) {
          if (p.TAG === /* Pawn */0) {
            return Utils.disable2Spaces(p._0);
          } else {
            return p;
          }
        }));
  var pieces = {
    hd: newPiece,
    tl: pieces_1
  };
  return Curry._1(match[1], {
              pieces: pieces
            });
}

exports.board = board;
exports.init = init;
exports.getPiece = getPiece;
exports.hasPiece = hasPiece;
exports.hasOppositeColoredPiece = hasOppositeColoredPiece;
exports.checkUnobstructed = checkUnobstructed;
exports.confirmMove = confirmMove;
/* No side effect */
