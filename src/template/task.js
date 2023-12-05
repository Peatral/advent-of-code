const { readFile } = require("../utility");

class Task {
  #text;

  constructor(path) {
    try {
      this.#text = readFile(path);
    } catch (e) {
      this.#text = "";
    }
  }

  applyText(text) {
    this.#text = text;
    return this;
  }

  parseInput(text) {
    return text.split("\n");
  }

  processPartA(input) {
    return 0;
  }

  partA() {
    return this.processPartA(this.parseInput(this.#text));
  }

  processPartB(input) {
    return 0;
  }

  partB() {
    return this.processPartB(this.parseInput(this.#text));
  }
}

module.exports = Task;
