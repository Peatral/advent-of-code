const {readInputLines, filterInvalid} = require("../utility");

const intersectLine = (pos, line) => 
  (line.a.y == line.b.y && line.a.y == pos.y && (line.a.x <= pos.x && line.b.x >= pos.x || line.b.x <= pos.x && line.a.x >= pos.x)) ||
  (line.a.x == line.b.x && line.a.x == pos.x && (line.a.y <= pos.y && line.b.y >= pos.y || line.b.y <= pos.y && line.a.y >= pos.y));
const intersectPoint = (pos, point) => point.x == pos.x && point.y == pos.y;

const intersectLines = (pos, lines) => lines.filter(line => intersectLine(pos, line)).length > 0;
const intersectPoints = (pos, points) => {
  for (var idx = 0; idx < points.length; idx++) {
    if (intersectPoint(points[idx], pos)) {
      return true;
    }
  }
  return false;
}
const existsIntersection = (pos, lines, points) => intersectLines(pos, lines) || intersectPoints(pos, points);

const vecAdd = (a, b) => ({x: a.x + b.x, y: a.y + b.y});

const canPerformMove = (pos, move, lines, points) => !existsIntersection(vecAdd(pos, move), lines, points);
const performMove = (pos, move) => vecAdd(pos, move);


const getBoardToPrint = (lb, ub, lines, points) => {
  var row = "";
  var boardVisualizer = [];

  for (var x = ub.x; x < lb.x; x++) {
    row += "\x1b[37m#";
  }
  boardVisualizer.push(row);
  row = "";

  for (var y = ub.y; y < lb.y; y++) {
    for (var x = ub.x; x < lb.x; x++) {
      row += 
        intersectPoints({x: x, y: y}, points) ? "\x1b[31mo" : 
        intersectLines({x: x, y: y}, lines) ? "\x1b[37m#" : 
        "\x1b[90m.";
    }
    boardVisualizer.push(row);
    row = "";
  }
  return boardVisualizer.join("\n");
}


const solve = (partOne, visualize) => {

  const moveLeft = {x: -1, y: 1};
  const moveDown = {x: 0, y: 1};
  const moveRight = {x: 1, y: 1};

  var walls = [];
  var sand = [];

  readInputLines()
    .filter(filterInvalid)
    .map(line => line.split(" -> ").map(vec => vec.split(",").map(val => val * 1)).map(vec => ({x: vec[0], y: vec[1]})))
    .forEach(line => line.slice(0, -1).forEach((val, idx) => walls.push({a: val, b: line[idx + 1]})))

  var lowerBounds = walls.flatMap(line => [line.a, line.b]).reduce((prev, curr) => ({x: Math.max(prev.x, curr.x), y: Math.max(prev.y, curr.y)}));
  var upperBounds = walls.flatMap(line => [line.a, line.b]).reduce((prev, curr) => ({x: Math.min(prev.x, curr.x), y: 0}));
  const floorY = lowerBounds.y + 2;

  var simulationRuns = true;
  while (simulationRuns) {
    var grain = {x: 500, y: 0};

    if (existsIntersection(grain, walls, sand)) {
      simulationRuns = false;
      break;
    }


    if (visualize && sand.length % 5000 == 0) {
      console.log(getBoardToPrint(lowerBounds, upperBounds, walls, sand));
    }
    

    var canFall = true;
    while (canFall) {
      if (grain.y > floorY) {
        simulationRuns = false;
        break;
      }
      const wallsToCheck = partOne ? walls : walls.concat({a: {x: grain.x - 1, y: floorY}, b: {x: grain.x + 1, y: floorY}});
      var canMoveLeft = canPerformMove(grain, moveLeft, wallsToCheck, sand);
      var canMoveDown = canPerformMove(grain, moveDown, wallsToCheck, sand);
      var canMoveRight = canPerformMove(grain, moveRight, wallsToCheck, sand);
      if (!canMoveLeft && !canMoveDown && !canMoveRight) {
        canFall = false;
        break;
      }
      if (canMoveDown) {
        grain = performMove(grain, moveDown);
        continue;
      }
      if (canMoveLeft) {
        grain = performMove(grain, moveLeft);
        continue;
      }
      if (canMoveRight) {
        grain = performMove(grain, moveRight);
        continue;
      }
    }
    if (simulationRuns) {
      sand.push(grain);
    }
  }
  if (visualize)
    console.log(getBoardToPrint(lowerBounds, upperBounds, walls, sand));
  return sand.length;
}

console.log(solve(true, false));
console.log(solve(false, false));