function getOptimalPath(path) {
  let result = new Set();
  let traverseTree = (value, array, depth, position) => {
    if (!array[depth]) {
      console.log(value, depth);
      result.add(value);
      return;
    }

    // console.log(array[depth]);

    array[depth].forEach((cost, i) => {
      //position

      traverseTree(value + cost, array, depth + 1);
    });
  };

  traverseTree(0, path, 0, 0);
  // console.log(result);
  return Math.min(...result);
}

let path = [[0], [3, 4], [9, 8, 1]];
console.log(getOptimalPath(path));
