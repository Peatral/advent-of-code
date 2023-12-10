const { readFile } = require("../utility");
const Task = require("./task");

describe("examples", () => {
  it("part a", () => {
    expect(new Task("src/day_10/input_example_1.txt").partA()).toBe(8);
  });

  describe("part b", () => {
    it("1", () => {
      expect(
        new Task("")
          .applyText(
            readFile("src/day_10/input_example_2.txt").split("\n\n")[0],
          )
          .partB(),
      ).toBe(4);
    });

    it("2", () => {
      expect(
        new Task("")
          .applyText(
            readFile("src/day_10/input_example_2.txt").split("\n\n")[1],
          )
          .partB(),
      ).toBe(8);
    });

    it("3", () => {
      expect(
        new Task("")
          .applyText(
            readFile("src/day_10/input_example_2.txt").split("\n\n")[2],
          )
          .partB(),
      ).toBe(10);
    });
  });
});

describe("solutions", () => {
  it("part a", () => {
    expect(new Task("src/day_10/input.txt").partA()).toBe(6947);
  });

  it("part b", () => {
    expect(new Task("src/day_10/input.txt").partB()).toBe(273);
  });
});
