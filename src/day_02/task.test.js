const { readFile } = require("../utility");
const { partA, partB } = require("./task");

test("part a example", () => {
  expect(partA(readFile("src/day_02/input_example.txt"))).toBe(8);
});

test("part b example", () => {
  expect(partB(readFile("src/day_02/input_example.txt"))).toBe(2286);
});

test("part a solution", () => {
  expect(partA(readFile("src/day_02/input.txt"))).toBe(2447);
});

test("part b solution", () => {
  expect(partB(readFile("src/day_02/input.txt"))).toBe(56322);
});
