const { partA, partB } = require("./task");

test("day 01 part a", () => {
  expect(partA([
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet",
  ])).toBe(142)
});

test("day 01 part b", () => {
  expect(partB([
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ])).toBe(281)
});
