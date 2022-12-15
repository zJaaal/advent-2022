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
    let [sensor, beacon] = pairs.split(':');
    let sensorCoors = sensor.match(/-?\d+/g).map((x) => +x);
    let beaconCoors = beacon.match(/-?\d+/g).map((x) => +x);
    sensors.push({
      x: sensorCoors[0],
      y: sensorCoors[1],
      nearestBeacon: {
        x: beaconCoors[0],
        y: beaconCoors[1],
      },
      distance:
        Math.abs(sensorCoors[0] - beaconCoors[0]) +
        Math.abs(sensorCoors[1] - beaconCoors[1]),
    });
  });

  let found = 0;
  let rowToCheck = 0;

  let bitMap = Array.from({ length: maxRow + 1 }, (x) => 0);

  while (rowToCheck < maxRow) {
    let sensorsOnTouch = sensors
      .filter((sensor) => {
        //To see if a sensor can touches the beacon

        if (sensor.y == rowToCheck) return true;
        if (sensor.y > rowToCheck)
          return sensor.y - sensor.distance <= rowToCheck;
        else return sensor.y + sensor.distance >= rowToCheck;
      })
      .map((sensor) => {
        //This is the calculation to know how many rows does the signal touches
        let distanceFromRow = Math.abs(rowToCheck - sensor.y);
        let totalRowOccupy = sensor.distance * 2 - distanceFromRow * 2 + 1;

        let maxXOcuppy = (totalRowOccupy - 1) / 2 + sensor.x;
        let minXOcuppy = Math.abs(sensor.x) - (totalRowOccupy - 1) / 2;

        return {
          ...sensor,
          minXOcuppation: minXOcuppy,
          maxXOcuppation: maxXOcuppy,
          totalOccupation: totalRowOccupy,
        };
      });

    sensorsOnTouch.forEach((sensor) => {
      bitMap = bitMap.map((x, i) => {
        if (i >= sensor.minXOcuppation && i <= sensor.maxXOcuppation) return 1;
        return x;
      });
    });
    if (new Set(bitMap).size == 2) {
      found = bitMap.indexOf(0);
      break;
    }

    bitMap = bitMap.map((x) => 0);
    ++rowToCheck;
    // console.log(rowToCheck);
  }

  return found * 4000000 + rowToCheck;
}

// console.log(solution(input, 4000000));
// console.log(solution(testInput, 20));
