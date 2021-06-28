open Belt
open Utils

module King = {
  type t = {
    x: int,
    y: int,
    color: color,
    hasMoved: bool,
    emphasizeCoverRange: bool,
    inCheck: bool,
    checkmated: bool,
  }

  let getLegalMoves = (piece, board) => {
    list{} // TODO
  }
}

module Pawn = {
  type t = {
    x: int,
    y: int,
    color: color,
    hasMoved: bool,
    emphasizeCoverRange: bool,
    hasJustMoved2Spaces: bool,
  }

  let getLegalMoves = (piece, board) => {
    list{} // TODO
  }

  let isPromotionEligible = (piece, board) => {
    (piece.color === White && piece.y === 7) || (piece.color === Black && piece.y === 0)
  }
}

type pieces =
  | Pawn(Pawn.t)
  | King(King.t)
  | Queen(piece)
  | Bishop(piece)
  | Knight(piece)
  | Rook(piece)

let getAsset = piece => {
  switch piece {
  | Pawn(p) => `assets/${colorName(p.color)}/pawn`
  | King(k) => `assets/${colorName(k.color)}/king`
  | Queen(q) => `assets/${colorName(q.color)}/queen`
  | Bishop(b) => `assets/${colorName(b.color)}/bishop`
  | Knight(n) => `assets/${colorName(n.color)}/knight`
  | Rook(r) => `assets/${colorName(r.color)}/rook`
  }
}

let getColor = piece => {
  switch piece {
  | Pawn(p) => p.color
  | King(k) => k.color
  | Queen(q) => q.color
  | Bishop(b) => b.color
  | Knight(n) => n.color
  | Rook(r) => r.color
  }
}

let canCover = (piece, board, position) => {
  let p = Board.getPiece(board, position, None)
  switch p {
  | Some(King(_)) => true
  | Some(x) =>
    if getColor(x) === piece.color {
      true
    } else {
      Board.checkUnobstructed(board, piece, position, false)
    }
  | _ => Board.checkUnobstructed(board, piece, position, false)
  }
}

let getUnobstructedCardinalPositions = (piece, board) => {
  let up =
    List.keep(board.pieces, p => p.x === piece.x && p.y > piece.y)->List.sort((a, b) => a.y - b.y)
  let down =
    List.keep(board.pieces, p => p.x === piece.x && p.y < piece.y)->List.sort((a, b) => b.y - a.y)
  let left =
    List.keep(board.pieces, p => p.y === piece.y && p.x < piece.x)->List.sort((a, b) => b.x - a.x)
  let right =
    List.keep(board.pieces, p => p.y === piece.y && p.x > piece.x)->List.sort((a, b) => a.x - b.x)
  let positionHelper = (acc, position) => {
    switch acc {
    | (false, lst) => (false, lst)
    | (true, lst) => if canCover(piece, board, position) {
        if Board.hasPiece(board, position, None) {
          (false, list{position, ...lst})
        } else {
          (true, list{position, ...lst})
        }
      } else {
        (false, lst)
      }
    }
  }
  list{up, down, left, right}
  ->List.map(l => {
    let (_, res) = List.reduce(l, (true, list{}), positionHelper)
    res
  })
  ->List.flatten
}

let getUnobstructedDiagonalPositions = (piece, board) => {
  list{} // TODO
}

let getCoveredPositions = (piece, board) => {
  list{} // TODO
}

let getLegalMoves = (piece, board) => {
  switch piece {
  | Pawn(p) => Pawn.getLegalMoves(p, board)
  | King(k) => King.getLegalMoves(k, board)
  | Queen(_)
  | Bishop(_)
  | Knight(_)
  | Rook(_) =>
    getCoveredPositions(piece, board)->List.keep(pos => Board.validStateForMove(board, piece, pos))
  }
}
