import input from '../input.js';
console.clear();

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
This is solved with nodes
I honestly don't know how to do it
*/
let currentDepth = 0;
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
          // console.log(cmd, currentFolder);
          if (cmdArgs[2] != '..')
            currentFolder = searchNode(
              rootFolder,
              cmdArgs[2],
              currentDepth + 1
            );
          else
            currentFolder = searchNode(
              rootFolder,

              currentFolder.parentId || '/',
              currentDepth - 1
            );
          currentDepth = currentFolder.depth;
          // console.log(currentDepth);
          break;
        }
        case 'ls': {
          // console.log(currentFolder);
          fillFolder(currentFolder, array.slice(i + 1), currentFolder.id);
          break;
        }
      }
    }
  });

  // console.log(rootFolder);
  return rootFolder;
}

function searchNode(node, id, depth, nodeFound = []) {
  if (node.id == id && node.children && node.depth == depth)
    nodeFound.push(node);
  else if (node.children)
    for (let i = 0; i < node.children.length; i++)
      searchNode(node.children[i], id, depth, nodeFound);
  return nodeFound[0];
}

function fillFolder(toFill, files, parentId) {
  for (let file of files) {
    let currentFile = file.split(' ');
    if (currentFile[0] != '$') {
      if (currentFile[0] != 'dir')
        toFill.children.push({
          parentId,
          id: currentFile[1],
          children: null,
          size: +currentFile[0],
          depth: currentDepth + 1,
        });
      else
        toFill.children.push({
          parentId,
          id: currentFile[1],
          children: [],
          size: null,
          depth: currentDepth + 1,
        });
    } else break;
  }
}

console.log(JSON.stringify(solution(input)));
