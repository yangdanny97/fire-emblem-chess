import * as Utils from './Utils.bs.js';
import * as Board from './Board.bs.js';
import * as Pieces from './Pieces.bs.js';
import * as Grid from './Grid.bs.js';
import * as Sounds from './Sounds.js';

var Belt_List = require("rescript/lib/js/belt_List.js");

var svg;

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

class Game {
    constructor() {
        this.board = Board.init();
        this.turn = Colors.white;
        this.selectedPiece = undefined;
        this.legalMoves = undefined; // legal moves of currently selected piece
        // start cursor at white king
        this.cursorPosition = [4, 0];
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
        this.handleTurnStart();
        this.draw();
    }

    handleTurnStart() {
        this.selectedPiece = undefined;
        this.legalMoves = undefined;
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
        this.draw();
    }

    winSound() {
        Sounds.victory.play();
    }

    cursorSound() {
        Sounds.cursor.play();
    }

    successSound() {
        Sounds.select.play();
    }

    failureSound() {
        Sounds.warning.play();
    }

    moveSound() {
        Sounds.move.play()
    }

    turnStartSound() {
        if (this.turn === Colors.white) {
            Sounds.white_turn.play();
        } else {
            Sounds.black_turn.play();
        }
    }

    captureSound() {
        Sounds.capture.play();
    }

    handleSelect() {
        if (this.lock) return;
        if (this.selectedPiece === undefined) {
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
                this.draw();
            } else {
                // select enemy piece - toggle cover range highlight
                piece._0.emphasizeCoverRange = !Utils.getEmphasis(piece);
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
        if (this.selectedPiece !== undefined) {
            this.successSound();
            this.selectedPiece = undefined;
            this.legalMoves = undefined;
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
        if (!this.promote) {
            this.failureSound();
            return;
        }
        var piece = undefined;
        switch (key) {
            case 66: // B
                piece = Utils.bishop(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
            case 78: // N
                piece = Utils.knight(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
            case 82: // R
                piece = Utils.rook(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
            case 81: // Q
                piece = Utils.queen(Utils.getColor(this.selectedPiece), Utils.getX(this.selectedPiece), Utils.getY(this.selectedPiece));
                break;
        }
        if (piece === undefined) {
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
        this.draw();
        this.endTurn();
    }

    draw() {
        var grid = Grid.makeGrid(this.board, this.turn, this.cursorPosition, this.selectedPiece, this.legalMoves);
        this.drawGrid(grid);
    }

    drawGrid(data) {
        var grid = svg.selectAll("g")
            .data(data, d => d.id);

        var enter = grid.enter().append("g");
        enter.append("rect").attr("class", "base");
        enter.append("rect").attr("class", "overlay");
        enter.append("rect").attr("class", "selection");
        enter.append("image");

        // draw base square
        grid.select(".base")
            .attr("width", Grid.size)
            .attr("height", Grid.size)
            .attr("transform", d => `translate(${Grid.getX(d)} ${Grid.getY(d)})`)
            .attr("fill", d => Grid.getInCheck(d) ? "red" : Grid.getColor(d));

        // draw overlay (movement and cover)
        grid.select(".overlay")
            .attr("width", Grid.size)
            .attr("height", Grid.size)
            .attr("transform", d => `translate(${Grid.getX(d)} ${Grid.getY(d)})`)
            .attr("fill", d => Grid.getOverlayColor(d))
            .style("opacity", 0.8)
            .style("display", d => Grid.getOverlayColor(d) === "none" ? "none" : "inline");

        // sprite
        grid.select("image")
            .attr("transform", d => `translate(${Grid.getX(d)} ${Grid.getY(d)})`)
            .attr("width", Grid.size)
            .attr("height", Grid.size)
            .attr("id", d => Grid.positionToId(d.x, d.y))
            .attr("xlink:href", d => (d.piece === undefined) ? "" : `./${Utils.getAsset(d.piece)}.gif`)
            .style("display", d => (d.piece === undefined) ? "none" : "inline");

        // selection box
        grid.select(".selection")
            .attr("width", Grid.size - Grid.stroke)
            .attr("height", Grid.size - Grid.stroke)
            .attr("transform", d => `translate(${Grid.getX(d) + Grid.stroke/2} ${Grid.getY(d) + Grid.stroke/2})`)
            .attr("fill", "none")
            .attr("stroke-width", `${Grid.stroke}px`)
            .attr("class", "selection")
            .attr("stroke", "goldenrod")
            .style("display", d => d.selection ? "inline" : "none");

        grid.exit().remove();
    }
}

window.onload = () => {
    svg = d3.select("#board").append("svg").attr("width", Grid.size * 8).attr("height", Grid.size * 8);
    var game = new Game();
    game.init();
}