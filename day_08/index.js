const {readInput, filterInvalid, max} = require("../utility");

const isBorder = (x, y) => y == 0 || x == 0 || y == 98 || x == 98;
const rotate90CW = map => map
  .reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), [])
  .map(row => row.reverse());

const applyValuesFromLeft = map => map.forEach((row, y) => row.forEach((tree, x) => {
  if (isBorder(x, y)) return;
  const rowSoFar = row.slice(0, x);

  if (rowSoFar.reduce((max, curr) => max >= curr.height ? max : curr.height, 0) < tree.height) 
    tree.visible = true;

  tree.scenicScore *= rowSoFar
    .reverse()
    .reduce((max, curr) => max.blocked ? max : {distance: max.distance + 1, blocked: curr.height >= tree.height}, {distance: 0, blocked: false})
    .distance;
}));


var rows = readInput().split("\n").filter(filterInvalid).map((row, y) => row.split("").map((tree, x) => ({
  height: tree,
  visible: isBorder(x, y),
  scenicScore: isBorder(x, y) ? 0 : 1
})));

for (var i = 0; i < 4; i++) {
  applyValuesFromLeft(rows);
  rows = rotate90CW(rows);
}

console.log(rows.flat().filter(tree => tree.visible).length);
console.log(rows.flat().map(tree => tree.scenicScore).reduce(max));