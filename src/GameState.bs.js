// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Grid = require("./Grid.bs.js");
var Board = require("./Board.bs.js");
var Utils = require("./Utils.bs.js");
var Pieces = require("./Pieces.bs.js");
var Sounds = require("./Sounds");
var Belt_List = require("rescript/lib/js/belt_List.js");
var GameUtils = require("./GameUtils");
var Belt_Option = require("rescript/lib/js/belt_Option.js");

function drawGrid(prim) {
  GameUtils.drawGrid(prim);
}

function endTurn(prim) {
  GameUtils.endTurn();
}

function winSound(prim) {
  Sounds.winSound();
}

function cursorSound(prim) {
  Sounds.cursorSound();
}

function successSound(prim) {
  Sounds.successSound();
}

function failureSound(prim) {
  Sounds.failureSound();
}

function moveSound(prim) {
  Sounds.moveSound();
}

function captureSound(prim) {
  Sounds.captureSound();
}

function turnStartSound(prim) {
  Sounds.turnStartSound(prim);
}

function init(param) {
  return {
          board: Board.init(undefined),
          turn: "White",
          selectedPiece: undefined,
          legalMoves: undefined,
          cursorPosition: [
            4,
            0
          ],
          promote: false,
          lock: false
        };
}

function draw(state) {
  var grid = Grid.makeGrid(state);
  GameUtils.drawGrid(grid);
  return state;
}

function handleTurnStart(state) {
  var state_board = state.board;
  var state_turn = state.turn;
  var state_cursorPosition = state.cursorPosition;
  var state_promote = state.promote;
  var state_lock = state.lock;
  var state$1 = {
    board: state_board,
    turn: state_turn,
    selectedPiece: undefined,
    legalMoves: undefined,
    cursorPosition: state_cursorPosition,
    promote: state_promote,
    lock: state_lock
  };
  var color = state_turn;
  var otherColor = Utils.oppositeColor(color);
  var ownKing = Belt_List.getExn(Belt_List.keep(state_board.pieces, (function (p) {
              if (p.TAG === /* King */1) {
                return p._0.color === color;
              } else {
                return false;
              }
            })), 0);
  var otherCoveredPositions = Pieces.getCoveredPositionsForColor(state_board, otherColor);
  var ownKingInCheck = Belt_List.has(otherCoveredPositions, ownKing, (function (param, king) {
          if (param[0] === Utils.getX(king)) {
            return param[1] === Utils.getY(king);
          } else {
            return false;
          }
        }));
  var numLegalMoves = Pieces.getNumLegalMovesForColor(state_board, state_turn);
  if (numLegalMoves === 0) {
    Sounds.winSound();
    if (ownKingInCheck) {
      var winner = Utils.oppositeColor(state_turn);
      alert("" + winner + " has won! Refresh the page to play again.");
    } else {
      alert("Stalemate! Refresh the page to play again.");
    }
    return {
            board: state_board,
            turn: state_turn,
            selectedPiece: undefined,
            legalMoves: undefined,
            cursorPosition: state_cursorPosition,
            promote: state_promote,
            lock: true
          };
  }
  Sounds.turnStartSound(state_turn);
  return draw(state$1);
}

function handleMoveCursor(state) {
  Sounds.cursorSound();
  return draw(state);
}

function handleCancel(state) {
  if (state.lock) {
    return state;
  }
  var match = state.selectedPiece;
  if (match !== undefined) {
    Sounds.successSound();
    return draw({
                board: state.board,
                turn: state.turn,
                selectedPiece: undefined,
                legalMoves: undefined,
                cursorPosition: state.cursorPosition,
                promote: state.promote,
                lock: state.lock
              });
  } else {
    Sounds.failureSound();
    return state;
  }
}

