open Utils

let canCover = (piece, board, position) => {
  let p = Board.getPiece(board, position, None)
  switch p {
  | Some(King(_)) => true
  | Some(x) =>
    if getColor(x) === getColor(piece) {
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
  ->List.flat
}

let getUnobstructedCardinalPositions = (piece, board) => {
  let up = List.fromInitializer(~length=7 - getY(piece), i => (getX(piece), getY(piece) + i + 1))
  let down = List.fromInitializer(~length=getY(piece), i => (getX(piece), getY(piece) - i - 1))
  let left = List.fromInitializer(~length=getX(piece), i => (getX(piece) - i - 1, getY(piece)))
  let right = List.fromInitializer(~length=7 - getX(piece), i => (getX(piece) + i + 1, getY(piece)))
  unobstructedPositionsHelper(piece, board, up, down, left, right)
}

let getUnobstructedDiagonalPositions = (piece, board) => {
  let ul = List.fromInitializer(~length=Math.Int.min(getX(piece), 7 - getY(piece)), i => (
    getX(piece) - i - 1,
    getY(piece) + i + 1,
  ))
  let ur = List.fromInitializer(~length=7 - Math.Int.max(getX(piece), getY(piece)), i => (
    getX(piece) + i + 1,
    getY(piece) + i + 1,
  ))
  let dl = List.fromInitializer(~length=Math.Int.min(getX(piece), getY(piece)), i => (
    getX(piece) - i - 1,
    getY(piece) - i - 1,
  ))
  let dr = List.fromInitializer(~length=Math.Int.min(7 - getX(piece), getY(piece)), i => (
    getX(piece) + i + 1,
    getY(piece) - i - 1,
  ))
  unobstructedPositionsHelper(piece, board, ul, ur, dl, dr)
}

let rec getCoveredPositions = (piece, board) => {
  switch piece {
  | Pawn(p) => {
      let positions = list{
        (p.x - 1, p.y + pawnOffsetHelper(p, 1)),
        (p.x + 1, p.y + pawnOffsetHelper(p, 1)),
      }
      List.filter(positions, ((x, y)) => y >= 0 && y <= 7 && canCover(piece, board, (x, y)))
    }

  | King(k) => {
      let positions = list{
        (k.x - 1, k.y),
        (k.x - 1, k.y - 1),
        (k.x - 1, k.y + 1),
        (k.x, k.y - 1),
        (k.x, k.y + 1),
        (k.x + 1, k.y),
        (k.x + 1, k.y - 1),
        (k.x + 1, k.y + 1),
      }
      List.filter(positions, p => canCover(piece, board, p))
    }

  | Queen(_) =>
    List.concat(
      getUnobstructedDiagonalPositions(piece, board),
      getUnobstructedCardinalPositions(piece, board),
    )
  | Bishop(_) => getUnobstructedDiagonalPositions(piece, board)
  | Knight(n) => {
      let positions = list{
        (n.x - 2, n.y - 1),
        (n.x - 2, n.y + 1),
        (n.x - 1, n.y + 2),
        (n.x - 1, n.y - 2),
        (n.x + 1, n.y + 2),
        (n.x + 1, n.y - 2),
        (n.x + 2, n.y - 1),
        (n.x + 2, n.y + 1),
      }
      List.filter(positions, p => canCover(piece, board, p))
    }

  | Rook(_) => getUnobstructedCardinalPositions(piece, board)
  }
}

and validStateForMove = (board, piece, position) => {
  let newBoard = Board.confirmMove(board, piece, position, false)
  validBoard(newBoard, getColor(piece))
}

and getLegalMoves = (piece, board) => {
  switch piece {
  | Pawn(p) => {
      let oneSpace = (p.x, p.y + pawnOffsetHelper(p, 1))
      let twoSpace = (p.x, p.y + pawnOffsetHelper(p, 2))
      let movement = if Board.checkUnobstructed(board, piece, oneSpace, false) {
        if !p.hasMoved && Board.checkUnobstructed(board, piece, twoSpace, false) {
          list{oneSpace, twoSpace}
        } else {
          list{oneSpace}
        }
      } else {
        list{}
      }
      let capture = getCoveredPositions(piece, board)->List.filter(pos => {
        if Board.hasOppositeColoredPiece(board, pos, p.color) {
          // regular capture
          true
        } else {
          // en passant -- adjacent enemy pawns that have just moved 2 spaces
          let (x, _) = pos
          let otherPiece = Board.getPiece(board, (x, p.y), Some(oppositeColor(p.color)))
          switch otherPiece {
          | Some(Pawn(otherPawn)) => otherPawn.hasJustMoved2Spaces
          | _ => false
          }
        }
      })
      List.concat(movement, capture)->List.filter(pos => validStateForMove(board, Pawn(p), pos))
    }

  | King(k) => {
      let regularMoves =
        getCoveredPositions(piece, board)->List.filter(p =>
          Board.checkUnobstructed(board, King(k), p, true) && validStateForMove(board, piece, p)
        )
      if k.hasMoved || k.inCheck {
        regularMoves
      } else {
        let y = backRank(k)
        let leftRook = Board.getPiece(board, (0, y), Some(k.color))
        let rightRook = Board.getPiece(board, (7, y), Some(k.color))
        let leftCastle = switch leftRook {
        | Some(Rook(r)) =>
          if (
            r.hasMoved ||
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
            r.hasMoved ||
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

  | Queen(_)
  | Bishop(_)
  | Knight(_)
  | Rook(_) =>
    getCoveredPositions(piece, board)->List.filter(pos =>
      Board.checkUnobstructed(board, piece, pos, true) && validStateForMove(board, piece, pos)
    )
  }
}

and coveredPositionsHelper = (pieces, board) => {
  List.reduce(pieces, list{}, (acc, p) => list{getCoveredPositions(p, board), ...acc})
  ->List.flat
  ->List.sort(((x1, y1), (x2, y2)) =>
    (if x1 === x2 {
      y1 - y2
    } else {
      x1 - x2
    } :> float)
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
  List.filter(board.pieces, p => getColor(p) === color)->coveredPositionsHelper(board)
}

and validBoard = (board, movedColor) => {
  let ownKing = List.filter(board.pieces, p => {
    switch p {
    | King(k) => k.color === movedColor
    | _ => false
    }
  })->List.getOrThrow(0)
  let otherCoveredPositions = getCoveredPositionsForColor(board, oppositeColor(movedColor))
  !List.has(otherCoveredPositions, (getX(ownKing), getY(ownKing)), ((x1, y1), (x2, y2)) =>
    x1 === x2 && y1 === y2
  )
}

let getEmphasizedCoveredPositionsForColor = (board, color) => {
  List.filter(board.pieces, p => getColor(p) === color && getEmphasis(p))->coveredPositionsHelper(
    board,
  )
}

let getNumLegalMovesForColor = (board, color) => {
  List.filter(board.pieces, p => getColor(p) === color)->List.reduce(0, (acc, x) =>
    acc + List.size(getLegalMoves(x, board))
  )
}
