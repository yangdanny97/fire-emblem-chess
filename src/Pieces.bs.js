// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Board from "./Board.bs.js";
import * as Utils from "./Utils.bs.js";
import * as Belt_List from "rescript/lib/es6/belt_List.js";

function canCover(piece, board, position) {
  var p = Board.getPiece(board, position, undefined);
  if (p !== undefined && (p.TAG === /* King */1 || Utils.getColor(p) === piece.color)) {
    return true;
  } else {
    return Board.checkUnobstructed(board, piece, position, false);
  }
}

function getUnobstructedCardinalPositions(piece, board) {
  var up = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) === piece.x) {
                return Utils.getY(p) > piece.y;
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getY(a) - Utils.getY(b) | 0;
        }));
  var down = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) === piece.x) {
                return Utils.getY(p) < piece.y;
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getY(b) - Utils.getY(a) | 0;
        }));
  var left = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getY(p) === piece.y) {
                return Utils.getX(p) < piece.x;
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getX(b) - Utils.getX(a) | 0;
        }));
  var right = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getY(p) === piece.y) {
                return Utils.getX(p) > piece.x;
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getX(a) - Utils.getX(b) | 0;
        }));
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
                  hd: up,
                  tl: {
                    hd: down,
                    tl: {
                      hd: left,
                      tl: {
                        hd: right,
                        tl: /* [] */0
                      }
                    }
                  }
                }, (function (l) {
                    return Belt_List.reduce(Belt_List.map(l, (function (i) {
                                        return [
                                                Utils.getX(i),
                                                Utils.getY(i)
                                              ];
                                      })), [
                                  true,
                                  /* [] */0
                                ], positionHelper)[1];
                  })));
}

function getUnobstructedDiagonalPositions(piece, board) {
  var ul = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) < piece.x && Utils.getY(p) > piece.y) {
                return (Utils.getX(p) - Utils.getY(p) | 0) === (piece.x - piece.y | 0);
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getY(a) - Utils.getY(b) | 0;
        }));
  var ur = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) > piece.x && Utils.getY(p) > piece.y) {
                return (Utils.getX(p) - Utils.getY(p) | 0) === (piece.x - piece.y | 0);
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getY(a) - Utils.getY(b) | 0;
        }));
  var dl = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) < piece.x && Utils.getY(p) < piece.y) {
                return (Utils.getX(p) - Utils.getY(p) | 0) === (piece.x - piece.y | 0);
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getY(b) - Utils.getY(a) | 0;
        }));
  var dr = Belt_List.sort(Belt_List.keep(board.pieces, (function (p) {
              if (Utils.getX(p) > piece.x && Utils.getY(p) < piece.y) {
                return (Utils.getX(p) - Utils.getY(p) | 0) === (piece.x - piece.y | 0);
              } else {
                return false;
              }
            })), (function (a, b) {
          return Utils.getY(b) - Utils.getY(a) | 0;
        }));
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
                  hd: ul,
                  tl: {
                    hd: ur,
                    tl: {
                      hd: dl,
                      tl: {
                        hd: dr,
                        tl: /* [] */0
                      }
                    }
                  }
                }, (function (l) {
                    return Belt_List.reduce(Belt_List.map(l, (function (i) {
                                        return [
                                                Utils.getX(i),
                                                Utils.getY(i)
                                              ];
                                      })), [
                                  true,
                                  /* [] */0
                                ], positionHelper)[1];
                  })));
}

function offsetHelper(piece, n) {
  var match = piece.color;
  if (match) {
    return -n | 0;
  } else {
    return n;
  }
}

