import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Consult the report from the sensors you just deployed.
In the row where y=2000000, how many positions cannot contain a beacon?
 */

//This solution solves the test input but is too slow for real input

function solution(input, maxRow) {
  let inputArray = input.split('\n');
  let sensors = [];
  inputArray.forEach((pairs) => {
    //Just parsing the data
    let [sensor, beacon] = pairs.split(':');
    let sensorCoors = sensor.match(/-?\d+/g).map((x) => +x);
    let beaconCoors = beacon.match(/-?\d+/g).map((x) => +x);

    //Create the sensors object
    sensors.push({
      x: sensorCoors[0],
      y: sensorCoors[1],
      distance:
        Math.abs(sensorCoors[0] - beaconCoors[0]) +
        Math.abs(sensorCoors[1] - beaconCoors[1]),
    });
  });

  let found = 0;
  let rowToCheck = 0;

  while (rowToCheck < maxRow) {
    let sensorsOnTouch = sensors
      .filter((sensor) => {
        //To see if a sensor can touch the row

        if (sensor.y == rowToCheck) return true;
        if (sensor.y > rowToCheck)
          return sensor.y - sensor.distance <= rowToCheck;
        else return sensor.y + sensor.distance >= rowToCheck;
      })
      .map((sensor) => {
        //This is the calculation to know how many blocks does the signal touches
        let distanceFromRow = Math.abs(rowToCheck - sensor.y);
        let totalRowOccupy = sensor.distance * 2 - distanceFromRow * 2 + 1;

        let maxXOcuppy = (totalRowOccupy - 1) / 2 + sensor.x;
        let minXOcuppy = Math.abs(sensor.x) - (totalRowOccupy - 1) / 2;

        return [minXOcuppy, maxXOcuppy];
      })
      .sort((x, y) => x[0] - y[0]);

    //Merge the ranges to know if all sensors cover the whole row
    let ranges = sensorsOnTouch.reduce(
      (merged, current, i) => {
        if (!i) return merged;

        let [start, end] = current;

        if (start <= merged.at(-1)[1]) {
          merged.at(-1)[1] = Math.max(end, merged.at(-1)[1]);
        } else merged.push(current);

        return merged;
      },
      [[sensorsOnTouch[0][0], sensorsOnTouch[0][1]]]
    );

    //If the sensors don't cover all the row,
    //then there will be 2 ranges and the end of the first one + 1 is the position where the beacon is
    if (ranges.length == 2) {
      found = ranges[0][1] + 1;
      break;
    }
    ++rowToCheck;
  }

  return found * 4000000 + rowToCheck;
}

console.log(solution(input, 4000000));

// console.log(solution(testInput, 20));
