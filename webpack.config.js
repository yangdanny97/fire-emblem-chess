const path = require('path');

module.exports = {
    entry: {
        game: './src/game.js'
    },
    output: {
        filename: "game.js",
        path: path.resolve(__dirname, "out/"),
    },
    mode: "none"
};