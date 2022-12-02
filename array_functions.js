/**
 * This file houses a few shorthands for useful lambdas I can use to operate on arrays 
 */

const fs = require("fs");

exports.read_input_lines = () => fs.readFileSync("input.txt").toString().split("\n")
exports.sum = (a, b) => a + b;
exports.diff = (a, b) => a - b;
exports.sort_asc = (a, b) => a - b;
exports.sort_desc = (a, b) => b - a;
exports.to_int = a => parseInt(a);
exports.min = (a, b) => Math.min(a, b);
exports.max = (a, b) => Math.max(a, b);
exports.filter_invalid = val => val