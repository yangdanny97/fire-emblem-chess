let warning = new Howl({
    src: ['./assets/sounds/warning.flac'],
    autoplay: false,
    loop: false,
});
let capture = new Howl({
    src: ['./assets/sounds/capture.flac'],
    autoplay: false,
    loop: false,
});
let move = new Howl({
    src: ['./assets/sounds/move.wav'],
    autoplay: false,
    loop: false,
});
let select = new Howl({
    src: ['./assets/sounds/select.wav'],
    autoplay: false,
    loop: false,
});
let cursor = new Howl({
    src: ['./assets/sounds/cursor.wav'],
    autoplay: false,
    loop: false,
});
let victory = new Howl({
    src: ['./assets/sounds/victory1.flac'],
    autoplay: false,
    loop: false,
});
let white_turn = new Howl({
    src: ['./assets/sounds/white_turn.flac'],
    autoplay: false,
    loop: false,
});
let black_turn = new Howl({
    src: ['./assets/sounds/black_turn.flac'],
    autoplay: false,
    loop: false,
});

let winSound = () => {
    victory.play();
}
exports.winSound = winSound;

let cursorSound = () =>{
    cursor.play();
}
exports.cursorSound = cursorSound;

let successSound = () =>{
    select.play();
}
exports.successSound = successSound;

let failureSound = () =>{
    warning.play();
}
exports.failureSound = failureSound;

let moveSound = () =>{
    move.play()
}
exports.moveSound = moveSound;

let turnStartSound = (turn) =>{
    if (turn === 0) {
        white_turn.play();
    } else {
        black_turn.play();
    }
}
exports.turnStartSound = turnStartSound;

let captureSound = () =>{
    capture.play();
}
exports.captureSound = captureSound;