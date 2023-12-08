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

  processPartA(input) {
    const [directions, graph] = input;
    let current = "AAA";
    let steps = 0;
    while (current != "ZZZ") {
      current = graph[current][directions[steps % directions.length]];
      steps++;
    }
    return steps;
  }

  processPartB(input) {
    const [directions, graph] = input;
    let current = Object.keys(graph).filter(key => key.endsWith("A"));
    let steps = 0;
    while (!current.every(key => key.endsWith("Z"))) {
      current = current.map(
        node => graph[node][directions[steps++ % directions.length]],
      );
    }
    return steps;
  }
}

module.exports = Day08;
