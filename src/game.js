import * as Utils from './Utils.bs.js';
import * as Board from './Board.bs.js';
import * as Pieces from './Pieces.bs.js';

var Belt_List = require("rescript/lib/js/belt_List.js");

// util function for converting 0,0 -> A1, etc.
function positionToId(x, y) {
    return `${String.fromCharCode(x + 65)}${y + 1}`;
}

const ScalingFactor = 4;
const AssetSize = 23;

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
class Adapters {
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
        this.board = Adapters.board([
            // white pawns
            Adapters.pawn(Colors.white, 0, 1),
            Adapters.pawn(Colors.white, 1, 1),
            Adapters.pawn(Colors.white, 2, 1),
            Adapters.pawn(Colors.white, 3, 1),
            Adapters.pawn(Colors.white, 4, 1),
            Adapters.pawn(Colors.white, 5, 1),
            Adapters.pawn(Colors.white, 6, 1),
            Adapters.pawn(Colors.white, 7, 1),
            // white pieces
            Adapters.rook(Colors.white, 0, 0),
            Adapters.rook(Colors.white, 7, 0),
            Adapters.knight(Colors.white, 1, 0),
            Adapters.knight(Colors.white, 6, 0),
            Adapters.bishop(Colors.white, 2, 0),
            Adapters.bishop(Colors.white, 5, 0),
            Adapters.queen(Colors.white, 3, 0),
            Adapters.king(Colors.white, 4, 0),
            // black pawns
            Adapters.pawn(Colors.black, 0, 6),
            Adapters.pawn(Colors.black, 1, 6),
            Adapters.pawn(Colors.black, 2, 6),
            Adapters.pawn(Colors.black, 3, 6),
            Adapters.pawn(Colors.black, 4, 6),
            Adapters.pawn(Colors.black, 5, 6),
            Adapters.pawn(Colors.black, 6, 6),
            Adapters.pawn(Colors.black, 7, 6),
            // black pieces
            Adapters.rook(Colors.black, 0, 7),
            Adapters.rook(Colors.black, 7, 7),
            Adapters.knight(Colors.black, 1, 7),
            Adapters.knight(Colors.black, 6, 7),
            Adapters.bishop(Colors.black, 2, 7),
            Adapters.bishop(Colors.black, 5, 7),
            Adapters.queen(Colors.black, 3, 7),
            Adapters.king(Colors.black, 4, 7),
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
        var otherColor = Utils.oppositeColor(color);
        var ownKing = Belt_List.toArray(this.board.pieces).filter(
            p => p._0.color === color && p.TAG === 1 // king
        )[0];
        var otherCoveredPositions = Belt_List.toArray(Pieces.getCoveredPositionsForColor(this.board, otherColor));
        var ownKingInCheck = otherCoveredPositions
            .find(p => p[0] === ownKing._0.x && p[1] === ownKing._0.y) !== undefined;
        var legalMoves = Belt_List.toArray(this.board.pieces).filter(
            p => p._0.color === color
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
            } else if (piece._0.color === this.turn) {
                // select friendly piece
                this.selectedPiece = piece;
                this.legalMoves = Belt_List.toArray(Pieces.getLegalMoves(piece, this.board));
                console.log(this.legalMoves);
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
            var target_piece = Board.getPiece(
                this.board,
                this.cursorPosition,
                undefined
            );
            if (target_piece === undefined || target_piece._0.color !== this.turn) {
                // select empty space or enemy piece - try to move
                var legalMove = this.legalMoves.filter(m =>
                    m[0] === this.cursorPosition[0] &&
                    m[1] === this.cursorPosition[1]
                );
                if (legalMove.length > 0) {
                    var move = legalMove[0];
                    var pieces = Belt_List.size(this.board.pieces);
                    this.lock = true;
                    this.board = Board.confirmMove(this.board, this.selectedPiece, move);
                    // end confirm move logic
                    if (pieces > Belt_List.size(this.board.pieces)) {
                        this.captureSound();
                    } else {
                        this.moveSound();
                    }
                    this.draw();
                    if (this.selectedPiece.TAG === Tags.pawn && Utils.isPromotionEligible(this.selectedPiece._0)) {
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
                    this.cursorPosition[0] !== this.selectedPiece._0.x ||
                    this.cursorPosition[1] !== this.selectedPiece._0.y
                ) {
                    this.selectedPiece = target_piece;
                    this.legalMoves = Belt_List.toArray(Pieces.getLegalMoves(target_piece, this.board));
                    this.successSound();
                    this.draw();
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
        var piece = null;
        switch (key) {
            case 66: // B
                piece = Adapters.bishop(this.selectedPiece.color, this.selectedPiece._0.x, this.selectedPiece._0.y);
                break;
            case 78: // N
                piece = Adapters.knight(this.selectedPiece.color, this.selectedPiece._0.x, this.selectedPiece._0.y);
                break;
            case 82: // R
                piece = Adapters.rook(this.selectedPiece.color, this.selectedPiece._0.x, this.selectedPiece._0.y);
                break;
            case 81: // Q
                piece = Adapters.queen(this.selectedPiece.color, this.selectedPiece._0.x, this.selectedPiece._0.y);
                break;
        }
        if (piece === null) {
            this.failureSound();
            return;
        }
        var pieces = Belt_List.keep(this.board.pieces, p => p._0.x != piece._0.x || p._0.y != piece._0.y);
        this.board.pieces = {
            hd: piece,
            tl: pieces,
        };
        this.promote = false;
        this.winSound(); // TODO - get unique promote sound
        this.draw();
        this.endTurn();
    }

    draw() {
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
            grid[p._0.x][p._0.y].piece = p;
        });

        coveredPositions.forEach(p => {
            grid[p[0]][p[1]].covered = true;
        });
        emphasizedCoveredPositions.forEach(p => {
            grid[p[0]][p[1]].covered2 = true;
        });

        grid[this.cursorPosition[0]][this.cursorPosition[1]].selection = true;
        if (this.selectedPiece !== null && this.selectedPiece !== undefined) {
            grid[this.selectedPiece._0.x][this.selectedPiece._0.y].selection = true;
                if (this.legalMoves !== null) {
                this.legalMoves.forEach(p => {
                    grid[p[0]][p[1]].movement = true;
                });
            }
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
        var inCheck = this.piece !== undefined && this.piece !== null && this.piece.TAG === Tags.king &&
            this.piece._0.color === this.turnColor && this.covered;
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
        if (this.piece !== undefined && this.piece !== null) {
            g.append("image")
                .attr("transform", `translate(${posX} ${posY})`)
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr("id", positionToId(this.x, this.y))
                .attr("xlink:href", `./${Utils.getAsset(this.piece)}.gif`);
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

window.onload = () => {
    var game = new Game();
    game.init();
}