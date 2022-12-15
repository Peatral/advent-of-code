const {readInputLines, filterInvalid, vecFromList, manhattanDistance, range, sum} = require("../utility");

const getXRange = (y, sensor) => {
  const yDist = Math.abs(y - sensor.pos.y);
  if (yDist > sensor.distance)
    return undefined;
  const xDist = sensor.distance - yDist;
  return [sensor.pos.x - xDist, sensor.pos.x + xDist]
};

const getSensorXRanges = (y, sensors) => sensors.map(sensor => getXRange(y, sensor)).filter(filterInvalid);

const mergeOverlappingIntervals = intervals => {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];
  res.push(intervals.reduce((prev, curr) => {
    if (prev[1] >= curr[0]) {
      return [prev[0], Math.max(prev[1], curr[1])];
    } else {
      res.push(prev);
      return curr;
    }
  }, intervals[0]));
  return res;
}


const inputSensors = readInputLines()
  .filter(filterInvalid)
  .map(line => line
    .replaceAll("Sensor at ", "")
    .split(": closest beacon is at ")
    .map(text => text
      .replace("x=", "")
      .split(", y=")
      .map(val => val * 1))
    .map(vec => vecFromList(vec)))
  .map(line => ({pos: line[0], beacon: line[1]}))
  .map(sensor => ({...sensor, distance: manhattanDistance(sensor.pos, sensor.beacon)}));

console.log(mergeOverlappingIntervals(getSensorXRanges(2000000, inputSensors)).map(range => range[1] - range[0]).reduce(sum));

range(0, 4000000).find(y => {
  const res = mergeOverlappingIntervals(getSensorXRanges(y, inputSensors));
  if (res.length > 1) {
    console.log((res[0][1] + 1) * 4000000 + y);
    return true;
  }
});