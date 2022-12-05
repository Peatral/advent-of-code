const {read_input, filter_invalid} = require("../utility")

var stack_input, instructions;
[stack_input, instructions] = read_input()
  .split("\n\n")
  .map(section => section.split("\n"));


stack_input = stack_input
  .slice(0, stack_input.length - 1)
  .map(line => [...line].filter((_, idx) => idx % 4 == 1));
var stacks = stack_input[0]
  .map((_, col) => stack_input
    .map(row => row[col])
    .filter(char => char != " "));

const stacks_backup = stacks.map(stack => [...stack]);


instructions = instructions
  .filter(filter_invalid)
  .map(line => line.split(" "))
  .map(line => [line[1] - 0, line[3] - 1, line[5] - 1]);

const perform_instruction = (amount, from, to, together) => {
  var stack_top = stacks[from].slice(0, amount);
  const stack_bottom = stacks[from].slice(amount);
  if (together)
    stack_top = stack_top.reverse();

  stacks[from] = stack_bottom;
  stacks[to] = stacks[to].reverse();
  stacks[to].push(...stack_top);
  stacks[to] = stacks[to].reverse();
};

instructions.forEach(instruction => perform_instruction(...instruction, false));
console.log(stacks.map(stack => stack[0]).join(""));

stacks = stacks_backup;

instructions.forEach(instruction => perform_instruction(...instruction, true));
console.log(stacks.map(stack => stack[0]).join(""));