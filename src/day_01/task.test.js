const { partA, partB } = require("./task");
const { readFile } = require("../utility");

test("part a example", () => {
  expect(partA(readFile("src/day_01/input_example.txt").split("\n\n")[0])).toBe(
    142,
  );
});

test("part b example", () => {
  expect(partB(readFile("src/day_01/input_example.txt").split("\n\n")[1])).toBe(
    281,
  );
});

test("part a solution", () => {
  expect(partA(readFile("src/day_01/input.txt"))).toBe(55538);
});

test("part b solution", () => {
  expect(partB(readFile("src/day_01/input.txt"))).toBe(54875);
});
