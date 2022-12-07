import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The total disk space available to the filesystem is 70000000.
To run the update, you need unused space of at least 30000000.
You need to find a directory you can delete that will free up enough space to run the update.

In the example above, the total size of the outermost directory
(and thus the total amount of used space) is 48381165;
this means that the size of the unused space must currently be 21618835,
which isn't quite the 30000000 required by the update.
Therefore, the update still requires a directory
with total size of at least 8381165 to be deleted before it can run.

To achieve this, you have the following options:

Delete directory e, which would increase unused space by 584.
Delete directory a, which would increase unused space by 94853.
Delete directory d, which would increase unused space by 24933642.
Delete directory /, which would increase unused space by 48381165.
Directories e and a are both too small; deleting them would not free up enough space.
However, directories d and / are both big enough! Between these, choose the smallest: d,
increasing unused space by 24933642.

Find the smallest directory that, if deleted, would free up enough space on the
filesystem to run the update. What is the total size of that directory?

In my case the total used is 40532950 (found with the algorithm) on rootFolder.size
So total unused is 29467050
We need 30000000
So the minimal directory to be deleted should be greater or equal than 532950
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

  return getFinalResult(calculateSizes(rootFolder, 0)[1], []).sort(
    (x, y) => x - y
  )[0];
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

//Just changed this function
function getFinalResult(node, finalResult) {
  node.children.forEach((node) => {
    if (node.size >= 532950 && node.children) {
      finalResult.push(node.size);
    }
    if (node.children) {
      getFinalResult(node, finalResult);
    }
  });
  return finalResult;
}

console.log(JSON.stringify(solution(input)));
