const {readInputLines, filterInvalid} = require("../utility");

const additions = readInputLines()
  .filter(filterInvalid)
  .map(line => line.split(" "))
  .map(line => line.length == 2 ? [0, parseInt(line[1])] : [0])
  .flat();

var x = 1;
var counter = 0;
var image = "";

additions.forEach((val, idx) => {
  const cycle = idx + 1;
  const cursorPos = idx % 40;

  image += 
    (Math.abs(cursorPos - x) <= 1 ? "#" : ".") + 
    (cursorPos == 39 && Math.floor(idx / 40) != 5 ? "\n" : "");
  
  if ([20, 60, 100, 140, 180, 220].includes(cycle))
    counter += cycle * x;
  
  x += val;
});

console.log(counter);
console.log(image);