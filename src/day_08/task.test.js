const Task = require("./task");
const { readFile } = require("../utility");

describe("math stuff", () => {
  describe("greatest common divisor", () => {
    it("4 and 6 = 2", () => expect(Task.gcd(4, 6)).toBe(2));
    it("48 and 18 = 6", () => expect(Task.gcd(48, 18)).toBe(6));
    it("48 and 4 = 12", () => expect(Task.gcd(48, 4)).toBe(4));
    it("4 and 18 = 9", () => expect(Task.gcd(4, 18)).toBe(2));
  });

  describe("least common multiple", () => {
    it("4 and 6 = 12", () => expect(Task.lcm(4, 6)).toBe(12));
    it("48 and 18 = 144", () => expect(Task.lcm(48, 18)).toBe(144));
    it("48 and 4 = 48", () => expect(Task.lcm(48, 4)).toBe(48));
    it("4 and 18 = 36", () => expect(Task.lcm(4, 18)).toBe(36));
    it("4, 6, 48, 18 = 144", () =>
      expect(Task.leastCommonMultiple([4, 6, 48, 18])).toBe(144));
  });
});

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
        .applyText(readFile("src/day_08/input_example.txt").split("\n\n\n")[1])
        .partA(),
    ).toBe(6);
  });

  it("part b", () => {
    expect(
      new Task("")
        .applyText(readFile("src/day_08/input_example.txt").split("\n\n\n")[2])
        .partB(),
    ).toBe(6);
  });
});

describe("solutions", () => {
  it("part a", () => {
    expect(new Task("src/day_08/input.txt").partA()).toBe(20093);
  });

  it("part b", () => {
    expect(new Task("src/day_08/input.txt").partB()).toBe(22103062509257);
  });
});
