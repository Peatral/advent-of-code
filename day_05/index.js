const {readInput, filterInvalid} = require("../utility")

const performInstruction = (cargo, amount, from, to, together) => {
  var stackTop = cargo[from].slice(0, amount);
  const stackBottom = cargo[from].slice(amount);
  if (together) stackTop = stackTop.reverse();
  cargo[from] = stackBottom;
  cargo[to] = cargo[to].reverse();
  cargo[to].push(...stackTop);
  cargo[to] = cargo[to].reverse();
};


var [stackInput, instructions] = readInput()
  .split("\n\n")
  .map(section => section.split("\n"));

const stacksA = stackInput
  .slice(0, -1)
  .map(line => [...line].filter((_, idx) => idx % 4 == 1))
  .reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), [])
  .map(stack => stack.filter(c => c != " "));

const stacksB = stacksA.map(stack => [...stack]);

instructions
  .filter(filterInvalid)
  .map(line => line.split(" "))
  .map(line => [line[1] - 0, line[3] - 1, line[5] - 1])
  .forEach(instruction => 
    performInstruction(stacksA, ...instruction, false) && 
    performInstruction(stacksB, ...instruction, true));

console.log(
  stacksA.map(stack => stack[0]).join("") + "\n" + 
  stacksB.map(stack => stack[0]).join("")
);

/**
 * Tody this works as follows:
 * - parse cargo
 * - parse instructions
 * - run instructions twice (for each part once)
 * - print result
 * 
 * As I've shortened the cargo parsing for fun, it became quite unreadable.
 * A breakdown is due.
 * 1. slice(0, -1) - takes the array without the last element to remove the stack indicator
 * 2. takes each line and turn it into an array with the value of each stack.
 *    This is done by filtering out any characters that aren't in the second position of a 3 character block
 * 3. Transposition: https://stackoverflow.com/a/41772644, obviously this isn't by me lol, haven't understood
 *    .reduce enough to do this
 * 4. filter out any empty values of each stack
 * 
 * Each stack has its top at index zero.
 * The instruction parsing is straightforward, I won't explain it here.
 * 
 * Each instruction is performed the following way:
 * - reverse the stack to put stuff on
 * - append the values to the end
 * - reverse the stack back. Now the stack is in its right order, the added values in front and reversed 
 *   (if they weren't reversed beforehand because they were moved together)
 */