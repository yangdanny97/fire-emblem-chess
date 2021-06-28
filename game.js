// util function for converting 0,0 -> A1, etc.
function positionToId(x, y) {
    return `${String.fromCharCode(x + 65)}${y + 1}`;
}

class Game {
    constructor() {
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
            new Pawn(Colors.white, 3, 6), // FIXME
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
            // new Queen(Colors.black, 3, 7),
            new King(Colors.black, 4, 7),
        ]);
        this.turn = Colors.white;
        this.selectedPiece = null;
        this.legalMoves = null; // legal moves of currently selected piece
        // start cursor at white king
        this.cursorPosition = [4, 0];
        this.sounds = null;
        this.promote = false;
    }

    init() {
        var body = d3.select("body");
        body.on("keydown", () => {
            var key = d3.event.keyCode;
            switch (key) {
                case 38:
                case 87: // W
                    this.handleUp();
                    break;
                case 37:
                case 65: // A
                    this.handleLeft();
                    break;
                case 40:
                case 83: // S
                    this.handleDown();
                    break;
                case 39:
                case 68: // D
                    this.handleRight();
                    break;
                case 88: // X
                    this.handleSelect();
                    break;
                case 90: // Z
                    this.handleCancel();
                    break;
                case 66: // B
                case 78: // N
                case 82: // R
                case 81: // Q
                    this.handlePromote(key);
                    break;
            }
        });
        this.sounds = {
            "warning": new Howl({
                src: ['./assets/sounds/warning.flac'],
                autoplay: false,
                loop: false,
            }),
            "capture": new Howl({
                src: ['./assets/sounds/capture.flac'],
                autoplay: false,
                loop: false,
            }),
            "move": new Howl({
                src: ['./assets/sounds/move.wav'],
                autoplay: false,
                loop: false,
            }),
            "select": new Howl({
                src: ['./assets/sounds/select.wav'],
                autoplay: false,
                loop: false,
            }),
            "cursor": new Howl({
                src: ['./assets/sounds/cursor.wav'],
                autoplay: false,
                loop: false,
            }),
            "victory": new Howl({
                src: ['./assets/sounds/victory1.flac'],
                autoplay: false,
                loop: false,
            }),
            "white_turn": new Howl({
                src: ['./assets/sounds/white_turn.flac'],
                autoplay: false,
                loop: false,
            }),
            "black_turn": new Howl({
                src: ['./assets/sounds/black_turn.flac'],
                autoplay: false,
                loop: false,
            }),
        }
        this.handleTurnStart();
        this.draw();
    }

    handleTurnStart() {
        this.selectedPiece = null;
        this.legalMoves = null;
        var color = this.turn;
        // make sure player is not checkmated
        var otherColor = oppositeColor(color);
        var ownKing = this.board.pieces.filter(
            p => p.color === color && p instanceof King
        )[0];
        var otherCoveredPositions = this.board.getCoveredPositions(otherColor);
        var ownKingInCheck = otherCoveredPositions
            .find(p => p[0] === ownKing.x && p[1] === ownKing.y) !== undefined;
        var legalMoves = this.board.pieces.filter(
            p => p.color === color
        ).reduce((acc, p) => acc + p.getLegalMoves(this.board).length, 0);
        if (legalMoves === 0) {
            // lock the game for now
            this.winSound();
            this.lock = true;
            if (ownKingInCheck) {
                alert(`${this.color === Colors.black ? "White" : "Black"} has won! Refresh the page to play again.`);
            } else {
                alert("Stalemate! Refresh the page to play again.");
            }
            return;
        }
        this.turnStartSound();
        this.draw();
    }

    winSound() {
        this.sounds.victory.play();
    }

    cursorSound() {
        this.sounds.cursor.play();
    }

    successSound() {
        this.sounds.select.play();
    }

    failureSound() {
        this.sounds.warning.play();
    }

    moveSound() {
        this.sounds.move.play()
    }

    turnStartSound() {
        if (this.turn === Colors.white) {
            this.sounds.white_turn.play();
        } else {
            this.sounds.black_turn.play();
        }
    }

    captureSound() {
        this.sounds.capture.play();
    }

    handleSelect() {
        if (this.lock) return;
        if (this.selectedPiece === null) {
            // no piece selected
            var piece = this.board.getPiece(
                this.cursorPosition[0],
                this.cursorPosition[1],
            );
            if (piece === null) {
                // select nothing
                this.failureSound();
            } else if (piece.color === this.turn) {
                // select friendly piece
                this.selectedPiece = piece;
                this.legalMoves = piece.getLegalMoves(this.board);
                this.successSound();
                this.draw();
            } else {
                // select enemy piece - toggle cover range highlight
                piece.emphasizeCoverRange = !piece.emphasizeCoverRange;
                this.successSound();
                this.draw();
            }
        } else {
            // friendly piece already selected
            var target_piece = this.board.getPiece(
                this.cursorPosition[0],
                this.cursorPosition[1],
            );
            if (target_piece === null || target_piece.color !== this.turn) {
                // select empty space or enemy piece - try to move
                var legalMove = this.legalMoves.filter(m =>
                    m[0] === this.cursorPosition[0] &&
                    m[1] === this.cursorPosition[1]
                );
                if (legalMove.length > 0) {
                    var move = legalMove[0];
                    var pieces = this.board.pieces.length;
                    this.lock = true;
                    // confirm move logic
                    var callback = this.selectedPiece.handleMove(board, position);
                    this.board.confirmMove(this.selectedPiece, move);
                    if (callback !== null) {
                        callback(this);
                    }
                    // end confirm move logic
                    if (pieces > this.board.pieces.length) {
                        this.captureSound();
                    } else {
                        this.moveSound();
                    }
                    this.draw();
                    if (this.selectedPiece instanceof Pawn && this.selectedPiece.isPromotionElegible()) {
                        this.promote = true;
                    } else {
                        this.endTurn();
                    }
                } else {
                    this.failureSound();
                }
            } else {
                // select different friendly piece
                if (
                    this.cursorPosition[0] !== this.selectedPiece.x ||
                    this.cursorPosition[1] !== this.selectedPiece.y
                ) {
                    this.selectedPiece = target_piece;
                    this.legalMoves = target_piece.getLegalMoves(this.board);
                    this.successSound();
                    this.draw();
                }
            }
        }
    }

    endTurn() {
        setTimeout(() => {
            this.lock = false;
            this.turn = oppositeColor(this.turn);
            this.handleTurnStart();
        }, 1000);
    }

    handleCancel() {
        if (this.lock) return;
        if (this.selectedPiece !== null) {
            this.successSound();
            this.selectedPiece = null;
            this.legalMoves = null;
            this.draw();
        } else {
            this.failureSound();
        }
    }

    handleLeft() {
        if (this.lock) return;
        if (this.turn === Colors.white) {
            if (this.cursorPosition[0] > 0) {
                this.cursorPosition[0] -= 1;
                this.handleMoveCursor();
            }
        } else {
            if (this.cursorPosition[0] < 7) {
                this.cursorPosition[0] += 1;
                this.handleMoveCursor();
            }
        }
    }

    handleRight() {
        if (this.lock) return;
        if (this.turn === Colors.white) {
            if (this.cursorPosition[0] < 7) {
                this.cursorPosition[0] += 1;
                this.handleMoveCursor();
            }
        } else {
            if (this.cursorPosition[0] > 0) {
                this.cursorPosition[0] -= 1;
                this.handleMoveCursor();
            }
        }
    }

    handleDown() {
        if (this.lock) return;
        if (this.turn === Colors.white) {
            if (this.cursorPosition[1] > 0) {
                this.cursorPosition[1] -= 1;
                this.handleMoveCursor();
            }
        } else {
            if (this.cursorPosition[1] < 7) {
                this.cursorPosition[1] += 1;
                this.handleMoveCursor();
            }
        }
    }

    handleUp() {
        if (this.lock) return;
        if (this.turn === Colors.white) {
            if (this.cursorPosition[1] < 7) {
                this.cursorPosition[1] += 1;
                this.handleMoveCursor();
            }
        } else {
            if (this.cursorPosition[1] > 0) {
                this.cursorPosition[1] -= 1;
                this.handleMoveCursor();
            }
        }
    }

    handleMoveCursor() {
        this.cursorSound();
        this.draw();
    }

    handlePromote(key) {
        if (!this.promote) return;
        var piece;
        switch (key) {
            case 66: // B
                piece = new Bishop(this.selectedPiece.color, this.selectedPiece.x, this.selectedPiece.y);
                break;
            case 78: // N
                piece = new Knight(this.selectedPiece.color, this.selectedPiece.x, this.selectedPiece.y);
                break;
            case 82: // R
                piece = new Rook(this.selectedPiece.color, this.selectedPiece.x, this.selectedPiece.y);
                break;
            case 81: // Q
                piece = new Queen(this.selectedPiece.color, this.selectedPiece.x, this.selectedPiece.y);
                break;
        }
        this.board.pieces = this.board.pieces.filter(p => p.x != piece.x || p.y != piece.y);
        this.board.pieces.push(piece);
        this.promote = false;
        this.winSound(); // TODO - get unique promote sound
        this.draw();
        this.endTurn();
    }

    draw() {
        var otherColor = oppositeColor(this.turn);
        var coveredPositions = this.board.getCoveredPositions(otherColor);
        var emphasizedCoveredPositions = this.board.getEmphasizedCoveredPositions(otherColor);

        var grid = [];
        for (var i = 0; i < 8; i++) {
            var row = [];
            for (var j = 0; j < 8; j++) {
                row.push(new Grid(i, j, this.turn));
            }
            grid.push(row);
        }

        this.board.pieces.forEach(p => {
            grid[p.x][p.y].piece = p;
        });

        coveredPositions.forEach(p => {
            grid[p[0]][p[1]].covered = true;
        });
        emphasizedCoveredPositions.forEach(p => {
            grid[p[0]][p[1]].covered2 = true;
        });

        grid[this.cursorPosition[0]][this.cursorPosition[1]].selection = true;
        if (this.selectedPiece !== null) {
            grid[this.selectedPiece.x][this.selectedPiece.y].selection = true;
            this.legalMoves.forEach(p => {
                grid[p[0]][p[1]].movement = true;
            });
        }
        var svg = d3.select("#board");
        svg.selectAll('*').remove();
        grid.forEach(row => {
            row.forEach(x => x.draw(svg));
        });
    }
}

