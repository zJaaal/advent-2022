function getOptimalPath(path) {
  let traverseTree = (value, array, position, depth) => {
    if (!array[depth]) return 0;

    let minIndex = array[depth].findIndex((x) => {
      // console.log(array[depth - 1], position);
      if (depth && position == array[depth - 1].length - 1) {
        return (
          x == Math.min(array[depth][position + 1], array[depth][position])
        );
      }
      return (
        x ==
        Math.min(
          array[depth][position - 1] || Infinity,
          array[depth][position],
          array[depth][position + 1] || Infinity
        )
      );
    });

    // console.log(minIndex);

    value = array[depth][minIndex];

    return value + traverseTree(value, array, minIndex, depth + 1);
  };

  return traverseTree(0, path, 0, 0);
}

let path = [[0], [3, 4], [9, 8, 1]];
console.log(getOptimalPath(path));
