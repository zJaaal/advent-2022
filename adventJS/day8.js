function checkPart(part) {
  if (part == 'midu') return false;
  return [0, 2, part.length].includes(
    part.split('').reduce((acc, curr, i, array) => {
      if (curr !== array[array.length - i - 1]) acc.push(curr);
      return acc;
    }, []).length
  );
}

console.log(checkPart('myolooloy'));
