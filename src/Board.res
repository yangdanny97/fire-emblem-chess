open Utils
open Belt

let getPiece = (board, (x, y), color) => {
  List.getBy(board["pieces"], p => {
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
    | Some(p) => getColor(p) !== piece["color"]
    | None => true
    }
  } else {
    !hasPiece(board, (x, y), None)
  }
}

let rec confirmMove = (board, piece, position) => {
  let (newX, newY) = position
  let noop = b => b
  let (newPiece, callback) = switch piece {
  | Pawn(p) => {
      let newPawn = if p["y"] - newY === -2 || p["y"] - newY === 2 {
        with2Spaces(p)->withPosition(position)
      } else {
        withPosition(piece, position)->withMoved
      }
      // en passant
      let callback = if p["x"] !== newX && p["y"] !== newY && !hasPiece(board, position, None) {
        b =>
          {
            "pieces": List.keep(b["pieces"], i => getX(i) !== newX || getY(i) !== p["y"]),
          }
      } else {
        noop
      }
      (newPawn, callback)
    }
  | King(k) => {
      let backRowY = switch k["color"] {
      | White => 0
      | Black => 7
      }
      let castleHelper = (oldRookX, newRookX, board) => {
        let rook = getPiece(board, (oldRookX, backRowY), None)
        switch rook {
        | Some(r) => b => confirmMove(b, r, (newRookX, backRowY))
        | None => raise(Not_found)
        }
      }
      if !k["hasMoved"] {
        if newX === 2 && newY === backRowY {
          (withPosition(piece, position)->withMoved, castleHelper(0, 3, board))
        } else if newX === 6 && newY === backRowY {
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
    ...List.keep(board["pieces"], p => {
      !(getX(p) === getX(piece) && getY(p) === getY(piece)) &&
      !(getX(p) === getX(newPiece) && getY(p) === getX(newPiece))
    }),
  }
  callback({
    "pieces": pieces,
  })
}
