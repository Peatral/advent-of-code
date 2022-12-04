const {read_input_lines, sum, filter_invalid} = require("../utility")


// Functions
const parse_input = input => input == "A" ? 0 : input == "B" ? 1 : 2;

const parse_round_a = round => [
  parse_input(round.substr(0, 1)), 
  parse_input(round.substr(2, 1)
    .replace("X", "A")
    .replace("Y", "B")
    .replace("Z", "C"))
];

const parse_round_b = round => {
  var enemy = parse_input(round.substr(0, 1));
  var you_goal = round.substr(2, 1);
  var you;
  switch(you_goal) {
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

const score_round = round => (round[0] == round[1] ? 3 : round[0] == (round[1] + 2) % 3 ? 6 : 0) + round[1] + 1;

// Solver
const solve = (array, round_parser) => array
  .map(round_parser)
  .map(score_round)
  .reduce(sum)

// Program
var array = read_input_lines()
  .filter(filter_invalid);

console.log(solve(array, parse_round_a));
console.log(solve(array, parse_round_b));