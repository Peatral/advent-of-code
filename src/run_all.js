const fs = require("fs");
const { readLines, range } = require("./utility");

const days = [];
for (let day = 1; day <= 25; day++) {
  const path = "day_" + ("0" + day).slice(-2);
  if (fs.existsSync("src/" + path)) {
    console.log(`\x1b[1m\x1b[37m> Running day ${day} <\x1b[0m\n`);

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

    console.log("\n");

    days.push(day);
  }
}

console.log(`\x1b[1m\x1b[37mTotal Days executed:    \x1b[0m ${days.length}`);
console.log(
  `\x1b[1m\x1b[37mTotal Days not executed:\x1b[0m ${25 - days.length}`,
);
