// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Board = require("./Board.bs.js");
var Utils = require("./Utils.bs.js");
var Belt_List = require("rescript/lib/js/belt_List.js");

function canCover(piece, board, position) {
  var p = Board.getPiece(board, position, undefined);
  if (p !== undefined && (p.TAG === /* King */1 || Utils.getColor(p) === Utils.getColor(piece))) {
    return true;
  } else {
    return Board.checkUnobstructed(board, piece, position, true);
  }
}

function unobstructedPositionsHelper(piece, board, a, b, c, d) {
  var positionHelper = function (acc, position) {
    if (!acc[0]) {
      return [
              false,
              acc[1]
            ];
    }
    var lst = acc[1];
    if (canCover(piece, board, position)) {
      if (Board.hasPiece(board, position, undefined)) {
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
                        tl: /* [] */0
                      }
                    }
                  }
                }, (function (l) {
                    return Belt_List.reduce(l, [
                                  true,
                                  /* [] */0
                                ], positionHelper)[1];
                  })));
}

function getUnobstructedCardinalPositions(piece, board) {
  var up = Belt_List.makeBy(7 - Utils.getY(piece) | 0, (function (i) {
          return [
                  Utils.getX(piece),
                  (Utils.getY(piece) + i | 0) + 1 | 0
                ];
        }));
  var down = Belt_List.makeBy(Utils.getY(piece), (function (i) {
          return [
                  Utils.getX(piece),
                  (Utils.getY(piece) - i | 0) - 1 | 0
                ];
        }));
  var left = Belt_List.makeBy(Utils.getX(piece), (function (i) {
          return [
                  (Utils.getX(piece) - i | 0) - 1 | 0,
                  Utils.getY(piece)
                ];
        }));
  var right = Belt_List.makeBy(7 - Utils.getX(piece) | 0, (function (i) {
          return [
                  (Utils.getX(piece) + i | 0) + 1 | 0,
                  Utils.getY(piece)
                ];
        }));
  return unobstructedPositionsHelper(piece, board, up, down, left, right);
}

function getUnobstructedDiagonalPositions(piece, board) {
  var ul = Belt_List.makeBy(Math.min(Utils.getX(piece), 7 - Utils.getY(piece) | 0), (function (i) {
          return [
                  (Utils.getX(piece) - i | 0) - 1 | 0,
                  (Utils.getY(piece) + i | 0) + 1 | 0
                ];
        }));
  var ur = Belt_List.makeBy(7 - Math.max(Utils.getX(piece), Utils.getY(piece)) | 0, (function (i) {
          return [
                  (Utils.getX(piece) + i | 0) + 1 | 0,
                  (Utils.getY(piece) + i | 0) + 1 | 0
                ];
        }));
  var dl = Belt_List.makeBy(Math.min(Utils.getX(piece), Utils.getY(piece)), (function (i) {
          return [
                  (Utils.getX(piece) - i | 0) - 1 | 0,
                  (Utils.getY(piece) - i | 0) - 1 | 0
                ];
        }));
  var dr = Belt_List.makeBy(Math.min(7 - Utils.getX(piece) | 0, Utils.getY(piece)), (function (i) {
          return [
                  (Utils.getX(piece) + i | 0) + 1 | 0,
                  (Utils.getY(piece) - i | 0) - 1 | 0
                ];
        }));
  return unobstructedPositionsHelper(piece, board, ul, ur, dl, dr);
}

function getCoveredPositions(piece, board) {
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        var p = piece._0;
        var positions_0 = [
          p.x - 1 | 0,
          p.y + Utils.pawnOffsetHelper(p, 1) | 0
        ];
        var positions_1 = {
          hd: [
            p.x + 1 | 0,
            p.y + Utils.pawnOffsetHelper(p, 1) | 0
          ],
          tl: /* [] */0
        };
        var positions = {
          hd: positions_0,
          tl: positions_1
        };
        return Belt_List.keep(positions, (function (param) {
                      var y = param[1];
                      if (y >= 0 && y <= 7) {
                        return canCover(piece, board, [
                                    param[0],
                                    y
                                  ]);
                      } else {
                        return false;
                      }
                    }));
    case /* King */1 :
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
                      tl: /* [] */0
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
        return Belt_List.keep(positions$1, (function (p) {
                      return canCover(piece, board, p);
                    }));
    case /* Queen */2 :
        return Belt_List.concat(getUnobstructedDiagonalPositions(piece, board), getUnobstructedCardinalPositions(piece, board));
    case /* Bishop */3 :
        return getUnobstructedDiagonalPositions(piece, board);
    case /* Knight */4 :
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
                      tl: /* [] */0
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
        return Belt_List.keep(positions$2, (function (p) {
                      return canCover(piece, board, p);
                    }));
    case /* Rook */5 :
        return getUnobstructedCardinalPositions(piece, board);
    
  }
}

function validBoard(board, movedColor) {
  var ownKing = Belt_List.getExn(Belt_List.keep(board.pieces, (function (p) {
              if (p.TAG === /* King */1) {
                return p._0.color === movedColor;
              } else {
                return false;
              }
            })), 0);
  var otherCoveredPositions = getCoveredPositionsForColor(board, Utils.oppositeColor(movedColor));
  return !Belt_List.has(otherCoveredPositions, [
              Utils.getX(ownKing),
              Utils.getY(ownKing)
            ], (function (param, param$1) {
                if (param[0] === param$1[0]) {
                  return param[1] === param$1[1];
                } else {
                  return false;
                }
              }));
}

