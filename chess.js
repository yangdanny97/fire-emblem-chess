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

    getUnobstructedDiagonalPositions(board) {
        var positions = [];
        var x = this.x, y = this.y;
        while (x < 7 && y < 7) {
            x += 1;
            y += 1;
            var pos = [x, y];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        x = this.x;
        y = this.y;
        while (x < 7 && y > 0) {
            x += 1;
            y -= 1;
            var pos = [x, y];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        x = this.x;
        y = this.y;
        while (x > 0 && y < 7) {
            x -= 1;
            y += 1;
            var pos = [x, y];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        x = this.x;
        y = this.y;
        while (x > 0 && y > 0) {
            x -= 1;
            y -= 1;
            var pos = [x, y];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
    }

    getUnobstructedCardinalPositions(board) {
        var positions = [];
        for (var i = this.x + 1; i <= 7; i++) {
            var pos = [i, this.y];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        for (var i = this.x - 1; i >= 0; i--) {
            var pos = [i, this.y];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        for (var i = this.y + 1; i <= 7; i++) {
            var pos = [this.x, i];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        for (var i = this.y - 1; i >= 0; i--) {
            var pos = [this.x, i];
            if (board.checkUnobstructed(this, pos)) {
                positions.push(pos);
            } else {
                break;
            }
        }
        return positions;
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
        pos = (this.color === Colors.white) ? [this.x, this.y + 1] : [this.x, this.y - 1];
        if (board.checkUnobstructed(this, pos, false)) {
            positions.push(pos);
        }
        // 2 spaces - only check if pawn can move 1 space & has not already moved
        if (positions.length > 0 && !this.hasMoved) {
            pos = (this.color === Colors.white) ? [this.x, this.y + 2] : [this.x, this.y - 2];
            if (board.checkUnobstructed(this, pos, false)) {
                positions.push(pos);
            }
        }
        // capture
        this.getThreatenedSquares().forEach(p => {
            if (board.hasOppositeColorPiece(this, p[0], p[1])) {
                // regular capture
                positions.push(p);
            } else if (
                board.hasOppositeColorPiece(this, p[0], this.y)
            ) {
                // en passant - check horizontally adjacent pieces
                var piece = board.getPiece(p[0], this.y);
                if (piece instanceof Pawn && piece.hasJustMoved2Spaces()) {
                    positions.push(p);
                }
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
        if (!this.hasMoved) {
            var y = (this.color === Colors.white) ? 0 : 7;
            var leftRook = board.getPiece(0, y);
            if (leftRook !== null &&
                leftRook instanceof Rook &&
                leftRook.color === this.color && 
                !leftRook.hasMoved
            ) {
                // queen-side
                if (
                    // no intervening pieces
                    !board.hasPiece(1, y) && 
                    !board.hasPiece(2, y) && 
                    !board.hasPiece(3, y) && 
                    // cannot castle out of check or through check
                    board.validateBoardStateForMove(this, [4, y]) && 
                    board.validateBoardStateForMove(this, [3, y]) && 
                    board.validateBoardStateForMove(this, [2, y]) && 
                    board.validateBoardStateForMove(this, [2, y], leftRook, [3, y])
                ) {
                    positions.push([2, y]);
                }
            }
            var rightRook = board.getPiece(7, y);
            if (rightRook !== null &&
                rightRook instanceof Rook &&
                rightRook.color === this.color &&
                !rightRook.hasMoved
            ) {
                // king-side
                if (
                    !board.hasPiece(5, y) && 
                    !board.hasPiece(6, y) && 
                    board.validateBoardStateForMove(this, [5, y]) && 
                    board.validateBoardStateForMove(this, [6, y]) && 
                    board.validateBoardStateForMove(this, [6, y], rightRook, [5, y])
                ) {
                    positions.push([6, y]);
                }
            }
        }
        return positions;
    }
}

class Queen extends Piece {
    getThreatenedSquares(board) {
        return this.getUnobstructedCardinalPositions(board)
            .concat(this.getUnobstructedDiagonalPositions(board));
    }

    getLegalMoves(board) {
        return this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
    }
}

class Bishop extends Piece {
    getThreatenedSquares(board) {
        return this.getUnobstructedDiagonalPositions(board)
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
        return positions.filter(p => board.checkUnobstructed(this, p));
    }

    getLegalMoves(board) {
        return this.getThreatenedSquares(board)
            .filter(p => board.validateBoardStateForMove(this, p));
    }
}

class Rook extends Piece {
    getThreatenedSquares(board) {
        return this.getUnobstructedCardinalPositions(board);
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
    // does not check entire path, only ending position
    checkUnobstructed(piece, end, canCapture = true) {
        if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
            return false;
        }
        if (canCapture) {
            var targetPiece = this.getPiece(end[0], end[1]);
            // cannot capture own piece or king
            if (
                targetPiece !== null && 
                (targetPiece.color === piece.color || targetPiece instanceof King)
            ) {
                return false;
            }
        } else {
            if (this.hasPiece(end[0], end[1])) {
                return false;
            }
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

    getThreatenedSquares(color) {
        // TODO
        return [];
    }
}

class Game {
    constructor() {
        this.color = Colors.white;
        this.selected_piece = null;
        this.legalMoves = null; // legal moves of currently selected piece
        // start cursor at white king
        this.cursor_x = 4;
        this.cursor_y = 0;
        this.board = new Board([
            // white pawns
            new Pawn(Colors.white, 0, 1),
            new Pawn(Colors.white, 1, 1),
            new Pawn(Colors.white, 2, 1),
            new Pawn(Colors.white, 3, 1),
            new Pawn(Colors.white, 4, 1),
            new Pawn(Colors.white, 5, 1),
            new Pawn(Colors.white, 6, 1),
            new Pawn(Colors.white, 7, 1),
            // white pieces
            new Rook(Colors.white, 0, 0),
            new Rook(Colors.white, 7, 0),
            new Knight(Colors.white, 1, 0),
            new Knight(Colors.white, 6, 0),
            new Bishop(Colors.white, 2, 0),
            new Bishop(Colors.white, 5, 0),
            new Queen(Colors.white, 3, 0),
            new King(Colors.white, 4, 0),
            // black pawns
            new Pawn(Colors.black, 0, 6),
            new Pawn(Colors.black, 1, 6),
            new Pawn(Colors.black, 2, 6),
            new Pawn(Colors.black, 3, 6),
            new Pawn(Colors.black, 4, 6),
            new Pawn(Colors.black, 5, 6),
            new Pawn(Colors.black, 6, 6),
            new Pawn(Colors.black, 7, 6),
            // black pieces
            new Rook(Colors.black, 0, 7),
            new Rook(Colors.black, 7, 7),
            new Knight(Colors.black, 1, 7),
            new Knight(Colors.black, 6, 7),
            new Bishop(Colors.black, 2, 7),
            new Bishop(Colors.black, 5, 7),
            new Queen(Colors.black, 3, 7),
            new King(Colors.black, 4, 7),
        ]);
    }

    // TODO

    handleSelect() {}

    handleCancel() {}

    handleLeft() {}

    handleRight() {}

    handleUp() {}

    handleDown() {}

    handleMove() {}
}