const Task = require("../template/task");
const PipeMap = require("./map");

class Day10 extends Task {
  parseInput(text) {
    return text.split("\n").map(line => line.split(""));
  }

  processPartA(input) {
    return new PipeMap(input).findGreatestDistance();
  }

  processPartB(input) {
    return new PipeMap(input).findEnclosedTiles();
  }
}

module.exports = Day10;
