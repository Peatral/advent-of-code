const Task = require("../template/task");
const { isNumber, toInt, range, vecEqual } = require("../utility");

const SYMBOLS = "*#-+$/%=@&";

class Day03 extends Task {
  parseInput(text) {
    const symbols = [];
    const numbers = [];
    for (const [y, line] of text.split("\n").entries()) {
      let str = "";
      let lastX = 0;
      let readingNumber = false;
      for (const [x, char] of line.split("").entries()) {
        if (SYMBOLS.includes(char)) {
          symbols.push({ x: x, y: y, symbol: char });
        }
        if (isNumber(char)) {
          str += char;
          if (!readingNumber) {
            readingNumber = true;
            lastX = x;
          }
        }
        if ((!isNumber(char) || x == line.length - 1) && readingNumber) {
          numbers.push({
            x: lastX,
            y: y,
            value: toInt(str),
            digits: str.length,
          });
          str = "";
          readingNumber = false;
        }
      }
    }
    return [symbols, numbers];
  }

  expandSymbolPosition(symbol) {
    let positions = [];
    for (const y of range(-1, 2)) {
      for (const x of range(-1, 2)) {
        if (x != 0 || y != 0) {
          positions.push({ x: symbol.x + x, y: symbol.y + y });
        }
      }
    }
    return positions;
  }

  expandSymbolPositions(symbols) {
    let positions = new Set();
    for (const symbol of symbols) {
      for (const pos of this.expandSymbolPosition(symbol)) {
        if (!symbols.find(sym => vecEqual(sym, pos))) {
          positions.add(pos);
        }
      }
    }
    return [...positions].reduce(
      (p, c) => (!p.find(pos => vecEqual(pos, c)) ? [...p, c] : p),
      [],
    );
  }

  filterOverlappingNumbers(numbers, positions) {
    return numbers.filter(number =>
      positions.find(
        pos =>
          range(number.x, number.x + number.digits).includes(pos.x) &&
          number.y == pos.y,
      ),
    );
  }

  processPartA(input) {
    const [symbols, numbers] = input;
    const positions = this.expandSymbolPositions(symbols);
    return this.filterOverlappingNumbers(numbers, positions).reduce(
      (p, c) => p + c.value,
      0,
    );
  }

  processPartB(input) {
    const [symbols, numbers] = input;
    let sum = 0;
    for (const symbol of symbols.filter(sym => sym.symbol == "*")) {
      const positions = this.expandSymbolPosition(symbol);
      const symbolNumbers = this.filterOverlappingNumbers(numbers, positions);
      if (symbolNumbers.length != 2) {
        continue;
      }
      sum += symbolNumbers[0].value * symbolNumbers[1].value;
    }
    return sum;
  }
}

module.exports = Day03;
