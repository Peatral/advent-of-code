const {read_input_lines, sum, filter_invalid} = require("../utility")

// Functions
const rucksack_to_compartments = rucksack => [rucksack.slice(0, Math.floor(rucksack.length/2)), rucksack.slice(Math.floor(rucksack.length/2))];
const array_chunker = (all, one, idx, size) => {
  all[Math.floor(idx / size)] = [].concat((all[Math.floor(idx / size)] || []), one);
  return all; 
};
const remove_duplicates_from_string = string => [...new Set(string.split(""))].join("");
const find_duplicates = (array, amount) => array
  .join("")
  .split("")
  .sort()
  .join("")
  .match(new RegExp(`(.)\\1{${amount - 1}}`))[1];
const apply_prios = char => "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char);

// Solver
const solve = (array, dupl) => array
  .map(chunks => chunks.map(remove_duplicates_from_string))
  .map(arr => find_duplicates(arr, dupl))
  .map(apply_prios)
  .reduce(sum, 0);

// Program
var array = read_input_lines()
  .filter(filter_invalid);

console.log(solve(array.map(rucksack_to_compartments), 2));
console.log(solve(array.reduce((all, one, idx) => array_chunker(all, one, idx, 3), []), 3));