import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
This approach lets you release the most pressure possible in 30 minutes with this valve layout,

1651.

Work out the steps to release the most pressure in 30 minutes.
What is the most pressure you can release?
 */

//Works for test but not for real input
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
      name: valveName,
    };

    if (!i) start = valvesGraph[valveName];
  });

  let nodeCount = Object.keys(valvesGraph).length;

  let mostValuables = Object.keys(valvesGraph)
    .sort((x, y) => valvesGraph[y].flowRate - valvesGraph[x].flowRate)
    .filter((x) => valvesGraph[x].flowRate > 0);

  // mostValuables.forEach((node) => console.log(node));
  let currentNode = start;
  let result = 0;

  while (minutes > 0) {
    let foundNodes = findShortestPath(
      valvesGraph,
      currentNode.name,
      mostValuables,
      nodeCount,
      minutes
    );

    if (foundNodes) {
      let indexOfMostValuable = foundNodes[1];

      let mostValuable = mostValuables[indexOfMostValuable];

      currentNode = valvesGraph[mostValuable];

      mostValuables.splice(indexOfMostValuable, 1);
      minutes -= foundNodes[2] + 1;
      result += currentNode.flowRate * minutes;
    } else {
      --minutes;
    }
    // console.log(mostValuables);
  }

  return result;
}

function findShortestPath(graph, nodeName, mostValuables, nodeCount, minutes) {
  graph[nodeName].distance = 0;

  let queue = [graph[nodeName]];

  let valuableEdges = new Set();

  let visitedNodes = new Set([nodeName]);

  while (visitedNodes.size != nodeCount) {
    let next = queue.shift();
    visitedNodes.add(next.name);

    for (let i = 0; i < next.paths.length; i++) {
      let node = next.paths[i];
      if (visitedNodes.has(node)) continue;
      graph[node].distance = next.distance + 1;

      if (mostValuables.includes(node) && graph[node].distance + 1 <= minutes) {
        let indexOfNode = mostValuables.indexOf(node);
        valuableEdges.add(`${node}-${indexOfNode}-${graph[node].distance}`);
      }
      queue.push(graph[node]);
      visitedNodes.add(node);
    }
  }

  let mostValuable = [...valuableEdges]
    .map((x) => {
      let [node, index, distance] = x.split('-');

      // graph[node].paths.length <= 2 &&
      //   console.log(node, findDistance(graph, node));

      let outCost =
        graph[node].paths.length >= 2 ? 0 : findDistance(graph, node);

      return [
        node,
        +index,
        +distance,
        ((minutes - (+distance + 1)) * graph[node].flowRate) /
          (+distance + 1 + outCost),
      ];
    })
    .sort((x, y) => y[3] - x[3]);
  mostValuable.length && console.log(mostValuable);
  return mostValuable.shift();
}

function findDistance(graph, node) {
  graph[node].distance = 0;
  let queue = [graph[node]];

  let visitedNodes = new Set([node]);
  let nodes = [];

  do {
    let next = queue.shift();
    for (let i = 0; i < next.paths.length; i++) {
      if (!visitedNodes.has(next.paths[i])) {
        let currentNode = graph[next.paths[i]];

        currentNode.distance = next.distance + 1;
        queue.push(currentNode);
        nodes.push(currentNode);
      }
      visitedNodes.add(next.paths[i]);
    }
  } while (queue[0].paths.length < 3);

  // console.log(
  //   nodes.sort((x, y) => y.distance - x.distance),
  //   node
  // );

  return nodes.sort((x, y) => y.distance - x.distance).at(-1).distance;
}

// console.log(solution(input));
console.log(solution(testInput));
