const fs = require("fs");
const { readLines } = require("./utility");

for (let day = 1; day <= 25; day++) {
  const path = "day_" + ("0" + day).slice(-2);
  if (fs.existsSync("src/" + path)) {
    console.log(`Day ${day}`);

    const { partA, partB } = require(`./${path}/task`);

    console.log("Part A");
    console.log(partA(readLines(`src/${path}/input.txt`)));
    console.log("\nPart B");
    console.log(partB(readLines(`src/${path}/input.txt`)));

    console.log("\n");
  }
}
