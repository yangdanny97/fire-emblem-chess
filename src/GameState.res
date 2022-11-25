open Utils
open Belt

@val external alert: string => unit = "alert"
@module("./GameUtils") external drawGrid: array<Grid.grid> => unit = "drawGrid"
@module("./GameUtils") external endTurn: unit => unit = "endTurn"
@module("./Sounds") external winSound: unit => unit = "winSound"
@module("./Sounds") external cursorSound: unit => unit = "cursorSound"
@module("./Sounds") external successSound: unit => unit = "successSound"
@module("./Sounds") external failureSound: unit => unit = "failureSound"
@module("./Sounds") external moveSound: unit => unit = "moveSound"
@module("./Sounds") external captureSound: unit => unit = "captureSound"
@module("./Sounds") external turnStartSound: color => unit = "turnStartSound"

let init = () => {
  board: Board.init(),
  turn: #White,
  selectedPiece: None,
  legalMoves: None,
  cursorPosition: (4, 0),
  promote: false,
  lock: false,
}

let draw = state => {
  let grid = Grid.makeGrid(state)
  drawGrid(grid)
  state
}

let handleTurnStart = state => {
  let state = {
    ...state,
    selectedPiece: None,
    legalMoves: None,
  }
  let color = state.turn
  // make sure player is not checkmated
  let otherColor = oppositeColor(color)
  let ownKing = List.keep(state.board.pieces, p => {
    switch p {
    | King(k) => k.color === color
    | _ => false
    }
  })->List.getExn(0)
  let otherCoveredPositions = Pieces.getCoveredPositionsForColor(state.board, otherColor)
  let ownKingInCheck = List.has(otherCoveredPositions, ownKing, ((x, y), king) =>
    x === getX(king) && y === getY(king)
  )
  let numLegalMoves = Pieces.getNumLegalMovesForColor(state.board, state.turn)
  if numLegalMoves === 0 {
    // lock the game for now
    winSound()
    if ownKingInCheck {
      let winner = oppositeColor(state.turn)
      alert(`${winner :> string} has won! Refresh the page to play again.`)
    } else {
      alert("Stalemate! Refresh the page to play again.")
    }
    {...state, lock: true}
  } else {
    turnStartSound(state.turn)
    draw(state)
  }
}

let handleMoveCursor = state => {
  cursorSound()
  draw(state)
}

let handleCancel = state => {
  if state.lock {
    state
  } else {
    switch state.selectedPiece {
    | Some(_) => {
        successSound()
        let state' = {
          ...state,
          selectedPiece: None,
          legalMoves: None,
        }
        draw(state')
      }
    | None => {
        failureSound()
        state
      }
    }
  }
}

let handleLeft = state => {
  let (x, y) = state.cursorPosition
  if state.lock {
    state
  } else {
    switch state.turn {
    | #White if x > 0 => handleMoveCursor({...state, cursorPosition: (x - 1, y)})
    | #Black if x < 7 => handleMoveCursor({...state, cursorPosition: (x + 1, y)})
    | _ => state
    }
  }
}
let handleRight = state => {
  let (x, y) = state.cursorPosition
  if state.lock {
    state
  } else {
    switch state.turn {
    | #White if x < 7 => handleMoveCursor({...state, cursorPosition: (x + 1, y)})
    | #Black if x > 0 => handleMoveCursor({...state, cursorPosition: (x - 1, y)})
    | _ => state
    }
  }
}

let handleDown = state => {
  let (x, y) = state.cursorPosition
  if state.lock {
    state
  } else {
    switch state.turn {
    | #White if y > 0 => handleMoveCursor({...state, cursorPosition: (x, y - 1)})
    | #Black if y < 7 => handleMoveCursor({...state, cursorPosition: (x, y + 1)})
    | _ => state
    }
  }
}

let handleUp = state => {
  let (x, y) = state.cursorPosition
  if state.lock {
    state
  } else {
    switch state.turn {
    | #White if y < 7 => handleMoveCursor({...state, cursorPosition: (x, y + 1)})
    | #Black if y > 0 => handleMoveCursor({...state, cursorPosition: (x, y - 1)})
    | _ => state
    }
  }
}

let handlePromote = (state, key) => {
  if !state.promote {
    failureSound()
    state
  } else {
    let maybePiece = switch (state.selectedPiece, key) {
    | (Some(p), 66) => Some(bishop(getColor(p), getX(p), getY(p)))

    | (Some(p), 78) => Some(knight(getColor(p), getX(p), getY(p)))

    | (Some(p), 82) => Some(rook(getColor(p), getX(p), getY(p)))

    | (Some(p), 81) => Some(queen(getColor(p), getX(p), getY(p)))
    | _ => None
    }
    switch maybePiece {
    | Some(piece) => {
        let pieces = List.keep(state.board.pieces, p =>
          getX(p) != getX(piece) || getY(p) != getY(piece)
        )
        let board = {
          pieces: list{piece, ...pieces},
        }
        let state' = {...state, board: board, promote: false}
        winSound() // TODO - get unique promote sound
        endTurn()
        draw(state')
      }
    | None => {
        failureSound()
        state
      }
    }
  }
}

let handleSelect = state => {
  if state.lock {
    state
  } else {
    let piece = Board.getPiece(state.board, state.cursorPosition, None)
    let (x, y) = state.cursorPosition
    let moveHelper = state => {
      // try to move
      let selectedPiece = Option.getExn(state.selectedPiece)
      let promote = ((_, y)) =>
        switch selectedPiece {
        | Pawn(p) if promotionRank(p) === y => true
        | _ => false
        }
      let legalMove = Option.flatMap(state.legalMoves, moves =>
        List.keep(moves, ((mx, my)) => mx === x && my === y)->List.get(0)
      )
      switch legalMove {
      | Some(move) => {
          let state' = {
            ...state,
            selectedPiece: Some(withPosition(selectedPiece, move)),
            lock: true,
            promote: promote(move),
            board: Board.confirmMove(state.board, selectedPiece, move, true),
          }
          if List.size(state'.board.pieces) < List.size(state.board.pieces) {
            captureSound()
          } else {
            moveSound()
          }
          if state'.promote {
            draw(state')
          } else {
            endTurn()
            draw(state')
          }
        }
      | None => {
          failureSound()
          state
        }
      }
    }
    switch state.selectedPiece {
    | Some(selectedPiece) =>
      // piece already selected
      switch piece {
      | None =>
        // select empty
        moveHelper(state)
      | Some(p) if getColor(p) !== state.turn =>
        // select enemy piece
        moveHelper(state)
      | Some(p) =>
        // select different friendly piece
        if x !== getX(selectedPiece) || y !== getY(selectedPiece) {
          let state' = {
            ...state,
            selectedPiece: piece,
            legalMoves: Some(Pieces.getLegalMoves(p, state.board)),
          }
          successSound()
          draw(state')
        } else {
          state
        }
      }
    | None =>
      // no piece selected
      switch piece {
      | None => {
          // select empty
          failureSound()
          state
        }
      | Some(p) if getColor(p) === state.turn => {
          // select friendly piece
          let state' = {
            ...state,
            selectedPiece: Some(p),
            legalMoves: Some(Pieces.getLegalMoves(p, state.board)),
          }
          successSound()
          draw(state')
        }
      | Some(p) => {
          // select enemy piece - toggle highlight
          toggleEmphasis(p)
          successSound()
          draw(state)
        }
      }
    }
  }
}
