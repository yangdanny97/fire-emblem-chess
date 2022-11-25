open Utils
open Belt

let board = piecesArr => {
  pieces: List.fromArray(piecesArr),
}

let init = () =>
  board([
    // white pawns
    pawn(#White, 0, 1),
    pawn(#White, 1, 1),
    pawn(#White, 2, 1),
    pawn(#White, 3, 1),
    pawn(#White, 4, 1),
    pawn(#White, 5, 1),
    pawn(#White, 6, 1),
    pawn(#White, 7, 1),
    // white pieces
    rook(#White, 0, 0),
    rook(#White, 7, 0),
    knight(#White, 1, 0),
    knight(#White, 6, 0),
    bishop(#White, 2, 0),
    bishop(#White, 5, 0),
    queen(#White, 3, 0),
    king(#White, 4, 0),
    // black pawns
    pawn(#Black, 0, 6),
    pawn(#Black, 1, 6),
    pawn(#Black, 2, 6),
    pawn(#Black, 3, 6),
    pawn(#Black, 4, 6),
    pawn(#Black, 5, 6),
    pawn(#Black, 6, 6),
    pawn(#Black, 7, 6),
    // black pieces
    rook(#Black, 0, 7),
    rook(#Black, 7, 7),
    knight(#Black, 1, 7),
    knight(#Black, 6, 7),
    bishop(#Black, 2, 7),
    bishop(#Black, 5, 7),
    queen(#Black, 3, 7),
    king(#Black, 4, 7),
  ])

let getPiece = (board, (x, y), color) => {
  List.getBy(board.pieces, p => {
    let colorPredicate = switch color {
    | Some(c) => getColor(p) === c
    | None => true
    }
    getX(p) === x && getY(p) === y && colorPredicate
  })
}

let hasPiece = (board, position, color) => {
  switch getPiece(board, position, color) {
  | Some(_) => true
  | None => false
  }
}

let hasOppositeColoredPiece = (board, position, color) => {
  hasPiece(board, position, Some(oppositeColor(color)))
}

let checkUnobstructed = (board, piece, (x, y), canCapture) => {
  if x < 0 || x > 7 || y < 0 || y > 7 {
    false
  } else if canCapture {
    let target = getPiece(board, (x, y), None)
    switch target {
    | Some(King(_)) => false
    | Some(p) => getColor(p) !== getColor(piece)
    | None => true
    }
  } else {
    !hasPiece(board, (x, y), None)
  }
}

let rec confirmMove = (board, piece, position, _) => {
  // last argument is for debug
  let (newX, newY) = position
  let noop = b => b
  let (newPiece, callback) = switch piece {
  | Pawn(p) => {
      let newPawn = if p.y - newY === -2 || p.y - newY === 2 {
        with2Spaces(p)->withPosition(position)
      } else {
        withPosition(piece, position)->withMoved
      }
      // en passant
      let callback = if p.x !== newX && p.y !== newY && !hasPiece(board, position, None) {
        b => {
          pieces: List.keep(b.pieces, i => getX(i) !== newX || getY(i) !== p.y),
        }
      } else {
        noop
      }
      (newPawn, callback)
    }

  | King(k) => {
      let y = backRank(k)
      let castleHelper = (oldRookX, newRookX, board) => {
        let rook = getPiece(board, (oldRookX, y), None)
        switch rook {
        | Some(r) => b => confirmMove(b, r, (newRookX, y), true)
        | None => raise(Not_found)
        }
      }
      if !k.hasMoved {
        if newX === 2 && newY === y {
          (withPosition(piece, position)->withMoved, castleHelper(0, 3, board))
        } else if newX === 6 && newY === y {
          (withPosition(piece, position)->withMoved, castleHelper(7, 5, board))
        } else {
          (withPosition(piece, position)->withMoved, noop)
        }
      } else {
        (withPosition(piece, position)->withMoved, noop)
      }
    }

  | Queen(_)
  | Bishop(_)
  | Knight(_)
  | Rook(_) => (withPosition(piece, position)->withMoved, noop)
  }
  let pieces = list{
    newPiece,
    ...List.keep(board.pieces, p => {
      !(getX(p) === getX(piece) && getY(p) === getY(piece)) &&
      !(getX(p) === getX(newPiece) && getY(p) === getY(newPiece))
    })->List.map(p =>
      switch p {
      | Pawn(pawn) => Utils.disable2Spaces(pawn)
      | _ => p
      }
    ),
  }
  callback({
    pieces: pieces,
  })
}
