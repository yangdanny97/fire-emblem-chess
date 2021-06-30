const path = require('path');

module.exports = {
    entry: {
        pieces: "./src/Pieces.bs.js",
        board: "./src/Board.bs.js",
        utils: "./src/Utils.bs.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build/"),
    }
};