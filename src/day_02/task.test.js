const Task = require("./task");

test("part a example", () => {
  expect(new Task("src/day_02/input_example.txt").partA()).toBe(8);
});

test("part b example", () => {
  expect(new Task("src/day_02/input_example.txt").partB()).toBe(2286);
});

test("part a solution", () => {
  expect(new Task("src/day_02/input.txt").partA()).toBe(2447);
});

test("part b solution", () => {
  expect(new Task("src/day_02/input.txt").partB()).toBe(56322);
});
