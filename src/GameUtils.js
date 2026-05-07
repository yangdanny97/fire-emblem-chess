import * as Grid from './Grid.res.mjs';
import * as Utils from './Utils.res.mjs';
import * as GameState from './GameState.res.mjs';

export function endTurn() {
    setTimeout(() => {
        state.lock = false;
        state.turn = Utils.oppositeColor(state.turn);
        state = GameState.handleTurnStart(state);
    }, 1000);
}

export function drawGrid(data) {
    svg.selectAll("g")
        .data(data, d => d.id)
        .join(
            enter => {
                let g = enter.append("g");
                g.append("rect").attr("class", "base");
                g.append("rect").attr("class", "overlay");
                g.append("rect").attr("class", "selection");
                g.append("image")
            },
            update => {
                // draw base square
                update.select(".base")
                    .attr("width", Grid.size)
                    .attr("height", Grid.size)
                    .attr("transform", d => `translate(${Grid.getX(d)} ${Grid.getY(d)})`)
                    .attr("fill", d => Grid.getInCheck(d) ? "red" : Grid.getColor(d));

                // draw overlay (movement and cover)
                update.select(".overlay")
                    .attr("width", Grid.size)
                    .attr("height", Grid.size)
                    .attr("transform", d => `translate(${Grid.getX(d)} ${Grid.getY(d)})`)
                    .attr("fill", d => Grid.getOverlayColor(d))
                    .style("opacity", 0.8)
                    .style("display", d => Grid.getOverlayColor(d) === "none" ? "none" : "inline");

                // sprite
                update.select("image")
                    .attr("transform", d => `translate(${Grid.getX(d)} ${Grid.getY(d)})`)
                    .attr("width", Grid.size)
                    .attr("height", Grid.size)
                    .attr("id", d => Grid.positionToId(d.x, d.y))
                    .attr("xlink:href", d => (d.piece === undefined) ? "" : `./${Utils.getAsset(d.piece)}.gif`)
                    .style("display", d => (d.piece === undefined) ? "none" : "inline");

                // selection box
                update.select(".selection")
                    .attr("width", Grid.size - Grid.stroke)
                    .attr("height", Grid.size - Grid.stroke)
                    .attr("transform", d => `translate(${Grid.getX(d) + Grid.stroke / 2} ${Grid.getY(d) + Grid.stroke / 2})`)
                    .attr("fill", "none")
                    .attr("stroke-width", `${Grid.stroke}px`)
                    .attr("class", "selection")
                    .attr("stroke", "goldenrod")
                    .style("display", d => d.selection ? "inline" : "none");
            },
            exit => {
                exit.remove()
            }
        )
}