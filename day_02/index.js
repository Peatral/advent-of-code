const {readInputLines, sum, filterInvalid} = require("../utility")


// Functions
const parseInput = input => input == "A" ? 0 : input == "B" ? 1 : 2;

const parseRoundA = round => [
  parseInput(round.substr(0, 1)), 
  parseInput(round.substr(2, 1)
    .replace("X", "A")
    .replace("Y", "B")
    .replace("Z", "C"))
];

const parseRoundB = round => {
  var enemy = parseInput(round.substr(0, 1));
  var youGoal = round.substr(2, 1);
  var you;
  switch(youGoal) {
    case "X":
      you = (enemy + 2) % 3;
      break;
    case "Y":
      you = enemy;
      break;
    case "Z":
      you = (enemy + 1) % 3;
      break;
  }
  return [enemy, you];
}

const scoreRound = round => (round[0] == round[1] ? 3 : round[0] == (round[1] + 2) % 3 ? 6 : 0) + round[1] + 1;

// Solver
const solve = (array, roundParser) => array
  .map(roundParser)
  .map(scoreRound)
  .reduce(sum)

// Program
var array = readInputLines()
  .filter(filterInvalid);

console.log(solve(array, parseRoundA));
console.log(solve(array, parseRoundB));