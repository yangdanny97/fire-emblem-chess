type color = [#White | #Black]

type position = (int, int)
type piece = {x: int, y: int, color: color, hasMoved: bool, mutable emphasizeCoverRange: bool}
type king = {
  x: int,
  y: int,
  color: color,
  hasMoved: bool,
  mutable emphasizeCoverRange: bool,
  inCheck: bool,
}
type pawn = {
  x: int,
  y: int,
  color: color,
  hasMoved: bool,
  mutable emphasizeCoverRange: bool,
  hasJustMoved2Spaces: bool,
}
type pieces =
  | Pawn(pawn)
  | King(king)
  | Queen(piece)
  | Bishop(piece)
  | Knight(piece)
  | Rook(piece)
type board = {pieces: list<pieces>}
type state = {
  board: board,
  turn: color,
  selectedPiece: option<pieces>,
  legalMoves: option<list<position>>,
  cursorPosition: position,
  promote: bool,
  lock: bool,
}

let oppositeColor = (color: color): color => {
  switch color {
  | #White => #Black
  | #Black => #White
  }
}

let getAsset = piece => {
  switch piece {
  | Pawn(p) => `assets/${(p.color :> string)}/pawn`
  | King(k) => `assets/${(k.color :> string)}/king`
  | Queen(q) => `assets/${(q.color :> string)}/queen`
  | Bishop(b) => `assets/${(b.color :> string)}/bishop`
  | Knight(n) => `assets/${(n.color :> string)}/knight`
  | Rook(r) => `assets/${(r.color :> string)}/rook`
  }
}

let getColor = piece => {
  switch piece {
  | Pawn(p) => p.color
  | King(k) => k.color
  | Queen(x)
  | Bishop(x)
  | Knight(x)
  | Rook(x) =>
    x.color
  }
}

let getEmphasis = piece => {
  switch piece {
  | Pawn(p) => p.emphasizeCoverRange
  | King(k) => k.emphasizeCoverRange
  | Queen(x)
  | Bishop(x)
  | Knight(x)
  | Rook(x) =>
    x.emphasizeCoverRange
  }
}

let toggleEmphasis = piece => {
  switch piece {
  | Pawn(p) => p.emphasizeCoverRange = !p.emphasizeCoverRange
  | King(k) => k.emphasizeCoverRange = !k.emphasizeCoverRange
  | Queen(x)
  | Bishop(x)
  | Knight(x)
  | Rook(x) =>
    x.emphasizeCoverRange = !x.emphasizeCoverRange
  }
}

let getX = piece => {
  switch piece {
  | Pawn(p) => p.x
  | King(k) => k.x
  | Queen(x)
  | Bishop(x)
  | Knight(x)
  | Rook(x) =>
    x.x
  }
}

let getY = piece => {
  switch piece {
  | Pawn(p) => p.y
  | King(k) => k.y
  | Queen(x)
  | Bishop(x)
  | Knight(x)
  | Rook(x) =>
    x.y
  }
}

let withMoved = piece => {
  switch piece {
  | Pawn(p) => Pawn({...p, hasMoved: true, hasJustMoved2Spaces: false})
  | King(k) => King({...k, hasMoved: true})
  | Queen(p) => Queen({...p, hasMoved: true})
  | Bishop(p) => Bishop({...p, hasMoved: true})
  | Knight(p) => Knight({...p, hasMoved: true})
  | Rook(p) => Rook({...p, hasMoved: true})
  }
}

let with2Spaces = p => {
  Pawn({...p, hasMoved: true, hasJustMoved2Spaces: true})
}

let disable2Spaces = p => {
  Pawn({...p, hasJustMoved2Spaces: false})
}

let withPosition = (piece, (x, y)) => {
  switch piece {
  | Pawn(p) => Pawn({...p, x, y})
  | King(k) => King({...k, x, y})
  | Queen(p) => Queen({...p, x, y})
  | Bishop(p) => Bishop({...p, x, y})
  | Knight(p) => Knight({...p, x, y})
  | Rook(p) => Rook({...p, x, y})
  }
}

let promotionRank = (p: pawn) => {
  switch p.color {
  | #White => 7
  | #Black => 0
  }
}

let backRank = (p: king) => {
  switch p.color {
  | #White => 0
  | #Black => 7
  }
}

let pawnOffsetHelper = (p: pawn, n) => {
  switch p.color {
  | #White => n
  | #Black => -n
  }
}

let pawn = (color, x, y) => {
  Pawn({
    x,
    y,
    color,
    hasMoved: false,
    emphasizeCoverRange: false,
    hasJustMoved2Spaces: false,
  })
}

let king = (color, x, y) => {
  King({
    x,
    y,
    color,
    hasMoved: false,
    emphasizeCoverRange: false,
    inCheck: false,
  })
}

let queen = (color, x, y) => {
  Queen({
    x,
    y,
    color,
    hasMoved: false,
    emphasizeCoverRange: false,
  })
}

let rook = (color, x, y) => {
  Rook({
    x,
    y,
    color,
    hasMoved: false,
    emphasizeCoverRange: false,
  })
}

let bishop = (color, x, y) => {
  Bishop({
    x,
    y,
    color,
    hasMoved: false,
    emphasizeCoverRange: false,
  })
}

let knight = (color, x, y) => {
  Knight({
    x,
    y,
    color,
    hasMoved: false,
    emphasizeCoverRange: false,
  })
}
