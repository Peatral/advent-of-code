const Task = require("../template/task");
const { sum, toInt, filterInvalid, range } = require("../utility");

class Day04 extends Task {
  parseInput(text) {
    return super
      .parseInput(text)
      .map(line =>
        line
          .replace(/^Card\s+[0-9]+: /, "")
          .split(" | ")
          .map(side =>
            side
              .split(" ")
              .filter(filterInvalid)
              .map(number => toInt(number)),
          ),
      )
      .map(
        sides => sides[1].filter(number => sides[0].includes(number)).length,
      );
  }

  processPartA(input) {
    return input
      .map(wins => (wins > 0 ? Math.pow(2, wins - 1) : 0))
      .reduce(sum, 0);
  }

  processPartB(input) {
    return input
      .map((wins, card) => range(card + 1, card + 1 + wins))
      .reduce((cardstack, newCards, i) => {
        newCards.forEach(n => {
          cardstack[n] += cardstack[i];
        });
        return cardstack;
      }, Array(input.length).fill(1))
      .reduce(sum, 0);
  }
}

module.exports = Day04;
