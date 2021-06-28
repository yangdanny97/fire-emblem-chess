open Belt
open Utils

let canCover = (piece, board, position) => {
  let p = Board.getPiece(board, position, None)
  switch p {
  | Some(King(_)) => true
  | Some(x) =>
    if getColor(x) === piece["color"] {
      true
    } else {
      Board.checkUnobstructed(board, piece, position, false)
    }
  | _ => Board.checkUnobstructed(board, piece, position, false)
  }
}

let getUnobstructedCardinalPositions = (piece, board) => {
  let up =
    List.keep(board["pieces"], p => getX(p) === piece["x"] && getY(p) > piece["y"])->List.sort((
      a,
      b,
    ) => getY(a) - getY(b))
  let down =
    List.keep(board["pieces"], p => getX(p) === piece["x"] && getY(p) < piece["y"])->List.sort((
      a,
      b,
    ) => getY(b) - getY(a))
  let left =
    List.keep(board["pieces"], p => getY(p) === piece["y"] && getX(p) < piece["x"])->List.sort((
      a,
      b,
    ) => getX(b) - getX(a))
  let right =
    List.keep(board["pieces"], p => getY(p) === piece["y"] && getX(p) > piece["x"])->List.sort((
      a,
      b,
    ) => getX(a) - getX(b))
  let positionHelper = (acc, position) => {
    switch acc {
    | (false, lst) => (false, lst)
    | (true, lst) =>
      if canCover(piece, board, position) {
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
    let (_, res) = List.map(l, i => (getX(i), getY(i)))->List.reduce((true, list{}), positionHelper)
    res
  })
  ->List.flatten
}

let getUnobstructedDiagonalPositions = (piece, board) => {
  let ul =
    List.keep(board["pieces"], p =>
      getX(p) < piece["x"] && getY(p) > piece["y"] && getX(p) - getY(p) === piece["x"] - piece["y"]
    )->List.sort((a, b) => getY(a) - getY(b))
  let ur =
    List.keep(board["pieces"], p =>
      getX(p) > piece["x"] && getY(p) > piece["y"] && getX(p) - getY(p) === piece["x"] - piece["y"]
    )->List.sort((a, b) => getY(a) - getY(b))
  let dl =
    List.keep(board["pieces"], p =>
      getX(p) < piece["x"] && getY(p) < piece["y"] && getX(p) - getY(p) === piece["x"] - piece["y"]
    )->List.sort((a, b) => getY(b) - getY(a))
  let dr =
    List.keep(board["pieces"], p =>
      getX(p) > piece["x"] && getY(p) < piece["y"] && getX(p) - getY(p) === piece["x"] - piece["y"]
    )->List.sort((a, b) => getY(b) - getY(a))
  let positionHelper = (acc, position) => {
    switch acc {
    | (false, lst) => (false, lst)
    | (true, lst) =>
      if canCover(piece, board, position) {
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
  list{ul, ur, dl, dr}
  ->List.map(l => {
    let (_, res) = List.map(l, i => (getX(i), getY(i)))->List.reduce((true, list{}), positionHelper)
    res
  })
  ->List.flatten
}

module King = {
  type t = king

  let getLegalMoves = (piece, board) => {
    list{} // TODO
  }
}

module Pawn = {
  type t = pawn

  let offsetHelper = (piece, n) => {
    switch piece["color"] {
    | White => n
    | Black => -n
    }
  }

  let getLegalMoves = (piece, board) => {
    let oneSpace = (piece["x"], piece["y"] + offsetHelper(piece, 1))
    let twoSpace = (piece["x"], piece["y"] + offsetHelper(piece, 2))
    let movement = if Board.checkUnobstructed(board, piece, oneSpace, false) {
      if piece["hasMoved"] && Board.checkUnobstructed(board, piece, twoSpace, false) {
        list{oneSpace, twoSpace}
      } else {
        list{oneSpace}
      }
    } else {
      list{}
    }
    let capture = list{} // TODO

    List.concat(movement, capture)
  }

  let isPromotionEligible = piece => {
    (piece["color"] === White && piece["y"] === 7) || (piece["color"] === Black && piece["y"] === 0)
  }

  let getCoveredPositions = (piece, board) => {
    let positions = list{
      (piece["x"] - 1, piece["y"] + offsetHelper(piece, 1)),
      (piece["x"] + 1, piece["y"] + offsetHelper(piece, 1)),
    }
    List.keep(positions, ((x, y)) => y >= 0 && y <= 7 && canCover(piece, board, (x, y)))
  }
}

let getCoveredPositions = (piece, board) => {
  switch piece {
  | Pawn(p) => Pawn.getCoveredPositions(p, board)
  | King(k) => {
      let positions = list{
        (k["x"] - 1, k["y"]),
        (k["x"] - 1, k["y"] - 1),
        (k["x"] - 1, k["y"] + 1),
        (k["x"], k["y"] - 1),
        (k["x"], k["y"] + 1),
        (k["x"] + 1, k["y"]),
        (k["x"] + 1, k["y"] - 1),
        (k["x"] + 1, k["y"] + 1),
      }
      List.keep(positions, p => canCover(k, board, p))
    }
  | Queen(q) =>
    List.concat(
      getUnobstructedDiagonalPositions(q, board),
      getUnobstructedCardinalPositions(q, board),
    )
  | Bishop(b) => getUnobstructedDiagonalPositions(b, board)
  | Knight(n) => {
      let positions = list{
        (n["x"] - 2, n["y"] - 1),
        (n["x"] - 2, n["y"] + 1),
        (n["x"] - 1, n["y"] + 2),
        (n["x"] - 1, n["y"] - 2),
        (n["x"] + 1, n["y"] + 2),
        (n["x"] + 1, n["y"] - 2),
        (n["x"] + 2, n["y"] - 1),
        (n["x"] + 2, n["y"] + 1),
      }
      List.keep(positions, p => canCover(n, board, p))
    }
  | Rook(r) => getUnobstructedCardinalPositions(r, board)
  }
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
