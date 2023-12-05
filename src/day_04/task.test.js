const Task = require("./task");

test("part a example", () => {
  expect(new Task("src/day_04/input_example.txt").partA()).toBe(13);
});

test("part b example", () => {
  expect(new Task("src/day_04/input_example.txt").partB()).toBe(30);
});

test("part a solution", () => {
  expect(new Task("src/day_04/input.txt").partA()).toBe(25183);
});

test("part b solution", () => {
  expect(new Task("src/day_04/input.txt").partB()).toBe(5667240);
});
