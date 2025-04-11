# React practice project in "The Odin Project"

## What is the project about?
Creating a memory game where a point is scored when a card, that has not previously been pressed, is pressed. When a card that has previously been pressed is pressed the game is over.

## The finished project will consist of:
- A number of card rendered in a random order.
- Each card containing an image and some text.
- The image should be aquired from an API.
- a scoreboard that show the users best results.
- Pressing an image should trigger:   
    - checking if the image has already been pressed.
    - ending of the game if it has been pressed and logging their result to the scoreboard.
    - a rerender with new randomized ordering of the cards.
    - tracking of the pressed image in state.