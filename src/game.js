import * as Utils from './Utils.bs.js';
import * as Board from './Board.bs.js';
import * as Pieces from './Pieces.bs.js';
import * as Grid from './Grid.bs.js';

var Belt_List = require("rescript/lib/js/belt_List.js");

var svg = d3.select("#board");

// var posX;
// var posY;
// if (d.turnColor === Colors.white) {
//     // A1 is bottom left
//     posX = d.x * gridSize;
//     posY = (7 - d.y) * gridSize;
// } else {
//     // A1 is top right
//     posX = (7 - d.x) * gridSize;
//     posY = d.y * gridSize;
// }

class Colors {
    static white = 0;
    static black = 1;
}

class Tags {
    static pawn = 0;
    static king = 1;
    static queen = 2;
    static bishop = 3;
    static knight = 4;
    static rook = 5;
}

// adapt to rescript
class Constructors {
    static board(pieces) {
        return {
            pieces: Belt_List.fromArray(pieces),
        }
    }

    static pawn(color, x, y) {
        return {
            TAG: /* Pawn */ 0,
            _0: {
                x: x,
                y: y,
                color: color,
                hasMoved: false,
                emphasizeCoverRange: false,
                hasJustMoved2Spaces: false
            }
        };
    }

    static king(color, x, y) {
        return {
            TAG: /* King */ 1,
            _0: {
                x: x,
                y: y,
                color: color,
                hasMoved: false,
                emphasizeCoverRange: false,
                inCheck: false,
                checkmated: false
            }
        };
    }

    static queen(color, x, y) {
        return {
            TAG: /* Queen */ 2,
            _0: {
                x: x,
                y: y,
                color: color,
                hasMoved: false,
                emphasizeCoverRange: false
            }
        };
    }

    static bishop(color, x, y) {
        return {
            TAG: /* Bishop */ 3,
            _0: {
                x: x,
                y: y,
                color: color,
                hasMoved: false,
                emphasizeCoverRange: false
            }
        };
    }

    static knight(color, x, y) {
        return {
            TAG: /* Knight */ 4,
            _0: {
                x: x,
                y: y,
                color: color,
                hasMoved: false,
                emphasizeCoverRange: false
            }
        }
    }

    static rook(color, x, y) {
        return {
            TAG: /* Rook */ 5,
            _0: {
                x: x,
                y: y,
                color: color,
                hasMoved: false,
                emphasizeCoverRange: false
            }
        };
    }
}

