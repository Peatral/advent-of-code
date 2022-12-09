const {readInputLines} = require("../utility");

const parseDirection = direction => {
  switch(direction) {
    case "U":
      return {x: 0, y: -1};
    case "D":
      return {x: 0, y: 1};
    case "L":
      return {x: -1, y: 0};
    case "R":
      return {x: 1, y: 0};
  }
}

const vecAdd = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
const vecSub = (a, b) => ({x: a.x - b.x, y: a.y - b.y});
const vecEqual = (a, b) => a.x == b.x && a.y == b.y;
const vecLength = a => Math.sqrt(a.x * a.x + a.y * a.y);
const vecNormalized = a => ({x: a.x / vecLength(a), y: a.y / vecLength(a)});

const addPosToList = (list, pos) => {
  if (list.filter(p => vecEqual(p, pos)).length == 0) {
    list.push(pos);
  }
}

const simulateMove = (parent, child, direction) => {
  const preDiff = vecSub(parent.pos, child.pos);
  const postDiff = vecSub(vecAdd(parent.pos, direction), child.pos);
  
  // Parent stays in range, no move
  if (Math.abs(postDiff.x) <= 1 && Math.abs(postDiff.y) <= 1) {
    return [direction, {x: 0, y: 0}];
  }
  
  // Parent moves in the same direction as they are oriented to each other
  if (vecEqual(preDiff, direction)) {
    return [direction, direction];
  }

  // Parent and child are diagonally adjacent, parent moves away
  // Child goes to prev parent location
  if (Math.abs(preDiff.x) == 1 && Math.abs(preDiff.y) == 1) {
    // Parent moves onto an axis, child can directly follow instead of diagonally
    if (Math.abs(direction.x) == 1 && Math.abs(direction.y) == 1) {
      return [direction, vecNormalized(postDiff)]
    }
    return [direction, preDiff];
  }

  // Parent moves diagonally and directly adjacent beforehand
  if (Math.abs(direction.x) == 1 && Math.abs(direction.y) == 1 
    && (preDiff.x == 0 && Math.abs(preDiff.y) == 1 || Math.abs(preDiff.x) == 1 && preDiff.y == 0)) {
    return [direction, direction];
  }

  console.log("illegal")
  return [{x: 0, y: 0}, {x: 0, y: 0}]; 
}

const moveRope = (rope, directionInput, amount, tailTracker) => {
  const moveDirection = parseDirection(directionInput);
  addPosToList(tailTracker, rope.at(-1).pos);

  for (var moveIdx = 0; moveIdx < amount; moveIdx++) {
    var lastChildMove = moveDirection;
    for (var knotIdx = 0; knotIdx < rope.length - 1; knotIdx++) {
      const parent = rope[knotIdx];
      const child = rope[knotIdx + 1];
      const [parentMove, childMove] = simulateMove(parent, child, lastChildMove);
      parent.pos = vecAdd(parent.pos, parentMove);
      lastChildMove = childMove;
    }
    const tail = rope[rope.length - 1];
    tail.pos = vecAdd(tail.pos, lastChildMove);
    addPosToList(tailTracker, tail.pos);
  }
}


const steps = readInputLines()
  .map(line => line.split(" "))
  .map(input => [input[0], parseInt(input[1])]);

const ropeA = Array(2).fill(0).map(_ => ({pos: {x: 0, y: 0}}));
const ropeB = Array(10).fill(0).map(_ => ({pos: {x: 0, y: 0}}));
const trackerA = [];
const trackerB = [];

steps.forEach(step => moveRope(ropeA, ...step, trackerA));
console.log(trackerA.length);
steps.forEach(step => moveRope(ropeB, ...step, trackerB));
console.log(trackerB.length);
