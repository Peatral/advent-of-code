const { sum, toInt, filterInvalid, range } = require("../utility");

function getWinsForCards(inputLines) {
  return inputLines
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
    .map(sides => sides[1].filter(number => sides[0].includes(number)).length);
}

function partA(inputLines) {
  return getWinsForCards(inputLines)
    .map(wins => (wins > 0 ? Math.pow(2, wins - 1) : 0))
    .reduce(sum, 0);
}

function partB(inputLines) {
  return getWinsForCards(inputLines)
    .map((wins, card) => range(card + 1, card + 1 + wins))
    .reduce((cardstack, newCards, i) => {
      newCards.forEach(n => {
        cardstack[n] += cardstack[i];
      });
      return cardstack;
    }, Array(inputLines.length).fill(1))
    .reduce(sum, 0);
}

module.exports = { partA, partB };
