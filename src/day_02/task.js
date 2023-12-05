const Task = require("../template/task");
const { sum, toInt, max } = require("../utility");

const POSSIBLE_WITH = {
  red: 12,
  green: 13,
  blue: 14,
};

class Day02 extends Task {
  parseInput(text) {
    return text.split("\n").map(str => ({
      id: toInt(str.split(" ")[1].replace(":", "")),
      sets: str
        .replace(/Game ([0-9]+): /, "")
        .split("; ")
        .map(set =>
          set
            .split(", ")
            .map(entry => entry.split(" "))
            .reduce(
              (p, c) => {
                p[c[1]] += toInt(c[0]);
                return p;
              },
              { red: 0, green: 0, blue: 0 },
            ),
        ),
    }));
  }

  processPartA(input) {
    return input
      .filter(game =>
        game.sets.every(
          set =>
            set.red <= POSSIBLE_WITH.red &&
            set.green <= POSSIBLE_WITH.green &&
            set.blue <= POSSIBLE_WITH.blue,
        ),
      )
      .map(game => game.id)
      .reduce(sum, 0);
  }

  processPartB(input) {
    return input
      .map(game =>
        game.sets.reduce(
          (p, c) => ({
            red: max(p.red, c.red),
            green: max(p.green, c.green),
            blue: max(p.blue, c.blue),
          }),
          { red: 0, green: 0, blue: 0 },
        ),
      )
      .map(set => set.red * set.green * set.blue)
      .reduce(sum, 0);
  }
}

module.exports = Day02;
