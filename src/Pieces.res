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
      Board.checkUnobstructed(board, piece, position, true)
    }
  | _ => Board.checkUnobstructed(board, piece, position, true)
  }
}

let unobstructedPositionsHelper = (piece, board, a, b, c, d) => {
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
  list{a, b, c, d}
  ->List.map(l => {
    let (_, res) = List.reduce(l, (true, list{}), positionHelper)
    res
  })
  ->List.flatten
}

let getUnobstructedCardinalPositions = (piece, board) => {
  let up = List.makeBy(7 - piece["y"], i => (piece["x"], piece["y"] + i + 1))
  let down = List.makeBy(piece["y"], i => (piece["x"], piece["y"] - i - 1))
  let left = List.makeBy(piece["x"], i => (piece["x"] - i - 1, piece["y"]))
  let right = List.makeBy(7 - piece["x"], i => (piece["x"] + i + 1, piece["y"]))
  unobstructedPositionsHelper(piece, board, up, down, left, right)
}

let getUnobstructedDiagonalPositions = (piece, board) => {
  let ul = List.makeBy(Js.Math.min_int(piece["x"], 7 - piece["y"]), i => (
    piece["x"] - i - 1,
    piece["y"] + i + 1,
  ))
  let ur = List.makeBy(7 - Js.Math.max_int(piece["x"], piece["y"]), i => (
    piece["x"] + i + 1,
    piece["y"] + i + 1,
  ))
  let dl = List.makeBy(Js.Math.min_int(piece["x"], piece["y"]), i => (
    piece["x"] - i - 1,
    piece["y"] - i - 1,
  ))
  let dr = List.makeBy(Js.Math.min_int(7 - piece["x"], piece["y"]), i => (
    piece["x"] + i + 1,
    piece["y"] - i - 1,
  ))
  unobstructedPositionsHelper(piece, board, ul, ur, dl, dr)
}

let rec getCoveredPositions = (piece, board) => {
  switch piece {
  | Pawn(p) => {
      let positions = list{
        (p["x"] - 1, p["y"] + pawnOffsetHelper(p, 1)),
        (p["x"] + 1, p["y"] + pawnOffsetHelper(p, 1)),
      }
      List.keep(positions, ((x, y)) => y >= 0 && y <= 7 && canCover(p, board, (x, y)))
    }
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

and validStateForMove = (board, piece, position) => {
  let newBoard = Board.confirmMove(board, piece, position, false)
  validBoard(newBoard, getColor(piece))
}

and getLegalMoves = (piece, board) => {
  switch piece {
  | Pawn(p) => {
      let oneSpace = (p["x"], p["y"] + pawnOffsetHelper(p, 1))
      let twoSpace = (p["x"], p["y"] + pawnOffsetHelper(p, 2))
      let movement = if Board.checkUnobstructed(board, p, oneSpace, false) {
        if !p["hasMoved"] && Board.checkUnobstructed(board, p, twoSpace, false) {
          list{oneSpace, twoSpace}
        } else {
          list{oneSpace}
        }
      } else {
        list{}
      }
      let capture = getCoveredPositions(piece, board)->List.keep(pos => {
        if Board.hasOppositeColoredPiece(board, pos, p["color"]) {
          // regular capture
          true
        } else {
          // en passant -- adjacent enemy pawns that have just moved 2 spaces
          let (x, _) = pos
          let otherPiece = Board.getPiece(board, (x, p["y"]), Some(oppositeColor(p["color"])))
          switch otherPiece {
          | Some(Pawn(otherPawn)) => otherPawn["hasJustMoved2Spaces"]
          | _ => false
          }
        }
      })
      List.concat(movement, capture)->List.keep(pos => validStateForMove(board, Pawn(p), pos))
    }
  | King(k) => {
      let regularMoves =
        getCoveredPositions(piece, board)->List.keep(p =>
          Board.checkUnobstructed(board, k, p, true) && validStateForMove(board, piece, p)
        )
      if k["hasMoved"] || k["inCheck"] {
        regularMoves
      } else {
        let y = switch k["color"] {
        | White => 0
        | Black => 7
        }
        let leftRook = Board.getPiece(board, (0, y), Some(k["color"]))
        let rightRook = Board.getPiece(board, (7, y), Some(k["color"]))
        let leftCastle = switch leftRook {
        | Some(Rook(r)) =>
          if (
            r["hasMoved"] ||
            Board.hasPiece(board, (1, y), None) ||
            Board.hasPiece(board, (2, y), None) ||
            Board.hasPiece(board, (3, y), None) ||
            !validStateForMove(board, piece, (3, y)) ||
            !validStateForMove(board, piece, (2, y)) ||
            !validStateForMove(board, piece, (2, y))
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
            !validStateForMove(board, piece, (5, y)) ||
            !validStateForMove(board, piece, (6, y)) ||
            !validStateForMove(board, piece, (6, y))
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
  | Queen(x)
  | Bishop(x)
  | Knight(x)
  | Rook(x) =>
    getCoveredPositions(piece, board)->List.keep(pos =>
      Board.checkUnobstructed(board, x, pos, true) && validStateForMove(board, piece, pos)
    )
  }
}

and coveredPositionsHelper = (pieces, board) => {
  List.reduce(pieces, list{}, (acc, p) => list{getCoveredPositions(p, board), ...acc})
  ->List.flatten
  ->List.sort(((x1, y1), (x2, y2)) =>
    if x1 === x2 {
      y1 - y2
    } else {
      x1 - x2
    }
  )
  ->List.reduce(list{}, (acc, (x1, y1)) => {
    switch acc {
    | list{} => list{(x1, y1)}
    | list{(x2, y2), ..._} =>
      if x1 === x2 && y1 === y2 {
        acc
      } else {
        list{(x1, y1), ...acc}
      }
    }
  })
}

and getCoveredPositionsForColor = (board, color) => {
  List.keep(board["pieces"], p => getColor(p) === color)->coveredPositionsHelper(board)
}

and validBoard = (board, movedColor) => {
  let ownKing = List.keep(board["pieces"], p => {
    switch p {
    | King(k) => k["color"] === movedColor
    | _ => false
    }
  })->List.getExn(0)
  let otherCoveredPositions = getCoveredPositionsForColor(board, oppositeColor(movedColor))
  !List.has(otherCoveredPositions, (getX(ownKing), getY(ownKing)), ((x1, y1), (x2, y2)) =>
    x1 === x2 && y1 === y2
  )
}

let getEmphasizedCoveredPositionsForColor = (board, color) => {
  List.keep(board["pieces"], p => getColor(p) === color && getEmphasis(p))->coveredPositionsHelper(
    board,
  )
}
