const Task = require("../template/task");
const { toInt, sortAsc, max } = require("../utility");

class Day05 extends Task {
  parseInput(text) {
    const blocks = text.split("\n\n");
    return {
      seeds: blocks[0].split(":")[1].trim().split(" ").map(toInt),
      maps: blocks.slice(1).map(block =>
        block
          .split("\n")
          .slice(1)
          .map(line => line.split(" ").map(toInt)),
      ),
    };
  }

  processPartA(input) {
    const { seeds, maps } = input;
    return seeds
      .map(seed =>
        maps.reduce((p, map) => {
          const nextMap = map.find(
            ([_, sstart, size]) => sstart <= p && p < sstart + size,
          );
          return nextMap ? nextMap[0] + (p - nextMap[1]) : p;
        }, seed),
      )
      .toSorted(sortAsc)[0];
  }

  naiveSplitRange(range, ranges) {
    const [seedstart, seedend] = range;
    let rangeValues = new Set([seedstart]);
    for (const [mapstart, mapend] of ranges) {
      if (seedstart < mapstart && mapstart < seedend) {
        rangeValues.add(mapstart - 1);
        rangeValues.add(mapstart);
      }

      if (seedstart < mapend && mapend < seedend) {
        rangeValues.add(mapend);
        rangeValues.add(mapend + 1);
      }
    }
    rangeValues.add(seedend);
    return [...rangeValues];
  }

  pair(arr) {
    return arr.reduce(
      (p, c, i) => (i % 2 == 0 ? [...p, [c, c + arr[i + 1] - 1]] : p),
      [],
    );
  }

  processPartB(input) {
    let { seeds, maps } = input;
    maps = maps.map(map => map.map(([a, b, c]) => [a, b, b + c - 1]));
    let current = this.pair(seeds);

    for (const map of maps) {
      current = this.pair(
        current.flatMap(sourcerange =>
          this.naiveSplitRange(
            sourcerange,
            map.map(m => [m[1], m[2]]),
          ),
        ),
      );
      let next = [];
      for (const sourcerange of current) {
        for (const value of sourcerange) {
          const nextMap = map.find(
            ([_, sstart, send]) => sstart <= value && value < send,
          );
          next.push(nextMap ? nextMap[0] + (value - nextMap[1]) : value);
        }
      }

      // Merge all ranges that overlap. This should reduce the amount of ranges SIGNIFICANTLY
      current = this.pair(next)
        .toSorted((a, b) => a[0] - b[0])
        .reduce((p, [cstart, cend]) => {
          if (p.length > 0) {
            const lastend = p[p.length - 1][1];
            if (cstart <= lastend) {
              p[p.length - 1][1] = max(lastend, cend);
            } else {
              p.push([cstart, cend]);
            }
          } else {
            p.push([cstart, cend]);
          }
          return p;
        }, []);
    }

    return current.map(range => range[0]).toSorted(sortAsc)[0];
  }
}

module.exports = Day05;
