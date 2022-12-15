const {readFile, sortDesc} = require("../utility");

const performMonkey = (monkey, monkeys, divideByThree, commonDiv) => {
  if (monkey.items.length <= 0)
    return;
  for (var _ in monkey.items) {
    var old = monkey.items[0];
    monkey.items = monkey.items.slice(1);
    old = eval(monkey.operation);
    if (divideByThree) {
      old = Math.floor(old / 3);
    } else {
      old %= commonDiv;
    }
    monkeys[old % monkey.divisor == 0 > 0 ? monkey.trueMonkey : monkey.falseMonkey].items.push(old);
    monkey.inspectedItems += 1;
  }
}

const solve = partOne => {
  const inputMonkeys = readFile("input.txt")
    .split("\n\n")
    .map(monkey => monkey.split("\n"))
    .map((monkey, idx) => ({
      idx: idx,
      items: monkey[1]
        .replace("  Starting items: ", "")
        .split(", ")
        .map(val => val * 1),
      operation: monkey[2].replace("  Operation: new = ", ""),
      divisor: monkey[3].split(" ")[5] * 1,
      trueMonkey: monkey[4].split(" ")[9] * 1,
      falseMonkey: monkey[5].split(" ")[9] * 1,
      inspectedItems: 0
    }));
  
  const commonDivisor = inputMonkeys.map(monkey => monkey.divisor).reduce((prev, curr) => prev * curr, 1);

  Array(partOne ? 20 : 10000)
    .fill(0)
    .forEach(_ => inputMonkeys.forEach(monkey => performMonkey(monkey, inputMonkeys, partOne, commonDivisor)));

  console.log(inputMonkeys
    .map(monkey => monkey.inspectedItems)
    .sort(sortDesc)
    .slice(0, 2)
    .reduce((prev, curr) => prev * curr, 1));
};

solve(true);
solve(false);