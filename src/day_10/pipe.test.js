const { vecNew } = require("../utility");
const Pipe = require("./pipe");

test("S", () =>
  expect(new Pipe("S").getPossibleConnections()).toStrictEqual([
    vecNew(0, -1),
    vecNew(1, 0),
    vecNew(0, 1),
    vecNew(-1, 0),
  ]));

test("|", () =>
  expect(new Pipe("|").getPossibleConnections()).toStrictEqual([
    vecNew(0, -1),
    vecNew(0, 1),
  ]));

test("-", () =>
  expect(new Pipe("-").getPossibleConnections()).toStrictEqual([
    vecNew(1, 0),
    vecNew(-1, 0),
  ]));

test("F", () =>
  expect(new Pipe("F").getPossibleConnections()).toStrictEqual([
    vecNew(1, 0),
    vecNew(0, 1),
  ]));

test("7", () =>
  expect(new Pipe("7").getPossibleConnections()).toStrictEqual([
    vecNew(0, 1),
    vecNew(-1, 0),
  ]));

test("L", () =>
  expect(new Pipe("L").getPossibleConnections()).toStrictEqual([
    vecNew(0, -1),
    vecNew(1, 0),
  ]));

test("J", () =>
  expect(new Pipe("J").getPossibleConnections()).toStrictEqual([
    vecNew(0, -1),
    vecNew(-1, 0),
  ]));

test(".", () =>
  expect(new Pipe(".").getPossibleConnections()).toStrictEqual([]));
