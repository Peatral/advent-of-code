const Task = require("./task");

describe("extrapolate", () => {
  describe("back", () => {
    it("example 1", () => {
      expect(Task.extrapolate([0, 3, 6, 9, 12, 15])).toBe(18);
    });

    it("example 2", () => {
      expect(Task.extrapolate([1, 3, 6, 10, 15, 21])).toBe(28);
    });

    it("example 3", () => {
      expect(Task.extrapolate([10, 13, 16, 21, 30, 45])).toBe(68);
    });
  });

  describe("front", () => {
    it("example 1", () => {
      expect(Task.extrapolate([10, 13, 16, 21, 30, 45], true)).toBe(5);
    });
  });
});

describe("examples", () => {
  test("part a", () => {
    expect(new Task("src/day_09/input_example.txt").partA()).toBe(114);
  });

  test("part b", () => {
    expect(new Task("src/day_09/input_example.txt").partB()).toBe(2);
  });
});

describe("solutions", () => {
  test("part a", () => {
    expect(new Task("src/day_09/input.txt").partA()).toBe(1584748274);
  });

  test("part b", () => {
    expect(new Task("src/day_09/input.txt").partB()).toBe(1026);
  });
});
