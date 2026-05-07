import * as Grid from './Grid.res.mjs';
import * as Sounds from './Sounds.js';
import * as GameUtils from './GameUtils.js';
import * as GameState from './GameState.res.mjs';

const audioCtx = new AudioContext();

const start = document.getElementById("start");

start.addEventListener("click", async () => {
  await audioCtx.resume();
  start.remove();
});

function setup() {
    let body = d3.select("body");
    body.on("keydown", async event => {
        switch (event.key) {
            case "ArrowUp":
            case "w": // W
                state = GameState.handleUp(state);
                break;
            case "ArrowLeft":
            case "a": // A
                state = GameState.handleLeft(state);
                break;
            case "ArrowDown":
            case "s": // S
                state = GameState.handleDown(state);
                break;
            case "ArrowRight":
            case "d": // D
                state = GameState.handleRight(state);
                break;
            case "x": // X
                state = GameState.handleSelect(state);
                break;
            case "z": // Z
                state = GameState.handleCancel(state);
                break;
            case "b": // B
            case "n": // N
            case "r": // R
            case "q": // Q
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
