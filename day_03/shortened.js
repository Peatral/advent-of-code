const fs = require("fs");
const solve = (array, amount) => array.map(arr => arr.map(string => [...new Set(string.split(""))].join(""))).map(arr => arr.join("").split("").sort().join("").match(new RegExp(`(.)\\1{${amount - 1}}`))[1]).map(char => "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char)).reduce((a, b) => a + b, 0);
console.log(solve(fs.readFileSync("input.txt").toString().split("\n").filter(val => val).map(rucksack => [rucksack.slice(0, Math.floor(rucksack.length/2)), rucksack.slice(Math.floor(rucksack.length/2))]), 2));
console.log(solve(fs.readFileSync("input.txt").toString().split("\n").filter(val => val).reduce((all, one, idx) => {
  all[Math.floor(idx / 3)] = [].concat((all[Math.floor(idx / 3)] || []), one);
  return all; 
}, []), 3));