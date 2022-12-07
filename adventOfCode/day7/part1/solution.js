import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
To begin, find all of the directories with a total size of at most 100000,
then calculate the sum of their total sizes.
In the example above, these directories are a and e;
the sum of their total sizes is 95437 (94853 + 584).
(As in this example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000.
What is the sum of the total sizes of those directories?
 */

/*
  SOLVED!
*/
let currentDepth = 0;
let root = ['/'];
function solution(input) {
  let inputArray = input.split(`\n`);
  let rootFolder = {
    parentId: null,
    id: '/',
    children: [],
    size: null,
    depth: 1,
  };
  let currentFolder = {};

  inputArray.forEach((cmd, i, array) => {
    if (cmd.includes('$')) {
      let cmdArgs = cmd.split(' ');
      switch (cmdArgs[1]) {
        case 'cd': {
          if (cmdArgs[2] != '..') {
            if (cmdArgs[2] != '/') root.push(cmdArgs[2]);

            currentFolder = searchNode(rootFolder, [...root]);
          } else {
            if (root.length > 1) root.pop();
            currentFolder = searchNode(rootFolder, [...root]);
          }
          // console.log(cmd, currentFolder, root);
          currentDepth = currentFolder.depth;
          break;
        }
        case 'ls': {
          fillFolder(currentFolder, array.slice(i + 1), currentFolder.id);
          break;
        }
      }
    }
  });

  return getFinalResult(calculateSizes(rootFolder, 0)[1], 0);
}

function searchNode(node, path) {
  if (node.id == path[0]) {
    path.shift();
    if (!path.length) return node;
    else {
      for (let i = 0; i < node.children.length; i++) {
        let foundNode = searchNode(node.children[i], path);
        if (foundNode) return foundNode;
      }
    }
  }
  return undefined;
}

function fillFolder(node, files, parentId) {
  for (let file of files) {
    let currentFile = file.split(' ');
    if (currentFile[0] != '$') {
      if (currentFile[0] != 'dir')
        node.children.push({
          parentId,
          id: currentFile[1],
          children: null,
          size: +currentFile[0],
          depth: currentDepth + 1,
        });
      else
        node.children.push({
          parentId,
          id: currentFile[1],
          children: [],
          size: null,
          depth: currentDepth + 1,
        });
    } else break;
  }
}

function calculateSizes(node) {
  let currentSize = 0;
  node.children.forEach((node) => {
    if (node.children) {
      currentSize += calculateSizes(node)[0];
    } else currentSize += node.size;
  });
  node.size = currentSize;
  return [currentSize, node];
}

function getFinalResult(node, finalResult) {
  node.children.forEach((node) => {
    if (node.size < 100000 && node.children) {
      // console.log(node);
      finalResult += node.size;
    }
    if (node.children) {
      finalResult += getFinalResult(node, 0);
    }
  });
  return finalResult;
}

console.log(JSON.stringify(solution(input)));