function handleLeft(state) {
  var match = state.cursorPosition;
  if (state.lock) {
    return state;
  }
  var y = match[1];
  var x = match[0];
  var match$1 = state.turn;
  if (match$1 === "White") {
    if (x <= 0) {
      return state;
    }
    var state_board = state.board;
    var state_turn = state.turn;
    var state_selectedPiece = state.selectedPiece;
    var state_legalMoves = state.legalMoves;
    var state_cursorPosition = [
      x - 1 | 0,
      y
    ];
    var state_promote = state.promote;
    var state_lock = state.lock;
    var state$1 = {
      board: state_board,
      turn: state_turn,
      selectedPiece: state_selectedPiece,
      legalMoves: state_legalMoves,
      cursorPosition: state_cursorPosition,
      promote: state_promote,
      lock: state_lock
    };
    Sounds.cursorSound();
    return draw(state$1);
  }
  if (x >= 7) {
    return state;
  }
  var state_board$1 = state.board;
  var state_turn$1 = state.turn;
  var state_selectedPiece$1 = state.selectedPiece;
  var state_legalMoves$1 = state.legalMoves;
  var state_cursorPosition$1 = [
    x + 1 | 0,
    y
  ];
  var state_promote$1 = state.promote;
  var state_lock$1 = state.lock;
  var state$2 = {
    board: state_board$1,
    turn: state_turn$1,
    selectedPiece: state_selectedPiece$1,
    legalMoves: state_legalMoves$1,
    cursorPosition: state_cursorPosition$1,
    promote: state_promote$1,
    lock: state_lock$1
  };
  Sounds.cursorSound();
  return draw(state$2);
}

function handleRight(state) {
  var match = state.cursorPosition;
  if (state.lock) {
    return state;
  }
  var y = match[1];
  var x = match[0];
  var match$1 = state.turn;
  if (match$1 === "White") {
    if (x >= 7) {
      return state;
    }
    var state_board = state.board;
    var state_turn = state.turn;
    var state_selectedPiece = state.selectedPiece;
    var state_legalMoves = state.legalMoves;
    var state_cursorPosition = [
      x + 1 | 0,
      y
    ];
    var state_promote = state.promote;
    var state_lock = state.lock;
    var state$1 = {
      board: state_board,
      turn: state_turn,
      selectedPiece: state_selectedPiece,
      legalMoves: state_legalMoves,
      cursorPosition: state_cursorPosition,
      promote: state_promote,
      lock: state_lock
    };
    Sounds.cursorSound();
    return draw(state$1);
  }
  if (x <= 0) {
    return state;
  }
  var state_board$1 = state.board;
  var state_turn$1 = state.turn;
  var state_selectedPiece$1 = state.selectedPiece;
  var state_legalMoves$1 = state.legalMoves;
  var state_cursorPosition$1 = [
    x - 1 | 0,
    y
  ];
  var state_promote$1 = state.promote;
  var state_lock$1 = state.lock;
  var state$2 = {
    board: state_board$1,
    turn: state_turn$1,
    selectedPiece: state_selectedPiece$1,
    legalMoves: state_legalMoves$1,
    cursorPosition: state_cursorPosition$1,
    promote: state_promote$1,
    lock: state_lock$1
  };
  Sounds.cursorSound();
  return draw(state$2);
}

function handleDown(state) {
  var match = state.cursorPosition;
  if (state.lock) {
    return state;
  }
  var y = match[1];
  var x = match[0];
  var match$1 = state.turn;
  if (match$1 === "White") {
    if (y <= 0) {
      return state;
    }
    var state_board = state.board;
    var state_turn = state.turn;
    var state_selectedPiece = state.selectedPiece;
    var state_legalMoves = state.legalMoves;
    var state_cursorPosition = [
      x,
      y - 1 | 0
    ];
    var state_promote = state.promote;
    var state_lock = state.lock;
    var state$1 = {
      board: state_board,
      turn: state_turn,
      selectedPiece: state_selectedPiece,
      legalMoves: state_legalMoves,
      cursorPosition: state_cursorPosition,
      promote: state_promote,
      lock: state_lock
    };
    Sounds.cursorSound();
    return draw(state$1);
  }
  if (y >= 7) {
    return state;
  }
  var state_board$1 = state.board;
  var state_turn$1 = state.turn;
  var state_selectedPiece$1 = state.selectedPiece;
  var state_legalMoves$1 = state.legalMoves;
  var state_cursorPosition$1 = [
    x,
    y + 1 | 0
  ];
  var state_promote$1 = state.promote;
  var state_lock$1 = state.lock;
  var state$2 = {
    board: state_board$1,
    turn: state_turn$1,
    selectedPiece: state_selectedPiece$1,
    legalMoves: state_legalMoves$1,
    cursorPosition: state_cursorPosition$1,
    promote: state_promote$1,
    lock: state_lock$1
  };
  Sounds.cursorSound();
  return draw(state$2);
}

