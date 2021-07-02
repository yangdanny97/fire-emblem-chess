type color =
  | White
  | Black

type position = (int, int)
type piece = {"x": int, "y": int, "color": color, "hasMoved": bool, "emphasizeCoverRange": bool}
type king = {
  "x": int,
  "y": int,
  "color": color,
  "hasMoved": bool,
  "emphasizeCoverRange": bool,
  "inCheck": bool,
  "checkmated": bool,
}
type pawn = {
  "x": int,
  "y": int,
  "color": color,
  "hasMoved": bool,
  "emphasizeCoverRange": bool,
  "hasJustMoved2Spaces": bool,
}
type pieces =
  | Pawn(pawn)
  | King(king)
  | Queen(piece)
  | Bishop(piece)
  | Knight(piece)
  | Rook(piece)
type board = {pieces: list<pieces>}

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

let getAsset = piece => {
  switch piece {
  | Pawn(p) => `assets/${colorName(p["color"])}/pawn`
  | King(k) => `assets/${colorName(k["color"])}/king`
  | Queen(q) => `assets/${colorName(q["color"])}/queen`
  | Bishop(b) => `assets/${colorName(b["color"])}/bishop`
  | Knight(n) => `assets/${colorName(n["color"])}/knight`
  | Rook(r) => `assets/${colorName(r["color"])}/rook`
  }
}

let getColor = piece => {
  switch piece {
  | Pawn(p) => p["color"]
  | King(k) => k["color"]
  | Queen(q) => q["color"]
  | Bishop(b) => b["color"]
  | Knight(n) => n["color"]
  | Rook(r) => r["color"]
  }
}

let getEmphasis = piece => {
  switch piece {
  | Pawn(p) => p["emphasizeCoverRange"]
  | King(k) => k["emphasizeCoverRange"]
  | Queen(q) => q["emphasizeCoverRange"]
  | Bishop(b) => b["emphasizeCoverRange"]
  | Knight(n) => n["emphasizeCoverRange"]
  | Rook(r) => r["emphasizeCoverRange"]
  }
}

let getX = piece => {
  switch piece {
  | Pawn(p) => p["x"]
  | King(k) => k["x"]
  | Queen(q) => q["x"]
  | Bishop(b) => b["x"]
  | Knight(n) => n["x"]
  | Rook(r) => r["x"]
  }
}

let getY = piece => {
  switch piece {
  | Pawn(p) => p["y"]
  | King(k) => k["y"]
  | Queen(q) => q["y"]
  | Bishop(b) => b["y"]
  | Knight(n) => n["y"]
  | Rook(r) => r["y"]
  }
}

let withMoved = piece => {
  let withMovedHelper = (p, y) => {
    if p["hasMoved"] {
      piece
    } else {
      y
    }
  }
  switch piece {
  | Pawn(p) =>
    withMovedHelper(
      p,
      Pawn({
        "x": p["x"],
        "y": p["y"],
        "color": p["color"],
        "hasMoved": true,
        "emphasizeCoverRange": p["emphasizeCoverRange"],
        "hasJustMoved2Spaces": false,
      }),
    )
  | King(k) =>
    withMovedHelper(
      k,
      King({
        "x": k["x"],
        "y": k["y"],
        "color": k["color"],
        "hasMoved": true,
        "emphasizeCoverRange": k["emphasizeCoverRange"],
        "inCheck": k["inCheck"],
        "checkmated": k["checkmated"],
      }),
    )
  | Queen(p) =>
    withMovedHelper(
      p,
      Queen({
        "x": p["x"],
        "y": p["y"],
        "color": p["color"],
        "hasMoved": true,
        "emphasizeCoverRange": p["emphasizeCoverRange"],
      }),
    )
  | Bishop(p) =>
    withMovedHelper(
      p,
      Bishop({
        "x": p["x"],
        "y": p["y"],
        "color": p["color"],
        "hasMoved": true,
        "emphasizeCoverRange": p["emphasizeCoverRange"],
      }),
    )
  | Knight(p) =>
    withMovedHelper(
      p,
      Knight({
        "x": p["x"],
        "y": p["y"],
        "color": p["color"],
        "hasMoved": true,
        "emphasizeCoverRange": p["emphasizeCoverRange"],
      }),
    )
  | Rook(p) =>
    withMovedHelper(
      p,
      Rook({
        "x": p["x"],
        "y": p["y"],
        "color": p["color"],
        "hasMoved": true,
        "emphasizeCoverRange": p["emphasizeCoverRange"],
      }),
    )
  }
}

let with2Spaces = p => {
  Pawn({
    "x": p["x"],
    "y": p["y"],
    "color": p["color"],
    "hasMoved": true,
    "emphasizeCoverRange": p["emphasizeCoverRange"],
    "hasJustMoved2Spaces": true,
  })
}

let disable2Spaces = p => {
  Pawn({
    "x": p["x"],
    "y": p["y"],
    "color": p["color"],
    "hasMoved": p["hasMoved"],
    "emphasizeCoverRange": p["emphasizeCoverRange"],
    "hasJustMoved2Spaces": false,
  })
}

let withPosition = (piece, (x, y)) => {
  switch piece {
  | Pawn(p) =>
    Pawn({
      "x": x,
      "y": y,
      "color": p["color"],
      "hasMoved": p["hasMoved"],
      "emphasizeCoverRange": p["emphasizeCoverRange"],
      "hasJustMoved2Spaces": p["hasJustMoved2Spaces"],
    })
  | King(k) =>
    King({
      "x": x,
      "y": y,
      "color": k["color"],
      "hasMoved": k["hasMoved"],
      "emphasizeCoverRange": k["emphasizeCoverRange"],
      "inCheck": k["inCheck"],
      "checkmated": k["checkmated"],
    })
  | Queen(p) =>
    Queen({
      "x": x,
      "y": y,
      "color": p["color"],
      "hasMoved": p["hasMoved"],
      "emphasizeCoverRange": p["emphasizeCoverRange"],
    })
  | Bishop(p) =>
    Bishop({
      "x": x,
      "y": y,
      "color": p["color"],
      "hasMoved": p["hasMoved"],
      "emphasizeCoverRange": p["emphasizeCoverRange"],
    })
  | Knight(p) =>
    Knight({
      "x": x,
      "y": y,
      "color": p["color"],
      "hasMoved": p["hasMoved"],
      "emphasizeCoverRange": p["emphasizeCoverRange"],
    })
  | Rook(p) =>
    Rook({
      "x": x,
      "y": y,
      "color": p["color"],
      "hasMoved": p["hasMoved"],
      "emphasizeCoverRange": p["emphasizeCoverRange"],
    })
  }
}

let promotionRank = p => {
  switch p["color"] {
  | White => 7
  | Black => 0
  }
}

let backRank = p => {
  switch p["color"] {
  | White => 0
  | Black => 7
  }
}

let pawnOffsetHelper = (p, n) => {
  switch p["color"] {
  | White => n
  | Black => -n
  }
}
