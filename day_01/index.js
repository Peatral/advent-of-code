const {read_input_lines, sum, sort_desc, to_int, max, filter_invalid} = require("../array_functions")

var array = read_input_lines()
  .join("-")
  .replaceAll("--", " ")
  .split(" ")
  .map(elem => elem.split("-"))
  .map(elem => elem.filter(filter_invalid))
  .map(elem => elem.map(to_int))
  .map(elem => elem.reduce(sum, 0));

console.log(array.reduce(max));

console.log(array
  .sort(sort_desc)
  .slice(0, 3)
  .reduce(sum, 0));