function handleUp(state) {
  var match = state.cursorPosition;
  if (state.lock) {
    return state;
  }
  var y = match[1];
  var x = match[0];
  var match$1 = state.turn;
  if (match$1 === "White") {
    if (y >= 7) {
      return state;
    }
    var state_board = state.board;
    var state_turn = state.turn;
    var state_selectedPiece = state.selectedPiece;
    var state_legalMoves = state.legalMoves;
    var state_cursorPosition = [
      x,
      y + 1 | 0
    ];
    var state_promote = state.promote;
    var state_lock = state.lock;
    var state$1 = {
      board: state_board,
      turn: state_turn,
      selectedPiece: state_selectedPiece,
      legalMoves: state_legalMoves,
      cursorPosition: state_cursorPosition,
      promote: state_promote,
      lock: state_lock
    };
    Sounds.cursorSound();
    return draw(state$1);
  }
  if (y <= 0) {
    return state;
  }
  var state_board$1 = state.board;
  var state_turn$1 = state.turn;
  var state_selectedPiece$1 = state.selectedPiece;
  var state_legalMoves$1 = state.legalMoves;
  var state_cursorPosition$1 = [
    x,
    y - 1 | 0
  ];
  var state_promote$1 = state.promote;
  var state_lock$1 = state.lock;
  var state$2 = {
    board: state_board$1,
    turn: state_turn$1,
    selectedPiece: state_selectedPiece$1,
    legalMoves: state_legalMoves$1,
    cursorPosition: state_cursorPosition$1,
    promote: state_promote$1,
    lock: state_lock$1
  };
  Sounds.cursorSound();
  return draw(state$2);
}

function handlePromote(state, key) {
  if (state.promote) {
    var match = state.selectedPiece;
    var maybePiece;
    if (match !== undefined) {
      if (key >= 78) {
        if (key >= 83) {
          maybePiece = undefined;
        } else {
          switch (key) {
            case 78 :
                maybePiece = Utils.knight(Utils.getColor(match), Utils.getX(match), Utils.getY(match));
                break;
            case 79 :
            case 80 :
                maybePiece = undefined;
                break;
            case 81 :
                maybePiece = Utils.queen(Utils.getColor(match), Utils.getX(match), Utils.getY(match));
                break;
            case 82 :
                maybePiece = Utils.rook(Utils.getColor(match), Utils.getX(match), Utils.getY(match));
                break;
            
          }
        }
      } else {
        maybePiece = key !== 66 ? undefined : Utils.bishop(Utils.getColor(match), Utils.getX(match), Utils.getY(match));
      }
    } else {
      maybePiece = undefined;
    }
    if (maybePiece !== undefined) {
      var pieces = Belt_List.keep(state.board.pieces, (function (p) {
              if (Utils.getX(p) !== Utils.getX(maybePiece)) {
                return true;
              } else {
                return Utils.getY(p) !== Utils.getY(maybePiece);
              }
            }));
      var board = {
        pieces: {
          hd: maybePiece,
          tl: pieces
        }
      };
      var state$p_turn = state.turn;
      var state$p_selectedPiece = state.selectedPiece;
      var state$p_legalMoves = state.legalMoves;
      var state$p_cursorPosition = state.cursorPosition;
      var state$p_lock = state.lock;
      var state$p = {
        board: board,
        turn: state$p_turn,
        selectedPiece: state$p_selectedPiece,
        legalMoves: state$p_legalMoves,
        cursorPosition: state$p_cursorPosition,
        promote: false,
        lock: state$p_lock
      };
      Sounds.winSound();
      GameUtils.endTurn();
      return draw(state$p);
    }
    Sounds.failureSound();
    return state;
  }
  Sounds.failureSound();
  return state;
}

