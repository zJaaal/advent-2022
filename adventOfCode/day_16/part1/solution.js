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

  let nodeCount = Object.keys(valvesGraph).length;

  let mostValuables = Object.keys(valvesGraph)
    .sort((x, y) => valvesGraph[y].flowRate - valvesGraph[x].flowRate)
    .filter((x) => valvesGraph[x].flowRate > 0);

  // mostValuables.forEach((node) => console.log(valvesGraph[node].flowRate));
  let currentNode = start;
  let result = 0;

  while (minutes > 0) {
    let foundNodes = findShortestPath(
      valvesGraph,
      currentNode,
      mostValuables,
      nodeCount,
      minutes
    );

    // console.log(foundNodes);

    if (foundNodes) {
      // console.log(foundNodes);

      let indexOfMostValuable = foundNodes[1];

      let mostValuable = mostValuables[indexOfMostValuable];

      currentNode = valvesGraph[mostValuable];

      mostValuables.splice(indexOfMostValuable, 1);

      minutes -= foundNodes[2] + 1;
      result += currentNode.flowRate * minutes;
    } else {
      --minutes;
    }
  }

  return result;
}

function findShortestPath(graph, node, mostValuables, nodeCount, minutes) {
  node.distance = 0;

  let queue = [node];

  let valuableEdges = new Set();

  let visitedNodes = new Set();

  while (visitedNodes.size != nodeCount && queue.length) {
    let next = queue.shift();
    // visitedNodes.add(next);

    for (let i = 0; i < next.paths.length; i++) {
      let node = next.paths[i];
      if (visitedNodes.has(node)) continue;
      graph[node].distance = next.distance + 1;

      if (
        mostValuables.includes(node) &&
        !visitedNodes.has(node) &&
        graph[node].distance + 1 <= minutes
      ) {
        let indexOfNode = mostValuables.indexOf(node);
        valuableEdges.add(`${node}-${indexOfNode}-${graph[node].distance}`);
      }
      queue.push(graph[node]);
      visitedNodes.add(node);
    }
  }

  let mostValuable = [...valuableEdges]
    .map((x) => {
      let [node, priority, distance] = x.split('-');

      let outCost = graph[node].paths.length >= 2 ? 0 : graph[node].distance;

      return [
        node,
        +priority,
        +distance,
        ((minutes - +distance + 1) * graph[node].flowRate) /
          (+distance + 1 + outCost + +priority),
      ];
    })
    .sort((x, y) => y[3] - x[3]);
  console.log(mostValuable);
  return mostValuable.shift();
}

console.log(solution(input));
// console.log(solution(testInput));
