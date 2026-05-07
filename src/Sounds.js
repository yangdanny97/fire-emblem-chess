const warning = new Howl({
    src: ['./assets/sounds/warning.flac'],
    autoplay: false,
    loop: false,
});
const capture = new Howl({
    src: ['./assets/sounds/capture.flac'],
    autoplay: false,
    loop: false,
});
const move = new Howl({
    src: ['./assets/sounds/move.wav'],
    autoplay: false,
    loop: false,
});
const select = new Howl({
    src: ['./assets/sounds/select.wav'],
    autoplay: false,
    loop: false,
});
const cursor = new Howl({
    src: ['./assets/sounds/cursor.wav'],
    autoplay: false,
    loop: false,
});
const victory = new Howl({
    src: ['./assets/sounds/victory1.flac'],
    autoplay: false,
    loop: false,
});
const white_turn = new Howl({
    src: ['./assets/sounds/white_turn.flac'],
    autoplay: false,
    loop: false,
});
const black_turn = new Howl({
    src: ['./assets/sounds/black_turn.flac'],
    autoplay: false,
    loop: false,
});

const winSound = () => {
    victory.play();
}
exports.winSound = winSound;

const cursorSound = () =>{
    cursor.play();
}
exports.cursorSound = cursorSound;

const successSound = () =>{
    select.play();
}
exports.successSound = successSound;

const failureSound = () =>{
    warning.play();
}
exports.failureSound = failureSound;

const moveSound = () =>{
    move.play()
}
exports.moveSound = moveSound;

const turnStartSound = (turn) =>{
    if (turn === 0) {
        white_turn.play();
    } else {
        black_turn.play();
    }
}
exports.turnStartSound = turnStartSound;

const captureSound = () =>{
    capture.play();
}
exports.captureSound = captureSound;