function handleSelect(state) {
  if (state.lock) {
    return state;
  }
  var piece = Board.getPiece(state.board, state.cursorPosition, undefined);
  var match = state.cursorPosition;
  var y = match[1];
  var x = match[0];
  var moveHelper = function (state) {
    var selectedPiece = Belt_Option.getExn(state.selectedPiece);
    var promote = function (param) {
      if (selectedPiece.TAG === /* Pawn */0) {
        return Utils.promotionRank(selectedPiece._0) === param[1];
      } else {
        return false;
      }
    };
    var legalMove = Belt_Option.flatMap(state.legalMoves, (function (moves) {
            return Belt_List.get(Belt_List.keep(moves, (function (param) {
                              if (param[0] === x) {
                                return param[1] === y;
                              } else {
                                return false;
                              }
                            })), 0);
          }));
    if (legalMove !== undefined) {
      var state$p_board = Board.confirmMove(state.board, selectedPiece, legalMove, true);
      var state$p_turn = state.turn;
      var state$p_selectedPiece = Utils.withPosition(selectedPiece, legalMove);
      var state$p_legalMoves = state.legalMoves;
      var state$p_cursorPosition = state.cursorPosition;
      var state$p_promote = promote(legalMove);
      var state$p = {
        board: state$p_board,
        turn: state$p_turn,
        selectedPiece: state$p_selectedPiece,
        legalMoves: state$p_legalMoves,
        cursorPosition: state$p_cursorPosition,
        promote: state$p_promote,
        lock: true
      };
      if (Belt_List.size(state$p_board.pieces) < Belt_List.size(state.board.pieces)) {
        Sounds.captureSound();
      } else {
        Sounds.moveSound();
      }
      if (state$p_promote) {
        return draw(state$p);
      } else {
        GameUtils.endTurn();
        return draw(state$p);
      }
    }
    Sounds.failureSound();
    return state;
  };
  var selectedPiece = state.selectedPiece;
  if (selectedPiece !== undefined) {
    if (piece === undefined) {
      return moveHelper(state);
    }
    if (Utils.getColor(piece) !== state.turn) {
      return moveHelper(state);
    }
    if (!(x !== Utils.getX(selectedPiece) || y !== Utils.getY(selectedPiece))) {
      return state;
    }
    var state$p_board = state.board;
    var state$p_turn = state.turn;
    var state$p_legalMoves = Pieces.getLegalMoves(piece, state.board);
    var state$p_cursorPosition = state.cursorPosition;
    var state$p_promote = state.promote;
    var state$p_lock = state.lock;
    var state$p = {
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
  if (piece !== undefined) {
    if (Utils.getColor(piece) === state.turn) {
      var state$p_board$1 = state.board;
      var state$p_turn$1 = state.turn;
      var state$p_selectedPiece = piece;
      var state$p_legalMoves$1 = Pieces.getLegalMoves(piece, state.board);
      var state$p_cursorPosition$1 = state.cursorPosition;
      var state$p_promote$1 = state.promote;
      var state$p_lock$1 = state.lock;
      var state$p$1 = {
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
    Utils.toggleEmphasis(piece);
    Sounds.successSound();
    return draw(state);
  }
  Sounds.failureSound();
  return state;
}

exports.drawGrid = drawGrid;
exports.endTurn = endTurn;
exports.winSound = winSound;
exports.cursorSound = cursorSound;
exports.successSound = successSound;
exports.failureSound = failureSound;
exports.moveSound = moveSound;
exports.captureSound = captureSound;
exports.turnStartSound = turnStartSound;
exports.init = init;
exports.draw = draw;
exports.handleTurnStart = handleTurnStart;
exports.handleMoveCursor = handleMoveCursor;
exports.handleCancel = handleCancel;
exports.handleLeft = handleLeft;
exports.handleRight = handleRight;
exports.handleDown = handleDown;
exports.handleUp = handleUp;
exports.handlePromote = handlePromote;
exports.handleSelect = handleSelect;
/* ./Sounds Not a pure module */
