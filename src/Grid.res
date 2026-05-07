open Utils

let scalingFactor = 4
let assetSize = 23

let stroke = scalingFactor * 3
let size = scalingFactor * assetSize

type grid = {
  mutable piece: option<Utils.pieces>,
  mutable selection: bool,
  mutable movement: bool,
  mutable covered: bool,
  mutable coveredAndSelected: bool,
  x: int,
  y: int,
  color: Utils.color,
  id: string,
}

let positionToId = (x, y) => {
  `${String.fromCharCode(x + 65)}${Int.toString(y + 1)}`
}

let makeSquare = (x, y, color) => {
  piece: None,
  selection: false,
  movement: false,
  covered: false,
  coveredAndSelected: false,
  x,
  y,
  color,
  id: positionToId(x, y),
}

let makeGrid = state => {
  let (cursorX, cursorY) = state.cursorPosition
  let otherColor = oppositeColor(state.turn)
  let coveredPositions = Pieces.getCoveredPositionsForColor(state.board, otherColor)
  let emphasizedCoveredPositions = Pieces.getEmphasizedCoveredPositionsForColor(
    state.board,
    otherColor,
  )

  let grid = Array.fromInitializer(~length=8, x =>
    Array.fromInitializer(~length=8, y => makeSquare(x, y, state.turn))
  )

  List.forEach(state.board.pieces, p => {
    (grid->Array.getUnsafe(getX(p))->Array.getUnsafe(getY(p))).piece = Some(p)
  })

  List.forEach(coveredPositions, ((x, y)) => {
    (grid->Array.getUnsafe(x)->Array.getUnsafe(y)).covered = true
  })
  List.forEach(emphasizedCoveredPositions, ((x, y)) => {
    (grid->Array.getUnsafe(x)->Array.getUnsafe(y)).coveredAndSelected = true
  })

  (grid->Array.getUnsafe(cursorX)->Array.getUnsafe(cursorY)).selection = true
  switch state.selectedPiece {
  | Some(p) => {
      (grid->Array.getUnsafe(getX(p))->Array.getUnsafe(getY(p))).selection = true
      switch state.legalMoves {
      | Some(l) =>
        List.forEach(l, ((x, y)) => (grid->Array.getUnsafe(x)->Array.getUnsafe(y)).movement = true)
      | _ => ()
      }
    }

  | None => ()
  }
  Array.concatMany([], grid)
}

let getInCheck = square => {
  switch square.piece {
  | Some(King(p)) => p.color === square.color && square.covered
  | _ => false
  }
}

// base color for a square
let getColor = square => {
  if mod(square.x, 2) === mod(square.y, 2) {
    "maroon"
  } else {
    "antiquewhite"
  }
}

let getOverlayColor = square => {
  let inCheck = getInCheck(square)
  let blueOrPurple = if square.movement {
    if square.covered {
      "purple"
    } else {
      "blue"
    }
  } else {
    "none"
  }
  if square.coveredAndSelected && !square.movement && !inCheck {
    "red"
  } else {
    switch square.piece {
    | Some(_) =>
      if !inCheck && !square.movement && square.covered {
        "lightcoral"
      } else {
        blueOrPurple
      }
    | _ => blueOrPurple
    }
  }
}

let getX = square => {
  switch square.color {
  | #White => square.x * size
  | #Black => (7 - square.x) * size
  }
}

let getY = square => {
  switch square.color {
  | #White => (7 - square.y) * size
  | #Black => square.y * size
  }
}
