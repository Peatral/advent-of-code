const Task = require("./task");
const { readFile } = require("../utility");

test("part a example", () => {
  expect(
    new Task("")
      .applyText(readFile("src/day_01/input_example.txt").split("\n\n")[0])
      .partA(),
  ).toBe(142);
});

test("part b example", () => {
  expect(
    new Task("")
      .applyText(readFile("src/day_01/input_example.txt").split("\n\n")[1])
      .partB(),
  ).toBe(281);
});

test("part a solution", () => {
  expect(new Task("src/day_01/input.txt").partA()).toBe(55538);
});

test("part b solution", () => {
  expect(new Task("src/day_01/input.txt").partB()).toBe(54875);
});
