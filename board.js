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
        if (color === null) {
            return pieces[0];
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
    // does not check obstructions along entire path, only the ending position
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
            pieces.push(piece2);
        }
        var newBoard = new Board(pieces);
        // resulting position cannot cause own king to be in check
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

    // validates check
    validateBoard(movedColor) {
        var otherColor = (movedColor === Colors.white) ? Colors.black : Colors.white;
        var ownKing = this.pieces.filter(
            p => p.color === movedColor && p instanceof King
        )[0];
        var otherThreatenedPositions = this.getThreatenedPositions(otherColor);
        
        var ownKingInCheck = otherThreatenedPositions
            .find(p => p[0] === ownKing.x && p[1] === ownKing.y) !== undefined;
        return !ownKingInCheck;
    }

    threatenedPositionsHelper(pieces) {
        return pieces.reduce((acc, p) => acc.concat(p.getThreatenedPositions(this)), [])
        .sort((a, b) => {
            if (a[0] === b[0]) {
                return a[1] - b[1];
            }
            return a[0] - b[0];
        })
        .reduce((acc, pos) => {
            if (acc.length > 0 &&
                pos[0] === acc[acc.length - 1][0] &&
                pos[1] === acc[acc.length - 1][1]
            ) {
                return acc;
            }
            acc.push(pos);
            return acc;
        }, []);
    }

    getThreatenedPositions(color) {
        return this.threatenedPositionsHelper(
            this.pieces.filter(p => p.color === color)
        );
    }

    getEmphasizedThreatenedPositions(color) {
        return this.threatenedPositionsHelper(
            this.pieces.filter(p => p.color === color && p.emphasizeThreatenRange)
        );
    }
}