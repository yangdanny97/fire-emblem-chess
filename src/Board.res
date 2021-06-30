open Utils
open Belt

let validStateForMove = (board, piece, position, piece2, position2) => true // TODO

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

let checkUnobstructed = (board, piece, position, canCapture) => false // TODO

let rec confirmMove = (board, piece, (newX, newY)) => {
  let position = (newX, newY)
  let (newPiece, callback) = switch piece {
  | Pawn(p) => {
      let newPawn = if p["y"] - newY === -2 || p["y"] - newY === 2 {
        with2Spaces(p)->withPosition(position)
      } else {
        withPosition(piece, position)->withMoved
      }
      // en passant
      let callback = if p["x"] !== newX && p["y"] !== newY && hasPiece(board, position, None) {
        Some(
          b =>
            {
              "pieces": List.keep(b["pieces"], i => getX(i) !== newX || getY(i) !== p["y"]),
            },
        )
      } else {
        None
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
          (withPosition(piece, position)->withMoved, Some(castleHelper(0, 3, board)))
        } else if newX === 6 && newY === backRowY {
          (withPosition(piece, position)->withMoved, Some(castleHelper(7, 5, board)))
        } else {
          (withPosition(piece, position)->withMoved, None)
        }
      } else {
        (withPosition(piece, position)->withMoved, None)
      }
    }
  | Queen(_)
  | Bishop(_)
  | Knight(_)
  | Rook(_) => (withPosition(piece, position)->withMoved, None)
  }
  let pieces = list{
    newPiece,
    ...List.keep(board["pieces"], p => {
      getX(p) !== getX(piece) || getY(p) !== getY(piece) || (getX(p) !== newX || getY(p) !== newY)
    }),
  }
  let newBoard = {
    "pieces": pieces,
  }
  switch callback {
  | Some(c) => c(newBoard)
  | None => newBoard
  }
}