function getLegalMoves(piece, board) {
  var oneSpace_0 = piece.x;
  var oneSpace_1 = piece.y + offsetHelper(piece, 1) | 0;
  var oneSpace = [
    oneSpace_0,
    oneSpace_1
  ];
  var twoSpace_0 = piece.x;
  var twoSpace_1 = piece.y + offsetHelper(piece, 2) | 0;
  var twoSpace = [
    twoSpace_0,
    twoSpace_1
  ];
  var movement = Board.checkUnobstructed(board, piece, oneSpace, false) ? (
      piece.hasMoved && Board.checkUnobstructed(board, piece, twoSpace, false) ? ({
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
  return Belt_List.concat(movement, /* [] */0);
}

function isPromotionEligible(piece) {
  if (piece.color === /* White */0 && piece.y === 7) {
    return true;
  } else if (piece.color === /* Black */1) {
    return piece.y === 0;
  } else {
    return false;
  }
}

function getCoveredPositions(piece, board) {
  var positions_0 = [
    piece.x - 1 | 0,
    piece.y + offsetHelper(piece, 1) | 0
  ];
  var positions_1 = {
    hd: [
      piece.x + 1 | 0,
      piece.y + offsetHelper(piece, 1) | 0
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
}

var Pawn = {
  offsetHelper: offsetHelper,
  getLegalMoves: getLegalMoves,
  isPromotionEligible: isPromotionEligible,
  getCoveredPositions: getCoveredPositions
};

function getCoveredPositions$1(piece, board) {
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        return getCoveredPositions(piece._0, board);
    case /* King */1 :
        var k = piece._0;
        var positions_0 = [
          k.x - 1 | 0,
          k.y
        ];
        var positions_1 = {
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
        var positions = {
          hd: positions_0,
          tl: positions_1
        };
        return Belt_List.keep(positions, (function (p) {
                      return canCover(k, board, p);
                    }));
    case /* Queen */2 :
        var q = piece._0;
        return Belt_List.concat(getUnobstructedDiagonalPositions(q, board), getUnobstructedCardinalPositions(q, board));
    case /* Bishop */3 :
        return getUnobstructedDiagonalPositions(piece._0, board);
    case /* Knight */4 :
        var n = piece._0;
        var positions_0$1 = [
          n.x - 2 | 0,
          n.y - 1 | 0
        ];
        var positions_1$1 = {
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
        var positions$1 = {
          hd: positions_0$1,
          tl: positions_1$1
        };
        return Belt_List.keep(positions$1, (function (p) {
                      return canCover(n, board, p);
                    }));
    case /* Rook */5 :
        return getUnobstructedCardinalPositions(piece._0, board);
    
  }
}

function getLegalMoves$1(piece, board) {
  var king = {
    TAG: /* King */1,
    _0: piece
  };
  var regularMoves = Belt_List.keep(getCoveredPositions$1(king, board), (function (p) {
          return Board.validStateForMove(board, king, p, undefined, undefined);
        }));
  if (piece.hasMoved || piece.inCheck) {
    return regularMoves;
  }
  var match = piece.color;
  var y = match ? 7 : 0;
  var leftRook = Board.getPiece(board, [
        0,
        y
      ], piece.color);
  var rightRook = Board.getPiece(board, [
        7,
        y
      ], piece.color);
  var leftCastle;
  if (leftRook !== undefined && leftRook.TAG === /* Rook */5) {
    var r = leftRook._0;
    leftCastle = r.hasMoved || Board.hasPiece(board, [
          1,
          y
        ], undefined) || Board.hasPiece(board, [
          2,
          y
        ], undefined) || Board.hasPiece(board, [
          3,
          y
        ], undefined) || !Board.validStateForMove(board, king, [
          3,
          y
        ], undefined, undefined) || !Board.validStateForMove(board, king, [
          2,
          y
        ], undefined, undefined) || !Board.validStateForMove(board, king, [
          2,
          y
        ], {
          TAG: /* Rook */5,
          _0: r
        }, [
          3,
          y
        ]) ? undefined : [
        2,
        y
      ];
  } else {
    leftCastle = undefined;
  }
  var rightCastle;
  if (rightRook !== undefined && rightRook.TAG === /* Rook */5) {
    var r$1 = rightRook._0;
    rightCastle = r$1.hasMoved || Board.hasPiece(board, [
          5,
          y
        ], undefined) || Board.hasPiece(board, [
          6,
          y
        ], undefined) || !Board.validStateForMove(board, king, [
          5,
          y
        ], undefined, undefined) || !Board.validStateForMove(board, king, [
          6,
          y
        ], undefined, undefined) || !Board.validStateForMove(board, king, [
          6,
          y
        ], {
          TAG: /* Rook */5,
          _0: r$1
        }, [
          5,
          y
        ]) ? undefined : [
        6,
        y
      ];
  } else {
    rightCastle = undefined;
  }
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
}

var King = {
  getLegalMoves: getLegalMoves$1
};

function getLegalMoves$2(piece, board) {
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        return getLegalMoves(piece._0, board);
    case /* King */1 :
        return getLegalMoves$1(piece._0, board);
    default:
      return Belt_List.keep(getCoveredPositions$1(piece, board), (function (pos) {
                    return Board.validStateForMove(board, piece, pos, undefined, undefined);
                  }));
  }
}

export {
  canCover ,
  getUnobstructedCardinalPositions ,
  getUnobstructedDiagonalPositions ,
  Pawn ,
  getCoveredPositions$1 as getCoveredPositions,
  King ,
  getLegalMoves$2 as getLegalMoves,
  
}
/* No side effect */
