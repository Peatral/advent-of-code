const Task = require("./task");

test("part a example", () => {
  expect(new Task("src/day_07/input_example.txt").partA()).toBe(6440);
});

test("part b example", () => {
  expect(new Task("src/day_07/input_example.txt").partB()).toBe(5905);
});

test("part a solution", () => {
  expect(new Task("src/day_07/input.txt").partA()).toBe(250058342);
});

test("part b solution", () => {
  expect(new Task("src/day_07/input.txt").partB()).toBe(250506580);
});
