# Advent of Code 2023

### FAQ
- **Why still JavaScript?**<br>
I was happy with my results last year and don't want to learn something new this year
- **Why do you use jest this year?**<br>
I think it is a good idea to at least test something before blindly submitting wrong results (like the previous years). I only use the example given as a reference, which certainly doesn't catch all quirks the real input might have.

## Stuff
Because I test now I have split the code into two files, `task.js` and `index.js`. `index.js` just runs both functions `partA` and `partB` with the input for the day. This file probably won't change for each day and I could handle this in a fancier way, but _it works_. 
Splitting the code this way I can now test the code with `task.test.js`, which tests my code with the examples given.
