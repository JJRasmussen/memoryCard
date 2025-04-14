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

## Perenual API as a source of text and images
To give the project a personal touch the cards should contain plant names and images. That way there is a bit of learning happening along with the remembering.

I use the perenual API which can return 30 unique plants in each API call.

## Below is a list of issues I encountered in creating the website along with my solutions.

### Perenual

#### In the free tier I have access to 100 calls/day. If I run out of calls the game cannot be played.
Solution: 
1. A sample response is stored directly in the src that be accessed if an API call returns an error.

#### Problem: the default_image property of some plants is null.
solution: 
1. I filter the plants that are returned to ensure valid entries.
2. If there are too few valid plants I append valid plants from the backup plant list until a sufficient number of plants has been reached.

### CSS

#### Showing the name of the plants in a proper way indepedently of the background image and length of the name:
1. Using position absolute I centered the text at the bottom of the image. This way the text simply starts higher on the image for long names.
2. using -webkit-text-stroke-width and -webkit-text-stroke-color the black text gets a white outline ensuring easier readability.
3. using mix-blend-mode on the image again increases readability.
