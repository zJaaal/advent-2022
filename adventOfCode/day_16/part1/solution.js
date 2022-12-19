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

  let nodes = [
    start.name,
    ...Object.keys(valvesGraph)
      .sort((x, y) => valvesGraph[y].flowRate - valvesGraph[x].flowRate)
      .filter((x) => valvesGraph[x].flowRate > 0),
  ];

  // console.log(nodes);

  let nodePaths = findPathsToNodes(valvesGraph, nodes);

  // console.log(nodePaths);
  let shortestPaths = findShortestPath(nodes, nodePaths);

  // let points = findTotalPoints('HH', 'CC', shortestPaths, nodes[0]);

  return shortestPaths;
}

function findPathsToNodes(graph, nodes) {
  let nodesDistances = {};

  nodes.forEach((node) => {
    graph[node].distance = 0;

    let queue = [graph[node]];

    let visitedNodes = new Set([node]);

    while (visitedNodes.size < nodes.length) {
      let next = queue.shift();

      for (let i = 0; i < next.paths.length; i++) {
        let currentNode = next.paths[i];
        if (visitedNodes.has(currentNode)) continue;
        graph[currentNode].distance = next.distance + 1;

        if (nodes.includes(currentNode)) {
          nodesDistances[node] = {
            ...nodesDistances[node],
            [currentNode]: graph[currentNode].distance,
          };

          visitedNodes.add(currentNode);
        }
        queue.push(graph[currentNode]);
      }
    }
  });

  return nodesDistances;
}

function findShortestPath(nodes, paths) {
  let queue = [nodes[0]];
  let visitedNodes = new Set();

  let shortestPath = {
    [nodes[0]]: {
      totalCost: 0,
      prev: nodes[0],
    },
  };

  while (visitedNodes.size < nodes.length) {
    let node = queue.shift();
    let next = paths[node];

    for (let i = 0; i < nodes.length; i++) {
      if (visitedNodes.has(nodes[i])) continue;
      // console.log(nodes[i], node);
      if (typeof shortestPath[nodes[i]] == 'undefined') {
        shortestPath[nodes[i]] = {
          totalCost: next[nodes[i]] + shortestPath[node].totalCost,
          prev: node,
        };
      } else if (shortestPath[nodes[i]].totalCost > next[nodes[i]]) {
        shortestPath[nodes[i]] = {
          totalCost: next[nodes[i]] + shortestPath[node].totalCost,
          prev: node,
        };
      }
      queue.push(nodes[i]);
    }
    visitedNodes.add(node);
  }

  return shortestPath;
}

function findTotalPoints(nodeFrom, nodeTo, shortestPaths, startNode) {
  let currentFromNode = nodeFrom;
  let currentToNode = nodeTo;
  let encounter = '';

  let nodeFromPath = [];
  let nodeToPath = [];

  while (currentFromNode != startNode || currentToNode != startNode) {
    currentFromNode = shortestPaths[currentFromNode].prev;
    if (nodeFromPath.at(-1) != startNode) nodeFromPath.push(currentFromNode);

    currentToNode = shortestPaths[currentToNode].prev;
    if (nodeToPath.at(-1) != startNode) nodeToPath.push(currentToNode);
  }

  if (nodeFromPath.find((x) => x == nodeTo))
    return (
      shortestPaths[nodeFrom].totalCost +
      Math.abs(
        shortestPaths[nodeFrom].totalCost - shortestPaths[nodeTo].totalCost
      )
    );
  else {
    for (let i = 0; i < nodeFromPath.length; i++) {
      let possibleEncounter = nodeToPath.find((x) => x == nodeFromPath[i]);
      // console.log(possibleEncounter);
      if (possibleEncounter) {
        encounter = possibleEncounter;
        break;
      }
    }
  }

  return (
    shortestPaths[nodeFrom].totalCost +
    (Math.abs(
      shortestPaths[nodeFrom].totalCost - shortestPaths[encounter].totalCost
    ) +
      Math.abs(
        shortestPaths[nodeTo].totalCost - shortestPaths[encounter].totalCost
      ))
  );
}

// console.log(solution(input));
console.log(solution(testInput));
