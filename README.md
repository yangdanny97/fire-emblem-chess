# fire-emblem-chess
A Fire Emblem themed, local, browser based chess game.

![screenshot](https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/board.png){: height="px400" width="400"}

## Intro

Fire Emblem is one of my favorite video game series, so I thought it would be cool to whip up a version of chess where the visuals, sounds, and interface are reminiscent of Fire Emblem. Gameplay-wise this is exactly the same as chess, and all the pieces work as you would expect chess pieces to work.

This game is designed to be played on a single computer, passed back and forth between players. The board orientation will flip depending on whose turn it is.

## How to Play
Play it in your browser [here](https://yangdanny97.github.io/fire-emblem-chess/)

### Controls
- WASD to move the cursor
- X to select a unit or a square
- Z to cancel your selection

Pressing X on one of your units will display which squares it can move to. Moving the cursor to a valid square and pressing X again will cause the unit to move to that square and capture any enemy unit on that square.

Pressing X on an enemy unit will show which squares it can move to, attack, or defend. You can toggle this off by pressing X again.

## Features

### Movement and Cover Highlighting
When a unit is selected, undefended squares that it may move to/capture will be highlighted in blue. Squares that it may move to/capture that are covered by enemy units are highlighted in purple. While you are in check, your king will be highlighted in red.

![screenshot](https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/movement.png){: height="px400" width="400"}

Units which are threatened or defended by enemy units are highlighted in pink. You may also select an enemy unit to show all the squares that it threatens/defends (including empty squares).

This feature makes it easy to visualize threats and identify hanging pieces. In the below screenshots, the black pawn on B5 is hanging, while the pawn on H5 is defended. The bishop on C4 is threatened by the pawn on B5.

![screenshot](https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/hanging.png){: height="px400" width="400"}
![screenshot](https://yangdanny97.github.io/fire-emblem-chess/assets/screenshots/hanging2.png){: height="px400" width="400"}

### Pieces
I edited sprites from the Fire Emblem GBA games to represent each chess piece. For reference, the mapping is shown below:

| Chess Piece | FE Sprite              |
|-------------|------------------------|
| Pawn        | Recruit  ![Black pawn](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/pawn.gif)![White pawn](https://yangdanny97.github.io/fire-emblem-chess/assets/White/pawn.gif)|
| Bishop      | Bishop   ![Black bishop](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/bishop.gif)![White bishop](https://yangdanny97.github.io/fire-emblem-chess/assets/White/bishop.gif)| |
| Knight      | Great Knight/Paladin  ![Black knight](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/knight.gif)![White knight](https://yangdanny97.github.io/fire-emblem-chess/assets/White/knight.gif)||
| Rook        | Ballista  ![Black rook](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/rook.gif)![White rook](https://yangdanny97.github.io/fire-emblem-chess/assets/White/rook.gif)||
| King        | Pontifex (NPC)  ![Black king](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/king.gif)![White king](https://yangdanny97.github.io/fire-emblem-chess/assets/White/king.gif)||
| Queen       | Queen (NPC)  ![Black queen](https://yangdanny97.github.io/fire-emblem-chess/assets/Black/queen.gif)![White queen](https://yangdanny97.github.io/fire-emblem-chess/assets/White/queen.gif)||

### Sounds
I used sounds from the GBA games and Fire Emblem Heroes.

## Dev Notes

### Why didn't I use one of the many existing chess libraries?

I wasn't sure how to extract the necessary data to display which squares are covered by an enemy piece and keep it updated as the cursor moves, so I figured it wouldn't be too hard to just write a chess library myself. Back when I TA'ed a functional programming class in college, a few students submitted terminal-based chess games as their final projects, so I thought it could be fun to build one myself. That said, this project isn't written completely in a functional style, although it might be fun to migrate everything to Reason one day.

### Why did I use D3 to render things instead of ___?

D3 is normally supposed to be used for dynamic & interactive data visualizations, so it definitely feels weird to use it for a game. One reason is it's the library I'm most familiar with, and I quite like using it. The other reason is that D3 is a really powerful library that is good for interactive graphics, and simple games like chess are just visualizations of the board state - when viewed that way, it's actually surprisingly suitable for the task.

### Some other cool feature ideas
I have some ideas on customizability that I didn't implement because I didn't want to increase the scope of the project too much for V1. I also didn't want to cause confusion over which sprite is which piece, and the current sprites are selected to be easy to identify and differentiate, even for people who don't know about Fire Emblem.
- King/Lord selection - Character select screen to customize which FE character/unit is used to represent your King.Unimplemented because of potential confusion - a mounted lord sprite could easily get confused with a knight.
- Different piece skins for B/W - Partially implemented (black knights use the Great Knight sprite, white knights use the Paladin sprite). This could even mean things like replacing all the black pieces with a monster-themed army using Sacred Stones monster sprites, although it would likely result in some confusion over which monster is what piece.

### Unimplemented Features
- time controls
- points system
- repetition stalemates

### TODO
- general styling of the webpage outside of the chess board 
- notifications for turn start, check, checkmate, etc.
- 
