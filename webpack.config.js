const path = require('path');

module.exports = {
    entry: {
        game: './src/Game.js'
    },
    output: {
        filename: "game.js",
        path: path.resolve(__dirname, "out/"),
    },
    mode: "none",
    target: "web"
};