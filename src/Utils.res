type color =
  | White
  | Black

type position = (int, int)
type piece = {
  x: int,
  y: int,
  color: color,
  hasMoved: bool,
  emphasizeCoverRange: bool,
}
type board = {pieces: list<piece>}

let scalingFactor = 4
let assetSize = 23

let oppositeColor = color => {
  switch color {
  | White => Black
  | Black => White
  }
}

let colorName = color => {
  switch color {
  | White => "White"
  | Black => "Black"
  }
}