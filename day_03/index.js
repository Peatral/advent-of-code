const {readInputLines, sum, filterInvalid, arrayChunker} = require("../utility")

// Functions
const rucksackToCompartments = rucksack => [rucksack.slice(0, Math.floor(rucksack.length/2)), rucksack.slice(Math.floor(rucksack.length/2))];
const removeDuplicatesFromString = string => [...new Set(string.split(""))].join("");
const findDuplicates = (array, amount) => array
  .join("")
  .split("")
  .sort()
  .join("")
  .match(new RegExp(`(.)\\1{${amount - 1}}`))[1];
const applyPrios = char => "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char);

// Solver
const solve = (array, dupl) => array
  .map(chunks => chunks.map(removeDuplicatesFromString))
  .map(arr => findDuplicates(arr, dupl))
  .map(applyPrios)
  .reduce(sum, 0);

// Program
var array = readInputLines()
  .filter(filterInvalid);

console.log(solve(array.map(rucksackToCompartments), 2));
console.log(solve(array.reduce((all, one, idx) => arrayChunker(all, one, idx, 3), []), 3));