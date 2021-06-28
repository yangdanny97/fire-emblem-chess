open Utils
open Belt

let validStateForMove = (board, piece, position) => true

let getPiece = (board, position, color) => None

let hasPiece = (board, position, color) => false

let checkUnobstructed = (board, piece, position, canCapture) => false 