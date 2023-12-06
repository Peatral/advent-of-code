const Task = require("../template/task");
const { toInt } = require("../utility");

class Day06 extends Task {
  solveQuadraticEquation(p, q) {
    const root = Math.sqrt((p / 2) * (p / 2) - q);
    return [-p / 2 - root, -p / 2 + root];
  }

  solveRace(duration, record) {
    const [a, b] = this.solveQuadraticEquation(-duration, record);
    return Math.abs(Math.ceil(b) - Math.floor(a)) - 1;
  }

  processPartA(input) {
    input = input
      .map(line => line.replaceAll(/\s+/g, " ").split(" ").slice(1))
      .reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), []);

    return input
      .map(race => this.solveRace(race[0], race[1]))
      .reduce((p, c) => p * c, 1);
  }

  processPartB(input) {
    input = input.map(line => toInt(line.split(":")[1].replaceAll(/\s+/g, "")));
    return this.solveRace(input[0], input[1]);
  }
}

module.exports = Day06;
