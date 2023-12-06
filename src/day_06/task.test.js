const Task = require("./task");

test("part a example", () => {
  expect(new Task("src/day_06/input_example.txt").partA()).toBe(288);
});

test("part b example", () => {
  expect(new Task("src/day_06/input_example.txt").partB()).toBe(71503);
});

test("part a solution", () => {
  expect(new Task("src/day_06/input.txt").partA()).toBe(503424);
});

test("part b solution", () => {
  expect(new Task("src/day_06/input.txt").partB()).toBe(32607562);
});
