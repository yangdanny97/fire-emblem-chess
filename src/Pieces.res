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

module Pawn = {
  type t = pawn

  let offsetHelper = (piece, n) => {
    switch piece["color"] {
    | White => n
    | Black => -n
    }
  }

  let getCoveredPositions = (piece, board) => {
    let positions = list{
      (piece["x"] - 1, piece["y"] + offsetHelper(piece, 1)),
      (piece["x"] + 1, piece["y"] + offsetHelper(piece, 1)),
    }
    List.keep(positions, ((x, y)) => y >= 0 && y <= 7 && canCover(piece, board, (x, y)))
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
    let capture = getCoveredPositions(piece, board)->List.keep(p => {
      if Board.hasOppositeColoredPiece(board, p, piece["color"]) {
        // regular capture
        true
      } else {
        // en passant
        let (x, _) = p
        let otherPiece = Board.getPiece(board, (x, piece["y"]), Some(oppositeColor(piece["color"])))
        switch otherPiece {
        | Some(Pawn(otherPawn)) => otherPawn["hasJustMoved2Spaces"]
        | _ => false
        }
      }
    })
    List.concat(movement, capture)->List.keep(p =>
      Board.validStateForMove(board, Pawn(piece), p, None, None)
    )
  }

  let isPromotionEligible = piece => {
    (piece["color"] === White && piece["y"] === 7) || (piece["color"] === Black && piece["y"] === 0)
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

module King = {
  type t = king

  let getLegalMoves = (piece, board) => {
    let king = King(piece)
    let regularMoves =
      getCoveredPositions(king, board)->List.keep(p =>
        Board.validStateForMove(board, king, p, None, None)
      )
    if piece["hasMoved"] || piece["inCheck"] {
      regularMoves
    } else {
      let y = switch piece["color"] {
      | White => 0
      | Black => 7
      }
      let leftRook = Board.getPiece(board, (0, y), Some(piece["color"]))
      let rightRook = Board.getPiece(board, (7, y), Some(piece["color"]))
      let leftCastle = switch leftRook {
      | Some(Rook(r)) =>
        if (
          r["hasMoved"] ||
          Board.hasPiece(board, (1, y), None) ||
          Board.hasPiece(board, (2, y), None) ||
          Board.hasPiece(board, (3, y), None) ||
          !Board.validStateForMove(board, king, (3, y), None, None) ||
          !Board.validStateForMove(board, king, (2, y), None, None) ||
          !Board.validStateForMove(board, king, (2, y), Some(Rook(r)), Some((3, y)))
        ) {
          None
        } else {
          Some((2, y))
        }
      | _ => None
      }
      let rightCastle = switch rightRook {
      | Some(Rook(r)) =>
        if (
          r["hasMoved"] ||
          Board.hasPiece(board, (5, y), None) ||
          Board.hasPiece(board, (6, y), None) ||
          !Board.validStateForMove(board, king, (5, y), None, None) ||
          !Board.validStateForMove(board, king, (6, y), None, None) ||
          !Board.validStateForMove(board, king, (6, y), Some(Rook(r)), Some((5, y)))
        ) {
          None
        } else {
          Some((6, y))
        }
      | _ => None
      }
      switch (leftCastle, rightCastle) {
      | (Some(p1), Some(p2)) => list{p1, p2, ...regularMoves}
      | (Some(p1), None) => list{p1, ...regularMoves}
      | (None, Some(p2)) => list{p2, ...regularMoves}
      | (None, None) => regularMoves
      }
    }
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
    getCoveredPositions(piece, board)->List.keep(pos =>
      Board.validStateForMove(board, piece, pos, None, None)
    )
  }
}
