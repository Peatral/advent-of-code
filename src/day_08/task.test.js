const Task = require("./task");

describe("examples", () => {
  it("part a 1", () => {
    expect(
      new Task("")
        .applyText(readFile("src/day_08/input_example.txt").split("\n\n\n")[0])
        .partA(),
    ).toBe(2);
  });

  it("part a 2", () => {
    expect(
      new Task("")
        .applyText(readFile("src/day_08/input_example.txt").split("\n\n\n")[0])
        .partA(),
    ).toBe(6);
  });

  it("part b", () => {
    expect(
      new Task("")
        .applyText(readFile("src/day_08/input_example.txt").split("\n\n\n")[0])
        .partB(),
    ).toBe(6);
  });
});

describe("solutions", () => {
  it("part a", () => {
    expect(new Task("src/day_08/input.txt").partA()).toBe(20093);
  });

  it("part b", () => {
    expect(new Task("src/day_08/input.txt").partB()).toBe(0);
  });
});
