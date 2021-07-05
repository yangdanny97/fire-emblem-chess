import * as Grid from './Grid.bs.js';
import * as Utils from './Utils.bs.js';
import * as GameState from './GameState.bs.js';

export function endTurn() {
    setTimeout(() => {
        state.lock = false;
        state.turn = Utils.oppositeColor(state.turn);
        state = GameState.handleTurnStart(state);
    }, 1000);
}

export function drawGrid(data) {
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