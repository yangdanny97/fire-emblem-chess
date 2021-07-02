// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils = require("./Utils.bs.js");
var Belt_List = require("rescript/lib/js/belt_List.js");

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
  return getPiece(board, position, color) !== undefined;
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
      return Utils.getColor(target) !== piece.color;
    }
  } else {
    return true;
  }
}

function confirmMove(board, piece, position) {
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
        var match$1 = k.color;
        var backRowY = match$1 ? 7 : 0;
        var castleHelper = function (oldRookX, newRookX, board) {
          var rook = getPiece(board, [
                oldRookX,
                backRowY
              ], undefined);
          if (rook !== undefined) {
            return function (b) {
              return confirmMove(b, rook, [
                          newRookX,
                          backRowY
                        ]);
            };
          }
          throw {
                RE_EXN_ID: "Not_found",
                Error: new Error()
              };
        };
        match = k.hasMoved ? [
            Utils.withMoved(Utils.withPosition(piece, position)),
            noop
          ] : (
            newX === 2 && newY === backRowY ? [
                Utils.withMoved(Utils.withPosition(piece, position)),
                castleHelper(0, 3, board)
              ] : (
                newX === 6 && newY === backRowY ? [
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
  var pieces_1 = Belt_List.keep(board.pieces, (function (p) {
          if (Utils.getX(p) === Utils.getX(piece) && Utils.getY(p) === Utils.getY(piece)) {
            return false;
          } else {
            return !(Utils.getX(p) === Utils.getX(newPiece) && Utils.getY(p) === Utils.getX(newPiece));
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

exports.getPiece = getPiece;
exports.hasPiece = hasPiece;
exports.hasOppositeColoredPiece = hasOppositeColoredPiece;
exports.checkUnobstructed = checkUnobstructed;
exports.confirmMove = confirmMove;
/* No side effect */