class Grid {
    // class for rendering a grid in the chess board
    constructor(x, y, turnColor) {
        this.piece = null;
        this.selection = false;
        this.covered = false;
        this.covered2 = false;
        this.movement = false;
        this.x = x;
        this.y = y;
        this.turnColor = turnColor;
    }

    draw(svg) {
        var gridSize = ScalingFactor * AssetSize;
        // starting position for cursor - top left of box
        var posX;
        var posY;
        if (this.turnColor === Colors.white) {
            // A1 is bottom left
            posX = this.x * gridSize;
            posY = (7 - this.y) * gridSize;
        } else {
            // A1 is top right
            posX = (7 - this.x) * gridSize;
            posY = this.y * gridSize;
        }
        var g = svg.append("g")
            .attr("class", positionToId(this.x, this.y));

        // draw base square
        var inCheck = this.piece !== null && this.piece instanceof King &&
            this.piece.color === this.turnColor && this.covered;
        var color = (this.x % 2 === this.y % 2) ? "maroon" : "antiquewhite";
        g.append("rect")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .attr("transform", `translate(${posX} ${posY})`)
            .attr("fill", inCheck ? "red" : color);

        // draw overlay (movement and cover)
        var overlayColor = null;
        if (this.covered2 && !this.movement && !inCheck) {
            overlayColor = "red";
        } else if (
            this.covered && this.piece !== null &&
            !inCheck && !this.movement
        ) {
            overlayColor = "lightcoral";
        } else if (this.movement && this.covered) {
            overlayColor = "purple";
        } else if (this.movement) {
            overlayColor = "blue";
        }
        if (overlayColor !== null) {
            g.append("rect")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr("transform", `translate(${posX} ${posY})`)
                .attr("fill", overlayColor)
                .style("opacity", 0.8);
        }

        // sprite
        if (this.piece !== null) {
            g.append("image")
                .attr("transform", `translate(${posX} ${posY})`)
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr("id", positionToId(this.x, this.y))
                .attr("xlink:href", `./${this.piece.getAsset()}.gif`);
        }

        // selection box
        if (this.selection) {
            var stroke = ScalingFactor * 3;
            g.append("rect")
                .attr("width", gridSize - stroke)
                .attr("height", gridSize - stroke)
                .attr("transform", `translate(${posX + stroke/2} ${posY + stroke/2})`)
                .attr("fill", "none")
                .attr("stroke-width", `${stroke}px`)
                .attr("class", "selection")
                .attr("stroke", "goldenrod");
        }
    }
}