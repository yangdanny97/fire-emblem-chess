const Colors = {
    "white": 0,
    "black": 1
}

class Piece {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.hasMoved = false;
    }

    handleMove(position) {
        this.hasMoved = true;
    }
}

class Pawn extends Piece {
    constructor(color, x, y) {
        super(color, x, y);
        this.hasJustMoved2Spaces = false;
    }

    // ie: unoccupied positions that an opposing king cannot move to
    // accounts for obstruction but not discovery
    getThreatenedSquares(board) {
        var positions = [];
        var pos;
        if (this.x > 0) {
            if (this.color === Colors.white) {
                pos = [this.x - 1, this.y + 1];
            } else {
                pos = [this.x - 1, this.y - 1];
            }
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            }
        }

        if (this.x < 7) {
            if (this.color === Colors.white) {
                pos = [this.x + 1, this.y + 1];
            } else {
                pos = [this.x + 1, this.y - 1];
            }
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            }
        }
        return positions;
    }

    // positions that this piece may move to
    getLegalMoves(board) {
        var positions = [];
        var pos;
        // 1 space
        if (this.color === Colors.white) {
            pos = [this.x, this.y + 1];
        } else {
            pos = [this.x, this.y - 1];
        }
        if (board.checkUnobstructed(this, pos, false, false)) {
            positions.push(pos);
        }
        // 2 spaces
        if (positions.length > 0 && !this.hasMoved) {
            if (this.color === Colors.white) {
                pos = [this.x, this.y + 2];
            } else {
                pos = [this.x, this.y - 2];
            }
            if (board.checkUnobstructed(this, pos, false, false)) {
                positions.push(pos);
            }
        }
        // capture
        this.getThreatenedSquares().forEach(p => {
            if (board.hasOppositeColorPiece(this, p[0], p[1])) {
                // regular capture
                positions.push(p);
            } else if (
                board.hasOppositeColorPiece(this, p[0], this.y) &&
                board.getPiece(p[0], this.y) instanceof Pawn
            ) {
                // en passant
                positions.push(p);
            }
        });
        return positions.filter(p => board.validateBoardStateForMove(this, p));
    }

    // expects a legal move
    handleMove(position) {
        var y = position[1];
        if (Math.abs(this.y - y) === 2) {
            this.hasJustMoved2Spaces = true;
        }
        this.hasMoved = true;
    }
}

class King extends Piece {
    getThreatenedSquares(board) {
        var positions = [
            [this.x - 1, this.y],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1]
        ];
        return positions.filter(p => board.checkUnobstructed(this, p));
    }

    getLegalMoves(board) {
        var positions = this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
        // castling
        if (this.color === Colors.white && !this.hasMoved) {
            var leftRook = board.getPiece(0, 0);
            if (leftRook !== null &&
                leftRook instanceof Rook &&
                leftRook.color === Colors.white
            ) {
                if (board.validateBoardStateForMove(this, [1, 0], leftRook, [2, 0])) {
                    positions.push([1, 0]);
                }
            }
            var rightRook = board.getPiece(7, 0);
            if (rightRook !== null &&
                rightRook instanceof Rook &&
                rightRook.color === Colors.white
            ) {
                if (board.validateBoardStateForMove(this, [5, 0], rightRook, [4, 0])) {
                    positions.push([5, 0]);
                }
            }
        } else if (this.color === Colors.black && !this.hasMoved) {
            var leftRook = board.getPiece(0, 7);
            if (leftRook !== null &&
                leftRook instanceof Rook &&
                leftRook.color === Colors.black
            ) {
                if (board.validateBoardStateForMove(this, [2, 7], leftRook, [3, 7])) {
                    positions.push([2, 7]);
                }
            }
            var rightRook = board.getPiece(7, 7);
            if (rightRook !== null &&
                rightRook instanceof Rook &&
                rightRook.color === Colors.black
            ) {
                if (board.validateBoardStateForMove(this, [6, 7], rightRook, [5, 7])) {
                    positions.push([6, 7]);
                }
            }
        }
        return positions;
    }
}