class Game {
    constructor() {
        this.board = Constructors.board([
            // white pawns
            Constructors.pawn(Colors.white, 0, 1),
            Constructors.pawn(Colors.white, 1, 1),
            Constructors.pawn(Colors.white, 2, 1),
            Constructors.pawn(Colors.white, 3, 1),
            Constructors.pawn(Colors.white, 4, 1),
            Constructors.pawn(Colors.white, 5, 1),
            Constructors.pawn(Colors.white, 6, 1),
            Constructors.pawn(Colors.white, 7, 1),
            // white pieces
            Constructors.rook(Colors.white, 0, 0),
            Constructors.rook(Colors.white, 7, 0),
            Constructors.knight(Colors.white, 1, 0),
            Constructors.knight(Colors.white, 6, 0),
            Constructors.bishop(Colors.white, 2, 0),
            Constructors.bishop(Colors.white, 5, 0),
            Constructors.queen(Colors.white, 3, 0),
            Constructors.king(Colors.white, 4, 0),
            // black pawns
            Constructors.pawn(Colors.black, 0, 6),
            Constructors.pawn(Colors.black, 1, 6),
            Constructors.pawn(Colors.black, 2, 6),
            Constructors.pawn(Colors.black, 3, 6),
            Constructors.pawn(Colors.black, 4, 6),
            Constructors.pawn(Colors.black, 5, 6),
            Constructors.pawn(Colors.black, 6, 6),
            Constructors.pawn(Colors.black, 7, 6),
            // black pieces
            Constructors.rook(Colors.black, 0, 7),
            Constructors.rook(Colors.black, 7, 7),
            Constructors.knight(Colors.black, 1, 7),
            Constructors.knight(Colors.black, 6, 7),
            Constructors.bishop(Colors.black, 2, 7),
            Constructors.bishop(Colors.black, 5, 7),
            Constructors.queen(Colors.black, 3, 7),
            Constructors.king(Colors.black, 4, 7),
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
        this.makeGridAndDraw();
    }

    handleTurnStart() {
        this.selectedPiece = null;
        this.legalMoves = null;
        var color = this.turn;
        // make sure player is not checkmated
        var otherColor = Utils.oppositeColor(color);
        var ownKing = Belt_List.toArray(this.board.pieces).filter(
            p => Utils.getColor(p) === color && p.TAG === 1 // king
        )[0];
        var otherCoveredPositions = Belt_List.toArray(Pieces.getCoveredPositionsForColor(this.board, otherColor));
        var ownKingInCheck = otherCoveredPositions
            .find(p => p[0] === Utils.getX(ownKing) && p[1] === Utils.getY(ownKing)) !== undefined;
        var legalMoves = Belt_List.toArray(this.board.pieces).filter(
            p => Utils.getColor(p) === color
        ).reduce((acc, p) => acc + Belt_List.size(Pieces.getLegalMoves(p, this.board)), 0);
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
        this.makeGridAndDraw();
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
        if (this.selectedPiece === undefined || this.selectedPiece === null) {
            // no piece selected
            var piece = Board.getPiece(
                this.board,
                this.cursorPosition,
                undefined
            );
            if (piece === undefined) {
                // select nothing
                this.failureSound();
            } else if (Utils.getColor(piece) === this.turn) {
                // select friendly piece
                this.selectedPiece = piece;
                this.legalMoves = Belt_List.toArray(Pieces.getLegalMoves(piece, this.board));
                this.successSound();
                this.makeGridAndDraw();
            } else {
                // select enemy piece - toggle cover range highlight
                piece._0.emphasizeCoverRange = !Utils.getEmphasis(piece);
                this.successSound();
                this.makeGridAndDraw();
            }
        } else {
            // friendly piece already selected
            var target_piece = Board.getPiece(
                this.board,
                this.cursorPosition,
                undefined
            );
            if (target_piece === undefined || Utils.getColor(target_piece) !== this.turn) {
                // select empty space or enemy piece - try to move
                var legalMove = this.legalMoves.filter(m =>
                    m[0] === this.cursorPosition[0] &&
                    m[1] === this.cursorPosition[1]
                );
                if (legalMove.length > 0) {
                    var move = legalMove[0];
                    var pieces = Belt_List.size(this.board.pieces);
                    this.lock = true;
                    this.board = Board.confirmMove(this.board, this.selectedPiece, move, true);
                    // update selected piece position for movement calculations
                    // this object is no longer on the board
                    this.selectedPiece._0.x = move[0];
                    this.selectedPiece._0.y = move[1];
                    // end confirm move logic
                    if (pieces > Belt_List.size(this.board.pieces)) {
                        this.captureSound();
                    } else {
                        this.moveSound();
                    }
                    this.draw();
                    if (this.selectedPiece.TAG === Tags.pawn && move[1] === Utils.promotionRank(this.selectedPiece._0)) {
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
                    this.cursorPosition[0] !== Utils.getX(this.selectedPiece) ||
                    this.cursorPosition[1] !== Utils.getY(this.selectedPiece)
                ) {
                    this.selectedPiece = target_piece;
                    this.legalMoves = Belt_List.toArray(Pieces.getLegalMoves(target_piece, this.board));
                    this.successSound();
                    this.makeGridAndDraw();
                }
            }
        }
    }

    endTurn() {
        setTimeout(() => {
            this.lock = false;
            this.turn = Utils.oppositeColor(this.turn);
            this.handleTurnStart();
        }, 1000);
    }

    handleCancel() {
        if (this.lock) return;
        if (this.selectedPiece !== null) {
            this.successSound();
            this.selectedPiece = null;
            this.legalMoves = null;
            this.makeGridAndDraw();
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
        this.makeGridAndDraw();
    }

    handlePromote(key) {
        if (!this.promote) {
            this.failureSound();
            return;
        }
        var piece = null;
        switch (key) {
            case 66: // B
                piece = Constructors.bishop(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
            case 78: // N
                piece = Constructors.knight(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
            case 82: // R
                piece = Constructors.rook(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
            case 81: // Q
                piece = Constructors.queen(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
        }
        if (piece === null) {
            this.failureSound();
            return;
        }
        var pieces = Belt_List.keep(this.board.pieces, p => Utils.getX(p) != Utils.getX(piece) || Utils.getY(p) != Utils.getY(piece));
        this.board.pieces = {
            hd: piece,
            tl: pieces,
        };
        this.promote = false;
        this.winSound(); // TODO - get unique promote sound
        this.makeGridAndDraw();
        this.endTurn();
    }

    draw() {
        var grid = Grid.makeGrid(this.board); // TODO
        this.drawGrid(grid);
    }

    makeGridAndDraw() {
        var otherColor = Utils.oppositeColor(this.turn);
        var coveredPositions = Belt_List.toArray(Pieces.getCoveredPositionsForColor(this.board, otherColor));
        var emphasizedCoveredPositions = Belt_List.toArray(Pieces.getEmphasizedCoveredPositionsForColor(this.board, otherColor));

        var grid = [];
        for (var i = 0; i < 8; i++) {
            var row = [];
            for (var j = 0; j < 8; j++) {
                row.push(new Grid(i, j, this.turn));
            }
            grid.push(row);
        }

        Belt_List.toArray(this.board.pieces).forEach(p => {
            grid[Utils.getX(p)][Utils.getY(p)].piece = p;
        });

        coveredPositions.forEach(p => {
            grid[p[0]][p[1]].covered = true;
        });
        emphasizedCoveredPositions.forEach(p => {
            grid[p[0]][p[1]].coveredAndSelected = true;
        });

        grid[this.cursorPosition[0]][this.cursorPosition[1]].selection = true;
        if (this.selectedPiece !== null) {
            grid[this.selectedPiece.x][this.selectedPiece.y].selection = true;
            this.legalMoves.forEach(p => {
                grid[p[0]][p[1]].movement = true;
            });
            if (this.selectedPiece !== null && this.selectedPiece !== undefined) {
                grid[Utils.getX(this.selectedPiece)][Utils.getY(this.selectedPiece)].selection = true;
                if (this.legalMoves !== null) {
                    this.legalMoves.forEach(p => {
                        grid[p[0]][p[1]].movement = true;
                    });
                }
            }
            this.drawGrid(grid.flat());
        }
    }

    drawGrid(data) {
        var grid = svg.selectAll(".grid")
            .data(data, g => g.id)
            .join("g");

        // draw base square
        var inCheck = this.piece !== null && this.piece instanceof King &&
            this.piece.color === this.turnColor && this.covered;
        var color = (this.x % 2 === this.y % 2) ? "maroon" : "antiquewhite";
        g.append("rect")
        var inCheck = d => d.piece !== undefined && d.piece !== null && d.piece.TAG === Tags.king &&
            Utils.getColor(d.piece) === d.turnColor && d.covered;
        var color = d => (d.x % 2 === d.y % 2) ? "maroon" : "antiquewhite";
        grid.append("rect")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .attr("transform", `translate(${posX} ${posY})`)
            .attr("fill", d => inCheck(d) ? "red" : color(d));

        // draw overlay (movement and cover)
        var overlayColor = null;
        if (d.coveredAndSelected && !d.movement && !inCheck) {
            overlayColor = "red";
        } else if (
            d.covered && d.piece !== null &&
            !inCheck && !d.movement
        ) {
            overlayColor = "lightcoral";
        } else if (d.movement && d.covered) {
            overlayColor = "purple";
        } else if (d.movement) {
            overlayColor = "blue";
        }
        if (overlayColor !== null) {
            grid.append("rect")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr("transform", `translate(${posX} ${posY})`)
                .attr("fill", overlayColor)
                .style("opacity", 0.8);
        }

        // sprite
        if (d.piece !== undefined && d.piece !== null) {
            grid.append("image")
                .attr("transform", `translate(${posX} ${posY})`)
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr("id", positionToId(d.x, d.y))
                .attr("xlink:href", `./${Utils.getAsset(d.piece)}.gif`);
            if (this.piece !== null) {
                g.append("image")
                    .attr("transform", `translate(${posX} ${posY})`)
                    .attr("width", gridSize)
                    .attr("height", gridSize)
                    .attr("id", positionToId(this.x, this.y))
                    .attr("xlink:href", `./${this.piece.getAsset()}.gif`);
            }

            // selection box
            if (d.selection) {
                var stroke = ScalingFactor * 3;
                grid.append("rect")
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
}



window.onload = () => {
    var game = new Game();
    game.init();
}