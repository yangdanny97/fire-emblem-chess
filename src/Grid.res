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
  `${Js.String.fromCharCode(x + 65)}${Js.Int.toString(y + 1)}`
}

let makeSquare = (x, y, color) => {
  piece: None,
  selection: false,
  movement: false,
  covered: false,
  coveredAndSelected: false,
  x: x,
  y: y,
  color: color,
  id: positionToId(x, y),
}

let makeGrid = state => {
  let (cursorX, cursorY) = state.cursorPosition
  let otherColor = oppositeColor(state.turn)
  let coveredPositions = Pieces.getCoveredPositionsForColor(state.board, otherColor)
  let emphasizedCoveredPositions = Pieces.getEmphasizedCoveredPositionsForColor(state.board, otherColor)

  let grid = Belt.Array.makeBy(8, x => Belt.Array.makeBy(8, y => makeSquare(x, y, state.turn)))

  Belt.List.forEach(state.board.pieces, p => {
    grid[getX(p)][getY(p)].piece = Some(p)
  })

  Belt.List.forEach(coveredPositions, ((x, y)) => {
    grid[x][y].covered = true
  })
  Belt.List.forEach(emphasizedCoveredPositions, ((x, y)) => {
    grid[x][y].coveredAndSelected = true
  })

  grid[cursorX][cursorY].selection = true
  switch state.selectedPiece {
  | Some(p) => {
      grid[getX(p)][getY(p)].selection = true
      switch state.legalMoves {
      | Some(l) => Belt.List.forEach(l, ((x, y)) => grid[x][y].movement = true)
      | _ => ()
      }
    }
  | None => ()
  }
  Belt.Array.concatMany(grid)
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
    | Some(_) => if !inCheck && !square.movement && square.covered {
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
