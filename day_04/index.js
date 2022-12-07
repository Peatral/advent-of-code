const {readInputLines, range, toInt, filterInvalid} = require("../utility")

var array = readInputLines()
  .filter(filterInvalid)
  .map(pair => pair
    .split(",")
    .map(elf => elf
      .split("-")
      .map(toInt))
    .map(array => range(array[0], array[1] + 1)));

console.log(array
  .map(pair => pair.sort((a, b) => a.length - b.length))
  .filter(pair => pair[0].filter(section => !pair[1].includes(section)).length == 0)
  .length);

console.log(array
  .map(pair => pair[0].concat(pair[1]))
  .filter(pair => pair.length > new Set(pair).size)
  .length);


/**
 * Concerning Pre-Processing:
 * Parse out pairs
 * Expand ranges to an array holding all included sections
 * 
 * Concerning Part One:
 * Sort each pair ascending by size
 * See if the first one is fully included in the second one
 * 
 * Concerning Part Two:
 * Concat all sections of a pair
 * See if the list is larger than a set of the list 
 * (When having overlap, the set should be smaller)
 */
