const Task = require("../template/task");

class Day08 extends Task {
  parseInput(text) {
    const blocks = text.split("\n\n");
    return [
      blocks[0].split(""),
      blocks[1].split("\n").reduce((p, c) => {
        p[c.substring(0, 3)] = {
          L: c.substring(7, 10),
          R: c.substring(12, 15),
        };
        return p;
      }, {}),
    ];
  }

  static getStepsForPath(directions, graph, start, possibleEnds) {
    let current = start;
    let steps = 0;
    while (!possibleEnds.includes(current)) {
      current = graph[current][directions[steps % directions.length]];
      steps++;
    }
    return steps;
  }

  static gcd(a, b) {
    return !b ? a : Day08.gcd(b, a % b);
  }

  static lcm(a, b) {
    return (a * b) / Day08.gcd(a, b);
  }

  static leastCommonMultiple(numbers) {
    const sorted = numbers.toSorted((a, b) => a - b);
    return sorted.reduce((p, c) => Day08.lcm(p, c), sorted[0]);
  }

  processPartA(input) {
    return Day08.getStepsForPath(input[0], input[1], "AAA", ["ZZZ"]);
  }

  /**
   * Okay, I feel I have to say something about this.
   * 1. It is absolutely not clear from the instructions that every path is unique.
   * 2. It is also not clear that every path returns to its start after finishing and perfectly repeats itself.
   *
   * I for my part thought of this exact solution, but discarded it as I assumed the two statements above
   * were not true, as nothing like this was mentioned in the instructions.
   *
   * One could argue that the example showed these exact two things, that they perfectly loop and that the
   * use unique paths, but I can only say the example uses "LR" as its instructions which is not the same
   * to the human brain as a string of 283 characters.
   *
   * Together with the whole story surrounding it I would not think that that the paths would loop around,
   * the end being next to the start wouldn't really make any sense.
   *
   * I think it could have been worded better than this.
   *
   * @param {*} input Array containing the list of directions and the graph as a map
   * @returns The number of steps it takes until every loop lands on a node that ends with "Z"
   */
  processPartB(input) {
    const [directions, graph] = input;
    const starts = Object.keys(graph).filter(key => key.endsWith("A"));
    const ends = Object.keys(graph).filter(key => key.endsWith("Z"));
    const stepsPerPath = starts.map(k =>
      Day08.getStepsForPath(directions, graph, k, ends),
    );
    return Day08.leastCommonMultiple(stepsPerPath);
  }
}

module.exports = Day08;
