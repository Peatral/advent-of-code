/**
 * This file houses a few shorthands for useful lambdas I can use to operate on arrays 
 */

const fs = require("fs");

exports.readFile = name => fs.readFileSync(name).toString();
exports.readInput = () => this.readFile("input.txt");
exports.readInputLines = () => this.readInput().split("\n");
exports.sum = (a, b) => a + b;
exports.diff = (a, b) => a - b;
exports.sortAsc = (a, b) => a - b;
exports.sortDesc = (a, b) => b - a;
exports.toInt = a => parseInt(a);
exports.min = (a, b) => Math.min(a, b);
exports.max = (a, b) => Math.max(a, b);
exports.filterInvalid = val => val;
exports.range = (start, end) => Array(end - start).fill(start).map((s, idx) => s + idx);
exports.arrayChunker = (all, one, idx, size) => {
  all[Math.floor(idx / size)] = [].concat((all[Math.floor(idx / size)] || []), one);
  return all; 
};

exports.vecFromList = list => ({x: list[0], y: list[1]});
exports.vecAdd = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
exports.vecSub = (a, b) => ({x: a.x - b.x, y: a.y - b.y});
exports.vecEqual = (a, b) => a.x == b.x && a.y == b.y;
exports.vecLength = a => Math.sqrt(a.x * a.x + a.y * a.y);
exports.vecNormalized = a => ({x: a.x / this.vecLength(a), y: a.y / this.vecLength(a)});
exports.manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);