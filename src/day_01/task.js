const { isNumber, sum, toInt, reverse } = require("../utility");

function partA(inputLines) {
  return inputLines
    .map(l => l
      .split("")
      .filter(isNumber))
    .map(l => [l[0], l[l.length-1]].join(""))
    .map(toInt)
    .reduce(sum, 0);
}


function partB(inputLines) {
  const literalNumerals = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ]
  const reverseLiteralNumerals = literalNumerals.map(reverse);

  const findFirstLiteral = (line, literals) => {
    var str = "";
    for (let d of line.split("")) {
      if (isNumber(d)) {
        return d;
      }
      str += d;
      let i = 0;
      for (let num of literals) {
        if (str.includes(num)) {
          return `${i}`;
        }
        i++;
      }
    }
    return "";
  }

  return inputLines.map(l => {
    const firstLiteral = findFirstLiteral(l, literalNumerals);
    const lastLiteral = findFirstLiteral(reverse(l), reverseLiteralNumerals);

    return toInt([firstLiteral, lastLiteral].join(""));
  })
    .reduce(sum, 0);
}

module.exports = { partA, partB };