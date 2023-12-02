const { sum, toInt, max } = require("../utility");

function parseGame(str) {
  return {
    id: toInt(str.split(" ")[1].replace(":", "")),
    sets: str
      .replace(/Game ([0-9]+): /, "")
      .split("; ")
      .map(set =>
        set
          .split(", ")
          .map(entry => entry.split(" "))
          .reduce(
            (p, c) => {
              p[c[1]] += toInt(c[0]);
              return p;
            },
            { red: 0, green: 0, blue: 0 },
          ),
      ),
  };
}

const POSSIBLE_WITH = {
  red: 12,
  green: 13,
  blue: 14,
};

const gamePossible = game => {
  return game.sets.every(
    set =>
      set.red <= POSSIBLE_WITH.red &&
      set.green <= POSSIBLE_WITH.green &&
      set.blue <= POSSIBLE_WITH.blue,
  );
};

function partA(inputLines) {
  return inputLines
    .map(parseGame)
    .filter(gamePossible)
    .map(game => game.id)
    .reduce(sum, 0);
}

function partB(inputLines) {
  return inputLines
    .map(parseGame)
    .map(game =>
      game.sets.reduce(
        (p, c) => ({
          red: max(p.red, c.red),
          green: max(p.green, c.green),
          blue: max(p.blue, c.blue),
        }),
        { red: 0, green: 0, blue: 0 },
      ),
    )
    .map(set => set.red * set.green * set.blue)
    .reduce(sum, 0);
}

module.exports = { partA, partB };
