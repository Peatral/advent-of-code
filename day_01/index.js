const {read_input_lines, sum, sort_desc, to_int, max, filter_invalid} = require("../utility")

var array = read_input_lines()
  .join("-")
  .replaceAll("--", " ")
  .split(" ")
  .map(elem => elem
    .split("-")
    .filter(filter_invalid)
    .map(to_int)
    .reduce(sum, 0));

console.log(array.reduce(max));

console.log(array
  .sort(sort_desc)
  .slice(0, 3)
  .reduce(sum, 0));