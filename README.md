# SEI 23 (Project 1 - Simon Game)

## Game flow:
1. Player will start the game by pressing any keyboard button.
2. First, the game will flash a random color, player is require to click on the same color. 
3. After clicking the correct color, one of the button will randomly flash again. Player is require to press the buttons in order.
4. If the player choose the wrong button, game over.
5. The game will keep on adding the pattern and the player is required to press the pattern in order from starting to the end.

![Alt Text](https://media.giphy.com/media/ZEaGW1h33vmjJii3xt/giphy.gif)

## Project Structure:
- HTML: Create basic layout for the four Simon Button and text display.
- CSS: Styling of the buttons, text and background. Animation is also used from CSS with DOM manipulation of CSS by adding/removing classes.
- JavaScript: Game logics, control the game flow by using conditional statements, arrays, functions and intervals.
- DOM manipulation: Using eventlistener such as "click", "keypress", audio etc to make the game interactive to the player.

## Minimum functionality:
- [x] When the button was being pressed and randomly selected by the program, simple animation will display and play sounds. 
- [x] Able to play the game continuously until the user press wrong button.
- [x] When game-over, the user is able to restart and start the game again.
- [x] Record the highest score user has so-far.

## Further:
- Added additional difficulty(Reverse, easy, shuffle) for the player to choose from.
- Instead of the normal simon standard game color, randomize the color for the player.
- Restart function and beat the score added.
- Made it to phone responsive website

## Issues Faced:
- Consecutive clicking that causes the game to crash
- How to shuffle the buttons for the game 
- Adjusting the layouts for better gaming experience

## Improvement to be made:
- Add more game modes and make it to 2 to 4 players instead of single player
- Refactor code for more efficiency and shorten the code
- Make the program to have more responsive screen and work on other screen like Ipad etc.

## Reference: 
#### Simon Game: 
- https://www.ultraboardgames.com/simon/index.php
