const Task = require("../template/task");
const { vecNew, sum, range } = require("../utility");

class Day11 extends Task {
  parseInput(input) {
    return input.split("\n").map(line => line.split(""));
  }

  static getStars(input, expansion) {
    const stars = [];
    const emptyCols = [];
    for (let x = 0; x < input[0].length; x++) {
      let hasColGalaxy = false;
      for (let y = 0; y < input.length; y++) {
        if (input[y][x] == "#") {
          hasColGalaxy = true;
        }
      }
      if (!hasColGalaxy) {
        emptyCols.push(x);
      }
    }
    let expandedY = 0;
    for (let y = 0; y < input.length; y++) {
      let hasRowGalaxy = false;
      let expandedX = 0;
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == "#") {
          hasRowGalaxy = true;
          stars.push(vecNew(x + expandedX, y + expandedY));
        } else if (emptyCols.includes(x)) {
          expandedX += expansion - 1;
        }
      }
      if (!hasRowGalaxy) {
        expandedY += expansion - 1;
      }
    }
    return stars;
  }

  static countLengths(stars) {
    const pairs = [];
    let distances = 0;
    for (const starIdxA of range(0, stars.length)) {
      for (const starIdxB of range(0, stars.length)) {
        if (
          starIdxA == starIdxB ||
          pairs.find(([a, b]) => a == starIdxB && b == starIdxA)
        ) {
          continue;
        }
        pairs.push([starIdxA, starIdxB]);
        distances +=
          Math.abs(stars[starIdxB].x - stars[starIdxA].x) +
          Math.abs(stars[starIdxB].y - stars[starIdxA].y);
      }
    }
    return distances;
  }

  processPartA(input) {
    return Day11.countLengths(Day11.getStars(input, 2));
  }

  processPartB(input) {
    return Day11.countLengths(Day11.getStars(input, 1000000));
  }
}

module.exports = Day11;
