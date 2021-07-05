import * as Grid from './Grid.bs.js';
import * as Sounds from './Sounds.js';
import * as GameUtils from './GameUtils.js';
import * as GameState from './GameState.bs.js';

function setup() {
    var body = d3.select("body");
    body.on("keydown", () => {
        var key = d3.event.keyCode;
        switch (key) {
            case 38:
            case 87: // W
                state = GameState.handleUp(state);
                break;
            case 37:
            case 65: // A
                state = GameState.handleLeft(state);
                break;
            case 40:
            case 83: // S
                state = GameState.handleDown(state);
                break;
            case 39:
            case 68: // D
                state = GameState.handleRight(state);
                break;
            case 88: // X
                state = GameState.handleSelect(state);
                break;
            case 90: // Z
                state = GameState.handleCancel(state);
                break;
            case 66: // B
            case 78: // N
            case 82: // R
            case 81: // Q
                state = GameState.handlePromote(state, key);
                break;
        }
    });
    state = GameState.handleTurnStart(state);
    GameState.draw(state);
}

window.onload = () => {
    state = GameState.init();
    svg = d3.select("#board").append("svg").attr("width", Grid.size * 8).attr("height", Grid.size * 8);
    setup();
}