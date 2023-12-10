const { vecNew } = require("../utility");

class Pipe {
  char;
  constructor(char) {
    this.char = char;
  }

  getPossibleConnections() {
    const connections = [];
    if ("S|LJ".includes(this.char)) {
      connections.push(vecNew(0, -1));
    }
    if ("S-LF".includes(this.char)) {
      connections.push(vecNew(1, 0));
    }
    if ("S|F7".includes(this.char)) {
      connections.push(vecNew(0, 1));
    }
    if ("S-J7".includes(this.char)) {
      connections.push(vecNew(-1, 0));
    }
    return connections;
  }

  toString() {
    return this.char;
  }
}

module.exports = Pipe;
