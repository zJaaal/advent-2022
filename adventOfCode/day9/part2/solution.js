import { input, part2TestInput as testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The same as part 1 but with 9 knots
 */

let calculateDistance = (x1, x2, y1, y2) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

let headMovement = {
  U: (lastPosition) => [lastPosition[0], lastPosition[1] + 1],
  D: (lastPosition) => [lastPosition[0], lastPosition[1] - 1],
  R: (lastPosition) => [lastPosition[0] + 1, lastPosition[1]],
  L: (lastPosition) => [lastPosition[0] - 1, lastPosition[1]],
};

let tailMovement = {
  U: (headPosition) => [headPosition[0], headPosition[1] - 1],
  D: (headPosition) => [headPosition[0], headPosition[1] + 1],
  R: (headPosition) => [headPosition[0] - 1, headPosition[1]],
  L: (headPosition) => [headPosition[0] + 1, headPosition[1]],
};

function solution(input) {
  let arraySim = Array.from({ length: 29 }, (x) =>
    Array.from({ length: 29 }, (x) => '.')
  );
  let headPositions = [[0, 0]];
  let tailPositions = [
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
  ];
  let differentTailPossitions = [
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
  ];
  let inputArray = input.split('\n');

  inputArray.forEach((cmd) => {
    let [direction, value] = cmd.split(' ');

    for (let i = 0; i < value; i++) {
      headPositions.push(headMovement[direction](headPositions.at(-1)));

      let currentHead = headPositions.at(-1);

      tailPositions.forEach((tail, i) => {
        let currentTail = tail.at(-1);
        if (!i) {
          let distance = calculateDistance(
            currentHead[0],
            currentTail[0],
            currentHead[1],
            currentTail[1]
          );
          if (distance == 2 || distance == 2.23606797749979) {
            tail.push(tailMovement[direction](currentHead));
            if (
              !differentTailPossitions[i].some(
                (x) => x[0] == tail.at(-1)[0] && x[1] == tail.at(-1)[1]
              )
            )
              differentTailPossitions[i].push(tail.at(-1));
          }
        } else {
          //The reference is lost when one of the knots get to a corner.
          //You need to maintain the reference differently
          //This works differently. Refer to the problem to see how it behaves
          let distance = calculateDistance(
            tailPositions[i - 1].at(-1)[0],
            currentTail[0],
            tailPositions[i - 1].at(-1)[1],
            currentTail[1]
          );
          if (distance == 2 || distance == 2.23606797749979) {
            tail.push(tailMovement[direction](tailPositions[i - 1].at(-1)));
            if (
              !differentTailPossitions[i].some(
                (x) => x[0] == tail.at(-1)[0] && x[1] == tail.at(-1)[1]
              )
            )
              differentTailPossitions[i].push(tail.at(-1));
          }
        }
      });
    }
  });

  return tailPositions;
}
// console.log(solution(input));
console.log(solution(testInput));
