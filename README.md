# fire-emblem-chess
A Fire Emblem themed chess game in your browser

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

### Some other cool feature ideas
I have some ideas on customizability that I didn't implement because I didn't want to increase the scope of the project too much for V1. I also didn't want to cause confusion over which unit is which piece, and the current units are selected to be easy to identify and differentiate, even for people who don't know about Fire Emblem.
- King/Lord Selection - It could be cool to have a character select screen to customize what FE character is used to represent your King. For example, Lords, Generals, Tacticians, Necromancers, and Summoners would all be thematic/appropriate choices to be kings. Unimplemented because of potential confusion - a mounted lord could get confused with a knight.
- Alternate Piece Skins - It might be cool for Black and White to use different skins for pieces. For example, one side could have Generals as Rooks and Paladins as Knights, instead of the current Ballista/Great Knight. Another idea is a monster themed army, with various Sacred Stones monsters for each piece. This also has the potential to cause confusion regarding the mapping from monster unit -> chess piece.

### Unimplemented Features
- time controls
- points system
- repetition stalemates
