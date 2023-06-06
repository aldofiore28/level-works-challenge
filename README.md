# Level works challenge

## Requirements

From email:

```
Create a grid of 50x50. When you click on a cell, all values in the
cells in the same row and column are increased  by 1. If a cell is
empty, it will get a value of 1. After each change a cell will briefly
turn yellow. If 5 consecutive numbers in the Fibonacci sequence
are next to each other, these cells will briefly turn green and will
be cleared. Use the programming language of your choice.
```

## How to install

In a terminal, run `npm install` to install the dependencies.

## How to run the app

In a terminal, run `npm run dev` to start the app. The terminal will notify you the port the app will be running on
and use the url `http://localhost:{{port}}` to access the app.

## How to run the tests

In a terminal, run `npm run test` to run the tests.

## Solution

For now, the grid only checks for the fibonacci sequence from left to right, horizontally. I believe that adding the ability
to check vertically would be as simple as flatting the grid by the column, and then the rest of the logic will be almost the
same, other than the function that returns the coordinates to paint green on successful fibonacci sequence.

Checking in any direction will be more difficult, and I don't have a specific solution as of now.