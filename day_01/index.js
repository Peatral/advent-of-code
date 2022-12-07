const {readInput, sum, sortDesc, toInt, max, filterInvalid} = require("../utility")

var array = readInput()
  .split("\n\n")
  .map(elem => elem
    .split("\n")
    .filter(filterInvalid)
    .map(toInt)
    .reduce(sum, 0));

console.log(array.reduce(max));

console.log(array
  .sort(sortDesc)
  .slice(0, 3)
  .reduce(sum, 0));