function getCoveredPositionsForColor(board, color) {
  return coveredPositionsHelper(Belt_List.keep(board.pieces, (function (p) {
                    return Utils.getColor(p) === color;
                  })), board);
}

function coveredPositionsHelper(pieces, board) {
  return Belt_List.reduce(Belt_List.sort(Belt_List.flatten(Belt_List.reduce(pieces, /* [] */0, (function (acc, p) {
                            return {
                                    hd: getCoveredPositions(p, board),
                                    tl: acc
                                  };
                          }))), (function (param, param$1) {
                    var x2 = param$1[0];
                    var x1 = param[0];
                    if (x1 === x2) {
                      return param[1] - param$1[1] | 0;
                    } else {
                      return x1 - x2 | 0;
                    }
                  })), /* [] */0, (function (acc, param) {
                var y1 = param[1];
                var x1 = param[0];
                if (!acc) {
                  return {
                          hd: [
                            x1,
                            y1
                          ],
                          tl: /* [] */0
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
              }));
}

function validStateForMove(board, piece, position) {
  var newBoard = Board.confirmMove(board, piece, position, false);
  return validBoard(newBoard, Utils.getColor(piece));
}

function getLegalMoves(piece, board) {
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        var p = piece._0;
        var oneSpace_0 = p.x;
        var oneSpace_1 = p.y + Utils.pawnOffsetHelper(p, 1) | 0;
        var oneSpace = [
          oneSpace_0,
          oneSpace_1
        ];
        var twoSpace_0 = p.x;
        var twoSpace_1 = p.y + Utils.pawnOffsetHelper(p, 2) | 0;
        var twoSpace = [
          twoSpace_0,
          twoSpace_1
        ];
        var movement = Board.checkUnobstructed(board, piece, oneSpace, false) ? (
            !p.hasMoved && Board.checkUnobstructed(board, piece, twoSpace, false) ? ({
                  hd: oneSpace,
                  tl: {
                    hd: twoSpace,
                    tl: /* [] */0
                  }
                }) : ({
                  hd: oneSpace,
                  tl: /* [] */0
                })
          ) : /* [] */0;
        var capture = Belt_List.keep(getCoveredPositions(piece, board), (function (pos) {
                if (Board.hasOppositeColoredPiece(board, pos, p.color)) {
                  return true;
                }
                var otherPiece = Board.getPiece(board, [
                      pos[0],
                      p.y
                    ], Utils.oppositeColor(p.color));
                if (otherPiece !== undefined && otherPiece.TAG === /* Pawn */0) {
                  return otherPiece._0.hasJustMoved2Spaces;
                } else {
                  return false;
                }
              }));
        return Belt_List.keep(Belt_List.concat(movement, capture), (function (pos) {
                      return validStateForMove(board, {
                                  TAG: /* Pawn */0,
                                  _0: p
                                }, pos);
                    }));
    case /* King */1 :
        var k = piece._0;
        var regularMoves = Belt_List.keep(getCoveredPositions(piece, board), (function (p) {
                if (Board.checkUnobstructed(board, {
                        TAG: /* King */1,
                        _0: k
                      }, p, true)) {
                  return validStateForMove(board, piece, p);
                } else {
                  return false;
                }
              }));
        if (k.hasMoved || k.inCheck) {
          return regularMoves;
        }
        var y = Utils.backRank(k);
        var leftRook = Board.getPiece(board, [
              0,
              y
            ], k.color);
        var rightRook = Board.getPiece(board, [
              7,
              y
            ], k.color);
        var leftCastle = leftRook !== undefined && leftRook.TAG === /* Rook */5 && !(leftRook._0.hasMoved || Board.hasPiece(board, [
                1,
                y
              ], undefined) || Board.hasPiece(board, [
                2,
                y
              ], undefined) || Board.hasPiece(board, [
                3,
                y
              ], undefined) || !validStateForMove(board, piece, [
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
          ] : undefined;
        var rightCastle = rightRook !== undefined && rightRook.TAG === /* Rook */5 && !(rightRook._0.hasMoved || Board.hasPiece(board, [
                5,
                y
              ], undefined) || Board.hasPiece(board, [
                6,
                y
              ], undefined) || !validStateForMove(board, piece, [
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
          ] : undefined;
        if (leftCastle !== undefined) {
          if (rightCastle !== undefined) {
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
        } else if (rightCastle !== undefined) {
          return {
                  hd: rightCastle,
                  tl: regularMoves
                };
        } else {
          return regularMoves;
        }
    default:
      return Belt_List.keep(getCoveredPositions(piece, board), (function (pos) {
                    if (Board.checkUnobstructed(board, piece, pos, true)) {
                      return validStateForMove(board, piece, pos);
                    } else {
                      return false;
                    }
                  }));
  }
}

function getEmphasizedCoveredPositionsForColor(board, color) {
  return coveredPositionsHelper(Belt_List.keep(board.pieces, (function (p) {
                    if (Utils.getColor(p) === color) {
                      return Utils.getEmphasis(p);
                    } else {
                      return false;
                    }
                  })), board);
}

function getNumLegalMovesForColor(board, color) {
  return Belt_List.reduce(Belt_List.keep(board.pieces, (function (p) {
                    return Utils.getColor(p) === color;
                  })), 0, (function (acc, x) {
                return acc + Belt_List.size(getLegalMoves(x, board)) | 0;
              }));
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
/* No side effect */
