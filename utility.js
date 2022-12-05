/**
 * This file houses a few shorthands for useful lambdas I can use to operate on arrays 
 */

const fs = require("fs");

exports.read_input = () => fs.readFileSync("input.txt").toString();
exports.read_input_lines = () => fs.readFileSync("input.txt").toString().split("\n");
exports.sum = (a, b) => a + b;
exports.diff = (a, b) => a - b;
exports.sort_asc = (a, b) => a - b;
exports.sort_desc = (a, b) => b - a;
exports.to_int = a => parseInt(a);
exports.min = (a, b) => Math.min(a, b);
exports.max = (a, b) => Math.max(a, b);
exports.filter_invalid = val => val;
exports.range = (start, end) => Array(end - start).fill(start).map((s, idx) => s + idx);
exports.array_chunker = (all, one, idx, size) => {
  all[Math.floor(idx / size)] = [].concat((all[Math.floor(idx / size)] || []), one);
  return all; 
};