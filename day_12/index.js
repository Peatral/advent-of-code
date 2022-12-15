const {readInputLines, filterInvalid} = require("../utility");

const getValidPaths = (x, y, map) => [
    {x: x, y: y + 1}, 
    {x: x + 1, y: y}, 
    {x: x, y: y - 1}, 
    {x: x - 1, y: y}
  ]
  .filter(pos => pos.x >= 0 && pos.x < map[0].length && pos.y >= 0 && pos.y < map.length)
  .map(pos => ({valid: map[y][x] - map[pos.y][pos.x] <= 1, ...pos}))
  .filter(tile => tile.valid)
  .map(tile => ({x: tile.x, y: tile.y}));

const getTileIcon = (x, y, path, tracker, start, end, showParents) => path.reduce((prev, curr) => prev || curr.x == x && curr.y == y, false) || showParents ? (
    start.x == x && start.y == y ? "S" :
    end.x == x && end.y == y ? "E" :
    tracker[y][x].parent == undefined ? "#" :
    tracker[y][x].parent.x - x == 1 ? ">" :
    tracker[y][x].parent.x - x == -1 ? "<" :
    tracker[y][x].parent.y - y == 1 ? "v" :
    tracker[y][x].parent.y - y == -1 ? "^" :
    "#"
  ) : ".";

const solve = (tracker, map, start, end, partOne, visualize = false, showParents = false) => {
  var pathFindingQueue = []
  pathFindingQueue.push(start);
  
  var location;
  while (pathFindingQueue.length > 0) {
    location = pathFindingQueue.shift();
    if (location.x == end.x && location.y == end.y && partOne)
      break;
    if (map[location.y][location.x] == 0 && !partOne) {
      end = location;
      break;
    }
    tracker[location.y][location.x].visited = true;
    getValidPaths(location.x, location.y, map)
      .filter(loc => !tracker[loc.y][loc.x].visited)
      .filter(loc => !pathFindingQueue.reduce((prev, curr) => prev || curr.x == loc.x && curr.y == loc.y, false))
      .forEach(neighbor => {
        tracker[neighbor.y][neighbor.x].parent = location;
        pathFindingQueue.push(neighbor);
      });
  }
  var path = [end];
  var last = end;
  while (last.x != start.x || last.y != start.y) {
    last = tracker[last.y][last.x].parent;
    path.push(last);
  }
  console.log(path.length - 1);

  if (visualize)
    console.log(map.map((row, y) => row.map((_, x) => getTileIcon(x, y, path, tracker, end, start, showParents)).join("")).join("\n"))
}

// Program

const map = readInputLines()
  .filter(filterInvalid)
  .map(line => line
    .split("")
    .map(height => height.charCodeAt(0) - 97));

var end = {x: map.flat().indexOf(-14) % 80, y: Math.floor(map.flat().indexOf(-14) / 80)}
const start = {x: map.flat().indexOf(-28) % 80, y: Math.floor(map.flat().indexOf(-28) / 80)}
map[start.y][start.x] = 25;
map[end.y][end.x] = 0;

const trackerA = map.map(row => row.map(_ => ({visited: false, parent: undefined, cost: 0})));
const trackerB = map.map(row => row.map(_ => ({visited: false, parent: undefined, cost: 0})));

/**
 * Final path can be visualized by passing an additional true as the last parameter.
 * When passing an additional true you can visualize all parents / tiles visited by the BFS
 */

solve(trackerA, map, start, end, true);
solve(trackerB, map, start, end, false);
