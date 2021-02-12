# fire-emblem-chess
A Fire Emblem themed, local, browser based chess game.

## Intro

Fire Emblem is one of my favorite video game series, so I thought it would be cool to whip up a version of chess where the pieces are skinned using sprites from the Fire Emblem GBA games (since FE is basically the JRPG equivalent of chess). The UI and sounds are also inspired by FE, with keyboard-based piece selection & enemy piece threaten range highlighting. Otherwise, this is exactly the same as chess and all the pieces work as you would expect chess pieces to work.

This is designed to be played on a single computer, passed back and forth between players. The board will flip around depending on whose turn it is. 

### Legend

| Chess Piece | FE Unit/Class  |
|-------------|----------------|
| Pawn        | Phantom        |
| Bishop      | Bishop         |
| Knight      | Great Knight   |
| Rook        | Ballista       |
| King        | Pontifex (NPC) |
| Queen       | Queen (NPC)    |

### How to Run
Coming Soon

## Dev Notes

### Why didn't I use one of the many existing chess libraries?

I wasn't sure how to extract the necessary data to display which squares are threatened by an enemy piece and keep it updated as the cursor moves, so I figured it wouldn't be too hard to just write a chess library myself. Back when I TA'ed a functional programming class in college, a few students submitted terminal-based chess games as their final projects, so I thought it could be fun to build one myself. That said, this project isn't written completely in a functional style, although it might be fun to migrate everything to Reason one day.

### Why is everything in a single JS file?

I learned Javascript in the JQuery days before all the advanced features were added, so I never figured out how dependency management works. In fact, this is my first time using classes in JS. Feel free to refactor and move things to separate files.

### Why do I use D3 to render things instead of ___?

D3 is normally supposed to be used for dynamic & interactive data visualizations, so it definitely feels weird to use it for a game. One reason is it's the library I'm most familiar with, and I quite like using it. The other reason is that D3 is a really powerful library that is good for interactive graphics, and simple games like chess are just visualizations of the board state - when viewed that way, it's actually surprisingly suitable for the task.

### Some other cool feature ideas
I have some ideas on customizability that I didn't implement because I didn't want to increase the scope of the project too much for V1. I also didn't want to cause confusion over which unit is which piece, and the current units are selected to be easy to identify and differentiate, even for people who don't know about Fire Emblem.
- King/Lord Selection - It could be cool to have a character select screen to customize what FE character is used to represent your King. For example, Lords, Generals, Tacticians, Necromancers, and Summoners would all be thematic/appropriate choices to be kings. Unimplemented because of potential confusion - a mounted lord could get confused with a knight.
- Alternate Piece Skins - It might be cool for Black and White to use different skins for pieces. For example, one side could have Generals as Rooks and Paladins as Knights, instead of the current Ballista/Great Knight. Another idea is a monster themed army, with various Sacred Stones monsters for each piece. This also has the potential to cause confusion regarding the mapping from monster unit -> chess piece.

### Unimplemented Features
- time controls
- points system
- repetition stalemates
