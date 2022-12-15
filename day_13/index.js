const {readInput, readFile, filterInvalid, sum} = require("../utility");



const comparePairs = (a, b) => a.length == 0 && b.length > 0 || a.reduce((prev, left, idx) => {
  if (prev === true) {
    return true;
  }
  if (prev === false) {
    return false;
  }

  const right = b[idx];

  if (right === undefined) {
    return false;
  }

  var comp;

  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) {
      comp = true;
    } else if (left > right) {
      comp = false;
    }
  } else if (Number.isInteger(left) && Array.isArray(right)) {
    comp = comparePairs([left], right);
  } else if (Array.isArray(left) && Number.isInteger(right)) {
    comp = comparePairs(left, [right]);
  } else if (Array.isArray(left) && Array.isArray(right)) {
    comp = comparePairs(left, right);
  }

  if (a.length < b.length && idx == a.length - 1 && comp === undefined) {
    return true;
  }
  
  if (a.length > b.length && idx == b.length - 1 && comp === undefined) {
    return false;
  }
  
  return comp;

}, undefined);

const comparePairsSortable = (a, b) => {
  const res = comparePairs(a, b);
  if (res === true) {
    return -1;
  }
  if (res === false) {
    return 1;
  }
  if (res === undefined) {
    return 0;
  }
  return 0;
}

const findDividerPacket = (arr, val) => arr.reduce((prev, curr, idx) => prev != -1 ? prev : (curr.length == 1 && Array.isArray(curr[0]) && curr[0].length == 1 && curr[0][0] == val ? idx + 1 : -1), -1)

const pairs = readInput()
  .split("\n\n")
  .map(pair => pair
    .split("\n")
    .filter(filterInvalid)
    .map(line => JSON.parse(line)));


console.log(pairs.map((pair, idx) => comparePairs(...pair) ? idx + 1 : 0).reduce(sum, 0));
const sorted = pairs
  .flat()
  .concat([[[2]], [[6]]])
  .sort((a, b) => comparePairsSortable(a, b));
console.log(findDividerPacket(sorted, 2) * findDividerPacket(sorted, 6));