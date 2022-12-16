import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
This approach lets you release the most pressure possible in 30 minutes with this valve layout,

1651.

Work out the steps to release the most pressure in 30 minutes.
What is the most pressure you can release?
 */

function solution(input) {
  let valvesGraph = {};
  let start = {};
  let minutes = 30;

  let inputArray = input.split('\n');

  inputArray.forEach((valve, i) => {
    let [info, tunnels] = valve.split(';');

    let valveName = info.match(/[A-Z]{2}/)[0];
    let flowRate = info.match(/\d+/)[0];

    let paths = tunnels.match(/[A-Z]{2}/g);

    valvesGraph[valveName] = {
      flowRate,
      paths,
      distance: Infinity,
    };

    if (!i) start = valvesGraph[valveName];
  });

  let mostValuables = Object.keys(valvesGraph)
    .sort((x, y) => valvesGraph[y].flowRate - valvesGraph[x].flowRate)
    .filter((x) => valvesGraph[x].flowRate > 0);

  let currentNode = start;
  let result = 0;

  while (minutes > 0) {
    // console.log(queue);
    let foundNodes = findShortestPath(valvesGraph, currentNode, mostValuables);
    if (foundNodes.length) {
      // foundNodes.forEach(([node]) => {
      //   console.log(valvesGraph[node].distance);
      // });
      console.log(foundNodes);
      let indexOfMostValuable = Math.min(...foundNodes.map((x) => x[1]));
      let mostValuable = mostValuables[indexOfMostValuable];
      currentNode = valvesGraph[mostValuable];
      mostValuables.splice(indexOfMostValuable, 1);
      result += currentNode.flowRate * (minutes - currentNode.distance - 1);
      minutes -= currentNode.distance + 1;
    } else {
      --minutes;
    }

    // console.log(mostValuables);
  }

  return result;
}

function findShortestPath(graph, node, mostValuables) {
  node.distance = 0;

  let queue = [node];

  let valuableEdges = [];

  while (!valuableEdges.length && mostValuables.length && queue.length) {
    let next = queue.shift();

    for (let i = 0; i < next.paths.length; i++) {
      let node = next.paths[i];
      graph[node].distance = next.distance + 1;
      if (mostValuables.includes(node)) {
        let indexOfNode = mostValuables.indexOf(node);
        if (graph[node].flowRate >= 10) {
          valuableEdges.push([node, indexOfNode]);
        } else if (mostValuables.length < 3 && mostValuables.includes(node)) {
          valuableEdges.push([node, indexOfNode]);
        } else {
          queue.push(graph[node]);
        }
      } else {
        queue.push(graph[node]);
      }
    }
  }
  return valuableEdges;
}

console.log(solution(input));
// console.log(solution(testInput));
