# Fire Emblem Chess
A Fire Emblem themed, local, browser based chess game. ![](https://yangdanny97.github.io/fire-emblem-chess/assets/White/knight.gif)

<img src="https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/board.png" width="400" height="400" />

## Intro ![](https://yangdanny97.github.io/fire-emblem-chess/assets/White/bishop.gif)

I've been playing a lot of chess during COVID, and Fire Emblem is one of my favorite video game series... so I thought it would be cool to whip up a version of chess where the visuals, sounds, and interface based on Fire Emblem. Gameplay-wise this is exactly the same as chess, and all the pieces work as you would expect chess pieces to work.

This game is designed to be played on a single computer, passed back and forth between players. The board orientation will flip depending on whose turn it is.

## How to Play ![](https://yangdanny97.github.io/fire-emblem-chess/assets/White/rook.gif)
Play it in your browser [here](https://yangdanny97.github.io/fire-emblem-chess/)

### Controls
- WASD to move the cursor
- X to select a unit or a square
- Z to cancel your selection
- Pawn Promotion: R(ook), Q(ueen), B(ishop), N(umm, knight)

Pressing X on one of your units will display which squares it can move to. Moving the cursor to a valid square and pressing X again will cause the unit to move to that square and capture any enemy unit on that square.

Pressing X on an enemy unit will show which squares it can move to, attack, or defend. You can toggle this off by pressing X again.

## Features ![](https://yangdanny97.github.io/fire-emblem-chess/assets/White/pawn.gif)

### Movement and Cover Highlighting
This is based on a similar mechanic in the Fire Emblem games, where legal movements and danger are displayed on the map. In chess, this feature makes it easy to visualize threats and identify hanging pieces. 

When a unit is selected, undefended squares that it may move to/capture will be highlighted in blue. Squares that it may move to/capture that are in range of enemy units are highlighted in purple. While you are in check, your king will be highlighted in red.

<img src="https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/movement.png" width="400" height="400" />

Units which are threatened or defended by enemy units are highlighted in pink. You may also select an enemy unit to show all the squares that it threatens/defends (including empty squares).

In the following screenshot, the black pawn on B5 is hanging so its square is blue, while the black pawn on H5 is defended so its square is purple. 

<img src="https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/hanging.png" width="300" height="300" />

Here, the white bishop on C4 is threatened by the black pawn on B5, so its square is pink.

<img src="https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/hanging2.png" width="300" height="300" />

### Pieces
I used modified sprites from the Fire Emblem GBA games to represent each chess piece. For reference, the mapping is shown below:

| Chess Piece | FE Sprite              |
|-------------|------------------------|
| Pawn        | Recruit  ![Black pawn](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/pawn.gif)![White pawn](https://yangdanny97.github.io/fire-emblem-chess/assets/White/pawn.gif)|
| Bishop      | Bishop   ![Black bishop](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/bishop.gif)![White bishop](https://yangdanny97.github.io/fire-emblem-chess/assets/White/bishop.gif)| |
| Knight      | Great Knight/Paladin  ![Black knight](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/knight.gif)![White knight](https://yangdanny97.github.io/fire-emblem-chess/assets/White/knight.gif)||
| Rook        | Ballista  ![Black rook](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/rook.gif)![White rook](https://yangdanny97.github.io/fire-emblem-chess/assets/White/rook.gif)||
| King        | Pontifex  ![Black king](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/king.gif)![White king](https://yangdanny97.github.io/fire-emblem-chess/assets/White/king.gif)||
| Queen       | Queen  ![Black queen](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/queen.gif)![White queen](https://yangdanny97.github.io/fire-emblem-chess/assets/White/queen.gif)||

### Sounds
I used sounds from the GBA games and Fire Emblem Heroes.

## Dev Notes ![](https://yangdanny97.github.io/fire-emblem-chess/assets/White/king.gif)

### Why didn't I use one of the many existing chess libraries?

I wasn't sure how to extract the necessary data to display which squares are covered by an enemy piece and keep it updated as the cursor moves, so I figured it wouldn't be too hard to just write a chess library myself. Back when I TA'ed a functional programming class in college, a few students submitted terminal-based chess games as their final projects, so I thought it could be fun to build one myself. That said, this project isn't written completely in a functional style, although it might be fun to migrate everything to Reason one day.

Update 7/2021: I've migrated more than half the codebase to Rescript, trying to keep things as pure/functional as I can. All the chess logic has been ported to Rescript, what remains is the control system & rendering.

### Why did I use D3 to render things instead of ___?

D3 is normally supposed to be used for dynamic & interactive data visualizations, so it definitely feels weird to use it for a game. One reason is it's the library I'm most familiar with, and I quite like using it. The other reason is that D3 is a really powerful library that is good for interactive graphics, and simple games like chess are just visualizations of the board state - when viewed that way, it's actually surprisingly suitable for the task.

### Unimplemented Features
- time controls
- points system
- repetition draws

### TODO
- general styling of the webpage outside of the chess board
- notifications/banners for turn start, checkmate, stalemate, etc.
- support dumping and reading board states from ASCII
- vim key bindings for cursor movement

