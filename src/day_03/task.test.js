const { partA, partB, parseInput, expandSymbolPositions } = require("./task");
const { readFile } = require("../utility");

test("findAllSymbols", () => {
  expect(parseInput("...+...$\n.*....#.")[0]).toStrictEqual([
    { x: 3, y: 0, symbol: "+" },
    { x: 7, y: 0, symbol: "$" },
    { x: 1, y: 1, symbol: "*" },
    { x: 6, y: 1, symbol: "#" },
  ]);
});

test("findAllNumbers", () => {
  expect(parseInput(".12+.45.$\n6..789.78")[1]).toStrictEqual([
    { x: 1, y: 0, value: 12, digits: 2 },
    { x: 5, y: 0, value: 45, digits: 2 },
    { x: 0, y: 1, value: 6, digits: 1 },
    { x: 3, y: 1, value: 789, digits: 3 },
    { x: 7, y: 1, value: 78, digits: 2 },
  ]);
});

test("expandSymbolPositions", () => {
  expect(
    new Set(
      expandSymbolPositions([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]),
    ),
  ).toStrictEqual(
    new Set([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ]),
  );
});

test("part a example", () => {
  expect(partA(readFile("src/day_03/input_example.txt"))).toBe(4361);
});

test("part b example", () => {
  expect(partB(readFile("src/day_03/input_example.txt"))).toBe(467835);
});

test("part a solution", () => {
  expect(partA(readFile("src/day_03/input.txt"))).toBe(556367);
});

test("part b solution", () => {
  expect(partB(readFile("src/day_03/input.txt"))).toBe(89471771);
});
