const Task = require("../template/task");
const { toInt } = require("../utility");
const { Hand, CardOrder } = require("./hand");

class Day07 extends Task {
  static evaluateBets(groups) {
    return groups
      .toSorted(([handA, betA], [handB, betB]) => handA.compareTo(handB))
      .map(([hand, bet]) => bet)
      .reduce((total, bet, rank) => total + bet * (rank + 1), 0);
  }

  parseInput(text) {
    return text.split("\n").map(line => line.split(" "));
  }

  processPartA(input) {
    return Day07.evaluateBets(
      input.map(g => [new Hand(g[0], CardOrder.CARD_ORDER_A), toInt(g[1])]),
    );
  }

  processPartB(input) {
    return Day07.evaluateBets(
      input.map(g => [
        new Hand(g[0], CardOrder.CARD_ORDER_B).promoteTypeWithJokerSimple(),
        toInt(g[1]),
      ]),
    );
  }
}

module.exports = Day07;
