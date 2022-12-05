const {read_input, filter_invalid, array_chunker} = require("../utility")

const input_segments = read_input()
  .split("\n\n");


var stacks_input = input_segments[0]
  .split("\n");
  stacks_input = stacks_input
  .slice(0, stacks_input.length - 1)
  .map(line => line
    .split("")
    .reduce((all, one, idx) => array_chunker(all, one, idx, 4), [])
    .map(row => row[1])
    .map(row => row == " " ? null : row));
var stacks = Array(stacks_input[0].length)
  .fill(null)
  .map((_, col) => Array(stacks_input.length)
    .fill(null)
    .map((_, row) => stacks_input[row][col])
    .filter(filter_invalid));

const stacks_backup = stacks.map(stack => [...stack]);

const instructions = input_segments[1]
  .split("\n")
  .filter(filter_invalid)
  .map(line => line.split(" "))
  .map(line => [parseInt(line[1]), parseInt(line[3]) - 1, parseInt(line[5]) - 1]);


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

instructions.forEach(instruction => perform_instruction(instruction[0], instruction[1], instruction[2], false));
console.log(stacks.map(stack => stack[0]).join(""));

stacks = stacks_backup;

instructions.forEach(instruction => perform_instruction(instruction[0], instruction[1], instruction[2], true));
console.log(stacks.map(stack => stack[0]).join(""));