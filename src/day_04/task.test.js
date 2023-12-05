const { partA, partB } = require("./task");
const { readFile } = require("../utility");

test("part a example", () => {
  expect(partA(readFile("src/day_04/input_example.txt"))).toBe(13);
});

test("part b example", () => {
  expect(partB(readFile("src/day_04/input_example.txt"))).toBe(30);
});

test("part a solution", () => {
  expect(partA(readFile("src/day_04/input.txt"))).toBe(25183);
});

test("part a solution", () => {
  expect(partB(readFile("src/day_04/input.txt"))).toBe(5667240);
});
