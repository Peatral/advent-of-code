const Task = require("../template/task");
const { toInt } = require("../utility");

class Day09 extends Task {
  static extrapolate(numbers, front = false) {
    let sequences = [numbers];
    let last = sequences[0];
    while (!last.every(x => x == 0)) {
      sequences.push(
        last.slice(1).reduce((p, c, i) => [...p, c - last[i]], []),
      );
      last = sequences[sequences.length - 1];
    }
    if (front) {
      sequences = sequences.map(s => s.reverse());
    }
    sequences[sequences.length - 1].push(0);
    for (let i = sequences.length - 2; i >= 0; i--) {
      sequences[i].push(
        sequences[i][sequences[i].length - 1] +
          sequences[i + 1][sequences[i + 1].length - 1] * (front ? -1 : 1),
      );
    }
    return sequences[0][sequences[0].length - 1];
  }

  parseInput(text) {
    return text.split("\n").map(line => line.split(" ").map(c => toInt(c)));
  }

  processPartA(input) {
    return input.reduce((p, c) => p + Day09.extrapolate(c), 0);
  }

  processPartB(input) {
    return input.reduce((p, c) => p + Day09.extrapolate(c, true), 0);
  }
}

module.exports = Day09;
