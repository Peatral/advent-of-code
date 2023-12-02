const fs = require("fs");
const { readLines } = require("./utility");

const executed_days = [];
const errored_days = [];

for (let day = 1; day <= 25; day++) {
  const path = "day_" + ("0" + day).slice(-2);
  if (fs.existsSync("src/" + path)) {
    console.log(`\x1b[1m\x1b[37m> Running day ${day} <\x1b[0m\n`);
    try {
      const { partA, partB } = require(`./${path}/task`);

      console.log(
        `\x1b[1m\x1b[30m\x1b[42m Part A \x1b[0m\x1b[1m\x1b[37m ${partA(
          readLines(`src/${path}/input.txt`),
        )}\x1b[0m`,
      );
      console.log(
        `\x1b[1m\x1b[30m\x1b[42m Part B \x1b[0m\x1b[1m\x1b[37m ${partB(
          readLines(`src/${path}/input.txt`),
        )}\x1b[0m`,
      );

      executed_days.push(day);
    } catch (e) {
      console.log(`\x1b[1m\x1b[31mError while executing...\x1b[0m`);
      errored_days.push(day);
    }
    console.log("\n");
  }
}

console.log(`\x1b[1m\x1b[37mExecuted Days:\x1b[0m ${executed_days.length}`);
console.log(`\x1b[1m\x1b[37mErrored Days: \x1b[0m ${errored_days.length}`);
console.log(
  `\x1b[1m\x1b[37mSkipped Days: \x1b[0m ${
    25 - errored_days.length - executed_days.length
  }\n\n`,
);
