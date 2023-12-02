const { partA, partB } = require("./task");
const { readLines } = require("../utility");

test("day 02 part a", () => {
  expect(
    partA([
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ]),
  ).toBe(8);
});

test("day 02 part b", () => {
  expect(
    partB([
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ]),
  ).toBe(2286);
});

test("day 02 part a solution", () => {
  expect(partA(readLines("src/day_02/input.txt"))).toBe(2447);
});

test("day 02 part b solution", () => {
  expect(partB(readLines("src/day_02/input.txt"))).toBe(56322);
});
