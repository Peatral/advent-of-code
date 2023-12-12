const Task = require("./task");

describe("examples", () => {
  it("part a", () => {
    expect(new Task("src/day_11/input_example.txt").partA()).toBe(374);
  });

  describe("part b", () => {
    const testCount = expansion =>
      Task.countLengths(
        Task.getStars(
          new Task("").parseInput(readFile("src/day_11/input_example.txt")),
          expansion,
        ),
      );
    it("10", () => {
      expect(testCount(10)).toBe(1030);
    });
    it("100", () => {
      expect(testCount(100)).toBe(8410);
    });
  });
});

describe("solutions", () => {
  it("part a", () => {
    expect(new Task("src/day_11/input.txt").partA()).toBe(9799681);
  });

  it("part b", () => {
    expect(new Task("src/day_11/input.txt").partB()).toBe(0);
  });
});
