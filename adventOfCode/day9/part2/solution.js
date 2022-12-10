import { input, part2TestInput as testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The same as part 1 but with 9 knots
 */

let calculateDistance = (x1, x2, y1, y2) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

const headMovement = {
  U: (lastPosition) => [lastPosition[0], lastPosition[1] + 1],
  D: (lastPosition) => [lastPosition[0], lastPosition[1] - 1],
  R: (lastPosition) => [lastPosition[0] + 1, lastPosition[1]],
  L: (lastPosition) => [lastPosition[0] - 1, lastPosition[1]],
};

const headTailMovement = {
  U: (headPosition) => [headPosition[0], headPosition[1] - 1],
  D: (headPosition) => [headPosition[0], headPosition[1] + 1],
  R: (headPosition) => [headPosition[0] - 1, headPosition[1]],
  L: (headPosition) => [headPosition[0] + 1, headPosition[1]],
};

//Not working right, looks like is not going in tempo and lose reference again
let knotMovement = {
  U: (headKnotPosition, tailKnotPosition, distance) => {
    if (distance == 2.23606797749979)
      //If is on diagonal, go to where it was
      return [headKnotPosition[0], headKnotPosition[1]];

    return [headKnotPosition[0], tailKnotPosition[1] + 1]; // Else move to where you should be
  },
  D: (headKnotPosition, tailKnotPosition, distance) => {
    if (distance == 2.23606797749979)
      return [headKnotPosition[0], headKnotPosition[1]];

    return [headKnotPosition[0], tailKnotPosition[1] - 1];
  },
  R: (headKnotPosition, tailKnotPosition, distance) => {
    if (distance == 2.23606797749979)
      return [headKnotPosition[0], headKnotPosition[1]];

    return [tailKnotPosition[0] + 1, headKnotPosition[1]];
  },
  L: (headKnotPosition, tailKnotPosition, distance) => {
    if (distance == 2.23606797749979)
      return [headKnotPosition[0], headKnotPosition[1]];

    return [tailKnotPosition[0] - 1, headKnotPosition[1]];
  },
};

function solution(input) {
  let arraySim = Array.from({ length: 30 }, (x) =>
    Array.from({ length: 30 }, (x) => '.')
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
            tail.push(headTailMovement[direction](currentHead));
            if (
              !differentTailPossitions[i].some(
                (x) => x[0] == tail.at(-1)[0] && x[1] == tail.at(-1)[1]
              )
            )
              differentTailPossitions[i].push(tail.at(-1));
          }
        } else {
          //This is good because when this happens is when it needs to change

          //This new solutions goes well until a certain point, it goes wrong on i > 2
          let distance = calculateDistance(
            tailPositions[i - 1].at(-1)[0],
            currentTail[0],
            tailPositions[i - 1].at(-1)[1],
            currentTail[1]
          );
          if (distance == 2 || distance == 2.23606797749979) {
            tail.push(
              knotMovement[direction](
                tailPositions[i - 1].at(-2),
                currentTail,
                distance
              )
            );
            //Something is wrong you need to draw it by hand to see how it SHOULD behave
            if (i == 2 || i == 1)
              arraySim[tail.at(-1)[1] + 14][tail.at(-1)[0] + 14] = '#';
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

  for (let i = 0; i < arraySim.length; i++) console.log(...arraySim[i]);

  return;
}
// console.log(solution(input));
console.log(solution(testInput));
