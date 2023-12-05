const Task = require("./task");

test("part a example", () => {
  expect(new Task("src/template/input_example.txt").partA()).toBe(0);
});

test("part b example", () => {
  expect(new Task("src/template/input_example.txt").partB()).toBe(0);
});

test("part a solution", () => {
  expect(new Task("src/template/input.txt").partA()).toBe(0);
});

test("part b solution", () => {
  expect(new Task("src/template/input.txt").partB()).toBe(0);
});
