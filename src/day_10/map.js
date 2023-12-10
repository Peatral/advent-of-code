const { vecNew, vecAdd, vecSub, max, vecEqual, range } = require("../utility");
const Pipe = require("./pipe");

class PipeMap {
  tiles;
  startCoords;
  mainloop;

  constructor(map) {
    this.tiles = [];
    for (let y = 0; y < map.length; y++) {
      this.tiles.push([]);
      for (let x = 0; x < map[y].length; x++) {
        this.tiles[y].push(new Pipe(map[y][x]));
        if (map[y][x] == "S") {
          this.startCoords = vecNew(x, y);
        }
      }
    }
    this.mainloop = this.bfs(this.startCoords, (_, v) => {});
  }

  isInsideMap(pos) {
    return (
      pos.y >= 0 &&
      pos.y < this.tiles.length &&
      pos.x >= 0 &&
      pos.x < this.tiles[pos.y].length
    );
  }

  getConnectedPipes(center) {
    return this.tiles[center.y][center.x]
      .getPossibleConnections()
      .map(dir => vecAdd(center, dir))
      .filter(pos => this.isInsideMap(pos))
      .filter(pos =>
        this.tiles[pos.y][pos.x]
          .getPossibleConnections()
          .find(dir => vecEqual(dir, vecSub(center, pos))),
      );
  }

  print() {
    this.tiles.forEach(line => console.log(line.map(p => p.char).join("")));
  }

  bfs(start, cb) {
    const q = [start];
    const exploredPipes = [start];

    while (q.length > 0) {
      const v = q.shift();
      const connectedPipes = this.getConnectedPipes(v);

      for (const w of connectedPipes) {
        if (vecEqual(w, v) || exploredPipes.find(loc => vecEqual(loc, w))) {
          continue;
        }
        exploredPipes.push(w);
        q.push(w);

        cb(exploredPipes, v);
      }
    }
    return exploredPipes;
  }

  isPartOfMainLoop(pos) {
    return this.mainloop.findIndex(vec => vecEqual(vec, pos)) != -1;
  }

  getRealChar(pos) {
    if (this.isPartOfMainLoop(pos)) {
      if (vecEqual(pos, this.startCoords)) {
        const pipes = this.getConnectedPipes(this.startCoords).map(p =>
          vecSub(p, this.startCoords),
        );
        const pipeReference = {
          "|": [vecNew(0, -1), vecNew(0, 1)],
          "-": [vecNew(1, 0), vecNew(-1, 0)],
          F: [vecNew(1, 0), vecNew(0, 1)],
          7: [vecNew(0, 1), vecNew(-1, 0)],
          L: [vecNew(0, -1), vecNew(1, 0)],
          J: [vecNew(0, -1), vecNew(-1, 0)],
        };
        return [...Object.entries(pipeReference)].find(([_, dirs]) =>
          dirs.every((v, i) => vecEqual(v, pipes[i])),
        )[0];
      }
      return this.tiles[pos.y][pos.x].char;
    }
    return ".";
  }

  findGreatestDistance() {
    const distances = [0];

    this.bfs(this.startCoords, (exploredPipes, v) => {
      distances.push(
        distances[exploredPipes.findIndex(loc => vecEqual(loc, v))] + 1,
      );
    });

    return distances.reduce(max, 0);
  }

  findEnclosedTiles() {
    let count = 0;
    for (let y = 0; y < this.tiles.length; y++) {
      const lineStartPos = vecNew(0, y);
      const lineStartChar = this.getRealChar(lineStartPos);

      let inside = this.isPartOfMainLoop(lineStartPos);

      // We need this to track if we cross a pipe or only skim it
      // L---J or F---7 is skimming while F---J and L---7 is actually crossing
      let searchCurve = "LF".includes(lineStartChar);
      let lastCurveChar = lineStartChar;

      for (let x = 1; x < this.tiles[y].length; x++) {
        const currentChar = this.getRealChar(vecNew(x, y));
        // We start checking the curve
        if ("LF".includes(currentChar)) {
          inside = !inside;
          searchCurve = true;
          lastCurveChar = currentChar;
        }

        // We end it and only invert inside if we only skimmed it
        // (we didn't actually change from inside to outside)
        if ("7J".includes(currentChar) && searchCurve) {
          searchCurve = false;
          if (
            (lastCurveChar == "L" && currentChar == "J") ||
            (lastCurveChar == "F" && currentChar == "7")
          ) {
            inside = !inside;
          }
        }

        // Trivial case, we definitely changed from inside to outside or the inverse
        if ("|".includes(currentChar)) {
          inside = !inside;
        }

        // As long as we are not on a curve, inside
        if (inside && currentChar == ".") {
          count++;
        }
      }
    }
    return count;
  }
}

module.exports = PipeMap;
