const fs = require("fs");
const { readLines } = require("./utility");

const completedDays = [];
const erroredDays = [];

for (let day = 1; day <= 25; day++) {
  const path = "day_" + ("0" + day).slice(-2);
  if (fs.existsSync("src/" + path)) {
    console.log(`\x1b[1m\x1b[37m> Running day ${day} <\x1b[0m\n`);
    let lines = [];
    let partA, partB;
    try {
      lines = readLines(`src/${path}/input.txt`);
      ({ partA, partB } = require(`./${path}/task`));
    } catch (e) {
      console.log(`\x1b[1m\x1b[31m${e}\x1b[0m\n`);
      erroredDays.push(day);
      continue;
    }

    let error = false;
    try {
      console.log(
        `\x1b[1m\x1b[30m\x1b[42m Part A \x1b[0m\x1b[1m\x1b[37m ${partA(
          lines,
        )}\x1b[0m`,
      );
    } catch (e) {
      console.log(
        `\x1b[1m\x1b[37m\x1b[41m Part A \x1b[0m\x1b[1m\x1b[37m ${e}\x1b[0m`,
      );
      error = true;
    }

    try {
      console.log(
        `\x1b[1m\x1b[30m\x1b[42m Part B \x1b[0m\x1b[1m\x1b[37m ${partB(
          lines,
        )}\x1b[0m`,
      );
    } catch (e) {
      console.log(
        `\x1b[1m\x1b[37m\x1b[41m Part B \x1b[0m\x1b[1m\x1b[37m ${e}\x1b[0m`,
      );
      error = true;
    }

    if (error) {
      erroredDays.push(day);
    } else {
      completedDays.push(day);
    }
    console.log("\n");
  }
}

console.log(`\x1b[1m\x1b[37mCompleted Days:\x1b[0m ${completedDays.length}`);
console.log(`\x1b[1m\x1b[37mErrored Days:  \x1b[0m ${erroredDays.length}`);
console.log(
  `\x1b[1m\x1b[37mSkipped Days:  \x1b[0m ${
    25 - erroredDays.length - completedDays.length
  }\n\n`,
);
