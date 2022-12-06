function createCube(size) {
  let array = [];
  let parts = [`/\\`, `_\\`.repeat(size), `\\/`, `_/`.repeat(size)];

  for (let i = 0; i < size; i++) {
    array[i] = `${' '.repeat(size / 2 - i + size / 2 - 1)}${parts[0].repeat(
      i + 1
    )}${parts[1]}`;
    array[size * 2 - i - 1] = `${' '.repeat(
      size / 2 - i + size / 2 - 1
    )}${parts[2].repeat(i + 1)}${parts[3]}`;
  }

  return array.join('\n');
}

console.log(createCube(20));
