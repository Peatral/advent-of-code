# Advent of Code 2023

### FAQ

- **Why still JavaScript?**<br>
  I was happy with my results last year and don't want to learn something new this year
- **Why do you use jest this year?**<br>
  I think it is a good idea to at least test something before blindly submitting wrong results (like the previous years). I only use the example given as a reference, which certainly doesn't catch all quirks the real input might have.

## Stuff

Because I test now I have split the code into two files, `task.js` and `index.js`. The tests reside in `task.test.js`, which simply checks the given example.
I removed all the npm scripts and replaced them with `start:all`, which runs all available days. While I implement the algorithms I look only at the tests, I only need the real results once I believe I have the day ready. This should make everything a bit cleaner.
