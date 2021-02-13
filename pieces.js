const Colors = {
    "white": "White",
    "black": "Black",
}

const ScalingFactor = 4;
const AssetSize = 23;

function oppositeColor(color) {
    return color === Colors.white ? Colors.black : Colors.white;
}

class Piece {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.hasMoved = false;
        this.emphasizeThreatenRange = false;
    }

    handleMove(board, position) {
        this.hasMoved = true;
        return null;
    }

    threatenedPositionHelper(board, positions, pos) {
        if (
            board.checkUnobstructed(this, pos) ||
            board.hasPiece(pos[0], pos[1], this.color)
        ) {
            positions.push(pos);
        } else {
            return false;
        }
        if (board.hasPiece(pos[0], pos[1])) {
            return false;
        }
        return true;
    }

    getUnobstructedDiagonalPositions(board) {
        var positions = [];
        var x = this.x,
            y = this.y;
        while (x < 7 && y < 7) {
            x += 1;
            y += 1;
            if (!this.threatenedPositionHelper(board, positions, [x, y])) {
                break;
            }
        }
        x = this.x;
        y = this.y;
        while (x < 7 && y > 0) {
            x += 1;
            y -= 1;
            if (!this.threatenedPositionHelper(board, positions, [x, y])) {
                break;
            }
        }
        x = this.x;
        y = this.y;
        while (x > 0 && y < 7) {
            x -= 1;
            y += 1;
            if (!this.threatenedPositionHelper(board, positions, [x, y])) {
                break;
            }
        }
        x = this.x;
        y = this.y;
        while (x > 0 && y > 0) {
            x -= 1;
            y -= 1;
            if (!this.threatenedPositionHelper(board, positions, [x, y])) {
                break;
            }
        }
        return positions;
    }

    getUnobstructedCardinalPositions(board) {
        var positions = [];
        for (var i = this.x + 1; i <= 7; i++) {
            if (!this.threatenedPositionHelper(board, positions, [i, this.y])) {
                break;
            }
        }
        for (var i = this.x - 1; i >= 0; i--) {
            if (!this.threatenedPositionHelper(board, positions, [i, this.y])) {
                break;
            }
        }
        for (var i = this.y + 1; i <= 7; i++) {
            if (!this.threatenedPositionHelper(board, positions, [this.x, i])) {
                break;
            }
        }
        for (var i = this.y - 1; i >= 0; i--) {
            if (!this.threatenedPositionHelper(board, positions, [this.x, i])) {
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

    // ie: positions that an opposing king cannot move to
    // includes defended friendly pieces
    // accounts for obstruction but not discovery
    getThreatenedPositions(board) {
        var positions = [];
        var pos;
        if (this.x > 0) {
            if (this.color === Colors.white) {
                pos = [this.x - 1, this.y + 1];
            } else {
                pos = [this.x - 1, this.y - 1];
            }
            if (
                board.checkUnobstructed(this, pos) ||
                board.hasPiece(pos[0], pos[1], this.color)
            ) {
                positions.push(pos);
            }
        }

        if (this.x < 7) {
            if (this.color === Colors.white) {
                pos = [this.x + 1, this.y + 1];
            } else {
                pos = [this.x + 1, this.y - 1];
            }
            if (
                board.checkUnobstructed(this, pos) ||
                board.hasPiece(pos[0], pos[1], this.color)
            ) {
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
        this.getThreatenedPositions(board).forEach(p => {
            if (board.hasOppositeColorPiece(this, p[0], p[1])) {
                // regular capture
                positions.push(p);
            } else if (
                board.hasOppositeColorPiece(this, p[0], this.y) &&
                board.checkUnobstructed(this, p, false)
            ) {
                // en passant - check horizontally adjacent pieces
                var piece = board.getPiece(p[0], this.y);
                if (piece instanceof Pawn && piece.hasJustMoved2Spaces) {
                    positions.push(p);
                }
            }
        });
        return positions.filter(p => board.validateBoardStateForMove(this, p));
    }

    // expects a legal move
    handleMove(board, position) {
        this.hasJustMoved2Spaces = Math.abs(this.y - position[1]) === 2;
        this.hasMoved = true;
        var callback = null;
        if (
            this.x !== position[0] &&
            this.y !== position[1] &&
            !board.hasPiece(position[0], position[1])
        ) {
            // handle en-passant
            var enemyPos = [position[0], this.y];
            callback = b => {
                b.pieces = b.pieces.filter(
                    p => p.x !== enemyPos[0] || p.y !== enemyPos[1]
                );
            };
        }
        return callback;
    }

    getAsset() {
        return `assets/${this.color}/pawn`;
    }
}

class King extends Piece {
    constructor(color, x, y) {
        super(color, x, y);
        this.inCheck = false;
        this.checkMated = false;
    }

    getThreatenedPositions(board) {
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
        return positions.filter(
            p => board.checkUnobstructed(this, p) ||
            board.hasPiece(p[0], p[1], this.color)
        );
    }

    getLegalMoves(board) {
        var positions = this.getThreatenedPositions(board)
            .filter(p =>
                board.validateBoardStateForMove(this, p) &&
                board.checkUnobstructed(this, p)
            );
        // castling
        if (!this.hasMoved && !this.inCheck) {
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
                    // cannot move through check
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

    handleMove(board, position) {
        var callback = null;
        var y = (this.color === Colors.white) ? 0 : 7;
        // move rook for castling
        if (!this.hasMoved) {
            if (position[0] === 2 && position[1] === y) {
                var rook = board.getPiece(0, y);
                callback = b => b.confirmMove(rook, [3, y]);
            } else if (position[0] === 6 && position[1] === y) {
                var rook = board.getPiece(7, y);
                callback = b => b.confirmMove(rook, [5, y]);
            }
        }
        this.hasMoved = true;
        return callback;
    }

    getAsset() {
        return `assets/${this.color}/king`;
    }
}

class Queen extends Piece {
    getThreatenedPositions(board) {
        return this.getUnobstructedCardinalPositions(board)
            .concat(this.getUnobstructedDiagonalPositions(board));
    }

    getLegalMoves(board) {
        return this.getThreatenedPositions(board)
            .filter(p =>
                board.validateBoardStateForMove(this, p) &&
                board.checkUnobstructed(this, p)
            );
    }

    getAsset() {
        return `assets/${this.color}/queen`;
    }
}

class Bishop extends Piece {
    getThreatenedPositions(board) {
        return this.getUnobstructedDiagonalPositions(board)
    }

    getLegalMoves(board) {
        return this.getThreatenedPositions(board)
            .filter(p =>
                board.validateBoardStateForMove(this, p) &&
                board.checkUnobstructed(this, p)
            );
    }

    getAsset() {
        return `assets/${this.color}/bishop`;
    }
}

class Knight extends Piece {
    getThreatenedPositions(board) {
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
        return positions.filter(p =>
            board.checkUnobstructed(this, p) ||
            board.hasPiece(p[0], p[1], this.color)
        );
    }

    getLegalMoves(board) {
        return this.getThreatenedPositions(board)
            .filter(p =>
                board.validateBoardStateForMove(this, p) &&
                board.checkUnobstructed(this, p)
            );
    }

    getAsset() {
        return `assets/${this.color}/knight`;
    }
}

class Rook extends Piece {
    getThreatenedPositions(board) {
        return this.getUnobstructedCardinalPositions(board);
    }

    getLegalMoves(board) {
        return this.getThreatenedPositions(board)
            .filter(p =>
                board.validateBoardStateForMove(this, p) &&
                board.checkUnobstructed(this, p)
            );
    }

    getAsset() {
        return `assets/${this.color}/rook`;
    }
}