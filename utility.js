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