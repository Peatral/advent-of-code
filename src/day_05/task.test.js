const Task = require("./task");

test("part a example", () => {
  expect(new Task("src/day_05/input_example.txt").partA()).toBe(35);
});

test("part b example", () => {
  expect(new Task("src/day_05/input_example.txt").partB()).toBe(46);
});

test("part a solution", () => {
  expect(new Task("src/day_05/input.txt").partA()).toBe(157211394);
});

test("part b solution", () => {
  expect(new Task("src/day_05/input.txt").partB()).toBe(50855035);
});