class Queen extends Piece {
    getThreatenedSquares(board) {
        //TODO
        return [];
    }

    getLegalMoves(board) {
        return this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
    }
}

class Bishop extends Piece {
    getThreatenedSquares(board) {
        //TODO
        return [];
    }

    getLegalMoves(board) {
        return this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
    }
}

class Knight extends Piece {
    getThreatenedSquares(board) {
        var positions = [
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y + 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y + 1]
        ];
        return positions.filter(p => board.checkUnobstructed(this, p, true));
    }

    getLegalMoves(board) {
        return this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
    }
}

class Rook extends Piece {
    getThreatenedSquares(board) {
        //TODO
        return [];
    }

    getLegalMoves(board) {
        return this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
    }
}

class Board {
    constructor(pieces) {
        this.pieces = pieces;
    }

    hasPiece(x, y, color = null) {
        return this.getPiece(x, y, color) !== null;
    }

    getPiece(x, y, color = null) {
        var pieces = this.pieces.filter(p => p.x === x && p.y === y);
        if (pieces.length === 0) {
            return null;
        }
        return pieces[0].color === color ? pieces[0] : null;
    }

    hasOppositeColorPiece(piece, x, y) {
        return this.hasPiece(x, y,
            (piece.color === Colors.white) ?
            Colors.black : Colors.white
        );
    }

    // validate obstructions & boundaries, but does not look for check/checkmate
    checkUnobstructed(piece, end, jump = false, canCapture = true) {
        if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
            return false;
        }
        if (jump) {
            if (canCapture) {
                var targetPiece = this.getPiece(end[0], end[1]);
                // cannot capture own piece or king
                if (targetPiece.color === piece.color || targetPiece instanceof King) {
                    return false;
                }
            } else {
                if (this.hasPiece(end[0], end[1])) {
                    return false;
                }
            }
        } else {
            // TODO
        }
        return true;
    }

    // determine if board state is legal if [piece] is in [position]
    // [piece2] and [position2] are used for the rook, when castling
    validateBoardStateForMove(piece, position, piece2 = null, position2 = null) {
        var xi = piece.x,
            yi = piece.y;
        piece.x = position[0];
        piece.y = position[1];
        // any piece at the destination position will be captured
        var pieces = this.pieces.filter(p => {
            if (p.x === piece.x && p.y === piece.y) {
                return false;
            }
            if (p.x === xi && p.y === yi) {
                return false;
            }
            return true;
        });
        pieces.push(piece);
        if (piece2 !== null) {
            var xi2 = piece2.x,
                yi2 = piece2.y;
            piece2.x = position2[0];
            piece2.y = position2[1];
            pieces = pieces.filter(p => {
                if (p.x === piece2.x && p.y === piece2.y) {
                    return false;
                }
                if (p.x === xi2 && p.y === yi2) {
                    return false;
                }
                return true;
            });
            pieces.push(piece);
        }
        var newBoard = new Board(pieces);
        var result = newBoard.validateBoard(piece.color);
        piece.x = xi;
        piece.y = yi;
        if (piece2 !== null) {
            piece2.x = xi2;
            piece2.y = yi2;
        }
        return result;
    }

    confirmMove(piece, position) {
        piece.handleMove(position);
        // any piece at the destination position will be captured
        var pieces = this.pieces.filter(p => {
            if (p.x === piece.x && p.y === piece.y) {
                return false;
            }
            if (p.x === position[0] && p.y === position[1]) {
                return false;
            }
            return true;
        });
        piece.x = position[0];
        piece.y = position[1];
        pieces.push(piece);
        this.pieces = pieces;
    }

    validateBoard(mostRecentTurnColor) {
        // TODO
        return false;
    }
}

class Game {
    constructor() {
        this.color = Colors.white;
        this.selected_piece = null;
        // start cursor at white king
        this.cursor_x = 3;
        this.cursor_y = 0;
    }

    // TODO
}